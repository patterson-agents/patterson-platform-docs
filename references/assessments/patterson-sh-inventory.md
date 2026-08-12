# patterson-sh Reuse Inventory

Source root: `/workspaces/code/github.com/patterson-sh`
Read date: 2026-08-11. Excluded per instruction: `studio/` (373M), `vendor/` (113M), `node_modules/` (86M).

## Executive summary

`patterson-sh` is a **workspace shell**, not a product. Most top-level directories
(`plugins/`, `skills/`, `scripts/`, `assets/`, `data/`, `.config/`, `.claude-plugin/`,
`.github/`) contain only `.keep` placeholders. `docs/ARCHITECTURE.md` and
`docs/REFERENCES.md` are **zero bytes**. `AGENTS.md`, `README.md`, `CONTRIBUTING.md`
are **zero bytes**. The nested `patterson.sh/` subdirectory is a near-exact duplicate
of the root skeleton with the same empty placeholders.

The real value is concentrated in **three places**:

1. `templates/` — a genuinely complete, self-validating agent-first starter repo (776K).
2. `orgs/techdays-ai/` — 57 cloned upstream reference repos, including a full clone of
   `githubnext/agentics` at commit `1c6668b`. This is a research goldmine, not an asset
   to copy.
3. A handful of individual conventions: the `AGENTS.develop.md` → `AGENTS.md` git hook,
   and `packages/patterson-agent` (an `eve` framework agent app).

---

## A. `templates/` — the starter repo (the main prize)

This is the single most reusable artifact in `patterson-sh`. It is small, complete,
consistent, and every file is cross-referenced by a validator + test suite. Verdict on
the whole directory: **KEEP as the structural blueprint for every Patterson agent repo.**

