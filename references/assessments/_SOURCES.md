# Sources

Compiled 2026-08-11. Bash sandbox paths are under `/sessions/quirky-clever-hopper/mnt/`;
canonical host paths under `/workspaces/code/github.com/` are given below.

## URLs fetched

| URL | What it gave |
|---|---|
| https://github.com/githubnext/agentics | Repo landing page: full workflow catalog by category, shared-fragment list, update commands (`gh extensions upgrade` / `gh aw upgrade` / `gh aw update`), pointer to `chrizbo/agentics-beyond-code`, MIT license, 850 stars / 121 forks / 536 commits |
| https://github.github.io/gh-aw/ | gh-aw home: what it is, Public Preview status, engines (Copilot/Claude/Codex/Gemini/Pi), safety architecture (sandbox, AWF firewall, safe outputs, threat detection, integrity filtering, compile-time validation), cost controls (`max-ai-credits`, OTel), example daily-issues-report workflow |
| https://raw.githubusercontent.com/github/gh-aw/main/.github/aw/github-agentic-workflows.md | **Authoritative frontmatter reference.** Full file format, compilation commands, key principles, security checklist, and four canonical patterns (issue triage, scheduled report, slash-command PR review, agent dispatch) |
| https://raw.githubusercontent.com/github/gh-aw/main/.github/aw/safe-outputs.md | Safe-outputs index: the four reference categories (content / management / automation / runtime) and shared rules |
| https://github.github.io/gh-aw/setup/quick-start/ | Install + `gh aw add-wizard` flow, engine auth options per engine, `.lock.yml` semantics, customization loop, full docs sitemap (design patterns, practices, reference, specs) |

Referenced but not fetched (noted in docs for follow-up): `github.github.io/gh-aw/reference/frontmatter-full/`,
`.../reference/safe-outputs/`, `.../introduction/architecture/`, `.../guides/using-at-scale/`,
`.../practices/safe-rollout/`, `github.com/chrizbo/agentics-beyond-code`,
`github.com/githubnext/gh-aw-workshop`, `github.github.com/gh-aw/llms-full.txt`.

## Local paths read — PART 1: patterson-sh

Root: `/workspaces/code/github.com/patterson-sh`

### Directory listings / size surveys
- repo root (`ls -la`, `du -sh`) — confirmed `studio/` 373M, `vendor/` 113M, `node_modules/` 86M, `.git/` 246M all excluded
- `templates/` full tree (depth 4)
- `packages/`, `orgs/`, `plugins/`, `skills/`, `.claude/`, `.claude-plugin/`, `.github/`, `.githooks/`, `docs/`, `scripts/`, `assets/`, `data/`, `.config/`, `.agents/`
- `patterson.sh/` full tree (depth 3)
- `orgs/patterson-agents/`, `orgs/patterson-sh/`, `orgs/techdays-ai/` listings

### Files read in full
- `templates/marketplace/claude/manifest.json`
- `templates/marketplace/copilot/manifest.json`
- `templates/package.json`
- `templates/src/cli.mjs`
- `templates/src/catalog.mjs`
- `templates/scripts/validate-config.mjs`
- `templates/test/catalog.test.mjs`
- `templates/hubs/catalog.json`
- `templates/templates/presets/catalog.json`
- `templates/mcp/templates/base.mcp.json`
- `templates/.github/dependabot.yml`
- `templates/.pre-commit-config.yaml`
- `templates/.githooks/pre-commit`
- `templates/.github/ISSUE_TEMPLATE/config.yml`
- `templates/.github/ISSUE_TEMPLATE/bug_report.yml`
- `templates/.github/workflows/ci.yml`
- `templates/.github/workflows/codeql.yml`
- `templates/.github/workflows/docs-maintainer.yml`
- `templates/.github/workflows/project-intake.yml`
- `templates/.github/workflows/secret-scanning.yml`
- `templates/.github/copilot-instructions.md`
- `templates/README.md`
- `templates/agents/docs-maintainer.md`
- `templates/agents/template-scaffolder.md`
- `templates/skills/docs-maintainer.md`
- `templates/skills/template-release.md`
- `templates/specs/spec-kit/project-template-spec.md`
- `templates/docs/marketplaces.md`
- `templates/docs/style-guide.md`
- `templates/docs/github-projects.md`
- `templates/templates/base/README.md`
- `AGENTS.develop..md`
- `.githooks/post-checkout`
- `.gitmodules`
- `docs/ARCHITECTURE.md` (0 bytes)
- `docs/REFERENCES.md` (0 bytes)
- `packages/patterson-agent/package.json`
- `packages/patterson-agent/AGENTS.md`
- `packages/patterson-agent/agent/instructions.md`
- `packages/patterson-agent/agent/agent.ts`
- `.agents/skills/ccpm/README.md` (partial)

