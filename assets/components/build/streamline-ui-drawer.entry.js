import { r as registerInstance, h, e as Host, g as getElement } from './index-68615357.js';
import { B as Button } from './Button-7b396b24.js';
import { s as state } from './internal-77064a2d.js';

const streamlineUiDrawerCss = "/*! tailwindcss v3.0.17 | MIT License | https://tailwindcss.com*/*,:after,:before{--tw-backdrop-sepia: ;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;border:0 solid #e5e7eb;box-sizing:border-box}:after,:before{--tw-content:\"\"}body{line-height:inherit;margin:0}h1,h2{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}table{border-collapse:collapse;border-color:inherit;text-indent:0}button,input,select{color:inherit;font-family:inherit;font-size:100%;line-height:inherit;margin:0;padding:0}button,select{text-transform:none}[type=button],button{-webkit-appearance:button;background-color:transparent;background-image:none}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}h1,h2,menu,p,ul{margin:0}menu,ul{list-style:none;padding:0}input::-moz-placeholder{color:#9ca3af;opacity:1}input:-ms-input-placeholder{color:#9ca3af;opacity:1}input::placeholder{color:#9ca3af;opacity:1}[role=button],button{cursor:pointer}img,svg{display:block;vertical-align:middle}img{height:auto;max-width:100%}[hidden]{display:none}.pointer-events-none{pointer-events:none}.pointer-events-auto{pointer-events:auto}.visible{visibility:visible}.fixed{position:fixed}.absolute{position:absolute}.top-0{top:0}.left-0{left:0}.bottom-0{bottom:0}.mr-2{margin-right:8px}.block{display:block}.inline-block{display:inline-block}.flex{display:flex}.inline-flex{display:inline-flex}.grid{display:grid}.hidden{display:none}.h-full{height:100%}.w-full{width:100%}.translate-y-full{--tw-translate-y:100%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.cursor-pointer{cursor:pointer}.flex-col{flex-direction:column}.items-center{align-items:center}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.space-y-8>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-bottom:calc(32px*var(--tw-space-y-reverse));margin-top:calc(32px*(1 - var(--tw-space-y-reverse)))}.overflow-y-auto{overflow-y:auto}.border{border-width:1px}.border-blue-600{border-color:rgb(37 99 235/var(--tw-border-opacity))}.border-blue-600,.border-slate-200{--tw-border-opacity:1}.border-slate-200{border-color:rgb(226 232 240/var(--tw-border-opacity))}.bg-white{background-color:rgb(255 255 255/var(--tw-bg-opacity))}.bg-slate-200,.bg-white{--tw-bg-opacity:1}.bg-slate-200{background-color:rgb(226 232 240/var(--tw-bg-opacity))}.bg-blue-600{--tw-bg-opacity:1;background-color:rgb(37 99 235/var(--tw-bg-opacity))}.p-4{padding:16px}.px-4{padding-left:16px;padding-right:16px}.py-8{padding-bottom:32px;padding-top:32px}.px-2{padding-left:8px;padding-right:8px}.py-1{padding-bottom:4px;padding-top:4px}.px-3{padding-left:12px;padding-right:12px}.py-2{padding-bottom:8px;padding-top:8px}.text-center{text-align:center}.text-base{font-size:16px}.text-lg{font-size:18px}.text-sm{font-size:14px}.font-medium{font-weight:500}.font-semibold{font-weight:600}.text-white{color:rgb(255 255 255/var(--tw-text-opacity))}.text-gray-900,.text-white{--tw-text-opacity:1}.text-gray-900{color:rgb(17 24 39/var(--tw-text-opacity))}.text-slate-500{color:rgb(100 116 139/var(--tw-text-opacity))}.text-slate-500,.text-slate-600{--tw-text-opacity:1}.text-slate-600{color:rgb(71 85 105/var(--tw-text-opacity))}.opacity-100{opacity:1}.opacity-0{opacity:0}.opacity-50{opacity:.5}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1);--tw-shadow-colored:0 1px 3px 0 var(--tw-shadow-color),0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.blur{--tw-blur:blur(8px);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.backdrop-blur-sm{--tw-backdrop-blur:blur(4px);-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}.transition{transition-duration:.15s;transition-property:color,background-color,border-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-text-decoration-color,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-text-decoration-color,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1)}.duration-200{transition-duration:.2s}.ease-in-out{transition-timing-function:cubic-bezier(.4,0,.2,1)}:host{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-overflow-scrolling:touch;box-sizing:border-box}:host *{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-overflow-scrolling:touch}:host .overflow-x-auto:not(.scrollbar-none)::-webkit-scrollbar,:host .overflow-y-auto:not(.scrollbar-none)::-webkit-scrollbar,:host .overflow-y-scroll:not(.scrollbar-none)::-webkit-scrollbar{height:4px;width:8px}:host .overflow-x-auto:not(.scrollbar-none)::-webkit-scrollbar-track,:host .overflow-y-auto:not(.scrollbar-none)::-webkit-scrollbar-track,:host .overflow-y-scroll:not(.scrollbar-none)::-webkit-scrollbar-track{background:#fff}:host .overflow-x-auto:not(.scrollbar-none)::-webkit-scrollbar-thumb,:host .overflow-y-auto:not(.scrollbar-none)::-webkit-scrollbar-thumb,:host .overflow-y-scroll:not(.scrollbar-none)::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:0}:host .scrollbar-none::-webkit-scrollbar{height:0;width:0}:host .scrollbar-none::-webkit-scrollbar-track{background:transparent}:host .scrollbar-none::-webkit-scrollbar-thumb{background:transparent}:host .focus:focus{box-shadow:inset 0 0 0 4px #f1f5f9,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-border:focus{border-color:var(--sl-focus-color);box-shadow:0 0 0 1px var(--sl-focus-color);outline:none!important}:host .focus-out:focus{box-shadow:0 0 0 2px #f8fafc,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-dark:focus{box-shadow:inset 0 0 0 4px #0f172a,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-darker:focus{box-shadow:inset 0 0 0 4px #020204,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-white:focus{box-shadow:inset 0 0 0 4px #fff,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-in-white-out:focus-within{box-shadow:0 0 0 2px #fff,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-none:focus{box-shadow:none!important;outline:none!important}:host .border-invalid{border-color:var(--sl-focus-color-invalid);box-shadow:0 0 0 1px var(--sl-focus-color-invalid);outline:none!important}.bottom-\\[80\\%\\]{bottom:80%}.z-\\[99\\]{z-index:99}.z-\\[100\\]{z-index:100}.h-1\\/5{height:20%}.h-4\\/5{height:80%}.grid-rows-\\[auto\\2c 1fr\\2c auto\\]{grid-template-rows:auto 1fr auto}.grid-rows-\\[1fr\\2c auto\\]{grid-template-rows:1fr auto}.bg-black\\/80{background-color:rgba(0,0,0,.8)}.\\!py-4{padding-bottom:16px!important;padding-top:16px!important}.\\!text-base{font-size:16px!important}.h-\\[max-content\\]{height:-webkit-max-content;height:-moz-max-content;height:max-content}.px-2\\.5{padding-left:10px;padding-right:10px}.py-1\\.5{padding-bottom:6px;padding-top:6px}.\\!h-5{height:20px!important}.\\!w-5{width:20px!important}.\\!p-0{padding:0!important}.hover\\:border-blue-700:hover{--tw-border-opacity:1;border-color:rgb(29 78 216/var(--tw-border-opacity))}.hover\\:border-slate-900:hover{--tw-border-opacity:1;border-color:rgb(15 23 42/var(--tw-border-opacity))}.hover\\:bg-blue-700:hover{--tw-bg-opacity:1;background-color:rgb(29 78 216/var(--tw-bg-opacity))}.hover\\:bg-slate-900:hover{--tw-bg-opacity:1;background-color:rgb(15 23 42/var(--tw-bg-opacity))}.hover\\:text-white:hover{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity))}.hover\\:text-slate-50:hover{--tw-text-opacity:1;color:rgb(248 250 252/var(--tw-text-opacity))}@media (min-width:640px){.sm\\:px-4{padding-left:16px;padding-right:16px}.sm\\:px-3{padding-left:12px;padding-right:12px}.sm\\:py-1\\.5{padding-bottom:6px;padding-top:6px}.sm\\:py-1{padding-bottom:4px;padding-top:4px}}";

