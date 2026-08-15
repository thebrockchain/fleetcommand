# Fleet Command demo video script (2:41)

## THE CAPTURE IS RE-RECORDED. Voice to these marks.

`~/Desktop/fleetcommand-demo-capture.mp4` (2:41, 1920x1080, silent) was
recorded 2026-08-14 by `submission/record.mjs` driving the LIVE site in
`?pace=video` mode, after the design pass and after SCOUT gained the SerpApi
market lens and SHIP gained the name.com registrar check. The previous take
(2:44, Aug 10) is preserved beside it as `-OLD-aug10.mp4` and no longer matches
the site: do not voice that one.

**2:41 leaves 19 seconds of headroom under the 3:00 cut most Devpost events
enforce.** Read at a measured pace; do not rush to fill.

| Mark | What is on screen | VO section below |
|---|---|---|
| 0:00 to 0:09 | idle cockpit, cursor still, no amber anywhere | 0:00 the problem |
| 0:09 to 0:18 | cursor passes down the four crew cards | 0:10 the crew |
| 0:18 | Run mission clicked | 0:18 mission starts |
| 0:37 | SCOUT reports, then the MARKET / SERPAPI entry lands | 0:37 the market lens |
| 0:45 to 1:52 | AUDIT, MEDIC, SHIP report in turn | mission narration |
| **1:52** | **GATE ARMS.** Crew dims, gate lifts, amber for the first time | **1:52 the gate** |
| 2:05 | the DEPLOY TARGET / NAME.COM registrar check on screen | 2:05 the second risk |
| 2:11 | cursor hovers Send back | "I can send it back" |
| 2:18 | Approve clicked, deploy released | "Or I approve" |
| 2:23 to 2:34 | console revisits the market lens, then MEDIC's diff | 2:23 why it is real |
| 2:35 to 2:41 | full cockpit, mission complete | 2:35 close |

Both chips read sample/replay in this capture and the VO covers that honestly in
1:40. To put LIVE chips on camera instead, arm the keys and re-run the rig.

---


One continuous screen capture of https://fleetcommand-2u0.pages.dev with voice
over. No slides, no logo reel: judges reward watching the real thing work.
Record at 1920x1080, cursor visible, room quiet. If live mode is armed before
recording, the chip reads LIVE and the voice over uses the live line in 1:00.
If not, the replay chip is on screen and we say so out loud; honesty reads
better than hiding it.

Do a full silent practice run first so the mission timing is familiar.

## 0:00 to 0:09 - the problem, over the idle cockpit

On screen: the standby cockpit, cursor still. Note there is no amber anywhere
on the screen yet. That is deliberate and it pays off at 1:52.

"This is Fleet Command. If you run a small business, you cannot afford an
operations crew. Nobody is watching your site, and when something breaks you
find out from a customer. The other option, full AI autonomy, means software
shipping changes to your business with nobody's hand on the wheel."

## 0:09 to 0:18 - the crew, mouse pass down the left column

"So we built a crew of four agents. SCOUT does reconnaissance. AUDIT inspects
what SCOUT found. MEDIC drafts the fix. SHIP stages the deployment."

## 0:18 to 0:37 - run the mission

Click lands at 0:18.

"Today's target is a bakery site we broke on purpose: a dead order form, no
security headers, a six second load."

## 0:37 to 0:45 - the market lens

The MARKET / SERPAPI entry lands under SCOUT's report.

"SCOUT does not just read the site. It reads the market around it, live through
SerpApi. And that changes the finding: the order form posting into a dead route
is not just a bug, it is a bug in the exact place every competitor is winning.
Every order this bakery takes is silently vanishing."

## 0:45 to 1:52 - the crew works

As AUDIT finishes: "AUDIT ranks the defects. High, medium, low. The dead order
route is on top because it is the one actively costing money."

As MEDIC finishes: "MEDIC writes the actual fix. That is a real diff: repoint
the form, add the handler. Drafted, not applied. MEDIC never touches
production."

Honesty line, over the chips: "Those chips say replay and sample. This run is a
recording and the app labels it rather than faking a live call. Arm the keys and
the identical code path goes live. We would rather show you a labelled sample
than lie to you."

## 1:52 to 2:11 - THE GATE. Do not talk over the first two seconds.

SHIP finishes and the screen changes: the crew settles back, the gate lifts, and
amber appears for the first time in the whole video. Let that land silently.

"And there it is. SHIP staged the deploy, summarized the risk, and stopped.
It is holding for a human, and the hold is structural. The agent has no code
path forward until a person decides. Notice the screen: everything else just
stepped back, and the only lit control left is the one that belongs to you."

## 2:05 to 2:11 - the second risk

The registrar check comes on screen.

"And SHIP raised something nobody asked it to. It checked with name.com, and
this bakery does not own its own name. It is about to start taking money online
on a domain anyone could register tomorrow. That is a person's decision, not
software's."

## 2:11 to 2:23 - the decision

Hover Send back: "I can send it back, and MEDIC revises with my objection
attached."

Click Approve: "Or I approve, and only then does anything release. AI does the
work. A person holds the trigger. The gate is not a limitation of the product.
The gate is the product."

## 2:23 to 2:35 - why it is real

"This is not a demo concept. The same engine runs our private production ops
room across dozens of live sites today. What you are looking at is the public
version: Cloudflare Pages and Functions, SerpApi, name.com, zero dependencies,
one screen, no scroll."

## 2:35 to 2:41 - close

"Fleet Command. An AI ops crew that does the work, and a human gate that holds
the trigger."

## Recording checklist

- [ ] Arm the keys first if we want LIVE chips on camera (ANTHROPIC_API_KEY,
      SERPAPI_KEY, NAMECOM_USER + NAMECOM_TOKEN)
- [ ] 1920x1080, cursor visible, notifications off
- [ ] Upload public to YouTube, title "Fleet Command demo"
- [ ] Under 3:00 total. This capture is 2:41, so there is room, but the rig
      prints its own total and warns past 2:52.
