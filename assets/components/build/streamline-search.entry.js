import { r as registerInstance, h, g as getElement } from './index-e8dc94cb.js';
import { s as state, b as setEntries, a as state$1 } from './internal-ed7314ff.js';
import { d as doQuery } from './doQuery-8ee4717f.js';
import { B as Button } from './Button-c43e3d99.js';

function checkIfStringStartsWith(str, substrs) {
  return substrs.some((substr) => str.toLowerCase().startsWith(substr.toLowerCase()));
}

const streamlineSearchCss = "/*! tailwindcss v3.0.17 | MIT License | https://tailwindcss.com*/*,:after,:before{--tw-backdrop-sepia: ;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;border:0 solid #e5e7eb;box-sizing:border-box}:after,:before{--tw-content:\"\"}body{line-height:inherit;margin:0}h1,h2{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}strong{font-weight:bolder}table{border-collapse:collapse;border-color:inherit;text-indent:0}button,input,select{color:inherit;font-family:inherit;font-size:100%;line-height:inherit;margin:0;padding:0}button,select{text-transform:none}[type=button],button{-webkit-appearance:button;background-color:transparent;background-image:none}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}h1,h2,menu,p,ul{margin:0}menu,ul{list-style:none;padding:0}input::-moz-placeholder{color:#9ca3af;opacity:1}input:-ms-input-placeholder{color:#9ca3af;opacity:1}input::placeholder{color:#9ca3af;opacity:1}[role=button],button{cursor:pointer}img,svg{display:block;vertical-align:middle}img{height:auto;max-width:100%}[hidden]{display:none}.pointer-events-none{pointer-events:none}.visible{visibility:visible}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.left-0{left:0}.bottom-0{bottom:0}.left-4{left:16px}.right-3{right:12px}.z-50{z-index:50}.m-0{margin:0}.ml-1{margin-left:4px}.mr-2{margin-right:8px}.inline-block{display:inline-block}.inline-flex{display:inline-flex}.hidden{display:none}.h-px{height:1px}.h-full{height:100%}.h-3{height:12px}.w-full{width:100%}.w-screen{width:100vw}.w-2{width:8px}.rotate-90{--tw-rotate:90deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.items-center{align-items:center}.justify-center{justify-content:center}.border{border-width:1px}.border-blue-600{border-color:rgb(37 99 235/var(--tw-border-opacity))}.border-blue-600,.border-slate-200{--tw-border-opacity:1}.border-slate-200{border-color:rgb(226 232 240/var(--tw-border-opacity))}.bg-slate-50{background-color:rgb(248 250 252/var(--tw-bg-opacity))}.bg-slate-200,.bg-slate-50{--tw-bg-opacity:1}.bg-slate-200{background-color:rgb(226 232 240/var(--tw-bg-opacity))}.bg-transparent{background-color:transparent}.bg-blue-600{background-color:rgb(37 99 235/var(--tw-bg-opacity))}.bg-blue-600,.bg-white{--tw-bg-opacity:1}.bg-white{background-color:rgb(255 255 255/var(--tw-bg-opacity))}.fill-current{fill:currentColor}.p-0{padding:0}.px-9{padding-left:36px;padding-right:36px}.px-2{padding-left:8px;padding-right:8px}.py-1{padding-bottom:4px;padding-top:4px}.px-3{padding-left:12px;padding-right:12px}.py-2{padding-bottom:8px;padding-top:8px}.text-sm{font-size:14px}.font-normal{font-weight:400}.font-semibold{font-weight:600}.text-slate-900{color:rgb(15 23 42/var(--tw-text-opacity))}.text-slate-500,.text-slate-900{--tw-text-opacity:1}.text-slate-500{color:rgb(100 116 139/var(--tw-text-opacity))}.text-white{color:rgb(255 255 255/var(--tw-text-opacity))}.text-slate-600,.text-white{--tw-text-opacity:1}.text-slate-600{color:rgb(71 85 105/var(--tw-text-opacity))}.opacity-50{opacity:.5}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1);--tw-shadow-colored:0 1px 3px 0 var(--tw-shadow-color),0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.blur{--tw-blur:blur(8px);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}:host{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-overflow-scrolling:touch;box-sizing:border-box}:host .focus:focus{box-shadow:inset 0 0 0 4px #f1f5f9,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-border:focus{border-color:var(--sl-focus-color);box-shadow:0 0 0 1px var(--sl-focus-color);outline:none!important}:host .focus-out:focus{box-shadow:0 0 0 2px #f8fafc,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-dark:focus{box-shadow:inset 0 0 0 4px #0f172a,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-darker:focus{box-shadow:inset 0 0 0 4px #020204,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-white:focus{box-shadow:inset 0 0 0 4px #fff,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-in-white-out:focus-within{box-shadow:0 0 0 2px #fff,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-none:focus{box-shadow:none!important;outline:none!important}:host .border-invalid{border-color:var(--sl-focus-color-invalid);box-shadow:0 0 0 1px var(--sl-focus-color-invalid);outline:none!important}:host *{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-overflow-scrolling:touch}:host .overflow-x-auto:not(.scrollbar-none)::-webkit-scrollbar,:host .overflow-y-auto:not(.scrollbar-none)::-webkit-scrollbar,:host .overflow-y-scroll:not(.scrollbar-none)::-webkit-scrollbar{height:4px;width:8px}:host .overflow-x-auto:not(.scrollbar-none)::-webkit-scrollbar-track,:host .overflow-y-auto:not(.scrollbar-none)::-webkit-scrollbar-track,:host .overflow-y-scroll:not(.scrollbar-none)::-webkit-scrollbar-track{background:#fff}:host .overflow-x-auto:not(.scrollbar-none)::-webkit-scrollbar-thumb,:host .overflow-y-auto:not(.scrollbar-none)::-webkit-scrollbar-thumb,:host .overflow-y-scroll:not(.scrollbar-none)::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:0}:host .scrollbar-none::-webkit-scrollbar{height:0;width:0}:host .scrollbar-none::-webkit-scrollbar-track{background:transparent}:host .scrollbar-none::-webkit-scrollbar-thumb{background:transparent}input{-webkit-appearance:none;border-radius:0}.top-1\\/2{top:50%}.h-\\[var\\(--sl-side-w\\)\\]{height:var(--sl-side-w)}.h-3\\.5{height:14px}.-translate-y-1\\/2{--tw-translate-y:-50%}.-translate-y-1\\/2,.rotate-90{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.text-\\[18px\\]{font-size:18px}.placeholder-slate-500::-moz-placeholder{--tw-placeholder-opacity:1;color:rgb(100 116 139/var(--tw-placeholder-opacity))}.placeholder-slate-500:-ms-input-placeholder{--tw-placeholder-opacity:1;color:rgb(100 116 139/var(--tw-placeholder-opacity))}.placeholder-slate-500::placeholder{--tw-placeholder-opacity:1;color:rgb(100 116 139/var(--tw-placeholder-opacity))}.focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}.peer:focus~.peer-focus\\:-bottom-px{bottom:-1px}.peer:focus~.peer-focus\\:h-\\[2px\\]{height:2px}.peer:focus~.peer-focus\\:bg-blue-600{--tw-bg-opacity:1;background-color:rgb(37 99 235/var(--tw-bg-opacity))}.peer:focus~.peer-focus\\:text-blue-600{--tw-text-opacity:1;color:rgb(37 99 235/var(--tw-text-opacity))}@media (min-width:640px){.sm\\:right-4{right:16px}}@media (min-width:1024px){.lg\\:left-5{left:20px}.lg\\:h-\\[64px\\]{height:64px}.lg\\:px-12{padding-left:48px;padding-right:48px}}.h-\\[max-content\\]{height:-webkit-max-content;height:-moz-max-content;height:max-content}.px-2\\.5{padding-left:10px;padding-right:10px}.py-1\\.5{padding-bottom:6px;padding-top:6px}.\\!h-5{height:20px!important}.\\!w-5{width:20px!important}.\\!p-0{padding:0!important}.hover\\:border-blue-700:hover{--tw-border-opacity:1;border-color:rgb(29 78 216/var(--tw-border-opacity))}.hover\\:border-slate-900:hover{--tw-border-opacity:1;border-color:rgb(15 23 42/var(--tw-border-opacity))}.hover\\:bg-blue-700:hover{--tw-bg-opacity:1;background-color:rgb(29 78 216/var(--tw-bg-opacity))}.hover\\:bg-slate-900:hover{--tw-bg-opacity:1;background-color:rgb(15 23 42/var(--tw-bg-opacity))}.hover\\:text-white:hover{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity))}.hover\\:text-slate-50:hover{--tw-text-opacity:1;color:rgb(248 250 252/var(--tw-text-opacity))}@media (min-width:640px){.sm\\:px-4{padding-left:16px;padding-right:16px}.sm\\:px-3{padding-left:12px;padding-right:12px}.sm\\:py-1\\.5{padding-bottom:6px;padding-top:6px}.sm\\:py-1{padding-bottom:4px;padding-top:4px}}";

