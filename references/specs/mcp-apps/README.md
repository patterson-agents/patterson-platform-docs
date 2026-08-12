# MCP Apps (UI extension) — staged 2026-08-11

## Provenance

| File | Source | Fetched | Completeness |
| --- | --- | --- | --- |
| `ext-apps-spec.md` | github.com/modelcontextprotocol/ext-apps `specification/2026-01-26/apps.mdx` (via 2026-08-10 baseline, pinned commit `92f46a5`) | 2026-08-10, re-checked 2026-08-11 | COMPLETE |
| `spec.types.ts` | same repo, TypeScript type source of truth | 2026-08-10 | COMPLETE |
| `patterns.md`, `csp-cors.md` | same repo | 2026-08-10 | COMPLETE |

Re-checked today against https://modelcontextprotocol.io/extensions/apps/overview.md
(fetched 2026-08-11, COMPLETE). **No drift**: the spec directory upstream is
still `specification/2026-01-26/`, the wire model is unchanged.

## Version

Extension spec revision **`2026-01-26`**. This is an *extension*, versioned
independently of the core MCP protocol revision (`2026-07-28`).

## Model (unchanged since baseline)

1. A tool declares `_meta.ui.resourceUri` → a `ui://` resource. Hosts may
   preload it before the tool is called.
2. Host fetches the UI resource (an HTML page, usually with JS/CSS inlined).
3. Host renders it in a sandboxed iframe. `_meta.ui.csp` controls which
   external origins may be loaded; `_meta.ui.permissions` requests extra
   capabilities (mic, camera, …).
4. App ↔ host speak a JSON-RPC dialect over `postMessage`: some methods shared
   with core MCP (`tools/call`), some new with a `ui/` prefix
   (`ui/initialize`, …).

Host support as of 2026-08-11: Claude, Claude Desktop, VS Code GitHub Copilot,
Microsoft 365 Copilot, Goose, Postman, MCPJam, Archestra.AI.
Client-side libs: `@modelcontextprotocol/ext-apps` (App + AppBridge),
`@mcp-ui/client`.

API docs / generated registry: https://apps.extensions.modelcontextprotocol.io/api/
