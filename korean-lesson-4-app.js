(() => {
  "use strict";

  const app = document.querySelector("#koreanApp");
  const data = window.KOREAN_LESSON_FOUR;
  if (!app || !data || app.querySelector("#ko-lesson-4")) return;

  const escapeHtml = (value) => String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
  const normalize = (value) => String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const cleanTerm = (value) => String(value || "").replace(/[.?!]$/g, "").trim();
  const refreshIcons = () => window.lucide?.createIcons?.();
  const withGroup = (groups, defaultScope) => groups.flatMap((group) => (group.words || []).map((word) => ({
    ...word,
    groupId: group.id,
    groupTitle: group.title,
    groupIcon: group.icon,
    scope: word.scope || defaultScope,
  })));

  const lessonWords = withGroup(data.vocabularyGroups, "core");
  const reviewWords = withGroup(data.reviewGroups, "review");
  const allWords = [...lessonWords, ...reviewWords];
  const coreCount = lessonWords.filter((word) => word.scope === "core").length;
  const extensionCount = lessonWords.filter((word) => word.scope === "extension").length;
  const sessionCount = lessonWords.filter((word) => word.scope === "session4").length;
  const annotationLookup = new Map();
  const addAnnotation = (item) => {
    const key = cleanTerm(item?.text || item?.sentence || item?.answer);
    if (!key || !item?.romanization || !item?.reading) return;
    annotationLookup.set(key, {
      text: item.text || item.sentence || item.answer,
      romanization: item.romanization,
      reading: item.reading,
      meaning: item.meaning || item.baseMeaning || "",
    });
  };
  allWords.forEach(addAnnotation);
  data.grammar.politeEnding.examples.forEach(addAnnotation);
  data.grammar.politeEnding.detailRules.flatMap((rule) => rule.examples).forEach(addAnnotation);
  data.conjugationItems.forEach(addAnnotation);
  data.subjectPractice.forEach(addAnnotation);
  data.dialogue.lines.forEach(addAnnotation);
  data.slideAnnotations.forEach(addAnnotation);

  const sectionLabels = {
    intro: "Mở bài",
    vocabulary: "Từ vựng",
    grammar: "Ngữ pháp",
    "grammar-practice": "Luyện ngữ pháp",
    "general-practice": "Luyện tập chung",
  };
  let vocabFilter = "all";
  let grammarRuleIndex = 0;
  let conjugationIndex = 0;
  let conjugationRevealed = false;
  let practiceMode = "corrections";
  let quizIndex = 0;
  let quizAnswered = false;
  let quizCorrect = 0;
  let quizTotal = 0;
  let slideFilter = "all";
  let jumpFrame = 0;
  const selectedGarden = new Set(data.gardenIngredients.slice(0, 4).map((item) => item.text));

  const courseTabTarget = app.querySelector('[data-korean-tab="ko-lesson-vocab"]');
  courseTabTarget?.insertAdjacentHTML("beforebegin", `
    <button class="course-tab" type="button" data-korean-tab="ko-lesson-4" data-open-korean-tab="ko-lesson-4">
      <i data-lucide="sprout"></i><span>Bài 4</span>
    </button>
  `);

  const headerCopy = app.querySelector(".course-header .brand p");
  if (headerCopy) headerCopy.textContent = "Bảng chữ cái nền tảng · Bài 1–4: Giới thiệu, gia đình, đồ vật & miêu tả";
  const headerStats = app.querySelectorAll(".header-stats > div strong");
  if (headerStats[0]) headerStats[0].textContent = "4";
  if (headerStats[2]) headerStats[2].textContent = String(54 + coreCount + extensionCount + sessionCount);

  const overviewCopy = app.querySelector("#ko-overview .band-copy");
  if (overviewCopy) overviewCopy.textContent = "Học bảng chữ cái trước; dùng Bài 1 để giới thiệu, Bài 2 để nói về gia đình, Bài 3 để hỏi đồ vật, rồi Bài 4 để miêu tả khu vườn bằng 이/가 và -아요/-어요.";
  const overviewActions = app.querySelector("#ko-overview .hero-actions");
  overviewActions?.insertAdjacentHTML("beforeend", `
    <button class="secondary-button" type="button" data-open-korean-tab="ko-lesson-4">
      <i data-lucide="sprout"></i><span>Học Bài 4</span>
    </button>
  `);
  const pathGrid = app.querySelector("#ko-overview .korean-path-grid");
  pathGrid?.insertAdjacentHTML("beforeend", `
    <article class="korean-path-card lesson-four">
      <span class="path-number">BÀI 04 · ${data.source.pageCount} TRANG</span>
      <div class="path-glyph" aria-hidden="true">밭</div>
      <div>
        <p class="eyebrow">${coreCount} từ PDF · ${sessionCount} từ ghi chú Buổi 4 · ${data.quiz.length + data.corrections.length} lượt luyện</p>
        <h3>${escapeHtml(data.title)}</h3>
        <p>${escapeHtml(data.meaning)} · rau củ, miêu tả và đuôi -아요/-어요.</p>
        <button class="lesson-review-button" type="button" data-open-korean-tab="ko-lesson-4"><span>Học Bài 4</span><i data-lucide="arrow-right"></i></button>
      </div>
    </article>
  `);

  const lessonView = `
    <section class="course-view lesson-three-view lesson-four-view" id="ko-lesson-4">
      <div class="section-head lesson-three-heading">
        <div><p class="eyebrow">Bài 04 · ${data.source.pageCount} trang PDF</p><h2>${escapeHtml(data.title)}</h2><p class="section-subtitle">${escapeHtml(data.summary)}</p></div>
        <button class="secondary-button" type="button" data-ko4-complete><i data-lucide="circle"></i><span>Đánh dấu đã học</span></button>
      </div>

      <section class="lesson-three-hero lesson-four-hero">
        <div class="lesson-three-hero-copy">
          <span class="lesson-three-date-chip"><i data-lucide="sprout"></i>Bài 4 · khu vườn của bà</span>
          <p class="eyebrow">Câu trọng tâm</p>
          <h3>${escapeHtml(data.title)}</h3>
          <p class="lesson-three-romanization">${escapeHtml(data.romanization)}</p>
          <p class="lesson-three-reading">Đọc gần đúng · ${escapeHtml(data.reading)}</p>
          <strong>${escapeHtml(data.meaning)}</strong>
          <button class="lesson-three-listen" type="button" data-speak-ko="${escapeHtml(data.title)}"><i data-lucide="volume-2"></i><span>Nghe cả câu</span></button>
        </div>
        <div class="lesson-three-summary-card" aria-label="Tổng quan Bài 4">
          <div><strong>${data.source.pageCount}</strong><span>trang nguồn đã đối chiếu và chuyển thành thẻ học</span></div>
          <div><strong>${coreCount}</strong><span>từ cốt lõi trong PDF và bài luyện</span></div>
          <div><strong>${sessionCount}</strong><span>động từ từ DOCX “Ngữ pháp 아/어요”</span></div>
          <div><strong>${data.grammar.politeEnding.detailRules.length}</strong><span>nhóm quy tắc và co âm có ví dụ</span></div>
        </div>
      </section>

      <nav class="lesson-three-jumpbar" aria-label="Nội dung Bài 4">
        <button class="active" type="button" data-ko4-scroll="ko4Notes"><span>00</span>Ghi chú</button>
        <button type="button" data-ko4-scroll="ko4Vocabulary"><span>01</span>Từ vựng</button>
        <button type="button" data-ko4-scroll="ko4Grammar"><span>02</span>Ngữ pháp</button>
        <button type="button" data-ko4-scroll="ko4Conjugation"><span>03</span>Chia đuôi</button>
        <button type="button" data-ko4-scroll="ko4Opposites"><span>04</span>Trái nghĩa</button>
        <button type="button" data-ko4-scroll="ko4Garden"><span>05</span>Khu vườn</button>
        <button type="button" data-ko4-scroll="ko4Practice"><span>06</span>Luyện tập</button>
        <button type="button" data-ko4-scroll="ko4Slides"><span>07</span>Theo slide</button>
      </nav>

      <section class="lesson-three-section lesson-four-notes" id="ko4Notes">
        <div class="lesson-three-section-head"><div><span class="section-number">00</span><div><p class="eyebrow">Tách kiến thức theo bài</p><h3>Ghi chú Bài 4</h3></div></div><p>Ôn lại Bài 3 ở đúng chỗ, sau đó tập trung vào hai cấu trúc mới trong PDF.</p></div>
        <div class="lesson-four-boundary-grid"><article class="review"><span><i data-lucide="history"></i></span><small>Ôn Bài 3</small><h4>Đại từ chỉ định & sở hữu</h4><p>${escapeHtml(data.lessonBoundary.review)}</p></article><article class="new"><span><i data-lucide="sparkles"></i></span><small>Mới ở Bài 4</small><h4>이/가 + -아요/-어요</h4><p>${escapeHtml(data.lessonBoundary.new)}</p></article></div>
        <div class="lesson-four-review-table"><table><thead><tr><th>Vị trí</th><th>Đồ vật · dạng nói/chủ ngữ</th><th>Địa điểm</th><th>Nghĩa</th></tr></thead><tbody>${data.reviewDemonstratives.map((row) => `<tr><td>${escapeHtml(row.position)}</td><td><button type="button" data-speak-ko="${escapeHtml(row.object.text.split(" /")[0])}"><strong>${escapeHtml(row.object.text)}</strong><small>${escapeHtml(row.object.romanization)} · ${escapeHtml(row.object.reading)}</small></button></td><td><button type="button" data-speak-ko="${escapeHtml(row.place.text)}"><strong>${escapeHtml(row.place.text)}</strong><small>${escapeHtml(row.place.romanization)} · ${escapeHtml(row.place.reading)}</small></button></td><td>${escapeHtml(row.meaning)}</td></tr>`).join("")}</tbody></table></div>
        <div class="lesson-four-accuracy-grid">${data.accuracyNotes.map((note) => `<article><span><i data-lucide="badge-alert"></i></span><div><small>Đính chính tài liệu</small><s>${escapeHtml(note.wrong)}</s><strong>${escapeHtml(note.correct)}</strong><p>${escapeHtml(note.explanation)}</p></div></article>`).join("")}</div>
      </section>

      <section class="lesson-three-section" id="ko4Vocabulary">
        <div class="lesson-three-section-head"><div><span class="section-number">01</span><div><p class="eyebrow">Cốt lõi · bổ sung · ôn tập</p><h3>Từ vựng Bài 4</h3></div></div><p>Tìm theo chữ Hàn, Romanization, cách đọc hoặc nghĩa; nhấn loa để nghe.</p></div>
        <div class="lesson-three-vocab-toolbar"><label class="lesson-search-field"><i data-lucide="search"></i><input id="ko4VocabSearch" type="search" placeholder="Tìm từ trong Bài 4…" /></label><div class="lesson-three-filter-row" id="ko4VocabFilters"></div></div>
        <div class="lesson-three-vocab-grid" id="ko4VocabularyGrid"></div>
        <p class="lesson-three-vocab-count" id="ko4VocabCount"></p>
      </section>

      <section class="lesson-three-section" id="ko4Grammar">
        <div class="lesson-three-section-head"><div><span class="section-number">02</span><div><p class="eyebrow">Ghi chú Buổi 4 · 아/어요</p><h3>Ngữ pháp trọng tâm</h3></div></div><p>Nhìn trật tự câu, chọn đuôi theo nguyên âm cuối rồi kiểm tra dạng co âm.</p></div>
        <article class="lesson-four-order-card">
          <div class="lesson-four-order-copy"><span>S + O + V</span><h4>${escapeHtml(data.grammar.sentenceOrder.title)}</h4><p>${escapeHtml(data.grammar.sentenceOrder.explanation)}</p></div>
          <div class="lesson-four-order-rows">${data.grammar.sentenceOrder.rows.map((row) => `<div class="lesson-four-order-row"><div><small>${escapeHtml(row.language)}</small><strong>${escapeHtml(row.roles.join(" + "))}</strong></div><div class="lesson-four-order-track">${row.words.map((word, index) => `<span data-role="${escapeHtml(row.roles[index])}"><small>${escapeHtml(row.roles[index])}</small><b>${escapeHtml(word)}</b></span>`).join('<i data-lucide="arrow-right"></i>')}</div><p>${escapeHtml(row.sentence)}${row.romanization ? `<small>${escapeHtml(row.romanization)} · ${escapeHtml(row.reading)}</small>` : ""}</p>${row.romanization ? `<button type="button" data-speak-ko="${escapeHtml(row.sentence)}" aria-label="Nghe ${escapeHtml(row.sentence)}"><i data-lucide="volume-2"></i></button>` : ""}</div>`).join("")}</div>
        </article>
        <div class="lesson-four-grammar-grid">
          <article class="lesson-four-grammar-card"><span>01 · ${escapeHtml(data.grammar.subjectParticles.title)}</span><h4>N + 이/가 + A/V-아요/어요</h4><p>${escapeHtml(data.grammar.subjectParticles.explanation)}</p><div class="lesson-four-subject-rules">${data.grammar.subjectParticles.rules.map((rule) => `<button type="button" data-speak-ko="${escapeHtml(rule.example)}"><small>${escapeHtml(rule.condition)} → <b>${escapeHtml(rule.particle)}</b></small><strong>${escapeHtml(rule.example)}</strong><em>${escapeHtml(rule.romanization)} · ${escapeHtml(rule.reading)}</em><span>${escapeHtml(rule.meaning)}</span><i data-lucide="volume-2"></i></button>`).join("")}</div></article>
          <article class="lesson-four-grammar-card"><span>02 · ${escapeHtml(data.grammar.politeEnding.title)}</span><h4>Thân từ + -아요/-어요</h4><p>${escapeHtml(data.grammar.politeEnding.explanation)}</p><div class="lesson-four-ending-rules">${data.grammar.politeEnding.rules.map((rule) => `<div><small>${escapeHtml(rule.condition)}</small><strong>${escapeHtml(rule.ending)} · ${escapeHtml(rule.reading)}</strong><span>${escapeHtml(rule.example)}</span></div>`).join("")}</div></article>
        </div>
        <div class="lesson-four-ending-flow" aria-label="Bốn bước chia đuôi -아요/-어요">${data.grammar.politeEnding.steps.map((step, index) => `<article><span>${escapeHtml(step.number)}</span><i data-lucide="${escapeHtml(step.icon)}"></i><div><strong>${escapeHtml(step.title)}</strong><small>${escapeHtml(step.detail)}</small></div>${index < data.grammar.politeEnding.steps.length - 1 ? '<b data-lucide="chevron-right"></b>' : ""}</article>`).join("")}</div>
        <div class="lesson-four-rule-lab">
          <div class="lesson-four-rule-lab-head"><div><p class="eyebrow">Chọn một nhóm để xem công thức</p><h4>9 nhóm chia đuôi và co âm</h4></div><span><i data-lucide="mouse-pointer-click"></i>Tương tác</span></div>
          <div class="lesson-four-rule-tabs" id="ko4RuleTabs"></div>
          <div class="lesson-four-rule-stage" id="ko4RuleStage"></div>
        </div>
      </section>

      <section class="lesson-three-section" id="ko4Conjugation">
        <div class="lesson-three-section-head"><div><span class="section-number">03</span><div><p class="eyebrow">Phòng chia đuôi</p><h3>Từ dạng từ điển đến câu lịch sự</h3></div></div><p>Chọn một từ, tự đoán cách chia rồi mở đáp án và nghe phát âm.</p></div>
        <div class="lesson-four-conjugation-lab"><div class="lesson-four-conjugation-list" id="ko4ConjugationList"></div><div class="lesson-four-conjugation-stage" id="ko4ConjugationStage"></div></div>
      </section>

      <section class="lesson-three-section" id="ko4Opposites">
        <div class="lesson-three-section-head"><div><span class="section-number">04</span><div><p class="eyebrow">9 cặp đối chiếu</p><h3>Các cặp từ trái nghĩa</h3></div></div><p>Học theo cặp giúp ghi nhớ nhanh; 작다 và 적다 được tách rõ để tránh nhầm.</p></div>
        <div class="lesson-four-opposites" id="ko4OppositesGrid"></div>
      </section>

      <section class="lesson-three-section" id="ko4Garden">
        <div class="lesson-three-section-head"><div><span class="section-number">05</span><div><p class="eyebrow">Tương tác theo trang 50–55</p><h3>Xây khu vườn & nghe Minji kể</h3></div></div><p>Chọn rau củ để tạo câu giới thiệu, sau đó nghe từng câu trong đoạn hội thoại nguồn.</p></div>
        <div class="lesson-four-garden-layout"><div class="lesson-four-garden-builder"><div class="lesson-four-ingredient-grid" id="ko4GardenIngredients"></div><div class="lesson-four-garden-result" id="ko4GardenResult"></div></div><div class="lesson-four-dialogue"><div class="lesson-four-dialogue-title"><small>Hội thoại nguồn</small><h4>${escapeHtml(data.dialogue.title)}</h4><p>${escapeHtml(data.dialogue.romanization)} · ${escapeHtml(data.dialogue.reading)}</p><strong>${escapeHtml(data.dialogue.meaning)}</strong></div><div id="ko4DialogueLines"></div></div></div>
      </section>

      <section class="lesson-three-section" id="ko4Practice">
        <div class="lesson-three-section-head"><div><span class="section-number">06</span><div><p class="eyebrow">Tương tác thay slide tĩnh</p><h3>Sửa lỗi và tự kiểm tra</h3></div></div><p>Mười hai lỗi từ trang 16 và mười hai câu hỏi trong đúng phạm vi đã học.</p></div>
        <div class="lesson-three-practice-tabs"><button class="active" type="button" data-ko4-practice="corrections">Sửa lỗi sai</button><button type="button" data-ko4-practice="quiz">Trắc nghiệm</button></div>
        <div id="ko4PracticeContent"></div>
      </section>

      <section class="lesson-three-section" id="ko4Slides">
        <div class="lesson-three-section-head"><div><span class="section-number">07</span><div><p class="eyebrow">34 trang đã kiểm tra</p><h3>Học theo slide Bài 4</h3></div></div><p>Tra cứu trang gốc khi cần; từ khóa tiếng Hàn bên dưới đều có phiên âm và nghĩa.</p></div>
        <div class="lesson-three-slide-toolbar"><label class="lesson-search-field"><i data-lucide="search"></i><input id="ko4SlideSearch" type="search" placeholder="Tìm trang hoặc từ khóa…" /></label><div class="lesson-three-filter-row" id="ko4SlideFilters"></div></div>
        <div class="lesson-three-slide-grid" id="ko4SlideGrid"></div>
      </section>
    </section>
  `;
  app.querySelector("#ko-lesson-vocab")?.insertAdjacentHTML("beforebegin", lessonView);

  function renderVocabularyFilters() {
    const filters = [
      { id: "all", title: "Tất cả" },
      ...data.vocabularyGroups.map((group) => ({ id: group.id, title: group.title })),
      ...data.reviewGroups.map((group) => ({ id: group.id, title: group.title })),
    ];
    app.querySelector("#ko4VocabFilters").innerHTML = filters.map((filter) => `<button class="${filter.id === vocabFilter ? "active" : ""}" type="button" data-ko4-vocab-filter="${escapeHtml(filter.id)}">${escapeHtml(filter.title)}</button>`).join("");
  }

  function renderVocabulary() {
    const query = normalize(app.querySelector("#ko4VocabSearch")?.value);
    const filtered = allWords.filter((word) => {
      const inGroup = vocabFilter === "all" || word.groupId === vocabFilter;
      const content = normalize([word.text, word.romanization, word.reading, word.meaning, word.note, word.groupTitle].join(" "));
      return inGroup && (!query || content.includes(query));
    });
    const scopeLabel = { core: "Trong PDF", extension: "Bạn bổ sung", session4: "DOCX Buổi 4", review: "Ôn Bài 1–3" };
    app.querySelector("#ko4VocabularyGrid").innerHTML = filtered.length ? filtered.map((word) => `
      <article class="lesson-three-vocab-card lesson-four-word-${word.scope}">
        <button type="button" data-speak-ko="${escapeHtml(word.text)}" aria-label="Nghe ${escapeHtml(word.text)}"><i data-lucide="volume-2"></i></button>
        <small>${escapeHtml(word.groupTitle)} · ${scopeLabel[word.scope]}</small><strong>${escapeHtml(word.text)}</strong><p>${escapeHtml(word.romanization)} · ${escapeHtml(word.reading)}</p><b>${escapeHtml(word.meaning)}</b>${word.note ? `<em>${escapeHtml(word.note)}</em>` : ""}
      </article>
    `).join("") : '<div class="empty-state">Không tìm thấy từ phù hợp.</div>';
    app.querySelector("#ko4VocabCount").textContent = `Đang hiện ${filtered.length}/${allWords.length} từ · ${coreCount} từ PDF · ${sessionCount} từ DOCX · ${extensionCount} bổ sung · ${reviewWords.length} ôn tập`;
    refreshIcons();
  }

  function renderGrammarRule() {
    const rules = data.grammar.politeEnding.detailRules;
    const active = rules[grammarRuleIndex];
    app.querySelector("#ko4RuleTabs").innerHTML = rules.map((rule, index) => `<button class="${index === grammarRuleIndex ? "active" : ""}" type="button" data-ko4-rule="${index}">${escapeHtml(rule.label)}</button>`).join("");
    app.querySelector("#ko4RuleStage").innerHTML = `<div class="lesson-four-rule-summary"><small>Điều kiện</small><h5>${escapeHtml(active.condition)}</h5><strong>${escapeHtml(active.formula)}</strong><p>${escapeHtml(active.note)}</p></div><div class="lesson-four-rule-examples">${active.examples.map((item) => `<button type="button" data-speak-ko="${escapeHtml(item.result)}"><span><small>Dạng từ điển</small><b>${escapeHtml(item.base)}</b></span><i data-lucide="arrow-right"></i><span><small>Dạng lịch sự</small><strong>${escapeHtml(item.result)}</strong></span><em>${escapeHtml(item.romanization)} · ${escapeHtml(item.reading)}<br>${escapeHtml(item.meaning)}</em><i data-lucide="volume-2"></i></button>`).join("")}</div>`;
    refreshIcons();
  }

  function renderConjugation() {
    app.querySelector("#ko4ConjugationList").innerHTML = data.conjugationItems.map((item, index) => `<button class="${index === conjugationIndex ? "active" : ""}" type="button" data-ko4-conjugation="${index}"><strong>${escapeHtml(item.base)}</strong><span>${escapeHtml(item.baseMeaning)}</span></button>`).join("");
    const item = data.conjugationItems[conjugationIndex];
    app.querySelector("#ko4ConjugationStage").innerHTML = `
      <div class="lesson-four-conjugation-question"><small>Dạng từ điển</small><strong>${escapeHtml(item.base)}</strong><span>${escapeHtml(item.baseMeaning)}</span><i data-lucide="arrow-down"></i></div>
      ${conjugationRevealed ? `<button class="lesson-four-conjugation-answer" type="button" data-speak-ko="${escapeHtml(item.answer)}"><small>Đáp án</small><strong>${escapeHtml(item.answer)}</strong><span>${escapeHtml(item.romanization)} · ${escapeHtml(item.reading)}</span><em>${escapeHtml(item.rule)}</em><i data-lucide="volume-2"></i></button>` : '<div class="lesson-four-conjugation-hidden">Tự đoán trước khi mở đáp án</div>'}
      <button class="primary-button" type="button" data-ko4-conjugation-reveal><i data-lucide="${conjugationRevealed ? "eye-off" : "eye"}"></i><span>${conjugationRevealed ? "Ẩn đáp án" : "Xem đáp án"}</span></button>
    `;
    refreshIcons();
  }

  function renderOpposites() {
    app.querySelector("#ko4OppositesGrid").innerHTML = data.opposites.map((pair) => {
      const left = annotationLookup.get(cleanTerm(pair.left.text));
      const right = annotationLookup.get(cleanTerm(pair.right.text));
      return `<article><button type="button" data-speak-ko="${escapeHtml(pair.left.text)}"><strong>${escapeHtml(pair.left.text)}</strong><small>${escapeHtml(left?.romanization || "")} · ${escapeHtml(left?.reading || "")}</small><span>${escapeHtml(pair.left.meaning)}</span></button><i data-lucide="arrow-left-right"></i><button type="button" data-speak-ko="${escapeHtml(pair.right.text)}"><strong>${escapeHtml(pair.right.text)}</strong><small>${escapeHtml(right?.romanization || "")} · ${escapeHtml(right?.reading || "")}</small><span>${escapeHtml(pair.right.meaning)}</span></button></article>`;
    }).join("");
    refreshIcons();
  }

  function hasBatchim(word) {
    const chars = [...String(word || "").trim()];
    const code = chars.at(-1)?.charCodeAt(0) || 0;
    return code >= 0xac00 && code <= 0xd7a3 && (code - 0xac00) % 28 !== 0;
  }

  function renderGarden() {
    app.querySelector("#ko4GardenIngredients").innerHTML = data.gardenIngredients.map((item) => `<button class="${selectedGarden.has(item.text) ? "active" : ""}" type="button" data-ko4-ingredient="${escapeHtml(item.text)}"><span>${item.emoji}</span><strong>${escapeHtml(item.text)}</strong><small>${escapeHtml(item.meaning)}</small></button>`).join("");
    const chosen = data.gardenIngredients.filter((item) => selectedGarden.has(item.text));
    const names = chosen.map((item) => item.text);
    const last = names.at(-1) || "채소";
    const particle = hasBatchim(last) ? "이" : "가";
    const sentence = names.length ? `${names.join(", ")}${particle} 있어요.` : "채소가 없어요.";
    app.querySelector("#ko4GardenResult").innerHTML = `<div class="lesson-four-garden-visual">${chosen.map((item) => `<span title="${escapeHtml(item.meaning)}">${item.emoji}</span>`).join("") || "🌱"}</div><small>Câu giới thiệu của bạn</small><strong>여기는 우리 공동 텃밭이에요.</strong><button type="button" data-speak-ko="${escapeHtml(sentence)}"><b>${escapeHtml(sentence)}</b><i data-lucide="volume-2"></i></button><em>Đây là vườn rau cộng đồng của chúng tôi. Có ${chosen.map((item) => item.meaning).join(", ") || "rau củ"}.</em>`;
    refreshIcons();
  }

  function renderDialogue() {
    app.querySelector("#ko4DialogueLines").innerHTML = data.dialogue.lines.map((line, index) => `<button type="button" data-speak-ko="${escapeHtml(line.text)}"><span>${String(index + 1).padStart(2, "0")}</span><strong>${escapeHtml(line.text)}</strong><small>${escapeHtml(line.romanization)} · ${escapeHtml(line.reading)}</small><em>${escapeHtml(line.meaning)}</em><i data-lucide="volume-2"></i></button>`).join("");
  }

  function renderCorrections() {
    app.querySelector("#ko4PracticeContent").innerHTML = `<div class="lesson-three-correction-grid">${data.corrections.map((item, index) => `<article class="lesson-three-correction-card"><small>Lỗi ${index + 1}</small><p>${escapeHtml(item.wrong)}</p><button type="button" data-ko4-reveal="${index}">Xem cách sửa</button><div class="lesson-three-correction-answer" hidden><strong>${escapeHtml(item.correct)}</strong><span>${escapeHtml(item.reason)}</span></div></article>`).join("")}</div>`;
  }

  function renderQuiz() {
    const item = data.quiz[quizIndex];
    app.querySelector("#ko4PracticeContent").innerHTML = `<div class="lesson-three-quiz"><div class="lesson-three-quiz-head"><span>Câu ${quizIndex + 1}/${data.quiz.length}</span><span>${quizCorrect} đúng · ${quizTotal} đã làm</span></div><h4>${escapeHtml(item.prompt)}</h4><div class="lesson-three-options">${item.options.map((option, index) => `<button type="button" data-ko4-answer="${escapeHtml(option)}"><span>${String.fromCharCode(65 + index)}</span>${escapeHtml(option)}</button>`).join("")}</div><div class="lesson-three-feedback" id="ko4Feedback">Chọn một đáp án để kiểm tra.</div><button class="primary-button lesson-three-next" id="ko4NextQuestion" type="button" ${quizAnswered ? "" : "disabled"}><i data-lucide="arrow-right"></i><span>Câu tiếp theo</span></button></div>`;
    refreshIcons();
  }

  function renderPractice() {
    app.querySelectorAll("[data-ko4-practice]").forEach((button) => button.classList.toggle("active", button.dataset.ko4Practice === practiceMode));
    if (practiceMode === "corrections") renderCorrections(); else renderQuiz();
  }

  function renderSlideFilters() {
    const filters = [["all", "Tất cả"], ["vocabulary", "Từ vựng"], ["grammar", "Ngữ pháp"], ["grammar-practice", "Luyện ngữ pháp"], ["general-practice", "Luyện tập chung"]];
    app.querySelector("#ko4SlideFilters").innerHTML = filters.map(([id, label]) => `<button class="${id === slideFilter ? "active" : ""}" type="button" data-ko4-slide-filter="${id}">${label}</button>`).join("");
  }

  function renderKeyword(keyword) {
    const annotation = annotationLookup.get(cleanTerm(keyword));
    if (!annotation) return `<span class="lesson-three-slide-line is-plain">${escapeHtml(keyword)}</span>`;
    return `<span class="lesson-three-slide-line is-annotated"><b>${escapeHtml(keyword)}</b><small><span>${escapeHtml(annotation.romanization)}</span><i aria-hidden="true">·</i><span>${escapeHtml(annotation.reading)}</span></small><em>${escapeHtml(annotation.meaning)}</em></span>`;
  }

  function renderSlides() {
    const query = normalize(app.querySelector("#ko4SlideSearch")?.value);
    const filtered = data.slides.filter((slide) => {
      const inSection = slideFilter === "all" || slide.section === slideFilter;
      const content = normalize([slide.title, slide.summary, ...slide.keywords].join(" "));
      return inSection && (!query || content.includes(query));
    });
    app.querySelector("#ko4SlideGrid").innerHTML = filtered.length ? filtered.map((slide) => `
      <article class="lesson-three-slide-card"><button class="lesson-slide-preview" type="button" data-open-ko-slide="assets/korean/lesson-4/slides/slide-${String(slide.index).padStart(2, "0")}.png" data-ko-slide-title="Bài 4 · Trang ${slide.index} · ${escapeHtml(slide.title)}"><img src="assets/korean/lesson-4/slides/slide-${String(slide.index).padStart(2, "0")}.png" alt="Bài 4 trang ${slide.index}: ${escapeHtml(slide.title)}" loading="lazy" /><span><i data-lucide="maximize-2"></i>Mở trang gốc</span></button><div class="lesson-three-slide-body"><div class="lesson-three-slide-meta"><span>Trang ${slide.index}/${data.source.pageCount}</span><em>${escapeHtml(sectionLabels[slide.section])}</em></div><h4>${escapeHtml(slide.title)}</h4><p>${escapeHtml(slide.summary)}</p><div class="lesson-three-slide-lines">${slide.keywords.map(renderKeyword).join("")}</div></div></article>
    `).join("") : '<div class="empty-state">Không có trang phù hợp.</div>';
    refreshIcons();
  }

  function readLessonFourCompletion() {
    try { return localStorage.getItem("hanReview.korean.lesson4.completed") === "true"; } catch { return false; }
  }
  function writeLessonFourCompletion(value) {
    try { localStorage.setItem("hanReview.korean.lesson4.completed", String(value)); } catch {}
  }
  function updateProgress() {
    const lessonFourDone = readLessonFourCompletion();
    const button = app.querySelector("[data-ko4-complete]");
    window.updateKoreanProgress();
    if (button) {
      button.classList.toggle("completed", lessonFourDone);
      button.querySelector("span").textContent = lessonFourDone ? "Đã học" : "Đánh dấu đã học";
      button.querySelector("i, svg")?.setAttribute("data-lucide", lessonFourDone ? "circle-check-big" : "circle");
    }
    refreshIcons();
  }

  const jumpIds = ["ko4Notes", "ko4Vocabulary", "ko4Grammar", "ko4Conjugation", "ko4Opposites", "ko4Garden", "ko4Practice", "ko4Slides"];
  function setActiveJump(id) {
    app.querySelectorAll("[data-ko4-scroll]").forEach((button) => button.classList.toggle("active", button.dataset.ko4Scroll === id));
  }
  function updateJump() {
    if (!app.querySelector("#ko-lesson-4")?.classList.contains("active")) return;
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

  renderVocabularyFilters();
  renderVocabulary();
  renderGrammarRule();
  renderConjugation();
  renderOpposites();
  renderGarden();
  renderDialogue();
  renderPractice();
  renderSlideFilters();
  renderSlides();
  updateProgress();

  app.querySelector("#ko4VocabSearch").addEventListener("input", renderVocabulary);
  app.querySelector("#ko4SlideSearch").addEventListener("input", renderSlides);
  app.addEventListener("click", (event) => {
    const vocabButton = event.target.closest("[data-ko4-vocab-filter]");
    if (vocabButton) { vocabFilter = vocabButton.dataset.ko4VocabFilter; renderVocabularyFilters(); renderVocabulary(); }
    const ruleButton = event.target.closest("[data-ko4-rule]");
    if (ruleButton) { grammarRuleIndex = Number(ruleButton.dataset.ko4Rule); renderGrammarRule(); }
    const conjugationButton = event.target.closest("[data-ko4-conjugation]");
    if (conjugationButton) { conjugationIndex = Number(conjugationButton.dataset.ko4Conjugation); conjugationRevealed = false; renderConjugation(); }
    if (event.target.closest("[data-ko4-conjugation-reveal]")) { conjugationRevealed = !conjugationRevealed; renderConjugation(); }
    const ingredientButton = event.target.closest("[data-ko4-ingredient]");
    if (ingredientButton) {
      const term = ingredientButton.dataset.ko4Ingredient;
      if (selectedGarden.has(term)) selectedGarden.delete(term); else selectedGarden.add(term);
      renderGarden();
    }
    const practiceButton = event.target.closest("[data-ko4-practice]");
    if (practiceButton) { practiceMode = practiceButton.dataset.ko4Practice; renderPractice(); }
    const revealButton = event.target.closest("[data-ko4-reveal]");
    if (revealButton) {
      const answer = revealButton.nextElementSibling;
      answer.hidden = !answer.hidden;
      revealButton.textContent = answer.hidden ? "Xem cách sửa" : "Ẩn cách sửa";
    }
    const answerButton = event.target.closest("[data-ko4-answer]");
    if (answerButton && !quizAnswered) {
      const item = data.quiz[quizIndex];
      quizAnswered = true;
      quizTotal += 1;
      const correct = answerButton.dataset.ko4Answer === item.answer;
      if (correct) quizCorrect += 1;
      app.querySelectorAll("[data-ko4-answer]").forEach((button) => {
        button.disabled = true;
        if (button.dataset.ko4Answer === item.answer) button.classList.add("correct");
        else if (button === answerButton) button.classList.add("incorrect");
      });
      app.querySelector("#ko4Feedback").textContent = `${correct ? "Đúng rồi!" : "Chưa đúng."} ${item.explanation}`;
      app.querySelector("#ko4NextQuestion").disabled = false;
    }
    if (event.target.closest("#ko4NextQuestion")) { quizIndex = (quizIndex + 1) % data.quiz.length; quizAnswered = false; renderQuiz(); }
    const slideButton = event.target.closest("[data-ko4-slide-filter]");
    if (slideButton) { slideFilter = slideButton.dataset.ko4SlideFilter; renderSlideFilters(); renderSlides(); }
    const jumpButton = event.target.closest("[data-ko4-scroll]");
    if (jumpButton) { setActiveJump(jumpButton.dataset.ko4Scroll); app.querySelector(`#${jumpButton.dataset.ko4Scroll}`)?.scrollIntoView({ behavior: "smooth", block: "start" }); }
    if (event.target.closest("[data-ko4-complete]")) { writeLessonFourCompletion(!readLessonFourCompletion()); updateProgress(); }
  });
  window.addEventListener("scroll", scheduleJump, { passive: true });
  window.addEventListener("resize", scheduleJump);
  refreshIcons();
})();
