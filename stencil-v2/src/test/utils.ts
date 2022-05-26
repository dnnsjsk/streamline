import { test } from '@playwright/test';

export const t = (tests) => {
  const env = ['/account', '/wp-admin'];

  env.forEach((item) => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`https://fabrikat.local/streamline/${item}`);
      if (item === '/wp-admin') {
        await page.fill('#user_login', 'testuser');
        await page.fill('#user_pass', 'testuser');
        await page.click('#wp-submit');
      }
      await page.keyboard.press('Meta+K');
      await page
        .locator('streamline-container')
        .evaluate((node) => node.setAttribute('visible', ''));
      await page.locator('streamline-container .inner').first().waitFor({
        state: 'visible',
      });
    });

    tests(item);
  });
};
