(() => {
  "use strict";
  const app = document.querySelector("#koreanApp");
  const data = window.KOREAN_LESSON_FIVE;
  if (!app || !data || app.querySelector("#ko-lesson-5")) return;
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const normalize = (s) => String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const icons = () => window.lucide?.createIcons?.();
  const supplementWords = data.supplementVocabulary.flatMap((group) => group.words);
  const words = [...data.actions, ...data.context, ...supplementWords];
  const wordById = new Map(words.map((w) => [w.id, w]));
  const places = data.context.filter((p) => data.actions.some((a) => a.places.includes(p.id)));
  const previousWords = new Set([
    window.KOREAN_LESSON_ONE, window.KOREAN_LESSON_TWO, window.KOREAN_LESSON_THREE, window.KOREAN_LESSON_FOUR,
  ].flatMap((d) => (d?.vocabularyGroups || []).flatMap((g) => (g.words || []).map((w) => w.text))));
  const sections = [["vocab", "Từ vựng"], ["grammar", "Ngữ pháp"], ["builder", "Ghép câu"], ["reading", "Đọc & nghe"], ["practice", "Luyện tập"], ["slides", "Theo slide"]];
  const speak = (text, label = "Nghe") => `<button class="ko5-speak" type="button" data-speak-ko="${esc(text)}" aria-label="${esc(label)}: ${esc(text)}"><i data-lucide="volume-2"></i><span>${esc(label)}</span></button>`;
  const annotated = (item) => `<div class="ko5-line"><strong lang="ko">${esc(item.text)}</strong><span class="ko5-roma">${esc(item.romanization)}</span><p>${esc(item.meaning)}</p>${speak(item.text)}</div>`;
  const heading = (n, title, caption) => `<header class="ko5-section-head"><div><span class="ko5-number">${n}</span><h3>${title}</h3></div><p>${caption}</p></header>`;
  let vocabGroup = "all", placeId = "park", actionId = "bike", mode = "particles", orderIndex = 0, chosen = [], bank = [];
  const particleAnswers = new Map(), readingAnswers = new Map();
  const drafts = new Map();

  app.querySelector('[data-korean-tab="ko-lesson-vocab"]')?.insertAdjacentHTML("beforebegin", '<button class="course-tab" type="button" data-korean-tab="ko-lesson-5" data-open-korean-tab="ko-lesson-5"><i data-lucide="bike"></i><span>Bài 5</span></button>');
  const header = app.querySelector(".course-header .brand p");
  if (header) header.textContent = "Bảng chữ cái nền tảng · Bài 1–5: từ giới thiệu đến hoạt động hằng ngày";
  const lessonStat = app.querySelector(".header-stats > div strong");
  if (lessonStat) lessonStat.textContent = "5";
  const practiceStat = app.querySelectorAll(".header-stats > div strong")[2];
  if (practiceStat) practiceStat.textContent = String(Number(practiceStat.textContent) + data.particles.length + data.order.length + data.sentencePrompts.length + data.comprehension.length);
  const overview = app.querySelector("#ko-overview .band-copy");
  if (overview) overview.textContent = "Bắt đầu từ bảng chữ cái. Học giới thiệu ở Bài 1, gia đình ở Bài 2, đồ vật ở Bài 3, miêu tả ở Bài 4, rồi nói mình làm gì và ở đâu trong Bài 5.";
  app.querySelector("#ko-overview .hero-actions")?.insertAdjacentHTML("beforeend", '<button class="secondary-button" type="button" data-open-korean-tab="ko-lesson-5"><i data-lucide="bike"></i><span>Học Bài 5</span></button>');
  app.querySelector("#ko-overview .korean-path-grid")?.insertAdjacentHTML("beforeend", `<article class="korean-path-card ko5-path"><span class="path-number">BÀI 05 · 35 TRANG</span><div class="path-glyph" aria-hidden="true">🚲</div><div><p class="eyebrow">31 mục từ PDF · ${supplementWords.length} mục mới bổ sung</p><h3 lang="ko">${esc(data.title)}</h3><p>${esc(data.romanization)}</p><p>${esc(data.meaning)}</p><button class="lesson-review-button" type="button" data-open-korean-tab="ko-lesson-5">Học Bài 5 <i data-lucide="arrow-right"></i></button></div></article>`);

  app.querySelector("#ko-lesson-vocab").insertAdjacentHTML("beforebegin", `
    <section class="course-view lesson-three-view ko5" id="ko-lesson-5">
      <div class="section-head"><div><p class="eyebrow">Sổ học tiếng Hàn / Bài 05</p><h2>Một ngày ở công viên</h2><p class="section-subtitle">Từ hoạt động nhỏ đến câu kể trọn vẹn: ai, ở đâu, làm gì.</p></div><button class="secondary-button" type="button" data-ko5-complete aria-pressed="false">Đánh dấu đã học</button></div>
      <div class="ko5-hero"><div><span class="ko5-tag">Bài 5 · Theo PDF & ghi chú bổ sung</span><h3 lang="ko">${esc(data.title)}</h3><p class="ko5-roma">${esc(data.romanization)}</p><p>${esc(data.meaning)}</p>${speak(data.title, "Nghe câu trọng tâm")}<div class="ko5-hero-stats"><span><b>31</b> mục từ PDF</span><span><b>${supplementWords.length}</b> mục bổ sung</span><span><b>2</b> tiểu từ trọng tâm</span></div></div><div class="ko5-park-art" aria-hidden="true"><span class="ko5-sun"></span><span class="ko5-tree">🌳</span><span class="ko5-bike">🚲</span><span class="ko5-flower">🌼</span><span class="ko5-cloud">☁️</span><span class="ko5-path-line"></span></div></div>
      <nav class="lesson-three-jumpbar ko5-jumpbar" aria-label="Nội dung Bài 5">${sections.map(([id, title], i) => `<button type="button" data-ko5-jump="${id}" ${i === 0 ? 'class="active" aria-current="location"' : ""}><span>0${i + 1}</span>${title}</button>`).join("")}</nav>
      <section class="ko5-section" id="ko5-vocab">${heading("01", "Từ vựng theo chủ đề", "Học theo PDF hoặc chọn nhóm từ bổ sung để bắt đầu phần mới.")}
        <p class="ko5-note">31 mục từ PDF và ${supplementWords.length} mục bổ sung sau khi đối chiếu bài cũ. Phiên âm tiếng Việt chỉ gần đúng; nút nghe dùng giọng tổng hợp tiếng Hàn của trình duyệt.</p>
        <div class="ko5-toolbar"><label class="lesson-search-field"><i data-lucide="search"></i><input type="search" id="ko5-search" placeholder="Tìm chữ Hàn, phiên âm, nghĩa…" aria-label="Tìm từ vựng Bài 5"></label><div class="ko5-filters" id="ko5-filters"></div></div>
        <p id="ko5-word-count" class="ko5-muted" aria-live="polite"></p><div class="ko5-vocab-grid" id="ko5-vocab-grid"></div>
        <details class="ko5-details ko5-duplicate-note"><summary>Các dạng tương đương đã có trong bài</summary><p class="ko5-muted">Cùng một hoạt động có thể được nói gọn hoặc dùng tiểu từ 을/를 (eul/reul). Học chúng cùng nhau để tránh đếm trùng.</p><div class="ko5-variant-grid">${data.duplicateVariants.map((item) => `<article><div><span lang="ko">${esc(item.variant)}</span><i data-lucide="arrow-left-right"></i><strong lang="ko">${esc(item.existing)}</strong></div><span>${esc(item.romanization)}</span><p>${esc(item.meaning)}</p></article>`).join("")}</div></details>
      </section>
      <section class="ko5-section" id="ko5-grammar">${heading("02", "Làm gì? Ở đâu?", "Trang 11–12 · Nhìn vai trò của từ trước khi chọn tiểu từ.")}
        <details class="ko5-details ko5-review-notes"><summary>Đã học: chủ đề, chủ ngữ và đuôi lịch sự</summary><div class="ko5-boundary-grid"><article><span class="ko5-tag">ÔN BÀI 1 & 4</span><h4>은/는 · 이/가</h4><span class="ko5-roma">eun/neun · i/ga</span><p>${esc(data.reviewSummary.particles)}</p><div><button class="secondary-button" type="button" data-open-korean-tab="ko-lesson-1">Chủ đề · Bài 1</button><button class="secondary-button" type="button" data-open-korean-tab="ko-lesson-4">Chủ ngữ · Bài 4</button></div></article><article><span class="ko5-tag">ÔN BÀI 4</span><h4>-아요 / -어요 / -해요</h4><span class="ko5-roma">ayo / eoyo / haeyo · đuôi lịch sự thân mật</span><p>${esc(data.reviewSummary.ending)}</p><button class="secondary-button" type="button" data-open-korean-tab="ko-lesson-4">Ôn bảng chia đuôi</button></article></div></details>
        <div class="ko5-formula"><span><small>Ai? · Chủ đề</small><b>저는</b><em>jeoneun · tôi</em></span><span><small>Ở đâu? · Địa điểm</small><b>공원<span class="ko5-mark">에서</span></b><em>gongwoneseo · ở công viên</em></span><span><small>Cái gì? · Tân ngữ</small><b>자전거<span class="ko5-mark">를</span></b><em>jajeongeoreul · xe đạp</em></span><span><small>Làm gì? · Động từ</small><b>타요.</b><em>tayo · đi / cưỡi</em></span></div>
        <div class="ko5-two-cols"><article class="ko5-grammar-card"><span class="ko5-tag">ĐỊA ĐIỂM</span><h4>N + 에서 <small>eseo</small></h4><p>Gắn <b>에서</b> vào nơi diễn ra hành động: đọc ở thư viện, chơi ở công viên… Có hay không có batchim đều dùng <b>에서</b>.</p><p class="ko5-note">Viết liền với danh từ địa điểm; động từ thường ở cuối câu.</p>${data.grammarExamples.slice(0, 3).map(annotated).join("")}</article>
        <article class="ko5-grammar-card"><span class="ko5-tag">TÂN NGỮ</span><h4>N + 을 / 를 <small>eul / reul</small></h4><p>Đánh dấu đối tượng của hành động: đọc <b>sách</b>, uống <b>sữa</b>. Đây không phải tiểu từ chủ đề hay chủ ngữ.</p><div class="ko5-rule"><span>Có batchim → <b>을 · eul</b></span><strong>책 → 책을</strong><small>chaek → chaegeul · sách</small></div><div class="ko5-rule"><span>Không có batchim → <b>를 · reul</b></span><strong>우유 → 우유를</strong><small>uyu → uyureul · sữa</small></div>${data.grammarExamples.slice(3, 5).map(annotated).join("")}</article></div>
        <section class="ko5-location-lab"><div class="ko5-practice-head"><div><span class="ko5-tag">MỞ RỘNG CÓ CHỌN LỌC</span><h4>Phân biệt 에 (e) và 에서 (eseo)</h4></div><p>Đừng dịch cả hai đơn giản là “ở”. Hãy nhìn động từ phía cuối câu.</p></div><div class="ko5-location-grid">${data.locationContrast.map((item) => `<article><header><b>${esc(item.marker)}</b><span>${esc(item.romanization)}</span></header><h5>${esc(item.title)}</h5><p>${esc(item.description)}</p>${item.examples.map(annotated).join("")}</article>`).join("")}</div></section>
        <section class="ko5-order-map"><span class="ko5-tag">MỘT KHUNG CÂU DỄ ÁP DỤNG</span><h4>Ai · Khi nào · Ở đâu · Làm gì</h4><p>${esc(data.sentenceOrder.note)}</p><div class="ko5-filters" aria-label="Đổi cách sắp xếp ví dụ"><button type="button" data-ko5-order-view="subject" aria-pressed="true">Chủ đề trước</button><button type="button" data-ko5-order-view="time" aria-pressed="false">Thời gian trước</button></div><div id="ko5-order-map-content"></div><p class="ko5-note">Đây là khung cho câu có tân ngữ. Câu miêu tả, vị trí hoặc đi đến đâu có thể không có tân ngữ; không cần điền đủ mọi thành phần.</p></section>
        <p class="ko5-note">${esc(data.sentenceOrder.timeNote)}</p>
        <p class="ko5-note">Đính chính trang 11: 만아요 → 만나요 (mannayo · gặp). Phần bài học dùng câu đã sửa; ảnh nguồn được giữ nguyên để đối chiếu.</p>
      </section>
      <section class="ko5-section" id="ko5-builder">${heading("03", "Phòng ghép câu", "Chọn nơi và hoạt động · chỉ dùng các cụm trong Bài 5.")}
        <div class="ko5-builder"><div><label class="ko5-label" for="ko5-place">01 · Chọn địa điểm</label><select id="ko5-place">${places.map((p) => `<option value="${p.id}" ${p.id === placeId ? "selected" : ""}>${esc(p.text)} · ${esc(p.romanization)} · ${esc(p.meaning)}</option>`).join("")}</select><p class="ko5-note">Các gợi ý được giới hạn theo bối cảnh trong bài; không có nghĩa đây là các cách ghép duy nhất đúng.</p><span class="ko5-label">02 · Chọn hoạt động</span><div class="ko5-activity-options" id="ko5-activities"></div></div><div class="ko5-sentence-stage" id="ko5-sentence" aria-live="polite"></div></div>
        <details class="ko5-details"><summary>Chơi cùng bạn: đoán hành động · trang 34–35</summary><p>Một người chọn một thẻ hoạt động ở trên và diễn bằng cử chỉ, không nói. Người còn lại đoán bằng câu có địa điểm và hành động. Sau mỗi lượt, đổi vai; bấm nghe câu mẫu để đối chiếu.</p></details>
      </section>
      <section class="ko5-section" id="ko5-reading">${heading("04", "Thomas và gia đình", "Trang 22–25 · Đọc theo từng đoạn rồi kiểm tra mình hiểu gì.")}
        <div class="ko5-reading-toolbar"><span class="ko5-tag">Bài đọc · trang sách 58</span><button class="secondary-button" type="button" id="ko5-translation" aria-pressed="true">Ẩn nghĩa để tự đọc</button></div>
        <div class="ko5-dialogue">${data.dialogue.map((l, i) => `<article><span class="ko5-number">${String(i + 1).padStart(2, "0")}</span>${annotated(l)}</article>`).join("")}</div>
        <div class="ko5-practice-head"><h4>Đọc hiểu: ai làm gì?</h4><button type="button" class="secondary-button" data-ko5-reset="reading">Làm lại</button></div><p class="ko5-muted" id="ko5-reading-score" aria-live="polite"></p><div class="ko5-quiz-grid" id="ko5-reading-quiz"></div>
      </section>
      <section class="ko5-section" id="ko5-practice">${heading("05", "Luyện ngay trên web", "Trang 14, 16, 17 · Chọn, ghép và tự viết thay vì chỉ xem slide.")}
        <div class="ko5-filters" id="ko5-modes" aria-label="Dạng bài tập"></div><div id="ko5-exercise"></div>
      </section>
      <section class="ko5-section" id="ko5-slides">${heading("06", "Đối chiếu theo slide", "Giữ đủ 35 trang nguồn; mỗi thẻ dẫn về phần học tương ứng.")}
        <label class="ko5-label" for="ko5-slide-filter">Lọc nội dung</label><select id="ko5-slide-filter"><option value="all">Tất cả 35 trang</option><option value="vocab">Từ vựng</option><option value="grammar">Ngữ pháp & mở bài</option><option value="builder">Ghép câu & vận dụng</option><option value="reading">Đọc hiểu</option><option value="practice">Luyện tập</option></select>
        <p class="ko5-muted" id="ko5-slide-count" aria-live="polite"></p><div class="ko5-slide-grid" id="ko5-slide-grid"></div>
      </section>
    </section>`);
  const view = app.querySelector("#ko-lesson-5");
  const $ = (id) => view.querySelector(id);

  function renderVocabulary() {
    const query = normalize($("#ko5-search").value);
    const filtered = words.filter((w) => (vocabGroup === "all" || (vocabGroup === "supplement" && w.page === "Bổ sung") || w.group === vocabGroup) && normalize([w.text, w.romanization, w.reading, w.meaning, w.polite || ""].join(" ")).includes(query));
    const filters = [["all", `Tất cả · ${words.length}`], ["actions", "PDF: hoạt động · 20"], ["context", "PDF: bổ trợ · 11"], ["supplement", `Bổ sung · ${supplementWords.length}`], ...data.supplementVocabulary.map((group) => [group.id, `${group.title} · ${group.words.length}`])];
    $("#ko5-filters").innerHTML = filters.map(([id, label]) => `<button type="button" data-ko5-filter="${id}" aria-pressed="${id === vocabGroup}">${esc(label)}</button>`).join("");
    $("#ko5-word-count").textContent = `${filtered.length} / ${words.length} mục · 31 từ/cụm theo PDF + ${supplementWords.length} mục bổ sung.`;
    $("#ko5-vocab-grid").innerHTML = filtered.length ? filtered.map((w) => {
      const supplemental = w.page === "Bổ sung";
      const groupTitle = data.supplementVocabulary.find((group) => group.id === w.group)?.title;
      return `<article class="ko5-word ${supplemental ? "is-supplement" : ""}"><header><span class="ko5-word-emoji" aria-hidden="true">${w.emoji}</span><span>${supplemental ? `Bổ sung · ${esc(groupTitle)}` : `Trang ${w.page}`}${previousWords.has(w.text) ? " · Đã gặp ở bài trước" : ""}</span>${speak(w.text)}</header><h4 lang="ko">${esc(w.text)}</h4><span class="ko5-roma">${esc(w.romanization)}</span><p class="ko5-reading-hint">Đọc gần đúng · ${esc(w.reading)}</p><p>${esc(w.meaning)}</p>${w.polite ? `<div class="ko5-polite"><small>${w.exampleLabel || "Dùng trong câu"}</small><strong lang="ko">${esc(w.polite)}</strong><span>${esc(w.politeRomanization)}</span>${w.politeReading ? `<span>Đọc gần đúng · ${esc(w.politeReading)}</span>` : ""}${w.exampleMeaning ? `<span>${esc(w.exampleMeaning)}</span>` : ""}${speak(w.polite)}</div>` : ""}${w.note ? `<p class="ko5-word-note">${esc(w.note)}</p>` : ""}<a class="ko5-naver" target="_blank" rel="noopener noreferrer" href="https://korean.dict.naver.com/kovidict/#/search?query=${encodeURIComponent(w.text)}">Tra Naver ↗</a></article>`;
    }).join("") : '<p class="empty-state">Không tìm thấy từ phù hợp. Thử bỏ bớt từ khóa hoặc chọn Tất cả.</p>';
    icons();
  }
  function renderOrderMap(order = "subject") {
    const indices = order === "time" ? [1, 2, 0, 3, 4] : [0, 1, 2, 3, 4];
    const parts = indices.map((i) => data.sentenceOrder.parts[i]);
    const example = order === "time" ? data.sentenceOrder.alternate : data.sentenceOrder.example;
    $("#ko5-order-map-content").innerHTML = `<div class="ko5-order-parts">${parts.map((part) => `<div><small>${esc(part.role)}</small><strong lang="ko">${esc(part.text)}</strong><span>${esc(part.romanization)}</span></div>`).join('<i data-lucide="chevron-right" aria-hidden="true"></i>')}</div>${annotated(example)}`;
    view.querySelectorAll("[data-ko5-order-view]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.ko5OrderView === order)));
    icons();
  }
  function renderBuilder() {
    const allowed = data.actions.filter((a) => a.places.includes(placeId));
    if (!allowed.some((a) => a.id === actionId)) actionId = allowed[0].id;
    $("#ko5-activities").innerHTML = allowed.map((a) => `<button type="button" data-ko5-action="${a.id}" aria-pressed="${a.id === actionId}"><span aria-hidden="true">${a.emoji}</span><b lang="ko">${esc(a.polite)}</b><small>${esc(a.politeRomanization)}</small><span>${esc(a.meaning)}</span></button>`).join("");
    const a = wordById.get(actionId), p = wordById.get(placeId);
    const placeRoma = p.id === "living" ? "geosireseo" : `${p.romanization}eseo`;
    const text = `저는 ${p.text}에서 ${a.polite}.`;
    $("#ko5-sentence").innerHTML = `<span class="ko5-scene-emoji" aria-hidden="true">${p.emoji} ${a.emoji}</span><span class="ko5-tag">CÂU CỦA BẠN</span><h4 lang="ko">저는 <span>${esc(p.text)}에서</span><br>${esc(a.polite)}.</h4><p class="ko5-roma">Jeoneun ${esc(placeRoma)} ${esc(a.politeRomanization)}.</p><p>Tôi ${esc(a.meaning)} ở ${esc(p.meaning)}.</p>${speak(text, "Nghe câu vừa ghép")}<div class="ko5-rule"><small>Hỏi nơi thực hiện hành động</small><strong lang="ko">어디에서 ${esc(a.polite)}?</strong><span class="ko5-roma">Eodieseo ${esc(a.politeRomanization)}?</span><span>Bạn ${esc(a.meaning)} ở đâu?</span></div>`;
    icons();
  }
  function renderReadingQuiz() {
    const score = data.comprehension.filter((q, i) => readingAnswers.get(i) === q.answer).length;
    $("#ko5-reading-score").textContent = `Đã trả lời ${readingAnswers.size}/6 · Đúng ${score}/6`;
    $("#ko5-reading-quiz").innerHTML = data.comprehension.map((q, i) => `<article class="ko5-question"><h5>${i + 1}. ${esc(q.question)}</h5><div class="ko5-answers">${q.options.map((id) => {
      const w = wordById.get(id), answered = readingAnswers.has(i);
      return `<button type="button" data-ko5-reading-answer="${id}" data-question="${i}" ${answered ? "disabled" : ""} class="${answered && id === q.answer ? "correct" : answered && id === readingAnswers.get(i) ? "incorrect" : ""}"><b>${esc(w.polite)}</b><small>${esc(w.politeRomanization)}</small><span>${esc(w.meaning)}</span></button>`;
    }).join("")}</div><p class="ko5-feedback" role="status">${readingAnswers.has(i) ? `${readingAnswers.get(i) === q.answer ? "Đúng rồi!" : "Chưa đúng."} ${esc(q.explanation)}` : ""}</p></article>`).join("");
  }
  function renderParticles() {
    const score = data.particles.filter((q, i) => particleAnswers.get(i) === q.answer).length;
    const cards = data.particles.map((q, i) => {
      const answered = particleAnswers.has(i);
      return `<article class="ko5-question">
        <span class="ko5-tag">Câu ${i + 1} · Trang 14${answered ? " · Đáp án" : ""}</span>
        <h5 lang="ko">${esc(q.before)}<mark>${answered ? q.answer : "___"}</mark> ${esc(q.after)}</h5>
        <p class="ko5-roma">${answered ? esc(q.romanization) : `${esc(q.beforeRoma)} ___ ${esc(q.afterRoma)}`}</p><p>${esc(q.meaning)}</p>
        <div class="ko5-answers ko5-particle-answers">${[["에서", "eseo"], ["을", "eul"], ["를", "reul"]].map(([a, r]) => `<button type="button" data-ko5-particle="${a}" data-question="${i}" ${answered ? "disabled" : ""} class="${answered && a === q.answer ? "correct" : particleAnswers.get(i) === a ? "incorrect" : ""}"><b>${a}</b><small>${r}</small></button>`).join("")}</div>
        <p class="ko5-feedback" role="status">${answered ? `${particleAnswers.get(i) === q.answer ? "Đúng rồi!" : "Chưa đúng."} ${esc(q.explanation)}` : ""}</p>
        ${answered ? speak(`${q.before}${q.answer} ${q.after}`, "Nghe đáp án") : ""}
      </article>`;
    }).join("");
    $("#ko5-exercise").innerHTML = `<div class="ko5-practice-head"><p class="ko5-muted" aria-live="polite">Đã trả lời ${particleAnswers.size}/6 · Đúng ${score}/6</p><button class="secondary-button" type="button" data-ko5-reset="particles">Làm lại</button></div><div class="ko5-quiz-grid">${cards}</div>`;
  }
  function setupOrder() {
    chosen = [];
    bank = data.order[orderIndex].text.split(" ").map((text, id) => ({ id, text, roma: data.order[orderIndex].romanization.split(" ")[id] }));
    // Deterministic scrambling keeps the exercise reproducible, without moving focus at random.
    bank = [...bank.slice(2), ...bank.slice(0, 2)].reverse();
  }
  function renderOrder() {
    const item = data.order[orderIndex];
    $("#ko5-exercise").innerHTML = `<div class="ko5-practice-head"><label for="ko5-order-index">Câu cần ghép</label><select id="ko5-order-index">${data.order.map((q, i) => `<option value="${i}" ${i === orderIndex ? "selected" : ""}>${i + 1}. ${esc(q.meaning)}</option>`).join("")}</select></div><p class="ko5-note">Tiếng Hàn có nhiều trật tự đúng. Hãy thử ghép, rồi so sánh với câu mẫu; thứ tự khác mẫu không tự động bị chấm sai.</p><div class="ko5-order"><h4>${esc(item.meaning)}</h4><div class="ko5-order-answer" aria-label="Câu đang ghép" aria-live="polite">${chosen.length ? chosen.map((id) => { const t = bank.find((x) => x.id === id); return `<button type="button" data-ko5-remove="${id}" aria-label="Bỏ ${esc(t.text)}"><b>${esc(t.text)}</b><small>${esc(t.roma)}</small></button>`; }).join("") : '<span>Chạm các mảnh bên dưới để tạo câu…</span>'}</div><div class="ko5-order-bank">${bank.map((t) => `<button type="button" data-ko5-token="${t.id}" ${chosen.includes(t.id) ? "disabled" : ""}><b>${esc(t.text)}</b><small>${esc(t.roma)}</small></button>`).join("")}</div><div class="ko5-practice-head"><button class="secondary-button" type="button" data-ko5-order-reset>Ghép lại</button><button class="primary-button" type="button" data-ko5-order-check ${chosen.length !== bank.length ? "disabled" : ""}>Đối chiếu câu mẫu</button></div><div id="ko5-order-feedback" aria-live="polite"></div></div>`;
  }
  function renderWriting() {
    $("#ko5-exercise").innerHTML = `<p class="ko5-note">8 câu gợi ý từ trang 17. Có thể dùng chủ đề hoặc chủ ngữ phù hợp ngữ cảnh; đây là đáp án mẫu để tự đối chiếu, không chấm duy nhất một cách diễn đạt. Nội dung bạn gõ chỉ giữ trong phiên trang này.</p><div class="ko5-quiz-grid">${data.sentencePrompts.map((p, i) => `<article class="ko5-question"><h5>${i + 1}. ${esc(p.prompt)}</h5><p class="ko5-roma">${esc(p.romanization)}</p><p>${esc(p.sample.meaning)}</p><label class="ko5-label" for="ko5-draft-${i}">Câu của bạn</label><textarea id="ko5-draft-${i}" data-ko5-draft="${i}" rows="2" placeholder="Gõ câu tiếng Hàn…">${esc(drafts.get(i) || "")}</textarea><details class="ko5-details"><summary>Xem câu mẫu</summary>${annotated(p.sample)}</details></article>`).join("")}</div>`;
  }
  function renderExercise() {
    $("#ko5-modes").innerHTML = [["particles", "Chọn tiểu từ · 6"], ["order", "Sắp xếp câu · 8"], ["write", "Tự viết câu · 8"]].map(([id, text]) => `<button type="button" data-ko5-mode="${id}" aria-pressed="${mode === id}">${text}</button>`).join("");
    if (mode === "particles") renderParticles();
    else if (mode === "order") renderOrder();
    else renderWriting();
    icons();
  }
  function renderSlides() {
    const filter = $("#ko5-slide-filter").value;
    const slides = data.slides.filter((s) => filter === "all" || s.target === filter);
    $("#ko5-slide-count").textContent = `${slides.length} / 35 trang · Chạm ảnh để phóng to tài liệu gốc.`;
    $("#ko5-slide-grid").innerHTML = slides.map((s) => `<article class="ko5-slide"><button class="lesson-slide-preview" type="button" data-open-ko-slide="assets/korean/lesson-5/slides/slide-${String(s.page).padStart(2, "0")}.jpg" data-ko-slide-title="Bài 5 · Trang ${s.page} · ${esc(s.title)}"><img src="assets/korean/lesson-5/slides/slide-${String(s.page).padStart(2, "0")}.jpg" loading="lazy" width="1500" height="844" alt="Tài liệu gốc Bài 5, trang ${s.page}: ${esc(s.title)}"><span>Phóng to trang gốc ↗</span></button><div class="ko5-slide-body"><span class="ko5-tag">Trang ${s.page}/35</span><h4>${esc(s.title)}</h4><p>${esc(s.summary)}</p><div class="ko5-slide-words">${s.words.map((id) => { const w = wordById.get(id); return `<div><strong lang="ko">${esc(w.text)}</strong><small>${esc(w.romanization)}</small><span>${esc(w.meaning)}</span></div>`; }).join("")}</div><button class="secondary-button" type="button" data-ko5-jump="${s.target}">Học phần này ↑</button></div></article>`).join("");
  }
  function updateComplete() {
    let done = false;
    try { done = localStorage.getItem("hanReview.korean.lesson5.completed") === "true"; } catch {}
    const button = $("[data-ko5-complete]");
    button.textContent = done ? "✓ Đã học Bài 5" : "Đánh dấu đã học";
    button.setAttribute("aria-pressed", String(done));
    button.classList.toggle("completed", done);
    window.updateKoreanProgress?.();
  }
  view.addEventListener("click", (event) => {
    const b = event.target.closest("button");
    if (!b) return;
    if (b.dataset.ko5Filter) { vocabGroup = b.dataset.ko5Filter; renderVocabulary(); }
    if (b.dataset.ko5Action) { actionId = b.dataset.ko5Action; renderBuilder(); }
    if (b.dataset.ko5Mode) { mode = b.dataset.ko5Mode; renderExercise(); }
    if (b.dataset.ko5OrderView) renderOrderMap(b.dataset.ko5OrderView);
    if (b.dataset.ko5Particle) { const i = Number(b.dataset.question); if (!particleAnswers.has(i)) { particleAnswers.set(i, b.dataset.ko5Particle); renderParticles(); icons(); } }
    if (b.dataset.ko5ReadingAnswer) { const i = Number(b.dataset.question); if (!readingAnswers.has(i)) { readingAnswers.set(i, b.dataset.ko5ReadingAnswer); renderReadingQuiz(); } }
    if (b.dataset.ko5Reset === "particles") { particleAnswers.clear(); renderParticles(); icons(); }
    if (b.dataset.ko5Reset === "reading") { readingAnswers.clear(); renderReadingQuiz(); }
    if (b.hasAttribute("data-ko5-token")) { const id = Number(b.dataset.ko5Token); if (!chosen.includes(id)) chosen.push(id); renderOrder(); }
    if (b.hasAttribute("data-ko5-remove")) { chosen = chosen.filter((id) => id !== Number(b.dataset.ko5Remove)); renderOrder(); }
    if (b.hasAttribute("data-ko5-order-reset")) { setupOrder(); renderOrder(); }
    if (b.hasAttribute("data-ko5-order-check")) {
      const exact = chosen.map((id) => bank.find((t) => t.id === id).text).join(" ") === data.order[orderIndex].text;
      $("#ko5-order-feedback").innerHTML = `<p class="ko5-feedback">${exact ? "Bạn đã ghép đúng câu mẫu!" : "Câu mẫu bên dưới để đối chiếu. Câu khác thứ tự có thể vẫn đúng; chú ý động từ ở cuối câu và các tiểu từ đi cùng danh từ."}</p>${annotated(data.order[orderIndex])}`; icons();
    }
    if (b.id === "ko5-translation") { const hide = !$(".ko5-dialogue").classList.contains("ko5-hide-meaning"); $(".ko5-dialogue").classList.toggle("ko5-hide-meaning", hide); b.textContent = hide ? "Hiện nghĩa tiếng Việt" : "Ẩn nghĩa để tự đọc"; b.setAttribute("aria-pressed", String(!hide)); }
    if (b.dataset.ko5Jump) $("#ko5-" + b.dataset.ko5Jump)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    if (b.hasAttribute("data-ko5-complete")) {
      try { const done = localStorage.getItem("hanReview.korean.lesson5.completed") === "true"; localStorage.setItem("hanReview.korean.lesson5.completed", String(!done)); updateComplete(); }
      catch { b.textContent = "Trình duyệt đang chặn lưu tiến độ"; }
    }
  });
  view.addEventListener("input", (event) => {
    if (event.target.id === "ko5-search") renderVocabulary();
    if (event.target.hasAttribute("data-ko5-draft")) drafts.set(Number(event.target.dataset.ko5Draft), event.target.value);
  });
  view.addEventListener("change", (event) => {
    if (event.target.id === "ko5-place") { placeId = event.target.value; renderBuilder(); }
    if (event.target.id === "ko5-slide-filter") renderSlides();
    if (event.target.id === "ko5-order-index") { orderIndex = Number(event.target.value); setupOrder(); renderOrder(); }
  });
  let scrollFrame = 0;
  window.addEventListener("scroll", () => {
    if (scrollFrame || !view.classList.contains("active")) return;
    scrollFrame = requestAnimationFrame(() => {
      scrollFrame = 0;
      const marker = $(".ko5-jumpbar").getBoundingClientRect().bottom + 30;
      let active = sections[0][0];
      sections.forEach(([id]) => { if ($("#ko5-" + id).getBoundingClientRect().top <= marker) active = id; });
      $(".ko5-jumpbar").querySelectorAll("button").forEach((b) => { const current = b.dataset.ko5Jump === active; b.classList.toggle("active", current); if (current) b.setAttribute("aria-current", "location"); else b.removeAttribute("aria-current"); });
    });
  }, { passive: true });
  setupOrder(); renderVocabulary(); renderOrderMap(); renderBuilder(); renderReadingQuiz(); renderExercise(); renderSlides(); updateComplete(); icons();
})();
