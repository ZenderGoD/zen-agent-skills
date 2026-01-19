# Claude Code Skills Descriptions

This document provides a summary of the skills available in the Claude Code plugins repository.

| Skill Name | Description |
| :--- | :--- |
| **Claude Opus 4.5 Migration** | Migrate prompts and code from Claude Sonnet 4.0, Sonnet 4.5, or Opus 4.1 to Opus 4.5. Handles model string updates and prompt adjustments. |
| **Frontend Design** | Create distinctive, production-grade frontend interfaces with high design quality, avoiding generic AI aesthetics. |
| **Writing Hookify Rules** | Guidance on creating and configuring Hookify rules, including syntax and patterns. |
| **Skill Reviewer** | Quality review for new or modified skills to ensure they follow best practices. |
| **Agent Development** | Guidance on creating agents, subagents, and understanding agent structure, tools, and best practices. |
| **Command Development** | Guidance on creating custom slash commands, defining arguments, and implementing user interaction patterns. |
| **Hook Development** | Guidance for creating and implementing Claude Code plugin hooks (PreToolUse, PostToolUse, Stop, etc.). |
| **MCP Integration** | Guidance for integrating Model Context Protocol (MCP) servers (SSE, stdio, etc.) into Claude Code plugins. |
| **Plugin Settings** | Documentation on the `.local.md` pattern for storing plugin-specific configuration and state. |
| **Plugin Structure** | Guidance on plugin directory layout, manifest configuration (`plugin.json`), and architecture best practices. |
| **Skill Development** | Best practices for creating, organizing, and improving skills for Claude Code plugins. |
| **Skill Creator** | A guide for creating effective skills that extend Claude's capabilities with specialized knowledge. |

---

## Detailed Skill Descriptions

### Claude Opus 4.5 Migration
**Description:** Migrate prompts and code from Claude Sonnet 4.0, Sonnet 4.5, or Opus 4.1 to Opus 4.5. Use when the user wants to update their codebase, prompts, or API calls to use Opus 4.5. Handles model string updates and prompt adjustments for known Opus 4.5 behavioral differences. Does NOT migrate Haiku 4.5.

### Frontend Design
**Description:** Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, or applications. Generates creative, polished code that avoids generic AI aesthetics.

### Writing Hookify Rules
**Description:** This skill should be used when the user asks to "create a hookify rule", "write a hook rule", "configure hookify", "add a hookify rule", or needs guidance on hookify rule syntax and patterns.

### Skill Reviewer
**Description:** Use this agent when the user has created or modified a skill and needs quality review, asks to "review my skill", "check skill quality", "improve skill description", or wants to ensure skill follows best practices. Trigger proactively after skill creation.

### Agent Development
**Description:** This skill should be used when the user asks to "create an agent", "add an agent", "write a subagent", "agent frontmatter", "when to use description", "agent examples", "agent tools", "agent colors", "autonomous agent", or needs guidance on agent structure, system prompts, triggering conditions, or agent development best practices for Claude Code plugins.

### Command Development
**Description:** This skill should be used when the user asks to "create a slash command", "add a command", "write a custom command", "define command arguments", "use command frontmatter", "organize commands", "create command with file references", "interactive command", "use AskUserQuestion in command", or needs guidance on slash command structure, YAML frontmatter fields, dynamic arguments, bash execution in commands, user interaction patterns, or command development best practices for Claude Code.

### Hook Development
**Description:** This skill should be used when the user asks to "create a hook", "add a PreToolUse/PostToolUse/Stop hook", "validate tool use", "implement prompt-based hooks", "use ${CLAUDE_PLUGIN_ROOT}", "set up event-driven automation", "block dangerous commands", or mentions hook events (PreToolUse, PostToolUse, Stop, SubagentStop, SessionStart, SessionEnd, UserPromptSubmit, PreCompact, Notification). Provides comprehensive guidance for creating and implementing Claude Code plugin hooks with focus on advanced prompt-based hooks API.

### MCP Integration
**Description:** This skill should be used when the user asks to "add MCP server", "integrate MCP", "configure MCP in plugin", "use .mcp.json", "set up Model Context Protocol", "connect external service", mentions "${CLAUDE_PLUGIN_ROOT} with MCP", or discusses MCP server types (SSE, stdio, HTTP, WebSocket). Provides comprehensive guidance for integrating Model Context Protocol servers into Claude Code plugins for external tool and service integration.

### Plugin Settings
**Description:** This skill should be used when the user asks about "plugin settings", "store plugin configuration", "user-configurable plugin", ".local.md files", "plugin state files", "read YAML frontmatter", "per-project plugin settings", or wants to make plugin behavior configurable. Documents the .claude/plugin-name.local.md pattern for storing plugin-specific configuration with YAML frontmatter and markdown content.

### Plugin Structure
**Description:** This skill should be used when the user asks to "create a plugin", "scaffold a plugin", "understand plugin structure", "organize plugin components", "set up plugin.json", "use ${CLAUDE_PLUGIN_ROOT}", "add commands/agents/skills/hooks", "configure auto-discovery", or needs guidance on plugin directory layout, manifest configuration, component organization, file naming conventions, or Claude Code plugin architecture best practices.

### Skill Development
**Description:** This skill should be used when the user wants to "create a skill", "add a skill to plugin", "write a new skill", "improve skill description", "organize skill content", or needs guidance on skill structure, progressive disclosure, or skill development best practices for Claude Code plugins.

### Skill Creator
**Description:** Guide for creating effective skills. This skill should be used when users want to create a new skill (or update an existing skill) that extends Claude's capabilities with specialized knowledge, workflows, or tool integrations.
