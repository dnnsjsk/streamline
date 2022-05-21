import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { dispose, state } from '../../store/internal';
import { StreamlineBottomBar } from './bottom-bar';
import { setActions } from '../../utils/entries/setActions';

const menu = require('../../../../stencil-v2/src/components/container/test/entriesMenu.json');
const fav = require('../../../../stencil-v2/src/components/container/test/entriesFav.json');

describe('streamline-bottom-bar', () => {
  let page: SpecPage;
  const e = () => page.doc.querySelector('streamline-bottom-bar').shadowRoot;

  const find = (term) => {
    return e().innerHTML.includes(term);
  };

  beforeEach(async () => {
    dispose();
    setActions();
    state.entriesSearch = [...menu, ...state.entriesActions];
    state.entriesSearchActive = [...menu, ...state.entriesActions];
    state.entriesFav = [...fav];
    state.entriesFavActive = [...fav];
    page = await newSpecPage({
      components: [StreamlineBottomBar],
      html: `<streamline-bottom-bar></streamline-bottom-bar>`,
    });
  });

  it('renders', async () => {
    expect(e()).toBeTruthy();
  });

  describe('search', () => {
    it('active', async () => {
      expect(find('Search')).toBeTruthy();
    });

    it('entries', async () => {
      expect(find('64')).toBeTruthy();
    });

    it("entries when search value 'home'", async () => {
      state.searchValue = 'home';
      await page.waitForChanges();
      expect(find('2')).toBeTruthy();
    });
  });

  describe('favourites', () => {
    beforeEach(async () => {
      state.active = 'fav';
      await page.waitForChanges();
    });

    it('active', async () => {
      expect(find('Favourites')).toBeTruthy();
    });

    it('entries', async () => {
      expect(find('12')).toBeTruthy();
    });

    it("entries when search value 'str'", async () => {
      state.searchValue = 'str';
      await page.waitForChanges();
      expect(find('3')).toBeTruthy();
    });
  });

  describe('settings', () => {
    beforeEach(async () => {
      state.active = 'settings';
      await page.waitForChanges();
    });

    it('active', async () => {
      expect(find('Settings')).toBeTruthy();
    });

    it('entries', async () => {
      expect(find('5')).toBeTruthy();
    });

    it("entries when search value 'en'", async () => {
      state.searchValue = 'en';
      await page.waitForChanges();
      expect(find('2')).toBeTruthy();
    });
  });
});
