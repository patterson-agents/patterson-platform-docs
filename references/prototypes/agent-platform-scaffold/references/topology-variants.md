# Topology variants

Three shapes. All three keep every repository in one organization, because private
plugin sources resolve only when they share the marketplace repository's owner.

## Hybrid, the default

Core plugins in one monorepo so exemplars stay consistent and readable side by side.
Departments own separate repositories so contributing needs no platform-team review. The
marketplace references both by `github` source with a `path`.

```text
{{ORG}}/
  agent-marketplace          generated catalog, platform owned
  agent-plugins              core monorepo, platform owned
  agent-presets              curated bundles, shared
  agent-platform-docs        reference architecture
  plugin-template            scaffold for new contributors
  agent-seed                 container seed builder
  skills-studio              authoring, eval, promotion
  <dept>-agent-plugins       one per department, department owned
```

Choose it when the trajectory runs from a central team toward innersource contribution,
which is the usual case. It supports both ends without a migration partway through.

## Monorepo

Everything in one repository. Relative-path sources need no cross-repository
authentication, there is no assembly step, and CI is trivial.

The cost is that every department contribution becomes a pull request against a
repository the platform team owns, which puts that team back on the critical path.
Reasonable for phase zero and hard to sustain past a handful of contributors.

## Polyrepo

One repository per plugin, each with its own tags, CHANGELOG, and CODEOWNERS. Maximum
ownership isolation and the cleanest per-plugin release story.

The cost is repository sprawl and a much weaker reference architecture, because a
newcomer has nowhere to read several exemplars side by side. Treat it as a destination
rather than a starting point.

## Migrating between them

Monorepo to hybrid is straightforward: extract department plugins into their own
repositories and change the marketplace entries from relative paths to `github` sources.
Existing installs are unaffected as long as the plugin `name` does not change.

Hybrid to polyrepo is mechanical but noisy, and worth doing only when a department
genuinely needs an independent release cadence.
