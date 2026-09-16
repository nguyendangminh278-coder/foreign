(() => {
  'use strict';
  const app=document.querySelector('#koreanApp'),d=window.KOREAN_LESSON_SEVEN;
  if(!app||!d||app.querySelector('#ko-lesson-7'))return;
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const speak=text=>`<button class="ko5-speak" type="button" data-speak-ko="${esc(text)}" aria-label="Nghe ${esc(text)}"><i data-lucide="volume-2"></i>Nghe</button>`;
  const line=s=>`<div class="ko5-line"><strong lang="ko">${esc(s.text)}</strong><span class="ko5-roma">${esc(s.romanization)}</span><p>${esc(s.meaning)}</p>${speak(s.text)}</div>`;
  const icons=()=>window.lucide?.createIcons?.();
  const sections=[['vocab','Từ vựng'],['grammar','Ngữ pháp'],['week','Lịch tuần'],['reading','Đọc & nghe'],['practice','Luyện tập'],['slides','Theo slide']];
  const heading=(n,title,note)=>`<header class="ko5-section-head"><div><span class="ko5-number">${n}</span><h3>${title}</h3></div><p>${note}</p></header>`;
  const count=d.workbook.sections.reduce((n,s)=>n+s.items.length,0);
  const source=(page,title)=>`<button class="secondary-button" type="button" data-open-ko-slide="assets/korean/lesson-7/slides/slide-${String(page).padStart(2,'0')}.jpg" data-ko-slide-title="Bài 7 · Trang ${page} · ${esc(title)}">Xem trang ${page} gốc ↗</button>`;
  app.querySelector('[data-korean-tab="ko-lesson-vocab"]').insertAdjacentHTML('beforebegin','<button class="course-tab" type="button" data-korean-tab="ko-lesson-7" data-open-korean-tab="ko-lesson-7"><i data-lucide="calendar-days"></i><span>Bài 7</span></button>');
  app.querySelector('.course-header .brand p').textContent='Bảng chữ cái nền tảng · Bài 1–7: giới thiệu, hoạt động, vị trí và lịch tuần';
  app.querySelector('.header-stats > div strong').textContent='7';
  const stat=app.querySelectorAll('.header-stats > div strong')[2];
  stat.textContent=String(Number(stat.textContent)+count);
  app.querySelector('#ko-overview .korean-path-grid')?.insertAdjacentHTML('beforeend',`<article class="korean-path-card ko5-path"><span class="path-number">BÀI 07 · 31 TRANG</span><div class="path-glyph" aria-hidden="true">🗓️</div><div><p class="eyebrow">Thứ trong tuần · thời gian · đích đến</p><h3>${esc(d.title)}</h3><p>${esc(d.romanization)}</p><p>${esc(d.meaning)}</p><button type="button" class="lesson-review-button" data-open-korean-tab="ko-lesson-7">Học Bài 7</button></div></article>`);
  app.querySelector('#ko-lesson-vocab').insertAdjacentHTML('beforebegin',`<section class="course-view lesson-three-view ko5 ko7" id="ko-lesson-7">
    <div class="section-head"><div><p class="eyebrow">Sổ học tiếng Hàn / Bài 07</p><h2>Một tuần của bạn</h2><p class="section-subtitle">${esc(d.title)}<br>${esc(d.romanization)} · ${esc(d.meaning)}</p></div><button class="secondary-button" type="button" data-ko7-complete>Đánh dấu đã học</button></div>
    <div class="ko7-intro"><span>31 trang tài liệu</span><span>30 mục từ bảng gốc</span><span>${count} câu luyện</span><button class="secondary-button" type="button" data-ko7-jump="week">Tạo lịch bằng tiếng Hàn →</button></div>
    <nav class="lesson-three-jumpbar ko5-jumpbar ko7-jumpbar" aria-label="Nội dung Bài 7">${sections.map(([id,title],i)=>`<button type="button" data-ko7-jump="${id}"><span>0${i+1}</span>${title}</button>`).join('')}</nav>
    <section class="ko5-section" id="ko7-vocab">${heading('01','Từ vựng cho một tuần','Trang 3–8 · Nhóm hỗ trợ lấy từ các trang đọc và luyện tập, không mở rộng tự động ra ngoài PDF.')}
      <div class="ko5-toolbar"><label class="lesson-search-field"><i data-lucide="search"></i><input type="search" id="ko7-search" aria-label="Tìm từ Bài 7" placeholder="Tìm chữ Hàn, phiên âm, nghĩa…"></label><div class="ko5-filters">${[['all','Tất cả'],['days','Thứ · 7'],['time','Buổi · 5'],['places','Địa điểm · 6'],['routine','Sinh hoạt · 12'],['support','Hỗ trợ · 13']].map(([id,title])=>`<button type="button" data-ko7-filter="${id}" aria-pressed="${id==='all'}">${title}</button>`).join('')}</div></div><p class="ko5-muted" id="ko7-vocab-count" aria-live="polite"></p><div class="ko5-vocab-grid" id="ko7-vocab-grid"></div>
      <p class="ko5-note">30 mục bảng gốc không đồng nghĩa với 30 từ mới: từ đã học có nhãn ôn tập. Phiên âm hỗ trợ đọc; hãy bấm nghe và đối chiếu Naver khi cần.</p>
    </section>
    <section class="ko5-section" id="ko7-grammar">${heading('02','Đi đâu, vào lúc nào?','Hai cách dùng 에 trong bài; nối với lịch lặp lại và các mốc thời gian.')}
      <div class="ko7-grammar-grid">${d.grammar.map(g=>`<article class="ko5-grammar-card"><h4>${esc(g.title)}</h4><div class="ko5-rule"><strong>${esc(g.formula)}</strong><span class="ko5-roma">${esc(g.romanization)}</span></div><p>${esc(g.explanation)}</p>${g.examples.map(line).join('')}</article>`).join('')}</div>
      <div class="ko7-compare"><article><span class="ko5-tag">ĐÍCH ĐẾN</span>${line({text:'도서관에 가요.',romanization:'Doseogwane gayo.',meaning:'Đi đến thư viện.'})}</article><article><span class="ko5-tag">NƠI HÀNH ĐỘNG · ÔN BÀI 5</span>${line({text:'도서관에서 책을 읽어요.',romanization:'Doseogwaneseo chaegeul ilgeoyo.',meaning:'Đọc sách ở thư viện.'})}</article></div>
      <details class="ko5-details"><summary>Ôn kiến thức cũ & lưu ý đối chiếu PDF</summary>${d.sourceNotes.map(n=>`<p>${esc(n)}</p>`).join('')}<div class="ko7-actions"><button class="secondary-button" type="button" data-open-korean-tab="ko-lesson-5">Bài 5 · nơi hành động</button><button class="secondary-button" type="button" data-open-korean-tab="ko-lesson-6">Bài 6 · vị trí tồn tại</button></div></details>
    </section>
    <section class="ko5-section" id="ko7-week">${heading('03','Chạm một ngày, ghép một câu','Phỏng theo trang 16, 21, 25–27 · Chọn trong từ của bài. Luyện lịch thường lệ, chưa dùng thì quá khứ.')}
      <div class="ko7-weekdays" role="group" aria-label="Chọn thứ trong tuần">${d.days.map((s,i)=>`<button type="button" data-ko7-day="${i}" aria-pressed="${i===0}"><small>${esc(s.meaning)}</small><strong lang="ko">${esc(s.text)}</strong><span>${esc(s.romanization)}</span><b aria-hidden="true">${['🌤️','🌷','🌿','🫧','🍑','📚','☁️'][i]}</b></button>`).join('')}</div>
      <div class="ko7-planner"><div class="ko7-controls"><label>Buổi trong ngày<select id="ko7-period">${d.periods.map((p,i)=>`<option value="${i}">${p.text?`${esc(p.text)} · ${esc(p.romanization)} · `:''}${esc(p.meaning)}</option>`).join('')}</select></label><label>Địa điểm & hoạt động<select id="ko7-routine">${d.routines.map(r=>`<option value="${r.id}">${esc(r.place)} · ${esc(r.placeRoma)} · ${esc(r.placeMeaning)}</option>`).join('')}</select></label><label>Đi đến hay làm tại đó?<select id="ko7-mode"><option value="go">에 가요 · e gayo · Đi đến…</option><option value="do">에서 · eseo · Làm tại…</option></select></label><p class="ko5-note">Bật “Làm tại…” để thấy tiểu từ chuyển từ <b>에</b> (e · đến) sang <b>에서</b> (eseo · tại nơi hành động).</p></div><div id="ko7-built" class="ko7-built" aria-live="polite"></div></div>
      <details class="ko5-details"><summary>Lịch Minsu & cách hỏi bạn · trang 24–27</summary><p>Quan sát tranh ở trang 24, rồi hỏi ngày đi bơi. Dùng lịch phía trên để luyện tiếp theo lịch của chính bạn, không coi lịch tự chọn là đáp án của Minsu.</p>${source(24,'Lịch của Minsu')}${line({text:'민수는 언제 수영장에 가요?',romanization:'Minsuneun eonje suyeongjange gayo?',meaning:'Khi nào Minsu đến bể bơi?'})}${line({text:'월요일하고 수요일에 수영장에 가요.',romanization:'Woryoil hago suyoire suyeongjange gayo.',meaning:'Minsu đến bể bơi vào thứ hai và thứ tư.'})}${line({text:'오전에 학교에 가요. 그리고 오후에는 집에 있어요.',romanization:'Ojeone hakgyoe gayo. Geurigo ohueneun jibe isseoyo.',meaning:'Buổi sáng tôi đến trường. Và buổi chiều tôi ở nhà.'})}</details>
      <div class="ko7-speaking"><div><span class="ko5-tag">TRANG 31 · THẺ LUYỆN NÓI</span><h4>Nói trước, xem mẫu sau</h4><p class="ko5-muted">Chuyển câu hỏi từ trò chơi bàn cờ thành 5 thẻ tự luyện. Câu mẫu là gợi ý; hãy đổi theo bản thân.</p></div><div id="ko7-speaking-card" aria-live="polite"></div><div class="ko7-actions"><button type="button" class="secondary-button" id="ko7-reveal" aria-expanded="false">Xem câu mẫu</button><button type="button" class="secondary-button" id="ko7-next-card">Thẻ tiếp →</button>${source(31,'Trò chơi theo nhóm')}</div></div>
    </section>
    <section class="ko5-section" id="ko7-reading">${heading('04','Một tuần của gia đình Noa','Trang 18 · 14 câu. Nghe từng câu, đọc phiên âm và thử ẩn nghĩa tiếng Việt.')}
      <div class="ko5-reading-toolbar"><span class="ko5-tag">LỊCH GIA ĐÌNH</span><button type="button" class="secondary-button" id="ko7-translation" aria-pressed="true">Ẩn nghĩa để tự đọc</button></div><div class="ko5-dialogue" id="ko7-dialogue">${d.reading.map((s,i)=>`<article><span class="ko5-number">${i+1}</span>${line(s)}</article>`).join('')}</div>
      <details class="ko5-details"><summary>Khu phố của chúng tôi · trang 28–30</summary><p>Dùng tranh gốc để gọi tên địa điểm, rồi cùng bạn lập bảng “đi đâu / khi nào”. Năm câu dưới đây là bài giới thiệu mẫu trong PDF.</p>${source(29,'Khu phố của nhóm')}${d.community.map(line).join('')}</details>
    </section>
    <section class="ko5-section" id="ko7-practice">${heading('05','Tự làm, nhận giải thích','41 câu · Ghép câu, sửa lỗi, chọn tiểu từ, tự viết và đọc hiểu. Câu mở chỉ đối chiếu mẫu.')}
      <div id="ko7-workbook"></div>
    </section>
    <section class="ko5-section" id="ko7-slides">${heading('06','Theo từng trang PDF','Đủ 31 trang nguồn, có nút phóng to và lối tắt về phần học tương ứng.')}
      <label class="ko5-label" for="ko7-slide-filter">Lọc nội dung</label><select id="ko7-slide-filter"><option value="all">Tất cả 31 trang</option>${sections.filter(([id])=>id!=='slides').map(([id,title])=>`<option value="${id}">${title}</option>`).join('')}</select><p class="ko5-muted" id="ko7-slide-count" aria-live="polite"></p><div class="ko5-slide-grid" id="ko7-slide-grid"></div>
    </section></section>`);
  const view=app.querySelector('#ko-lesson-7'),$=s=>view.querySelector(s);
  let group='all',day=0,speakingIndex=0,revealed=false;
  const normalize=s=>String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d');
  function renderWords(){
    const query=normalize($('#ko7-search').value),words=d.vocabulary.filter(w=>(group==='all'||w.group===group)&&normalize(`${w.text} ${w.romanization} ${w.meaning}`).includes(query));
    $('#ko7-vocab-count').textContent=`${words.length} / ${d.vocabulary.length} mục · 30 mục bảng gốc + 13 mục hỗ trợ đọc và luyện`;
    $('#ko7-vocab-grid').innerHTML=words.length?words.map(w=>`<article class="ko5-word"><header><span class="ko5-word-emoji" aria-hidden="true">${w.emoji}</span><span>Trang ${w.page}${w.review?` · Ôn Bài ${w.review}`:''}</span>${speak(w.text)}</header><h4 lang="ko">${esc(w.text)}</h4><span class="ko5-roma">${esc(w.romanization)}</span><p>${esc(w.meaning)}</p><a class="ko5-naver" target="_blank" rel="noopener noreferrer" href="https://korean.dict.naver.com/kovidict/#/search?query=${encodeURIComponent(w.text)}">Tra Naver ↗</a></article>`).join(''):'<p class="empty-state">Không tìm thấy. Thử đổi nhóm hoặc từ khóa.</p>';
    view.querySelectorAll('[data-ko7-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.ko7Filter===group)));icons();
  }
  function renderBuilt(){
    const mode=$('#ko7-mode').value,s=d.buildRoutine(day,Number($('#ko7-period').value),$('#ko7-routine').value,mode);
    $('#ko7-built').innerHTML=`<span class="ko7-scene" aria-hidden="true">${s.routine.emoji}</span><span class="ko5-tag">CÂU CỦA BẠN · ${esc(d.days[day].meaning)}</span>${line(s)}<p class="ko5-note">${mode==='go'?'Đích đến → 에 (e) + 가요 (gayo · đi).':'Nơi diễn ra hoạt động → 에서 (eseo).'} Thời gian → ${esc(s.when)} (${esc(s.whenRoma)}).</p>`;
    view.querySelectorAll('[data-ko7-day]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.ko7Day)===day)));icons();
  }
  function renderSpeaking(){
    const card=d.speaking[speakingIndex];
    $('#ko7-speaking-card').innerHTML=`<span class="ko5-muted">Thẻ ${speakingIndex+1} / ${d.speaking.length}</span>${line(card.question)}${revealed?`<div class="ko7-answer"><span class="ko5-tag">MẪU THAM KHẢO</span>${line(card.answer)}</div>`:''}`;
    $('#ko7-reveal').setAttribute('aria-expanded',String(revealed));$('#ko7-reveal').textContent=revealed?'Ẩn câu mẫu':'Xem câu mẫu';icons();
  }
  function renderSlides(){
    const filter=$('#ko7-slide-filter').value,slides=d.slides.filter(s=>filter==='all'||s.target===filter);
    $('#ko7-slide-count').textContent=`${slides.length} / 31 trang`;
    $('#ko7-slide-grid').innerHTML=slides.map(s=>`<article class="ko5-slide"><button class="lesson-slide-preview" type="button" data-open-ko-slide="assets/korean/lesson-7/slides/slide-${String(s.page).padStart(2,'0')}.jpg" data-ko-slide-title="Bài 7 · Trang ${s.page} · ${esc(s.title)}"><img src="assets/korean/lesson-7/slides/slide-${String(s.page).padStart(2,'0')}.jpg" width="1500" height="844" loading="lazy" alt="Trang ${s.page}: ${esc(s.title)}"><span>Phóng to trang gốc ↗</span></button><div class="ko5-slide-body"><span class="ko5-tag">Trang ${s.page}/31</span><h4>${esc(s.title)}</h4><p>${esc(s.summary)}</p><div class="ko5-slide-words">${s.words.map(id=>{const w=d.words[id];return `<div><strong lang="ko">${esc(w.text)}</strong><small>${esc(w.romanization)}</small><span>${esc(w.meaning)}</span></div>`;}).join('')}</div><button class="secondary-button" type="button" data-ko7-jump="${s.target}">Học phần này ↑</button></div></article>`).join('');
  }
  function complete(){let done=false;try{done=localStorage.getItem('hanReview.korean.lesson7.completed')==='true';}catch{}const b=$('[data-ko7-complete]');b.textContent=done?'✓ Đã học Bài 7':'Đánh dấu đã học';b.setAttribute('aria-pressed',String(done));window.updateKoreanProgress?.();}
  view.addEventListener('input',e=>{if(e.target.id==='ko7-search')renderWords();});
  view.addEventListener('change',e=>{if(['ko7-period','ko7-routine','ko7-mode'].includes(e.target.id))renderBuilt();if(e.target.id==='ko7-slide-filter')renderSlides();});
  view.addEventListener('click',e=>{
    const b=e.target.closest('button');if(!b)return;
    if(b.dataset.ko7Filter){group=b.dataset.ko7Filter;renderWords();}
    if(b.hasAttribute('data-ko7-day')){day=Number(b.dataset.ko7Day);renderBuilt();}
    if(b.dataset.ko7Jump)$('#ko7-'+b.dataset.ko7Jump)?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
    if(b.id==='ko7-reveal'){revealed=!revealed;renderSpeaking();}
    if(b.id==='ko7-next-card'){speakingIndex=(speakingIndex+1)%d.speaking.length;revealed=false;renderSpeaking();}
    if(b.id==='ko7-translation'){const hide=$('#ko7-dialogue').classList.toggle('ko5-hide-meaning');b.textContent=hide?'Hiện nghĩa tiếng Việt':'Ẩn nghĩa để tự đọc';b.setAttribute('aria-pressed',String(!hide));}
    if(b.hasAttribute('data-ko7-complete')){try{const key='hanReview.korean.lesson7.completed';localStorage.setItem(key,String(localStorage.getItem(key)!=='true'));complete();}catch{b.textContent='Trình duyệt đang chặn lưu tiến độ';}}
  });
  let frame=0;window.addEventListener('scroll',()=>{if(frame||!view.classList.contains('active'))return;frame=requestAnimationFrame(()=>{frame=0;let active=sections[0][0];const top=$('.ko7-jumpbar').getBoundingClientRect().bottom+30;sections.forEach(([id])=>{if($('#ko7-'+id).getBoundingClientRect().top<=top)active=id;});view.querySelectorAll('.ko7-jumpbar button').forEach(b=>{const current=b.dataset.ko7Jump===active;b.classList.toggle('active',current);if(current)b.setAttribute('aria-current','location');else b.removeAttribute('aria-current');});});},{passive:true});
  window.KoreanWorkbook.mount($('#ko7-workbook'),d.workbook,'ko7-pdf');
  renderWords();renderBuilt();renderSpeaking();renderSlides();complete();icons();
})();
