import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export class AgentReflector {
  constructor(rootDir) {
    this.memoryPath = join(rootDir, '.cursor/memory/memory.json');
  }

  async reflect(agentName) {
    if (!existsSync(this.memoryPath)) return { error: 'No memory found.' };
    
    const memory = JSON.parse(await readFile(this.memoryPath, 'utf-8'));
    const evolution = memory.agentEvolution[agentName];
    
    if (!evolution) return { error: `No evolution data for ${agentName}.` };

    const reflection = {
      agent: agentName,
      capabilities: evolution.capabilities,
      successRate: `${(evolution.successRate * 100).toFixed(1)}%`,
      status: evolution.successRate > 0.8 ? 'Expert' : 'Developing',
      audit: this.performAudit(evolution),
      nextSteps: this.suggestNextSteps(evolution)
    };

    return reflection;
  }

  performAudit(evolution) {
    const issues = [];
    if (evolution.successRate < 0.5) issues.push('High rejection rate. System prompt may be too rigid.');
    if (evolution.capabilities.length < 3) issues.push('Limited skill set. Needs more project exposure.');
    return issues.length > 0 ? issues : ['Capability audit passed. Agent is stable.'];
  }

  suggestNextSteps(evolution) {
    const steps = [];
    if (evolution.successRate > 0.9) steps.push(`Create a sub-sub-agent specialized in ${evolution.capabilities[0]}`);
    steps.push('Run export-patterns to harden current logic');
    return steps;
  }
}
