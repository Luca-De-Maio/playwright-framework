import { expect } from '@playwright/test';

export class NavigationPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.cartButton = this.page.getByRole('link', { name: ' Cart' });
    this.loginButton = this.page.locator('.login');
  }

  async scrollToCenter() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
  }

  async goToCartPage() {
    await this.cartButton.click();
  }

  async goToLogin() {
    await this.loginButton.click();
  }
}
