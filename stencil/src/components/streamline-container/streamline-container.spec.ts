import { newSpecPage } from '@stencil/core/testing';
import { StreamlineContainer } from './streamline-container';
import { stateInternal } from '../../store/internal';

it('Render container component', async () => {
  const page = await newSpecPage({
    components: [StreamlineContainer],
    html: `<streamline-container></streamline-container>`,
  });
  expect(page.root).toEqualHtml(`
<streamline-container>
      <mock:shadow-root>
        <div class="fixed h-full left-0 top-0 w-full z-[9999999999999999]">
          <div class="bg-black/90 fixed h-full left-0 top-0 w-full" tabindex="-1"></div>
          <streamline-box></streamline-box>
        </div>
      </mock:shadow-root>
    </streamline-container>
  `);
});

it('Open app', async () => {
  const page = await newSpecPage({
    components: [StreamlineContainer],
    html: `<streamline-container></streamline-container>`,
  });
  const event = new KeyboardEvent('keydown', { metaKey: true, key: 'k' });
  page.doc.dispatchEvent(event);
  expect(stateInternal.visible).toBe(true);
});
