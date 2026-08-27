// Narration by gemini-3.1-flash-tts: the fourteen lines read in a cinematic
// trailer voice. One wav per line so the mix can place each at its mark.
// VOICE env picks the prebuilt voice (default Charon, the deep one);
// ONLY env limits generation to a comma list of line numbers for samples.
import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const S = '/private/tmp/claude-501/-Users-thebrockchain-Documents/8ae13aa7-9512-4d32-9606-b860d7a0e8a7/scratchpad/vo';
const KEY = readFileSync('/Users/thebrockchain/Documents/thebrockchain/bambam/.dev.vars', 'utf8')
  .split('\n').find(l => l.startsWith('GOOGLE_AI_API_KEY=')).slice(18).replace(/["']/g, '');
const VOICE = process.env.VOICE || 'Charon';
const ONLY = process.env.ONLY ? process.env.ONLY.split(',').map(Number) : null;

const STYLE = 'Read at a quick, natural conversational speed in a deep, confident, cinematic narrator voice. Assured and intimate, never slow, no long pauses, a very brief beat at ellipses. Say only the line itself: ';

const LINES = [
  'That is an AI crew stopping itself. … It did the work. Then it refused to ship it without a person.',
  'Here is how it got there.',
  'If you run a small business you cannot afford an operations crew. Nobody watches your site, and you find out it is broken from a customer. So we built one: SCOUT does reconnaissance. AUDIT ranks what it finds. MEDIC drafts the fix. SHIP stages the deploy.',
  'Today’s target is a bakery site we broke on purpose: a dead order form, no security headers, a six second load.',
  'SCOUT does not just read the site. It reads the market around it, live through SerpApi. And that changes the finding: the order form posting into a dead route is not just a bug. It is a bug in the exact place every competitor is winning. Every order this bakery takes is silently vanishing.',
  'AUDIT ranks the defects. High, medium, low. The dead order route is on top, because it is the one actively costing money.',
  'MEDIC writes the actual fix. That is a real diff: repoint the form, add the handler. Drafted, not applied. MEDIC never touches production.',
  'Those chips say replay and sample. This run is a recording, and the app says so, instead of faking a live call. Arm the keys, and the same code goes live. We would rather label a sample than lie to you.',
  'And there it is. SHIP staged the deploy, named the risks, and stopped. The hold is structural: no code path forward until a person decides. And the only lit control left on the screen … is the one that belongs to you.',
  'And SHIP caught something nobody asked it to: this bakery does not own its own name. Anyone could register it tomorrow. That is a person’s call, not software’s.',
  'I can send it back, and MEDIC revises.',
  'Or I approve. And only then does anything release. AI does the work. A person holds the trigger. The gate … is the product.',
  'And this same engine already runs our real ops room, across dozens of live sites.',
  'Fleet Command. The crew does the work. You hold the trigger.',
];

for (let i = 0; i < LINES.length; i++) {
  if (ONLY && !ONLY.includes(i + 1)) continue;
  const body = {
    contents: [{ parts: [{ text: STYLE + LINES[i] }] }],
    generationConfig: {
      responseModalities: ['AUDIO'],
      speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: VOICE } } },
    },
  };
  let ok = false;
  for (let t = 0; t < 3 && !ok; t++) {
    const r = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-tts-preview:generateContent',
      { method: 'POST', headers: { 'content-type': 'application/json', 'x-goog-api-key': KEY }, body: JSON.stringify(body) });
    if (!r.ok) { console.error(`line ${i + 1} try ${t + 1}: HTTP ${r.status}`); await new Promise(s => setTimeout(s, 3000)); continue; }
    const d = await r.json();
    const part = d.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
    if (!part) { console.error(`line ${i + 1}: no audio`, JSON.stringify(d).slice(0, 150)); await new Promise(s => setTimeout(s, 3000)); continue; }
    const mime = part.inlineData.mimeType || 'audio/pcm;rate=24000';
    const rate = (mime.match(/rate=(\d+)/) || [, '24000'])[1];
    const raw = `${S}/tts-${VOICE}-${String(i + 1).padStart(2, '0')}.raw`;
    const wav = raw.replace('.raw', '.wav');
    writeFileSync(raw, Buffer.from(part.inlineData.data, 'base64'));
    execSync(`ffmpeg -hide_banner -loglevel error -y -f s16le -ar ${rate} -ac 1 -i "${raw}" -ar 48000 "${wav}"`);
    const dur = execSync(`ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 "${wav}"`).toString().trim();
    console.log(`line ${i + 1}: ${Number(dur).toFixed(1)}s (${VOICE})`);
    ok = true;
  }
  if (!ok) process.exit(1);
}
console.log('done');
