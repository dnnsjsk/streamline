import { newSpecPage } from '@stencil/core/testing';
import { StreamlineBox } from './streamline-box';
import { StreamlineEntries } from '../streamline-entries/streamline-entries';

it('Render box', async () => {
  const page = await newSpecPage({
    components: [StreamlineBox, StreamlineEntries],
    html: `<streamline-box></streamline-box>`,
  });
  expect(page.root).toEqualHtml(`
<streamline-box>
      <mock:shadow-root>
        <div class="-translate-x-1/2 -translate-y-1/2 absolute animate bg-white grid h-full inner left-1/2 max-h-[700px] max-w-[900px] overflow-hidden top-1/2 w-full">
          <streamline-sidebar></streamline-sidebar>
          <div class="absolute h-full left-[var(--sl-side-w)] w-[calc(100%-var(--sl-side-w))] wrap">
            <streamline-search class="h-[var(--sl-side-w)] w-full"></streamline-search>
            <streamline-entries>
              <mock:shadow-root>
                <div class="h-full relative">
                  <div class="absolute backdrop-blur-sm bg-white/50 flex h-[calc(100%-var(--sl-side-w))] items-center justify-center left-0 top-0 w-full z-10">
                    <svg aria-hidden="true" class="animate-spin h-10 w-10" data-icon="spinner-third" data-prefix="far" focusable="false" role="img" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                      <path d="M460.116 373.846l-20.823-12.022c-5.541-3.199-7.54-10.159-4.663-15.874 30.137-59.886 28.343-131.652-5.386-189.946-33.641-58.394-94.896-95.833-161.827-99.676C261.028 55.961 256 50.751 256 44.352V20.309c0-6.904 5.808-12.337 12.703-11.982 83.556 4.306 160.163 50.864 202.11 123.677 42.063 72.696 44.079 162.316 6.031 236.832-3.14 6.148-10.75 8.461-16.728 5.01z" fill="currentColor"></path>
                    </svg>
                  </div>
                </div>
              </mock:shadow-root>
            </streamline-entries>
          </div>
        </div>
      </mock:shadow-root>
    </streamline-box>
  `);
});
