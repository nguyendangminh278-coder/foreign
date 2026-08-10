(() => {
  const root = document.querySelector("#koInteractivePractice");
  const config = window.KOREAN_LESSON_ONE?.interactivePractice;
  if (!root || !config?.modules?.length) return;

  const STORAGE_KEY = "hanReview.korean.lesson1.interactive.v1";
  const modules = config.modules;
  const moduleMap = new Map(modules.map((module) => [module.id, module]));

  function freshState() {
    return { active: modules[0].id, answers: {}, last: {}, best: {}, builders: {}, completed: {} };
  }

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (!saved || typeof saved !== "object") return freshState();
      return {
        ...freshState(),
        ...saved,
        active: moduleMap.has(saved.active) ? saved.active : modules[0].id,
        answers: saved.answers || {},
        last: saved.last || {},
        best: saved.best || {},
        builders: saved.builders || {},
        completed: saved.completed || {},
      };
    } catch {
      return freshState();
    }
  }

  let state = loadState();

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Chế độ riêng tư có thể chặn localStorage; bài tập vẫn hoạt động trong phiên hiện tại.
    }
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"]/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
    })[character]);
  }

  function speakKorean(text) {
    if (!text || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.replace(/\n/g, " "));
    utterance.lang = "ko-KR";
    utterance.rate = 0.86;
    window.speechSynthesis.speak(utterance);
  }

  function hasBatchim(value) {
    const hangul = [...String(value || "").trim()].reverse().find((character) => /[가-힣]/.test(character));
    return hangul ? (hangul.charCodeAt(0) - 0xac00) % 28 !== 0 : false;
  }

  function copula(value) {
    return hasBatchim(value) ? "이에요" : "예요";
  }

  function answerKey(questionId, blankId = "choice") {
    return `${questionId}.${blankId}`;
  }

  function answerFor(moduleId, key) {
    return state.answers[moduleId]?.[key] || "";
  }

  function getFillEntries(module) {
    return module.questions.flatMap((question) => question.segments
      .filter((segment) => typeof segment === "object" && segment.blank)
      .map((segment) => ({
        key: answerKey(question.id, segment.blank),
        answer: segment.answer,
      })));
  }

  function getChoiceEntries(module) {
    return module.questions.map((question) => ({ key: answerKey(question.id), answer: question.answer }));
  }

  function getEntries(module) {
    return module.kind === "fill" ? getFillEntries(module) : getChoiceEntries(module);
  }

  function correctSentence(question) {
    if (!question.segments) return question.answer || question.prompt || "";
    return question.segments.map((segment) => typeof segment === "string" ? segment : segment.answer).join("");
  }

  function moduleIndex(moduleId) {
    return modules.findIndex((module) => module.id === moduleId);
  }

  function completedCount() {
    return modules.filter((module) => state.completed[module.id]).length;
  }

  function gradedSummary() {
    return modules.reduce((summary, module) => {
      const best = state.best[module.id];
      if (!best) return summary;
      summary.correct += best.correct;
      summary.total += best.total;
      return summary;
    }, { correct: 0, total: 0 });
  }

  function questionCheckState(module, question) {
    const last = state.last[module.id];
    if (!last?.answers) return null;
    const entries = question.segments
      ? question.segments.filter((segment) => typeof segment === "object" && segment.blank).map((segment) => ({ key: answerKey(question.id, segment.blank), answer: segment.answer }))
      : [{ key: answerKey(question.id), answer: question.answer }];
    if (!entries.every((entry) => last.answers[entry.key] === answerFor(module.id, entry.key))) return null;
    return entries.every((entry) => last.answers[entry.key] === entry.answer) ? "correct" : "wrong";
  }

  function renderProgress() {
    const done = completedCount();
    const percent = Math.round((done / modules.length) * 100);
    const graded = gradedSummary();
    const accuracy = graded.total ? Math.round((graded.correct / graded.total) * 100) : 0;
    return `
      <section class="ip-overview">
        <div class="ip-progress-ring" style="--ip-progress:${percent * 3.6}deg"><span><strong>${done}</strong><small>/ ${modules.length}</small></span></div>
        <div class="ip-overview-copy">
          <p class="eyebrow">Học bằng tương tác</p>
          <h3>${escapeHtml(config.title)}</h3>
          <p>${escapeHtml(config.subtitle)}</p>
          <div class="ip-stats"><span><i data-lucide="circle-check-big"></i>${done} nhiệm vụ đã làm</span><span><i data-lucide="target"></i>${accuracy}% chính xác tốt nhất</span><span><i data-lucide="save"></i>Tự lưu trên thiết bị</span></div>
        </div>
        <button class="ip-reset-all" type="button" data-practice-reset-all><i data-lucide="rotate-ccw"></i><span>Xóa tiến độ</span></button>
      </section>
    `;
  }

  function renderMissionRail() {
    return `
      <nav class="ip-mission-rail" aria-label="Danh sách nhiệm vụ">
        ${modules.map((module, index) => {
          const best = state.best[module.id];
          const done = state.completed[module.id];
          return `
            <button class="ip-mission ${module.id === state.active ? "active" : ""} ${done ? "completed" : ""}" type="button" data-practice-module="${escapeHtml(module.id)}">
              <span class="ip-mission-number">${String(index + 1).padStart(2, "0")}</span>
              <i data-lucide="${escapeHtml(module.icon)}"></i>
              <b>${escapeHtml(module.title)}</b>
              <small>${best ? `${best.correct}/${best.total} đúng` : (done ? "Đã lưu" : "Chưa làm")}</small>
            </button>
          `;
        }).join("")}
      </nav>
    `;
  }

  function renderProfiles(module) {
    if (!module.profiles?.length) return "";
    return `<div class="ip-profile-strip">${module.profiles.map((profile) => `<article><span>${escapeHtml(profile.visual)}</span><strong>${escapeHtml(profile.name)}</strong><small>${escapeHtml(profile.detail)}</small></article>`).join("")}</div>`;
  }

  function renderSchedule(module) {
    if (!module.schedule?.length) return "";
    return `<div class="ip-schedule-strip">${module.schedule.map((item) => `<article><span>${escapeHtml(item.visual)}</span><small>${escapeHtml(item.slot)}</small><strong>${escapeHtml(item.value)}</strong></article>`).join("")}</div>`;
  }

  function renderPassage(module) {
    if (!module.passage) return "";
    return `
      <article class="ip-passage">
        <div><span><i data-lucide="book-open-text"></i></span><div><small>Nghe và đọc</small><h4>${escapeHtml(module.passage.title)}</h4></div><button type="button" data-speak-practice="${escapeHtml(module.passage.text)}"><i data-lucide="volume-2"></i>Nghe toàn đoạn</button></div>
        <p class="ip-passage-korean">${escapeHtml(module.passage.text).replace(/\n/g, "<br>")}</p>
        <p class="ip-passage-translation">${escapeHtml(module.passage.translation)}</p>
      </article>
    `;
  }

  function renderFillQuestion(module, question, index) {
    const status = questionCheckState(module, question);
    const checked = Boolean(status);
    const sentence = question.segments.map((segment) => {
      if (typeof segment === "string") return escapeHtml(segment);
      const key = answerKey(question.id, segment.blank);
      const value = answerFor(module.id, key);
      return `
        <select class="ip-inline-select" data-practice-answer data-module-id="${escapeHtml(module.id)}" data-answer-key="${escapeHtml(key)}" data-correct-answer="${escapeHtml(segment.answer)}" aria-label="Chọn đáp án cho câu ${index + 1}">
          <option value="">Chọn…</option>
          ${segment.options.map((option) => `<option value="${escapeHtml(option)}" ${option === value ? "selected" : ""}>${escapeHtml(option)}</option>`).join("")}
        </select>
      `;
    }).join("");
    return `
      <article class="ip-question ip-fill-question ${status || ""}">
        <div class="ip-question-index">${String(index + 1).padStart(2, "0")}</div>
        ${question.visual ? `<div class="ip-question-visual"><span>${escapeHtml(question.visual)}</span><small>${escapeHtml(question.visualLabel || "")}</small></div>` : ""}
        <div class="ip-question-body">
          <div class="ip-korean-sentence">${sentence}</div>
          <p>${escapeHtml(question.meaning || "")}</p>
          ${question.reading ? `<small>Đọc gần đúng: ${escapeHtml(question.reading)}</small>` : ""}
          ${checked ? `<div class="ip-answer-explanation"><i data-lucide="${status === "correct" ? "circle-check-big" : "lightbulb"}"></i><div><b>${status === "correct" ? "Chính xác" : `Đáp án: ${escapeHtml(correctSentence(question))}`}</b><p>${escapeHtml(question.explanation)}</p></div><button type="button" data-speak-practice="${escapeHtml(correctSentence(question))}" aria-label="Nghe câu đúng"><i data-lucide="volume-2"></i></button></div>` : ""}
        </div>
      </article>
    `;
  }

  function renderChoiceQuestion(module, question, index) {
    const status = questionCheckState(module, question);
    const selected = answerFor(module.id, answerKey(question.id));
    return `
      <article class="ip-question ip-choice-question ${status || ""}">
        <div class="ip-question-index">${String(index + 1).padStart(2, "0")}</div>
        ${question.visual ? `<div class="ip-choice-visual">${escapeHtml(question.visual)}</div>` : ""}
        <div class="ip-question-body">
          <div class="ip-choice-title">${/[가-힣]/.test(question.prompt || "") ? `<button type="button" data-speak-practice="${escapeHtml(question.prompt)}"><i data-lucide="volume-2"></i></button>` : ""}<h4>${escapeHtml(question.prompt)}</h4></div>
          ${question.meaning ? `<p>${escapeHtml(question.meaning)}</p>` : ""}
          <div class="ip-option-grid">
            ${question.options.map((option) => {
              const checkedOption = status && option === selected;
              const optionClass = status ? (option === question.answer ? "answer-correct" : (checkedOption ? "answer-wrong" : "")) : "";
              return `<label class="ip-option ${option === selected ? "selected" : ""} ${optionClass}"><input type="radio" name="${escapeHtml(module.id)}-${escapeHtml(question.id)}" value="${escapeHtml(option)}" data-practice-answer data-module-id="${escapeHtml(module.id)}" data-answer-key="${escapeHtml(answerKey(question.id))}" data-correct-answer="${escapeHtml(question.answer)}" ${option === selected ? "checked" : ""}><span>${escapeHtml(option)}</span></label>`;
            }).join("")}
          </div>
          ${status ? `<div class="ip-answer-explanation"><i data-lucide="${status === "correct" ? "circle-check-big" : "lightbulb"}"></i><div><b>${status === "correct" ? "Chính xác" : `Đáp án: ${escapeHtml(question.answer)}`}</b><p>${escapeHtml(question.explanation)}</p></div>${/[가-힣]/.test(question.answer) ? `<button type="button" data-speak-practice="${escapeHtml(question.answer)}" aria-label="Nghe đáp án"><i data-lucide="volume-2"></i></button>` : ""}</div>` : ""}
        </div>
      </article>
    `;
  }

  function renderGradedModule(module) {
    const last = state.last[module.id];
    const content = module.kind === "fill"
      ? module.questions.map((question, index) => renderFillQuestion(module, question, index)).join("")
      : module.questions.map((question, index) => renderChoiceQuestion(module, question, index)).join("");
    return `
      ${renderPassage(module)}
      ${renderProfiles(module)}
      ${renderSchedule(module)}
      <div class="ip-question-list">${content}</div>
      <div class="ip-checkbar">
        <div class="ip-check-feedback ${last ? (last.correct === last.total ? "perfect" : "") : ""}">
          ${last ? `<span><i data-lucide="${last.correct === last.total ? "party-popper" : "chart-no-axes-column-increasing"}"></i></span><div><strong>${last.correct}/${last.total} đáp án đúng</strong><small>${last.correct === last.total ? "Xuất sắc! Bạn đã hoàn thành trọn vẹn nhiệm vụ." : "Xem giải thích, chỉnh đáp án rồi kiểm tra lại."}</small></div>` : `<span><i data-lucide="sparkles"></i></span><div><strong>Sẵn sàng chấm bài?</strong><small>Hãy trả lời tất cả ô trước khi kiểm tra.</small></div>`}
        </div>
        <div><button class="ip-secondary" type="button" data-reset-practice-module="${escapeHtml(module.id)}"><i data-lucide="rotate-ccw"></i>Làm lại</button><button class="ip-primary" type="button" data-check-practice-module="${escapeHtml(module.id)}"><i data-lucide="badge-check"></i>Kiểm tra</button></div>
      </div>
    `;
  }

  function schedulePreview(builder) {
    const rows = [1, 2, 3, 4].filter((number) => builder[`period${number}`]).map((number) => `${number}교시는 ${builder[`period${number}`]}${copula(builder[`period${number}`])}.`);
    if (builder.snack) rows.push(`한글학교 간식은 ${builder.snack}${copula(builder.snack)}.`);
    return rows.join("\n");
  }

  function renderScheduleBuilder(module) {
    const builder = state.builders[module.id] || {};
    const preview = schedulePreview(builder);
    const options = (values, selected) => `<option value="">Chọn nội dung…</option>${values.map((value) => `<option value="${escapeHtml(value)}" ${value === selected ? "selected" : ""}>${escapeHtml(value)}</option>`).join("")}`;
    return `
      <div class="ip-builder-grid ip-schedule-builder">
        ${[1, 2, 3, 4].map((number) => `<label><span>${number}교시</span><select data-builder-field="period${number}" data-module-id="${escapeHtml(module.id)}">${options(module.classOptions, builder[`period${number}`])}</select></label>`).join("")}
        <label class="snack-field"><span>간식 시간</span><select data-builder-field="snack" data-module-id="${escapeHtml(module.id)}">${options(module.snackOptions, builder.snack)}</select></label>
      </div>
      <article class="ip-live-preview"><div><span><i data-lucide="wand-sparkles"></i></span><div><small>Bản nháp tự động</small><h4>Lịch của bạn bằng tiếng Hàn</h4></div></div><p>${preview ? escapeHtml(preview).replace(/\n/g, "<br>") : "Chọn môn và món ăn để tạo câu."}</p><div>${preview ? `<button class="ip-secondary" type="button" data-speak-practice="${escapeHtml(preview)}"><i data-lucide="volume-2"></i>Nghe lịch</button>` : ""}<button class="ip-primary" type="button" data-save-builder="${escapeHtml(module.id)}"><i data-lucide="save"></i>Lưu lịch</button></div><small class="ip-builder-feedback">${state.completed[module.id] ? "Đã lưu lịch trên thiết bị này." : ""}</small></article>
    `;
  }

  function snackSentence(snack) {
    return snack ? `한글학교 간식은 ${snack}${copula(snack)}.` : "";
  }

  function renderSnackBuilder(module) {
    const builder = state.builders[module.id] || {};
    const sentence = snackSentence(builder.snack);
    return `
      <div class="ip-snack-grid">${module.snacks.map((snack) => `<button class="ip-snack-card ${builder.snack === snack.text ? "selected" : ""}" type="button" data-snack-choice="${escapeHtml(snack.text)}" data-module-id="${escapeHtml(module.id)}"><span>${escapeHtml(snack.visual)}</span><strong>${escapeHtml(snack.text)}</strong><small>${escapeHtml(snack.meaning)}</small><i data-lucide="circle-check-big"></i></button>`).join("")}</div>
      <article class="ip-live-preview ip-menu-preview"><div><span><i data-lucide="utensils"></i></span><div><small>Thực đơn của bạn</small><h4>${builder.snack ? escapeHtml(builder.snack) : "Chưa chọn món"}</h4></div></div><p>${sentence ? escapeHtml(sentence) : "Chạm vào một món ăn vặt yêu thích."}</p><div>${sentence ? `<button class="ip-secondary" type="button" data-speak-practice="${escapeHtml(sentence)}"><i data-lucide="volume-2"></i>Nghe câu</button>` : ""}<button class="ip-primary" type="button" data-save-builder="${escapeHtml(module.id)}"><i data-lucide="save"></i>Lưu thực đơn</button></div><small class="ip-builder-feedback">${state.completed[module.id] ? "Đã lưu món yêu thích." : ""}</small></article>
    `;
  }

  function introText(builder) {
    const name = String(builder.name || "").trim();
    const grade = builder.grade || "";
    const nationality = builder.nationality || "";
    if (!name && !grade && !nationality) return "";
    return [
      "안녕하세요?",
      name ? `저는 ${name}${copula(name)}.` : "저는 ______이에요/예요.",
      grade ? `${grade}학년이에요.` : "__학년이에요.",
      nationality ? `${nationality} 사람이에요.` : "______ 사람이에요.",
      "만나서 반가워요.",
    ].join("\n");
  }

  function renderIntroBuilder(module) {
    const builder = state.builders[module.id] || {};
    const preview = introText(builder);
    return `
      <div class="ip-intro-studio">
        <div class="ip-intro-form">
          <label><span>Tên của bạn</span><input type="text" value="${escapeHtml(builder.name || "")}" placeholder="Ví dụ: 응우옌 당 민" data-intro-field="name" data-module-id="${escapeHtml(module.id)}"></label>
          <label><span>Đang học lớp</span><select data-intro-field="grade" data-module-id="${escapeHtml(module.id)}"><option value="">Chọn lớp…</option>${[1,2,3,4,5,6].map((grade) => `<option value="${grade}" ${String(grade) === String(builder.grade) ? "selected" : ""}>${grade}학년</option>`).join("")}</select></label>
          <label><span>Quốc tịch</span><select data-intro-field="nationality" data-module-id="${escapeHtml(module.id)}"><option value="">Chọn quốc gia…</option>${module.nationalities.map((nationality) => `<option value="${escapeHtml(nationality)}" ${nationality === builder.nationality ? "selected" : ""}>${escapeHtml(nationality)}</option>`).join("")}</select></label>
          <div class="ip-intro-tip"><i data-lucide="lightbulb"></i><p>Tên có 받침 dùng 이에요; tên không có 받침 dùng 예요. Bản nháp tự chọn giúp bạn.</p></div>
        </div>
        <article class="ip-intro-preview">
          <div class="ip-avatar"><span>나</span><i data-lucide="sparkles"></i></div>
          <small>Bài giới thiệu của tôi</small>
          <p class="intro-preview-text">${preview ? escapeHtml(preview).replace(/\n/g, "<br>") : "Điền thông tin để bắt đầu."}</p>
          <div><button class="ip-secondary" type="button" data-speak-intro ${preview ? "" : "disabled"}><i data-lucide="volume-2"></i>Nghe bài</button><button class="ip-secondary" type="button" data-copy-intro ${preview ? "" : "disabled"}><i data-lucide="copy"></i>Sao chép</button><button class="ip-primary" type="button" data-save-builder="${escapeHtml(module.id)}"><i data-lucide="save"></i>Lưu bài</button></div>
          <small class="ip-builder-feedback">${state.completed[module.id] ? "Đã lưu bài giới thiệu." : ""}</small>
        </article>
      </div>
    `;
  }

  function renderBuilder(module) {
    if (module.kind === "schedule-builder") return renderScheduleBuilder(module);
    if (module.kind === "snack-builder") return renderSnackBuilder(module);
    return renderIntroBuilder(module);
  }

  function renderActiveModule() {
    const module = moduleMap.get(state.active) || modules[0];
    const index = moduleIndex(module.id);
    const isBuilder = module.kind.endsWith("builder");
    return `
      <section class="ip-stage ip-accent-${escapeHtml(module.accent)}">
        <header class="ip-stage-head">
          <div class="ip-stage-icon"><i data-lucide="${escapeHtml(module.icon)}"></i></div>
          <div><p class="eyebrow">Nhiệm vụ ${String(index + 1).padStart(2, "0")} · ${isBuilder ? "Tự sáng tạo" : "Có chấm điểm"}</p><h3>${escapeHtml(module.title)}</h3><p>${escapeHtml(module.description)}</p><div class="ip-skill-row">${module.skills.map((skill) => `<span>${escapeHtml(skill)}</span>`).join("")}</div></div>
        </header>
        <div class="ip-stage-content">${isBuilder ? renderBuilder(module) : renderGradedModule(module)}</div>
        <footer class="ip-stage-nav">
          <button type="button" data-practice-prev ${index === 0 ? "disabled" : ""}><i data-lucide="arrow-left"></i><span>Nhiệm vụ trước</span></button>
          <span>${index + 1} / ${modules.length}</span>
          <button type="button" data-practice-next ${index === modules.length - 1 ? "disabled" : ""}><span>Nhiệm vụ sau</span><i data-lucide="arrow-right"></i></button>
        </footer>
      </section>
    `;
  }

  function refreshIcons() {
    if (window.lucide?.createIcons) window.lucide.createIcons();
  }

  function render() {
    root.innerHTML = `<div class="ip-dashboard">${renderProgress()}${renderMissionRail()}${renderActiveModule()}</div>`;
    refreshIcons();
  }

  function changeModule(moduleId) {
    if (!moduleMap.has(moduleId)) return;
    state.active = moduleId;
    saveState();
    render();
    root.querySelector(".ip-stage")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function checkModule(moduleId) {
    const module = moduleMap.get(moduleId);
    if (!module || module.kind.endsWith("builder")) return;
    const entries = getEntries(module);
    const answers = Object.fromEntries(entries.map((entry) => [entry.key, answerFor(moduleId, entry.key)]));
    if (entries.some((entry) => !answers[entry.key])) {
      const feedback = root.querySelector(".ip-check-feedback small");
      if (feedback) feedback.textContent = "Bạn còn ô chưa trả lời. Hãy hoàn thành trước khi kiểm tra.";
      root.querySelector(".ip-check-feedback")?.classList.add("needs-answer");
      return;
    }
    const correct = entries.filter((entry) => answers[entry.key] === entry.answer).length;
    const total = entries.length;
    state.last[moduleId] = { answers, correct, total };
    const previous = state.best[moduleId];
    if (!previous || correct > previous.correct) state.best[moduleId] = { correct, total };
    state.completed[moduleId] = true;
    saveState();
    render();
  }

  function resetModule(moduleId) {
    delete state.answers[moduleId];
    delete state.last[moduleId];
    delete state.best[moduleId];
    delete state.completed[moduleId];
    delete state.builders[moduleId];
    saveState();
    render();
  }

  function builderIsComplete(module) {
    const builder = state.builders[module.id] || {};
    if (module.kind === "schedule-builder") return [1,2,3,4].every((number) => builder[`period${number}`]) && Boolean(builder.snack);
    if (module.kind === "snack-builder") return Boolean(builder.snack);
    return Boolean(String(builder.name || "").trim() && builder.grade && builder.nationality);
  }

  function saveBuilder(moduleId) {
    const module = moduleMap.get(moduleId);
    if (!module || !module.kind.endsWith("builder")) return;
    if (!builderIsComplete(module)) {
      const feedback = root.querySelector(".ip-builder-feedback");
      if (feedback) {
        feedback.textContent = "Hãy điền đủ thông tin trước khi lưu.";
        feedback.classList.add("error");
      }
      return;
    }
    state.completed[moduleId] = true;
    saveState();
    render();
  }

  function updateIntroPreview(moduleId) {
    const text = introText(state.builders[moduleId] || {});
    const preview = root.querySelector(".intro-preview-text");
    if (preview) preview.innerHTML = text ? escapeHtml(text).replace(/\n/g, "<br>") : "Điền thông tin để bắt đầu.";
    root.querySelectorAll("[data-speak-intro], [data-copy-intro]").forEach((button) => { button.disabled = !text; });
  }

  async function copyText(text, button) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    const label = button.querySelector("span") || button;
    const original = label.textContent;
    label.textContent = "Đã sao chép";
    window.setTimeout(() => { label.textContent = original; }, 1400);
  }

  root.addEventListener("click", (event) => {
    const mission = event.target.closest("[data-practice-module]");
    if (mission) return changeModule(mission.dataset.practiceModule);

    if (event.target.closest("[data-practice-prev]")) {
      const index = moduleIndex(state.active);
      if (index > 0) changeModule(modules[index - 1].id);
      return;
    }
    if (event.target.closest("[data-practice-next]")) {
      const index = moduleIndex(state.active);
      if (index < modules.length - 1) changeModule(modules[index + 1].id);
      return;
    }

    const checkButton = event.target.closest("[data-check-practice-module]");
    if (checkButton) return checkModule(checkButton.dataset.checkPracticeModule);

    const resetButton = event.target.closest("[data-reset-practice-module]");
    if (resetButton) return resetModule(resetButton.dataset.resetPracticeModule);

    const speakButton = event.target.closest("[data-speak-practice]");
    if (speakButton) return speakKorean(speakButton.dataset.speakPractice);

    const snackButton = event.target.closest("[data-snack-choice]");
    if (snackButton) {
      const moduleId = snackButton.dataset.moduleId;
      state.builders[moduleId] = { ...(state.builders[moduleId] || {}), snack: snackButton.dataset.snackChoice };
      delete state.completed[moduleId];
      saveState();
      render();
      return;
    }

    const saveButton = event.target.closest("[data-save-builder]");
    if (saveButton) return saveBuilder(saveButton.dataset.saveBuilder);

    if (event.target.closest("[data-speak-intro]")) {
      return speakKorean(introText(state.builders[state.active] || {}));
    }

    const copyButton = event.target.closest("[data-copy-intro]");
    if (copyButton) return copyText(introText(state.builders[state.active] || {}), copyButton);

    if (event.target.closest("[data-practice-reset-all]")) {
      if (window.confirm("Xóa toàn bộ đáp án và tiến độ của 12 nhiệm vụ?")) {
        state = freshState();
        saveState();
        render();
      }
    }
  });

  root.addEventListener("change", (event) => {
    const answer = event.target.closest("[data-practice-answer]");
    if (answer) {
      const moduleId = answer.dataset.moduleId;
      state.answers[moduleId] = { ...(state.answers[moduleId] || {}), [answer.dataset.answerKey]: answer.value };
      delete state.last[moduleId];
      saveState();
      render();
      return;
    }

    const builderField = event.target.closest("[data-builder-field]");
    if (builderField) {
      const moduleId = builderField.dataset.moduleId;
      state.builders[moduleId] = { ...(state.builders[moduleId] || {}), [builderField.dataset.builderField]: builderField.value };
      delete state.completed[moduleId];
      saveState();
      render();
      return;
    }

    const introField = event.target.closest("[data-intro-field]");
    if (introField) {
      const moduleId = introField.dataset.moduleId;
      state.builders[moduleId] = { ...(state.builders[moduleId] || {}), [introField.dataset.introField]: introField.value };
      delete state.completed[moduleId];
      saveState();
      updateIntroPreview(moduleId);
    }
  });

  root.addEventListener("input", (event) => {
    const introField = event.target.closest("[data-intro-field]");
    if (!introField) return;
    const moduleId = introField.dataset.moduleId;
    state.builders[moduleId] = { ...(state.builders[moduleId] || {}), [introField.dataset.introField]: introField.value };
    delete state.completed[moduleId];
    saveState();
    updateIntroPreview(moduleId);
  });

  render();
})();
