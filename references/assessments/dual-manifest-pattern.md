# The Dual Manifest Pattern (claude + copilot)

Source: `/workspaces/code/github.com/patterson-sh/templates/`

This is the single most important idea to carry forward from Daniel's prior work: **one
codebase, one entry point, two platform-scoped manifests that project different asset
subsets to different agent harnesses.**

---

## 1. Verbatim manifest contents

### `templates/marketplace/claude/manifest.json`

```json
{
  "name": "patterson-agent-templates",
  "platform": "claude",
  "description": "Agent-first project template and preset generator",
  "entry": "src/cli.mjs",
  "assets": [
    "agents/docs-maintainer.md",
    "skills/docs-maintainer.md",
    "specs/spec-kit/project-template-spec.md"
  ]
}
```

### `templates/marketplace/copilot/manifest.json`

```json
{
  "name": "patterson-agent-templates",
  "platform": "github-copilot",
  "description": "Agent-first project template and preset generator",
  "entry": "src/cli.mjs",
  "assets": [
    ".github/copilot-instructions.md",
    "hubs/catalog.json",
    "mcp/templates/base.mcp.json"
  ]
}
```

---

## 2. How the two manifests differ

| Field | claude | copilot |
|---|---|---|
| `name` | `patterson-agent-templates` | `patterson-agent-templates` — **identical** |
| `platform` | `claude` | `github-copilot` |
| `description` | identical | identical |
| `entry` | `src/cli.mjs` | `src/cli.mjs` — **identical** |
| `assets` | `agents/*.md`, `skills/*.md`, `specs/spec-kit/*.md` | `.github/copilot-instructions.md`, `hubs/catalog.json`, `mcp/templates/base.mcp.json` |

**The entire delta is `platform` + `assets`.** The shared identity (name, description)
and the shared executable (`entry`) are byte-identical. This encodes the design
principle cleanly:

- **Claude gets the agent-native primitives**: subagent briefs (`agents/`), skills
  (`skills/`), and the spec-kit spec. These are the things Claude Code loads as
  first-class objects.
- **Copilot gets the repo-instruction + catalog primitives**: `copilot-instructions.md`
  (which Copilot reads automatically from `.github/`), the hub catalog, and the
  generator contract. Copilot has no native "subagent brief" or "skill" file concept
  in this model, so it is fed the instruction file and the machine-readable catalogs
  instead.
- **Both** get the same `entry` executable, so behaviour cannot diverge between
  platforms — only *discovery surface* diverges.

---

## 3. How the build/validate scripts consume them

There is **no build step**. `templates/package.json` declares exactly two scripts and
zero dependencies:

```json
"scripts": {
  "test": "node --test",
  "validate": "node scripts/validate-config.mjs"
},
"engines": { "node": ">=20" }
```

### 3a. `scripts/validate-config.mjs` — the only consumer

The validator treats both manifests as *opaque JSON that must parse*, alongside three
other config files:

```js
const jsonFiles = [
  "marketplace/claude/manifest.json",
  "marketplace/copilot/manifest.json",
  "hubs/catalog.json",
  "mcp/templates/base.mcp.json",
  "templates/presets/catalog.json"
];

for (const file of jsonFiles) {
  const abs = new URL(file, repoRoot);
  const content = await readFile(abs, "utf8");
  JSON.parse(content);
}
```

It then asserts the five governance workflows exist:

```js
const requiredWorkflows = [
  "ci.yml", "codeql.yml", "secret-scanning.yml",
  "docs-maintainer.yml", "project-intake.yml"
];
for (const workflow of requiredWorkflows) {
  if (!workflows.includes(workflow)) {
    throw new Error(`Missing required workflow: .github/workflows/${workflow}`);
  }
}
```

…and that the two issue-template forms are readable. On success it prints
`Configuration validation passed.`

**Critical limitation:** validation is *syntactic only*. It confirms the manifests are
valid JSON. It does **not**:
- validate the manifests against any schema,
- check that `entry` (`src/cli.mjs`) exists,
- check that any path in `assets[]` exists on disk,
- check that the two manifests agree on `name`/`description`/`entry`,
- check that `platform` is one of a known set.

Every one of those five checks is a trivial addition and should be added when adapting.

### 3b. `src/catalog.mjs` — the governance contract (parallel, not connected)

`buildTemplatePlan(preset)` returns a plan whose `requiredFiles[]` enumerates the
governance floor for any generated project:

