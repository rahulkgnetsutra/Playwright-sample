import { test, expect } from '@playwright/test';
test('test', async ({ page }) => {
  test.setTimeout(120000); 
  await page.goto('https://mygs-uat.girlscouts.org/');
  await page.locator('#loginBtn').dispatchEvent('click');
  await page.getByLabel('Email address*').fill('LTOct11adult00814@yopmail.com', { force: true });
  await page.getByRole('textbox', { name: 'Password' }).fill('Test123#', { force: true });
  await page.getByRole('button', { name: 'LOG IN' }).dispatchEvent('click');
  await page.getByRole('link', { name: 'My Household', exact: true }).click();
  await page.getByText('Register a new household').click();
  await page.getByText('Pre-K').click();
  await page.getByRole('button', { name: 'Search' }).click();
  await page.locator('button[name="addGirl-Multi-Level Troop 84067AAA-0"]').click();
  await page.getByRole('button', { name: 'Add Details' }).click();
  await page.getByRole('textbox', { name: 'Girl first name' }).fill('Shree', { force: true });
  await page.getByRole('textbox', { name: 'Girl first name' }).press('Tab');
  await page.getByRole('textbox', { name: 'Girl last name' }).fill('Gupta', { force: true });
  await page.locator('#collapse1 label').filter({ hasText: 'Use my primary address' }).dispatchEvent('click');
  
  // The crucial part
  await page.locator('[id^="grade-"] input').first().fill('Pre-K', { force: true });
  await page.locator('[id^="grade-"] input').first().press('Enter');
  
  await page.locator('[id^="troop-"] input').first().fill('84067AAA', { force: true });
  await page.locator('[id^="troop-"] input').first().press('Enter');
  
  console.log("Success!");
});
