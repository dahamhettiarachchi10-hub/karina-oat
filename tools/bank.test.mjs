import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
function app(options={}) {
 let saved=options.saved || null;
 const ctx=vm.createContext({window:{},console,localStorage:{getItem:()=>saved,setItem:(_,v)=>{saved=v;}}});
 const run=f=>vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx,{filename:f});
 run('app/loader.js');ctx.registerSection=ctx.window.registerSection;run('sections/manifest.js');
 for(const file of ctx.window.SECTION_MANIFEST)run('sections/'+file);
 ctx.registerQuestionBatch=ctx.window.registerQuestionBatch;
 if(!options.omitBank && fs.existsSync(path.join(root,'bank/manifest.js'))){run('bank/manifest.js');for(const f of ctx.window.QUESTION_BANK_MANIFEST)run('bank/'+f);}
 run('app/progress.js');run('app/quiz.js');
 const C=ctx.window.OATContent,P=ctx.window.OATProgress,Q=ctx.window.OATQuiz;
 if(options.omitBank)C.errors.push('batch download failed');
 const initialized=P.init(C.sections);return {C,P,Q,window:ctx.window,initialized,get saved(){return saved;},register:ctx.window.registerQuestionBatch,run};
}
test('the first release adds exactly 50 original questions across all 24 chapters',()=>{
 const {C}=app();assert(C.batches?.length>=1);assert.equal(C.batches[0].questions.length,50);
 assert.equal(new Set(C.batches[0].questions.map(q=>q.section)).size,24);
 assert.equal(C.sections.filter(s=>s.subject==='Biology').flatMap(s=>s.questions).length,854+50*C.batches.length);
 assert.equal(C.sections.filter(s=>s.subject==='Biology').reduce((n,s)=>n+s.coreQuestionIds.length,0),854);
});
test('an invalid or duplicate batch is rejected atomically',()=>{
 const {C,register}=app();assert.equal(typeof register,'function');
 const before=C.sections.flatMap(s=>s.questions).length, batchCount=C.batches.length;
 const b=JSON.parse(JSON.stringify(C.batches[0]));b.id='2099-01-01';b.publishedOn=b.id;b.questions=b.questions.map((q,i)=>({...q,id:'invalid-'+i,stem:q.stem+' changed'}));
 b.questions.at(-1).topic='missing-topic';assert.throws(()=>register(b),/topic/);
 assert.equal(C.sections.flatMap(s=>s.questions).length,before);assert.equal(C.batches.length,batchCount);
 assert.throws(()=>register(C.batches[0]),/Duplicate/);
 const short={...b,questions:b.questions.slice(0,49)};assert.throws(()=>register(short),/50/);
 const noPages=JSON.parse(JSON.stringify(b));noPages.questions.at(-1).topic=C.batches[0].questions.at(-1).topic;noPages.questions[0].sourcePages=[136];assert.throws(()=>register(noPages),/sourcePages/);
});
test('fresh rounds prefer unseen questions and never duplicate an ID within a round',()=>{
 const {C,P,Q}=app();const batch=C.batches?.[0];assert(batch);
 const seen=batch.questions.slice(0,42);seen.forEach(q=>P.answer(q,true,1));
 const a=Q.start('bank',null,null,null,batch.id);assert.equal(a.ids.length,10);assert.equal(new Set(a.ids).size,10);
 for(const q of batch.questions.slice(42))assert(a.ids.includes(q.id));
 const full=Q.start('bank-full',null,null,null,batch.id);assert.equal(full.ids.length,50);
 assert.throws(()=>Q.start('bank',null,null,null,'missing'),/batch/i);
});
test('new releases preserve XP, old question mastery, Boss eligibility and paused rounds',()=>{
 const {C,P,Q,register}=app();assert(C.batches?.length);
 const s=C.sections[0];for(const id of s.coreQuestionIds.slice(0,Math.ceil(s.coreQuestionIds.length*.6)))P.answer(Q.find(id).q,true,1);
 P.state.bosses[s.id]=true;P.save();const eligible=P.attempted(s),xp=P.state.xp;
 const a=Q.start('bank',null,null,null,C.batches[0].id);const ids=[...a.ids];Q.answer(Q.find(ids[0]).q.options[Q.find(ids[0]).q.answer]);
 const currentXp=P.state.xp;const exported=P.export();
 const next=JSON.parse(JSON.stringify(C.batches[0]));next.id='2099-01-03';next.publishedOn=next.id;next.questions=next.questions.map((q,i)=>({...q,id:'future-'+i,stem:'Later problem '+i+': '+q.stem}));register(next);
 P.init(C.sections);assert.equal(P.state.xp,currentXp);assert.equal(P.attempted(s),eligible);assert(P.state.bosses[s.id]);assert.equal(P.state.activeQuiz.batchId,C.batches[0].id);assert.deepEqual([...P.state.activeQuiz.ids],ids);assert(Q.find('future-0'));
 P.import(exported);assert.equal(P.state.xp,currentXp);assert(P.state.bosses[s.id]);assert.equal(Q.start('boss',s.id).ids.length,6);assert(currentXp>=xp);
});

