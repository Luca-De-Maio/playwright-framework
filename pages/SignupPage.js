import { expect } from '@playwright/test';

export class SignupPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.firstName = this.page.locator('input[name="first_name"]');
    this.lastName = this.page.locator('input[name="last_name"]');
    this.address1 = this.page.locator('input[name="address1"]');
    this.city = this.page.locator('input[name="city"]');
    this.state = this.page.locator('input[name="state"]');
    this.zipcode = this.page.locator('input[name="zipcode"]');
    this.passwordField = this.page.locator('input[name="password"]')
    this.mobilePhoneField = this.page.getByLabel('Mobile Number *');
    this.buttonField = this.page.locator('button:has-text("Create Account")');
  }

  async registerUser(addressData, password) {
    await this.firstName.fill(addressData.firstName);
    await this.lastName.fill(addressData.lastName);
    await this.address1.fill(addressData.addressLine1);
    await this.city.fill(addressData.city);
    await this.state.fill(addressData.state);
    await this.zipcode.fill(addressData.postalCode);
    await this.passwordField.fill(password);
    await this.mobilePhoneField.fill(addressData.phone);
    await this.buttonField.click();
  }
}
