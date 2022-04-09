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

const e = (page) => {
  return page.doc.querySelector('streamline-entries').shadowRoot;
};

beforeEach(() => {
  dispose();
  disposeLocal();
  state.entriesMenu = menu;
  state.entriesPost = post;
  state.entriesPostQuery = 'test';
  state.entriesSettingsLoad = {
    ...state.entriesSettingsLoad,
    ...{
      mode: {
        default: 'dashboard',
      },
    },
  };
});

describe('Render entries with', () => {
  describe('dot menu', () => {
    it("mode set to 'help'", async () => {
      state.active = 'fav';
      const page = await newSpecPage({
        components: [StreamlineEntries],
        html: `<streamline-entries></streamline-entries>`,
      });
      state.isHelp = true;
      await page.waitForChanges();
      const el = e(page);
      const length = el.querySelectorAll('p').length;
      expect(length).toBe(2);
    });
  });
  describe("mode set to 'favourites'", () => {
    it('and all elements shown', async () => {
      state.active = 'fav';
      const page = await newSpecPage({
        components: [StreamlineEntries],
        html: `<streamline-entries></streamline-entries>`,
      });
      const el = e(page);
      const lengthLi = el.querySelectorAll('li').length;
      expect(lengthLi).toBe(18);
    });
    it("and search is 'me'", async () => {
      state.active = 'fav';
      state.searchValue = 'me';
      const page = await newSpecPage({
        components: [StreamlineEntries],
        html: `<streamline-entries></streamline-entries>`,
      });
      const el = e(page);
      const lengthLi = el.querySelectorAll('[data-entry]').length;
      expect(lengthLi).toBe(3);
    });
    it('and favourite is added', async () => {
      state.active = 'post';
      const page = await newSpecPage({
        components: [StreamlineEntries, StreamlineUiDropdown],
        html: `<streamline-entries></streamline-entries>`,
      });
      const el = e(page);
      const fav = el
        .querySelector('streamline-ui-dropdown')
        .shadowRoot.querySelector('a');
      const click = new MouseEvent('click');
      fav.dispatchEvent(click);
      state.active = 'fav';
      await page.waitForChanges();
      const lengthEntry = el.querySelectorAll('[data-entry]').length;
      expect(lengthEntry).toBe(13);
    });
    it('and all favourites are removed until there is none left', async () => {
      state.active = 'fav';
      const page = await newSpecPage({
        components: [StreamlineEntries, StreamlineUiDropdown],
        html: `<streamline-entries></streamline-entries>`,
      });
      const el = e(page);
      const rows = el.querySelectorAll('[data-entry]');
      for (const item of Array.from(rows).reverse() as any) {
        const index = Array.from(rows).reverse().indexOf(item);
        const unfavouriteButton = item
          .querySelector('streamline-ui-dropdown')
          .shadowRoot.querySelector('a');
        const click = new MouseEvent('click');
        unfavouriteButton.dispatchEvent(click);
        await page.waitForChanges();
        const lengthEntry = el.querySelectorAll('[data-entry]').length;
        if (index === 0) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(state.entriesFav.length).toBe(2);
          // eslint-disable-next-line jest/no-conditional-expect
          expect(lengthEntry).toBe(12);
        } else if (index === 1) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(state.entriesFav.length).toBe(2);
          // eslint-disable-next-line jest/no-conditional-expect
          expect(lengthEntry).toBe(11);
        } else if (index === 2) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(state.entriesFav.length).toBe(2);
          // eslint-disable-next-line jest/no-conditional-expect
          expect(lengthEntry).toBe(10);
        } else if (index === 3) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(state.entriesFav.length).toBe(2);
          // eslint-disable-next-line jest/no-conditional-expect
          expect(lengthEntry).toBe(9);
        } else if (index === 4) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(state.entriesFav.length).toBe(2);
          // eslint-disable-next-line jest/no-conditional-expect
          expect(lengthEntry).toBe(8);
        } else if (index === 5) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(state.entriesFav.length).toBe(2);
          // eslint-disable-next-line jest/no-conditional-expect
          expect(lengthEntry).toBe(7);
        } else if (index === 6) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(state.entriesFav.length).toBe(2);
          // eslint-disable-next-line jest/no-conditional-expect
          expect(lengthEntry).toBe(6);
        } else if (index === 7) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(state.entriesFav.length).toBe(2);
          // eslint-disable-next-line jest/no-conditional-expect
          expect(lengthEntry).toBe(5);
        } else if (index === 8) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(state.entriesFav.length).toBe(1);
          // eslint-disable-next-line jest/no-conditional-expect
          expect(lengthEntry).toBe(4);
        } else if (index === 9) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(state.entriesFav.length).toBe(1);
          // eslint-disable-next-line jest/no-conditional-expect
          expect(lengthEntry).toBe(3);
        } else if (index === 10) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(state.entriesFav.length).toBe(1);
          // eslint-disable-next-line jest/no-conditional-expect
          expect(lengthEntry).toBe(2);
        } else if (index === 11) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(state.entriesFav.length).toBe(1);
          // eslint-disable-next-line jest/no-conditional-expect
          expect(lengthEntry).toBe(1);
        } else if (index === 12) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(state.entriesFav.length).toBe(0);
          // eslint-disable-next-line jest/no-conditional-expect
          expect(lengthEntry).toBe(0);
        }
      }
    });
    it('and all favourites are removed until there is none left on multisite', async () => {
      state.active = 'fav';
      state.entriesFav = networkFav;
      const page = await newSpecPage({
        components: [StreamlineEntries, StreamlineUiDropdown],
        html: `<streamline-entries></streamline-entries>`,
      });
      const el = e(page);
      const rows = el.querySelectorAll('[data-entry]');
      for (const item of Array.from(rows).reverse() as any) {
        const index = Array.from(rows).reverse().indexOf(item);
        const unfavouriteButton = item
          .querySelector('streamline-ui-dropdown')
          .shadowRoot.querySelector('a');
        const click = new MouseEvent('click');
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
      state.active = 'menu';
      const page = await newSpecPage({
        components: [StreamlineEntries],
        html: `<streamline-entries></streamline-entries>`,
      });
      const el = e(page);
      const lengthLi = el.querySelectorAll('li').length;
      expect(lengthLi).toBe(77);
    });
    it("and search is 'med'", async () => {
      state.active = 'menu';
      state.searchValue = 'med';
      const page = await newSpecPage({
        components: [StreamlineEntries],
        html: `<streamline-entries></streamline-entries>`,
      });
      const el = e(page);
      const lengthLi = el.querySelectorAll('li').length;
      expect(lengthLi).toBe(5);
    });
    it("and search is 'All pages'", async () => {
      state.active = 'menu';
      state.searchValue = 'All pages';
      const page = await newSpecPage({
        components: [StreamlineEntries],
        html: `<streamline-entries></streamline-entries>`,
      });
      const el = e(page);
      const lengthLi = el.querySelectorAll('li').length;
      expect(lengthLi).toBe(2);
    });
    it("and search is 'xlsbvhaysgf'", async () => {
      state.active = 'menu';
      state.searchValue = 'xlsbvhaysgf';
      const page = await newSpecPage({
        components: [StreamlineEntries],
        html: `<streamline-entries></streamline-entries>`,
      });
      const el = e(page);
      const lengthLi = el.querySelectorAll('li').length;
      expect(lengthLi).toBe(0);
    });
    it('and nine elements are favourites', async () => {
      state.entriesFav = fav;
      state.active = 'menu';
      const page = await newSpecPage({
        components: [StreamlineEntries],
        html: `<streamline-entries></streamline-entries>`,
      });
      const el = e(page);
      const favs = el.querySelectorAll('.text-rose-500');
      expect(favs.length).toBe(9);
    });
  });

  describe("mode set to 'post'", () => {
    it('and all elements shown', async () => {
      state.active = 'post';
      const page = await newSpecPage({
        components: [StreamlineEntries],
        html: `<streamline-entries></streamline-entries>`,
      });
      const el = e(page);
      const lengthRow = el.querySelectorAll('[data-row]').length;
      expect(lengthRow).toBe(505);
    });
    it('and all elements shown in test mode', async () => {
      state.active = 'post';
      state.test = true;
      const page = await newSpecPage({
        components: [StreamlineEntries],
        html: `<streamline-entries></streamline-entries>`,
      });
      const el = e(page);
      const lengthRow = el.querySelectorAll('[data-row]').length;
      expect(lengthRow).toBe(20);
    });
    it("and search is 'me'", async () => {
      state.active = 'post';
      state.searchValue = 'me';
      const page = await newSpecPage({
        components: [StreamlineEntries],
        html: `<streamline-entries></streamline-entries>`,
      });
      const el = e(page);
      const lengthRow = el.querySelectorAll('[data-row]').length;
      const results = el.querySelector('#amount').innerHTML.trim();
      expect(lengthRow).toBe(35);
      expect(results).toBe('Showing 35 results');
    });
    it("and search is 'me' in test mode", async () => {
      state.active = 'post';
      state.searchValue = 'me';
      state.test = true;
      const page = await newSpecPage({
        components: [StreamlineEntries],
        html: `<streamline-entries></streamline-entries>`,
      });
      const el = e(page);
      const lengthRow = el.querySelectorAll('[data-row]').length;
      const results = el.querySelector('#amount').innerHTML.trim();
      expect(lengthRow).toBe(2);
      expect(results).toBe('Showing 2 results');
    });
    it("and search is 'Hello world'", async () => {
      state.active = 'post';
      state.searchValue = 'Hello world';
      const page = await newSpecPage({
        components: [StreamlineEntries],
        html: `<streamline-entries></streamline-entries>`,
      });
      const el = e(page);
      const lengthRow = el.querySelectorAll('[data-row]').length;
      const results = el.querySelector('#amount').innerHTML.trim();
      expect(lengthRow).toBe(0);
      expect(results).toBe('Showing 0 results');
    });
    it('and three elements are favourites', async () => {
      state.entriesFav = fav;
      state.active = 'post';
      const page = await newSpecPage({
        components: [StreamlineEntries],
        html: `<streamline-entries></streamline-entries>`,
      });
      await page.waitForChanges();
      const el = e(page);
      const favs = el.querySelectorAll('.text-rose-500');
      expect(favs.length).toBe(3);
    });
    it('and an element is being edited, saved, edited, cancelled, edited in drawer and saved', async () => {
      matchMediaPolyfill(window);
      state.test = true;
      state.active = 'post';
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
      const click = new MouseEvent('click');
      const dblClick = new KeyboardEvent('dblclick');
      const input = new KeyboardEvent('input');

      await page.waitForChanges();
      const container = page.doc.querySelector(
        'streamline-container'
      ).shadowRoot;
      const entries = container.querySelector('streamline-entries').shadowRoot;

      // List.
      const editInline = entries
        .querySelector('[data-row="1"] streamline-ui-dropdown')
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
      const row = entries.querySelector('[data-row="1"] > a');
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
    it('and paginate to the last page', async () => {
      state.active = 'post';
      state.test = true;
      const page = await newSpecPage({
        components: [StreamlineEntries],
        html: `<streamline-entries></streamline-entries>`,
      });
      const click = new MouseEvent('click');
      const prev = page.doc
        .querySelector('streamline-entries')
        .shadowRoot.querySelector('[type="secondary"]:nth-of-type(1)');
      const next = page.doc
        .querySelector('streamline-entries')
        .shadowRoot.querySelector('[type="secondary"]:nth-of-type(2)');
      expect(prev.hasAttribute('disabled')).toBe(true);
      expect(state.entriesPostCurrentPage).toBe(1);
      next.dispatchEvent(click);
      await page.waitForChanges();
      expect(prev.hasAttribute('disabled')).toBe(false);
      expect(state.entriesPostCurrentPage).toBe(2);
      next.dispatchEvent(click);
      await page.waitForChanges();
      expect(state.entriesPostCurrentPage).toBe(3);
      next.dispatchEvent(click);
      await page.waitForChanges();
      expect(state.entriesPostCurrentPage).toBe(4);
      next.dispatchEvent(click);
      await page.waitForChanges();
      expect(state.entriesPostCurrentPage).toBe(5);
      next.dispatchEvent(click);
      await page.waitForChanges();
      expect(state.entriesPostCurrentPage).toBe(6);
      next.dispatchEvent(click);
      await page.waitForChanges();
      expect(state.entriesPostCurrentPage).toBe(7);
      next.dispatchEvent(click);
      await page.waitForChanges();
      expect(state.entriesPostCurrentPage).toBe(8);
      next.dispatchEvent(click);
      await page.waitForChanges();
      expect(state.entriesPostCurrentPage).toBe(9);
      next.dispatchEvent(click);
      await page.waitForChanges();
      expect(state.entriesPostCurrentPage).toBe(10);
      next.dispatchEvent(click);
      await page.waitForChanges();
      expect(state.entriesPostCurrentPage).toBe(11);
      next.dispatchEvent(click);
      await page.waitForChanges();
      expect(state.entriesPostCurrentPage).toBe(12);
      next.dispatchEvent(click);
      await page.waitForChanges();
      expect(state.entriesPostCurrentPage).toBe(13);
      next.dispatchEvent(click);
      await page.waitForChanges();
      expect(state.entriesPostCurrentPage).toBe(14);
      next.dispatchEvent(click);
      await page.waitForChanges();
      expect(state.entriesPostCurrentPage).toBe(15);
      next.dispatchEvent(click);
      await page.waitForChanges();
      expect(state.entriesPostCurrentPage).toBe(16);
      next.dispatchEvent(click);
      await page.waitForChanges();
      expect(state.entriesPostCurrentPage).toBe(17);
      next.dispatchEvent(click);
      await page.waitForChanges();
      expect(state.entriesPostCurrentPage).toBe(18);
      next.dispatchEvent(click);
      await page.waitForChanges();
      expect(state.entriesPostCurrentPage).toBe(19);
      next.dispatchEvent(click);
      await page.waitForChanges();
      expect(state.entriesPostCurrentPage).toBe(20);
      next.dispatchEvent(click);
      await page.waitForChanges();
      expect(state.entriesPostCurrentPage).toBe(21);
      next.dispatchEvent(click);
      await page.waitForChanges();
      expect(state.entriesPostCurrentPage).toBe(22);
      next.dispatchEvent(click);
      await page.waitForChanges();
      expect(state.entriesPostCurrentPage).toBe(23);
      next.dispatchEvent(click);
      await page.waitForChanges();
      expect(state.entriesPostCurrentPage).toBe(24);
      next.dispatchEvent(click);
      await page.waitForChanges();
      expect(state.entriesPostCurrentPage).toBe(25);
      next.dispatchEvent(click);
      await page.waitForChanges();
      expect(state.entriesPostCurrentPage).toBe(26);
      expect(next.hasAttribute('disabled')).toBe(true);
      state.active = 'settings';
      state.entriesSettingsLoad = {
        ...state.entriesSettingsLoad,
        ...{
          queryAmount: {
            default: 30,
          },
        },
      };
      await page.waitForChanges();
      state.entriesPostCurrentPage = 1;
      state.active = 'post';
      await page.waitForChanges();
      expect(
        page.doc
          .querySelector('streamline-entries')
          .shadowRoot.querySelector('#amount')
          .innerHTML.trim()
      ).toBe('Showing 30 results');
      expect(
        page.doc
          .querySelector('streamline-entries')
          .shadowRoot.querySelector('#pages')
          .innerHTML.trim()
      ).toBe('∙ Page 1 of 17');
    });
    it('sort entries by post title, check favourites and reset it afterwards', async () => {
      state.active = 'post';
      state.entriesFav = fav;
      state.test = true;
      const page = await newSpecPage({
        components: [StreamlineEntries],
        html: `<streamline-entries></streamline-entries>`,
      });
      const el = e(page);
      const click = new MouseEvent('click');
      const sort = el.querySelector(
        'div[data-uid] div[role="button"]:nth-of-type(2)'
      );
      sort.dispatchEvent(click);
      await page.waitForChanges();
      expect(stateLocal.sort['post'].id).toBe('post_title');
      const firstInput = el.querySelector(
        '[data-entry] [data-id="post_title"]'
      );
      expect(firstInput.value).toBe(
        'Amet adipisci voluptas sed aspernatur iure animi'
      );
      sort.dispatchEvent(click);
      await page.waitForChanges();
      expect(firstInput.value).toBe('super_string_1');
      state.active = 'fav';
      await page.waitForChanges();
      expect(firstInput.value).toBe('Time to log out');
      el.querySelector('[type="transparent"]').dispatchEvent(click);
      await page.waitForChanges();
      expect(firstInput.value).toBe('Streamline 2.0');
    });
  });

  describe("mode set to 'settings'", () => {
    it('and all elements shown', async () => {
      state.active = 'settings';
      const page = await newSpecPage({
        components: [StreamlineEntries],
        html: `<streamline-entries></streamline-entries>`,
      });
      const el = e(page);
      const checkboxes = el.querySelectorAll('input[type="checkbox"]').length;
      const select = el.querySelectorAll('select').length;
      expect(checkboxes).toBe(8);
      expect(select).toBe(2);
    });
    it('and save button activating after changing a setting', async () => {
      state.active = 'settings';
      const page = await newSpecPage({
        components: [StreamlineEntries],
        html: `<streamline-entries></streamline-entries>`,
      });
      const el = e(page);
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
    state.active = 'menu';
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
