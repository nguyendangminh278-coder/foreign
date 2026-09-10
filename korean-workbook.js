// Shared, device-local exercise surface. Written answers stay only in this page session.
(() => {
  const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const clean = (v) => String(v).normalize('NFC').replace(/[.!?。！？\s]/g, '').toLowerCase();
  const sessions = new Map();
  const audio = (text) => `<button type="button" class="ko5-speak" data-speak-ko="${esc(text)}">Nghe</button>`;
  const annotated = (s) => `<div class="ko5-line"><strong lang="ko">${esc(s.text)}</strong><span class="ko5-roma">${esc(s.romanization)}</span><p>${esc(s.meaning)}</p>${audio(s.text)}</div>`;
  function mount(root, data, key) {
    const state = sessions.get(key) || { section: 0, question: 0, answers: new Map() };
    sessions.set(key, state);
    const entry = () => {
      const id = `${state.section}:${state.question}`;
      if (!state.answers.has(id)) state.answers.set(id, { draft: '', chosen: [], checked: false });
      return state.answers.get(id);
    };
    function render() {
      const section = data.sections[state.section], q = section.items[state.question], a = entry();
      const finished = section.items.filter((_, i) => state.answers.get(`${state.section}:${i}`)?.checked).length;
      const scored = ['choice', 'exact'].includes(section.type);
      const right = section.items.filter((_, i) => state.answers.get(`${state.section}:${i}`)?.correct).length;
      root.innerHTML = `<div class="kwb"><div class="kwb-controls"><label>Dạng bài<select data-kwb-section>${data.sections.map((s,i) => `<option value="${i}" ${i === state.section ? 'selected' : ''}>${esc(s.title)} · ${s.items.length} câu</option>`).join('')}</select></label><label>Câu<select data-kwb-question>${section.items.map((_,i) => `<option value="${i}" ${i === state.question ? 'selected' : ''}>${i+1} / ${section.items.length}</option>`).join('')}</select></label></div><p class="ko5-note">${esc(section.note)}</p><p class="ko5-muted" data-kwb-score aria-live="polite">Đã ${scored ? 'làm' : 'đối chiếu'} ${finished}/${section.items.length}${scored ? ` · Đúng ${right}/${section.items.length}` : ''}</p><article class="kwb-question"><span class="ko5-tag">CÂU ${state.question+1} / ${section.items.length}</span><h4>${esc(q.prompt)}</h4>${q.promptRomanization ? `<p class="ko5-roma">${esc(q.promptRomanization)}</p>` : ''}${q.meaning ? `<p>${esc(q.meaning)}</p>` : ''}${q.image ? `<img class="kwb-source-image" src="${esc(q.image)}" alt="${esc(q.imageAlt || 'Hình tham khảo của bài tập')}">` : ''}
        ${section.type === 'choice' ? `<div class="kwb-options">${q.options.map((o,i) => `<button type="button" data-kwb-choice="${i}" ${a.checked ? 'disabled' : ''} class="${a.checked && q.answers.includes(o.text) ? 'correct' : a.checked && a.selected === o.text ? 'incorrect' : ''}"><b lang="ko">${esc(o.text)}</b><small>${esc(o.romanization || '')}</small>${o.meaning ? `<span>${esc(o.meaning)}</span>` : ''}</button>`).join('')}</div>` : section.type === 'order' ? `<div class="kwb-built" aria-label="Câu đang ghép">${a.chosen.length ? a.chosen.map((id,i) => `<button type="button" data-kwb-remove="${i}"><b>${esc(q.tokens[id])}</b><small>${esc(q.tokenRoma[id])}</small></button>`).join('') : '<span>Chọn mảnh từ bên dưới…</span>'}</div><div class="kwb-options">${q.tokens.map((token,i) => `<button type="button" data-kwb-token="${i}" ${a.chosen.includes(i) ? 'disabled' : ''}><b>${esc(token)}</b><small>${esc(q.tokenRoma[i])}</small></button>`).join('')}</div>` : `<label class="ko5-label" for="${key}-answer">${section.type === 'exact' ? 'Dạng lịch sự của bạn' : 'Câu của bạn'}</label><textarea id="${key}-answer" data-kwb-draft rows="3" lang="ko" placeholder="Gõ tiếng Hàn…">${esc(a.draft)}</textarea>`}
        ${section.type !== 'choice' ? `<button class="primary-button" type="button" data-kwb-check ${section.type === 'order' && a.chosen.length !== q.tokens.length ? 'disabled' : ''}>${scored ? 'Kiểm tra' : 'Đối chiếu câu mẫu'}</button>` : ''}
        <div class="kwb-feedback" aria-live="polite">${a.checked ? `<p class="ko5-feedback">${scored ? (a.correct ? 'Đúng rồi!' : 'Chưa đúng. Xem giải thích bên dưới rồi thử lại.') : q.alreadyCorrect ? 'Câu trong đề đã đúng, không cần sửa.' : 'Đây là một câu mẫu để đối chiếu, không phải đáp án duy nhất.'}</p>${annotated(q.samples?.[a.selected] || q.sample)}<p>${esc(q.explanation || '')}</p>` : ''}</div></article>
        <div class="kwb-bottom"><button class="secondary-button" type="button" data-kwb-prev ${state.question === 0 ? 'disabled' : ''}>← Câu trước</button><button class="secondary-button" type="button" data-kwb-reset>Làm lại dạng này</button><button class="secondary-button" type="button" data-kwb-next ${state.question === section.items.length-1 ? 'disabled' : ''}>Câu tiếp →</button></div><p class="ko5-muted">Bài làm được giữ khi đổi dạng trong phiên này; tải lại trang sẽ bắt đầu lại. Âm thanh là giọng tổng hợp của trình duyệt.</p></div>`;
    }
    root.onclick = (event) => {
      const b = event.target.closest('button'); if (!b || !root.contains(b)) return;
      const section = data.sections[state.section], q = section.items[state.question], a = entry();
      if (b.hasAttribute('data-kwb-choice')) { a.selected = q.options[Number(b.dataset.kwbChoice)].text; a.correct = q.answers.includes(a.selected); a.checked = true; }
      else if (b.hasAttribute('data-kwb-token')) { a.chosen.push(Number(b.dataset.kwbToken)); a.checked = false; }
      else if (b.hasAttribute('data-kwb-remove')) { a.chosen.splice(Number(b.dataset.kwbRemove),1); a.checked = false; }
      else if (b.hasAttribute('data-kwb-check')) { a.checked = true; a.correct = section.type === 'exact' && q.answers.some((answer) => clean(answer) === clean(a.draft)); }
      else if (b.hasAttribute('data-kwb-next')) state.question = Math.min(section.items.length-1,state.question+1);
      else if (b.hasAttribute('data-kwb-prev')) state.question = Math.max(0,state.question-1);
      else if (b.hasAttribute('data-kwb-reset')) section.items.forEach((_,i) => state.answers.delete(`${state.section}:${i}`));
      else return;
      render();
    };
    root.onchange = (event) => {
      if (event.target.hasAttribute('data-kwb-section')) { state.section = Number(event.target.value); state.question = 0; render(); }
      if (event.target.hasAttribute('data-kwb-question')) { state.question = Number(event.target.value); render(); }
    };
    root.oninput = (event) => { if (event.target.hasAttribute('data-kwb-draft')) { entry().draft = event.target.value; entry().checked = false; root.querySelector('.kwb-feedback').innerHTML = ''; } };
    render();
  }
  window.KoreanWorkbook = { mount };
})();
