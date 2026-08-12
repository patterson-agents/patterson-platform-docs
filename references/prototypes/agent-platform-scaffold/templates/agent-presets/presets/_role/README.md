# {{PLATFORM_PREFIX}}-preset-[TBD-role]

A curated bundle. Almost everything here is a symlink into a canonical skill defined in
`{{ORG}}/agent-plugins`, so there is exactly one definition of each convention and
several opinionated bundles of them.

## What belongs here

Original content only when it genuinely belongs to this role alone. If two presets want
the same skill, it belongs in `agent-plugins` and both should link it.

## Validating

Validate from an installed copy, never from the working tree. Installs via
`--plugin-dir` or a local path preserve only own-directory symlinks, so a preset that
looks correct during development can silently lose every linked skill once installed
from the catalog.
