# References — patterson-platform-docs

This repository *is* a reference library, so its own `REFERENCES.md` does not add a new set of
URLs — it points at the convention that governs every capture inside it, and indexes where each
reference section's own source table lives.

> [!NOTE]
> This is a **reference library, not an authority.** The cited originals remain the source of
> truth; see `README.md` § Why this exists.

## The `_SOURCES.md` convention

Every captured directory carries its own `_SOURCES.md`: a table of source URL, local path,
version captured, and status (`ok` / `partial` / `blocked`). That file — not this one — is the
authoritative index for its directory's content.

| Section | `_SOURCES.md` | What it indexes |
|---|---|---|
| `references/platforms/` | [`references/platforms/_SOURCES.md`](references/platforms/_SOURCES.md) | Claude Code, GitHub Copilot, and VS Code agent-platform documentation captures |
| `references/specs/` | [`references/specs/_SOURCES.md`](references/specs/_SOURCES.md) | Open specifications — Agent Skills, Agent Plugins, MCP, MCP Apps, Stitch `DESIGN.md`, ACP, AHP, A2UI |
| `references/assessments/` | [`references/assessments/_SOURCES.md`](references/assessments/_SOURCES.md) | Everything read to produce the analysis documents in that directory |

`references/prototypes/` and `decisions/` do not carry their own `_SOURCES.md` — the former is
superseded work kept for traceability (its own nested `references/` explains itself), and the
latter is this repository's own ADR set, not a capture of an external source.

## Provenance header convention

Every captured file (not just each directory's `_SOURCES.md`) opens with its own source URL,
capture date, and completeness note. A page that could not be captured — client-rendered
shells, truncated schemas — is recorded as such rather than silently omitted; see
[`references/specs/mcp/README.md`](references/specs/mcp/README.md) for a worked example
(`schema.json` truncation).

## Adding a new reference

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for how to add or refresh a captured document while
keeping this convention intact.
