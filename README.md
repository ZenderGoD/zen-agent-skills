# 🚀 Zen Agent Skills

**Turn Cursor into a Senior Engineering Team.**

`zen-agent-skills` is a collection of **55+ professionally engineered AI instructions** (Cursor Rules) and **8 specialized Subagents** that transform your Cursor IDE into a complete development team with experts in architecture, security, design, performance, and quality assurance.

## ✨ What This Package Does

This package gives you:

- **🎯 Specialized AI Agents** - 8 subagents you can invoke with `/name` syntax for context-isolated deep work
- **⚡ Always-On Rules** - 55+ cursor rules that automatically enforce best practices while you code
- **🚀 Performance Optimization** - 49 rules from Vercel Engineering for React/Next.js optimization
- **🎨 Design Excellence** - Guidelines to create distinctive, production-grade interfaces (no "AI slop")
- **🔒 Security Auditing** - Automatic checks for vulnerabilities, secrets, and OWASP Top 10 issues
- **✅ Quality Assurance** - Automated verification, testing, and code review capabilities
- **📦 Zero-Config Setup** - One command installs everything you need based on your project type

## 🛠 What You Can Do With This Package

### 🎯 Invoke Specialized Experts

**Subagents run in their own context windows - perfect for parallel work and deep-dive tasks:**

```bash
/architect Plan the database schema for a multi-tenant SaaS application
/reviewer Review this PR and check for bugs, performance issues, and best practices
/security Audit this payment module for vulnerabilities
/debugger Investigate why this test is failing - here's the error stack trace
/verifier Confirm the authentication flow actually works end-to-end
/test-runner Run tests and fix any failures
/ux-designer Review this UI for accessibility issues and design improvements
/frontend-pro Create a distinctive landing page with a luxury aesthetic
```

### ⚡ Get Instant Expert Guidance

**Personas work as always-on Cursor Rules - triggered automatically while you code:**

- Ask `@architect how should I structure this feature?` - Get architecture guidance
- Ask `@reviewer is this code good?` - Get code quality feedback
- Ask `@security is this secure?` - Get security audit
- Ask `@ux improve my UI accessibility` - Get design improvements

### 🚀 Automatically Optimize Performance

**49 performance rules automatically apply Vercel Engineering best practices:**

- ✅ Eliminate async waterfalls (Critical priority)
- ✅ Optimize bundle size (tree-shaking, code splitting)
- ✅ Optimize server-side performance (caching, parallel fetching)
- ✅ Reduce unnecessary re-renders (memoization, dependency optimization)
- ✅ Optimize rendering (content visibility, hoisting)
- ✅ JavaScript micro-optimizations (Set/Map lookups, early exits)

### 🎨 Create Distinctive Designs

**Avoid generic "AI slop" aesthetics and create memorable interfaces:**

- Unique typography pairings (no Inter/Roboto)
- Bold aesthetic directions (minimalist, maximalist, retro-futuristic, etc.)
- Creative spatial compositions (asymmetry, overlap, grid-breaking)
- High-impact animations and micro-interactions
- Professional attention to detail

### 🔒 Security-First Development

**Automatic security checks for:**

- OWASP Top 10 vulnerabilities (Injection, XSS, Broken Auth, etc.)
- Hardcoded secrets and API keys
- Authentication and authorization flaws
- Input validation issues
- Security misconfigurations
- Data encryption at rest and in transit

### ✅ Quality Assurance Automation

**Built-in verification and testing:**

- **Verifier** - Skeptically validates that completed work actually functions
- **Test Runner** - Proactively runs tests and fixes failures
- **Code Reviewer** - Comprehensive PR-style code audits
- **Debugger** - Root cause analysis for errors and failures

## 📦 Quick Installation

**One command installs everything you need:**

```bash
npx github:ZenderGoD/zen-agent-skills
```

**Or with pnpm:**

```bash
pnpm add -D github:ZenderGoD/zen-agent-skills
pnpm zen-agent-skills
```

The installer will:
1. ✅ Audit your project (detects React, Next.js, TypeScript, etc.)
2. ✅ Show an interactive menu of available skill packs
3. ✅ Install selected packs to your `.cursor/` directory
4. ✅ Provide usage tips and examples

