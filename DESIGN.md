# Fleet Command: the design brief

Written 2026-08-14, before any restyling, because homework comes before styling.

## Why this is worth doing at all

Judges review dozens of entries. Two things from the research are worth acting on:

- **"Design is often the tie-breaker."** Judges see a lot of projects, and a clean,
  intuitive interface immediately signals professionalism.
- **Roughly 70% of hackathon judges say a polished UI influences the score they
  give for *innovation*** - not just the score they give for design. Polish
  leaks into how novel your idea looks.
- **Winners show the core innovation in the first 30 seconds.**

Source: hackathon judging guides collected 2026-08-14 (underratedcoder.com
"How to Win a Hackathon 2026", ai-beavers.com "How to judge hackathon").

Our technical story is already strong. Design is the place we are merely
competent, which makes it the highest-leverage thing left that is entirely in
crew hands.

## The counterweight, so this does not become a light show

From the fleet's own motion standard: **the expensive look is mostly stillness.**
One motion idea per screen. Reactive beats decorative. The removal test: take the
animation out, and if nothing goes missing and the page just gets calmer, it was
decoration.

"Floors you" does not mean more effects. It means every element looks decided.

## What is actually wrong with the current screen

Diagnosed by reading our own CSS, not by taste:

1. **Amber is spent before it matters.** `--amber` is currently the replay chip,
   the serpapi sample chip, *and* the approval gate. The most important moment
   in the product wears the same colour as a status label, so when SHIP holds,
   nothing new happens chromatically. The screen has already used its loudest
   voice on housekeeping.

2. **Flat elevation.** Every panel is the same surface, at the same level, with
   the same 1px border. Nothing is nearer than anything else, so the eye has no
   path and everything reads as equally important, which means nothing does.

3. **Type sits in one narrow band.** Sizes run about 0.72em to 1.25em with no
   display moment anywhere. Competent, unmemorable.

4. **The payload moment is a border colour.** The gate arming is the entire
   emotional point of the product ("the gate is the product") and today it is a
   1px border change plus a soft box-shadow. It should land like a weight.

## The direction

**One idea: amber means a human is needed. Nothing else may wear it.**

Every status label goes neutral or teal. Amber is removed from the replay chip
and the sample chips. Then the first and only time amber appears on the screen is
the moment SHIP holds at the gate, and the viewer learns a colour without being
told. That is one change to a variable's usage and it does more than any effect
could.

Everything else supports that:

- **Elevation with intent.** The console is the stage and sits nearest. The crew
  column and the target card recede. When the gate arms, the gate panel lifts and
  the rest of the screen settles back a step.
- **A display moment.** The wordmark and the gate's own headline get real scale
  and tight tracking. Everything else stays quiet. Contrast is what makes a page
  look designed rather than themed.
- **Depth without decoration.** A single soft radial behind the console so the
  page is not a grid of flat rectangles. No grain, no gradients on every surface.
- **The one motion idea: the gate arming.** The crew dims, the gate rises and
  takes focus, and Approve becomes the only lit control on screen. Nothing else
  animates on its own. No looping, no floating, no scroll reveals (there is no
  scroll: the page is one screen with zero scroll and stays that way).

## Constraints that do not bend

- One screen, zero scroll. Vertical or horizontal.
- Zero dependencies. No framework, no animation library. This is in the entry copy
  and it is true, so it stays true.
- `prefers-reduced-motion` honoured.
- Only `transform` and `opacity` animate.
- The demo capture will need re-recording after this. That is already on the board.
