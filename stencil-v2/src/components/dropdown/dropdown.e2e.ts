import { newE2EPage } from '@stencil/core/testing';

describe('streamline-dropdown', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<streamline-container></streamline-container>');
    const el = await page.find('streamline-container >>> streamline-dropdown');
    const button = await page.find('streamline-container >>> streamline-dropdown >>> [role="button"]');
    expect(el).toHaveClass('hydrated');
    expect(button).toBeTruthy();
  });
});
