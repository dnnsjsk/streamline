import { newSpecPage } from '@stencil/core/testing';
import { StreamlineBox } from './streamline-box';
import { StreamlineEntries } from '../streamline-entries/streamline-entries';

it('Render box', async () => {
  const page = await newSpecPage({
    components: [StreamlineBox, StreamlineEntries],
    html: `<div id="adminmenuwrap"></div>
           <streamline-box></streamline-box>`,
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
                  <div class="bg-white focus-none h-[calc(100%-var(--sl-side-w))] inner lg:px-8 overflow-x-hidden overflow-y-scroll pb-6 px-3 relative sm:px-6 w-full" tabindex="-1">
                    <div>
                      <div class="-top-2 bg-white border-b border-blue-gray-900 border-dotted flex flex-wrap items-center justify-between lg:-top-4 lg:pt-8 mb-4 pb-1 pt-5 sm:-top-2 sm:pb-2 sm:pt-6 sticky z-10">
                        <h1 class="font-medium mr-6 sm:text-2xl text-blue-gray-900 text-xl">
                          Admin menu
                        </h1>
                        <div class="divide-x flex flex-wrap space-x-4">
                          <span class="font-medium text-gray-700 text-sm">
                            Showing 0 results
                          </span>
                        </div>
                      </div>
                      <ul></ul>
                    </div>
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
