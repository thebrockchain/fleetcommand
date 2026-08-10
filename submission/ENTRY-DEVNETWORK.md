# DevNetwork API + Cloud + AI Hackathon 2026 entry (primary target)

Event: https://api-cloud-ai-hackathon-2026.devpost.com/
Window: Aug 17 to Sep 3, 2026. $40,500 cash pool, $12,500 overall winner.
Track: the general API + Cloud + AI category (our stack IS the track).
Registration and submission are Brock's taps. Everything below pastes in.

## Project name

Fleet Command

## Elevator pitch (200 chars max on Devpost)

An AI ops crew that does the work, and a human gate that holds the trigger.
Four agents scout, audit, fix, and stage deploys. Nothing ships until a
person says so.

## About the project

### Inspiration

We run a fleet of nearly fifty small business sites, and the operations work
never ends: something is always broken, slow, or quietly losing orders. We
could not hire an ops team, so we built one out of AI agents. Then we hit the
question every agent builder hits: how much do you let it do on its own? Full
autonomy felt reckless. Approval on every keystroke felt useless. The answer
we landed on runs our private ops room today, and Fleet Command is that
answer made public: agents do all of the work, and a hard human gate holds
every consequential action.

### What it does

Fleet Command is a one screen command center. Four specialist agents work a
target site in sequence: SCOUT does reconnaissance, AUDIT ranks the defects,
MEDIC drafts the actual fix as a diff, and SHIP stages the deployment with a
risk summary. Then SHIP stops. It holds at the approval gate until a human
clicks Approve or Send back. Send back returns the fix to MEDIC with the
objection attached. Approve releases the deploy. The hold is structural:
SHIP has no code path that releases without the click.

The demo target is a fictional bakery site we broke on purpose (dead order
form, no security headers, a six second load) so judges can watch the full
loop without any real site being touched.

### How we built it

Cloudflare Pages hosts the cockpit; a Pages Function (POST /run) runs each
agent step against the Anthropic API (claude-sonnet-5), each agent with its
own system prompt and the prior crew output as context. Zero dependencies,
no build step, no framework: hand rolled HTML, CSS, and JS on the front,
one Function on the back, security headers on every response via middleware.

Two honest modes: with no API key set, /run serves a recorded run of the
mission and the UI labels it "replay" in the header chip and the footer.
Arm one key and every step becomes a live Claude call. The app never
pretends a canned answer is live; we think honesty is a feature judges can
verify, so the mode is always on screen.

### Challenges we ran into

Designing a gate that is real rather than theater: the hold lives in the
mission flow itself, not in a dismissable dialog. Keeping the demo honest
while still working with no key armed took a deliberate replay design.
And a fun one: our first typewriter effect froze in throttled background
tabs, so agent output now renders on wall clock time and a mission finishes
even in a hidden tab.

### Accomplishments we're proud of

The whole thing is one screen with zero scroll, live on the edge, with a
crew you can watch think. The pattern is production proven: the same
engine runs our private ops room across dozens of live sites.

### What we learned

Multi agent systems get useful exactly when you make their autonomy legible:
who is working, what they produced, and where the human sits in the loop.
The gate turned out to be the feature people trust, not the feature that
slows them down.

### What's next

Real targets behind the same gate: connect a user's own site, let the crew
run on a schedule, and grow the approval gate into a queue with an audit
trail of every decision. The engine already does this privately; Fleet
Command is the version everyone gets.

## Built with

javascript, cloudflare-pages, cloudflare-workers, anthropic, claude

## Links

- Live demo: https://fleetcommand-2u0.pages.dev
- Video: (YouTube link after recording, script in VIDEO-SCRIPT.md)
- Repo: private; flip public or grant judge access only if the event
  requires source review, Brock's call at submission time.
