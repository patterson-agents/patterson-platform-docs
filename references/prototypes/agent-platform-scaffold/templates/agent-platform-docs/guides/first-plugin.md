# Your first plugin

Three stages, and the first two need nothing from the platform team.

## Stage one: personal

```sh
claude plugin init my-tool --with skills
```

Scaffolds into `~/.claude/skills/my-tool/`. Any folder there containing
`.claude-plugin/plugin.json` loads as `my-tool@skills-dir` on the next session,
discovered in place rather than copied into a cache. Edits to `SKILL.md` take effect
immediately; run `/reload-plugins` for anything else.

No marketplace, no install step, no review. Most ideas do not survive a week of use, and
this stage costs nothing to abandon.

## Stage two: your team

Move the folder into your repository at `.claude/skills/`. Everyone who clones it gets
the plugin after accepting the workspace trust dialog.

Restrictions tighten here: project-scope MCP servers go through per-server approval and
background monitors do not load at all. That is deliberate, because reach widened.

## Stage three: published

```sh
gh repo create {{ORG}}/<name> --template {{ORG}}/plugin-template --private
```

Make CI green, reserve the slug in `{{ORG}}/agent-marketplace/names/`, and the next
assembly run adds the catalog entry. You never open a pull request against the
marketplace.

## Before you publish

Fill in `evals/cases.jsonl` with requests that should and should not trigger your skill.
A skill that fires constantly is worse than one that never fires, because the second is
merely useless and the first actively degrades every unrelated session.
