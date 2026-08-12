# Contributing to patterson-platform-docs

`patterson-platform-docs` follows the same contribution baseline as every Patterson
agent-configuration repository — conventional commits and the `[TBD]` marker for unknown
facts, as documented in
[`patterson-corp/CONTRIBUTING.md`](https://github.com/patterson-agents/patterson-corp/blob/main/CONTRIBUTING.md).
This repository has no plugins and no `verify-all.sh` gate, so the OpenSpec proposal workflow
and the plugin-specific conventions there do not apply here; this document describes what does.

## Adding reference material

This is a captured reference library, not an installable capability. When adding or refreshing
a captured document:

1. Open every captured file with the provenance header convention already used throughout
   `references/`: source URL, capture date, and a completeness note.
2. Add or update the directory's `_SOURCES.md` — a per-directory table of URL, local path,
   version, and status (`ok` / `partial` / `blocked`). See
   [`references/platforms/_SOURCES.md`](references/platforms/_SOURCES.md) for the convention,
   and [`REFERENCES.md`](REFERENCES.md) for the full index of `_SOURCES.md` locations.
3. Never overwrite a previously captured file that a decision elsewhere cites — add a new,
   dated capture alongside it instead, per `README.md` § Refreshing.
4. Keep analysis in `references/assessments/`, separate from the captured originals in
   `references/platforms/` and `references/specs/`.
5. Where a page cannot be captured (client-rendered shell, truncated schema, access
   restriction), record that fact in the directory's `_SOURCES.md` rather than silently
   omitting the file — see `references/specs/mcp/README.md` for a worked example.

## Adding an architecture decision record

New ADRs land under `decisions/`, alongside `patterson-corp/docs/decisions/`. State the context,
the decision, and the consequences; do not backfill a rationale that was not actually used at
the time.

## Commit style

Conventional commits: `docs(references): capture <area> as of <date>`,
`docs(assessments): add <topic> analysis`, `docs(decisions): record <decision>`.
