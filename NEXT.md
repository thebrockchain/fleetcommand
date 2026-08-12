# Fleet Command - what is still open

## Brock's taps (the walls, each one move)

1. **Arm live mode.** `cd fleetcommand && npx wrangler pages secret put
   ANTHROPIC_API_KEY` with a spend capped key. Until then the demo runs in
   labeled replay mode, which is honest and demoable but live is stronger for
   judges. A live secret key is human only (Article XI #32).
2. **Register for the three events** (accepting ToS is human only):
   DevNetwork API+Cloud+AI (devpost), Aiify Agentic World (devpost), IBM Bob
   2.0. Links in README.
3. **Submit** (publishing under Brock's name is a gated edge). The entry copy
   and the VO script are STAGED in `submission/` as of 2026-08-10, and the
   silent capture is recorded. What is left before submitting is Brock's voice
   track and the YouTube upload. DevNetwork closes Sep 3.

## Tomorrow (2026-08-11), the resume point

The build, kit, and capture are DONE. The next three moves, in order:

1. Brock voices the capture: play `~/Desktop/fleetcommand-demo-capture.mp4`
   (2:44, silent) and read the VO against the marks table at the top of
   `submission/VIDEO-SCRIPT.md`. Optional stronger take: arm the key first
   (tap 1 below) and have a session re-run `submission/record.mjs` so the
   LIVE chip is on camera.
2. Upload the voiced video public to YouTube, drop the link into both entry
   files in `submission/`.
3. DevNetwork registration window opens Aug 17: register (tap 2), then
   submit with `submission/ENTRY-DEVNETWORK.md` (tap 3). Closes Sep 3.

## Build follow-ups

- Demo video: CAPTURE RECORDED 2026-08-10 (`~/Desktop/
  fleetcommand-demo-capture.mp4`, rig at `submission/record.mjs`, marks in
  `submission/VIDEO-SCRIPT.md`). Open: Brock's voice track + YouTube upload.
- Entry copy: STAGED and no-slop passed. `submission/ENTRY-DEVNETWORK.md`
  (paste-ready), `submission/ENTRY-AIIFY-AGENTIC.md` (paste-ready),
  `submission/ENTRY-IBM-BOB.md` (battle plan; that build happens inside its
  Sep 25 to 27 window by rule).
- Custom domain decision: fleetcommand.thebrockchain.com or keep pages.dev.
- Add to brock/CLAUDE.md creations table + README: DONE 2026-08-10, plus the
  portfolio card and the live URL in this repo's README (audit.sh discovers
  the live check from there).
- Add the live surface to the /avery registry once deployed.
- **DONE 2026-08-10: the sites.mjs row is added** (`brock` commit `dfc9496`),
  listed `public`/`product`, so every jack gate now grades this surface. The
  og gate passes. But the row immediately surfaced TEN findings that were
  invisible before, and they are open:

  **ALL FOUR FAILS ARE FIXED 2026-08-10** (commit `b0ac01a`, verified live):
  the lockup is now a real `<h1>`, plus `rel=canonical`, `sitemap.xml` with the
  robots `Sitemap:` line, a `WebApplication` JSON-LD block, and an SVG favicon.
  Score went 16 of 26 to **22 of 26, zero fails**. The h1 swap was measured,
  not assumed: the rendered box is identical to the `div` it replaced on x, y,
  width, height, font, weight and letter spacing, so the recorded demo capture
  still matches the live page exactly.

  **Two things a future session must not undo.** The JSON-LD and canonical live
  OUTSIDE the `share:start`/`share:end` markers on purpose, because
  `tools/build-og.mjs` strips everything between them on every rebuild. And the
  `<h1>` carries `class="mark"`, which is what keeps it visually identical; a
  restyle that drops that class changes the header's appearance.

  **llms.txt and the answerable schema landed 2026-08-10** (commit `d366446`),
  taking the score to **24 of 26**. `site/llms.txt` states what the site is,
  including the honest notes (fictional target, the replay and live modes, and
  that the private production room is not this site).

  The markup is **HowTo, deliberately not FAQPage.** Google wants FAQ question
  and answer text VISIBLE on the page carrying the markup, and this page is one
  screen with zero scroll, so an honest FAQ block has nowhere to live here.
  Every HowTo step is already on screen: the four agents in the crew column and
  the human decision at the gate. If a future session adds a scrolling page,
  FAQPage becomes available honestly at that point.

  **Two WARN remain, both deliberate, do not "fix" them blindly.** The 13 char
  title is the product name and is what judges see on the share card. The weak
  `cache-control` is arguably correct here: the mode chip must never be served
  stale, and a cached document could show REPLAY after the key is armed.
- Consider a "send back" round trip that actually re-runs MEDIC with the
  objection (currently simulated client side).
