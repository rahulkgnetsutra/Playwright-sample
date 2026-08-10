import { Page, Locator } from '@playwright/test';
import { CommonActions } from '../utils/CommonActions';

/**
 * DashboardPage: Manages the internal portal state following a successful login.
 */
export class DashboardPage {
  private actions: CommonActions;

  // Encapsulated Locators
  private readonly myHouseholdLink: Locator;
  private readonly registerHouseholdBtn: Locator;

  constructor(private readonly page: Page) {
    this.actions = new CommonActions(page);

    // Optimized locators leveraging accessibility attributes instead of raw CSS
    this.myHouseholdLink = page.getByRole('link', { name: 'My Household', exact: true });
    
    // Automation Improvement: Utilizing getByText without exact binding ensures we don't 
    // inadvertently strip layout pseudo-spans or whitespace buffering applied by Angular.
    this.registerHouseholdBtn = page.getByText('Register a new household');
  }

  /**
   * Navigates the user to the active registration loop from the dashboard state.
   */
  async openRegistration(): Promise<void> {
    await this.actions.click(this.myHouseholdLink);
    await this.actions.click(this.registerHouseholdBtn);
  }
}
