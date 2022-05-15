import { newE2EPage } from '@stencil/core/testing';

describe('streamline-container', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<streamline-container></streamline-container>');
    const el = await page.find('streamline-container');
    expect(el).toHaveClass('hydrated');
  });

  it('is visible with prop', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<streamline-container visible></streamline-container>'
    );
    const inner = await page.find('streamline-container >>> div');
    expect(inner).toHaveClass('opacity-100');
  });
});
