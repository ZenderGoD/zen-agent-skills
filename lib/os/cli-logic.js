#!/usr/bin/env node
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import prompts from 'prompts';
import chalk from 'chalk';

// AI OS Logic Imports
import { buildIntelligenceGraph } from './intelligence/builder.js';
import { MemoryManager } from './memory/manager.js';
import { WorkflowEngine } from './orchestrator/engine.js';
import { PerformanceTracker } from './analytics/tracker.js';
import { AgentSpawner } from './orchestrator/spawner.js';
import { ImpactPredictor } from './intelligence/impact.js';
import { WorkflowRegistry } from './orchestrator/registry.js';
import { EventBridge } from './orchestrator/bridge.js';
import { ContextCache } from './orchestrator/cache.js';
import { DashboardGenerator } from './analytics/dashboard.js';
import { PredictivePreloader } from './intelligence/preloader.js';
import { ProjectSyncer } from './memory/sync.js';
import { RuleEvolver } from './memory/evolve.js';
import { AgentReflector } from './memory/reflect.js';
import { OSHealthCheck } from './orchestrator/health.js';
import { PluginSDK } from './orchestrator/sdk.js';
import { ScenarioSandbox } from './orchestrator/sandbox.js';
import { DigitalTwin } from './intelligence/twin.js';
import { CodebaseMapper } from './intelligence/mapper.js';
import { PatternExporter } from './memory/exporter.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const [,, command, ...args] = process.argv;
const root = process.cwd();

async function showHelp() {
  console.log(chalk.cyan.bold('\n🧠 Cursor AI OS - Command Reference\n'));
  
  const commands = [
    { cmd: 'setup', desc: 'Initialize OS directories and data files' },
    { cmd: 'build-graph', desc: 'Update codebase intelligence graph' },
    { cmd: 'generate-map', desc: 'Generate visual codebase map' },
    { cmd: 'predict-impact <file>', desc: 'Analyze blast radius of a file change' },
    { cmd: 'simulate-change <type> <file>', desc: 'Simulate stability of a change' },
    { cmd: 'plan-workflow <name> <req>', desc: 'Generate multi-agent execution plan' },
    { cmd: 'emit-event <agent> <type> <data>', desc: 'Notify team of a milestone' },
    { cmd: 'recent-events', desc: 'Show live agent event stream' },
    { cmd: 'cache-set <key> <data>', desc: 'Save shared context to high-speed cache' },
    { cmd: 'record-success <name> <ctx>', desc: 'Save a winning pattern to memory' },
    { cmd: 'evolve-rules', desc: 'Bake project wins into .mdc rules' },
    { cmd: 'sync-hub-up/down', desc: 'Share wisdom with the Global Hub' },
    { cmd: 'generate-dashboard', desc: 'Open the interactive command center' },
    { cmd: 'health-check', desc: 'Verify AI OS system integrity' }
  ];

  commands.forEach(c => {
    console.log(`  ${chalk.green(c.cmd.padEnd(30))} ${chalk.slate ? chalk.slate(c.desc) : c.desc}`);
  });
  console.log(chalk.gray('\nUsage: npx zen-agent-skills os <command> [args]\n'));
}

