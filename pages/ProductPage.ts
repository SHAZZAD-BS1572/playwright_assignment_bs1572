import { Page } from '@playwright/test';

export class ProductPage {
  constructor(private page: Page) {}

  async search(term: string) {
    await this.page.fill('input#search_product', term);
    await this.page.click('#submit_search');
  }

  async viewProduct() {
    await this.page.getByText('View Product').click();
  }

  async setQuantity(qty: number) {
    await this.page.fill('#quantity', String(qty));
  }

  async addToCart() {
    await this.page.click('button.cart');
  }
}
