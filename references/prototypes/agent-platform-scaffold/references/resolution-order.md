# Resolution order

Where published content sits relative to everything else. This is the single most
important operational fact about distributing skills, and it is invisible until it
bites.

## Skills and agents: first found wins

Deduplicated by name, in this order:

1. `<project>/.github/skills/` — Copilot reads this first
2. `<project>/.agents/skills/`
3. `<project>/.claude/skills/` — Claude Code's project location
4. The same paths inherited from parent directories, for monorepos
5. `~/.copilot/skills/`
6. `~/.agents/skills/`
7. **Plugin skills** — where published content lands
8. Environment variables and custom directories

A local file therefore outranks a published skill of the same name, and it does so
silently. No warning, no error, nothing in any log. A centrally governed, evaluated,
approved skill loses to any file someone dropped in `.claude/skills/` last Tuesday.

Two things follow. Prefix every published name, which converts an invisible collision
into a visible choice. And build a scan across the estate for local names colliding with
published ones, because that is the only way to see it happen.

Frame collisions as forks. Under an innersource model a local override is a signal that
the standard is wrong, and the scan is a recruiting tool rather than an audit.

## Commands lose to skills

On a name clash between a command and a skill, the skill wins. Shipping both for the
same workflow leaves one unreachable.

## MCP servers: last loaded wins

Also deduplicated by name, but in the opposite direction:

1. `~/.copilot/mcp-config.json`
2. **Plugin MCP configurations** — a plugin definition takes precedence over an existing one
3. `--additional-mcp-config`

When two plugins declare the same server name, the last loaded wins, with a warning
naming every prior plugin that defined it. A later plugin can therefore capture an
earlier plugin's server, which is a materially worse failure than the skill case because
it redirects tool calls rather than merely shadowing text.

Reserve server names centrally and enforce in CI. The marketplace blueprint ships
`names/mcp-servers.json` and `reserve-names.yml` for exactly this.

## LSP servers

When two enabled servers claim the same file extension, the first registered wins and
the others never start. The plugin interface reports which one is active.

## Scope and trust

Restrictions tighten as reach widens:

- **Personal scope** — no restrictions
- **Project scope** — loads only after the workspace trust dialog, MCP servers go through
  per-server approval, and background monitors do not load at all
- **Managed scope** — administrator-installed and immutable to the user

This asymmetry is what makes the local-then-project-then-published contribution path
work. Iteration is cheap where reach is small.
