import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { dispose, state } from '../../store/internal';
import { StreamlineRow } from './row';
import { StreamlineRows } from '../rows/rows';
import { StreamlineHeader } from '../header/header';
import { StreamlineDropdown } from '../dropdown/dropdown';

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
  });
});
