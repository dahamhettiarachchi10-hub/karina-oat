import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
export const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export function loadContent() {
 const ctx=vm.createContext({window:{},console});
 const run=name=>vm.runInContext(fs.readFileSync(path.join(root,name),'utf8'),ctx,{filename:name,timeout:1000});
 run('app/loader.js');ctx.registerSection=ctx.window.registerSection;ctx.registerQuestionBatch=ctx.window.registerQuestionBatch;
 run('sections/manifest.js');run('bank/manifest.js');
 for(const [directory,manifest] of [['sections',ctx.window.SECTION_MANIFEST],['bank',ctx.window.QUESTION_BANK_MANIFEST]]) {
  if(!Array.isArray(manifest)||new Set(manifest).size!==manifest.length)throw Error('Invalid '+directory+' manifest');
  for(const f of manifest){if(!/^[a-zA-Z0-9_-]+\.js$/.test(f))throw Error('Invalid filename');run(directory+'/'+f);}
 }
 return ctx.window.OATContent;
}
