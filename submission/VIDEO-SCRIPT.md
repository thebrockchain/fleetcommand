# Fleet Command demo video script (2:44)

## THE CAPTURE IS FINAL. Voice to these marks.

`~/Desktop/fleetcommand-demo-capture.mp4` (2:44, 1920x1080, silent), recorded
against the live site with everything in: the frosted cockpit, the living
field, the slam, the crew telemetry, the SerpApi market lens and the name.com
registrar check. `-PREV.mp4` beside it is the older take and shows opaque
panels. Do not voice that one.

**It opens cold on the moment the software stops.** The mission in that cold
open is real and complete, rendered fast so the gate arrives in seconds.

**2:44 leaves 16 seconds under the 3:00 cut. Do not rush.**

| Mark | On screen | VO |
|---|---|---|
| 0:00 to 0:04 | cold open: a real mission tears past, telemetry ticking | **say nothing** |
| **0:04** | **THE SLAM.** Wave cuts the whole screen, colour drains, field freezes | 0:04 the hook |
| 0:04 to 0:10 | held on the drained screen, gate blazing, "Your call." | |
| 0:10 | hard cut back to the idle cockpit | 0:10 the reset |
| 0:15 to 0:23 | cursor passes down the crew | 0:15 the crew |
| 0:23 | Run mission clicked | 0:23 the target |
| 0:43 | SCOUT reports, MARKET / SERPAPI lands | 0:43 the market lens |
| 0:45 to 1:58 | AUDIT, MEDIC, SHIP report; telemetry fills in | mission narration |
| **1:58** | **THE SLAM, earned** | **1:58 the gate** |
| 2:11 | DEPLOY TARGET / NAME.COM registrar check | 2:11 the second risk |
| 2:16 | hover Send back | "I can send it back" |
| 2:25 | Approve clicked | "Or I approve" |
| 2:31 to 2:39 | console revisits the market lens, then MEDIC's diff | 2:31 why it is real |
| 2:40 to 2:44 | full cockpit | 2:40 close |

Watch the field behind the glass while you read: it drifts at idle, agitates
while the crew works, and stops dead at the gate. Chips read sample and replay
in this capture and the VO covers that honestly. Arm the keys and re-run the
rig to put LIVE on camera.

---


One continuous screen capture of https://fleetcommand-2u0.pages.dev with voice
over. No slides, no logo reel: judges reward watching the real thing work.
Record at 1920x1080, cursor visible, room quiet. If live mode is armed before
recording, the chip reads LIVE and the voice over uses the live line in 1:00.
If not, the replay chip is on screen and we say so out loud; honesty reads
better than hiding it.

Do a full silent practice run first so the mission timing is familiar.

## 0:00 to 0:04 - COLD OPEN. Say nothing.

Four agents tear through a real mission at speed. Let it run silent. The
temptation is to talk over it; do not. The silence is what makes the next
four seconds land.

## 0:04 to 0:10 - the hook, over the slam

The wave leaves the gate and the colour drains out of the entire interface.

"That is an AI crew stopping itself."

Beat. Let the drained screen sit.

"It did the work. Then it refused to ship it without a person."

## 0:10 to 0:15 - the reset, back at the idle cockpit

"Here is how it got there."

## 0:15 to 0:23 - the problem and the crew

No amber anywhere on screen now. That is deliberate, and it is why the gate
lands both times it appears.

"If you run a small business you cannot afford an operations crew. Nobody
watches your site, and you find out it is broken from a customer. So we built
one: SCOUT does reconnaissance, AUDIT ranks what it finds, MEDIC drafts the
fix, SHIP stages the deploy."

Watch the numbers under each agent as the mission runs. Real round trip, real
size of what came back, and where it came from. Nothing on that column is
decorative.

## 0:23 to 0:43 - run the mission

Click lands at 0:23.

"Today's target is a bakery site we broke on purpose: a dead order form, no
security headers, a six second load."

## 0:43 to 0:48 - the market lens

The MARKET / SERPAPI entry lands under SCOUT's report.

"SCOUT does not just read the site. It reads the market around it, live through
SerpApi. And that changes the finding: the order form posting into a dead route
is not just a bug, it is a bug in the exact place every competitor is winning.
Every order this bakery takes is silently vanishing."

## 0:48 to 1:58 - the crew works

As AUDIT finishes: "AUDIT ranks the defects. High, medium, low. The dead order
route is on top because it is the one actively costing money."

As MEDIC finishes: "MEDIC writes the actual fix. That is a real diff: repoint
the form, add the handler. Drafted, not applied. MEDIC never touches
production."

Honesty line, over the chips: "Those chips say replay and sample. This run is a
recording and the app labels it rather than faking a live call. Arm the keys and
the identical code path goes live. We would rather show you a labelled sample
than lie to you."

## 1:58 to 2:16 - THE GATE, earned. Do not talk over the first two seconds.

The same slam as the cold open, except now the viewer knows what it cost.
Let it land silently, then:

"And there it is. SHIP staged the deploy, summarized the risk, and stopped.
It is holding for a human, and the hold is structural. The agent has no code
path forward until a person decides. Notice the screen: everything else just
stepped back, and the only lit control left is the one that belongs to you."

## 2:11 to 2:16 - the second risk

The registrar check comes on screen.

"And SHIP raised something nobody asked it to. It checked with name.com, and
this bakery does not own its own name. It is about to start taking money online
on a domain anyone could register tomorrow. That is a person's decision, not
software's."

## 2:16 to 2:31 - the decision

Hover Send back: "I can send it back, and MEDIC revises with my objection
attached."

Click Approve: "Or I approve, and only then does anything release. AI does the
work. A person holds the trigger. The gate is not a limitation of the product.
The gate is the product."

## 2:31 to 2:40 - why it is real

"This is not a demo concept. The same engine runs our private production ops
room across dozens of live sites today. What you are looking at is the public
version: Cloudflare Pages and Functions, SerpApi, name.com, zero dependencies,
one screen, no scroll."

## 2:40 to 2:44 - close

"Fleet Command. An AI ops crew that does the work, and a human gate that holds
the trigger."

## Recording checklist

- [ ] Arm the keys first if we want LIVE chips on camera (ANTHROPIC_API_KEY,
      SERPAPI_KEY, NAMECOM_USER + NAMECOM_TOKEN)
- [ ] 1920x1080, cursor visible, notifications off
- [ ] Upload public to YouTube, title "Fleet Command demo"
- [ ] Under 3:00 total. This capture is 2:41, so there is room, but the rig
      prints its own total and warns past 2:52.
