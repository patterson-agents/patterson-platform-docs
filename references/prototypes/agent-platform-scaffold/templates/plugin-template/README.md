# plugin-template

A working plugin, ready to clone:

```sh
gh repo create {{ORG}}/[TBD-name] --template {{ORG}}/plugin-template --private
```

It passes validation on first clone, which is a meaningfully different starting point
from an empty directory and a specification.

## Before you use this

Consider whether you need a repository yet. `claude plugin init <name>` scaffolds into
`~/.claude/skills/`, and any folder there containing `.claude-plugin/plugin.json` loads
as `<name>@skills-dir` on the next session, with no marketplace and no install step.

Move to a repository when other people need the thing. Move to the catalog when it has
proven itself. Working the other way round produces a registry full of plugins nobody
uses.

## The description field

The single highest-leverage thing new authors get wrong. Claude decides whether to load
a skill by matching the request against the `description`, so write it as a trigger
condition rather than a summary.

`evals/cases.jsonl` exists to measure this: pairs of requests that should and should not
trigger the skill. Fill it in before publishing.

## Next

Read `plugins/conventions` in `{{ORG}}/agent-plugins`. This template is derived from it,
and the exemplar goes further.
