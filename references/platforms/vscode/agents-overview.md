<!--
source: https://code.visualstudio.com/docs/agents/overview
fetched: 2026-08-11
status: complete
notes: No redirect (canonical URL). Site nav chrome (top nav, left Documentation/Topics tree, "Copy as Markdown" widget, "On this page" list, footer social/legal links) stripped; article body only. Inline setting links normalized from garbled "chat.agent.enabled Open in VS Code Open in VS Code InsidersThis setting can be managed by your organization. Contact your administrator to change it.ORG" to backticked setting ID + [ORG] badge where org-managed. Tabbed section ("Agents window / Chat view / Browser / Copilot CLI / GitHub Copilot App") rendered flat in the source fetch — only the "Agents window" tab body was present in the HTML text; other tab panels are lazily rendered and were not returned. Page date: 8/5/2026.
-->

# Build with agents in VS Code

Visual Studio Code comes with AI agents built in. Describe a task in natural language and an agent plans the approach, edits files across your project, runs commands, and self-corrects until the work is done. Agents stay in the flow of how you already work, so you can focus on intent and review instead of typing every line.

Agents are free to start and built into VS Code: sign in with a GitHub account to use the free plan, choose from multiple agents and models, or bring your own model key and even run a local model offline. New to agents? Learn [how agents work](https://code.visualstudio.com/docs/agents/concepts/agents).

[/assets/docs/agents/agents-overview/agents-intro.mp4](https://code.visualstudio.com/assets/docs/agents/agents-overview/agents-intro.mp4)

## What you can do with agents

Agents handle real coding tasks end-to-end. A few common ones:

- **Plan before you code**: use the [Plan agent](https://code.visualstudio.com/docs/agents/run/planning) to produce a step-by-step implementation plan you can review and refine before any file changes.
- **Build new features**: describe what functionality you want and let the agent scaffold UI, wire up state, and update tests.
- **Prototype and explore variants**: spin up quick proofs of concept or generate multiple design variants of the same feature in parallel, then keep the one that works best.
- **Refactor at scale**: rename, restructure, or migrate code across the workspace, with the agent tracking what still needs to change.
- **Build and test web apps**: drive a running web app from chat to [verify behavior end-to-end in the integrated browser](https://code.visualstudio.com/docs/agents/guides/browser-agent-testing-guide).
- **Debug and fix failing tests**: point an agent at a stack trace or a red test and have it find the root cause and apply a fix.

Agents are the most autonomous of several AI surfaces in VS Code. For lighter-weight help, you can also use [chat](https://code.visualstudio.com/docs/chat/chat-overview), [inline chat](https://code.visualstudio.com/docs/chat/inline-chat), [inline suggestions](https://code.visualstudio.com/docs/editing/ai-powered-suggestions), and [smart actions](https://code.visualstudio.com/docs/editing/copilot-smart-actions).

## Get started

AI features are built into VS Code. Sign in with your GitHub account to enable them, then complete the [agents quickstart](https://code.visualstudio.com/docs/agents/quickstart). If you don't have a subscription, you're signed up for the free plan with monthly limits. To explore a longer scenario, follow the [agents tutorial](https://code.visualstudio.com/docs/agents/agents-tutorial).

Note

Make sure agents are enabled in VS Code settings (`chat.agent.enabled` [ORG]). If your organization has disabled agents, contact your GitHub organization admin.

> Normalization note: the inline setting badge rendered verbatim as `chat.agent.enabled  Open in VS Code  Open in VS Code Insiders  This setting can be managed by your organization. Contact your administrator to change it.ORG`

## Choose how you work with agents

In VS Code, the choice comes down to your approach and your scope. The Agents window is **agent-first** and works across **all your workspaces** from a single window, so it's ideal when you assign high-level tasks and orchestrate multiple agents in parallel across projects. The Chat view is **code-first** and is **scoped to the workspace** you have open, so it's ideal when you give the agent coding tasks and stay close to the code it produces.

If you want to work outside VS Code, you can also manage your agents from the terminal with the Copilot CLI, from the GitHub Copilot app, or directly in your browser.

Choose the experience that fits your current task and where you want to work. You can start a session in one and continue it in the other without losing context.

*(Tabs: Agents window | Chat view | Browser | Copilot CLI | GitHub Copilot App)*

**Agents window**

The [Agents window](https://code.visualstudio.com/docs/agents/run/agents-window) (Preview) is a dedicated window focused on chat as the primary interface. It works across all your workspaces from one window, so you can assign high-level tasks, evaluate the outcomes, and run and track multiple agents in parallel. The Agents window is optimized for **agent-first workflows**.

![Screenshot showing how to start a new agent session by selecting New at the top of the sidebar in the Agents window.](https://code.visualstudio.com/assets/docs/agents/agents-overview/agents-window-hero.png)

## Choose your agent and model

VS Code gives you flexibility instead of locking you into one agent or model. You choose:

- **Your agent harness**: run [Copilot, Claude, or Codex](https://code.visualstudio.com/docs/agents/run/agent-harnesses) on your machine, use the Local harness for the full VS Code tool and model ecosystem, or hand work to a cloud harness that runs remotely and opens a pull request.
- **Your model**: use a model hosted and provided by GitHub Copilot, or bring your own key to use a model from the provider or host of your choice, including a local model that runs offline.

Learn more about [agent harnesses](https://code.visualstudio.com/docs/agents/concepts/agent-harnesses) and [language models](https://code.visualstudio.com/docs/agent-customization/language-models). You set these choices, along with the permission level, when you start a session and can change them at any time. See how to [start a session](https://code.visualstudio.com/docs/agents/run/sessions/manage-sessions).

## Tailor agents to your codebase

Agents work best when they understand your project's conventions and have the right tools. VS Code gives you several ways to tailor agents so they produce code that fits your codebase and team practices from the start:

- **Set coding standards**: define project-wide rules and conventions with [custom instructions](https://code.visualstudio.com/docs/agent-customization/custom-instructions) so agents generate code in your style.

- **Automate repeatable tasks**: package multi-step workflows, scripts, and template files as [agent skills](https://code.visualstudio.com/docs/agent-customization/agent-skills), or capture a single reusable prompt in a [prompt file](https://code.visualstudio.com/docs/agent-customization/prompt-files).

- **Specialize the agent**: create [custom agents](https://code.visualstudio.com/docs/agent-customization/custom-agents) for personas or roles like code reviewer, security expert, or tester.

- **Connect external tools and data**: add [MCP servers](https://code.visualstudio.com/docs/agent-customization/mcp-servers) to reach databases and APIs, and use [hooks](https://code.visualstudio.com/docs/agent-customization/hooks) to run scripts at key points in an agent session.

To decide which option fits your goal, see [Customization concepts](https://code.visualstudio.com/docs/agents/concepts/customization). For setup steps and examples, see [Customize agent behavior in VS Code](https://code.visualstudio.com/docs/agent-customization/overview). You can also install [plugins](https://code.visualstudio.com/docs/agent-customization/agent-plugins) to add pre-packaged bundles of these customizations from the Marketplace.

## Trust and control

Agents can read and edit files, run terminal commands, and call external services. VS Code keeps you in control: approve or deny tool calls before they run, set a permission level that matches the autonomy you are comfortable with, and enable agent sandboxing to restrict file system and network access at the OS level. Learn more about [trust and safety](https://code.visualstudio.com/docs/agents/concepts/trust-and-safety) and [AI security](https://code.visualstudio.com/docs/agents/run/security).

Organizations can centrally manage which AI features, models, and tools are available across their teams. Admins define policies that control agent capabilities, restrict MCP servers or extensions, and enforce compliance requirements, so developers get a consistent, governed experience out of the box. Learn more about [enterprise AI policies](https://code.visualstudio.com/docs/enterprise/ai-settings).

## Next steps

- [Explore agent handoffs](https://code.visualstudio.com/docs/agents/agents-handoff-tutorial)
- [Learn agent best practices](https://code.visualstudio.com/docs/agents/best-practices)
- [Explore agent concepts](https://code.visualstudio.com/docs/agents/concepts/agents)

8/5/2026
