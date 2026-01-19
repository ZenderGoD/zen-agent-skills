import { readFile, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export class PatternExporter {
  constructor(rootDir) {
    this.memoryPath = join(rootDir, '.cursor/memory/memory.json');
    this.exportPath = join(rootDir, '.cursor/memory/shared-patterns');
  }

  async exportAnonymized() {
    if (!existsSync(this.memoryPath)) return { error: 'No memory found.' };
    
    const memory = JSON.parse(await readFile(this.memoryPath, 'utf-8'));
    const sharedPatterns = memory.successfulPatterns.map(p => ({
      name: p.pattern,
      logic: this.anonymize(p.code),
      context: p.context
    }));

    await mkdir(this.exportPath, { recursive: true });
    const file = join(this.exportPath, `export-${Date.now()}.json`);
    await writeFile(file, JSON.stringify(sharedPatterns, null, 2));
    
    return {
      count: sharedPatterns.length,
      file: file,
      message: 'Successfully exported anonymized patterns. Sensitive names have been replaced with placeholders.'
    };
  }

  anonymize(code) {
    // Simple anonymization: Replace variable names that look like project secrets
    // In a real version, this would use a more sophisticated AST-based approach
    return code
      .replace(/API_KEY|SECRET|TOKEN|PASSWORD/gi, '[SENSITIVE_REPLACED]')
      .replace(/const [a-z0-9]+Client/gi, 'const client')
      .replace(/import { [^}]+ } from ['"][^'"]+['"]/gi, (match) => {
        // Keep external library imports, anonymize internal ones
        if (match.includes('./') || match.includes('../')) return '// [INTERNAL_IMPORT_ANONYMIZED]';
        return match;
      });
  }
}
