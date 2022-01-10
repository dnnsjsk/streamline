import { newSpecPage } from '@stencil/core/testing';
import { StreamlineSidebar } from './streamline-sidebar';
import { dispose, state } from '../../store/internal';
import { disposeLocal } from '../../store/local';
import { setData } from '../../test/setData';

beforeEach(async () => {
  dispose();
  disposeLocal();
});

describe('Render sidebar', () => {
  it('as single site', async () => {
    const page = await newSpecPage({
      components: [StreamlineSidebar],
      html: `<streamline-sidebar></streamline-sidebar>`,
    });
    const el = page.doc.querySelector('streamline-sidebar').shadowRoot;
    expect(el.querySelectorAll('streamline-button').length).toBe(5);
  });
  it('as multisite', async () => {
    setData();
    state.menu = {
      ...state.menu,
      ...{
        site: {
          ...state.menu.site,
          condition: true,
        },
        network: {
          ...state.menu.network,
          condition: true,
        },
      },
    };
    const page = await newSpecPage({
      components: [StreamlineSidebar],
      html: `<streamline-sidebar></streamline-sidebar>`,
    });
    const el = page.doc.querySelector('streamline-sidebar').shadowRoot;
    expect(el.querySelectorAll('streamline-button').length).toBe(7);
  });
});
