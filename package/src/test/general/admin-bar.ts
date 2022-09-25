import { test, expect } from '@playwright/test';

test.describe(`Admin bar`, () => {
  test('should open Streamline', async ({ page }) => {
    await page.goto(`https://fabrikat.local/streamline/wp-admin`);
    await page.fill('#user_login', 'testuser');
    await page.fill('#user_pass', 'testuser');
    await page.click('#wp-submit');
    await page.locator('#wp-admin-bar-streamline a').first().click();
    await expect(page.locator('streamline-container .inner')).toBeVisible();
  });
});