| Path | What it does | Verdict | Rationale |
|---|---|---|---|
| `templates/marketplace/claude/manifest.json` | Claude-platform packaging manifest: name, `platform: claude`, entry, 3 exposed assets | **KEEP (concept) / ADAPT (schema)** | The dual-manifest idea is the crown jewel; the schema is homegrown and must be reconciled with real `.claude-plugin/plugin.json`. See `dual-manifest-pattern.md`. |
| `templates/marketplace/copilot/manifest.json` | Copilot-platform manifest: `platform: github-copilot`, same entry, different asset list | **KEEP (concept) / ADAPT (schema)** | Same object, two audience-specific asset projections. Exactly the model Patterson needs. |
| `templates/src/catalog.mjs` | Declares `frameworks`, `presets`, and `buildTemplatePlan()` returning a preset + a hard-coded `requiredFiles[]` governance list | **ADAPT** | The *pattern* (a machine-readable "every repo must contain these files" contract) is excellent. The *content* (react/vue/svelte frontend presets) is irrelevant to an agent platform. |
| `templates/src/cli.mjs` | 12-line CLI: `--preset <name>` → prints JSON plan to stdout | **ADAPT** | Right shape (plan-as-JSON, no side effects), wrong domain. Rewrite for agent-platform presets. |
| `templates/scripts/validate-config.mjs` | Parses all 5 JSON config files, asserts 5 required workflows exist, asserts issue templates exist. Exits non-zero on drift. | **KEEP** | ~40 lines, zero dependencies, catches real drift. Copy nearly verbatim; swap the file lists. |
| `templates/test/catalog.test.mjs` | `node --test` suite: preset catalog JSON matches code, plan includes governance files, unknown preset throws | **KEEP** | Proves the docs/code/config triangle stays in sync. Zero-dep `node:test`. |
| `templates/templates/presets/catalog.json` | Flat `{"presets": [...]}` list, the doc-side mirror of `src/catalog.mjs` | **ADAPT** | The two-sided mirror + test is the reusable idea. |
| `templates/hubs/catalog.json` | `hubs[]`, each with `skills[]` and `agents[]` paths — a role-based bundle index | **KEEP** | This is a *bundle/persona* concept that Claude marketplaces lack natively. Directly maps to Patterson's "engineering hub / brand hub" idea. |
| `templates/mcp/templates/base.mcp.json` | A generator contract (`inputs`, `outputs`, `requiredFiles`) named "MCP" | **DISCARD (name) / ADAPT (content)** | It is **not** MCP — it is a scaffold contract wearing MCP's name. Misleading. Keep the `requiredFiles` list, rename the file. |
| `templates/.github/workflows/ci.yml` | checkout → setup-node 20 → `npm ci` → `npm test` → `npm run validate` | **KEEP** | Minimal, correct, `permissions: contents: read`. |
| `templates/.github/workflows/codeql.yml` | CodeQL js/ts, push+PR+weekly cron, gated on public repo or GHAS enabled | **KEEP** | The `if:` gate on private-repo GHAS status is a nice touch for Patterson's mixed public/private repos. |
| `templates/.github/workflows/secret-scanning.yml` | `gitleaks/gitleaks-action@v2` on push + PR | **KEEP** | Cheap, mandatory for a brand-asset repo. |
| `templates/.github/workflows/project-intake.yml` | `actions/add-to-project@v1.0.2`, gated on `vars.PROJECT_URL` + `secrets.ADD_TO_PROJECT_PAT` being set | **KEEP** | The "no-op unless configured" `if:` gate makes it safe to ship in a template. |
| `templates/.github/workflows/docs-maintainer.yml` | PR-on-docs + weekly cron → runs `npm run validate` | **DISCARD** | Named like an agent, is actually just the CI validate job again. Replace with a real `gh aw` docs workflow. |
| `templates/.github/dependabot.yml` | npm weekly (grouped dev-deps, `chore` prefix) + github-actions weekly | **KEEP** | Grouping + commit-message prefix are the parts worth copying. |
| `templates/.github/ISSUE_TEMPLATE/{bug_report,feature_request}.yml` | Structured issue forms with required fields | **ADAPT** | Good form structure; fields reference "preset" which is domain-specific. |
| `templates/.github/ISSUE_TEMPLATE/config.yml` | `blank_issues_enabled: false` + one contact link to docs | **KEEP** | One-liner, right default. |
| `templates/.github/copilot-instructions.md` | 5 bullets: prefer catalog presets, keep agent-first, preserve governance, keep docs in sync | **ADAPT** | Correct *shape* (short, imperative, repo-specific) but 6 lines is too thin. Use as the skeleton. |
| `templates/.githooks/pre-commit` | 4-line sh: `npm test && npm run validate` | **KEEP** | Paired with `git config core.hooksPath .githooks`. |
| `templates/.pre-commit-config.yaml` | `repos: [local]` running the same two commands via the `pre-commit` framework | **DISCARD** | Redundant with `.githooks/pre-commit` and adds a Python toolchain dependency. Pick one. |
| `templates/agents/docs-maintainer.md` | 9-line agent brief: goal + 3 responsibilities | **ADAPT** | No YAML frontmatter — not loadable by Claude Code or Copilot as-is. Concept fine, format wrong. |
| `templates/agents/template-scaffolder.md` | 3 lines | **DISCARD** | Too thin to be useful. |
| `templates/skills/docs-maintainer.md` | 6-line "When invoked" skill | **ADAPT** | Same problem: not a `SKILL.md` with frontmatter, not in a `skills/<name>/` dir. |
| `templates/skills/template-release.md` | 6-line release checklist skill | **ADAPT** | Content is a decent release gate; needs real skill packaging. |
| `templates/specs/spec-kit/project-template-spec.md` | 23-line spec: scope, required outputs, preset model, quality gates | **KEEP (as a pattern)** | The **only** spec-kit artifact in the whole tree. Demonstrates the "required outputs + quality gates" shape worth standardizing on. |
| `templates/docs/marketplaces.md` | Lists 5 target ecosystems (Claude, awesome-copilot, githubnext/agentics, github/gh-aw, copilotkit) + the maintainer update checklist | **KEEP** | This is the strategic intent document. The 5 named ecosystems are the distribution roadmap. |
| `templates/docs/style-guide.md` | 4 bullets on scaffold defaults | **DISCARD** | Nothing Patterson-specific; superseded by the design-system brand rules. |
| `templates/docs/github-projects.md` | Documents `PROJECT_URL` var + `ADD_TO_PROJECT_PAT` secret needed to activate intake | **KEEP** | Exactly the "here's the config you must set" doc every template needs. |
| `templates/templates/base/README.md` | "Base Template Contract" — the human-readable mirror of `requiredFiles[]` | **KEEP** | Third leg of the contract triangle (code / JSON / prose). |
| `templates/package.json` | `type: module`, `private: true`, node>=20, two scripts (`test`, `validate`), **zero dependencies** | **KEEP** | Zero-dependency tooling is the right call for a template repo. |
| `templates/README.md` | 49 lines: what it provides, quick start, presets, marketplace refs | **ADAPT** | Good structure to copy for a Patterson README. |

