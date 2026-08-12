# agent-plugins

The core plugin monorepo, and the working half of the reference architecture. The
written half is in `{{ORG}}/agent-platform-docs`. Neither is much use alone:
documentation without a working exemplar drifts, and an exemplar without reasoning gets
cargo-culted.

Keeping first-party plugins together is deliberate. Consistency across exemplars matters
more than isolation, and a newcomer benefits from reading several complete examples side
by side rather than cloning four repositories to compare them.

## Structural rules

Read `plugins/conventions/README.md` for the annotated version. The three that catch
everyone:

- `.claude-plugin/` holds `plugin.json` and nothing else
- Manifest path fields replace the default directory, except `skills`, which adds to it
- A plugin-root `CLAUDE.md` is not loaded as context; use a skill

## Namespacing

Every published skill carries the `{{PLATFORM_PREFIX}}-` prefix. Skills resolve
first-found-wins with plugin directories near the bottom of the chain, so an unprefixed
`code-review` loses silently to any local file with the same name. The prefix converts
an invisible collision into a visible choice.

## Publishing

Nothing here publishes itself. `{{ORG}}/agent-marketplace` assembles the catalog from
this repository and the others. Make CI green, reserve the slug, and the next assembly
run picks it up.
