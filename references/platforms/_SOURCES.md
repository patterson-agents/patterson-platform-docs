# Staged Platform Documentation — Source Manifest

- **Fetched:** 2026-08-11
- **Staged to:** `/workspaces/code/github.com/patterson-agents/.tmp/staging/docs/`
- **Method:** `web_fetch` against the vendors' machine-readable endpoints. Claude Code pages were
  retrieved via their `.md` variants (`https://code.claude.com/docs/en/<page>.md`), discovered from
  `https://code.claude.com/docs/llms.txt`. GitHub and Microsoft pages were retrieved from the
  rendered docs sites and transcribed to markdown.
- Every staged file carries an HTML-comment provenance header with its source URL, fetch date, and
  completeness status.

## Status legend

| Status | Meaning |
| --- | --- |
| `ok` | Full page captured, verified to end on real trailing content. |
| `partial` | Page captured but a portion is missing (lazy-rendered tab panels, tool-selector tabs, or reconstructed sections). See the file's own header for the specific gap. |
| `blocked` | Could not be retrieved. |

---

## A. Claude Code — `docs/claude-code/`

Index source: `https://code.claude.com/docs/llms.txt`

| # | Source URL | Local file | Status |
| --- | --- | --- | --- |
| 1 | https://code.claude.com/docs/en/plugin-marketplaces.md | `claude-code/plugin-marketplaces.md` | ok |
| 2 | https://code.claude.com/docs/en/plugins.md | `claude-code/plugins.md` | ok |
| 3 | https://code.claude.com/docs/en/plugins-reference.md | `claude-code/plugins-reference.md` | ok |
| 4 | https://code.claude.com/docs/en/discover-plugins.md | `claude-code/discover-plugins.md` | ok |
| 5 | https://code.claude.com/docs/en/plugin-dependencies.md | `claude-code/plugin-dependencies.md` | ok |
| 6 | https://code.claude.com/docs/en/plugin-relevance.md | `claude-code/plugin-relevance.md` | ok |
| 7 | https://code.claude.com/docs/en/settings.md | `claude-code/settings.md` | ok |
| 8 | https://code.claude.com/docs/en/server-managed-settings.md | `claude-code/server-managed-settings.md` | ok |
| 9 | https://code.claude.com/docs/en/admin-setup.md | `claude-code/admin-setup.md` | ok |
| 10 | https://code.claude.com/docs/en/permissions.md | `claude-code/permissions.md` | ok |
| 11 | https://code.claude.com/docs/en/security.md | `claude-code/security.md` | ok |
| 12 | https://code.claude.com/docs/en/authentication.md | `claude-code/authentication.md` | ok |
| 13 | https://code.claude.com/docs/en/managed-mcp.md | `claude-code/managed-mcp.md` | ok |
| 14 | https://code.claude.com/docs/en/mcp.md | `claude-code/mcp.md` | ok |
| 15 | https://code.claude.com/docs/en/skills.md | `claude-code/skills.md` | ok |
| 16 | https://code.claude.com/docs/en/sub-agents.md | `claude-code/sub-agents.md` | ok |
| 17 | https://code.claude.com/docs/en/agents.md | `claude-code/agents.md` | ok |
| 18 | https://code.claude.com/docs/en/hooks.md | `claude-code/hooks.md` | ok |
| 19 | https://code.claude.com/docs/en/commands.md | `claude-code/commands.md` | ok |
| 20 | https://code.claude.com/docs/en/cli-reference.md | `claude-code/cli-reference.md` | ok |
| 21 | https://code.claude.com/docs/en/env-vars.md | `claude-code/env-vars.md` | ok |
| 22 | https://code.claude.com/docs/en/claude-directory.md | `claude-code/claude-directory.md` | ok |
| 23 | https://code.claude.com/docs/en/memory.md | `claude-code/memory.md` | ok |
| 24 | https://code.claude.com/docs/en/features-overview.md | `claude-code/features-overview.md` | ok |
| 25 | https://code.claude.com/docs/en/third-party-integrations.md | `claude-code/third-party-integrations.md` | ok |
| 26 | https://code.claude.com/docs/en/github-enterprise-server.md | `claude-code/github-enterprise-server.md` | ok |
| 27 | https://code.claude.com/docs/en/monitoring-usage.md | `claude-code/monitoring-usage.md` | ok |
| 28 | https://code.claude.com/docs/en/analytics.md | `claude-code/analytics.md` | ok |

