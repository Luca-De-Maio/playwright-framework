import { expect } from '@playwright/test';

export class ProductPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.quantityField = this.page.locator('input[name="quantity"]');
    this.addToCartButton = this.page.locator('button:has-text("Add to cart")');
    this.successMessage = this.page.locator('.modal-content .modal-title');
    this.viewCartLink = this.page.locator('a:has-text("View Cart")');
  }

  async addToCart(quantity) {
    await this.quantityField.fill(quantity);
    await this.addToCartButton.click();
    await expect(this.successMessage).toHaveText('Added!');
  }

  async proceedToCheckout() {
    await this.viewCartLink.click();
  }
}
