// Fleet Command demo capture: drives the live site through the shot list in
// submission/VIDEO-SCRIPT.md and records 1920x1080 video for Brock to voice.
// The site runs in ?pace=video mode so the mission breathes with the VO.
//
// THIS RIG IS NOT A DEPENDENCY OF THE APP. Fleet Command ships zero
// dependencies and that claim is in the entry copy, so playwright is installed
// in a scratch directory and this file is copied there to run. Nothing is ever
// installed into this repo.
//
//   mkdir -p <scratch>/rig && cd <scratch>/rig
//   npm init -y && npm i playwright && npx playwright install chromium
//   cp <repo>/submission/record.mjs . && node record.mjs
//
// HARD LIMIT: 3:00. Most Devpost events cut at three minutes and this capture
// has to fit under it with the voice over, so the script logs its own elapsed
// time at every mark and prints the total. If the total creeps over about 2:52,
// trim the idle holds, never the gate beat.

import { chromium } from 'playwright';
import path from 'node:path';
import url from 'node:url';

const OUT = path.dirname(url.fileURLToPath(import.meta.url));
const SITE = 'https://fleetcommand-2u0.pages.dev/?pace=video';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const t0 = Date.now();
const at = () => ((Date.now() - t0) / 1000);
const log = m => console.log(`[${at().toFixed(1)}s] ${m}`);
const marks = [];
const mark = m => { marks.push([at(), m]); log('MARK ' + m); };

const browser = await chromium.launch({
  args: [
    '--disable-background-timer-throttling',
    '--disable-renderer-backgrounding',
    '--disable-backgrounding-occluded-windows',
  ],
});
const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  recordVideo: { dir: OUT, size: { width: 1920, height: 1080 } },
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

const center = async sel => {
  const b = await page.locator(sel).boundingBox();
  return { x: b.x + b.width / 2, y: b.y + b.height / 2 };
};
const glide = async (sel, ms = 900) => {
  const { x, y } = await center(sel);
  await page.mouse.move(x, y, { steps: Math.max(20, Math.round(ms / 16)) });
};
// Bring a console entry into view by its tag text, so the sponsor integrations
// are actually on camera for the judges who grade them.
const showEntry = async needle => {
  await page.evaluate(t => {
    const e = [...document.querySelectorAll('#console .entry')].find(x => x.textContent.includes(t));
    if (e) e.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, needle);
};

await page.goto(SITE, { waitUntil: 'networkidle' });
await page.mouse.move(960, 700);
mark('idle cockpit');

// The problem, over the still cockpit. Trimmed from 18s: the mission itself got
// longer when SCOUT gained the market lens and SHIP gained the registrar check,
// and the gate beat is not what gives way.
await sleep(8000);

// Slow pass down the crew column.
mark('crew pass');
for (const id of ['#ag-scout', '#ag-audit', '#ag-medic', '#ag-ship']) {
  await glide(id, 900);
  await sleep(1500);
}

await glide('#runBtn', 800);
await sleep(600);
mark('click Run mission');
await page.locator('#runBtn').click();
await page.mouse.move(960, 720, { steps: 30 });

// SCOUT plus its market lens, then the rest of the crew. Hold the cursor still
// while the console does the work.
await page.waitForFunction(
  () => [...document.querySelectorAll('#console .entry')].some(e => e.textContent.includes('MARKET / SERPAPI')),
  null, { timeout: 120000 });
mark('SCOUT market lens on screen');

await page.waitForFunction(
  () => document.getElementById('gate').classList.contains('armed'), null, { timeout: 240000 });
mark('GATE ARMS');

// The money shot. The crew settles back, the gate takes the only amber on the
// screen, Approve is the only lit control. Let it breathe: this is the product.
await sleep(13000);

// The registrar finding is the last thing SHIP says, and it is a sponsor track,
// so put it on camera before the decision.
await showEntry('NAME.COM');
mark('registrar check on screen');
await sleep(5000);

await glide('#rejectBtn', 900);
mark('hover Send back');
await sleep(4500);
await glide('#approveBtn', 800);
await sleep(2500);
mark('click Approve');
await page.locator('#approveBtn').click();
await sleep(5000);

// Back over the finished mission: the market lens, then MEDIC's real diff.
await page.mouse.move(770, 520, { steps: 30 });
await showEntry('MARKET / SERPAPI');
mark('market lens revisited');
await sleep(5000);
await showEntry('MEDIC');
mark('MEDIC diff');
await sleep(6000);

// Close on the full cockpit.
await page.evaluate(() => { const c = document.getElementById('console'); c.scrollTop = c.scrollHeight; });
await page.mouse.move(960, 860, { steps: 40 });
mark('close on cockpit');
await sleep(6000);
mark('cut');

await context.close();
const video = await page.video().path();
console.log('\n--- MARKS (paste into VIDEO-SCRIPT.md) ---');
for (const [t, m] of marks) {
  const mm = String(Math.floor(t / 60)).padStart(1, '0');
  const ss = String(Math.floor(t % 60)).padStart(2, '0');
  console.log(`${mm}:${ss}  ${m}`);
}
console.log(`\nTOTAL ${(at() / 60).toFixed(2)} min  ${at() < 172 ? 'OK, room under 3:00' : 'TOO LONG, trim the idle holds'}`);
console.log('VIDEO:' + video);
await browser.close();
