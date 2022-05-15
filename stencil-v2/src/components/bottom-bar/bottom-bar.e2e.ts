import { newE2EPage } from '@stencil/core/testing';

describe('streamline-bottom-bar', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<streamline-container></streamline-container>');
    const el = await page.find('streamline-container >>> streamline-bottom-bar');
    expect(el).toHaveClass('hydrated');
  });
});
