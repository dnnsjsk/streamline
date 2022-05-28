import { test, expect } from '@playwright/test';
import { focus, t } from '../utils';

test.describe.configure({ mode: 'parallel' });
t((item) => {
  test.describe(`${item} Post entries`, () => {
    test.beforeEach(async ({ page }) => {
      await focus(page);
    });

    test.describe('render with value', () => {
      test('home', async ({ page }) => {
        await page.type('#streamline-search', 'home', { delay: 500 });
        await page.locator('streamline-row a').first().click();
        await expect(page.locator('text=Posts for')).toBeTruthy();
        await expect(page.locator('1/1')).toBeTruthy();
        await expect(page.locator('streamline-row')).toHaveCount(3);
      });

      test('io', async ({ page }) => {
        const nextButton = page.locator(
          'streamline-header .pagination button:nth-last-child(1)'
        );
        const next = () => nextButton.click();
        await page.type('#streamline-search', 'io', { delay: 500 });
        await page.locator('streamline-row a').first().click();
        await expect(page.locator('text=Posts for')).toBeTruthy();
        await expect(page.locator('1/6')).toBeTruthy();
        await expect(page.locator('streamline-row')).toHaveCount(20);
        await next();
        await expect(page.locator('2/6')).toBeTruthy();
        await next();
        await expect(page.locator('3/6')).toBeTruthy();
        await next();
        await expect(page.locator('4/6')).toBeTruthy();
        await next();
        await expect(page.locator('5/6')).toBeTruthy();
        await next();
        await expect(page.locator('6/6')).toBeTruthy();
      });

      test("'io' and search for new entry", async ({ page }) => {
        const nextButton = page.locator(
          'streamline-header .pagination button:nth-last-child(1)'
        );
        const next = () => nextButton.click();
        await page.type('#streamline-search', 'io', { delay: 500 });
        await page.locator('streamline-row a').first().click();
        await expect(page.locator('text=Posts for')).toBeTruthy();
        await expect(page.locator('1/6')).toBeTruthy();
        await expect(page.locator('streamline-row')).toHaveCount(20);
        await next();
        await expect(page.locator('2/6')).toBeTruthy();
        await next();
        await expect(page.locator('3/6')).toBeTruthy();
        await focus(page);
        await page.type('#streamline-search', 'home', { delay: 500 });
        await page.locator('streamline-search button').click();
        await expect(page.locator('1/1')).toBeTruthy();
      });
    });
  });
});
