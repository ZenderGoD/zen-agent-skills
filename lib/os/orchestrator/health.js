import { readFile, readdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export class OSHealthCheck {
  constructor(rootDir) {
    this.rootDir = rootDir;
    this.requiredDirs = [
      '.cursor/agents',
      '.cursor/rules/orchestrator',
      '.cursor/orchestrator/workflows',
      '.cursor/intelligence',
      '.cursor/memory',
      '.cursor/analytics'
    ];
    this.requiredFiles = [
      '.cursor/orchestrator/orchestrator.md',
      '.cursor/intelligence/codebase-graph.json',
      '.cursor/memory/memory.json'
    ];
  }

  async check() {
    const report = {
      status: 'healthy',
      checks: [],
      timestamp: new Date().toISOString()
    };

    for (const dir of this.requiredDirs) {
      const fullDir = join(this.rootDir, dir);
      const exists = existsSync(fullDir);
      report.checks.push({ type: 'directory', path: dir, status: exists ? 'pass' : 'fail' });
      if (!exists) report.status = 'degraded';
    }

    for (const file of this.requiredFiles) {
      const fullFile = join(this.rootDir, file);
      const exists = existsSync(fullFile);
      report.checks.push({ type: 'file', path: file, status: exists ? 'pass' : 'fail' });
      if (!exists) report.status = 'degraded';
    }

    // Agent validation
    const agentsDir = join(this.rootDir, '.cursor/agents');
    if (existsSync(agentsDir)) {
      const agents = await readdir(agentsDir);
      report.checks.push({ type: 'agents', count: agents.length, status: agents.length > 5 ? 'pass' : 'warn' });
    }

    return report;
  }
}
