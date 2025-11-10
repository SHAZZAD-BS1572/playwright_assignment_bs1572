import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { AuthPage } from '../pages/AuthPage';

test('User Registration Flow with Cleanup', async ({ page }) => {
  const home = new HomePage(page);
  const auth = new AuthPage(page);

  await home.goto();
  await expect(page).toHaveURL(/automationexercise/);

  await home.clickSignupLogin();
  await expect(page.getByText('New User Signup')).toBeVisible();

  // Generate unique email using a 4-digit random number
  const rand4 = Math.floor(1000 + Math.random() * 9000); // 1000-9999
  const email = `test_${rand4}@yopmail.com`;
  const password = 'Test1234';
  
  console.log('Email:', email);
  console.log('Password:', password);
  
  await auth.signup('John Doe', email);

  await expect(page).toHaveURL(/signup/);
  await expect(page.getByText('ENTER ACCOUNT INFORMATION')).toBeVisible();

  // Fill details
  await page.check('#id_gender1');
  await page.fill('#password', password);
  await page.selectOption('#days', '15');
  await page.selectOption('#months', 'June');
  await page.selectOption('#years', '1990');

  await page.check('#newsletter');
  await page.check('#optin');

  await page.fill('#first_name', 'Test');
  await page.fill('#last_name', 'User');
  await page.fill('#address1', '123 Test Street');
  await page.fill('#address2', 'Apt 456');
  await page.selectOption('#country', 'United States');
  await page.fill('#state', 'California');
  await page.fill('#city', 'Los Angeles');
  await page.fill('#zipcode', '90001');
  await page.fill('#mobile_number', '+1234567890');

  await page.click('button[data-qa="create-account"]');
  await expect(page.getByText('ACCOUNT CREATED!')).toBeVisible();

  await page.click('a[data-qa="continue-button"]');
  await expect(page.getByText('Logged in as')).toBeVisible();

  await page.click('a[href="/delete_account"]');
  await expect(page.getByText('ACCOUNT DELETED!')).toBeVisible();
});
