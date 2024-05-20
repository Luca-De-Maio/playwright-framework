import { expect } from '@playwright/test';

export class AccountCreatedPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.continueButton = page.getByRole('link', { name: 'Continue' });
  }

  async clickOnContinueToCart() {
    await this.continueButton.click();
  }
}
