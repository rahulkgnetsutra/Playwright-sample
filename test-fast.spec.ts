import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  test.setTimeout(10000);
  await page.goto('https://mygs-uat.girlscouts.org/');
  await page.locator('#loginBtn').dispatchEvent('click');
  await page.getByLabel('Email address*').click();
  await page.getByLabel('Email address*').fill('LTOct11adult00814@yopmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Test123#');
  await page.getByRole('button', { name: 'LOG IN' }).click();
  await page.getByText('Logout').click();
});
