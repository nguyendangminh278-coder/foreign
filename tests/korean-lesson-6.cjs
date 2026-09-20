const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const {pathToFileURL}=require('node:url');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..'), context={window:{}};
for(const file of ['data/korean-lesson-5-workbook.js','data/korean-lesson-6.js']) vm.runInNewContext(fs.readFileSync(path.join(root,file),'utf8'),context);
const six=context.window.KOREAN_LESSON_SIX, five=context.window.KOREAN_LESSON_FIVE_WORKBOOK;
assert.equal(six.slides.length,28);
assert.equal(six.vocabulary.length,31);
assert.equal(six.workbook.sections.reduce((n,s)=>n+s.items.length,0),44);
assert.equal(five.sections.reduce((n,s)=>n+s.items.length,0),84);
assert.equal(five.sections[8].items[8].alreadyCorrect,true);
assert.equal(five.sections[0].items[1].answers.length,2);
for(const course of [six.workbook,five]) for(const section of course.sections) for(const q of section.items){
  assert.ok(q.prompt&&q.sample.text&&q.sample.romanization&&q.sample.meaning,`${section.id}: missing annotation`);
  if(section.type==='choice')for(const a of q.answers)assert.ok(q.options.some(o=>o.text===a));
  if(section.type==='order')assert.equal(q.tokens.length,q.tokenRoma.length);
}
for(const w of six.vocabulary)for(const field of ['text','romanization','reading','meaning'])assert.ok(w[field],`${w.id}: ${field}`);
for(const s of six.slides){assert.ok(fs.statSync(path.join(root,`assets/korean/lesson-6/slides/slide-${String(s.page).padStart(2,'0')}.jpg`)).size>1000);for(const id of s.words)assert.ok(six.words[id]);}
(async()=>{
  const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_PATH||'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
  try{
    const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'}),errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto(process.env.TEST_URL||pathToFileURL(path.join(root,'index.html')).href,{waitUntil:'load'});
    await page.addStyleTag({content:'html, body, * { scroll-behavior: auto !important; }'});
    await page.locator('[data-enter-language="ko"]').click();
    await page.locator('[data-korean-tab="ko-lesson-6"]').click();
    await page.locator('#ko-lesson-6.active').waitFor();
    assert.equal(await page.locator('#koStatCompleted').textContent(),'0/13');
    assert.equal(await page.locator('#ko6-vocab-grid .ko5-word').count(),31);
    await page.locator('[data-ko6-filter="position"]').click();
    assert.equal(await page.locator('#ko6-vocab-grid .ko5-word').count(),8);
    await page.locator('#ko6-search').fill('oenjjok');
    assert.equal(await page.locator('#ko6-vocab-grid h4').innerText(),'왼쪽');
    await page.locator('#ko6-search').fill('');
    await page.locator('[data-ko6-filter="all"]').click();
    await page.locator('[data-ko6-hotspot="10"]').click();
    assert.match(await page.locator('#ko6-room-result').innerText(),/의자 아래에/);
    await page.locator('#ko6-second').selectOption('cat');
    await page.locator('#ko6-position').selectOption('below');
    assert.match(await page.locator('#ko6-built').innerText(),/책하고 고양이가 책상 아래에 있어요/);
    assert.doesNotMatch(await page.locator('#ko6-built').innerText(),/undefined/);
    await page.evaluate(()=>{speechSynthesis.speak=u=>{window.__spoken={text:u.text,lang:u.lang};};});
    await page.locator('[data-ko6-hotspot="7"]').click();
    assert.match(await page.evaluate(()=>window.__spoken.text),/농구공/);
    await page.locator('#ko6-built [data-speak-ko]').click();
    assert.equal(await page.evaluate(()=>window.__spoken.lang),'ko-KR');
    await page.locator('#ko6-translation').click();
    assert.ok(await page.locator('#ko6-dialogue').evaluate(e=>e.classList.contains('ko5-hide-meaning')));
    const workbook=page.locator('#ko6-workbook');
    await workbook.locator('[data-kwb-section]').selectOption('1');
    await workbook.locator('[data-kwb-choice="0"]').click();
    assert.match(await workbook.locator('[data-kwb-score]').innerText(),/Đúng 1\/5/);
    await workbook.locator('[data-kwb-reset]').click();
    assert.match(await workbook.locator('[data-kwb-score]').innerText(),/Đúng 0\/5/);
    await page.locator('#ko6-slide-filter').selectOption('vocab');
    assert.equal(await page.locator('#ko6-slide-grid .ko5-slide').count(),6);
    await page.locator('#ko6-slide-grid [data-open-ko-slide]').first().click();
    assert.ok(await page.locator('#koSlideDialog').isVisible());await page.keyboard.press('Escape');
    await page.locator('#ko6-slide-filter').selectOption('all');
    assert.equal(await page.locator('#ko6-slide-grid img, .ko6-room img').evaluateAll(async imgs=>{await Promise.all(imgs.map(i=>{i.loading='eager';return i.decode().catch(()=>{});}));return imgs.filter(i=>!i.naturalWidth).length;}),0);
    await page.locator('[data-ko6-complete]').click();
    assert.equal(await page.locator('#koStatCompleted').textContent(),'1/13');
    for(const width of [390,768,1440]){
      await page.setViewportSize({width,height:950});
      for(const id of ['vocab','grammar','lab','reading','practice','slides']){
        await page.locator(`.ko6-jumpbar [data-ko6-jump="${id}"]`).click();
        await page.waitForFunction(id=>{const el=document.querySelector('#ko6-'+id);return Math.abs(el.getBoundingClientRect().top-parseFloat(getComputedStyle(el).scrollMarginTop))<3;},id);
        assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)<=2,`overflow at ${width}/${id}`);
      }
      if(width!==768){await page.locator('.ko6-jumpbar [data-ko6-jump="lab"]').click();await page.screenshot({path:path.join(root,`tmp/ko6-${width}.png`)});}
    }
    await page.locator('[data-korean-tab="ko-lesson-5"]').click();
    await page.locator('[data-ko5-mode="workbook"]').click();
    const wb=page.locator('#ko5-workbook');
    assert.equal(await wb.locator('[data-kwb-section] option').count(),9);
    for(let s=0;s<five.sections.length;s++){
      await wb.locator('[data-kwb-section]').selectOption(String(s));
      assert.equal(await wb.locator('[data-kwb-question] option').count(),five.sections[s].items.length);
    }
    await wb.locator('[data-kwb-section]').selectOption('0');
    await wb.locator('[data-kwb-question]').selectOption('1');
    await wb.locator('[data-kwb-choice="3"]').click();
    assert.match(await wb.locator('[data-kwb-score]').innerText(),/Đúng 1\/10/);
    await wb.locator('[data-kwb-section]').selectOption('2');
    await wb.locator('[data-kwb-draft]').fill('가요');await wb.locator('[data-kwb-check]').click();
    assert.match(await wb.locator('.kwb-feedback').innerText(),/Đúng rồi/);
    await wb.locator('[data-kwb-next]').click();await wb.locator('[data-kwb-draft]').fill('먹아요');await wb.locator('[data-kwb-check]').click();
    assert.match(await wb.locator('.kwb-feedback').innerText(),/Chưa đúng/);
    await wb.locator('[data-kwb-section]').selectOption('4');
    for(const i of [0,1,2])await wb.locator(`[data-kwb-token="${i}"]`).click();
    await wb.locator('[data-kwb-check]').click();assert.match(await wb.locator('.kwb-feedback').innerText(),/저는 밥을 먹어요/);
    await wb.locator('[data-kwb-section]').selectOption('8');await wb.locator('[data-kwb-question]').selectOption('8');
    await wb.locator('[data-kwb-draft]').fill('저는 집에서 영화를 봐요.');await wb.locator('[data-kwb-check]').click();
    assert.match(await wb.locator('.kwb-feedback').innerText(),/đã đúng/);
    await page.locator('[data-ko5-mode="particles"]').click();await page.locator('[data-ko5-mode="workbook"]').click();
    assert.equal(await wb.locator('[data-kwb-draft]').inputValue(),'저는 집에서 영화를 봐요.');
    await page.screenshot({path:path.join(root,'tmp/ko5-workbook.png')});
    await page.reload();assert.equal(await page.locator('#koStatCompleted').textContent(),'1/13');
    assert.deepEqual(errors,[]);
    console.log('PASS: 28 PDF pages, 31 annotated entries, 44 lesson 6 exercises, 84 DOCX exercises, multiple valid answers, conjugation grading, open-answer handling, builder, TTS, modal, progress persistence and responsive navigation.');
  }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
