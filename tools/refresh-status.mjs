import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const context=vm.createContext({window:{}});
vm.runInContext(fs.readFileSync(path.join(root,'bank/manifest.js'),'utf8'),context);
const batches=[];context.registerQuestionBatch=b=>batches.push(b);
for(const name of context.window.QUESTION_BANK_MANIFEST) {
 if(!/^[a-zA-Z0-9_-]+\.js$/.test(name))throw Error('Unsafe manifest filename');
 vm.runInContext(fs.readFileSync(path.join(root,'bank',name),'utf8'),context);
}
const latest=batches.map(b=>b.publishedOn).sort().at(-1);
const today=process.argv[2] || new Intl.DateTimeFormat('en-CA',{timeZone:'America/Toronto',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
if(!/^\d{4}-\d{2}-\d{2}$/.test(today) || Number.isNaN(Date.parse(today)) || new Date(today).toISOString().slice(0,10)!==today)throw Error('Invalid date');
const next=latest ? new Date(Date.parse(latest+'T12:00:00Z')+2*86400000).toISOString().slice(0,10):today;
console.log(JSON.stringify({today,latestRelease:latest,nextDue:next,due:today>=next,releaseSize:50,cadenceDays:2,batches:batches.length},null,2));
