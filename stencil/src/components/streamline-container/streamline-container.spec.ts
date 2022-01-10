import { newSpecPage } from '@stencil/core/testing';
import { StreamlineContainer } from './streamline-container';
import { state, dispose } from '../../store/internal';
import { StreamlineSearch } from '../streamline-search/streamline-search';
import { stateLocal, disposeLocal } from '../../store/local';

beforeEach(async () => {
  dispose();
  disposeLocal();
});

describe('Render container', () => {
  it('closed', async () => {
    state.visible = true;
    const page = await newSpecPage({
      components: [StreamlineContainer],
      html: `<streamline-container></streamline-container>`,
    });
    expect(page.root).toEqualHtml(`
<streamline-container>
      <mock:shadow-root>
        <div class="fixed h-full hidden left-0 pointer-events-none top-0 w-full z-[9999999999999999]">
          <div class="bg-black/90 fixed h-full left-0 top-0 w-full" tabindex="-1"></div>
          <streamline-box></streamline-box>
        </div>
      </mock:shadow-root>
    </streamline-container>
  `);
  });
  it('open', async () => {
    const page = await newSpecPage({
      components: [StreamlineContainer],
      html: `<streamline-container visible></streamline-container>`,
    });
    expect(page.root).toEqualHtml(`
<streamline-container visible="">
      <mock:shadow-root>
        <div class="block fixed h-full left-0 pointer-events-auto top-0 w-full z-[9999999999999999]">
          <div class="bg-black/90 fixed h-full left-0 top-0 w-full" tabindex="-1"></div>
          <streamline-box></streamline-box>
        </div>
      </mock:shadow-root>
    </streamline-container>
  `);
  });
});

