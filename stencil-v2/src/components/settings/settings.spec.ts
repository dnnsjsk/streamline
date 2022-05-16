import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { dispose } from '../../store/internal';
import { StreamlineSettings } from './settings';

describe('streamline-settings', () => {
  let page: SpecPage;
  const e = () => page.doc.querySelector('streamline-settings').shadowRoot;

  beforeEach(async () => {
    dispose();
    page = await newSpecPage({
      components: [StreamlineSettings],
      html: `<streamline-settings></streamline-settings>`,
    });
  });

  it('renders', async () => {
    expect(e()).toBeTruthy();
  });
});
