import { test, expect } from '@playwright/test';
import * as testData from './tests/test-data/registrationData.json';
import { LoginPage } from './tests/pages/LoginPage';
import { DashboardPage } from './tests/pages/DashboardPage';
import { RegistrationPage } from './tests/pages/RegistrationPage';

test('Debug Grade', async ({ page }) => {
    test.setTimeout(150000); 
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const registrationPage = new RegistrationPage(page);

    await loginPage.navigateToHome();
    await loginPage.login(testData.user.email, testData.user.password);
    await dashboardPage.openRegistration();
    await registrationPage.searchTroop(testData.search.grade, testData.search.troopName);
    
    // Fill first name to resolve active section scope
    await registrationPage.fillGirlInformation('Test', 'Girl');
    
    // Attempt clicking the grade box manually
    const root = page.locator('.card-body, .accordion-body').filter({ has: page.getByRole('textbox', { name: 'Girl first name' }) });
    const dropdown = root.locator('ng-select[id^="grade-"]').first();
    await expect(dropdown).toBeVisible({ timeout: 15000 });
    await dropdown.locator('.ng-select-container').first().click();
    
    // Dump all options
    await page.waitForTimeout(2000);
    const options = await page.getByRole('option').allInnerTexts();
    console.log("AVAILABLE GRADE OPTIONS: " + JSON.stringify(options));
});
