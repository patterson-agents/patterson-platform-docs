# Cross-vendor agent/plugin spec sources

Staged 2026-08-11 for the Patterson agent-platform project.
Fetch method: `web_fetch` only (no curl/wget/python, per task rules).

## Fetched and staged

| Source URL | Local path | Spec version / revision | Status |
| --- | --- | --- | --- |
| https://agent-plugins.org/specification.md | `agent-plugins/specification.md` | 1.0.0 (Working Draft) | COMPLETE — content identical to 2026-08-10 baseline |
| https://agent-plugins.org/manifest.md | `agent-plugins/manifest.md` | 1.0.0 | COMPLETE |
| https://agent-plugins.org/schemas/1.0.0/plugin.schema.json | `agent-plugins/plugin.schema.json` | 1.0.0 | COMPLETE, verbatim |
| https://agent-plugins.org/schemas/1.0.0/mcp.schema.json | `agent-plugins/mcp.schema.json` | 1.0.0 | COMPLETE, verbatim |
| https://agentskills.io/specification.md | `agent-skills/specification.md` | *(unversioned)* | COMPLETE — identical to baseline |
| https://agentskills.io/llms.txt | `agent-skills/llms.txt` | n/a | COMPLETE, verbatim |
| https://agentskills.io/client-implementation/adding-skills-support.md | summarized in `agent-skills/README.md` | n/a | fetched COMPLETE; key rules extracted, full text not staged |
| https://modelcontextprotocol.io/specification/2026-07-28/changelog.md | `mcp/CHANGELOG-2026-07-28.md` | 2026-07-28 | COMPLETE, verbatim |
| .../modelcontextprotocol/main/schema/2026-07-28/schema.json | `mcp/schema.json` | 2026-07-28 | **PARTIAL FETCH** — see caveat below; file on disk is the complete 2026-08-10 baseline copy |
| .../registry/main/docs/reference/server-json/draft/server.schema.json | `mcp/registry-server.schema.json` | draft (registry in preview) | COMPLETE, verbatim |
| https://modelcontextprotocol.io/registry/about.md | summarized in `mcp/README.md` | n/a | fetched COMPLETE |
| https://modelcontextprotocol.io/extensions/apps/overview.md | summarized in `mcp-apps/README.md` | ext spec 2026-01-26 | fetched COMPLETE |
| github.com/modelcontextprotocol/ext-apps `specification/2026-01-26/apps.mdx` | `mcp-apps/ext-apps-spec.md` + `spec.types.ts` + `patterns.md` + `csp-cors.md` | 2026-01-26 | COMPLETE (baseline copy, re-verified) |

## Fetched for comparison only (not staged here)

| Source URL | Purpose | Status |
| --- | --- | --- |
| https://docs.claude.com/en/docs/claude-code/plugins-reference.md | Claude Code `plugin.json` schema | fetched; response exceeded tool size cap, read the manifest-schema section (lines 409–540) |
| https://docs.claude.com/en/docs/claude-code/plugin-marketplaces.md | Claude Code `marketplace.json` schema | fetched; response exceeded tool size cap, read the schema sections (lines 120–230) |
| https://modelcontextprotocol.io/llms.txt | index; confirms `2026-07-28` is latest | COMPLETE |
| https://agent-plugins.org/llms.txt | index | COMPLETE (72 KB, read in part) |

## Failures / blocked

| Source URL | Problem |
| --- | --- |
| `.../schema/2026-07-28/schema.json` | `web_fetch` truncates at ~132 KB. Upstream is ~181 KB / 3963 lines / 155 `$defs`; got 2893 lines / 118 `$defs`, cut mid-object. Rules forbid curl/wget, so no complete verbatim copy today. Verified the returned prefix matches the baseline exactly. |
| `.../schema/draft/schema.json` | Same truncation. Confirmed same size/shape as the `2026-07-28` schema — no diverged draft revision exists yet. |
| https://api.github.com/repos/modelcontextprotocol/modelcontextprotocol/contents/schema | Returned an **empty body** (likely rate-limited/blocked unauthenticated). Could not enumerate schema revision directories. |
| https://agentskills.io/clients.md | Returns a **JS shell** — a React `ClientShowcase` component. No prose spec content. |
| https://agent-plugins.org/clients.md | Same — renders via `<CompatibleClients />`, so the client-conformance matrix is not available as text. Could not determine which clients formally claim Agent Plugins 1.0.0 conformance. |

## Drift vs the 2026-08-10 baseline

Baseline: `.tmp/staging/scaffold/agent-platform-scaffold/templates/agent-platform-docs/references/specs/`

| Spec | Baseline pin | Today | Drift |
| --- | --- | --- | --- |
| agent-skills | site, 2026-08-10 | site, 2026-08-11 | **None** |
| agent-plugins | site, 2026-08-10 | site, 2026-08-11 | **None** |
| mcp | b25c087, schema 2026-07-28 | schema 2026-07-28 | **None detected** (prefix-verified only, see caveat) |
| mcp-apps | ext-apps 92f46a5, spec 2026-01-26 | spec 2026-01-26 | **None** |
| acp | zed-industries 878dfd2, schema v2 | not re-fetched | not checked (out of scope this pass) |
| ahp | microsoft 101f873 | not re-fetched | not checked |
| a2ui | a2ui-project 1a07c47, v0.9.1 | not re-fetched | not checked |

New material staged today that the baseline did not have:
- `agent-plugins/plugin.schema.json` and `agent-plugins/mcp.schema.json`
  (baseline had prose only, no machine-readable schemas)
- `mcp/CHANGELOG-2026-07-28.md`
- `mcp/registry-server.schema.json` (MCP Registry `server.json` format)
