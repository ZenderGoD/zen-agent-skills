#!/usr/bin/env node
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import prompts from 'prompts';
import chalk from 'chalk';

// AI OS Logic Imports
import { buildIntelligenceGraph } from '../lib/os/intelligence/builder.js';
import { MemoryManager } from '../lib/os/memory/manager.js';
import { WorkflowEngine } from '../lib/os/orchestrator/engine.js';
import { PerformanceTracker } from '../lib/os/analytics/tracker.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const targetDir = process.cwd();
const packageRulesDir = path.join(__dirname, '../.cursor/rules');
const packageAgentsDir = path.join(__dirname, '../.cursor/agents');

const [,, command, ...args] = process.argv;

async function main() {
  // If the first argument is 'os', we run the AI OS logic
  if (command === 'os') {
    const [subCommand, ...osArgs] = args;
    const root = process.cwd();

    switch (subCommand) {
      case 'build-graph':
        await buildIntelligenceGraph(root, path.join(root, '.cursor/intelligence/codebase-graph.json'));
        console.log('Codebase intelligence graph updated.');
        break;
      
      case 'plan-workflow':
        const [workflowName, userRequest] = osArgs;
        const engine = new WorkflowEngine(root);
        const plan = await engine.planExecution(workflowName, userRequest);
        console.log(JSON.stringify(plan, null, 2));
        break;

      case 'record-success':
        const [pattern, context] = osArgs;
        const mm = new MemoryManager(root);
        await mm.load();
        mm.recordSuccess(pattern, '', context);
        await mm.save();
        console.log('Recorded success pattern.');
        break;

      case 'record-performance':
        const [metric, before, after, unit, pContext] = osArgs;
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
    return;
  }

  // Default behavior: Installer
  console.log(chalk.cyan.bold('\n🚀 Zen Agent Skills Installer\n'));

  // 1. Audit
  const audit = await performAudit();
  console.log(chalk.gray('Audit results:'));
  console.log(`  - Project: ${chalk.white(audit.name)}`);
  console.log(`  - Tech detected: ${chalk.white(audit.tech.join(', ') || 'General')}\n`);

  // 2. Select Packs
  const response = await prompts({
    type: 'multiselect',
    name: 'packs',
    message: 'Which skill packs would you like to install?',
    choices: [
      { title: 'Subagents Pack (/architect, /reviewer, /security, /debugger, etc.)', value: 'agents', selected: true },
      { title: 'Sub-Sub-Agents (Hierarchical specialization)', value: 'sub-agents', selected: true },
      { title: 'Personas Pack (@architect, @reviewer, @security, @ux) - Cursor Rules', value: 'personas', selected: true },
      { title: 'Vercel Performance Pack (49 rules)', value: 'performance', selected: audit.tech.includes('React') },
      { title: 'Claude Power Pack (Aesthetics & Meta-rules)', value: 'claude', selected: true },
      { title: 'Multi-Agent Orchestrator', value: 'orchestrator', selected: true },
      { title: 'Learning & Memory System', value: 'memory', selected: true },
      { title: 'Codebase Intelligence', value: 'intelligence', selected: true },
      { title: 'Vercel Deploy Skill', value: 'deploy', selected: audit.tech.includes('Next.js') },
      { title: 'Web Design Audit Skill', value: 'design', selected: true },
    ],
    instructions: false
  });

  if (!response.packs || response.packs.length === 0) {
    console.log(chalk.yellow('\nNo packs selected. Exiting.'));
    return;
  }

  // 3. Install
  console.log(chalk.blue('\nInstalling selected packs...'));
  const cursorRulesDir = path.join(targetDir, '.cursor/rules');
  const cursorAgentsDir = path.join(targetDir, '.cursor/agents');
  const cursorOrchestratorDir = path.join(targetDir, '.cursor/orchestrator');
  const cursorMemoryDir = path.join(targetDir, '.cursor/memory');
  const cursorIntelligenceDir = path.join(targetDir, '.cursor/intelligence');
  
  await fs.ensureDir(cursorRulesDir);
  
  // Install Subagents if selected
  if (response.packs.includes('agents')) {
    await fs.ensureDir(cursorAgentsDir);
    if (await fs.pathExists(packageAgentsDir)) {
      await fs.copy(packageAgentsDir, cursorAgentsDir, { overwrite: true });
      const agentFiles = await fs.readdir(packageAgentsDir);
      console.log(`  ${chalk.green('✓')} ${chalk.white('Subagents')} pack installed (${agentFiles.length} agents).`);
    }
  }

  // Install Sub-Sub-Agents if selected
  if (response.packs.includes('sub-agents')) {
    await fs.ensureDir(cursorAgentsDir);
    const packageSubAgentsDir = path.join(__dirname, '../.cursor/agents');
    if (await fs.pathExists(packageSubAgentsDir)) {
      // Copy sub-sub-agents (files with : in name)
      const agentFiles = await fs.readdir(packageSubAgentsDir);
      const subAgentFiles = agentFiles.filter(f => f.includes(':') && f.endsWith('.md'));
      for (const file of subAgentFiles) {
        await fs.copy(
          path.join(packageSubAgentsDir, file),
          path.join(cursorAgentsDir, file),
          { overwrite: true }
        );
      }
      console.log(`  ${chalk.green('✓')} ${chalk.white('Sub-Sub-Agents')} installed (${subAgentFiles.length} specialized agents).`);
    }
  }

  // Install Orchestrator if selected
  if (response.packs.includes('orchestrator')) {
    const packageOrchestratorDir = path.join(__dirname, '../.cursor/orchestrator');
    if (await fs.pathExists(packageOrchestratorDir)) {
      await fs.copy(packageOrchestratorDir, cursorOrchestratorDir, { overwrite: true });
      console.log(`  ${chalk.green('✓')} ${chalk.white('Multi-Agent Orchestrator')} installed.`);
    }
  }

  // Install Memory System if selected
  if (response.packs.includes('memory')) {
    const packageMemoryDir = path.join(__dirname, '../.cursor/memory');
    if (await fs.pathExists(packageMemoryDir)) {
      await fs.copy(packageMemoryDir, cursorMemoryDir, { overwrite: true });
      await fs.ensureDir(path.join(cursorMemoryDir, 'data'));
      console.log(`  ${chalk.green('✓')} ${chalk.white('Learning & Memory System')} installed.`);
    }
  }

  // Install Intelligence System if selected
  if (response.packs.includes('intelligence')) {
    const packageIntelligenceDir = path.join(__dirname, '../.cursor/intelligence');
    if (await fs.pathExists(packageIntelligenceDir)) {
      await fs.copy(packageIntelligenceDir, cursorIntelligenceDir, { overwrite: true });
      await fs.ensureDir(path.join(cursorIntelligenceDir, 'data'));
      console.log(`  ${chalk.green('✓')} ${chalk.white('Codebase Intelligence')} installed.`);
    }
  }

  // Install Rules Packs
  for (const pack of response.packs) {
    if (['agents', 'sub-agents', 'orchestrator', 'memory', 'intelligence'].includes(pack)) {
      continue; // Already handled above
    }
    
    const sourcePath = path.join(packageRulesDir, pack);
    if (await fs.pathExists(sourcePath)) {
      await fs.copy(sourcePath, cursorRulesDir, {
        overwrite: true,
        filter: (src) => !src.includes('_template.mdc') // Don't copy templates to every folder
      });
      console.log(`  ${chalk.green('✓')} ${chalk.white(pack)} pack installed.`);
    }
  }

  // Copy global files like _sections.mdc if they exist
  const sectionsFile = path.join(packageRulesDir, '_sections.mdc');
  if (await fs.pathExists(sectionsFile)) {
    await fs.copy(sectionsFile, path.join(cursorRulesDir, '_sections.mdc'));
  }

  console.log(chalk.cyan.bold('\n✨ Success! Your Cursor is now powered up with rules and subagents.\n'));
  
  if (response.packs.includes('agents')) {
    console.log(chalk.gray('💡 Tip: Use /agent-name syntax to invoke subagents (e.g., /architect, /reviewer, /debugger)'));
  }
  
  if (response.packs.includes('sub-agents')) {
    console.log(chalk.gray('💡 Tip: Use /parent-agent:specialization for specialized sub-agents (e.g., /reviewer:performance, /reviewer:security)'));
  }
  
  if (response.packs.includes('orchestrator')) {
    console.log(chalk.gray('💡 Tip: Use the orchestrator to coordinate multiple agents for complex workflows'));
  }
  
  if (response.packs.includes('memory')) {
    console.log(chalk.gray('💡 Tip: The memory system learns from your usage and improves over time'));
  }
  
  if (response.packs.includes('intelligence')) {
    console.log(chalk.gray('💡 Tip: The intelligence system builds a knowledge graph of your codebase automatically'));
  }
}

async function performAudit() {
  const audit = { name: path.basename(targetDir), tech: [] };
  
  const pkgPath = path.join(targetDir, 'package.json');
  if (await fs.pathExists(pkgPath)) {
    const pkg = await fs.readJson(pkgPath);
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };
    
    if (deps.react) audit.tech.push('React');
    if (deps.next) audit.tech.push('Next.js');
    if (deps.vue) audit.tech.push('Vue');
    if (deps.typescript) audit.tech.push('TypeScript');
    if (deps.tailwindcss) audit.tech.push('Tailwind CSS');
  }

  return audit;
}

main().catch(console.error);
