import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
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
  if (!manifest.length) { failed = true; console.error('FAIL manifest.js — no sections'); }
} catch (error) { failed = true; console.error(`FAIL manifest.js — ${error.message}`); }
console.log(failed ? '\nValidation failed.' : '\nAll sections passed.');
process.exitCode = failed ? 1 : 0;
