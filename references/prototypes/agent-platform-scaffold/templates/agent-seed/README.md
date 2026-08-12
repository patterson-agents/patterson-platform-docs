# agent-seed

Builds the plugin seed directory baked into container images. A devcontainer or CI
runner using it starts with the catalog and its plugins already present, cloning nothing
at runtime and needing no git credentials.

## Behaviour worth knowing

- The seed is never written to, and auto-updates are disabled for seed marketplaces
- Seed entries overwrite matching user configuration on every startup
- Opting out of a seed plugin means `/plugin disable`; removing a seed marketplace fails
- Paths resolve by probing at runtime, so the seed works when mounted elsewhere
- Several seeds layer with a colon separator, first match winning, which gives you a
  company base plus a department overlay

## Managed settings are defaults, not policy

`managed-settings.json` lands in `/etc/claude-code/`, the highest-precedence location.
But the Dockerfile lives in a repository, and anyone with write access can delete the
COPY line.

Use this for consistent defaults. Anything that genuinely must not be bypassed goes
through server-managed settings or MDM.

## The sign-in trap

Mounting a volume at `~/.claude` does not keep engineers signed in, because
`~/.claude.json` sits outside that directory and holds the OAuth account, personal MCP
servers, and per-project trust. Set `CLAUDE_CONFIG_DIR` to the same path. The reference
`devcontainer/devcontainer.json` does this; copy it rather than writing your own.
