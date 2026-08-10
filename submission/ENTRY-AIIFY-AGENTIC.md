# Aiify Agentic AI World Hackathon entry (second target)

Event: https://agentic-world.devpost.com/ (w/ Fetch.ai)
Deadline: submit by Sep 22, 2026. $5,000 cash plus credits; winners present
at the Agentic AI World Summit Sep 23 to 24.
Registration and submission are Brock's taps. Same project, agentic framing:
this event cares about agent orchestration and trustworthy autonomy, so the
copy leads with the loop instead of the stack.

## Project name

Fleet Command

## Elevator pitch

Four specialist agents run a full ops loop: recon, audit, fix, deploy. The
loop has one hard rule: the deploy agent cannot release without a human
click. Trustworthy autonomy you can watch.

## About the project

### The agentic problem we took on

Everyone can chain model calls. The unsolved part of agentic AI is trust:
what happens at the moment an agent's work touches the real world? Most
demos answer with either full autonomy (exciting, reckless) or a human
rubber stamping every step (safe, pointless). Fleet Command demonstrates a
third design: full autonomy inside the loop, one hard gate at the boundary
where the loop meets production.

### The orchestration

Four agents with distinct roles and system prompts run in sequence, each
receiving the accumulated crew output as context, so the pipeline is a real
chain of reasoning rather than four independent calls: SCOUT (recon) feeds
AUDIT (ranked defects), AUDIT feeds MEDIC (a concrete diff, drafted never
applied), MEDIC feeds SHIP (a staged deploy plus a risk summary). SHIP's
final line is always the same: HOLDING FOR HUMAN APPROVAL. The UI arms an
approval gate. Send back re-enters the loop with the human objection;
Approve is the only path to release. The agent literally has no code path
that ships without the click.

### Why this design matters for agentic AI

The gate makes autonomy legible and auditable: you watch each agent think,
you see exactly what is about to happen, and the system's boundary with
reality is a named human decision. We believe this is the shape agentic
systems need to be deployable in real businesses, and we say that from
experience: the same engine operates our private production ops room across
dozens of live sites today. Fleet Command is that pattern, public.

### Stack

Anthropic API (claude-sonnet-5) for every agent step, Cloudflare Pages +
Functions on the edge, zero dependencies, one screen. Honest dual mode:
without a key armed the app serves a recorded mission and labels it
"replay" on screen; with a key, every step is a live call. The mode chip is
always visible, because trust demos should not fake liveness.

## Built with

anthropic, claude, cloudflare-pages, cloudflare-workers, javascript

## Links

- Live demo: https://fleetcommand-2u0.pages.dev
- Video: (same video as DevNetwork entry)
