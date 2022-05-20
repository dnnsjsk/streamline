import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { dispose, state } from '../../store/internal';
import { StreamlineContainer } from './container';

const openApp = async (page, key) => {
  state.isVisible = false;
  const event = new KeyboardEvent('keydown', { [key]: true, key: 'k' });
  page.doc.dispatchEvent(event);
  await page.waitForChanges();
  expect(state.isVisible).toBe(true);
};

const cycleActive = async (page, key) => {
  state.entriesSettingsLoad.keys.navigationActive = true;
  const eventUp = new KeyboardEvent('keydown', {
    [key]: true,
    key: 'ArrowUp',
  });
  const eventDown = new KeyboardEvent('keydown', {
    [key]: true,
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
};

const cycleActiveNot = async (page, key) => {
  state.entriesSettingsLoad.keys.navigationActive = false;
  const eventUp = new KeyboardEvent('keydown', {
    [key]: true,
    key: 'ArrowUp',
  });
  page.doc.dispatchEvent(eventUp);
  await page.waitForChanges();
  expect(state.active).toBe('search');
  page.doc.dispatchEvent(eventUp);
  await page.waitForChanges();
  expect(state.active).toBe('search');
};

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
    it('close app', async () => {
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      page.doc.dispatchEvent(event);
      await page.waitForChanges();
      expect(state.isVisible).toBe(false);
    });

    describe('on windows', () => {
      it('open app', async () => {
        await openApp(page, 'ctrlKey');
      });

      it('cycle active', async () => {
        await cycleActive(page, 'ctrlKey');
      });

      it('not cycle active', async () => {
        await cycleActiveNot(page, 'ctrlKey');
      });
    });

    describe('on mac', () => {
      beforeEach(async () => {
        state.isMac = true;
        await page.waitForChanges();
      });

      it('open app', async () => {
        await openApp(page, 'metaKey');
      });

      it('cycle active', async () => {
        await cycleActive(page, 'metaKey');
      });

      it('not cycle active', async () => {
        await cycleActiveNot(page, 'metaKey');
      });
    });
  });
});
