(() => {
  'use strict';
  const app=document.querySelector('#koreanApp'), d=window.KOREAN_LESSON_SIX;
  if(!app||!d||app.querySelector('#ko-lesson-6')) return;
  const esc=(v)=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const speak=(text)=>`<button class="ko5-speak" type="button" data-speak-ko="${esc(text)}" aria-label="Nghe ${esc(text)}"><i data-lucide="volume-2"></i>Nghe</button>`;
  const line=(s)=>`<div class="ko5-line"><strong lang="ko">${esc(s.text)}</strong><span class="ko5-roma">${esc(s.romanization)}</span><p>${esc(s.meaning)}</p>${speak(s.text)}</div>`;
  const icons=()=>window.lucide?.createIcons?.();
  const sections=[['vocab','Từ vựng'],['grammar','Ngữ pháp'],['lab','Vị trí & ghép câu'],['reading','Đọc & nghe'],['practice','Luyện tập'],['slides','Theo slide']];
  const heading=(n,title,note)=>`<header class="ko5-section-head"><div><span class="ko5-number">${n}</span><h3>${title}</h3></div><p>${note}</p></header>`;
  const wordOptions=(ids)=>ids.map(id=>`<option value="${id}">${esc(d.words[id].text)} · ${esc(d.words[id].romanization)} · ${esc(d.words[id].meaning)}</option>`).join('');
  const objectIds=['book','crayons','cat','dog','pillow','ball','eraser','bag','pencil','glasses','doll'];
  const anchorIds=['desk','bed','chair','shelf','sofa','table','bag','door','window'];
  app.querySelector('[data-korean-tab="ko-lesson-vocab"]').insertAdjacentHTML('beforebegin','<button class="course-tab" type="button" data-korean-tab="ko-lesson-6" data-open-korean-tab="ko-lesson-6"><i data-lucide="map-pin-house"></i><span>Bài 6</span></button>');
  app.querySelector('.course-header .brand p').textContent='Bảng chữ cái nền tảng · Bài 1–6: giới thiệu, hoạt động và vị trí đồ vật';
  app.querySelector('.header-stats > div strong').textContent='6';
  const practiceStat=app.querySelectorAll('.header-stats > div strong')[2];
  practiceStat.textContent=String(Number(practiceStat.textContent)+84+d.workbook.sections.reduce((n,s)=>n+s.items.length,0));
  app.querySelector('#ko-overview .korean-path-grid')?.insertAdjacentHTML('beforeend',`<article class="korean-path-card ko5-path"><span class="path-number">BÀI 06 · 28 TRANG</span><div class="path-glyph" aria-hidden="true">🖍️</div><div><p class="eyebrow">Vị trí đồ vật · 하고 · 에 있어요</p><h3>${esc(d.title)}</h3><p>${esc(d.romanization)}</p><p>${esc(d.meaning)}</p><button type="button" class="lesson-review-button" data-open-korean-tab="ko-lesson-6">Học Bài 6</button></div></article>`);
  app.querySelector('#ko-lesson-vocab').insertAdjacentHTML('beforebegin',`<section class="course-view lesson-three-view ko5 ko6" id="ko-lesson-6">
    <div class="section-head"><div><p class="eyebrow">Sổ học tiếng Hàn / Bài 06</p><h2>Đồ vật ở đâu?</h2><p class="section-subtitle">${esc(d.title)}<br>${esc(d.romanization)} · ${esc(d.meaning)}</p></div><button class="secondary-button" type="button" data-ko6-complete>Đánh dấu đã học</button></div>
    <div class="ko6-intro"><span>28 trang tài liệu</span><span>20 từ ở phần từ vựng</span><span>2 cấu trúc trọng tâm</span><button class="secondary-button" type="button" data-ko6-jump="lab">Thử tìm vị trí đồ vật →</button></div>
    <nav class="lesson-three-jumpbar ko5-jumpbar ko6-jumpbar" aria-label="Nội dung Bài 6">${sections.map(([id,title],i)=>`<button type="button" data-ko6-jump="${id}"><span>0${i+1}</span>${title}</button>`).join('')}</nav>
    <section class="ko5-section" id="ko6-vocab">${heading('01','Từ vựng theo nhóm','Trang 3–7 · Từ mới, từ trong bài đọc và các từ ôn tập được phân biệt rõ.')}
      <div class="ko5-toolbar"><label class="lesson-search-field"><i data-lucide="search"></i><input type="search" id="ko6-search" aria-label="Tìm từ Bài 6" placeholder="Tìm chữ Hàn, phiên âm, nghĩa…"></label><div class="ko5-filters">${[['all','Tất cả'],['position','Vị trí · 8'],['objects','Đồ vật · 12'],['reading','Trong bài đọc · 1'],['review','Ôn tập · 10']].map(([id,title])=>`<button type="button" data-ko6-filter="${id}" aria-pressed="${id==='all'}">${title}</button>`).join('')}</div></div><p class="ko5-muted" id="ko6-vocab-count" aria-live="polite"></p><div class="ko5-vocab-grid" id="ko6-vocab-grid"></div><p class="ko5-note">Phiên âm tiếng Việt chỉ gần đúng. Từ đã học được giữ ở nhóm ôn tập để đọc được câu trong tài liệu, không tính là từ mới.</p>
    </section>
    <section class="ko5-section" id="ko6-grammar">${heading('02','Nối đồ vật và nói vị trí','Trang 8–9 · Giữ tiểu từ đi cùng đúng thành phần của câu.')}
      <div class="ko6-grammar-grid">${d.grammar.map(g=>`<article class="ko5-grammar-card"><h4>${esc(g.title)}</h4><div class="ko5-rule"><strong>${esc(g.formula)}</strong><span class="ko5-roma">${esc(g.romanization)}</span></div><p>${esc(g.explanation)}</p>${g.examples.map(line).join('')}</article>`).join('')}</div>
      <details class="ko5-details"><summary>Ôn bài trước và lưu ý trong tài liệu</summary>${d.sourceNotes.map(n=>`<p>${esc(n)}</p>`).join('')}<button type="button" class="secondary-button" data-open-korean-tab="ko-lesson-5">Ôn 에 / 에서 ở Bài 5</button></details>
    </section>
    <section class="ko5-section" id="ko6-lab">${heading('03','Chạm đồ vật, nghe vị trí','Bức tranh phòng Youngjun ở trang 17. Các nút số tương ứng với đồ vật trong tranh.')}
      <div class="ko6-room-layout"><div class="ko6-room"><img src="assets/korean/lesson-6/youngjun-room.jpg" width="530" height="310" alt="Phòng Youngjun: giường bên trái, kệ sách cạnh giường, bàn ở bên phải; mèo dưới ghế, cún bên phải bàn.">${[[1,60,39,5],[2,78,44,6],[3,71,77,7],[4,89,74,9],[5,50,90,10],[6,44,21,4]].map(([n,x,y,index])=>`<button type="button" style="left:${x}%;top:${y}%" data-ko6-hotspot="${index}" aria-label="Vị trí ${n}: ${esc(d.reading[index].meaning)}">${n}</button>`).join('')}</div><div id="ko6-room-result" aria-live="polite"></div></div>
      <div class="ko6-builder"><h4>Ghép câu của bạn</h4><p class="ko5-muted">Chỉ chọn trong từ của bài. Đây là căn phòng bạn tưởng tượng, không phải chấm theo bức tranh phía trên.</p><div class="ko6-builder-controls"><label>Đồ vật thứ nhất<select id="ko6-object">${wordOptions(objectIds)}</select></label><label>Và đồ vật thứ hai (tùy chọn)<select id="ko6-second"><option value="">Chỉ một đồ vật</option>${wordOptions(objectIds)}</select></label><label>Mốc vị trí<select id="ko6-anchor">${wordOptions(anchorIds)}</select></label><label>Vị trí<select id="ko6-position">${wordOptions(['above','below','front','behind','inside','beside','left','right'])}</select></label></div><div id="ko6-built" aria-live="polite"></div></div>
      <details class="ko5-details"><summary>Vận dụng trang 18, 20–22, 25–26</summary><p>Dùng bộ ghép câu để tả từng vật trong tranh, rồi ghép hai vật bằng 하고 (hago · và). Đổi vai: một bạn hỏi, một bạn trả lời.</p>${line({text:'고양이하고 책이 어디에 있어요?',romanization:'Goyangihago chaegi eodie isseoyo?',meaning:'Mèo và sách ở đâu?'})}${line(d.pairReading[0])}<p>Trò tìm đồ vật: giấu một đồ vật đã học trong phòng, cho bạn hỏi vị trí và nghe gợi ý. Chỉ dùng những nơi an toàn, dễ lấy đồ lại.</p></details>
    </section>
    <section class="ko5-section" id="ko6-reading">${heading('04','Phòng của Youngjun','Trang 17 · Nghe từng đoạn, thử ẩn nghĩa rồi đọc lại.')}
      <div class="ko5-reading-toolbar"><span class="ko5-tag">12 đoạn · trang sách 66</span><button type="button" class="secondary-button" id="ko6-translation" aria-pressed="true">Ẩn nghĩa để tự đọc</button></div><div class="ko5-dialogue" id="ko6-dialogue">${d.reading.map((s,i)=>`<article><span class="ko5-number">${i+1}</span>${line(s)}</article>`).join('')}</div>
      <details class="ko5-details"><summary>Hai người cùng luyện · trang 19, 23–25</summary><p>Đọc các câu dưới đây cho bạn nghe và vẽ vị trí. Đổi vai, bổ sung đồ vật rồi so sánh hai bức tranh. Hai câu đầu dành cho bạn A; hai câu sau dành cho bạn B.</p>${d.pairReading.map(line).join('')}</details>
      <details class="ko5-details"><summary>Đọc tên trên bản đồ · trang 27–28</summary><p>Các nhãn dưới đây được giữ theo sơ đồ trong tài liệu để luyện đọc và vị trí; không dùng sơ đồ này như danh mục hành chính cập nhật. Mở trang gốc trong mục Theo slide để cùng bạn ghép bản đồ.</p><div class="ko5-slide-words">${d.provinces.map(s=>`<div><strong>${esc(s.text)}</strong><small>${esc(s.romanization)}</small><span>${esc(s.meaning)}</span>${speak(s.text)}</div>`).join('')}</div>${line({text:'경기도 아래에 충청남도가 있어요.',romanization:'Gyeonggi-do araee Chungcheongnam-doga isseoyo.',meaning:'Trên sơ đồ, Chungcheongnam-do nằm phía dưới Gyeonggi-do.'})}</details>
    </section>
    <section class="ko5-section" id="ko6-practice">${heading('05','Luyện ngay trên web','44 câu · điền vị trí, tự viết, sửa lỗi, nối tranh và đọc hiểu.')}
      <details class="ko5-details"><summary>Ngân hàng từ cho trang 10</summary><div class="ko5-slide-words">${d.wordBank.map(id=>{const w=d.words[id];return `<div><strong>${esc(w.text)}</strong><small>${esc(w.romanization)}</small><span>${esc(w.meaning)}</span>${speak(w.text)}</div>`;}).join('')}</div></details><div id="ko6-workbook"></div>
    </section>
    <section class="ko5-section" id="ko6-slides">${heading('06','Đối chiếu từng trang tài liệu','Giữ đủ 28 trang. Chữ trong ảnh nguồn có thể chồng nhau; phần học phía trên đã được trình bày lại.')}
      <label class="ko5-label" for="ko6-slide-filter">Lọc nội dung</label><select id="ko6-slide-filter"><option value="all">Tất cả 28 trang</option>${sections.filter(([id])=>id!=='slides').map(([id,title])=>`<option value="${id}">${title}</option>`).join('')}</select><p class="ko5-muted" id="ko6-slide-count" aria-live="polite"></p><div class="ko5-slide-grid" id="ko6-slide-grid"></div>
    </section></section>`);
  const view=app.querySelector('#ko-lesson-6'), $=(s)=>view.querySelector(s);
  let group='all';
  const normalize=(s)=>String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  function renderWords(){
    const query=normalize($('#ko6-search').value), words=d.vocabulary.filter(w=>(group==='all'||w.group===group)&&normalize(`${w.text} ${w.romanization} ${w.reading} ${w.meaning}`).includes(query));
    $('#ko6-vocab-count').textContent=`${words.length} / ${d.vocabulary.length} mục · 20 mục phần từ vựng, 1 mục từ bài đọc, 10 mục ôn tập`;
    $('#ko6-vocab-grid').innerHTML=words.length?words.map(w=>`<article class="ko5-word"><header><span class="ko5-word-emoji" aria-hidden="true">${w.emoji}</span><span>${w.group==='review'?'Ôn bài trước':`Trang ${w.page}`}</span>${speak(w.text)}</header><h4 lang="ko">${esc(w.text)}</h4><span class="ko5-roma">${esc(w.romanization)}</span><p class="ko5-reading-hint">Đọc gần đúng · ${esc(w.reading)}</p><p>${esc(w.meaning)}</p>${w.location?`<div class="ko5-polite"><small>Khi chỉ vị trí</small><strong>${w.location}</strong><span>${w.locationRoma} · ở ${esc(w.meaning)}</span>${speak(w.location)}</div>`:''}<a class="ko5-naver" target="_blank" rel="noopener noreferrer" href="https://korean.dict.naver.com/kovidict/#/search?query=${encodeURIComponent(w.text)}">Tra Naver ↗</a></article>`).join(''):'<p class="empty-state">Không tìm thấy. Thử đổi nhóm hoặc từ khóa.</p>';
    view.querySelectorAll('[data-ko6-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.ko6Filter===group))); icons();
  }
  function renderBuilt(){
    const first=$('#ko6-object').value,second=$('#ko6-second').value,anchor=$('#ko6-anchor').value,pos=$('#ko6-position').value;
    const s=d.locationSentence(second||first,anchor,pos);
    if(second){s.text=`${d.words[first].text}하고 ${s.text}`;s.romanization=`${d.words[first].romanization}hago ${s.romanization}`;s.meaning=`${d.words[first].meaning} và ${s.meaning}`;}
    $('#ko6-built').innerHTML=`<span class="ko5-tag">CÂU CỦA BẠN</span>${line(s)}`;icons();
  }
  function renderSlides(){
    const filter=$('#ko6-slide-filter').value,slides=d.slides.filter(s=>filter==='all'||s.target===filter);
    $('#ko6-slide-count').textContent=`${slides.length} / 28 trang`;
    $('#ko6-slide-grid').innerHTML=slides.map(s=>`<article class="ko5-slide"><button class="lesson-slide-preview" type="button" data-open-ko-slide="assets/korean/lesson-6/slides/slide-${String(s.page).padStart(2,'0')}.jpg" data-ko-slide-title="Bài 6 · Trang ${s.page} · ${esc(s.title)}"><img src="assets/korean/lesson-6/slides/slide-${String(s.page).padStart(2,'0')}.jpg" width="1500" height="844" loading="lazy" alt="Trang ${s.page}: ${esc(s.title)}"><span>Phóng to trang gốc ↗</span></button><div class="ko5-slide-body"><span class="ko5-tag">Trang ${s.page}/28</span><h4>${esc(s.title)}</h4><p>${esc(s.summary)}</p><div class="ko5-slide-words">${s.words.map(id=>{const w=d.words[id];return `<div><strong>${esc(w.text)}</strong><small>${esc(w.romanization)}</small><span>${esc(w.meaning)}</span></div>`;}).join('')}</div><button class="secondary-button" type="button" data-ko6-jump="${s.target}">Học phần này ↑</button></div></article>`).join('');
  }
  function complete(){let done=false;try{done=localStorage.getItem('hanReview.korean.lesson6.completed')==='true';}catch{} const b=$('[data-ko6-complete]');b.textContent=done?'✓ Đã học Bài 6':'Đánh dấu đã học';b.setAttribute('aria-pressed',String(done));window.updateKoreanProgress?.();}
  view.addEventListener('input',e=>{if(e.target.id==='ko6-search')renderWords();});
  view.addEventListener('change',e=>{if(['ko6-object','ko6-second','ko6-anchor','ko6-position'].includes(e.target.id))renderBuilt();if(e.target.id==='ko6-slide-filter')renderSlides();});
  view.addEventListener('click',e=>{
    const b=e.target.closest('button');if(!b)return;
    if(b.dataset.ko6Filter){group=b.dataset.ko6Filter;renderWords();}
    if(b.hasAttribute('data-ko6-hotspot')){$('#ko6-room-result').innerHTML=line(d.reading[Number(b.dataset.ko6Hotspot)]);view.querySelectorAll('[data-ko6-hotspot]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));icons();}
    if(b.dataset.ko6Jump)$('#ko6-'+b.dataset.ko6Jump)?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
    if(b.id==='ko6-translation'){const hide=$('#ko6-dialogue').classList.toggle('ko5-hide-meaning');b.textContent=hide?'Hiện nghĩa tiếng Việt':'Ẩn nghĩa để tự đọc';b.setAttribute('aria-pressed',String(!hide));}
    if(b.hasAttribute('data-ko6-complete')){try{const key='hanReview.korean.lesson6.completed';localStorage.setItem(key,String(localStorage.getItem(key)!=='true'));complete();}catch{b.textContent='Trình duyệt đang chặn lưu tiến độ';}}
  });
  let frame=0;window.addEventListener('scroll',()=>{if(frame||!view.classList.contains('active'))return;frame=requestAnimationFrame(()=>{frame=0;let active=sections[0][0];const top=$('.ko6-jumpbar').getBoundingClientRect().bottom+30;sections.forEach(([id])=>{if($('#ko6-'+id).getBoundingClientRect().top<=top)active=id;});view.querySelectorAll('.ko6-jumpbar button').forEach(b=>{const current=b.dataset.ko6Jump===active;b.classList.toggle('active',current);if(current)b.setAttribute('aria-current','location');else b.removeAttribute('aria-current');});});},{passive:true});
  $('#ko6-room-result').innerHTML=line(d.reading[5]);
  view.querySelectorAll('[data-ko6-hotspot]').forEach(b=>{b.dataset.speakKo=d.reading[Number(b.dataset.ko6Hotspot)].text;b.setAttribute('aria-pressed',String(b.dataset.ko6Hotspot==='5'));});
  window.KoreanWorkbook.mount($('#ko6-workbook'),d.workbook,'ko6-pdf');
  renderWords();renderBuilt();renderSlides();complete();icons();
})();
