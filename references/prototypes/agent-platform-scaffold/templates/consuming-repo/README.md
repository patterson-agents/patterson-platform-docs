# consuming-repo fragments

Not a repository. These are the files an ordinary product repository gains once the
platform exists. Copy them individually rather than scaffolding a whole tree.

| Fragment | Purpose |
| --- | --- |
| `.claude/settings.json` | Declares the marketplace and enabled plugins for collaborators |
| `.claude/skills/` | Local skills, and the middle stage of the contribution path |
| `.github/skills/` | Read first by Copilot CLI, so it reaches both populations |
| `.devcontainer/` | Consumes the seed layer instead of installing plugins at runtime |

## The one thing to understand

Anything in `.claude/skills/` outranks a published skill of the same name, silently.
That is a feature when you are deliberately overriding a standard and a trap when you
are not. Prefix collisions are the usual cause.
