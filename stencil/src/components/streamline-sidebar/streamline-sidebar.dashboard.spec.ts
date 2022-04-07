import { newSpecPage } from '@stencil/core/testing';
import { StreamlineSidebar } from './streamline-sidebar';
import { dispose, state } from '../../store/internal';

beforeEach(() => {
  dispose();
  state.entriesSettingsLoad = {
    ...state.entriesSettingsLoad,
    ...{
      mode: {
        default: 'dashboard',
      },
    },
  };
});

describe('Render sidebar', () => {
  it('as single site', async () => {
    const page = await newSpecPage({
      components: [StreamlineSidebar],
      html: `<streamline-sidebar></streamline-sidebar>`,
    });
    const el = page.doc.querySelector('streamline-sidebar').shadowRoot;
    expect(el.querySelectorAll('button').length).toBe(6);
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
    expect(el.querySelectorAll('button').length).toBe(8);
  });
  it("with default tab set to 'last'", async () => {
    await newSpecPage({
      components: [StreamlineSidebar],
      html: `<streamline-sidebar></streamline-sidebar>`,
    });
    state.visible = true;
    expect(state.active).toBe('search');
    state.visible = false;
    state.active = 'post';
    state.visible = true;
    expect(state.active).toBe('post');
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
    expect(state.active).toBe('post');
    state.visible = false;
    state.active = 'menu';
    state.visible = true;
    expect(state.active).toBe('post');
  });
});
