import { r as registerInstance, h, e as Host, g as getElement } from './index-e8dc94cb.js';
import { s as state, a as state$1, b as setEntries, f as focusSearch, c as setSearchPlaceholder } from './internal-ed7314ff.js';
import { g as getMenus } from './getMenus-bb7120ad.js';
import { g as getMetaKey } from './getMetaKey-a1d5ef39.js';

const streamlineContainerCss = "/*! tailwindcss v3.0.17 | MIT License | https://tailwindcss.com*/*,:after,:before{--tw-backdrop-sepia: ;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;border:0 solid #e5e7eb;box-sizing:border-box}:after,:before{--tw-content:\"\"}body{line-height:inherit;margin:0}h1,h2{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}strong{font-weight:bolder}table{border-collapse:collapse;border-color:inherit;text-indent:0}button,input,select{color:inherit;font-family:inherit;font-size:100%;line-height:inherit;margin:0;padding:0}button,select{text-transform:none}[type=button],button{-webkit-appearance:button;background-color:transparent;background-image:none}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}h1,h2,menu,p,ul{margin:0}menu,ul{list-style:none;padding:0}input::-moz-placeholder{color:#9ca3af;opacity:1}input:-ms-input-placeholder{color:#9ca3af;opacity:1}input::placeholder{color:#9ca3af;opacity:1}[role=button],button{cursor:pointer}img,svg{display:block;vertical-align:middle}img{height:auto;max-width:100%}[hidden]{display:none}.pointer-events-none{pointer-events:none}.pointer-events-auto{pointer-events:auto}.visible{visibility:visible}.fixed{position:fixed}.absolute{position:absolute}.top-0{top:0}.left-0{left:0}.block{display:block}.inline-block{display:inline-block}.flex{display:flex}.grid{display:grid}.hidden{display:none}.h-full{height:100%}.w-full{width:100%}.items-center{align-items:center}.justify-center{justify-content:center}.overflow-hidden{overflow:hidden}.bg-white{background-color:rgb(255 255 255/var(--tw-bg-opacity))}.bg-slate-50,.bg-white{--tw-bg-opacity:1}.bg-slate-50{background-color:rgb(248 250 252/var(--tw-bg-opacity))}.bg-slate-200{--tw-bg-opacity:1;background-color:rgb(226 232 240/var(--tw-bg-opacity))}.px-2{padding-left:8px;padding-right:8px}.py-1{padding-bottom:4px;padding-top:4px}.text-slate-500{--tw-text-opacity:1;color:rgb(100 116 139/var(--tw-text-opacity))}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1);--tw-shadow-colored:0 1px 3px 0 var(--tw-shadow-color),0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.blur{--tw-blur:blur(8px);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.backdrop-blur-sm{--tw-backdrop-blur:blur(4px);-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}:host{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-overflow-scrolling:touch;box-sizing:border-box;display:block;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif}:host *{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-overflow-scrolling:touch}:host .overflow-x-auto:not(.scrollbar-none)::-webkit-scrollbar,:host .overflow-y-auto:not(.scrollbar-none)::-webkit-scrollbar,:host .overflow-y-scroll:not(.scrollbar-none)::-webkit-scrollbar{height:4px;width:8px}:host .overflow-x-auto:not(.scrollbar-none)::-webkit-scrollbar-track,:host .overflow-y-auto:not(.scrollbar-none)::-webkit-scrollbar-track,:host .overflow-y-scroll:not(.scrollbar-none)::-webkit-scrollbar-track{background:#fff}:host .overflow-x-auto:not(.scrollbar-none)::-webkit-scrollbar-thumb,:host .overflow-y-auto:not(.scrollbar-none)::-webkit-scrollbar-thumb,:host .overflow-y-scroll:not(.scrollbar-none)::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:0}:host .scrollbar-none::-webkit-scrollbar{height:0;width:0}:host .scrollbar-none::-webkit-scrollbar-track{background:transparent}:host .scrollbar-none::-webkit-scrollbar-thumb{background:transparent}:host .focus:focus{box-shadow:inset 0 0 0 4px #f1f5f9,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-border:focus{border-color:var(--sl-focus-color);box-shadow:0 0 0 1px var(--sl-focus-color);outline:none!important}:host .focus-out:focus{box-shadow:0 0 0 2px #f8fafc,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-dark:focus{box-shadow:inset 0 0 0 4px #0f172a,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-darker:focus{box-shadow:inset 0 0 0 4px #020204,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-white:focus{box-shadow:inset 0 0 0 4px #fff,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-in-white-out:focus-within{box-shadow:0 0 0 2px #fff,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-none:focus{box-shadow:none!important;outline:none!important}:host .border-invalid{border-color:var(--sl-focus-color-invalid);box-shadow:0 0 0 1px var(--sl-focus-color-invalid);outline:none!important}.bottom-\\[var\\(--sl-side-w\\)\\]{bottom:var(--sl-side-w)}.z-\\[9999999999999999\\]{z-index:10000000000000000}.h-\\[calc\\(100\\%-var\\(--sl-side-w\\)\\)\\]{height:calc(100% - var(--sl-side-w))}.h-\\[var\\(--sl-side-w\\)\\]{height:var(--sl-side-w)}.max-h-\\[700px\\]{max-height:700px}.max-w-\\[1024px\\]{max-width:1024px}.grid-cols-\\[1fr\\2c var\\(--sl-side-w\\)\\]{grid-template-columns:1fr var(--sl-side-w)}.bg-black\\/90{background-color:rgba(0,0,0,.9)}@media (min-width:640px){.sm\\:bottom-0{bottom:0}.sm\\:left-\\[var\\(--sl-side-w\\)\\]{left:var(--sl-side-w)}.sm\\:top-0{top:0}.sm\\:hidden{display:none}.sm\\:h-full{height:100%}.sm\\:w-\\[calc\\(100\\%-var\\(--sl-side-w\\)\\)\\]{width:calc(100% - var(--sl-side-w))}}@media (min-width:1024px){.lg\\:h-\\[64px\\]{height:64px}.lg\\:grid-cols-\\[1fr\\2c 64px\\]{grid-template-columns:1fr 64px}}.h-\\[max-content\\]{height:-webkit-max-content;height:-moz-max-content;height:max-content}.px-2\\.5{padding-left:10px;padding-right:10px}.py-1\\.5{padding-bottom:6px;padding-top:6px}";

