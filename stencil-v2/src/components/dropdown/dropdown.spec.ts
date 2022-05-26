import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { dispose, state } from '../../store/internal';
import { StreamlineDropdown } from './dropdown';

describe('streamline-dropdown', () => {
  let page: SpecPage;
  const e = () => page.doc.querySelector('streamline-dropdown').shadowRoot;

  beforeEach(async () => {
    dispose();
    state.test = true;
    state.active = 'search';
    page = await newSpecPage({
      components: [StreamlineDropdown],
      html: `<streamline-dropdown type="main"></streamline-dropdown>`,
    });
  });

  it('renders', async () => {
    expect(e()).toBeTruthy();
  });

  describe('click', () => {
    it('favourites', async () => {
      (
        e().querySelector('ul > li:nth-of-type(2) a') as HTMLAnchorElement
      ).click();
      await page.waitForChanges();
      expect(state.active).toBe('fav');
    });

    it('search', async () => {
      (
        e().querySelector('ul > li:nth-of-type(1) a') as HTMLAnchorElement
      ).click();
      await page.waitForChanges();
      expect(state.active).toBe('search');
    });

    it('settings', async () => {
      (
        e().querySelector('ul > li:nth-of-type(3) a') as HTMLAnchorElement
      ).click();
      await page.waitForChanges();
      expect(state.active).toBe('settings');
    });

    it('exit', async () => {
      (
        e().querySelector('ul > li:nth-of-type(4) a') as HTMLAnchorElement
      ).click();
      await page.waitForChanges();
      expect(state.isVisible).toBe(false);
    });
  });
});
