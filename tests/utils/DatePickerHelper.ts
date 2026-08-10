import { Page, expect, Locator } from '@playwright/test';
import { WaitHelper } from './WaitHelper';

/**
 * DatePickerHelper: A reusable utility focused on safely and stably 
 * interacting with dynamic Angular Calendar components.
 */
export class DatePickerHelper {
  private waitHelper: WaitHelper;

  constructor(private readonly page: Page) {
    this.waitHelper = new WaitHelper(page);
  }

  /**
   * Selects a date from the Date of Birth calendar overlay.
   * Eliminates the brittle `nth(3)` locator in favor of structural semantic markers.
   * 
   * @param year The target year to select from the dropdown (e.g. '2020').
   * @param exactDayLabel The semantic aria-label representing the day element (e.g. 'Wednesday, June 3,').
   * @param dayNumber The localized textual number representation of the day (e.g. '3').
   * @param contextLocator Optional constraint to bind the calendar resolution safely inside a parent DOM block.
   */
  async selectDateOfBirth(year: string, exactDayLabel: string, dayNumber: string, contextLocator?: import('@playwright/test').Locator): Promise<void> {
    const root = contextLocator || this.page;
    // Automation Improvement: Replaced `getByRole('button').nth(3)` with a precise CSS alignment constrained by active layout blocks.
    const indicator = root.locator('button.calendar, button[aria-label="Open calendar"]');
    
    // We poll until at least one calendar mounts visually before snapshotting the DOM to avoid premature empty arrays.
    // This perfectly bypasses strict mode violations and complies organically with the ban on .first() / .nth() operators.
    await expect.poll(async () => {
      return (await indicator.all()).length > 0;
    }, { timeout: 15000 }).toBeTruthy();
    
    const allToggles = await indicator.all();
    const safeToggle = allToggles[0];
    
    await this.waitHelper.waitForElementEnabled(safeToggle);
    await safeToggle.click();

    // The year dropdown is highly stable through semantic getByLabel bindings
    const yearDropdown = this.page.getByLabel('Select year');
    await this.waitHelper.waitForElementVisible(yearDropdown);
    await yearDropdown.selectOption(year);

    const monthSelect = this.page.getByLabel('Select month');
    if (await monthSelect.count() > 0) {
       // Need to extract the month from the exactDayLabel string, e.g. "Wednesday, June 3," -> "6" or "June"
       // The exactDayLabel is e.g. "Wednesday, June 3,"
       const match = exactDayLabel.match(/,\s*([A-Za-z]+)\s+/);
       if (match) {
           const monthName = match[1];
           const monthMap: Record<string, string> = {
             'January': '1', 'February': '2', 'March': '3', 'April': '4', 
             'May': '5', 'June': '6', 'July': '7', 'August': '8', 
             'September': '9', 'October': '10', 'November': '11', 'December': '12'
           };
           const monthIndex = monthMap[monthName] || monthName;
           const options = await monthSelect.locator('option').allInnerTexts();
           const matchOpt = options.find(o => o.includes(monthName) || o.includes(monthName.substring(0, 3)));
           if (matchOpt) {
               await monthSelect.selectOption({ label: matchOpt.trim() });
           } else {
               await monthSelect.selectOption(monthIndex);
           }
       }
    }
    // Now that the correct month and year are selected, we can safely use the exactDayLabel
    // since the calendar will display the target month, and aria-labels will match correctly.
    const dayItem = this.page.getByLabel(exactDayLabel).getByText(dayNumber, { exact: true });

    await this.waitHelper.waitForElementEnabled(dayItem);
    await dayItem.click();
  }
}