let StreamlineContainer = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.mac = false;
    this.cycleTabs = (mode) => {
      const index = state.menus.indexOf(state$1.active);
      const length = state.menus.length;
      if (mode === 'up') {
        if (index === 0) {
          state$1.active = state.menus[length - 1];
        }
        else {
          state$1.active = state.menus[index - 1];
        }
      }
      if (mode === 'down') {
        if (index + 1 === length) {
          state$1.active = state.menus[0];
        }
        else {
          state$1.active = state.menus[index + 1];
        }
      }
      getMenus();
    };
  }
  connectedCallback() {
    setEntries();
    state.isMac = this.mac || navigator.userAgent.indexOf('Mac OS X') !== -1;
    state.entriesSettingsActive = state.entriesSettings;
    state.entriesSettings[0].children.forEach((item) => {
      item.children.forEach((itemInner) => {
        var _a, _b;
        state.entriesSettingsLoad[itemInner.id] = {
          default: (_b = (_a = (state.test
            ? state.entriesSettings
            : JSON.parse(state.data.settings))[itemInner.id]) === null || _a === void 0 ? void 0 : _a.default) !== null && _b !== void 0 ? _b : state.entriesSettingsLoad[itemInner.id].default,
        };
      });
    });
    state.entriesSettingsSave = state.entriesSettingsLoad;
    document.addEventListener('keydown', (e) => {
      if (e.key === 'k' && getMetaKey(e)) {
        e.preventDefault();
        if (state.entriesSettingsLoad.behaviourDefaultTab.default !== 'last') {
          state$1.active =
            state.entriesSettingsLoad.behaviourDefaultTab.default;
          getMenus();
        }
        state.visible = !state.visible;
      }
      if (state.visible) {
        if (e.key === 'ArrowUp' &&
          getMetaKey(e) &&
          state.entriesSettingsLoad.keyNavigationTabs.default) {
          e.preventDefault();
          this.cycleTabs('up');
        }
        if (e.key === 'ArrowDown' &&
          getMetaKey(e) &&
          state.entriesSettingsLoad.keyNavigationTabs.default) {
          e.preventDefault();
          this.cycleTabs('down');
        }
        if (e.key === 'Escape' && state.entriesSettingsLoad.keyExit.default) {
          e.preventDefault();
          state.visible = false;
        }
        if (e.key === 's' &&
          getMetaKey(e) &&
          state.entriesSettingsLoad.keySearch.default) {
          e.preventDefault();
          focusSearch();
        }
      }
    });
  }
  componentDidLoad() {
    setSearchPlaceholder();
    state.visible = this.visible || false;
  }
  async setData(data) {
    Object.entries(data).forEach(([key, value]) => {
      state[key] = value;
      state[`${key}Active`] = value;
    });
    setEntries();
  }
  async toggle() {
    state.visible = !state.visible;
  }
  async toggleTestFull(type) {
    state.testFull = type;
    state.menu = Object.assign(Object.assign({}, state.menu), {
      site: Object.assign(Object.assign({}, state.menu.site), { condition: type }),
      networkMenu: Object.assign(Object.assign({}, state.menu.networkMenu), { condition: type }),
    });
  }
  render() {
    return (h(Host, null, h("div", { class: `fixed flex items-center justify-center top-0 left-0 w-full h-full z-[9999999999999999] ${state.visible
        ? 'block pointer-events-auto'
        : 'hidden pointer-events-none'}` }, h("div", { tabIndex: -1, class: `fixed top-0 left-0 w-full h-full bg-black/90 ${state.entriesSettingsLoad.appearanceBlur.default
        ? 'backdrop-blur-sm'
        : ''}`, onClick: () => (state.visible = false) }), h("div", { class: "inner w-full h-full absolute max-w-[1024px] max-h-[700px] bg-white overflow-hidden grid" }, h("streamline-sidebar", null), h("div", { class: "h-full w-full absolute bottom-[var(--sl-side-w)] h-[calc(100%-var(--sl-side-w))] sm:bottom-0 sm:left-[var(--sl-side-w)] sm:w-[calc(100%-var(--sl-side-w))] sm:top-0 sm:h-full" }, h("div", { class: `bg-slate-50 grid grid-cols-[1fr,var(--sl-side-w)] lg:grid-cols-[1fr,64px]` }, h("streamline-search", { class: "h-[var(--sl-side-w)] w-full lg:h-[64px]" }), h("streamline-ui-dropdown", { type: "main", items: [
        {
          text: state.isHelp ? 'Close help' : 'Show help',
          onClick: () => {
            state.isHelp = !state.isHelp;
            state.isSearch = !state.isSearch;
          },
        },
      ] })), h("streamline-entries", null)), h("streamline-ui-drawer", { class: "sm:hidden" })))));
  }
  get el() { return getElement(this); }
};
StreamlineContainer.style = streamlineContainerCss;

export { StreamlineContainer as streamline_container };
