import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const context = vm.createContext({ window: {}, console });
let failed = false;
try {
  vm.runInContext(fs.readFileSync(path.join(root, 'app/loader.js'), 'utf8'), context);
  context.registerSection = context.window.registerSection;
  vm.runInContext(fs.readFileSync(path.join(root, 'sections/manifest.js'), 'utf8'), context);
  const manifest = context.window.SECTION_MANIFEST;
  if (!Array.isArray(manifest)) throw new Error('Manifest must be an array');
  if (new Set(manifest).size !== manifest.length) throw new Error('Duplicate manifest entries');
  for (const name of manifest) {
    try {
      if (typeof name !== 'string' || !/^[a-zA-Z0-9_-]+\.js$/.test(name)) throw new Error('Invalid section filename');
      const before = context.window.OATContent.sections.length;
      vm.runInContext(fs.readFileSync(path.join(root, 'sections', name), 'utf8'), context, { timeout: 1000, filename: name });
      if (context.window.OATContent.sections.length !== before + 1) throw new Error('File must register exactly one section');
      const s = context.window.OATContent.sections.at(-1);
      console.log(`PASS ${name} — ${s.topics.length} topics, ${s.questions.length} questions, ${s.questions.filter(q => q.mustGet).length} boss questions`);
    } catch (error) { failed = true; console.error(`FAIL ${name} — ${error.message}`); }
  }
  context.registerQuestionBatch = context.window.registerQuestionBatch;
  vm.runInContext(fs.readFileSync(path.join(root, 'bank/manifest.js'), 'utf8'), context);
  const bank = context.window.QUESTION_BANK_MANIFEST;
  if (!Array.isArray(bank) || !bank.length || new Set(bank).size !== bank.length) throw new Error('Invalid question bank manifest');
  for (const name of bank) {
    if (!/^[a-zA-Z0-9_-]+\.js$/.test(name)) throw new Error('Invalid question batch filename');
    const before = context.window.OATContent.batches.length;
    vm.runInContext(fs.readFileSync(path.join(root, 'bank', name), 'utf8'), context, {timeout:1000,filename:name});
    if (context.window.OATContent.batches.length !== before + 1) throw new Error('File must register exactly one batch');
    const b=context.window.OATContent.batches.at(-1);
    if (new Set(b.questions.map(q=>q.section)).size!==24) throw new Error('Each batch must cover all 24 chapters');
    console.log(`PASS ${name} — ${b.questions.length} new questions across all 24 chapters`);
  }
  vm.runInContext(fs.readFileSync(path.join(root,'source/pages.js'),'utf8'),context);
  const book=context.window.OATSourceBook;
  if (book.pageCount!==136 || book.pages.length!==136) throw new Error('The source reader must cover all 136 pages');
  if (book.pdfSha256!==createHash('sha256').update(fs.readFileSync(path.join(root,'source/bio-notes.pdf'))).digest('hex')) throw new Error('Source PDF hash does not match reader');
  for (const [i,p] of book.pages.entries()) {
    if (p.number!==i+1 || !p.text.trim() || p.width<1000 || p.height<1000 || p.image!==`source/pages/page-${String(i+1).padStart(3,'0')}.webp`) throw new Error('Invalid source page: '+(i+1));
    const bytes=fs.readFileSync(path.join(root,p.image));
    if (bytes.subarray(0,4).toString()!=='RIFF' || bytes.subarray(8,12).toString()!=='WEBP') throw new Error('Invalid source image: '+p.image);
  }
  const chapterPages=context.window.OATContent.sections.flatMap(s=>Array.from({length:s.sourcePages[1]-s.sourcePages[0]+1},(_,i)=>s.sourcePages[0]+i));
  if (chapterPages.length!==133 || new Set(chapterPages).size!==133 || chapterPages.some((n,i)=>n!==i+4)) throw new Error('Chapter source ranges must cover pages 4–136 without gaps');
  console.log('PASS complete source reader — 136 page images and text; source hash and chapter ranges verified');
  if (!manifest.length) { failed = true; console.error('FAIL manifest.js — no sections'); }
} catch (error) { failed = true; console.error(`FAIL manifest.js — ${error.message}`); }
console.log(failed ? '\nValidation failed.' : '\nAll sections passed.');
process.exitCode = failed ? 1 : 0;
