(() => {
  "use strict";

  const koreanData = window.KOREAN_COURSE;
  const koreanLessonOne = window.KOREAN_LESSON_ONE;
  const koreanLessonTwo = window.KOREAN_LESSON_TWO;
  const koreanLessonTwoPdf = window.KOREAN_LESSON_TWO_PDF;
  const koreanLessonTwoExtension = window.KOREAN_LESSON_TWO_EXTENSION;
  const koreanLessonTwoSlides = window.KOREAN_LESSON_TWO_SLIDES;
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
          <p>Bảng chữ cái nền tảng · Bài 1–2: Giới thiệu, gia đình & nghề nghiệp</p>
        </div>
      </div>
      <button class="language-switch" type="button" data-switch-language>
        <i data-lucide="languages"></i><span>Đổi ngôn ngữ</span>
      </button>
      <div class="header-stats korean-stats" aria-label="Tiến độ tiếng Hàn">
        <div><strong>2</strong><span>bài chính</span></div>
        <div><strong>40</strong><span>chữ cái</span></div>
        <div><strong>34</strong><span>bài tương tác</span></div>
        <div><strong id="koStatCompleted">0/6</strong><span>đã học</span></div>
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
        <button class="course-tab" type="button" data-korean-tab="ko-lesson-2">
          <i data-lucide="shapes"></i><span>Bài 2</span>
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
            <h2>Từ 한글 nền tảng đến giao tiếp từng bước</h2>
            <p class="band-copy">Học bảng chữ cái trước, dùng Bài 1 để giới thiệu bản thân, rồi sang Bài 2 để nói về gia đình, nghề nghiệp, câu phủ định và số thuần Hàn.</p>
            <div class="hero-actions">
              <button class="primary-button" type="button" data-open-korean-tab="ko-alphabet">
                <i data-lucide="notebook-tabs"></i><span>Ôn bảng chữ cái</span>
              </button>
              <button class="secondary-button" type="button" data-open-korean-tab="ko-lesson-1">
                <i data-lucide="play"></i><span>Vào Bài 1</span>
              </button>
              <button class="secondary-button" type="button" data-open-korean-tab="ko-lesson-2">
                <i data-lucide="arrow-right"></i><span>Học Bài 2</span>
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
              <p class="eyebrow">12 chặng nền tảng · 12 bài tương tác · ${getLessonVocabulary().length} từ</p>
              <h3>안녕하세요? 저는 노아예요.</h3>
              <p>Xin chào! Mình là Noa · giao tiếp, trường học và đồ ăn.</p>
              <button class="lesson-review-button" type="button" data-open-korean-tab="ko-lesson-1"><span>Học Bài 1</span><i data-lucide="arrow-right"></i></button>
            </div>
          </article>
          <article class="korean-path-card lesson-two">
            <span class="path-number">BÀI 02 · 28 TRANG</span>
            <div class="path-glyph" aria-hidden="true">아</div>
            <div>
              <p class="eyebrow">${getLessonTwoVocabulary().length} từ/cụm từ · ${getLessonTwoPatterns().length} cấu trúc · ${getLessonTwoPractice().length} câu luyện</p>
              <h3>${escapeHtml(koreanLessonTwoPdf.title)}</h3>
              <p>${escapeHtml(koreanLessonTwoPdf.meaning)} · gia đình, nghề nghiệp, phủ định và số thuần Hàn.</p>
              <button class="lesson-review-button" type="button" data-open-korean-tab="ko-lesson-2"><span>Học Bài 2</span><i data-lucide="arrow-right"></i></button>
            </div>
          </article>
        </div>

        <section class="source-note">
          <i data-lucide="presentation"></i>
          <div>
            <strong>Lộ trình đã nối tiếp theo từng bài học</strong>
            <p>“Bảng chữ cái.pdf” là nền tảng; “Bài số 1.pdf” là bài mở đầu; “Bài 2.pdf” gồm 28 trang đã được chuyển thành kiến thức và bài tập tương tác.</p>
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
          <div><p class="eyebrow">Bài 01 · học và thực hành</p><h2>안녕하세요? 저는 노아예요.</h2><p class="section-subtitle">12 chặng nền tảng và 12 nhiệm vụ tương tác trực tiếp trên web.</p></div>
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
          <div class="korean-panel-head lesson-browser-head"><div><span class="section-number">01</span><h3>12 chặng kiến thức nền tảng</h3></div><p>Lọc theo từ vựng/ngữ pháp; phần luyện tập đã được chuyển thành bài web tương tác.</p></div>
          <div class="lesson-slide-toolbar">
            <label class="lesson-search-field"><i data-lucide="search"></i><input id="koLessonSlideSearch" type="search" placeholder="Tìm trong Bài 1…" /></label>
            <div class="lesson-filter-row" id="koLessonSlideFilters">
              <button class="active" type="button" data-ko-slide-filter="all">Tất cả</button>
              <button type="button" data-ko-slide-filter="vocabulary">Từ vựng</button>
              <button type="button" data-ko-slide-filter="grammar">Ngữ pháp</button>
            </div>
          </div>
          <div class="korean-slide-list" id="koLessonSlideList"></div>
        </section>
      </section>

      <section class="course-view" id="ko-lesson-vocab">
        <div class="section-head">
          <div><p class="eyebrow">Bài 01 · I. Từ vựng</p><h2>${getLessonVocabulary().length} từ và cụm từ theo chủ đề</h2><p class="section-subtitle">Mỗi thẻ có chữ Hàn, phiên âm, nghĩa Việt và nút nghe.</p></div>
          <button class="secondary-button" type="button" data-open-korean-tab="ko-lesson-1"><i data-lucide="book-open-text"></i><span>Xem bài học</span></button>
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
          <div><p class="eyebrow">Bài 01 · II–IV</p><h2>Ngữ pháp và luyện tập</h2><p class="section-subtitle">Học quy tắc, làm bài trực tiếp, nhận phản hồi và lưu tiến độ ngay trên web.</p></div>
          <button class="secondary-button" type="button" data-open-korean-tab="ko-lesson-1"><i data-lucide="arrow-left"></i><span>Về Bài 1</span></button>
        </div>
        <div class="lesson-grammar-grid" id="koLessonGrammar"></div>
        <section class="lesson-family-usage" id="koLessonFamilyUsage"></section>
        <section class="korean-panel lesson-translation-panel">
          <div class="korean-panel-head"><div><span class="section-number">01</span><h3>Luyện dịch mẫu câu “A là B”</h3></div><p>Tự dịch trước, sau đó mở đáp án và nghe câu tiếng Hàn.</p></div>
          <div class="lesson-translation-grid" id="koLessonSentencePractice"></div>
        </section>
        <section class="interactive-practice-panel">
          <div class="korean-panel-head"><div><span class="section-number">02</span><h3>12 bài luyện tập trực quan</h3></div><p>Chọn, ghép, sửa lỗi, nghe, tự tạo câu và nhận phản hồi tức thì.</p></div>
          <div id="koInteractivePractice"></div>
        </section>
      </section>

      <section class="course-view lesson-two-view" id="ko-lesson-2">
        <div class="section-head lesson-two-heading">
          <div>
            <p class="eyebrow">Bài 02 & 2.2 · một lộ trình, không lặp Bài 1</p>
            <h2>${escapeHtml(koreanLessonTwoPdf.title)}</h2>
            <p class="section-subtitle">${escapeHtml(koreanLessonTwoPdf.meaning)} Học theo hai chặng Bài 2 và Bài 2.2, có ghi rõ phần ôn từ Bài 1.</p>
          </div>
          <button class="secondary-button module-complete" type="button" data-complete-module="lesson-2"><i data-lucide="circle-check"></i><span>Đánh dấu đã học</span></button>
        </div>

        <section class="lesson-two-hero">
          <div class="lesson-two-hero-copy">
            <span class="lesson-date-chip"><i data-lucide="book-open-text"></i>28 trang · Bài 2 + Bài 2.2</span>
            <p class="eyebrow">Câu trọng tâm Bài 2</p>
            <h3>${escapeHtml(koreanLessonTwoPdf.title)}</h3>
            <p class="lesson-two-romanization">${escapeHtml(koreanLessonTwoPdf.romanization)}</p>
            <p class="lesson-two-reading">Đọc gần đúng · ${escapeHtml(koreanLessonTwoPdf.reading)}</p>
            <strong>${escapeHtml(koreanLessonTwoPdf.meaning)}</strong>
            <button class="lesson-two-listen" type="button" data-speak-ko="${escapeHtml(koreanLessonTwoPdf.title)}"><i data-lucide="volume-2"></i><span>Nghe cả câu</span></button>
          </div>
          <div class="lesson-two-hero-map" aria-label="Bản đồ nội dung Bài 2">
            <div><span>01</span><b>가족 · 직업</b><small>Gia đình & nghề nghiệp</small></div>
            <i data-lucide="arrow-right"></i>
            <div><span>02</span><b>이에요? · 아니에요</b><small>Hỏi & phủ định</small></div>
            <i data-lucide="arrow-right"></i>
            <div><span>03</span><b>한 명 · 아홉 살</b><small>Đếm người & tuổi</small></div>
          </div>
        </section>

        <nav class="lesson-two-jumpbar" aria-label="Nội dung Bài 2">
          <button type="button" data-scroll-ko2="ko2Slides"><span>01</span>Theo slide</button>
          <button type="button" data-scroll-ko2="ko2Knowledge"><span>02</span>Bài 2 & 2.2</button>
          <button type="button" data-scroll-ko2="ko2Vocabulary"><span>03</span>Từ vựng</button>
          <button type="button" data-scroll-ko2="ko2Numbers"><span>04</span>Số đếm</button>
          <button type="button" data-scroll-ko2="ko2Dialogue"><span>05</span>Hội thoại</button>
          <button type="button" data-scroll-ko2="ko2Workshop"><span>06</span>Luyện tập</button>
        </nav>
        <section class="lesson-two-section lesson-two-slide-section" id="ko2Slides">
          <div class="lesson-two-section-head">
            <div><span class="section-number">01</span><div><p class="eyebrow">28 trang PDF · học theo mạch gốc</p><h3>Theo slide Bài 2</h3></div></div>
            <p>Mỗi trang được chuyển thành thẻ dễ đọc, có phiên âm, nghĩa Việt, nút nghe và ảnh gốc phóng to.</p>
          </div>
          <div class="lesson-two-slide-overview" aria-label="Tổng quan slide Bài 2">
            <span><strong>28</strong> trang gốc</span>
            <span><strong>7</strong> trang từ vựng</span>
            <span><strong>3</strong> trang ngữ pháp</span>
            <span><strong>16</strong> trang luyện tập</span>
          </div>
          <div class="lesson-slide-toolbar">
            <label class="lesson-search-field"><i data-lucide="search"></i><input id="koLessonTwoSlideSearch" type="search" placeholder="Tìm từ, mẫu câu hoặc nội dung slide…" /></label>
            <div class="lesson-filter-row" id="koLessonTwoSlideFilters">
              <button class="active" type="button" data-ko2-slide-filter="all">Tất cả</button>
              <button type="button" data-ko2-slide-filter="intro">Mở bài</button>
              <button type="button" data-ko2-slide-filter="vocabulary">Từ vựng</button>
              <button type="button" data-ko2-slide-filter="grammar">Ngữ pháp</button>
              <button type="button" data-ko2-slide-filter="grammar-practice">Luyện ngữ pháp</button>
              <button type="button" data-ko2-slide-filter="general-practice">Luyện tập chung</button>
            </div>
          </div>
          <div class="korean-slide-list" id="koLessonTwoSlideList"></div>
        </section>
        <section class="lesson-two-section lesson-two-part-section" id="ko2Knowledge">
          <div class="lesson-two-section-head">
            <div><span class="section-number">02</span><div><p class="eyebrow">Cùng một task · hai chặng rõ ràng</p><h3>Bài 2 hay Bài 2.2?</h3></div></div>
            <p>Chuyển chặng để xem kiến thức mới, phần ôn và nhóm từ tương ứng mà không rời khỏi Bài 2.</p>
          </div>
          <div class="lesson-two-part-tabs" id="koLessonTwoPartTabs" role="tablist" aria-label="Chọn phần Bài 2">
            <button class="active" type="button" role="tab" aria-selected="true" data-ko2-part="lesson-2"><span>2</span><strong>Bài 2</strong><small>Hỏi · phủ định · đếm</small></button>
            <button type="button" role="tab" aria-selected="false" data-ko2-part="lesson-2-2"><span>2.2</span><strong>Bài 2.2</strong><small>Phủ định kép · nối ý</small></button>
          </div>
          <div class="lesson-two-part-content" id="koLessonTwoPartContent"></div>
        </section>

        <section class="lesson-two-section" id="ko2Possession">
          <div class="lesson-two-section-head">
            <div><span class="section-number">03</span><div><p class="eyebrow">Ôn từ ghi chú 12/08</p><h3>제 hay 우리?</h3></div></div>
            <p>Chạm vào từng cụm để quan sát cách người Hàn chọn từ sở hữu.</p>
          </div>
          <div class="possession-lab">
            <div class="possession-choice-list" id="koLessonTwoPossessionChoices"></div>
            <div class="possession-result" id="koLessonTwoPossessionResult"></div>
          </div>
          <div class="lesson-two-culture-note">
            <span><i data-lucide="sparkles"></i></span>
            <div><strong>Điểm văn hóa cần nhớ</strong><p><b>우리</b> không chỉ là “của chúng tôi”. Khi nói về mẹ, bố, nhà, đất nước hoặc người thân, người Hàn thường dùng 우리 với ý “của tôi” để thể hiện sự gắn kết.</p></div>
          </div>
        </section>

        <section class="lesson-two-section lesson-two-pattern-section">
          <div class="lesson-two-section-head">
            <div><span class="section-number">04</span><div><p class="eyebrow">${getLessonTwoPatterns().length} mảnh ghép</p><h3>Ngữ pháp Bài 2 & 2.2</h3></div></div>
            <p>Ví dụ nào cũng có phiên âm, cách đọc gần đúng và nút nghe.</p>
          </div>
          <div class="lesson-two-pattern-grid" id="koLessonTwoPatterns"></div>
        </section>

        <section class="lesson-two-section sentence-anatomy-section" id="ko2Anatomy">
          <div class="lesson-two-section-head">
            <div><span class="section-number">05</span><div><p class="eyebrow">Ôn câu ngày 12/08</p><h3>Mổ xẻ cấu trúc câu</h3></div></div>
            <button class="lesson-two-listen compact" type="button" data-speak-ko="${escapeHtml(koreanLessonTwo.sentence.text)}"><i data-lucide="volume-2"></i><span>Nghe câu</span></button>
          </div>
          <div class="sentence-anatomy" id="koLessonTwoAnatomy"></div>
          <div class="liaison-note"><span>ㅁ</span><div><strong>Nối âm: 사람 + 이에요 → 사람이에요</strong><p>${escapeHtml(koreanLessonTwo.sentence.pronunciation)}</p></div></div>
        </section>

        <section class="lesson-two-section" id="ko2Vocabulary">
          <div class="lesson-two-section-head">
            <div><span class="section-number">06</span><div><p class="eyebrow">Chỉ tính kiến thức mới</p><h3>${getLessonTwoVocabulary().length} từ và cụm từ của Bài 2 & 2.2</h3></div></div>
            <p>Từ đã có ở Bài 1 được loại khỏi kho này và chỉ hiện trong hộp ôn tập có nhãn nguồn.</p>
          </div>
          <div class="lesson-two-vocab-toolbar">
            <label class="lesson-search-field"><i data-lucide="search"></i><input id="koLessonTwoVocabSearch" type="search" placeholder="Tìm chữ Hàn, phiên âm hoặc nghĩa…" /></label>
            <div class="lesson-two-vocab-filters" id="koLessonTwoVocabFilters"></div>
          </div>
          <div class="lesson-two-vocab-grid" id="koLessonTwoVocabulary"></div>
          <p class="lesson-two-vocab-count" id="koLessonTwoVocabCount"></p>
        </section>

        <section class="lesson-two-section native-number-section" id="ko2Numbers">
          <div class="lesson-two-section-head">
            <div><span class="section-number">07</span><div><p class="eyebrow">Số thuần Hàn</p><h3>Đếm người và nói tuổi</h3></div></div>
            <p>Chạm vào một số rồi đổi giữa đơn vị 명 và 살 để thấy dạng đúng.</p>
          </div>
          <div class="native-number-lab">
            <div class="native-number-board" id="koLessonTwoNumberButtons"></div>
            <div class="native-counter-stage">
              <p class="eyebrow">Phòng ghép số</p>
              <div class="native-counter-switch" id="koLessonTwoCounterSwitch">
                <button class="active" type="button" data-ko2-counter="명"><strong>명</strong><span>đếm người</span></button>
                <button type="button" data-ko2-counter="살"><strong>살</strong><span>nói tuổi</span></button>
              </div>
              <div class="native-number-result" id="koLessonTwoNumberResult"></div>
            </div>
          </div>
          <div class="native-number-rule"><i data-lucide="lightbulb"></i><p><strong>Nhớ bốn biến đổi:</strong> 하나 → 한, 둘 → 두, 셋 → 세, 넷 → 네 trước danh từ đơn vị.</p></div>
        </section>

        <section class="lesson-two-section lesson-two-dialogue-section" id="ko2Dialogue">
          <div class="lesson-two-section-head">
            <div><span class="section-number">08</span><div><p class="eyebrow">Hội thoại trang 34–35</p><h3>${escapeHtml(koreanLessonTwoPdf.dialogue.title)}</h3></div></div>
            <p>${escapeHtml(koreanLessonTwoPdf.dialogue.meaning)}</p>
          </div>
          <div class="dialogue-fact-strip">
            <div><strong>네 명</strong><span>gia đình 4 người</span></div>
            <div><strong>아홉 살</strong><span>Daniel 9 tuổi</span></div>
            <div><strong>간호사</strong><span>mẹ là y tá</span></div>
            <div><strong>초등학생</strong><span>chị gái học tiểu học</span></div>
          </div>
          <div class="lesson-two-dialogue" id="koLessonTwoDialogue"></div>
        </section>
        <section class="lesson-two-section" id="ko2Workshop">
          <div class="lesson-two-section-head">
            <div><span class="section-number">09</span><div><p class="eyebrow">Xưởng ghép câu</p><h3>Chọn ý tiếng Việt, nhìn câu tự lắp ghép</h3></div></div>
            <p>Mỗi màu đại diện cho một vai trò trong câu.</p>
          </div>
          <div class="scenario-workshop">
            <div class="scenario-list" id="koLessonTwoScenarioList"></div>
            <div class="scenario-stage" id="koLessonTwoScenario"></div>
          </div>
        </section>

        <section class="lesson-two-section lesson-two-practice" id="ko2Practice">
          <div class="lesson-two-section-head">
            <div><span class="section-number">10</span><div><p class="eyebrow">Luyện ngay</p><h3>Tự kiểm tra trong phạm vi đã học</h3></div></div>
            <div class="lesson-two-score" id="koLessonTwoScore">0 đúng · 0 câu</div>
          </div>
          <div class="lesson-two-quiz-card">
            <p class="lesson-two-question-number" id="koLessonTwoQuestionNumber"></p>
            <h4 id="koLessonTwoQuestion"></h4>
            <div class="lesson-two-options" id="koLessonTwoOptions"></div>
            <div class="lesson-two-feedback" id="koLessonTwoFeedback" aria-live="polite"></div>
            <button class="primary-button" type="button" id="koLessonTwoNext"><i data-lucide="arrow-right"></i><span>Câu tiếp</span></button>
          </div>
        </section>
      </section>
      <dialog class="korean-slide-dialog" id="koSlideDialog">
        <div class="slide-dialog-head"><strong id="koSlideDialogTitle">Bài 1</strong><button type="button" data-close-ko-slide aria-label="Đóng"><i data-lucide="x"></i></button></div>
        <img id="koSlideDialogImage" alt="Bản xem trước slide tiếng Hàn" />
      </dialog>
    </main>
  `;

  if (koreanApp && koreanData && koreanLessonOne && koreanLessonTwo && koreanLessonTwoPdf && koreanLessonTwoExtension && koreanLessonTwoSlides) {
    koreanApp.innerHTML = koreanMarkup;
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>'"]/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    })[character]);
  }

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
  let koreanLessonTwoSlideFilter = "all";
  let koreanLessonTwoPart = "lesson-2";
  let koreanVocabularyFilter = "all";
  let koreanLessonTwoVocabularyFilter = "all";
  let koreanLessonTwoPossessionIndex = 0;
  let koreanLessonTwoScenarioIndex = 0;
  let koreanLessonTwoPracticeIndex = 0;
  let koreanLessonTwoPracticeAnswered = false;
  let koreanLessonTwoPracticeCorrect = 0;
  let koreanLessonTwoPracticeTotal = 0;
  let koreanLessonTwoNumberIndex = 0;
  let koreanLessonTwoCounter = "명";

  function normalizeCourseSearch(value) {
    return String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function getLessonVocabulary() {
    return koreanLessonOne.vocabularyGroups.flatMap((group) => group.words.map((word) => ({ ...word, groupId: group.id, groupTitle: group.title })));
  }

  function getLessonTwoVocabularyGroups() {
    const lessonOneTerms = new Set(getLessonVocabulary().map((word) => word.text.replace(/[.?!]$/g, "").trim()));
    const seen = new Set();
    return [
      ...koreanLessonTwo.vocabularyGroups,
      ...koreanLessonTwoPdf.vocabularyGroups,
      ...koreanLessonTwoExtension.vocabularyGroups,
    ].map((group) => ({
      ...group,
      words: group.words.filter((word) => {
        const term = word.text.replace(/[.?!]$/g, "").trim();
        if (lessonOneTerms.has(term) || seen.has(term)) return false;
        seen.add(term);
        return true;
      }),
    })).filter((group) => group.words.length);
  }

  function getLessonTwoVocabulary() {
    return getLessonTwoVocabularyGroups().flatMap((group) => group.words.map((word) => ({ ...word, groupId: group.id, groupTitle: group.title })));
  }

  function getLessonTwoPatterns() {
    return [...koreanLessonTwo.patterns, ...koreanLessonTwoPdf.patterns, ...koreanLessonTwoExtension.patterns];
  }

  function getLessonTwoScenarios() {
    return [...koreanLessonTwo.scenarios, ...koreanLessonTwoPdf.scenarios];
  }

  function getLessonTwoPractice() {
    return [...koreanLessonTwo.practice, ...koreanLessonTwoPdf.practice];
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
      const isFoundation = ["intro", "vocabulary", "grammar"].includes(slide.section);
      const bySection = koreanSlideFilter === "all" || slide.section === koreanSlideFilter;
      const content = normalizeCourseSearch([slide.title, slide.summary, ...slide.lines].join(" "));
      return isFoundation && bySection && (!query || content.includes(query));
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
  function getLessonTwoAnnotatedItems() {
    return [
      ...getLessonTwoVocabulary(),
      ...getLessonVocabulary(),
      ...getLessonTwoPatterns().flatMap((pattern) => pattern.examples || []),
      ...(koreanLessonTwoPdf.dialogue?.lines || []),
    ];
  }

  function renderKoreanLessonTwoLine(line) {
    const [head, ...meaningParts] = String(line).split(" · ");
    const cleanHead = head.replace(/[.?!]$/g, "");
    const lookup = getLessonTwoAnnotatedItems().find((item) => item.text?.replace(/[.?!]$/g, "") === cleanHead);
    const startsWithHangul = /^\s*[\uac00-\ud7af]/.test(head);
    if (!startsWithHangul) {
      return '<p class="lesson-slide-line plain"><i data-lucide="check"></i><span>' + escapeHtml(line) + '</span></p>';
    }
    const meaning = meaningParts.join(" · ") || lookup?.meaning || "";
    const reading = lookup
      ? lookup.romanization + (lookup.reading ? " · " + lookup.reading : "")
      : "Nhấn để nghe";
    return [
      '<div class="lesson-slide-line annotated">',
      '<button type="button" data-speak-ko="' + escapeHtml(head) + '">',
      '<b>' + escapeHtml(head) + '</b>',
      '<span>' + escapeHtml(reading) + '</span>',
      '<i data-lucide="volume-2"></i>',
      '</button>',
      meaning ? '<small>' + escapeHtml(meaning) + '</small>' : "",
      '</div>',
    ].join("");
  }

  function renderLessonTwoSlides() {
    const query = normalizeCourseSearch(koreanApp.querySelector("#koLessonTwoSlideSearch")?.value);
    const slides = koreanLessonTwoSlides.filter((slide) => {
      const bySection = koreanLessonTwoSlideFilter === "all" || slide.section === koreanLessonTwoSlideFilter;
      const content = normalizeCourseSearch([slide.title, slide.summary, ...slide.lines].join(" "));
      return bySection && (!query || content.includes(query));
    });
    const container = koreanApp.querySelector("#koLessonTwoSlideList");
    container.innerHTML = slides.length ? slides.map((slide) => [
      '<article class="korean-lesson-slide-card lesson-two-slide-card">',
      '<button class="lesson-slide-preview" type="button" data-open-ko-slide="' + escapeHtml(slide.image) + '" data-ko-slide-title="Bài 2 · Trang ' + slide.index + ' · ' + escapeHtml(slide.title) + '">',
      '<img src="' + escapeHtml(slide.image) + '" alt="Bản xem trước Bài 2 trang ' + slide.index + ': ' + escapeHtml(slide.title) + '" loading="lazy" />',
      '<span><i data-lucide="maximize-2"></i>Mở trang gốc</span>',
      '</button>',
      '<div class="lesson-slide-content">',
      '<div class="lesson-slide-meta"><span>Trang ' + slide.index + '/28</span><em>' + escapeHtml(koreanSlideSectionLabels[slide.section]) + '</em></div>',
      '<h3>' + escapeHtml(slide.title) + '</h3>',
      '<p class="lesson-slide-summary">' + escapeHtml(slide.summary) + '</p>',
      '<div class="lesson-slide-lines">' + slide.lines.slice(0, 5).map(renderKoreanLessonTwoLine).join("") + '</div>',
      '</div>',
      '</article>',
    ].join("")).join("") : '<div class="empty-state">Không có slide phù hợp với bộ lọc.</div>';
    refreshCourseIcons();
  }
  function renderLessonTwoPart() {
    const part = koreanLessonTwoExtension.parts.find((item) => item.id === koreanLessonTwoPart) || koreanLessonTwoExtension.parts[0];
    const patterns = getLessonTwoPatterns().filter((pattern) => part.patternNumbers.includes(pattern.number));
    const groups = getLessonTwoVocabularyGroups().filter((group) => part.vocabularyGroupIds.includes(group.id));
    const newWordCount = groups.reduce((total, group) => total + group.words.length, 0);
    koreanApp.querySelectorAll("[data-ko2-part]").forEach((button) => {
      const active = button.dataset.ko2Part === part.id;
      button.classList.toggle("active", active);
      button.setAttribute("aria-selected", String(active));
    });
    const patternHtml = patterns.map((pattern) => [
      '<article class="lesson-two-part-pattern">',
      '<div><span>' + escapeHtml(pattern.number) + '</span><small>' + escapeHtml(pattern.source || part.label) + '</small></div>',
      '<h5>' + escapeHtml(pattern.formula) + '</h5>',
      '<p>' + escapeHtml(pattern.explanation) + '</p>',
      pattern.examples?.[0] ? '<button type="button" data-speak-ko="' + escapeHtml(pattern.examples[0].text) + '"><i data-lucide="volume-2"></i><span>' + escapeHtml(pattern.examples[0].text) + '</span></button>' : "",
      '</article>',
    ].join("")).join("");
    const groupHtml = groups.map((group) => [
      '<button class="lesson-two-part-group" type="button" data-ko2-vocab-jump="' + escapeHtml(group.id) + '">',
      '<span><i data-lucide="' + escapeHtml(group.icon || "tag") + '"></i></span>',
      '<div><small>' + escapeHtml(group.origin || part.label) + '</small><strong>' + escapeHtml(group.title.replace(/ · .+$/, "")) + '</strong><em>' + group.words.length + ' mục mới</em></div>',
      '<i data-lucide="arrow-down-right"></i>',
      '</button>',
    ].join("")).join("");
    const reviewHtml = part.reviewGroups.map((review) => [
      '<section class="lesson-two-review-group">',
      '<div><span><i data-lucide="history"></i></span><div><strong>' + escapeHtml(review.source) + '</strong><small>Chỉ nhắc lại để hiểu ví dụ, không tính vào kho từ mới.</small></div></div>',
      '<div class="lesson-two-review-chips">',
      review.terms.map((term) => '<span>' + escapeHtml(term) + '</span>').join(""),
      '</div>',
      '</section>',
    ].join("")).join("");
    koreanApp.querySelector("#koLessonTwoPartContent").innerHTML = [
      '<div class="lesson-two-part-intro">',
      '<div><span class="lesson-two-part-badge">' + escapeHtml(part.label) + '</span><h4>' + escapeHtml(part.title) + '</h4><p>' + escapeHtml(part.description) + '</p></div>',
      '<div class="lesson-two-part-stats"><span><strong>' + patterns.length + '</strong> công thức</span><span><strong>' + newWordCount + '</strong> mục mới</span></div>',
      '</div>',
      '<div class="lesson-two-dedupe-note"><i data-lucide="badge-check"></i><p><strong>Đã tách khỏi Bài 1</strong><span>' + escapeHtml(koreanLessonTwoExtension.dedupeNote) + '</span></p></div>',
      '<div class="lesson-two-part-grid">',
      '<section><div class="lesson-two-mini-heading"><span>Ngữ pháp trọng tâm</span><small>Nhấn câu mẫu để nghe</small></div><div class="lesson-two-part-patterns">' + patternHtml + '</div></section>',
      '<section><div class="lesson-two-mini-heading"><span>Nhóm từ mới</span><small>Chạm để mở đúng bộ lọc</small></div><div class="lesson-two-part-groups">' + groupHtml + '</div></section>',
      '</div>',
      '<div class="lesson-two-review-list">' + reviewHtml + '</div>',
    ].join("");
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

  function renderLessonFamilyUsage() {
    const usage = koreanLessonOne.familyUsage;
    if (!usage) return;
    koreanApp.querySelector("#koLessonFamilyUsage").innerHTML = `
      <div class="family-usage-head"><span><i data-lucide="heart-handshake"></i></span><div><p class="eyebrow">Ghi chú sử dụng</p><h3>${escapeHtml(usage.title)}</h3><p>${escapeHtml(usage.intro)}</p></div></div>
      <div class="family-usage-grid">
        ${usage.items.map((item) => `<article><span>${escapeHtml(item.label)}</span><strong>${escapeHtml(item.terms)}</strong><p>${escapeHtml(item.detail)}</p><small>${escapeHtml(item.example)}</small></article>`).join("")}
      </div>
      <div class="family-usage-note"><i data-lucide="lightbulb"></i><p>${escapeHtml(usage.note)}</p></div>
    `;
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
          ${item.alternatives?.length ? `<div class="translation-alternatives"><b>Cách nói khác</b>${item.alternatives.map((alternative) => `<article><div><strong>${escapeHtml(alternative.text)}</strong><button type="button" data-speak-ko="${escapeHtml(alternative.text)}" aria-label="Nghe ${escapeHtml(alternative.text)}"><i data-lucide="volume-2"></i></button></div><span>${escapeHtml(alternative.romanization)}</span><small>Đọc gần đúng: ${escapeHtml(alternative.reading)}</small>${alternative.note ? `<p>${escapeHtml(alternative.note)}</p>` : ""}</article>`).join("")}</div>` : ""}
        </div>
      </article>
    `).join("");
  }

  function renderLessonTwoPossessionLab() {
    const examples = koreanLessonTwo.patterns[0].examples;
    const current = examples[koreanLessonTwoPossessionIndex] || examples[0];
    koreanApp.querySelector("#koLessonTwoPossessionChoices").innerHTML = examples.map((item, index) => `
      <button class="${index === koreanLessonTwoPossessionIndex ? "active" : ""}" type="button" data-ko2-possession="${index}">
        <strong>${escapeHtml(item.text)}</strong><span>${escapeHtml(item.meaning)}</span>
      </button>
    `).join("");
    const usesUri = current.text.startsWith("우리");
    koreanApp.querySelector("#koLessonTwoPossessionResult").innerHTML = `
      <span class="possession-owner ${usesUri ? "uri" : "je"}">${escapeHtml(current.text.split(" ")[0])}</span>
      <span class="possession-plus">+</span>
      <span class="possession-noun">${escapeHtml(current.text.split(" ").slice(1).join(" "))}</span>
      <button type="button" data-speak-ko="${escapeHtml(current.text)}" aria-label="Nghe ${escapeHtml(current.text)}"><i data-lucide="volume-2"></i></button>
      <div><strong>${escapeHtml(current.text)}</strong><p>${escapeHtml(current.romanization)} · ${escapeHtml(current.reading)}</p><small>${escapeHtml(current.meaning)}</small></div>
      <em>${usesUri ? "우리 · gắn kết, thân thuộc" : "제 · sở hữu cá nhân"}</em>
    `;
    refreshCourseIcons();
  }

  function renderLessonTwoPatterns() {
    koreanApp.querySelector("#koLessonTwoPatterns").innerHTML = getLessonTwoPatterns().map((pattern) => `
      <article class="lesson-two-pattern-card">
        <div class="lesson-two-pattern-top"><span>${escapeHtml(pattern.number)}</span><small>${escapeHtml([pattern.source, pattern.title].filter(Boolean).join(" · "))}</small></div>
        <h4>${escapeHtml(pattern.formula)}</h4>
        <p>${escapeHtml(pattern.explanation)}</p>
        <div class="lesson-two-pattern-examples">
          ${pattern.examples.map((example) => `
            <button type="button" data-speak-ko="${escapeHtml(example.text)}">
              <span><strong>${escapeHtml(example.text)}</strong><small>${escapeHtml(example.meaning)}</small></span>
              <em>${escapeHtml(example.romanization)} · ${escapeHtml(example.reading)}</em>
              <i data-lucide="volume-2"></i>
            </button>
          `).join("")}
        </div>
      </article>
    `).join("");
  }

  function renderLessonTwoAnatomy() {
    koreanApp.querySelector("#koLessonTwoAnatomy").innerHTML = koreanLessonTwo.anatomy.map((part, index) => `
      <div class="sentence-part ${escapeHtml(part.tone)}">
        <span class="sentence-part-number">${String(index + 1).padStart(2, "0")}</span>
        <button type="button" data-speak-ko="${escapeHtml(part.text)}"><strong>${escapeHtml(part.text)}</strong><i data-lucide="volume-2"></i></button>
        <b>${escapeHtml(part.role)}</b>
        <small>${escapeHtml(part.note)}</small>
      </div>
      ${index < koreanLessonTwo.anatomy.length - 1 ? '<i class="sentence-part-arrow" data-lucide="chevron-right"></i>' : ""}
    `).join("");
  }

  function renderLessonTwoVocabularyFilters() {
    const filters = [{ id: "all", title: "Tất cả", icon: "library-big" }, ...getLessonTwoVocabularyGroups()];
    koreanApp.querySelector("#koLessonTwoVocabFilters").innerHTML = filters.map((filter) => `
      <button class="${filter.id === koreanLessonTwoVocabularyFilter ? "active" : ""}" type="button" data-ko2-vocab-filter="${escapeHtml(filter.id)}">
        <i data-lucide="${escapeHtml(filter.icon || "tag")}"></i><span>${escapeHtml(filter.title)}</span>
      </button>
    `).join("");
  }

  function renderLessonTwoVocabulary() {
    const query = normalizeCourseSearch(koreanApp.querySelector("#koLessonTwoVocabSearch")?.value);
    const words = getLessonTwoVocabulary().filter((word) => {
      const matchesGroup = koreanLessonTwoVocabularyFilter === "all" || word.groupId === koreanLessonTwoVocabularyFilter;
      const haystack = normalizeCourseSearch(`${word.text} ${word.romanization} ${word.reading} ${word.meaning} ${word.note || ""}`);
      return matchesGroup && (!query || haystack.includes(query));
    });
    koreanApp.querySelector("#koLessonTwoVocabulary").innerHTML = words.length ? words.map((word) => `
      <article class="lesson-two-vocab-card">
        <button class="lesson-two-vocab-sound" type="button" data-speak-ko="${escapeHtml(word.text)}" aria-label="Nghe ${escapeHtml(word.text)}"><i data-lucide="volume-2"></i></button>
        <span class="lesson-two-vocab-group">${escapeHtml(word.groupTitle)}</span>
        <strong>${escapeHtml(word.text)}</strong>
        <p>${escapeHtml(word.romanization)}</p>
        <div><small>Đọc gần đúng</small><b>${escapeHtml(word.reading)}</b></div>
        <em>${escapeHtml(word.meaning)}</em>
        ${word.note ? `<span class="lesson-two-word-note">${escapeHtml(word.note)}</span>` : ""}
      </article>
    `).join("") : '<div class="empty-state">Không có từ phù hợp với bộ lọc.</div>';
    koreanApp.querySelector("#koLessonTwoVocabCount").textContent = `Đang hiển thị ${words.length}/${getLessonTwoVocabulary().length} từ và cụm từ.`;
    refreshCourseIcons();
  }

  function renderLessonTwoNumberLab() {
    const numbers = koreanLessonTwoPdf.numberForms;
    const current = numbers[koreanLessonTwoNumberIndex] || numbers[0];
    koreanApp.querySelector("#koLessonTwoNumberButtons").innerHTML = numbers.map((item, index) => `
      <button class="${index === koreanLessonTwoNumberIndex ? "active" : ""}" type="button" data-ko2-number="${index}">
        <span>${item.value}</span><strong>${escapeHtml(item.base)}</strong><small>${escapeHtml(item.reading.split(" → ")[0])}</small>
      </button>
    `).join("");
    koreanApp.querySelectorAll("[data-ko2-counter]").forEach((button) => {
      button.classList.toggle("active", button.dataset.ko2Counter === koreanLessonTwoCounter);
    });
    const unitMeaning = koreanLessonTwoCounter === "명" ? "người" : "tuổi";
    const unitReading = koreanLessonTwoCounter === "명" ? "myơng" : "sal";
    const phrase = `${current.beforeCounter} ${koreanLessonTwoCounter}`;
    koreanApp.querySelector("#koLessonTwoNumberResult").innerHTML = `
      <div class="number-transform"><span>${escapeHtml(current.base)}</span><i data-lucide="arrow-right"></i><strong>${escapeHtml(current.beforeCounter)}</strong><b>+ ${escapeHtml(koreanLessonTwoCounter)}</b></div>
      <button type="button" data-speak-ko="${escapeHtml(phrase)}"><i data-lucide="volume-2"></i><span>Nghe</span></button>
      <h4>${escapeHtml(phrase)}</h4>
      <p>${escapeHtml(current.romanization)} + ${escapeHtml(koreanLessonTwoCounter === "명" ? "myeong" : "sal")}</p>
      <small>Đọc gần đúng · ${escapeHtml(current.reading.split(" → ").pop())} ${unitReading}</small>
      <em>${current.value} ${unitMeaning}</em>
    `;
    refreshCourseIcons();
  }

  function renderLessonTwoDialogue() {
    koreanApp.querySelector("#koLessonTwoDialogue").innerHTML = koreanLessonTwoPdf.dialogue.lines.map((line, index) => `
      <article class="dialogue-line ${line.speaker === "Daniel" ? "daniel" : "friend"}">
        <span class="dialogue-speaker">${escapeHtml(line.speaker)}</span>
        <div>
          <div class="dialogue-korean"><strong>${escapeHtml(line.text)}</strong><button type="button" data-speak-ko="${escapeHtml(line.text)}" aria-label="Nghe câu của ${escapeHtml(line.speaker)}"><i data-lucide="volume-2"></i></button></div>
          <p>${escapeHtml(line.romanization)}</p>
          <small>Đọc gần đúng · ${escapeHtml(line.reading)}</small>
          <em>${escapeHtml(line.meaning)}</em>
        </div>
        <b>${String(index + 1).padStart(2, "0")}</b>
      </article>
    `).join("");
    refreshCourseIcons();
  }
  function renderLessonTwoScenarios() {
    const scenarios = getLessonTwoScenarios();
    koreanApp.querySelector("#koLessonTwoScenarioList").innerHTML = scenarios.map((scenario, index) => `
      <button class="${index === koreanLessonTwoScenarioIndex ? "active" : ""}" type="button" data-ko2-scenario="${index}">
        <span>${String(index + 1).padStart(2, "0")}</span><strong>${escapeHtml(scenario.prompt)}</strong><i data-lucide="arrow-right"></i>
      </button>
    `).join("");
    const scenario = scenarios[koreanLessonTwoScenarioIndex];
    koreanApp.querySelector("#koLessonTwoScenario").innerHTML = `
      <p class="eyebrow">Câu ${String(koreanLessonTwoScenarioIndex + 1).padStart(2, "0")}</p>
      <h4>${escapeHtml(scenario.prompt)}</h4>
      <div class="scenario-chunks">
        ${scenario.chunks.map((chunk, index) => `<span class="chunk-${index % 4}">${escapeHtml(chunk)}</span>`).join('<i data-lucide="plus"></i>')}
      </div>
      <div class="scenario-full-sentence"><strong>${escapeHtml(scenario.text)}</strong><button type="button" data-speak-ko="${escapeHtml(scenario.text)}"><i data-lucide="volume-2"></i><span>Nghe</span></button></div>
      <p>${escapeHtml(scenario.romanization)}</p>
      <small>Đọc gần đúng · ${escapeHtml(scenario.reading)}</small>
    `;
    refreshCourseIcons();
  }

  function renderLessonTwoPractice() {
    const practice = getLessonTwoPractice();
    const question = practice[koreanLessonTwoPracticeIndex];
    koreanApp.querySelector("#koLessonTwoQuestionNumber").textContent = `Câu ${String(koreanLessonTwoPracticeIndex + 1).padStart(2, "0")} / ${String(practice.length).padStart(2, "0")}`;
    koreanApp.querySelector("#koLessonTwoQuestion").textContent = question.prompt;
    koreanApp.querySelector("#koLessonTwoOptions").innerHTML = question.options.map((option, index) => `
      <button type="button" data-ko2-answer="${escapeHtml(option)}"><span>${String.fromCharCode(65 + index)}</span><strong>${escapeHtml(option)}</strong></button>
    `).join("");
    koreanApp.querySelector("#koLessonTwoFeedback").innerHTML = '<span><i data-lucide="lightbulb"></i></span><p>Chọn một đáp án để xem giải thích.</p>';
    koreanApp.querySelector("#koLessonTwoFeedback").className = "lesson-two-feedback";
    koreanApp.querySelector("#koLessonTwoNext").disabled = true;
    koreanApp.querySelector("#koLessonTwoScore").textContent = `${koreanLessonTwoPracticeCorrect} đúng · ${koreanLessonTwoPracticeTotal} câu`;
    refreshCourseIcons();
  }

  function chooseLessonTwoAnswer(answer) {
    if (koreanLessonTwoPracticeAnswered) return;
    koreanLessonTwoPracticeAnswered = true;
    koreanLessonTwoPracticeTotal += 1;
    const question = getLessonTwoPractice()[koreanLessonTwoPracticeIndex];
    const isCorrect = answer === question.answer;
    if (isCorrect) koreanLessonTwoPracticeCorrect += 1;
    koreanApp.querySelectorAll("[data-ko2-answer]").forEach((button) => {
      button.disabled = true;
      if (button.dataset.ko2Answer === question.answer) button.classList.add("correct");
      else if (button.dataset.ko2Answer === answer) button.classList.add("incorrect");
    });
    const feedback = koreanApp.querySelector("#koLessonTwoFeedback");
    feedback.className = `lesson-two-feedback ${isCorrect ? "correct" : "incorrect"}`;
    feedback.innerHTML = `<span><i data-lucide="${isCorrect ? "circle-check-big" : "circle-x"}"></i></span><p><strong>${isCorrect ? "Chính xác!" : `Đáp án đúng: ${escapeHtml(question.answer)}`}</strong>${escapeHtml(question.explanation)}</p>`;
    koreanApp.querySelector("#koLessonTwoScore").textContent = `${koreanLessonTwoPracticeCorrect} đúng · ${koreanLessonTwoPracticeTotal} câu`;
    koreanApp.querySelector("#koLessonTwoNext").disabled = false;
    refreshCourseIcons();
  }

  function nextLessonTwoQuestion() {
    koreanLessonTwoPracticeIndex = (koreanLessonTwoPracticeIndex + 1) % getLessonTwoPractice().length;
    koreanLessonTwoPracticeAnswered = false;
    renderLessonTwoPractice();
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
    const validIds = new Set([...koreanData.modules.map((module) => module.id), "lesson-1", "lesson-2"]);
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
    koreanApp.querySelector("#koStatCompleted").textContent = `${completedModules.size}/6`;
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
    koreanApp.querySelector("#koLessonTwoSlideSearch").addEventListener("input", renderLessonTwoSlides);
    koreanApp.querySelector("#koLessonVocabSearch").addEventListener("input", renderLessonVocabulary);
    koreanApp.querySelector("#koLessonTwoVocabSearch").addEventListener("input", renderLessonTwoVocabulary);
    koreanApp.querySelector("#koLessonTwoNext").addEventListener("click", nextLessonTwoQuestion);
    koreanApp.querySelector("#koSlideDialog").addEventListener("click", (event) => {
      if (event.target === event.currentTarget) closeKoreanSlide();
    });
    koreanApp.addEventListener("click", (event) => {
      const openButton = event.target.closest("[data-open-korean-tab]");
      if (openButton) activateKoreanTab(openButton.dataset.openKoreanTab);
      const lessonTwoJump = event.target.closest("[data-scroll-ko2]");
      if (lessonTwoJump) koreanApp.querySelector(`#${lessonTwoJump.dataset.scrollKo2}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
      const lessonTwoPartButton = event.target.closest("[data-ko2-part]");
      if (lessonTwoPartButton) {
        koreanLessonTwoPart = lessonTwoPartButton.dataset.ko2Part;
        renderLessonTwoPart();
      }
      const lessonTwoVocabularyJump = event.target.closest("[data-ko2-vocab-jump]");
      if (lessonTwoVocabularyJump) {
        koreanLessonTwoVocabularyFilter = lessonTwoVocabularyJump.dataset.ko2VocabJump;
        renderLessonTwoVocabularyFilters();
        renderLessonTwoVocabulary();
        koreanApp.querySelector("#ko2Vocabulary")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      const possessionButton = event.target.closest("[data-ko2-possession]");
      if (possessionButton) {
        koreanLessonTwoPossessionIndex = Number(possessionButton.dataset.ko2Possession);
        renderLessonTwoPossessionLab();
      }
      const lessonTwoNumber = event.target.closest("[data-ko2-number]");
      if (lessonTwoNumber) {
        koreanLessonTwoNumberIndex = Number(lessonTwoNumber.dataset.ko2Number);
        renderLessonTwoNumberLab();
      }
      const lessonTwoCounter = event.target.closest("[data-ko2-counter]");
      if (lessonTwoCounter) {
        koreanLessonTwoCounter = lessonTwoCounter.dataset.ko2Counter;
        renderLessonTwoNumberLab();
      }
      const lessonTwoFilter = event.target.closest("[data-ko2-vocab-filter]");
      if (lessonTwoFilter) {
        koreanLessonTwoVocabularyFilter = lessonTwoFilter.dataset.ko2VocabFilter;
        renderLessonTwoVocabularyFilters();
        renderLessonTwoVocabulary();
      }
      const lessonTwoScenario = event.target.closest("[data-ko2-scenario]");
      if (lessonTwoScenario) {
        koreanLessonTwoScenarioIndex = Number(lessonTwoScenario.dataset.ko2Scenario);
        renderLessonTwoScenarios();
      }
      const lessonTwoAnswer = event.target.closest("[data-ko2-answer]");
      if (lessonTwoAnswer) chooseLessonTwoAnswer(lessonTwoAnswer.dataset.ko2Answer);
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
      const lessonTwoSlideFilterButton = event.target.closest("[data-ko2-slide-filter]");
      if (lessonTwoSlideFilterButton) {
        koreanLessonTwoSlideFilter = lessonTwoSlideFilterButton.dataset.ko2SlideFilter;
        koreanApp.querySelectorAll("[data-ko2-slide-filter]").forEach((button) => button.classList.toggle("active", button === lessonTwoSlideFilterButton));
        renderLessonTwoSlides();
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
    if (!languageGate || !koreanApp || !koreanData || !koreanLessonOne || !koreanLessonTwo || !koreanLessonTwoPdf || !koreanLessonTwoExtension || !koreanLessonTwoSlides) return;
    renderModules();
    renderAlphabet();
    fillComposer();
    renderComposeExamples();
    renderBatchim();
    renderPitchRules();
    renderReadingWords();
    renderLessonOutcomes();
    renderLessonSlides();
    renderLessonTwoSlides();
    renderLessonTwoPart();
    renderLessonReadingGuide();
    renderLessonVocabulary();
    renderLessonGrammar();
    renderLessonFamilyUsage();
    renderLessonSentencePractice();
    renderLessonTwoPossessionLab();
    renderLessonTwoPatterns();
    renderLessonTwoAnatomy();
    renderLessonTwoVocabularyFilters();
    renderLessonTwoVocabulary();
    renderLessonTwoNumberLab();
    renderLessonTwoDialogue();
    renderLessonTwoScenarios();
    renderLessonTwoPractice();
    nextKoreanQuestion();
    updateCompletedUI();
    bindLanguageEvents();
    bindKoreanEvents();
    showLanguageGate();
    refreshCourseIcons();
  }

  initialize();
})();
