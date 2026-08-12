// Zero-dependency content pipeline: mirrors references/**/* into the Starlight site.
//
// - `.md` files are rewritten with Starlight frontmatter (title from the first
//   heading, description from the nearest `_SOURCES.md` when a match is found)
//   and mirrored into site/src/content/docs/**, with the `references/` prefix
//   dropped so routes read /platforms/... /specs/... /assessments/....
// - Any path segment starting with `_` (e.g. `_SOURCES.md`, `_NORMATIVE-*.md`)
//   has the underscore stripped on the way out — Astro's content loader ignores
//   underscore-prefixed entries by default, so leaving it on would silently drop
//   the page.
// - `claude-code/raw-*.md` verbatim captures are relocated to
//   `platforms/claude-code/verbatim-captures/*.md` (the `raw-` prefix dropped)
//   so they form their own nested sidebar group instead of interleaving with the
//   real pages.
// - Non-`.md` files (JSON schemas, `.ts`, `llms.txt`, scaffold scripts, …) are
//   copied verbatim into site/public/schemas/**, unrendered, and a
//   `related-files.md` index page is generated in every mirrored directory that
//   has such siblings, linking to them.
// - The site splash (site/src/content/docs/index.md) is generated from the
//   repo's README.md.
//
// Re-runnable: every generated output directory is wiped and rebuilt each run.
// Run with `node scripts/build-site-content.ts` (Node 22.18+ / 23.6+ strips
// TypeScript types natively; no build step, no dependency).

import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync, statSync, copyFileSync } from 'node:fs';
import { join, relative, extname, basename, dirname, sep } from 'node:path';

const ROOT = join(import.meta.dirname, '..');
const REFERENCES = join(ROOT, 'references');
const README = join(ROOT, 'README.md');
const DOCS_OUT = join(ROOT, 'site/src/content/docs');
const SCHEMAS_OUT = join(ROOT, 'site/public/schemas');

// ---------------------------------------------------------------------------
// small utilities
// ---------------------------------------------------------------------------

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

/**
 * Astro/Starlight lowercases content-collection slugs when generating routes
 * regardless of the source filename's case, so a mixed-case file on disk
 * (`README.md`, `_NORMATIVE-agent-plugins.md`) builds at a lowercase URL. If
 * the mirrored file kept its original case, any sidebar link built by reading
 * that same directory (see astro.config.mjs) would point at the wrong,
 * unslugified case and 404. Lowercasing every path segment on the way out
 * keeps the generated tree byte-identical to the slugs Astro will actually
 * produce, and doubles as the fix for the leading-underscore-strip case
 * (`_SOURCES.md` -> `sources.md`) — Astro's content loader ignores
 * underscore-prefixed entries by default, so the underscore has to go too.
 */
function mapSegment(segment: string): string {
  const stripped = segment.startsWith('_') ? segment.slice(1) : segment;
  return stripped.toLowerCase();
}

