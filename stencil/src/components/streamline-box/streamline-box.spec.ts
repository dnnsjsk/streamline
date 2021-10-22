import { newSpecPage } from '@stencil/core/testing';
import { StreamlineBox } from './streamline-box';

it('Render box', async () => {
  const page = await newSpecPage({
    components: [StreamlineBox],
    html: `<streamline-box></streamline-box>`,
  });
  expect(page.root).toEqualHtml(`
<streamline-box>
      <mock:shadow-root>
        <div class="-translate-x-1/2 -translate-y-1/2 absolute animate bg-white grid h-full inner left-1/2 max-h-[700px] max-w-[900px] overflow-hidden top-1/2 w-full">
          <streamline-sidebar></streamline-sidebar>
          <div class="absolute h-full left-[var(--sl-side-w)] w-[calc(100%-var(--sl-side-w))] wrap">
            <streamline-search class="h-[var(--sl-side-w)] w-full"></streamline-search>
            <streamline-entries></streamline-entries>
          </div>
        </div>
      </mock:shadow-root>
    </streamline-box>
  `);
});
