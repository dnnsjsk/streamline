import { newSpecPage } from '@stencil/core/testing';
import { StreamlineEntries } from './streamline-entries';
import { StreamlineButton } from '../streamline-button/streamline-button';
import { disposeInternal, stateInternal } from '../../store/internal';
import { disposeLocal, stateLocal } from '../../store/local';
import { setData } from '../../test/setData';

beforeEach(async () => {
  disposeInternal();
  disposeLocal();
  setData();
});

describe('Render entries component when', function () {
  it('is slash', async () => {
    stateInternal.isSlash = true;
    stateLocal.active = 'fav';
    const page = await newSpecPage({
      components: [StreamlineEntries],
      html: `<streamline-entries></streamline-entries>`,
    });
    const el = page.doc.querySelector('streamline-entries').shadowRoot;
    const length = el.querySelectorAll('li').length;
    expect(length).toBe(2);
  });
  it('is sites', async () => {
    stateInternal.isSites = true;
    stateLocal.active = 'fav';
    const page = await newSpecPage({
      components: [StreamlineEntries],
      html: `<streamline-entries></streamline-entries>`,
    });
    const el = page.doc.querySelector('streamline-entries').shadowRoot;
    const length = el.querySelectorAll('li').length;
    expect(length).toBe(7);
  });

  describe('is favourites', function () {
    it('and all are shown', async () => {
      stateLocal.active = 'fav';
      const page = await newSpecPage({
        components: [StreamlineEntries],
        html: `<streamline-entries></streamline-entries>`,
      });
      const el = page.doc.querySelector('streamline-entries').shadowRoot;
      const lengthLi = el.querySelectorAll('li').length;
      expect(lengthLi).toBe(20);
    });
    it("and search is 'me'", async () => {
      stateLocal.active = 'fav';
      stateInternal.searchValue = 'me';
      const page = await newSpecPage({
        components: [StreamlineEntries],
        html: `<streamline-entries></streamline-entries>`,
      });
      const el = page.doc.querySelector('streamline-entries').shadowRoot;
      const lengthLi = el.querySelectorAll('li').length;
      expect(lengthLi).toBe(4);
    });
    it('and all entries are removed until there is none left', async () => {
      stateLocal.active = 'fav';
      const page = await newSpecPage({
        components: [StreamlineEntries, StreamlineButton],
        html: `<streamline-entries></streamline-entries>`,
      });
      const el = page.doc.querySelector('streamline-entries').shadowRoot;
      const buttons = el.querySelectorAll('streamline-button');
      for (const item of Array.from(buttons).reverse()) {
        const index = Array.from(buttons).reverse().indexOf(item);
        const button = item.shadowRoot.querySelector('button');
        button.click();
        await page.waitForChanges();
        const lengthLi = el.querySelectorAll('li').length;
        if (index === 0) {
          expect(stateLocal.entriesFav.length).toBe(3);
          expect(lengthLi).toBe(18);
        } else if (index === 2) {
          expect(stateLocal.entriesFav.length).toBe(2);
          expect(lengthLi).toBe(15);
        } else if (index === 8) {
          expect(stateLocal.entriesFav.length).toBe(1);
          expect(lengthLi).toBe(5);
        } else if (index === 11) {
          expect(stateLocal.entriesFav.length).toBe(0);
          expect(lengthLi).toBe(0);
        }
      }
    });
  });

  describe('is menu', function () {
    it('and all are shown', async () => {
      stateLocal.active = 'menu';
      const page = await newSpecPage({
        components: [StreamlineEntries],
        html: `<streamline-entries></streamline-entries>`,
      });
      const el = page.doc.querySelector('streamline-entries').shadowRoot;
      const lengthLi = el.querySelectorAll('li').length;
      expect(lengthLi).toBe(49);
    });
    it("and search is 'med'", async () => {
      stateLocal.active = 'menu';
      stateInternal.searchValue = 'med';
      const page = await newSpecPage({
        components: [StreamlineEntries],
        html: `<streamline-entries></streamline-entries>`,
      });
      const el = page.doc.querySelector('streamline-entries').shadowRoot;
      const lengthLi = el.querySelectorAll('li').length;
      expect(lengthLi).toBe(5);
    });
    it('and menu contains favourites', async () => {
      stateLocal.active = 'menu';
      const page = await newSpecPage({
        components: [StreamlineEntries, StreamlineButton],
        html: `<streamline-entries></streamline-entries>`,
      });
      await page.waitForChanges();
      const el = page.doc.querySelector('streamline-entries').shadowRoot;
      const buttons = el.querySelectorAll('streamline-button');
      let favs = 0;
      for (const item of Array.from(buttons)) {
        if (item.getAttribute('is-favourite') === '') {
          favs++;
        }
      }
      expect(favs).toBe(3);
    });
  });
});