### Claude Code notes

- `hooks.md` was silently truncated to roughly half length by the fetch tool on first attempt; the
  staged copy is the full 3,379-line document, re-fetched and byte-verified.
- Every Claude Code `.md` page is served with a 3-line "Documentation Index" banner at the top.
  It was preserved verbatim rather than stripped.
- `env-vars.md` is only ~466 lines but ~363 KB — it is a single wide reference table with very long
  lines. Budget context accordingly before reading it whole.
- **Cleanup caveat:** ten zero-value stub files named `claude-code/raw-*.md` remain in the directory.
  They are one-line `SUPERSEDED ... safe to delete` markers left over from the fetch pipeline. The
  sandbox mount returns `Operation not permitted` on `rm`, so they must be deleted from the host.
  They are not documentation and should be ignored.

### Claude Code pages deliberately not fetched

Present in `llms.txt` but out of scope for this pass — fetch on demand:
`overview`, `quickstart`, `changelog`, `how-claude-code-works`, `context-window`,
`prompt-caching`, `permission-modes`, `sessions`, `common-workflows`, `best-practices`,
`platforms`, all `desktop-*`, `vs-code`, `jetbrains`, `chrome`, `github-actions*`,
`gitlab-ci-cd`, `slack`, `claude-tag`, `agent-view`, `agent-teams`, `workflows`, `worktrees`,
`artifacts`, `channels*`, `routines`, `headless`, all `agent-sdk/*`, all `claude-apps-gateway*`,
all `llm-gateway*`, all `self-hosted-environments*`, `amazon-bedrock`,
`claude-platform-on-aws`, `google-vertex-ai`, `microsoft-foundry`, `network-config`,
`corporate-launcher`, `devcontainer`, `sandboxing`, `sandbox-environments`,
`cloud-environments`, `costs`, `data-usage`, `zero-data-retention`, `legal-and-compliance`,
`feature-availability`, `auto-mode-config`, `troubleshoot*`, `errors`, `glossary`,
all `whats-new/*`.

---

## B. GitHub Copilot — `docs/copilot/`

Base: `https://docs.github.com/en`

| # | Source URL | Local file | Status |
| --- | --- | --- | --- |
| 1 | https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-policies | `copilot/org-policies.md` | ok |
| 2 | https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-enterprise-policies | `copilot/enterprise-policies.md` | ok |
| 3 | https://docs.github.com/en/copilot/concepts/policies | `copilot/policies-concepts-cascade.md` | ok |
| 4 | https://docs.github.com/en/copilot/reference/policy-conflicts | `copilot/policy-conflicts.md` | ok |
| 5 | https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions | `copilot/repository-custom-instructions.md` | ok |
| 6 | https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-organization-instructions | `copilot/org-custom-instructions.md` | ok |
| 7 | https://docs.github.com/en/copilot/concepts/prompting/response-customization | `copilot/response-customization-precedence.md` | partial (web-UI tab only) |
| 8 | https://docs.github.com/en/copilot/reference/custom-instructions-support | `copilot/custom-instructions-support-matrix.md` | ok |
| 9 | https://docs.github.com/en/copilot/how-tos/configure-custom-instructions-in-your-ide/add-repository-instructions-in-your-ide | `copilot/ide-custom-instructions-and-agents-md.md` | partial (VS Code tab captured; JetBrains / Eclipse / Xcode tabs not transcribed) |
| 10 | https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/customize-the-agent-environment | `copilot/copilot-setup-steps.md` | ok |
| 11 | https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/customize-the-agent-firewall | `copilot/coding-agent-firewall.md` | ok |
| 12 | https://docs.github.com/en/copilot/concepts/agents/cloud-agent/access-management | `copilot/coding-agent-access-management.md` | ok |
| 13 | https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents | `copilot/custom-agents-org-and-enterprise.md` | ok |
| 14 | https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/prepare-for-custom-agents | `copilot/prepare-org-for-custom-agents.md` | ok |
| 15 | https://docs.github.com/en/copilot/concepts/agents/about-agent-skills | `copilot/agent-skills.md` | ok |
| 16 | https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/exclude-content-from-copilot <br> + https://docs.github.com/en/copilot/concepts/context/content-exclusion | `copilot/content-exclusion.md` | ok (two pages merged into one file) |
| 17 | https://docs.github.com/en/copilot/reference/customization-cheat-sheet | `copilot/customization-cheat-sheet.md` | ok |
| 18 | https://docs.github.com/en/copilot/building-copilot-extensions/setting-up-copilot-extensions?tool=skillsets | `copilot/copilot-extensions-and-skillsets.md` | partial (tool-selector tabs; only the skillsets tab captured) |

