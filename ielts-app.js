(() => {
  "use strict";

  const data = window.IELTS_COURSE;
  const app = document.querySelector("#englishApp");
  if (!data || !app) return;

  const escapeHtml = (value) =>
    String(value ?? "").replace(/[&<>'"]/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    })[character]);

  const list = (items, className = "") => `
    <ul class="${className}">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
  `;

  const numberedSteps = (items) => `
    <div class="ielts-step-list">
      ${items.map((item, index) => `
        <article class="ielts-step">
          <span>${String(index + 1).padStart(2, "0")}</span>
          <div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p></div>
        </article>
      `).join("")}
    </div>
  `;

  const structureStrip = (items) => `
    <div class="writing-structure">
      ${items.map((item, index) => `
        <article>
          <span>${index + 1}</span>
          <div><strong>${escapeHtml(item.part)}</strong><p>${escapeHtml(item.text)}</p></div>
        </article>
      `).join("")}
    </div>
  `;

  const vocabularyRows = (items) => `
    <div class="ielts-vocab-list">
      ${items.map((item) => `
        <div><strong>${escapeHtml(item.label)}</strong><span>${escapeHtml(item.words)}</span></div>
      `).join("")}
    </div>
  `;

  const completeButton = (moduleId) => `
    <button class="secondary-button ielts-complete-button" type="button" data-complete-ielts="${escapeHtml(moduleId)}">
      <i data-lucide="circle"></i><span>Đánh dấu đã học</span>
    </button>
  `;

  app.innerHTML = `
    <header class="app-header course-header ielts-header">
      <div class="brand">
        <span class="course-logo english-logo" aria-hidden="true">IE</span>
        <div><h1>Sổ học tiếng Anh</h1><p>Reading · Writing · IELTS notes</p></div>
      </div>
      <button class="language-switch" type="button" data-switch-language>
        <i data-lucide="languages"></i><span>Đổi ngôn ngữ</span>
      </button>
      <div class="header-stats ielts-stats" aria-label="Tổng quan IELTS">
        <div><strong>3</strong><span>bài Reading</span></div>
        <div><strong>2</strong><span>Writing task</span></div>
        <div><strong id="ieltsStatCompleted">0/5</strong><span>đã học</span></div>
      </div>
    </header>

    <main class="app-shell course-shell ielts-shell">
      <nav class="course-tabbar ielts-tabbar" aria-label="Khu vực học tiếng Anh">
        <button class="course-tab active" type="button" data-english-tab="en-overview"><i data-lucide="layout-dashboard"></i><span>Tổng quan</span></button>
        <button class="course-tab" type="button" data-english-tab="en-reading"><i data-lucide="book-open-text"></i><span>Reading</span></button>
        <button class="course-tab" type="button" data-english-tab="en-writing"><i data-lucide="pen-line"></i><span>Writing</span></button>
      </nav>

      <section class="course-view active" id="en-overview">
        <div class="dashboard-band ielts-hero">
          <div>
            <p class="eyebrow">English notebook · Reading & Writing</p>
            <h2>Chọn một kỹ năng và học từng phần nhỏ.</h2>
            <p class="band-copy">Reading gồm ba chuyên đề. Writing được tách rõ thành Task 1 và Task 2 để tra cứu nhanh hơn.</p>
            <div class="hero-actions">
              <button class="primary-button" type="button" data-open-english-tab="en-reading-process"><i data-lucide="book-open-text"></i><span>Mở Reading</span></button>
              <button class="secondary-button" type="button" data-open-english-tab="en-task1"><i data-lucide="pen-line"></i><span>Mở Writing</span></button>
            </div>
          </div>
          <div class="ielts-hero-art" aria-label="Reading và Writing">
            <span>R</span><span>W</span><small>scan · plan · write</small>
          </div>
        </div>

        <div class="ielts-category-grid">
          <article class="ielts-category-card reading-category">
            <div class="category-card-head">
              <span class="category-icon"><i data-lucide="book-open-text"></i></span>
              <div><p class="eyebrow">03 chuyên đề</p><h3>Reading</h3></div>
            </div>
            <p>Học cách định vị thông tin, theo mạch bài đọc và xử lý từng dạng câu hỏi.</p>
            <div class="category-topic-list">
              <button type="button" data-open-english-tab="en-reading-process"><span>01</span>Quy trình Reading</button>
              <button type="button" data-open-english-tab="en-tfng"><span>02</span>True / False / Not Given</button>
              <button type="button" data-open-english-tab="en-gap"><span>03</span>Gap-filling</button>
            </div>
          </article>
          <article class="ielts-category-card writing-category">
            <div class="category-card-head">
              <span class="category-icon"><i data-lucide="pen-line"></i></span>
              <div><p class="eyebrow">02 phần</p><h3>Writing</h3></div>
            </div>
            <p>Tra nhanh cấu trúc bài, cách lập ý và vốn từ cho hai phần Academic Writing.</p>
            <div class="category-topic-list">
              <button type="button" data-open-english-tab="en-task1"><span>01</span>Writing Task 1</button>
              <button type="button" data-open-english-tab="en-task2"><span>02</span>Writing Task 2</button>
            </div>
          </article>
        </div>

        <details class="ielts-reference-panel">
          <summary><i data-lucide="sparkles"></i><span>Tiêu chí chấm và tài liệu tham khảo</span><i data-lucide="chevron-down"></i></summary>
          <div class="ielts-reference-content">
            <section class="ielts-panel">
              <div class="korean-panel-head"><div><span class="section-number">4</span><h3>Tiêu chí chấm xuyên suốt</h3></div></div>
              <div class="assessment-grid">
                ${data.assessment.map((item) => `<article><span>${escapeHtml(item.code)}</span><strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.text)}</p></article>`).join("")}
              </div>
            </section>
            <section class="source-note ielts-source-note">
              <i data-lucide="files"></i><div><strong>Nguồn bài học</strong><p>${escapeHtml(data.sourceFiles.join(" · "))}</p></div>
            </section>
            <div class="ielts-glossary">
              ${data.glossary.map((item) => `<article><strong>${escapeHtml(item.term)}</strong><p>${escapeHtml(item.meaning)}</p></article>`).join("")}
            </div>
          </div>
        </details>
      </section>

      <section class="course-view english-section-view" id="en-reading">
        <div class="section-head english-section-head">
          <div><p class="eyebrow">Reading</p><h2>Đọc có chiến lược, tìm đúng thông tin</h2></div>
          <p>Chọn một chuyên đề để bắt đầu.</p>
        </div>
        <nav class="ielts-topic-tabs reading-topic-tabs" data-topic-group="en-reading" aria-label="Chuyên đề Reading">
          <button class="ielts-topic-tab active" type="button" data-english-topic="en-reading-process"><i data-lucide="route"></i><span>Quy trình</span></button>
          <button class="ielts-topic-tab" type="button" data-english-topic="en-tfng"><i data-lucide="list-checks"></i><span>T / F / NG</span></button>
          <button class="ielts-topic-tab" type="button" data-english-topic="en-gap"><i data-lucide="text-cursor-input"></i><span>Gap-filling</span></button>
        </nav>
        <section class="ielts-topic-view active" id="en-reading-process">
          <div class="section-head ielts-topic-heading"><div><p class="eyebrow">Reading · Quy trình</p><h2>Đi theo câu hỏi, không đọc lan man</h2></div>${completeButton("reading")}</div>
        <section class="ielts-panel">
          <div class="korean-panel-head"><div><span class="section-number">01</span><h3>Passage 1 · Ba bước lặp</h3></div><p>Neo vào thành tố của câu hỏi.</p></div>
          ${numberedSteps(data.readingProcess.passage1)}
        </section>
        <div class="ielts-two-column">
          <section class="ielts-panel">
            <div class="korean-panel-head"><div><span class="section-number">02</span><h3>Passage 2 · Nhận dạng dạng bài</h3></div></div>
            <div class="strategy-cards">
              ${data.readingProcess.passage2.map((item) => `<article><span>${escapeHtml(item.order)}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p></article>`).join("")}
            </div>
          </section>
          <section class="ielts-panel">
            <div class="korean-panel-head"><div><span class="section-number">03</span><h3>Thứ tự ưu tiên thành tố</h3></div></div>
            <div class="priority-chain">${data.readingProcess.elementPriority.map((item, index) => `<span><b>${index + 1}</b>${escapeHtml(item)}</span>`).join("")}</div>
            <h4 class="mini-heading">Khử phần râu ria</h4>${list(data.readingProcess.reduceNoise, "check-list")}
          </section>
        </div>
        <section class="ielts-panel">
          <div class="korean-panel-head"><div><span class="section-number">04</span><h3>Tín hiệu nối mạch</h3></div><p>Từ nhỏ nhưng quyết định phạm vi tìm kiếm.</p></div>
          <div class="signal-grid">${data.readingProcess.trackingSignals.map((item) => `<article><code>${escapeHtml(item.signal)}</code><p>${escapeHtml(item.use)}</p></article>`).join("")}</div>
          <div class="ielts-callout"><i data-lucide="search"></i><p>${escapeHtml(data.readingProcess.fallback)}</p></div>
        </section>
      </section>

        <section class="ielts-topic-view" id="en-tfng">
        <div class="section-head"><div><p class="eyebrow">Reading · T/F/NG</p><h2>Bắt mạch trước, chọn đáp án sau</h2></div>${completeButton("tfng")}</div>
        <section class="ielts-panel">
          <div class="decision-grid">${data.tfng.decisions.map((item) => `<article class="${escapeHtml(item.tone)}"><strong>${escapeHtml(item.answer)}</strong><p>${escapeHtml(item.text)}</p></article>`).join("")}</div>
        </section>
        <div class="ielts-two-column">
          ${data.tfng.flowPatterns.map((item) => `<section class="ielts-panel flow-card"><p class="eyebrow">Mạch tuyến tính</p><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p><blockquote>${escapeHtml(item.example)}</blockquote></section>`).join("")}
        </div>
        <section class="ielts-panel">
          <div class="korean-panel-head"><div><span class="section-number">02</span><h3>Hai kiểu phân bố dữ kiện</h3></div></div>
          <div class="task-type-grid">${data.tfng.taskTypes.map((item) => `<article><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.note)}</p>${list(item.patterns, "check-list")}</article>`).join("")}</div>
        </section>
        <section class="ielts-check-card"><div><p class="eyebrow">Checklist 4 bước</p><h3>Không suy diễn ngoài bài</h3></div>${list(data.tfng.checklist, "check-list")}</section>
      </section>

        <section class="ielts-topic-view" id="en-gap">
        <div class="section-head"><div><p class="eyebrow">Reading · Gap-filling</p><h2>Tìm động từ chính và “hột” của câu</h2></div>${completeButton("gap")}</div>
        <div class="ielts-two-column">
          <section class="ielts-panel"><div class="korean-panel-head"><div><span class="section-number">01</span><h3>Dấu hiệu động từ chính</h3></div></div>${list(data.gapFilling.mainVerbSignals, "grammar-list")}</section>
          <section class="ielts-panel"><div class="korean-panel-head"><div><span class="section-number">!</span><h3>Ba trường hợp cần loại trừ</h3></div></div>${list(data.gapFilling.exclusions, "warning-list")}</section>
        </div>
        <section class="ielts-panel"><div class="korean-panel-head"><div><span class="section-number">02</span><h3>Quy trình tìm từ trung tâm</h3></div></div>${numberedSteps(data.gapFilling.coreSteps)}</section>
        <section class="ielts-panel">
          <div class="korean-panel-head"><div><span class="section-number">03</span><h3>Bốn kiểu biến đổi</h3></div><p>So vị trí thành tố quanh động từ.</p></div>
          <div class="mapping-grid">${data.gapFilling.mappings.map((item) => `<article><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p>${item.example ? `<code>${escapeHtml(item.example)}</code>` : ""}</article>`).join("")}</div>
          <div class="formula-stack">${data.gapFilling.transformations.map((item) => `<code>${escapeHtml(item)}</code>`).join("")}</div>
        </section>
        </section>
      </section>

      <section class="course-view english-section-view" id="en-writing">
        <div class="section-head english-section-head">
          <div><p class="eyebrow">Writing</p><h2>Viết theo khung, phát triển ý rõ ràng</h2></div>
          <p>Chọn Task 1 hoặc Task 2.</p>
        </div>
        <nav class="ielts-topic-tabs writing-topic-tabs" data-topic-group="en-writing" aria-label="Chuyên đề Writing">
          <button class="ielts-topic-tab active" type="button" data-english-topic="en-task1"><i data-lucide="chart-no-axes-combined"></i><span>Task 1</span></button>
          <button class="ielts-topic-tab" type="button" data-english-topic="en-task2"><i data-lucide="notebook-pen"></i><span>Task 2</span></button>
        </nav>
        <section class="ielts-topic-view active" id="en-task1">
          <div class="section-head ielts-topic-heading"><div><p class="eyebrow">Academic Writing</p><h2>Writing Task 1 · Từ overview tới số liệu</h2></div>${completeButton("task1")}</div>
        <section class="ielts-panel"><div class="korean-panel-head"><div><span class="section-number">01</span><h3>Khung bài</h3></div></div>${structureStrip(data.writingTask1.structure)}<div class="formula-box"><span>Intro formula</span><code>${escapeHtml(data.writingTask1.introFormula)}</code></div><div class="question-noun-grid">${data.writingTask1.questionNouns.map((item) => `<article><strong>${escapeHtml(item.label)}</strong><code>${escapeHtml(item.formula)}</code><span>${escapeHtml(item.noun)}</span></article>`).join("")}</div></section>
        <section class="ielts-panel">
          <div class="korean-panel-head"><div><span class="section-number">02</span><h3>Bốn dạng chính trong tài liệu</h3></div><p>Mỗi dạng có overview và cách chia body riêng.</p></div>
          <div class="task1-type-grid">${data.writingTask1.taskTypes.map((item) => `<article><p class="eyebrow">${escapeHtml(item.title)}</p>${list(item.overview, "check-list")}<code>${escapeHtml(item.formula)}</code><p>${escapeHtml(item.body)}</p></article>`).join("")}</div>
        </section>
        <div class="ielts-two-column vocab-columns">
          <section class="ielts-panel"><div class="korean-panel-head"><div><span class="section-number">03</span><h3>Xu hướng & mức độ</h3></div></div>${vocabularyRows(data.writingTask1.trendVocabulary)}</section>
          <section class="ielts-panel"><div class="korean-panel-head"><div><span class="section-number">04</span><h3>Vị trí số liệu</h3></div></div>${vocabularyRows(data.writingTask1.positionVocabulary)}</section>
        </div>
        <section class="ielts-panel"><div class="korean-panel-head"><div><span class="section-number">05</span><h3>Map · động từ và mẫu thay đổi</h3></div></div>${vocabularyRows(data.writingTask1.mapVocabulary)}<div class="formula-stack">${data.writingTask1.mapPatterns.map((item) => `<code>${escapeHtml(item)}</code>`).join("")}</div><div class="direction-tags">${data.writingTask1.directionVocabulary.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div></section>
        <div class="ielts-two-column vocab-columns">
          <section class="ielts-panel"><div class="korean-panel-head"><div><span class="section-number">06</span><h3>So sánh biểu đồ tĩnh</h3></div></div><div class="formula-stack">${data.writingTask1.comparisonPatterns.map((item) => `<code>${escapeHtml(item)}</code>`).join("")}</div></section>
          <section class="ielts-panel"><div class="korean-panel-head"><div><span class="section-number">07</span><h3>Process vocabulary</h3></div></div>${vocabularyRows(data.writingTask1.processVocabulary)}</section>
        </div>
      </section>

        <section class="ielts-topic-view" id="en-task2">
        <div class="section-head"><div><p class="eyebrow">Academic Writing</p><h2>Writing Task 2 · Lập luận theo hai câu hỏi</h2></div>${completeButton("task2")}</div>
        <section class="ielts-panel"><div class="korean-panel-head"><div><span class="section-number">01</span><h3>Khung 4 đoạn</h3></div></div>${structureStrip(data.writingTask2.structure)}</section>
        <div class="ielts-two-column">
          <section class="ielts-panel"><div class="korean-panel-head"><div><span class="section-number">02</span><h3>Ba kiểu mở bài</h3></div></div><div class="intro-type-list">${data.writingTask2.introductionTypes.map((item) => `<article><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.cue)}</p><code>${escapeHtml(item.starter)}</code></article>`).join("")}</div></section>
          <section class="ielts-panel"><div class="korean-panel-head"><div><span class="section-number">03</span><h3>Paraphrase bằng đổi chủ ngữ</h3></div></div>${numberedSteps(data.writingTask2.paraphraseSteps.map((text, index) => ({ title: `Bước ${index + 1}`, text })))}</section>
        </div>
        <section class="ielts-panel idea-matrix-panel">
          <div class="korean-panel-head"><div><span class="section-number">04</span><h3>Ma trận tìm ý</h3></div><p>${escapeHtml(data.writingTask2.ideaMatrix.note)}</p></div>
          <div class="idea-matrix"><div class="matrix-head"><span>Góc nhìn</span>${data.writingTask2.ideaMatrix.columns.map((item) => `<strong>${escapeHtml(item)}</strong>`).join("")}</div>${data.writingTask2.ideaMatrix.rows.map((row) => `<div class="matrix-row"><strong>${escapeHtml(row.area)}</strong><span>${escapeHtml(row.prompts)}</span><span>${escapeHtml(row.prompts)}</span></div>`).join("")}</div>
        </section>
        <section class="ielts-panel"><div class="korean-panel-head"><div><span class="section-number">05</span><h3>Công cụ triển khai thân bài</h3></div></div><div class="body-tool-grid">${data.writingTask2.bodyTools.map((item) => `<article><strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.text)}</p></article>`).join("")}</div></section>
        <section class="ielts-panel"><div class="korean-panel-head"><div><span class="section-number">06</span><h3>Ba đề mẫu để lập dàn ý</h3></div></div><div class="plan-example-list">${data.writingTask2.planExamples.map((item) => `<article><blockquote>${escapeHtml(item.prompt)}</blockquote><p>${escapeHtml(item.thesis)}</p></article>`).join("")}</div></section>
        </section>
      </section>
    </main>
  `;

  const topicParents = {
    "en-reading-process": "en-reading",
    "en-tfng": "en-reading",
    "en-gap": "en-reading",
    "en-task1": "en-writing",
    "en-task2": "en-writing",
  };

  function activateSection(sectionId, shouldScroll = true) {
    if (!app.querySelector(`#${sectionId}.course-view`)) return;
    app.querySelectorAll("[data-english-tab]").forEach((button) => button.classList.toggle("active", button.dataset.englishTab === sectionId));
    app.querySelectorAll(".course-view").forEach((view) => view.classList.toggle("active", view.id === sectionId));
    if (shouldScroll) window.scrollTo({ top: 0, behavior: "smooth" });
    if (window.lucide?.createIcons) window.lucide.createIcons();
  }

  function activateTopic(topicId) {
    const parentId = topicParents[topicId];
    if (!parentId || !app.querySelector(`#${topicId}.ielts-topic-view`)) return;
    activateSection(parentId, false);
    app.querySelectorAll(`#${parentId} [data-english-topic]`).forEach((button) => button.classList.toggle("active", button.dataset.englishTopic === topicId));
    app.querySelectorAll(`#${parentId} .ielts-topic-view`).forEach((view) => view.classList.toggle("active", view.id === topicId));
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (window.lucide?.createIcons) window.lucide.createIcons();
  }

  function activateEnglishTarget(targetId) {
    if (topicParents[targetId]) activateTopic(targetId);
    else activateSection(targetId);
  }

  function loadCompleted() {
    try {
      const saved = JSON.parse(localStorage.getItem("hanReview.ielts.completed") || "[]");
      return new Set(Array.isArray(saved) ? saved : []);
    } catch {
      return new Set();
    }
  }

  let completed = loadCompleted();

  function updateCompletedUI() {
    const validIds = new Set(data.modules.map((module) => module.id));
    completed = new Set([...completed].filter((id) => validIds.has(id)));
    app.querySelectorAll("[data-complete-ielts]").forEach((button) => {
      const done = completed.has(button.dataset.completeIelts);
      button.classList.toggle("completed", done);
      const label = button.querySelector("span");
      if (label) label.textContent = button.classList.contains("module-status") ? (done ? "Đã học" : "Chưa học") : (done ? "Đã học" : "Đánh dấu đã học");
      const icon = button.querySelector("i, svg");
      if (icon) icon.setAttribute("data-lucide", done ? "circle-check-big" : "circle");
    });
    app.querySelectorAll("[data-ielts-module-card]").forEach((card) => card.classList.toggle("completed", completed.has(card.dataset.ieltsModuleCard)));
    app.querySelector("#ieltsStatCompleted").textContent = `${completed.size}/${data.modules.length}`;
    try {
      localStorage.setItem("hanReview.ielts.completed", JSON.stringify([...completed]));
    } catch {
      // Nếu localStorage bị chặn, tiến độ vẫn hoạt động trong phiên hiện tại.
    }
    if (window.lucide?.createIcons) window.lucide.createIcons();
  }

  app.addEventListener("click", (event) => {
    const tabButton = event.target.closest("[data-english-tab]");
    if (tabButton) activateEnglishTarget(tabButton.dataset.englishTab);
    const topicButton = event.target.closest("[data-english-topic]");
    if (topicButton) activateTopic(topicButton.dataset.englishTopic);
    const openButton = event.target.closest("[data-open-english-tab]");
    if (openButton) activateEnglishTarget(openButton.dataset.openEnglishTab);
    const complete = event.target.closest("[data-complete-ielts]");
    if (complete) {
      const id = complete.dataset.completeIelts;
      if (completed.has(id)) completed.delete(id); else completed.add(id);
      updateCompletedUI();
    }
  });

  updateCompletedUI();
})();
