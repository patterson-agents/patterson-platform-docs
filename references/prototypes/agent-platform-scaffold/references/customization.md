# Customization without forking

The platform's value depends on a department being able to adapt a shared preset without
copying it. Three native mechanisms make that possible.

## userConfig

Declared in `plugin.json`, prompted when the plugin is enabled, so users never hand-edit
settings. Each option takes a `type` from `string`, `number`, `boolean`, `directory`, or
`file`, plus `title` and `description`, and optionally `sensitive`, `required`,
`default`, `multiple`, `min`, and `max`.

Values reach three places:

- `${user_config.KEY}` in MCP and LSP server configurations
- `${user_config.KEY}` in hook commands, in exec form only
- `${user_config.KEY}` in **skill and agent content**, for non-sensitive values

That third case is the one that matters. A department can change what a shared
convention actually says without touching the plugin.

### Two constraints that catch people

Fields that run in a shell reject `${user_config.*}`, because substituting a configured
value into a shell command would let the shell run whatever the value contains. Use exec
form with arguments, or read `CLAUDE_PLUGIN_OPTION_<KEY>` from the hook environment.

Configuration cannot come from the repository. Entries in a project's
`.claude/settings.json` or `settings.local.json` are ignored, because a cloned
repository could otherwise supply values that flow into hook commands and MCP server
configurations. Values come from user settings, `--settings`, and managed settings only.
Department defaults therefore arrive through managed settings or the container seed.

Set values non-interactively with `claude plugin install --config key=value`, which is
what the seed build uses.

## Dependencies

Plugins declare `dependencies` with optional semver constraints. `claude plugin enable`
enables them transitively at the same scope and fails when a dependency is not
installed. `claude plugin prune`, aliased to `autoremove`, removes auto-installed
dependencies no other plugin requires and never touches directly installed plugins.

Cross-marketplace dependencies are gated by `allowCrossMarketplaceDependenciesOn` in the
marketplace manifest, so a department marketplace depending on the core one is a
deliberate decision. Ship that field as an explicit empty array rather than omitting it.

A tilde range on a core dependency means a core patch reaches a department automatically
while a minor bump does not. That is usually the right default.

## Preset composition by symlink

Symlink resolution has three cases:

- **Inside the plugin's own directory** — preserved as a relative symlink, resolving to
  the copied target
- **Elsewhere within the same marketplace** — dereferenced, and the target's content is
  copied into the cache in its place
- **Outside the marketplace** — skipped for security, so no host paths are pulled in

The middle case is the preset mechanism. A curated bundle can be a thin manifest plus
symlinks into canonical skills, so there is exactly one copy of each convention and
several opinionated bundles of them.

Installs via `--plugin-dir` or a local path preserve only own-directory symlinks. A
preset that works during development can silently lose every linked skill once installed
from the catalog, so validate presets from an installed copy.

## The three layers

| Layer | Mechanism | Owned by |
| --- | --- | --- |
| Core convention | The plugin itself | Platform team |
| Role or department bundle | `dependencies` plus symlinks | Department |
| Project or team specifics | `userConfig` values | The consuming team |

If a department finds itself copying a core skill rather than depending on it, the core
skill is missing a `userConfig` option. That is a bug report against the core plugin,
not a reason to fork.
