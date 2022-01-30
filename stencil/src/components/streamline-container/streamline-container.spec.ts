import { newSpecPage } from '@stencil/core/testing';
import { StreamlineContainer } from './streamline-container';
import { state, dispose } from '../../store/internal';
import { StreamlineSearch } from '../streamline-search/streamline-search';
import { stateLocal, disposeLocal } from '../../store/local';

const cycle = async (page, key) => {
  stateLocal.active = 'menu';
  state.visible = true;
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
  expect(stateLocal.active).toBe('fav');
  page.doc.dispatchEvent(eventUp);
  await page.waitForChanges();
  expect(stateLocal.active).toBe('networkMenu');
  page.doc.dispatchEvent(eventUp);
  await page.waitForChanges();
  expect(stateLocal.active).toBe('site');
  page.doc.dispatchEvent(eventDown);
  await page.waitForChanges();
  expect(stateLocal.active).toBe('networkMenu');
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
};

beforeEach(async () => {
  dispose();
  disposeLocal();
});

describe('App should', () => {
  it('open correct default tab', async () => {
    stateLocal.active = 'fav';
    const page = await newSpecPage({
      components: [StreamlineContainer],
      html: `<streamline-container></streamline-container>`,
    });
    state.visible = true;
    expect(stateLocal.active).toBe('fav');
    state.entriesSettingsLoad = {
      ...state.entriesSettingsLoad,
      ...{
        behaviourDefaultTab: {
          default: 'menu',
        },
      },
    };
    await page.waitForChanges();
    state.visible = false;
    await page.waitForChanges();
    state.visible = true;
    await page.waitForChanges();
    expect(stateLocal.active).toBe('menu');
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
  // eslint-disable-next-line jest/expect-expect
  it('cycle through modes on mac', async () => {
    const page = await newSpecPage({
      components: [StreamlineContainer],
      html: `<streamline-container mac="true"></streamline-container>`,
    });
    await cycle(page, 'metaKey');
  });
  // eslint-disable-next-line jest/expect-expect
  it('cycle through modes on windows', async () => {
    const page = await newSpecPage({
      components: [StreamlineContainer],
      html: `<streamline-container></streamline-container>`,
    });
    await cycle(page, 'ctrlKey');
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
    expect(placeholder).toBe('Filter entries');
  });
});
