# {{DEPT}}-agent-plugins

The {{DEPT}} team's plugins. The team owns this repository outright, including its
CODEOWNERS, and ships without platform review.

It is referenced by `{{ORG}}/agent-marketplace` through a `github` source. That resolves
despite the repository being private, because it shares the marketplace repository's
owner. A department repository in a different GitHub organization would not work, which
is the constraint behind keeping everything in one org.

## What ownership means

You do not need permission to ship. You need CI to pass, a reserved slug, and a reserved
MCP server name if the plugin ships one. The shared workflow runs the same checks every
department runs.

## Building on core

Depend on `{{PLATFORM_PREFIX}}-core` rather than copying from it. Claude Code enables
dependencies transitively at the same scope, so a user installing your plugin gets the
core one without being asked.

If you find yourself copying a core skill, that skill is missing a `userConfig` option.
Open an issue against `{{ORG}}/agent-plugins`, and the fix benefits every department.

## MCP servers

Reserve the server name in the marketplace repository before publishing. MCP resolves
last-wins, so two plugins claiming the same name means the later one silently captures
the earlier one's tools. CI blocks it, but reserving early beats discovering the
conflict at publication.

## Before starting a plugin here

Try `claude plugin init` locally first. Most ideas do not survive a week of use, and a
personal `@skills-dir` plugin costs nothing to abandon.
