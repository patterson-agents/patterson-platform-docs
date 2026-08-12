---
name: agent-platform-scaffold
description: "Generate the full multi-repository structure for an internal agent platform, including a private plugin marketplace, core plugin monorepo, curated presets, department repositories, a container seed, and the knowledge base that explains them. Use whenever the user wants an agent skills hub, an internal plugin registry or marketplace, an innersource skills platform, a Claude Code or Copilot CLI plugin catalog, or asks how to structure repositories for agent skills across teams. Trigger on phrases like 'skills studio', 'plugin marketplace', 'agent platform', 'internal skills registry', 'scaffold the marketplace repo', or 'innersource skills', and on any request to organize agent skills across more than one team or repository. Also use to add a department repository to an existing platform, generate a plugin from the house template, render the platform explorer, or audit a layout against the reference architecture."
---

# Agent platform scaffold

Generates the repository topology for an internal agent platform: a marketplace that
distributes plugins, source repositories that produce them, presets that bundle them,
and the container and documentation repositories that make the whole thing usable.

The output is a set of real repositories with working manifests, CI workflows, and
README files, not a diagram. Every template in `templates/` is a directory that can be
copied into place and committed.

## When to reach for this

Use it for the platform layer: the repositories, their boundaries, and how they
reference each other. For authoring an individual plugin or skill, use Anthropic's
`plugin-dev` plugin (`create-plugin`, `skill-creator`). This skill scaffolds the
container those live in.

## The constraint that drives the design

Read `references/platform-constraints.md` before generating anything. One rule shapes
the whole topology: when an organization marketplace syncs through GitHub, a private
plugin source resolves only when it shares the marketplace repository's owner.

That makes the GitHub organization boundary an architectural decision rather than an
administrative one. Department repositories in a separate org cannot be referenced;
their plugin folders would have to be vendored into the marketplace by CI instead.
Confirm the org layout with the user before scaffolding, because retrofitting it later
means moving repositories.

## Workflow

### 1. Establish variables

Every template uses `{{DOUBLE_BRACE}}` placeholders. Resolve them before copying.
`templates/README.md` holds the full table with derivation defaults. The four that
have no sensible default and must be asked for:

- `{{ORG}}` the GitHub organization every platform repository lives in
- `{{PLATFORM_PREFIX}}` the prefix on every published plugin and skill name
- `{{MARKETPLACE_NAME}}` what users type after `@` when installing
- `{{OWNER_NAME}}` the team named as owner in the marketplace manifest

`{{PLATFORM_PREFIX}}` and `{{MARKETPLACE_NAME}}` are effectively permanent. A published
plugin's name is what `enabledPlugins` stores and what users type, and while a `renames`
map can migrate one, managed settings are read-only to Claude Code, so anyone enabled
through policy keeps seeing a rename notice until an administrator edits the entry.
Say this out loud before accepting the values.

### 2. Choose the topology

Three variants, described with their trade-offs in `references/topology-variants.md`:

| Variant  | Shape                                          | Choose when                                             |
| -------- | ---------------------------------------------- | ------------------------------------------------------- |
| hybrid   | Core monorepo plus per-department repositories | Default. Consistent exemplars, distributed ownership     |
| monorepo | Everything in one repository                    | Phase zero, or fewer than about five contributors        |
| polyrepo | One repository per plugin                       | Strong isolation matters more than a readable exemplar   |

Hybrid is the default because it matches the usual trajectory from a central team
toward innersource contribution without a migration partway through.

### 3. Select blueprints

`templates/_MANIFEST.yaml` lists every blueprint, what it emits, which placeholders it
consumes, and which other blueprints it references. Read it rather than guessing at the
tree. Not every platform needs all of them: `skills-studio` and `agent-seed` are
worth deferring, and the reasons are in their README templates.

### 4. Generate

```sh
scripts/scaffold --list
scripts/scaffold agent-marketplace ./out --org acme-agents --prefix acme --marketplace acme
scripts/scaffold --all ./out --org acme-agents --prefix acme --marketplace acme --owner "Platform Engineering"
```

The script copies a blueprint, substitutes placeholders, and refuses to overwrite an
existing non-empty destination unless `--force` is passed. Run `scripts/validate ./out`
afterward, which checks manifest JSON, placeholder leakage, and name collisions.

### 5. Render the explorer

The topology is worth seeing rather than reading. The companion skill
`agent-platform-explorer` derives a data model from the scaffolded tree and renders
it as a standalone HTML explorer, an A2UI stream, or an MCP App. Reach for it after
scaffolding, or whenever the user asks to see the layout.

### 6. Fill the gaps

Generated files carry `[TBD]` where a human decision is required. Leaving a `[TBD]` in
place is better than inventing content, because an unfilled marker gets noticed and a
plausible invention does not.

## What the generated platform assumes

Four behaviours are baked into the templates. They are documented in
`references/resolution-order.md` and worth understanding before editing anything.

**Published skills lose collisions.** Skills and agents resolve first-found-wins, with
plugin directories near the bottom of the chain behind every project and personal
location. A local file with the same name shadows a published skill silently, with no
warning. This is why every template prefixes published names.

Treat a collision as a fork rather than a violation. Under an innersource model, a
local override is the community telling you what the standard got wrong, and the
default assumption should be that the local version is right.

**MCP servers invert the rule.** They resolve last-wins, and a later plugin captures an
earlier plugin's server name with only a warning. The marketplace blueprint ships a
`names/mcp-servers.json` registry and a CI job that enforces it.

**Presets compose by symlink.** A symlink resolving elsewhere inside the same
marketplace is dereferenced at install and the target content is copied in place, which
is what lets one canonical skill appear in several bundles. Symlinks pointing outside
the marketplace are skipped for security, and local-path installs preserve only
own-directory symlinks, so presets must be validated from an installed copy rather than
the working tree.

**Adaptation happens through config, not forks.** Plugins expose a `userConfig` block
whose non-sensitive values substitute as `${user_config.KEY}` inside skill and agent
content. See `references/customization.md` for the three-layer model and the two
constraints that catch people.

## References

- `references/platform-constraints.md` — the inherited rules, including the org boundary
- `references/resolution-order.md` — where published content sits in each chain
- `references/customization.md` — userConfig, dependencies, and preset composition
- `references/naming.md` — the conventions that are cheap now and expensive later
- `references/topology-variants.md` — the three shapes and their trade-offs
