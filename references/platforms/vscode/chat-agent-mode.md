<!--
source: https://code.visualstudio.com/docs/copilot/chat/chat-agent-mode
fetched: 2026-08-11
status: complete (stub - redirect)
notes: The legacy /docs/copilot/chat/chat-agent-mode URL 301/302-redirects to https://code.visualstudio.com/docs/chat/chat-overview ("Use chat in VS Code"). That is the same page staged as chat-overview.md, so the content is NOT duplicated here. There is no longer a standalone "agent mode" article; the 2026 docs restructure split its content across /docs/agents/* (agent behavior, harnesses, approvals) and /docs/chat/* (chat mechanics).
-->

# Chat agent mode (redirected)

**This page no longer exists as a standalone article.**

- Requested URL: `https://code.visualstudio.com/docs/copilot/chat/chat-agent-mode`
- Final redirect target: `https://code.visualstudio.com/docs/chat/chat-overview` — "Use chat in VS Code"

The redirect target is identical to staging item #3, so its content lives in a single file rather than being duplicated:

- **Content file:** `./chat-overview.md`

## Where the old "agent mode" content went

The 2026 docs restructure retired `/docs/copilot/...` and split the former agent-mode article across these successor pages:

| Topic | New location |
| --- | --- |
| What agents do, enabling agents, `chat.agent.enabled` | [/docs/agents/overview](https://code.visualstudio.com/docs/agents/overview) — staged as `./agents-overview.md` |
| Chat mechanics (sending requests, context, reviewing changes) | [/docs/chat/chat-overview](https://code.visualstudio.com/docs/chat/chat-overview) — staged as `./chat-overview.md` |
| Tool approvals and permission levels | [/docs/agents/run/approvals](https://code.visualstudio.com/docs/agents/run/approvals) |
| Using tools in an agent session | [/docs/agents/run/tools](https://code.visualstudio.com/docs/agents/run/tools) |
| Agent harness selection (Copilot / Claude / Codex / Local / cloud) | [/docs/agents/run/agent-harnesses](https://code.visualstudio.com/docs/agents/run/agent-harnesses) |
| Trust, safety, sandboxing | [/docs/agents/concepts/trust-and-safety](https://code.visualstudio.com/docs/agents/concepts/trust-and-safety) |
| Reviewing and reverting AI edits, checkpoints | [/docs/agents/run/review-code-edits](https://code.visualstudio.com/docs/agents/run/review-code-edits) |
| Organization/enterprise policy control of AI features | [/docs/enterprise/ai-settings](https://code.visualstudio.com/docs/enterprise/ai-settings), [/docs/enterprise/policies](https://code.visualstudio.com/docs/enterprise/policies) |
| Settings reference (all AI settings) | [/docs/agents/reference/ai-settings](https://code.visualstudio.com/docs/agents/reference/ai-settings) |

## Key gating fact carried over verbatim

From [/docs/agents/overview](https://code.visualstudio.com/docs/agents/overview), the "Get started" section:

> Note
>
> Make sure agents are enabled in VS Code settings (`chat.agent.enabled` [ORG]). If your organization has disabled agents, contact your GitHub organization admin.

The `chat.agent.enabled` setting rendered on the live page with the org-managed badge: "This setting can be managed by your organization. Contact your administrator to change it." — normalized here to `[ORG]`.
