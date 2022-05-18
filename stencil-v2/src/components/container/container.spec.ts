import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { dispose, state } from '../../store/internal';
import { StreamlineContainer } from './container';

describe('streamline-container', () => {
  let page: SpecPage;
  const e = () => page.doc.querySelector('streamline-container').shadowRoot;

  beforeEach(async () => {
    dispose();
    page = await newSpecPage({
      components: [StreamlineContainer],
      html: `<streamline-container visible></streamline-container>`,
    });
  });

  it('renders', async () => {
    expect(e()).toBeTruthy();
  });

  it('is visible with prop', async () => {
    expect(e().querySelector('div')).toBeTruthy();
  });

  describe('key press should', () => {
    it('open app on windows', async () => {
      state.isVisible = false;
      const event = new KeyboardEvent('keydown', { ctrlKey: true, key: 'k' });
      page.doc.dispatchEvent(event);
      await page.waitForChanges();
      expect(state.isVisible).toBe(true);
    });

    it('close app', async () => {
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      page.doc.dispatchEvent(event);
      await page.waitForChanges();
      expect(state.isVisible).toBe(false);
    });

    it('cycle active', async () => {
      const eventUp = new KeyboardEvent('keydown', {
        ctrlKey: true,
        key: 'ArrowUp',
      });
      const eventDown = new KeyboardEvent('keydown', {
        ctrlKey: true,
        key: 'ArrowDown',
      });
      page.doc.dispatchEvent(eventUp);
      await page.waitForChanges();
      expect(state.active).toBe('settings');
      page.doc.dispatchEvent(eventUp);
      await page.waitForChanges();
      expect(state.active).toBe('fav');
      page.doc.dispatchEvent(eventUp);
      await page.waitForChanges();
      expect(state.active).toBe('search');
      page.doc.dispatchEvent(eventDown);
      await page.waitForChanges();
      expect(state.active).toBe('fav');
      page.doc.dispatchEvent(eventDown);
      await page.waitForChanges();
      expect(state.active).toBe('settings');
      page.doc.dispatchEvent(eventDown);
      await page.waitForChanges();
      expect(state.active).toBe('search');
    });
  });
});
