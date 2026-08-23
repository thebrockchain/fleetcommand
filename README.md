# Fleet Command

The public agentic ops command center, and the fleet's hackathon entry. A
judge lands with no login on a one screen cockpit and watches a crew of four
AI agents work a mission on a synthetic target: SCOUT recons it, AUDIT names
the defects, MEDIC drafts the fix, SHIP stages the deploy and then HOLDS at
the human approval gate. The gate is the product: AI drafts, people decide.

Born public on purpose. 100% synthetic demo data (the fictional Harbor Lane
Bakery), zero fleet secrets, and no connection to the walled ainow deploy.
The private crew room stays private; this is the showpiece that proves the
same engine in the open.

## The two key ignition (2026-08-22, build #12, docs/PREMISE.md)

The approval gate is hardware now. At the hold, KEY 1 glows amber (the
reserved colour, still spent at exactly one moment, worn by a keyring
instead of a button fill); turning it arms the console and wakes KEY 2, and
turning KEY 2 releases the staged deploy. Send back stays an ordinary
button and stands both keys down. One key never fires: KEY 2 is disabled in
the DOM until KEY 1 turns, so no single interaction can release. The keys
are real buttons, keyboard operable, aria-pressed carries the turned state,
and reduced motion turns them instantly. Approve and Send back keep their
exact prior semantics and log lines; only how the decision feels changed.

## The on-switch (fleet pattern)

- **Replay mode (default):** with no key set, `/run` serves a recorded run of
  the mission and the UI labels it "replay" honestly, in the chip and the
  footer. Nothing pretends to be live.
- **Live mode:** arm `ANTHROPIC_API_KEY` as a Pages secret and every step
  becomes a real Claude call (`claude-sonnet-5`). BROCK'S HANDS, a live
  secret key is one of the five human only acts:
  `cd fleetcommand && npx wrangler pages secret put ANTHROPIC_API_KEY`

## Deploy

LIVE at https://fleetcommand-2u0.pages.dev (Cloudflare Pages project
`fleetcommand`; custom domain still an open decision in NEXT.md).

`npx wrangler pages deploy --branch main` from this folder. Deploying needs no
build step and the site has zero runtime dependencies. Security headers ride
every response via `functions/_middleware.js`.

**The link preview card is generated, so do not hand edit it.** The block
between the `share:start` and `share:end` markers in `site/index.html` and
`site/404.html` is written by `node tools/build-og.mjs`, which renders
`brand/og-card.html` into a hashed `site/og-*.png` and rewrites the tags to
match. Change the card or the copy in those two sources, then re-run the tool
and deploy. A hand edit inside the markers is overwritten on the next run.

**The rest of the head sits OUTSIDE those markers on purpose.** `rel=canonical`,
both JSON-LD blocks (`WebApplication` and `HowTo`), and the two icon links are
deliberately above the `share:start` line, because the generator strips
everything between the markers on every rebuild and anything tidied inside them
would vanish silently. Two more things a cold session should not undo: the
`<h1>` carries `class="mark"`, which is what keeps the header pixel identical to
the `div` it replaced (the recorded demo capture depends on that), and the
schema is `HowTo` rather than `FAQPage` because Google wants FAQ text visible on
the page and this page is one screen with zero scroll. Reasoning in `NEXT.md`.

Live-mode spend has no code cap on purpose: the guard is the KEY, armed only
as a spend-capped key per NEXT.md, which is the fleet's prepaid-ceiling
pattern. Replay mode costs nothing and is the default.

## Hackathon targets

The live board is **hackathons.thebrockchain.com** (repo `hackathons`), and
`HACKATHON-BOARD.md` here is the dated snapshot. As of 2026-08-15 the targets
are DevNetwork API + Cloud + AI ($45,500, submissions Aug 17 to Sep 3, entering
the SerpApi and name.com sponsor tracks with real integrations), All Things
Agentic ($180,000, Aug 31, gated on a Google Cloud billing account, plan in
`GOOGLE-PORT.md`), and IBM Bob 2.0 ($10,000, 48 hour window Sep 25 to 27).
Aiify was a dead event (concluded Sep 2024) and its entry file is removed.

## The submission kit

Everything an entry needs lives in `submission/`: paste-ready copy per event
(`ENTRY-DEVNETWORK.md` carries addenda for the SerpApi and name.com track
judges), the VO script with the marks table, and the capture pipeline:
`record.mjs` shoots the live site at true 4K through the DevTools screencast
and writes `marks.json` in video time; `edit.mjs` cuts the 4K master into a
13 shot 1080p film placed against those marks, never against hand typed times.
The finished film sits at `~/Desktop/fleetcommand-demo.mp4` (2:42, silent)
with the uncut master beside it, awaiting Brock's voice. The site takes
`?pace=video` (VO timeline) and `?pace=fast` (cold open); pace changes render
speed only, never what runs.

`NEXT.md` carries what is still open, with tomorrow's resume point on top.
