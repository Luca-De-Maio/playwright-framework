import { expect } from '@playwright/test';

export class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.registerUserName = this.page.getByPlaceholder('Name');
    this.registerUserSignUpEmail = this.page.locator('[data-qa="signup-email"]');
    this.registerUserSignUpButton = this.page.locator('[data-qa="signup-button"]');
    this.loginEmailField = this.page.locator('input[name="email"]');
    this.loginPasswordField = this.page.locator('input[name="password"]');
    this.loginButton = this.page.locator('button[type="submit"]');
  }

  async registerUser(name, email) {
    await this.registerUserName.fill(name);
    await this.registerUserSignUpEmail.fill(email);
    await this.registerUserSignUpButton.click();
  }

  async login(email, password) {
    await this.loginEmailField.fill(email);
    await this.loginPasswordField.fill(password);
    await this.loginButton.click();
  }
}
