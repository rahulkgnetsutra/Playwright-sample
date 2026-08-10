const { chromium } = require('playwright');
const testData = require('./tests/test-data/registrationData.json');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  await page.goto('https://mygs-uat.girlscouts.org/', { waitUntil: 'networkidle' });
  
  // Login
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Email address').fill(testData.user.email);
  await page.getByPlaceholder('Password', { exact: true }).fill(testData.user.password);
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.waitForTimeout(3000);

  // Search
  await page.getByRole('link', { name: 'Find Troops' }).click();
  await page.locator(`label:has-text("${testData.search.grade}")`).click();
  await page.getByRole('button', { name: 'Search' }).click();
  await page.waitForTimeout(3000);
  await page.locator(`button[name^="addGirl-84067AAA"]`).click();
  await page.getByRole('button', { name: 'Add Details' }).click();
  await page.waitForTimeout(3000);

  // Fill Details
  await page.getByRole('textbox', { name: 'Girl first name' }).fill(testData.girl.firstName);
  await page.getByRole('textbox', { name: 'Girl first name' }).press('Tab');
  await page.getByRole('textbox', { name: 'Girl last name' }).fill(testData.girl.lastName);
  
  const activeSectionContext = page.locator('.card-body, .accordion-body').filter({ has: page.getByRole('textbox', { name: 'Girl first name' }) });
  await activeSectionContext.locator('label').filter({ hasText: 'Use my primary address' }).click();
  
  const prefixes = ['grade-', 'type-', 'type-', 'ethnicity-', 'race-', 'relationshipCG-'];
  const vals = ['Pre-K', 'Troop Member', 'Non-Troop Member', 'Hispanic', 'American Indian', 'Parent'];
  for(let i=0; i<prefixes.length; i++) {
    const el = activeSectionContext.locator(`ng-select[id^="${prefixes[i]}"]`).locator('.ng-select-container').first();
    await el.waitFor({ state: 'visible' }).catch(() => {});
    await el.click({ force: true });
    await page.waitForTimeout(500);
    const opt = page.getByRole('option').filter({ hasText: vals[i] }).first();
    await opt.waitFor({ state: 'visible' }).catch(() => {});
    await opt.click({ force: true });
    await page.waitForTimeout(500);
  }

  // School
  const dobInputs = activeSectionContext.locator('app-date-picker button');
  if (await dobInputs.count() > 0) {
     await dobInputs.first().click();
     const p1 = page.getByRole('button', { name: 'Choose month and year' }).first();
     if(await p1.isVisible()) await p1.click();
     const p2 = page.locator(`td[aria-label="2020"]`).first();
     if(await p2.isVisible()) await p2.click();
     const p3 = page.locator(`td[aria-label="${testData.school.dobDayAria}"]`).first();
     if(await p3.isVisible()) await p3.click();
  }
  
  const searchbox = page.getByRole('searchbox', { name: 'School Attending' });
  await searchbox.click();
  await searchbox.pressSequentially('home', { delay: 50 });
  await page.getByRole('link').filter({ hasText: 'Home Schooled' }).click();
  
  await activeSectionContext.locator('label').filter({ hasText: 'I am the caregiver' }).click({ force: true }).catch(() => {});
  
  await page.waitForTimeout(2000);

  // Memberships
  await page.locator('label').filter({ hasText: 'Current Year -' }).first().click({ force: true }).catch(() => {});
  await page.locator('label').filter({ hasText: 'Credit Card' }).first().click({ force: true }).catch(() => {});
  await page.waitForTimeout(1000);

  // SAVE
  const submitBtn = page.locator('button:visible').filter({ hasText: /(Submit)|(Next)|(Continue)|(Checkout)|(Save)/i });
  await submitBtn.first().click({ force: true }).catch(() => {});
  
  // Wait to see what happens!
  await page.waitForTimeout(6000);

  // Dump URLs and visible buttons
  console.log("FINAL URL:", page.url());
  const buttons = await page.locator('button:visible').allInnerTexts();
  console.log("VISIBLE BUTTONS AFTER SAVE:", buttons);
  
  const links = await page.locator('a:visible').allInnerTexts();
  console.log("VISIBLE LINKS AFTER SAVE:", links);

  await browser.close();
})();
