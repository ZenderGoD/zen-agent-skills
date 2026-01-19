# Multi-Agent Orchestration System

The orchestrator coordinates multiple agents to work together on complex tasks, sharing context and collaborating.

## How It Works

1. **Workflow Definition**: Define multi-step workflows in YAML
2. **Agent Coordination**: Orchestrator manages agent execution order
3. **Context Sharing**: Results from one agent automatically available to others
4. **Parallel Execution**: Independent agents run simultaneously
5. **Conditional Logic**: Workflows adapt based on results

## Sub-Sub-Agent System

Hierarchical agents for specialized sub-tasks:
- /reviewer:performance - Performance-focused review
- /reviewer:security - Security-focused review
- /architect:database - Database architecture
- /architect:api - API architecture

Sub-sub-agents inherit parent context and specialize further.
