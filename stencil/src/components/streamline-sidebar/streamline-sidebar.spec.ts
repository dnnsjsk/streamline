import { newSpecPage } from '@stencil/core/testing';
import { StreamlineSidebar } from './streamline-sidebar';
import { dispose, state } from '../../store/internal';
import { disposeLocal, stateLocal } from '../../store/local';

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
    expect(el.querySelectorAll('button').length).toBe(5);
  });
  it('as multisite', async () => {
    state.menu = {
      ...state.menu,
      ...{
        site: {
          ...state.menu.site,
          condition: true,
        },
        network: {
          ...state.menu.networkMenu,
          condition: true,
        },
      },
    };
    const page = await newSpecPage({
      components: [StreamlineSidebar],
      html: `<streamline-sidebar></streamline-sidebar>`,
    });
    const el = page.doc.querySelector('streamline-sidebar').shadowRoot;
    expect(el.querySelectorAll('button').length).toBe(7);
  });
  it("with default tab set to 'last'", async () => {
    await newSpecPage({
      components: [StreamlineSidebar],
      html: `<streamline-sidebar></streamline-sidebar>`,
    });
    state.visible = true;
    expect(stateLocal.active).toBe('menu');
    state.visible = false;
    stateLocal.active = 'post';
    state.visible = true;
    expect(stateLocal.active).toBe('post');
  });
  it("with default tab set to 'post'", async () => {
    state.entriesSettingsLoad = {
      ...state.entriesSettingsLoad,
      ...{
        behaviourDefaultTab: {
          default: 'post',
        },
      },
    };
    await newSpecPage({
      components: [StreamlineSidebar],
      html: `<streamline-sidebar></streamline-sidebar>`,
    });
    state.visible = true;
    expect(stateLocal.active).toBe('post');
    state.visible = false;
    stateLocal.active = 'menu';
    state.visible = true;
    expect(stateLocal.active).toBe('post');
  });
});
