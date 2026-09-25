const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {pathToFileURL}=require('node:url');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),context={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'data/korean-lesson-10.js'),'utf8'),context);
const d=context.window.KOREAN_LESSON_TEN;
assert.equal(d.slides.length,29);assert.equal(d.vocabulary.length,53);assert.equal(d.vocabulary.filter(w=>w.core).length,30);
assert.equal(new Set(d.vocabulary.map(w=>w.text)).size,53);assert.equal(d.forms.length,13);assert.equal(d.progressive.length,8);assert.equal(d.reading.length,10);
assert.equal(d.workbook.sections.reduce((n,s)=>n+s.items.length,0),57);
for(const s of d.slides){assert.ok(fs.statSync(path.join(root,`assets/korean/lesson-10/slides/slide-${String(s.page).padStart(2,'0')}.jpg`)).size>1000);for(const id of s.words)assert.ok(d.words[id]);}
for(const w of [...d.vocabulary,...d.reading,...d.weather])for(const field of ['text','romanization','meaning'])assert.ok(w[field],`${w.text}: ${field}`);
for(const section of d.workbook.sections)for(const q of section.items){
  assert.ok(q.prompt&&q.sample.text&&q.sample.romanization&&q.sample.meaning,`${section.id}: missing annotation`);
  if(/[가-힣]/.test(q.prompt))assert.ok(q.promptRomanization,`${q.prompt}: missing romanization`);
  if(section.type==='choice')for(const a of q.answers)assert.ok(q.options.some(o=>o.text===a));
  if(section.type==='exact')assert.ok(q.answers.length);
  if(section.type==='order')assert.equal(q.tokens.length,q.tokenRoma.length);
}
assert.equal(d.forms.filter(f=>f.irregular).length,9);
assert.equal(d.forms.find(f=>f.id==='wear').present,'입어요');assert.equal(d.forms.find(f=>f.id==='easy').present,'쉬워요');
assert.equal(d.progressive[7].present,'걷고 있어요');assert.equal(d.workbook.sections[2].items[1].answers.join(','),'펴요,피어요');
for(const q of d.workbook.sections[2].items.slice(2))assert.equal(q.answers.length,2);
assert.equal(d.workbook.sections[6].items.map(q=>q.answers[0]).join(''),'XOX');
assert.ok(d.notes.some(n=>n.includes('Steve')&&n.includes('không suy đoán')));
for(let c=0;c<3;c++)for(let w=0;w<8;w++){const s=d.forecast(c,w);assert.doesNotMatch(s.text+s.romanization+s.meaning,/undefined|NaN/);}
assert.throws(()=>d.forecast(3,0));
(async()=>{
  const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_PATH||'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
  try{
    const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'}),errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto(process.env.TEST_URL||pathToFileURL(path.join(root,'index.html')).href,{waitUntil:'load'});
    await page.addStyleTag({content:'html, body, * { scroll-behavior: auto !important; }'});
    await page.locator('[data-enter-language="ko"]').click();await page.locator('[data-korean-tab="ko-lesson-10"]').click();
    await page.locator('#ko-lesson-10.active').waitFor();assert.equal(await page.locator('#koStatCompleted').textContent(),'0/15');
    assert.equal(await page.locator('#ko10-vocab-grid .ko5-word').count(),53);
    await page.locator('[data-ko10-filter="weather"]').click();assert.equal(await page.locator('#ko10-vocab-grid .ko5-word').count(),8);
    await page.locator('#ko10-search').fill('chupda');assert.equal(await page.locator('#ko10-vocab-grid h4').innerText(),'춥다');
    await page.locator('#ko10-search').fill('missingword');assert.ok(await page.locator('#ko10-vocab-grid .empty-state').isVisible());
    await page.locator('#ko10-search').fill('');await page.locator('[data-ko10-filter="all"]').click();
    for(const [mode,forms] of [['irregular',d.forms],['progressive',d.progressive]]){
      await page.locator('#ko10-form-mode').selectOption(mode);
      for(let i=0;i<forms.length;i++){await page.locator('#ko10-verb').selectOption(String(i));assert.ok((await page.locator('#ko10-conjugation').innerText()).includes(forms[i].present));}
    }
    assert.doesNotMatch(await page.locator('#ko10-conjugation').innerText(),/걸고/);
    for(let i=0;i<4;i++){await page.locator(`[data-ko10-season="${i}"]`).click();assert.ok((await page.locator('#ko10-season-result').innerText()).includes(d.seasons[i].activity.text));}
    for(let c=0;c<3;c++)for(let w=0;w<8;w++){await page.locator('#ko10-city').selectOption(String(c));await page.locator('#ko10-weather-choice').selectOption(String(w));assert.equal(await page.locator('#ko10-forecast strong').innerText(),d.forecast(c,w).text);}
    await page.evaluate(()=>{speechSynthesis.speak=u=>{window.__spoken={text:u.text,lang:u.lang};};});
    await page.locator('#ko10-forecast [data-speak-ko]').click();assert.equal(await page.evaluate(()=>window.__spoken.lang),'ko-KR');assert.equal(await page.evaluate(()=>window.__spoken.text),d.forecast(2,7).text);
    const canvas=page.locator('#ko10-canvas');await canvas.scrollIntoViewIfNeeded();const box=await canvas.boundingBox();
    await page.mouse.move(box.x+40,box.y+40);await page.mouse.down();await page.mouse.move(box.x+150,box.y+80,{steps:8});await page.mouse.up();
    const painted=()=>canvas.evaluate(c=>c.getContext('2d').getImageData(0,0,c.width,c.height).data.some(v=>v>0));
    assert.ok(await painted());await page.locator('#ko10-story').fill('저는 겨울을 좋아해요.');
    await page.locator('[data-korean-tab="ko-lesson-9"]').click();await page.locator('[data-korean-tab="ko-lesson-10"]').click();
    assert.ok(await painted());assert.equal(await page.locator('#ko10-story').inputValue(),'저는 겨울을 좋아해요.');await page.locator('#ko10-clear').click();assert.equal(await painted(),false);
    assert.equal(await page.locator('#ko10-dialogue article').count(),10);await page.locator('#ko10-translation').click();assert.ok(await page.locator('#ko10-dialogue').evaluate(e=>e.classList.contains('ko5-hide-meaning')));
    await page.locator('[data-ko10-exercise]').click();assert.equal(await page.locator('#ko10-workbook [data-kwb-section]').inputValue(),'6');
    const wb=page.locator('#ko10-workbook');
    for(let section=0;section<d.workbook.sections.length;section++){
      await wb.locator('[data-kwb-section]').selectOption(String(section));const s=d.workbook.sections[section];assert.equal(await wb.locator('[data-kwb-question] option').count(),s.items.length);
      for(let i=0;i<s.items.length;i++){
        await wb.locator('[data-kwb-question]').selectOption(String(i));const q=s.items[i];
        if(s.type==='choice')for(const answer of q.answers){await wb.locator('[data-kwb-reset]').click();await wb.locator(`[data-kwb-choice="${q.options.findIndex(o=>o.text===answer)}"]`).click();assert.match(await wb.locator('.kwb-feedback').innerText(),/Đúng rồi/);}
        if(s.type==='exact'){await wb.locator('[data-kwb-draft]').fill(q.answers[0]);await wb.locator('[data-kwb-check]').click();assert.match(await wb.locator('.kwb-feedback').innerText(),/Đúng rồi/);}
        if(s.type==='order'){assert.ok(await wb.locator('[data-kwb-check]').isDisabled());for(let j=0;j<q.tokens.length;j++)await wb.locator(`[data-kwb-token="${j}"]`).click();await wb.locator('[data-kwb-check]').click();assert.ok((await wb.locator('.kwb-feedback').innerText()).includes(q.sample.text));}
        if(s.type==='open'){await wb.locator('[data-kwb-draft]').fill(q.sample.text);await wb.locator('[data-kwb-check]').click();assert.match(await wb.locator('.kwb-feedback').innerText(),/không phải đáp án duy nhất/);}
      }
    }
    await wb.locator('[data-kwb-section]').selectOption('0');await wb.locator('[data-kwb-question]').selectOption('7');await wb.locator('[data-kwb-draft]').fill('걸고 있어요');await wb.locator('[data-kwb-check]').click();assert.match(await wb.locator('.kwb-feedback').innerText(),/Chưa đúng/);
    await page.locator('#ko10-slide-filter').selectOption('vocab');assert.equal(await page.locator('#ko10-slide-grid .ko5-slide').count(),7);
    await page.locator('#ko10-slide-grid [data-open-ko-slide]').first().click();assert.ok(await page.locator('#koSlideDialog').isVisible());await page.keyboard.press('Escape');await page.locator('#ko10-slide-filter').selectOption('all');
    assert.equal(await page.locator('#ko10-slide-grid img').evaluateAll(async imgs=>{await Promise.all(imgs.map(i=>{i.loading='eager';return i.decode().catch(()=>{});}));return imgs.filter(i=>!i.naturalWidth).length;}),0);
    await page.locator('[data-ko10-complete]').click();assert.equal(await page.locator('#koStatCompleted').textContent(),'1/15');
    for(const width of [390,768,1440]){
      await page.setViewportSize({width,height:1000});
      for(const id of ['vocab','grammar','weather','reading','practice','slides']){
        await page.locator(`.ko10-jumpbar [data-ko10-jump="${id}"]`).click();
        await page.waitForFunction(id=>{const el=document.querySelector('#ko10-'+id);return Math.abs(el.getBoundingClientRect().top-parseFloat(getComputedStyle(el).scrollMarginTop))<3;},id);
        assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)<=2,`overflow at ${width}/${id}`);
      }
      if(width!==768){await page.locator('.ko10-jumpbar [data-ko10-jump="weather"]').click();await page.screenshot({path:path.join(root,`tmp/ko10-${width}.png`)});}
    }
    for(const section of ['grammar','reading','practice']){await page.locator(`.ko10-jumpbar [data-ko10-jump="${section}"]`).click();await page.screenshot({path:path.join(root,`tmp/ko10-${section}.png`)});}
    await page.reload();assert.equal(await page.locator('#koStatCompleted').textContent(),'1/15');assert.deepEqual(errors,[]);
    console.log('PASS: 29 slides, 53 annotated entries (30 core), 21 forms, 57 exercises including multiple valid answers, 10 dialogue turns, 24 weather combinations, canvas/drafts, TTS, modal, saved progress and 390/768/1440px layouts.');
  }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
