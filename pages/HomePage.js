import { Page, expect } from '@playwright/test';

export class HomePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.product = this.page.locator('a:below(div.productinfo [data-product-id="30"])');
  }

  async visit() {
    await this.page.goto('/');
  }

  async selectViewProduct(productName) {
    // Locate the product container by its product name
    this.product.first().click();
  }
}
