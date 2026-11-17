(function () {
  'use strict';
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const C = window.OATContent;
  const date = value => new Date(value + 'T12:00:00').toLocaleDateString(undefined, {month:'long', day:'numeric', year:'numeric'});
  const batchPath = id => '#/bank?batch=' + encodeURIComponent(id);
  function banner() {
    const b=C.latestBatch();
    return b ? `<section class="panel bank-banner"><div><div class="eyebrow muted">FRESH PRACTICE</div><h3 style="margin-top:10px">50 new questions, every two days</h3><p>Latest release: ${esc(date(b.publishedOn))}. Explore the new set and every previous batch.</p></div><a class="btn" href="${batchPath(b.id)}">Open Question Bank →</a></section>` : '';
  }
  function bank(query) {
    const id=query.get('batch'), b=id ? C.batches.find(x=>x.id===id) : C.latestBatch();
    if(!b) throw new Error('This question batch could not be found.');
    const unseen=b.questions.filter(q=>window.OATProgress.mastery(q.id)===0).length;
    const all=C.batches.reduce((n,x)=>n+x.questions.length,0);
    const archives=[...C.batches].sort((a,b)=>b.publishedOn.localeCompare(a.publishedOn));
    return `<a class="breadcrumb" href="#/">← Back to your learning path</a><section class="hero"><div class="eyebrow">YOUR GROWING QUESTION BANK</div><h1>Biology question bank</h1><p>${all} additional questions · ${C.batches.length} release${C.batches.length===1?'':'s'} · earlier questions stay available.</p></section><div class="section-heading"><h2>${esc(b.title)}</h2><span class="small">${esc(date(b.publishedOn))}</span></div><p>${b.questions.length} questions across ${new Set(b.questions.map(q=>q.section)).size} chapters · ${unseen} unseen.</p><div class="mode-grid"><div class="mode-card primary-mode"><span class="pill">FRESH 10</span><h3>Practice 10 questions</h3><p>Unseen questions come first. Once you’ve tried them, revisit mistakes and weaker ideas.</p><button class="btn" data-action="start" data-mode="bank" data-batch="${esc(b.id)}">Practice 10 →</button></div><div class="mode-card"><span class="pill">COMPLETE BATCH</span><h3>Practice the full release</h3><p>Every question in this release, with explanations and source-page references.</p><button class="btn secondary" data-action="start" data-mode="bank-full" data-batch="${esc(b.id)}">Practice all 50 →</button></div></div><section class="panel"><h3>Choose a release</h3><label for="bank-release" class="small">Latest and archived batches</label><select id="bank-release" data-action="bank-select">${archives.map(x=>`<option value="${esc(x.id)}" ${x.id===b.id?'selected':''}>${esc(date(x.publishedOn))} · ${x.questions.length} questions</option>`).join('')}</select><p class="small muted">Your saved answers, XP, and mistakes remain attached to the same questions when another batch arrives.</p></section><section class="panel"><h3>What’s in this batch</h3><div class="bank-chapters">${C.sections.map(s=>{const count=b.questions.filter(q=>q.section===s.id).length;return count?`<a href="#/s/${encodeURIComponent(s.id)}?tab=practice">${esc(s.title)} <span class="mono">${count}</span></a>`:'';}).join('')}</div></section>`;
  }
  function reader(s, requestedPage, standalone=false) {
    const book=window.OATSourceBook;
    if(!book?.pages?.length) return '<p class="error-note">The chapter reader could not load. <a href="source/bio-notes.pdf" target="_blank" rel="noopener">Open the original PDF</a>.</p>';
    const start=s?.sourcePages[0] || 1,end=s?.sourcePages[1] || book.pageCount;
    let page=Number(requestedPage);if(!Number.isInteger(page)||page<start||page>end)page=start;
    const item=book.pages[page-1];
    const url=n=>s ? '#/s/'+encodeURIComponent(s.id)+'?page='+n : '#/source?page='+n;
    const body=`<p class="small muted">All original explanations, examples, tables, and labelled figures. The text view below helps with searching and copying; the original page preserves the layout.</p><div class="source-controls"><label for="source-page">Page</label><select id="source-page" data-action="source-page" data-section="${esc(s?.id || '')}">${Array.from({length:end-start+1},(_,i)=>start+i).map(n=>`<option value="${n}" ${n===page?'selected':''}>${n} of ${book.pageCount}</option>`).join('')}</select><span class="small muted">${s ? 'Chapter pages '+start+'–'+end : 'Complete sourcebook'}</span></div><nav class="source-pagination" aria-label="Source pages">${page>start?`<a class="btn small secondary" href="${url(page-1)}">← Previous page</a>`:'<span></span>'}${page<end?`<a class="btn small secondary" href="${url(page+1)}">Next page →</a>`:'<span></span>'}</nav><figure class="source-figure"><a href="${esc(item.image)}" target="_blank" rel="noopener" aria-label="Open source page ${page} at full size"><img src="${esc(item.image)}" width="${item.width}" height="${item.height}" loading="lazy" alt="Original Bio notes page ${page}, including diagrams and tables. A full text view follows." /></a><figcaption>Bio notes · page ${page}. Tap the page to zoom.</figcaption></figure><details class="source-transcript"><summary>Read page ${page} as text</summary><pre>${esc(item.text)}</pre></details><nav class="source-pagination" aria-label="Continue reading">${page>start?`<a class="btn small secondary" href="${url(page-1)}">← Previous page</a>`:'<span></span>'}${page<end?`<a class="btn small secondary" href="${url(page+1)}">Next page →</a>`:'<span></span>'}</nav>`;
    return standalone ? `<section class="panel source-reader" id="source-reader">${body}</section>` : `<details class="topic-card source-reader" id="source-reader" ${requestedPage?'open':''}><summary><span class="topic-number">▤</span><h3>Read the complete chapter</h3><span class="chevron" aria-hidden="true">⌄</span></summary><div class="topic-body">${body}</div></details>`;
  }
  function sourceBook(query) {
    return `<a class="breadcrumb" href="#/">← Back to your learning path</a><section class="hero section-hero"><div class="eyebrow">ALL 136 ORIGINAL PAGES</div><h1>The complete biology sourcebook.</h1><p>Read every chapter, table, and diagram right here.</p><p><a class="btn ghost small" href="source/bio-notes.pdf" target="_blank" rel="noopener">Open original PDF ↗</a></p></section>${reader(null,query.get('page'),true)}`;
  }
  window.OATStudyExtras={banner,bank,reader,sourceBook};
})();