test('a malformed bank session cannot discard otherwise valid progress',()=>{
 const {C,P,Q}=app();Q.start('bank',null,null,null,C.batches[0].id);P.state.xp=123;const data=JSON.parse(P.export());data.activeQuiz.ids={broken:true};
 assert.doesNotThrow(()=>P.import(JSON.stringify(data)));assert.equal(P.state.xp,123);assert.equal(P.state.activeQuiz,null);
});

test('a failed batch load cannot erase history, mistakes or a paused round across three boots',()=>{
 const first=app();const a=first.Q.start('bank');const q=first.Q.find(a.ids[0]).q;first.Q.answer(q.options[(q.answer+1)%q.options.length]);const before=first.P.export();
 const failed=app({saved:before,omitBank:true});assert.equal(failed.initialized,false);failed.P.save();assert.equal(failed.saved,before);
 const recovered=app({saved:failed.saved});assert.equal(recovered.P.state.questions[q.id].attempts,1);assert(recovered.P.state.deck[q.id]);assert.equal(recovered.P.state.activeQuiz.ids[0],q.id);
});

test('diagnostic and timed sets match exact subject counts and use unique IDs',()=>{
 const {C,P,Q}=app();
 const count=a=>Object.fromEntries(['Biology','General Chemistry','Organic Chemistry','Physics'].map(subject=>[subject,a.ids.filter(id=>Q.find(id).s.subject===subject).length]));
 const d=Q.start('diagnostic');assert.deepEqual(count(d),{Biology:6,'General Chemistry':6,'Organic Chemistry':6,Physics:6});
 const start=Date.now();const science=Q.start('science-timed');assert.deepEqual(count(science),{Biology:40,'General Chemistry':30,'Organic Chemistry':30,Physics:0});
 assert.equal(new Set(science.ids).size,100);assert(science.deadline>=start+90*60_000 && science.deadline<=Date.now()+90*60_000);
 P.init(C.sections);assert.equal(P.state.activeQuiz?.mode,'science-timed');
 const physics=Q.start('physics-timed');assert.equal(count(physics).Physics,40);assert.equal(new Set(physics.ids).size,40);
 assert(physics.deadline-Date.now()<=50*60_000 && physics.deadline-Date.now()>49*60_000);
 Q.expire();assert(physics.completed);assert.equal(physics.answers.length,40);
});

test('guesses persist in the deck and repair prioritizes unseen related skills',()=>{
 const {C,P,Q}=app();const q=Q.find('gc-solutions-gases-2').q;
 P.answer(q,true,1);assert(P.flag(q.id));assert(!P.flag(q.id));
 const r=Q.start('repair');assert(r.ids.length>0);assert(!r.ids.includes(q.id));
 assert(r.ids.every(id=>Q.find(id).q.skill===q.skill || Q.find(id).q.topic===q.topic));
 P.init(C.sections);assert(P.state.deck[q.id]);assert.equal(P.state.questions[q.id].firstCorrect,true);assert.equal(P.state.activeQuiz.mode,'repair');
 P.answer(q,false,0);assert.equal(P.state.questions[q.id].firstCorrect,true);
});

test('all study days render with valid module links and first unchecked day is selected',()=>{
 const {C,P,run,window}=app();run('app/prep-plan.js');const dayModule=window.OATPrepPlan;
 const read=dayModule.days;
 assert.equal(read.length,14);
 for(const [,, ,links] of read) for(const id of links) assert(id==='biology'||C.sections.some(s=>s.id===id),id);
 assert.match(dayModule.plan(new URLSearchParams()),/Start 24-question diagnostic/);
 P.markDay(1);assert.equal(dayModule.nextDay(),2);P.init(C.sections);assert.equal(dayModule.nextDay(),2);
 assert.match(dayModule.plan(new URLSearchParams('day=12')),/Start timed Physics/);
});
