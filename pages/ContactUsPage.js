import { expect } from '@playwright/test';

export class ContactUsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async fillFormAndSubmit() {
    await this.page.fill('input[name="name"]', 'Test User');
    await this.page.fill('input[name="email"]', 'testuser@example.com');
    await this.page.fill('textarea[name="message"]', 'This is a test message');
    await this.page.click('button[type="submit"]');
  }

  async verifySubmissionSuccess() {
    this.page.on('dialog', async (dialog) => {
          await dialog.accept();
    });
  }
}