```js
requiredFiles: [
  ".github/workflows/ci.yml",
  ".github/workflows/codeql.yml",
  ".github/workflows/secret-scanning.yml",
  ".github/workflows/project-intake.yml",
  ".github/dependabot.yml",
  ".github/ISSUE_TEMPLATE/bug_report.yml",
  ".github/ISSUE_TEMPLATE/feature_request.yml",
  ".github/copilot-instructions.md",
  "mcp/templates/base.mcp.json",
  "agents/docs-maintainer.md",
  "skills/docs-maintainer.md",
  "specs/spec-kit/project-template-spec.md",
  ".githooks/pre-commit",
  "hubs/catalog.json",
  ".github/ISSUE_TEMPLATE/config.yml"
]
```

Note this list is the **union** of the two manifests' `assets[]` arrays plus the
governance workflows. But that relationship is *implicit and unenforced* — nothing
checks that `assets[]` ⊆ `requiredFiles[]`. That is the obvious next validator rule.

### 3c. `src/cli.mjs` — the shared entry point

```js
const plan = buildTemplatePlan(preset);
process.stdout.write(`${JSON.stringify(plan, null, 2)}\n`);
```

Pure function → JSON on stdout, no filesystem side effects. Both manifests point at
this same file, which is why the platforms cannot diverge behaviourally.

### 3d. `test/catalog.test.mjs` — the third leg

Uses `node:test` (zero deps) to assert that `templates/presets/catalog.json` and
`src/catalog.mjs` agree, and that the plan contains the governance files. It does
**not** currently touch the manifests.

### 3e. Enforcement chain

```
.githooks/pre-commit        →  npm test && npm run validate
.pre-commit-config.yaml     →  npm test && npm run validate   (redundant duplicate)
.github/workflows/ci.yml    →  npm ci && npm test && npm run validate
.github/workflows/docs-maintainer.yml → npm ci && npm run validate
```

Same two commands enforced at four layers. Local hooks require a one-time
`git config core.hooksPath .githooks`.

---

## 4. Reconciling with the real Claude Code schema

The homegrown `marketplace/claude/manifest.json` is **not** what the Claude Code CLI
reads. The actual Claude Code contract, as already implemented correctly in
`patterson-agents/patterson-marketplace`, is:

- `.claude-plugin/marketplace.json` at repo root — the catalog, with
  `$schema: https://json.schemastore.org/claude-code-marketplace.json`, `name`,
  `owner`, `metadata`, and a `plugins[]` array of `{name, source, description,
  category, tags}`.
- `.claude-plugin/plugin.json` inside each plugin dir — `{name, version, description,
  author, license, keywords}`.
- `skills/<name>/SKILL.md`, `commands/*.md`, `agents/*.md` at the **plugin root**
  (not inside `.claude-plugin/`).

And the Copilot side, as implemented in `patterson-skills` and `patterson-marketplace`:

- `.github/copilot-instructions.md` — repo-wide instructions, auto-loaded.
- `.github/agents/<name>.md` — Copilot custom agents, YAML frontmatter with
  `name`, `description`, optional `disable-model-invocation`.
- `.github/skills/<name>/SKILL.md` — Copilot skills, same frontmatter shape.
- `.github/mcp.json` — MCP server declarations.

### Recommended synthesis for Patterson

Keep the **principle** from `patterson-sh/templates` (one source of truth, two platform
projections, identical identity + entry) but express it in the **real** schemas:

```
repo-root/
  .claude-plugin/marketplace.json      ← Claude catalog (real schema)
  plugins/<name>/.claude-plugin/plugin.json
  plugins/<name>/skills/<name>/SKILL.md
  plugins/<name>/agents/*.md
  plugins/<name>/commands/*.md
  .github/copilot-instructions.md      ← Copilot projection
  .github/agents/<name>.md             ← generated from plugins/<name>/agents/
  .github/skills/<name>/SKILL.md       ← generated from plugins/<name>/skills/
  .github/mcp.json
  scripts/validate-config.mjs          ← asserts the two projections agree
```

i.e. **the Copilot surface becomes a generated projection of the Claude plugin tree**,
and `validate-config.mjs` becomes the thing that proves they have not drifted. That is
the `patterson-sh/templates` idea, upgraded from a hand-maintained pair of stub
manifests into an enforced invariant.

`patterson-marketplace/scripts/plugins.sh` already does the *runtime* half of this —
installing/updating the same plugin across both the `claude` and `copilot` CLIs with a
`--claude` / `--copilot` scope flag. Pair the two and the dual-platform story is
complete end to end.