function humanize(name: string): string {
  const base = name.replace(/\.mdx?$/, '');
  const spaced = base.replace(/[-_]+/g, ' ').trim();
  if (!spaced) return base;
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function yamlString(value: string): string {
  return JSON.stringify(value);
}

/**
 * Astro's content-collection Markdown pipeline treats a relative image path
 * (`![alt](foo/bar.png)`) as a local asset to import and bundle, and fails the
 * build if that file doesn't exist on disk. Several captured vendor pages
 * reference example screenshots that were never part of the fetch (e.g. the
 * MCP Apps spec's example gallery). Root-relative paths (`/foo.png`) are
 * passed through untouched instead, so rewrite bare relative image targets to
 * be root-relative — the reference stays intact (still a 404 in a browser,
 * same as it would be verbatim), it just stops being a build-time asset
 * import. Absolute URLs, root-relative paths, anchors, and data URIs are left
 * alone.
 */
function neutralizeRelativeImages(body: string): string {
  return body.replace(
    /!\[([^\]]*)\]\((?!https?:\/\/|\/|#|data:)([^)\s]+)((?:\s+"[^"]*")?)\)/g,
    (_m, alt, target, title) => `![${alt}](/${target}${title})`,
  );
}

/** Strips a leading `---\n...\n---` frontmatter block, if present. */
function stripFrontmatter(content: string): string {
  if (!content.startsWith('---')) return content;
  const end = content.indexOf('\n---', 3);
  if (end === -1) return content;
  const afterMarker = content.indexOf('\n', end + 4);
  return afterMarker === -1 ? '' : content.slice(afterMarker + 1);
}

/** Parses a leading `<!-- key: value ... -->` provenance comment, if present. */
function parseLeadingComment(content: string): Record<string, string> | undefined {
  const trimmed = content.trimStart();
  if (!trimmed.startsWith('<!--')) return undefined;
  const end = trimmed.indexOf('-->');
  if (end === -1) return undefined;
  const body = trimmed.slice(4, end);
  const fields: Record<string, string> = {};
  for (const line of body.split('\n')) {
    const m = line.match(/^\s*([a-zA-Z][\w-]*)\s*:\s*(.+?)\s*$/);
    if (m) fields[m[1]] = m[2];
  }
  return Object.keys(fields).length ? fields : undefined;
}

/** Finds the first ATX heading (`#` … `######`) outside of fenced code blocks. */
function firstHeading(content: string): { title: string; lineIndex: number } | undefined {
  const lines = content.split('\n');
  let inFence = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = line.match(/^#{1,6}\s+(.+?)\s*#*\s*$/);
    if (m) return { title: m[1].replace(/[`*_]/g, ''), lineIndex: i };
  }
  return undefined;
}

/** Looks for a `_SOURCES.md` at `dir` or any ancestor up to `stopAt`, nearest wins. */
function findSourcesFile(dir: string, stopAt: string): string | undefined {
  let cur = dir;
  for (;;) {
    const candidate = join(cur, '_SOURCES.md');
    if (fileExists(candidate)) return candidate;
    if (cur === stopAt) return undefined;
    const parent = dirname(cur);
    if (parent === cur) return undefined;
    cur = parent;
  }
}

function fileExists(p: string): boolean {
  try {
    statSync(p);
    return true;
  } catch {
    return false;
  }
}

const sourcesCache = new Map<string, string>();

function descriptionFromSources(sourcesPath: string, originalBasename: string): string | undefined {
  let content = sourcesCache.get(sourcesPath);
  if (content === undefined) {
    content = readFileSync(sourcesPath, 'utf8');
    sourcesCache.set(sourcesPath, content);
  }
  for (const line of content.split('\n')) {
    if (!line.includes(originalBasename)) continue;
    const urlMatch = line.match(/https?:\/\/\S+/);
    if (urlMatch) return `Sourced from ${urlMatch[0].replace(/[)\]`|]+$/, '')}.`;
  }
  return undefined;
}

// ---------------------------------------------------------------------------
// pass 1: reset generated output
// ---------------------------------------------------------------------------

rmSync(DOCS_OUT, { recursive: true, force: true });
rmSync(SCHEMAS_OUT, { recursive: true, force: true });
mkdirSync(DOCS_OUT, { recursive: true });
mkdirSync(SCHEMAS_OUT, { recursive: true });

// ---------------------------------------------------------------------------
// pass 2: mirror references/** into content docs + public schemas
// ---------------------------------------------------------------------------

const nonMdSiblingsByTargetDir = new Map<string, { name: string; publicPath: string }[]>();
const contentDirs = new Set<string>(); // dirs that received at least one rendered .md page
let mdCount = 0;
let assetCount = 0;

// Section roots: related-files rollup never climbs above these.
const SECTION_ROOTS = [
  join(DOCS_OUT, 'platforms'),
  join(DOCS_OUT, 'specs'),
  join(DOCS_OUT, 'assessments'),
  join(DOCS_OUT, 'prototypes', 'agent-platform-scaffold'),
];

for (const absPath of walk(REFERENCES)) {
  const rel = relative(REFERENCES, absPath); // e.g. platforms/claude-code/raw-plugins.md
  const segments = rel.split(sep);
  const ext = extname(absPath);
  const isMd = ext === '.md';

  // claude-code raw-*.md -> platforms/claude-code/verbatim-captures/<name>.md
  let mappedSegments = segments.map(mapSegment);
  if (
    isMd &&
    mappedSegments[0] === 'platforms' &&
    mappedSegments[1] === 'claude-code' &&
    mappedSegments.length === 3 &&
    mappedSegments[2].startsWith('raw-')
  ) {
    mappedSegments = [
      'platforms',
      'claude-code',
      'verbatim-captures',
      mappedSegments[2].replace(/^raw-/, ''),
    ];
  }

  if (isMd) {
    mdCount++;
    const targetPath = join(DOCS_OUT, ...mappedSegments);
    mkdirSync(dirname(targetPath), { recursive: true });

    const raw = readFileSync(absPath, 'utf8');
    const comment = parseLeadingComment(raw);
    const body = stripFrontmatter(raw);
    const heading = firstHeading(body);

    // Fall back to the *mapped* filename (raw- stripped, verbatim-captures
    // already relocated) so a headingless stub doesn't title itself "Raw
    // plugins" when it now lives under the Verbatim captures group.
    const title = heading?.title ?? humanize(mappedSegments[mappedSegments.length - 1]);

    let bodyOut = body;
    if (heading) {
      const lines = bodyOut.split('\n');
      lines.splice(heading.lineIndex, 1);
      bodyOut = lines.join('\n').replace(/^\n+/, '');
    }
    bodyOut = neutralizeRelativeImages(bodyOut);

    const sourcesFile = findSourcesFile(dirname(absPath), REFERENCES);
    let description = sourcesFile ? descriptionFromSources(sourcesFile, basename(absPath)) : undefined;
    if (!description && comment?.source) description = `Captured from ${comment.source}.`;
    if (!description && comment) {
      const parts = Object.entries(comment).map(([k, v]) => `${k}: ${v}`);
      if (parts.length) description = parts.join(' ').slice(0, 300);
    }

    const frontmatterLines = [`title: ${yamlString(title)}`];
    if (description) frontmatterLines.push(`description: ${yamlString(description)}`);
    const out = `---\n${frontmatterLines.join('\n')}\n---\n\n${bodyOut}`;
    writeFileSync(targetPath, out);
    contentDirs.add(dirname(targetPath));
  } else {
    assetCount++;
    const publicRel = join(...mappedSegments);
    const targetPath = join(SCHEMAS_OUT, publicRel);
    mkdirSync(dirname(targetPath), { recursive: true });
    copyFileSync(absPath, targetPath);

    // Stash the raw content-dir + relative path; pass 3 rolls these up to the
    // nearest directory that actually has rendered content, once the full set
    // of content dirs is known.
    const contentDir = join(DOCS_OUT, ...mappedSegments.slice(0, -1));
    const list = nonMdSiblingsByTargetDir.get(contentDir) ?? [];
    list.push({
      name: mappedSegments[mappedSegments.length - 1],
      publicPath: `/schemas/${publicRel.split(sep).join('/')}`,
    });
    nonMdSiblingsByTargetDir.set(contentDir, list);
  }
}

// ---------------------------------------------------------------------------
// pass 3: related-files.md, rolled up to the nearest directory that has
// rendered content (avoids spraying a page into every leaf dotdir like
// .github/ or .claude-plugin/ that holds nothing but scaffold boilerplate).
// ---------------------------------------------------------------------------

function nearestContentDir(dir: string): string {
  let cur = dir;
  for (;;) {
    if (contentDirs.has(cur)) return cur;
    const isSectionRoot = SECTION_ROOTS.includes(cur);
    const parent = dirname(cur);
    if (isSectionRoot || parent === cur) return cur;
    cur = parent;
  }
}

const rolledUp = new Map<string, { rel: string; publicPath: string }[]>();
for (const [dir, files] of nonMdSiblingsByTargetDir) {
  const host = nearestContentDir(dir);
  const relFromHost = relative(host, dir).split(sep).filter(Boolean).join('/');
  const list = rolledUp.get(host) ?? [];
  for (const f of files) {
    const displayName = relFromHost ? `${relFromHost}/${f.name}` : f.name;
    list.push({ rel: displayName, publicPath: f.publicPath });
  }
  rolledUp.set(host, list);
}

let relatedFilesCount = 0;
for (const [dir, files] of rolledUp) {
  mkdirSync(dir, { recursive: true });
  const lines = files
    .sort((a, b) => a.rel.localeCompare(b.rel))
    .map((f) => `- [\`${f.rel}\`](${f.publicPath})`);
  const out = [
    '---',
    `title: ${yamlString('Related files')}`,
    `description: ${yamlString('Non-Markdown source files for this section, linked for direct download rather than rendered.')}`,
    '---',
    '',
    'These files are part of this section but are not Markdown, so they are not rendered as',
    'pages. They are copied verbatim and linked here.',
    '',
    ...lines,
    '',
  ].join('\n');
  writeFileSync(join(dir, 'related-files.md'), out);
  contentDirs.add(dir);
  relatedFilesCount++;
}

// ---------------------------------------------------------------------------
// pass 4: splash page from README.md
// ---------------------------------------------------------------------------

const readme = readFileSync(README, 'utf8');
const readmeHeading = firstHeading(readme);
const readmeLines = readme.split('\n');
// Body: everything after the first heading up to (excluding) "## Index".
const startIdx = readmeHeading ? readmeHeading.lineIndex + 1 : 0;
const indexHeadingIdx = readmeLines.findIndex((l, i) => i > startIdx && /^##\s+Index/.test(l));
const introLines = readmeLines.slice(startIdx, indexHeadingIdx === -1 ? readmeLines.length : indexHeadingIdx);
// Drop the centered-div/badge preamble; keep from the first real paragraph.
const introStart = introLines.findIndex((l) => l.trim() && !/^<\/?div|^<img|^!\[/.test(l.trim()));
const cleanedIntroLines = introLines
  .slice(introStart === -1 ? 0 : introStart)
  // Strip stray closing-div and bare horizontal-rule lines left over from the
  // centered README banner (its opening `<div>` was in the dropped preamble).
  .filter((l) => !/^\s*(<\/div>|---)\s*$/.test(l));

// README uses GitHub's `> [!NOTE]` alert syntax; Starlight renders its own
// `:::note` / `:::caution` asides in plain .md, so translate the whole block:
// the marker line becomes the opening fence, following `> `-quoted lines are
// unwrapped, and the fence is closed at the first non-quoted line after it.
const ALERT_KIND: Record<string, string> = { NOTE: 'note', TIP: 'tip', WARNING: 'caution', CAUTION: 'caution', IMPORTANT: 'danger' };
const asideLines: string[] = [];
let inAside = false;
for (const line of cleanedIntroLines) {
  const marker = line.match(/^>\s*\[!(NOTE|WARNING|TIP|CAUTION|IMPORTANT)\]\s*$/);
  if (marker) {
    if (inAside) asideLines.push(':::');
    asideLines.push(`:::${ALERT_KIND[marker[1]]}`);
    inAside = true;
    continue;
  }
  if (inAside) {
    if (line.startsWith('> ') || line === '>') {
      asideLines.push(line.replace(/^>\s?/, ''));
      continue;
    }
    asideLines.push(':::');
    inAside = false;
  }
  asideLines.push(line);
}
if (inAside) asideLines.push(':::');

const intro = asideLines.join('\n').trim();

const splash = `---
title: ${yamlString('Patterson Platform Docs')}
description: ${yamlString('The reference library for agent platforms')}
template: splash
hero:
  tagline: ${yamlString('The reference library for agent platforms')}
  actions:
    - text: Browse platform docs
      link: /platforms/sources/
      icon: right-arrow
      variant: primary
    - text: Browse specs
      link: /specs/sources/
      variant: minimal
    - text: Read the assessments
      link: /assessments/sources/
      variant: minimal
---

${intro}

## What is captured here

- **Platforms** — vendor documentation for Claude Code, GitHub Copilot, and VS Code agent
  customization, captured with source URL and fetch date on every page.
- **Specs** — the open standards these platforms build on: MCP, Agent Skills, Agent
  Plugins, ACP, AHP, A2UI, MCP Apps, and Google Stitch's \`DESIGN.md\` convention.
- **Assessments** — analysis written against the material above, dated and carrying
  judgments rather than just facts.
- **Scaffold templates** — the superseded multi-repo scaffolding prototype, kept for
  traceability.

This is a reference library, not an authority. The cited originals remain the source of
truth; these are local copies for availability and traceability.
`;

writeFileSync(join(DOCS_OUT, 'index.md'), splash);

console.log(
  `build-site-content: ${mdCount} markdown pages, ${assetCount} linked assets, ${relatedFilesCount} related-files index pages.`,
);
