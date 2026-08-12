# VS Code — Agent Plugins (normative extract)
Source: https://code.visualstudio.com/raw/docs/agent-customization/agent-plugins.md (fetched 2026-08-11)

## THE KEY FINDING: VS Code auto-detects FOUR plugin formats
| Format | Manifest path | Plugin root token |
|---|---|---|
| Agent Plugins 1.0 | `plugin.json` w/ `$schema: https://agent-plugins.org/schemas/1.0.0/plugin.schema.json` | `${PLUGIN_ROOT}`, `${PLUGIN_DATA}` |
| Copilot | `plugin.json` (no $schema) | `${PLUGIN_ROOT}` **OR** `${CLAUDE_PLUGIN_ROOT}` |
| Claude | `.claude-plugin/plugin.json` | `${CLAUDE_PLUGIN_ROOT}` |
| Legacy OpenPlugin | `.plugin/plugin.json` | `${PLUGIN_ROOT}` |

Copilot format is the DEFAULT when no other marker is found.
=> Copilot format accepting BOTH root tokens is the portability seam.

## Portable vs client-specific components
| Capability | Portable (Agent Plugins 1.0) | Client-specific |
|---|---|---|
| MCP servers | YES | |
| Skills | YES | |
| Agents | | YES |
| Hooks | | YES |
| Slash commands | | YES |

VS Code IGNORES `extensions` client-extension namespaces and their directories; loads only portable skills + MCP config.

## plugin.json (Agent Plugins 1.0) fields
Required: `$schema`, `name`. Optional: `version`, `description`, `author{name,email,url}`,
`homepage`, `repository`, `license`, `keywords[]`, `extensions{}` (reverse-domain keyed).
Skills auto-discovered from `skills/`; MCP from `mcp.json`. Component paths are NOT listed in manifest.

## MCP config file by format
- Agent Plugins 1.0 -> `mcp.json` at plugin root (portable format)
- Copilot AND Claude -> `.mcp.json` at plugin root, top-level `mcpServers` object
Token expansion applies in: command, args, cwd, env, envFile, url, headers.

## Hooks file by format
- Claude -> `hooks/hooks.json`
- Copilot -> `hooks.json` at plugin root
VS Code PARSES Claude `matcher` syntax but currently IGNORES matcher values (hooks run on every event).
Events: SessionStart, UserPromptSubmit, PreToolUse, PostToolUse, PreCompact, SubagentStart, SubagentStop, Stop.
PreToolUse conflict resolution: most restrictive wins (deny > ask > allow).

## Marketplaces
Setting: `chat.plugins.marketplaces` (array). Defaults: github/copilot-plugins, github/awesome-copilot.
Accepted refs: `owner/repo` shorthand | https git URL ending .git | scp-style ssh | `file:///` URI. Private repos supported (falls back to direct clone).
**Marketplace schema is Claude's**: "For the full marketplace plugin schema, see the Claude Code plugin marketplace documentation."
Enable/disable feature: `chat.plugins.enabled`.
Local unmanaged plugins: `chat.pluginLocations` = { "/abs/path": true|false }.

## CONVERGENCE POINT — workspace recommendations
VS Code reads workspace plugin recommendations from **`.claude/settings.json` OR `.github/copilot/settings.json`**,
using the SAME field names as Claude Code:
  - `extraKnownMarketplaces` : { "<name>": { "source": { "source": "github", "repo": "org/repo" } } }
  - `enabledPlugins` : { "<plugin>@<marketplace>": true }
=> One settings shape serves Claude Code AND VS Code/Copilot. Major simplification for the layered model.

## Enterprise
"Enterprise admins can centrally control which plugins and marketplaces are available."
-> /docs/enterprise/ai-settings.md#manage-agent-plugins-and-marketplaces  [TODO: FETCH THIS]

## Naming / troubleshooting constraints (hard requirements)
- Agent Plugins 1.0 names: lowercase letters, numbers, hyphens, periods.
- Legacy Copilot plugin names: lowercase letters, numbers, hyphens (NO periods).
- SKILL.md frontmatter `name` MUST be plain kebab-case, NO namespace prefixes (`test-runner`, not `myorg/test-runner`).
  Invalid names cause the skill to be SILENTLY SKIPPED.
- Skill directory name MUST match frontmatter `name`.
- Version bumps required in BOTH plugin.json and the marketplace.json entry.
- CLI-installed plugins discovered from `~/.copilot/installed-plugins/<marketplace>/<plugin>/` (`_direct` bucket for git-URL installs).
