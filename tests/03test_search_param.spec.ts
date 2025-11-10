import { test, expect } from '@playwright/test';
import fs from 'fs';
import { parse } from 'csv-parse/sync';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';

const records = parse(fs.readFileSync('data/products.csv'), { columns: true });

for (const row of records) {
  test(`Search & Validate Product: ${row.title}`, async ({ page }) => {
    const home = new HomePage(page);
    const product = new ProductPage(page);

    await home.goto();
    await expect(page).toHaveURL(/automationexercise/);

    await home.clickProducts();
    await expect(page.getByText('All Products')).toBeVisible();

    await product.search(row.title);
    await product.viewProduct();

    await expect(page.getByText(row.title)).toBeVisible();

    // Normalize price (remove whitespace) and match element text ignoring spaces.
    const priceNormalized = row.price.replace(/\s+/g, '');
    await expect(page.locator(`xpath=//span[translate(normalize-space(.), ' ', '')='${priceNormalized}']`)).toBeVisible();

    //await expect(page.getByText(row.price)).toBeVisible();
  });
}