let StreamlineSearch = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.handleChange = (e) => {
      state.searchValue = e.target.value;
      if (!e.target.value.startsWith('/')) {
        state.isLoading = false;
        state.isSlash = false;
        state.isEnter = false;
        setEntries();
        if ((state$1.active === 'post' || state$1.active === 'site') &&
          state.searchValue.trim().length >= 1 &&
          !state.test) {
          state.isEnter = true;
          this.command = state$1.active;
        }
      }
      /*
      if (
        // (e.target.value.startsWith('/') && isLocalCommands()) ||
        e.target.value.startsWith('/')
      ) {
        state.isSlash = true;
        if (
          checkIfStringStartsWith(
            state.searchValue,
            state.menu[stateLocal.active].commands
          )
        ) {
          state.isEnter = true;
          this.command = state.searchValue.split(' ')[0].slice(1);
        } else {
          state.isLoading = false;
          state.isEnter = false;
        }
      }
       */
    };
    this.handleKeydown = (e) => {
      if (e.key === 'Enter' && state.isEnter && !state.test) {
        this.startQuery();
      }
    };
    this.handleBlur = () => {
      state.isSearchFocus = false;
    };
    this.startQuery = () => {
      var _a;
      this.callback = ((_a = state.commands.local[this.command]) === null || _a === void 0 ? void 0 : _a.callback) || false;
      if (this.callback ||
        state$1.active === 'post' ||
        state$1.active === 'site') {
        if (checkIfStringStartsWith(state.searchValue, this.commands) &&
          this.callback) {
          this.value = state.searchValue.replace(`/${this.command}`, '').trim();
        }
        else if (state$1.active === 'post' || state$1.active === 'site') {
          this.value = state.searchValue;
          this.callback = `${state$1.active}s`;
        }
        doQuery({
          callback: this.callback,
          type: this.command,
          search: this.value,
        });
      }
    };
  }
  connectedCallback() {
    const arr = [];
    Object.keys(state.commands.local).forEach((item) => {
      arr.push(`/${item} `);
    });
    this.commands = arr;
  }
  render() {
    return (h("div", { class: "bg-slate-50 relative h-[var(--sl-side-w)] w-full lg:h-[64px]" }, h("div", { class: "h-px w-screen left-0 absolute bottom-0 bg-slate-200 z-50" }), state.isSearch && [
      h("input", { part: "search", class: "peer bg-transparent focus:outline-none w-full h-[var(--sl-side-w)] text-[18px] h-full w-full m-0 p-0 font-normal placeholder-slate-500 text-slate-900 px-9 lg:h-[64px] lg:px-12", type: "text", placeholder: state.searchPlaceholder, value: state.searchValue, onInput: this.handleChange, onKeyDown: this.handleKeydown, onBlur: this.handleBlur }),
      h("div", { class: "h-px w-screen left-0 absolute bottom-0 bg-slate-200 z-50 peer-focus:h-[2px] peer-focus:-bottom-px peer-focus:bg-blue-600" }),
      h("svg", { xmlns: "http://www.w3.org/2000/svg", class: "search absolute top-1/2 -translate-y-1/2 left-4 h-3.5 text-slate-500 peer-focus:text-blue-600 lg:left-5", viewBox: "0 0 512 512" }, h("path", { fill: "currentColor", d: "M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z" })),
      state.isEnter && (h("div", { class: "absolute right-3 -translate-y-1/2 top-1/2 sm:right-4" }, h(Button, { onClick: this.startQuery, type: "tertiary", text: "Search", icon: h("svg", { xmlns: "http://www.w3.org/2000/svg", class: "fill-current w-2 rotate-90 ml-1 mr-2 origin-right-center", viewBox: "0 0 320 512" }, h("path", { fill: "currentColor", d: "M296.64 412.326l-96.16 96.16c-4.686 4.687-12.285 4.686-16.97 0L87.354 412.33c-7.536-7.536-2.198-20.484 8.485-20.485l68.161-.002V56H64a11.996 11.996 0 0 1-8.485-3.515l-32-32C15.955 12.926 21.309 0 32 0h164c13.255 0 24 10.745 24 24v367.842l68.154-.001c10.626-.001 16.066 12.905 8.486 20.485z" })) }))),
    ]));
  }
  get el() { return getElement(this); }
};
StreamlineSearch.style = streamlineSearchCss;

export { StreamlineSearch as streamline_search };
