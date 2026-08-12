# agent-presets

Curated, role-shaped bundles assembled from skills that already exist elsewhere. A
preset is a manifest, a set of symlinks, and occasionally a small amount of original
content.

The point is that an engineer installs one thing and gets a coherent set of conventions,
without the platform maintaining four near-copies of the same skill.

## Composition

A symlink whose target resolves elsewhere inside the same marketplace is dereferenced at
install time and the target content is copied in its place. That is what lets a preset
point at `{{ORG}}/agent-plugins` and still ship a self-contained skill.

## Layering

A preset declares `dependencies` with semver ranges on the core plugins it builds upon.
Claude Code enables them transitively at the same scope, and `claude plugin prune`
removes them when nothing requires them.

Presets ship with `defaultEnabled: false`, so installing one leaves it off until a team
opts in.

## Adding one

Departments are welcome to add presets here rather than in their own repository, since a
preset is mostly a declaration. Keep original content to what belongs only to that role
and link everything else.
