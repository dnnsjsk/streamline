import { newSpecPage } from '@stencil/core/testing';
import { StreamlineSearch } from './streamline-search';
import { disposeInternal, stateInternal } from '../../store/internal';
import { disposeLocal, stateLocal } from '../../store/local';

beforeEach(async () => {
  disposeInternal();
  disposeLocal();
});

describe('Render search', function () {
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
    stateInternal.isEnter = true;
    const page = await newSpecPage({
      components: [StreamlineSearch],
      html: `<streamline-search></streamline-search>`,
    });
    await page.waitForChanges();
    const el = page.doc
      .querySelector('streamline-search')
      .shadowRoot.querySelector('streamline-button');
    expect(el).toEqualHtml(`
<streamline-button text="Search"/></streamline-button>
    `);
  });
});

it("Activate 'slash' mode after typing '/'", async () => {
  stateInternal.searchValue = '/';
  const page = await newSpecPage({
    components: [StreamlineSearch],
    html: `<streamline-search></streamline-search>`,
  });
  const input = page.doc
    .querySelector('streamline-search')
    .shadowRoot.querySelector('input');
  input.value = '/';
  input.dispatchEvent(new Event('input'));
  expect(stateInternal.isSlash).toBe(true);
});

describe('Search value between different modes should', function () {
  it("persist'", async () => {
    stateInternal.searchValue = 'test';
    stateInternal.entriesSettingsLoad = {
      ...stateInternal.entriesSettingsLoad,
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
    expect(stateInternal.searchValue).toBe('test');
  });
  it("not persist'", async () => {
    stateInternal.searchValue = 'test';
    await newSpecPage({
      components: [StreamlineSearch],
      html: `<streamline-search></streamline-search>`,
    });
    stateLocal.active = 'fav';
    expect(stateInternal.searchValue).toBe('');
  });
});
