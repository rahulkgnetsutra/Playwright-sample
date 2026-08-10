const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://mygs-uat.girlscouts.org/');
  await page.waitForTimeout(5000);
  const el = await page.$('#loginBtn');
  if (el) {
    const isVisible = await el.isVisible();
    const box = await el.boundingBox();
    console.log('Login button visible:', isVisible, box);
    try {
      await el.click({timeout: 2000});
      console.log('Clicked successfully');
    } catch (e) {
      console.log('Click failed:', e.message);
    }
  } else {
    console.log('No loginBtn found');
  }
  await browser.close();
})();