describe('Key press should', () => {
  it('open app on mac', async () => {
    state.visible = true;
    const page = await newSpecPage({
      components: [StreamlineContainer],
      html: `<streamline-container mac="true"></streamline-container>`,
    });
    const event = new KeyboardEvent('keydown', { metaKey: true, key: 'k' });
    page.doc.dispatchEvent(event);
    await page.waitForChanges();
    expect(state.visible).toBe(true);
  });
  it('open app on windows', async () => {
    state.visible = true;
    const page = await newSpecPage({
      components: [StreamlineContainer],
      html: `<streamline-container></streamline-container>`,
    });
    const event = new KeyboardEvent('keydown', { ctrlKey: true, key: 'k' });
    page.doc.dispatchEvent(event);
    await page.waitForChanges();
    expect(state.visible).toBe(true);
  });
  it('close app', async () => {
    state.visible = true;
    const page = await newSpecPage({
      components: [StreamlineContainer],
      html: `<streamline-container></streamline-container>`,
    });
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    page.doc.dispatchEvent(event);
    await page.waitForChanges();
    expect(state.visible).toBe(false);
  });
  it('not close app', async () => {
    const page = await newSpecPage({
      components: [StreamlineContainer],
      html: `<streamline-container></streamline-container>`,
    });
    state.entriesSettingsLoad = {
      ...state.entriesSettingsLoad,
      ...{
        keyExit: {
          default: false,
        },
      },
    };
    state.visible = true;
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    page.doc.dispatchEvent(event);
    await page.waitForChanges();
    expect(state.visible).toBe(true);
  });
  it('focus search on mac', async () => {
    state.visible = true;
    const page = await newSpecPage({
      components: [StreamlineContainer],
      html: `<streamline-container mac="true"></streamline-container>`,
    });
    const event = new KeyboardEvent('keydown', { metaKey: true, key: 's' });
    page.doc.dispatchEvent(event);
    await page.waitForChanges();
    expect(state.isSearchFocus).toBe(true);
  });
  it('focus search on windows', async () => {
    state.visible = true;
    const page = await newSpecPage({
      components: [StreamlineContainer],
      html: `<streamline-container></streamline-container>`,
    });
    const event = new KeyboardEvent('keydown', { ctrlKey: true, key: 's' });
    page.doc.dispatchEvent(event);
    await page.waitForChanges();
    expect(state.isSearchFocus).toBe(true);
  });
  it('not focus search', async () => {
    state.isSearchFocus = false;
    const page = await newSpecPage({
      components: [StreamlineContainer],
      html: `<streamline-container></streamline-container>`,
    });
    state.entriesSettingsLoad = {
      ...state.entriesSettingsLoad,
      ...{
        keySearch: {
          default: false,
        },
      },
    };
    const event = new KeyboardEvent('keydown', { ctrlKey: true, key: 's' });
    page.doc.dispatchEvent(event);
    await page.waitForChanges();
    expect(state.isSearchFocus).toBe(false);
  });
  it('cycle through modes on mac', async () => {
    stateLocal.active = 'menu';
    const page = await newSpecPage({
      components: [StreamlineContainer],
      html: `<streamline-container mac="true"></streamline-container>`,
    });
    state.visible = true;
    const eventUp = new KeyboardEvent('keydown', {
      metaKey: true,
      key: 'ArrowUp',
    });
    const eventDown = new KeyboardEvent('keydown', {
      metaKey: true,
      key: 'ArrowDown',
    });
    page.doc.dispatchEvent(eventUp);
    await page.waitForChanges();
    expect(stateLocal.active).toBe('fav');
    page.doc.dispatchEvent(eventUp);
    await page.waitForChanges();
    expect(stateLocal.active).toBe('network');
    page.doc.dispatchEvent(eventUp);
    await page.waitForChanges();
    expect(stateLocal.active).toBe('site');
    page.doc.dispatchEvent(eventDown);
    await page.waitForChanges();
    expect(stateLocal.active).toBe('network');
    page.doc.dispatchEvent(eventDown);
    await page.waitForChanges();
    expect(stateLocal.active).toBe('fav');
    page.doc.dispatchEvent(eventDown);
    await page.waitForChanges();
    expect(stateLocal.active).toBe('menu');
    page.doc.dispatchEvent(eventDown);
    await page.waitForChanges();
    expect(stateLocal.active).toBe('post');
    page.doc.dispatchEvent(eventDown);
    await page.waitForChanges();
    expect(stateLocal.active).toBe('settings');
    page.doc.dispatchEvent(eventDown);
    await page.waitForChanges();
    expect(stateLocal.active).toBe('site');
  });
  it('cycle through modes on windows', async () => {
    stateLocal.active = 'menu';
    const page = await newSpecPage({
      components: [StreamlineContainer],
      html: `<streamline-container></streamline-container>`,
    });
    state.visible = true;
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
    expect(stateLocal.active).toBe('fav');
    page.doc.dispatchEvent(eventUp);
    await page.waitForChanges();
    expect(stateLocal.active).toBe('network');
    page.doc.dispatchEvent(eventUp);
    await page.waitForChanges();
    expect(stateLocal.active).toBe('site');
    page.doc.dispatchEvent(eventDown);
    await page.waitForChanges();
    expect(stateLocal.active).toBe('network');
    page.doc.dispatchEvent(eventDown);
    await page.waitForChanges();
    expect(stateLocal.active).toBe('fav');
    page.doc.dispatchEvent(eventDown);
    await page.waitForChanges();
    expect(stateLocal.active).toBe('menu');
    page.doc.dispatchEvent(eventDown);
    await page.waitForChanges();
    expect(stateLocal.active).toBe('post');
    page.doc.dispatchEvent(eventDown);
    await page.waitForChanges();
    expect(stateLocal.active).toBe('settings');
    page.doc.dispatchEvent(eventDown);
    await page.waitForChanges();
    expect(stateLocal.active).toBe('site');
  });
  it('not cycle through modes', async () => {
    stateLocal.active = 'menu';
    const page = await newSpecPage({
      components: [StreamlineContainer],
      html: `<streamline-container></streamline-container>`,
    });
    state.entriesSettingsLoad = {
      ...state.entriesSettingsLoad,
      ...{
        keyNavigationTabs: {
          default: false,
        },
      },
    };
    state.visible = true;
    const eventUp = new KeyboardEvent('keydown', {
      key: 'ArrowUp',
    });
    page.doc.dispatchEvent(eventUp);
    await page.waitForChanges();
    expect(stateLocal.active).toBe('menu');
  });
});

describe('In test mode', () => {
  it('render search with correct placeholder', async () => {
    state.test = true;
    const page = await newSpecPage({
      components: [StreamlineContainer, StreamlineSearch],
      html: `<streamline-container></streamline-container>`,
    });
    await page.waitForChanges();
    const placeholder = state.searchPlaceholder;
    expect(placeholder).toBe('Search entries');
  });
});
