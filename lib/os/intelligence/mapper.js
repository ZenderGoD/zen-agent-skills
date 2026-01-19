import { readFile, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export class CodebaseMapper {
  constructor(rootDir) {
    this.graphPath = join(rootDir, '.cursor/intelligence/codebase-graph.json');
    this.analyticsPath = join(rootDir, '.cursor/analytics/performance-history.json');
    this.outputPath = join(rootDir, '.cursor/intelligence/visual-map.json');
  }

  async generateMap() {
    if (!existsSync(this.graphPath)) return { error: 'Graph not built. Run build-graph first.' };
    
    const graph = JSON.parse(await readFile(this.graphPath, 'utf-8'));
    const analytics = existsSync(this.analyticsPath) ? JSON.parse(await readFile(this.analyticsPath, 'utf-8')) : [];

    const nodes = [];
    const links = [];

    for (const [path, file] of Object.entries(graph.files)) {
      // Find performance wins for this file
      const fileWins = analytics.filter(a => a.context.includes(path)).length;
      
      nodes.push({
        id: path,
        type: file.type,
        size: file.size,
        risk: file.dependents ? file.dependents.length : 0,
        wins: fileWins,
        stability: fileWins > 0 ? 'high' : 'normal'
      });

      if (file.dependencies) {
        file.dependencies.forEach(dep => {
          links.push({ source: path, target: dep });
        });
      }
    }

    const map = { nodes, links, timestamp: new Date().toISOString() };
    await writeFile(this.outputPath, JSON.stringify(map, null, 2));
    
    return {
      message: `Visual map generated at ${this.outputPath}`,
      stats: {
        nodes: nodes.length,
        links: links.length
      }
    };
  }
}
