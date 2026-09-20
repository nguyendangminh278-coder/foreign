// Run with Node.js + Playwright. Set BROWSER_PATH to an installed Chromium browser if needed.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { pathToFileURL } = require("node:url");
const { chromium } = require("playwright");
const root = path.resolve(__dirname, "..");
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, "data/korean-lesson-5.js"), "utf8"), context);
const data = context.window.KOREAN_LESSON_FIVE;
const supplement = data.supplementVocabulary.flatMap((group) => group.words);
assert.equal(supplement.length, 33);
assert.equal(new Set([...data.actions, ...data.context, ...supplement].map((w) => w.id)).size, 64);
for (const w of supplement) for (const field of ["text", "romanization", "reading", "meaning", "polite", "politeRomanization", "politeReading", "exampleMeaning"]) assert.ok(w[field], `${w.id}: ${field}`);
assert.ok(!supplement.some((w) => ["먹다", "마시다", "좋아하다", "산책하다"].includes(w.text)));
assert.equal(supplement.find((w) => w.text === "걷다").polite, "걸어요");
assert.equal(supplement.find((w) => w.text === "받다").polite, "받아요");
assert.equal(data.actions.length, 20);
assert.equal(data.context.length, 11);
assert.equal(data.slides.length, 35);
const ids = new Set([...data.actions, ...data.context].map((w) => w.id));
assert.equal(ids.size, 31);
for (const w of [...data.actions, ...data.context]) for (const field of ["text", "romanization", "reading", "meaning"]) assert.ok(w[field], `${w.id}: ${field}`);
for (const s of data.slides) {
  for (const id of s.words) assert.ok(ids.has(id), `Unknown slide word ${id}`);
  assert.ok(fs.statSync(path.join(root, `assets/korean/lesson-5/slides/slide-${String(s.page).padStart(2, "0")}.jpg`)).size > 1000);
}
for (const q of data.order) assert.equal(q.text.split(" ").length, q.romanization.split(" ").length, q.text);
for (const a of data.actions) assert.ok(a.places.every((id) => ids.has(id)));
assert.equal(data.grammarExamples[1].text, "학교에서 친구를 만나요.");
const edge = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const executablePath = process.env.BROWSER_PATH || (fs.existsSync(edge) ? edge : undefined);
fs.mkdirSync(path.join(root, "tmp"), { recursive: true });
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(process.env.TEST_URL || pathToFileURL(path.join(root, "index.html")).href, { waitUntil: "load" });
    await page.addStyleTag({ content: "html, body, * { scroll-behavior: auto !important; }" });
    await page.locator('[data-enter-language="ko"]').click();
    await page.locator('[data-korean-tab="ko-lesson-5"]').click();
    await page.locator("#ko-lesson-5.active").waitFor();
    assert.equal(await page.locator("#ko5-vocab-grid .ko5-word").count(), 64);
    assert.equal(await page.locator("#ko5-slide-grid .ko5-slide").count(), 35);
    assert.equal(await page.locator("#koStatCompleted").textContent(), "0/13");
    await page.screenshot({ path: path.join(root, "tmp/ko5-desktop.png") });
    await page.locator("#ko5-search").fill("uống sữa");
    assert.equal(await page.locator("#ko5-vocab-grid .ko5-word").count(), 1);
    await page.locator("#ko5-search").fill("zz-nothing");
    assert.equal(await page.locator("#ko5-vocab-grid .ko5-word").count(), 0);
    await page.locator("#ko5-search").fill("");
    await page.locator('[data-ko5-filter="context"]').click();
    assert.equal(await page.locator("#ko5-vocab-grid .ko5-word").count(), 11);
    await page.locator('[data-ko5-filter="all"]').click();
    await page.locator('[data-ko5-filter="supplement"]').click();
    assert.equal(await page.locator("#ko5-vocab-grid .ko5-word").count(), 33);
    for (const group of data.supplementVocabulary) {
      await page.locator(`[data-ko5-filter="${group.id}"]`).click();
      assert.equal(await page.locator("#ko5-vocab-grid .ko5-word").count(), group.words.length);
    }
    await page.locator('[data-ko5-filter="supplement"]').click();
    await page.locator("#ko5-search").fill("걸어요");
    assert.equal(await page.locator("#ko5-vocab-grid h4").innerText(), "걷다");
    assert.match(await page.locator("#ko5-vocab-grid").innerText(), /georeoyo/);
    await page.locator("#ko5-search").fill("");
    await page.locator('[data-ko5-filter="new-place-time"]').click();
    await page.locator("#ko5-vocab-grid").screenshot({ path: path.join(root, "tmp/ko5-supplement.png") });
    await page.locator('[data-ko5-filter="all"]').click();
    await page.locator('[data-ko5-order-view="time"]').click();
    assert.equal(await page.locator(".ko5-order-parts strong").first().innerText(), "아침에");
    assert.equal(await page.locator('[data-ko5-order-view="time"]').getAttribute("aria-pressed"), "true");
    assert.match(await page.locator("#ko5-order-map-content").innerText(), /아침에 식당에서 저는 빵을 먹어요/);
    await page.locator('[data-ko5-order-view="subject"]').click();
    assert.equal(await page.locator(".ko5-order-parts strong").first().innerText(), "저는");
    await page.locator(".ko5-order-map").screenshot({ path: path.join(root, "tmp/ko5-order-map.png") });
    await page.locator(".ko5-location-lab").screenshot({ path: path.join(root, "tmp/ko5-locations.png") });
    await page.locator(".ko5-review-notes summary").click();
    await page.locator('.ko5-review-notes [data-open-korean-tab="ko-lesson-4"]').first().click();
    await page.locator("#ko-lesson-4.active").waitFor();
    await page.locator('[data-korean-tab="ko-lesson-5"]').click();
    await page.locator("#ko5-place").selectOption("kitchen");
    assert.ok(await page.locator('[data-ko5-action="cook"]').count());
    assert.equal(await page.locator('[data-ko5-action="bike"]').count(), 0);
    await page.locator('[data-ko5-action="cook"]').click();
    assert.match(await page.locator("#ko5-sentence").innerText(), /음식을 만들어요/);
    await page.locator("#ko5-place").selectOption("living");
    assert.match(await page.locator("#ko5-sentence").innerText(), /geosireseo/);
    // Verify TTS dispatch without relying on an installed Korean voice in headless mode.
    await page.evaluate(() => { window.speechSynthesis.speak = (u) => { window.__spoken = { text: u.text, lang: u.lang }; }; });
    await page.locator("#ko5-sentence [data-speak-ko]").click();
    assert.equal(await page.evaluate(() => window.__spoken.lang), "ko-KR");
    await page.locator("#ko5-translation").click();
    assert.ok(await page.locator("#ko-lesson-5 .ko5-dialogue").evaluate((el) => el.classList.contains("ko5-hide-meaning")));
    await page.locator("#ko5-translation").click();
    for (let i = 0; i < data.comprehension.length; i++) await page.locator(`[data-ko5-reading-answer="${data.comprehension[i].answer}"][data-question="${i}"]`).click();
    assert.match(await page.locator("#ko5-reading-score").innerText(), /Đúng 6\/6/);
    await page.locator('[data-ko5-reset="reading"]').click();
    assert.match(await page.locator("#ko5-reading-score").innerText(), /Đã trả lời 0\/6/);
    for (let i = 0; i < data.particles.length; i++) await page.locator(`[data-ko5-particle="${data.particles[i].answer}"][data-question="${i}"]`).click();
    assert.match(await page.locator("#ko5-exercise").innerText(), /Đúng 6\/6/);
    await page.locator('[data-ko5-reset="particles"]').click();
    await page.locator('[data-ko5-particle="을"][data-question="0"]').click();
    assert.equal(await page.locator("#ko5-exercise .incorrect").count(), 1);
    await page.locator('[data-ko5-mode="order"]').click();
    for (let i = 0; i < data.order.length; i++) {
      await page.locator("#ko5-order-index").selectOption(String(i));
      for (let id = 0; id < data.order[i].text.split(" ").length; id++) await page.locator(`[data-ko5-token="${id}"]`).click();
      await page.locator("[data-ko5-order-check]").click();
      assert.match(await page.locator("#ko5-order-feedback").innerText(), /đã ghép đúng/);
    }
    await page.locator('[data-ko5-mode="write"]').click();
    await page.locator("#ko5-draft-0").fill("저는 공원에서 자전거를 타요.");
    await page.locator('[data-ko5-mode="particles"]').click();
    await page.locator('[data-ko5-mode="write"]').click();
    assert.equal(await page.locator("#ko5-draft-0").inputValue(), "저는 공원에서 자전거를 타요.");
    await page.locator("#ko5-slide-filter").selectOption("vocab");
    assert.equal(await page.locator("#ko5-slide-grid .ko5-slide").count(), 8);
    await page.locator("#ko5-slide-grid [data-open-ko-slide]").first().click();
    assert.ok(await page.locator("#koSlideDialog").isVisible());
    await page.keyboard.press("Escape");
    assert.ok(!(await page.locator("#koSlideDialog").isVisible()));
    await page.locator("#ko5-slide-filter").selectOption("all");
    assert.equal(await page.locator("#ko5-slide-grid img").evaluateAll(async (imgs) => {
      await Promise.all(imgs.map((img) => { img.loading = "eager"; return img.decode().catch(() => {}); }));
      return imgs.filter((img) => !img.naturalWidth).length;
    }), 0);
    await page.locator("[data-ko5-complete]").click();
    assert.equal(await page.locator("#koStatCompleted").textContent(), "1/13");
    await page.locator('[data-korean-tab="ko-lesson-4"]').click();
    await page.locator("[data-ko4-complete]").click();
    assert.equal(await page.locator("#koStatCompleted").textContent(), "2/13");
    await page.locator('[data-korean-tab="ko-lesson-3"]').click();
    await page.locator("[data-ko3-complete]").click();
    assert.equal(await page.locator("#koStatCompleted").textContent(), "3/13");
    await page.locator('[data-korean-tab="ko-lesson-1"]').click();
    await page.locator('[data-complete-module="lesson-1"]').click();
    assert.equal(await page.locator("#koStatCompleted").textContent(), "4/13");
    await page.reload({ waitUntil: "load" });
    await page.addStyleTag({ content: "html, body, * { scroll-behavior: auto !important; }" });
    assert.equal(await page.locator("#koStatCompleted").textContent(), "4/13");
    await page.locator('[data-enter-language="ko"]').click();
    await page.locator('[data-korean-tab="ko-lesson-5"]').click();
    await page.locator('.ko5-jumpbar [data-ko5-jump="grammar"]').click();
    await page.waitForFunction(() => Math.abs(document.querySelector("#ko5-grammar").getBoundingClientRect().top - 235) < 3);
    await page.screenshot({ path: path.join(root, "tmp/ko5-grammar.png") });
    await page.locator('.ko5-jumpbar [data-ko5-jump="builder"]').click();
    await page.waitForFunction(() => Math.abs(document.querySelector("#ko5-builder").getBoundingClientRect().top - 235) < 3);
    await page.screenshot({ path: path.join(root, "tmp/ko5-builder.png") });
    for (const width of [390, 768, 1440]) {
      await page.setViewportSize({ width, height: 844 });
      for (const section of ["vocab", "grammar", "builder", "reading", "practice", "slides"]) {
        await page.locator(`.ko5-jumpbar [data-ko5-jump="${section}"]`).click();
        await page.waitForFunction((id) => { const el = document.getElementById(`ko5-${id}`); return Math.abs(el.getBoundingClientRect().top - parseFloat(getComputedStyle(el).scrollMarginTop)) < 3; }, section);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        assert.ok(overflow <= 2, `Horizontal overflow ${overflow}px, ${width}px / ${section}`);
      }
      if (width === 390) {
        await page.locator(".ko5-order-map").screenshot({ path: path.join(root, "tmp/ko5-order-mobile.png") });
        await page.locator('.ko5-jumpbar [data-ko5-jump="builder"]').click();
        await page.screenshot({ path: path.join(root, "tmp/ko5-mobile.png") });
      }
    }
    assert.deepEqual(errors, []);
    console.log("PASS: 31 PDF + 33 supplemental entries, topic filters, annotated forms, sentence-order switch, review links, 35 images, builder/TTS, reading 6/6, particles 6/6, 8 reorder tasks, drafts, modal, persisted progress, and 390/768/1440px layouts.");
  } finally { await browser.close(); }
})().catch((error) => { console.error(error); process.exitCode = 1; });
