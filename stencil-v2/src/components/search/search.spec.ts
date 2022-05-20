import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { dispose, state } from '../../store/internal';
import { StreamlineSearch } from './search';

const focusSearch = async (page, key) => {
  state.isVisible = true;
  const eventS = new KeyboardEvent('keydown', {
    [key]: true,
    key: 's',
  });
  page.doc.dispatchEvent(eventS);
  await page.waitForChanges();
  expect(state.isSearchFocus).toBeTruthy();
};

const focusSearchNot = async (page, key) => {
  state.isVisible = true;
  state.isSearchFocus = false;
  state.entriesSettingsLoad = {
    ...state.entriesSettingsLoad,
    keys: {
      ...state.entriesSettingsLoad.keys,
      search: false,
    },
  };
  const eventS = new KeyboardEvent('keydown', {
    [key]: true,
    key: 's',
  });
  page.doc.dispatchEvent(eventS);
  await page.waitForChanges();
  expect(state.isSearchFocus).toBeFalsy();
};

describe('streamline-search', () => {
  let page: SpecPage;
  const e = () => page.doc.querySelector('streamline-search').shadowRoot;

  beforeEach(async () => {
    dispose();
    page = await newSpecPage({
      components: [StreamlineSearch],
      html: `<streamline-search></streamline-search>`,
    });
  });

  it('renders', async () => {
    expect(e()).toBeTruthy();
  });

  it('types', async () => {
    const input = e().querySelector('input');
    input.value = 'MPH';
    input.dispatchEvent(new Event('input'));
    await page.waitForChanges();
    expect(input.value).toBe('MPH');
    expect(state.searchValue).toBe('MPH');
  });

  describe('key command on', () => {
    describe('windows', () => {
      it('should be activated by key', async () => {
        await focusSearch(page, 'ctrlKey');
      });

      it('should not be activated by key', async () => {
        await focusSearchNot(page, 'ctrlKey');
      });
    });

    describe('mac', () => {
      beforeEach(async () => {
        state.isMac = true;
        await page.waitForChanges();
      });

      it('should be activated by key', async () => {
        await focusSearch(page, 'metaKey');
      });

      it('should not be activated by key', async () => {
        await focusSearchNot(page, 'metaKey');
      });
    });
  });
});
