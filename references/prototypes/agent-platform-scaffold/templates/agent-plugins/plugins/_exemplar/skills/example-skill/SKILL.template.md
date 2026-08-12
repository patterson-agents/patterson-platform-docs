---
name: {{PLATFORM_PREFIX}}-commit-messages
description: >-
  Write commit messages that follow house conventions, including the ticket trailer and
  the subject-line format. Use this whenever the user is about to commit, asks for a
  commit message, asks to fix or reword a commit, or runs a commit command, even if they
  do not mention conventions.
---

# Commit messages

The frontmatter `name` above controls the invocation name. Set it explicitly. Without
it, Claude Code falls back to the install directory name, which for a marketplace
install is a version string that changes on every update.

Note the `description`. It is written as a trigger condition rather than a summary,
because Claude decides whether to load this skill by matching a request against it. This
is the single highest-leverage thing to get right.

## The convention

Subject line under 60 characters, imperative mood, no trailing period.

Body wrapped at 72 characters, explaining why rather than what, because the diff already
says what.

Every commit carries a ticket trailer using the configured prefix:

```text
Refs: ${user_config.ticket_prefix}-1234
```

That `${user_config.ticket_prefix}` substitutes from the plugin's `userConfig` block, so
a department changes the prefix without forking this skill. Non-sensitive values
substitute in skill and agent content; sensitive ones do not.

## Progressive disclosure

Detail that is only occasionally needed lives in `reference.md` beside this file, loaded
on demand rather than on every session. Keeping it out of `SKILL.md` is how a detailed
skill stays cheap. Run `claude plugin details` to see the always-on cost of a plugin.

## Scripts

`scripts/lint-message` is invoked rather than read into context. Reference it through
`${CLAUDE_PLUGIN_ROOT}`, which resolves into the versioned cache directory and changes
on every update. Never write state there; use `${CLAUDE_PLUGIN_DATA}`, which survives.
