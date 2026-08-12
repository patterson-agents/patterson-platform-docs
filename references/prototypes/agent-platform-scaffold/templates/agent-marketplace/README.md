# agent-marketplace

The published plugin catalog for `{{ORG}}`. Adding this marketplace is the only setup
step an engineer performs, and everything the platform offers becomes discoverable from
it.

```sh
# Claude Code
claude plugin marketplace add {{ORG}}/agent-marketplace

# Copilot CLI
copilot plugin marketplace add {{ORG}}/agent-marketplace
```

Both harnesses resolve `.claude-plugin/marketplace.json`, so one manifest serves both.

## This repository is generated

It holds a manifest, two name registries, and the workflows that maintain them. Plugin
content lives in `{{ORG}}/agent-plugins`, `{{ORG}}/agent-presets`, and the department
repositories.

Nobody opens a pull request here to ship something. Contributions land in a source
repository and `assemble.yml` picks them up. Keeping the platform team out of the
publication path is the difference between a registry people contribute to and one they
route around.

## Why every repository is in one organization

Organization sync resolves a private plugin source in two cases: a `github.com` source
sharing this repository's owner, or a source on a GitHub Enterprise host with the GHE
App installed. A department repository in a different organization cannot be referenced
and would have to be vendored in by CI instead.

That makes the organization boundary an architectural decision. Retrofitting it means
moving repositories.

## The name registries

`names/plugin-slugs.json` and `names/mcp-servers.json` are checked in rather than held
in a database, so they survive any tooling and can be reviewed like code.

Slugs matter because a published name is what `enabledPlugins` stores and what users
type. A `renames` map can migrate one, but managed settings are read-only to Claude
Code, so anyone enabled through policy keeps seeing the rename notice until an
administrator edits the entry.

Server names matter more. MCP resolves last-wins and a later plugin captures an earlier
plugin's server with only a warning, which redirects tool calls rather than merely
shadowing text. `reserve-names.yml` blocks that before it reaches anyone.

## Adding a plugin

- Put the plugin in a source repository you own
- Make CI green there, which means `claude plugin validate --strict` passes
- Reserve the slug, and the server name if the plugin ships MCP
- The next assembly run adds the entry

Start from `{{ORG}}/plugin-template` if this is your first one.
