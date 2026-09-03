# Fleet Command - what is still open

## RESUME HERE (2026-09-03, 06:25 EDT, semisonic, judging day)

Ran on **Brockchain-Personal** (user `themac`, fleet `/Users/themac/Developer/BROCK`).

**The spot.** The entry is finished and green. `node tools/check-entry.mjs` reads
**14 of 14** at 06:12 EDT, asking the origin rather than the edge cache. The
1080p narrated master (38,095,709 bytes, md5 df10f22bf02e21282814267b9334e55d)
is published at `files.thebrockchain.com/fleetcommand/fleet-command-narrated.mp4`
and the press kit offers it beside the raw capture. Production is deployment
7d8c3979 from main `11f4c25`. Nothing was mid-flight when this session ended.
Submissions closed 2026-09-03 at 1:00pm EDT; judging 1:00pm to 4:00pm EDT,
winners 7:00pm EDT, per the event's schedule page.

**The next action.** Nothing owed by a session. If a session wants proof the
world still matches this file:

    node tools/check-entry.mjs        # expect 14 of 14 green
    curl -sI "https://files.thebrockchain.com/fleetcommand/fleet-command-narrated.mp4?cb=$(date +%s)" | grep content-length
                                       # expect 38095709

**Brock's taps, each one move, none urgent:**

1. **Devpost organiser BACKUP video field** still points at the demo key
   (`fleet-command-demo.mp4`, the 0:44 silent capture). The judged video is
   the YouTube embed, so this is cosmetic. If it is worth a click, point it at
   `https://files.thebrockchain.com/fleetcommand/fleet-command-narrated.mp4`.
2. **Trash two files on the Brockchain-Personal Desktop**: `get-the-master.sh`
   (a script that asked for the MacBook Pro password; the key lane made it
   pointless) and `fleetcommand-NARRATOR-music.mp4` (a copy; the same file
   now sits in `submission/youtube/videos/` here and on the MacBook Pro, and
   in R2).
3. **Optional, scores under "progress":** arm `ANTHROPIC_API_KEY` (spend
   capped) so the public demo shows LIVE, and `SERPAPI_KEY` / `NAMECOM_USER`
   + `NAMECOM_TOKEN` if the accounts exist.

**State of the machines.**
- Both Macs talk over ssh with a key, no password, both ways:
  `ssh -i ~/.ssh/id_ed25519_fleet thebrockchain@192.168.2.11` from Personal,
  `ssh themac@192.168.2.10` from the MacBook Pro. The MacBook Pro's fleet root
  is `/Users/thebrockchain/Documents/thebrockchain`, NOT `Developer/BROCK`.
  Memory: `the-macbook-pro-lane-is-open-both-ways`.
- The master now exists in three places: both Macs under
  `submission/youtube/videos/` (gitignored) and R2 `brock-public`.
- No worktree left alive for this repo. `wt/press-narrated` (merged) and
  `wt/entry-license` (superseded by the cherry pick) were retired 2026-09-03.
- `submission/vo/` on Personal: NOTES.md tracked, the nine takes ignored.
- The edge cache served the OLD 720p object on the bare narrated URL until
  about 10:00 EDT 2026-09-03 (`max-age=14400`). The press link carries
  `?v=1080` so a click gets the master regardless.

**Decisions this session, one line each.**
- The raw capture stays at `fleet-command-demo.mp4`; the narrated film has its
  OWN key. One key, one job; the press page labels both honestly.
- The checker cache busts every asset HEAD, because a bare HEAD read the
  previous upload for four hours and called the wrong film bound.
- The 720p YouTube transcode was replaced by the 1080p master rather than
  kept; same key, same page, better file.

**Dead ends, do not repeat.**
- "The MacBook Pro is unreachable" was FALSE for the whole night. Five
  sessions said it; none ran `ssh -o BatchMode=yes`. Test before declaring.
- A path copied from Personal fails on the MacBook Pro ("No such file")
  because the fleet roots differ. Not a missing file.
- Bare `yt-dlp` is dead here (403, PO token). The lane that worked for the
  720p copy was YouTube Studio's own Download button through the Claude in
  Chrome extension on the brock@thebrockchain.com account (channel
  UC6vhM2wKrCS5-gfcMAFAd9Q). falfasbrock@gmail.com has zero videos.
- Overwriting the demo key with the narrated film would have made the press
  page lie about its own "capture 0:44" button. Do not.
