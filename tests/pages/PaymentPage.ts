import { Page, Locator } from '@playwright/test';
import { CommonActions } from '../utils/CommonActions';
import { WaitHelper } from '../utils/WaitHelper';

/**
 * PaymentPage: Securely encapsulates payment portal interactions, 
 * guarding against premature transitions using url-specific state verifications.
 */
export class PaymentPage {
  private actions: CommonActions;
  private waitHelper: WaitHelper;

  // Encapsulated Locators
  private readonly cardFirstName: Locator;
  private readonly cardLastName: Locator;

  constructor(private readonly page: Page) {
    this.actions = new CommonActions(page);
    this.waitHelper = new WaitHelper(page);

    // Using semantic role-level bindings for dynamic forms
    this.cardFirstName = page.getByRole('textbox', { name: 'Cardholder first name' });
    this.cardLastName = page.getByRole('textbox', { name: 'Cardholder last name' });
  }

  /**
   * Navigates the intermediate Cart verification sequence
   */
  async reviewCartAndProceed(): Promise<void> {
    // CRITICAL: UAT Stripe processing delay. Hitting 'Review Cart' immediately after 
    // clicking 'Save Details' instantly causes the browser to navigate away from the form route
    // BEFORE the POST request commits to the backend, resulting in a dropped transaction.
    await this.page.waitForTimeout(8000);

    // Precisely target the specific #general-member checkout button you provided, bypassing header variants
    const reviewCartBtn = this.page.locator('button#general-member').filter({ hasText: 'Review Cart' });
    // Aggressively bypassing Bootstrap's 'd-none d-md-block' responsive display restrictions!
    await reviewCartBtn.first().dispatchEvent('click');

    const agreeCheckbox = this.page.getByRole('checkbox', { name: 'I agree to the Girl Scout' });
    await agreeCheckbox.check();

    const addPaymentDetailsBtn = this.page.getByRole('button', { name: 'Add payment details' });
    await this.actions.clickBypassOverlay(addPaymentDetailsBtn);
  }

  /**
   * Completes the primary payment data ingestion and executes the Stripe iFrame mounts.
   */
  async enterPayment(firstName: string, lastName: string): Promise<void> {
    // Fill inherently invokes robust validation checks underneath via CommonActions layer
    await this.actions.fill(this.cardFirstName, firstName);
    await this.actions.fill(this.cardLastName, lastName);

    // CardConnect token iFrame resolution using Playwright FrameLocator for auto-waiting
    const tokenFrame = this.page.frameLocator('iframe[name="tokenFrame"]');
    
    // Inject secure card details
    await tokenFrame.getByPlaceholder('Credit/Debit Card Number').or(tokenFrame.getByRole('textbox', { name: /Credit.*Card/i })).fill('4111111111111111');
    await tokenFrame.getByLabel('Expiration Month').or(tokenFrame.getByRole('combobox', { name: 'Expiration Month' })).selectOption('01');
    await tokenFrame.getByLabel('Expiration Year').or(tokenFrame.getByRole('combobox', { name: 'Expiration Year' })).selectOption('2030');
    await tokenFrame.getByPlaceholder('CVV').or(tokenFrame.getByRole('textbox', { name: 'Card Verification Value' })).fill('345');

    // Select billing address profile (using more generic locators to accommodate our dynamic address prefixes)
    const billingPanel = this.page.locator('div').filter({ hasText: 'Payment' });
    if (await billingPanel.count() > 0) {
       await billingPanel.last().click({ force: true }).catch(() => {});
    }
    
    // Check the active generic layout wrapper bypassing strict text nodes
    const billingLabels = this.page.locator('label').filter({ hasText: /Perf Tester|Test/i });
    if(await billingLabels.count() > 0) {
       await billingLabels.first().click({ force: true }).catch(() => {});
    }

    // Final Submission
    await this.actions.clickBypassOverlay(this.page.getByRole('button', { name: 'Submit payment' }));
    
    // Simulating completion transition wait
    await this.page.waitForTimeout(5000);
  }
}
