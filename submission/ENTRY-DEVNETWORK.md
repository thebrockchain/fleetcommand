# DevNetwork API + Cloud + AI Hackathon 2026 entry (primary target)

Event: https://api-cloud-ai-hackathon-2026.devpost.com/
Window: Aug 17 to Sep 3, 2026. $45,500 cash pool, $12,500 overall winner.
Tracks entered: the general API + Cloud + AI category (our stack IS the track),
plus the **SerpApi challenge** ($3,000, 2 winners) which SCOUT genuinely uses.
See the addendum at the bottom, written for that track's own judges.
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
target site in sequence: SCOUT does reconnaissance on both the site and the
market around it, AUDIT ranks the defects,
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
own system prompt and the prior crew output as context. SCOUT additionally
queries SerpApi for live Google results about the market the target competes
in, cached in Workers KV. Zero dependencies, no build step, no framework:
hand rolled HTML, CSS, and JS on the front, one Function on the back,
security headers on every response via middleware.

Two honest modes, on two independent switches. With no Anthropic key set,
/run serves a recorded run and the UI labels it "replay". With no SerpApi key
set, SCOUT gets clearly marked sample data and a second chip reads "serpapi
sample". Arm either key and that half goes live on the same code path. The app
never pretends a canned answer is live; we think honesty is a feature judges
can verify, so both modes are always on screen.

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

javascript, cloudflare-pages, cloudflare-workers, cloudflare-kv, anthropic,
claude, serpapi

## Links

- Live demo: https://fleetcommand-2u0.pages.dev
- Video: (YouTube link after recording, script in VIDEO-SCRIPT.md)
- Repo: private; flip public or grant judge access only if the event
  requires source review, Brock's call at submission time.

---

# Addendum: SerpApi challenge ($3,000, 2 winners)

Paste this into the SerpApi challenge submission. Written for that track's own
judges, who are SerpApi engineers and will read the integration, not the pitch.

## How Fleet Command uses SerpApi

SCOUT is the reconnaissance agent. Before this, SCOUT could only read the
target's own snapshot, which is half of recon: it tells you what the site IS
and nothing about what it is UP AGAINST. SerpApi supplies the other half.

SCOUT issues one Google search derived from the target's trade (the demo target
is a bakery with a broken order route, so the query is "bakery online
ordering"), and reads back the top ranking competitors and the related
questions real buyers are asking. That intel goes into SCOUT's prompt alongside
the site snapshot, and it changes the report: SCOUT now says the dead order
form is not just a bug, it is a bug in the exact place the whole market
competes. AUDIT then ranks that finding first and MEDIC drafts it first. One
search visibly changes what the crew does.

## What we did with your quota, on purpose

The free plan is 100 searches a month and this is a public page with a Run
button on it, so a naive integration would burn the month in an afternoon. So:

- The query is fixed and the result is cached in Cloudflare Workers KV for
  12 hours, holding real usage near 60 searches a month no matter how many
  people press Run.
- Only SCOUT searches. The other three agents work from SCOUT's report, the
  way a real crew would, so a mission costs at most one search.
- The response reports whether the cache is actually bound (`"cache":"kv"`),
  because a quota guard everyone assumes exists is not a guard.
- Failure is honest and non blocking: a non 200, a body level `error` (how you
  report exhausted quota and bad keys), a timeout, or an empty result all fall
  back to clearly labelled sample data with the reason attached, and the
  mission still completes.

## Honesty about what a judge will see

If the SerpApi key is not armed on the public demo at judging time, the header
chip reads "serpapi sample" in amber and the console entry is labelled sample.
That is deliberate: we would rather show a labelled sample than pass canned
data off as live search. Arm the key and the identical code path returns real
results with the chip in teal.

## Where the code is

- `functions/_lib/market.js` - the whole integration, commented, ~130 lines.
- `functions/run.js` - SCOUT's step calls `marketIntel(env)` and puts
  `formatMarket()` into the prompt.
- `tools/test-market.mjs` - runs with `node tools/test-market.mjs`, proves the
  parser against a real SerpApi payload shape plus the ugly cases (missing
  snippet, missing position, question-less related_questions entry, junk).
