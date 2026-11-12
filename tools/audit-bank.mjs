import {loadContent} from './content.mjs';
const C=loadContent(),target=process.argv[2]||C.latestBatch().id;
const batch=C.batches.find(b=>b.id===target);if(!batch)throw Error('Unknown batch');
const all=C.sections.flatMap(s=>s.questions),words=s=>new Set(s.toLowerCase().replace(/[^a-z0-9 ]/g,' ').split(/\s+/).filter(w=>w.length>2));
const scored=[];
for(const q of batch.questions){
 const a=words(q.stem);let best=null;
 for(const other of all){if(q.id===other.id)continue;const b=words(other.stem),overlap=[...a].filter(w=>b.has(w)).length;const score=2*overlap/(a.size+b.size);if(!best||score>best.score)best={id:q.id,other:other.id,score:+score.toFixed(3),stem:q.stem,otherStem:other.stem};}
 scored.push(best);
}
console.log(JSON.stringify({batch:target,count:batch.questions.length,difficulty:batch.questions.reduce((a,q)=>(a[q.difficulty]=(a[q.difficulty]||0)+1,a),{}),closestPairs:scored.sort((a,b)=>b.score-a.score).slice(0,8)},null,2));
