import { readFile, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export class EventBridge {
  constructor(rootDir) {
    this.eventLogPath = join(rootDir, '.cursor/orchestrator/events.log');
  }

  async emit(agent, eventType, data) {
    const entry = {
      timestamp: new Date().toISOString(),
      agent,
      type: eventType,
      data
    };

    const line = JSON.stringify(entry) + '\n';
    await mkdir(join(this.eventLogPath, '..'), { recursive: true });
    
    // Append to log
    let currentLog = '';
    if (existsSync(this.eventLogPath)) {
      currentLog = await readFile(this.eventLogPath, 'utf-8');
    }
    
    await writeFile(this.eventLogPath, currentLog + line);
    console.log(`[EVENT] ${agent} emitted ${eventType}`);
  }

  async getRecent(limit = 10) {
    if (!existsSync(this.eventLogPath)) return [];
    const content = await readFile(this.eventLogPath, 'utf-8');
    const lines = content.trim().split('\n');
    return lines.slice(-limit).map(l => JSON.parse(l));
  }
}
