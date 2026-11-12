import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
import {root} from './content.mjs';
function extras(){const c={window:{OATContent:{}}};for(const f of ['source/pages.js','app/study-extras.js'])vm.runInNewContext(fs.readFileSync(root+'/'+f,'utf8'),c);return c.window.OATStudyExtras;}
test('chapter reader bounds pages and escapes the transcript',()=>{
 const E=extras(),s={id:'bio-13',sourcePages:[124,128]};
 assert.match(E.reader(s,125),/page-125.webp/);assert.match(E.reader(s,999),/page-124.webp/);
 assert.match(E.reader(s,'<script>'),/page-124.webp/);
 assert.doesNotMatch(E.reader(s,128),/Next page/);assert.doesNotMatch(E.reader(s,124),/Previous page/);
});
test('the full sourcebook includes cover, final page, and original PDF access',()=>{
 const E=extras();assert.match(E.sourceBook(new URLSearchParams()),/page-001.webp/);
 assert.match(E.sourceBook(new URLSearchParams('page=136')),/page-136.webp/);
 assert.match(E.sourceBook(new URLSearchParams()),/source\/bio-notes.pdf/);
});
test('refresh guard waits two calendar days and prevents same-day reruns',()=>{
 const run=d=>JSON.parse(execFileSync(process.execPath,[root+'/tools/refresh-status.mjs',d],{encoding:'utf8'}));
 const latest=run('2026-11-11').latestRelease;
 const plus=n=>new Date(Date.parse(latest+'T12:00:00Z')+n*86400000).toISOString().slice(0,10);
 assert.equal(run(latest).due,false);assert.equal(run(plus(1)).due,false);assert.equal(run(plus(2)).due,true);
});
