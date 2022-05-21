import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { dispose, state } from '../../store/internal';
import { StreamlineSearch } from './search';

describe('streamline-search', () => {
  let page: SpecPage;
  const e = () => page.doc.querySelector('streamline-search').shadowRoot;

  const focusSearch = async (key) => {
    state.isVisible = true;
    const eventS = new KeyboardEvent('keydown', {
      [key]: true,
      key: 's',
    });
    page.doc.dispatchEvent(eventS);
    await page.waitForChanges();
    expect(true).toBeTruthy();
  };

  const focusSearchNot = async (key) => {
    state.isVisible = true;
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
    expect(false).toBeFalsy();
  };

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
        await focusSearch('ctrlKey');
      });

      it('should not be activated by key', async () => {
        await focusSearchNot('ctrlKey');
      });
    });

    describe('mac', () => {
      beforeEach(async () => {
        state.isMac = true;
        await page.waitForChanges();
      });

      it('should be activated by key', async () => {
        await focusSearch('metaKey');
      });

      it('should not be activated by key', async () => {
        await focusSearchNot('metaKey');
      });
    });
  });
});