### Structural verdict on `templates/`

**KEEP the skeleton, replace the payload.** The governance triangle
(`src/catalog.mjs` requiredFiles ⟷ `scripts/validate-config.mjs` ⟷
`test/catalog.test.mjs` ⟷ `templates/base/README.md`) is genuinely reusable and is the
part worth lifting wholesale. Everything downstream of it — the react/vue/svelte
presets — is dead weight for an agent platform.

Two real gaps to close when adapting:
- The `agents/` and `skills/` files have **no YAML frontmatter**, so neither Claude Code
  nor Copilot can actually load them. They are prose stubs.
- Nothing here is a `.claude-plugin/plugin.json` or `.claude-plugin/marketplace.json`.
  The homegrown `marketplace/*/manifest.json` schema is **not** what the Claude Code CLI
  reads. This must be reconciled — see `dual-manifest-pattern.md`.

---

## B. Root-level assets outside `templates/`

| Path | What it is | Verdict | Rationale |
|---|---|---|---|
| `.githooks/post-checkout` | On branch switch, copies `AGENTS.develop.md` → `AGENTS.md` if absent. Guards on `$3 = 1` (branch checkout, not file checkout). Never overwrites. | **KEEP** | Genuinely clever, 15 lines, solves the "per-branch agent work plan" problem. Directly reusable. |
| `AGENTS.develop..md` (note the double dot — filename typo) | The develop-branch agent reference: setup instructions, gitflow rules, PR base-branch discipline, changelog conventions | **ADAPT** | The **gitflow/PR discipline section is excellent** and captures a real failure mode ("a subagent runs `/git pr create` with no `--base`, tooling picks `master`, PR lands wrong"). Fix the filename typo — the hook looks for `AGENTS.develop.md` and will silently never fire. |
| `AGENTS.md`, `README.md`, `CONTRIBUTING.md`, `docs/ARCHITECTURE.md`, `docs/REFERENCES.md` | All **0 bytes** | **DISCARD** | Empty. `CLAUDE.md` is a symlink → `AGENTS.md`, so it is also empty. |
| `packages/patterson-agent/` | An `eve` framework agent app: `agent/agent.ts` (`defineAgent({model:"anthropic/claude-sonnet-5"})`), `agent/instructions.md` ("You are a helpful assistant"), `agent/channels/eve.ts`, deployed via Vercel (`.vercelignore`) | **ADAPT** | Real dependency choices (`eve ^0.31`, `ai ^7.0.38`, `zod 4.4.3`, node 24) but the agent itself is a stub. Keep as evidence of the runtime-agent direction; do not copy the content. |
| `packages/patterson-agent/AGENTS.md` | Tells agents to read `node_modules/eve/docs/` first and to use `eve registry search` before hand-rolling integrations | **KEEP (as a pattern)** | "Read the installed package's own docs before coding" is a reusable AGENTS.md instruction. |
| `.oxlintrc.json` (3.8K) + `.oxfmtrc.jsonc` | Oxlint/oxfmt configuration | **ADAPT** | A real, tuned lint config. Worth evaluating vs. Patterson's existing standards. |
| `vtcode.toml` (21K) | vtcode agent tool configuration | **ADAPT** | Large and detailed. Relevant only if vtcode stays in the toolchain. |
| `.agents/skills/ccpm/` | Vendored clone of `automazeio/ccpm` — "The Project Manager Agent", spec-driven PRD→epic→GitHub-issue workflow, Agent Skills–compatible (agentskills.io), MIT, 1MB icon.png | **KEEP as reference, DISCARD from repo** | Third-party MIT skill. Excellent reference for **cross-harness skill packaging** (claims Claude Code / Codex / OpenCode / Factory / Amp / Cursor compat) — study its `skill/` layout. Do not vendor a 1.2M third-party repo into a Patterson repo; declare it as a dependency. |
| `orgs/techdays-ai/` | 57 cloned upstream repos incl. `agentics`, `agentics-beyond-code`, `autoloop`, `agent-plugins`, `claude-skills`, `knowledge-work-plugins`, `everything-claude-code`, `spec-kit-security-review`, `secure-ai-tooling`, `patterson-cli` (+ 22K `pattersoncli.spec.md`) | **KEEP as a local research corpus** | This is the local mirror of the entire upstream agent ecosystem. Do **not** copy into Patterson repos, but do read from it — notably `orgs/techdays-ai/agentics` is a full clone of `githubnext/agentics` @ `1c6668b`, which is faster and more complete than web-fetching. |
| `orgs/patterson-agents/` | Same directory as `/workspaces/code/github.com/patterson-agents` (bind/duplicate) | **N/A** | Not a separate asset. |
| `orgs/patterson-sh/` | Empty | **DISCARD** | |
| `.gitmodules` | One submodule: `orgs/patterson-agents/patterson-design-plugins` → `github.com/patterson-agents/patterson-design-plugins` | **DISCARD** | Submodule-per-plugin-repo does not scale and conflicts with the marketplace model. |
| `patterson.sh/` (291K) | Nested near-duplicate of the root skeleton: same `.keep` placeholders, same empty `docs/ARCHITECTURE.md`/`REFERENCES.md`, same `AGENTS.develop..md`, same `.githooks/post-checkout` | **DISCARD** | Pure duplication. Two copies of the same empty skeleton is a maintenance hazard. Pick one root. |
| `.remember/`, `.harn/`, `.mux/`, `.vtcode/`, `.fast-agent/` | Tool state/cache dirs (35K, 21K, 64K, 10K, 2K) | **DISCARD** | Local tooling state, not portable assets. |
| `patterson.code-workspace`, `.vscode/` | VS Code multi-root workspace + settings | **ADAPT** | Trivially regenerable. |
| `mcp.json` | **0 bytes** | **DISCARD** | Empty. |
| `.claude-plugin/` | Empty directory | **DISCARD** | Placeholder only — despite the name, there is no marketplace.json here. |
| `.claude/settings.local.json` | Local Claude settings | **DISCARD** | Machine-local. |

---

## C. Top 10 highest-value assets, ranked

1. `templates/marketplace/{claude,copilot}/manifest.json` — the dual-platform manifest pattern.
2. `templates/scripts/validate-config.mjs` — zero-dep drift detector.
3. `templates/src/catalog.mjs` `requiredFiles[]` — machine-readable governance contract.
4. `templates/test/catalog.test.mjs` — proves docs/code/config stay in sync.
5. `templates/hubs/catalog.json` — role-based skill+agent bundling ("hubs").
6. `templates/.github/workflows/{ci,codeql,secret-scanning,project-intake}.yml` — the four-workflow governance floor.
7. `.githooks/post-checkout` — per-branch `AGENTS.md` bootstrap.
8. `AGENTS.develop..md` gitflow/PR-base discipline section.
9. `templates/docs/marketplaces.md` — the 5-ecosystem distribution roadmap.
10. `templates/specs/spec-kit/project-template-spec.md` — the "required outputs + quality gates" spec shape.
