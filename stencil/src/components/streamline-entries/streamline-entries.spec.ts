import { newSpecPage } from '@stencil/core/testing';
import { StreamlineEntries } from './streamline-entries';
import { dispose, state } from '../../store/internal';
import { disposeLocal, stateLocal } from '../../store/local';
import { StreamlineUiDropdown } from '../ui/streamline-ui-dropdown/streamline-ui-dropdown';
import matchMediaPolyfill from 'mq-polyfill';
import { StreamlineContainer } from '../streamline-container/streamline-container';
import { StreamlineUiDrawer } from '../ui/streamline-ui-drawer/streamline-ui-drawer';
import { StreamlineUiInput } from '../ui/streamline-ui-input/streamline-ui-input';
const networkFav = require('../../../../assets/test/entriesNetworkFav.json');
const menu = require('../../../../assets/test/entriesMenu.json');
const fav = require('../../../../assets/test/entriesFav.json');
const post = require('../../../../assets/test/entriesPost.json');

beforeEach(async () => {
  dispose();
  disposeLocal();
  state.entriesMenu = menu;
  state.entriesPost = post;
  state.entriesPostQuery = 'test';
});

describe('Render entries with', () => {
  describe('dot menu', () => {
    it("mode set to 'help'", async () => {
      stateLocal.active = 'fav';
      const page = await newSpecPage({
        components: [StreamlineEntries],
        html: `<streamline-entries></streamline-entries>`,
      });
      state.isHelp = true;
      await page.waitForChanges();
      const el = page.doc.querySelector('streamline-entries').shadowRoot;
      const length = el.querySelectorAll('p').length;
      expect(length).toBe(2);
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
      expect(lengthLi).toBe(18);
    });
    it("and search is 'me'", async () => {
      stateLocal.active = 'fav';
      state.searchValue = 'me';
      const page = await newSpecPage({
        components: [StreamlineEntries],
        html: `<streamline-entries></streamline-entries>`,
      });
      const el = page.doc.querySelector('streamline-entries').shadowRoot;
      const lengthLi = el.querySelectorAll('[data-entry]').length;
      expect(lengthLi).toBe(3);
    });
    it('and all favourites are removed until there is none left', async () => {
      stateLocal.active = 'fav';
      const page = await newSpecPage({
        components: [StreamlineEntries, StreamlineUiDropdown],
        html: `<streamline-entries></streamline-entries>`,
      });
      const el = page.doc.querySelector('streamline-entries').shadowRoot;
      const rows = el.querySelectorAll('[data-entry]');
      for (const item of Array.from(rows).reverse()) {
        const index = Array.from(rows).reverse().indexOf(item);
        const unfavouriteButton = item
          .querySelector('streamline-ui-dropdown')
          .shadowRoot.querySelector('a');
        const click = new KeyboardEvent('click');
        unfavouriteButton.dispatchEvent(click);
        await page.waitForChanges();
        const lengthEntry = el.querySelectorAll('[data-entry]').length;
        if (index === 0) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(state.entriesFav.length).toBe(2);
          // eslint-disable-next-line jest/no-conditional-expect
          expect(lengthEntry).toBe(11);
        } else if (index === 1) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(state.entriesFav.length).toBe(2);
          // eslint-disable-next-line jest/no-conditional-expect
          expect(lengthEntry).toBe(10);
        } else if (index === 2) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(state.entriesFav.length).toBe(2);
          // eslint-disable-next-line jest/no-conditional-expect
          expect(lengthEntry).toBe(9);
        } else if (index === 3) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(state.entriesFav.length).toBe(2);
          // eslint-disable-next-line jest/no-conditional-expect
          expect(lengthEntry).toBe(8);
        } else if (index === 4) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(state.entriesFav.length).toBe(2);
          // eslint-disable-next-line jest/no-conditional-expect
          expect(lengthEntry).toBe(7);
        } else if (index === 5) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(state.entriesFav.length).toBe(2);
          // eslint-disable-next-line jest/no-conditional-expect
          expect(lengthEntry).toBe(6);
        } else if (index === 6) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(state.entriesFav.length).toBe(2);
          // eslint-disable-next-line jest/no-conditional-expect
          expect(lengthEntry).toBe(5);
        } else if (index === 7) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(state.entriesFav.length).toBe(2);
          // eslint-disable-next-line jest/no-conditional-expect
          expect(lengthEntry).toBe(4);
        } else if (index === 8) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(state.entriesFav.length).toBe(1);
          // eslint-disable-next-line jest/no-conditional-expect
          expect(lengthEntry).toBe(3);
        } else if (index === 9) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(state.entriesFav.length).toBe(1);
          // eslint-disable-next-line jest/no-conditional-expect
          expect(lengthEntry).toBe(2);
        } else if (index === 10) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(state.entriesFav.length).toBe(1);
          // eslint-disable-next-line jest/no-conditional-expect
          expect(lengthEntry).toBe(1);
        } else if (index === 11) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(state.entriesFav.length).toBe(0);
          // eslint-disable-next-line jest/no-conditional-expect
          expect(lengthEntry).toBe(0);
        }
      }
    });
    it('and all favourites are removed until there is none left on multisite', async () => {
      stateLocal.active = 'fav';
      state.entriesFav = networkFav;
      const page = await newSpecPage({
        components: [StreamlineEntries, StreamlineUiDropdown],
        html: `<streamline-entries></streamline-entries>`,
      });
      const el = page.doc.querySelector('streamline-entries').shadowRoot;
      const rows = el.querySelectorAll('[data-entry]');
      for (const item of Array.from(rows).reverse()) {
        const index = Array.from(rows).reverse().indexOf(item);
        const unfavouriteButton = item
          .querySelector('streamline-ui-dropdown')
          .shadowRoot.querySelector('a');
        const click = new KeyboardEvent('click');
        unfavouriteButton.dispatchEvent(click);
        await page.waitForChanges();
        const lengthEntry = el.querySelectorAll('[data-entry]').length;
        if (index === 0) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(state.entriesFav.length).toBe(4);
          // eslint-disable-next-line jest/no-conditional-expect
          expect(lengthEntry).toBe(13);
        } else if (index === 1) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(state.entriesFav.length).toBe(4);
          // eslint-disable-next-line jest/no-conditional-expect
          expect(lengthEntry).toBe(12);
        } else if (index === 2) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(state.entriesFav.length).toBe(4);
          // eslint-disable-next-line jest/no-conditional-expect
          expect(lengthEntry).toBe(11);
        } else if (index === 3) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(state.entriesFav.length).toBe(4);
          // eslint-disable-next-line jest/no-conditional-expect
          expect(lengthEntry).toBe(10);
        } else if (index === 4) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(state.entriesFav.length).toBe(4);
          // eslint-disable-next-line jest/no-conditional-expect
          expect(lengthEntry).toBe(9);
        } else if (index === 5) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(state.entriesFav.length).toBe(4);
          // eslint-disable-next-line jest/no-conditional-expect
          expect(lengthEntry).toBe(8);
        } else if (index === 6) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(state.entriesFav.length).toBe(4);
          // eslint-disable-next-line jest/no-conditional-expect
          expect(lengthEntry).toBe(7);
        } else if (index === 7) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(state.entriesFav.length).toBe(4);
          // eslint-disable-next-line jest/no-conditional-expect
          expect(lengthEntry).toBe(6);
        } else if (index === 8) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(state.entriesFav.length).toBe(3);
          // eslint-disable-next-line jest/no-conditional-expect
          expect(lengthEntry).toBe(5);
        } else if (index === 9) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(state.entriesFav.length).toBe(3);
          // eslint-disable-next-line jest/no-conditional-expect
          expect(lengthEntry).toBe(4);
        } else if (index === 10) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(state.entriesFav.length).toBe(3);
          // eslint-disable-next-line jest/no-conditional-expect
          expect(lengthEntry).toBe(3);
        } else if (index === 11) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(state.entriesFav.length).toBe(2);
          // eslint-disable-next-line jest/no-conditional-expect
          expect(lengthEntry).toBe(2);
        } else if (index === 12) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(state.entriesFav.length).toBe(1);
          // eslint-disable-next-line jest/no-conditional-expect
          expect(lengthEntry).toBe(1);
        } else if (index === 13) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(state.entriesFav.length).toBe(0);
          // eslint-disable-next-line jest/no-conditional-expect
          expect(lengthEntry).toBe(0);
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
      expect(lengthLi).toBe(77);
      expect(results).toBe('Showing 63 results');
    });
    it("and search is 'med'", async () => {
      stateLocal.active = 'menu';
      state.searchValue = 'med';
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
      state.searchValue = 'All pages';
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
      state.searchValue = 'xlsbvhaysgf';
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
    it('and nine elements are favourites', async () => {
      state.entriesFav = fav;
      stateLocal.active = 'menu';
      const page = await newSpecPage({
        components: [StreamlineEntries],
        html: `<streamline-entries></streamline-entries>`,
      });
      const el = page.doc.querySelector('streamline-entries').shadowRoot;
      const favs = el.querySelectorAll('.text-rose-500');
      expect(favs.length).toBe(9);
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
      const lengthRow = el.querySelectorAll('[data-row]').length;
      expect(lengthRow).toBe(9);
    });
    it("and search is 'me'", async () => {
      stateLocal.active = 'post';
      state.searchValue = 'me';
      const page = await newSpecPage({
        components: [StreamlineEntries],
        html: `<streamline-entries></streamline-entries>`,
      });
      const el = page.doc.querySelector('streamline-entries').shadowRoot;
      const lengthRow = el.querySelectorAll('[data-row]').length;
      const results = el.querySelector('.results-amount').innerHTML.trim();
      expect(lengthRow).toBe(1);
      expect(results).toBe('Showing 1 result');
    });
    it("and search is 'Hello world'", async () => {
      stateLocal.active = 'post';
      state.searchValue = 'Hello world';
      const page = await newSpecPage({
        components: [StreamlineEntries],
        html: `<streamline-entries></streamline-entries>`,
      });
      const el = page.doc.querySelector('streamline-entries').shadowRoot;
      const lengthRow = el.querySelectorAll('[data-row]').length;
      const results = el.querySelector('.results-amount').innerHTML.trim();
      expect(lengthRow).toBe(0);
      expect(results).toBe('Showing 0 results');
    });
    it('and three elements are favourites', async () => {
      state.entriesFav = fav;
      stateLocal.active = 'post';
      const page = await newSpecPage({
        components: [StreamlineEntries],
        html: `<streamline-entries></streamline-entries>`,
      });
      await page.waitForChanges();
      const el = page.doc.querySelector('streamline-entries').shadowRoot;
      const favs = el.querySelectorAll('.text-rose-500');
      expect(favs.length).toBe(3);
    });
    it('and an element is being edited, saved, edited, cancelled, edited in drawer and saved', async () => {
      matchMediaPolyfill(window);
      stateLocal.active = 'post';
      const page = await newSpecPage({
        components: [
          StreamlineContainer,
          StreamlineEntries,
          StreamlineUiDropdown,
          StreamlineUiDrawer,
          StreamlineUiInput,
        ],
        html: `<streamline-container></streamline-container>`,
      });
      window.resizeTo = function resizeTo(width, height) {
        Object.assign(this, {
          innerWidth: width,
          innerHeight: height,
          outerWidth: width,
          outerHeight: height,
        }).dispatchEvent(new this.Event('resize'));
      };
      const click = new KeyboardEvent('click');
      const dblClick = new KeyboardEvent('dblclick');
      const input = new KeyboardEvent('input');

      await page.waitForChanges();
      const container = page.doc.querySelector(
        'streamline-container'
      ).shadowRoot;
      const entries = container.querySelector('streamline-entries').shadowRoot;

      // List.
      const editInline = entries
        .querySelector('[data-row="1000"] streamline-ui-dropdown')
        .shadowRoot.querySelector('a:nth-of-type(2)');
      expect(editInline.innerHTML).toBe('Edit Inline');
      editInline.dispatchEvent(click);
      await page.waitForChanges();
      expect(entries.querySelectorAll('input.text-green-600').length).toBe(2);
      expect(editInline.innerHTML).toBe('Cancel');
      const inputTitle = entries.querySelector(
        'input.text-green-600'
      ) as HTMLInputElement;
      inputTitle.value = 'super_string';
      expect(entries.querySelectorAll('input.text-green-600').length).toBe(2);
      const saveInline = entries
        .querySelector('streamline-ui-dropdown')
        .shadowRoot.querySelector('a:nth-of-type(1)');
      expect(saveInline.innerHTML).toBe('Save');
      saveInline.dispatchEvent(click);
      await page.waitForChanges();
      expect(entries.querySelectorAll('input.text-green-600').length).toBe(0);
      expect(
        JSON.stringify(state.entriesPost).includes('"name":"super_string"')
      ).toBe(true);
      editInline.dispatchEvent(click);
      await page.waitForChanges();
      expect(entries.querySelectorAll('input.text-green-600').length).toBe(2);
      editInline.dispatchEvent(click);
      await page.waitForChanges();
      expect(entries.querySelectorAll('input.text-green-600').length).toBe(0);

      // Drawer.
      window.resizeTo(375, 700);
      const row = entries.querySelector('[data-row="1000"] > a');
      row.dispatchEvent(dblClick);
      await page.waitForChanges();
      expect(state.drawer.active).toBe(true);
      const drawer = container.querySelector('streamline-ui-drawer').shadowRoot;
      expect(drawer.querySelectorAll('streamline-ui-input').length).toBe(2);
      expect(drawer.querySelector('streamline-ui-input').value).toBe(
        'super_string'
      );
      const input1 = drawer
        .querySelector('streamline-ui-input')
        .shadowRoot.querySelector('input');
      input1.value = 'super_string_1';
      input1.dispatchEvent(input);
      await page.waitForChanges();
      drawer.querySelector('button').dispatchEvent(click);
      await page.waitForChanges();
      expect(state.drawer.active).toBe(false);
      expect(
        JSON.stringify(state.entriesPost).includes('"name":"super_string_1"')
      ).toBe(true);
    });
  });

  describe("mode set to 'settings'", () => {
    it('and all elements shown', async () => {
      stateLocal.active = 'settings';
      const page = await newSpecPage({
        components: [StreamlineEntries],
        html: `<streamline-entries></streamline-entries>`,
      });
      const el = page.doc.querySelector('streamline-entries').shadowRoot;
      const checkboxes = el.querySelectorAll('input[type="checkbox"]').length;
      const select = el.querySelectorAll('select').length;
      expect(checkboxes).toBe(7);
      expect(select).toBe(1);
    });
    it('and save button activating after changing a setting', async () => {
      stateLocal.active = 'settings';
      const page = await newSpecPage({
        components: [StreamlineEntries],
        html: `<streamline-entries></streamline-entries>`,
      });
      const el = page.doc.querySelector('streamline-entries').shadowRoot;
      const button = el.querySelector('button[type="primary"]');
      expect(button.getAttribute('disabled')).toBe(null);
      const checkbox = el.querySelector(
        'input[type="checkbox"]'
      ) as HTMLInputElement;
      checkbox.checked = false;
      await page.waitForChanges();
      expect(button.hasAttribute('invalid')).toBe(false);
    });
  });
});

describe('Key press', () => {
  it('should cycle through all entries', async () => {
    state.visible = true;
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
  it('should not cycle through all entries', async () => {
    state.visible = true;
    const page = await newSpecPage({
      components: [StreamlineEntries],
      html: `<streamline-entries></streamline-entries>`,
    });
    state.entriesSettingsLoad = {
      ...state.entriesSettingsLoad,
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
    expect(state.focusIndex).toBe(-1);
  });
});
