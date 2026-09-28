const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {pathToFileURL}=require('node:url'),{chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),context={window:{}};
for(const m of fs.readFileSync(path.join(root,'index.html'),'utf8').matchAll(/src="(data\/korean[^"?]+\.js)/g))vm.runInNewContext(fs.readFileSync(path.join(root,m[1]),'utf8'),context);
const d=context.window.KOREAN_TOPIC_SUPPLEMENT,forms=context.window.KOREAN_LESSON_NINE.forms;
assert.equal(d.words.length,49);assert.equal(new Set(d.words.map(w=>w.text)).size,49);assert.equal(d.words.filter(w=>w.past).length,30);assert.equal(forms.length,48);assert.equal(new Set(forms.map(w=>w.text)).size,48);
assert.equal(d.words.filter(w=>w.pastGroup==='hada').length,13);assert.equal(d.words.find(w=>w.text==='수영하다').aliases[0],'수영을 하다');
for(const w of d.words){assert.ok(w.romanization&&w.meaning);assert.ok(d.topics.some(t=>t.id===w.topic));if(w.past)assert.ok(w.rule&&w.pastRoma);}
assert.equal(d.words.find(w=>w.text==='걷다').past,'걸었어요');assert.equal(d.words.find(w=>w.text==='받다').past,'받았어요');assert.equal(d.words.find(w=>w.text==='도와주다').alternative,'도와주었어요');
assert.equal(d.words.find(w=>w.text==='사자').lessons.includes(9),true);
console.log('Audit:',JSON.stringify({words:d.words.length,newWords:d.words.filter(w=>w.newEntry).map(w=>w.text),pastForms:forms.length}));
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'}),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(process.env.TEST_URL||pathToFileURL(path.join(root,'index.html')).href);await page.addStyleTag({content:'* {scroll-behavior:auto!important}'});
  await page.locator('[data-enter-language="ko"]').click();await page.locator('[data-korean-tab="ko-lesson-vocab"]').click();
  assert.equal(await page.locator('#ko-topic-words .ko5-word').count(),49);
  for(const t of d.topics){await page.locator(`[data-ko-topic="${t.id}"]`).click();assert.equal(await page.locator('#ko-topic-words .ko5-word').count(),d.words.filter(w=>w.topic===t.id).length);}
  await page.locator('[data-ko-topic="all"]').click();await page.locator('#ko-topic-search').fill('수영을 하다');assert.equal(await page.locator('#ko-topic-words .ko5-word').count(),1);
  await page.locator('#ko-topic-search').fill('걸었어요');assert.equal(await page.locator('#ko-topic-words h4').innerText(),'걷다');
  await page.locator('[data-ko-past-word="걷다"]').click();await page.locator('#ko-lesson-9.active').waitFor();assert.match(await page.locator('#ko9-conjugation').innerText(),/걸었어요/);
  for(const g of d.pastGroups){await page.locator('#ko9-past-group').selectOption(g.id);assert.equal(await page.locator('#ko9-verb option').count(),d.words.filter(w=>w.pastGroup===g.id).length);}
  await page.locator('#ko9-past-group').selectOption('original');assert.equal(await page.locator('#ko9-verb option').count(),20);
  await page.locator('#ko9-past-group').selectOption('all');assert.equal(await page.locator('#ko9-verb option').count(),48);
  for(const w of d.words.filter(w=>w.past)){await page.locator('#ko9-verb').selectOption(String(forms.findIndex(f=>f.text===w.text)));assert.ok((await page.locator('#ko9-conjugation').innerText()).includes(w.past));}
  await page.locator('[data-korean-tab="ko-lesson-vocab"]').click();await page.locator('#ko-topic-search').fill('');
  await page.getByText('Từ vựng Bài 1 & hướng dẫn đọc gốc',{exact:true}).click();await page.locator('#koLessonVocabSearch').fill('선생님');assert.ok(await page.locator('#koLessonVocabulary').isVisible());
  await page.getByText('Từ vựng Bài 1 & hướng dẫn đọc gốc',{exact:true}).click();
  await page.evaluate(()=>{speechSynthesis.speak=u=>window.__spoken=u.lang;});await page.locator('#ko-topic-words [data-speak-ko]').first().click();assert.equal(await page.evaluate(()=>window.__spoken),'ko-KR');
  for(const width of [390,768,1440]){await page.setViewportSize({width,height:1000});await page.locator('[data-ko-topic="leisure"]').click();await page.locator('#ko-topic-review').evaluate(e=>e.scrollIntoView());assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)<=2);if(width!==768)await page.screenshot({path:path.join(root,`tmp/ko-topics-${width}.png`)});}
  assert.deepEqual(errors,[]);console.log('PASS: 49 deduplicated words, 10 topics, 30 requested past forms, 48 integrated forms, aliases, source links, old vocabulary, speech and responsive layout.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
