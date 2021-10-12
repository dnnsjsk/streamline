import { newSpecPage } from '@stencil/core/testing';
import { StreamlineSearch } from './streamline-search';
import { stateInternal, disposeInternal } from '../../store/internal';

beforeEach(async () => {
  disposeInternal();
});

describe('Render search', function () {
  it('without enter button', async () => {
    const page = await newSpecPage({
      components: [StreamlineSearch],
      html: `<streamline-search></streamline-search>`,
    });
    expect(page.root).toEqualHtml(`
<streamline-search>
      <mock:shadow-root>
        <div class="h-[var(--sl-side-w)] relative w-full">
          <div class="focus h-[var(--sl-side-w)]">
            <input class="bg-gray-50 border-b border-gray-300 font-medium h-full m-0 p-0 placeholder-gray-500 px-4 sm:px-6 text-[1.15rem] w-full" part="search" placeholder="Type '/' for available commands" type="text" value="">
          </div>
        </div>
      </mock:shadow-root>
    </streamline-search>
  `);
  });
  it('with enter button', async () => {
    stateInternal.isEnter = true;
    const page = await newSpecPage({
      components: [StreamlineSearch],
      html: `<streamline-search></streamline-search>`,
    });
    expect(page.root).toEqualHtml(`
<streamline-search>
      <mock:shadow-root>
        <div class="h-[var(--sl-side-w)] relative w-full">
          <div class="focus h-[var(--sl-side-w)]">
            <input class="bg-gray-50 border-b border-gray-300 font-medium h-full m-0 p-0 placeholder-gray-500 px-4 sm:px-6 text-[1.15rem] w-full" part="search" placeholder="Type '/' for available commands" type="text" value="">
          </div>
          <div class="-translate-y-1/2 absolute right-3 sm:right-4 top-1/2">
            <div class="focus focus--px">
              <button class="bg-white border border-gray-200 font-medium hover:bg-gray-900 hover:border-gray-900 hover:text-gray-50 inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 sm:text-sm text-gray-600 text-xs">
                <svg aria-hidden="true" class="fill-current ml-1 mr-2 origin-right-center rotate-90 w-2" data-icon="level-down-alt" data-prefix="far" focusable="false" role="img" viewBox="0 0 320 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M296.64 412.326l-96.16 96.16c-4.686 4.687-12.285 4.686-16.97 0L87.354 412.33c-7.536-7.536-2.198-20.484 8.485-20.485l68.161-.002V56H64a11.996 11.996 0 0 1-8.485-3.515l-32-32C15.955 12.926 21.309 0 32 0h164c13.255 0 24 10.745 24 24v367.842l68.154-.001c10.626-.001 16.066 12.905 8.486 20.485z" fill="currentColor"></path>
                </svg>
                Enter
              </button>
            </div>
          </div>
        </div>
      </mock:shadow-root>
    </streamline-search>
  `);
  });
});

it("Activate 'slash' mode after typing '/'", async () => {
  stateInternal.searchValue = '/';
  const page = await newSpecPage({
    components: [StreamlineSearch],
    html: `<streamline-search></streamline-search>`,
  });
  const input = page.doc
    .querySelector('streamline-search')
    .shadowRoot.querySelector('input');
  input.value = '/';
  input.dispatchEvent(new Event('input'));
  expect(stateInternal.isSlash).toBe(true);
});
