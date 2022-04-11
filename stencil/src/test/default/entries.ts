import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://fabrikat.local/streamline/wp-admin');
  await page.fill('#user_login', 'testuser');
  await page.fill('#user_pass', 'testuser');
  await page.click('#wp-submit');
  await page.keyboard.press('Meta+K');
  await page
    .locator('streamline-container')
    .evaluate((node) => node.setAttribute('visible', ''));
  await page.locator('streamline-container .inner').first().waitFor({
    state: 'visible',
  });
});

test.describe('Search', () => {
  test('to be focused', async ({ page }) => {
    await expect(page.locator('input:focus')).toHaveId('search');
  });
});

test.describe('Entries', () => {
  test.describe('are filtered with search value of', () => {
    test('da', async ({ page }) => {
      await page.keyboard.type('da');
      await expect(page.locator('[data-entry]')).toHaveCount(12);
    });
    test('post', async ({ page }) => {
      await page.keyboard.type('post');
      await expect(page.locator('[data-entry]')).toHaveCount(7);
    });
  });

  test.describe('are focused on pressing ', () => {
    test('arrow down', async ({ page }) => {
      await page.keyboard.down('ArrowDown');
      await expect(
        await page.locator(
          '[data-entry-section="menu"] > ul:first-child [data-focus]:focus'
        )
      ).toBeTruthy();
    });
    test('arrow up', async ({ page }) => {
      await page.keyboard.down('ArrowUp');
      await expect(
        await page.locator(
          '[data-entry-section="menu"] > ul:last-child [data-focus]:focus'
        )
      ).toBeTruthy();
    });
  });
});
