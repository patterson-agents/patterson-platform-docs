# Token budget

The page people skip and should not.

`claude plugin details <path>` reports a component inventory and projected token cost,
split two ways:

- **Always-on** tokens, added to every session by skill and agent descriptions whether
  or not anything fires
- **On-invoke** tokens, paid only when a component actually runs

A preset costing a thousand always-on tokens is a bad preset no matter how good its
content is, because every engineer pays for it in every session forever.

## How to keep it low

Keep `SKILL.md` short and push occasional detail into sibling reference files, which are
read on demand. Progressive disclosure is not a style preference here; it is the
difference between a skill that costs nothing at rest and one that taxes every session.

Write descriptions as trigger conditions rather than summaries. A precise description is
both shorter and more accurate at firing.

Prefer one skill that covers a domain over five that split it, unless the split
genuinely changes when each fires.

## Measuring

CI in `{{ORG}}/agent-plugins` runs `plugin details` on every plugin. Treat a rising
always-on number the way you would treat a rising bundle size.
