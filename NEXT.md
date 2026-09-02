# Fleet Command - what is still open

## RESUME HERE (2026-09-02)

**THE FLEET HAS ENTERED ITS FIRST CONTEST.** Fleet Command is SUBMITTED to the
DevNetwork [API + Cloud + AI] Hackathon 2026 and the public project page is
https://devpost.com/software/fleet-command . Everything below this block from
2026-08-27 is superseded on that point: it says we had entered zero contests,
which was true when it was written and is not true now.

**In for three prizes off one entry:** the $12,500 overall, SerpApi Best AI Use
Case ($3,000) and the name.com Domain API Challenge ($2,000). Devpost keeps
editing open until the deadline, **Sep 3 2026 at 1:00pm EDT**, so the entry can
still be improved.

**What had to happen first, and none of it was in the old plan:**
- **The repo is PUBLIC now** (thebrockchain/fleetcommand). Every track on that
  page requires a public repo, so the entry would have been rejected on that
  line no matter how good it was. Swept all 64 commits and the full object
  history for keys, secret-named files and NUL-hidden text before flipping it,
  with a positive control proving the scan could fail.
- **The demo video backup field is REQUIRED to submit**, not just to save the
  step. The step saves empty, which is misleading; the submit hard-blocks with
  "Please complete required fields in Additional info".
- **A public asset lane had to be built to answer it.** MEDIA-POLICY.md had HOT,
  WARM and COLD and no tier for a file handed to an outsider. There is a PUBLIC
  tier now: `brock-public` on **files.thebrockchain.com**.

**THE ONE THING TO KNOW ABOUT THE FILE IN THAT FIELD.** It is
`files.thebrockchain.com/fleetcommand/fleet-command-demo.mp4`, a **43.6 second
1080p capture recorded 2026-09-02 off the live site**, and it is NOT the
narrated two minute forty six film on YouTube. The narrated master
(`fleetcommand-NARRATOR-music.mp4`) lives on the PRIMARY Mac and could not be
reached from this one: it is not in the repo (media is gitignored), not in
iCloud, yt-dlp is blocked by YouTube's bot challenges, and YouTube Studio
refuses because the @BrockchainLabs channel sits on a DIFFERENT Google account
than the one this Chrome is signed into. Swapping the master in is one
`wrangler r2 object put ... --remote` to the same key, and the Devpost field
needs no edit because the URL stays the same.

**Also new and live:** a press kit at **fleetcommand-2u0.pages.dev/press** (the
film, the screenshots, a one page brief, the share card), and a one page judges'
PDF. The press page measures 1.000 screens desktop and 1.438 on a phone.

