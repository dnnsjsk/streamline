import { newE2EPage } from '@stencil/core/testing';

describe('streamline-row', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<streamline-container></streamline-container>');
    const el = await page.find(
      'streamline-container >>> streamline-entries >>> streamline-rows >>> streamline-row'
    );
    expect(el).toHaveClass('hydrated');
  });
});
