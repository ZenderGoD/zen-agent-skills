import { readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export class ImpactPredictor {
  constructor(rootDir) {
    this.graphPath = join(rootDir, '.cursor/intelligence/codebase-graph.json');
  }

  async predict(changedFile) {
    if (!existsSync(this.graphPath)) return { error: 'Graph not built. Run build-graph first.' };
    
    const graph = JSON.parse(await readFile(this.graphPath, 'utf-8'));
    const fileNode = graph.files[changedFile];
    
    if (!fileNode) return { error: `File ${changedFile} not found in graph.` };

    const impacted = new Set();
    this.findImpacted(changedFile, graph.files, impacted);

    return {
      file: changedFile,
      riskScore: impacted.size,
      impactedFiles: Array.from(impacted),
      dependencies: fileNode.dependencies
    };
  }

  findImpacted(file, allFiles, impacted) {
    const node = allFiles[file];
    if (!node || !node.dependents) return;

    for (const dependent of node.dependents) {
      if (!impacted.has(dependent)) {
        impacted.add(dependent);
        this.findImpacted(dependent, allFiles, impacted);
      }
    }
  }
}
