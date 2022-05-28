import { test, expect } from '@playwright/test';
import { t } from '../utils';

const save = async (page) => {
  await page.locator('streamline-header button').click({ force: true });
};

const label = async (page, type) => {
  await page.locator(`streamline-settings label[for="${type}"]`).click();
};

t((item) => {
  test.describe(`${item} Settings`, () => {
    test('should deactivate first and last checkbox', async ({ page }) => {
      await page.keyboard.press('Meta+ArrowUp');
      await label(page, 'setting-navigation');
      await label(page, 'setting-animation');
      await save(page);
    });

    test('should have two checkboxes deactivated', async ({ page }) => {
      await page.keyboard.press('Meta+ArrowUp');
      await expect(
        page.locator('streamline-settings input:checked')
      ).toHaveCount(2);
    });

    test('should activate first and last checkbox', async ({ page }) => {
      await page.keyboard.press('Meta+ArrowUp');
      await label(page, 'setting-navigation');
      await label(page, 'setting-animation');
      await save(page);
    });

    test('should have four checkboxes deactivated', async ({ page }) => {
      await page.keyboard.press('Meta+ArrowUp');
      await expect(
        page.locator('streamline-settings input:checked')
      ).toHaveCount(4);
    });
  });
}, true);
