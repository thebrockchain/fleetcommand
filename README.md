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

`npx wrangler pages deploy --branch main` from this folder. No build step,
zero dependencies. Security headers ride every response via
`functions/_middleware.js`.

## Hackathon targets

One build, three submissions (registration and submission are Brock's taps):

1. DevNetwork API + Cloud + AI Hackathon 2026, $40,500 cash pool, submissions
   Aug 17 to Sep 3.
2. Aiify Agentic AI World w/ Fetch.ai, $5,000 cash, submit by Sep 22.
3. IBM Bob 2.0 Hackathon, $10,000, online 48 hour build Sep 25 to 27.

`NEXT.md` carries what is still open.
