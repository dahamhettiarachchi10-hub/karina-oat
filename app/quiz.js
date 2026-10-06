(function () {
  'use strict';
  const EXAM_SECONDS_PER_QUESTION = 50;
  const P = () => window.OATProgress;
  const MODES = { quick: 'Quick 5', topic: 'Topic drill', full: 'Full set', boss: 'Boss Round', exam: 'Exam mode', mixed: 'Mixed review', review: 'Mistakes Deck', retry: 'Retry missed' };
  const shuffle = a => { const out = [...a]; for (let i = out.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [out[i], out[j]] = [out[j], out[i]]; } return out; };
  function all() { return window.OATContent.sections.flatMap(s => s.questions.map(q => ({ q, s }))); }
  let questionIndex = new Map(), indexedSections = -1;
  function find(id) {
    if (indexedSections !== window.OATContent.sections.length) {
      questionIndex = new Map(all().map(x => [x.q.id, x]));
      indexedSections = window.OATContent.sections.length;
    }
    return questionIndex.get(id);
  }
  function weighted(items, count, mixed = false) {
    return items.map(q => {
      const m = P().mastery(q.id), missed = !!P().state.deck[q.id];
      const s = find(q.id).s;
      const topicWeakness = 1 - P().percent(s.questions.filter(x => x.topic === q.topic)) / 100;
      const weight = (m === 0 ? 4 : missed ? 5 : m === 1 ? 3 : 1) * (mixed ? 1 + topicWeakness * 4 : 1);
      return { q, rank: -Math.log(Math.max(Number.EPSILON, Math.random())) / weight };
    }).sort((a, b) => a.rank - b.rank).slice(0, count).map(x => x.q);
  }
  function start(mode, sectionId = null, topicId = null, ids = null) {
    const s = window.OATContent.sections.find(s => s.id === sectionId);
    if (!MODES[mode]) throw new Error('Unknown quiz mode');
    let pool = s ? s.questions : all().map(x => x.q);
    if (mode === 'topic') pool = pool.filter(q => q.topic === topicId);
    if (mode === 'boss') {
      if (!s || P().attempted(s) < 0.6) throw new Error('Attempt at least 60% of this section to unlock its Boss Round.');
      pool = pool.filter(q => q.mustGet);
    }
    if (mode === 'review') pool = pool.filter(q => (ids || P().due()).includes(q.id));
    if (mode === 'retry') pool = pool.filter(q => (ids || []).includes(q.id));
    if (mode === 'mixed' && window.OATContent.sections.length < 2) throw new Error('Mixed review unlocks when a second section is added.');
    pool = mode === 'quick' ? weighted(pool, 5) : mode === 'mixed' ? weighted(pool, 10, true) : shuffle(pool);
    if (!pool.length) throw new Error('No questions available for this round.');
    const session = { mode, sectionId, ids: pool.map(q => q.id), options: Object.fromEntries(pool.map(q => [q.id, shuffle(q.options)])), answers: [], index: 0, combo: 0, maxCombo: 0, totalXP: 0, completed: false, deadline: mode === 'exam' ? Date.now() + pool.length * EXAM_SECONDS_PER_QUESTION * 1000 : null, route: sectionId ? `#/s/${encodeURIComponent(sectionId)}/quiz/${mode}` : `#/review?quiz=${mode}`, events: { badges: [], levelUp: false } };
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
    if (!a || a.mode !== 'exam' || a.completed) return;
    while (a.answers.length < a.ids.length) { a.index = a.answers.length; answer(null); }
    a.index = a.ids.length - 1; finish();
  }
  window.OATQuiz = { EXAM_SECONDS_PER_QUESTION, MODES, shuffle, find, start, answer, next, finish, expire };
})();
