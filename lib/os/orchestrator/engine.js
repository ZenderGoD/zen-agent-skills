import { readFile } from 'fs/promises';
import { join } from 'path';
import { parse } from 'yaml';

interface WorkflowStep {
  id;
  agent;
  task;
  dependsOn?[];
  outputs?[];
  parallel?;
}

interface Workflow {
  name;
  description;
  steps;
}

export class WorkflowEngine {
  private workflowsDir;

  constructor(rootDir) {
    this.workflowsDir = join(rootDir, '.cursor/orchestrator/workflows');
  }

  async loadWorkflow(name): Promise<Workflow> {
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
