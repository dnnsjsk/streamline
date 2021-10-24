import { newSpecPage } from '@stencil/core/testing';
import { StreamlineContainer } from './streamline-container';
import { disposeInternal, stateInternal } from '../../store/internal';
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

it('Open app', async () => {
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
