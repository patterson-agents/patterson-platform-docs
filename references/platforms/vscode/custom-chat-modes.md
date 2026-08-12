<!--
source: https://code.visualstudio.com/docs/copilot/chat/chat-modes
fetched: 2026-08-11
status: complete (stub)
notes: REDIRECT. The legacy "custom chat modes" URL 302s to https://code.visualstudio.com/docs/agent-customization/custom-agents and serves the "Custom agents in VS Code" article verbatim (page title "Custom agents in VS Code"; meta-description: "Learn how to create custom agents (formerly custom chat modes)..."). Content is NOT duplicated here — see custom-agents.md in this directory.
-->

# Custom chat modes (legacy) — redirected to Custom agents

`https://code.visualstudio.com/docs/copilot/chat/chat-modes` now redirects to
`https://code.visualstudio.com/docs/agent-customization/custom-agents`.

The full content lives in [`custom-agents.md`](./custom-agents.md) in this directory. Do not treat this file as a second source.

Key migration facts recorded by the target page:

- Custom agents were previously known as **custom chat modes**. The functionality is unchanged; only the terminology was updated.
- Existing `.chatmode.md` files must be **renamed to `.agent.md`** to convert them to the custom agent format.
- Renamed files must be placed in a discovered location — `.github/agents` (workspace), `.claude/agents` (workspace, Claude format), `~/.copilot/agents` (user profile), or any extra path configured via the `chat.agentFilesLocations` setting.
- The old `chat.modeFilesLocations` setting is not mentioned anywhere in the current documentation; `chat.agentFilesLocations` is the setting the docs now point to for custom agent file discovery.
