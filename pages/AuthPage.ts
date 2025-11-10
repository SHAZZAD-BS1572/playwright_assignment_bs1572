import { Page } from '@playwright/test';

export class AuthPage {
  constructor(private page: Page) {}

  async signup(name: string, email: string) {
    await this.page.fill("//input[@placeholder='Name']", name);
    await this.page.fill("//input[@data-qa='signup-email']", email);
    await this.page.click("//button[normalize-space()='Signup']");
  }

  async login(email: string, password: string) {
    await this.page.fill("//input[@data-qa='login-email']", email);
    await this.page.fill("//input[@data-qa='login-password']", password);
    await this.page.click("//button[normalize-space()='Login']");
  }
}
