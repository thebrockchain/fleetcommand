#!/usr/bin/env node
/**
 * Build the Fleet Command link preview card, and the share tags it never had.
 * ---------------------------------------------------------------------------
 * WHAT WAS WRONG. This site carried charset, viewport and a description, and
 * nothing else. No og:title, no og:description, no og:image, no twitter tags.
 * Pasted anywhere it rendered as a blank grey tile with a bare URL.
 *
 * That matters more here than on any other surface in the fleet: this is the
 * HACKATHON ENTRY. The link is what a judge sees before the page loads, and a
 * grey tile is the first impression on the one thing being submitted.
 *
 * It went unnoticed for a structural reason worth writing down, and the first
 * telling of it here was wrong, so here is the checked version. This repo was
 * NOT an uncloned repo: `git log --reverse` shows `commit (initial): Start
 * fleetcommand` on 2026-08-09, `.git/logs/HEAD` carries no clone entry, and
 * the folder was created on this Mac by `brock/tools/creation.mjs`. It has
 * been on disk since birth, so "every local sweep skipped it" was not the
 * cause.
 *
 * The real cause is the SILENCE BUG, the same one named in sites.mjs for ainow
 * and allswept: a surface is only checked if it has a ROW in jack's site table
 * (`brock/.claude/skills/jack/scripts/sites.mjs`), and this creation was born
 * the same day and never got one. Zero rows means zero gates looked, and zero
 * findings reads exactly like a pass. The repo being local was never enough;
 * being LISTED is what earns a check.
 *
 * STILL OPEN as of 2026-08-10: fleetcommand has no sites.mjs row. Until it
 * does, no jack sweep will ever grade this surface, including the og gate that
 * would have caught the missing tags in the first place. Tracked in NEXT.md.
 *
 *   node tools/build-og.mjs
 *
 * Card design is the product's own thesis rather than decoration: four agents
 * in sequence, and SHIP stopped at the gate. The site says "the gate is not a
 * limitation, it is the product", so the card shows the gate.
 */
import { readFileSync, writeFileSync, readdirSync, unlinkSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = join(ROOT, 'site');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ORIGIN = 'https://fleetcommand-2u0.pages.dev';
const W = 1200, H = 630;

/* Tokens copied from site/index.html :root so the card cannot drift from the
   page it represents. */
const T = {
  bg: '#0d1018', surf: '#151a29', line: '#283150',
  ink: '#eef1fb', muted: '#8b93af', faint: '#565f7c',
  indigo: '#7c6cff', teal: '#2dd4bf', amber: '#f5b23d',
};

const AGENTS = [
  ['SCOUT', 'recon', T.teal],
  ['AUDIT', 'defects', T.teal],
  ['MEDIC', 'the fix', T.teal],
  ['SHIP', 'holds', T.amber],
];

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:${W}px;height:${H}px}
  body{
    font-family:'Montserrat',system-ui,sans-serif;color:${T.ink};
    background:
      radial-gradient(60% 70% at 88% 6%, rgba(124,108,255,.20), transparent 62%),
      radial-gradient(52% 62% at 6% 96%, rgba(45,212,191,.13), transparent 60%),
      ${T.bg};
    padding:58px 64px;display:flex;flex-direction:column;justify-content:center;
    position:relative;overflow:hidden;
  }
  .eyebrow{display:flex;align-items:center;gap:13px;margin-bottom:26px}
  .dot{width:11px;height:11px;border-radius:50%;background:${T.teal};
    box-shadow:0 0 0 5px rgba(45,212,191,.16)}
  .eyebrow b{font-family:'Space Grotesk';font-weight:700;font-size:20px;
    letter-spacing:.22em;text-transform:uppercase}
  .eyebrow s{text-decoration:none;color:${T.faint};font-size:15px;font-weight:600;
    letter-spacing:.14em;text-transform:uppercase}
  h1{font-family:'Space Grotesk';font-weight:700;font-size:82px;line-height:.98;
    letter-spacing:-.03em;max-width:16ch}
  h1 b{font-weight:700;color:${T.indigo}}
  .lede{margin-top:20px;font-size:21px;line-height:1.4;color:${T.muted};max-width:46ch}
  /* The crew, in order, with the gate drawn where it actually falls. */
  .crew{margin-top:38px;display:flex;align-items:stretch;gap:0}
  .ag{border:1px solid ${T.line};background:${T.surf};padding:14px 20px;
    display:flex;flex-direction:column;gap:4px;min-width:132px;border-radius:12px}

  .ag n{font-family:'Space Grotesk';font-weight:700;font-size:19px;letter-spacing:.10em}
  .ag e{font-size:13px;color:${T.faint};letter-spacing:.03em}
  .arrow{display:flex;align-items:center;padding:0 12px;color:${T.faint};font-size:19px}
  .gate{border-color:${T.amber};
    background:linear-gradient(180deg, rgba(245,178,61,.13), rgba(245,178,61,.05))}
  .gate n{color:${T.amber}}
  .gate e{color:${T.amber};opacity:.85}
  .stamp{position:absolute;right:60px;bottom:52px;font-size:14px;font-weight:600;
    letter-spacing:.16em;text-transform:uppercase;color:${T.faint}}
