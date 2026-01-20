# 🚀 Quick Start Guide

## How to Use This Package

### For End Users (Installing the AI OS)

Since this package isn't published to npm yet, use the GitHub installation:

```bash
# Navigate to your project
cd /path/to/your/project

# Install from GitHub
npx github:ZenderGoD/zen-agent-skills
```

This runs the interactive installer which copies the AI OS files to your project's `.cursor/` directory.

---

### For Testing Locally (This Repository)

If you're working on this repository and want to test the installer:

```bash
# In this repository root
npx .
```

This runs `bin/cli.js` in the current directory, allowing you to test the installer locally.

---

### For Using the AI OS Commands

Once installed in a project, use the OS engine:

```bash
# Initialize the AI OS directories
npx zen-agent-skills os setup

# Build codebase intelligence
npx zen-agent-skills os build-graph

# Generate visual dashboard
npx zen-agent-skills os generate-dashboard

# Open the dashboard
open .cursor/analytics/dashboard.html

# See all available commands
npx zen-agent-skills os help
```

---

## How It Actually Runs

### 1. **Installation Phase**
```
User runs: npx github:ZenderGoD/zen-agent-skills
     ↓
Executes: bin/cli.js
     ↓
Shows: Interactive menu of skill packs
     ↓
Copies: Selected files to user's .cursor/ directory
     ↓
Result: Cursor IDE is now "modded"
```

### 2. **Runtime Phase (Inside Cursor)**
```
User opens a .tsx file
     ↓
Cursor reads: .cursor/rules/performance/*.mdc
     ↓
Matches globs: ["**/*.tsx"]
     ↓
Injects: Performance rules into AI's system prompt
     ↓
AI writes code: Following those rules automatically
     ↓
AI executes: npx zen-agent-skills os record-success (behind the scenes)
     ↓
Result: Pattern saved to .cursor/memory/memory.json
```

### 3. **Agent Invocation**
```
User types: /reviewer:performance Review this component
     ↓
Cursor reads: .cursor/agents/reviewer:performance.md
     ↓
Loads as: System prompt for this chat
     ↓
AI analyzes: With specialized performance focus
     ↓
AI executes: npx zen-agent-skills os predict-impact "file.tsx"
     ↓
Result: Detailed performance report with blast radius analysis
```

---

## Testing the AI OS Locally

### Step 1: Test the Installer
```bash
cd /Users/bishalbanerjee/vercel-skills
npx .
```

Select some packs and verify they copy to `.cursor/`.

### Step 2: Test the OS Engine
```bash
# Setup the OS
npx . os setup

# Build intelligence graph
npx . os build-graph

# Check health
npx . os health-check

# Generate dashboard
npx . os generate-dashboard
open .cursor/analytics/dashboard.html
```

### Step 3: Test Dynamic Spawning
```bash
# Spawn a specialist
npx . os spawn-agent "architect" "threejs" "Expert in Three.js 3D rendering"

# Check if it was created
ls .cursor/agents/architect:threejs.md
```

---

## Publishing to npm

If you want `npx zen-agent-skills` to work directly:

```bash
# Login to npm
npm login

# Publish
npm publish

# Then users can run
npx zen-agent-skills
```

---

## Current Usage (Before Publishing)

**Recommended command for users**:
```bash
npx github:ZenderGoD/zen-agent-skills
```

**For local testing in this repo**:
```bash
npx .
```

**For OS engine commands**:
```bash
npx zen-agent-skills os <command>  # After npm publish
# OR
npx . os <command>  # For local testing
```
