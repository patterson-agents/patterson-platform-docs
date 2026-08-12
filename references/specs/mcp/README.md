# Model Context Protocol — staged 2026-08-11

## Provenance

| File | Source URL | Fetched | Completeness |
| --- | --- | --- | --- |
| `CHANGELOG-2026-07-28.md` | https://modelcontextprotocol.io/specification/2026-07-28/changelog.md | 2026-08-11 | COMPLETE, verbatim |
| `schema.json` | https://raw.githubusercontent.com/modelcontextprotocol/modelcontextprotocol/main/schema/2026-07-28/schema.json | 2026-08-11 (see caveat) | COMPLETE, but **copied from the 2026-08-10 local baseline**, not from today's fetch |
| `registry-server.schema.json` | https://raw.githubusercontent.com/modelcontextprotocol/registry/main/docs/reference/server-json/draft/server.schema.json | 2026-08-11 | COMPLETE, verbatim |

## Current protocol revision

**`2026-07-28`** — this is the latest released revision. It is what
`https://modelcontextprotocol.io/specification/latest` resolves to and what
`llms.txt` indexes. There is no revision string literally named "v2"; the
colloquial "MCP v2" refers to this revision, which is the first genuinely
breaking redesign (stateless, no `initialize`, no sessions, MRTR instead of
server-initiated requests).

`schema/draft/schema.json` on `main` is currently byte-for-byte equivalent in
size and structure to `schema/2026-07-28/schema.json` — i.e. no new draft
revision has diverged yet as of 2026-08-11.

## schema.json caveat (IMPORTANT)

`web_fetch` truncates at ~132 KB. The upstream `schema.json` is ~181 KB / 3963
lines / 155 `$defs`. Today's fetch returned only the first 2893 lines (118
`$defs`, ending mid-object inside `ResourceRequestParams`). The rules for this
task forbid `curl`/`wget`, so a complete verbatim re-fetch was not possible.

What was verified: the truncated portion of today's fetch matches the
2026-08-10 baseline exactly — same 4-space formatting, same 118 `$defs` in the
same order, same line-for-line prefix. The file here is the complete baseline
copy. Treat it as revision `2026-07-28` with high but not byte-proven
confidence. To get a byte-exact copy, clone the repo or use an HTTP client
without a response size cap.

## Registry / server manifest

`registry-server.schema.json` is the `server.json` format used by the official
MCP Registry (`https://registry.modelcontextprotocol.io`). It is JSON Schema
**draft-07** (not 2020-12) and is auto-generated from
`docs/reference/api/openapi.yaml`.

Required fields on `ServerDetail`: `name`, `description`, `version`.

- `name` — reverse-DNS with exactly one `/`, e.g. `io.github.user/weather`,
  pattern `^[a-zA-Z0-9.-]+/[a-zA-Z0-9._-]+$`, 3–200 chars.
- `description` — 1–100 chars (note the tight 100-char cap).
- `version` — max 255 chars, SHOULD be semver; ranges and `latest` are rejected.

Registry notes (from https://modelcontextprotocol.io/registry/about.md,
fetched 2026-08-11): registry is **in preview**; it does **not** accept private
servers — for internal Patterson servers the guidance is to run a private
registry implementing the official OpenAPI spec
(`docs/reference/api/openapi.yaml` in `modelcontextprotocol/registry`).
Namespace ownership is proven by DNS / GitHub / HTTP challenge.

## MCP Apps / UI extensions

MCP Apps is an **extension**, not core spec. Current spec directory upstream is
`specification/2026-01-26/apps.mdx` in `modelcontextprotocol/ext-apps`.
See `../mcp-apps/`. Key wire facts: tool declares
`_meta.ui.resourceUri` pointing at a `ui://` resource; host fetches the HTML
resource and renders it in a sandboxed iframe; app<->host talk over
postMessage JSON-RPC with `ui/`-prefixed methods plus shared `tools/call`;
`_meta.ui.csp` and `_meta.ui.permissions` control external origins and
capabilities.

Other official extensions as of 2026-08-11: `io.modelcontextprotocol/tasks`
(async execution), OAuth client credentials, enterprise-managed authorization.
See https://modelcontextprotocol.io/extensions/overview.md and
https://modelcontextprotocol.io/extensions/client-matrix.md.
