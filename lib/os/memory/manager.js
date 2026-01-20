import { readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';

export class MemoryManager {
  constructor(rootDir) {
    this.memoryPath = join(rootDir, '.cursor/memory');
    this.memory = {
      successfulPatterns: [],
      failedAttempts: [],
      preferences: [],
      agentEvolution: {},
      lastUpdated: new Date().toISOString()
    };
  }

  async load() {
    const file = join(this.memoryPath, 'memory.json');
    if (existsSync(file)) {
      this.memory = JSON.parse(await readFile(file, 'utf-8'));
    }
  }

  async save() {
    await mkdir(this.memoryPath, { recursive: true });
    await writeFile(join(this.memoryPath, 'memory.json'), JSON.stringify(this.memory, null, 2));
  }

  recordSuccess(pattern, code, context) {
    this.memory.successfulPatterns.push({ pattern, code, context, timestamp: new Date().toISOString() });
  }

  recordFailure(pattern, reason, context) {
    this.memory.failedAttempts.push({ pattern, reason, context, timestamp: new Date().toISOString() });
  }

  evolveAgent(agentName, capability) {
    if (!this.memory.agentEvolution[agentName]) {
      this.memory.agentEvolution[agentName] = { capabilities: [], lastUpdated: '' };
    }
    if (!this.memory.agentEvolution[agentName].capabilities.includes(capability)) {
      this.memory.agentEvolution[agentName].capabilities.push(capability);
    }
    this.memory.agentEvolution[agentName].lastUpdated = new Date().toISOString();
  }
}