</style></head>
<body>
  <div class="eyebrow"><span class="dot"></span><b>Fleet Command</b><s>Agentic ops</s></div>
  <h1>The gate is the <b>product</b>.</h1>
  <p class="lede">Four AI agents do the work. Every consequential action stops at a named human.</p>
  <div class="crew">
    ${AGENTS.map(([n, e], i) => {
      const last = i === AGENTS.length - 1;
      return `<div class="ag${last ? ' gate' : ''}"><n>${n}</n><e>${e}</e></div>`
        + (last ? '' : '<div class="arrow">&rsaquo;</div>');
    }).join('\n    ')}
  </div>
  <div class="stamp">Synthetic demo target</div>
</body></html>`;

mkdirSync(join(ROOT, 'brand'), { recursive: true });
const src = join(ROOT, 'brand', 'og-card.html');
writeFileSync(src, html);

const tmp = join(ROOT, '.og-tmp.png');
execFileSync(CHROME, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars',
  '--force-device-scale-factor=1', `--window-size=${W},${H}`,
  '--virtual-time-budget=6000',
  `--screenshot=${tmp}`, `file://${src}`,
], { stdio: 'pipe' });

/* Flat colour and type, so PNG is genuinely the right container here and
   comes out small. The RISE card is a photograph and goes to JPEG instead. */
const bytes = readFileSync(tmp);
unlinkSync(tmp);
const hash = createHash('sha256').update(bytes).digest('hex').slice(0, 10);
const file = `og-${hash}.png`;
writeFileSync(join(SITE, file), bytes);

/* The whole share block, not just the image: this site had NONE of it. */
const TAGS = (url) => [
  `<meta property="og:type" content="website">`,
  `<meta property="og:site_name" content="Fleet Command">`,
  `<meta property="og:title" content="Fleet Command">`,
  `<meta property="og:description" content="An agentic operations command center. A crew of AI agents does the work; a human approval gate holds the trigger.">`,
  `<meta property="og:url" content="${ORIGIN}/">`,
  `<meta property="og:image" content="${url}">`,
  `<meta property="og:image:width" content="${W}">`,
  `<meta property="og:image:height" content="${H}">`,
  `<meta property="og:image:alt" content="Fleet Command: SCOUT, AUDIT and MEDIC feed into SHIP, which holds at the human approval gate.">`,
  `<meta name="twitter:card" content="summary_large_image">`,
  `<meta name="twitter:title" content="Fleet Command">`,
  `<meta name="twitter:description" content="Four AI agents do the work. Every consequential action stops at a named human.">`,
  `<meta name="twitter:image" content="${url}">`,
];

const url = `${ORIGIN}/${file}`;
const pages = readdirSync(SITE).filter((f) => f.endsWith('.html'));
for (const f of pages) {
  const p = join(SITE, f);
  let s = readFileSync(p, 'utf8');
  // Drop any block this script wrote before, then write the current one, so
  // re-running never stacks duplicates.
  // The opening comment carries a suffix, so the strip pattern must allow
  // one. Matching the bare marker silently STACKED a second block on every
  // re-run, which is exactly what happened before this was caught.
  s = s.replace(/\n?\s*<!-- share:start[^>]*-->[\s\S]*?<!-- share:end -->/g, '');
  const block = `\n  <!-- share:start generated by tools/build-og.mjs -->\n`
    + TAGS(url).map((t) => '  ' + t).join('\n')
    + `\n  <!-- share:end -->`;
  if (!/<\/head>/i.test(s)) throw new Error(`${f} has no </head> to write into`);
  s = s.replace(/<\/head>/i, `${block}\n</head>`);
  writeFileSync(p, s);
}

const stale = readdirSync(SITE).filter((f) => /^og-[0-9a-f]{10}\.png$/.test(f) && f !== file);
for (const f of stale) unlinkSync(join(SITE, f));

console.log(`card built: site/${file}  ${Math.round(bytes.length / 1024)} KB`);
console.log(`  share block written into ${pages.length} page(s): ${pages.join(', ')}`);
if (stale.length) console.log(`  removed stale: ${stale.join(', ')}`);
