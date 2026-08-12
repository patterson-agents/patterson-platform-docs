# Naming

Cheap to decide now, expensive to change later, because published slugs are effectively
permanent and skills lose collisions silently.

| Entity | Pattern | Example | Why |
| --- | --- | --- | --- |
| Marketplace | `{{MARKETPLACE_NAME}}` | `acme` | Appears in every install command. Avoid reserved or impersonating names, which are re-checked on every load |
| Core plugin | `{{PLATFORM_PREFIX}}-<domain>` | `acme-conventions` | The prefix keeps it out of the collision space with local files, which win silently |
| Preset | `{{PLATFORM_PREFIX}}-preset-<role>` | `acme-preset-backend` | Distinguishes curated bundles from content plugins in the picker |
| Department plugin | `<dept>-<domain>` | `vet-pims-tooling` | Ownership legible from the name, so no central arbitration is needed |
| Skill inside a plugin | `<verb>-<noun>` | `review-migration` | Namespaced automatically as `plugin:skill`, so the skill name itself stays readable |
| MCP server | `{{PLATFORM_PREFIX}}-<service>` | `acme-billing` | Last-wins capture makes a global reservation necessary |
| Source repository | `<scope>-agent-plugins` | `vet-agent-plugins` | Discoverable by search across the org, and obvious in the marketplace `source` field |

## Reserve before publishing

Register generic names in `names/plugin-slugs.json` before publishing under them, so a
future standard is not blocked by whoever got there first. Server names go in
`names/mcp-servers.json` and are enforced by CI, because a collision there is a silent
capture rather than a visible error.

## Skill descriptions

Not a naming rule, but the same category of decision. Claude decides whether to load a
skill by matching the request against the `description`, so write it as a trigger
condition rather than a summary. "Use when the user asks to review a database migration"
performs far better than "Database migration review helper".
