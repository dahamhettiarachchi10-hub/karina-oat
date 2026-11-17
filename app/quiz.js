(function () {
  'use strict';
  const EXAM_SECONDS_PER_QUESTION = 50;
  const P = () => window.OATProgress;
  const MODES = { quick: 'Quick 5', topic: 'Topic drill', full: 'Full set', boss: 'Boss Round', exam: 'Exam mode', mixed: 'Mixed review', review: 'Mistakes Deck', retry: 'Retry missed', bank: 'Fresh 10', 'bank-full': 'Batch of 50', diagnostic: 'Science diagnostic', repair: 'Mistake practice', 'science-timed': 'Timed Natural Sciences', 'physics-timed': 'Timed Physics' };
  const natural = ['Biology', 'General Chemistry', 'Organic Chemistry'];
  const planModes = ['diagnostic', 'repair', 'science-timed', 'physics-timed'];
  const blueprint = { diagnostic: [6, 6, 6, 6], 'science-timed': [40, 30, 30], 'physics-timed': [0, 0, 0, 40] };
  const timedMinutes = { 'science-timed': 90, 'physics-timed': 50 };
  const isTimed = mode => mode === 'exam' || Object.prototype.hasOwnProperty.call(timedMinutes, mode);
  const shuffle = a => { const out = [...a]; for (let i = out.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [out[i], out[j]] = [out[j], out[i]]; } return out; };
  function all() { return window.OATContent.sections.flatMap(s => s.questions.map(q => ({ q, s }))); }
  let questionIndex = new Map(), indexedRevision = -1;
  function find(id) {
    if (indexedRevision !== window.OATContent.revision) {
      questionIndex = new Map(all().map(x => [x.q.id, x]));
      indexedRevision = window.OATContent.revision;
    }
    return questionIndex.get(id);
  }
  function weighted(items, count, mixed = false) {
    if (!count) return [];
    return items.map(q => {
      const m = P().mastery(q.id), missed = !!P().state.deck[q.id];
      const s = find(q.id).s;
      const topicWeakness = 1 - P().percent(s.questions.filter(x => x.topic === q.topic)) / 100;
      const weight = (m === 0 ? 4 : missed ? 5 : m === 1 ? 3 : 1) * (mixed ? 1 + topicWeakness * 4 : 1);
      return { q, rank: -Math.log(Math.max(Number.EPSILON, Math.random())) / weight };
    }).sort((a, b) => a.rank - b.rank).slice(0, count).map(x => x.q);
  }
  function fresh(items, count) {
    const first = weighted(items.filter(q => !P().mastery(q.id)), count, true);
    return [...first, ...weighted(items.filter(q => P().mastery(q.id)), count - first.length, true)];
  }
  function prepSet(mode) {
    const allItems = all();
    if (mode === 'repair') {
      const weak = new Set(), skills = new Set();
      const seeds = Object.keys(P().state.deck).sort((a,b) => P().state.deck[b].due.localeCompare(P().state.deck[a].due)).slice(0, 18);
      for (const id of seeds) {
        const entry = find(id);
        if (!entry) continue;
        weak.add(`${entry.s.id}/${entry.q.topic}`);
        if (entry.q.skill) skills.add(entry.q.skill);
      }
      const related = allItems.filter(({s,q}) => !P().mastery(q.id) && (weak.has(`${s.id}/${q.topic}`) || skills.has(q.skill))).map(x=>x.q);
      if (related.length) return weighted(related, 8, true);
      return seeds.length ? fresh(seeds.map(id => find(id)?.q).filter(Boolean), 8) : prepSet('diagnostic').slice(0, 8);
    }
    return [...natural, 'Physics'].flatMap((subject, i) => {
      const count = blueprint[mode][i] || 0;
      const pool = allItems.filter(x => x.s.subject === subject).map(x => x.q);
      if (pool.length < count) throw new Error(`Not enough ${subject} questions for this round.`);
      return fresh(pool, count);
    });
  }
  function start(mode, sectionId = null, topicId = null, ids = null, batchId = null) {
    const s = window.OATContent.sections.find(s => s.id === sectionId);
    if (!Object.prototype.hasOwnProperty.call(MODES, mode)) throw new Error('Unknown quiz mode');
    let pool = s ? s.questions : all().map(x => x.q);
    let batch = null;
    if (mode === 'bank' || mode === 'bank-full') {
      batch = batchId ? window.OATContent.batches.find(b => b.id === batchId) : window.OATContent.latestBatch();
      if (!batch) throw new Error('This question batch could not be found.');
      if (sectionId !== null) throw new Error('Bank rounds use all chapters in the selected batch.');
      pool = batch.questions;
    }
    if (planModes.includes(mode)) {
      if (sectionId !== null) throw new Error('Open this round from the 14-day plan.');
      pool = prepSet(mode);
    }
    if (mode === 'topic') pool = pool.filter(q => q.topic === topicId);
    if (mode === 'boss') {
      if (!s || P().attempted(s) < 0.6) throw new Error('Attempt at least 60% of this section to unlock its Boss Round.');
      pool = pool.filter(q => q.mustGet);
    }
    if (mode === 'review') pool = pool.filter(q => (ids || P().due()).includes(q.id));
    if (mode === 'retry') pool = pool.filter(q => (ids || []).includes(q.id));
    if (mode === 'mixed' && window.OATContent.sections.length < 2) throw new Error('Mixed review unlocks when a second section is added.');
    if (mode === 'bank') {
      const unseen = pool.filter(q => P().mastery(q.id) === 0), seen = pool.filter(q => P().mastery(q.id) > 0);
      const fresh = weighted(unseen, 10, true);
      pool = [...fresh, ...weighted(seen, 10 - fresh.length, true)];
    }
    pool = mode === 'quick' ? weighted(pool, 5) : mode === 'mixed' ? weighted(pool, 10, true) : shuffle(pool);
    if (!pool.length) throw new Error('No questions available for this round.');
    const session = { mode, sectionId, batchId: batch?.id || null, ids: pool.map(q => q.id), options: Object.fromEntries(pool.map(q => [q.id, shuffle(q.options)])), answers: [], index: 0, combo: 0, maxCombo: 0, totalXP: 0, completed: false, deadline: isTimed(mode) ? Date.now() + (timedMinutes[mode] ? timedMinutes[mode] * 60 : pool.length * EXAM_SECONDS_PER_QUESTION) * 1000 : null, route: batch ? `#/bank?batch=${encodeURIComponent(batch.id)}&quiz=${mode}` : sectionId ? `#/s/${encodeURIComponent(sectionId)}/quiz/${mode}` : `#/review?quiz=${mode}`, events: { badges: [], levelUp: false } };
    P().state.activeQuiz = session; P().save(); return session;
  }
  function answer(choice) {
    const a = P().state.activeQuiz;
    if (!a || a.completed || a.answers.length > a.index) return null;
    const q = find(a.ids[a.index]).q;
    if (choice !== null && !q.options.includes(choice)) return null;
    const correct = choice === q.options[q.answer];
    a.combo = correct ? a.combo + 1 : 0; a.maxCombo = Math.max(a.maxCombo, a.combo);
    const event = P().answer(q, correct, a.combo, a.mode === 'review');
    a.totalXP += event.xp;
    a.events.badges.push(...event.badges); a.events.levelUp ||= event.levelUp;
    const result = { id: q.id, choice, correct, xp: event.xp };
    a.answers.push(result); P().save(); return result;
  }
  function finish() {
    const a = P().state.activeQuiz;
    if (!a || a.completed) return;
    a.completed = true;
    a.events.badges.push(...P().complete(a)); P().save();
  }
  function next() {
    const a = P().state.activeQuiz;
    if (!a || a.completed || a.answers.length <= a.index) return;
    if (a.index + 1 >= a.ids.length) finish();
    else a.index++;
    P().save();
  }
  function expire() {
    const a = P().state.activeQuiz;
    if (!a || !isTimed(a.mode) || a.completed) return;
    while (a.answers.length < a.ids.length) { a.index = a.answers.length; answer(null); }
    a.index = a.ids.length - 1; finish();
  }
  window.OATQuiz = { EXAM_SECONDS_PER_QUESTION, MODES, planModes, isTimed, shuffle, find, start, answer, next, finish, expire };
})();
