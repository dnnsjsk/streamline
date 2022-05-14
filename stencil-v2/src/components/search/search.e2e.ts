import { newE2EPage } from '@stencil/core/testing';

describe('streamline-search', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<streamline-search></streamline-search>');
    const element = await page.find('streamline-search');
    expect(element).toHaveClass('hydrated');
  });

  it('visible prop works', async () => {
    const page = await newE2EPage();

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
