import { readFile, writeFile, mkdir, readdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export class ProjectSyncer {
  constructor(rootDir) {
    this.rootDir = rootDir;
    this.localSharedPath = join(rootDir, '.cursor/memory/shared-patterns');
    // Mock global storage path (e.g. in ~/.zen-agent-skills)
    this.globalPath = join(process.env.HOME || process.env.USERPROFILE, '.zen-agent-skills/knowledge-hub');
  }

  async syncUp() {
    if (!existsSync(this.localSharedPath)) return { error: 'No patterns to sync.' };
    
    await mkdir(this.globalPath, { recursive: true });
    const files = await readdir(this.localSharedPath);
    
    for (const file of files) {
      const content = await readFile(join(this.localSharedPath, file));
      await writeFile(join(this.globalPath, file), content);
    }

    return { message: `Synced ${files.length} patterns to global hub.` };
  }

  async syncDown() {
    if (!existsSync(this.globalPath)) return { error: 'Global hub is empty.' };
    
    await mkdir(this.localSharedPath, { recursive: true });
    const files = await readdir(this.globalPath);
    
    for (const file of files) {
      const content = await readFile(join(this.globalPath, file));
      await writeFile(join(this.localSharedPath, file), content);
    }

    return { message: `Synced ${files.length} patterns from global hub to this project.` };
  }
}
