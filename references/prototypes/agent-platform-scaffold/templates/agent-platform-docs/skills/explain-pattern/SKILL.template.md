---
name: {{PLATFORM_PREFIX}}-explain-pattern
description: >-
  Explain a platform pattern, convention, or architecture decision from the reference
  architecture. Use whenever someone asks why the platform does something a particular
  way, what a decision record says, how plugins or presets are meant to be structured,
  or where a convention comes from.
---

# Explain a platform pattern

This repository ships as a plugin so the conventions are readable by the agent and not
only by people. Documentation an agent can load at the moment it matters gets used;
documentation in a wiki does not.

## How to answer

Read the relevant file under `patterns/` or `decisions/` and answer from it. Prefer
quoting the decision record over paraphrasing, because the reasoning is the part people
need.

When a pattern disagrees with what actually works in the questioner's repository, say
so. The pattern is probably wrong, and a pull request explaining why is more valuable
than compliance.
