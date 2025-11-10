import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { AuthPage } from '../pages/AuthPage';
import { ProductPage } from '../pages/ProductPage';

test('Complete Purchase Flow with Signup and Login', async ({ page }) => {
  const home = new HomePage(page);
  const auth = new AuthPage(page);
  const product = new ProductPage(page);

  // Generate unique email using a 4-digit random number
  const rand4 = Math.floor(1000 + Math.random() * 9000); // 1000-9999
  const email = `test${rand4}@yopmail.com`;
  const password = 'Pass1234';

  console.log('Login Credentials:');
  console.log('Email:', email);
  console.log('Password:', password);

  // Signup Flow
  await home.goto();
  await home.clickSignupLogin();
  
  // Fill signup form
  await page.fill('input[data-qa="signup-name"]', 'John Doe');
  await page.fill('input[data-qa="signup-email"]', email);
  await page.click('button[data-qa="signup-button"]');

  // Fill signup details
  await page.selectOption('select[data-qa="days"]', '10');
  await page.selectOption('select[data-qa="months"]', '5');
  await page.selectOption('select[data-qa="years"]', '1990');
  await page.check('#newsletter');
  await page.check('#optin');
  await page.fill('input[data-qa="first_name"]', 'John');
  await page.fill('input[data-qa="last_name"]', 'Doe');
  await page.fill('input[data-qa="password"]', password);
  await page.fill('input[data-qa="company"]', 'Test Company');
  await page.fill('input[data-qa="address"]', '123 Test Street');
  await page.fill('input[data-qa="address2"]', 'Apt 456');
  await page.selectOption('select[data-qa="country"]', 'United States');
  await page.fill('input[data-qa="state"]', 'California');
  await page.fill('input[data-qa="city"]', 'Los Angeles');
  await page.fill('input[data-qa="zipcode"]', '90001');
  await page.fill('input[data-qa="mobile_number"]', '1234567890');
  await page.click('button[data-qa="create-account"]');

  await expect(page.getByText('Account Created!')).toBeVisible();
  await page.click('a[data-qa="continue-button"]');

  // Logout to test login
  await page.click('a[href="/logout"]');

  // Login with created credentials
  await home.clickSignupLogin();
  await auth.login(email, password);
  await expect(page.getByText('Logged in as')).toBeVisible();

  // Rest of the purchase flow remains same
  await home.clickProducts();
  await expect(page.getByText('All Products')).toBeVisible();

  await product.search('Premium Polo T-Shirts');
  await product.viewProduct();
  await product.setQuantity(2);
  await product.addToCart();

  await expect(page.getByText('added to cart')).toBeVisible();
  await page.click('button.close-modal');

  await home.clickCart();
  await expect(page).toHaveURL(/view_cart/);

  await page.click("//a[normalize-space()='Proceed To Checkout']");
  await page.click("//a[normalize-space()='Place Order']");

  await page.fill("//input[@name='name_on_card']", 'John Doe');
  await page.fill("//input[@name='card_number']", '4532015112830366');
  await page.fill("//label[text()='CVC']/following-sibling::input", '123');
  await page.fill("//input[@data-qa='expiry-month']", '12');
  await page.fill("//input[@data-qa='expiry-year']", '2028');

  await page.click("(//button[normalize-space()='Pay and Confirm Order'])[1]");
  await expect(page.locator("//p[normalize-space()='Congratulations! Your order has been confirmed!']")).toBeVisible();
});
