import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://fabrikat.local/streamline/wp-admin');
  await page.fill('#user_login', 'testuser');
  await page.fill('#user_pass', 'testuser');
  await page.click('#wp-submit');
  await page.keyboard.press('Meta+K');
  await page.waitForSelector('#search');
  await page
    .locator('streamline-container')
    .evaluate((node) => node.setAttribute('visible', ''));
});

test.describe('Entries', () => {
  test.describe('are filtered with search value of ', () => {
    test('da', async ({ page }) => {
      await page.fill('#search', 'da');
      await expect(page.locator('[data-entry]')).toHaveCount(12);
    });

    test('post', async ({ page }) => {
      await page.fill('#search', 'post');
      await page.screenshot({ path: 'screenshot.png' });
      await expect(page.locator('[data-entry]')).toHaveCount(7);
    });
  });
});
