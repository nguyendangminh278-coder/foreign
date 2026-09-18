const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {pathToFileURL}=require('node:url');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),context={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'data/korean-lesson-8.js'),'utf8'),context);
const d=context.window.KOREAN_LESSON_EIGHT;
assert.equal(d.slides.length,36);
assert.equal(d.vocabulary.length,64);
assert.equal(d.vocabulary.filter(w=>w.core).length,41);
assert.equal(new Set(d.vocabulary.map(w=>w.text)).size,64);
assert.equal(d.reading.reduce((n,r)=>n+r.lines.length,0),15);
assert.equal(d.workbook.sections.reduce((n,s)=>n+s.items.length,0),67);
for(const s of d.slides){assert.ok(fs.statSync(path.join(root,`assets/korean/lesson-8/slides/slide-${String(s.page).padStart(2,'0')}.jpg`)).size>1000);for(const id of s.words)assert.ok(d.words[id]);}
for(const w of d.vocabulary)for(const field of ['text','romanization','meaning'])assert.ok(w[field],`${w.id}: ${field}`);
for(const section of d.workbook.sections)for(const q of section.items){
  assert.ok(q.prompt&&q.sample.text&&q.sample.romanization&&q.sample.meaning,`${section.id}: missing annotation`);
  if(/[가-힣]/.test(q.prompt))assert.ok(q.promptRomanization,`${q.prompt}: missing romanization`);
  if(section.type==='choice')for(const a of q.answers)assert.ok(q.options.some(o=>o.text===a));
  if(section.type==='exact')assert.ok(q.answers.length);
}
assert.equal(d.months[5].text,'유월');assert.equal(d.months[9].text,'시월');
assert.equal(d.forms.find(f=>f.text==='만들다').future,'만들 거예요');
assert.equal(d.forms.find(f=>f.text==='읽다').future,'읽을 거예요');
assert.match(d.workbook.sections[1].items[8].explanation,/Đã sửa khung câu 9/);
assert.equal(d.reading[2].day,17);assert.equal(d.reading[2].month,11);
assert.match(d.time(12,0,'pm').meaning,/trưa/);assert.match(d.time(12,0,'am').meaning,/đêm/);
assert.equal(d.time(4,30,'',true).text,'네 시 반');
assert.throws(()=>d.date(4,31));assert.throws(()=>d.date(2,30));assert.throws(()=>d.date(13,1));
assert.throws(()=>d.time(13,0));assert.throws(()=>d.time(3,60));
for(let month=1;month<=12;month++)for(let day=1;day<=d.maxDay(month);day++)assert.ok(d.date(month,day).romanization);
for(let hour=1;hour<=12;hour++)for(const minute of d.minutes)for(const period of ['am','pm'])for(const half of [false,true]){
  const s=d.time(hour,minute.number,period,half);assert.doesNotMatch(s.text+s.romanization+s.meaning,/undefined|NaN/);
}
for(let venue=0;venue<4;venue++)for(let activity=0;activity<4;activity++)for(let food=0;food<4;food++){
  const result=d.partyPlan(11,17,12,30,'pm',venue,activity,food);assert.equal(result.length,4);for(const s of result)assert.doesNotMatch(s.text+s.romanization+s.meaning,/undefined|NaN/);
}
(async()=>{
  const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_PATH||'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
  try{
    const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'}),errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto(process.env.TEST_URL||pathToFileURL(path.join(root,'index.html')).href,{waitUntil:'load'});
    await page.addStyleTag({content:'html, body, * { scroll-behavior: auto !important; }'});
    await page.locator('[data-enter-language="ko"]').click();await page.locator('[data-korean-tab="ko-lesson-8"]').click();
    await page.locator('#ko-lesson-8.active').waitFor();assert.equal(await page.locator('#koStatCompleted').textContent(),'0/12');
    assert.equal(await page.locator('#ko8-vocab-grid .ko5-word').count(),64);
    await page.locator('[data-ko8-filter="months"]').click();assert.equal(await page.locator('#ko8-vocab-grid .ko5-word').count(),12);
    await page.locator('#ko8-search').fill('yuwol');assert.equal(await page.locator('#ko8-vocab-grid h4').innerText(),'유월');
    await page.locator('#ko8-search').fill('missingword');assert.ok(await page.locator('#ko8-vocab-grid .empty-state').isVisible());
    await page.locator('#ko8-search').fill('');await page.locator('[data-ko8-filter="all"]').click();
    await page.locator('#ko8-verb').selectOption('4');assert.match(await page.locator('#ko8-conjugation').innerText(),/만들 거예요/);assert.doesNotMatch(await page.locator('#ko8-conjugation').innerText(),/만들을/);
    await page.locator('#ko8-hour').selectOption('9');await page.locator('#ko8-minute').selectOption('15');
    assert.match(await page.locator('#ko8-time-result').innerText(),/아홉 시 십오 분/);assert.ok(await page.locator('#ko8-half').isDisabled());
    assert.match(await page.locator('[data-hour-hand]').getAttribute('transform'),/277.5/);
    assert.match(await page.locator('[data-minute-hand]').getAttribute('transform'),/90/);
    await page.locator('#ko8-minute').selectOption('30');assert.match(await page.locator('#ko8-time-result strong').innerText(),/아홉 시 반/);
    await page.locator('#ko8-half').uncheck();assert.match(await page.locator('#ko8-time-result strong').innerText(),/삼십 분/);
    await page.evaluate(()=>{speechSynthesis.speak=u=>{window.__spoken={text:u.text,lang:u.lang};};});
    await page.locator('#ko8-time-result [data-speak-ko]').click();assert.equal(await page.evaluate(()=>window.__spoken.lang),'ko-KR');assert.match(await page.evaluate(()=>window.__spoken.text),/삼십 분/);
    await page.locator('#ko8-month').selectOption('1');await page.locator('#ko8-day').selectOption('31');await page.locator('#ko8-month').selectOption('2');
    assert.equal(await page.locator('#ko8-day').inputValue(),'29');assert.equal(await page.locator('#ko8-day option').count(),29);
    await page.locator('#ko8-month').selectOption('6');assert.match(await page.locator('#ko8-date-result').innerText(),/유월/);
    for(let i=0;i<3;i++){await page.locator(`[data-ko8-person="${i}"]`).click();assert.equal(await page.locator('#ko8-dialogue article').count(),5);assert.match(await page.locator('#ko8-dialogue').innerText(),new RegExp(d.reading[i].lines[0].text.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')));}
    await page.locator('#ko8-translation').click();assert.ok(await page.locator('#ko8-dialogue').evaluate(e=>e.classList.contains('ko5-hide-meaning')));
    await page.locator('#ko8-party-month').selectOption('1');await page.locator('#ko8-party-day').selectOption('31');await page.locator('#ko8-party-month').selectOption('4');assert.equal(await page.locator('#ko8-party-day').inputValue(),'30');
    await page.locator('#ko8-party-activity').selectOption('2');await page.locator('#ko8-party-venue').selectOption('0');await page.locator('#ko8-party-food').selectOption('3');
    assert.match(await page.locator('#ko8-party-result').innerText(),/게임을 할 거예요/);assert.match(await page.locator('#ko8-party-result').innerText(),/피자를 먹을 거예요/);
    assert.doesNotMatch(await page.locator('#ko8-party-result').innerText(),/undefined|NaN/);
    const wb=page.locator('#ko8-workbook');
    for(let section=0;section<d.workbook.sections.length;section++){
      await wb.locator('[data-kwb-section]').selectOption(String(section));const items=d.workbook.sections[section].items;
      assert.equal(await wb.locator('[data-kwb-question] option').count(),items.length);
      if(d.workbook.sections[section].type==='choice')for(let i=0;i<items.length;i++){
        await wb.locator('[data-kwb-question]').selectOption(String(i));const choice=items[i].options.findIndex(o=>o.text===items[i].answers[0]);
        await wb.locator(`[data-kwb-choice="${choice}"]`).click();assert.match(await wb.locator('.kwb-feedback').innerText(),/Đúng rồi/);
      }
    }
    await wb.locator('[data-kwb-section]').selectOption('2');await wb.locator('[data-kwb-question]').selectOption('1');
    await wb.locator('[data-kwb-draft]').fill('공부 안 해요');await wb.locator('[data-kwb-check]').click();assert.match(await wb.locator('.kwb-feedback').innerText(),/Đúng rồi/);
    await wb.locator('[data-kwb-section]').selectOption('3');await wb.locator('[data-kwb-draft]').fill('만날 거에요');await wb.locator('[data-kwb-check]').click();assert.match(await wb.locator('.kwb-feedback').innerText(),/Chưa đúng/);
    await wb.locator('[data-kwb-draft]').fill('만날 거예요');await wb.locator('[data-kwb-check]').click();assert.match(await wb.locator('.kwb-feedback').innerText(),/Đúng rồi/);
    await wb.locator('[data-kwb-section]').selectOption('1');await wb.locator('[data-kwb-question]').selectOption('8');
    await wb.locator('[data-kwb-draft]').fill('친구와 같이 춤을 출 거예요.');await wb.locator('[data-kwb-check]').click();assert.match(await wb.locator('.kwb-feedback').innerText(),/Đã sửa khung câu 9/);
    await page.locator('[data-korean-tab="ko-lesson-7"]').click();await page.locator('[data-korean-tab="ko-lesson-8"]').click();assert.equal(await wb.locator('[data-kwb-draft]').inputValue(),'친구와 같이 춤을 출 거예요.');
    await page.locator('#ko8-slide-filter').selectOption('vocab');assert.equal(await page.locator('#ko8-slide-grid .ko5-slide').count(),8);
    await page.locator('#ko8-slide-grid [data-open-ko-slide]').first().click();assert.ok(await page.locator('#koSlideDialog').isVisible());await page.keyboard.press('Escape');
    await page.locator('#ko8-slide-filter').selectOption('all');
    assert.equal(await page.locator('#ko8-slide-grid img').evaluateAll(async imgs=>{await Promise.all(imgs.map(i=>{i.loading='eager';return i.decode().catch(()=>{});}));return imgs.filter(i=>!i.naturalWidth).length;}),0);
    await page.locator('[data-ko8-complete]').click();assert.equal(await page.locator('#koStatCompleted').textContent(),'1/12');
    for(const width of [390,768,1440]){
      await page.setViewportSize({width,height:1000});
      for(const id of ['vocab','grammar','time','birthday','practice','slides']){
        await page.locator(`.ko8-jumpbar [data-ko8-jump="${id}"]`).click();
        await page.waitForFunction(id=>{const el=document.querySelector('#ko8-'+id);return Math.abs(el.getBoundingClientRect().top-parseFloat(getComputedStyle(el).scrollMarginTop))<3;},id);
        assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)<=2,`overflow at ${width}/${id}`);
      }
      if(width!==768){await page.locator('.ko8-jumpbar [data-ko8-jump="time"]').click();await page.screenshot({path:path.join(root,`tmp/ko8-${width}.png`)});}
    }
    await page.locator('#ko8-party-result').evaluate(el=>window.scrollTo(0,scrollY+el.getBoundingClientRect().top-235));
    await page.waitForFunction(()=>Math.abs(document.querySelector('#ko8-party-result').getBoundingClientRect().top-235)<3);
    await page.screenshot({path:path.join(root,'tmp/ko8-party.png')});
    for(const section of ['grammar','birthday']){
      await page.locator(`.ko8-jumpbar [data-ko8-jump="${section}"]`).click();
      await page.waitForFunction(id=>Math.abs(document.querySelector('#ko8-'+id).getBoundingClientRect().top-235)<3,section);
      await page.screenshot({path:path.join(root,`tmp/ko8-${section}.png`)});
    }
    await page.reload();assert.equal(await page.locator('#koStatCompleted').textContent(),'1/12');assert.deepEqual(errors,[]);
    console.log('PASS: 36 source pages, 64 annotated entries (41 core), 67 exercises, 15 reading sentences, all 366 month/day combinations, 384 time variants, 64 party combinations, source correction, conjugations, TTS, modal, progress and 390/768/1440px layouts.');
  }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
