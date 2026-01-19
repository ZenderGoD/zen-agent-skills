# 🚀 Zen Agent Skills

**Turn Cursor into a Senior Engineering Team.**

`zen-agent-skills` is a collection of 55+ professionally engineered AI instructions (Cursor Rules) that optimize your development workflow for performance, security, design, and architecture.

## 🛠 Features

- **Multi-Agent Personas**: Summon specialized experts directly in your chat using `@architect`, `@reviewer`, `@security`, and `@ux`.
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

## 🧠 Multi-Agent Personas

| Trigger | Persona | Expertise |
| :--- | :--- | :--- |
| `@architect` | **System Architect** | Scalability, SOLID, Design Patterns, Data Flow |
| `@reviewer` | **Senior Reviewer** | PR Reviews, Logic errors, Performance, Clean Code |
| `@security` | **Security Officer** | OWASP Top 10, Secrets detection, Auth auditing |
| `@ux` | **UX Designer** | Accessibility (a11y), Visual hierarchy, Micro-interactions |

## 🚀 Available Skill Packs

### 1. Vercel Performance (49 rules)
- Eliminating Waterfalls (Critical)
- Bundle Size Optimization
- Server-side Performance
- Re-render Optimization

### 2. Claude Power Pack
- **Claude Frontend**: distinctive, production-grade UI design.
- **Meta-Rules**: Guidance on writing your own perfect Cursor rules.

### 3. Design & Deploy
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
