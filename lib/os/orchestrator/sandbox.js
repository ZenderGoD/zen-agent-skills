import { readFile, writeFile, mkdir, copyFile, readdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export class ScenarioSandbox {
  constructor(rootDir) {
    this.rootDir = rootDir;
    this.sandboxDir = join(rootDir, '.cursor/sandbox');
  }

  async fork(scenarioName) {
    const currentScenarioDir = join(this.sandboxDir, scenarioName);
    await mkdir(currentScenarioDir, { recursive: true });

    // Copy core files to sandbox
    const filesToFork = [
      '.cursor/intelligence/codebase-graph.json',
      '.cursor/memory/memory.json'
    ];

    for (const f of filesToFork) {
      const src = join(this.rootDir, f);
      const dest = join(currentScenarioDir, f.split('/').pop());
      if (existsSync(src)) {
        await copyFile(src, dest);
      }
    }

    return { message: `Scenario '${scenarioName}' forked to sandbox. Agents can now simulate here safely.` };
  }

  async list() {
    if (!existsSync(this.sandboxDir)) return [];
    return await readdir(this.sandboxDir);
  }
}
