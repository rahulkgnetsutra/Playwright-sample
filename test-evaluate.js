const { chromium, webkit } = require('playwright');
(async () => {
  const browser = await webkit.launch();
  const page = await browser.newPage();
  await page.goto('https://mygs-uat.girlscouts.org/');
  await page.waitForTimeout(5000);
  await page.evaluate(() => {
    let btn = document.getElementById('acceptAllCookieButton');
    if(btn) btn.click();
  });
  console.log("Clicked cookie button");
  await page.locator('#loginBtn').click({ timeout: 5000 });
  console.log("Clicked login button");
  await browser.close();
})();
