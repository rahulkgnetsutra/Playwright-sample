import { Page, Locator } from '@playwright/test';
import { CommonActions } from '../utils/CommonActions';
import { WaitHelper } from '../utils/WaitHelper';

/**
 * LoginPage: Responsible for all authentication workflows from the entry point.
 */
export class LoginPage {
  private actions: CommonActions;
  private waitHelper: WaitHelper;

  // Encapsulated Locators
  private readonly loginNavigationBtn: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginSubmitBtn: Locator;

  constructor(private readonly page: Page) {
    this.actions = new CommonActions(page);
    this.waitHelper = new WaitHelper(page);

    // Optimized Locator Stability: '#loginBtn' ID is significantly stronger 
    // than codegen's raw `getByText('Login')` which could match plain paragraphs.
    this.loginNavigationBtn = page.locator('#loginBtn');
    
    this.emailInput = page.getByLabel('Email address*');
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginSubmitBtn = page.getByRole('button', { name: 'LOG IN' });
  }

  /**
   * Initializes the browser context and strictly waits for network stabilization.
   */
  async navigateToHome(): Promise<void> {
    await this.page.goto('https://mygs-uat.girlscouts.org/');
    await this.waitHelper.waitForPageReady();
  }

  /**
   * Automates the modal authentication flow using safe dispatch methodologies
   * to maneuver around headless dynamic layout disruptions (cookie banners).
   * 
   * @param email Valid registered testing email
   * @param pass Corresponding password
   */
  async login(email: string, pass: string): Promise<void> {
    await this.actions.clickBypassOverlay(this.loginNavigationBtn);
    
    // Utilizing `{ force: true }` proxy through CommonActions because 
    // the SSO login interface overlay intercepts PointerEvents natively in WebKit.
    await this.actions.fill(this.emailInput, email, true);
    await this.actions.fill(this.passwordInput, pass, true);
    
    await this.actions.clickBypassOverlay(this.loginSubmitBtn);
  }
}
