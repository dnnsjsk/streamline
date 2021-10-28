import { newSpecPage } from '@stencil/core/testing';
import { StreamlineButton } from './streamline-button';
import { stateLocal, disposeLocal } from '../../store/local';
import { stateInternal, disposeInternal } from '../../store/internal';

beforeEach(async () => {
  disposeInternal();
  disposeLocal();
});

describe('Render button with', function () {
  it("'type' set to 'primary' (WordPress icon)", async () => {
    const page = await newSpecPage({
      components: [StreamlineButton],
      html: `<streamline-button 
              type="primary">
             </streamline-button>`,
    });
    expect(page.root).toEqualHtml(`
<streamline-button type="primary">
      <mock:shadow-root>
        <div class="flex relative w-[calc(var(--sl-side-w)+1px)]">
          <button class="bg-blue-gray-900 bg-transparent border-b border-blue-gray-300 border-none break-words cursor-pointer fill-current flex flex-col focus-dark h-[calc(var(--sl-side-w))] h-[var(--sl-side-w)] hover:bg-[#0e1114] items-center justify-center p-0 text-blue-gray-900 text-center text-white underline-none w-[calc(var(--sl-side-w)+1px)] w-[calc(var(--sl-side-w)-1px)] w-[max-content] whitespace-no-wrap" tabindex="0"></button>
        </div>
      </mock:shadow-root>
    </streamline-button>
  `);
  });
  describe("'type' set to 'sidebar'", function () {
    it('and not active', async () => {
      stateLocal.active = 'fav';
      const page = await newSpecPage({
        components: [StreamlineButton],
        html: `<streamline-button 
                type="sidebar" 
                icon="menu">
               </streamline-button>`,
      });
      expect(page.root).toEqualHtml(`
<streamline-button icon="menu" type="sidebar">
      <mock:shadow-root>
        <div class="flex relative w-full">
          <button class="!content-center !grid !justify-items-center bg-transparent border-b border-blue-gray-300 break-words cursor-pointer flex flex-col focus h-[calc(var(--sl-side-w))] hover:bg-blue-gray-100 hover:text-blue-gray-900 items-center justify-center p-0 sm:!grid-rows-[20px,20px] text-blue-gray-500 text-blue-gray-900 text-center underline-none w-[calc(var(--sl-side-w)-1px)] w-[max-content] whitespace-no-wrap" tabindex="0" style="border-bottom: 1px solid rgba(209,213,219,var(--tw-border-opacity));">
            <svg class="fill-current h-[18px]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <path d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z" fill="currentColor"></path>
            </svg>
          </button>
        </div>
      </mock:shadow-root>
    </streamline-button>
  `);
    });
    it('and active', async () => {
      stateLocal.active = 'menu';
      const page = await newSpecPage({
        components: [StreamlineButton],
        html: `<streamline-button 
                type="sidebar" 
                icon="menu">
               </streamline-button>`,
      });
      expect(page.root).toEqualHtml(`
<streamline-button icon="menu" type="sidebar">
      <mock:shadow-root>
        <div class="flex relative w-full">
          <button class="!content-center !grid !justify-items-center bg-transparent border-b border-blue-gray-300 break-words cursor-pointer flex flex-col focus h-[calc(var(--sl-side-w))] hover:bg-blue-gray-100 hover:text-blue-gray-900 items-center justify-center p-0 pointer-events-none sm:!grid-rows-[20px,20px] text-blue-700 text-blue-gray-500 text-blue-gray-900 text-center underline-none w-[calc(var(--sl-side-w)-1px)] w-[max-content] whitespace-no-wrap" tabindex="-1" style="border-bottom: 1px solid rgba(209,213,219,var(--tw-border-opacity));">
            <svg class="fill-current h-[18px]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <path d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z" fill="currentColor"></path>
            </svg>
          </button>
        </div>
      </mock:shadow-root>
    </streamline-button>
  `);
    });
  });
  describe("'type' set to 'menu'", function () {
    it('and not a favourite', async () => {
      stateLocal.active = 'fav';
      stateInternal.entriesFav = [];
      stateInternal.entriesFavActive = [];
      const page = await newSpecPage({
        components: [StreamlineButton],
        html: `<streamline-button 
                type="menu">
               </streamline-button>`,
      });
      expect(page.root).toEqualHtml(`
<streamline-button type="menu">
      <mock:shadow-root>
        <div class="flex relative w-full">
          <button class="bg-white border border-blue-gray-200 focus-out font-medium hover:bg-blue-gray-900 hover:border-blue-gray-900 hover:text-blue-gray-50 inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 sm:text-sm text-blue-gray-600 text-xs"></button>
          <div class="!grid auto-cols-max divide-blue-gray-200 divide-x grid-flow-col" style="display: block;">
            <button class="border-none focus-dark">
              <span class="flex h-8 items-center justify-center w-8">
                <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" style="width: 8px; height: 8px;">
                  <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" fill="currentColor"></path>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </mock:shadow-root>
    </streamline-button>
  `);
    });
    it('and a favourite', async () => {
      stateLocal.active = 'menu';
      const page = await newSpecPage({
        components: [StreamlineButton],
        html: `<streamline-button 
                type="menu">
               </streamline-button>`,
      });
      await page.waitForChanges();
      expect(page.root).toEqualHtml(`
<streamline-button favourite="" type="menu">
      <mock:shadow-root>
        <div class="flex relative w-full">
          <button class="bg-white border border-blue-gray-200 focus-out font-medium hover:bg-blue-gray-900 hover:border-blue-gray-900 hover:text-blue-gray-50 inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 sm:text-sm text-blue-gray-600 text-xs"></button>
          <div class="!grid auto-cols-max divide-blue-gray-200 divide-x grid-flow-col" style="display: block;">
            <button class="border-none focus-dark">
              <span class="flex h-8 items-center justify-center text-red-500 w-8">
                <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" style="width: 8px; height: 8px;">
                  <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" fill="currentColor"></path>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </mock:shadow-root>
    </streamline-button>
  `);
    });
  });
});
