import { newSpecPage } from '@stencil/core/testing';
import { StreamlineEntries } from './streamline-entries';
import { StreamlineButton } from '../streamline-button/streamline-button';
import { StreamlinePost } from '../streamline-post/streamline-post';
import { disposeInternal, stateInternal } from '../../store/internal';
import { disposeLocal, stateLocal } from '../../store/local';
import { setData } from '../../test/setData';

beforeEach(async () => {
  disposeInternal();
  disposeLocal();
  setData();
});

describe('Render entries with', () => {
  // eslint-disable-next-line jest/no-commented-out-tests
  /*
  it("mode set to 'slash'", async () => {
    stateInternal.isSlash = true;
    stateLocal.active = 'menu';
    const page = await newSpecPage({
      components: [StreamlineEntries],
      html: `<streamline-entries></streamline-entries>`,
    });
    const el = page.doc.querySelector('streamline-entries').shadowRoot;
    const length = el.querySelectorAll('li').length;
    expect(length).toBe(2);
  });
   */
  describe('dot menu', () => {
    it("mode set to 'help'", async () => {
      stateInternal.isHelp = true;
      stateLocal.active = 'menu';
      const page = await newSpecPage({
        components: [StreamlineEntries],
        html: `<streamline-entries></streamline-entries>`,
      });
      const el = page.doc.querySelector('streamline-entries').shadowRoot;
      const length = el.querySelectorAll('p').length;
      expect(length).toBe(1);
    });
  });
  describe("mode set to 'favourites'", () => {
    it('and all elements shown', async () => {
      stateLocal.active = 'fav';
      const page = await newSpecPage({
        components: [StreamlineEntries],
        html: `<streamline-entries></streamline-entries>`,
      });
      const el = page.doc.querySelector('streamline-entries').shadowRoot;
      const lengthLi = el.querySelectorAll('li').length;
      expect(lengthLi).toBe(23);
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
      expect(lengthLi).toBe(6);
    });
    it('and all favourites are removed until there is none left', async () => {
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
          // eslint-disable-next-line jest/no-conditional-expect
          expect(stateInternal.entriesFav.length).toBe(4);
          // eslint-disable-next-line jest/no-conditional-expect
          expect(lengthLi).toBe(21);
        } else if (index === 2) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(stateInternal.entriesFav.length).toBe(3);
          // eslint-disable-next-line jest/no-conditional-expect
          expect(lengthLi).toBe(18);
        } else if (index === 8) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(stateInternal.entriesFav.length).toBe(2);
          // eslint-disable-next-line jest/no-conditional-expect
          expect(lengthLi).toBe(8);
        } else if (index === 11) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(stateInternal.entriesFav.length).toBe(1);
          // eslint-disable-next-line jest/no-conditional-expect
          expect(lengthLi).toBe(3);
        } else if (index === 14) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(stateInternal.entriesFav.length).toBe(0);
          // eslint-disable-next-line jest/no-conditional-expect
          expect(lengthLi).toBe(0);
        }
      }
    });
  });

  describe("mode set to 'menu'", () => {
    it('and all elements shown', async () => {
      stateLocal.active = 'menu';
      const page = await newSpecPage({
        components: [StreamlineEntries],
        html: `<streamline-entries></streamline-entries>`,
      });
      const el = page.doc.querySelector('streamline-entries').shadowRoot;
      const lengthLi = el.querySelectorAll('li').length;
      const results = el.querySelector('.results-amount').innerHTML.trim();
      expect(lengthLi).toBe(49);
      expect(results).toBe('Showing 38 results');
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
      const results = el.querySelector('.results-amount').innerHTML.trim();
      expect(lengthLi).toBe(5);
      expect(results).toBe('Showing 3 results');
    });
    it("and search is 'All pages'", async () => {
      stateLocal.active = 'menu';
      stateInternal.searchValue = 'All pages';
      const page = await newSpecPage({
        components: [StreamlineEntries],
        html: `<streamline-entries></streamline-entries>`,
      });
      const el = page.doc.querySelector('streamline-entries').shadowRoot;
      const lengthLi = el.querySelectorAll('li').length;
      const results = el.querySelector('.results-amount').innerHTML.trim();
      expect(lengthLi).toBe(2);
      expect(results).toBe('Showing 1 result');
    });
    it("and search is 'xlsbvhaysgf'", async () => {
      stateLocal.active = 'menu';
      stateInternal.searchValue = 'xlsbvhaysgf';
      const page = await newSpecPage({
        components: [StreamlineEntries],
        html: `<streamline-entries></streamline-entries>`,
      });
      const el = page.doc.querySelector('streamline-entries').shadowRoot;
      const lengthLi = el.querySelectorAll('li').length;
      const results = el.querySelector('.results-amount').innerHTML.trim();
      expect(lengthLi).toBe(0);
      expect(results).toBe('Showing 0 results');
    });
    it('and three elements are favourites', async () => {
      stateLocal.active = 'menu';
      const page = await newSpecPage({
        components: [StreamlineEntries, StreamlineButton],
        html: `<streamline-entries></streamline-entries>`,
      });
      await page.waitForChanges();
      const el = page.doc.querySelector('streamline-entries').shadowRoot;
      const buttons = el.querySelectorAll('streamline-button');
      await page.waitForChanges();
      let favs = 0;
      for (const item of Array.from(buttons)) {
        if (item.getAttribute('favourite') === '') {
          favs++;
        }
      }
      expect(favs).toBe(3);
    });
  });

  describe("mode set to 'post'", () => {
    it('and all elements shown', async () => {
      stateLocal.active = 'post';
      const page = await newSpecPage({
        components: [StreamlineEntries],
        html: `<streamline-entries></streamline-entries>`,
      });
      const el = page.doc.querySelector('streamline-entries').shadowRoot;
      const lengthLi = el.querySelectorAll('li').length;
      expect(lengthLi).toBe(3);
    });
    it("and search is 'me'", async () => {
      stateLocal.active = 'post';
      stateInternal.searchValue = 'me';
      const page = await newSpecPage({
        components: [StreamlineEntries],
        html: `<streamline-entries></streamline-entries>`,
      });
      const el = page.doc.querySelector('streamline-entries').shadowRoot;
      const lengthLi = el.querySelectorAll('li').length;
      const results = el.querySelector('.results-amount').innerHTML.trim();
      expect(lengthLi).toBe(2);
      expect(results).toBe('Showing 2 results');
    });
    it("and search is 'Hello world'", async () => {
      stateLocal.active = 'post';
      stateInternal.searchValue = 'Hello world';
      const page = await newSpecPage({
        components: [StreamlineEntries],
        html: `<streamline-entries></streamline-entries>`,
      });
      const el = page.doc.querySelector('streamline-entries').shadowRoot;
      const lengthLi = el.querySelectorAll('li').length;
      const results = el.querySelector('.results-amount').innerHTML.trim();
      expect(lengthLi).toBe(1);
      expect(results).toBe('Showing 1 result');
    });
    it("and search is 'xlsbvhaysgf'", async () => {
      stateLocal.active = 'post';
      stateInternal.searchValue = 'xlsbvhaysgf';
      const page = await newSpecPage({
        components: [StreamlineEntries],
        html: `<streamline-entries></streamline-entries>`,
      });
      const el = page.doc.querySelector('streamline-entries').shadowRoot;
      const lengthLi = el.querySelectorAll('li').length;
      const results = el.querySelector('.results-amount').innerHTML.trim();
      expect(lengthLi).toBe(0);
      expect(results).toBe('Showing 0 results');
    });
    it('and three elements are favourites', async () => {
      stateLocal.active = 'post';
      const page = await newSpecPage({
        components: [StreamlineEntries, StreamlinePost],
        html: `<streamline-entries></streamline-entries>`,
      });
      await page.waitForChanges();
      const el = page.doc.querySelector('streamline-entries').shadowRoot;
      const buttons = el.querySelectorAll('streamline-post');
      let favs = 0;
      for (const item of Array.from(buttons)) {
        if (item.getAttribute('favourite') === '') {
          favs++;
        }
      }
      expect(favs).toBe(3);
    });
  });
});

