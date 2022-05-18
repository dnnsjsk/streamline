import { SpecPage, newSpecPage } from '@stencil/core/testing';
import { StreamlineRows } from './rows';
import { StreamlineRow } from '../row/row';
import { dispose, state } from '../../store/internal';
import { setActions } from '../../utils/entries/setActions';

const menu = require('../../../../stencil-v2/src/components/container/test/entriesMenu.json');
const fav = require('../../../../stencil-v2/src/components/container/test/entriesFav.json');

describe('streamline-rows', () => {
  let page: SpecPage;
  const e = () => page.doc.querySelector('streamline-rows').shadowRoot;

  beforeEach(async () => {
    dispose();
    setActions();
    state.entriesSearch = [...menu, ...state.entriesActions];
    state.entriesSearchActive = [...menu, ...state.entriesActions];
    state.entriesFav = [...fav];
    state.entriesFavActive = [...fav];
    page = await newSpecPage({
      components: [StreamlineRows, StreamlineRow],
      html: `<streamline-rows></streamline-rows>`,
    });
  });

  it('renders', async () => {
    expect(e()).toBeTruthy();
  });

  describe('menu entries', () => {
    describe('in search', () => {
      it('render', async () => {
        const rows = e().querySelectorAll('streamline-row').length;
        await expect(rows).toBe(64);
      });

      it('render favourites', async () => {
        const rows = e().querySelectorAll('streamline-row[is-fav]').length;
        await expect(rows).toBe(9);
      });

      it("render when search is 'med'", async () => {
        state.searchValue = 'med';
        await page.waitForChanges();
        const rows = e().querySelectorAll('streamline-row').length;
        await expect(rows).toBe(4);
      });

      it("make post action clickable when search is 'post'", async () => {
        state.searchValue = 'post';
        await page.waitForChanges();
        const rows = e().querySelectorAll('streamline-row').length;
        await expect(rows).toBe(5);
        const row = e()
          .querySelector('streamline-row')
          .shadowRoot.querySelector('a')
          .classList.contains('pointer-events-none');
        await expect(row).not.toBeTruthy();
      });
    });

    describe('in favourites', () => {
      beforeEach(async () => {
        state.active = 'fav';
        await page.waitForChanges();
      });

      it('render', async () => {
        const rows = e().querySelectorAll('streamline-row').length;
        await expect(rows).toBe(12);
      });

      it("when search is 'd'", async () => {
        state.searchValue = 'd';
        await page.waitForChanges();
        const rows = e().querySelectorAll('streamline-row').length;
        await expect(rows).toBe(6);
      });
    });
  });
});
