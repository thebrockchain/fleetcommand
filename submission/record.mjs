// Fleet Command demo capture: drives the live site through the shot list in
// submission/VIDEO-SCRIPT.md and records TRUE 4K video for Brock to voice.
//
// WHY THIS DOES NOT USE PLAYWRIGHT'S recordVideo. It did, and the result looked
// soft and cheap, and the measurement said exactly why: playwright's built in
// recorder writes VP8 at about 695 kbps at 1920x1080 and devicePixelRatio 1.
// For a screen full of small text and 1px strokes that is destructive. Every
// glyph goes mushy, the field's hairlines smear, and the frosted glass bands.
// No transcode recovers detail the source already threw away, so the SOURCE had
// to change, not the encode.
//
// WHAT IT DOES INSTEAD. The page renders at deviceScaleFactor 2, so a 1920x1080
// layout is painted at 3840x2160 real pixels, and frames are pulled through the
// DevTools screencast at high quality and encoded by ffmpeg at a bitrate that
// fits the content. Text is retina crisp because it is genuinely rendered at
// 2x, not upscaled from a soft master.
//
// TIMING IS PRESERVED HONESTLY. The screencast only emits a frame when the page
// CHANGES, so a still hold produces almost nothing. Each frame is therefore
// stamped with the browser's own clock and encoded through ffmpeg's concat
// demuxer with real per frame durations. A six second hold stays six seconds
// instead of flashing past.
//
// THIS RIG IS NOT A DEPENDENCY OF THE APP. Fleet Command ships zero
// dependencies and that claim is in the entry copy, so playwright is installed
// in a scratch directory and this file is copied there to run.
//
//   mkdir -p <scratch>/rig && cd <scratch>/rig
//   npm init -y && npm i playwright && npx playwright install chromium
//   cp <repo>/submission/record.mjs . && node record.mjs
//
// Needs ffmpeg on PATH.
//
// HARD LIMIT: 3:00. The script prints its own mark table and total and warns
// past 2:52. If it runs long, trim the idle holds, never the gate beat.

import { chromium } from 'playwright';
import { mkdirSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import url from 'node:url';

const OUT = path.dirname(url.fileURLToPath(import.meta.url));
const FRAMES = path.join(OUT, 'frames');
const BASE = 'https://fleetcommand-2u0.pages.dev/';
const SITE = BASE + '?pace=video';   // the narrative
const COLD = BASE + '?pace=fast';    // the cold open, same mission rendered fast
const FPS = 30;

const sleep = ms => new Promise(r => setTimeout(r, ms));
const t0 = Date.now();
const at = () => ((Date.now() - t0) / 1000);
const log = m => console.log(`[${at().toFixed(1)}s] ${m}`);
// Marks are stored in ABSOLUTE wall clock, not script-relative, because the
// video does not start when the script does: the browser has to launch first.
// The first screencast frame IS video time zero, so marks are converted at the
// end. edit.mjs reads the result, which is what stops the edit from silently
// drifting out of sync every time this is re-recorded.
const marks = [];
const mark = m => { marks.push([Date.now(), m]); log('MARK ' + m); };
let videoStart = 0;

if (existsSync(FRAMES)) rmSync(FRAMES, { recursive: true, force: true });
mkdirSync(FRAMES, { recursive: true });

const browser = await chromium.launch({
  args: [
    '--disable-background-timer-throttling',
    '--disable-renderer-backgrounding',
    '--disable-backgrounding-occluded-windows',
    '--force-color-profile=srgb',
  ],
});
const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 2,             // 3840x2160 real pixels. This is the whole fix.
});
const page = await context.newPage();

// Recordings do not show the real cursor, so paint one that follows the mouse.
await page.addInitScript(() => {
  addEventListener('DOMContentLoaded', () => {
    const c = document.createElement('div');
    c.style.cssText =
      'position:fixed;left:0;top:0;width:18px;height:18px;border-radius:50%;' +
      'border:2.5px solid #a99dff;background:rgba(124,108,255,.35);z-index:99999;' +
      'pointer-events:none;transform:translate(-50%,-50%);transition:width .12s,height .12s';
    document.body.appendChild(c);
    addEventListener('mousemove', e => { c.style.left = e.clientX + 'px'; c.style.top = e.clientY + 'px'; });
    addEventListener('mousedown', () => { c.style.width = '28px'; c.style.height = '28px'; });
    addEventListener('mouseup', () => { c.style.width = '18px'; c.style.height = '18px'; });
  });
});

// ---- the screencast --------------------------------------------------------
const client = await context.newCDPSession(page);
const shots = [];                                  // { file, t } in browser time
let n = 0;
client.on('Page.screencastFrame', async ev => {
  if (!videoStart) videoStart = Date.now();
  const file = path.join(FRAMES, String(n++).padStart(6, '0') + '.jpg');
  writeFileSync(file, Buffer.from(ev.data, 'base64'));
  shots.push({ file, t: ev.metadata.timestamp });
  try { await client.send('Page.screencastFrameAck', { sessionId: ev.sessionId }); } catch {}
});
await client.send('Page.startScreencast', {
  format: 'jpeg', quality: 92, maxWidth: 3840, maxHeight: 2160, everyNthFrame: 1,
});

const center = async sel => page.evaluate(q => {
  const r = document.querySelector(q).getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}, sel);
