import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { dispose } from '../../store/internal';
import { StreamlineRow } from './row';

describe('streamline-row', () => {
  let page: SpecPage;
  const e = () => page.doc.querySelector('streamline-row').shadowRoot;

  beforeEach(async () => {
    dispose();
    page = await newSpecPage({
      components: [StreamlineRow],
      html: `<streamline-row></streamline-row>`,
    });
  });

  it('renders', async () => {
    expect(e()).toBeTruthy();
  });
});
