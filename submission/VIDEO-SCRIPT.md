# Fleet Command demo video script (3:00)

One continuous screen capture of https://fleetcommand-2u0.pages.dev with voice
over. No slides, no logo reel: judges reward watching the real thing work.
Record at 1920x1080, cursor visible, room quiet. If live mode is armed before
recording, the chip reads LIVE and the voice over uses the live line in 1:00.
If not, the replay chip is on screen and we say so out loud; honesty reads
better than hiding it.

Do a full silent practice run first so the mission timing is familiar.

## 0:00 to 0:20 - the problem, over the idle cockpit

On screen: the standby cockpit, cursor still.

"This is Fleet Command. If you run a small business or a small team, you
cannot afford an operations crew. Nobody is watching your site, nobody is
auditing it, and when something breaks, you find out from a customer. The
other option, full AI autonomy, means software shipping changes to your
business with nobody's hand on the wheel. Neither one is acceptable."

## 0:20 to 0:35 - the crew, slow mouse pass down the left column

"So we built a crew of four AI agents. SCOUT does reconnaissance. AUDIT
inspects what SCOUT found. MEDIC drafts the fix. And SHIP stages the
deployment. Four specialists that never sleep, working for one person."

## 0:35 to 1:45 - run the mission, narrate as each agent reports

Click Run mission at 0:35. Let the console carry the visuals.

"The target today is a fictional bakery site we broke on purpose: dead order
form, no security headers, a six second page load."

As SCOUT finishes: "SCOUT maps the site and flags what matters. Notice it
found the order form posting into a dead route. Every order this business
takes is silently vanishing."

As AUDIT finishes: "AUDIT turns recon into a ranked defect list. High,
medium, low. The dead order route is on top because it is the one actively
costing money."

As MEDIC finishes: "MEDIC writes the actual fix. That is a real diff on
screen: repoint the form, add the handler. Drafted, not applied. MEDIC never
touches production."

If LIVE: "Every report you just watched was a live Claude call through
Cloudflare Pages Functions. Nothing here is canned."
If REPLAY: "The chip up top says replay: this run is a recording of the same
mission, and the app labels it honestly rather than faking a live call. Arm
one API key and every step becomes a live Claude call."

## 1:45 to 2:20 - the gate, the whole point

SHIP finishes and the gate arms. Pause one full beat on the amber panel.

"And here is the moment this product exists for. SHIP staged the deploy,
summarized the risk, and stopped. It is holding for human approval, and the
hold is structural. The agent has no path forward until a person decides."

Hover Send back: "I can send it back, and MEDIC revises with my objection."

Click Approve: "Or I approve, and only then does the deploy release. AI does
the work. A person holds the trigger. The gate is not a limitation of the
product. The gate is the product."

## 2:20 to 2:50 - why it is real, back at the completed mission

"This pattern is not a demo concept. The same engine runs our private
production ops room, managing dozens of live sites today. What you are
looking at is the public version: Cloudflare Pages and Functions, the
Anthropic API, zero dependencies, one screen."

## 2:50 to 3:00 - close

"Fleet Command. An AI ops crew that does the work, and a human gate that
holds the trigger. Try it yourself at the link below."

## Recording checklist

- [ ] Arm ANTHROPIC_API_KEY first if we want the LIVE chip on camera
- [ ] Practice run done, mission timing familiar
- [ ] 1920x1080, cursor visible, notifications off
- [ ] Upload public to YouTube, title "Fleet Command demo"
- [ ] Under 3:00 total (hard limit on most Devpost events)
