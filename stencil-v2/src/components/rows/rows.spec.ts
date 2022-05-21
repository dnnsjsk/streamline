import { SpecPage, newSpecPage } from '@stencil/core/testing';
import { StreamlineRows } from './rows';
import { StreamlineRow } from '../row/row';
import { dispose, state } from '../../store/internal';
import { setActions } from '../../utils/entries/setActions';
import { StreamlineHeader } from '../header/header';
import { StreamlineDropdown } from '../dropdown/dropdown';

const menu = require('../../../../stencil-v2/src/components/container/test/entriesMenu.json');
const fav = require('../../../../stencil-v2/src/components/container/test/entriesFav.json');

describe('streamline-rows', () => {
  let page: SpecPage;
  const e = () => page.doc.querySelector('streamline-rows').shadowRoot;

  beforeEach(async () => {
    dispose();
    setActions();
    state.test = true;
    state.active = 'search';
    state.entriesSearch = [...menu, ...state.entriesActions];
    state.entriesSearchActive = [...menu, ...state.entriesActions];
    state.entriesFav = [...fav];
    state.entriesFavActive = [...fav];
    page = await newSpecPage({
      components: [
        StreamlineRows,
        StreamlineHeader,
        StreamlineRow,
        StreamlineDropdown,
      ],
      html: `<streamline-rows></streamline-rows>`,
    });
  });

  it('renders', async () => {
    expect(e()).toBeTruthy();
  });

  describe('entries', () => {
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

    describe("when switching active with search value 'de'", () => {
      it('without resetting', async () => {
        state.searchValue = 'de';
        await page.waitForChanges();
        let rows = e().querySelectorAll('streamline-row').length;
        await expect(rows).toBe(3);
        state.active = 'fav';
        await page.waitForChanges();
        rows = e().querySelectorAll('streamline-row').length;
        await expect(rows).toBe(1);
      });
    });
  });

  describe('sort', () => {
    beforeEach(async () => {
      state.isVisible = true;
      state.active = 'fav';
      await page.waitForChanges();
    });

    it('in normal order', async () => {
      const entries = Object.values(
        state.entriesFav[0].children as unknown
      ).map((item) => item.name);
      expect(entries.length).toBe(3);
      expect(entries).toStrictEqual([
        'Streamline 2.0',
        'Time to log out',
        'Developing Streamline',
      ]);
    });

    it('in ascending and descending order', async () => {
      const clickStatus = async () => {
        (e().querySelector('div[role="button"]') as HTMLButtonElement).click();
        await page.waitForChanges();
      };
      const entriesStatus = () =>
        Object.values(state.entriesFavActive[0].children as unknown).map(
          (item) => item.post_status
        );
      const clickTitle = async () => {
        (
          e().querySelector(
            'div[role="button"] + div[role="button"]'
          ) as HTMLButtonElement
        ).click();
        await page.waitForChanges();
      };
      const entriesTitle = () =>
        Object.values(state.entriesFavActive[0].children as unknown).map(
          (item) => item.name
        );
      await clickTitle();
      expect(entriesTitle()).toStrictEqual([
        'Developing Streamline',
        'Streamline 2.0',
        'Time to log out',
      ]);
      await clickTitle();
      expect(entriesTitle()).toStrictEqual([
        'Time to log out',
        'Streamline 2.0',
        'Developing Streamline',
      ]);
      await clickStatus();
      expect(entriesStatus()).toStrictEqual(['future', 'pending', 'private']);
      await clickStatus();
      expect(entriesStatus()).toStrictEqual(['private', 'pending', 'future']);
      e()
        .querySelector('streamline-header')
        .shadowRoot.querySelector('button')
        .click();
      await page.waitForChanges();
      expect(entriesTitle()).toStrictEqual([
        'Streamline 2.0',
        'Time to log out',
        'Developing Streamline',
      ]);
      expect(entriesStatus()).toStrictEqual(['future', 'private', 'pending']);
    });
  });

  // @TODO: Figure out why this is not working properly
  it('favourites are added in search and then all remove in favourites', async () => {
    const rows = e().querySelectorAll('streamline-row');
    let index = -1;
    for (const item of Array.from(rows) as any) {
      index++;
      if (index === 1 || index === 2) {
        item.shadowRoot
          .querySelector('streamline-dropdown')
          .shadowRoot.querySelector('a')
          .click();
        await page.waitForChanges();
      }
    }
    state.active = 'fav';
    await page.waitForChanges();
    const newRows = e().querySelectorAll('streamline-row');
    expect(newRows.length).toBe(12);
    for (const item of Array.from(newRows).reverse() as any) {
      const index = Array.from(newRows).reverse().indexOf(item);
      item.shadowRoot
        .querySelector('streamline-dropdown')
        .shadowRoot.querySelector('a')
        .click();
      await page.waitForChanges();
      const lengthEntry = e().querySelectorAll('streamline-row').length;
      if (index === 0) {
        expect(state.entriesFav.length).toBe(2);
        expect(lengthEntry).toBe(11);
      } else if (index === 1) {
        expect(state.entriesFav.length).toBe(2);
        expect(lengthEntry).toBe(10);
      } else if (index === 2) {
        expect(state.entriesFav.length).toBe(2);
        expect(lengthEntry).toBe(9);
      } else if (index === 3) {
        expect(state.entriesFav.length).toBe(2);
        expect(lengthEntry).toBe(8);
      } else if (index === 4) {
        expect(state.entriesFav.length).toBe(2);
        expect(lengthEntry).toBe(7);
      } else if (index === 5) {
        expect(state.entriesFav.length).toBe(2);
        expect(lengthEntry).toBe(6);
      } else if (index === 6) {
        expect(state.entriesFav.length).toBe(2);
        expect(lengthEntry).toBe(5);
      } else if (index === 7) {
        expect(state.entriesFav.length).toBe(2);
        expect(lengthEntry).toBe(4);
      } else if (index === 8) {
        expect(state.entriesFav.length).toBe(1);
        expect(lengthEntry).toBe(3);
      } else if (index === 9) {
        expect(state.entriesFav.length).toBe(1);
        expect(lengthEntry).toBe(2);
      } else if (index === 10) {
        expect(state.entriesFav.length).toBe(1);
        expect(lengthEntry).toBe(1);
      } else if (index === 11) {
        expect(state.entriesFav.length).toBe(0);
        expect(lengthEntry).toBe(0);
      }
    }
  });
});
