# Fleet Command

The public agentic ops cockpit and the fleet's hackathon entry. A judge
lands with no login, watches four AI agents work a synthetic mission
(Harbor Lane Bakery), and every deploy HOLDS at the human approval gate.
The gate is the product: AI drafts, people decide.

Born public on purpose. 100% synthetic data, zero fleet secrets, no
connection to the walled ainow room.

## Live

- URL: https://fleetcommand-2u0.pages.dev
- Healthy answer: 200 on `/`, replay mode by default and labeled honestly
  in the chip and the footer. `/google` serves the Google-native build.
- Press kit: https://fleetcommand-2u0.pages.dev/press
  Healthy answer: 200, and its four download buttons resolve on
  files.thebrockchain.com. A 404 on any of those means the asset lane broke,
  not the page.
- Public assets: https://files.thebrockchain.com/fleetcommand/
  (`brock-public` R2, the PUBLIC tier in the fleet MEDIA-POLICY.md). Holds the
  demo MP4, three screenshots, the share card and the one page brief.
  **Anything put here is published**, so nothing uncleared goes in it.
  **`wrangler r2 object put` needs `--remote`** or it writes to a local
  simulated bucket, prints success, reads back correctly, and leaves the real
  bucket empty while every public URL 404s.
- Repo: https://github.com/thebrockchain/fleetcommand
  **PUBLIC since 2026-09-02**, because every DevNetwork track requires a public
  repo. Swept for keys and secret-named files across all commits before the
  flip. Keep it that way, and keep secrets out of it accordingly.
- Devpost entry: https://devpost.com/software/fleet-command (SUBMITTED)

## Deploy

No build step, no runtime deps. From this folder:

    npx wrangler pages deploy --branch main

Security headers ride every response via `functions/_middleware.js`.

**On-switch**: replay mode is the default. Live agent runs arm only when
`ANTHROPIC_API_KEY` is set as a Pages secret. That is Brock's hands, a
live secret key is one of the five human-only acts:

    npx wrangler pages secret put ANTHROPIC_API_KEY

The link preview card is generated: `node tools/build-og.mjs` rewrites the
block between `share:start` and `share:end`. Hand edits inside those
markers are overwritten on the next run.

Two entries live in `submission/`: DevNetwork (this Cloudflare cockpit)
and All Things Agentic (the Google ADK / Gemini build under `google/`).

## Lessons that apply here

- [[fleetcommand-hackathon-campaign]] - the campaign shape, entry copy,
  and the two-key ignition
- [[hackathons-hub]] - the walled war room behind this; edit facts there
- [[logo-home-rule]] - keeping the header logo behavior consistent
- [[meters-beat-ai-ears]] - if you touch the demo video mix, measure with
  volumedetect ratios; do not trust an AI-ear review

## Fleet-wide rules

Auto-loaded from [brock/CLAUDE.md](../brock/CLAUDE.md) - dashes ban,
one-screen homepage, spacing ceiling, LEAN, security headers, no-AI-look
copy. Do not duplicate here.
