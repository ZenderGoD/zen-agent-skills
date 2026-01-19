import { readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export class DigitalTwin {
  constructor(rootDir) {
    this.graphPath = join(rootDir, '.cursor/intelligence/codebase-graph.json');
    this.memoryPath = join(rootDir, '.cursor/memory/memory.json');
  }

  async simulate(changeType, targetFile) {
    if (!existsSync(this.graphPath)) return { error: 'Graph not built.' };
    
    const graph = JSON.parse(await readFile(this.graphPath, 'utf-8'));
    const memory = existsSync(this.memoryPath) ? JSON.parse(await readFile(this.memoryPath, 'utf-8')) : { failedAttempts: [] };

    const fileNode = graph.files[targetFile];
    if (!fileNode) return { error: `File ${targetFile} not found.` };

    // 1. Identify Blast Radius
    const impacted = this.getBlastRadius(targetFile, graph.files);

    // 2. Check for "Ghost of Failures Past" (Memory check)
    const risks = memory.failedAttempts.filter(f => f.category === changeType || f.context.includes(targetFile));

    // 3. Predict Stability
    const stabilityScore = 100 - (impacted.length * 5) - (risks.length * 10);

    return {
      simulation: `Change: ${changeType} on ${targetFile}`,
      stabilityScore: Math.max(0, stabilityScore),
      blastRadius: impacted.length,
      impactedFiles: impacted,
      warnings: risks.map(r => `Pattern previously failed: ${r.reason}`),
      recommendation: stabilityScore > 70 ? 'Proceed with caution' : 'Coordinate with /reviewer:critic'
    };
  }

  getBlastRadius(file, allFiles) {
    const impacted = new Set();
    const queue = [file];
    
    while (queue.length > 0) {
      const current = queue.shift();
      const node = allFiles[current];
      if (node && node.dependents) {
        node.dependents.forEach(d => {
          if (!impacted.has(d)) {
            impacted.add(d);
            queue.push(d);
          }
        });
      }
    }
    return Array.from(impacted);
  }
}