## 🧠 Subagents (Context-Isolated Experts)

**Subagents are specialized AI agents that run in their own context windows. Perfect for complex, multi-step tasks that need focused attention.**

| Command | Agent | What It Does | Best For |
| :--- | :--- | :--- | :--- |
| `/architect` | **System Architect** | Designs scalable architectures, proposes patterns, analyzes trade-offs | Planning new features, system design questions, refactoring |
| `/reviewer` | **Code Reviewer** | Rigorous PR-style reviews, finds bugs, checks best practices | Code audits, pre-commit reviews, quality checks |
| `/security` | **Security Auditor** | Scans for vulnerabilities, checks OWASP Top 10, audits auth flows | Security reviews, payment modules, sensitive data handling |
| `/ux-designer` | **UX Designer** | Reviews UI for accessibility, visual hierarchy, mobile experience | Design critiques, accessibility audits, user experience improvements |
| `/debugger` | **Debug Specialist** | Root cause analysis, fixes errors, verifies solutions | Investigating failures, stack trace analysis, bug fixing |
| `/verifier` | **Skeptical Validator** | Verifies implementations actually work, tests edge cases | Validating completed features, end-to-end testing, QA checks |
| `/test-runner` | **Test Automation** | Runs tests automatically, fixes failures, maintains coverage | Continuous testing, test-driven development, CI/CD prep |
| `/frontend-pro` | **Design Expert** | Creates distinctive interfaces, avoids generic aesthetics | Landing pages, component design, creative UI work |

### When to Use Subagents

✅ **Use Subagents** (`/agent-name`) when:
- You need context isolation for long research tasks
- Running multiple workstreams in parallel (e.g., security audit + code review)
- The task requires specialized expertise across many steps
- You want independent verification of work
- You need focused attention without cluttering main chat

✅ **Use Personas** (`@persona`) when:
- You want always-on enforcement while coding
- The task completes in one shot
- You don't need a separate context window
- Quick guidance during active development

## 🎯 Multi-Agent Personas (Cursor Rules)

**Personas work as always-on Cursor Rules - they automatically trigger based on your code and prompts.**

| Trigger | Persona | What It Does | Example Usage |
| :--- | :--- | :--- | :--- |
| `@architect` | **System Architect** | Provides high-level architecture guidance | `@architect how should I structure this microservice?` |
| `@reviewer` | **Code Reviewer** | Reviews code for quality and best practices | `@reviewer check this component for issues` |
| `@security` | **Security Officer** | Audits code for security vulnerabilities | `@security is this authentication secure?` |
| `@ux` | **UX Designer** | Improves UI/UX and accessibility | `@ux review my form for accessibility issues` |

## 🚀 Available Skill Packs

### 1. Subagents Pack (8 agents)
**Context-isolated specialists for parallel work and deep dives.**
- `/architect` - System architecture planning with SOLID principles
- `/reviewer` - Comprehensive code quality audits
- `/security` - OWASP Top 10 vulnerability assessments
- `/ux-designer` - Accessibility (WCAG 2.1) and design reviews
- `/debugger` - Root cause analysis and error fixing
- `/verifier` - Work validation and edge case testing
- `/test-runner` - Automated test execution and fixes
- `/frontend-pro` - Distinctive UI design (anti-"AI slop")

### 2. Personas Pack (4 rules)
**Always-on Cursor Rules for instant expert guidance.**
- `@architect` - Architecture guidance triggered by keywords
- `@reviewer` - Code review prompts for quality checks
- `@security` - Security checks for vulnerabilities
- `@ux` - UX improvements for accessibility and design

### 3. Vercel Performance Pack (49 rules)
**Production-grade React/Next.js optimization rules from Vercel Engineering.**
- **Eliminating Waterfalls** (Critical) - Parallel data fetching, proper async handling
- **Bundle Size Optimization** - Tree-shaking, code splitting, dynamic imports
- **Server-side Performance** - Caching strategies, parallel fetching, serialization
- **Client-side Optimization** - SWR deduplication, event listeners, storage caching
- **Re-render Optimization** - Memoization, dependency optimization, transitions
- **Rendering Performance** - Content visibility, JSX hoisting, SVG optimization
- **JavaScript Micro-optimizations** - Set/Map lookups, early exits, iteration optimization