describe('Cycling with up and down arrow keys', () => {
  it('should work', async () => {
    stateInternal.visible = true;
    const page = await newSpecPage({
      components: [StreamlineEntries],
      html: `<streamline-entries></streamline-entries>`,
    });
    const eventUp = new KeyboardEvent('keydown', {
      key: 'ArrowUp',
    });
    const eventDown = new KeyboardEvent('keydown', {
      key: 'ArrowDown',
    });
    page.doc.dispatchEvent(eventUp);
    await page.waitForChanges();
    expect(stateInternal.focusIndex).toBe(37);
    page.doc.dispatchEvent(eventUp);
    await page.waitForChanges();
    expect(stateInternal.focusIndex).toBe(36);
    page.doc.dispatchEvent(eventDown);
    await page.waitForChanges();
    expect(stateInternal.focusIndex).toBe(37);
    page.doc.dispatchEvent(eventDown);
    await page.waitForChanges();
    expect(stateInternal.focusIndex).toBe(0);
    page.doc.dispatchEvent(eventDown);
    await page.waitForChanges();
    expect(stateInternal.focusIndex).toBe(1);
  });
  it('should not work', async () => {
    stateInternal.visible = true;
    const page = await newSpecPage({
      components: [StreamlineEntries],
      html: `<streamline-entries></streamline-entries>`,
    });
    stateInternal.entriesSettingsLoad = {
      ...stateInternal.entriesSettingsLoad,
      ...{
        keyNavigation: {
          default: false,
        },
      },
    };
    const eventDown = new KeyboardEvent('keydown', {
      key: 'ArrowDown',
    });
    page.doc.dispatchEvent(eventDown);
    await page.waitForChanges();
    expect(stateInternal.focusIndex).toBe(-1);
  });
});
