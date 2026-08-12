# VS Code — Agent Harnesses (normative extract)
Source: https://code.visualstudio.com/raw/docs/agents/run/agent-harnesses.md (fetched 2026-08-11)

## Session targets
| Target | Runs where | Code access |
|---|---|---|
| Local | VS Code extension host | current workspace |
| Copilot | Agent Host on your machine | folder or isolated git worktree |
| Claude | your machine (Claude Agent SDK) | folder or isolated git worktree |
| Codex | your machine | folder or isolated git worktree |
| Cloud | provider remote infra | GitHub repo + PR |

## Why this matters for Patterson
- **Claude harness inside VS Code**: `github.copilot.chat.claudeAgent.enabled`. Claude can authenticate/bill
  through the GitHub Copilot subscription — no separate Anthropic contract needed per seat.
- Claude harness exposes /agents /hooks /memory /init /pr-comments /review /security-review.
- Permission modes: Edit automatically | Request approval | Plan.
- DANGER setting to block via policy: `github.copilot.chat.claudeAgent.allowDangerouslySkipPermissions`
  (bypasses ALL permission checks).
- Handoff carries conversation history across harnesses -> a Patterson skill invoked in Copilot can
  continue in Claude. Argues for skills that are harness-agnostic in wording.
- Worktree isolation = Bypass Approvals, always, non-configurable. Does NOT restrict commands/network.
  Real containment requires agent sandboxing (/docs/agents/concepts/trust-and-safety.md#agent-sandboxing).
- `git.worktreeIncludeFiles` needed if agents require gitignored files (.env, deps).
- Cloud third-party agents gated by GitHub org policy:
  docs.github.com/en/copilot/how-tos/manage-your-account/manage-policies (third-party coding agents toggle).
- Copilot harness limits: only LOCAL MCP servers that require NO authentication.
  => Patterson MCP servers must run locally + unauthenticated to work in the Copilot harness.
