// Cut the 4K master into an edited piece instead of a locked-off screen grab.
//
// WHY. The capture was one camera, one framing, no movement, for two minutes
// and forty seconds. That is what reads as bland, not the design: nothing ever
// changes scale, so nothing is ever emphasised, and the eye has no idea where
// to look. Real product films push in, hold, and pull back.
//
// HOW, WITHOUT LOSING A PIXEL. The master is 3840x2160 and the deliverable is
// 1920x1080, so a 1:1 crop of half the frame is still a full resolution 1080p
// image. Every push in here is a crop of the 4K master, never an upscale, so a
// close up on the gate is exactly as sharp as the wide.
//
//   node edit.mjs <master-4k.mp4> <out-1080.mp4>
//
// Needs ffmpeg on PATH.

import { execFileSync } from 'node:child_process';
import { writeFileSync, mkdtempSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const [master, out, marksArg] = process.argv.slice(2);
if (!master || !out) { console.error('usage: node edit.mjs <master> <out> [marks.json]'); process.exit(1); }

// SHOTS ARE PLACED AGAINST NAMED MARKS, never against numbers typed by hand.
// They were hardcoded once, from an earlier take, and the next re-record moved
// every beat by several seconds: the close up meant for the decision landed
// after the decision was already made. record.mjs writes marks.json in video
// time, and this reads it, so a re-record can never silently desync the edit.
const MARKS = JSON.parse(readFileSync(marksArg || path.join(path.dirname(master), 'marks.json'), 'utf8'));
const M = Object.fromEntries(MARKS.marks.map(m => [m.name, m.t]));
const END = MARKS.duration;
const at_ = (name, off = 0) => {
  if (!(name in M)) throw new Error(`mark not found in marks.json: ${name}`);
  return Math.max(0, M[name] + off);
};

const W = 3840, H = 2160;          // master
const OW = 1920, OH = 1080;        // deliverable

// A shot is a time range, ONE zoom, and a start and end centre.
//
// The zoom is fixed within a shot on purpose, and not because it looks better:
// ffmpeg's crop filter only accepts `t` in its x and y expressions. Animating
// the crop SIZE makes it try to reconfigure the filter graph every frame and it
// refuses. So scale changes happen on the CUT, and motion inside a shot is a
// slow pan. That is closer to how product films are actually cut anyway: you
// change size on a cut, you do not zoom in the middle of a sentence.
//
// The two slams are deliberately the ONLY shots that stay wide the whole way
// through. The wave crosses the entire screen, so cutting in would cut off the
// thing the shot exists for.
const SHOTS = [
  // cold open: tight and urgent while a real mission tears past
  { a: 0,                              b: at_('COLD OPEN SLAM', -0.3), z: 1.15, cx0: .52, cy0: .48, cx1: .46, cy1: .5  },
  // THE SLAM. Wide, dead still. The wave crosses the whole screen, so cutting
  // in would cut off the only reason the shot exists.
  { a: at_('COLD OPEN SLAM', -0.3),    b: at_('cut to idle cockpit'),  z: 1.0,  cx0: .5,  cy0: .5,  cx1: .5,  cy1: .5  },
  // reset, wide and calm
  { a: at_('cut to idle cockpit'),     b: at_('crew pass'),            z: 1.0,  cx0: .5,  cy0: .5,  cx1: .5,  cy1: .5  },
  // the crew, close, where the live telemetry is
  { a: at_('crew pass'),               b: at_('click Run mission'),    z: 1.9,  cx0: .17, cy0: .30, cx1: .17, cy1: .42 },
  // the mission runs: medium on the console
  { a: at_('click Run mission'),       b: at_('SCOUT market lens on screen'), z: 1.25, cx0: .44, cy0: .40, cx1: .47, cy1: .46 },
  // the market lens landing, closer
  { a: at_('SCOUT market lens on screen'), b: at_('SCOUT market lens on screen', 16), z: 1.5, cx0: .45, cy0: .40, cx1: .45, cy1: .50 },
  // the crew works: a slow drift down the console as it fills
  { a: at_('SCOUT market lens on screen', 16), b: at_('GATE ARMS', -2.5), z: 1.22, cx0: .47, cy0: .40, cx1: .49, cy1: .58 },
  // wide BEFORE the gate, so the slam lands on a full frame
  { a: at_('GATE ARMS', -2.5),         b: at_('GATE ARMS'),            z: 1.0,  cx0: .5,  cy0: .5,  cx1: .5,  cy1: .5  },
  // THE SLAM, earned. Wide, dead still.
  { a: at_('GATE ARMS'),               b: at_('registrar check on screen'), z: 1.0, cx0: .5, cy0: .5, cx1: .5, cy1: .5 },
  // the registrar finding, in on the bottom of the console
  { a: at_('registrar check on screen'), b: at_('hover Send back'),    z: 1.6,  cx0: .42, cy0: .70, cx1: .42, cy1: .80 },
  // the decision itself, in on the gate, held through the click
  { a: at_('hover Send back'),         b: at_('click Approve', 3),     z: 1.85, cx0: .80, cy0: .16, cx1: .84, cy1: .20 },
  // why it is real, back over the work
  { a: at_('click Approve', 3),        b: at_('close on cockpit'),     z: 1.3,  cx0: .5,  cy0: .35, cx1: .48, cy1: .48 },
  // close: all the way out
  { a: at_('close on cockpit'),        b: END,                         z: 1.0,  cx0: .5,  cy0: .5,  cx1: .5,  cy1: .5  },
].filter(s => s.b - s.a > 0.3);

const tmp = mkdtempSync(path.join(tmpdir(), 'fcedit-'));
const parts = [];

SHOTS.forEach((s, i) => {
  const dur = (s.b - s.a).toFixed(3);
  // Fixed crop size, so the filter never has to reconfigure. Even pixel values
  // because H.264 chroma is subsampled and an odd crop shifts colour.
  const cw = Math.round(W / s.z / 2) * 2;
  const ch = Math.round(H / s.z / 2) * 2;
  // Eased pan. A linear move is what makes an edit feel like a robot panning.
  const e = `(0.5-0.5*cos(PI*min(1,max(0,t/${dur}))))`;
  const cx = `(${s.cx0}+(${s.cx1}-${s.cx0})*${e})`;
  const cy = `(${s.cy0}+(${s.cy1}-${s.cy0})*${e})`;
  const x = `max(0,min(${W - cw},${cx}*${W}-${cw}/2))`;
  const y = `max(0,min(${H - ch},${cy}*${H}-${ch}/2))`;

  const outFile = path.join(tmp, `p${String(i).padStart(2, '0')}.mp4`);
  execFileSync('ffmpeg', [
    '-y', '-ss', String(s.a), '-t', dur, '-i', master,
    '-vf', `crop=${cw}:${ch}:x='${x}':y='${y}',scale=${OW}:${OH}:flags=lanczos,setsar=1`,
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '17', '-pix_fmt', 'yuv420p',
    '-an', outFile,
  ], { stdio: ['ignore', 'ignore', 'inherit'] });
  parts.push(outFile);
  console.log(`shot ${i + 1}/${SHOTS.length}  ${s.a.toFixed(1)}s to ${s.b.toFixed(1)}s  ${cw}x${ch} crop (zoom ${s.z})`);
});

const list = path.join(tmp, 'list.txt');
writeFileSync(list, parts.map(p => `file '${p}'`).join('\n'));
execFileSync('ffmpeg', [
  '-y', '-f', 'concat', '-safe', '0', '-i', list,
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '17',
  '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out,
], { stdio: ['ignore', 'ignore', 'inherit'] });

console.log('\nedited ->', out);
