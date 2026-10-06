(function () {
  'use strict';
  const STORAGE_KEY = 'karinaOAT.v1';
  const LEVEL_NAMES = ['Blurry Start', 'Lens Grinder', 'Sharp Focus', '20/20', 'Eagle Eye', 'Visionary', 'Optics Master'];
  const XP = { recall: 10, application: 15, analysis: 20 };
  const DAY = 86400000;
  const dateKey = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const dayNumber = s => { const a = String(s).split('-').map(Number); return Date.UTC(a[0], a[1] - 1, a[2]) / DAY; };
  const afterDays = (count, d = new Date()) => { const next = new Date(d); next.setDate(next.getDate() + count); return dateKey(next); };
  function weekKey(d = new Date()) {
    const x = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    x.setUTCDate(x.getUTCDate() + 4 - (x.getUTCDay() || 7));
    return `${x.getUTCFullYear()}-W${Math.ceil(((x - new Date(Date.UTC(x.getUTCFullYear(), 0, 1))) / DAY + 1) / 7)}`;
  }
  const fresh = () => ({ version: 1, xp: 0, questions: {}, reviewed: {}, deck: {}, bosses: {}, best: {}, sectionRevisions: {}, badges: [], stats: { quizzes: 0, maxCombo: 0, cleared: 0, perfect5: false, examReady: false, night: false, early: false }, streak: { count: 0, lastDay: null, frozenWeek: null }, settings: { sound: false, reducedMotion: false, theme: 'system' }, lastSession: null, activeQuiz: null });
  let state = fresh(), sections = [], questionMap = new Map(), storageOK = true;
  const finite = (v, fallback = 0) => Number.isFinite(v) && v >= 0 ? v : fallback;
  const object = v => v && typeof v === 'object' && !Array.isArray(v);
  const validDate = v => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v) && dateKey(new Date(v + 'T12:00:00')) === v;
  function normalize(raw) {
    if (!object(raw) || raw.version !== 1) throw new Error('This is not a version 1 OAT progress export.');
    const clean = fresh();
    clean.xp = finite(raw.xp);
    for (const [id, q] of questionMap) {
      const r = raw.questions && raw.questions[id];
      if (!object(r)) continue;
      clean.questions[id] = { attempts: Math.floor(finite(r.attempts)), correctDates: Array.isArray(r.correctDates) ? [...new Set(r.correctDates.filter(validDate))].slice(-2) : [], seen: !!r.seen };
      const card = raw.deck && raw.deck[id];
      if (object(card) && validDate(card.due)) clean.deck[id] = { due: card.due, step: Math.min(2, Math.floor(finite(card.step))), run: Math.min(1, Math.floor(finite(card.run))) };
    }
    for (const s of sections) {
      for (const t of s.topics) { const key = `${s.id}/${t.id}`; if (raw.reviewed && raw.reviewed[key] === true) clean.reviewed[key] = true; }
      const sameRevision = !s.progressRevision || raw.sectionRevisions?.[s.id] === s.progressRevision;
      if (sameRevision && raw.bosses && raw.bosses[s.id] === true) clean.bosses[s.id] = true;
      if (sameRevision && raw.best && Number.isFinite(raw.best[s.id])) clean.best[s.id] = Math.min(100, finite(raw.best[s.id]));
    }
    clean.badges = Array.isArray(raw.badges) ? [...new Set(raw.badges.filter(x => BADGES.some(b => b.id === x)))] : [];
    if (object(raw.stats)) for (const key of Object.keys(clean.stats)) clean.stats[key] = typeof clean.stats[key] === 'boolean' ? !!raw.stats[key] : Math.floor(finite(raw.stats[key]));
    if (object(raw.streak)) clean.streak = { count: Math.floor(finite(raw.streak.count)), lastDay: validDate(raw.streak.lastDay) ? raw.streak.lastDay : null, frozenWeek: typeof raw.streak.frozenWeek === 'string' ? raw.streak.frozenWeek : null };
    if (object(raw.settings)) clean.settings = { sound: raw.settings.sound === true, reducedMotion: raw.settings.reducedMotion === true, theme: ['system', 'light', 'dark'].includes(raw.settings.theme) ? raw.settings.theme : 'system' };
    clean.lastSession = typeof raw.lastSession === 'string' && Number.isFinite(Date.parse(raw.lastSession)) ? raw.lastSession : null;
    // Sessions are restored only if every recorded question still exists and matches the content.
    const a = raw.activeQuiz;
    const currentRevision = !a?.sectionId || sections.some(s => s.id === a.sectionId && (!s.progressRevision || raw.sectionRevisions?.[s.id] === s.progressRevision));
    if (currentRevision && object(a) && ['quick', 'topic', 'full', 'boss', 'exam', 'mixed', 'review', 'retry'].includes(a.mode) && Array.isArray(a.ids) && a.ids.length && new Set(a.ids).size === a.ids.length && a.ids.every(id => questionMap.has(id)) && Array.isArray(a.answers) && a.answers.length <= a.ids.length && a.answers.every((r, i) => object(r) && r.id === a.ids[i] && (r.choice === null || questionMap.get(r.id).q.options.includes(r.choice)) && typeof r.correct === 'boolean' && r.correct === (r.choice === questionMap.get(r.id).q.options[questionMap.get(r.id).q.answer]) && Number.isFinite(r.xp) && r.xp >= 0) && object(a.options) && a.ids.every(id => Array.isArray(a.options[id]) && a.options[id].length === questionMap.get(id).q.options.length && new Set(a.options[id]).size === a.options[id].length && a.options[id].every(v => questionMap.get(id).q.options.includes(v))) && (a.sectionId === null || sections.some(s => s.id === a.sectionId)) && Number.isInteger(a.index) && a.index >= 0 && a.index < a.ids.length && (a.answers.length === a.index || a.answers.length === a.index + 1) && typeof a.completed === 'boolean' && (!a.completed || a.answers.length === a.ids.length) && (a.mode !== 'exam' || Number.isFinite(a.deadline))) {
      clean.activeQuiz = { mode: a.mode, sectionId: a.sectionId, ids: a.ids, options: a.options, answers: a.answers, index: a.index, completed: a.completed, deadline: a.deadline || null, combo: Math.floor(finite(a.combo)), maxCombo: Math.floor(finite(a.maxCombo)), totalXP: finite(a.totalXP), route: a.sectionId ? `#/s/${encodeURIComponent(a.sectionId)}/quiz/${a.mode}` : `#/review?quiz=${a.mode}`, events: { badges: [], levelUp: false } };
    }
    clean.sectionRevisions = Object.fromEntries(sections.filter(s => s.progressRevision).map(s => [s.id, s.progressRevision]));
    return clean;
  }
  function save() { state.sectionRevisions = Object.fromEntries(sections.filter(s => s.progressRevision).map(s => [s.id, s.progressRevision])); try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); storageOK = true; } catch (_) { storageOK = false; } }
  function mastery(qid) { const r = state.questions[qid]; return !r || !r.seen ? 0 : r.correctDates.length >= 2 ? 3 : r.correctDates.length ? 2 : 1; }
  function percent(questions) {
    if (!questions.length) return 0;
    const total = questions.reduce((n, q) => n + mastery(q.id), 0);
    return total === questions.length * 3 ? 100 : Math.min(99, Math.round(total / (questions.length * 3) * 100));
  }
  function level() {
    let n = 0;
    while (state.xp >= 100 * (n + 1) ** 1.5) n++;
    const floor = 100 * n ** 1.5, ceiling = 100 * (n + 1) ** 1.5;
    return { number: n + 1, name: LEVEL_NAMES[Math.min(n, LEVEL_NAMES.length - 1)], floor, ceiling, percent: (state.xp - floor) / (ceiling - floor) * 100 };
  }
  function currentStreak() {
    if (!state.streak.lastDay) return 0;
    const gap = dayNumber(dateKey()) - dayNumber(state.streak.lastDay);
    return gap <= 1 || (gap === 2 && state.streak.frozenWeek !== weekKey()) ? state.streak.count : 0;
  }
  const BADGES = [
    { id: 'first', name: 'First Steps', description: 'Complete your first quiz.', icon: '✦', test: () => state.stats.quizzes > 0 },
    { id: 'perfect', name: 'Perfect 5', description: 'Get all five right in a Quick 5.', icon: '⑤', test: () => state.stats.perfect5 },
    { id: 'fire', name: 'On Fire', description: 'Answer five correctly in a row.', icon: '♨', test: () => state.stats.maxCombo >= 5 },
    { id: 'three', name: 'Three-Day Streak', description: 'Build a three-day study streak.', icon: 'Ⅲ', test: () => state.streak.count >= 3 },
    { id: 'seven', name: 'Seven-Day Streak', description: 'Build a seven-day study streak.', icon: 'Ⅶ', test: () => state.streak.count >= 7 },
    { id: 'boss', name: 'Boss Slayer', description: 'Beat your first Boss Round.', icon: '♛', test: () => Object.values(state.bosses).some(Boolean) },
    { id: 'redemption', name: 'Redemption', description: 'Clear ten cards from your Mistakes Deck.', icon: '↻', test: () => state.stats.cleared >= 10 },
    { id: 'complete', name: 'Completionist', description: 'Bring a section to 100% mastery.', icon: '◎', test: () => sections.some(s => percent(s.questions) === 100) },
    { id: 'night', name: 'Night Owl', description: 'Complete a quiz at or after 10pm.', icon: '☾', test: () => state.stats.night },
    { id: 'early', name: 'Early Bird', description: 'Complete a quiz before 8am.', icon: '☀', test: () => state.stats.early },
    { id: 'exam', name: 'Exam Ready', description: 'Score at least 80% in Exam mode.', icon: '◇', test: () => state.stats.examReady }
  ];
  function unlock() { const earned = BADGES.filter(b => !state.badges.includes(b.id) && b.test()); earned.forEach(b => state.badges.push(b.id)); return earned.map(b => b.id); }
  function answer(q, correct, combo, isReview = false) {
    const before = level().number;
    const r = state.questions[q.id] || { attempts: 0, correctDates: [], seen: false };
    const base = correct ? XP[q.difficulty] * (r.attempts === 0 ? 1 : 0.5) : 0;
    const earned = base * (combo >= 5 ? 2 : combo >= 3 ? 1.5 : 1);
    r.seen = true; r.attempts++;
    if (correct && !r.correctDates.includes(dateKey())) r.correctDates = [...r.correctDates, dateKey()].slice(-2);
    state.questions[q.id] = r; state.xp += earned;
    state.stats.maxCombo = Math.max(state.stats.maxCombo, combo);
    const card = state.deck[q.id];
    if (!correct) {
      if (!card) state.deck[q.id] = { due: afterDays(1), step: 0, run: 0 };
      else { card.run = 0; if (isReview) card.step = Math.min(2, card.step + 1); card.due = afterDays([1, 3, 7][card.step]); }
    } else if (card && isReview) {
      card.run++;
      if (card.run >= 2) { delete state.deck[q.id]; state.stats.cleared++; }
      else { card.step = Math.min(2, card.step + 1); card.due = afterDays([1, 3, 7][card.step]); }
    }
    const badges = unlock();
    return { xp: earned, badges, levelUp: level().number > before };
  }
  function complete(session) {
    const today = dateKey(), gap = state.streak.lastDay ? dayNumber(today) - dayNumber(state.streak.lastDay) : Infinity;
    // A finished set is equivalent to Quick 5 even when its topic contains fewer questions.
    if (gap !== 0) {
      if (gap === 1) state.streak.count++;
      else if (gap === 2 && state.streak.frozenWeek !== weekKey()) { state.streak.count++; state.streak.frozenWeek = weekKey(); }
      else state.streak.count = 1;
      state.streak.lastDay = today;
    }
    const score = Math.round(session.answers.filter(a => a.correct).length / session.ids.length * 100);
    state.stats.quizzes++;
    state.lastSession = new Date().toISOString();
    if (session.sectionId) state.best[session.sectionId] = Math.max(state.best[session.sectionId] || 0, score);
    if (session.mode === 'boss' && score === 100) state.bosses[session.sectionId] = true;
    if (session.mode === 'quick' && session.ids.length === 5 && score === 100) state.stats.perfect5 = true;
    if (session.mode === 'exam' && score >= 80) state.stats.examReady = true;
    const hour = new Date().getHours();
    if (hour >= 22) state.stats.night = true;
    if (hour < 8) state.stats.early = true;
    return unlock();
  }
  window.OATProgress = {
    STORAGE_KEY, LEVEL_NAMES, BADGES, dateKey, dayNumber,
    get state() { return state; }, get storageOK() { return storageOK; },
    init(content) {
      sections = content; questionMap = new Map(sections.flatMap(s => s.questions.map(q => [q.id, { q, s }])));
      try { const raw = localStorage.getItem(STORAGE_KEY); if (raw) state = normalize(JSON.parse(raw)); } catch (_) { storageOK = false; state = fresh(); }
      save();
    },
    save, mastery, percent, level, currentStreak, answer, complete,
    due() { return Object.keys(state.deck).filter(id => questionMap.has(id) && state.deck[id].due <= dateKey()); },
    attempted(s) { return s.questions.filter(q => mastery(q.id) > 0).length / s.questions.length; },
    reviewed(sid, tid) {
      const key = `${sid}/${tid}`;
      if (state.reviewed[key]) return false;
      state.reviewed[key] = true; state.xp += 5; save(); return true;
    },
    validateImport(text) { return normalize(JSON.parse(text)); },
    import(text) { const candidate = normalize(JSON.parse(text)); state = candidate; save(); },
    export() { return JSON.stringify(state, null, 2); },
    reset() { state = fresh(); save(); },
    summary() {
      const lines = [`Karina’s OAT progress · ${dateKey()}`, `Level ${level().number}: ${level().name} · ${state.xp} XP`, `Study streak: ${currentStreak()} days`, `Last completed session: ${state.lastSession ? new Date(state.lastSession).toLocaleString() : 'None yet'}`, ''];
      for (const s of sections) {
        lines.push(`${s.subject} — ${s.title}: ${percent(s.questions)}% mastery; best quiz ${state.best[s.id] || 0}%; Boss ${state.bosses[s.id] ? 'beaten' : 'not yet beaten'}`);
        const topics = s.topics.map(t => ({ title: t.title, p: percent(s.questions.filter(q => q.topic === t.id)) })).sort((a, b) => a.p - b.p);
        lines.push('Weakest topics: ' + topics.slice(0, 3).map(t => `${t.title} (${t.p}%)`).join(', '));
      }
      lines.push('', `Mistakes Deck: ${Object.keys(state.deck).length} cards; ${this.due().length} due`, `Badges earned: ${state.badges.length}/${BADGES.length}`);
      return lines.join('\n');
    }
  };
})();
