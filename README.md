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

Live-mode spend has no code cap on purpose: the guard is the KEY, armed only
as a spend-capped key per NEXT.md, which is the fleet's prepaid-ceiling
pattern. Replay mode costs nothing and is the default.

## Hackathon targets

One build, three submissions (registration and submission are Brock's taps):

1. DevNetwork API + Cloud + AI Hackathon 2026, $40,500 cash pool, submissions
   Aug 17 to Sep 3.
2. Aiify Agentic AI World w/ Fetch.ai, $5,000 cash, submit by Sep 22.
3. IBM Bob 2.0 Hackathon, $10,000, online 48 hour build Sep 25 to 27.

## The submission kit

Everything an entry needs lives in `submission/`: paste-ready copy per event,
the 3 minute VO script, the Playwright capture rig (`record.mjs`), and the
marks table for the demo capture recorded 2026-08-10 (the silent mp4 sits at
`~/Desktop/fleetcommand-demo-capture.mp4` awaiting Brock's voice). The site
takes `?pace=video`, which only slows the mission to the VO timeline for
recording; content is identical.

`NEXT.md` carries what is still open, with tomorrow's resume point on top.
