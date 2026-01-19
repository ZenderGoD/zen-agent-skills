import { readFile, writeFile, readdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export class RuleEvolver {
  constructor(rootDir) {
    this.rulesDir = join(rootDir, '.cursor/rules');
    this.memoryPath = join(rootDir, '.cursor/memory/memory.json');
  }

  async evolve() {
    if (!existsSync(this.memoryPath)) return { error: 'No memory found.' };
    
    const memory = JSON.parse(await readFile(this.memoryPath, 'utf-8'));
    const successes = memory.successfulPatterns;
    
    if (successes.length === 0) return { message: 'No new successes to learn from.' };

    const rules = await this.getAllRules(this.rulesDir);
    let evolvedCount = 0;

    for (const rulePath of rules) {
      let content = await readFile(rulePath, 'utf-8');
      const ruleName = rulePath.split('/').pop().replace('.mdc', '');
      
      // Find successes that match this rule (using context or tags)
      const relevant = successes.filter(s => s.pattern.includes(ruleName) || s.context.includes(ruleName));
      
      if (relevant.length > 0) {
        // Add new example to rule
        const newExample = `\n\n**Evolved Example (from project memory):**\n\n\`\`\`typescript\n${relevant[0].code}\n\`\`\``;
        if (!content.includes('Evolved Example')) {
          content += newExample;
          await writeFile(rulePath, content);
          evolvedCount++;
        }
      }
    }

    return { evolvedCount, message: `Successfully evolved ${evolvedCount} rules with real project examples.` };
  }

  async getAllRules(dir) {
    let results = [];
    const list = await readdir(dir, { withFileTypes: true });
    for (const file of list) {
      const res = join(dir, file.name);
      if (file.isDirectory()) {
        results = results.concat(await this.getAllRules(res));
      } else if (file.name.endsWith('.mdc')) {
        results.push(res);
      }
    }
    return results;
  }
}
