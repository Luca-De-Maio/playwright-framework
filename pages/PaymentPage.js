import { expect } from '@playwright/test';

export class PaymentPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.nameOnCardField = this.page.locator('input[name="name_on_card"]');
    this.cardNumberField = this.page.locator('input[name="card_number"]');
    this.cvcNumberField = this.page.getByPlaceholder('ex.');
    this.expiryMonthField = this.page.getByPlaceholder('MM');
    this.experyYearField = this.page.getByPlaceholder('YYYY');
    this.buttonPayConfirmOrder = this.page.getByRole('button', { name: 'Pay and Confirm Order' });
    this.successMessage = this.page.getByText('Congratulations! Your order');
  }

  async fillCreditCardInfo(cardInfo) {
    await this.nameOnCardField.fill(cardInfo.nameOnCard);
    await this.cardNumberField.fill(cardInfo.cardNumber);
    await this.cvcNumberField.fill(cardInfo.cvc);
    await this.expiryMonthField.fill(String(cardInfo.expiryMonth));
    await this.experyYearField.fill(String(cardInfo.expiryYear));
  }

  async clickContinueButton() {
    await this.buttonPayConfirmOrder.click();
  }

  async getMessageFromAlert() {  
    await expect(this.successMessage).toHaveText('Congratulations! Your order has been confirmed!')
  }
}
