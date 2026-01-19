import { readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export class PredictivePreloader {
  constructor(rootDir) {
    this.graphPath = join(rootDir, '.cursor/intelligence/codebase-graph.json');
  }

  async preload(taskDescription) {
    if (!existsSync(this.graphPath)) return { error: 'Graph not built.' };
    
    const graph = JSON.parse(await readFile(this.graphPath, 'utf-8'));
    const files = Object.keys(graph.files);

    // 1. Identify "Relevant Files" using simple keyword matching
    // In a real version, this would use a small local embedding model or TF-IDF
    const keywords = taskDescription.toLowerCase().split(/\s+/);
    const relevant = files.filter(f => {
      const fileName = f.toLowerCase();
      return keywords.some(k => fileName.includes(k) && k.length > 3);
    });

    // 2. Expand context to include neighbors (1st degree)
    const expanded = new Set(relevant);
    relevant.forEach(f => {
      const node = graph.files[f];
      if (node.dependencies) node.dependencies.forEach(d => expanded.add(d));
      if (node.dependents) node.dependents.forEach(d => expanded.add(d));
    });

    return {
      task: taskDescription,
      preloadedFiles: Array.from(expanded),
      message: `Predictively gathered context for ${expanded.size} files. Agents can now pull these from cache.`
    };
  }
}
