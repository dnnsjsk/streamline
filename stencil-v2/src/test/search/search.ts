import { test, expect } from '@playwright/test';
import { t } from '../utils';

t((item) => {
  test.describe(`${item} Search`, () => {
    test('to be focused', async ({ page }) => {
      await expect(page.locator('streamline-container input')).toHaveId(
        'streamline-search'
      );
    });
  });
});
