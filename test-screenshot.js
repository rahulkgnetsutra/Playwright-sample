const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://mygs-uat.girlscouts.org/');
  await page.waitForTimeout(5000);
  await page.screenshot({ path: 'screenshot.png' });
  await browser.close();
})();
