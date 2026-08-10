import { Page, Locator, expect } from '@playwright/test';
import { WaitHelper } from './WaitHelper';

/**
 * CommonActions: A centralized facade over basic Playwright interactions 
 * (click, fill). Guaranteeing element actionability before execution and 
 * automatically rolling assertions into the data entry loops.
 */
export class CommonActions {
  private waitHelper: WaitHelper;

  constructor(private readonly page: Page) {
    this.waitHelper = new WaitHelper(page);
  }

  /**
   * Waits for the locator to be visible and enabled before clicking.
   */
  async click(locator: Locator): Promise<void> {
    await this.waitHelper.waitForElementEnabled(locator);
    await locator.click();
  }

  /**
   * Asserts the element is ready, fills the value, and explicitly verifies 
   * the text was successfully written into the DOM.
   */
  async fill(locator: Locator, text: string, useForce: boolean = false): Promise<void> {
    if (!useForce) {
      // Standard elements wait for full actionability
      await this.waitHelper.waitForElementEnabled(locator);
    }
    
    await locator.fill(text, { force: useForce });
    
    // Explicit runtime assertion ensuring the keyboard injection persisted
    await expect(locator).toHaveValue(text);
  }

  /**
   * Type sequences dynamically to trigger frontend event hooks like type-ahead search requests.
   */
  async type(locator: Locator, text: string, delayMs: number = 50): Promise<void> {
    await this.waitHelper.waitForElementEnabled(locator);
    // Explicitly triggers focus before keystrokes begin
    await locator.click(); 
    await locator.pressSequentially(text, { delay: delayMs });
  }

  /**
   * Some complex Angular structures block pointer-events. Dispatched clicks
   * guarantee event propagation without compromising the strict mode test flows.
   */
  async clickBypassOverlay(locator: Locator): Promise<void> {
    await this.waitHelper.waitForElementVisible(locator);
    await locator.dispatchEvent('click');
  }

  /**
   * Simulates focusing the element and moving off to trigger native Angular validation/blur.
   */
  async pressTab(locator: Locator): Promise<void> {
    await locator.press('Tab');
  }
}
