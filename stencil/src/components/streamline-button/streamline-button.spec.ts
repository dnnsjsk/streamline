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
              type="primary"
              icon="wordpress">
             </streamline-button>`,
    });
    expect(page.root).toEqualHtml(`
<streamline-button icon="wordpress" type="primary">
      <mock:shadow-root>
        <div class="flex relative w-[calc(var(--sl-side-w)+1px)]">
          <button class="bg-blue-gray-900 bg-transparent border-b border-blue-gray-300 border-none break-words cursor-pointer fill-current flex flex-col focus-dark h-[calc(var(--sl-side-w))] h-[var(--sl-side-w)] hover:bg-[#0e1114] items-center justify-center p-0 select-none text-blue-gray-900 text-center text-white underline-none w-[calc(var(--sl-side-w)+1px)] w-[calc(var(--sl-side-w)-1px)] w-[max-content] whitespace-no-wrap" tabindex="0">
            <svg class="h-8 sm:h-10 sm:w-10 w-8" viewBox="-2 -2 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 10c0-5.51-4.49-10-10-10C4.48 0 0 4.49 0 10c0 5.52 4.48 10 10 10 5.51 0 10-4.48 10-10zM7.78 15.37L4.37 6.22c.55-.02 1.17-.08 1.17-.08.5-.06.44-1.13-.06-1.11 0 0-1.45.11-2.37.11-.18 0-.37 0-.58-.01C4.12 2.69 6.87 1.11 10 1.11c2.33 0 4.45.87 6.05 2.34-.68-.11-1.65.39-1.65 1.58 0 .74.45 1.36.9 2.1.35.61.55 1.36.55 2.46 0 1.49-1.4 5-1.4 5l-3.03-8.37c.54-.02.82-.17.82-.17.5-.05.44-1.25-.06-1.22 0 0-1.44.12-2.38.12-.87 0-2.33-.12-2.33-.12-.5-.03-.56 1.2-.06 1.22l.92.08 1.26 3.41zM17.41 10c.24-.64.74-1.87.43-4.25.7 1.29 1.05 2.71 1.05 4.25 0 3.29-1.73 6.24-4.4 7.78.97-2.59 1.94-5.2 2.92-7.78zM6.1 18.09C3.12 16.65 1.11 13.53 1.11 10c0-1.3.23-2.48.72-3.59C3.25 10.3 4.67 14.2 6.1 18.09zm4.03-6.63l2.58 6.98c-.86.29-1.76.45-2.71.45-.79 0-1.57-.11-2.29-.33.81-2.38 1.62-4.74 2.42-7.1z"></path>
            </svg>
          </button>
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
          <button class="!content-center !grid !justify-items-center bg-transparent border-b border-blue-gray-300 break-words cursor-pointer flex flex-col focus h-[calc(var(--sl-side-w))] hover:bg-blue-gray-100 hover:text-blue-gray-900 items-center justify-center p-0 select-none sm:!grid-rows-[20px,20px] text-blue-gray-500 text-blue-gray-900 text-center underline-none w-[calc(var(--sl-side-w)-1px)] w-[max-content] whitespace-no-wrap" tabindex="0" style="border-bottom: 1px solid rgba(209,213,219,var(--tw-border-opacity));">
            <svg class="h-[16px]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
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
          <button class="!content-center !grid !justify-items-center bg-transparent border-b border-blue-gray-300 break-words cursor-pointer flex flex-col focus h-[calc(var(--sl-side-w))] hover:bg-blue-gray-100 hover:text-blue-gray-900 items-center justify-center p-0 pointer-events-none select-none sm:!grid-rows-[20px,20px] text-blue-700 text-blue-gray-500 text-blue-gray-900 text-center underline-none w-[calc(var(--sl-side-w)-1px)] w-[max-content] whitespace-no-wrap" tabindex="-1" style="border-bottom: 1px solid rgba(209,213,219,var(--tw-border-opacity));">
            <svg class="h-[16px]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
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
                type="menu"
                href="google.com">
               </streamline-button>`,
      });
      expect(page.root).toEqualHtml(`
<streamline-button href="google.com" type="menu">
      <mock:shadow-root>
        <div class="flex relative w-full">
          <a class="bg-blue-gray-50 border border-blue-gray-200 break-words cursor-pointer focus-out hover:border-blue-600 leading-none px-3 py-2.5 select-none text-blue-600 text-center text-sm underline-none w-[max-content] whitespace-no-wrap" href="google.com"></a>
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
                type="menu"
                href="google.com">
               </streamline-button>`,
      });
      await page.waitForChanges();
      expect(page.root).toEqualHtml(`
<streamline-button favourite="" href="google.com" type="menu">
      <mock:shadow-root>
        <div class="flex relative w-full">
          <a class="bg-blue-gray-50 border border-blue-gray-200 break-words cursor-pointer focus-out hover:border-blue-600 leading-none px-3 py-2.5 select-none text-blue-600 text-center text-sm underline-none w-[max-content] whitespace-no-wrap" href="google.com">
            <span class="-right-2 -top-1.5 absolute bg-white border border-blue-gray-200 flex h-4 items-center justify-center pointer-events-none rounded-full text-red-500 w-4">
              <span class="flex h-full items-center justify-center w-full">
                <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" style="width: 8px; height: 8px;">
                  <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" fill="currentColor"></path>
                </svg>
              </span>
            </span>
          </a>
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
