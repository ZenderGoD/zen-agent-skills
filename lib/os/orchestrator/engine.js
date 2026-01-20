import { readFile } from 'fs/promises';
import { join } from 'path';
import { parse } from 'yaml';

export class WorkflowEngine {
  constructor(rootDir) {
    this.workflowsDir = join(rootDir, '.cursor/orchestrator/workflows');
  }

  async loadWorkflow(name) {
    const file = join(this.workflowsDir, `${name}.yaml`);
    const content = await readFile(file, 'utf-8');
    return parse(content);
  }

  async planExecution(workflowName, userRequest) {
    const workflow = await this.loadWorkflow(workflowName);
    console.log(`Planning execution for: ${workflow.name}`);
    
    const plan = workflow.steps.map(step => ({
      ...step,
      task: step.task.replace('{userRequest}', userRequest)
    }));

    return plan;
  }
}