### Copilot notes

- There is **no enterprise-level custom-instructions page**. Enterprise-scope instruction content is
  expressed through *custom agents* in the `/agents/` directory of a designated organization's
  `.github-private` repository. This is a real asymmetry vs. the policy cascade.
- `.copilotignore` is not the mechanism; content exclusion is configured in repo/org/enterprise
  settings UI and inherited downward as read-only.

---

## C. Visual Studio Code — `docs/vscode/`

Base: `https://code.visualstudio.com`

**Important:** the VS Code docs site was restructured in 2026. Several well-known URLs now redirect.
`/docs/setup/enterprise` → `/docs/enterprise/overview`; `/docs/copilot/customization/*` →
`/docs/agent-customization/*`; `/docs/copilot/chat/chat-agent-mode` → `/docs/chat/chat-overview`.
There is no longer a standalone "agent mode" or "chat modes" article.

| # | Source URL | Local file | Status |
| --- | --- | --- | --- |
| 1 | https://code.visualstudio.com/docs/enterprise/overview (from /docs/setup/enterprise) | `vscode/enterprise-overview.md` | ok |
| 2 | https://code.visualstudio.com/docs/enterprise/policies | `vscode/enterprise-policies.md` | ok |
| 3 | https://code.visualstudio.com/docs/enterprise/ai-settings | `vscode/enterprise-ai-settings.md` | ok |
| 4 | https://code.visualstudio.com/docs/enterprise/extensions | `vscode/extensions-enterprise.md` | ok |
| 5 | https://code.visualstudio.com/docs/configure/settings | `vscode/settings.md` | ok |
| 6 | https://code.visualstudio.com/docs/configure/profiles | `vscode/profiles.md` | ok |
| 7 | https://code.visualstudio.com/docs/agent-customization/overview | `vscode/agent-customization-overview.md` | ok |
| 8 | https://code.visualstudio.com/docs/agent-customization/custom-instructions | `vscode/custom-instructions.md` | ok |
| 9 | https://code.visualstudio.com/docs/agent-customization/custom-agents | `vscode/custom-agents.md` | ok |
| 10 | https://code.visualstudio.com/docs/agent-customization/prompt-files | `vscode/prompt-files.md` | ok |
| 11 | https://code.visualstudio.com/docs/agent-customization/agent-skills | `vscode/agent-skills.md` | ok |
| 12 | https://code.visualstudio.com/docs/agent-customization/agent-plugins | `vscode/agent-plugins.md` | partial (two sections reconstructed from the upstream docs repo; explicitly fenced in-file) |
| 13 | https://code.visualstudio.com/docs/agent-customization/mcp-servers | `vscode/mcp-servers.md` | ok |
| 14 | https://code.visualstudio.com/docs/agents/reference/mcp-configuration | `vscode/mcp-configuration-reference.md` | ok |
| 15 | https://code.visualstudio.com/docs/agents/overview | `vscode/agents-overview.md` | partial (lazy-rendered tab panels not captured) |
| 16 | https://code.visualstudio.com/docs/chat/chat-overview | `vscode/chat-overview.md` | ok |
| 17 | https://code.visualstudio.com/docs/copilot/chat/chat-agent-mode (redirects) | `vscode/chat-agent-mode.md` | ok (redirect stub pointing at `chat-overview.md`) |
| 18 | https://code.visualstudio.com/docs/copilot/chat/chat-modes (redirects) | `vscode/custom-chat-modes.md` | ok (redirect stub pointing at `custom-agents.md`) |

### VS Code notes

- VS Code "profiles" (`/docs/configure/profiles`) are a per-user customization-set feature and are
  **not** a governance boundary. Do not confuse them with macOS configuration profiles
  (`.mobileconfig`), which are the actual policy delivery mechanism.

---

## Not fetched / blocked

Nothing in scope was hard-blocked. No page returned a JS shell that defeated extraction. The only
gaps are the three `partial` entries above (tab-panel content on docs.github.com and
code.visualstudio.com that is rendered client-side per selected tab).
