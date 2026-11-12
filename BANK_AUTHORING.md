# Adding the next 50-question release

User authorization: add and publish 50 genuinely new biology questions every two days to the existing Karina site, preserving earlier releases, the current design, all 854 foundation IDs and saved progress. Do not generate or charge for questions in a learner's browser.

## Source and cadence

- Canonical site: `https://dahamhettiarachchi10-hub.github.io/karina-oat/`
- Repository: `dahamhettiarachchi10-hub/karina-oat`, Pages from `main` at repository root.
- Source: `source/bio-notes.pdf`, an unchanged 136-page biology PDF. Source page text is also in `source/pages.js`. Read the relevant original pages, including figure/table context, before authoring.
- The first release is 2026-11-12. Plan one 50-question release every two days at 09:00 America/Toronto, beginning 2026-11-14. Scheduled execution may be delayed if the local desktop app or computer is unavailable.
- Run `node tools/refresh-status.mjs` against the latest published repository. If not due, or today's release already exists, do not create another batch. If a run was missed, publish one quality-controlled batch for the current Toronto date, rather than creating several catch-up batches.

## Authoring contract

1. Work from the latest remote `main` in a fresh isolated checkout/branch. Preserve unrelated local changes; never reset or force-push. Do not redeploy stale runtime/source files from another checkout.
2. Read all foundation questions and prior releases. Choose under-practiced objectives and rotate coverage. Make 50 original questions: normally two per chapter plus two extra in areas with thinner recent coverage.
3. Write `bank/YYYY-MM-DD.js`, calling `registerQuestionBatch({id, title, publishedOn, questions})` once. Use a date-matched id and unique item IDs `bio-rYYYYMMDD-001` through `-050`. Add only this filename to `bank/manifest.js`. Never alter a published question's ID, options, correct answer or wording as part of a routine refresh.
4. Each question needs `section` (existing chapter id), `topic` (existing topic id), `difficulty` (`recall`, `application`, `analysis`), a clear `stem`, 4 plausible distinct `options`, zero-based `answer`, an explanatory `explanation`, and `sourcePages` (array of actual PDF page numbers within the chapter). Omit `mustGet` so the existing six-question Boss sets remain stable.
5. Prefer application and reasoning with plausible distractors. Explain the deciding clue and why alternatives fail. Do not pad the bank with unrelated definitions or absurd answers. A changed name, number, or wording alone does not make an old question new. Re-testing a concept is appropriate when the reasoning task or evidence is genuinely different.
6. Keep claims within the source scope. Identify source conventions explicitly where relevant. Verify any uncertain correction against an authoritative primary source. Do not silently repeat known source errors.

## Validate, review, publish

- Run `node tools/validate.mjs` and `node --test tools/*.test.mjs`. They check 50-item atomic registration, IDs/stems/page references, all 24 chapters, source integrity, progress preservation across releases and failed downloads, archives/resume, and fresh sampling.
- Run `node tools/audit-bank.mjs YYYY-MM-DD`. Inspect the closest pairs against all prior material; this is a screening aid, not proof of semantic uniqueness. Review every answer and source page. A read-only independent review is allowed by the project instructions.
- Check the local Question Bank and a sample answer/source link. Confirm the selected release has 50 questions, older releases are accessible, and there are no runtime errors.
- Review the diff: routine refreshes should change only the new batch and manifest (plus an appropriate factual handoff). Commit and push the intended changes to existing `main` without force. Reconcile a newer remote head rather than overwriting it. The user's recurring-refresh instruction authorizes these publications.
- Wait for Pages deployment success, then fetch the public manifest and batch and compare their bytes with the committed files. Confirm the public bank opens the new release.
- Synchronize only the published bank files into the canonical local app if they have not diverged; otherwise leave local work intact and report it. Record release date, commit, counts, checks and next due date in the local handoff. A repeat attempt must recognize an already-published release and only finish missing verification.
- Report the release and link when published, or a concrete blocker if publication failed. Never describe an unverified or unpublished batch as live.
