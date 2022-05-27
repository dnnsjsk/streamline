import { test, expect } from '@playwright/test';
import { t } from '../utils';

const add = async (page, number) => {
  await page
    .locator(
      `streamline-row:nth-of-type(${number}) streamline-dropdown div[role="button"]`
    )
    .first()
    .hover();
  await page
    .locator(`streamline-row:nth-of-type(${number}) streamline-dropdown a`)
    .first()
    .click({ force: true });
};

const favPosts = async (page, second = true) => {
  await page.click('#streamline-search', {
    clickCount: 10,
  });
  await page.type('#streamline-search', 'ss', { delay: 500 });
  await page.locator('streamline-row a').first().click({ force: true });
  await expect(page.locator('text=Posts for')).toBeTruthy();
  await add(page, 1);
  await expect(page.locator('streamline-row[is-fav]')).toHaveCount(1);
  if (second) {
    await add(page, 2);
    await expect(page.locator('streamline-row[is-fav]')).toHaveCount(2);
  }
};

const chooseSpx = async (page) => {
  await page.click('#streamline-search', {
    clickCount: 10,
  });
  await page.type('#streamline-search', 'spx', { delay: 500 });
  await page
    .locator('streamline-row + streamline-row a')
    .first()
    .click({ force: true });
  await expect(page.locator('text=Sites for')).toBeTruthy();
  await page.locator('streamline-row a').first().click();
  await expect(page.locator('streamline-row[is-current-site]')).toHaveCount(1);
  await page.locator('streamline-header button').click();
  await expect(page.locator('subsite: /spx/')).toBeTruthy();
};

t((item) => {
  test.describe(`${item} Fav entries`, () => {
    test.describe('add favourites', () => {
      test('/streamline/ - home', async ({ page }) => {
        await add(page, 1);
        await expect(page.locator('streamline-row[is-fav]')).toHaveCount(1);
      });

      test('/streamline/ - user searches', async ({ page }) => {
        await add(page, 2);
        await expect(page.locator('streamline-row[is-fav]')).toHaveCount(2);
      });
    });

    test('choose /spx/ and add favourites', async ({ page }) => {
      await chooseSpx(page);
      await add(page, 1);
      await expect(page.locator('streamline-row[is-fav]')).toHaveCount(1);
      await add(page, 2);
      await expect(page.locator('streamline-row[is-fav]')).toHaveCount(2);
    });

    test('add favourites from /streamline/ posts', async ({ page }) => {
      await favPosts(page);
    });

    test('add favourites from /spx/ posts', async ({ page }) => {
      await chooseSpx(page);
      await favPosts(page, false);
    });

    test('remove favourites', async ({ page }) => {
      await page.keyboard.press('Meta+ArrowDown');
      await expect(page.locator('text=Posts')).toBeTruthy();
      await expect(page.locator('streamline-row')).toHaveCount(7);
      await add(page, 1);
      await expect(page.locator('streamline-row')).toHaveCount(6);
      await add(page, 1);
      await expect(page.locator('streamline-row')).toHaveCount(5);
      await add(page, 1);
      await expect(page.locator('streamline-row')).toHaveCount(4);
      await add(page, 1);
      await expect(page.locator('streamline-row')).toHaveCount(3);
      await add(page, 1);
      await expect(page.locator('streamline-row')).toHaveCount(2);
      await add(page, 1);
      await expect(page.locator('streamline-row')).toHaveCount(1);
      await add(page, 1);
      await expect(page.locator('streamline-row')).toHaveCount(0);
    });
  });
}, true);
