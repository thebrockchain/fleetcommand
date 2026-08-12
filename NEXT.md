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

  **Four FAIL:** no `sitemap.xml` (404), no `rel=canonical`, no `<h1>` (the
  "FLEET COMMAND" lockup is a styled `div`, so the page has no heading at all,
  which is an accessibility defect before it is an SEO one), and no JSON to LD
  structured data.
  **Six WARN:** robots.txt has no `Sitemap:` line, thin 13 char title, no
  `rel=icon` (search prints a blank square), no `/llms.txt`, no FAQPage or
  HowTo schema, weak `cache-control` on the document.

  Score today is 16 of 26 clean. None of this was fixed in the same pass on
  purpose: the demo capture is already recorded against the current markup and
  the entry is about to be submitted, so changing the page's heading structure
  is a decision to make deliberately, not a side effect of adding a row. The
  `<h1>` and the favicon are the two that a judge could actually notice.
- Consider a "send back" round trip that actually re-runs MEDIC with the
  objection (currently simulated client side).
