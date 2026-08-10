(() => {
  "use strict";

  const koreanData = window.KOREAN_COURSE;
  const koreanLessonOne = window.KOREAN_LESSON_ONE;
  const languageGate = document.querySelector("#languageGate");
  const languageApps = {
    zh: document.querySelector("#chineseApp"),
    ko: document.querySelector("#koreanApp"),
    en: document.querySelector("#englishApp"),
  };
  const koreanApp = languageApps.ko;
  const titleMap = {
    zh: "Sổ ôn tiếng Trung",
    ko: "Sổ học tiếng Hàn · Hangeul",
    en: "Sổ học tiếng Anh",
  };

  const koreanMarkup = `
    <header class="app-header course-header">
      <div class="brand">
        <span class="course-logo" aria-hidden="true">한</span>
        <div>
          <h1>Sổ học tiếng Hàn</h1>
          <p>Bảng chữ cái nền tảng · Bài 1: Chào hỏi & giới thiệu</p>
        </div>
      </div>
      <button class="language-switch" type="button" data-switch-language>
        <i data-lucide="languages"></i><span>Đổi ngôn ngữ</span>
      </button>
      <div class="header-stats korean-stats" aria-label="Tiến độ tiếng Hàn">
        <div><strong>1</strong><span>bài chính</span></div>
        <div><strong>40</strong><span>chữ cái</span></div>
        <div><strong>24</strong><span>slide bài 1</span></div>
        <div><strong id="koStatCompleted">0/5</strong><span>đã học</span></div>
      </div>
    </header>

    <main class="app-shell course-shell">
      <nav class="course-tabbar" aria-label="Khu vực học tiếng Hàn">
        <button class="course-tab active" type="button" data-korean-tab="ko-overview">
          <i data-lucide="layout-dashboard"></i><span>Tổng quan</span>
        </button>
        <button class="course-tab" type="button" data-korean-tab="ko-alphabet">
          <i data-lucide="notebook-tabs"></i><span>Bảng chữ cái</span>
        </button>
        <button class="course-tab" type="button" data-korean-tab="ko-lesson-1">
          <i data-lucide="presentation"></i><span>Bài 1</span>
        </button>
        <button class="course-tab" type="button" data-korean-tab="ko-lesson-vocab">
          <i data-lucide="library-big"></i><span>Từ vựng</span>
        </button>
        <button class="course-tab" type="button" data-korean-tab="ko-lesson-practice">
          <i data-lucide="pencil-line"></i><span>Luyện tập</span>
        </button>
      </nav>
      <section class="course-view active" id="ko-overview">
        <div class="dashboard-band korean-hero korean-course-hero">
          <div>
            <p class="eyebrow">Lộ trình tiếng Hàn</p>
            <h2>Từ 한글 nền tảng đến Bài 1 giao tiếp</h2>
            <p class="band-copy">Phần Bảng chữ cái là kiến thức tân thủ bắt buộc phải thuộc. Sau đó chuyển sang Bài 1 để chào hỏi, giới thiệu bản thân và dùng mẫu câu danh từ.</p>
            <div class="hero-actions">
              <button class="primary-button" type="button" data-open-korean-tab="ko-alphabet">
                <i data-lucide="notebook-tabs"></i><span>Ôn bảng chữ cái</span>
              </button>
              <button class="secondary-button" type="button" data-open-korean-tab="ko-lesson-1">
                <i data-lucide="play"></i><span>Vào Bài 1</span>
              </button>
            </div>
          </div>
          <div class="hangul-hero-art" aria-label="Câu chào trong Bài 1">
            <span>안</span><span>녕</span>
            <small>annyeong · xin chào</small>
          </div>
        </div>

        <div class="korean-path-grid">
          <article class="korean-path-card foundation">
            <span class="path-number">NỀN TẢNG</span>
            <div class="path-glyph" aria-hidden="true">가</div>
            <div>
              <p class="eyebrow">Tân thủ phải thuộc</p>
              <h3>Bảng chữ cái Hangeul</h3>
              <p>40 chữ cái · ghép khối · batchim · 56 từ luyện đọc.</p>
              <button class="lesson-review-button" type="button" data-open-korean-tab="ko-alphabet"><span>Mở phần nền tảng</span><i data-lucide="arrow-right"></i></button>
            </div>
          </article>
          <article class="korean-path-card lesson-one">
            <span class="path-number">BÀI 01</span>
            <div class="path-glyph" aria-hidden="true">안</div>
            <div>
              <p class="eyebrow">24 slide · ${getLessonVocabulary().length} từ</p>
              <h3>안녕하세요? 저는 노아예요.</h3>
              <p>Xin chào! Mình là Noa · giao tiếp, trường học và đồ ăn.</p>
              <button class="lesson-review-button" type="button" data-open-korean-tab="ko-lesson-1"><span>Học Bài 1</span><i data-lucide="arrow-right"></i></button>
            </div>
          </article>
        </div>

        <section class="source-note">
          <i data-lucide="presentation"></i>
          <div>
            <strong>Hai tài liệu, hai vai trò rõ ràng</strong>
            <p>“Bảng chữ cái.pdf” là nền tảng phải thuộc; “Bài số 1.pdf” là bài học chính gồm 24 trang.</p>
          </div>
        </section>
      </section>
      <section class="course-view" id="ko-alphabet">
        <div class="section-head">
          <div><p class="eyebrow">Nền tảng tân thủ · Phải thuộc</p><h2>Bảng chữ cái Hangeul</h2></div>
          <button class="secondary-button module-complete" type="button" data-complete-module="alphabet">
            <i data-lucide="circle-check"></i><span>Đánh dấu đã học</span>
          </button>
        </div>

        <section class="foundation-intro">
          <div><p class="eyebrow">Bảng chữ cái</p><strong>Học theo 4 chặng nền tảng</strong><p>Nguyên âm & phụ âm → ghép chữ → batchim → luyện đọc. Hoàn thành phần này trước khi vào Bài 1.</p></div>
          <div class="korean-module-grid" id="koModuleCards"></div>
        </section>
        <section class="korean-panel">
          <div class="korean-panel-head">
            <div><span class="section-number">01</span><h3>10 nguyên âm đơn</h3></div>
            <p>Chạm vào một chữ để nghe cách đọc.</p>
          </div>
          <div class="hangul-grid vowel-grid" id="koSimpleVowels"></div>
        </section>

        <section class="korean-panel">
          <div class="korean-panel-head">
            <div><span class="section-number">02</span><h3>11 nguyên âm đôi</h3></div>
            <p>Hai nguyên âm đơn kết hợp thành một âm mới.</p>
          </div>
          <div class="hangul-grid compound-grid" id="koCompoundVowels"></div>
        </section>

        <section class="korean-panel">
          <div class="korean-panel-head">
            <div><span class="section-number">03</span><h3>19 phụ âm</h3></div>
            <p>Gồm phụ âm thường, bật hơi và căng.</p>
          </div>
          <div class="consonant-groups" id="koConsonantGroups"></div>
        </section>
      </section>

      <section class="course-view" id="ko-compose">
        <div class="section-head">
          <div><p class="eyebrow">Phần 2</p><h2>Ghép chữ thành khối âm tiết</h2></div>
          <button class="secondary-button module-complete" type="button" data-complete-module="compose">
            <i data-lucide="circle-check"></i><span>Đánh dấu đã học</span>
          </button>
        </div>

        <div class="compose-layout">
          <section class="korean-panel compose-lab">
            <p class="eyebrow">Phòng ghép chữ</p>
            <h3>Tự tạo một âm tiết Hangeul</h3>
            <div class="compose-controls">
              <label class="field"><span>Phụ âm đầu</span><select id="koComposeInitial"></select></label>
              <span class="compose-plus" aria-hidden="true">+</span>
              <label class="field"><span>Nguyên âm</span><select id="koComposeVowel"></select></label>
              <span class="compose-plus" aria-hidden="true">+</span>
              <label class="field"><span>Phụ âm cuối</span><select id="koComposeFinal"></select></label>
            </div>
            <div class="compose-result">
              <div class="syllable-block" id="koComposeResult">한</div>
              <div>
                <strong id="koComposeFormula">ㅎ + ㅏ + ㄴ</strong>
                <p id="koComposeHint">Nguyên âm dọc: phụ âm đứng bên trái.</p>
                <button class="icon-button text-button" type="button" id="koSpeakCompose">
                  <i data-lucide="volume-2"></i><span>Nghe</span>
                </button>
              </div>
            </div>
          </section>

          <aside class="korean-panel block-guide">
            <p class="eyebrow">Quy tắc bố cục</p>
            <h3>Chữ Hàn được xếp thành khối vuông</h3>
            <div class="block-rule">
              <span class="mini-block horizontal"><b>ㅁ</b><b>ㅗ</b></span>
              <p><strong>Nguyên âm ngang</strong><br />Phụ âm ở trên, nguyên âm ở dưới: 모, 루, 흐, 요.</p>
            </div>
            <div class="block-rule">
              <span class="mini-block vertical"><b>ㅎ</b><b>ㅏ</b></span>
              <p><strong>Nguyên âm dọc</strong><br />Phụ âm bên trái, nguyên âm bên phải: 하, 여, 서.</p>
            </div>
            <div class="block-rule">
              <span class="mini-block final"><b>ㅎ</b><b>ㅏ</b><b>ㄴ</b></span>
              <p><strong>Có phụ âm cuối</strong><br />Phụ âm cuối nằm dưới khối: 한.</p>
            </div>
          </aside>
        </div>

        <section class="korean-panel example-panel">
          <div class="korean-panel-head">
            <div><span class="section-number">04</span><h3>Mẫu ghép trong tài liệu</h3></div>
            <p>Đọc từ trái sang phải, nhưng viết thành từng khối.</p>
          </div>
          <div class="syllable-examples" id="koSyllableExamples"></div>
        </section>
      </section>

      <section class="course-view" id="ko-batchim">
        <div class="section-head">
          <div><p class="eyebrow">Phần 3</p><h2>Phụ âm cuối · 받침</h2></div>
          <button class="secondary-button module-complete" type="button" data-complete-module="batchim">
            <i data-lucide="circle-check"></i><span>Đánh dấu đã học</span>
          </button>
        </div>

        <section class="korean-panel">
          <div class="korean-panel-head">
            <div><span class="section-number">05</span><h3>7 âm đọc phụ âm cuối cơ bản</h3></div>
            <p>Nhiều chữ viết khác nhau được quy về cùng một âm cuối.</p>
          </div>
          <div class="batchim-table-wrap">
            <table class="batchim-table">
              <thead><tr><th>Phụ âm cuối</th><th>Đọc theo</th><th>Ví dụ</th></tr></thead>
              <tbody id="koBatchimRows"></tbody>
            </table>
          </div>
        </section>

        <section class="korean-panel">
          <div class="korean-panel-head">
            <div><span class="section-number">06</span><h3>Phụ âm cuối kép</h3></div>
            <p>Quy tắc tóm tắt theo bài học nhập môn.</p>
          </div>
          <div class="double-batchim-grid" id="koDoubleBatchim"></div>
        </section>

        <section class="korean-tip">
          <strong>Lưu ý với ㅢ</strong>
          <ul>
            <li>Đầu từ như <b>의자</b>, <b>의사</b>: thường đọc gần /ưi/.</li>
            <li>Khi <b>의</b> mang nghĩa “của”: thường đọc gần /ê/.</li>
            <li>Ở một số vị trí khác: cách đọc có thể gần /i/.</li>
          </ul>
        </section>
      </section>

      <section class="course-view" id="ko-practice">
        <div class="section-head">
          <div><p class="eyebrow">Phần 4</p><h2>Luyện đọc và tự kiểm tra</h2></div>
          <button class="secondary-button module-complete" type="button" data-complete-module="practice">
            <i data-lucide="circle-check"></i><span>Đánh dấu đã học</span>
          </button>
        </div>

        <section class="korean-panel pitch-guide">
          <div class="korean-panel-head">
            <div><span class="section-number">07</span><h3 id="koPitchTitle"></h3></div>
            <p>Ghi chú cao độ dành cho người Việt.</p>
          </div>
          <p class="pitch-intro" id="koPitchIntro"></p>
          <div class="pitch-mark-grid" id="koPitchMarks"></div>
          <div class="pitch-rule-grid" id="koPitchGroups"></div>
          <div class="pitch-caution" id="koPitchCaution"></div>
        </section>

        <div class="practice-layout extended-practice-layout">
          <section class="korean-panel reading-practice">
            <div class="korean-panel-head">
              <div><span class="section-number">08</span><h3>52 từ theo PDF · 4 từ khởi động</h3></div>
              <p>Đối chiếu chữ Hàn, phiên âm và cách đọc gần đúng rồi nhấn để nghe.</p>
            </div>
            <div class="pronunciation-sections" id="koReadingWords"></div>
          </section>

          <section class="quiz-panel korean-quiz">
            <div class="quiz-score" id="koQuizScore">0 đúng · 0 câu</div>
            <div class="quiz-question" id="koQuizQuestion"></div>
            <div class="quiz-options" id="koQuizOptions"></div>
            <div class="quiz-feedback" id="koQuizFeedback" aria-live="polite"></div>
            <button class="primary-button" type="button" id="koNextQuestion">
              <i data-lucide="arrow-right"></i><span>Câu tiếp</span>
            </button>
          </section>
        </div>
      </section>

      <section class="course-view" id="ko-lesson-1">
        <div class="section-head">
          <div><p class="eyebrow">Bài 01 · 24 slide</p><h2>안녕하세요? 저는 노아예요.</h2><p class="section-subtitle">Annyeonghaseyo? Jeoneun Noayeyo. · Xin chào! Mình là Noa.</p></div>
          <button class="secondary-button module-complete" type="button" data-complete-module="lesson-1"><i data-lucide="circle-check"></i><span>Đánh dấu đã học</span></button>
        </div>
        <section class="lesson-one-hero">
          <div>
            <span class="lesson-one-mark">안</span>
            <p class="eyebrow">Mục tiêu bài học</p>
            <h3>Chào hỏi, giới thiệu và nói về trường học</h3>
            <div class="lesson-outcomes" id="koLessonOutcomes"></div>
          </div>
          <button type="button" class="lesson-cover-button" data-open-ko-slide="assets/korean/lesson-1/slides/slide-01.png" data-ko-slide-title="Bài 1 · 안녕하세요? 저는 노아예요.">
            <img src="assets/korean/lesson-1/slides/slide-01.png" alt="Trang mở đầu Bài 1 tiếng Hàn" />
            <span><i data-lucide="maximize-2"></i>Xem trang mở đầu</span>
          </button>
        </section>
        <section class="korean-panel lesson-browser-panel">
          <div class="korean-panel-head lesson-browser-head"><div><span class="section-number">01</span><h3>Nội dung 24 slide</h3></div><p>Lọc theo chặng hoặc tìm bằng tiếng Hàn/tiếng Việt.</p></div>
          <div class="lesson-slide-toolbar">
            <label class="lesson-search-field"><i data-lucide="search"></i><input id="koLessonSlideSearch" type="search" placeholder="Tìm trong Bài 1…" /></label>
            <div class="lesson-filter-row" id="koLessonSlideFilters">
              <button class="active" type="button" data-ko-slide-filter="all">Tất cả</button>
              <button type="button" data-ko-slide-filter="vocabulary">Từ vựng</button>
              <button type="button" data-ko-slide-filter="grammar">Ngữ pháp</button>
              <button type="button" data-ko-slide-filter="grammar-practice">Luyện ngữ pháp</button>
              <button type="button" data-ko-slide-filter="general-practice">Luyện tập chung</button>
            </div>
          </div>
          <div class="korean-slide-list" id="koLessonSlideList"></div>
        </section>
      </section>

      <section class="course-view" id="ko-lesson-vocab">
        <div class="section-head">
          <div><p class="eyebrow">Bài 01 · I. Từ vựng</p><h2>${getLessonVocabulary().length} từ và cụm từ theo chủ đề</h2><p class="section-subtitle">Mỗi thẻ có chữ Hàn, phiên âm, nghĩa Việt và nút nghe.</p></div>
          <button class="secondary-button" type="button" data-open-korean-tab="ko-lesson-1"><i data-lucide="presentation"></i><span>Xem slide</span></button>
        </div>
        <section class="lesson-reading-guide" id="koLessonReadingGuide"></section>
        <section class="korean-panel lesson-vocab-panel">
          <div class="lesson-vocab-toolbar">
            <label class="lesson-search-field"><i data-lucide="search"></i><input id="koLessonVocabSearch" type="search" placeholder="Tìm chữ Hàn, phiên âm hoặc nghĩa…" /></label>
            <div class="lesson-filter-row" id="koLessonVocabFilters"></div>
          </div>
          <div class="lesson-vocab-groups" id="koLessonVocabulary"></div>
        </section>
      </section>

      <section class="course-view" id="ko-lesson-practice">
        <div class="section-head">
          <div><p class="eyebrow">Bài 01 · II–IV</p><h2>Ngữ pháp và luyện tập</h2><p class="section-subtitle">Học quy tắc trước, sau đó mở bài tập gốc để làm theo từng slide.</p></div>
          <button class="secondary-button" type="button" data-open-korean-tab="ko-lesson-1"><i data-lucide="arrow-left"></i><span>Về Bài 1</span></button>
        </div>
        <div class="lesson-grammar-grid" id="koLessonGrammar"></div>
        <section class="korean-panel lesson-translation-panel">
          <div class="korean-panel-head"><div><span class="section-number">01</span><h3>Luyện dịch mẫu câu “A là B”</h3></div><p>Tự dịch trước, sau đó mở đáp án và nghe câu tiếng Hàn.</p></div>
          <div class="lesson-translation-grid" id="koLessonSentencePractice"></div>
        </section>
        <section class="korean-panel lesson-practice-panel">
          <div class="korean-panel-head"><div><span class="section-number">02</span><h3>12 slide luyện tập</h3></div><p>Nhấn ảnh để phóng to nội dung gốc.</p></div>
          <div class="lesson-practice-grid" id="koLessonPracticeSlides"></div>
        </section>
      </section>

      <dialog class="korean-slide-dialog" id="koSlideDialog">
        <div class="slide-dialog-head"><strong id="koSlideDialogTitle">Bài 1</strong><button type="button" data-close-ko-slide aria-label="Đóng"><i data-lucide="x"></i></button></div>
        <img id="koSlideDialogImage" alt="Bản xem trước slide tiếng Hàn" />
      </dialog>
    </main>
  `;

  if (koreanApp && koreanData && koreanLessonOne) {
    koreanApp.innerHTML = koreanMarkup;
  }

  const escapeHtml = (value) =>
    String(value ?? "").replace(/[&<>'"]/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    })[character]);

  function refreshCourseIcons() {
    if (window.lucide?.createIcons) window.lucide.createIcons();
  }

  function showLanguageGate() {
    Object.values(languageApps).forEach((app) => {
      if (app) app.hidden = true;
    });
    languageGate.hidden = false;
    document.body.removeAttribute("data-current-language");
    document.title = "Sổ học ngoại ngữ";
    window.scrollTo({ top: 0, behavior: "smooth" });
    refreshCourseIcons();
  }

  function enterLanguage(language) {
    const target = languageApps[language];
    if (!target) return;
    languageGate.hidden = true;
    Object.entries(languageApps).forEach(([code, app]) => {
      if (app) app.hidden = code !== language;
    });
    document.body.dataset.currentLanguage = language;
    document.title = titleMap[language];
    window.scrollTo({ top: 0, behavior: "smooth" });
    refreshCourseIcons();
  }

  function activateKoreanTab(tabId) {
    if (!koreanApp?.querySelector(`#${tabId}`)) return;
    const foundationViews = new Set(["ko-compose", "ko-batchim", "ko-practice"]);
    const activeTopTab = foundationViews.has(tabId) ? "ko-alphabet" : tabId;
    koreanApp.querySelectorAll(".course-tab").forEach((tab) => {
      tab.classList.toggle("active", tab.dataset.koreanTab === activeTopTab);
    });
    koreanApp.querySelectorAll(".course-view").forEach((view) => {
      view.classList.toggle("active", view.id === tabId);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function speakKorean(text) {
    if (!("speechSynthesis" in window) || !text) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ko-KR";
    utterance.rate = 0.82;
    window.speechSynthesis.speak(utterance);
  }

  function renderModules() {
    const container = koreanApp.querySelector("#koModuleCards");
    container.innerHTML = koreanData.modules.map((module) => `
      <article class="korean-module-card" data-module-card="${escapeHtml(module.id)}">
        <button class="module-open" type="button" data-open-korean-tab="${escapeHtml(module.tab)}">
          <span class="module-icon"><i data-lucide="${escapeHtml(module.icon)}"></i></span>
          <span class="module-number">${escapeHtml(module.number)}</span>
          <strong>${escapeHtml(module.title)}</strong>
          <small>${escapeHtml(module.summary)}</small>
        </button>
        <button class="module-status" type="button" data-complete-module="${escapeHtml(module.id)}">
          <i data-lucide="circle"></i><span>Chưa học</span>
        </button>
      </article>
    `).join("");
  }

  const koreanSlideSectionLabels = {
    intro: "Mở bài",
    vocabulary: "Từ vựng",
    grammar: "Ngữ pháp",
    "grammar-practice": "Luyện ngữ pháp",
    "general-practice": "Luyện tập chung",
  };
  let koreanSlideFilter = "all";
  let koreanVocabularyFilter = "all";

  function normalizeCourseSearch(value) {
    return String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function getLessonVocabulary() {
    return koreanLessonOne.vocabularyGroups.flatMap((group) => group.words.map((word) => ({ ...word, groupId: group.id, groupTitle: group.title })));
  }

  function getLessonAnnotatedItems() {
    return [
      ...getLessonVocabulary(),
      ...(koreanLessonOne.annotations || []),
      ...koreanLessonOne.grammar.flatMap((item) => item.examples),
    ];
  }

  function renderLessonOutcomes() {
    koreanApp.querySelector("#koLessonOutcomes").innerHTML = koreanLessonOne.outcomes.map((item) => `
      <span><i data-lucide="check"></i>${escapeHtml(item)}</span>
    `).join("");
  }

  function renderKoreanLessonLine(line) {
    const [head, ...meaningParts] = String(line).split(" · ");
    const lookup = getLessonAnnotatedItems().find((item) => item.text.replace(/[.?!]$/g, "") === head.replace(/[.?!]$/g, ""));
    const startsWithHangul = /^\s*[\uac00-\ud7af]/.test(head);
    if (!startsWithHangul) return `<p class="lesson-slide-line plain"><i data-lucide="check"></i><span>${escapeHtml(line)}</span></p>`;
    const meaning = meaningParts.join(" · ") || lookup?.meaning || "";
    return `
      <div class="lesson-slide-line annotated">
        <button type="button" data-speak-ko="${escapeHtml(head)}">
          <b>${escapeHtml(head)}</b>
          <span>${escapeHtml(lookup ? `${lookup.romanization}${lookup.reading ? ` · ${lookup.reading}` : ""}` : "Nghe cách đọc")}</span>
          <i data-lucide="volume-2"></i>
        </button>
        ${meaning ? `<small>${escapeHtml(meaning)}</small>` : ""}
      </div>
    `;
  }

  function renderLessonSlides() {
    const query = normalizeCourseSearch(koreanApp.querySelector("#koLessonSlideSearch")?.value);
    const slides = koreanLessonOne.slides.filter((slide) => {
      const bySection = koreanSlideFilter === "all" || slide.section === koreanSlideFilter;
      const content = normalizeCourseSearch([slide.title, slide.summary, ...slide.lines].join(" "));
      return bySection && (!query || content.includes(query));
    });
    koreanApp.querySelector("#koLessonSlideList").innerHTML = slides.length ? slides.map((slide) => `
      <article class="korean-lesson-slide-card">
        <button class="lesson-slide-preview" type="button" data-open-ko-slide="${escapeHtml(slide.image)}" data-ko-slide-title="Slide ${slide.index} · ${escapeHtml(slide.title)}">
          <img src="${escapeHtml(slide.image)}" alt="Bản xem trước slide ${slide.index}: ${escapeHtml(slide.title)}" loading="lazy" />
          <span><i data-lucide="maximize-2"></i>Mở slide gốc</span>
        </button>
        <div class="lesson-slide-content">
          <div class="lesson-slide-meta"><span>Slide ${slide.index}</span><em>${escapeHtml(koreanSlideSectionLabels[slide.section])}</em></div>
          <h3>${escapeHtml(slide.title)}</h3>
          <p class="lesson-slide-summary">${escapeHtml(slide.summary)}</p>
          <div class="lesson-slide-lines">${slide.lines.slice(0, 5).map(renderKoreanLessonLine).join("")}</div>
        </div>
      </article>
    `).join("") : `<div class="empty-state">Không có slide phù hợp với bộ lọc.</div>`;
    refreshCourseIcons();
  }

  function renderLessonVocabularyFilters() {
    const filters = [{ id: "all", title: "Tất cả" }, ...koreanLessonOne.vocabularyGroups];
    koreanApp.querySelector("#koLessonVocabFilters").innerHTML = filters.map((item) => `
      <button class="${item.id === koreanVocabularyFilter ? "active" : ""}" type="button" data-ko-vocab-filter="${escapeHtml(item.id)}">${escapeHtml(item.title)}</button>
    `).join("");
  }

  function renderLessonReadingGuide() {
    koreanApp.querySelector("#koLessonReadingGuide").innerHTML = `
      <div class="lesson-reading-guide-copy">
        <p class="eyebrow">Hướng dẫn đọc nhanh</p>
        <h3>Đọc phiên âm theo âm gần nhất trong tiếng Việt</h3>
        <p>${escapeHtml(koreanLessonOne.pronunciationNote)}</p>
      </div>
      <div class="lesson-reading-rule-grid">
        ${koreanLessonOne.readingGuide.map((rule) => `
          <article>
            <strong>${escapeHtml(rule.symbol)}</strong>
            <span>${escapeHtml(rule.title)}</span>
            <small>${escapeHtml(rule.example)}</small>
          </article>
        `).join("")}
      </div>
    `;
  }

  function renderLessonVocabulary() {
    const query = normalizeCourseSearch(koreanApp.querySelector("#koLessonVocabSearch")?.value);
    const groups = koreanLessonOne.vocabularyGroups.map((group) => ({
      ...group,
      words: group.words.filter((word) => !query || normalizeCourseSearch(`${word.text} ${word.romanization} ${word.reading} ${word.meaning} ${word.pronunciationTip || ""} ${word.note || ""}`).includes(query)),
    })).filter((group) => (koreanVocabularyFilter === "all" || group.id === koreanVocabularyFilter) && group.words.length);
    koreanApp.querySelector("#koLessonVocabulary").innerHTML = groups.length ? groups.map((group) => `
      <section class="lesson-vocab-group">
        <div class="lesson-vocab-group-head"><span><i data-lucide="${escapeHtml(group.icon)}"></i></span><div><p class="eyebrow">${group.words.length} mục · Trang PDF ${escapeHtml(group.page)}</p><h3>${escapeHtml(group.title)}</h3></div></div>
        <div class="lesson-vocab-grid">
          ${group.words.map((word) => `
            <article class="lesson-vocab-card">
              <button type="button" data-speak-ko="${escapeHtml(word.text)}" aria-label="Nghe ${escapeHtml(word.text)}"><i data-lucide="volume-2"></i></button>
              <strong>${escapeHtml(word.text)}</strong>
              <span class="lesson-vocab-romanization">${escapeHtml(word.romanization)}</span>
              <div class="lesson-vocab-reading"><small>Đọc gần đúng</small><b>${escapeHtml(word.reading)}</b></div>
              <p>${escapeHtml(word.meaning)}</p>
              ${word.pronunciationTip ? `<small class="lesson-vocab-tip"><i data-lucide="audio-lines"></i>${escapeHtml(word.pronunciationTip)}</small>` : ""}
              ${word.note ? `<small class="lesson-vocab-note"><i data-lucide="notebook-pen"></i>${escapeHtml(word.note)}</small>` : ""}
              <a class="lesson-vocab-naver" href="https://korean.dict.naver.com/kovidict/#/search?query=${encodeURIComponent(word.text)}" target="_blank" rel="noopener noreferrer"><i data-lucide="search"></i>Tra Naver</a>
            </article>
          `).join("")}
        </div>
      </section>
    `).join("") : `<div class="empty-state">Không có từ phù hợp.</div>`;
    renderLessonVocabularyFilters();
    refreshCourseIcons();
  }

  function renderLessonGrammar() {
    koreanApp.querySelector("#koLessonGrammar").innerHTML = koreanLessonOne.grammar.map((item, index) => `
      <article class="lesson-grammar-card">
        <div class="grammar-card-top"><span>0${index + 1}</span><b>${escapeHtml(item.marker)}<small>${escapeHtml(item.romanization)}</small></b></div>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.meaning)}</p>
        ${item.details?.length ? `<ul class="grammar-details">${item.details.map((detail) => `<li>${escapeHtml(detail)}</li>`).join("")}</ul>` : ""}
        <div class="grammar-rule"><i data-lucide="route"></i><strong>${escapeHtml(item.rule)}</strong></div>
        <div class="grammar-examples">
          ${item.examples.map((example) => `
            <button type="button" data-speak-ko="${escapeHtml(example.text)}">
              <b>${escapeHtml(example.text)}</b><span>${escapeHtml(example.romanization)}${example.reading ? `<em> · ${escapeHtml(example.reading)}</em>` : ""}</span><small>${escapeHtml(example.meaning)}</small><i data-lucide="volume-2"></i>
            </button>
          `).join("")}
        </div>
      </article>
    `).join("");
  }

  function renderLessonSentencePractice() {
    const items = koreanLessonOne.sentencePractice || [];
    koreanApp.querySelector("#koLessonSentencePractice").innerHTML = items.map((item, index) => `
      <article class="lesson-translation-card">
        <div class="translation-prompt"><span>${String(index + 1).padStart(2, "0")}</span><p>${escapeHtml(item.prompt)}</p></div>
        <button class="translation-toggle" type="button" data-toggle-ko-practice aria-expanded="false"><i data-lucide="eye"></i><span>Xem đáp án</span></button>
        <div class="translation-answer" hidden>
          <div><strong>${escapeHtml(item.text)}</strong><button type="button" data-speak-ko="${escapeHtml(item.text)}" aria-label="Nghe ${escapeHtml(item.text)}"><i data-lucide="volume-2"></i></button></div>
          <span>${escapeHtml(item.romanization)}</span>
          <small>Đọc gần đúng: ${escapeHtml(item.reading)}</small>
          ${item.note ? `<p>${escapeHtml(item.note)}</p>` : ""}
        </div>
      </article>
    `).join("");
  }

  function renderLessonPractice() {
    const slides = koreanLessonOne.slides.filter((slide) => ["grammar-practice", "general-practice"].includes(slide.section));
    koreanApp.querySelector("#koLessonPracticeSlides").innerHTML = slides.map((slide) => `
      <article class="lesson-practice-card">
        <button type="button" data-open-ko-slide="${escapeHtml(slide.image)}" data-ko-slide-title="Slide ${slide.index} · ${escapeHtml(slide.title)}">
          <img src="${escapeHtml(slide.image)}" alt="Bài tập slide ${slide.index}: ${escapeHtml(slide.title)}" loading="lazy" />
          <span><i data-lucide="maximize-2"></i></span>
        </button>
        <div><small>${escapeHtml(koreanSlideSectionLabels[slide.section])} · Slide ${slide.index}</small><strong>${escapeHtml(slide.title)}</strong><p>${escapeHtml(slide.summary)}</p></div>
      </article>
    `).join("");
  }

  function openKoreanSlide(image, title) {
    const dialog = koreanApp.querySelector("#koSlideDialog");
    koreanApp.querySelector("#koSlideDialogImage").src = image;
    koreanApp.querySelector("#koSlideDialogTitle").textContent = title || "Bài 1";
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  }

  function closeKoreanSlide() {
    const dialog = koreanApp.querySelector("#koSlideDialog");
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
  }
  function hangulButton(item, extraClass = "") {
    return `
      <button class="hangul-card ${extraClass}" type="button" data-speak-ko="${escapeHtml(item.symbol)}">
        <strong>${escapeHtml(item.symbol)}</strong>
        <span>${escapeHtml(item.romanization)}</span>
        ${item.formula ? `<small>${escapeHtml(item.formula)}</small>` : `<small>gần âm “${escapeHtml(item.hint)}”</small>`}
        <i data-lucide="volume-2"></i>
      </button>
    `;
  }

  function renderAlphabet() {
    koreanApp.querySelector("#koSimpleVowels").innerHTML = koreanData.simpleVowels
      .map((item) => hangulButton(item))
      .join("");
    koreanApp.querySelector("#koCompoundVowels").innerHTML = koreanData.compoundVowels
      .map((item) => hangulButton(item, "compound"))
      .join("");
    koreanApp.querySelector("#koConsonantGroups").innerHTML = koreanData.consonantGroups.map((group) => `
      <section class="consonant-group ${escapeHtml(group.id)}">
        <h4>${escapeHtml(group.title)}</h4>
        <div class="consonant-grid">
          ${group.items.map(([symbol, sound]) => `
            <button type="button" data-speak-ko="${escapeHtml(symbol)}">
              <strong>${escapeHtml(symbol)}</strong><span>${escapeHtml(sound)}</span>
            </button>
          `).join("")}
        </div>
      </section>
    `).join("");
  }

  function fillComposer() {
    const initial = koreanApp.querySelector("#koComposeInitial");
    const vowel = koreanApp.querySelector("#koComposeVowel");
    const final = koreanApp.querySelector("#koComposeFinal");
    initial.innerHTML = koreanData.initials.map((item) => `<option value="${item}">${item}</option>`).join("");
    vowel.innerHTML = koreanData.vowels.map((item) => `<option value="${item}">${item}</option>`).join("");
    final.innerHTML = koreanData.finals.map((item) => `<option value="${item}">${item || "Không có"}</option>`).join("");
    initial.value = "ㅎ";
    vowel.value = "ㅏ";
    final.value = "ㄴ";
    updateComposer();
  }

  function composeHangul(initial, vowel, final) {
    const initialIndex = koreanData.initials.indexOf(initial);
    const vowelIndex = koreanData.vowels.indexOf(vowel);
    const finalIndex = koreanData.finals.indexOf(final);
    if (initialIndex < 0 || vowelIndex < 0 || finalIndex < 0) return "";
    return String.fromCharCode(0xac00 + ((initialIndex * 21) + vowelIndex) * 28 + finalIndex);
  }

  function updateComposer() {
    const initial = koreanApp.querySelector("#koComposeInitial").value;
    const vowel = koreanApp.querySelector("#koComposeVowel").value;
    const final = koreanApp.querySelector("#koComposeFinal").value;
    const result = composeHangul(initial, vowel, final);
    koreanApp.querySelector("#koComposeResult").textContent = result;
    koreanApp.querySelector("#koComposeFormula").textContent = [initial, vowel, final].filter(Boolean).join(" + ");
    const horizontal = new Set(["ㅗ", "ㅛ", "ㅜ", "ㅠ", "ㅡ"]);
    const compound = new Set(koreanData.compoundVowels.map((item) => item.symbol));
    let hint = horizontal.has(vowel)
      ? "Nguyên âm ngang: phụ âm ở trên, nguyên âm ở dưới."
      : "Nguyên âm dọc: phụ âm bên trái, nguyên âm bên phải.";
    if (compound.has(vowel)) hint = "Nguyên âm ghép kết hợp phần bên dưới và/hoặc bên phải của khối.";
    if (final) hint += " Phụ âm cuối nằm ở đáy.";
    koreanApp.querySelector("#koComposeHint").textContent = hint;
  }

  function renderComposeExamples() {
    koreanApp.querySelector("#koSyllableExamples").innerHTML = koreanData.examples.map((group) => `
      <article>
        <small>${escapeHtml(group.group)}</small>
        <div>${group.items.map((item) => `<button type="button" data-speak-ko="${item}">${item}</button>`).join("")}</div>
      </article>
    `).join("");
  }

  function renderBatchim() {
    koreanApp.querySelector("#koBatchimRows").innerHTML = koreanData.batchim.map((row) => `
      <tr>
        <td><strong>${escapeHtml(row.written)}</strong></td>
        <td><span class="batchim-sound">${escapeHtml(row.sound)}</span></td>
        <td>${escapeHtml(row.examples)}</td>
      </tr>
    `).join("");
    koreanApp.querySelector("#koDoubleBatchim").innerHTML = koreanData.doubleBatchim.map((item, index) => `
      <article>
        <span class="section-number">0${index + 1}</span>
        <strong>${escapeHtml(item.letters)}</strong>
        <p>${escapeHtml(item.rule)}</p>
        <small>${escapeHtml(item.examples)}</small>
      </article>
    `).join("");
  }

  function renderPitchRules() {
    const rules = koreanData.pitchRules;
    koreanApp.querySelector("#koPitchTitle").textContent = rules.title;
    koreanApp.querySelector("#koPitchIntro").textContent = rules.intro;
    koreanApp.querySelector("#koPitchMarks").innerHTML = rules.marks.map((item) => `
      <article><strong>${escapeHtml(item.label)}</strong><p>${escapeHtml(item.text)}</p></article>
    `).join("");
    koreanApp.querySelector("#koPitchGroups").innerHTML = [rules.lowStart, rules.highStart].map((group) => `
      <article>
        <h4>${escapeHtml(group.label)}</h4>
        ${group.groups.map((item) => `<p>${escapeHtml(item)}</p>`).join("")}
        <strong>${escapeHtml(group.rhythm)}</strong>
      </article>
    `).join("");
    koreanApp.querySelector("#koPitchCaution").innerHTML = `<i data-lucide="info"></i><p>${escapeHtml(rules.caution)}</p>`;
  }

  function getKoreanWordPool() {
    return [...koreanData.starterWords, ...koreanData.pronunciationSections.flatMap((section) => section.words), ...getLessonVocabulary()];
  }

  function renderReadingWords() {
    koreanApp.querySelector("#koReadingWords").innerHTML = [{ id: "warmup", title: "Từ khởi động trong slide", words: koreanData.starterWords }, ...koreanData.pronunciationSections].map((section) => `
      <section class="pronunciation-group">
        <h4>${escapeHtml(section.title)}</h4>
        <div class="pronunciation-table-wrap">
          <table class="pronunciation-table">
            <thead><tr><th>Tiếng Hàn</th><th>Phiên âm</th><th>Hướng dẫn đọc</th><th>Nghĩa</th><th><span class="sr-only">Nghe</span></th></tr></thead>
            <tbody>
              ${section.words.map((word) => `
                <tr data-speak-ko="${escapeHtml(word.speakText || word.text)}" tabindex="0" role="button">
                  <td><strong>${escapeHtml(word.text)}</strong></td>
                  <td>${escapeHtml(word.romanization)}</td>
                  <td><span class="pitch-reading">${escapeHtml(word.reading || word.pitch || "—")}</span>${word.pronunciationTip ? `<small class="table-reading-tip">${escapeHtml(word.pronunciationTip)}</small>` : ""}</td>
                  <td>${escapeHtml(word.meaning)}</td>
                  <td><i data-lucide="volume-2"></i></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </section>
    `).join("");
  }

  const quizState = { correct: 0, total: 0, current: null, answered: false };

  function shuffle(items) {
    const copy = [...items];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const other = Math.floor(Math.random() * (index + 1));
      [copy[index], copy[other]] = [copy[other], copy[index]];
    }
    return copy;
  }

  function nextKoreanQuestion() {
    const pool = getKoreanWordPool();
    let next = pool[Math.floor(Math.random() * pool.length)];
    if (quizState.current && pool.length > 1) {
      while (next.text === quizState.current.text) next = pool[Math.floor(Math.random() * pool.length)];
    }
    quizState.current = next;
    quizState.answered = false;
    const distractors = shuffle(pool.filter((item) => item.text !== next.text)).slice(0, 3);
    const options = shuffle([next, ...distractors]);
    koreanApp.querySelector("#koQuizQuestion").innerHTML = `
      <span class="prompt">Từ này có nghĩa là gì?</span>
      <strong class="main">${escapeHtml(next.text)}</strong>
      <small>${escapeHtml(next.romanization)}${next.reading || next.pitch ? ` · ${escapeHtml(next.reading || next.pitch)}` : ""}</small>
    `;
    koreanApp.querySelector("#koQuizOptions").innerHTML = options.map((item) => `
      <button class="quiz-option" type="button" data-ko-answer="${escapeHtml(item.text)}">${escapeHtml(item.meaning)}</button>
    `).join("");
    koreanApp.querySelector("#koQuizFeedback").textContent = "";
  }

  function chooseKoreanAnswer(answer) {
    if (quizState.answered || !quizState.current) return;
    quizState.answered = true;
    quizState.total += 1;
    const isCorrect = answer === quizState.current.text;
    if (isCorrect) quizState.correct += 1;
    koreanApp.querySelectorAll("[data-ko-answer]").forEach((button) => {
      if (button.dataset.koAnswer === quizState.current.text) button.classList.add("correct");
      else if (button.dataset.koAnswer === answer) button.classList.add("wrong");
      button.disabled = true;
    });
    koreanApp.querySelector("#koQuizFeedback").textContent = isCorrect
      ? "Đúng rồi! 잘했어요!"
      : `Đáp án: ${quizState.current.meaning}`;
    koreanApp.querySelector("#koQuizScore").textContent = `${quizState.correct} đúng · ${quizState.total} câu`;
  }

  function loadCompletedModules() {
    try {
      const saved = JSON.parse(localStorage.getItem("hanReview.korean.completed") || "[]");
      return new Set(Array.isArray(saved) ? saved : []);
    } catch {
      return new Set();
    }
  }

  let completedModules = loadCompletedModules();

  function updateCompletedUI() {
    const validIds = new Set([...koreanData.modules.map((module) => module.id), "lesson-1"]);
    completedModules = new Set([...completedModules].filter((id) => validIds.has(id)));
    koreanApp.querySelectorAll("[data-complete-module]").forEach((button) => {
      const done = completedModules.has(button.dataset.completeModule);
      button.classList.toggle("completed", done);
      const label = button.querySelector("span");
      if (label) label.textContent = button.classList.contains("module-status")
        ? (done ? "Đã học" : "Chưa học")
        : (done ? "Đã học" : "Đánh dấu đã học");
      const icon = button.querySelector("i, svg");
      if (icon) icon.setAttribute("data-lucide", done ? "circle-check-big" : "circle");
    });
    koreanApp.querySelectorAll("[data-module-card]").forEach((card) => {
      card.classList.toggle("completed", completedModules.has(card.dataset.moduleCard));
    });
    koreanApp.querySelector("#koStatCompleted").textContent = `${completedModules.size}/5`;
    try {
      localStorage.setItem("hanReview.korean.completed", JSON.stringify([...completedModules]));
    } catch {
      // Chế độ riêng tư có thể chặn localStorage; bài học vẫn hoạt động trong phiên hiện tại.
    }
    refreshCourseIcons();
  }

  function toggleCompleted(moduleId) {
    if (completedModules.has(moduleId)) completedModules.delete(moduleId);
    else completedModules.add(moduleId);
    updateCompletedUI();
  }

  function bindLanguageEvents() {
    document.querySelectorAll("[data-enter-language]").forEach((button) => {
      button.addEventListener("click", () => enterLanguage(button.dataset.enterLanguage));
    });
    document.querySelectorAll("[data-switch-language]").forEach((button) => {
      button.addEventListener("click", showLanguageGate);
    });
  }

  function bindKoreanEvents() {
    koreanApp.querySelectorAll("[data-korean-tab]").forEach((button) => {
      button.addEventListener("click", () => activateKoreanTab(button.dataset.koreanTab));
    });
    ["#koComposeInitial", "#koComposeVowel", "#koComposeFinal"].forEach((selector) => {
      koreanApp.querySelector(selector).addEventListener("change", updateComposer);
    });
    koreanApp.querySelector("#koSpeakCompose").addEventListener("click", () => {
      speakKorean(koreanApp.querySelector("#koComposeResult").textContent);
    });
    koreanApp.querySelector("#koNextQuestion").addEventListener("click", nextKoreanQuestion);
    koreanApp.querySelector("#koLessonSlideSearch").addEventListener("input", renderLessonSlides);
    koreanApp.querySelector("#koLessonVocabSearch").addEventListener("input", renderLessonVocabulary);
    koreanApp.querySelector("#koSlideDialog").addEventListener("click", (event) => {
      if (event.target === event.currentTarget) closeKoreanSlide();
    });
    koreanApp.addEventListener("click", (event) => {
      const openButton = event.target.closest("[data-open-korean-tab]");
      if (openButton) activateKoreanTab(openButton.dataset.openKoreanTab);
      const speakButton = event.target.closest("[data-speak-ko]");
      if (speakButton) speakKorean(speakButton.dataset.speakKo);
      const completeButton = event.target.closest("[data-complete-module]");
      if (completeButton) toggleCompleted(completeButton.dataset.completeModule);
      const answerButton = event.target.closest("[data-ko-answer]");
      if (answerButton) chooseKoreanAnswer(answerButton.dataset.koAnswer);
      const practiceToggle = event.target.closest("[data-toggle-ko-practice]");
      if (practiceToggle) {
        const answer = practiceToggle.closest(".lesson-translation-card").querySelector(".translation-answer");
        const willOpen = answer.hidden;
        answer.hidden = !willOpen;
        practiceToggle.setAttribute("aria-expanded", String(willOpen));
        practiceToggle.querySelector("span").textContent = willOpen ? "Ẩn đáp án" : "Xem đáp án";
      }
      const slideFilterButton = event.target.closest("[data-ko-slide-filter]");
      if (slideFilterButton) {
        koreanSlideFilter = slideFilterButton.dataset.koSlideFilter;
        koreanApp.querySelectorAll("[data-ko-slide-filter]").forEach((button) => button.classList.toggle("active", button === slideFilterButton));
        renderLessonSlides();
      }
      const vocabularyFilterButton = event.target.closest("[data-ko-vocab-filter]");
      if (vocabularyFilterButton) {
        koreanVocabularyFilter = vocabularyFilterButton.dataset.koVocabFilter;
        renderLessonVocabulary();
      }
      const slideButton = event.target.closest("[data-open-ko-slide]");
      if (slideButton) openKoreanSlide(slideButton.dataset.openKoSlide, slideButton.dataset.koSlideTitle);
      if (event.target.closest("[data-close-ko-slide]")) closeKoreanSlide();
    });
    koreanApp.addEventListener("keydown", (event) => {
      const speakRow = event.target.closest('tr[data-speak-ko][role="button"]');
      if (!speakRow || !["Enter", " "].includes(event.key)) return;
      event.preventDefault();
      speakKorean(speakRow.dataset.speakKo);
    });
  }

  function initialize() {
    if (!languageGate || !koreanApp || !koreanData || !koreanLessonOne) return;
    renderModules();
    renderAlphabet();
    fillComposer();
    renderComposeExamples();
    renderBatchim();
    renderPitchRules();
    renderReadingWords();
    renderLessonOutcomes();
    renderLessonSlides();
    renderLessonReadingGuide();
    renderLessonVocabulary();
    renderLessonGrammar();
    renderLessonSentencePractice();
    renderLessonPractice();
    nextKoreanQuestion();
    updateCompletedUI();
    bindLanguageEvents();
    bindKoreanEvents();
    showLanguageGate();
    refreshCourseIcons();
  }

  initialize();
})();
