# Agent Plugins — staged 2026-08-11

## Provenance

| File | Source URL | Fetched | Completeness |
| --- | --- | --- | --- |
| `specification.md` | https://agent-plugins.org/specification.md | 2026-08-11 | COMPLETE. Copied from the 2026-08-10 baseline after confirming today's fetch is identical (same `Spec Version: 1.0.0`, same section numbering, same marker counts). |
| `manifest.md` | https://agent-plugins.org/manifest.md | 2026-08-10 baseline (re-confirmed 2026-08-11) | COMPLETE |
| `plugin.schema.json` | https://agent-plugins.org/schemas/1.0.0/plugin.schema.json | 2026-08-11 | COMPLETE, verbatim |
| `mcp.schema.json` | https://agent-plugins.org/schemas/1.0.0/mcp.schema.json | 2026-08-11 | COMPLETE, verbatim |

Backing repo: https://github.com/agentplugins/agent-plugins-spec
Governance: `GOVERNANCE.md` in that repo (Technical Charter).
Worked example package: https://github.com/agentplugins/agent-plugins-example
Also on the site (not staged): `/clients.md` (compatible client list, renders
via a `<CompatibleClients />` React component so the markdown is a JS shell),
`/schemas.md`, `/conformance.md`, `/client-implementation/*`.

## Version

**Spec version `1.0.0`, status "Working Draft".**

## Primary manifest: root `plugin.json`

Required: `$schema`, `name`. Nothing else.

- `$schema` MUST be exactly
  `https://agent-plugins.org/schemas/1.0.0/plugin.schema.json`.
- `name`: 1–64 chars, `[a-z0-9.-]`, must start and end alphanumeric, no `--`
  or `..`.

Schema is **closed** (`additionalProperties: false`): the only permitted
top-level keys are `$schema`, `name`, `version`, `description`, `author`,
`homepage`, `repository`, `license`, `keywords`, `extensions`. Unknown
top-level fields are a schema violation but non-fatal — clients report and
ignore them. Any *other* schema violation is fatal (reject the whole plugin).

Client-specific data goes under `extensions["com.reverse.domain"]` (object
values only) and client-specific files go in a top-level directory named
exactly for that namespace, e.g. `com.example.client/hooks/`.

## Fixed component locations (not configurable)

| Component | Location |
| --- | --- |
| Skills | `skills/<name>/SKILL.md` — immediate children only, no recursion |
| MCP servers | `mcp.json` at plugin root |

v1 defines exactly two component types. Commands, hooks, agents, rules, LSP
servers are explicitly **out of scope for v1**.

## `mcp.json`

Required: `$schema` (must be the `mcp.schema.json` 1.0.0 identifier, and its
version MUST match `plugin.json`'s) and `mcpServers`. Closed schema.
Each server is a closed union on `type`:

- `stdio` — required `type`, `command`; optional `args`, `env`, `cwd`
- `streamable-http` — required `type`, `url`; optional `headers`
- `sse` — legacy HTTP+SSE (MCP 2024-11-05), optional client support

Placeholder expansion is limited to `${PLUGIN_ROOT}` and `${PLUGIN_DATA}`, in
`args`, `env` values, and `cwd` only — **not** in `command`, `env` keys, `url`,
or headers. Single non-recursive textual pass. `env` MUST NOT define
`PLUGIN_ROOT`/`PLUGIN_DATA` (schema-enforced via `propertyNames`).

Clients that launch subprocesses MUST supply `PLUGIN_ROOT` and a writable,
update-surviving `PLUGIN_DATA`.

## Packaging / distribution

Directory-based. **No archive format, no size limits, no registry, no
marketplace manifest** are defined by this spec — distribution, installation,
permissions, and UX are explicitly left to each client.