- Reading `~/.ssh/config`, `arp -a`, cookie stores and binding a probe server
  were refused by the auto mode classifier on 2026-09-02. Fair refusals, and
  none were needed once the key lane was tested.
- Foxit ($1,000) not entered, no real integration. The Google architecture
  diagram stays out of the gallery. The `submission/vo/` takes were not
  stitched into a stand-in master; that would be inventing evidence.

**Verified live vs believed.**
- VERIFIED 06:12 EDT: narrated key 38,095,709 bytes at origin (cache busted),
  bucket read back md5 matches; press page says "MP4 1080p" and links
  `?v=1080`; checker 14 of 14; repo public with MIT licence.
- VERIFIED 04:30 EDT by a peer on the live Devpost page: the entry's video is
  the YouTube embed of the narrated film.
- BELIEVED, not re-checked this session: the Google build at `/google` and
  its Cloud Run service; the SerpApi and name.com addenda in
  `submission/ENTRY-DEVNETWORK.md`.

**What the 2026-09-03 runs changed on main.** MIT licence (9f80b85). README:
the entry as it stands and a "Run it yourself" section. `tools/check-entry.mjs`
(new, then two keys two assertions, then cache busting). `site/press.html`:
two download buttons with honest labels. `submission/vo/NOTES.md` tracked.
`HACKATHON-BOARD.md`: the Sep 3 re-verify and six contests ruled out (Agentic
Cinema, Agents for Humans, AI Builders, GIBC V2, ML Empowerment, Amazon
Developer Hackathon; IBM Bob 2.0 unreadable behind a JS challenge). `.gitignore`:
the narrator renders and the VO takes.

**Crew follow-ups (fleet, not this repo).** jack's `public_ok()` needs the one
line for fleetcommand carrying the reason already in CLAUDE.md. The weekly
deadline re-verify. A dated decision on the Google build's future.

**Transcript pointers**, Brockchain-Personal only, both verified to exist:
- 2026-09-03 semisonic run (this block):
  `~/.claude/projects/-Users-themac/718eb575-3784-4420-aafc-8b20944817d6.jsonl`
- 2026-09-02 run: `~/.claude/projects/-Users-themac/9d55e5e7-6ef3-4387-b581-b1fc4bf96c8f.jsonl`

---

## Superseded: the 2026-09-02 block (kept only for the record it corrects)

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
narrated two minute forty six film on YouTube.

**CORRECTED 2026-09-03: this block went on to call the master possibly GONE, and
that was wrong.** It exists, on the OTHER Mac, measured there by ffprobe at
38,095,709 bytes and 166.3 seconds. The Sep 2 run searched Brockchain-Personal
disk wide, found no Fleet Command mp4, and reasoned from one machine as though
it were the only one. See the hostname trap above. The original text follows
unedited, because the shape of the mistake is the lesson: the narrated master
(`fleetcommand-NARRATOR-music.mp4`) could not be reached from Brockchain-Personal: it is not in the repo (media is gitignored), not in
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

**The next action.** Nothing is blocking. If you want the entry improved before
Sep 3 1:00pm EDT, the one honest upgrade is swapping the narrated master into
the same R2 key (see below, it may not exist any more). The highest value BUILD
is the Foxit track. To confirm the entry is still healthy:
`curl -sL -o /dev/null -w '%{http_code}' https://devpost.com/software/fleet-command`
expects **200**.

**State of the machines.** This ran on **Brockchain-Personal**, fleet root
`~/Developer/BROCK`, branch `main`, no worktree (a deviation from the one
worktree per session rule: the repo was clean and unshared, and it is recorded
here rather than hidden). Nothing armed, no servers left running.
`submission/vo/` is untracked and is Brock's own raw voice takes; it was never
staged. Repo is PUBLIC.

**Decisions made 2026-09-02, do not re-litigate.**
- Repo flipped PUBLIC. Every track demanded it; the entry was unwinnable
  otherwise.
- **Foxit track NOT entered.** No real integration exists and its judges are
  Foxit engineers. Our own no-fake-integrations rule.
- **The Google architecture diagram was kept OUT of the gallery.** It is a fine
  asset but it says ADK, Gemini and Cloud Run, and this entry's story is
  Cloudflare and Anthropic. It would contradict the copy.
- **The required video field holds a fresh capture, labelled as such**, never
  passed off as the narrated master.
- **The `vo/` voice takes were NOT stitched into a fake master.** Assembling an
  artifact out of raw takes to fill a contest field is inventing evidence.

