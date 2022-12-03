import { test, expect } from '@playwright/test';
import { focus, t } from '../utils';

test.describe.configure({ mode: 'parallel' });
t((item) => {
  test.describe(`${item} Search entries`, () => {
    test.describe('render', () => {
      test('normally', async ({ page }) => {
        await expect(page.locator('streamline-row')).toHaveCount(104);
        await expect(page.locator('text=subsite: /streamline/')).toBeTruthy();
      });

      test("when searching for 'post'", async ({ page }) => {
        await focus(page);
        await page.type('#streamline-search', 'post', { delay: 100 });
        await expect(page.locator('streamline-row')).toHaveCount(7);
      });
    });

    test.describe('are focused when pressing', () => {
      test('arrow down', async ({ page }) => {
        await page.keyboard.down('ArrowDown');
        await expect(
          await page.locator('streamline-row:first-of-type a:focus')
        ).toBeTruthy();
      });
      test('arrow up', async ({ page }) => {
        await page.keyboard.down('ArrowUp');
        await expect(
          await page.locator('streamline-row:last-of-type a:focus')
        ).toBeTruthy();
      });
    });
  });
});
