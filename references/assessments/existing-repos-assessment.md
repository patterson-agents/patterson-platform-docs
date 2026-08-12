# Assessment: the three existing patterson-agents repos

Root: `/workspaces/code/github.com/patterson-agents`
`downloads/` deliberately ignored per instruction (stale, non-authoritative).

| Repo | Size | Latest commit | Remote |
|---|---|---|---|
| `patterson-marketplace` | 16M | `2b9c5ce` Update Dependabot configuration | github.com/patterson-agents/patterson-marketplace |
| `patterson-skills` | 19M | `6f13066` Feat/patterson design plugin (#3) | github.com/patterson-agents/patterson-skills |
| `patterson-design-plugins` | 96M | `d671d14` Merge PR #6 (dependabot gh-aw-actions) | github.com/patterson-agents/patterson-design-plugins |

## Headline finding

**All three repos ship the same design system, three different ways.** They are not
three products; they are three competing packagings of one asset. This is the central
problem to resolve.

| | patterson-marketplace | patterson-skills | patterson-design-plugins |
|---|---|---|---|
| Marketplace name | `patterson` | `patterson-skills` | `patterson-design` |
| Plugins | 1 (`patterson-design`) + `_template` | 1 (`patterson-design`) | 9 |
| Skill name | `patterson-design` | `patterson-design-system` **and** `patterson-design` | `patterson-design` |
| DS asset location | `plugins/patterson-design/skills/patterson-design/assets/` | `skills/patterson-design-system/` **and** `plugins/.../assets/` | `plugins/<each>/ds/` ×9 |
| `$schema` on marketplace.json | yes | **no** | yes |
| Copilot surface | `.github/agents/` + `.github/skills/` | `.github/agents/` + `.github/skills/` + `.github/mcp.json` | `.github/copilot-instructions.md` |
| gh-aw workflows | no | scaffold only | **yes, 3 live** |

Three different marketplace `name` values means a user could install all three and get
three copies of the same skill with colliding names. That is a real bug today.

---

## 1. `patterson-marketplace` — **SALVAGE. This is the strongest foundation.**

### What it is
A clean, purpose-built Claude Code + Copilot plugin marketplace. One catalog, one real
plugin, one template for new plugins, and cross-CLI management tooling.

### KEEP

| Path | Why |
|---|---|
| `.claude-plugin/marketplace.json` | Correct schema (`$schema: json.schemastore.org/claude-code-marketplace.json`), `owner`, `metadata`, `plugins[]` with `category` + `tags`. Also uses a `relevance.signals.filesRead` block (`**/*.css`, `**/tailwind.config.*`, `**/*.tsx`) for context-based plugin suggestion — the only repo doing this. |
| `plugins/_template/` | **The single most valuable asset in the three repos.** A complete plugin skeleton: `.claude-plugin/plugin.json`, `README.md`, `agents/example-agent.md`, `commands/example-command.md`, `skills/example-skill/SKILL.md`, `hooks/hooks.json`, `scripts/example-hook.sh`. The `hooks.json` shows the correct `${CLAUDE_PLUGIN_ROOT}` interpolation for a `PostToolUse` `Write\|Edit` matcher. Nothing else in Patterson's tree documents the hooks surface. |
| `scripts/plugins.sh` + `add/update/remove/sync/ignore.sh` + `lib/common.sh` | Single entry point that drives **both** the `claude` and `copilot` CLIs, with `--claude` / `--copilot` scoping and `-n/--dry-run`. This is the runtime half of the dual-manifest story. (`sync` and `ignore` are stubbed "not implemented yet" — be honest about that.) |
| `docs/managed-settings.template.json` | Org-wide rollout via `extraKnownMarketplaces` + `pluginSuggestionMarketplaces` + `enabledPlugins`. This is how Patterson pushes the marketplace to every engineer without asking them to run a command. Critical for enterprise adoption. |
| `.claude/settings.json` | Repo-local auto-registration: trusting the folder registers the marketplace. Nice DX touch. |
| `.github/agents/patterson-design.md` + `.github/skills/patterson-design/SKILL.md` | The Copilot projection of the Claude plugin — the dual-manifest pattern actually implemented. |
| `CONTRIBUTING.md`, `LICENSE`, `docs/README.md`, `scripts/README.md` | Real docs, not stubs. |

### ADAPT
- `plugins/patterson-design/.claude-plugin/plugin.json` is missing `version`, `license`,
  and `keywords` — the `_template` version has all three. Bring it up to the template's
  standard.
- The `.github/skills/patterson-design/SKILL.md` points at
  `plugins/patterson-design/skills/patterson-design/` by relative repo path. That works
  in-repo but not once installed. Needs `${CLAUDE_PLUGIN_ROOT}`-style resolution.
- `scripts/sync.sh` and `ignore.sh` are unimplemented — either finish or remove.

### DISCARD
- Nothing. This repo has almost no dead weight.

### Verdict
**Keep and promote to the canonical marketplace repo.** Its structure is correct, its
tooling is unique, and it is the only repo with an org-rollout story. Everything else
should be restructured to publish *into* this catalog.

---

## 2. `patterson-skills` — **PARTIALLY SALVAGE. Harvest three things, then retire.**

### What it is
An earlier, more confused attempt. It contains **two** copies of the design system in
two different layouts inside one repo:
- `skills/patterson-design-system/` — a bare skill (tokens/, components/, assets/,
  `reference/design-guide.md`, `CLAUDE_CODE_HANDOFF.md`, `styles.css`)
- `plugins/patterson-design/skills/patterson-design/` — the same content repackaged as a
  plugin (assets/, references/, scripts/)

Its `.claude-plugin/marketplace.json` is a strictly worse version of
`patterson-marketplace`'s: no `$schema`, no `relevance` block, different marketplace
`name` (`patterson-skills` vs `patterson`), same plugin `name` (`patterson-design`).
**Direct collision risk with patterson-marketplace.**

### KEEP — these three are genuinely unique and exist nowhere else

| Path | Why |
|---|---|
| `.github/skills/agentic-workflow-designer/SKILL.md` | **Daniel's original work.** A conversational interview skill for authoring gh-aw workflows: Phase 1 Goal → Phase 2 Trigger → Phase 3 Scope (read/write) → Phase 4 Data Strategy → Phase 5 Guardrails. Explicitly maps answers onto `on:`, `permissions:`, `tools:`, `safe-outputs:`, `steps:`. Advises pre-fetching GitHub data with `gh` + `jq` into `/tmp/gh-aw/data/` so the agent reads compact JSON — a real token-cost insight. Also correctly positions itself relative to gh-aw's own `create-agentic-workflow.md` and `agentic-chat.md` prompts. **This is the best single artifact in the three repos.** |
| `.github/mcp.json` | Declares `gh aw mcp-server` as a local MCP server exposing `compile`, `audit`, `logs`, `inspect`, `status`, `audit-diff`. Lets Claude/Copilot drive gh-aw as tools. Should be standard in every Patterson repo. |
| `skills/patterson-design-system/CLAUDE_CODE_HANDOFF.md` + `reference/design-guide.md` | The full brand guide and the "hand this system to a developer" doc. Whichever repo wins, this prose must survive. |

### ADAPT
- `.github/labeler.yml` + `.github/workflows/label.yml` — standard PR labelling, fine to
  carry forward.
- `.github/workflows/copilot-setup-steps.yml` — Copilot coding-agent environment setup.
- `.github/ISSUE_TEMPLATE/*.md` — old-style `.md` templates; upgrade to the `.yml` issue
  *forms* used in `patterson-sh/templates`.
- `.github/agents/agentic-workflows.md` and `.github/skills/agentic-workflows/SKILL.md`
  are **verbatim copies from githubnext/agentics**, and the SKILL.md's file list points
  at `.github/aw/*.md` paths that *do not exist locally* ("Load these files from
  `github/gh-aw` (they are not available locally)"). Keep the router idea, but this
  copy is broken as shipped.

### DISCARD
- `.claude-plugin/marketplace.json` — colliding, inferior duplicate of
  patterson-marketplace's.
- `plugins/patterson-design/` — a third copy of the design system.
- `skills/patterson-design-system/` **as a location** — the content is valuable, the
  duplication is not.

### Verdict
**Harvest `agentic-workflow-designer`, `.github/mcp.json`, and the design-guide prose;
then archive the repo.** Leaving a second marketplace named `patterson-skills` publishing
a plugin named `patterson-design` alongside `patterson-marketplace` is an active hazard.

---

## 3. `patterson-design-plugins` — **RESTRUCTURE. Best content, worst architecture.**

### What it is
The most developed and most content-rich of the three: 9 individually installable
plugins (`patterson-brand` core + `patterson-deck`, `patterson-executive-deck`,
`patterson-corporate-page`, `patterson-file-manager`, `patterson-docs`,
`patterson-tutorialkit`, `patterson-corporate-website`, `patterson-storefront`), each
with `skills/`, `commands/`, `agents/`, and a `ds/` design-system snapshot. Also the
only repo with live gh-aw workflows and a devcontainer.

### The fatal flaw: 9× duplication

```
plugins/patterson-brand/ds            9.4M
plugins/patterson-corporate-page/ds   9.0M
plugins/patterson-corporate-website/ds 9.1M
plugins/patterson-deck/ds             9.0M
plugins/patterson-docs/ds             9.1M
plugins/patterson-executive-deck/ds   9.0M
plugins/patterson-file-manager/ds     9.1M
plugins/patterson-storefront/ds       9.1M
plugins/patterson-tutorialkit/ds      9.6M
                                     ─────
                                      96M repo
```

`md5sum` confirms `ds/tokens/colors.css` is byte-identical across all 8 non-tutorialkit
plugins. Every plugin also carries its own copy of `value-prop.png` and
`photo-markets.png` (each >500K) and the Proxima Nova woff2 set.

This is **deliberate** — `.github/copilot-instructions.md` states it outright:

> "`ds/` snapshots are deliberately duplicated across plugins so each plugin is
> self-contained. A token change must be re-copied into every plugin's snapshot."

The rationale (self-containment, relative paths like `../../styles.css` resolve without
edits) is understandable but the cost is severe: a single brand-token change requires 9
synchronized edits, the repo is 96M, and every plugin install pulls ~9M of mostly
identical binary assets. It is the same copy-paste-instead-of-dependency antipattern
called out in the 4act ecosystem's `sharedPaymentFunctions.js`.

### KEEP

| Path | Why |
|---|---|
| `plugins/patterson-brand/ds/` | **The canonical design-system payload** — `tokens/*.css` (6 files), `styles.css`, `theme.json` (Theme UI spec shape), `components/` (core/forms/feedback as `.jsx` + `.d.ts` + per-component `*.prompt.md`), `_ds_bundle.js` runtime, `assets/brand/` logos + imagery, `assets/fonts/` Proxima Nova woff2, `guidelines/*.card.html` (18 browser-openable specimen cards), `readme.md` full design guide. This is the real Patterson brand asset. Keep exactly **one** copy. |
| `plugins/patterson-brand/ds/integrations/` | Framework adapters: `tailwind.css` (v4), `tailwind.config.js` (v3), `uno.config.js`, `theme-ui.js`, `shadcn-theme.css`, + README. Excellent — makes the tokens consumable from any stack. |
| `.claude-plugin/marketplace.json` | 9-plugin catalog with `metadata.pluginRoot: "./plugins"`, per-plugin `version` and `category` (`design-system` / `templates` / `ui-kits`). Best-structured catalog of the three. |
| `plugins/*/skills/*/SKILL.md` | Well-written, correct frontmatter (`name`, `description`, `user-invocable`), correct `${CLAUDE_PLUGIN_ROOT}` usage, explicit scaffolding workflow, and a crisp brand quick-reference (navy `#003767`, sky `#00A8E1`, pill buttons, 10px radius, no emoji). Model examples for skill authoring. |
| `.github/workflows/{ci-doctor,repo-ask,repo-chronicle}.{md,lock.yml}` + `shared/reporting.md` | Live gh-aw workflows pinned to `githubnext/agentics@1c6668b`, compiled with gh-aw v0.81.6, one on Copilot and one on Claude. Proof the toolchain works. |
| `.github/copilot-instructions.md` | The best copilot-instructions file in the tree: layout rules, brand rules, workflow expectations, frontmatter requirements per file type, and the `claude plugin validate .` gate. |
| `CLAUDE.md` | Accurate, specific, includes the local smoke-test path (`/plugin marketplace add .` → install → invoke). |
| `.devcontainer/` | `devcontainer.json`, `Dockerfile`, `setup.sh`, `welcome.sh`, `devcontainer-lock.json`, README + a publishable `devcontainer-template/`. Real onboarding infrastructure. |
| `.vscode/` | `tasks.json` wires `claude plugin validate .` as the default test task. `extensions.json`, `launch.json`, `settings.json`, README. |
| `.github/dependabot.yml` | Already grouping and bumping `github/gh-aw-actions/setup`. |

### ADAPT
- `plugins/*/commands/*.md` and `plugins/*/agents/*.md` (e.g. `brand-reviewer.md`,
  `patterson-designer.md`, `design.md`, `wire-tokens.md`) — good content, but they
  assume the duplicated `ds/` layout and will need path updates after de-duplication.
- `demos/vhs/` + `generate-vhs-gifs.yml` — terminal demo GIFs. Nice, low priority.
- `prototypes/patterson-starlight`, `docs/index.html`, `demos/index.html` — demo surface.
- `CLAUDE_CODE_HANDOFF.md` — overlaps with the patterson-skills copy; reconcile.

### DISCARD
- **8 of the 9 `ds/` snapshots** (~72M). Replace self-containment-by-duplication with
  one of: (a) `patterson-brand` as a declared prerequisite plugin whose `ds/` the others
  reference; (b) a build step that materializes snapshots at publish time from a single
  source; or (c) a thin `ds/` per plugin containing only the plugin-specific
  templates/UI-kit files, with tokens/fonts/logos pulled from `patterson-brand`.
  Option (b) preserves the stated self-containment benefit while keeping one source of truth.
- The submodule wiring in `patterson-sh/.gitmodules` pointing here — submodule-per-plugin
  does not scale.

### Verdict
**Restructure, do not restart.** The content is the most valuable thing Patterson has
built; the packaging is the problem. Fixing it is a mechanical de-duplication plus a
publish-time snapshot step, not a rewrite.

---

## Recommendation: salvage, do not restart

Restarting would throw away roughly 96M of hand-produced brand assets, 9 well-written
SKILL.md files, a working gh-aw installation, a devcontainer, and a cross-CLI plugin
management toolchain. None of that is the problem. **The problem is that there are three
overlapping marketplaces with colliding plugin names and 9× asset duplication** — both
purely structural.

Target end state:

```
patterson-agents/
  patterson-marketplace/          ← THE catalog. Keep as-is; it is already correct.
    .claude-plugin/marketplace.json
    plugins/_template/            ← keep, it is the authoring contract
    docs/managed-settings.template.json
    scripts/plugins.sh            ← cross-CLI installer (finish sync + ignore)

  patterson-design-system/        ← ONE source of truth for ds/ (from patterson-brand)
    tokens/ styles.css theme.json components/ assets/ integrations/ guidelines/
    → published as the patterson-brand plugin; other plugins consume it at publish time

  patterson-plugins/              ← the 8 template/ui-kit plugins, ds/ de-duplicated
                                     (or fold into patterson-marketplace/plugins/)

  patterson-workflows/            ← NEW: Patterson gh-aw workflow pack, agentics-shaped
                                     seeded with agentic-workflow-designer +
                                     the 3 already-installed agentics workflows

  patterson-skills/               ← ARCHIVE after harvesting:
                                     .github/skills/agentic-workflow-designer/SKILL.md
                                     .github/mcp.json
                                     skills/.../design-guide.md + CLAUDE_CODE_HANDOFF.md
```

Ordered actions:

1. **Freeze `patterson-skills`.** Harvest the three named assets, archive the repo. It is
   actively dangerous while it publishes a colliding `patterson-design` plugin.
2. **De-duplicate `ds/`.** Single source + publish-time snapshot. ~96M → well under 15M.
3. **Merge the catalogs.** One marketplace named `patterson`, in `patterson-marketplace`,
   listing all plugins. Retire `patterson-design` and `patterson-skills` as marketplace names.
4. **Adopt the `_template` contract repo-wide** — every plugin gets `version`, `license`,
   `keywords`, and the same directory shape.
5. **Add the governance layer** from `patterson-sh/templates`: `validate-config.mjs`
   (extended to check plugin.json ⟷ marketplace.json agreement and asset-path existence),
   `node --test`, `.githooks/pre-commit`, and the four governance workflows.
6. **Stand up `patterson-workflows`** and move the gh-aw workflows there, importing
   shared Patterson fragments rather than copying agentics' verbatim.