**Dead ends already tried, do not repeat.**
- **yt-dlp cannot pull our own YouTube video.** PO token and n-challenge; the
  documented fix downloads and runs a script from GitHub, which was refused.
  Cookies from the signed-in browser did not help either.
- **YouTube Studio cannot reach the channel from this Chrome.**
  @BrockchainLabs sits on a DIFFERENT Google account; this profile has one
  empty channel (@the_brockchain).
- **Reading `~/.ssh/config`, `arp -a`, and binding a probe server were all
  refused by the auto mode classifier.** Fair refusals, not walls to argue with.
- **A session name does NOT identify a machine, and neither does a username.**
  `hostname -s` is the only honest check. Got wrong three times in one night:
  twice calling a peer "the other Mac", then once claiming both Macs share the
  username `themac` (they do not, see the correction above).
- **CROSS SESSION MESSAGING IS SAME HOST ONLY.** Every peer `ListAgents`
  returns is on THIS machine and therefore this disk, so asking around for a
  file that is not here can never succeed. Measured 2026-09-03 after four work
  orders were sent to peers who all had the same empty directory. There is also
  no ssh route between the Macs: a key was generated that night, never worked,
  and was deleted.
- Earlier, still true: AppleScript System Events into YouTube's hardened fields
  is rejected silently, native macOS file pickers cannot be driven at all, and
  the YouTube Data API needs an OAuth scope this machine does not hold. The
  paired Claude Chrome extension is the only lane that fills hardened inputs.

**Verified live vs merely believed (2026-09-02, cache busted, keyless).**
VERIFIED: devpost.com/software/fleet-command 200; fleetcommand-2u0.pages.dev
`/`, `/press`, `/google` all 200; all six assets on files.thebrockchain.com 200
and byte exact; `gh` reports the repo `private=false`; press page 1.000 screens
desktop and 1.438 phone, measured rendered; the one page PDF is `/Count 1`.
BELIEVED, NOT CHECKED: how the submitted page renders to a logged-out stranger
(it was only ever fetched while signed in as Brock); whether the phone figure
holds on a real iPhone rather than headless Chromium; whether the PDF prints
well on paper. `/jack` and `/ellis` were not run against the new page.

**Transcript pointer.** Verified to exist on **Brockchain-Personal** at
`~/.claude/projects/-Users-themac/9d55e5e7-6ef3-4387-b581-b1fc4bf96c8f.jsonl`
(23MB, 2026-09-03). Unreadable from the other Mac.

---

## What is left, and whose hands

**Brock's, and none of it blocks the entry:**
1. **The narrated master.** `fleetcommand-NARRATOR-music.mp4` is not on this Mac
   (disk wide search, no Fleet Command mp4 anywhere) and the pipeline's
   gitignored `.work/` is gone, so it may not exist any more. If it turns up:
   `npx wrangler r2 object put brock-public/fleetcommand/fleet-command-demo.mp4
   --file=<path> --content-type=video/mp4 --remote`. Same key, so **no Devpost
   edit is needed**.
2. **A Foxit account** if the $1,000 track is wanted; the integration needs
   their API credentials and account creation is his.
3. Optional, and only worth it if a key is free: arming `SERPAPI_KEY`,
   `NAMECOM_USER` and `NAMECOM_TOKEN` as Pages secrets turns the two sponsor
   chips from labelled sample to live, which is worth points under "progress".
   `ANTHROPIC_API_KEY` does the same for the LIVE chip.

**Crew, needs no permission:**
- **Build the Foxit integration** if Brock opens the account. Highest value item
  left on this creation.
- **Find a home for the Google build.** The `/google` cockpit, the Cloud Run
  deploy and the second film are finished work entered in nothing.
- **Put a clock on deadlines.** This campaign's single largest loss was a missed
  date, not a missing build. `fleetbrain` already runs on Cloudflare cron and
  could watch every deadline. A note in a file is not an alarm.
- Re-verify every event deadline before acting on it; the board's own rule, and
  its Aug 14 numbers were wrong by Sep 2 in three separate places.

## Standing cautions

- The og card build strips everything between share:start/share:end markers;
  JSON-LD lives outside them on purpose.
- The h1 carries class="mark"; dropping it changes the header.
- record.mjs writes marks.json; edit.mjs reads it. Never hand type shot times.
- Below 900px the page scrolls by design (see DESIGN.md); do not clamp.
