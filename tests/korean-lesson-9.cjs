const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {pathToFileURL}=require('node:url');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),context={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'data/korean-lesson-9.js'),'utf8'),context);
const d=context.window.KOREAN_LESSON_NINE;
assert.equal(d.slides.length,27);assert.equal(d.vocabulary.length,39);
assert.equal(d.vocabulary.filter(w=>w.core).length,30);
assert.equal(new Set(d.vocabulary.map(w=>w.text)).size,39);
assert.equal(d.reading.length,15);assert.equal(d.forms.length,20);
assert.equal(d.workbook.sections.reduce((n,s)=>n+s.items.length,0),56);
for(const s of d.slides){assert.ok(fs.statSync(path.join(root,`assets/korean/lesson-9/slides/slide-${String(s.page).padStart(2,'0')}.jpg`)).size>1000);for(const id of s.words)assert.ok(d.words[id]);}
for(const w of [...d.vocabulary,...d.reading])for(const field of ['text','romanization','meaning'])assert.ok(w[field],`${w.text}: ${field}`);
for(const section of d.workbook.sections)for(const q of section.items){
  assert.ok(q.prompt&&q.sample.text&&q.sample.romanization&&q.sample.meaning,`${section.id}: missing annotation`);
  if(/[가-힣]/.test(q.prompt))assert.ok(q.promptRomanization,`${q.prompt}: missing romanization`);
  if(section.type==='choice')for(const a of q.answers)assert.ok(q.options.some(o=>o.text===a));
  if(section.type==='exact')assert.ok(q.answers.length);
  if(section.type==='order')assert.equal(q.tokens.length,q.tokenRoma.length);
}
assert.equal(d.words.turtle.text,'거북이');assert.equal(d.words.arrive.meaning,'Đến nơi');
assert.equal(d.reading[4].text,'코알라 사진을 찍었어요.');
assert.equal(d.zoo.map(w=>w.id).join(','),'giraffe,elephant,monkey,bear,lion,tiger');
assert.match(d.workbook.sections[3].items[3].explanation,/Đã sửa đề/);
assert.equal(d.workbook.sections[6].items.map(q=>q.answers[0]).join(''),'OXOXO');
for(let p=0;p<3;p++)for(let o=0;o<6;o++){const lines=d.trip(p,o);assert.equal(lines.length,2);for(const s of lines)assert.doesNotMatch(s.text+s.romanization+s.meaning,/undefined|NaN/);}
assert.throws(()=>d.trip(3,0));
(async()=>{
  const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_PATH||'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
  try{
    const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'}),errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto(process.env.TEST_URL||pathToFileURL(path.join(root,'index.html')).href,{waitUntil:'load'});
    await page.addStyleTag({content:'html, body, * { scroll-behavior: auto !important; }'});
    await page.locator('[data-enter-language="ko"]').click();await page.locator('[data-korean-tab="ko-lesson-9"]').click();
    await page.locator('#ko-lesson-9.active').waitFor();assert.equal(await page.locator('#koStatCompleted').textContent(),'0/14');
    assert.equal(await page.locator('#ko9-vocab-grid .ko5-word').count(),39);
    await page.locator('[data-ko9-filter="animals"]').click();assert.equal(await page.locator('#ko9-vocab-grid .ko5-word').count(),8);
    await page.locator('#ko9-search').fill('geobugi');assert.equal(await page.locator('#ko9-vocab-grid h4').innerText(),'거북이');
    await page.locator('#ko9-search').fill('missingword');assert.ok(await page.locator('#ko9-vocab-grid .empty-state').isVisible());
    await page.locator('#ko9-search').fill('');await page.locator('[data-ko9-filter="all"]').click();
    for(let i=0;i<d.forms.length;i++){await page.locator('#ko9-verb').selectOption(String(i));assert.ok((await page.locator('#ko9-conjugation').innerText()).includes(d.forms[i].past));}
    for(let i=0;i<6;i++){await page.locator(`[data-ko9-animal="${i}"]`).click();assert.ok((await page.locator('#ko9-animal-result').innerText()).includes(d.zoo[i].text));assert.equal(await page.locator(`[data-ko9-animal="${i}"]`).getAttribute('aria-pressed'),'true');}
    await page.locator('[data-ko9-animal="3"]').click();assert.match(await page.locator('#ko9-animal-result').innerText(),/곰을 좋아해요/);
    await page.evaluate(()=>{speechSynthesis.speak=u=>{window.__spoken={text:u.text,lang:u.lang};};});
    await page.locator('#ko9-animal-result [data-speak-ko]').first().click();assert.equal(await page.evaluate(()=>window.__spoken.lang),'ko-KR');assert.equal(await page.evaluate(()=>window.__spoken.text),'곰');
    await page.locator('#ko9-companion').selectOption('1');await page.locator('#ko9-outing').selectOption('4');
    assert.match(await page.locator('#ko9-trip').innerText(),/친구하고 같이 놀이공원에 갔어요/);
    assert.match(await page.locator('#ko9-trip').innerText(),/회전목마를 탔어요/);
    for(const id of ['feed','enter','photo','show','touch']){await page.locator(`[data-ko9-activity="${id}"]`).click();assert.equal(await page.locator('#ko9-activity-result strong').innerText(),d.words[id].text);}
    assert.equal(await page.locator('#ko9-dialogue article').count(),15);
    await page.locator('#ko9-translation').click();assert.ok(await page.locator('#ko9-dialogue').evaluate(e=>e.classList.contains('ko5-hide-meaning')));
    await page.locator('[data-ko9-exercise]').click();assert.equal(await page.locator('#ko9-workbook [data-kwb-section]').inputValue(),'6');
    const wb=page.locator('#ko9-workbook');
    for(let section=0;section<d.workbook.sections.length;section++){
      await wb.locator('[data-kwb-section]').selectOption(String(section));const s=d.workbook.sections[section];
      assert.equal(await wb.locator('[data-kwb-question] option').count(),s.items.length);
      for(let i=0;i<s.items.length;i++){
        await wb.locator('[data-kwb-question]').selectOption(String(i));const q=s.items[i];
        if(s.type==='choice'){await wb.locator(`[data-kwb-choice="${q.options.findIndex(o=>o.text===q.answers[0])}"]`).click();assert.match(await wb.locator('.kwb-feedback').innerText(),/Đúng rồi/);}
        if(s.type==='exact'){await wb.locator('[data-kwb-draft]').fill(q.answers[0]);await wb.locator('[data-kwb-check]').click();assert.match(await wb.locator('.kwb-feedback').innerText(),/Đúng rồi/);}
        if(s.type==='order'){assert.ok(await wb.locator('[data-kwb-check]').isDisabled());for(let j=0;j<q.tokens.length;j++)await wb.locator(`[data-kwb-token="${j}"]`).click();await wb.locator('[data-kwb-check]').click();assert.ok((await wb.locator('.kwb-feedback').innerText()).includes(q.sample.text));}
      }
    }
    await wb.locator('[data-kwb-section]').selectOption('1');await wb.locator('[data-kwb-draft]').fill('힘들어요');await wb.locator('[data-kwb-check]').click();assert.match(await wb.locator('.kwb-feedback').innerText(),/Chưa đúng/);
    await wb.locator('[data-kwb-question]').selectOption('2');await wb.locator('[data-kwb-draft]').fill('공부하였어요');await wb.locator('[data-kwb-check]').click();assert.match(await wb.locator('.kwb-feedback').innerText(),/Đúng rồi/);
    await wb.locator('[data-kwb-section]').selectOption('4');await wb.locator('[data-kwb-draft]').fill('어제 동물원에 갔어요.');await wb.locator('[data-kwb-check]').click();assert.match(await wb.locator('.kwb-feedback').innerText(),/không phải đáp án duy nhất/);
    await page.locator('[data-korean-tab="ko-lesson-8"]').click();await page.locator('[data-korean-tab="ko-lesson-9"]').click();assert.equal(await wb.locator('[data-kwb-draft]').inputValue(),'어제 동물원에 갔어요.');
    await page.locator('#ko9-slide-filter').selectOption('vocab');assert.equal(await page.locator('#ko9-slide-grid .ko5-slide').count(),8);
    await page.locator('#ko9-slide-grid [data-open-ko-slide]').first().click();assert.ok(await page.locator('#koSlideDialog').isVisible());await page.keyboard.press('Escape');
    await page.locator('#ko9-slide-filter').selectOption('all');
    assert.equal(await page.locator('#ko9-slide-grid img').evaluateAll(async imgs=>{await Promise.all(imgs.map(i=>{i.loading='eager';return i.decode().catch(()=>{});}));return imgs.filter(i=>!i.naturalWidth).length;}),0);
    await page.locator('[data-ko9-complete]').click();assert.equal(await page.locator('#koStatCompleted').textContent(),'1/14');
    for(const width of [390,768,1440]){
      await page.setViewportSize({width,height:1000});
      for(const id of ['vocab','grammar','zoo','reading','practice','slides']){
        await page.locator(`.ko9-jumpbar [data-ko9-jump="${id}"]`).click();
        await page.waitForFunction(id=>{const el=document.querySelector('#ko9-'+id);return Math.abs(el.getBoundingClientRect().top-parseFloat(getComputedStyle(el).scrollMarginTop))<3;},id);
        assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)<=2,`overflow at ${width}/${id}`);
      }
      if(width!==768){await page.locator('.ko9-jumpbar [data-ko9-jump="zoo"]').click();await page.screenshot({path:path.join(root,`tmp/ko9-${width}.png`)});}
    }
    for(const section of ['grammar','reading','practice']){await page.locator(`.ko9-jumpbar [data-ko9-jump="${section}"]`).click();await page.screenshot({path:path.join(root,`tmp/ko9-${section}.png`)});}
    await page.reload();assert.equal(await page.locator('#koStatCompleted').textContent(),'1/14');assert.deepEqual(errors,[]);
    console.log('PASS: 27 slides, 39 annotated entries (30 core), 20 past forms, 56 exercises, 15 reading sentences, all 18 trip combinations, zoo numbering, source corrections, TTS, modal, saved progress, and 390/768/1440px layouts.');
  }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
