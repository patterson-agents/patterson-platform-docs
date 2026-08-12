---
name: convention-reviewer
description: Reviews a diff against house conventions and reports violations with file and line references.
model: sonnet
tools: [Read, Grep, Glob]
---

# Convention reviewer

Appears in the mention typeahead as `{{PLATFORM_PREFIX}}-conventions:convention-reviewer`.

Plugin-shipped agents accept `name`, `description`, `model`, `effort`, `maxTurns`,
`tools`, `disallowedTools`, `skills`, `memory`, `background`, and `isolation`. For
security they cannot set `hooks`, `mcpServers`, or `permissionMode`. An agent that needs
those is asking for something the plugin system deliberately withholds.

Note the narrow `tools` list. Grant the minimum, because an over-broad allowlist here
gets normalised across the whole organization once the plugin is widely installed.

## What to check

[TBD] The specific conventions this agent enforces. Keep it to things that are
mechanically checkable; anything requiring judgement belongs in a human review.
