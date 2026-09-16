const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const {pathToFileURL}=require('node:url');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),context={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'data/korean-lesson-7.js'),'utf8'),context);
const d=context.window.KOREAN_LESSON_SEVEN;
assert.equal(d.slides.length,31);
assert.equal(d.vocabulary.filter(w=>w.core).length,30);
assert.equal(d.vocabulary.length,43);
assert.equal(new Set(d.vocabulary.map(w=>w.text)).size,43);
assert.equal(d.reading.length,14);
assert.equal(d.workbook.sections.reduce((n,s)=>n+s.items.length,0),41);
for(const w of d.vocabulary)for(const field of ['text','romanization','meaning'])assert.ok(w[field],`${w.id}: ${field}`);
for(const section of d.workbook.sections)for(const q of section.items){
  assert.ok(q.prompt&&q.sample.text&&q.sample.romanization&&q.sample.meaning,`${section.id}: missing annotation`);
  if(/[가-힣]/.test(q.prompt))assert.ok(q.promptRomanization,`${q.prompt}: no romanization`);
  if(section.type==='choice')for(const a of q.answers)assert.ok(q.options.some(o=>o.text===a));
  if(section.type==='order')assert.equal(q.tokens.length,q.tokenRoma.length);
}
assert.equal(d.workbook.sections[2].items[6].answers[0],'Không thêm');
assert.match(d.workbook.sections[1].items[3].explanation,/xuất phát/);
for(const s of d.slides){assert.ok(fs.statSync(path.join(root,`assets/korean/lesson-7/slides/slide-${String(s.page).padStart(2,'0')}.jpg`)).size>1000);for(const id of s.words)assert.ok(d.words[id]);}
for(let day=0;day<7;day++)for(let period=0;period<4;period++)for(const r of d.routines)for(const mode of ['go','do']){
  const s=d.buildRoutine(day,period,r.id,mode);
  assert.doesNotMatch(s.text+s.romanization+s.meaning,/undefined|NaN/);
  assert.ok(s.text.includes(r.place+(mode==='go'?'에 가요':'에서 '+r.action)));
}
assert.match(d.buildRoutine(5,0,'library','go').romanization,/toyoire doseogwane/);
assert.match(d.buildRoutine(5,3,'library','do').romanization,/toyoil jeonyeoge doseogwaneseo/);
(async()=>{
  const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_PATH||'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
  try{
    const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'}),errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto(process.env.TEST_URL||pathToFileURL(path.join(root,'index.html')).href,{waitUntil:'load'});
    await page.addStyleTag({content:'html, body, * { scroll-behavior: auto !important; }'});
    await page.locator('[data-enter-language="ko"]').click();
    await page.locator('[data-korean-tab="ko-lesson-7"]').click();
    await page.locator('#ko-lesson-7.active').waitFor();
    assert.equal(await page.locator('#koStatCompleted').textContent(),'0/11');
    assert.equal(await page.locator('#ko7-vocab-grid .ko5-word').count(),43);
    await page.locator('[data-ko7-filter="days"]').click();
    assert.equal(await page.locator('#ko7-vocab-grid .ko5-word').count(),7);
    await page.locator('#ko7-search').fill('woryoil');
    assert.equal(await page.locator('#ko7-vocab-grid h4').innerText(),'월요일');
    await page.locator('#ko7-search').fill('NOTAWORD');
    assert.ok(await page.locator('#ko7-vocab-grid .empty-state').isVisible());
    await page.locator('#ko7-search').fill('');await page.locator('[data-ko7-filter="all"]').click();
    await page.locator('[data-ko7-day="5"]').click();
    assert.match(await page.locator('#ko7-built').innerText(),/저는 토요일에 도서관에 가요/);
    await page.locator('#ko7-mode').selectOption('do');
    await page.locator('#ko7-period').selectOption('2');
    assert.match(await page.locator('#ko7-built').innerText(),/저는 토요일 오후에 도서관에서 책을 읽어요/);
    await page.evaluate(()=>{speechSynthesis.speak=u=>{window.__spoken={text:u.text,lang:u.lang};};});
    await page.locator('#ko7-built [data-speak-ko]').click();
    assert.equal(await page.evaluate(()=>window.__spoken.lang),'ko-KR');
    assert.match(await page.evaluate(()=>window.__spoken.text),/도서관에서/);
    await page.locator('#ko7-reveal').click();assert.equal(await page.locator('.ko7-answer').count(),1);
    await page.locator('#ko7-next-card').click();assert.equal(await page.locator('.ko7-answer').count(),0);
    assert.match(await page.locator('#ko7-speaking-card').innerText(),/Thẻ 2/);
    await page.locator('#ko7-translation').click();
    assert.ok(await page.locator('#ko7-dialogue').evaluate(e=>e.classList.contains('ko5-hide-meaning')));
    const wb=page.locator('#ko7-workbook');
    for(let i=0;i<d.workbook.sections.length;i++){
      await wb.locator('[data-kwb-section]').selectOption(String(i));
      assert.equal(await wb.locator('[data-kwb-question] option').count(),d.workbook.sections[i].items.length);
    }
    await wb.locator('[data-kwb-section]').selectOption('2');
    await wb.locator('[data-kwb-question]').selectOption('6');
    await wb.locator('[data-kwb-choice="2"]').click();
    assert.match(await wb.locator('.kwb-feedback').innerText(),/Đúng rồi/);
    assert.match(await wb.locator('.kwb-feedback').innerText(),/오늘 한국어를 공부해요/);
    await wb.locator('[data-kwb-reset]').click();
    assert.match(await wb.locator('[data-kwb-score]').innerText(),/Đúng 0\/10/);
    await wb.locator('[data-kwb-section]').selectOption('0');
    for(const i of [2,1,0])await wb.locator(`[data-kwb-token="${i}"]`).click();
    await wb.locator('[data-kwb-check]').click();assert.match(await wb.locator('.kwb-feedback').innerText(),/동생은 학교에 가요/);
    await wb.locator('[data-kwb-section]').selectOption('1');
    await wb.locator('[data-kwb-question]').selectOption('3');
    await wb.locator('[data-kwb-draft]').fill('저는 집에 가요.');await wb.locator('[data-kwb-check]').click();
    assert.match(await wb.locator('.kwb-feedback').innerText(),/xuất phát/);
    await page.locator('[data-korean-tab="ko-lesson-6"]').click();
    await page.locator('[data-korean-tab="ko-lesson-7"]').click();
    assert.equal(await wb.locator('[data-kwb-draft]').inputValue(),'저는 집에 가요.');
    await page.locator('#ko7-slide-filter').selectOption('vocab');
    assert.equal(await page.locator('#ko7-slide-grid .ko5-slide').count(),7);
    await page.locator('#ko7-slide-grid [data-open-ko-slide]').first().click();
    assert.ok(await page.locator('#koSlideDialog').isVisible());await page.keyboard.press('Escape');
    await page.locator('#ko7-slide-filter').selectOption('all');
    assert.equal(await page.locator('#ko7-slide-grid img').evaluateAll(async imgs=>{await Promise.all(imgs.map(i=>{i.loading='eager';return i.decode().catch(()=>{});}));return imgs.filter(i=>!i.naturalWidth).length;}),0);
    await page.locator('[data-ko7-complete]').click();
    assert.equal(await page.locator('#koStatCompleted').textContent(),'1/11');
    for(const width of [390,768,1440]){
      await page.setViewportSize({width,height:1000});
      for(const id of ['vocab','grammar','week','reading','practice','slides']){
        await page.locator(`.ko7-jumpbar [data-ko7-jump="${id}"]`).click();
        await page.waitForFunction(id=>{const el=document.querySelector('#ko7-'+id);return Math.abs(el.getBoundingClientRect().top-parseFloat(getComputedStyle(el).scrollMarginTop))<3;},id);
        assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)<=2,`overflow at ${width}/${id}`);
      }
      if(width!==768){await page.locator('.ko7-jumpbar [data-ko7-jump="week"]').click();await page.screenshot({path:path.join(root,`tmp/ko7-${width}.png`)});}
    }
    await page.locator('.ko7-jumpbar [data-ko7-jump="grammar"]').click();await page.screenshot({path:path.join(root,'tmp/ko7-grammar.png')});
    await page.reload();assert.equal(await page.locator('#koStatCompleted').textContent(),'1/11');
    assert.deepEqual(errors,[]);
    console.log('PASS: 31 source pages, 43 annotated entries (30 core), 41 exercises, 336 routine combinations, source exceptions, TTS, modal, progress, session preservation and responsive navigation.');
  }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
