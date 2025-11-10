import { Page } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  async clickSignupLogin() {
    await this.page.getByText('Signup / Login').click();
  }

  async clickProducts() {
    await this.page.getByText('Products').click();
  }

  async clickCart() {
    await this.page.locator("//a[normalize-space(text())='Cart']").click();

  }
}
