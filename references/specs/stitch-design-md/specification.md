# Google Stitch — DESIGN.md specification

**Sources:**
- https://stitch.withgoogle.com/docs/design-md/specification (JS-rendered; no extractable text — canvas/SPA)
- https://raw.githubusercontent.com/google-labs-code/stitch-skills/main/plugins/stitch-utilities/skills/design-md/SKILL.md (AUTHORITATIVE — the normative structure below is quoted from here)
- https://raw.githubusercontent.com/google-labs-code/stitch-skills/main/README.md

**Fetched:** 2026-08-11
**Completeness:** Structure is complete and authoritative. The marketing page at stitch.withgoogle.com could not be
text-extracted; the canonical structure lives in the `design-md` skill shipped by google-labs-code/stitch-skills.

---

## Required document structure (verbatim from the skill)

```markdown
# Design System: [Project Title]
**Project ID:** [Insert Project ID Here]

## 1. Visual Theme & Atmosphere
(Description of the mood, density, and aesthetic philosophy.)

## 2. Color Palette & Roles
(List colors by Descriptive Name + Hex Code + Functional Role.)

## 3. Typography Rules
(Description of font family, weight usage for headers vs. body, and letter-spacing character.)

## 4. Component Stylings
* **Buttons:** (Shape description, color assignment, behavior).
* **Cards/Containers:** (Corner roundness description, background color, shadow depth).
* **Inputs/Forms:** (Stroke style, background).

## 5. Layout Principles
(Description of whitespace strategy, margins, and grid alignment.)
```

## Authoring rules (normative)

The document is a **Semantic Design System** — Stitch interprets design through *"Visual Descriptions" supported by
specific color values*. It is prose for a model, not a token file.

1. **Language** — descriptive design terminology and natural language exclusively.
2. **Colors** — every colour gets THREE parts:
   - a descriptive, natural-language name conveying character (e.g. "Deep Muted Teal-Navy")
   - the exact hex in parentheses (e.g. `#294056`)
   - its functional role (e.g. "Used for primary actions")
3. **Geometry** — translate technical values into physical descriptions:
   - `rounded-full` → "Pill-shaped"
   - `rounded-lg` → "Subtly rounded corners"
   - `rounded-none` → "Sharp, squared-off edges"
4. **Depth** — describe shadow quality: "Flat", "Whisper-soft diffused shadows", "Heavy, high-contrast drop shadows".
5. **Atmosphere** — evocative adjectives for the vibe: "Airy", "Dense", "Minimalist", "Utilitarian".
6. **Context** — explain the *why*, not just the *what*.

## Explicit anti-patterns

- Using technical jargon without translation (`rounded-xl` instead of "generously rounded corners")
- Omitting hex codes, or using only descriptive names
- Failing to state the functional role of an element
- Vague atmosphere descriptions
- Ignoring shadows and spacing patterns

## Notes for Patterson

- `Project ID` is a Stitch-native concept (`projects/{numeric}`). Patterson has no Stitch project; use the
  repository/plugin identifier instead and note the substitution.
- DESIGN.md is **complementary to, not a replacement for**, `tokens.json` and `theme.css`. It is the prose layer a
  model reads; the token files are what a build consumes.
- The `stitch-utilities` plugin also ships `taste-design` (premium/anti-generic DESIGN.md) and `extract-design-md`
  (derive DESIGN.md from frontend source) — both relevant if Patterson later wants round-tripping.

## Packaging observation (relevant to our own architecture)

`stitch-skills` is a working reference implementation of the Agent Skills standard with a **root `plugin.json`**
(Copilot format — no `$schema`), three plugins, and this skill layout:

```
skills/<skill-name>/
├── SKILL.md           — "Mission Control" for the agent
├── scripts/           — executable enforcers (validation & networking)
├── resources/         — knowledge base (checklists & style guides)
└── examples/          — syntactically valid "gold standard" references
```

Install paths: `npx plugins add google-labs-code/stitch-skills --scope project --target claude-code`
(Claude Code) and `codex plugin marketplace add ... --sparse` (Codex). Worth copying this shape.

**Prerequisite for the Stitch skills themselves:** the Stitch MCP server must be configured
(https://stitch.withgoogle.com/docs/mcp/setup/). Patterson does not need Stitch MCP merely to *author* a
conformant DESIGN.md — only to drive Stitch itself.
