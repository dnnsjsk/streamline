import { newE2EPage, E2EPage } from '@stencil/core/testing';

describe('streamline-search', () => {
  let page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
  });

  it('visible prop works', async () => {
    await page.setContent('<streamline-search></streamline-search>');
    const input = await page.find('streamline-search >>> input');
    await input.press('M');
    await input.press('P');
    await input.press('H');
    const value = await input.getProperty('value');
    await page.waitForChanges();
    expect(value).toBe('MPH');
  });
});
