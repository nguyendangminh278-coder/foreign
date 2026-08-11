(() => {
  const root = document.querySelector("#chineseCourseWorkspace");
  const course = window.CHINESE_COURSE;
  if (!root || !course?.lessons?.length) return;

  const STORE = "hanReview.chinese.course.v1";
  const sections = [
    ["guide", "map", "Lộ trình"],
    ["vocab", "languages", "Từ trong bài"],
    ["grammar", "braces", "Ngữ pháp"],
    ["dialogue", "messages-square", "Hội thoại"],
    ["practice", "badge-check", "Luyện nhanh"],
  ];

  const read = (key, fallback) => {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch (_) { return fallback; }
  };
  const write = (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (_) { /* Keep working in memory. */ }
  };
  const saved = read(STORE, {});
  const state = {
    lesson: Math.min(course.lessons.length, Math.max(1, Number(saved.lesson) || 1)),
    section: sections.some(([id]) => id === saved.section) ? saved.section : "guide",
    completed: new Set(Array.isArray(saved.completed) ? saved.completed.map(Number) : []),
    checks: saved.checks && typeof saved.checks === "object" ? saved.checks : {},
    scope: saved.scope === "remembered" ? "remembered" : "unlocked",
    lessonQuery: "",
    lookupQuery: "",
    allowExternal: false,
    externalLoading: false,
    externalResult: null,
    toast: "",
  };

  const escapeHtml = (value = "") => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const normalize = (value = "") => String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();

  const refreshIcons = () => window.lucide?.createIcons?.();
  const lesson = () => course.lessons[state.lesson - 1];
  const completedCount = () => state.completed.size;
  const maxUnlocked = () => {
    let open = 1;
    while (open <= course.lessons.length && state.completed.has(open)) open += 1;
    return Math.min(course.lessons.length, open);
  };

  function save() {
    write(STORE, {
      lesson: state.lesson,
      section: state.section,
      completed: [...state.completed].sort((a, b) => a - b),
      checks: state.checks,
      scope: state.scope,
    });
  }

  function allLessonWords() {
    let words = [];
    try {
      if (typeof allVocab === "function") words = allVocab();
    } catch (_) {
      words = Array.isArray(window.LESSON_VOCAB) ? window.LESSON_VOCAB : [];
    }
    const seen = new Set();
    return words.filter((word) => {
      const key = `${word.lesson}|${word.hanzi}|${word.meaning}`;
      if (!word.hanzi || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function lessonNumber(word) {
    const match = String(word.lesson || "").match(/\d+/);
    return match ? Number(match[0]) : 999;
  }

  function rememberedIds() {
    const ids = read("hanReview.remembered", []);
    return new Set(Array.isArray(ids) ? ids : []);
  }

  function wordsForLesson(number) {
    return allLessonWords().filter((word) => lessonNumber(word) === number);
  }

  function wordsInScope() {
    const remembered = rememberedIds();
    return allLessonWords().filter((word) => {
      if (lessonNumber(word) > maxUnlocked()) return false;
      return state.scope !== "remembered" || remembered.has(word.id);
    });
  }

  function speak(text) {
    if (!("speechSynthesis" in window) || !text) return;
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "zh-CN";
    utterance.rate = 0.82;
    const voices = speechSynthesis.getVoices();
    utterance.voice = voices.find((voice) => /^zh(-|_)/i.test(voice.lang)) || null;
    speechSynthesis.speak(utterance);
  }

  function triplet(item, className = "") {
    return `
      <div class="zh-triplet ${className}">
        <strong lang="zh-CN">${escapeHtml(item.zh)}</strong>
        <span>${escapeHtml(item.py)}</span>
        <small>${escapeHtml(item.vi)}</small>
      </div>`;
  }

  function lessonWordCard(word) {
    return `
      <article class="zh-course-word">
        <button type="button" data-zh-speak="${escapeHtml(word.hanzi)}" aria-label="Nghe ${escapeHtml(word.hanzi)}">
          <i data-lucide="volume-2"></i>
        </button>
        <strong lang="zh-CN">${escapeHtml(word.hanzi)}</strong>
        <span>${escapeHtml(word.pinyin || "Chưa có pinyin")}</span>
        <p>${escapeHtml(word.meaning || "Chưa có nghĩa")}</p>
        ${word.hanViet ? `<small>Hán Việt: ${escapeHtml(word.hanViet)}</small>` : ""}
      </article>`;
  }

  function renderHeader(current) {
    const progress = Math.round((completedCount() / course.lessons.length) * 100);
    return `
      <section class="zh-course-hero">
        <div>
          <p class="eyebrow">Sổ bài giảng · đối chiếu 15 PDF</p>
          <h2>Học tuần tự, chỉ dùng từ đã mở khóa</h2>
          <p>Mỗi bài gom lại mục tiêu, phát âm, từ vựng, ngữ pháp, hội thoại và luyện nhanh. Nội dung ngoài giáo trình không tự đi vào kho học.</p>
          <div class="zh-course-hero-tags">
            <span><i data-lucide="files"></i>979 trang PDF</span>
            <span><i data-lucide="book-open-check"></i>${completedCount()}/15 bài hoàn thành</span>
            <span><i data-lucide="shield-check"></i>Mở đến Bài ${maxUnlocked()}</span>
          </div>
        </div>
        <div class="zh-course-progress" style="--value:${progress * 3.6}deg" aria-label="Tiến độ ${progress}%">
          <div><strong>${progress}%</strong><span>tiến độ</span></div>
        </div>
      </section>
      <div class="zh-course-current-line">
        <span>Bài đang học</span>
        <strong>${escapeHtml(current.title.zh)}</strong>
        <small>${escapeHtml(current.title.py)} · ${escapeHtml(current.title.vi)}</small>
      </div>`;
  }

  function renderRoadmap() {
    const open = maxUnlocked();
    return `
      <aside class="zh-course-roadmap" aria-label="Lộ trình 15 bài">
        <div class="zh-course-roadmap-head">
          <div><p class="eyebrow">Lộ trình</p><h3>15 bài theo PDF</h3></div>
          <span>${completedCount()}/15</span>
        </div>
        <div class="zh-course-lesson-list">
          ${course.lessons.map((item) => {
            const locked = item.number > open;
            const done = state.completed.has(item.number);
            return `
              <button class="zh-course-lesson-button ${state.lesson === item.number ? "active" : ""} ${done ? "done" : ""} ${locked ? "locked" : ""}" type="button" data-course-lesson="${item.number}" ${locked ? 'aria-disabled="true"' : ""}>
                <span>${String(item.number).padStart(2, "0")}</span>
                <span><strong lang="zh-CN">${escapeHtml(item.title.zh)}</strong><small>${escapeHtml(item.title.py)} · ${escapeHtml(item.title.vi)}</small></span>
                <i data-lucide="${locked ? "lock-keyhole" : done ? "circle-check-big" : "chevron-right"}"></i>
              </button>`;
          }).join("")}
        </div>
        <p class="zh-course-lock-note"><i data-lucide="shield-check"></i>Hoàn thành bài hiện tại để mở đúng phạm vi từ của bài tiếp theo.</p>
      </aside>`;
  }

  function renderGuide(current) {
    return `
      <div class="zh-guide-grid">
        <section class="zh-course-panel">
          <p class="eyebrow">Bạn sẽ làm được</p>
          <h3>Mục tiêu bài học</h3>
          <ol class="zh-goal-list">${current.goals.map((goal, index) => `<li><span>${index + 1}</span><p>${escapeHtml(goal)}</p></li>`).join("")}</ol>
        </section>
        <section class="zh-course-panel">
          <p class="eyebrow">Bản đồ nguồn</p>
          <h3>${escapeHtml(current.sourceFile)} · ${current.pageCount} trang</h3>
          <div class="zh-page-map">${current.pageMap.map((item) => `<article><span>Trang ${escapeHtml(item.pages)}</span><strong>${escapeHtml(item.label)}</strong></article>`).join("")}</div>
        </section>
      </div>
      <section class="zh-course-panel zh-pronunciation-panel">
        <div class="zh-panel-icon"><i data-lucide="audio-lines"></i></div>
        <div><p class="eyebrow">Hướng dẫn đọc</p><h3>${escapeHtml(current.pronunciation.title)}</h3></div>
        <div class="zh-pronunciation-notes">${current.pronunciation.notes.map((note) => `<p><i data-lucide="check"></i>${escapeHtml(note)}</p>`).join("")}</div>
      </section>
      <section class="zh-scope-explainer">
        <i data-lucide="fence"></i>
        <div><strong>Hàng rào từ vựng đang bật</strong><p>Flashcard, luyện tập và tra từ chỉ lấy từ Bài 1–${maxUnlocked()}. Bài chưa mở khóa không xuất hiện trong gợi ý.</p></div>
      </section>`;
  }

  function renderVocabulary(current) {
    const query = normalize(state.lessonQuery);
    const words = wordsForLesson(current.number).filter((word) => !query || normalize([word.hanzi, word.pinyin, word.hanViet, word.meaning].join(" ")).includes(query));
    return `
      <section class="zh-course-panel">
        <div class="zh-section-heading">
          <div><p class="eyebrow">Kho từ khóa chặt theo bài</p><h3>${wordsForLesson(current.number).length} từ của riêng Bài ${current.number}</h3></div>
          <label class="zh-course-search"><i data-lucide="search"></i><input id="zhLessonWordSearch" type="search" value="${escapeHtml(state.lessonQuery)}" placeholder="Tìm chữ, pinyin hoặc nghĩa..." /></label>
        </div>
        <div class="zh-course-word-grid">${words.length ? words.map(lessonWordCard).join("") : `<div class="zh-course-empty"><i data-lucide="search-x"></i><p>Không có từ phù hợp trong Bài ${current.number}.</p></div>`}</div>
      </section>`;
  }

  function renderGrammar(current) {
    return `
      <div class="zh-grammar-grid">
        ${current.grammar.map((item, index) => `
          <article class="zh-grammar-card">
            <div class="zh-grammar-number">${String(index + 1).padStart(2, "0")}</div>
            <p class="eyebrow">${escapeHtml(item.title)}</p>
            ${triplet({ zh: item.zh, py: item.py, vi: item.vi }, "formula")}
            <p class="zh-grammar-note">${escapeHtml(item.note)}</p>
            <div class="zh-example-stack">${item.examples.map((example) => `<button type="button" data-zh-speak="${escapeHtml(example.zh)}">${triplet(example, "example")}<i data-lucide="volume-2"></i></button>`).join("")}</div>
          </article>`).join("")}
      </div>`;
  }

  function renderDialogue(current) {
    return `
      <section class="zh-course-panel">
        <div class="zh-section-heading"><div><p class="eyebrow">Luyện nói theo bài khóa</p><h3>Chạm từng câu để nghe</h3></div><button class="secondary-button" type="button" data-speak-dialogue><i data-lucide="play"></i><span>Nghe cả đoạn</span></button></div>
        <div class="zh-dialogue-list">
          ${current.dialogue.map((line, index) => `
            <button class="zh-dialogue-line" type="button" data-zh-speak="${escapeHtml(line.zh)}">
              <span>${index % 2 === 0 ? "A" : "B"}</span>${triplet(line)}<i data-lucide="volume-2"></i>
            </button>`).join("")}
        </div>
      </section>`;
  }

  function renderPractice(current) {
    const selected = state.checks[current.number];
    const answered = Number.isInteger(selected);
    const correct = answered && selected === current.checkpoint.answer;
    return `
      <section class="zh-course-panel zh-checkpoint">
        <div class="zh-checkpoint-top"><span><i data-lucide="sparkles"></i>Kiểm tra nhanh</span><b>Bài ${current.number}</b></div>
        <h3>${escapeHtml(current.checkpoint.prompt)}</h3>
        <div class="zh-check-options">
          ${current.checkpoint.options.map((option, index) => {
            const status = answered ? (index === current.checkpoint.answer ? "correct" : index === selected ? "wrong" : "") : "";
            return `<button class="zh-check-option ${status}" type="button" data-check-answer="${index}" ${answered ? "disabled" : ""}><span>${String.fromCharCode(65 + index)}</span>${triplet(option)}</button>`;
          }).join("")}
        </div>
        ${answered ? `<div class="zh-check-feedback ${correct ? "correct" : "wrong"}"><i data-lucide="${correct ? "circle-check-big" : "circle-x"}"></i><div><strong>${correct ? "Chính xác" : "Chưa đúng"}</strong><p>${escapeHtml(current.checkpoint.explanation)}</p></div></div><button class="secondary-button" type="button" data-check-reset><i data-lucide="rotate-ccw"></i><span>Làm lại</span></button>` : ""}
      </section>`;
  }

  function renderLookupResult() {
    const query = normalize(state.lookupQuery);
    const scoped = wordsInScope();
    const matches = query ? scoped.filter((word) => normalize([word.hanzi, word.pinyin, word.hanViet, word.meaning].join(" ")).includes(query)).slice(0, 12) : wordsForLesson(state.lesson).slice(0, 6);
    if (matches.length) return `<div class="zh-lookup-results">${matches.map(lessonWordCard).join("")}</div>`;
    if (!state.lookupQuery) return "";
    if (state.externalLoading) return `<div class="zh-lookup-state"><i data-lucide="loader-circle" class="is-spinning"></i><p>Đang tra nguồn tham khảo...</p></div>`;
    if (state.externalResult) {
      if (state.externalResult.error) return `<div class="zh-lookup-state warning"><i data-lucide="wifi-off"></i><p>${escapeHtml(state.externalResult.error)}</p><a href="${escapeHtml(state.externalResult.googleUrl)}" target="_blank" rel="noreferrer">Mở Google Dịch</a></div>`;
      return `
        <article class="zh-external-result">
          <div><span>Ngoài giáo trình · MyMemory</span><b>Không lưu vào tiến độ</b></div>
          ${triplet({ zh: state.externalResult.zh, py: state.externalResult.py, vi: state.externalResult.vi })}
          <button type="button" data-zh-speak="${escapeHtml(state.externalResult.zh)}"><i data-lucide="volume-2"></i>Nghe</button>
        </article>`;
    }
    return `
      <div class="zh-lookup-state warning">
        <i data-lucide="shield-alert"></i>
        <div><strong>Chưa có trong phạm vi Bài 1–${maxUnlocked()}</strong><p>Tra ngoài đang ${state.allowExternal ? "được cho phép; nhấn Tra tham khảo để tiếp tục" : "tắt để tránh học lan sang từ chưa học"}.</p></div>
      </div>`;
  }

  function renderLookup() {
    const scopeCount = wordsInScope().length;
    return `
      <section class="zh-scoped-lookup">
        <div class="zh-lookup-heading">
          <div><p class="eyebrow">Tra từ có hàng rào</p><h3>Chỉ tra trong vốn từ đã học</h3><p>${scopeCount} từ đang nằm trong phạm vi hiện tại.</p></div>
          <span><i data-lucide="shield-check"></i>Bài 1–${maxUnlocked()}</span>
        </div>
        <form class="zh-lookup-form" id="zhScopedLookupForm">
          <label><i data-lucide="search"></i><input id="zhScopedLookupInput" maxlength="100" value="${escapeHtml(state.lookupQuery)}" placeholder="Nhập chữ Hán, pinyin hoặc nghĩa tiếng Việt..." /></label>
          <button class="primary-button" type="submit"><i data-lucide="book-search"></i><span>Tra trong bài</span></button>
          ${state.allowExternal && state.lookupQuery ? `<button class="secondary-button" type="button" data-external-lookup><i data-lucide="cloud-download"></i><span>Tra tham khảo</span></button>` : ""}
        </form>
        <div class="zh-scope-controls">
          <label><input type="radio" name="zhScope" value="unlocked" ${state.scope === "unlocked" ? "checked" : ""} />Từ trong các bài đã mở khóa</label>
          <label><input type="radio" name="zhScope" value="remembered" ${state.scope === "remembered" ? "checked" : ""} />Chỉ từ đã đánh dấu nhớ</label>
          <label class="external-toggle"><input type="checkbox" data-external-toggle ${state.allowExternal ? "checked" : ""} /><span>Cho phép tra ngoài giáo trình khi tôi chủ động yêu cầu</span></label>
        </div>
        <div id="zhLookupResults">${renderLookupResult()}</div>
        <p class="zh-api-note"><i data-lucide="info"></i>Tra ngoài dùng MyMemory qua HTTPS, không cần khóa API. Kết quả chỉ để tham khảo, không được thêm tự động vào flashcard, quiz hoặc số từ đã học.</p>
      </section>`;
  }

  function renderMain(current) {
    const contents = {
      guide: renderGuide,
      vocab: renderVocabulary,
      grammar: renderGrammar,
      dialogue: renderDialogue,
      practice: renderPractice,
    };
    return `
      <main class="zh-course-main">
        <section class="zh-lesson-banner">
          <div class="zh-lesson-index">${String(current.number).padStart(2, "0")}</div>
          <div>${triplet(current.title, "title")}</div>
          <div class="zh-lesson-source"><span>${escapeHtml(current.sourceFile)}</span><b>${current.pageCount} trang</b></div>
        </section>
        <nav class="zh-course-sections" aria-label="Nội dung bài ${current.number}">
          ${sections.map(([id, icon, label]) => `<button class="${state.section === id ? "active" : ""}" type="button" data-course-section="${id}"><i data-lucide="${icon}"></i><span>${label}</span></button>`).join("")}
        </nav>
        <div class="zh-course-content">${(contents[state.section] || renderGuide)(current)}</div>
        <div class="zh-course-actions">
          <button class="secondary-button" type="button" data-prev-lesson ${current.number === 1 ? "disabled" : ""}><i data-lucide="arrow-left"></i><span>Bài trước</span></button>
          <button class="primary-button ${state.completed.has(current.number) ? "is-complete" : ""}" type="button" data-complete-lesson><i data-lucide="${state.completed.has(current.number) ? "circle-check-big" : "unlock"}"></i><span>${state.completed.has(current.number) ? "Đã hoàn thành" : current.number === 15 ? "Hoàn thành khóa" : `Hoàn thành và mở Bài ${current.number + 1}`}</span></button>
          <button class="secondary-button" type="button" data-next-lesson ${current.number >= maxUnlocked() || current.number === course.lessons.length ? "disabled" : ""}><span>Bài sau</span><i data-lucide="arrow-right"></i></button>
        </div>
      </main>`;
  }

  function render() {
    const current = lesson();
    root.innerHTML = `
      ${renderHeader(current)}
      <div class="zh-course-layout">${renderRoadmap()}${renderMain(current)}</div>
      ${renderLookup()}
      <div class="zh-course-toast ${state.toast ? "show" : ""}" role="status">${escapeHtml(state.toast)}</div>`;
    refreshIcons();
  }

  function showToast(message) {
    state.toast = message;
    render();
    window.setTimeout(() => {
      if (state.toast === message) {
        state.toast = "";
        const toast = root.querySelector(".zh-course-toast");
        if (toast) toast.classList.remove("show");
      }
    }, 2800);
  }

  function openLesson(number) {
    if (number > maxUnlocked()) {
      showToast(`Bài ${number} đang khóa. Hãy hoàn thành Bài ${maxUnlocked()} trước.`);
      return;
    }
    state.lesson = number;
    state.lessonQuery = "";
    state.externalResult = null;
    save();
    render();
    root.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function externalLookup() {
    const query = state.lookupQuery.trim().slice(0, 100);
    if (!query || !state.allowExternal || state.externalLoading) return;
    state.externalLoading = true;
    state.externalResult = null;
    render();
    const isChinese = /[\u3400-\u9fff]/.test(query);
    const langpair = isChinese ? "zh-CN|vi-VN" : "vi-VN|zh-CN";
    const googleUrl = `https://translate.google.com/?sl=auto&tl=${isChinese ? "vi" : "zh-CN"}&text=${encodeURIComponent(query)}&op=translate`;
    try {
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(query)}&langpair=${encodeURIComponent(langpair)}&mt=1`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      const translated = String(data?.responseData?.translatedText || "").trim();
      if (!translated) throw new Error("Không có kết quả");
      state.externalResult = isChinese
        ? { zh: query, py: "API không cung cấp pinyin", vi: translated, googleUrl }
        : { zh: translated, py: "API không cung cấp pinyin", vi: query, googleUrl };
    } catch (_) {
      state.externalResult = { error: "Nguồn tham khảo tạm thời không phản hồi. Bạn có thể mở Google Dịch trong tab mới.", googleUrl };
    } finally {
      state.externalLoading = false;
      render();
    }
  }

  root.addEventListener("click", (event) => {
    const speakButton = event.target.closest("[data-zh-speak]");
    if (speakButton) { speak(speakButton.dataset.zhSpeak); return; }

    const lessonButton = event.target.closest("[data-course-lesson]");
    if (lessonButton) { openLesson(Number(lessonButton.dataset.courseLesson)); return; }

    const sectionButton = event.target.closest("[data-course-section]");
    if (sectionButton) {
      state.section = sectionButton.dataset.courseSection;
      state.externalResult = null;
      save(); render(); return;
    }

    if (event.target.closest("[data-prev-lesson]")) { openLesson(Math.max(1, state.lesson - 1)); return; }
    if (event.target.closest("[data-next-lesson]")) { openLesson(Math.min(course.lessons.length, state.lesson + 1)); return; }
    if (event.target.closest("[data-complete-lesson]")) {
      if (!state.completed.has(state.lesson)) {
        state.completed.add(state.lesson);
        save();
        showToast(state.lesson === 15 ? "Bạn đã hoàn thành lộ trình 15 bài!" : `Đã mở khóa Bài ${state.lesson + 1}.`);
      }
      return;
    }

    const answer = event.target.closest("[data-check-answer]");
    if (answer && !Number.isInteger(state.checks[state.lesson])) {
      state.checks[state.lesson] = Number(answer.dataset.checkAnswer);
      save(); render(); return;
    }
    if (event.target.closest("[data-check-reset]")) {
      delete state.checks[state.lesson];
      save(); render(); return;
    }
    if (event.target.closest("[data-speak-dialogue]")) {
      speak(lesson().dialogue.map((line) => line.zh).join("。")); return;
    }
    if (event.target.closest("[data-external-lookup]")) { externalLookup(); }
  });

  root.addEventListener("input", (event) => {
    if (event.target.id === "zhLessonWordSearch") {
      state.lessonQuery = event.target.value;
      const grid = root.querySelector(".zh-course-word-grid");
      if (grid) {
        const query = normalize(state.lessonQuery);
        const words = wordsForLesson(state.lesson).filter((word) => !query || normalize([word.hanzi, word.pinyin, word.hanViet, word.meaning].join(" ")).includes(query));
        grid.innerHTML = words.length ? words.map(lessonWordCard).join("") : `<div class="zh-course-empty"><p>Không có từ phù hợp trong Bài ${state.lesson}.</p></div>`;
        refreshIcons();
      }
    }
    if (event.target.id === "zhScopedLookupInput") {
      state.lookupQuery = event.target.value;
      state.externalResult = null;
    }
  });

  root.addEventListener("change", (event) => {
    if (event.target.name === "zhScope") {
      state.scope = event.target.value;
      state.externalResult = null;
      save(); render();
    }
    if (event.target.matches("[data-external-toggle]")) {
      state.allowExternal = event.target.checked;
      state.externalResult = null;
      render();
    }
  });

  root.addEventListener("submit", (event) => {
    if (event.target.id !== "zhScopedLookupForm") return;
    event.preventDefault();
    state.lookupQuery = root.querySelector("#zhScopedLookupInput")?.value.trim().slice(0, 100) || "";
    state.externalResult = null;
    render();
  });

  document.querySelector("#lessonCards")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-open-chinese-course]");
    if (!button) return;
    document.querySelector('#chineseApp .tab[data-tab="course"]')?.click();
    openLesson(Number(button.dataset.openChineseCourse));
  });

  window.addEventListener("chinese:open-lesson", (event) => openLesson(Number(event.detail?.lesson) || 1));
  render();
})();
