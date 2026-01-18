#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const targetDir = process.cwd();
const rulesSourceDir = path.join(__dirname, '../.cursor/rules');
console.log('Installing Zen Agent Skills to:', targetDir);
const cursorRulesDir = path.join(targetDir, '.cursor/rules');
if (!fs.existsSync(cursorRulesDir)) fs.mkdirSync(cursorRulesDir, { recursive: true });
if (fs.existsSync(rulesSourceDir)) {
  fs.readdirSync(rulesSourceDir).forEach(file => {
    fs.copyFileSync(path.join(rulesSourceDir, file), path.join(cursorRulesDir, file));
    console.log(`  ✓ Copied ${file}`);
  });
  console.log('\nSuccess! Your Cursor rules are now optimized.');
} else {
  console.error('Error: Source rules not found in package.');
  process.exit(1);
}
