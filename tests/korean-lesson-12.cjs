const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {pathToFileURL}=require('node:url'),{chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),context={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'data/korean-lesson-12.js'),'utf8'),context);
const d=context.window.KOREAN_LESSON_TWELVE;
assert.equal(d.slides.length,35);assert.equal(d.vocabulary.length,44);assert.equal(d.vocabulary.filter(w=>w.core).length,29);assert.equal(new Set(d.vocabulary.map(w=>w.text)).size,44);
assert.equal(d.forms.length,13);assert.equal(d.reading.length,13);assert.equal(d.workbook.sections.reduce((n,s)=>n+s.items.length,0),61);
for(const s of d.slides){assert.ok(fs.statSync(path.join(root,`assets/korean/lesson-12/slides/slide-${String(s.page).padStart(2,'0')}.jpg`)).size>1000);for(const id of s.words)assert.ok(d.words[id]);}
for(const w of [...d.vocabulary,...d.reading,...d.roleplay])for(const field of ['text','romanization','meaning'])assert.ok(w[field],`${w.text}: ${field}`);
for(const section of d.workbook.sections)for(const q of section.items){
  assert.ok(q.prompt&&q.sample.text&&q.sample.romanization&&q.sample.meaning,`${section.id}: missing annotation`);
  if(/[가-힣]/.test(q.prompt))assert.ok(q.promptRomanization,`${q.prompt}: missing romanization`);
  if(section.type==='choice')for(const a of q.answers)assert.ok(q.options.some(o=>o.text===a));
  if(section.type==='exact')assert.ok(q.answers.length);
  if(section.type==='order')assert.equal(q.tokens.length,q.tokenRoma.length);
}
assert.equal(d.forms[6].request,'들으세요');assert.equal(d.forms[6].want,'듣고 싶어요');assert.equal(d.forms[9].request,'만드세요');assert.equal(d.forms[9].want,'만들고 싶어요');
assert.equal(d.menu.map(w=>w.price).join(','),'7,7,6,5,5,9,8,7');
assert.equal(d.basket([1,1,1,0,0,0,0,0]).remaining,0);assert.equal(d.basket([1,1,1,1,0,0,0,0]).remaining,-5);
assert.equal(d.basket(Array(8).fill(0)).count,0);assert.throws(()=>d.basket([1]));assert.throws(()=>d.basket(Array(8).fill(-1)));assert.throws(()=>d.basket(Array(8).fill(10)));assert.throws(()=>d.basket(Array(8).fill(.5)));
for(let mask=0;mask<256;mask++){const q=Array.from({length:8},(_,i)=>(mask>>i)&1),b=d.basket(q);assert.equal(b.total,q.reduce((n,v,i)=>n+v*d.menu[i].price,0));assert.equal(b.remaining,20-b.total);}
for(const w of d.menu)assert.ok(d.wantFood(w.id).text.includes(w.text));
assert.equal(d.workbook.sections[5].items.map(q=>q.answers[0]).join(''),'XOX');assert.equal(d.workbook.sections[6].items.map(q=>q.answers[0]).join(''),'OXOOOX');
assert.match(d.notes.join(' '),/thiếu audio/);assert.match(d.notes.join(' '),/thẻ rời/);
(async()=>{
  const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_PATH||'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
  try{
    const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'}),errors=[];
    page.on('pageerror',e=>errors.push(e.message));await page.goto(process.env.TEST_URL||pathToFileURL(path.join(root,'index.html')).href,{waitUntil:'load'});
    await page.addStyleTag({content:'html, body, * { scroll-behavior: auto !important; }'});await page.locator('[data-enter-language="ko"]').click();await page.locator('[data-korean-tab="ko-lesson-12"]').click();
    await page.locator('#ko-lesson-12.active').waitFor();assert.equal(await page.locator('#koStatCompleted').textContent(),'0/17');assert.equal(await page.locator('#ko12-vocab-grid .ko5-word').count(),44);
    await page.locator('[data-ko12-filter="ingredients"]').click();assert.equal(await page.locator('#ko12-vocab-grid .ko5-word').count(),4);await page.locator('#ko12-search').fill('gyeran');assert.equal(await page.locator('#ko12-vocab-grid h4').innerText(),'계란');
    await page.locator('#ko12-search').fill('missingword');assert.ok(await page.locator('#ko12-vocab-grid .empty-state').isVisible());await page.locator('#ko12-search').fill('');await page.locator('[data-ko12-filter="all"]').click();
    for(let i=0;i<13;i++){await page.locator('#ko12-verb').selectOption(String(i));const text=await page.locator('#ko12-conjugation').innerText();assert.ok(text.includes(d.forms[i].request)&&text.includes(d.forms[i].want));}
    for(let i=0;i<3;i++)await page.locator(`[data-ko12-qty="${i}"]`).fill('1');assert.match(await page.locator('#ko12-basket').innerText(),/\$20/);assert.match(await page.locator('#ko12-basket').innerText(),/\$0/);assert.equal(await page.locator('#ko12-basket .over').count(),0);
    await page.locator('[data-ko12-qty="3"]').fill('1');assert.match(await page.locator('#ko12-basket .over').innerText(),/\$25/);assert.match(await page.locator('#ko12-basket .over').innerText(),/\$5/);
    for(const value of ['-1','10','0.5']){await page.locator('[data-ko12-qty="4"]').fill(value);assert.match(await page.locator('#ko12-basket').innerText(),/Chưa tính tổng/);}await page.locator('[data-ko12-qty="4"]').fill('0');
    await page.locator('[data-ko12-tried="0"]').check();await page.locator('[data-ko12-spicy="5"]').check();await page.locator('#ko12-reset-basket').click();assert.match(await page.locator('#ko12-basket').innerText(),/0 phần/);assert.ok(await page.locator('[data-ko12-tried="0"]').isChecked());
    for(let i=0;i<5;i++){await page.locator('#ko12-wish').selectOption(String(i));assert.ok((await page.locator('#ko12-wish-result').innerText()).includes(d.wishes[i].want.text));}
    for(let i=0;i<8;i++){await page.locator(`[data-ko12-role="${i}"]`).click();assert.match(await page.locator('#ko12-role-result').innerText(),new RegExp('LƯỢT '+(i+1)));}
    await page.locator('[data-ko12-role="5"]').click();await page.locator('#ko12-role-food').selectOption('1');assert.match(await page.locator('#ko12-role-result').innerText(),/만두 하나 주세요/);
    await page.evaluate(()=>{speechSynthesis.speak=u=>{window.__spoken={text:u.text,lang:u.lang};};});await page.locator('#ko12-role-result [data-speak-ko]').click();assert.equal(await page.evaluate(()=>window.__spoken.lang),'ko-KR');assert.match(await page.evaluate(()=>window.__spoken.text),/만두/);
    await page.getByText('Tự xếp tám lượt hội thoại',{exact:true}).click();assert.ok(await page.locator('#ko12-role-check').isDisabled());for(const id of [0,1,2,3,4,5,6,7])await page.locator(`[data-ko12-card="${id}"]`).click();assert.equal(await page.locator('#ko12-built button').count(),8);await page.locator('#ko12-role-check').click();assert.equal(await page.locator('#ko12-role-feedback article').count(),8);
    await page.locator('[data-ko12-remove="0"]').click();assert.ok(await page.locator('#ko12-role-check').isDisabled());assert.equal(await page.locator('#ko12-role-feedback').innerText(),'');
    await page.locator('[data-ko12-ingredient="0"]').click();await page.locator('[data-ko12-ingredient="5"]').click();assert.equal(await page.locator('#ko12-ingredients .ko5-line').count(),2);await page.locator('[data-ko12-type="2"]').check();
    await page.locator('#ko12-draft').fill('저는 만두를 먹고 싶어요.');await page.locator('[data-korean-tab="ko-lesson-11"]').click();await page.locator('[data-korean-tab="ko-lesson-12"]').click();assert.equal(await page.locator('#ko12-draft').inputValue(),'저는 만두를 먹고 싶어요.');assert.ok(await page.locator('[data-ko12-type="2"]').isChecked());assert.equal(await page.locator('#ko12-built button').count(),7);
    assert.equal(await page.locator('#ko12-dialogue article').count(),13);await page.locator('#ko12-translation').click();assert.ok(await page.locator('#ko12-dialogue').evaluate(e=>e.classList.contains('ko5-hide-meaning')));await page.locator('[data-ko12-exercise]').click();assert.equal(await page.locator('#ko12-workbook [data-kwb-section]').inputValue(),'4');
    const wb=page.locator('#ko12-workbook');
    for(let section=0;section<d.workbook.sections.length;section++){
      await wb.locator('[data-kwb-section]').selectOption(String(section));const s=d.workbook.sections[section];assert.equal(await wb.locator('[data-kwb-question] option').count(),s.items.length);
      for(let i=0;i<s.items.length;i++){await wb.locator('[data-kwb-question]').selectOption(String(i));const q=s.items[i];
        if(s.type==='choice'){await wb.locator(`[data-kwb-choice="${q.options.findIndex(o=>o.text===q.answers[0])}"]`).click();assert.match(await wb.locator('.kwb-feedback').innerText(),/Đúng rồi/);}
        if(s.type==='exact'){await wb.locator('[data-kwb-draft]').fill(q.answers[0]);await wb.locator('[data-kwb-check]').click();assert.match(await wb.locator('.kwb-feedback').innerText(),/Đúng rồi/);}
        if(s.type==='order'){assert.ok(await wb.locator('[data-kwb-check]').isDisabled());for(let j=0;j<q.tokens.length;j++)await wb.locator(`[data-kwb-token="${j}"]`).click();await wb.locator('[data-kwb-check]').click();assert.ok((await wb.locator('.kwb-feedback').innerText()).includes(q.sample.text));}
        if(s.type==='open'){await wb.locator('[data-kwb-draft]').fill(q.sample.text);await wb.locator('[data-kwb-check]').click();assert.match(await wb.locator('.kwb-feedback').innerText(),/không phải đáp án duy nhất/);}
      }
    }
    await wb.locator('[data-kwb-section]').selectOption('0');await wb.locator('[data-kwb-question]').selectOption('9');await wb.locator('[data-kwb-draft]').fill('만들으세요');await wb.locator('[data-kwb-check]').click();assert.match(await wb.locator('.kwb-feedback').innerText(),/Chưa đúng/);
    await page.locator('#ko12-slide-filter').selectOption('vocab');assert.equal(await page.locator('#ko12-slide-grid .ko5-slide').count(),7);await page.locator('#ko12-slide-grid [data-open-ko-slide]').first().click();assert.ok(await page.locator('#koSlideDialog').isVisible());await page.keyboard.press('Escape');await page.locator('#ko12-slide-filter').selectOption('all');
    assert.equal(await page.locator('#ko12-slide-grid img').evaluateAll(async imgs=>{await Promise.all(imgs.map(i=>{i.loading='eager';return i.decode().catch(()=>{});}));return imgs.filter(i=>!i.naturalWidth).length;}),0);
    await page.locator('[data-ko12-complete]').click();assert.equal(await page.locator('#koStatCompleted').textContent(),'1/17');
    for(const width of [390,768,1440]){await page.setViewportSize({width,height:1000});for(const id of ['vocab','grammar','menu','reading','practice','slides']){await page.locator(`.ko12-jumpbar [data-ko12-jump="${id}"]`).click();await page.waitForFunction(id=>{const el=document.querySelector('#ko12-'+id);return Math.abs(el.getBoundingClientRect().top-parseFloat(getComputedStyle(el).scrollMarginTop))<3;},id);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)<=2,`overflow at ${width}/${id}`);}if(width!==768){await page.locator('.ko12-jumpbar [data-ko12-jump="menu"]').click();await page.screenshot({path:path.join(root,`tmp/ko12-${width}.png`)});}}
    for(const section of ['grammar','reading','practice']){await page.locator(`.ko12-jumpbar [data-ko12-jump="${section}"]`).click();await page.screenshot({path:path.join(root,`tmp/ko12-${section}.png`)});}
    await page.locator('[data-ko12-qty="0"]').fill('1');await page.locator('[data-ko12-qty="1"]').fill('1');await page.locator('[data-ko12-qty="2"]').fill('1');await page.locator('#ko12-basket').evaluate(e=>window.scrollTo(0,scrollY+e.getBoundingClientRect().top-235));await page.screenshot({path:path.join(root,'tmp/ko12-budget.png')});
    await page.reload();assert.equal(await page.locator('#koStatCompleted').textContent(),'1/17');assert.deepEqual(errors,[]);
    console.log('PASS: 35 slides, 44 entries (29 core), 13 form pairs, 61 exercises, 13 dialogue turns, all 256 menu subsets, $20 budget/overflow/invalid/reset, roleplay cards, personal choices, TTS, modal, drafts, saved progress and 390/768/1440px layouts.');
  }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
