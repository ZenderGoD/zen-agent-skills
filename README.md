# 🚀 Zen Agent Skills

**Turn Cursor into a Senior Engineering Team.**

`zen-agent-skills` is a collection of 55+ professionally engineered AI instructions (Cursor Rules) and **8 specialized Subagents** that optimize your development workflow for performance, security, design, and architecture.

## 🛠 Features

- **Subagents Pack**: 8 specialized agents with their own context windows for parallel work (`/architect`, `/reviewer`, `/debugger`, `/verifier`, etc.).
- **Multi-Agent Personas**: Summon specialized experts directly in your chat using `@architect`, `@reviewer`, `@security`, and `@ux` (Cursor Rules).
- **Vercel Performance Pack**: 49 rules derived from Vercel Engineering's best practices for React and Next.js.
- **Claude Power Pack**: Creative frontend guidelines that avoid "AI slop" and meta-rules for writing better instructions.
- **Interactive Installer**: Smart CLI that audits your project and lets you pick the skills you need.
- **Design & Deploy**: Instant UI audits and one-click Vercel deployments.

## 📦 Quick Installation

You don't need to install anything globally. Just run this in the root of any project:

```bash
npx github:ZenderGoD/zen-agent-skills
```

Or if you use `pnpm`:

```bash
pnpm add -D github:ZenderGoD/zen-agent-skills
pnpm zen-agent-skills
```

## 🧠 Subagents (Context-Isolated Experts)

**Subagents run in their own context windows, perfect for parallel work and deep-dive tasks.**

| Command | Agent | Expertise | Model |
| :--- | :--- | :--- | :--- |
| `/architect` | **System Architect** | Scalability, SOLID, Design Patterns, Architecture Planning | inherit |
| `/reviewer` | **Code Reviewer** | PR Reviews, Logic errors, Performance, Code Quality | fast |
| `/security` | **Security Auditor** | OWASP Top 10, Vulnerabilities, Secrets detection | inherit |
| `/ux-designer` | **UX Designer** | Accessibility (a11y), Visual hierarchy, WCAG Compliance | inherit |
| `/debugger` | **Debug Specialist** | Root cause analysis, Error fixing, Stack trace analysis | fast |
| `/verifier` | **Skeptical Validator** | Verify completed work, End-to-end testing, Edge cases | fast |
| `/test-runner` | **Test Automation** | Proactive test running, Fix failures, Coverage analysis | fast |
| `/frontend-pro` | **Design Expert** | Distinctive interfaces, Anti-"AI slop" aesthetics | inherit |

### When to Use Subagents vs Rules

- **Use Subagents** (`/agent-name`) when:
  - You need context isolation for long research tasks
  - Running multiple workstreams in parallel
  - The task requires specialized expertise across many steps
  - You want independent verification of work

- **Use Personas** (`@persona`) when:
  - You want always-on enforcement while coding
  - The task completes in one shot
  - You don't need a separate context window

## 🎯 Multi-Agent Personas (Cursor Rules)

| Trigger | Persona | Expertise |
| :--- | :--- | :--- |
| `@architect` | **System Architect** | Scalability, SOLID, Design Patterns, Data Flow |
| `@reviewer` | **Senior Reviewer** | PR Reviews, Logic errors, Performance, Clean Code |
| `@security` | **Security Officer** | OWASP Top 10, Secrets detection, Auth auditing |
| `@ux` | **UX Designer** | Accessibility (a11y), Visual hierarchy, Micro-interactions |

## 🚀 Available Skill Packs

### 1. Subagents Pack (8 agents)
**Context-isolated specialists for parallel work and deep dives.**
- `/architect` - System architecture planning
- `/reviewer` - Code quality audits
- `/security` - Vulnerability assessments
- `/ux-designer` - Accessibility & design reviews
- `/debugger` - Root cause analysis
- `/verifier` - Work validation & testing
- `/test-runner` - Automated test execution
- `/frontend-pro` - Distinctive UI design

### 2. Personas Pack (4 rules)
**Always-on Cursor Rules for instant expert guidance.**
- `@architect` - Architecture guidance
- `@reviewer` - Code review prompts
- `@security` - Security checks
- `@ux` - UX improvements

### 3. Vercel Performance (49 rules)
- Eliminating Waterfalls (Critical)
- Bundle Size Optimization
- Server-side Performance
- Re-render Optimization

### 4. Claude Power Pack
- **Claude Frontend**: distinctive, production-grade UI design.
- **Meta-Rules**: Guidance on writing your own perfect Cursor rules.

### 5. Design & Deploy
- **Web Design Audit**: Audits code against 100+ Vercel UI rules.
- **Vercel Deploy**: Instant deployments with claimable URLs.

## 🛠 Development

To add your own skills:
1. Fork this repo.
2. Add `.mdc` files to `.cursor/rules/` in the appropriate pack folder.
3. Update `bin/cli.js` if you add new packs.
4. Run `npx .` to test locally.

## License
MIT
