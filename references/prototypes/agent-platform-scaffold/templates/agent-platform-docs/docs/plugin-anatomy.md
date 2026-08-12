# Plugin anatomy

Walks the exemplar in `{{ORG}}/agent-plugins/plugins/conventions` file by file. Read the
plugin itself alongside this; the annotations there are the primary source and this page
is the narrative.

## The three rules that catch everyone

`.claude-plugin/` holds `plugin.json` and nothing else. Components placed inside it do
not load, silently.

A manifest path field replaces the default directory for `commands`, `agents`,
`workflows`, and `outputStyles`. The `skills` field is the exception that adds to the
default scan.

A plugin-root `CLAUDE.md` is never loaded as project context. Instructions that must
reach the model belong in a skill.

## Risk tiers

Not every component carries the same risk, and the review depth should differ.

| Component | Capability | Review |
| --- | --- | --- |
| Skills, commands | Context injection | Automated checks |
| Agents | Prompt plus tool allowlist | Allowlist diff |
| Hooks | Shell at lifecycle events | Human, always |
| MCP servers | Network, credentials, tool surface | Human, plus name reservation |

Hooks and MCP servers are the two that execute. The rest are a quality question.

## [TBD]

Extend with anything the exemplar does not yet demonstrate.
