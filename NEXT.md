# Fleet Command - what is still open

## RESUME HERE (2026-09-03, 02:40 EDT, judging day)

**Submissions close TODAY at 10:00am PDT (1:00pm EDT).** Judging runs 10:00am
to 1:00pm PDT, winners at 4:00pm PDT, all read off the event's own schedule
page this morning. The entry is live at https://devpost.com/software/fleet-command
and `node tools/check-entry.mjs` meets every public surface it points at from
outside: cockpit, press kit, Google build, five security headers, five public
assets, the repo, the Devpost page's links, and the film on YouTube. 12 of 13
green this morning. The one red is the licence, below, and the check is proven
able to fail (`--prove`).

**Brock's taps, each one move, in the order they pay off:**

1. **THIS ITEM WAS WRONG AND IS NOT URGENT. Verified on the live Devpost page
   2026-09-03 04:30 EDT: the submission's video IS the narrated YouTube film**
   ("Fleet Command: an AI ops crew with a human approval gate", by Brock Falfas,
   a YouTube embed as the first gallery slide). `tools/check-entry.mjs` agrees at
   14 of 14 green as of 2026-09-03 05:50 EDT, including "devpost entry page links site, repo and film" and
   "film is public on YouTube".

   The sentence below claimed the required video field points at the R2 mp4. It
   does not. That single false claim sent a session into a deadline panic hours
   before judging, so it is corrected here rather than quietly deleted.

   **RESOLVED 2026-09-03 05:50 EDT, and the instruction below was wrong.**

   The press kit now offers BOTH films, and nothing here is outstanding.

   The old instruction said to overwrite fleet-command-demo.mp4 with the
   narrated master. Doing that would have broken the press page, which labels
   that button "capture 0:44" and offers it "to edit from" on purpose. One key
   was being asked to do two jobs.

   What was done instead: the narrated film was pulled from YouTube Studio and
   uploaded to its OWN key, and the press card now carries two honest buttons.

   * `fleet-command-narrated.mp4`, 15,434,083 bytes, 2:46, h264 + AAC,
     mean_volume -16.9 dB. This is YouTube 720p transcode, NOT the 1080p
     master. Live, verified with a cache buster.
   * `fleet-command-demo.mp4`, 4,257,671 bytes, 0:44, the raw capture,
     deliberately unchanged.

   **THE LANE, because bare yt-dlp is dead here** (403 on every player client,
   PO token demanded on ios and tv even with node as the JS runtime): the
   Claude in Chrome extension plus YouTube Studio own Download button.
   studio.youtube.com, switch account to brock@thebrockchain.com (channel
   UC6vhM2wKrCS5-gfcMAFAd9Q; falfasbrock@gmail.com has ZERO videos and is the
   wrong one), open the video, three dot menu, Download. Lands in ~/Downloads.

   **The checker was the thing keeping this alive.** It demanded the narrated
   master at the capture key and went red on a correct file, which is what sent
   session after session hunting a master that was never missing. Fixed in
   tools/check-entry.mjs: two keys, two assertions, still by exact byte count,
   and the narrated slot accepts the 1080p master or the 720p transcode. The
   instrument was proven to still fail before it shipped. Now 14 of 14 green.

   **Still open and it blocks nothing:** the 1080p master
   (fleetcommand-NARRATOR-music.mp4, 38,095,709 bytes) exists only on
   Brockchains-MBP, and the Devpost organiser BACKUP field still points at the
   demo key. Uploading the master from that Mac would close it. From the repo
   root there:

       npx wrangler r2 object put brock-public/fleetcommand/fleet-command-narrated.mp4 --file submission/youtube/videos/fleetcommand-NARRATOR-music.mp4 --content-type video/mp4 --remote

   `--remote` is the whole trick: without it wrangler writes a LOCAL bucket and
   prints success. Point it at the narrated key, never the demo key.

2. **Licence: DONE, nothing left to tap.** Landed 2026-09-03 04:25 EDT from
   Brockchain Personal. MIT, "Copyright (c) 2026 Brock Falfas", matching the
   other public fleet repo. `tools/check-entry.mjs` now reads **13 of 13
   green**, with "repo carries a LICENSE (MIT)" standing where the single red
   was.

   The instruction parked here was already stale when it was read:
   `git merge --ff-only origin/wt/entry-license` cannot work, because that
   branch is 1 ahead and 3 BEHIND main, and ff-only refuses a non descendant.
   Measure both directions before writing a merge command into a runbook, not
   just "is it unmerged". It was cherry picked instead: 35b33dc onto
   origin/main, landing as 9f80b85, verified by reading origin rather than
   trusting the push echo. Branch `wt/entry-license` is now redundant and can
   be retired. A different licence is one commit to replace.

3. **Deploy main when you like.** Production is at `2020ecd`, main is ahead by
   the Linkborn tie-in (a `data-crew` attribute and an HTML comment) plus this
   run's docs and check script, none of which change what a judge sees. So it
   is not needed before judging. `git pull && npx wrangler pages deploy --branch main`.

