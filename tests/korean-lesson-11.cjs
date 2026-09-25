const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {pathToFileURL}=require('node:url');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),context={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'data/korean-lesson-11.js'),'utf8'),context);
const d=context.window.KOREAN_LESSON_ELEVEN;
assert.equal(d.slides.length,29);assert.equal(d.vocabulary.length,30);assert.equal(d.vocabulary.filter(w=>w.core).length,18);
assert.equal(new Set(d.vocabulary.map(w=>w.text)).size,30);assert.equal(d.forms.length,18);assert.equal(d.reading.length,10);
assert.equal(d.workbook.sections.reduce((n,s)=>n+s.items.length,0),58);
for(const s of d.slides){assert.ok(fs.statSync(path.join(root,`assets/korean/lesson-11/slides/slide-${String(s.page).padStart(2,'0')}.jpg`)).size>1000);for(const id of s.words)assert.ok(d.words[id]);}
for(const w of [...d.vocabulary,...d.reading,...d.mirror.flat()])for(const field of ['text','romanization','meaning'])assert.ok(w[field],`${w.text}: ${field}`);
for(const section of d.workbook.sections)for(const q of section.items){
  assert.ok(q.prompt&&q.sample.text&&q.sample.romanization&&q.sample.meaning,`${section.id}: missing annotation`);
  if(/[가-힣]/.test(q.prompt))assert.ok(q.promptRomanization,`${q.prompt}: missing romanization`);
  if(section.type==='choice')for(const a of q.answers)assert.ok(q.options.some(o=>o.text===a));
  if(section.type==='exact')assert.ok(q.answers.length);
  if(section.type==='order')assert.equal(q.tokens.length,q.tokenRoma.length);
}
assert.equal(d.forms[12].casual,'학생이야');assert.equal(d.forms[13].casual,'친구야');assert.equal(d.forms[14].casual,'할 거야');
assert.match(d.notes.join(' '),/thiếu audio/);assert.match(d.notes.join(' '),/평서/);
assert.equal(d.workbook.sections[5].items.map(q=>q.answers[0]).join(''),'OOOXOOXO');
assert.match(d.workbook.sections[5].items[4].explanation,/dự định/);
for(let a=0;a<8;a++)for(const p of [true,false])assert.doesNotMatch(JSON.stringify(d.routine(a,p)),/undefined|NaN/);
for(let p=0;p<2;p++)for(let l=0;l<8;l++)for(let g=0;g<8;g++)assert.doesNotMatch(JSON.stringify(d.interview(p,l,g)),/undefined|NaN/);
assert.equal(d.winners([0,0,0,0,0]).length,0);assert.equal(d.winners([2,2,1,0,0]).length,2);assert.equal(d.winners([0,0,1,0,0])[0].id,'badminton');
assert.throws(()=>d.winners([0,-1,0,0,0]));assert.throws(()=>d.winners([100,0,0,0,0]));assert.throws(()=>d.winners([1.5,0,0,0,0]));
(async()=>{
  const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_PATH||'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
  try{
    const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'}),errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto(process.env.TEST_URL||pathToFileURL(path.join(root,'index.html')).href,{waitUntil:'load'});
    await page.addStyleTag({content:'html, body, * { scroll-behavior: auto !important; }'});
    await page.locator('[data-enter-language="ko"]').click();await page.locator('[data-korean-tab="ko-lesson-11"]').click();
    await page.locator('#ko-lesson-11.active').waitFor();assert.equal(await page.locator('#koStatCompleted').textContent(),'0/15');
    assert.equal(await page.locator('#ko11-vocab-grid .ko5-word').count(),30);
    await page.locator('[data-ko11-filter="activities"]').click();assert.equal(await page.locator('#ko11-vocab-grid .ko5-word').count(),8);
    await page.locator('#ko11-search').fill('baiollineul');assert.equal(await page.locator('#ko11-vocab-grid h4').innerText(),'바이올린을 켜다');
    await page.locator('#ko11-search').fill('missingword');assert.ok(await page.locator('#ko11-vocab-grid .empty-state').isVisible());
    await page.locator('#ko11-search').fill('');await page.locator('[data-ko11-filter="all"]').click();
    for(let i=0;i<18;i++){await page.locator('#ko11-form').selectOption(String(i));assert.ok((await page.locator('#ko11-conjugation').innerText()).includes(d.forms[i].casual));}
    await page.locator('[data-ko11-activity="0"]').click();assert.ok(await page.locator('#ko11-routine .empty-state').isVisible());await page.locator('[data-ko11-activity="4"]').click();
    assert.match(await page.locator('#ko11-routine').innerText(),/나는 방과 후에 바이올린을 켜/);
    await page.locator('#ko11-register').selectOption('polite');assert.match(await page.locator('#ko11-routine').innerText(),/저는 방과 후에 바이올린을 켜요/);
    await page.locator('[data-ko11-activity="2"]').click();assert.equal(await page.locator('#ko11-routine .ko5-line').count(),2);
    await page.evaluate(()=>{speechSynthesis.speak=u=>{window.__spoken={text:u.text,lang:u.lang};};});await page.locator('#ko11-routine [data-speak-ko]').first().click();assert.equal(await page.evaluate(()=>window.__spoken.lang),'ko-KR');
    await page.locator('#ko11-person').selectOption('1');await page.locator('#ko11-like').selectOption('4');await page.locator('#ko11-good').selectOption('0');assert.match(await page.locator('#ko11-interview').innerText(),/다니엘은 바이올린을 좋아해/);assert.match(await page.locator('#ko11-interview').innerText(),/태권도를 잘해/);
    assert.match(await page.locator('#ko11-poll').innerText(),/Chưa có phiếu/);await page.locator('[data-ko11-vote="0"]').fill('3');await page.locator('[data-ko11-vote="1"]').fill('3');assert.match(await page.locator('#ko11-poll').innerText(),/Đồng hạng nhất/);
    for(const invalid of ['-1','100','1.5']){await page.locator('[data-ko11-vote="2"]').fill(invalid);assert.ok(await page.locator('#ko11-vote-error').isVisible());assert.equal(await page.locator('#ko11-poll').innerText(),'');}
    await page.locator('[data-ko11-vote="2"]').fill('4');assert.match(await page.locator('#ko11-poll').innerText(),/Hạng nhất/);assert.doesNotMatch(await page.locator('#ko11-poll').innerText(),/Đồng hạng/);
    await page.locator('#ko11-reset-votes').click();assert.match(await page.locator('#ko11-poll').innerText(),/Chưa có phiếu/);
    for(let i=0;i<3;i++){assert.ok((await page.locator('#ko11-mirror').innerText()).includes(d.mirror[i][0].text));assert.equal(await page.locator('#ko11-mirror .ko11-mirror-answer').count(),0);await page.locator('#ko11-reveal').click();assert.ok((await page.locator('#ko11-mirror').innerText()).includes(d.mirror[i][1].text));await page.locator('#ko11-next-mirror').click();}
    await page.locator('#ko11-draft').fill('나는 피아노를 쳐.');await page.locator('[data-korean-tab="ko-lesson-10"]').click();await page.locator('[data-korean-tab="ko-lesson-11"]').click();assert.equal(await page.locator('#ko11-draft').inputValue(),'나는 피아노를 쳐.');
    assert.equal(await page.locator('#ko11-dialogue article').count(),10);await page.locator('#ko11-translation').click();assert.ok(await page.locator('#ko11-dialogue').evaluate(e=>e.classList.contains('ko5-hide-meaning')));
    await page.locator('[data-ko11-exercise]').click();assert.equal(await page.locator('#ko11-workbook [data-kwb-section]').inputValue(),'5');
    const wb=page.locator('#ko11-workbook');
    for(let section=0;section<d.workbook.sections.length;section++){
      await wb.locator('[data-kwb-section]').selectOption(String(section));const s=d.workbook.sections[section];assert.equal(await wb.locator('[data-kwb-question] option').count(),s.items.length);
      for(let i=0;i<s.items.length;i++){
        await wb.locator('[data-kwb-question]').selectOption(String(i));const q=s.items[i];
        if(s.type==='choice'){await wb.locator(`[data-kwb-choice="${q.options.findIndex(o=>o.text===q.answers[0])}"]`).click();assert.match(await wb.locator('.kwb-feedback').innerText(),/Đúng rồi/);}
        if(s.type==='exact'){assert.equal(await wb.locator('.kwb-question label').innerText(),'Câu trả lời của bạn');await wb.locator('[data-kwb-draft]').fill(q.answers[0]);await wb.locator('[data-kwb-check]').click();assert.match(await wb.locator('.kwb-feedback').innerText(),/Đúng rồi/);}
        if(s.type==='order'){assert.ok(await wb.locator('[data-kwb-check]').isDisabled());for(let j=0;j<q.tokens.length;j++)await wb.locator(`[data-kwb-token="${j}"]`).click();await wb.locator('[data-kwb-check]').click();assert.ok((await wb.locator('.kwb-feedback').innerText()).includes(q.sample.text));}
        if(s.type==='open'){await wb.locator('[data-kwb-draft]').fill(q.sample.text);await wb.locator('[data-kwb-check]').click();assert.match(await wb.locator('.kwb-feedback').innerText(),/không phải đáp án duy nhất/);}
      }
    }
    await wb.locator('[data-kwb-section]').selectOption('0');await wb.locator('[data-kwb-draft]').fill('해요');await wb.locator('[data-kwb-check]').click();assert.match(await wb.locator('.kwb-feedback').innerText(),/Chưa đúng/);
    await page.locator('#ko11-slide-filter').selectOption('vocab');assert.equal(await page.locator('#ko11-slide-grid .ko5-slide').count(),5);await page.locator('#ko11-slide-grid [data-open-ko-slide]').first().click();assert.ok(await page.locator('#koSlideDialog').isVisible());await page.keyboard.press('Escape');await page.locator('#ko11-slide-filter').selectOption('all');
    assert.equal(await page.locator('#ko11-slide-grid img').evaluateAll(async imgs=>{await Promise.all(imgs.map(i=>{i.loading='eager';return i.decode().catch(()=>{});}));return imgs.filter(i=>!i.naturalWidth).length;}),0);
    await page.locator('[data-ko11-complete]').click();assert.equal(await page.locator('#koStatCompleted').textContent(),'1/15');
    for(const width of [390,768,1440]){
      await page.setViewportSize({width,height:1000});
      for(const id of ['vocab','grammar','friends','reading','practice','slides']){await page.locator(`.ko11-jumpbar [data-ko11-jump="${id}"]`).click();await page.waitForFunction(id=>{const el=document.querySelector('#ko11-'+id);return Math.abs(el.getBoundingClientRect().top-parseFloat(getComputedStyle(el).scrollMarginTop))<3;},id);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)<=2,`overflow at ${width}/${id}`);}
      if(width!==768){await page.locator('.ko11-jumpbar [data-ko11-jump="friends"]').click();await page.screenshot({path:path.join(root,`tmp/ko11-${width}.png`)});}
    }
    for(const section of ['grammar','reading','practice']){await page.locator(`.ko11-jumpbar [data-ko11-jump="${section}"]`).click();await page.screenshot({path:path.join(root,`tmp/ko11-${section}.png`)});}
    await page.locator('[data-ko11-vote="0"]').fill('3');await page.locator('[data-ko11-vote="1"]').fill('3');await page.locator('#ko11-poll').evaluate(e=>window.scrollTo(0,scrollY+e.getBoundingClientRect().top-235));await page.screenshot({path:path.join(root,'tmp/ko11-poll.png')});
    await page.reload();assert.equal(await page.locator('#koStatCompleted').textContent(),'1/15');assert.deepEqual(errors,[]);
    console.log('PASS: 29 slides, 30 entries (18 core), 18 register pairs, 58 exercises, 10 dialogue turns, 16 routines, 128 interviews, poll validation/ties/reset, mirror game, TTS, modal, drafts, progress and 390/768/1440px layouts.');
  }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
