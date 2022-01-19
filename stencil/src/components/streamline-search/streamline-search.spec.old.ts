import { newSpecPage } from '@stencil/core/testing';
import { StreamlineSearch } from './streamline-search';
import { dispose, state } from '../../store/internal';
import { disposeLocal, stateLocal } from '../../store/local';

beforeEach(async () => {
  dispose();
  disposeLocal();
});

describe('Render search', () => {
  it('without enter button', async () => {
    const page = await newSpecPage({
      components: [StreamlineSearch],
      html: `<streamline-search></streamline-search>`,
    });
    await page.waitForChanges();
    const el = page.doc
      .querySelector('streamline-search')
      .shadowRoot.querySelector('streamline-button');
    expect(el).toBe(null);
  });
  it('with enter button', async () => {
    state.isEnter = true;
    const page = await newSpecPage({
      components: [StreamlineSearch],
      html: `<streamline-search></streamline-search>`,
    });
    await page.waitForChanges();
    const el = page.doc
      .querySelector('streamline-search')
      .shadowRoot.querySelector('streamline-button');
    expect(el).toEqualHtml(`
<streamline-button text="Search" type="button"></streamline-button>
    `);
  });
});

// eslint-disable-next-line jest/no-commented-out-tests
/*
it("Activate 'slash' mode after typing '/'", async () => {
  state.searchValue = '/';
  const page = await newSpecPage({
    components: [StreamlineSearch],
    html: `<streamline-search></streamline-search>`,
  });
  const input = page.doc
    .querySelector('streamline-search')
    .shadowRoot.querySelector('input');
  input.value = '/';
  input.dispatchEvent(new Event('input'));
  expect(state.isSlash).toBe(true);
});
 */

describe('Search value between different modes should', () => {
  it("persist'", async () => {
    state.searchValue = 'test';
    state.entriesSettingsLoad = {
      ...state.entriesSettingsLoad,
      ...{
        searchResetInput: {
          default: false,
        },
      },
    };
    await newSpecPage({
      components: [StreamlineSearch],
      html: `<streamline-search></streamline-search>`,
    });
    stateLocal.active = 'fav';
    expect(state.searchValue).toBe('test');
  });
  it("not persist'", async () => {
    state.searchValue = 'test';
    await newSpecPage({
      components: [StreamlineSearch],
      html: `<streamline-search></streamline-search>`,
    });
    stateLocal.active = 'fav';
    expect(state.searchValue).toBe('');
  });
});