async function main() {
  if (!command || command === 'help') {
    await showHelp();
    return;
  }

  try {
    switch (command) {
      case 'setup':
        await fs.ensureDir(path.join(root, '.cursor/agents'));
        await fs.ensureDir(path.join(root, '.cursor/intelligence'));
        await fs.ensureDir(path.join(root, '.cursor/memory/shared-patterns'));
        await fs.ensureDir(path.join(root, '.cursor/orchestrator/workflows'));
        await fs.ensureDir(path.join(root, '.cursor/analytics'));
        if (!fs.existsSync(path.join(root, '.cursor/memory/memory.json'))) {
          await fs.writeJson(path.join(root, '.cursor/memory/memory.json'), { successfulPatterns: [], failedAttempts: [], agentEvolution: {}, lastUpdated: new Date().toISOString() });
        }
        console.log(chalk.green('✅ AI OS Setup Complete. All systems ready for coordination.'));
        break;

      case 'build-graph':
        await buildIntelligenceGraph(root, path.join(root, '.cursor/intelligence/codebase-graph.json'));
        console.log('Codebase intelligence graph updated.');
        break;
      
      case 'generate-map':
        const mapper = new CodebaseMapper(root);
        console.log(JSON.stringify(await mapper.generateMap(), null, 2));
        break;

      case 'predict-impact':
        const predictor = new ImpactPredictor(root);
        console.log(JSON.stringify(await predictor.predict(args[0]), null, 2));
        break;

      case 'simulate-change':
        const twin = new DigitalTwin(root);
        console.log(JSON.stringify(await twin.simulate(args[0], args[1]), null, 2));
        break;

      case 'plan-workflow':
        const engine = new WorkflowEngine(root);
        console.log(JSON.stringify(await engine.planExecution(args[0], args[1]), null, 2));
        break;

      case 'emit-event':
        const bridge = new EventBridge(root);
        await bridge.emit(args[0], args[1], JSON.parse(args[2]));
        break;

      case 'recent-events':
        const b = new EventBridge(root);
        console.log(JSON.stringify(await b.getRecent(), null, 2));
        break;

      case 'cache-set':
        const cache = new ContextCache(root);
        await cache.save(args[0], JSON.parse(args[1]));
        break;

      case 'cache-get':
        const cg = new ContextCache(root);
        console.log(JSON.stringify(await cg.get(args[0]), null, 2));
        break;

      case 'record-success':
        const mm = new MemoryManager(root);
        await mm.load();
        mm.recordSuccess(args[0], '', args[1]);
        await mm.save();
        console.log('Recorded success pattern.');
        break;

      case 'record-performance':
        const pt = new PerformanceTracker(root);
        await pt.recordImprovement(args[0], parseFloat(args[1]), parseFloat(args[2]), args[3], args[4]);
        break;

      case 'performance-summary':
        const pts = new PerformanceTracker(root);
        console.log(await pts.getSummary());
        break;

      case 'spawn-agent':
        const spawner = new AgentSpawner(root);
        await spawner.spawn(args[0], args[1], args[2], args[3]);
        break;

      case 'export-patterns':
        const exporter = new PatternExporter(root);
        console.log(JSON.stringify(await exporter.exportAnonymized(), null, 2));
        break;

      case 'list-remote-workflows':
        const registry = new WorkflowRegistry(root);
        console.log(JSON.stringify(await registry.listRemote(), null, 2));
        break;

      case 'fetch-workflow':
        const reg = new WorkflowRegistry(root);
        console.log(JSON.stringify(await reg.fetch(args[0]), null, 2));
        break;

      case 'preload-context':
        const preloader = new PredictivePreloader(root);
        console.log(JSON.stringify(await preloader.preload(args[0]), null, 2));
        break;

      case 'sync-hub-up':
        const up = new ProjectSyncer(root);
        console.log(JSON.stringify(await up.syncUp(), null, 2));
        break;

      case 'sync-hub-down':
        const down = new ProjectSyncer(root);
        console.log(JSON.stringify(await down.syncDown(), null, 2));
        break;

      case 'evolve-rules':
        const evolver = new RuleEvolver(root);
        console.log(JSON.stringify(await evolver.evolve(), null, 2));
        break;

      case 'reflect-agent':
        const reflector = new AgentReflector(root);
        console.log(JSON.stringify(await reflector.reflect(args[0]), null, 2));
        break;

      case 'health-check':
        const hc = new OSHealthCheck(root);
        console.log(JSON.stringify(await hc.check(), null, 2));
        break;

      case 'generate-dashboard':
        const dg = new DashboardGenerator(root);
        console.log(JSON.stringify(await dg.generate(), null, 2));
        break;

      case 'create-plugin':
        const sdk = new PluginSDK(root);
        console.log(JSON.stringify(await sdk.createPlugin(args[0], args[1], args[2]), null, 2));
        break;

      case 'fork-scenario':
        const sandbox = new ScenarioSandbox(root);
        console.log(JSON.stringify(await sandbox.fork(args[0]), null, 2));
        break;

      default:
        console.log(chalk.red(`Unknown command: ${command}`));
        await showHelp();
    }
  } catch (e) {
    console.error(chalk.red('\n❌ AI OS Error:'), e.message);
  }
}

main().catch(console.error);
