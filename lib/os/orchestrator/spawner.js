import { writeFile, mkdir, readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export class AgentSpawner {
  constructor(rootDir) {
    this.agentsDir = join(rootDir, '.cursor/agents');
  }

  async spawn(parentName, specialization, description, documentation = '') {
    await mkdir(this.agentsDir, { recursive: true });
    const agentName = `${parentName}:${specialization}`;
    const filePath = join(this.agentsDir, `${agentName}.md`);

    const content = `---
name: ${agentName}
description: Dynamic specialist agent for ${specialization}. Sub-sub-agent of /${parentName}.
parent: ${parentName}
model: inherit
---

# ${specialization.toUpperCase()} Specialist

You are a dynamically spawned sub-sub-agent of /${parentName} specialized in: ${specialization}.

## Your Context
${description}

${documentation ? `## Documentation Context\n${documentation}` : ''}

## Your Mission
Deep-dive into the specific domain of ${specialization}. Provide insights that the general /${parentName} might miss.

## Growth Note
Your successful patterns will be merged back into the project's permanent memory.
`;

    await writeFile(filePath, content);
    console.log(`Successfully spawned dynamic agent: /${agentName}`);
    return agentName;
  }
}
