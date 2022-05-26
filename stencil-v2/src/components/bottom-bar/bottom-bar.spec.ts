import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { dispose, state } from '../../store/internal';
import { StreamlineBottomBar } from './bottom-bar';
import { setActions } from '../../utils/entries/setActions';

const menu = require('../../../../stencil-v2/src/components/container/test/entriesMenu.json');
const fav = require('../../../../stencil-v2/src/components/container/test/entriesFav.json');
const post = require('../../../../stencil-v2/src/components/container/test/entriesPost.json');
const site = require('../../../../stencil-v2/src/components/container/test/entriesSite.json');

describe('streamline-bottom-bar', () => {
  let page: SpecPage;
  const e = () => page.doc.querySelector('streamline-bottom-bar').shadowRoot;

  const find = (term) => {
    return e().innerHTML.includes(term);
  };

  beforeEach(async () => {
    dispose();
    setActions();
    state.test = true;
    state.active = 'search';
    state.entriesSearch = [...menu, ...state.entriesActions];
    state.entriesSearchActive = [...menu, ...state.entriesActions];
    state.entriesFav = [...fav];
    state.entriesFavActive = [...fav];
    state.entriesPost = [...post];
    state.entriesPostActive = [...post];
    state.entriesSite = [...site];
    state.entriesSiteActive = [...site];
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

    it('pages', async () => {
      expect(find('Pages')).toBeFalsy();
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

    it('pages', async () => {
      expect(find('Pages')).toBeFalsy();
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

    it('pages', async () => {
      expect(find('Pages')).toBeFalsy();
    });

    it("entries when search value 'en'", async () => {
      state.searchValue = 'en';
      await page.waitForChanges();
      expect(find('2')).toBeTruthy();
    });
  });

  describe('post', () => {
    beforeEach(async () => {
      state.active = 'post';
      await page.waitForChanges();
    });

    it('active', async () => {
      expect(find('Post')).toBeTruthy();
    });

    it('pages', async () => {
      expect(find('Pages')).toBeTruthy();
    });
  });

  describe('site', () => {
    beforeEach(async () => {
      state.active = 'site';
      await page.waitForChanges();
    });

    it('active', async () => {
      expect(find('Site')).toBeTruthy();
    });

    it('pages', async () => {
      expect(find('Pages')).toBeTruthy();
    });
  });
});
