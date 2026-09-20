const assert = require('node:assert/strict');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: process.env.BROWSER_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
  try {
    const page = await browser.newPage();
    await page.goto(process.env.TEST_URL || pathToFileURL(path.resolve(__dirname, '../index.html')).href);
    const icon = page.locator('#languageFavicon');
    assert.equal(await icon.getAttribute('href'), 'assets/icons/default.svg');
    for (const [language, name] of [['zh', 'chinese'], ['ko', 'korean'], ['en', 'default'], ['ko', 'korean']]) {
      await page.locator(`[data-enter-language="${language}"]`).click();
      assert.equal(await icon.getAttribute('href'), `assets/icons/${name}.svg`);
      assert.equal(await page.evaluate(async () => {
        const img = new Image(); img.src = document.querySelector('#languageFavicon').href;
        await img.decode(); return img.naturalWidth > 0;
      }), true);
      await page.locator('[data-switch-language]:visible').click();
      assert.equal(await icon.getAttribute('href'), 'assets/icons/default.svg');
    }
    await page.reload();
    assert.equal(await icon.getAttribute('href'), 'assets/icons/default.svg');
    console.log('PASS: Chinese/Korean favicon, default English/chooser icon, repeated switches, image decoding and reload.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
