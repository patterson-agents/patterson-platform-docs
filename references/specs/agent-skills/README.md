# Agent Skills — staged 2026-08-11

## Provenance

| File | Source URL | Fetched | Completeness |
| --- | --- | --- | --- |
| `specification.md` | https://agentskills.io/specification.md | 2026-08-11 | COMPLETE. Copied from the 2026-08-10 baseline after confirming today's fetch is byte-identical in the frontmatter table, field constraints, and all marker strings. |
| `llms.txt` | https://agentskills.io/llms.txt | 2026-08-11 | COMPLETE, verbatim (re-fetched today; identical to baseline). |

Backing repo: https://github.com/agentskills/agentskills
Reference validator: `skills-ref` — https://github.com/agentskills/agentskills/tree/main/skills-ref
(`skills-ref validate ./my-skill`).

Not staged (fetched and read 2026-08-11, content summarized below):
- https://agentskills.io/client-implementation/adding-skills-support.md — COMPLETE fetch
- https://agentskills.io/clients.md — fetched but is a **JS shell** (React
  `ClientShowcase` component with an inline `clients` array); no prose spec content.
  Claude Code, Cursor, Copilot/VS Code, Gemini CLI, Codex, Goose, OpenCode,
  Kiro, Amp, Roo, Factory, Letta, and ~35 others are listed.

## Version

The Agent Skills spec carries **no version string** — no `Spec Version:` line,
no `$schema`, no revision date on the specification page. It is versioned only
by the site's git history. This is a real interoperability gap: there is no way
for a skill to declare which revision of the format it targets.

## SKILL.md frontmatter — REQUIRED fields

| Field | Required | Constraint |
| --- | --- | --- |
| `name` | **Yes** | 1–64 chars; lowercase alphanumeric + hyphen only; no leading/trailing hyphen; no `--`; **MUST match the parent directory name** |
| `description` | **Yes** | 1–1024 chars, non-empty; should state what it does AND when to use it |

Optional: `license` (string), `compatibility` (max 500 chars), `metadata`
(map of string→string only), `allowed-tools` (space-separated string,
marked Experimental).

There is no JSON Schema published for SKILL.md frontmatter — the table above
is the whole normative surface.

## Directory layout

```
skill-name/
├── SKILL.md          # required
├── scripts/          # optional, executable code
├── references/       # optional, docs loaded on demand
└── assets/           # optional, templates/images/data
```
Any additional files/directories are permitted. The spec does **not** define
where skill directories live on disk.

## Size / packaging limits

There are **no hard limits**. All constraints are recommendations tied to
progressive disclosure (3 tiers):

| Tier | Loaded | When | Budget |
| --- | --- | --- | --- |
| 1 Metadata | `name` + `description` | session start, all skills | ~50–100 tokens/skill |
| 2 Instructions | full `SKILL.md` body | on activation | **<5000 tokens recommended** |
| 3 Resources | `scripts/`, `references/`, `assets/` | on reference | unbounded |

Also recommended: keep `SKILL.md` **under 500 lines**; keep file references
**one level deep** from SKILL.md; avoid deep reference chains.

Hard character limits exist only on frontmatter: `name` ≤64,
`description` ≤1024, `compatibility` ≤500.

No archive format, no manifest, no signing, no registry is defined.

## Distribution conventions (from the client-implementation guide, non-normative)

The spec does not mandate skill locations; the implementation guide documents
the emerging convention that clients scan both a client-native directory and
a shared one, at project and user scope:

| Scope | Path |
| --- | --- |
| Project | `<project>/.<client>/skills/` |
| Project | `<project>/.agents/skills/`  ← cross-client convention |
| User | `~/.<client>/skills/` |
| User | `~/.agents/skills/`  ← cross-client convention |

Many clients also scan `.claude/skills/` for pragmatic compatibility.
Scanning bounds suggested: max depth 4–6, max ~2000 directories, skip `.git/`
and `node_modules/`.

Precedence: **project-level overrides user-level**. Warn on collisions.

Validation is recommended to be **lenient**: name/dir mismatch or >64-char
name → warn and load anyway; missing/empty `description` or unparseable YAML →
skip the skill. Guide also recommends a YAML fallback that quotes values
containing unescaped colons (a very common real-world defect).

Trust: project-level skills should be gated on a folder-trust check, since a
cloned repo can otherwise inject instructions into the agent's context.
