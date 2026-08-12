# AGENTS.md — patterson-platform-docs

A captured reference library. There is **no build, no test suite, no linter, no package
manifest, and no lockfile** — `.github/dependabot.yml` documents that this is deliberate.
"Verification" here means reading files and keeping indexes consistent, not running commands.

Read `CONTRIBUTING.md` first; it is the normative contribution baseline. This file covers what
that document leaves implicit.

## Repository shape

| Path | What it is |
|---|---|
| `references/platforms/` | Vendor doc captures (`claude-code/`, `copilot/`, `vscode/`) |
| `references/specs/` | Open-standard captures (mcp, agent-skills, agent-plugins, acp, ahp, a2ui, …) |
| `references/assessments/` | Analysis written *about* the captures — never mixed into them |
| `references/prototypes/agent-platform-scaffold/` | **Archived, superseded.** Its `SKILL.md`, `scripts/`, and `templates/` are historical artifacts, not live platform assets. Do not edit or execute them. |
| `decisions/` | ADRs. Currently **empty and untracked** — the first ADR creates it. |
| `index.html` | Hand-maintained GitHub Pages landing page (see below) |
| `.github/skills/agentic-workflows/SKILL.md` | Active router skill for gh-aw work |

## Things that will bite you

### `raw-*.md` files are dead weight, not sources

`references/platforms/claude-code/` contains ten `raw-*.md` files. Each opens with
`<!-- SUPERSEDED: temp download artifact. Use <name>.md instead. Safe to delete. -->`.
Never cite, quote, or refresh a `raw-*` file — use its non-prefixed sibling.

### README file counts use exclusion rules

`README.md` claims `claude-code/` = 28 and `vscode/` = 18, but disk holds 38 and 20.
Both are correct: the counts exclude `raw-*` (claude-code) and the two distilled
`_NORMATIVE-*` files (vscode). Before "fixing" a count, work out which convention applies.
The weekly `doc-library-audit` workflow reports these as candidate mismatches; they are
expected, not bugs.

### Three indexes must move together

Adding, removing, or renaming anything under `references/` touches:

1. the directory's own `_SOURCES.md` (URL, local path, version, `ok` / `partial` / `blocked`)
2. `README.md` — the per-area table **and** the `documents-###` / `captured-` badges
3. `index.html` — it duplicates the index by hand, including per-area file counts

`REFERENCES.md` is only an index of where each `_SOURCES.md` lives; it rarely needs editing.

### `doc-library-audit.lock.yml` is generated

Edit `.github/workflows/doc-library-audit.md` and regenerate with `gh aw compile`. The lock
file is marked `linguist-generated` in `.gitattributes` and carries a DO NOT EDIT banner.
Hand-editing it will be silently overwritten on the next compile.

### GitHub Pages serves the repo root verbatim

`pages.yml` uploads `path: '.'` on push to `main` — no site generator. `index.html` links to
`.md` files with relative paths (served as raw markdown) and to directories via absolute
`github.com/.../tree/main/...` URLs, deliberately (commit `35dce21`), because Pages cannot
browse a directory. Keep that split when adding links.

### Brand assets: `.webp` in README, `.svg` elsewhere

`docs/assets/` carries both. `README.md` must use the `.webp` variants — GitHub does not render
SVG in a private repository's README (commit `b094442`). `index.html` uses the `.svg` variants.

## Conventions to preserve

- **Provenance header** on every captured file: an HTML comment with `source:`, `fetched:`,
  `status:`, and a `notes:` block describing what was stripped or is missing. No exceptions.
- **Never overwrite a prior capture** that a decision cites. Add a new dated capture beside it.
- **Record gaps, don't omit them.** A page that could not be fetched goes into `_SOURCES.md`
  with status `blocked` or `partial`. See `references/specs/mcp/README.md` for the worked
  example (truncated `schema.json`).
- **`[TBD]`** is the marker for a fact that is not known. Do not invent a plausible value.
- **Conventional commits**, matching the existing log: `docs(references):`, `docs(assessments):`,
  `docs(decisions):`, `ci(pages):`, `chore(claude):`.

## Not applicable here

The `patterson-corp` OpenSpec proposal workflow, `verify-all.sh`, and plugin conventions do
**not** apply to this repository. `CONTRIBUTING.md` says so explicitly.
