# Karina’s OAT Prep · Monarque Tutoring

A static, mobile-first study app. Plain HTML, CSS, and ES2020 JavaScript. No backend, framework, runtime npm dependencies, or build step. Google Fonts is its only external resource; system fonts work offline.

## Source curriculum

All 24 biology chapters/subchapters from the supplied 136-page **Bio notes.pdf** are organized into 127 study topics and 854 questions, including six Boss questions per chapter. The supplied folder had two identical PDF copies. It contains biology material rather than every subject in the OAT. See `COVERAGE.md` for the chapter/topic/page mapping.

Original study guides summarize the concepts, with chapter and topic links into the bundled complete PDF at `source/bio-notes.pdf`, preserving access to every original figure and example. Google Drive links identify the supplied source. Existing visual design and study modes are retained.

Existing question mastery and XP persist. The original 25 question IDs are retained; cell questions move into chapter 2. Expanded chapter crowns/best scores and outdated section quiz sessions reset on the content revision, preventing completion of the old smaller set from counting as completion of the expanded one. Exported progress remains compatible.

## Open locally

Open `index.html` in a modern browser, or double-click it in your file manager. Section content loads through classic script tags, so `file://` works without fetching JSON. You can also serve this folder with `python3 -m http.server 8000` and visit `http://localhost:8000`.

Run `node tools/validate.mjs` from this folder before publishing. Node is needed only for this authoring check. Read `AUTHORING.md` to add sections.

## Publish on GitHub Pages

1. Create a GitHub repository and upload **the contents of this folder**, with `index.html` at the repository root. Commit and push to `main`.
2. Open **Settings → Pages**. Choose **Deploy from a branch**, branch **main**, folder **/ (root)**, and Save.
3. Open the published URL shown by GitHub after deployment finishes. All paths are relative, so a repository subpath works.
4. Future sections need only a new file in `sections/` and one manifest entry, followed by validation and a push.

No secrets or server configuration are required. Hosting makes the educational content public; progress remains in the learner’s browser.

## Study behavior

- **Quick 5:** up to five questions, weighted toward unseen and missed questions.
- **Topic drill / Full set:** all questions in the topic or section, shuffled.
- **Boss Round:** `mustGet` questions; unlocks at 60% attempted; 100% wins the crown.
- **Exam:** all questions, one shared time budget of 50 seconds per question. Selecting an answer locks it and advances. Feedback appears at the end. The deadline continues while paused or closed; resume checks it and marks unanswered questions as timed out. Change `EXAM_SECONDS_PER_QUESTION` at the top of `app/quiz.js` to tune it.
- **Mixed review:** up to ten questions across all sections, weighted toward weak topics. Appears with two or more sections.
- **Mistakes Deck:** a miss returns after one day. Subsequent deck reviews return after three and then seven days; two consecutive correct deck reviews clear a card. Practice/retry correctness improves mastery but only deck reviews clear cards.

Recall/application/analysis earn 10/15/20 XP for a correct first lifetime attempt; later correct attempts earn half. Consecutive correct answers multiply XP by 1.5 from three, or 2 from five. Wrong answers never subtract XP or mastery. Reviewing a Learn topic grants 5 XP once. XP can contain fractional values after combo multipliers.

Level 1 begins at 0 XP; the next level starts at `100 × n^1.5` cumulative XP for threshold index `n` (100, ≈283, ≈520…). Names are in `LEVEL_NAMES` in `app/progress.js`. Mastery is 0 unseen, 1 seen, 2 correct on one day, 3 correct on two different local calendar days. Rings/bars show the average on a 0–100 scale. All date rules use the learner’s local timezone.

Every completed round counts as a study day, including short topic drills. A one-day gap automatically uses the current ISO week’s single streak freeze; a larger gap or second missed day that week restarts the streak on the next completion. “NEW” lasts seven local calendar days from `addedOn`.

## Progress, controls, and access

Progress and the current round are stored under **`karinaOAT.v1`**. Refreshing restores XP, mastery, streak, mistakes, and a paused quiz. Storage failures are caught; the app still works in memory. Browsers may isolate or restrict `file://` storage. Use Settings → Export progress / Copy JSON to back up or transfer progress. Import replaces the current state after confirmation and ignores IDs removed from content. Reset asks for confirmation.

Use Tab / Shift+Tab to navigate, **1–5 or A–E** to answer (including the requested 1–4 / A–D), and **Enter** to advance after feedback. Learn/Practice tabs support arrow keys. Correctness always uses text and symbols as well as colour. Device reduced-motion preferences and the manual setting disable animation/confetti. Sound is off by default and generated locally with Web Audio. Appearance follows the device unless Light/Dark is chosen.

Settings → Copy progress summary produces a plain-text tutor update. If clipboard permission is unavailable, the app selects the text for manual copying. JSON import/export also works without clipboard access.

The site has no analytics, service worker, or automatic network calls beyond its Google Fonts stylesheet/font files. Adding ordinary sections does not require changes to `/app`. Updating `progressRevision` on a section invalidates its old crown/best score and paused section round while retaining valid question mastery and XP.
