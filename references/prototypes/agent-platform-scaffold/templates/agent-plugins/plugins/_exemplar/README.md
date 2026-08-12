# {{PLATFORM_PREFIX}}-conventions

The exemplar. If somebody asks how this platform expects a plugin to be built, the
answer is to read this directory top to bottom.

Note that this file is `README.md` and not `CLAUDE.md`. A `CLAUDE.md` at a plugin root
is never loaded as project context, so conventions that must reach the model belong in a
skill.

## Layout

```text
.claude-plugin/plugin.json   manifest, and the ONLY file in that directory
skills/                      adds to the default scan
agents/                      replaces the default when set in the manifest
hooks/hooks.json             tier 2, executes shell
bin/                         added to PATH while enabled
.mcp.json                    tier 3, network and credentials
README.md                    this file
```

Component directories sit at the plugin root. Putting `skills/` inside
`.claude-plugin/` is the most common structural mistake, and the components silently
fail to load.

A manifest path field **replaces** the default directory for `commands`, `agents`,
`workflows`, and `outputStyles`. The `skills` field is the exception that **adds** to
the default scan. Setting a custom agents path and losing the agents in `agents/` is the
usual symptom.

## Adaptation without forking

The `userConfig` block is what makes this a preset rather than a fixed artifact.
Non-sensitive values substitute as `${user_config.KEY}` inside skill and agent content,
so a department changes what a convention says without copying it.

If you find yourself copying this plugin rather than configuring it, that is a missing
`userConfig` option. Open an issue instead of forking, and the fix benefits everyone.