let StreamlineUiDrawer = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.canSave = true;
    this.close = () => {
      state.drawer = Object.assign(Object.assign({}, state.drawer), { active: false });
      const save = () => {
        state.drawer = {
          active: false,
          items: [],
          onSave: null,
          title: '',
          values: {},
        };
        this.canSave = true;
      };
      if (state.test) {
        save();
      }
      else {
        setTimeout(save, 500);
      }
    };
    this.save = () => {
      state.drawer.onSave();
      this.close();
    };
    this.onInput = () => {
      const save = () => {
        this.canSave =
          this.el.shadowRoot.querySelectorAll('streamline-ui-input[invalid]')
            .length === 0;
      };
      if (state.test) {
        save();
      }
      else {
        setTimeout(save, 50);
      }
      state.drawer = Object.assign(Object.assign({}, state.drawer), { values: Object.fromEntries([...this.el.shadowRoot.querySelectorAll(`streamline-ui-input`)].map((itemNested) => [[itemNested.getAttribute('uid')], itemNested.value])) });
    };
  }
  render() {
    return (h(Host, { class: {
        'absolute top-0 w-full h-full': true,
        'pointer-events-auto opacity-100': state.drawer.active,
        'pointer-events-none opacity-0': !state.drawer.active,
      } }, h("div", { onClick: this.close, class: {
        'cursor-pointer absolute left-0 top-0 h-full w-full z-[99] bg-black/80 backdrop-blur-sm duration-200 ease-in-out transition': true,
        'pointer-events-auto opacity-100': state.drawer.active,
        'pointer-events-none opacity-0': !state.drawer.active,
      } }, h("span", { class: "block w-full h-1/5 bottom-[80%] flex items-center justify-center text-center text-white text-base font-medium" }, "Cancel and close")), h("div", { class: {
        'grid h-full absolute flex flex-col left-0 bottom-0 h-4/5 w-full bg-white z-[100] bg-white transition duration-200 ease-in-out': true,
        'translate-y-full': !state.drawer.active,
        'translate-y-none': state.drawer.active,
        'grid-rows-[auto,1fr,auto]': !!state.drawer.title,
        'grid-rows-[1fr,auto]': !state.drawer.title,
      } }, state.drawer.title && (h("h1", { class: "px-4 py-8 text-center text-lg text-gray-900 font-medium" }, state.drawer.title)), h("div", { class: "p-4 overflow-y-auto space-y-8" }, state.drawer.items.map((item) => {
      return (h("streamline-ui-input", { uid: item.id, label: item.label, value: item.value, handleInput: this.onInput }));
    })), h("div", { class: {
        'p-4 flex items-center justify-between w-full': true,
      } }, h(Button, { onClick: this.save, type: "primary", text: "Save", class: "w-full !py-4 !text-base", disabled: !this.canSave }))), h("div", null)));
  }
  get el() { return getElement(this); }
};
StreamlineUiDrawer.style = streamlineUiDrawerCss;

export { StreamlineUiDrawer as streamline_ui_drawer };
