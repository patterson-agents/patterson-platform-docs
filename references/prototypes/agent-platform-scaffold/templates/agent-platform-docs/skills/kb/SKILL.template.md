---
name: {{PLATFORM_PREFIX}}-knowledge-base
description: Navigate and cite the {{ORG}} platform knowledge base. Use when a task needs an authoritative answer about agent platform standards (agent skills, agent plugins, MCP, MCP Apps, AHP, ACP, A2UI), when writing or reviewing anything that must comply with a committed specification, or when deciding whether a spec snapshot needs re-pinning. Covers where each spec lives, how provenance works, and the update discipline.
---

# The platform knowledge base

This repository is the single documentation home for the agent platform. Every
directory answers one question:

- `docs/` explains how the platform works and why it is shaped this way.
- `decisions/` records what was decided, one ADR per decision, append only.
- `guides/` walks a person through doing something, start to finish.
- `examples/` shows working artifacts that run as checked out.
- `templates/` holds starting points meant to be copied and owned.
- `references/specs/` holds committed snapshots of external standards.

## Using the committed specs

Specs live at `references/specs/<name>/`, one directory per standard, always with a
`README.md` as the primary document and JSON schemas alongside where the standard
publishes them. Cite the committed snapshot, not the live site, so answers stay
reproducible against what the platform was actually built to.

`references/specs/SOURCES.md` is the provenance table: upstream URL, pinned commit,
fetch date. If it is not in that table, it is not a committed spec.

## Update discipline

Snapshots are re-fetched deliberately, by a person, when a version bump matters to
the platform. There is no sync job, on purpose. When re-pinning: fetch, diff against
the committed copy, update the SOURCES.md row, and note anything that changes
platform behavior in a new ADR under `decisions/`.

## What not to add

Do not commit generated HTML, whole vendored repositories, or documents that need
compilation to read. The vendor import script stages full clones under `./vendor`
for local exploration; that directory is gitignored and never committed.