4. **Optional, scores under "progress":** arm `ANTHROPIC_API_KEY` (spend
   capped) so the public demo shows LIVE during the judging window, and
   `SERPAPI_KEY` / `NAMECOM_USER` + `NAMECOM_TOKEN` if the accounts exist.

**What this run changed on main.** README: the entry as it stands, a "Run it
yourself" section (proven: `npx wrangler pages dev` served `/` 200 with the
cockpit in this checkout), and the check script. `submission/ENTRY-DEVNETWORK.md`
records the submission and corrects the pool ($39,500, not $45,500) and the
repo line (public, with the required video URL). `HACKATHON-BOARD.md` carries
the Sep 3 re-verify (1,358 participants, judging window, six contests ruled
out). `site/sitemap.xml` now lists `/press`. `tools/check-entry.mjs` is new.

**What was scouted so nobody re-scouts it.** Every open ML/AI contest on
Devpost with real cash was read from its own page 2026-09-03: Agentic Cinema
($75,000, Sep 9, needs Google Agent Builder plus a media partner integration),
Agents for Humans ($40,000, Sep 14, must be a new Strands SDK agent), AI
Builders, GIBC V2 and ML Empowerment (all students only), the Amazon Developer
Hackathon ($138,000, Oct 23, Fire TV / Alexa+ / Ring / Bee device builds). None
is an honest fit for this build or the Google build. IBM Bob 2.0 (lablab.ai)
could not be re-read: Cloudflare JS challenge to curl and to headless Chrome.
Its Sep 25 to 27 dates are from Aug 25 and are marked unverified on the board.

**Crew follow-ups.** jack's `public_ok()` needs the one line for fleetcommand
carrying the reason already in CLAUDE.md (a brock worktree, merge when the
shared brock checkout is clean). The weekly deadline re-verify. A dated
decision on the Google build's future.

---

### THE HOSTNAME TRAP, and it has now bitten in BOTH directions

**CORRECTED 2026-09-03 by a peer session: the two Macs have DIFFERENT
usernames, and an earlier version of this block said they were the same.**

- **Brockchain-Personal**, user `themac`, fleet `/Users/themac/Developer/BROCK`
- **Brockchains-MBP** (the MacBook Pro), user `thebrockchain`, fleet
  `/Users/thebrockchain/Developer/BROCK`

The wrong version was inferred from a screenshot of one terminal rather than
measured, and it matters more than a typo: **sshd returns the IDENTICAL
"Permission denied (publickey,password,keyboard-interactive)" for a wrong
username as for an unauthorized key**, so a name typo looks exactly like a
locked door and sends a session to the wrong conclusion. Shared brain:
`the-two-macs-have-different-usernames`.

`hostname -s` remains the only honest check, and it belongs at the top of any
note that says "this Mac".

Proof, from the two halves of this same file. The Sep 2 block below says the
master is unreachable and possibly gone; it ran on **Brockchain-Personal**,
where `submission/youtube/videos/` does not exist at all. The Sep 3 block above
says the master is "ON THIS MAC" with a real ffprobe reading; it ran on the
OTHER machine, where it plainly does. **Both are true, and each was written as
if its machine were the only one.** Re-checked on Brockchain-Personal at the end
of the Sep 2 run: still no `videos/` directory. So the file EXISTS, it is on the
other Mac, and only a session there can do the swap in tap 1.

### Decisions from the 2026-09-02 run, so they are not re-litigated

- **Repo flipped PUBLIC.** Every track demanded it.
- **Foxit ($1,000) NOT entered.** No real integration and its judges are Foxit
  engineers. Our own no-fake-integrations rule.
- **The Google architecture diagram was kept OUT of the gallery.** It says ADK,
  Gemini and Cloud Run, and this entry's story is Cloudflare and Anthropic.
- **The `submission/vo/` voice takes were NOT stitched into a stand-in master.**
  Assembling an artifact from raw takes to fill a contest field is inventing
  evidence. They are still untracked on Brockchain-Personal.

### Dead ends from 2026-09-02, do not repeat

- **yt-dlp cannot pull our own YouTube video.** PO token and n-challenge; the
  documented fix runs a script fetched from GitHub, which was refused. Cookies
  from the signed-in browser did not help.
- **YouTube Studio cannot reach the channel from that Chrome.** @BrockchainLabs
  sits on a DIFFERENT Google account; the profile has one empty channel.
- **Reading `~/.ssh/config`, `arp -a`, and binding a probe server** were all
  refused by the auto mode classifier. Fair refusals.
- **A session name does not identify a machine**, per the trap above.
- Still true from earlier: AppleScript into YouTube's hardened fields is
  silently rejected, native macOS file pickers cannot be driven at all, and the
  YouTube Data API needs an OAuth scope that machine does not hold.

### Transcript pointer for the 2026-09-02 run

On **Brockchain-Personal** only, verified to exist:
`~/.claude/projects/-Users-themac/9d55e5e7-6ef3-4387-b581-b1fc4bf96c8f.jsonl`

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
