import { newSpecPage } from '@stencil/core/testing';
import { StreamlineInput } from './streamline-input';

describe('Render input', function () {
  it('as invalid', async () => {
    const page = await newSpecPage({
      components: [StreamlineInput],
      html: `<streamline-input></streamline-input>`,
    });
    const el = page.doc
      .querySelector('streamline-input')
      .shadowRoot.querySelector('input');
    el.value = '123';
    el.value = '';
    el.dispatchEvent(new Event('input'));
    await page.waitForChanges();
    expect(el.classList.contains('border-invalid')).toBe(true);
  });
});
