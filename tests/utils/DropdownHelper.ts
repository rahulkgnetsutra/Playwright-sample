import { Page } from '@playwright/test';
import { WaitHelper } from './WaitHelper';

/**
 * DropdownHelper: Reusable utility specifically designed to tame dynamic 
 * Angular `ng-select` comboboxes, which cause Playwright actionability 
 * issues due to pseudo-element bounds blocking visibility.
 */
export class DropdownHelper {
  private waitHelper: WaitHelper;

  constructor(private readonly page: Page) {
    this.waitHelper = new WaitHelper(page);
  }

  /**
   * Selects an option from an Angular ng-select web element.
   * Maps human-readable dropdown names to stable DOM prefix attributes.
   * By directly injecting the search text and dispatching 'Enter', we effortlessly 
   * bypass overlapping overlays and strict boundary visibility flaws.
   * 
   * @param dropdownName The semantic name of the dropdown (e.g. 'Grade', 'Race').
   * @param optionValue The textual option to select (e.g. 'Pre-K').
   */
  async select(dropdownName: string, optionValue: string, contextLocator?: import('@playwright/test').Locator): Promise<void> {
    const root = contextLocator || this.page;
    
    // Dictionary mapping clean business language to native DOM attributes
    // avoiding brittle auto-generated suffixes (e.g., #type-B-37777870-0)
    const prefixMap: Record<string, string> = {
      'Grade': 'grade-',
      'Troop': 'troop-',
      'Type': 'type-',
      'Ethnicity': 'ethnicity-',
      'Race': 'race-',
      'Relationship': 'relationshipCG-'
    };

    const prefix = prefixMap[dropdownName];
    if (!prefix) {
      throw new Error(`Dropdown prefix mapping not found for: ${dropdownName}`);
    }

    // Step 1: Target the parent ng-select Angular wrapper container using the prefix securely
    const dropdownParent = root.locator(`ng-select[id^="${prefix}"]`);
    
    // Safety Fallback for native non-ng-select inputs masquerading as dropdowns
    const safeContainer = (await dropdownParent.count() > 0) ? dropdownParent.first() : root.locator(`[id^="${prefix}"]`).first();
    
    // Ensure the dropdown wrapper itself is rendered and interactive
    await this.waitHelper.waitForElementVisible(safeContainer);
    
    // Step 2: Formally click the container to activate Angular's interactive state and expand the list.
    // Explicitly target `.ng-select-container` because Angular natively drops clicks acting on the raw outer wrapper border.
    await safeContainer.locator('.ng-select-container').click();
    
    // Step 3: Await the DOM generation of the dropdown `option` result safely bridging shadow DOM gaps.
    // We strictly use UI selection here instead of `pressSequentially()` because the HTML specification 
    // indicates this `ng-select` instance is `readonly=""` (searchable=false), rejecting keyboard injection.
    const option = this.page.getByRole('option', { name: optionValue, exact: true }).or(this.page.getByRole('option').filter({ hasText: optionValue }));
    await this.waitHelper.waitForElementVisible(option.first());
    
    // Step 4: Finalize the selection binding organically via mouse
    await option.first().click();
  }
}
