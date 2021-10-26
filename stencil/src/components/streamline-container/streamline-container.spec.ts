import { newSpecPage } from '@stencil/core/testing';
import { StreamlineContainer } from './streamline-container';
import { stateInternal, disposeInternal } from '../../store/internal';
import { StreamlineSearch } from '../streamline-search/streamline-search';
import { setTestMode } from '../../test/setTestMode';

beforeEach(async () => {
  disposeInternal();
});

describe('Render container', function () {
  it('closed', async () => {
    stateInternal.visible = true;
    const page = await newSpecPage({
      components: [StreamlineContainer],
      html: `<streamline-container></streamline-container>`,
    });
    expect(page.root).toEqualHtml(`
<streamline-container>
      <mock:shadow-root></mock:shadow-root>
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
        <div class="fixed h-full left-0 top-0 w-full z-[9999999999999999]">
          <div class="backdrop-blur-sm bg-black/90 fixed h-full left-0 top-0 w-full" tabindex="-1"></div>
          <streamline-box></streamline-box>
        </div>
      </mock:shadow-root>
    </streamline-container>
  `);
  });
});

describe('Key press should', function () {
  it('open app (cmd + k)', async () => {
    stateInternal.visible = true;
    const page = await newSpecPage({
      components: [StreamlineContainer],
      html: `<streamline-container></streamline-container>`,
    });
    const event = new KeyboardEvent('keydown', { metaKey: true, key: 'k' });
    page.doc.dispatchEvent(event);
    await page.waitForChanges();
    expect(stateInternal.visible).toBe(true);
  });
  it('close app (escape)', async () => {
    stateInternal.visible = true;
    const page = await newSpecPage({
      components: [StreamlineContainer],
      html: `<streamline-container></streamline-container>`,
    });
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    page.doc.dispatchEvent(event);
    await page.waitForChanges();
    expect(stateInternal.visible).toBe(false);
  });
  // eslint-disable-next-line jest/no-commented-out-tests
  /*
  it('cycle through modes (arrow keys)', async () => {
    stateInternal.visible = true;
    stateLocal.active = 'menu';
    const page = await newSpecPage({
      components: [StreamlineContainer],
      html: `<streamline-container></streamline-container>`,
    });
    const event = new KeyboardEvent('keydown', {
      key: 'ArrowUp',
    });
    page.doc.dispatchEvent(event);
    await page.waitForChanges();
    expect(stateLocal.active).toBe('fav');
  });
   */
});

describe('In test mode', function () {
  it('render search with correct placeholder', async () => {
    setTestMode();
    stateInternal.test = true;
    const page = await newSpecPage({
      components: [StreamlineContainer, StreamlineSearch],
      html: `<streamline-container true></streamline-container>`,
    });
    await page.waitForChanges();
    const placeholder = stateInternal.searchPlaceholder;
    expect(placeholder).toBe('Search entries');
  });
});
