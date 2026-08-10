import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { PaymentPage } from './pages/PaymentPage';
import * as testData from './test-data/registrationData.json';

test.describe('Enterprise Registration Workflow', () => {

    test('Login flow', async ({ page }) => {
   await test.step('Open Girl Scouts Login Page', async () => {
    await page.goto('https://mygs-uat.girlscouts.org/');
    });

    await test.step('Click on Login link', async () => {
      await page.locator('#loginBtn').dispatchEvent('click');
    });

    await test.step('Enter Login Credentials', async () => {
      await page.getByLabel('Email address*').fill('LTOct11adult00814@yopmail.com', { force: true });
      await page.getByRole('textbox', { name: 'Password' }).fill('Test123#44', { force: true });
    });
    
    await test.step('Click on Login Button', async () => {
      await page.getByRole('button', { name: 'LOG IN' }).dispatchEvent('click');
    });
    
    const errorMsg = page.getByText('Invalid login or password');

    if (await errorMsg.isVisible()) {
        throw new Error(
            'Login Failed: Invalid username or password. Authentication was unsuccessful.'
        );
    }
    await expect(page).toHaveURL(/dashboard/);
  });

  test('Register a new household member flow', async ({ page }) => {
    // Satisfying robust Smart Waits architecture across dense Angular portals
    test.setTimeout(150000); 

    // Instantiate Enterprise POM Controllers
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const registrationPage = new RegistrationPage(page);
    const paymentPage = new PaymentPage(page);

    // Act 1: Initial Login Payload and Navigation
    await loginPage.navigateToHome();
    await loginPage.login(testData.user.email, testData.user.password);
    
    // Act 2: Gateway Initializations
    await dashboardPage.openRegistration();

    // Act 3: Core Transaction Registration Process
    await registrationPage.searchTroop(testData.search.grade, testData.search.troopName);
    
    // Dynamically generating unique girl name
    const firstName = `${testData.girl.firstName}-${Date.now()}`;
    const lastName = `${testData.girl.lastName}-${Math.floor(Math.random() * 9000) + 1000}`;
    await registrationPage.fillGirlInformation(firstName, lastName);
    
    // Dynamically generating unique address footprints at runtime to bypass native backend duplicate-entry validation blocks
    const dynamicLine1 = `${testData.address.line1}-${Date.now()}`;
    const dynamicLine2 = `${testData.address.line2}-${Math.floor(Math.random() * 9000) + 1000}`;
    await registrationPage.fillAddress(dynamicLine1, dynamicLine2);
    
    await registrationPage.fillDemographics(
      testData.demographics.grade,
      testData.demographics.typePrimary,
      testData.demographics.typeSecondary,
      testData.demographics.ethnicity,
      testData.demographics.race
    );
    
    // Abstracted internal complex Angular UI logic (date pickers and DOM intercepts)
    await registrationPage.fillSchool(
      testData.school.dobYear, 
      testData.school.dobDayAria, 
      testData.school.dobDayNumber
    );

    // Act 4: Submits Registration implicitly moving route toward specific path validation
    await registrationPage.submitRegistration();
    await paymentPage.reviewCartAndProceed();
    await paymentPage.enterPayment(testData.payment.cardFirst, testData.payment.cardLast);
  });



});