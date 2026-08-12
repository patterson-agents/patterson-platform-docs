# Design tokens

`theme.json` is the committed record of the Patterson Companies design system
(theme-ui spec, from patterson-design-plugins, plugins/patterson-brand/ds/), carrying
one deliberate deviation recorded in `$meta.variant`: text, link, and semantic
foreground colors are darkened for WCAG AA contrast on white surfaces, while the
brand hues (navy, sky, teal, purple, green) are unchanged. Pull colors, type, and
radii from here when generating any visual artifact for the platform, and re-pin
against upstream the same way specs are re-pinned: deliberately, with a diff.
