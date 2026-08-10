(() => {
  const root = document.querySelector("#dictionaryWorkspace");
  if (!root) return;

  const STORE = {
    words: "hanReview.dictionary.words.v2",
    start: "hanReview.dictionary.startDate.v1",
    customSentences: "hanReview.dictionary.sentences.v1",
    conversations: "hanReview.dictionary.conversations.v1",
    notifications: "hanReview.dictionary.notificationsRead.v1",
  };

  const readStore = (key, fallback) => {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return value ?? fallback;
    } catch (_) {
      return fallback;
    }
  };

  const writeStore = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (_) {
      // The app still works in memory if storage is unavailable.
    }
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

  const uid = (prefix = "word") => `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
  const sets = Array.isArray(window.CHINESE_PREMADE_SETS) ? window.CHINESE_PREMADE_SETS : [];
  const lessonWords = Array.isArray(window.LESSON_VOCAB) ? window.LESSON_VOCAB : [];

  const seedWords = lessonWords.map((word) => ({
    id: `lesson-${word.id}`,
    character: word.hanzi,
    pinyin: word.pinyin || "",
    hanViet: word.hanViet || "",
    meaning: word.meaning || "",
    note: word.note || "",
    source: word.lesson || "Bài học",
    createdAt: new Date().toISOString(),
    reviewCount: 0,
    rememberCount: 0,
  }));

  const curatedSentences = [
    { zh: "你好，很高兴认识你。", py: "Nǐ hǎo, hěn gāoxìng rènshi nǐ.", vi: "Xin chào, rất vui được gặp bạn." },
    { zh: "你今天想吃什么？", py: "Nǐ jīntiān xiǎng chī shénme?", vi: "Hôm nay bạn muốn ăn gì?" },
    { zh: "我想喝一杯咖啡。", py: "Wǒ xiǎng hē yì bēi kāfēi.", vi: "Tôi muốn uống một cốc cà phê." },
    { zh: "这个多少钱？", py: "Zhège duōshao qián?", vi: "Cái này bao nhiêu tiền?" },
    { zh: "请问，地铁站在哪儿？", py: "Qǐngwèn, dìtiě zhàn zài nǎr?", vi: "Xin hỏi, ga tàu điện ngầm ở đâu?" },
    { zh: "明天天气怎么样？", py: "Míngtiān tiānqì zěnmeyàng?", vi: "Thời tiết ngày mai thế nào?" },
    { zh: "我每天学习汉语。", py: "Wǒ měitiān xuéxí Hànyǔ.", vi: "Tôi học tiếng Trung mỗi ngày." },
    { zh: "周末我们一起去看电影吧。", py: "Zhōumò wǒmen yìqǐ qù kàn diànyǐng ba.", vi: "Cuối tuần chúng ta cùng đi xem phim nhé." },
    { zh: "我有一点儿不舒服。", py: "Wǒ yǒu yìdiǎnr bù shūfu.", vi: "Tôi hơi không khỏe." },
    { zh: "你可以再说一遍吗？", py: "Nǐ kěyǐ zài shuō yí biàn ma?", vi: "Bạn có thể nói lại một lần không?" },
    { zh: "祝你生日快乐！", py: "Zhù nǐ shēngrì kuàilè!", vi: "Chúc bạn sinh nhật vui vẻ!" },
    { zh: "万事如意。", py: "Wànshì rúyì.", vi: "Vạn sự như ý." },
  ];

  const conversations = [
    [
      { speaker: "A", vietnamese: "Chào bạn, hôm nay bạn khỏe không?", words: [{ zh: "你好", py: "nǐ hǎo" }, { zh: "，", py: "" }, { zh: "你", py: "nǐ" }, { zh: "今天", py: "jīntiān" }, { zh: "好吗", py: "hǎo ma" }, { zh: "？", py: "" }] },
      { speaker: "B", vietnamese: "Tôi rất khỏe, cảm ơn bạn.", words: [{ zh: "我", py: "wǒ" }, { zh: "很好", py: "hěn hǎo" }, { zh: "，", py: "" }, { zh: "谢谢", py: "xièxie" }, { zh: "你", py: "nǐ" }, { zh: "。", py: "" }] },
      { speaker: "A", vietnamese: "Bạn đang đi đâu vậy?", words: [{ zh: "你", py: "nǐ" }, { zh: "去哪儿", py: "qù nǎr" }, { zh: "？", py: "" }] },
      { speaker: "B", vietnamese: "Tôi đi thư viện học tiếng Trung.", words: [{ zh: "我", py: "wǒ" }, { zh: "去", py: "qù" }, { zh: "图书馆", py: "túshūguǎn" }, { zh: "学习", py: "xuéxí" }, { zh: "汉语", py: "Hànyǔ" }, { zh: "。", py: "" }] },
    ],
    [
      { speaker: "A", vietnamese: "Xin hỏi, món này bao nhiêu tiền?", words: [{ zh: "请问", py: "qǐngwèn" }, { zh: "，", py: "" }, { zh: "这个", py: "zhège" }, { zh: "多少钱", py: "duōshao qián" }, { zh: "？", py: "" }] },
      { speaker: "B", vietnamese: "Ba mươi tệ.", words: [{ zh: "三十", py: "sānshí" }, { zh: "块", py: "kuài" }, { zh: "。", py: "" }] },
      { speaker: "A", vietnamese: "Có thể rẻ hơn một chút không?", words: [{ zh: "可以", py: "kěyǐ" }, { zh: "便宜", py: "piányi" }, { zh: "一点儿", py: "yìdiǎnr" }, { zh: "吗", py: "ma" }, { zh: "？", py: "" }] },
      { speaker: "B", vietnamese: "Được, hai mươi tám tệ.", words: [{ zh: "可以", py: "kěyǐ" }, { zh: "，", py: "" }, { zh: "二十八", py: "èrshíbā" }, { zh: "块", py: "kuài" }, { zh: "。", py: "" }] },
    ],
    [
      { speaker: "A", vietnamese: "Bạn muốn ăn gì?", words: [{ zh: "你", py: "nǐ" }, { zh: "想", py: "xiǎng" }, { zh: "吃", py: "chī" }, { zh: "什么", py: "shénme" }, { zh: "？", py: "" }] },
      { speaker: "B", vietnamese: "Tôi muốn ăn sủi cảo.", words: [{ zh: "我", py: "wǒ" }, { zh: "想", py: "xiǎng" }, { zh: "吃", py: "chī" }, { zh: "饺子", py: "jiǎozi" }, { zh: "。", py: "" }] },
      { speaker: "A", vietnamese: "Bạn có uống trà không?", words: [{ zh: "你", py: "nǐ" }, { zh: "喝", py: "hē" }, { zh: "茶", py: "chá" }, { zh: "吗", py: "ma" }, { zh: "？", py: "" }] },
      { speaker: "B", vietnamese: "Có, cảm ơn.", words: [{ zh: "喝", py: "hē" }, { zh: "，", py: "" }, { zh: "谢谢", py: "xièxie" }, { zh: "。", py: "" }] },
    ],
  ];

  const storedWords = readStore(STORE.words, null);
  const state = {
    words: Array.isArray(storedWords) ? storedWords : seedWords,
    screen: "library",
    search: "",
    addOpen: false,
    draft: null,
    selectedId: null,
    setFilter: "Tất cả",
    expandedSet: null,
    notificationOpen: false,
    notificationRead: readStore(STORE.notifications, false),
    customSentences: (() => { const value = readStore(STORE.customSentences, []); return Array.isArray(value) ? value : []; })(),
    conversationHistory: (() => { const value = readStore(STORE.conversations, []); return Array.isArray(value) ? value : []; })(),
    conversation: conversations[0],
    conversationLoading: false,
    flash: { active: false, deck: [], index: 0, flipped: false, includeLearned: false, autoAudio: true, limit: 20, reviewed: new Set() },
    practice: { tab: "listening", question: null, answered: false, correct: 0, total: 0, selectedSentence: 0, showPinyin: true, writingResult: "" },
  };

  if (!Array.isArray(storedWords)) writeStore(STORE.words, state.words);
  if (!readStore(STORE.start, null)) writeStore(STORE.start, new Date().toISOString().slice(0, 10));

  const saveWords = () => writeStore(STORE.words, state.words);
  const isLearned = (word) => Number(word.reviewCount || 0) >= 20 || Number(word.rememberCount || 0) >= 5;
  const allSentences = () => [...curatedSentences, ...state.customSentences];
  const findWord = (id) => state.words.find((word) => word.id === id);
  const refreshIcons = () => window.lucide?.createIcons?.();

  function speak(text) {
    if (!("speechSynthesis" in window) || !text) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "zh-CN";
    utterance.rate = 0.85;
    const voices = window.speechSynthesis.getVoices();
    utterance.voice = voices.find((voice) => /^zh(-|_)/i.test(voice.lang)) || null;
    window.speechSynthesis.speak(utterance);
  }

  function stats() {
    const learned = state.words.filter(isLearned).length;
    const reviews = state.words.reduce((sum, word) => sum + Number(word.reviewCount || 0), 0);
    const start = new Date(`${readStore(STORE.start, new Date().toISOString().slice(0, 10))}T00:00:00`);
    const today = new Date();
    const studyDays = Number.isNaN(start.getTime()) ? 1 : Math.max(1, Math.floor((today - start) / 86400000) + 1);
    return { learned, reviews, studyDays };
  }

  const levels = [
    { min: 0, max: 100, name: "Ngố", note: "Đang làm quen" },
    { min: 100, max: 500, name: "Make Conversation", note: "Tạo hội thoại" },
    { min: 500, max: 1500, name: "HSK 1 · Biết biết", note: "Nền tảng đầu tiên" },
    { min: 1500, max: 2500, name: "HSK 2 · Được của ló", note: "Giao tiếp cơ bản" },
    { min: 2500, max: 3500, name: "HSK 3 · Biết tiếng Trung", note: "Sử dụng độc lập" },
    { min: 3500, max: 4500, name: "HSK 4 · Ngầu", note: "Giao tiếp tự tin" },
    { min: 4500, max: 5500, name: "HSK 5 · Can teach", note: "Trình độ nâng cao" },
    { min: 5500, max: 12000, name: "HSK 6 · Đỉnh", note: "Thành thạo" },
    { min: 12000, max: Infinity, name: "Cao cấp", note: "Tiếp tục mở rộng" },
  ];

  function currentLevel() {
    const count = state.words.length;
    return levels.find((level) => count >= level.min && count < level.max) || levels.at(-1);
  }
  function navButton(screen, icon, label) {
    return `<button class="dict-nav-button ${state.screen === screen ? "active" : ""}" type="button" data-dict-screen="${screen}"><i data-lucide="${icon}"></i><span>${label}</span></button>`;
  }

  function renderShell() {
    const summary = stats();
    root.innerHTML = `
      <section class="dict-hero">
        <div>
          <p class="eyebrow">Không gian học chủ động</p>
          <h2 id="dictionaryTitle">Từ điển & phòng luyện tập tiếng Trung</h2>
          <p>Tra từ, gom bộ từ, luyện nhớ, nghe–viết và học hội thoại trong cùng một nơi.</p>
        </div>
        <div class="dict-hero-stats" aria-label="Thống kê nhanh">
          <div><strong>${state.words.length}</strong><span>từ trong sổ</span></div>
          <div><strong>${summary.learned}</strong><span>đã thuộc</span></div>
          <div><strong>${summary.studyDays}</strong><span>ngày học</span></div>
        </div>
      </section>
      <div class="dict-toolbar">
        <div class="dict-subnav" aria-label="Công cụ từ điển">
          ${navButton("library", "library-big", "Từ điển")}
          ${navButton("sets", "layers-3", "Bộ từ")}
          ${navButton("flash", "gallery-horizontal-end", "Flashcard")}
          ${navButton("practice", "headphones", "Luyện tập")}
          ${navButton("sentences", "messages-square", "Hội thoại")}
          ${navButton("stats", "chart-no-axes-combined", "Thống kê")}
        </div>
        <button class="dict-notification-button ${state.notificationRead ? "" : "has-new"}" type="button" data-dict-action="notifications" aria-label="Thông báo">
          <i data-lucide="bell"></i><span>${state.notificationRead ? "Thông báo" : "3 tin mới"}</span>
        </button>
      </div>
      <div class="dict-screen" id="dictScreen"></div>
      <div id="dictModalLayer"></div>
      <div class="dict-toast" id="dictToast" role="status" aria-live="polite"></div>
    `;
    renderScreen();
    renderModals();
    refreshIcons();
  }

  function renderScreen() {
    const container = root.querySelector("#dictScreen");
    if (!container) return;
    const renderers = { library: renderLibrary, sets: renderSets, flash: renderFlash, practice: renderPractice, sentences: renderSentences, stats: renderStats };
    container.innerHTML = (renderers[state.screen] || renderLibrary)();
    refreshIcons();
    if (state.screen === "practice" && state.practice.tab === "listening" && !state.practice.question) newListeningQuestion(false);
  }

  function filteredWords() {
    const query = normalize(state.search);
    if (!query) return state.words;
    return state.words.filter((word) => normalize([word.character, word.pinyin, word.hanViet, word.meaning, word.source].join(" ")).includes(query));
  }

  function wordCard(word) {
    const learned = isLearned(word);
    const warm = Number(word.reviewCount || 0) >= 10;
    return `
      <article class="dict-word-card ${learned ? "learned" : warm ? "familiar" : ""}" data-word-id="${escapeHtml(word.id)}" tabindex="0">
        <div class="dict-word-topline"><span>${escapeHtml(word.source || "Tự thêm")}</span>${learned ? '<b><i data-lucide="badge-check"></i> Đã thuộc</b>' : ""}</div>
        <strong class="dict-hanzi">${escapeHtml(word.character)}</strong>
        <span class="dict-pinyin">${escapeHtml(word.pinyin || "Chưa có pinyin")}</span>
        <span class="dict-meaning">${escapeHtml(word.meaning || "Chưa có nghĩa")}</span>
        <small>${escapeHtml(word.hanViet || "Hán Việt đang bổ sung")}</small>
        <div class="dict-word-progress"><span style="width:${Math.min(100, Number(word.rememberCount || 0) * 20)}%"></span></div>
      </article>`;
  }

  function renderWordGrid() {
    const grid = root.querySelector("#dictWordGrid");
    const count = root.querySelector("#dictResultCount");
    if (!grid) return;
    const words = filteredWords();
    if (count) count.textContent = `${words.length} từ`;
    grid.innerHTML = words.length ? words.map(wordCard).join("") : `<div class="dict-empty"><i data-lucide="search-x"></i><h3>Chưa tìm thấy từ phù hợp</h3><p>Thử tìm bằng chữ Hán, pinyin, Hán Việt hoặc nghĩa tiếng Việt.</p></div>`;
    refreshIcons();
  }

  function addForm() {
    const draft = state.draft || {};
    return `
      <form class="dict-add-panel" id="dictWordForm">
        <div class="dict-panel-heading"><div><p class="eyebrow">${draft.id ? "Chỉnh sửa" : "Từ mới"}</p><h3>${draft.id ? "Cập nhật mục từ" : "Thêm vào từ điển cá nhân"}</h3></div><button class="dict-icon-button" type="button" data-dict-action="close-add" aria-label="Đóng"><i data-lucide="x"></i></button></div>
        <input type="hidden" name="id" value="${escapeHtml(draft.id || "")}">
        <div class="dict-form-grid">
          <label><span>Chữ Hán</span><div class="dict-input-action"><input name="character" id="dictCharacterInput" required autocomplete="off" placeholder="例如：谢谢" value="${escapeHtml(draft.character || "")}"><button type="button" data-dict-action="lookup" title="Tra thông tin"><i data-lucide="wand-sparkles"></i></button></div></label>
          <label class="dict-suggest-field"><span>Pinyin / gõ pinyin để chọn chữ</span><input name="pinyin" id="dictPinyinInput" autocomplete="off" placeholder="xièxie hoặc xiexie" value="${escapeHtml(draft.pinyin || "")}"><div class="dict-suggestions" id="dictSuggestions"></div></label>
          <label><span>Hán Việt</span><input name="hanViet" placeholder="tạ tạ" value="${escapeHtml(draft.hanViet || "")}"></label>
          <label><span>Nghĩa tiếng Việt</span><input name="meaning" required placeholder="cảm ơn" value="${escapeHtml(draft.meaning || "")}"></label>
          <label class="wide"><span>Ghi chú / mẹo nhớ</span><input name="note" placeholder="Ví dụ, ngữ cảnh hoặc mẹo nhớ..." value="${escapeHtml(draft.note || "")}"></label>
        </div>
        <div class="dict-form-actions"><button class="secondary-button" type="button" data-dict-action="lookup"><i data-lucide="search"></i><span>Tự điền thông tin</span></button><button class="primary-button" type="submit"><i data-lucide="save"></i><span>${draft.id ? "Lưu thay đổi" : "Thêm từ"}</span></button></div>
      </form>`;
  }

  function renderLibrary() {
    return `
      <div class="dict-library-layout">
        <section class="dict-main-panel">
          <div class="dict-section-head">
            <div><p class="eyebrow">Từ điển cá nhân</p><h3>Vốn từ của bạn</h3><p id="dictResultCount">${filteredWords().length} từ</p></div>
            <button class="primary-button" type="button" data-dict-action="open-add"><i data-lucide="plus"></i><span>Thêm từ mới</span></button>
          </div>
          <div class="dict-search"><i data-lucide="search"></i><input id="dictSearchInput" type="search" value="${escapeHtml(state.search)}" placeholder="Tìm chữ Hán, pinyin, Hán Việt hoặc nghĩa..."><button type="button" data-dict-action="clear-search" aria-label="Xóa tìm kiếm"><i data-lucide="x"></i></button></div>
          <div class="dict-word-grid" id="dictWordGrid">${filteredWords().map(wordCard).join("")}</div>
        </section>
        <aside class="dict-side-column">
          ${state.addOpen ? addForm() : `
            <section class="dict-tip-card rainbow">
              <span class="dict-tip-icon"><i data-lucide="sparkles"></i></span>
              <p class="eyebrow">Học thông minh</p><h3>Mỗi từ có một hành trình</h3>
              <p>Lật thẻ để tăng lượt ôn. Chọn “Nhớ” 5 lần hoặc ôn 20 lần để đánh dấu đã thuộc.</p>
              <button class="secondary-button" type="button" data-dict-screen="flash"><i data-lucide="gallery-horizontal-end"></i><span>Bắt đầu ôn</span></button>
            </section>
            <section class="dict-tip-card sea"><span class="dict-tip-icon"><i data-lucide="waves"></i></span><p class="eyebrow">298 mục từ</p><h3>10 bộ từ theo chủ đề</h3><p>Nhập môn, ăn uống, mua sắm, gia đình, thời tiết và nhiều chủ đề khác.</p><button class="secondary-button" type="button" data-dict-screen="sets"><i data-lucide="layers-3"></i><span>Khám phá bộ từ</span></button></section>`}
        </aside>
      </div>`;
  }

  function setCard(set) {
    const expanded = state.expandedSet === set.id;
    const missing = set.words.filter((word) => !state.words.some((saved) => saved.character === word.character)).length;
    return `
      <article class="dict-set-card">
        <div class="dict-set-art ${set.id}"><i data-lucide="${set.id.startsWith("starter") ? "sprout" : "shapes"}"></i></div>
        <div class="dict-set-copy"><div class="dict-set-meta"><span>${escapeHtml(set.level || "Nhập môn")}</span><b>${set.words.length} từ</b></div><h3>${escapeHtml(set.title)}</h3><p>${escapeHtml(set.description || "Bộ từ vựng theo chủ đề")}</p></div>
        <div class="dict-set-actions">
          <button class="secondary-button" type="button" data-expand-set="${escapeHtml(set.id)}"><i data-lucide="${expanded ? "chevron-up" : "list"}"></i><span>${expanded ? "Thu gọn" : "Xem từ"}</span></button>
          <button class="primary-button ${missing ? "" : "is-done"}" type="button" data-add-set="${escapeHtml(set.id)}" ${missing ? "" : "disabled"}><i data-lucide="${missing ? "plus" : "check"}"></i><span>${missing ? `Thêm ${missing} từ` : "Đã có đủ"}</span></button>
        </div>
        ${expanded ? `<div class="dict-set-preview">${set.words.map((word) => `<div><strong>${escapeHtml(word.character)}</strong><span>${escapeHtml(word.pinyin)}</span><p>${escapeHtml(word.meaning)}</p><small>${escapeHtml(word.hanViet)}</small></div>`).join("")}</div>` : ""}
      </article>`;
  }

  function renderSets() {
    const levelsInData = ["Tất cả", ...new Set(sets.map((set) => set.level).filter(Boolean))];
    const shown = state.setFilter === "Tất cả" ? sets : sets.filter((set) => set.level === state.setFilter);
    return `
      <section class="dict-main-panel">
        <div class="dict-section-head"><div><p class="eyebrow">Bộ từ dựng sẵn</p><h3>Học theo cụm chủ đề</h3><p>Chọn cả bộ; hệ thống tự bỏ qua những từ đã có.</p></div><div class="dict-count-badge">${sets.reduce((sum, set) => sum + set.words.length, 0)} mục từ</div></div>
        <div class="dict-filter-row">${levelsInData.map((level) => `<button type="button" class="${state.setFilter === level ? "active" : ""}" data-set-filter="${escapeHtml(level)}">${escapeHtml(level)}</button>`).join("")}</div>
        <div class="dict-set-grid">${shown.map(setCard).join("")}</div>
      </section>`;
  }

  function startFlashcards() {
    let pool = state.flash.includeLearned ? [...state.words] : state.words.filter((word) => !isLearned(word));
    for (let i = pool.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    const limit = Number(state.flash.limit) || pool.length;
    state.flash.deck = pool.slice(0, limit);
    state.flash.index = 0;
    state.flash.flipped = false;
    state.flash.reviewed = new Set();
    state.flash.active = state.flash.deck.length > 0;
    renderScreen();
    if (state.flash.active && state.flash.autoAudio) speak(state.flash.deck[0].character);
  }

  function flipFlashcard() {
    if (!state.flash.active) return;
    const word = state.flash.deck[state.flash.index];
    state.flash.flipped = !state.flash.flipped;
    if (state.flash.flipped && word && !state.flash.reviewed.has(word.id)) {
      word.reviewCount = Number(word.reviewCount || 0) + 1;
      state.flash.reviewed.add(word.id);
      saveWords();
    }
    renderScreen();
  }

  function moveFlashcard(direction) {
    if (!state.flash.deck.length) return;
    state.flash.index = (state.flash.index + direction + state.flash.deck.length) % state.flash.deck.length;
    state.flash.flipped = false;
    renderScreen();
    if (state.flash.autoAudio) speak(state.flash.deck[state.flash.index].character);
  }

  function renderFlash() {
    if (!state.flash.active) {
      const available = state.flash.includeLearned ? state.words.length : state.words.filter((word) => !isLearned(word)).length;
      return `<section class="dict-focus-panel"><div class="dict-focus-copy"><span class="dict-focus-icon"><i data-lucide="gallery-horizontal-end"></i></span><p class="eyebrow">Flashcard thích ứng</p><h3>Chọn một phiên ôn vừa sức</h3><p>Từ đã thuộc được ẩn mặc định. Bạn có thể đưa chúng trở lại bất cứ lúc nào.</p></div><form id="dictFlashSetup" class="dict-setup-card"><label><span>Số thẻ</span><select name="limit"><option value="10">10 thẻ</option><option value="20" selected>20 thẻ</option><option value="50">50 thẻ</option><option value="9999">Tất cả</option></select></label><label class="dict-toggle"><input name="includeLearned" type="checkbox" ${state.flash.includeLearned ? "checked" : ""}><span></span><b>Gồm cả từ đã thuộc</b></label><label class="dict-toggle"><input name="autoAudio" type="checkbox" ${state.flash.autoAudio ? "checked" : ""}><span></span><b>Tự phát âm thanh</b></label><p>${available} từ sẵn sàng</p><button class="primary-button" type="submit" ${available ? "" : "disabled"}><i data-lucide="play"></i><span>Bắt đầu phiên ôn</span></button></form></section>`;
    }
    const word = state.flash.deck[state.flash.index];
    if (!word) return `<div class="dict-empty"><h3>Không còn thẻ để ôn</h3></div>`;
    return `<section class="dict-flash-room"><div class="dict-flash-top"><button class="secondary-button" type="button" data-dict-action="end-flash"><i data-lucide="arrow-left"></i><span>Kết thúc</span></button><p>${state.flash.index + 1} / ${state.flash.deck.length}</p><button class="dict-icon-button" type="button" data-dict-action="speak-current"><i data-lucide="volume-2"></i></button></div><button class="dict-study-card ${state.flash.flipped ? "flipped" : ""}" type="button" data-dict-action="flip"><div class="dict-study-card-inner"><div class="dict-study-front"><small>Chạm để lật</small><strong>${escapeHtml(word.character)}</strong><span>${escapeHtml(word.pinyin)}</span></div><div class="dict-study-back"><small>${escapeHtml(word.hanViet || "Hán Việt")}</small><strong>${escapeHtml(word.meaning)}</strong><p>${escapeHtml(word.note || "Nghe lại và đặt một câu ngắn với từ này.")}</p></div></div></button><div class="dict-flash-memory"><span>Độ nhớ ${Number(word.rememberCount || 0)}/5</span><div><i style="width:${Math.min(100, Number(word.rememberCount || 0) * 20)}%"></i></div><span>${Number(word.reviewCount || 0)} lượt ôn</span></div><div class="dict-flash-actions"><button type="button" class="dict-memory-button forget" data-dict-action="forget"><i data-lucide="rotate-ccw"></i><span>Không nhớ</span></button><button type="button" class="dict-icon-button large" data-dict-action="flash-prev"><i data-lucide="chevron-left"></i></button><button type="button" class="dict-icon-button large" data-dict-action="flash-next"><i data-lucide="chevron-right"></i></button><button type="button" class="dict-memory-button remember" data-dict-action="remember"><i data-lucide="check"></i><span>Nhớ</span></button></div><button class="dict-master-button ${isLearned(word) ? "active" : ""}" type="button" data-dict-action="toggle-mastered"><i data-lucide="badge-check"></i><span>${isLearned(word) ? "Đã đánh dấu thuộc" : "Đánh dấu đã thuộc"}</span></button></section>`;
  }
  function sample(array, count) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, count);
  }

  function newListeningQuestion(shouldRender = true) {
    if (state.words.length < 4) return;
    const answer = sample(state.words, 1)[0];
    const distractors = sample(state.words.filter((word) => word.id !== answer.id), 3);
    state.practice.question = { answer, choices: sample([answer, ...distractors], 4) };
    state.practice.answered = false;
    if (shouldRender) renderScreen();
    setTimeout(() => speak(answer.character), 60);
  }

  function cleanSentence(value) {
    return String(value || "").replace(/[\s。，“”！？、,.!?；;：:]/g, "");
  }

  function writingFeedback(input, target) {
    const answer = [...cleanSentence(input)];
    const expected = [...cleanSentence(target)];
    const total = Math.max(answer.length, expected.length);
    let correct = 0;
    const rendered = Array.from({ length: total }, (_, index) => {
      const char = answer[index] || "＿";
      const ok = answer[index] === expected[index];
      if (ok) correct += 1;
      return `<span class="${ok ? "correct" : "wrong"}">${escapeHtml(char)}</span>`;
    }).join("");
    return `<div class="dict-writing-score"><strong>${correct}/${expected.length}</strong><span>ký tự đúng vị trí</span></div><div class="dict-writing-chars">${rendered}</div>${correct === expected.length && answer.length === expected.length ? '<p class="success">Chính xác hoàn toàn. Làm tốt lắm!</p>' : `<p>Đáp án: <b>${escapeHtml(target)}</b></p>`}`;
  }

  function renderListening() {
    const question = state.practice.question;
    if (!question) return `<div class="dict-empty"><i data-lucide="audio-lines"></i><h3>Cần ít nhất 4 từ để luyện nghe</h3></div>`;
    return `<section class="dict-practice-card"><div class="dict-practice-score"><span>${state.practice.correct} đúng · ${state.practice.total} câu</span><button class="dict-icon-button" type="button" data-dict-action="repeat-listening"><i data-lucide="volume-2"></i></button></div><div class="dict-listen-prompt"><span class="dict-sound-wave"><i data-lucide="audio-lines"></i></span><p>Nghe và chọn nghĩa đúng</p><button class="secondary-button" type="button" data-dict-action="repeat-listening"><i data-lucide="play"></i><span>Nghe lại</span></button></div><div class="dict-listening-options">${question.choices.map((choice) => `<button type="button" data-listen-answer="${escapeHtml(choice.id)}" ${state.practice.answered ? "disabled" : ""} class="${state.practice.answered ? (choice.id === question.answer.id ? "correct" : "muted") : ""}"><strong>${escapeHtml(choice.meaning)}</strong><span>${escapeHtml(choice.hanViet || choice.pinyin)}</span></button>`).join("")}</div>${state.practice.answered ? `<div class="dict-answer-reveal"><span>${escapeHtml(question.answer.character)}</span><p>${escapeHtml(question.answer.pinyin)} · ${escapeHtml(question.answer.meaning)}</p><button class="primary-button" type="button" data-dict-action="next-listening"><span>Câu tiếp</span><i data-lucide="arrow-right"></i></button></div>` : ""}</section>`;
  }

  function renderWriting() {
    const sentences = allSentences();
    const selected = sentences[Math.min(state.practice.selectedSentence, sentences.length - 1)] || curatedSentences[0];
    return `<div class="dict-writing-layout"><aside class="dict-sentence-list"><div class="dict-panel-heading"><div><p class="eyebrow">Mẫu câu</p><h3>${sentences.length} câu luyện viết</h3></div><button class="dict-icon-button ${state.practice.showPinyin ? "active" : ""}" type="button" data-dict-action="toggle-pinyin" title="Ẩn/hiện pinyin"><i data-lucide="languages"></i></button></div>${sentences.map((sentence, index) => `<button type="button" class="${state.practice.selectedSentence === index ? "active" : ""}" data-sentence-index="${index}"><strong>${escapeHtml(sentence.zh)}</strong><span>${state.practice.showPinyin ? escapeHtml(sentence.py) : escapeHtml(sentence.vi)}</span>${index >= curatedSentences.length ? '<i data-lucide="trash-2" data-delete-sentence="' + index + '"></i>' : ""}</button>`).join("")}<form id="dictCustomSentenceForm" class="dict-mini-form"><input name="zh" required placeholder="Thêm câu tiếng Trung..."><input name="py" placeholder="Pinyin"><input name="vi" required placeholder="Nghĩa tiếng Việt"><button class="secondary-button" type="submit"><i data-lucide="plus"></i><span>Thêm câu</span></button></form></aside><section class="dict-writing-board"><div class="dict-writing-model"><button type="button" class="dict-icon-button" data-speak-text="${escapeHtml(selected.zh)}"><i data-lucide="volume-2"></i></button><p class="eyebrow">Nghe · nhớ · gõ lại</p><strong>${escapeHtml(selected.zh)}</strong>${state.practice.showPinyin ? `<span>${escapeHtml(selected.py)}</span>` : ""}<p>${escapeHtml(selected.vi)}</p></div><form id="dictWritingForm"><label><span>Gõ lại câu bằng tiếng Trung</span><textarea name="answer" rows="3" autocomplete="off" placeholder="Nhập câu bạn vừa học..."></textarea></label><button class="primary-button" type="submit"><i data-lucide="check-check"></i><span>Kiểm tra</span></button></form><div id="dictWritingResult" class="dict-writing-result">${state.practice.writingResult}</div></section></div>`;
  }

  function renderPractice() {
    return `<section class="dict-main-panel"><div class="dict-section-head"><div><p class="eyebrow">Phòng luyện tập</p><h3>Nghe để nhận ra · viết để nhớ lâu</h3></div><div class="dict-segmented"><button type="button" class="${state.practice.tab === "listening" ? "active" : ""}" data-practice-tab="listening"><i data-lucide="headphones"></i> Luyện nghe</button><button type="button" class="${state.practice.tab === "writing" ? "active" : ""}" data-practice-tab="writing"><i data-lucide="pen-line"></i> Luyện viết</button></div></div>${state.practice.tab === "listening" ? renderListening() : renderWriting()}</section>`;
  }

  function isKnownConversationWord(zh) {
    const clean = zh.replace(/[。，“”！？、,.!?；;\s]/g, "");
    if (!clean) return true;
    if (state.words.some((word) => word.character === clean)) return true;
    return [...clean].every((char) => state.words.some((word) => word.character === char));
  }

  function conversationLine(line) {
    return `<article class="dict-conversation-line speaker-${escapeHtml(line.speaker)}"><span class="dict-avatar">${escapeHtml(line.speaker)}</span><div><div class="dict-speech-bubble">${line.words.map((word) => { const known = isKnownConversationWord(word.zh); return `<button type="button" ${known ? "disabled" : `data-conv-word="${escapeHtml(word.zh)}" data-conv-pinyin="${escapeHtml(word.py)}"`} class="${known ? "known" : "new"}"><small>${escapeHtml(word.py)}</small><strong>${escapeHtml(word.zh)}</strong></button>`; }).join("")}<button class="dict-icon-button" type="button" data-speak-text="${escapeHtml(line.words.map((word) => word.zh).join(""))}"><i data-lucide="volume-2"></i></button></div><p>${escapeHtml(line.vietnamese)}</p></div></article>`;
  }

  function renderSentences() {
    return `<section class="dict-main-panel dict-conversation-panel"><div class="dict-section-head"><div><p class="eyebrow">Học câu mới</p><h3>Hội thoại đời sống</h3><p>Từ lạ có màu xanh; chạm vào để thêm ngay vào từ điển.</p></div><div class="dict-conversation-actions"><button class="secondary-button" type="button" data-dict-action="old-conversation"><i data-lucide="history"></i><span>Câu cũ</span></button><button class="primary-button" type="button" data-dict-action="new-conversation" ${state.conversationLoading ? "disabled" : ""}><i data-lucide="refresh-cw" class="${state.conversationLoading ? "spin" : ""}"></i><span>${state.conversationLoading ? "Đang tạo..." : "Tạo hội thoại mới"}</span></button></div></div><div class="dict-conversation-stage">${state.conversation.map(conversationLine).join("")}</div><div class="dict-conversation-note"><i data-lucide="info"></i><p>Khi chạy trên máy chủ có API, nút tạo mới dùng dịch vụ AI của dự án mẫu. Khi mở trực tiếp, ứng dụng tự dùng kho hội thoại cục bộ để không bị gián đoạn.</p></div></section>`;
  }

  function renderStats() {
    const summary = stats();
    const level = currentLevel();
    const range = Number.isFinite(level.max) ? level.max - level.min : 1;
    const progress = Number.isFinite(level.max) ? Math.max(0, Math.min(100, ((state.words.length - level.min) / range) * 100)) : 100;
    const startDate = readStore(STORE.start, new Date().toISOString().slice(0, 10));
    return `<section class="dict-stats-layout"><div class="dict-level-card"><div class="dict-level-orb"><span>${state.words.length}</span><small>từ</small></div><div><p class="eyebrow">Cấp độ hiện tại</p><h3>${escapeHtml(level.name)}</h3><p>${escapeHtml(level.note)}</p><div class="dict-level-progress"><span style="width:${progress}%"></span></div><small>${Number.isFinite(level.max) ? `${state.words.length - level.min} / ${level.max - level.min} từ trong cấp này` : "Cấp cao nhất"}</small></div></div><div class="dict-stat-grid"><article class="pastel-blue"><i data-lucide="calendar-days"></i><strong>${summary.studyDays}</strong><span>Ngày học liên tục</span></article><article class="pastel-mint"><i data-lucide="badge-check"></i><strong>${summary.learned}</strong><span>Từ đã thuộc</span></article><article class="pastel-peach"><i data-lucide="repeat-2"></i><strong>${summary.reviews}</strong><span>Tổng lượt ôn</span></article><article class="pastel-lilac"><i data-lucide="library-big"></i><strong>${state.words.length}</strong><span>Tổng vốn từ</span></article></div><section class="dict-main-panel dict-level-timeline"><div class="dict-section-head"><div><p class="eyebrow">Hành trình</p><h3>Các mốc phát triển vốn từ</h3></div><label class="dict-date-field"><span>Ngày bắt đầu học</span><input id="dictStartDate" type="date" value="${escapeHtml(startDate)}"></label></div><div class="dict-level-list">${levels.map((item) => `<div class="${item.name === level.name ? "current" : state.words.length >= item.max ? "passed" : ""}"><span><i data-lucide="${state.words.length >= item.min ? "check" : "lock-keyhole"}"></i></span><strong>${escapeHtml(item.name)}</strong><p>${item.min.toLocaleString("vi-VN")}${Number.isFinite(item.max) ? `–${item.max.toLocaleString("vi-VN")}` : "+"} từ</p></div>`).join("")}</div></section></section>`;
  }

  function renderModals() {
    const layer = root.querySelector("#dictModalLayer");
    if (!layer) return;
    if (state.notificationOpen) {
      layer.innerHTML = `<div class="dict-modal-backdrop" data-dict-action="close-modal"><section class="dict-modal dict-notifications" role="dialog" aria-modal="true" aria-label="Thông báo" onclick="event.stopPropagation()"><div class="dict-modal-head"><div><p class="eyebrow">Có gì mới?</p><h3>Thông báo học tập</h3></div><button class="dict-icon-button" type="button" data-dict-action="close-modal"><i data-lucide="x"></i></button></div><div class="dict-notification-list"><article class="mint"><i data-lucide="layers-3"></i><div><strong>10 bộ từ đã sẵn sàng</strong><p>298 mục từ nhập môn theo chủ đề có thể thêm chỉ bằng một lần bấm.</p><small>Hôm nay</small></div></article><article class="blue"><i data-lucide="headphones"></i><div><strong>Phòng luyện tập mới</strong><p>Luyện nghe trắc nghiệm và gõ lại 12 mẫu câu thông dụng.</p><small>Hôm nay</small></div></article><article class="lilac"><i data-lucide="messages-square"></i><div><strong>Học từ trong hội thoại</strong><p>Từ chưa biết được tô xanh; chạm vào để tra và lưu ngay.</p><small>Hôm nay</small></div></article></div><button class="primary-button full" type="button" data-dict-action="mark-notifications"><i data-lucide="check-check"></i><span>Đánh dấu đã đọc</span></button></section></div>`;
      refreshIcons();
      return;
    }
    const word = findWord(state.selectedId);
    if (!word) {
      layer.innerHTML = "";
      return;
    }
    const setAppearances = sets.filter((set) => set.words.some((item) => item.character === word.character)).length;
    layer.innerHTML = `<div class="dict-modal-backdrop" data-dict-action="close-modal"><section class="dict-modal dict-word-modal" role="dialog" aria-modal="true" aria-label="Chi tiết từ" onclick="event.stopPropagation()"><div class="dict-modal-head"><span class="dict-modal-source">${escapeHtml(word.source || "Từ điển cá nhân")}</span><button class="dict-icon-button" type="button" data-dict-action="close-modal"><i data-lucide="x"></i></button></div><div class="dict-word-showcase"><button class="dict-speak-orb" type="button" data-speak-text="${escapeHtml(word.character)}"><i data-lucide="volume-2"></i></button><strong>${escapeHtml(word.character)}</strong><span>${escapeHtml(word.pinyin || "Chưa có pinyin")}</span></div><div class="dict-detail-grid"><div><small>Hán Việt</small><strong>${escapeHtml(word.hanViet || "Đang bổ sung")}</strong></div><div><small>Nghĩa tiếng Việt</small><strong>${escapeHtml(word.meaning)}</strong></div><div><small>Lượt ôn</small><strong>${Number(word.reviewCount || 0)}</strong></div><div><small>Độ nhớ</small><strong>${Number(word.rememberCount || 0)}/5</strong></div></div>${word.note ? `<div class="dict-word-note"><i data-lucide="notebook-pen"></i><p>${escapeHtml(word.note)}</p></div>` : ""}<p class="dict-community-line"><i data-lucide="users-round"></i> Xuất hiện trong ${setAppearances} bộ từ dựng sẵn.</p><div class="dict-modal-actions"><button class="dict-danger-button" type="button" data-dict-action="delete-word"><i data-lucide="trash-2"></i><span>Xóa</span></button><button class="secondary-button" type="button" data-dict-action="edit-word"><i data-lucide="pencil"></i><span>Chỉnh sửa</span></button><button class="primary-button" type="button" data-dict-action="toggle-word-mastered"><i data-lucide="badge-check"></i><span>${isLearned(word) ? "Bỏ đánh dấu thuộc" : "Đã thuộc"}</span></button></div></section></div>`;
    refreshIcons();
    setTimeout(() => speak(word.character), 100);
  }
  function toast(message) {
    const element = root.querySelector("#dictToast");
    if (!element) return;
    element.textContent = message;
    element.classList.add("show");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => element.classList.remove("show"), 2600);
  }

  function setScreen(screen) {
    state.screen = screen;
    state.selectedId = null;
    renderShell();
  }

  function localLookup(character) {
    const clean = String(character || "").trim();
    if (!clean) return null;
    const saved = state.words.find((word) => word.character === clean);
    if (saved) return saved;
    for (const set of sets) {
      const found = set.words.find((word) => word.character === clean);
      if (found) return { ...found, source: set.title };
    }
    return null;
  }

  function fillWordForm(info) {
    const form = root.querySelector("#dictWordForm");
    if (!form || !info) return;
    ["character", "pinyin", "hanViet", "meaning", "note"].forEach((key) => {
      if (form.elements[key] && info[key]) form.elements[key].value = info[key];
    });
  }

  async function lookupCurrentWord() {
    const form = root.querySelector("#dictWordForm");
    const character = form?.elements.character?.value.trim();
    if (!form || !character) {
      toast("Hãy nhập chữ Hán cần tra trước.");
      return;
    }
    const local = localLookup(character);
    if (local) {
      fillWordForm(local);
      toast("Đã tìm thấy thông tin trong kho dữ liệu cục bộ.");
      return;
    }
    if (!/^https?:$/.test(location.protocol)) {
      toast("Chưa có từ này trong kho cục bộ; bạn có thể tự điền thông tin.");
      return;
    }
    const lookupButtons = root.querySelectorAll('[data-dict-action="lookup"]');
    lookupButtons.forEach((button) => { button.disabled = true; });
    try {
      const response = await fetch("/api/dictionaryInfo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ character }),
      });
      if (!response.ok) throw new Error("lookup failed");
      const data = await response.json();
      fillWordForm({ character, ...data });
      toast("Đã tra và tự điền thông tin từ.");
    } catch (_) {
      toast("Máy chủ tra từ chưa được cấu hình; biểu mẫu vẫn có thể nhập thủ công.");
    } finally {
      lookupButtons.forEach((button) => { button.disabled = false; });
    }
  }

  let suggestionTimer = null;
  async function showSuggestions(value) {
    const box = root.querySelector("#dictSuggestions");
    if (!box) return;
    const query = normalize(value).replace(/\s+/g, "");
    if (query.length < 2) {
      box.innerHTML = "";
      box.classList.remove("open");
      return;
    }
    const catalog = sets.flatMap((set) => set.words);
    const local = catalog.filter((word, index, array) => normalize(word.pinyin).replace(/\s+/g, "").startsWith(query) && array.findIndex((item) => item.character === word.character) === index).slice(0, 8);
    const choices = [...local];
    try {
      const endpoint = /^https?:$/.test(location.protocol)
        ? `/api/suggest?text=${encodeURIComponent(value)}`
        : `https://inputtools.google.com/request?text=${encodeURIComponent(value)}&itc=zh-t-i0-pinyin&num=8&cp=0&cs=1&ie=utf-8&oe=utf-8&app=demopage`;
      const response = await fetch(endpoint);
      const data = await response.json();
      const suggestions = data?.[1]?.[0]?.[1] || [];
      suggestions.forEach((character) => {
        if (!choices.some((item) => item.character === character)) choices.push({ character, pinyin: value, hanViet: "", meaning: "" });
      });
    } catch (_) {
      // Local catalog suggestions remain available offline.
    }
    box.innerHTML = choices.slice(0, 10).map((word) => `<button type="button" data-suggestion-character="${escapeHtml(word.character)}"><strong>${escapeHtml(word.character)}</strong><span>${escapeHtml(word.pinyin || value)}</span><small>${escapeHtml(word.meaning || "Chọn chữ này")}</small></button>`).join("");
    box.classList.toggle("open", choices.length > 0);
  }

  function addSetToDictionary(setId) {
    const set = sets.find((item) => item.id === setId);
    if (!set) return;
    const existing = new Set(state.words.map((word) => word.character));
    const additions = set.words.filter((word) => !existing.has(word.character)).map((word) => ({ ...word, id: uid("set"), note: `Từ bộ ${set.title}`, source: set.title, createdAt: new Date().toISOString(), reviewCount: 0, rememberCount: 0 }));
    state.words.push(...additions);
    saveWords();
    renderShell();
    toast(additions.length ? `Đã thêm ${additions.length} từ mới.` : "Toàn bộ từ trong bộ này đã có trong sổ.");
  }

  async function generateConversation() {
    state.conversationLoading = true;
    renderScreen();
    let next = null;
    if (/^https?:$/.test(location.protocol)) {
      try {
        const response = await fetch("/api/generateConversation");
        if (!response.ok) throw new Error("conversation failed");
        const data = await response.json();
        if (Array.isArray(data.conversation) && data.conversation.length) next = data.conversation;
      } catch (_) {
        // Continue with the offline conversation bank.
      }
    }
    if (!next) {
      const pool = conversations.filter((conversation) => conversation !== state.conversation);
      next = pool[Math.floor(Math.random() * pool.length)] || conversations[0];
    }
    if (state.conversation?.length) {
      state.conversationHistory.unshift(state.conversation);
      state.conversationHistory = state.conversationHistory.slice(0, 20);
      writeStore(STORE.conversations, state.conversationHistory);
    }
    state.conversation = next;
    state.conversationLoading = false;
    renderScreen();
  }

  function rememberCurrentWord() {
    const word = state.flash.deck[state.flash.index];
    if (!word) return;
    word.rememberCount = Math.min(5, Number(word.rememberCount || 0) + 1);
    if (word.rememberCount >= 5) word.reviewCount = Math.max(20, Number(word.reviewCount || 0));
    saveWords();
    if (!state.flash.flipped) flipFlashcard(); else renderScreen();
  }

  function forgetCurrentWord() {
    const word = state.flash.deck[state.flash.index];
    if (!word) return;
    word.rememberCount = Math.max(0, Number(word.rememberCount || 0) - 1);
    saveWords();
    if (!state.flash.flipped) flipFlashcard(); else renderScreen();
  }

  root.addEventListener("click", (event) => {
    const deleteSentence = event.target.closest("[data-delete-sentence]");
    if (deleteSentence) {
      event.preventDefault();
      event.stopPropagation();
      const index = Number(deleteSentence.dataset.deleteSentence);
      if (index >= curatedSentences.length) {
        state.customSentences.splice(index - curatedSentences.length, 1);
        state.practice.selectedSentence = 0;
        writeStore(STORE.customSentences, state.customSentences);
        renderScreen();
      }
      return;
    }

    const screenButton = event.target.closest("[data-dict-screen]");
    if (screenButton) {
      setScreen(screenButton.dataset.dictScreen);
      return;
    }

    const speakButton = event.target.closest("[data-speak-text]");
    if (speakButton) {
      speak(speakButton.dataset.speakText);
      return;
    }

    const suggestion = event.target.closest("[data-suggestion-character]");
    if (suggestion) {
      const character = suggestion.dataset.suggestionCharacter;
      const form = root.querySelector("#dictWordForm");
      if (form) {
        form.elements.character.value = character;
        const info = localLookup(character);
        if (info) fillWordForm(info);
        root.querySelector("#dictSuggestions")?.classList.remove("open");
      }
      return;
    }

    const wordCardElement = event.target.closest("[data-word-id]");
    if (wordCardElement) {
      state.selectedId = wordCardElement.dataset.wordId;
      renderModals();
      return;
    }

    const setFilter = event.target.closest("[data-set-filter]");
    if (setFilter) {
      state.setFilter = setFilter.dataset.setFilter;
      renderScreen();
      return;
    }

    const expandSet = event.target.closest("[data-expand-set]");
    if (expandSet) {
      state.expandedSet = state.expandedSet === expandSet.dataset.expandSet ? null : expandSet.dataset.expandSet;
      renderScreen();
      return;
    }

    const addSet = event.target.closest("[data-add-set]");
    if (addSet) {
      addSetToDictionary(addSet.dataset.addSet);
      return;
    }

    const practiceTab = event.target.closest("[data-practice-tab]");
    if (practiceTab) {
      state.practice.tab = practiceTab.dataset.practiceTab;
      state.practice.writingResult = "";
      renderScreen();
      return;
    }

    const listenAnswer = event.target.closest("[data-listen-answer]");
    if (listenAnswer && !state.practice.answered && state.practice.question) {
      state.practice.answered = true;
      state.practice.total += 1;
      if (listenAnswer.dataset.listenAnswer === state.practice.question.answer.id) state.practice.correct += 1;
      renderScreen();
      return;
    }

    const sentence = event.target.closest("[data-sentence-index]");
    if (sentence) {
      state.practice.selectedSentence = Number(sentence.dataset.sentenceIndex);
      state.practice.writingResult = "";
      renderScreen();
      return;
    }

    const conversationWord = event.target.closest("[data-conv-word]");
    if (conversationWord) {
      const character = conversationWord.dataset.convWord.replace(/[。，“”！？、,.!?；;\s]/g, "");
      const info = localLookup(character) || { character, pinyin: conversationWord.dataset.convPinyin || "", hanViet: "", meaning: "" };
      state.draft = { ...info, id: "" };
      state.addOpen = true;
      setScreen("library");
      setTimeout(() => root.querySelector("#dictCharacterInput")?.focus(), 50);
      return;
    }

    const actionButton = event.target.closest("[data-dict-action]");
    if (!actionButton) return;
    const action = actionButton.dataset.dictAction;

    if (action === "notifications") {
      state.notificationOpen = true;
      renderModals();
    } else if (action === "close-modal") {
      state.notificationOpen = false;
      state.selectedId = null;
      renderModals();
    } else if (action === "mark-notifications") {
      state.notificationRead = true;
      state.notificationOpen = false;
      writeStore(STORE.notifications, true);
      renderShell();
    } else if (action === "open-add") {
      state.addOpen = true;
      state.draft = null;
      renderScreen();
      setTimeout(() => root.querySelector("#dictCharacterInput")?.focus(), 50);
    } else if (action === "close-add") {
      state.addOpen = false;
      state.draft = null;
      renderScreen();
    } else if (action === "clear-search") {
      state.search = "";
      const input = root.querySelector("#dictSearchInput");
      if (input) input.value = "";
      renderWordGrid();
    } else if (action === "lookup") {
      lookupCurrentWord();
    } else if (action === "delete-word") {
      const word = findWord(state.selectedId);
      if (word && confirm(`Xóa “${word.character}” khỏi từ điển?`)) {
        state.words = state.words.filter((item) => item.id !== word.id);
        saveWords();
        state.selectedId = null;
        renderShell();
        toast("Đã xóa từ khỏi sổ.");
      }
    } else if (action === "edit-word") {
      const word = findWord(state.selectedId);
      if (word) {
        state.draft = { ...word };
        state.addOpen = true;
        state.selectedId = null;
        setScreen("library");
      }
    } else if (action === "toggle-word-mastered") {
      const word = findWord(state.selectedId);
      if (word) {
        if (isLearned(word)) { word.reviewCount = 0; word.rememberCount = 0; } else { word.reviewCount = 20; word.rememberCount = 5; }
        saveWords();
        renderModals();
      }
    } else if (action === "end-flash") {
      state.flash.active = false;
      renderScreen();
    } else if (action === "flip") flipFlashcard();
    else if (action === "flash-prev") moveFlashcard(-1);
    else if (action === "flash-next") moveFlashcard(1);
    else if (action === "remember") rememberCurrentWord();
    else if (action === "forget") forgetCurrentWord();
    else if (action === "speak-current") speak(state.flash.deck[state.flash.index]?.character);
    else if (action === "toggle-mastered") {
      const word = state.flash.deck[state.flash.index];
      if (word) {
        if (isLearned(word)) { word.reviewCount = 0; word.rememberCount = 0; } else { word.reviewCount = 20; word.rememberCount = 5; }
        saveWords();
        renderScreen();
      }
    } else if (action === "repeat-listening") speak(state.practice.question?.answer.character);
    else if (action === "next-listening") newListeningQuestion();
    else if (action === "toggle-pinyin") {
      state.practice.showPinyin = !state.practice.showPinyin;
      renderScreen();
    } else if (action === "new-conversation") generateConversation();
    else if (action === "old-conversation") {
      state.conversation = state.conversationHistory.shift() || conversations[Math.floor(Math.random() * conversations.length)];
      writeStore(STORE.conversations, state.conversationHistory);
      renderScreen();
    }
  });

  root.addEventListener("input", (event) => {
    if (event.target.id === "dictSearchInput") {
      state.search = event.target.value;
      renderWordGrid();
    }
    if (event.target.id === "dictPinyinInput") {
      clearTimeout(suggestionTimer);
      suggestionTimer = setTimeout(() => showSuggestions(event.target.value), 220);
    }
  });

  root.addEventListener("change", (event) => {
    if (event.target.id === "dictStartDate" && event.target.value) {
      writeStore(STORE.start, event.target.value);
      renderScreen();
    }
  });

  root.addEventListener("submit", (event) => {
    event.preventDefault();
    if (event.target.id === "dictWordForm") {
      const data = Object.fromEntries(new FormData(event.target).entries());
      const character = String(data.character || "").trim();
      const duplicate = state.words.find((word) => word.character === character && word.id !== data.id);
      if (duplicate) {
        toast("Từ này đã có trong sổ; hãy mở thẻ từ để chỉnh sửa.");
        return;
      }
      if (data.id) {
        const index = state.words.findIndex((word) => word.id === data.id);
        if (index >= 0) state.words[index] = { ...state.words[index], ...data, character, source: state.words[index].source || "Tự thêm" };
      } else {
        state.words.unshift({ ...data, id: uid(), character, source: "Tự thêm", createdAt: new Date().toISOString(), reviewCount: 0, rememberCount: 0 });
      }
      saveWords();
      state.addOpen = false;
      state.draft = null;
      renderShell();
      toast(data.id ? "Đã lưu thay đổi." : "Đã thêm từ mới vào sổ.");
    } else if (event.target.id === "dictFlashSetup") {
      const data = new FormData(event.target);
      state.flash.limit = Number(data.get("limit"));
      state.flash.includeLearned = data.has("includeLearned");
      state.flash.autoAudio = data.has("autoAudio");
      startFlashcards();
    } else if (event.target.id === "dictCustomSentenceForm") {
      const data = Object.fromEntries(new FormData(event.target).entries());
      state.customSentences.push({ zh: String(data.zh).trim(), py: String(data.py || "").trim(), vi: String(data.vi).trim() });
      writeStore(STORE.customSentences, state.customSentences);
      state.practice.selectedSentence = allSentences().length - 1;
      renderScreen();
    } else if (event.target.id === "dictWritingForm") {
      const selected = allSentences()[state.practice.selectedSentence] || curatedSentences[0];
      const answer = new FormData(event.target).get("answer");
      state.practice.writingResult = writingFeedback(answer, selected.zh);
      const result = root.querySelector("#dictWritingResult");
      if (result) result.innerHTML = state.practice.writingResult;
    }
  });

  document.addEventListener("keydown", (event) => {
    if (state.screen !== "flash" || !state.flash.active || document.activeElement?.matches("input, textarea, select")) return;
    if (event.key === "ArrowLeft") moveFlashcard(-1);
    else if (event.key === "ArrowRight") moveFlashcard(1);
    else if ([" ", "ArrowUp", "ArrowDown"].includes(event.key)) {
      event.preventDefault();
      flipFlashcard();
    }
  });

  if (state.words.length >= 4) newListeningQuestion(false);
  renderShell();
})();