// Fleet Command demo capture: drives the live site through the shot list in
// submission/VIDEO-SCRIPT.md and records 1920x1080 video for Brock to voice.
// The site runs in ?pace=video mode so the mission breathes with the VO.
import { chromium } from 'playwright';
import path from 'node:path';
import url from 'node:url';

const OUT = path.dirname(url.fileURLToPath(import.meta.url));
const SITE = 'https://fleetcommand-2u0.pages.dev/?pace=video';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const t0 = Date.now();
const log = m => console.log(`[${((Date.now() - t0) / 1000).toFixed(1)}s] ${m}`);

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

await page.goto(SITE, { waitUntil: 'networkidle' });
await page.mouse.move(960, 700);
log('recording: idle cockpit hold');

// 0:00 to 0:18, the problem over the idle cockpit
await sleep(18000);

// 0:18 to 0:33, slow pass down the crew column
log('crew pass');
for (const id of ['#ag-scout', '#ag-audit', '#ag-medic', '#ag-ship']) {
  await glide(id, 1200);
  await sleep(2400);
}

// 0:35, run the mission
await glide('#runBtn', 900);
await sleep(700);
log('click: Run mission');
await page.locator('#runBtn').click();
await page.mouse.move(960, 720, { steps: 30 });

// the paced mission runs; hold until the gate arms
await page.waitForFunction(() => document.getElementById('gate').classList.contains('armed'), null, { timeout: 240000 });
log('gate armed');

// the gate beat: let the VO land, hover Send back, then approve
await sleep(12000);
await glide('#rejectBtn', 1000);
log('hover: Send back');
await sleep(5000);
await glide('#approveBtn', 900);
await sleep(3000);
log('click: Approve');
await page.locator('#approveBtn').click();

// 2:20 to 2:50, back over the completed mission: drift up the console to the
// MEDIC diff, hold, drift back to the mission-complete line
await sleep(8000);
await page.mouse.move(770, 500, { steps: 30 });
await page.mouse.wheel(0, -700);
await sleep(1200);
await page.mouse.wheel(0, -500);
log('console drift: MEDIC diff');
await sleep(10000);
await page.mouse.wheel(0, 1400);
await sleep(8000);

// close on the full cockpit
await page.mouse.move(960, 860, { steps: 40 });
await sleep(14000);
log('cut');

await context.close();
const video = await page.video().path();
console.log('VIDEO:' + video);
await browser.close();
