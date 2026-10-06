# Add a section

1. Copy `sections/_TEMPLATE.js` to `sections/<subject>-<nn>-<slug>.js`.
2. Fill in topics, study notes, and questions using only your source material.
3. Add its filename to `sections/manifest.js`, in display order.
4. Run `node tools/validate.mjs` from the site folder. Fix any reported failures.
5. Commit and push. GitHub Pages publishes the update. Do not edit `/app`.

Each file calls `registerSection({...})` exactly once. Required section fields: `id`, `subject`, `title`, `subtitle`, `addedOn` (`YYYY-MM-DD`), `source`, `topics`, and `questions`. Subjects are any non-empty strings; Home groups them automatically.

Each topic has a unique `id`, a `title`, and an ordered `notes` array. Note types:

| Type | Fields |
| --- | --- |
| `text` | `body` |
| `key`, `trap` | `title`, `body` |
| `compare` | `headers` array, `rows` array (same number of cells per row) |
| `steps` | `items` array |
| `mnemonic` | `body` (optional `title`) |

Bodies, table cells, questions, options, and explanations support **bold** (`**text**`), italic (`*text*`), inline code (backticks), line breaks, subscripts (`H~2~O`), and superscripts (`Na^+^`). Unicode is preserved. Content is escaped; raw HTML is not rendered. Unknown note types display their body as text with a console warning.

Each question requires a globally unique `id`, `topic` matching a topic ID in that section, `difficulty` (`recall`, `application`, or `analysis`), `stem`, 2–5 unique `options`, zero-based `answer`, and non-empty `explanation`. Set optional `mustGet: true` for Boss questions. Options shuffle automatically. Prefer four options. A section with fewer than five questions uses its available questions for Quick 5; one with no `mustGet` questions has no playable Boss Round.

**Keep published IDs stable.** Changing or removing question IDs orphans saved progress for those questions. Unknown IDs are silently ignored on load/import. Changing a section or topic ID also disconnects its saved completion state. Correct the text in place when its identity is unchanged. No HTML, layout, or app logic belongs in content files.

## Reusable prompt

> Here is new material for Karina’s OAT site. Create a new section file following `sections/_TEMPLATE.js` and the schema in `AUTHORING.md`. Use only facts from the material provided; write 4-option MCQs with explanations, tag difficulty, and mark the 4–6 most reasoning-heavy questions `mustGet`. Use unique, stable IDs and today’s date for `addedOn`. Add the filename to `sections/manifest.js` and run `node tools/validate.mjs`. Do not touch anything in `/app`. Material: [paste material here]

Optional source fields: `sourceUrl` (HTTPS), `sourcePages` ([start, end] PDF pages), topic `sourcePages` (page string), and `progressRevision` (content version string). The bundled-source links point to `source/bio-notes.pdf`; update that mapping if using another source. Change `progressRevision` when expanding or changing a chapter assessment to reset outdated chapter completion without erasing question mastery or XP.
