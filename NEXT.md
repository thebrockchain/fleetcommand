# Fleet Command - what is still open

Updated 2026-08-15. The build is DONE: three real integrations (Anthropic,
SerpApi, name.com, each behind its own on-switch with labelled sample
fallback), the design pass (amber reserved for the gate, the slam, the living
field, frosted glass), crew telemetry, the 2x share card, and the 4K-shot,
13-shot-edited demo film. The campaign war room is hackathons.thebrockchain.com.

## Brock's taps, in order (nothing else blocks anything)

1. **Voice the film.** `~/Desktop/fleetcommand-demo.mp4` (2:42, silent), marks
   table at the top of `submission/VIDEO-SCRIPT.md`. Say nothing over the first
   two seconds of each slam (0:03 and 1:57). His voice is human only.
2. **Upload public to YouTube**, link into `submission/ENTRY-DEVNETWORK.md`.
3. **Arm the hub wall**: `export BROCKAUTH_OWNER_KEY=...` then
   `bash ~/Documents/thebrockchain/hackathons/tools/arm-wall.sh` (owner key is
   human only; the script does the rest and proves the wall holds).
4. **Register for DevNetwork** when it opens Aug 17 (ToS is human only).
5. **Google Cloud billing account by Aug 20** or the $180k port is killed and
   the days go to the useBruno track instead (card entry is human only).
6. Optional, worth $5,000 in tracks: SerpApi and name.com free accounts, then
   arm SERPAPI_KEY, NAMECOM_USER, NAMECOM_TOKEN as Pages secrets. Optional:
   ANTHROPIC_API_KEY (spend capped) for the LIVE chip.
7. **Submit by Sep 3**: main entry plus the SerpApi and name.com tracks
   separately, from `submission/ENTRY-DEVNETWORK.md`.

## Crew follow-ups (need no permission)

- useBruno collection over the /run API (cheapest track, $1,000), by Aug 26.
- Architecture diagram (required by All Things Agentic), by Aug 28.
- Google port build (3 days, plan in GOOGLE-PORT.md) IF the billing account
  exists by Aug 20.
- Re-verify every event deadline weekly; board rule, next check Aug 21.
- If any key gets armed, re-run the rig + edit so LIVE chips are on camera.

## Standing cautions

- The og card build strips everything between share:start/share:end markers;
  JSON-LD lives outside them on purpose.
- The h1 carries class="mark"; dropping it changes the header.
- record.mjs writes marks.json; edit.mjs reads it. Never hand type shot times.
- Below 900px the page scrolls by design (see DESIGN.md); do not clamp.