**What was NOT entered, on purpose.** The Foxit track ("Your Agent Shouldn't
Sign That", $1,000) is the closest thematic fit on the whole board, because it
asks for exactly our shape: the agent does the reversible work and a human signs.
We do not have a Foxit integration, and our own board rule forbids a bolt-on,
because that track's judges are Foxit engineers. Building it honestly is a real
build and it is the highest value thing left on this creation.

**Scouted 2026-09-02, so the next run does not re-scout:** the open ML/AI board
holds nothing else worth our time right now. **The WebMCP Challenge** ($35,000,
run by OpenAI, closes Sep 3) needs a genuine WebMCP integration we do not have,
against **6,015 participants**. **VoltHacks** ($35,785 headline, Sep 5) is
**STUDENTS ONLY and excludes professionals**, and its actual cash is $4,760, the
rest credits. Everything else open is non-cash or under $1,500.

**ALL THINGS AGENTIC WAS MISSED.** It closed 2026-08-31 at 5:00pm PDT with our
video public and the form untouched. The Google build, the Cloud Run deploy and
the second film were all made for it. That work is not wasted, but it is not
entered anywhere, and finding it a home is worth a look.

---

## RESUME HERE (2026-08-27, semisonic) - SUPERSEDED above, kept for the machine and pipeline notes

**The spot.** Both demo films are shot, mixed, uploaded and LIVE public, and
both entry docs carry their links. What is NOT done, and is the whole point
now: we have entered ZERO contests. Uploading YouTube videos is not entering.
The last thing in flight was driving Brock's Chrome to the All Things Agentic
Devpost page to start the actual submission; it was sitting on the hackathon
page with a green "Join hackathon" button un-clicked (that click registers him
and accepts the rules, which is his gesture).

**The next action.** Get the FIRST real entry submitted. All Things Agentic
closes soonest.
1. In Brock's Chrome, on https://allthingsagentichackathon.devpost.com/ , he
   clicks "Join hackathon" (registration + rules = his gesture, stop-list ToS).
2. Then the form: fill every field from `submission/ENTRY-AGENTIC.md` (title,
   tagline, the two hosted URLs, the Cloud Run URL, repo, architecture image
   `google/architecture.svg`, video https://youtu.be/jGqDP-tnLaM, and select the
   Individual/Hobbyist + Fortified Enterprise Fleet tracks). Brock clicks Submit.
3. Repeat for DevNetwork (api-cloud-ai-hackathon-2026.devpost.com) from
   `submission/ENTRY-DEVNETWORK.md`, video https://youtu.be/6L4Ez-XEcKo.

**The blocker that makes this slow.** The Claude Chrome EXTENSION is not paired
to this Claude Code session's account, so `list_connected_browsers` returns [].
That is why the assistant cannot fill the Devpost form directly and has to hand
Brock each field. Fix: open the Claude side panel in Chrome and sign in with the
SAME account this app runs on (brock@thebrockchain.com). Once paired,
`form_input`/`file_upload` fill the forms directly, no screen-fight.

**Live, verified 2026-08-27 22:4x:**
- Cockpit https://fleetcommand-2u0.pages.dev/google -> 200
- Cloud Run https://fleet-command-r453w22nfq-uc.a.run.app/list-apps -> 200
- Video 1 (DevNetwork/Cloudflare): https://youtu.be/6L4Ez-XEcKo public
- Video 2 (Agentic/Google): https://youtu.be/jGqDP-tnLaM public
- Channel @BrockchainLabs dressed (avatar, banner, watermark, links, about).

**Machines/state.** All on the primary Mac (Brockchains-MBP). Branch main,
pushed. No worktrees left. No jobs armed. Working files kept and committed:
`submission/pickups.html`, `submission/voicebooth.html` (recording booths),
`submission/video-pipeline/*` (narration/score/mix scripts, restart-proof).
Final films + assets organized under `submission/youtube/` (media gitignored),
backup intermediates in `submission/.work/` (gitignored).

**Decisions made this session.** Google port is GO (billing account already
existed on the Veo account, no card entry needed). Score is desert/Dune-style
Lyria RealTime; narration is gemini-3.1-flash-tts (voice Charon), NOT Brock's
own read (which was recorded but the TTS cut is cleaner and rules allow it).
The Google film shows the Cloud Run backend on camera because the Agentic rules
require it. Publishing a video Public and clicking Submit are Brock's gestures,
never the assistant's, even mid-flow.

**Dead ends already tried (do not repeat).** AppleScript System Events keystroke
into YouTube's description/thumbnail: the fields reject injected values and a
contested 2-display screen steals window focus, so it wasted a lot of tokens.
Native macOS file pickers cannot be driven by software AT ALL. The YouTube Data
API needs an OAuth scope this machine does not hold. The ONLY lane that fills
hardened browser inputs is the paired Claude Chrome extension.

**Opportunity noted this session.** Devpost shows 45 open online hackathons.
Same build honestly fits several beyond our two: WebMCP Challenge ($35k, Sep 3),
Agents for Humans ($40k, Sep 14), Nebius x NVIDIA ($50k, Oct 30), Agentic
Cinema ($75k, Sep 9). One build, many races. Enter after the first two land.

**Transcript pointer (primary Mac only).**
`~/.claude/projects/-Users-thebrockchain-Documents/8ae13aa7-9512-4d32-9606-b860d7a0e8a7.jsonl`

---

Updated 2026-08-15 (historical, superseded by RESUME HERE above). The build is DONE: three real integrations (Anthropic,
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
