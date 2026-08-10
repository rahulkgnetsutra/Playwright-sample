import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://mygs-uat.girlscouts.org/');
  await page.locator('#loginBtn').dispatchEvent('click');
  await page.getByLabel('Email address*').fill('LTOct11adult00814@yopmail.com', { force: true });
  await page.getByRole('textbox', { name: 'Password' }).fill('Test123#', { force: true });
  await page.getByRole('button', { name: 'LOG IN' }).dispatchEvent('click');
  await page.getByText('Logout').click({ force: true });
});
