/* Classic scripts deliberately support file://. No fetch or ES module loader. */
(function () {
  'use strict';
  const sections = [], batches = [], errors = [], knownStems = new Set(), knownSections = new Set(), knownQuestions = new Set();
  const normalizeStem = value => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  let revision = 0;
  const nonempty = v => typeof v === 'string' && v.trim().length > 0;
  function validate(s) {
    const issues = [];
    if (!s || typeof s !== 'object') return ['Expected a section object'];
    for (const field of ['id', 'subject', 'title', 'subtitle', 'source', 'addedOn'])
      if (!nonempty(s[field])) issues.push(`${field} must be a non-empty string`);
    if (typeof s.addedOn === 'string' && (!/^\d{4}-\d{2}-\d{2}$/.test(s.addedOn) || Number.isNaN(Date.parse(s.addedOn + 'T12:00:00')) || new Date(s.addedOn + 'T12:00:00Z').toISOString().slice(0, 10) !== s.addedOn)) issues.push('addedOn must be a valid YYYY-MM-DD date');
    if (s.sourceUrl !== undefined && (typeof s.sourceUrl !== 'string' || !/^https:\/\//.test(s.sourceUrl))) issues.push('sourceUrl must use HTTPS');
    if (s.sourcePages !== undefined && (!Array.isArray(s.sourcePages) || s.sourcePages.length !== 2 || !s.sourcePages.every(x => Number.isInteger(x) && x > 0) || s.sourcePages[1] < s.sourcePages[0])) issues.push('sourcePages must be a positive start/end page range');
    if (s.progressRevision !== undefined && !nonempty(s.progressRevision)) issues.push('progressRevision must be a non-empty string');
    if (knownSections.has(s.id)) issues.push(`Duplicate section id: ${s.id}`);
    if (!Array.isArray(s.topics) || !s.topics.length) issues.push('At least one topic is required');
    const topicIds = new Set();
    for (const t of s.topics || []) {
      if (!t || !nonempty(t.id) || !nonempty(t.title) || !Array.isArray(t.notes)) { issues.push('Invalid topic'); continue; }
      if (topicIds.has(t.id)) issues.push(`Duplicate topic id: ${t.id}`);
      topicIds.add(t.id);
      for (const n of t.notes) {
        if (!n || typeof n !== 'object') { issues.push(`Invalid note in ${t.id}`); continue; }
        if (n.type === 'compare') {
          if (!Array.isArray(n.headers) || !n.headers.length || !n.headers.every(x => typeof x === 'string') || !Array.isArray(n.rows) || !n.rows.every(r => Array.isArray(r) && r.length === n.headers.length && r.every(x => typeof x === 'string'))) issues.push(`Invalid comparison in ${t.id}`);
        } else if (n.type === 'steps') {
          if (!Array.isArray(n.items) || !n.items.length || !n.items.every(nonempty)) issues.push(`Invalid steps in ${t.id}`);
        } else if (typeof n.body !== 'string') issues.push(`Note body must be a string in ${t.id}`);
      }
    }
    if (!Array.isArray(s.questions) || !s.questions.length) issues.push('At least one question is required');
    const localIds = new Set();
    for (const q of s.questions || []) {
      if (!q || !nonempty(q.id)) { issues.push('Question needs an id'); continue; }
      if (knownQuestions.has(q.id) || localIds.has(q.id)) issues.push(`Duplicate question id: ${q.id}`);
      localIds.add(q.id);
      if (!topicIds.has(q.topic)) issues.push(`${q.id}: topic does not exist`);
      if (!['recall', 'application', 'analysis'].includes(q.difficulty)) issues.push(`${q.id}: invalid difficulty`);
      if (!nonempty(q.stem) || !nonempty(q.explanation)) issues.push(`${q.id}: stem and explanation are required`);
      if (!Array.isArray(q.options) || q.options.length < 2 || q.options.length > 5 || !q.options.every(nonempty)) issues.push(`${q.id}: needs 2–5 non-empty options`);
      else {
        if (new Set(q.options).size !== q.options.length) issues.push(`${q.id}: duplicate options`);
        if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= q.options.length) issues.push(`${q.id}: answer out of range`);
      }
      if (q.mustGet !== undefined && typeof q.mustGet !== 'boolean') issues.push(`${q.id}: mustGet must be boolean`);
    }
    return issues;
  }
  window.registerSection = s => {
    const issues = validate(s);
    if (issues.length) throw new Error(issues.join('; '));
    knownSections.add(s.id);
    s.coreQuestionIds = s.questions.map(q => q.id);
    s.questions.forEach(q => { knownQuestions.add(q.id); knownStems.add(normalizeStem(q.stem)); });
    revision++;
    sections.push(s);
  };
  window.registerQuestionBatch = batch => {
    const issues = [], ids = new Set(), stems = new Set();
    if (!batch || !nonempty(batch.id) || !nonempty(batch.title)) throw new Error('Batch id and title are required');
    if (batches.some(b => b.id === batch.id)) throw new Error('Duplicate batch id');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(batch.publishedOn || '') || Number.isNaN(Date.parse(batch.publishedOn)) || new Date(batch.publishedOn).toISOString().slice(0, 10) !== batch.publishedOn) issues.push('Invalid batch publishedOn');
    if (!Array.isArray(batch.questions) || batch.questions.length !== 50) throw new Error('Each batch must contain exactly 50 questions');
    for (const q of batch.questions) {
      const section = sections.find(s => s.id === q?.section);
      if (!section) { issues.push('Question section does not exist'); continue; }
      // Reuse the same question validator without treating the existing section as a duplicate.
      issues.push(...validate({ ...section, id: 'batch-validation-' + batch.id, questions: [q] }));
      if (ids.has(q.id)) issues.push('Duplicate question id: ' + q.id);
      ids.add(q.id);
      if (nonempty(q.stem)) {
        const stem = normalizeStem(q.stem);
        if (stems.has(stem) || knownStems.has(stem)) issues.push('Duplicate question stem: ' + q.id);
        stems.add(stem);
      }
      if (!Array.isArray(q.sourcePages) || !q.sourcePages.length || !q.sourcePages.every(n => Number.isInteger(n) && n >= section.sourcePages[0] && n <= section.sourcePages[1])) issues.push(q.id + ': sourcePages must identify pages in its chapter');
      if (q.mustGet) issues.push('Batch questions cannot change the foundation Boss set');
    }
    if (issues.length) throw new Error(issues.join('; '));
    // Only commit after the entire release passes validation.
    batch.questions.forEach(q => {
      q.batchId = batch.id;
      sections.find(s => s.id === q.section).questions.push(q);
      knownQuestions.add(q.id); knownStems.add(normalizeStem(q.stem));
    });
    batches.push(batch); revision++;
  };
  window.OATContent = {
    sections, batches, errors, validate,
    get revision() { return revision; },
    latestBatch() { return [...batches].sort((a, b) => b.publishedOn.localeCompare(a.publishedOn) || b.id.localeCompare(a.id))[0] || null; },
    async load() {
      const manifest = window.SECTION_MANIFEST;
      if (!Array.isArray(manifest) || !manifest.length) { errors.push('The section manifest could not be loaded.'); return; }
      for (const filename of manifest) {
        if (typeof filename !== 'string' || !/^[a-zA-Z0-9_-]+\.js$/.test(filename)) { errors.push('Invalid manifest filename.'); continue; }
        const before = sections.length;
        await new Promise(resolve => {
          const script = document.createElement('script');
          script.src = 'sections/' + filename;
          script.onload = () => { if (sections.length !== before + 1) errors.push(`${filename}: could not register a valid section.`); resolve(); };
          script.onerror = () => { errors.push(`${filename}: could not load section.`); resolve(); };
          document.head.append(script);
        });
      }
      const bankManifest = window.QUESTION_BANK_MANIFEST;
      if (!Array.isArray(bankManifest) || !bankManifest.length) { errors.push('The question bank manifest could not be loaded.'); return; }
      for (const filename of bankManifest) {
        if (typeof filename !== 'string' || !/^[a-zA-Z0-9_-]+\.js$/.test(filename)) { errors.push('Invalid bank filename'); continue; }
        const before = batches.length;
        await new Promise(resolve => {
          const script = document.createElement('script'); script.src = 'bank/' + filename;
          script.onload = () => { if (batches.length !== before + 1) errors.push(filename + ': invalid question batch'); resolve(); };
          script.onerror = () => { errors.push(filename + ': could not load question batch'); resolve(); };
          document.head.append(script);
        });
      }
    }
  };
})();
