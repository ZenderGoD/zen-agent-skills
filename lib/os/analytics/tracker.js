import { readFile, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export class PerformanceTracker {
  constructor(rootDir) {
    this.analyticsDir = join(rootDir, '.cursor/analytics');
  }

  async recordImprovement(metric, before, after, unit, context) {
    await mkdir(this.analyticsDir, { recursive: true });
    const file = join(this.analyticsDir, 'performance-history.json');
    
    let history = [];
    if (existsSync(file)) {
      history = JSON.parse(await readFile(file, 'utf-8'));
    }

    const entry = {
      metric,
      before,
      after,
      unit,
      timestamp: new Date().toISOString(),
      context
    };

    history.push(entry);
    await writeFile(file, JSON.stringify(history, null, 2));
    
    const improvement = ((before - after) / before) * 100;
    console.log(`Recorded ${improvement.toFixed(2)}% improvement in ${metric}`);
  }

  async getSummary() {
    const file = join(this.analyticsDir, 'performance-history.json');
    if (!existsSync(file)) return "No performance data recorded yet.";
    
    const history = JSON.parse(await readFile(file, 'utf-8'));
    return history.map(h => `- ${h.metric}: ${h.before}${h.unit} -> ${h.after}${h.unit} (${new Date(h.timestamp).toLocaleDateString()})`).join('\n');
  }
}
