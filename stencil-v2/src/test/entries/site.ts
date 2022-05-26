import { test, expect } from '@playwright/test';
import { t } from '../utils';

t((item) => {
  test.describe(`${item} Site entries`, () => {
    test.beforeEach(async ({ page }) => {
      await page.locator('#streamline-search').focus();
    });

    test.describe('render with value', () => {
      test('s', async ({ page }) => {
        await page.type('#streamline-search', 'spx', { delay: 500 });
        await page.locator('streamline-row + streamline-row a').first().click();
        await expect(page.locator('text=Sites for')).toBeTruthy();
        await expect(page.locator('1/1')).toBeTruthy();
        await expect(page.locator('streamline-row')).toHaveCount(2);
      });

      test('str', async ({ page }) => {
        await page.type('#streamline-search', 'str', { delay: 500 });
        await page.locator('streamline-row + streamline-row a').first().click();
        await expect(page.locator('text=Sites for')).toBeTruthy();
        await expect(page.locator('1/1')).toBeTruthy();
        await expect(page.locator('streamline-row')).toHaveCount(1);
        await expect(
          page.locator('streamline-row:last-of-type[is-current-site]')
        ).toBeTruthy();
      });
    });

    test('choose new site', async ({ page }) => {
      await page.type('#streamline-search', 'spx', { delay: 500 });
      await page.locator('streamline-row + streamline-row a').first().click();
      await expect(page.locator('text=Sites for')).toBeTruthy();
      await expect(page.locator('1/1')).toBeTruthy();
      await expect(page.locator('streamline-row')).toHaveCount(2);
      await page.locator('streamline-row a').first().click();
      await expect(page.locator('Site: /spx/')).toBeTruthy();
      await page.locator('streamline-header button').click();
      await expect(page.locator('subsite: /spx/')).toBeTruthy();
      await expect(page.locator('streamline-row')).toHaveCount(103);
    });
  });
});
