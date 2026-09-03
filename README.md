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

## Two builds, two entries (2026-08-27)

This Cloudflare + Anthropic cockpit is the DevNetwork entry. There is also a
Google-native build in `google/`: the same crew on Google ADK, Gemini through
Vertex AI, deployed to Cloud Run, with the approval gate enforced by the
framework's own `require_confirmation` pause. That is the All Things Agentic
entry, served at `/google`. Both demo films are live and public (links and the
whole submission state live in `NEXT.md` RESUME HERE). The video pipeline that
built them (narration, Lyria score, ffmpeg mix) is in `submission/video-pipeline/`.

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

## The entry, as it stands (2026-09-03)

Fleet Command is SUBMITTED to the DevNetwork [API + Cloud + AI] Hackathon
2026: https://devpost.com/software/fleet-command , in for the overall prize
and the SerpApi and name.com sponsor tracks, both of which the crew uses for
real (the code is in `functions/_lib/market.js` and `functions/_lib/domains.js`,
each with its own test under `tools/`). Submissions close Sep 3, 2026 at
10:00am PDT, judging runs until 1:00pm PDT, winners at 4:00pm PDT.

The live board is **hackathons.thebrockchain.com** (repo `hackathons`, crew
only), and `HACKATHON-BOARD.md` here is the dated public snapshot. All Things
Agentic (the Google build under `google/`) was missed on Aug 31; that build is
real and entered nowhere.

## Run it yourself

No build step, no dependencies beyond `wrangler`:

    git clone https://github.com/thebrockchain/fleetcommand
    cd fleetcommand
    npx wrangler pages dev

Open the printed local URL. With no keys set the cockpit runs in replay mode
and says so on screen, which is exactly how the public deploy runs. To see
the parsers work against real payload shapes:

    node tools/test-market.mjs
    node tools/test-domains.mjs

To check the entry's public surfaces (the cockpit, the press kit, the public
assets, the repo, the Devpost page) from outside, the way a judge meets them:

    node tools/check-entry.mjs

## The submission kit

Everything an entry needs lives in `submission/`: paste-ready copy per event
(`ENTRY-DEVNETWORK.md` carries addenda for the SerpApi and name.com track
judges), the VO script with the marks table, and the capture pipeline:
`record.mjs` shoots the live site at true 4K through the DevTools screencast
and writes `marks.json` in video time; `edit.mjs` cuts the 4K master into a
13 shot 1080p film placed against those marks, never against hand typed times.
The finished narrated film is public at https://youtu.be/6L4Ez-XEcKo (2:46)
and the master lives under `submission/youtube/videos/` (gitignored media).
The site takes
`?pace=video` (VO timeline) and `?pace=fast` (cold open); pace changes render
speed only, never what runs.

`NEXT.md` carries what is still open, with tomorrow's resume point on top.
