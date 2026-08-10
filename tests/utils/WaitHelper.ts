import { Page, Locator, expect } from '@playwright/test';

/**
 * WaitHelper: Centralized wait strategies ensuring stable execution 
 * without relying on hardcoded timeouts (waitForTimeout).
 */
export class WaitHelper {
  constructor(private readonly page: Page) {}

  /**
   * Waits for a locator to become visible and verifies its state.
   */
  async waitForElementVisible(locator: Locator, timeout: number = 15000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
    await expect(locator).toBeVisible({ timeout });
  }

  /**
   * Waits for a locator to become enabled (actionable) and verifies its state.
   */
  async waitForElementEnabled(locator: Locator, timeout: number = 15000): Promise<void> {
    await this.waitForElementVisible(locator, timeout);
    await expect(locator).toBeEnabled({ timeout });
  }

  /**
   * Waits for proper network/DOM stabilization. Avoids using static wait limits.
   */
  async waitForPageReady(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Expects the current URL to match or contain a string.
   */
  async waitForUrl(expectedUrlPath: string, timeout: number = 15000): Promise<void> {
    await this.page.waitForURL(`**/*${expectedUrlPath}*`, { timeout });
    await expect(this.page).toHaveURL(new RegExp(expectedUrlPath), { timeout });
  }
}