### 4. Claude Power Pack (2 rules)
**Creative frontend guidelines and meta-rules for better instructions.**
- **Claude Frontend** - Distinctive, production-grade UI design that avoids generic "AI slop"
- **Meta-Rules** - Guidance on writing your own perfect Cursor rules and instructions

### 5. Design & Deploy Pack (2 rules)
**UI auditing and instant deployments.**
- **Web Design Audit** - Audits code against 100+ Vercel Web Interface Guidelines
- **Vercel Deploy** - Instant deployments with claimable URLs

## 💡 Real-World Use Cases

### Example 1: Building a New Feature
```bash
# 1. Plan the architecture
/architect Design the database schema and API structure for a user dashboard

# 2. Build the feature (main chat)
# ... code implementation ...

# 3. Get code review
/reviewer Review this dashboard component for bugs and best practices

# 4. Security audit
/security Check this authentication flow for vulnerabilities

# 5. Verify it works
/verifier Confirm the dashboard loads data correctly and handles errors
```

### Example 2: Fixing a Bug
```bash
# 1. Debug the issue
/debugger Investigate why users can't log in - here's the error: [stack trace]

# 2. Fix implementation (main chat)
# ... apply fix ...

# 3. Run tests
/test-runner Run all authentication tests and fix any failures

# 4. Verify the fix
/verifier Confirm login works for all user types including edge cases
```

### Example 3: Design Review
```bash
# 1. Get UX audit
/ux-designer Review this checkout page for accessibility and UX issues

# 2. Improve design
/frontend-pro Redesign this landing page with a luxury aesthetic

# 3. Final review
/ux-designer Final accessibility check before deployment
```

## 🎓 How It Works

### Subagents (`.cursor/agents/`)
- Each subagent is a markdown file with YAML frontmatter
- Defined in `.cursor/agents/` directory
- Can be invoked with `/name` syntax or explicitly requested
- Run in isolated context windows
- Can work in parallel with other agents

### Rules (`.cursor/rules/`)
- Each rule is a `.mdc` file with YAML frontmatter
- Defined in `.cursor/rules/` directory
- Automatically triggered based on file patterns (`globs`) and keywords
- Always active when working on matching files
- Provide instant guidance without explicit invocation

## 🛠 Development

### Adding Your Own Skills

1. **Fork this repo**
2. **For Subagents**: Add `.md` files to `.cursor/agents/` with YAML frontmatter
3. **For Rules**: Add `.mdc` files to `.cursor/rules/` in the appropriate pack folder
4. **Update CLI**: Modify `bin/cli.js` if you add new packs
5. **Test locally**: Run `npx .` to test the installer

### Project Structure

```
zen-agent-skills/
├── .cursor/
│   ├── agents/          # Subagents (8 agents)
│   │   ├── architect.md
│   │   ├── reviewer.md
│   │   └── ...
│   └── rules/           # Cursor Rules (55+ rules)
│       ├── performance/ # 49 performance rules
│       ├── personas/    # 4 persona rules
│       ├── claude/      # 2 Claude rules
│       ├── deploy/      # 1 deploy rule
│       └── design/      # 1 design rule
├── bin/
│   └── cli.js           # Interactive installer
└── package.json
```

## 📊 Package Statistics

- **8 Subagents** - Context-isolated specialists
- **55+ Cursor Rules** - Always-on best practices
- **6 Skill Packs** - Organized by category
- **100+ Design Guidelines** - Vercel Web Interface Guidelines
- **Zero Config** - Automatic project detection

## 🤝 Contributing

Contributions are welcome! Whether it's:
- Adding new subagents
- Creating new rules
- Improving existing agents
- Fixing bugs
- Improving documentation

Please feel free to open issues or submit pull requests.

## 📝 License

MIT License - Use freely in your projects.

## 🙏 Acknowledgments

- **Vercel Engineering** - Performance best practices and guidelines
- **Claude/Anthropic** - Frontend design guidelines and agent framework
- **Cursor Team** - Subagents system and rules framework

---

**Made with ❤️ to make your development workflow faster, smarter, and more enjoyable.**
