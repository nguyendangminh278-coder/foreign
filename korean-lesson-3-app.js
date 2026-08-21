(() => {
  "use strict";

  const app = document.querySelector("#koreanApp");
  const data = window.KOREAN_LESSON_THREE;
  if (!app || !data || app.querySelector("#ko-lesson-3")) return;

  const escapeHtml = (value) => String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
  const normalize = (value) => String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const cleanTerm = (value) => String(value || "").replace(/[.?!]$/g, "").trim();
  const refreshIcons = () => window.lucide?.createIcons?.();
  const wordsFrom = (source) => (source?.vocabularyGroups || []).flatMap((group) => group.words || []);
  const previousTerms = new Set([
    ...wordsFrom(window.KOREAN_LESSON_ONE),
    ...wordsFrom(window.KOREAN_LESSON_TWO),
    ...wordsFrom(window.KOREAN_LESSON_TWO_PDF),
    ...wordsFrom(window.KOREAN_LESSON_TWO_EXTENSION),
  ].map((word) => cleanTerm(word.text)));
  const seen = new Set();
  const vocabularyGroups = data.vocabularyGroups.map((group) => ({
    ...group,
    words: group.words.filter((word) => {
      const term = cleanTerm(word.text);
      if (!term || previousTerms.has(term) || seen.has(term)) return false;
      seen.add(term);
      return true;
    }),
  })).filter((group) => group.words.length);
  const vocabulary = vocabularyGroups.flatMap((group) => group.words.map((word) => ({ ...word, groupId: group.id, groupTitle: group.title })));
  const reviewTerms = [...new Set(data.vocabularyGroups.flatMap((group) => group.words.map((word) => cleanTerm(word.text))).filter((term) => previousTerms.has(term)))];
  const slidePronunciationLookup = new Map();
  const addSlidePronunciation = (item) => {
    const term = cleanTerm(item?.text);
    if (term && item?.romanization && item?.reading) slidePronunciationLookup.set(term, item);
  };
  data.vocabularyGroups.flatMap((group) => group.words || []).forEach(addSlidePronunciation);
  data.patterns.flatMap((pattern) => pattern.examples || []).forEach(addSlidePronunciation);
  (data.dialogue?.lines || []).forEach(addSlidePronunciation);
  (data.slidePronunciations || []).forEach(addSlidePronunciation);

  function renderSlideLine(line) {
    const raw = String(line || "");
    const [koreanText, ...meaningParts] = raw.split(" · ");
    const explicitMeaning = meaningParts.join(" · ").trim();
    const annotation = slidePronunciationLookup.get(cleanTerm(raw)) || slidePronunciationLookup.get(cleanTerm(koreanText));
    if (!annotation) return `<span class="lesson-three-slide-line is-plain">${escapeHtml(raw)}</span>`;
    const meaning = explicitMeaning || annotation.meaning || "";
    return `<span class="lesson-three-slide-line is-annotated"><b>${escapeHtml(explicitMeaning ? koreanText : raw)}</b><small><span>${escapeHtml(annotation.romanization)}</span><i aria-hidden="true">·</i><span>${escapeHtml(annotation.reading)}</span></small>${meaning ? `<em>${escapeHtml(meaning)}</em>` : ""}</span>`;
  }

  const sectionLabels = {
    intro: "Mở bài",
    vocabulary: "Từ vựng",
    grammar: "Ngữ pháp",
    "grammar-practice": "Luyện ngữ pháp",
    "general-practice": "Luyện tập chung",
  };
  let vocabFilter = "all";
  let distanceIndex = 0;
  let ownerIndex = 0;
  let ownershipObjectIndex = 0;
  let practiceMode = "corrections";
  let quizIndex = 0;
  let quizAnswered = false;
  let quizCorrect = 0;
  let quizTotal = 0;
  let slideFilter = "all";
  let jumpFrame = 0;

  const courseTabTarget = app.querySelector('[data-korean-tab="ko-lesson-vocab"]');
  courseTabTarget?.insertAdjacentHTML("beforebegin", `
    <button class="course-tab" type="button" data-korean-tab="ko-lesson-3" data-open-korean-tab="ko-lesson-3">
      <i data-lucide="mouse-pointer-click"></i><span>Bài 3</span>
    </button>
  `);

  const headerCopy = app.querySelector(".course-header .brand p");
  if (headerCopy) headerCopy.textContent = "Bảng chữ cái nền tảng · Bài 1–3: Giới thiệu, gia đình & đồ vật";
  const headerStats = app.querySelectorAll(".header-stats > div strong");
  if (headerStats[0]) headerStats[0].textContent = "3";
  if (headerStats[2]) headerStats[2].textContent = "54";

  const overviewCopy = app.querySelector("#ko-overview .band-copy");
  if (overviewCopy) overviewCopy.textContent = "Học bảng chữ cái trước, dùng Bài 1 để giới thiệu bản thân, Bài 2 để nói về gia đình và nghề nghiệp, rồi sang Bài 3 để gọi tên đồ vật và hỏi đồ vật thuộc về ai.";
  const overviewActions = app.querySelector("#ko-overview .hero-actions");
  overviewActions?.insertAdjacentHTML("beforeend", `
    <button class="secondary-button" type="button" data-open-korean-tab="ko-lesson-3">
      <i data-lucide="mouse-pointer-click"></i><span>Học Bài 3</span>
    </button>
  `);

  const pathGrid = app.querySelector("#ko-overview .korean-path-grid");
  pathGrid?.insertAdjacentHTML("beforeend", `
    <article class="korean-path-card lesson-three">
      <span class="path-number">BÀI 03 · ${data.source.pageCount} TRANG</span>
      <div class="path-glyph" aria-hidden="true">이</div>
      <div>
        <p class="eyebrow">${vocabulary.length} từ mới · ${data.patterns.length} cấu trúc mới · ${data.quiz.length + data.corrections.length} lượt luyện</p>
        <h3>${escapeHtml(data.title)}</h3>
        <p>${escapeHtml(data.meaning)} · đồ dùng học tập, từ chỉ định và cách hỏi sở hữu.</p>
        <button class="lesson-review-button" type="button" data-open-korean-tab="ko-lesson-3"><span>Học Bài 3</span><i data-lucide="arrow-right"></i></button>
      </div>
    </article>
  `);
  const sourceNote = app.querySelector("#ko-overview .source-note p");
  if (sourceNote) sourceNote.textContent = "“Bảng chữ cái.pdf” là nền tảng; Bài 1 giới thiệu bản thân; Bài 2 học gia đình và nghề nghiệp; Bài 3 gồm 21 trang về đồ vật, vị trí và sở hữu đã được chuyển thành bài học tương tác.";

  const lessonView = `
    <section class="course-view lesson-three-view" id="ko-lesson-3">
      <div class="section-head lesson-three-heading">
        <div><p class="eyebrow">Bài 03 · ${data.source.pageCount} trang PDF</p><h2>${escapeHtml(data.title)}</h2><p class="section-subtitle">${escapeHtml(data.summary)}</p></div>
        <button class="secondary-button" type="button" data-ko3-complete><i data-lucide="circle"></i><span>Đánh dấu đã học</span></button>
      </div>

      <section class="lesson-three-hero">
        <div class="lesson-three-hero-copy">
          <span class="lesson-three-date-chip"><i data-lucide="book-open-text"></i>Bài 3 · gọi tên đồ vật</span>
          <p class="eyebrow">Câu trọng tâm</p>
          <h3>${escapeHtml(data.title)}</h3>
          <p class="lesson-three-romanization">${escapeHtml(data.romanization)}</p>
          <p class="lesson-three-reading">Đọc gần đúng · ${escapeHtml(data.reading)}</p>
          <strong>${escapeHtml(data.meaning)}</strong>
          <button class="lesson-three-listen" type="button" data-speak-ko="${escapeHtml(data.title)}"><i data-lucide="volume-2"></i><span>Nghe cả câu</span></button>
        </div>
        <div class="lesson-three-summary-card" aria-label="Tổng quan Bài 3">
          <div><strong>${data.source.pageCount}</strong><span>trang nguồn đã chuyển thành thẻ học</span></div>
          <div><strong>${vocabulary.length}</strong><span>từ mới sau khi loại từ Bài 1–2</span></div>
          <div><strong>${data.patterns.length}</strong><span>cấu trúc mới về vị trí và sở hữu</span></div>
          <div><strong>${data.quiz.length + data.corrections.length}</strong><span>lượt luyện sửa lỗi và trắc nghiệm</span></div>
        </div>
      </section>

      <nav class="lesson-three-jumpbar" aria-label="Nội dung Bài 3">
        <button class="active" type="button" data-ko3-scroll="ko3Vocabulary"><span>01</span>Từ vựng</button>
        <button type="button" data-ko3-scroll="ko3Grammar"><span>02</span>Ngữ pháp</button>
        <button type="button" data-ko3-scroll="ko3Distance"><span>03</span>Vị trí</button>
        <button type="button" data-ko3-scroll="ko3Ownership"><span>04</span>Sở hữu</button>
        <button type="button" data-ko3-scroll="ko3Dialogue"><span>05</span>Hội thoại</button>
        <button type="button" data-ko3-scroll="ko3Practice"><span>06</span>Luyện tập</button>
        <button type="button" data-ko3-scroll="ko3Slides"><span>07</span>Theo slide</button>
      </nav>

      <section class="lesson-three-section" id="ko3Vocabulary">
        <div class="lesson-three-section-head"><div><span class="section-number">01</span><div><p class="eyebrow">Chỉ tính kiến thức mới</p><h3>${vocabulary.length} từ của Bài 3</h3></div></div><p>Tìm theo chữ Hàn, phiên âm hoặc nghĩa; chạm loa để nghe phát âm.</p></div>
        <div class="lesson-three-vocab-toolbar"><label class="lesson-search-field"><i data-lucide="search"></i><input id="ko3VocabSearch" type="search" placeholder="Tìm từ trong Bài 3…" /></label><div class="lesson-three-filter-row" id="ko3VocabFilters"></div></div>
        <div class="lesson-three-vocab-grid" id="ko3VocabularyGrid"></div>
        <p class="lesson-three-vocab-count" id="ko3VocabCount"></p>
        <div class="lesson-three-review-note"><i data-lucide="history"></i><p><strong>Ôn từ Bài 1–2, không tính lại</strong><br><span>${escapeHtml(reviewTerms.join(" · ") || "Không có từ trùng")}</span></p></div>
      </section>

      <section class="lesson-three-section" id="ko3Grammar">
        <div class="lesson-three-section-head"><div><span class="section-number">02</span><div><p class="eyebrow">Hai mảnh ghép mới</p><h3>Ngữ pháp Bài 3</h3></div></div><p>Phân biệt đồ vật theo khoảng cách, sau đó hỏi và trả lời đồ vật của ai.</p></div>
        <div class="lesson-three-pattern-grid" id="ko3Patterns"></div>
        <div class="lesson-three-review-patterns" id="ko3ReviewPatterns"></div>
      </section>

      <section class="lesson-three-section" id="ko3Distance">
        <div class="lesson-three-section-head"><div><span class="section-number">03</span><div><p class="eyebrow">Sơ đồ khoảng cách</p><h3>이게, 그게 hay 저게?</h3></div></div><p>Chọn vị trí để nhìn đồ vật di chuyển và câu hỏi thay đổi ngay.</p></div>
        <div class="lesson-three-distance-lab"><div class="lesson-three-choice-list" id="ko3DistanceChoices"></div><div class="lesson-three-distance-stage" id="ko3DistanceStage"></div></div>
      </section>

      <section class="lesson-three-section" id="ko3Ownership">
        <div class="lesson-three-section-head"><div><span class="section-number">04</span><div><p class="eyebrow">Xưởng hỏi sở hữu</p><h3>누구 거예요?</h3></div></div><p>Đổi đồ vật và chủ sở hữu để tạo hội thoại mới trong đúng phạm vi bài.</p></div>
        <div class="lesson-three-ownership-lab"><div class="lesson-three-owner-pickers"><label>Chọn đồ vật<select id="ko3OwnershipObject"></select></label><label>Chọn chủ sở hữu<select id="ko3Owner"></select></label></div><div class="lesson-three-ownership-stage" id="ko3OwnershipStage"></div></div>
      </section>

      <section class="lesson-three-section" id="ko3Dialogue">
        <div class="lesson-three-section-head"><div><span class="section-number">05</span><div><p class="eyebrow">Trang 42–43</p><h3>${escapeHtml(data.dialogue.title)}</h3></div></div><p>${escapeHtml(data.dialogue.meaning)} Nhấn từng bong bóng để nghe.</p></div>
        <div class="lesson-three-dialogue" id="ko3DialogueLines"></div>
      </section>

      <section class="lesson-three-section" id="ko3Practice">
        <div class="lesson-three-section-head"><div><span class="section-number">06</span><div><p class="eyebrow">Tương tác thay cho slide tĩnh</p><h3>Sửa lỗi và tự kiểm tra</h3></div></div><p>Mười lỗi từ trang 14 và mười câu hỏi trong đúng vốn từ đã học.</p></div>
        <div class="lesson-three-practice-tabs"><button class="active" type="button" data-ko3-practice="corrections">Sửa lỗi sai</button><button type="button" data-ko3-practice="quiz">Trắc nghiệm</button></div>
        <div id="ko3PracticeContent"></div>
      </section>

      <section class="lesson-three-section" id="ko3Slides">
        <div class="lesson-three-section-head"><div><span class="section-number">07</span><div><p class="eyebrow">21 trang gốc</p><h3>Học theo slide Bài 3</h3></div></div><p>Tìm nhanh nội dung, xem tóm tắt và phóng to trang nguồn khi cần.</p></div>
        <div class="lesson-three-slide-toolbar"><label class="lesson-search-field"><i data-lucide="search"></i><input id="ko3SlideSearch" type="search" placeholder="Tìm trang hoặc từ khóa…" /></label><div class="lesson-three-filter-row" id="ko3SlideFilters"></div></div>
        <div class="lesson-three-slide-grid" id="ko3SlideGrid"></div>
      </section>
    </section>
  `;
  const vocabularyView = app.querySelector("#ko-lesson-vocab");
  vocabularyView?.insertAdjacentHTML("beforebegin", lessonView);

  function renderVocabularyFilters() {
    const filters = [{ id: "all", title: "Tất cả" }, ...vocabularyGroups];
    app.querySelector("#ko3VocabFilters").innerHTML = filters.map((filter) => `
      <button class="${filter.id === vocabFilter ? "active" : ""}" type="button" data-ko3-vocab-filter="${escapeHtml(filter.id)}">${escapeHtml(filter.title)}</button>
    `).join("");
  }

  function renderVocabulary() {
    const query = normalize(app.querySelector("#ko3VocabSearch")?.value);
    const filtered = vocabulary.filter((word) => {
      const inGroup = vocabFilter === "all" || word.groupId === vocabFilter;
      const content = normalize([word.text, word.romanization, word.reading, word.meaning, word.note].join(" "));
      return inGroup && (!query || content.includes(query));
    });
    app.querySelector("#ko3VocabularyGrid").innerHTML = filtered.length ? filtered.map((word) => `
      <article class="lesson-three-vocab-card">
        <button type="button" data-speak-ko="${escapeHtml(word.text)}" aria-label="Nghe ${escapeHtml(word.text)}"><i data-lucide="volume-2"></i></button>
        <small>${escapeHtml(word.groupTitle)}</small><strong>${escapeHtml(word.text)}</strong><p>${escapeHtml(word.romanization)} · ${escapeHtml(word.reading)}</p><b>${escapeHtml(word.meaning)}</b>${word.note ? `<em>${escapeHtml(word.note)}</em>` : ""}
      </article>
    `).join("") : '<div class="empty-state">Không tìm thấy từ phù hợp.</div>';
    app.querySelector("#ko3VocabCount").textContent = `Đang hiện ${filtered.length}/${vocabulary.length} từ mới`;
    refreshIcons();
  }

  function renderPatterns() {
    app.querySelector("#ko3Patterns").innerHTML = data.patterns.map((pattern) => `
      <article class="lesson-three-pattern-card"><span>${escapeHtml(pattern.number)} · ${escapeHtml(pattern.title)}</span><h4>${escapeHtml(pattern.formula)}</h4><p>${escapeHtml(pattern.explanation)}</p><div class="lesson-three-example-list">${pattern.examples.map((example) => `
        <button type="button" data-speak-ko="${escapeHtml(example.text)}"><span>${escapeHtml(example.text)}</span><small>${escapeHtml(example.romanization)} · ${escapeHtml(example.reading)}</small><em>${escapeHtml(example.meaning)}</em><i data-lucide="volume-2"></i></button>
      `).join("")}</div></article>
    `).join("");
    app.querySelector("#ko3ReviewPatterns").innerHTML = data.reviewPatterns.map((pattern) => `<div><small>${escapeHtml(pattern.source)}</small><strong>${escapeHtml(pattern.formula)}</strong><p>${escapeHtml(pattern.note)}</p></div>`).join("");
  }

  function renderDistanceLab() {
    app.querySelector("#ko3DistanceChoices").innerHTML = data.distanceCases.map((item, index) => `
      <button class="${index === distanceIndex ? "active" : ""}" type="button" data-ko3-distance="${index}"><span>${escapeHtml(item.word)}</span><div><strong>${escapeHtml(item.label)}</strong><small>${escapeHtml(item.objectMeaning)}</small></div></button>
    `).join("");
    const item = data.distanceCases[distanceIndex];
    const objectCard = `<div class="lesson-three-object"><strong>${escapeHtml(item.object)}</strong><small>${escapeHtml(item.objectMeaning)}</small></div>`;
    app.querySelector("#ko3DistanceStage").innerHTML = `
      <div class="lesson-three-distance-scene">
        <div class="lesson-three-distance-zone speaker-zone"><div class="lesson-three-person"><span>🧑</span>Người nói</div>${item.id === "near-speaker" ? objectCard : ""}<small>gần người nói</small></div>
        <div class="lesson-three-distance-zone far-zone">${item.id === "far-both" ? objectCard : ""}<small>xa cả hai</small></div>
        <div class="lesson-three-distance-zone listener-zone">${item.id === "near-listener" ? objectCard : ""}<div class="lesson-three-person"><span>👩</span>Người nghe</div><small>gần người nghe</small></div>
        <button class="lesson-three-object-result" type="button" data-speak-ko="${escapeHtml(item.prompt)} ${escapeHtml(item.answer)}"><strong>${escapeHtml(item.prompt)} — ${escapeHtml(item.answer)}</strong><span>${escapeHtml(item.word)} được chọn vì vật ở ${escapeHtml(item.label.toLowerCase())}.</span></button></div>
    `;
    refreshIcons();
  }

  function renderOwnershipLab() {
    const object = data.ownershipObjects[ownershipObjectIndex];
    const owner = data.owners[ownerIndex];
    app.querySelector("#ko3OwnershipStage").innerHTML = `
      <div class="lesson-three-owner-card"><small>${escapeHtml(object.demonstrative)} · ${escapeHtml(object.meaning)}</small><strong>${escapeHtml(object.text)}</strong><p>${escapeHtml(owner.label)} là chủ sở hữu</p><div class="lesson-three-owner-exchange"><div><span>Hỏi</span><b>${escapeHtml(object.demonstrative)} 누구 거예요?</b></div><i data-lucide="arrow-right"></i><div><span>Đáp</span><b>${escapeHtml(owner.answer)}</b></div></div><button class="lesson-three-listen" type="button" data-speak-ko="${escapeHtml(object.demonstrative)} 누구 거예요? ${escapeHtml(owner.answer)}"><i data-lucide="volume-2"></i><span>Nghe hội thoại</span></button></div>
    `;
    refreshIcons();
  }

  function renderDialogue() {
    app.querySelector("#ko3DialogueLines").innerHTML = data.dialogue.lines.map((line) => `
      <div class="lesson-three-dialogue-line"><span>${escapeHtml(line.speaker)}</span><button type="button" data-speak-ko="${escapeHtml(line.text)}"><strong>${escapeHtml(line.text)}</strong><small>${escapeHtml(line.romanization)} · ${escapeHtml(line.reading)}</small><em>${escapeHtml(line.meaning)}</em><i data-lucide="volume-2"></i></button></div>
    `).join("");
  }

  function renderCorrections() {
    app.querySelector("#ko3PracticeContent").innerHTML = `<div class="lesson-three-correction-grid">${data.corrections.map((item, index) => `
      <article class="lesson-three-correction-card"><small>Lỗi ${index + 1}</small><p>${escapeHtml(item.wrong)}</p><button type="button" data-ko3-reveal="${index}">Xem cách sửa</button><div class="lesson-three-correction-answer" hidden><strong>${escapeHtml(item.correct)}</strong><span>${escapeHtml(item.reason)}</span></div></article>
    `).join("")}</div>`;
  }

  function renderQuiz() {
    const item = data.quiz[quizIndex];
    app.querySelector("#ko3PracticeContent").innerHTML = `
      <div class="lesson-three-quiz"><div class="lesson-three-quiz-head"><span>Câu ${quizIndex + 1}/${data.quiz.length}</span><span>${quizCorrect} đúng · ${quizTotal} đã làm</span></div><h4>${escapeHtml(item.prompt)}</h4><div class="lesson-three-options">${item.options.map((option, index) => `<button type="button" data-ko3-answer="${escapeHtml(option)}"><span>${String.fromCharCode(65 + index)}</span>${escapeHtml(option)}</button>`).join("")}</div><div class="lesson-three-feedback" id="ko3Feedback">Chọn một đáp án để kiểm tra.</div><button class="primary-button lesson-three-next" id="ko3NextQuestion" type="button" ${quizAnswered ? "" : "disabled"}><i data-lucide="arrow-right"></i><span>Câu tiếp theo</span></button></div>
    `;
    refreshIcons();
  }

  function renderPractice() {
    app.querySelectorAll("[data-ko3-practice]").forEach((button) => button.classList.toggle("active", button.dataset.ko3Practice === practiceMode));
    if (practiceMode === "corrections") renderCorrections();
    else renderQuiz();
  }

  function renderSlideFilters() {
    const filters = [
      ["all", "Tất cả"], ["vocabulary", "Từ vựng"], ["grammar", "Ngữ pháp"], ["grammar-practice", "Luyện ngữ pháp"], ["general-practice", "Luyện tập chung"],
    ];
    app.querySelector("#ko3SlideFilters").innerHTML = filters.map(([id, label]) => `<button class="${id === slideFilter ? "active" : ""}" type="button" data-ko3-slide-filter="${id}">${label}</button>`).join("");
  }

  function renderSlides() {
    const query = normalize(app.querySelector("#ko3SlideSearch")?.value);
    const filtered = data.slides.filter((slide) => {
      const inSection = slideFilter === "all" || slide.section === slideFilter;
      const content = normalize([slide.title, slide.summary, ...slide.lines].join(" "));
      return inSection && (!query || content.includes(query));
    });
    app.querySelector("#ko3SlideGrid").innerHTML = filtered.length ? filtered.map((slide) => `
      <article class="lesson-three-slide-card"><button class="lesson-slide-preview" type="button" data-open-ko-slide="assets/korean/lesson-3/slides/slide-${String(slide.index).padStart(2, "0")}.jpg" data-ko-slide-title="Bài 3 · Trang ${slide.index} · ${escapeHtml(slide.title)}"><img src="assets/korean/lesson-3/slides/slide-${String(slide.index).padStart(2, "0")}.jpg" alt="Bài 3 trang ${slide.index}: ${escapeHtml(slide.title)}" loading="lazy" /><span><i data-lucide="maximize-2"></i>Mở trang gốc</span></button><div class="lesson-three-slide-body"><div class="lesson-three-slide-meta"><span>Trang ${slide.index}/${data.source.pageCount}</span><em>${escapeHtml(sectionLabels[slide.section])}</em></div><h4>${escapeHtml(slide.title)}</h4><p>${escapeHtml(slide.summary)}</p><div class="lesson-three-slide-lines">${slide.lines.map(renderSlideLine).join("")}</div></div></article>
    `).join("") : '<div class="empty-state">Không có trang phù hợp.</div>';
    refreshIcons();
  }


  function readLessonThreeCompletion() {
    try { return localStorage.getItem("hanReview.korean.lesson3.completed") === "true"; } catch { return false; }
  }
  function writeLessonThreeCompletion(value) {
    try { localStorage.setItem("hanReview.korean.lesson3.completed", String(value)); } catch {}
  }
  function updateProgress() {
    let baseCount = 0;
    try {
      const saved = JSON.parse(localStorage.getItem("hanReview.korean.completed") || "[]");
      const validBaseIds = new Set(["alphabet", "compose", "batchim", "practice", "lesson-1", "lesson-2"]);
      baseCount = new Set((Array.isArray(saved) ? saved : []).filter((id) => validBaseIds.has(id))).size;
    } catch {}
    const lessonDone = readLessonThreeCompletion();
    const stat = app.querySelector("#koStatCompleted");
    const button = app.querySelector("[data-ko3-complete]");
    if (stat) stat.textContent = `${baseCount + (lessonDone ? 1 : 0)}/7`;
    if (button) {
      button.classList.toggle("completed", lessonDone);
      button.querySelector("span").textContent = lessonDone ? "Đã học" : "Đánh dấu đã học";
      const icon = button.querySelector("i, svg");
      icon?.setAttribute("data-lucide", lessonDone ? "circle-check-big" : "circle");
    }
    refreshIcons();
  }

  const progressStat = app.querySelector("#koStatCompleted");
  const progressObserver = progressStat ? new MutationObserver(() => {
    const expectedSuffix = "/7";
    if (!progressStat.textContent.endsWith(expectedSuffix)) updateProgress();
  }) : null;
  progressObserver?.observe(progressStat, { childList: true, characterData: true, subtree: true });

  const jumpIds = ["ko3Vocabulary", "ko3Grammar", "ko3Distance", "ko3Ownership", "ko3Dialogue", "ko3Practice", "ko3Slides"];
  function setActiveJump(id) {
    app.querySelectorAll("[data-ko3-scroll]").forEach((button) => button.classList.toggle("active", button.dataset.ko3Scroll === id));
  }
  function updateJump() {
    if (!app.querySelector("#ko-lesson-3")?.classList.contains("active")) return;
    const marker = window.innerWidth <= 680 ? 205 : 225;
    let current = jumpIds[0];
    jumpIds.forEach((id) => {
      const section = app.querySelector(`#${id}`);
      if (section && section.getBoundingClientRect().top <= marker) current = id;
    });
    setActiveJump(current);
  }
  function scheduleJump() {
    if (jumpFrame) return;
    jumpFrame = requestAnimationFrame(() => { jumpFrame = 0; updateJump(); });
  }

  app.querySelector("#ko3OwnershipObject").innerHTML = data.ownershipObjects.map((item, index) => `<option value="${index}">${escapeHtml(item.text)} · ${escapeHtml(item.meaning)}</option>`).join("");
  app.querySelector("#ko3Owner").innerHTML = data.owners.map((owner, index) => `<option value="${index}">${escapeHtml(owner.korean)} · ${escapeHtml(owner.label)}</option>`).join("");
  renderVocabularyFilters();
  renderVocabulary();
  renderPatterns();
  renderDistanceLab();
  renderOwnershipLab();
  renderDialogue();
  renderPractice();
  renderSlideFilters();
  renderSlides();
  updateProgress();

  app.querySelector("#ko3VocabSearch").addEventListener("input", renderVocabulary);
  app.querySelector("#ko3SlideSearch").addEventListener("input", renderSlides);
  app.querySelector("#ko3OwnershipObject").addEventListener("change", (event) => { ownershipObjectIndex = Number(event.target.value); renderOwnershipLab(); });
  app.querySelector("#ko3Owner").addEventListener("change", (event) => { ownerIndex = Number(event.target.value); renderOwnershipLab(); });
  app.addEventListener("click", (event) => {
    const vocabButton = event.target.closest("[data-ko3-vocab-filter]");
    if (vocabButton) { vocabFilter = vocabButton.dataset.ko3VocabFilter; renderVocabularyFilters(); renderVocabulary(); }
    const distanceButton = event.target.closest("[data-ko3-distance]");
    if (distanceButton) { distanceIndex = Number(distanceButton.dataset.ko3Distance); renderDistanceLab(); }
    const practiceButton = event.target.closest("[data-ko3-practice]");
    if (practiceButton) { practiceMode = practiceButton.dataset.ko3Practice; renderPractice(); }
    const revealButton = event.target.closest("[data-ko3-reveal]");
    if (revealButton) {
      const answer = revealButton.nextElementSibling;
      answer.hidden = !answer.hidden;
      revealButton.textContent = answer.hidden ? "Xem cách sửa" : "Ẩn cách sửa";
    }
    const answerButton = event.target.closest("[data-ko3-answer]");
    if (answerButton && !quizAnswered) {
      const item = data.quiz[quizIndex];
      quizAnswered = true;
      quizTotal += 1;
      const correct = answerButton.dataset.ko3Answer === item.answer;
      if (correct) quizCorrect += 1;
      app.querySelectorAll("[data-ko3-answer]").forEach((button) => {
        button.disabled = true;
        if (button.dataset.ko3Answer === item.answer) button.classList.add("correct");
        else if (button === answerButton) button.classList.add("incorrect");
      });
      app.querySelector("#ko3Feedback").textContent = `${correct ? "Đúng rồi!" : "Chưa đúng."} ${item.explanation}`;
      app.querySelector("#ko3NextQuestion").disabled = false;
    }
    if (event.target.closest("#ko3NextQuestion")) { quizIndex = (quizIndex + 1) % data.quiz.length; quizAnswered = false; renderQuiz(); }
    const slideButton = event.target.closest("[data-ko3-slide-filter]");
    if (slideButton) { slideFilter = slideButton.dataset.ko3SlideFilter; renderSlideFilters(); renderSlides(); }
    const jumpButton = event.target.closest("[data-ko3-scroll]");
    if (jumpButton) { setActiveJump(jumpButton.dataset.ko3Scroll); app.querySelector(`#${jumpButton.dataset.ko3Scroll}`)?.scrollIntoView({ behavior: "smooth", block: "start" }); }
    if (event.target.closest("[data-ko3-complete]")) {
      const done = readLessonThreeCompletion();
      writeLessonThreeCompletion(!done);
      updateProgress();
    }
  });
  window.addEventListener("scroll", scheduleJump, { passive: true });
  window.addEventListener("resize", scheduleJump);
  refreshIcons();
})();
