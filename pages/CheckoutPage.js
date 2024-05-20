import { expect } from '@playwright/test';

export class CheckoutPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.productField = this.page.locator('#product-30');
    this.continueToRegisterOrLoginButton = this.page.locator('a:has-text("Proceed to Checkout")');
    this.registerLoginContinueButton = this.page.locator('u:has-text("Register / Login")');
    this.proceedToCheckoutButton = this.page.getByText('Proceed To Checkout');
    this.textAreaComment = this.page.locator('textarea[name="message"]');
    this.placeOrderButton = this.page.getByRole('link', { name: 'Place Order' })
  }

  async validateTotalValue() {
    // Assuming you have navigated to the appropriate page before this

    // Locate the product element by its ID
    const product = await this.productField;

    // Extract the price and quantity, and calculate the total value
    const priceText = await product.locator('.cart_price p').innerText();
    const price = parseFloat(priceText.replace('Rs. ', ''));

    const quantityText = await product.locator('.cart_quantity button').innerText();
    const quantity = parseInt(quantityText);

    const totalValue = price * quantity;

    // Validate the total value
    await expect(product.locator('.cart_total_price')).toHaveText('Rs. ' + totalValue);
  }

  async continueToRegisterOrLogin() {
    await this.continueToRegisterOrLoginButton.click();
    await this.registerLoginContinueButton.click();
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutButton.click();
  }

  async addCommentAndPlaceOrder() {
    await this.textAreaComment.fill('This is a test order');
    await this.placeOrderButton.click();
  }
}
