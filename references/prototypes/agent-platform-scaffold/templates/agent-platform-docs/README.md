# {{MARKETPLACE_NAME}} platform knowledge base

Documentation home for the {{ORG}} agent platform. Plain markdown, readable in any
file browser or on GitHub without compilation. A VitePress site can be layered on
later without restructuring, because VitePress serves this layout as is.

## Map

- `docs/` — how the platform works: plugin anatomy, token budgets, resolution order.
- `decisions/` — architecture decision records, append only.
- `guides/` — task walkthroughs, such as shipping your first plugin.
- `examples/` — working artifacts that run as checked out.
- `templates/` — starting points meant to be copied out and owned.
- `references/specs/` — committed snapshots of the external standards the platform
  builds against: agent-skills, agent-plugins, mcp, mcp-apps, ahp, acp, a2ui. See
  `references/specs/SOURCES.md` for provenance and the re-pin discipline.
- `skills/` — this repository's own skills, including the knowledge base skill that
  teaches agents to navigate and cite everything above.

## Two rules

Documentation must be readable without a build step. Specs are re-pinned by hand
when it matters, never by cron.
