(function () {
  'use strict';
  const P = window.OATProgress, C = window.OATContent;
  const subjects = [['general-chemistry','General Chemistry'],['organic-chemistry','Organic Chemistry'],['physics','Physics'],['biology','Biology']];
  const days = [
    ['Find your weak areas','40–50 min','Take the 24-question diagnostic without notes. Review the incorrect answers and mark correct guesses for review. Start with the two topics you missed most.', [], 'diagnostic'],
    ['General Chemistry: calculations','60–75 min','Study limiting reactants, solution concentration and gas laws. Do one worked example before each short quiz. Write the units on every line.', ['gc-foundation','gc-solutions']],
    ['Organic Chemistry: structures','60–75 min','Practice resonance, acidity, R/S, E/Z and spectra. Sketch the structure before looking at answer choices. Review due cards for 10 minutes.', ['oc-structure','oc-analysis']],
    ['Physics: motion and energy','60–75 min','Draw a free-body diagram, label a positive direction, then decide whether to use forces, energy or momentum.', ['ph-motion','ph-energy']],
    ['General Chemistry: equilibrium and energy','60–75 min','Do Q versus K, buffer and titration problems first. Finish with rates, ΔG and cell potentials. Check signs before calculating.', ['gc-equilibrium','gc-energy']],
    ['Organic Chemistry: choose the reaction','60–75 min','For each problem, identify the substrate and what the reagent does. Predict the product before checking regioselectivity, stereochemistry or rearrangements.', ['oc-reactions','oc-carbonyl']],
    ['Physics: fluids, heat and waves','60–75 min','Practice gauge pressure, buoyancy, energy signs and standing-wave boundaries. Finish with 10 minutes in the Mistakes Deck.', ['ph-fluids-waves']],
    ['Physics: circuits and optics','60–75 min','Mark common circuit nodes. For optics, draw the ray path, identify the image side and check the distance units. Use the math reference if you get stuck.', ['ph-electric','ph-optics']],
    ['Biology, math and reading','60–90 min','Review two weak Biology topics and do a short round. In your main prep program, do a timed Quantitative Reasoning set and one Reading Comprehension passage.', ['biology'], 'repair'],
    ['Timed Natural Sciences','90 min + 25 min review','Do 40 Biology, 30 General Chemistry and 30 Organic Chemistry questions in one sitting. Then review the misses and correct guesses; select two recurring errors to fix.', [], 'science-timed'],
    ['Fix two science mistakes','45–60 min','Work through the two errors from the timed set. Review one example per skill, then attempt a different question without notes. Finish with due cards.', [], 'repair'],
    ['Timed Physics','50 min + 20 min review','Answer 40 Physics questions. Afterward, separate missed questions into model choice, units and signs, or calculation. Redo the setups before looking at the solutions.', [], 'physics-timed'],
    ['Recheck weak skills','45–75 min','Do a mistake practice round and a timed reading passage or math set from your main prep program. If you have not done a full mock, use your main prep program for one today if time permits.', [], 'repair'],
    ['Light review and test logistics','30–45 min','Review due cards, reconstruct key equations from memory and check your test time, travel and required ID. Stop after this short review.', []]
  ];
  const esc = v => String(v).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const nextDay = () => days.findIndex((_,i)=>!P.state.planDays.includes(i+1))+1;
  const start = (mode,label) => `<button class="btn" data-action="start" data-mode="${mode}">${label}</button>`;
  function plan(query) {
    const requested = Number(query.get('day'));
    const day = Number.isInteger(requested) && requested >= 1 && requested <= 14 ? requested : nextDay() || 14;
    const [title, time, task, links, mode] = days[day-1], done = P.state.planDays.includes(day);
    const actions = {diagnostic:'Start 24-question diagnostic',repair:'Practice weak skills', 'science-timed':'Start timed Natural Sciences', 'physics-timed':'Start timed Physics'};
    return `<a class="breadcrumb" href="#/">← Home</a><div class="section-heading"><h1>14-day OAT plan</h1><span class="small">${P.state.planDays.length}/14 days complete</span></div>
      <nav class="day-picker" aria-label="Choose study day">${days.map((_,i)=>`<a class="btn small ${i+1===day?'':'secondary'}" href="#/plan?day=${i+1}" ${i+1===day?'aria-current="step"':''} aria-label="Day ${i+1}${P.state.planDays.includes(i+1)?', complete':''}">${i+1}${P.state.planDays.includes(i+1)?' ✓':''}</a>`).join('')}</nav>
      <section class="panel plan-day"><p class="eyebrow muted">Day ${day} · ${time}</p><h2>${title}</h2><p>${task}</p><div class="plan-actions">${mode ? start(mode,actions[mode]) : ''}${links.map(id=>{const s=C.sections.find(s=>s.id===id);return s?`<a class="btn secondary" href="#/s/${s.id}">${esc(s.title)} →</a>`:'<a class="btn secondary" href="#/subject/biology">Biology topics →</a>';}).join('')}</div><p class="small muted">Short on time? ${links.length && !mode ? 'Do Quick 5 in one module and review every miss.' : 'Do a short mistake practice round instead.'}</p>${!links.length || mode ? `<div class="plan-actions">${mode!=='repair' && day!==14 ? start('repair','Start short practice') : ''}</div>` : ''}<div class="plan-actions"><a class="btn small secondary" href="#/review">Mistakes Deck</a><a class="btn small secondary" href="#/math">Math reference</a><button class="btn small secondary" data-action="plan-day" data-day="${day}">${done?'Mark day incomplete':'Mark day complete'}</button>${day<14?`<a class="btn small secondary" href="#/plan?day=${day+1}">Next day →</a>`:''}</div></section>
      <p class="small muted">For a full exam simulation or more Reading Comprehension and Quantitative Reasoning practice, use your main OAT prep program.</p>`;
  }
  function math() {
    const rows = [
      ['Units','Multiply by a conversion fraction that cancels the original unit. Example: 250 mL × (1 L / 1000 mL) = 0.250 L.'],
      ['Proportions','Write new/old. If y ∝ 1/x² and x triples, y becomes 1/9 as large. Use the same reasoning for electric fields and gravity.'],
      ['Exponents and logs','log(ab) = log a + log b; log(aᵏ) = k log a for a > 0. Example: log₁₀(0.001) = −3, so pH at 0.001 M H⁺ is 3.'],
      ['Percents','Percent change = (new − old)/old × 100%. From 50 to 60 is +20%, not +10%.'],
      ['Rate and combined work','Distance = rate × time at constant rate. Add independent rates for simultaneous work. A 2 h job rate plus a 3 h job rate is 5/6 job per hour.'],
      ['Probability and counting','P(at least one) = 1 − P(none). Multiply independent probabilities for AND; choose combinations when order does not count.'],
      ['Statistics and geometry','Sort before finding the median. Use mean = sum/count and distinguish area from volume. Example: doubling each side of a cube multiplies its volume by eight.']
    ];
    return `<a class="breadcrumb" href="#/plan">← 14-day plan</a><h1>Math reference</h1>${rows.map(([title,body])=>`<section class="panel"><h3>${title}</h3><p>${body}</p></section>`).join('')}<p class="source">Reference: Quantitative Reasoning Formula Sheet, pp. 1–2.</p>`;
  }
  window.OATPrepPlan = { subjects, days, nextDay, plan, math };
})();
