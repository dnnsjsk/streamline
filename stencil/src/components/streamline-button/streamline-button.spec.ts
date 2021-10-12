import { newSpecPage } from '@stencil/core/testing';
import { StreamlineButton } from './streamline-button';
import { stateLocal, disposeLocal } from '../../store/local';

beforeEach(async () => {
  disposeLocal();
});

describe('Render button when the', function () {
  it("type is 'primary' (WordPress icon)", async () => {
    const page = await newSpecPage({
      components: [StreamlineButton],
      html: `<streamline-button type="primary"></streamline-button>`,
    });
    expect(page.root).toEqualHtml(`
<streamline-button type="primary">
      <mock:shadow-root>
        <div class="inline-flex relative w-full">
          <div class="focus focus--px">
            <button class="bg-[#191E23] bg-transparent border-b border-gray-300 border-none break-words cursor-pointer fill-current flex flex-col h-[calc(var(--sl-side-w))] h-[var(--sl-side-w)] hover:bg-[#0e1114] items-center justify-center p-0 text-center text-gray-900 text-white underline-none w-[calc(var(--sl-side-w)-1px)] w-[max-content] w-[var(--sl-side-w)] whitespace-no-wrap" tabindex="0"></button>
          </div>
        </div>
      </mock:shadow-root>
    </streamline-button>
  `);
  });
  describe("type is 'sidebar'", function () {
    it('and not active', async () => {
      stateLocal.active = 'fav';
      const page = await newSpecPage({
        components: [StreamlineButton],
        html: `<streamline-button type="sidebar" icon="menu"></streamline-button>`,
      });
      expect(page.root).toEqualHtml(`
<streamline-button icon="menu" type="sidebar">
      <mock:shadow-root>
        <div class="inline-flex relative w-full">
          <div class="focus focus--px">
            <button class="!content-center !grid !justify-items-center bg-transparent border-b border-gray-300 break-words cursor-pointer false flex flex-col h-[calc(var(--sl-side-w))] hover:bg-gray-100 hover:text-gray-900 items-center justify-center p-0 sm:!grid-rows-[20px,20px] text-center text-gray-500 text-gray-900 underline-none w-[calc(var(--sl-side-w)-1px)] w-[max-content] whitespace-no-wrap" tabindex="0" style="border-bottom: 1px solid rgba(209,213,219,var(--tw-border-opacity));">
              <svg class="fill-current h-[18px]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z" fill="currentColor"></path>
              </svg>
            </button>
          </div>
        </div>
      </mock:shadow-root>
    </streamline-button>
  `);
    });
    it('and active', async () => {
      stateLocal.active = 'menu';
      const page = await newSpecPage({
        components: [StreamlineButton],
        html: `<streamline-button type="sidebar" icon="menu"></streamline-button>`,
      });
      expect(page.root).toEqualHtml(`
<streamline-button icon="menu" type="sidebar">
      <mock:shadow-root>
        <div class="inline-flex relative w-full">
          <div class="focus focus--px">
            <button class="!content-center !grid !justify-items-center -right-px bg-transparent bg-white border-b border-gray-300 border-r border-white break-words cursor-pointer flex flex-col h-[calc(var(--sl-side-w))] hover:!bg-white hover:bg-gray-100 hover:text-gray-900 items-center justify-center p-0 pointer-events-none relative sm:!grid-rows-[20px,20px] text-center text-gray-500 text-gray-900 text-indigo-700 underline-none w-[calc(var(--sl-side-w)-1px)] w-[max-content] whitespace-no-wrap" tabindex="-1" style="border-bottom: 1px solid rgba(209,213,219,var(--tw-border-opacity));">
              <svg class="fill-current h-[18px]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z" fill="currentColor"></path>
              </svg>
            </button>
          </div>
        </div>
      </mock:shadow-root>
    </streamline-button>
  `);
    });
  });
  describe("type is 'main'", function () {
    it("and is not a 'favourite", async () => {
      stateLocal.active = 'fav';
      stateLocal.entriesFav = [];
      stateLocal.entriesFavActive = [];
      const page = await newSpecPage({
        components: [StreamlineButton],
        html: `<streamline-button type="main"></streamline-button>`,
      });
      expect(page.root).toEqualHtml(`
<streamline-button type="main">
      <mock:shadow-root>
        <div class="inline-flex relative w-full">
          <div class="focus focus--px">
            <button class="bg-gray-50 border border-gray-200 break-words cursor-pointer hover:border-indigo-600 leading-none min-w-[75px] px-3 py-2.5 text-center text-indigo-600 text-sm underline-none w-[max-content] whitespace-no-wrap" tabindex="0" style="border-bottom: 1px solid rgba(209,213,219,var(--tw-border-opacity));"></button>
          </div>
          <div class="!grid auto-cols-max divide-gray-200 divide-x grid-flow-col" style="display: block;">
            <button class="border-none focus focus--px">
              <span class="flex h-8 items-center justify-center w-8">
                <svg class="h-2 w-2" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
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
    it('and is a favourite', async () => {
      stateLocal.active = 'menu';
      const page = await newSpecPage({
        components: [StreamlineButton],
        html: `<streamline-button type="main"></streamline-button>`,
      });
      await page.waitForChanges();
      expect(page.root).toEqualHtml(`
<streamline-button type="main">
      <mock:shadow-root>
        <div class="inline-flex relative w-full">
          <div class="focus focus--px">
            <button class="bg-gray-50 border border-gray-200 break-words cursor-pointer hover:border-indigo-600 leading-none min-w-[75px] px-3 py-2.5 text-center text-indigo-600 text-sm underline-none w-[max-content] whitespace-no-wrap" tabindex="0" style="border-bottom: 1px solid rgba(209,213,219,var(--tw-border-opacity));"></button>
          </div>
          <div class="!grid auto-cols-max divide-gray-200 divide-x grid-flow-col" style="display: block;">
            <button class="border-none focus focus--px">
              <span class="flex h-8 items-center justify-center w-8">
                <svg class="h-2 w-2" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
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
