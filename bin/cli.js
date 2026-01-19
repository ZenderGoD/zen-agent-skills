#!/usr/bin/env node
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import prompts from 'prompts';
import chalk from 'chalk';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const targetDir = process.cwd();
const packageRulesDir = path.join(__dirname, '../.cursor/rules');
const packageAgentsDir = path.join(__dirname, '../.cursor/agents');

async function main() {
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
      { title: 'Personas Pack (@architect, @reviewer, @security, @ux) - Cursor Rules', value: 'personas', selected: true },
      { title: 'Vercel Performance Pack (49 rules)', value: 'performance', selected: audit.tech.includes('React') },
      { title: 'Claude Power Pack (Aesthetics & Meta-rules)', value: 'claude', selected: true },
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

  // Install Rules Packs
  for (const pack of response.packs) {
    if (pack === 'agents') continue; // Already handled above
    
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
