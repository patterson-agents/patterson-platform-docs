---
name: [TBD-skill-name]
description: >-
  [TBD] Write this as a trigger condition, not a summary. "Use when the user asks to
  review a database migration" outperforms "Database migration review helper" by a wide
  margin, because Claude decides whether to load this skill by matching the request
  against this text. Include the phrasings people actually use.
---

# [TBD] Skill title

[TBD] The instructions. Keep this file short and put occasional detail in a sibling
reference file, loaded on demand.

## Checklist before publishing

- The frontmatter `name` is set explicitly, so the invocation name survives updates
- The `description` reads as a trigger condition
- The skill name carries the `{{PLATFORM_PREFIX}}-` prefix, because unprefixed names
  lose silently to local files
- `claude plugin details .` shows an always-on cost you would defend
