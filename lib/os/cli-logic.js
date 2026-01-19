#!/usr/bin/env node
import { buildIntelligenceGraph } from './intelligence/builder.js';
import { MemoryManager } from './memory/manager.js';
import { WorkflowEngine } from './orchestrator/engine.js';
import { PerformanceTracker } from './analytics/tracker.js';
import path from 'path';

const [,, command, ...args] = process.argv;
const root = process.cwd();

async function main() {
  switch (command) {
    case 'build-graph':
      await buildIntelligenceGraph(root, path.join(root, '.cursor/intelligence/codebase-graph.json'));
      console.log('Codebase intelligence graph updated.');
      break;
    
    case 'plan-workflow':
      const [workflowName, userRequest] = args;
      const engine = new WorkflowEngine(root);
      const plan = await engine.planExecution(workflowName, userRequest);
      console.log(JSON.stringify(plan, null, 2));
      break;

    case 'record-success':
      const [pattern, context] = args;
      const mm = new MemoryManager(root);
      await mm.load();
      mm.recordSuccess(pattern, '', context);
      await mm.save();
      console.log('Recorded success pattern.');
      break;

    case 'record-performance':
      const [metric, before, after, unit, pContext] = args;
      const pt = new PerformanceTracker(root);
      await pt.recordImprovement(metric, parseFloat(before), parseFloat(after), unit, pContext);
      break;

    case 'performance-summary':
      const pts = new PerformanceTracker(root);
      const summary = await pts.getSummary();
      console.log(summary);
      break;

    default:
      console.log('Usage: zen-agent-skills os <build-graph|plan-workflow|record-success|record-performance|performance-summary>');
  }
}

main().catch(console.error);
