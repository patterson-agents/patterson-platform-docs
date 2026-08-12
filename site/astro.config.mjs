// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';
import starlight from '@astrojs/starlight';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

// Patterson-branded Starlight documentation site.
//
// Branding is applied entirely through `src/styles/patterson.css`, which remaps
// Starlight's `--sl-*` custom properties onto Patterson brand tokens. No Starlight
// component is ejected, so the theme survives Starlight upgrades.
//
// The sidebar is built at config-eval time by walking `src/content/docs/**`,
// which `../scripts/build-site-content.ts` generates from `../references/**`.
// Run that script before `astro build`/`astro dev` — a missing content dir is
// treated as "no pages yet" rather than a crash, so this file also loads
// cleanly before the pipeline has ever run.
//
// https://astro.build/config

const DOCS_DIR = fileURLToPath(new URL('./src/content/docs', import.meta.url));

/** Reads the `title:` frontmatter field out of a generated content file. */
function pageTitle(absPath) {
  try {
    const raw = readFileSync(absPath, 'utf8');
    const m = raw.match(/^title:\s*"(.*)"\s*$/m);
    return m ? m[1] : undefined;
  } catch {
    return undefined;
  }
}

function humanize(name) {
  const base = name.replace(/\.mdx?$/, '');
  const spaced = base.replace(/[-_]+/g, ' ').trim();
  return spaced ? spaced.charAt(0).toUpperCase() + spaced.slice(1) : base;
}

function safeReaddir(dir) {
  try {
    return readdirSync(dir);
  } catch {
    return [];
  }
}

function isDir(p) {
  try {
    return statSync(p).isDirectory();
  } catch {
    return false;
  }
}

/**
 * Recursively builds Starlight sidebar items from a content directory: `.md`
 * files become links (label = frontmatter title, falling back to a humanized
 * filename), sub-directories become nested collapsed groups (label =
 * humanized directory name), sorted alphabetically throughout.
 */
function autoGroup(absDir, routePrefix) {
  const entries = safeReaddir(absDir).sort((a, b) => a.localeCompare(b));
  const items = [];
  for (const entry of entries) {
    const full = join(absDir, entry);
    if (isDir(full)) {
      items.push({
        label: humanize(entry),
        collapsed: true,
        items: autoGroup(full, `${routePrefix}/${entry}`),
      });
    } else if (entry.endsWith('.md')) {
      const slug = entry.replace(/\.md$/, '');
      items.push({
        label: pageTitle(full) ?? humanize(entry),
        link: `${routePrefix}/${slug}/`,
      });
    }
  }
  return items;
}

/**
 * The `platforms/vscode` group: the two `_NORMATIVE-*` distillations surface
 * first with hand-written labels, everything else follows alphabetically.
 */
function vscodeItems() {
  const dir = join(DOCS_DIR, 'platforms/vscode');
  const files = safeReaddir(dir).filter((f) => f.endsWith('.md'));
  const normativeOrder = ['NORMATIVE-agent-plugins.md', 'NORMATIVE-agent-harnesses.md'];
  const normativeLabels = {
    'NORMATIVE-agent-plugins.md': 'Agent plugins — normative distillation',
    'NORMATIVE-agent-harnesses.md': 'Agent harnesses — normative distillation',
  };
  const items = [];
  for (const f of normativeOrder) {
    if (files.includes(f)) {
      items.push({ label: normativeLabels[f], link: `/platforms/vscode/${f.replace(/\.md$/, '')}/` });
    }
  }
  const rest = files.filter((f) => !normativeOrder.includes(f)).sort((a, b) => a.localeCompare(b));
  for (const f of rest) {
    items.push({ label: pageTitle(join(dir, f)) ?? humanize(f), link: `/platforms/vscode/${f.replace(/\.md$/, '')}/` });
  }
  return items;
}

function specsGroups() {
  const dir = join(DOCS_DIR, 'specs');
  return safeReaddir(dir)
    .filter((entry) => isDir(join(dir, entry)))
    .sort((a, b) => a.localeCompare(b))
    .map((entry) => ({
      label: entry, // a2ui, acp, agent-plugins, agent-skills, ahp, mcp, mcp-apps, stitch-design-md
      collapsed: true,
      items: autoGroup(join(dir, entry), `/specs/${entry}`),
    }));
}

export default defineConfig({
  site: 'https://docs.patterson.sh',

  // Astro's default image service compiles sharp, which carries an open advisory.
  // The passthrough service copies images through untouched — no native binary,
  // no optimization. Docs sites rarely need the pipeline.
  image: { service: passthroughImageService() },

  integrations: [
    starlight({
      title: 'Patterson Platform Docs',
      description: 'The reference library for agent platforms',
      tagline: 'The reference library for agent platforms',
      logo: {
        light: './src/assets/patterson-logo-navy.svg',
        dark: './src/assets/patterson-logo-white.svg',
        replacesTitle: true,
      },
      favicon: '/favicon.svg',
      customCss: ['./src/styles/patterson.css'],
      // Proxima Nova is served by Adobe Fonts kit uth1qfm. Load it from the kit
      // only — Adobe's terms do not permit re-hosting Typekit payloads, so never
      // commit font binaries or @font-face declarations for it.
      head: [
        {
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: 'https://use.typekit.net/uth1qfm.css',
          },
        },
      ],
      social: [
        {
          icon: 'external',
          label: 'Patterson Companies',
          href: 'https://www.pattersoncompanies.com',
        },
      ],
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
      pagination: true,
      expressiveCode: {
        frames: { showCopyToClipboardButton: true },
      },
      // Built from the generated content tree — see the module-level comment.
      // Regenerate with `node ../scripts/build-site-content.ts` before building
      // whenever references/** changes; the sidebar picks it up automatically.
      sidebar: [
        {
          label: 'Platforms',
          items: [
            { label: 'Provenance', link: '/platforms/sources/' },
            { label: 'Claude Code', collapsed: false, items: autoGroup(join(DOCS_DIR, 'platforms/claude-code'), '/platforms/claude-code') },
            { label: 'Copilot', collapsed: false, items: autoGroup(join(DOCS_DIR, 'platforms/copilot'), '/platforms/copilot') },
            { label: 'VS Code', collapsed: false, items: vscodeItems() },
          ],
        },
        {
          label: 'Specs',
          items: [{ label: 'Provenance', link: '/specs/sources/' }, ...specsGroups()],
        },
        {
          label: 'Assessments',
          items: autoGroup(join(DOCS_DIR, 'assessments'), '/assessments'),
        },
        {
          label: 'Scaffold templates',
          collapsed: true,
          items: autoGroup(join(DOCS_DIR, 'prototypes/agent-platform-scaffold'), '/prototypes/agent-platform-scaffold'),
        },
      ],
    }),
  ],
});
