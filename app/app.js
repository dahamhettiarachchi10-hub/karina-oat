(function () {
  'use strict';
  const C = window.OATContent, P = window.OATProgress, Q = window.OATQuiz, E = window.OATStudyExtras, D = window.OATPrepPlan;
  const main = document.getElementById('main');
  const icons = { home: '⌂', plan: '▤', review: '↻', trophies: '♛', settings: '⚙' };
  let ready = false;
  let timer = null, toastTimer = null, lastRoute = '', audio = null, confettiFrame = null;
  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  function md(v) {
    const code = [];
    let safe = esc(v).replace(/`([^`]+)`/g, (_, text) => { code.push(`<code>${text}</code>`); return `\u0000${code.length - 1}\u0000`; });
    safe = safe.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\*([^*]+)\*/g, '<em>$1</em>').replace(/~([^~\n]+)~/g, '<sub>$1</sub>').replace(/\^([^\^\n]+)\^/g, '<sup>$1</sup>').replace(/\n/g, '<br>');
    return safe.replace(/\u0000(\d+)\u0000/g, (_, i) => code[+i]);
  }
  const path = s => '#/s/' + encodeURIComponent(s.id);
  const sourceLink = (s, pages = s.sourcePages?.[0]) => s.sourcePages ? `<a href="${path(s)}?page=${parseInt(pages, 10)}">Read source page ${parseInt(pages, 10)} →</a>` : '';
  const button = (label, action, attrs = '', style = '') => `<button class="btn ${style}" data-action="${action}" ${attrs}>${label}</button>`;
  const bar = value => `<div class="progress-track" role="progressbar" aria-label="Progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(value)}"><span style="--fill:${value}%"></span></div>`;
  const ring = value => `<div class="ring" aria-label="${value}% mastery" style="--value:${value}"><svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="20"></circle><circle class="fill" cx="24" cy="24" r="20"></circle></svg><span class="ring-value">${value}%</span></div>`;
  const data = (s, t = null) => `data-section="${esc(s.id)}"${t ? ` data-topic="${esc(t.id)}"` : ''}`;
  function toast(message) { const el = document.getElementById('toast'); el.textContent = message; el.classList.add('toast-visible'); clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('toast-visible'), 4500); }
  function announce(message) { document.getElementById('announcements').textContent = message; }
  function reduced() { return P.state.settings.reducedMotion || matchMedia('(prefers-reduced-motion: reduce)').matches; }
  function theme() {
    document.documentElement.dataset.theme = P.state.settings.theme === 'system' ? matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' : P.state.settings.theme;
    document.documentElement.dataset.reducedMotion = String(reduced());
  }
  function confetti() {
    if (reduced()) return;
    const canvas = document.getElementById('confetti'), ctx = canvas.getContext('2d');
    if (!ctx) return;
    cancelAnimationFrame(confettiFrame);
    canvas.width = innerWidth; canvas.height = innerHeight;
    const pieces = Array.from({ length: 75 }, () => ({ x: Math.random() * canvas.width, y: -Math.random() * canvas.height / 2, vx: Math.random() * 3 - 1.5, vy: 2 + Math.random() * 3, rotation: Math.random() * Math.PI, color: ['#22b5a4', '#f5c86a', '#e8a230', '#f5f0e8'][Math.floor(Math.random() * 4)] }));
    const start = performance.now(); let last = start;
    function frame(now) {
      if (reduced() || now - start > 2500) { ctx.clearRect(0, 0, canvas.width, canvas.height); return; }
      const dt = Math.min(3, (now - last) / 16.7); last = now; ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of pieces) { p.x += p.vx * dt; p.y += p.vy * dt; p.rotation += .05 * dt; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rotation); ctx.fillStyle = p.color; ctx.fillRect(-3, -5, 6, 10); ctx.restore(); }
      confettiFrame = requestAnimationFrame(frame);
    }
    confettiFrame = requestAnimationFrame(frame);
  }
  function sound(correct) {
    if (!P.state.settings.sound) return;
    try {
      audio ||= new (window.AudioContext || window.webkitAudioContext)(); audio.resume().catch(() => {});
      const gain = audio.createGain(), oscillator = audio.createOscillator(), now = audio.currentTime;
      oscillator.type = 'sine'; oscillator.frequency.setValueAtTime(correct ? 523.25 : 330, now); oscillator.frequency.exponentialRampToValueAtTime(correct ? 783.99 : 293.66, now + .15);
      gain.gain.setValueAtTime(.0001, now); gain.gain.exponentialRampToValueAtTime(.06, now + .02); gain.gain.exponentialRampToValueAtTime(.0001, now + .25);
      oscillator.connect(gain); gain.connect(audio.destination); oscillator.start(); oscillator.stop(now + .26);
    } catch (_) { /* Sound is optional. */ }
  }
  function celebration(events, boss = false) {
    const names = events.badges.map(id => P.BADGES.find(b => b.id === id)?.name).filter(Boolean);
    if (events.levelUp || names.length || boss) {
      confetti(); toast([events.levelUp ? `Level up! ${P.level().name}` : '', names.length ? `Unlocked: ${names.join(', ')}` : '', boss ? 'Boss Round conquered! ♛' : ''].filter(Boolean).join(' · '));
    }
  }
  function shell() {
    const route = location.hash || '#/', level = P.level(), streak = P.currentStreak(), due = P.due().length;
    const active = route.startsWith('#/s/') || route.startsWith('#/subject/') || route.startsWith('#/bank') || route.startsWith('#/source') || route === '#/' ? 'home' : route.split(/[/?]/)[1];
    const nav = Object.entries(icons).map(([id, icon]) => ({ id, icon, title: id === 'home' ? 'Home' : id === 'plan' ? '14-day plan' : id === 'review' ? 'Mistakes Deck' : id === 'trophies' ? 'Trophies' : 'Settings' }));
    document.getElementById('sidebar').innerHTML = `<a class="brand" href="#/" aria-label="Monarque Tutoring home"><span class="brand-symbol">m</span><div><div class="brand-name">monarque</div><div class="brand-sub">TUTORING</div></div></a><div class="side-label">YOUR STUDY SPACE</div><nav aria-label="Main navigation">${nav.map(n => `<a class="nav-link ${active === n.id ? 'active' : ''}" href="${n.id === 'home' ? '#/' : '#/' + n.id}" ${active === n.id ? 'aria-current="page"' : ''}><span class="nav-icon" aria-hidden="true">${n.icon}</span>${n.title}${n.id === 'review' && due ? `<span class="nav-count">${due}</span>` : ''}</a>`).join('')}</nav><div class="side-label">YOUR SECTIONS</div><nav aria-label="Sections">${D.subjects.map(([slug,title]) => `<a class="nav-link side-section" href="#/subject/${slug}"><span class="dot"></span>${title}</a>`).join('')}</nav><div class="side-bottom"><div class="side-profile"><div style="display:flex;gap:10px;align-items:center"><div class="avatar">K</div><div><strong>Karina</strong><div class="small" style="color:#a9bdcf">Level ${level.number} · ${level.name}</div></div></div><div class="meta"><span class="mono">${P.state.xp} XP</span><span>♨ ${streak} day${streak === 1 ? '' : 's'}</span></div>${bar(level.percent)}<div class="small" style="margin-top:8px;color:#90a7bd">${Math.ceil(level.ceiling - P.state.xp)} XP to next level</div></div></div>`;
    document.getElementById('mobile-header').innerHTML = `<a href="#/" class="mobile-brand">monarque <span class="sr-only">Tutoring home</span></a><div class="mobile-status"><div class="mobile-xp">LV ${level.number} · ${P.state.xp} XP${bar(level.percent)}</div><div class="mobile-streak" aria-label="${streak} day streak">♨ ${streak}</div></div>`;
    document.getElementById('bottom-nav').innerHTML = nav.map(n => `<a class="${active === n.id ? 'active' : ''}" href="${n.id === 'home' ? '#/' : '#/' + n.id}" ${active === n.id ? 'aria-current="page"' : ''}><span class="nav-icon" aria-hidden="true">${n.icon}</span>${n.id === 'home' ? 'Home' : n.id === 'review' ? 'Review' : n.title}</a>`).join('');
  }
  function home() {
    const day = D.nextDay(), active = P.state.activeQuiz, due = P.due().length;
    const questions = C.sections.flatMap(s => s.questions), mastered = questions.filter(q => P.mastery(q.id) === 3).length;
    const first = questions.map(q => P.state.questions[q.id]?.firstCorrect).filter(v => typeof v === 'boolean');
    main.innerHTML = `<section class="hero"><div class="hero-copy"><div class="eyebrow">BIOLOGY · CHEMISTRY · PHYSICS</div><h1>Karina’s OAT Prep</h1><p>Follow the 14-day plan. Start with the diagnostic, use the lessons to fix weak topics, and finish with timed rounds.</p><div class="hero-actions"><a class="btn" href="#/plan">${day ? `Open Day ${day} →` : 'Review the 14-day plan →'}</a>${active && !active.completed ? button('Resume quiz', 'resume', '', 'ghost') : ''}</div></div><div class="hero-art" aria-hidden="true"><div class="orbit three"></div><div class="orbit"></div><div class="orbit two"></div><div class="eye"><span></span></div><div class="art-star">✦</div></div></section>
    <div class="stats"><div class="stat"><div><strong>${P.state.planDays.length} / 14</strong><div class="stat-label">study days complete</div></div></div><div class="stat"><div><strong>${P.state.xp}</strong><div class="stat-label">XP · ${P.currentStreak()} day streak</div></div></div><div class="stat"><div><strong>${mastered} / ${questions.length}</strong><div class="stat-label">questions mastered</div></div></div><div class="stat"><div><strong>${first.length ? Math.round(100*first.filter(Boolean).length/first.length) + '%' : '—'}</strong><div class="stat-label">first-try accuracy</div></div></div></div>
    <section class="panel"><h3>Review and practice</h3><div class="plan-actions"><a class="btn secondary" href="#/review">Mistakes Deck · ${due} due</a>${button('Practice weak skills', 'start', 'data-mode="repair"', 'secondary')}<a class="btn secondary" href="#/math">Math reference</a><a class="btn secondary" href="#/bank">Biology question bank</a></div></section>
    <div class="section-heading"><h2>Subjects</h2></div><div class="section-grid">${D.subjects.map(([slug,title])=>{const modules=C.sections.filter(s=>s.subject===title);return `<a class="section-card" href="#/subject/${slug}"><h3>${title}</h3><div class="card-meta">${modules.length} modules · ${modules.reduce((n,s)=>n+s.questions.length,0)} questions</div><span class="card-arrow" aria-hidden="true">→</span></a>`;}).join('')}</div>`;
  }
  function subjectPage(slug) {
    const title = D.subjects.find(([key]) => key === slug)?.[1];
    if (!title) throw new Error('Subject not found.');
    const modules = C.sections.filter(s => s.subject === title);
    main.innerHTML = `<a class="breadcrumb" href="#/">← Home</a><div class="section-heading"><h1>${title}</h1><a class="btn small secondary" href="#/plan">14-day plan</a></div>${slug === 'biology' ? '<p><a href="#/source">Open Biology sourcebook →</a></p>' : ''}<div class="section-grid">${modules.map(sectionCard).join('')}</div>`;
  }
  function sectionCard(s) {
    const mastery = P.percent(s.questions), age = P.dayNumber(P.dateKey()) - P.dayNumber(s.addedOn), isNew = age >= 0 && age < 7;
    return `<a class="section-card ${mastery === 100 ? 'gold' : ''}" href="${path(s)}"><div class="card-top"><div class="topic-symbol" aria-hidden="true">✧</div>${isNew ? '<span class="pill">NEW</span>' : ''}</div><div class="eyebrow muted">${esc(s.subtitle)}</div><h3>${esc(s.title)}</h3><div class="card-meta">${s.topics.length} topics <span aria-hidden="true">·</span> ${s.questions.length} questions</div><div class="card-bottom"><div class="mastery">${ring(mastery)}<div><div class="small">MASTERY</div><div class="boss-status">${P.state.bosses[s.id] ? '♛ Boss beaten' : P.attempted(s) >= .6 && s.questions.some(q => q.mustGet) ? '◇ Boss unlocked' : '○ Boss not yet beaten'}</div></div></div><span class="card-arrow" aria-hidden="true">→</span></div></a>`;
  }
  function note(n) {
    if (n.type === 'diagram' && /^diagrams\/[a-z0-9-]+\.svg$/.test(n.src)) return `<figure class="lesson-figure"><img src="${esc(n.src)}" alt="${esc(n.body)}" loading="lazy"><figcaption>${esc(n.body)}</figcaption></figure>`;
    let type = n.type;
    if (!['text', 'key', 'trap', 'compare', 'steps', 'mnemonic'].includes(type)) { console.warn('Unknown note type; displaying as text:', type); type = 'text'; }
    const title = n.title ? `<h4>${esc(n.title)}</h4>` : '';
    if (type === 'compare') return `<div class="note table-wrap"><table>${n.title ? `<caption>${esc(n.title)}</caption>` : ''}<thead><tr>${n.headers.map(h => `<th scope="col">${md(h)}</th>`).join('')}</tr></thead><tbody>${n.rows.map(row => `<tr>${row.map(cell => `<td>${md(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    if (type === 'steps') return `<div class="note">${title}<ol class="steps">${n.items.map(item => `<li><div>${md(item)}</div></li>`).join('')}</ol></div>`;
    return `<div class="note ${type}">${title}<p>${md(n.body || '')}</p></div>`;
  }
  function section(s, query) {
    const practice = query.get('tab') === 'practice', topic = query.get('topic');
    main.innerHTML = `<a class="breadcrumb" href="#/">← Home</a><section class="hero section-hero"><div class="hero-copy"><div class="eyebrow">${esc(s.subject)} · ${esc(s.subtitle)}</div><h1>${esc(s.title)}</h1><p>${s.topics.length} topics · ${s.questions.length} questions</p></div>${ring(P.percent(s.questions))}</section><div class="tabs" role="tablist" aria-label="Section view"><button id="learn-tab" class="tab" role="tab" aria-selected="${!practice}" aria-controls="section-panel" tabindex="${practice ? '-1' : '0'}" data-action="tab" data-tab="learn" ${data(s)}>Learn</button><button id="practice-tab" class="tab" role="tab" aria-selected="${practice}" aria-controls="section-panel" tabindex="${practice ? '0' : '-1'}" data-action="tab" data-tab="practice" ${data(s)}>Practice</button></div><div id="section-panel" role="tabpanel" aria-labelledby="${practice ? 'practice-tab' : 'learn-tab'}">${practice ? practiceView(s) : `${s.sourcePages ? E.reader(s, query.get('page')) : ''}<div class="learn-intro"><span class="small muted">Read the rule and example, then quiz the topic.</span><span class="small muted">✓ Review a topic · +5 XP once</span></div>${s.topics.map((t, i) => `<details class="topic-card" id="topic-${esc(t.id)}" ${topic === t.id || (!s.sourcePages && !topic && i===0) ? 'open' : ''}><summary><span class="topic-number">${String(i + 1).padStart(2, '0')}</span><h3>${esc(t.title)}</h3><span class="small muted">${P.percent(s.questions.filter(q => q.topic === t.id))}%</span><span class="chevron" aria-hidden="true">⌄</span></summary><div class="topic-body">${t.notes.map(note).join('')}${t.sourcePages ? `<p class="small muted">${sourceLink(s, t.sourcePages)}</p>` : ''}<div class="topic-actions">${button('Quiz this topic →', 'start', `${data(s, t)} data-mode="topic"`, 'small')}<button class="reviewed-btn" data-action="review-topic" ${data(s, t)} ${P.state.reviewed[`${s.id}/${t.id}`] ? 'disabled' : ''}>${P.state.reviewed[`${s.id}/${t.id}`] ? '✓ Reviewed · XP earned' : '○ Mark as reviewed · +5 XP'}</button></div></div></details>`).join('')}<div class="source">Source: ${esc(s.source)}<p>${sourceLink(s)}${s.sourceUrl ? ` · <a href="${esc(s.sourceUrl)}" target="_blank" rel="noopener">Google Drive source</a>` : ''}</p>${s.sourcePages ? '<p>Open the chapter reader above for the original pages.</p>' : ''}</div>`}</div>`;
    if (query.has('page') && !practice) document.getElementById('source-reader')?.scrollIntoView({ block: 'start' });
    if (topic && !practice) {
      const el = document.getElementById('topic-' + topic);
      if (el) { el.querySelector('summary').focus(); el.scrollIntoView({ block: 'start' }); }
    }
  }
  function practiceView(s) {
    const attempted = Math.floor(P.attempted(s) * 100), bossCount = s.questions.filter(q => q.mustGet).length, locked = attempted < 60 || bossCount === 0;
    const modes = [
      ['quick', '✦', 'Five questions', `Up to five questions, weighted toward unseen and missed ideas.`],
      ['full', '◎', 'Full topic mix', `All ${s.questions.length} questions, shuffled. Feedback after every answer.`],
      ['boss', '♛', 'Core questions', bossCount ? `${bossCount} essential questions. Get 100% to claim your crown. ${attempted < 60 ? `Attempt 60% to unlock (${attempted}% so far).` : 'Unlimited retries.'}` : 'No Boss questions have been added yet.'],
      ['exam', '◷', 'Timed practice', `${s.questions.length} questions · ${Math.ceil(s.questions.length * Q.EXAM_SECONDS_PER_QUESTION / 60)} minutes · feedback at the end.`]
    ];
    return `${s.subject === 'Biology' ? '<p class="small"><a href="#/bank">Biology question releases →</a></p>' : ''}<div class="learn-intro"><span class="small muted">Choose a question set.</span><span class="small mono">Best score: ${P.state.best[s.id] || 0}%</span></div><div class="mode-grid">${modes.map(([mode, icon, title, description]) => `<div class="mode-card ${mode === 'quick' ? 'primary-mode' : ''}"><span class="pill ${mode === 'boss' ? 'amber' : ''}">${icon} ${Q.MODES[mode]}</span><h3>${title}</h3><p>${description}</p>${button(mode === 'boss' && locked ? '○ Locked' : mode === 'boss' && P.state.bosses[s.id] ? '♛ Play again' : 'Start round →', 'start', `${data(s)} data-mode="${mode}" ${mode === 'boss' && locked ? 'disabled' : ''}`, mode === 'quick' ? '' : 'secondary')}</div>`).join('')}</div><div class="topic-bars"><h3>Your focus areas</h3><p class="small muted" style="margin-top:10px">Mastery grows from seeing an idea, to answering correctly, to getting it right on two different days.</p>${s.topics.map(t => { const percent = P.percent(s.questions.filter(q => q.topic === t.id)); return `<div class="topic-bar"><a href="${path(s)}?topic=${encodeURIComponent(t.id)}">${esc(t.title)}</a>${bar(percent)}<span class="mono">${percent}%</span></div>`; }).join('')}</div>`;
  }
  const quizExit = (a, fallback) => a.batchId ? '#/bank?batch=' + encodeURIComponent(a.batchId) : a.sectionId ? '#/s/' + encodeURIComponent(a.sectionId) + '?tab=practice' : Q.planModes.includes(a.mode) ? '#/plan' : fallback;
  const flagButton = id => P.state.deck[id] ? '<span class="small muted">In Mistakes Deck</span>' : button('Mark as guessed', 'flag-review', `data-question="${esc(id)}"`, 'small secondary');
  function renderQuiz() {
    clearInterval(timer); timer = null;
    const a = P.state.activeQuiz;
    if (!a) { route(); return; }
    if (Q.isTimed(a.mode) && !a.completed && Date.now() >= a.deadline) Q.expire();
    if (a.completed) { results(a); shell(); return; }
    const { q, s } = Q.find(a.ids[a.index]), answer = a.answers[a.index], exam = Q.isTimed(a.mode);
    const topic = s.topics.find(t => t.id === q.topic);
    main.innerHTML = `<div class="quiz-wrap"><div class="quiz-header"><a class="breadcrumb" style="margin:0" href="${quizExit(a, '#/review')}">${exam ? '← Leave (timer continues)' : '← Pause round'}</a><span class="quiz-mode">${Q.MODES[a.mode]}</span>${exam ? '<span id="exam-timer" class="timer" role="timer" aria-label="Time remaining"></span>' : `<span class="combo">♨ ${a.combo} streak${a.combo >= 5 ? ' · ×2 XP' : a.combo >= 3 ? ' · ×1.5 XP' : ''}</span>`}</div><div class="quiz-progress" aria-label="Question ${a.index + 1} of ${a.ids.length}">${a.ids.map((id, i) => `<span class="progress-dot ${i === a.index ? 'current' : i < a.answers.length ? exam ? 'current' : a.answers[i].correct ? 'correct' : 'wrong' : ''}" aria-hidden="true"></span>`).join('')}</div><div class="quiz-card"><div class="question-meta"><span>${esc(topic.title)} · ${esc(q.difficulty)}</span><span class="mono">${String(a.index + 1).padStart(2, '0')} / ${a.ids.length}</span></div><h1 class="question-stem" tabindex="-1">${md(q.stem)}</h1><div class="answers" role="group" aria-label="Answer options">${a.options[q.id].map((value, index) => { const isCorrect = answer && !exam && value === q.options[q.answer], chosenWrong = answer && !exam && value === answer.choice && !answer.correct; return `<button class="answer ${isCorrect ? 'correct' : ''} ${chosenWrong ? 'chosen-wrong' : ''}" data-action="answer" data-option="${index}" ${answer ? 'disabled' : ''}><span class="answer-letter">${isCorrect ? '✓' : chosenWrong ? '○' : String.fromCharCode(65 + index)}</span><span class="answer-text">${md(value)}</span>${isCorrect ? `<span class="answer-label">${answer.correct ? 'Your choice · Correct' : 'Correct answer'}</span>` : chosenWrong ? '<span class="answer-label">Your choice · Incorrect</span>' : ''}</button>`; }).join('')}</div>${answer && !exam ? `<div class="feedback ${answer.correct ? '' : 'wrong'}" tabindex="-1"><div class="feedback-title">${answer.correct ? `✓ Correct · +${answer.xp} XP` : 'Incorrect · Review the deciding step'}</div><p>${md(q.explanation)}</p>${q.sourcePages ? `<p class="small">${sourceLink(s, Array.isArray(q.sourcePages) ? q.sourcePages[0] : q.sourcePages)}</p>` : ''}<div class="plan-actions"><a href="${path(s)}?topic=${encodeURIComponent(q.topic)}">Review this topic →</a>${answer.correct ? flagButton(q.id) : ''}</div></div>` : ''}<div class="quiz-footer"><span class="keyboard-hint">${exam ? 'Answers lock when selected. Results after the final question.' : 'Use 1–5 or A–E to answer. Enter for the next question.'}</span>${answer ? button(a.index + 1 === a.ids.length ? 'See results →' : 'Next question →', 'next') : '<span class="small muted">Choose your answer</span>'}</div></div></div>`;
    if (exam) {
      function tick() {
        const left = Math.max(0, Math.ceil((a.deadline - Date.now()) / 1000)), el = document.getElementById('exam-timer');
        if (el) el.textContent = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')} left`;
        if (!left) { clearInterval(timer); Q.expire(); renderQuiz(); shell(); celebrateResults(); }
      }
      tick(); if (!a.completed) timer = setInterval(tick, 1000);
    }
  }
  function results(a) {
    const correct = a.answers.filter(r => r.correct).length, score = Math.round(correct / a.ids.length * 100), missed = a.answers.filter(r => !r.correct), bossWin = a.mode === 'boss' && score === 100;
    const topicGroups = {}, subjectGroups = {};
    for (const r of a.answers) {
      const { q, s } = Q.find(r.id), t = s.topics.find(t => t.id === q.topic), key = s.id + '/' + t.id;
      topicGroups[key] ||= { label: t.title, correct: 0, total: 0 };
      subjectGroups[s.subject] ||= { label: s.subject, correct: 0, total: 0 };
      for (const group of [topicGroups[key], subjectGroups[s.subject]]) { group.total++; if (r.correct) group.correct++; }
    }
    const breakdown = groups => Object.values(groups).map(g => `<div class="breakdown-row"><span>${esc(g.label)}</span><span class="mono">${g.correct}/${g.total}</span></div>`).join('');
    main.innerHTML = `<div class="quiz-wrap"><div class="hero results-hero"><div class="eyebrow">${Q.MODES[a.mode]} · ROUND COMPLETE</div><div class="results-score">${score}%</div><h1>${bossWin ? 'Boss round passed' : 'Practice results'}</h1><p style="margin:14px auto">${correct} of ${a.ids.length} correct · <span class="mono">+${a.totalXP} XP</span>${a.mode === 'boss' && !bossWin ? '<br>The crown takes 100%. Every retry is a fresh chance.' : ''}</p><div class="result-actions">${missed.length ? button('Practice weak skills', 'start', 'data-mode="repair"', 'amber') + button('Retry same questions', 'retry', '', 'ghost') : ''}<a class="btn ghost" href="${quizExit(a, '#/')}">${a.batchId ? 'Back to Question Bank' : a.sectionId ? 'Back to section' : Q.planModes.includes(a.mode) ? 'Back to 14-day plan' : 'Back home'}</a></div></div><div class="section-heading"><h2>Results by topic and subject</h2><span class="small">Best combo: ${a.maxCombo}</span></div><div class="breakdown"><div class="panel"><h3>By topic</h3>${breakdown(topicGroups)}</div><div class="panel"><h3>By subject</h3>${breakdown(subjectGroups)}</div></div>${missed.length ? `<div class="section-heading"><h2>Review incorrect answers</h2><span class="small">${missed.length} question${missed.length === 1 ? '' : 's'}</span></div>${missed.map(r => missedCard(r)).join('')}` : '<div class="encouragement"><span>✧</span>No incorrect answers. Mark correct guesses for review.</div>'}<details class="topic-card"><summary><h3>Review correct answers and mark guesses</h3><span class="chevron">⌄</span></summary><div class="topic-body">${a.answers.filter(r => r.correct).map(r => missedCard(r)).join('') || '<p>No correct answers in this round.</p>'}</div></details></div>`;
  }
  function missedCard(r) {
    const { q, s } = Q.find(r.id);
    return `<article class="missed"><div class="eyebrow muted">${esc(s.subject)} · ${esc(q.difficulty)}</div><h4>${md(q.stem)}</h4><p><strong>Your answer:</strong> ${r.choice === null ? 'Time ran out' : md(r.choice)}</p><p><strong>✓ Correct answer:</strong> ${md(q.options[q.answer])}</p><p class="muted">${md(q.explanation)}</p><div class="plan-actions"><a class="small" href="${path(s)}?topic=${encodeURIComponent(q.topic)}">Review this topic →</a>${r.correct ? flagButton(q.id) : ''}</div></article>`;
  }
  function celebrateResults() {
    const a = P.state.activeQuiz;
    if (!a?.completed) return;
    celebration(a.events, a.mode === 'boss' && a.answers.every(r => r.correct));
    a.events = { badges: [], levelUp: false }; P.save();
  }
  function review() {
    const cards = Object.entries(P.state.deck).sort((a, b) => a[1].due.localeCompare(b[1].due)), due = P.due();
    main.innerHTML = `<div class="page-top"><span class="eyebrow">A FRESH LOOK</span><span class="pill">${due.length} due today</span></div><section class="hero"><div class="hero-copy"><h1>Mistakes Deck</h1><p>Tricky questions become strengths with a little space and a second look. Two correct reviews in a row clear a card.</p>${due.length ? button(`Review ${due.length} ready card${due.length === 1 ? '' : 's'} →`, 'start', 'data-mode="review"') : '<span class="micro">Nothing due right now. Your next session is a fresh start.</span>'}</div></section>${cards.length ? `<div class="section-heading"><h2>Mistakes Deck</h2><span class="small">${cards.length} card${cards.length === 1 ? '' : 's'}</span></div><p class="small muted">Reviews return after 1, 3, then 7 days. Only Mistakes Deck reviews count toward clearing a card.</p>${cards.map(([id, card]) => { const { q, s } = Q.find(id), topic = s.topics.find(t => t.id === q.topic); return `<div class="review-card"><div><div class="small muted">${esc(s.subject)} · ${esc(topic.title)}</div><h3>${md(q.stem)}</h3><span class="small muted">${card.run ? '✓ One correct review · one more to clear' : 'Two correct reviews to clear'}</span></div><span class="pill ${card.due <= P.dateKey() ? '' : 'amber'}">${card.due <= P.dateKey() ? 'Ready today' : 'Due ' + esc(card.due)}</span></div>`; }).join('')}` : '<div class="empty"><div class="empty-symbol">↻</div><h2>A clean slate.</h2><p>Missed questions will land here, ready for a fresh look tomorrow.</p><a class="btn secondary" href="#/">Back to learning →</a></div>'}`;
  }
  function trophies() {
    main.innerHTML = `<div class="page-top"><span class="eyebrow">LITTLE WINS, BIG MOMENTUM</span><span class="pill amber">${P.state.badges.length} / ${P.BADGES.length} earned</span></div><section class="hero"><div class="hero-copy"><h1>Your cabinet of wins.</h1><p>Every trophy tells a story of showing up, trying again, and getting a little clearer.</p></div></section><div class="badge-grid">${P.BADGES.map(b => { const earned = P.state.badges.includes(b.id); return `<article class="badge-card ${earned ? '' : 'locked'}"><div class="badge-icon" aria-hidden="true">${b.icon}</div><h3>${b.name}</h3><p>${b.description}</p><span class="pill ${earned ? '' : 'amber'}">${earned ? '✓ Earned' : '○ Locked'}</span></article>`; }).join('')}</div>`;
  }
  function settings() {
    main.innerHTML = `<div class="page-top"><span class="eyebrow">MAKE YOURSELF AT HOME</span></div><h1>Your study space, your way.</h1><div class="panel"><h3>Comfort & preferences</h3><div class="settings-row"><div><label for="sound">Sound effects</label><div class="small">Short, gentle tones when you answer.</div></div><input id="sound" type="checkbox" data-setting="sound" ${P.state.settings.sound ? 'checked' : ''}></div><div class="settings-row"><div><label for="motion">Reduce motion</label><div class="small">Disable animations and confetti. Your device preference is always respected.</div></div><input id="motion" type="checkbox" data-setting="reducedMotion" ${P.state.settings.reducedMotion ? 'checked' : ''}></div><div class="settings-row"><div><label for="theme">Appearance</label><div class="small">Follow your device, or choose a theme.</div></div><select id="theme" data-setting="theme">${['system', 'light', 'dark'].map(v => `<option value="${v}" ${P.state.settings.theme === v ? 'selected' : ''}>${v === 'system' ? 'Use device' : v === 'light' ? 'Light' : 'Dark'}</option>`).join('')}</select></div></div><div class="panel"><h3>Share your progress</h3><p class="muted">A plain-text update for your tutor: mastery, focus areas, streak, and your last session.</p>${button('Copy progress summary', 'copy-summary')}<label class="sr-only" for="summary">Progress summary</label><textarea id="summary" readonly>${esc(P.summary())}</textarea></div><div class="panel"><h3>Keep a backup</h3><p class="muted">Progress is saved on this browser and device. Copy a JSON backup before switching devices. Import replaces the progress saved here.</p>${!P.storageOK ? '<div class="error-note">Browser storage is unavailable. This session still works; export a backup before closing it.</div>' : ''}<div class="hero-actions">${button('Export progress', 'export', '', 'secondary')}${button('Copy JSON', 'copy-export', '', 'secondary')}</div><label for="backup" class="small muted" style="display:block;margin-top:16px">Progress JSON (paste an export here to import)</label><textarea id="backup" spellcheck="false" placeholder='{"version":1,…}'></textarea>${button('Import progress', 'import', '', 'secondary')}<div id="import-message" class="small" role="status" style="margin-top:10px"></div></div><div class="panel"><h3>Start fresh</h3><p class="muted">Reset clears your XP, study history, badges, and saved rounds from this browser. Export a backup first if you want to keep them.</p>${button('Reset progress', 'reset', '', 'danger')}</div>`;
  }
  function navigate(hash) { if (location.hash === hash) route(); else location.hash = hash; }
  function route() {
    if (!ready) return;
    clearInterval(timer); timer = null;
    const hash = location.hash || '#/', [base, search = ''] = hash.slice(1).split('?'), parts = base.split('/').filter(Boolean), query = new URLSearchParams(search);
    theme(); shell();
    const changed = hash !== lastRoute; lastRoute = hash;
    if (changed) { main.focus(); window.scrollTo(0, 0); }
    try {
      if (!parts.length) home();
      else if (parts[0] === 'plan') main.innerHTML=D.plan(query);
      else if (parts[0] === 'math') main.innerHTML=D.math();
      else if (parts[0] === 'subject') subjectPage(parts[1]);
      else if (parts[0] === 's') {
        const s = C.sections.find(s => s.id === decodeURIComponent(parts[1] || ''));
        if (!s) throw new Error('This section could not be found.');
        if (parts[2] === 'quiz') {
          const mode = parts[3], a = P.state.activeQuiz;
          if (!a || a.sectionId !== s.id || a.mode !== mode) {
            if (mode === 'topic' || mode === 'retry') { navigate(path(s) + '?tab=practice'); return; }
            Q.start(mode, s.id);
          }
          renderQuiz();
        } else section(s, query);
      } else if (parts[0] === 'review') {
        if (query.has('quiz')) {
          const mode = query.get('quiz'), a = P.state.activeQuiz;
          if (!a || a.sectionId !== null || a.mode !== mode) Q.start(mode);
          renderQuiz();
        } else review();
      } else if (parts[0] === 'bank') {
        if (query.has('quiz')) {
          const mode=query.get('quiz'), batchId=query.get('batch') || C.latestBatch()?.id, a=P.state.activeQuiz;
          if (!['bank','bank-full'].includes(mode)) throw new Error('Unknown question bank mode');
          if (!a || a.mode!==mode || a.batchId!==batchId) Q.start(mode,null,null,null,batchId);
          renderQuiz();
        } else main.innerHTML=E.bank(query);
      } else if (parts[0] === 'source') main.innerHTML=E.sourceBook(query);
      else if (parts[0] === 'trophies') trophies();
      else if (parts[0] === 'settings') settings();
      else throw new Error('This page could not be found.');
    } catch (error) {
      main.innerHTML = `<div class="empty"><h1>Let’s find your way back.</h1><p>${esc(error.message)}</p><a class="btn" href="#/">Back home</a></div>`;
    }
    const title = main.querySelector('h1')?.textContent || 'Your study space';
    document.title = `${title.replace(/\s+/g, ' ')} · Karina’s OAT Prep`;
    if (changed) announce(title);
  }
  async function copy(text, fallback) {
    try { await navigator.clipboard.writeText(text); toast('Copied. Ready to share.'); }
    catch (_) {
      const field = document.getElementById(fallback); if (field) { field.value = text; field.focus(); field.select(); }
      try { if (document.execCommand('copy')) toast('Copied. Ready to share.'); else toast('Text selected. Use your device’s Copy command.'); }
      catch (_) { toast('Text selected. Use your device’s Copy command.'); }
    }
  }
  function startFrom(el) {
    const existing = P.state.activeQuiz;
    if (existing && !existing.completed && !confirm('Start a new round? Your earned XP and progress stay saved, but the paused round will be replaced.')) return;
    try { const a = Q.start(el.dataset.mode, el.dataset.section || null, el.dataset.topic || null, null, el.dataset.batch || null); navigate(a.route); }
    catch (error) { toast(error.message); }
  }
  document.addEventListener('click', async e => {
    const el = e.target.closest('[data-action]'); if (!el || el.disabled) return;
    const action = el.dataset.action;
    if (action === 'skip') { e.preventDefault(); main.focus(); }
    else if (action === 'reload') location.reload();
    else if (action === 'start') startFrom(el);
    else if (action === 'plan-day') {
      const day = Number(el.dataset.day);
      P.markDay(day); navigate('#/plan?day=' + day);
      main.querySelector('[data-action="plan-day"]')?.focus();
    }
    else if (action === 'flag-review') {
      if (P.flag(el.dataset.question)) { el.disabled = true; el.textContent = 'Added to Mistakes Deck'; toast('Review scheduled for tomorrow.'); }
    }
    else if (action === 'resume') { if (P.state.activeQuiz) navigate(P.state.activeQuiz.route); }
    else if (action === 'tab') navigate('#/s/' + encodeURIComponent(el.dataset.section) + (el.dataset.tab === 'practice' ? '?tab=practice' : ''));
    else if (action === 'review-topic') {
      const before = P.level().number;
      if (P.reviewed(el.dataset.section, el.dataset.topic)) { el.disabled = true; el.textContent = '✓ Reviewed · XP earned'; shell(); toast('+5 XP · Another idea reviewed.'); if (P.level().number > before) celebration({ badges: [], levelUp: true }); }
    } else if (action === 'answer') {
      const a = P.state.activeQuiz;
      if (Q.isTimed(a?.mode) && Date.now() >= a.deadline) { Q.expire(); renderQuiz(); shell(); celebrateResults(); return; }
      if (!a) return;
      const result = Q.answer(a.options[a.ids[a.index]][+el.dataset.option]);
      if (!result) return;
      if (Q.isTimed(a.mode)) { Q.next(); renderQuiz(); if (a.completed) { shell(); celebrateResults(); } else main.querySelector('.question-stem')?.focus(); }
      else { sound(result.correct); renderQuiz(); shell(); celebration(a.events); a.events = { badges: [], levelUp: false }; P.save(); main.querySelector('.feedback')?.focus(); announce(result.correct ? `Correct. ${result.xp} XP earned.` : 'Incorrect. Read the explanation.'); }
    } else if (action === 'next') {
      Q.next(); renderQuiz(); shell();
      if (P.state.activeQuiz.completed) celebrateResults();
      else main.querySelector('.question-stem')?.focus();
    } else if (action === 'retry') {
      const a = P.state.activeQuiz, ids = a.answers.filter(r => !r.correct).map(r => r.id), sid = a.sectionId;
      try { const next = Q.start('retry', sid, null, ids); navigate(next.route); } catch (error) { toast(error.message); }
    } else if (action === 'copy-summary') await copy(P.summary(), 'summary');
    else if (action === 'export') { document.getElementById('backup').value = P.export(); toast('Your JSON backup is ready below.'); }
    else if (action === 'copy-export') { document.getElementById('backup').value = P.export(); await copy(P.export(), 'backup'); }
    else if (action === 'import') {
      try {
        const text = document.getElementById('backup').value;
        // Validate into a temporary read-only candidate before requesting replacement.
        P.validateImport(text);
        if (!confirm('Replace this browser’s progress with the pasted backup?')) return;
        P.import(text); theme(); shell(); settings(); toast('Progress imported. Welcome back.');
      } catch (error) { document.getElementById('import-message').textContent = `Could not import: ${error.message}`; }
    } else if (action === 'reset') {
      if (confirm('Reset all progress on this browser? This cannot be undone unless you have a JSON backup.')) { P.reset(); theme(); shell(); settings(); toast('A fresh start. Your learning path is ready.'); }
    }
  });
  document.addEventListener('change', e => {
    if (e.target.dataset.action === 'bank-select') { navigate('#/bank?batch='+encodeURIComponent(e.target.value)); return; }
    if (e.target.dataset.action === 'source-page') { navigate((e.target.dataset.section ? '#/s/'+encodeURIComponent(e.target.dataset.section) : '#/source')+'?page='+encodeURIComponent(e.target.value)); return; }
    if (!e.target.dataset.setting) return;
    const key = e.target.dataset.setting;
    P.state.settings[key] = key === 'theme' ? e.target.value : e.target.checked; P.save(); theme();
    if (key === 'sound' && e.target.checked) sound(true);
  });
  document.addEventListener('keydown', e => {
    if (e.target.matches('input,textarea,select') || e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.target.getAttribute('role') === 'tab' && ['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) {
      e.preventDefault(); const target = document.getElementById(e.key === 'Home' || e.key === 'ArrowLeft' ? 'learn-tab' : 'practice-tab'); target.click(); setTimeout(() => document.getElementById(target.id)?.focus(), 0); return;
    }
    const a = P.state.activeQuiz;
    if (!a || a.completed || (!main.querySelector('.quiz-card'))) return;
    const key = e.key.toLowerCase(), index = /^[1-5]$/.test(key) ? +key - 1 : /^[a-e]$/.test(key) ? key.charCodeAt(0) - 97 : -1;
    if (index >= 0 && a.answers.length === a.index) { const option = main.querySelector(`[data-action="answer"][data-option="${index}"]`); if (option) { e.preventDefault(); option.click(); } }
    else if (e.key === 'Enter' && a.answers.length > a.index && !e.target.closest('a,button,summary')) { e.preventDefault(); main.querySelector('[data-action="next"]')?.click(); }
  });
  window.addEventListener('hashchange', route);
  window.addEventListener('pageshow', () => { if (Q.isTimed(P.state.activeQuiz?.mode) && main.querySelector('.quiz-card')) renderQuiz(); });
  document.addEventListener('visibilitychange', () => { if (!document.hidden && Q.isTimed(P.state.activeQuiz?.mode) && main.querySelector('.quiz-card')) { renderQuiz(); if (P.state.activeQuiz.completed) { shell(); celebrateResults(); } } });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', theme);
  matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', theme);
  async function boot() {
    await C.load();
    if (!P.init(C.sections)) {
      theme();
      main.innerHTML = `<div class="empty"><h1>Let’s finish loading your study space.</h1><p>Some study files could not load. Your saved progress has been left untouched.</p><p class="small muted">${C.errors.map(esc).join('<br>')}</p>${button('Try again →', 'reload')}</div>`;
      return;
    }
    ready = true; theme(); route();
  }
  boot();
})();
