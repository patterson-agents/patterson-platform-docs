# Platform constraints

These come from Claude Code and GitHub Copilot CLI rather than from any design choice.
Read them before changing a template, because several templates exist only to work
around a constraint here.

## One repository serves both harnesses

Copilot CLI resolves marketplace manifests in this order: `marketplace.json`,
`.plugin/marketplace.json`, `.github/plugin/marketplace.json`, then
`.claude-plugin/marketplace.json`. Plugin manifests follow the same pattern, ending at
`.claude-plugin/plugin.json`. It also aliases `${COPILOT_PLUGIN_DATA}` as
`${CLAUDE_PLUGIN_DATA}`.

A single `.claude-plugin/` directory therefore serves both. No dual publication path is
needed. Declaring the canonical Open Plugin Spec `$schema` makes that compatibility
explicit rather than incidental.

## The organization boundary is architectural

For an organization marketplace synced through GitHub, a plugin source can be private in
two cases: a `github.com` source sharing the marketplace repository's owner, or a source
on your GitHub Enterprise host with the GHE App installed on the repository. The `npm`
and `archive` source types are not supported by organization sync at all.

Consequences for the templates:

- Every platform repository belongs to one organization
- Department repositories are referenced by `github` source with a `path`
- A department in a different organization would require vendoring its plugin folders
  into the marketplace repository through CI, which the `assemble.yml` template can be
  adapted to do but does not do by default

## Names are effectively permanent

A marketplace entry's `name` is an immutable slug. It is what `enabledPlugins` stores
and what users type. A top-level `renames` map migrates users automatically, mapping
each former name to its current name or to `null`, and Claude Code follows chains across
successive renames.

The escape hatch has a hole. Managed and policy settings are read-only to Claude Code,
so plugins enabled there cannot be rewritten automatically, and the rename notice recurs
until an administrator updates `enabledPlugins`. Treat `renames` as append-only, and
validate it, because `claude plugin validate` rejects cycles.

## `strict` means different things

In a Copilot marketplace manifest, `strict: true` is the default and requires full
schema conformance, while `false` relaxes validation. In Claude Code, `strict: true`
means `plugin.json` is the authority for component definitions and `false` means the
marketplace operator takes full control.

Same key, different semantics. Set it deliberately and verify against both harnesses.

## Auto-update is asymmetric

Claude Code administrators can force per-marketplace auto-update through managed
settings. Copilot honors the `autoUpdate` opt-in only from a user's own settings and
explicitly refuses to let a repository or managed policy enable or redirect it.

The two populations drift. Pin by default and track installed versions per harness.

## Component paths replace, except one

A manifest path field replaces the default directory for `commands`, `agents`,
`workflows`, and `outputStyles`. The `skills` field is the exception that adds to the
default scan. Setting a custom agents path and losing the agents in `agents/` is the
usual symptom.

Component directories sit at the plugin root. The `.claude-plugin/` directory holds
`plugin.json` and nothing else; components placed inside it do not load.

## A plugin-root CLAUDE.md is not context

It is never loaded as project context. Instructions that must reach the model belong in
a skill. This catches most people writing a conventions plugin for the first time.

## Distribution cannot enforce

A plugin is a suggestion. Enforcement lives in managed settings
(`strictKnownMarketplaces`, `enabledPlugins`, `forcedPlugins`, `allowManagedHooksOnly`)
and in CI that runs regardless of what the agent believes. Managed settings delivered
through a repository Dockerfile are defaults rather than policy, because anyone with
write access can remove the COPY step. Policy that must not be bypassed goes through
server-managed settings or MDM.

Open question worth testing in a pilot: whether `allowManagedHooksOnly` suppresses hooks
shipped inside an approved plugin. If it does, hooks-in-plugins and
hooks-locked-to-managed-settings are mutually exclusive, and the hook templates here
need revisiting.