// Step count is capped low on purpose: every step is its own round trip, and a
// 44 step glide cost seconds once the page had a live field behind glass.
const glide = async (sel, ms = 900) => {
  const { x, y } = await center(sel);
  await page.mouse.move(x, y, { steps: 18 });
  await sleep(Math.max(0, ms - 300));
};
const showEntry = async needle => {
  await page.evaluate(t => {
    const e = [...document.querySelectorAll('#console .entry')].find(x => x.textContent.includes(t));
    if (e) e.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, needle);
};

// ---- COLD OPEN -------------------------------------------------------------
// Every other entry opens on a logo or a talking head. This one opens on the
// moment the software stops and hands control back to a person. The mission
// here is REAL and complete, just rendered at ?pace=fast so the gate arrives in
// seconds. Nothing is skipped and nothing is staged.
await page.goto(COLD, { waitUntil: 'networkidle' });
await page.mouse.move(960, 700);
await sleep(900);
await page.locator('#runBtn').click();
mark('cold open: mission running fast');
await page.waitForFunction(
  () => document.getElementById('gate').classList.contains('armed'), null, { timeout: 120000 });
mark('COLD OPEN SLAM');
await sleep(5500);

// Hard cut back to the beginning. A reload is the cleanest cut there is.
await page.goto(SITE, { waitUntil: 'networkidle' });
await page.mouse.move(960, 700);
mark('cut to idle cockpit');
await sleep(5000);

mark('crew pass');
for (const id of ['#ag-scout', '#ag-audit', '#ag-medic', '#ag-ship']) {
  await glide(id, 600);
  await sleep(700);
}

await glide('#runBtn', 700);
await sleep(500);
mark('click Run mission');
await page.locator('#runBtn').click();
await page.mouse.move(960, 720, { steps: 18 });

await page.waitForFunction(
  () => [...document.querySelectorAll('#console .entry')].some(e => e.textContent.includes('MARKET / SERPAPI')),
  null, { timeout: 120000 });
mark('SCOUT market lens on screen');

await page.waitForFunction(
  () => document.getElementById('gate').classList.contains('armed'), null, { timeout: 240000 });
mark('GATE ARMS');

// The money shot. Let it breathe: this is the product.
await sleep(13000);

await showEntry('NAME.COM');
mark('registrar check on screen');
await sleep(4000);

await glide('#rejectBtn', 800);
mark('hover Send back');
await sleep(4000);
await glide('#approveBtn', 800);
await sleep(2500);
mark('click Approve');
await page.locator('#approveBtn').click();
await sleep(5000);

await page.mouse.move(770, 520, { steps: 18 });
await showEntry('MARKET / SERPAPI');
mark('market lens revisited');
await sleep(3000);
await showEntry('MEDIC');
mark('MEDIC diff');
await sleep(4000);

await page.evaluate(() => { const c = document.getElementById('console'); c.scrollTop = c.scrollHeight; });
await page.mouse.move(960, 860, { steps: 18 });
mark('close on cockpit');
await sleep(4000);
mark('cut');

await client.send('Page.stopScreencast').catch(() => {});
await sleep(400);
await browser.close();

// ---- encode ----------------------------------------------------------------
// Real per frame durations from the browser's own clock, so a still hold stays
// exactly as long as it was held. Without this the concat demuxer would give
// every frame the same time and a six second pause would flash past.
console.log(`\ncaptured ${shots.length} frames at up to 3840x2160`);
const lines = [];
for (let i = 0; i < shots.length; i++) {
  const dur = i < shots.length - 1
    ? Math.max(1 / 120, shots[i + 1].t - shots[i].t)
    : 1 / FPS;
  lines.push(`file '${shots[i].file}'`, `duration ${dur.toFixed(5)}`);
}
lines.push(`file '${shots[shots.length - 1].file}'`);   // concat needs the last one twice
const list = path.join(OUT, 'frames.txt');
writeFileSync(list, lines.join('\n'));

const mp4 = path.join(OUT, 'fleetcommand-demo-4k.mp4');
console.log('encoding 4K...');
execFileSync('ffmpeg', [
  '-y', '-f', 'concat', '-safe', '0', '-i', list,
  '-vf', `fps=${FPS},scale=3840:2160:flags=lanczos`,
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '16',
  '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
  mp4,
], { stdio: ['ignore', 'ignore', 'inherit'] });

// Marks in VIDEO time, and written next to the master so edit.mjs can place
// its shots against real moments instead of numbers typed from an older take.
const rel = marks.map(([abs, m]) => [(abs - videoStart) / 1000, m]);
writeFileSync(path.join(OUT, 'marks.json'), JSON.stringify(
  { duration: shots.length ? shots[shots.length - 1].t - shots[0].t : 0,
    marks: rel.map(([t, m]) => ({ t: +t.toFixed(2), name: m })) }, null, 2));

console.log('\n--- MARKS (paste into VIDEO-SCRIPT.md) ---');
for (const [t, m] of rel) {
  const mm = String(Math.floor(t / 60));
  const ss = String(Math.floor(t % 60)).padStart(2, '0');
  console.log(`${mm}:${ss}  ${m}`);
}
// Length of the CAPTURE, measured from the frames themselves. It used to report
// at(), which by this point also includes the encode and reported 6.58 minutes
// for a 2:43 video.
const vlen = shots.length ? shots[shots.length - 1].t - shots[0].t : 0;
console.log(`\nTOTAL ${Math.floor(vlen / 60)}:${String(Math.round(vlen % 60)).padStart(2, '0')}  ${vlen < 172 ? 'OK, room under 3:00' : 'TOO LONG, trim the idle holds'}`);
console.log('VIDEO:' + mp4);
