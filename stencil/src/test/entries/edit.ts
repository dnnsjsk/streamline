import { test, expect } from '@playwright/test';
import { focus, t } from "../utils";

const click = async (page, row, button) => {
  await page
    .locator(
      `streamline-row:nth-of-type(${row}) streamline-dropdown div[role="button"]`
    )
    .first()
    .hover();
  await page
    .locator(
      `streamline-row:nth-of-type(${row}) streamline-dropdown li:nth-of-type(${button}) a`
    )
    .click({ force: true });
};

const dblclick = async (page) => {
  await page.locator(`streamline-row`).first().dblclick();
};

const inputType = async (page, text, slug = false) => {
  await page.type(
    slug
      ? 'streamline-row:first-of-type div > div:nth-of-type(3) input'
      : 'streamline-row:first-of-type input:first-of-type',
    text,
    { delay: 500 }
  );
};

const drawerInputType = async (page, text, slug = false) => {
  await page.type(
    slug
      ? 'streamline-drawer streamline-input:last-of-type input'
      : 'streamline-drawer streamline-input:first-of-type input',
    text,
    { delay: 500 }
  );
};

const inputFocus = async (page, slug = false) => {
  await page.focus(
    slug
      ? 'streamline-row:first-of-type div > div:nth-of-type(3) input'
      : 'streamline-row:first-of-type input:first-of-type'
  );
};

const drawerInputFocus = async (page, slug = false) => {
  await page.focus(
    slug
      ? 'streamline-drawer streamline-input:last-of-type input'
      : 'streamline-drawer streamline-input:first-of-type input'
  );
};

const save = async (page) => {
  await page.locator(`streamline-drawer button`).click();
  await expect(page.locator('streamline-drawer div').first()).toHaveClass(
    /opacity-0/
  );
};

t((item) => {
  test.describe(`${item} Edit entries`, () => {
    test.beforeEach(async ({ page }) => {
      await focus(page);
      await page.type('#streamline-search', 'home', { delay: 500 });
      await page.locator('streamline-row a').first().click();
      await expect(page.locator('text=Posts for')).toBeTruthy();
    });

    test.describe(`on desktop`, () => {
      test('edit homepage', async ({ page }) => {
        await click(page, 1, 2);
        await expect(page.locator('.text-green-600')).toBeTruthy();
        await inputType(page, 'Test ');
        await inputType(page, 'test-', true);
        await click(page, 1, 1);
      });

      test('reset homepage to original values', async ({ page }) => {
        await click(page, 1, 2);
        await expect(page.locator('.text-green-600')).toBeTruthy();
        await expect(page.locator('text=Test Home')).toBeTruthy();
        await expect(page.locator('text=test-home')).toBeTruthy();
        await inputFocus(page);
        await page.keyboard.press('Meta+KeyA');
        await page.keyboard.press('Backspace');
        await inputType(page, 'Home');
        await inputFocus(page, true);
        await page.keyboard.press('Meta+KeyA');
        await page.keyboard.press('Backspace');
        await inputType(page, 'home', true);
        await click(page, 1, 1);
      });

      test('check values', async ({ page }) => {
        await expect(page.locator('text=Home')).toBeTruthy();
        await expect(page.locator('text=home')).toBeTruthy();
      });
    });

    test.describe(`on mobile`, () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({
          width: 375,
          height: 600,
        });
      });

      test('edit homepage', async ({ page }) => {
        await dblclick(page);
        await drawerInputType(page, 'Test ');
        await drawerInputType(page, 'test-', true);
        await save(page);
      });

      test('reset homepage to original values', async ({ page }) => {
        await dblclick(page);
        await expect(page.locator('text=Test Home')).toBeTruthy();
        await expect(page.locator('text=test-home')).toBeTruthy();
        await drawerInputFocus(page);
        await page.keyboard.press('Meta+KeyA');
        await page.keyboard.press('Backspace');
        await drawerInputType(page, 'Home');
        await drawerInputFocus(page, true);
        await page.keyboard.press('Meta+KeyA');
        await page.keyboard.press('Backspace');
        await drawerInputType(page, 'home', true);
        await save(page);
      });

      test('check values', async ({ page }) => {
        await dblclick(page);
        await expect(page.locator('text=Test Home')).toBeTruthy();
        await expect(page.locator('text=test-home')).toBeTruthy();
      });
    });
  });
}, true);
