import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { dispose, state } from '../../store/internal';
import { StreamlineRow } from './row';
import { StreamlineRows } from '../rows/rows';
import { StreamlineHeader } from '../header/header';
import { StreamlineDropdown } from '../dropdown/dropdown';
import { StreamlineContainer } from '../container/container';
import { StreamlineEntries } from '../entries/entries';
import { StreamlineDrawer } from '../drawer/drawer';
import { StreamlineInput } from '../input/input';
import matchMediaPolyfill from 'mq-polyfill';
import { setActions } from '../../utils/entries/setActions';
import { enableMultisite } from '../../utils/test/enableMultisite';

const menu = require('../../../../stencil-v2/src/components/container/test/entriesMenu.json');
const fav = require('../../../../stencil-v2/src/components/container/test/entriesFav.json');

describe('streamline-row', () => {
  let page: SpecPage;
  const e = () =>
    page.doc
      .querySelector('streamline-rows')
      .shadowRoot.querySelector('streamline-row').shadowRoot;

  beforeEach(async () => {
    dispose();
    setActions();
    state.test = true;
    state.isVisible = true;
    state.active = 'search';
    state.entriesSearch = [...state.entriesActions, ...menu];
    state.entriesSearchActive = [...state.entriesActions, ...menu];
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

  describe('action', () => {
    it('fires for post', async () => {
      state.searchValue = 'en';
      e().querySelector('a').click();
      await page.waitForChanges();
      expect(state.active).toBe('post');
    });

    it('fires for site', async () => {
      await enableMultisite(page);
      state.searchValue = 'test';
      await page.waitForChanges();
      page.doc
        .querySelector('streamline-rows')
        .shadowRoot.querySelector('streamline-row + streamline-row')
        .shadowRoot.querySelector('a')
        .click();
      await page.waitForChanges();
      expect(state.active).toBe('site');
    });
  });

  describe('edit', () => {
    const title = () => e().querySelector('input') as HTMLInputElement;

    const slug = () =>
      e().querySelector(
        'li div > div:nth-of-type(3) input'
      ) as HTMLInputElement;

    const save = () =>
      e()
        .querySelector('streamline-dropdown')
        .shadowRoot.querySelector(
          'ul li:nth-of-type(1) a'
        ) as HTMLAnchorElement;

    const edit = () =>
      e()
        .querySelector('streamline-dropdown')
        .shadowRoot.querySelector(
          'ul li:nth-of-type(2) a'
        ) as HTMLAnchorElement;

    beforeEach(async () => {
      state.active = 'fav';
      await page.waitForChanges();
    });

    it('in normal state', async () => {
      expect(title().value).toBe('Streamline 2.0');
      expect(slug().value).toBe('streamline-2-0');
    });

    it('has new dropdown menu', async () => {
      edit().click();
      await page.waitForChanges();
      expect(
        e()
          .querySelector('streamline-dropdown')
          .shadowRoot.querySelectorAll('ul li').length
      ).toBe(2);
    });

    it('shows green inputs', async () => {
      edit().click();
      await page.waitForChanges();
      expect(title().classList.contains('text-green-600')).toBeTruthy();
      expect(slug().classList.contains('text-green-600')).toBeTruthy();
    });

    /*
    @TODO: not working
    it("don't allow saving if empty inputs", async () => {
      edit().click();
      await page.waitForChanges();
      title().value = '';
      slug().value = '';
      edit().click();
      await page.waitForChanges();
      expect(title().classList.contains('text-green-600')).toBeTruthy();
      expect(slug().classList.contains('text-green-600')).toBeTruthy();
    });
     */

    it('resets on cancel', async () => {
      edit().click();
      await page.waitForChanges();
      title().value = 'test';
      slug().value = 'test';
      edit().click();
      await page.waitForChanges();
      expect(title().value).toBe('Streamline 2.0');
      expect(slug().value).toBe('streamline-2-0');
    });

    it('saves values', async () => {
      edit().click();
      await page.waitForChanges();
      title().value = 'test';
      slug().value = 'test';
      save().click();
      await page.waitForChanges();
      expect(title().value).toBe('test');
      expect(slug().value).toBe('test');
    });

    describe('on mobile', () => {
      const row = () =>
        page.doc
          .querySelector('streamline-container')
          .shadowRoot.querySelector('streamline-entries')
          .shadowRoot.querySelector('streamline-rows')
          .shadowRoot.querySelector('streamline-row')
          .shadowRoot.querySelector('a') as HTMLAnchorElement;

      const mobileTitle = () =>
        page.doc
          .querySelector('streamline-container')
          .shadowRoot.querySelector('streamline-drawer')
          .shadowRoot.querySelector('streamline-input');

      const mobileSlug = () =>
        page.doc
          .querySelector('streamline-container')
          .shadowRoot.querySelector('streamline-drawer')
          .shadowRoot.querySelector('streamline-input:nth-of-type(2)');

      const drawer = () =>
        page.doc
          .querySelector('streamline-container')
          .shadowRoot.querySelector('streamline-drawer').shadowRoot;

      beforeEach(async () => {
        page = await newSpecPage({
          components: [
            StreamlineContainer,
            StreamlineDrawer,
            StreamlineEntries,
            StreamlineRows,
            StreamlineHeader,
            StreamlineRow,
            StreamlineDropdown,
            StreamlineInput,
          ],
          html: `<streamline-container></streamline-container>`,
        });

        matchMediaPolyfill(window);
        window.resizeTo = function resizeTo(width, height) {
          Object.assign(this, {
            innerWidth: width,
            innerHeight: height,
            outerWidth: width,
            outerHeight: height,
          }).dispatchEvent(new this.Event('resize'));
        };

        window.resizeTo(375, 700);

        row().dispatchEvent(new MouseEvent('dblclick'));
        await page.waitForChanges();
      });

      it('opens drawer', async () => {
        expect(
          drawer().querySelector('div').classList.contains('opacity-100')
        ).toBeTruthy();
      });

      it('shows correct content', async () => {
        expect(mobileTitle().shadowRoot.querySelector('input').value).toBe(
          'test'
        );
        expect(mobileSlug().shadowRoot.querySelector('input').value).toBe(
          'test'
        );
      });

      it('disables saving in drawer', async () => {
        const input = mobileTitle().shadowRoot.querySelector('input');
        input.value = '';
        input.dispatchEvent(new Event('input'));
        await page.waitForChanges();
        expect(
          drawer().querySelector('button').classList.contains('opacity-50')
        ).toBeTruthy();
      });

      /*
      @TODO: not working
      it('saves content', async () => {
        const inputTitle = mobileTitle().shadowRoot.querySelector('input');
        inputTitle.value = 'drawer test';
        inputTitle.dispatchEvent(new Event('input'));
        const inputSlug = mobileSlug().shadowRoot.querySelector('input');
        inputSlug.value = 'drawer test';
        inputSlug.dispatchEvent(new Event('input'));
        const button = drawer().querySelector('button');
        button.click();
        await page.waitForChanges();
        expect(title().value).toBe('drawer test');
        expect(slug().value).toBe('drawer test');
      });
       */
    });
  });
});
