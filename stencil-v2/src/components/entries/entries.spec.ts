import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { dispose, state } from '../../store/internal';
import { StreamlineEntries } from './entries';
import { StreamlineRows } from '../rows/rows';
import { StreamlineRow } from '../row/row';
import { setActions } from '../../utils/entries/setActions';

const menu = require('../../../../stencil-v2/src/components/container/test/entriesMenu.json');
const fav = require('../../../../stencil-v2/src/components/container/test/entriesFav.json');

describe('streamline-entries', () => {
  let page: SpecPage;
  const e = () => page.doc.querySelector('streamline-entries').shadowRoot;

  beforeEach(async () => {
    dispose();
    setActions();
    state.active = 'search';
    state.entriesSearch = [...state.entriesActions, ...menu];
    state.entriesSearchActive = [...state.entriesActions, ...menu];
    state.entriesFav = [...fav];
    state.entriesFavActive = [...fav];
    page = await newSpecPage({
      components: [StreamlineEntries, StreamlineRows, StreamlineRow],
      html: `<streamline-entries></streamline-entries>`,
    });
    state.isVisible = true;
    await page.waitForChanges();
  });

  it('renders', async () => {
    expect(e()).toBeTruthy();
  });

  describe('Key press', () => {
    it('should cycle through all entries', async () => {
      const eventUp = new KeyboardEvent('keydown', {
        key: 'ArrowUp',
      });
      const eventDown = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
      });
      page.doc.dispatchEvent(eventUp);
      await page.waitForChanges();
      expect(state.focusIndex).toBe(62);
      page.doc.dispatchEvent(eventUp);
      await page.waitForChanges();
      expect(state.focusIndex).toBe(61);
      page.doc.dispatchEvent(eventDown);
      await page.waitForChanges();
      expect(state.focusIndex).toBe(62);
      page.doc.dispatchEvent(eventDown);
      await page.waitForChanges();
      expect(state.focusIndex).toBe(0);
      page.doc.dispatchEvent(eventDown);
      await page.waitForChanges();
      expect(state.focusIndex).toBe(1);
    });

    it('should cycle through all entries with enabled action', async () => {
      state.searchValue = 'de';
      await page.waitForChanges();
      const eventUp = new KeyboardEvent('keydown', {
        key: 'ArrowUp',
      });
      const eventDown = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
      });
      page.doc.dispatchEvent(eventUp);
      await page.waitForChanges();
      expect(state.focusIndex).toBe(2);
      page.doc.dispatchEvent(eventUp);
      await page.waitForChanges();
      expect(state.focusIndex).toBe(1);
      page.doc.dispatchEvent(eventDown);
      await page.waitForChanges();
      expect(state.focusIndex).toBe(2);
      page.doc.dispatchEvent(eventDown);
      await page.waitForChanges();
      expect(state.focusIndex).toBe(0);
      page.doc.dispatchEvent(eventDown);
      await page.waitForChanges();
      expect(state.focusIndex).toBe(1);
    });

    it('should not cycle through all entries', async () => {
      state.entriesSettingsLoad = {
        ...state.entriesSettingsLoad,
        ...{
          keys: {
            ...state.entriesSettingsLoad.keys,
            navigation: false,
          },
        },
      };
      const eventDown = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
      });
      page.doc.dispatchEvent(eventDown);
      await page.waitForChanges();
      expect(state.focusIndex).toBe(-1);
    });
  });

  it('focus index should be reset after change active', async () => {
    state.searchValue = 'de';
    await page.waitForChanges();
    const eventUp = new KeyboardEvent('keydown', {
      key: 'ArrowUp',
    });
    page.doc.dispatchEvent(eventUp);
    await page.waitForChanges();
    expect(state.focusIndex).toBe(2);
    state.active = 'fav';
    await page.waitForChanges();
    expect(state.focusIndex).toBe(-1);
  });
});
