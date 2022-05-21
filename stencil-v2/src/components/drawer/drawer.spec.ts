import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { dispose, state } from '../../store/internal';
import { StreamlineDrawer } from './drawer';

describe('streamline-drawer', () => {
  let page: SpecPage;
  const e = () => page.doc.querySelector('streamline-drawer').shadowRoot;

  beforeEach(async () => {
    dispose();
    state.active = 'search';
    page = await newSpecPage({
      components: [StreamlineDrawer],
      html: `<streamline-Drawer></streamline-Drawer>`,
    });
  });

  it('renders', async () => {
    expect(e()).toBeTruthy();
  });
});
