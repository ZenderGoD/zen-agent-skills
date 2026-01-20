import { readFile, readdir, stat, writeFile } from 'fs/promises';
import { join, relative, extname } from 'path';
import { parse } from '@babel/parser';
import traverseModule from '@babel/traverse';

const traverse = traverseModule.default || traverseModule;

const SUPPORTED_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs'];
const IGNORE_PATTERNS = [
  'node_modules', '.git', '.next', 'dist', 'build', '.cursor', 'coverage'
];

export async function buildIntelligenceGraph(rootDir, outputPath) {
  const files = {};
  const relationships = [];

  await scanDirectory(rootDir, rootDir, files, relationships);
  
  const graph = {
    files,
    relationships,
    lastUpdated: new Date().toISOString(),
    version: '1.0.0'
  };

  await writeFile(outputPath, JSON.stringify(graph, null, 2));
  return graph;
}

async function scanDirectory(rootDir, currentDir, files, relationships) {
  const entries = await readdir(currentDir);
  for (const entry of entries) {
    const fullPath = join(currentDir, entry);
    const relativePath = relative(rootDir, fullPath);
    if (IGNORE_PATTERNS.some(p => relativePath.includes(p))) continue;
    
    const s = await stat(fullPath);
    if (s.isDirectory()) {
      await scanDirectory(rootDir, fullPath, files, relationships);
    } else if (s.isFile() && SUPPORTED_EXTENSIONS.includes(extname(entry))) {
      try {
        const node = await analyzeFile(fullPath, relativePath);
        files[relativePath] = node;
      } catch (e) {
        // Skip files that can't be parsed
      }
    }
  }
}

async function analyzeFile(filePath, relativePath) {
  const content = await readFile(filePath, 'utf-8');
  const s = await stat(filePath);
  const exports = [];
  const imports = [];

  try {
    const ast = parse(content, {
      sourceType: 'module',
      plugins: ['typescript', 'jsx', 'decorators-legacy']
    });

    traverse(ast, {
      ImportDeclaration(path) {
        const source = path.node.source.value;
        const specifiers = path.node.specifiers.map(s => s.local.name);
        imports.push({ 
          source, 
          specifiers, 
          isDefault: path.node.specifiers.some(s => s.type === 'ImportDefaultSpecifier') 
        });
      },
      ExportNamedDeclaration(path) {
        if (path.node.declaration) {
          if (path.node.declaration.id) exports.push(path.node.declaration.id.name);
          else if (path.node.declaration.declarations) {
            path.node.declaration.declarations.forEach(d => {
              if (d.id.name) exports.push(d.id.name);
            });
          }
        }
      },
      ExportDefaultDeclaration() {
        exports.push('default');
      }
    });
  } catch (e) {}

  return {
    path: relativePath,
    type: detectFileType(relativePath, content),
    exports,
    imports,
    dependencies: [],
    dependents: [],
    size: s.size,
    lastModified: s.mtime.toISOString()
  };
}

function detectFileType(path, content) {
  if (path.includes('.test.') || path.includes('.spec.')) return 'test';
  if (path.includes('/api/')) return 'api';
  if (path.includes('use') && path.includes('.ts')) return 'hook';
  if (content.includes('export default') && (path.includes('.tsx') || path.includes('.jsx'))) return 'component';
  return 'other';
}

if (process.argv[1].includes('builder.js')) {
    const root = process.cwd();
    const out = join(root, '.cursor/intelligence/codebase-graph.json');
    buildIntelligenceGraph(root, out).then(() => console.log('Graph built')).catch(console.error);
}
