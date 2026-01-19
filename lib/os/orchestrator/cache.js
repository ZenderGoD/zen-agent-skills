import { readFile, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export class ContextCache {
  constructor(rootDir) {
    this.cacheDir = join(rootDir, '.cursor/orchestrator/cache');
  }

  async save(key, data) {
    await mkdir(this.cacheDir, { recursive: true });
    const file = join(this.cacheDir, `${key}.json`);
    const entry = {
      key,
      data,
      timestamp: new Date().toISOString()
    };
    await writeFile(file, JSON.stringify(entry, null, 2));
    console.log(`[CACHE] Saved context: ${key}`);
  }

  async get(key) {
    const file = join(this.cacheDir, `${key}.json`);
    if (!existsSync(file)) return null;
    const content = await readFile(file, 'utf-8');
    return JSON.parse(content);
  }

  async list() {
    if (!existsSync(this.cacheDir)) return [];
    return await readdir(this.cacheDir);
  }
}