### Local clone of githubnext/agentics (used as primary source for Part 2)
`/workspaces/code/github.com/patterson-sh/orgs/techdays-ai/agentics` @ commit `1c6668b`
- full tree (depth 2), `.github/` file listing, `workflows/` count (61) and `workflows/shared/` listing
- `Makefile`
- `workflows/issue-triage.md` (full — frontmatter + body)
- `docs/issue-triage.md` (install instructions, mermaid diagram, human-in-the-loop notes)
- `workflows/shared/reporting.md`
- `.github/skills/agentic-workflows/SKILL.md`
- `.github/agents/agentic-workflows.md`

Sibling reference repos noted but not read: `orgs/techdays-ai/{agentics-beyond-code,
autoloop, agent-plugins, claude-skills, knowledge-work-plugins, everything-claude-code,
spec-kit-security-review, secure-ai-tooling, patterson-cli, CopilotKit, eve, ...}` (57 total).

## Local paths read — PART 3: patterson-agents

Root: `/workspaces/code/github.com/patterson-agents` (`downloads/` ignored per instruction)

### patterson-marketplace
- `.claude-plugin/marketplace.json`
- `.claude/settings.json`
- `plugins/patterson-design/.claude-plugin/plugin.json`
- `plugins/_template/.claude-plugin/plugin.json`
- `plugins/_template/hooks/hooks.json`
- `docs/managed-settings.template.json`
- `scripts/README.md`
- `.github/skills/patterson-design/SKILL.md` (partial)
- `README.md`
- tree listings for `plugins/`, `scripts/`, `.github/`
- `git remote -v`, `git log --oneline -3`

### patterson-skills
- `.claude-plugin/marketplace.json`
- `skills/patterson-design-system/SKILL.md`
- `.github/skills/agentic-workflow-designer/SKILL.md`
- `.github/mcp.json`
- tree listings for `skills/`, `plugins/`, `.github/`
- `git remote -v`, `git log --oneline -3`

### patterson-design-plugins
- `.claude-plugin/marketplace.json`
- `plugins/patterson-brand/.claude-plugin/plugin.json`
- `plugins/patterson-brand/skills/patterson-design/SKILL.md`
- `.github/copilot-instructions.md`
- `CLAUDE.md`
- `.github/workflows/repo-chronicle.md` (partial)
- `.github/workflows/repo-chronicle.lock.yml` (metadata header + manifest)
- `.github/workflows/ci-doctor.lock.yml` (metadata header)
- `.github/workflows/repo-ask.lock.yml` (source line)
- tree listings for `plugins/`, `.github/`, `.devcontainer/`, `.vscode/`
- `du -sh` per plugin and per `ds/` directory
- `md5sum plugins/*/ds/tokens/colors.css` (duplication proof — all 8 identical)
- `find plugins -type f -size +500k` (large-asset duplication proof)
- `git remote -v`, `git log --oneline -3`

## Not read (explicitly out of scope)
- `patterson-sh/studio/` (373M), `patterson-sh/vendor/` (113M), `patterson-sh/node_modules/` (86M)
- `patterson-agents/downloads/` (declared stale and non-authoritative by the user)
- `patterson-agents/agent-platform-scaffold.skill` (217K zip artifact)
- `patterson-agents/cli/`, `patterson-agents/design-artifacts/`, `patterson-agents/.remember/`
