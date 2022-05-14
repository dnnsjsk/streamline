import { newE2EPage } from '@stencil/core/testing';

describe('streamline-dropdown', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<streamline-dropdown></streamline-dropdown>');
    const element = await page.find('streamline-dropdown');
    const button = await page.find('streamline-dropdown >>> [role="button"]');
    expect(element).toHaveClass('hydrated');
    expect(button).toBeTruthy();
  });
});
