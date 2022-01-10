import { r as registerInstance, h } from './index-87bae8c2.js';
import { s as state$1 } from './internal-82f6dfdb.js';
import { b9 as IconWordPress, ba as IconSites, h as IconNetwork, g as IconMenu, i as IconPost, bb as IconFlow, bc as IconCustom, bd as IconSettings, I as IconDots, f as IconHeart, s as state, c as capitalizeFirstLetter } from './index-a607d389.js';
import { L as Loader } from './Loader-d0bea910.js';
import { g as getMenus } from './getMenus-66ef0885.js';

const streamlineSidebarCss = "/*! tailwindcss v3.0.12 | MIT License | https://tailwindcss.com*/*,:after,:before{--tw-backdrop-sepia: ;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;border:0 solid #e5e7eb;box-sizing:border-box}:after,:before{--tw-content:\"\"}h1,h2,h3{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}strong{font-weight:bolder}table{border-collapse:collapse;border-color:inherit;text-indent:0}button,input,select{color:inherit;font-family:inherit;font-size:100%;line-height:inherit;margin:0;padding:0}button,select{text-transform:none}[type=button],button{-webkit-appearance:button;background-color:transparent;background-image:none}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}h1,h2,h3,menu,p,ul{margin:0}menu,ul{list-style:none;padding:0}input::-moz-placeholder{color:#9ca3af;opacity:1}input:-ms-input-placeholder{color:#9ca3af;opacity:1}input::placeholder{color:#9ca3af;opacity:1}[role=button],button{cursor:pointer}img,svg{display:block;vertical-align:middle}img{height:auto;max-width:100%}[hidden]{display:none}.pointer-events-none{pointer-events:none}.visible{visibility:visible}.absolute{position:absolute}.bottom-0{bottom:0}.mr-auto{margin-right:auto}.mt-1{margin-top:4px}.inline-block{display:inline-block}.flex{display:flex}.grid{display:grid}.hidden{display:none}.h-8{height:32px}.h-full{height:100%}.h-6{height:24px}.h-10{height:40px}.w-8{width:32px}.w-full{width:100%}.w-6{width:24px}.w-10{width:40px}.animate-spin{-webkit-animation:spin 1s linear infinite;animation:spin 1s linear infinite}.grid-flow-col{grid-auto-flow:column}.flex-col{flex-direction:column}.items-center{align-items:center}.justify-center{justify-content:center}.overflow-x-auto{overflow-x:auto}.overflow-y-hidden{overflow-y:hidden}.bg-transparent{background-color:transparent}.bg-slate-800{background-color:rgb(30 41 59/var(--tw-bg-opacity))}.bg-slate-800,.bg-slate-900{--tw-bg-opacity:1}.bg-slate-900{background-color:rgb(15 23 42/var(--tw-bg-opacity))}.bg-slate-200{--tw-bg-opacity:1;background-color:rgb(226 232 240/var(--tw-bg-opacity))}.fill-current{fill:currentColor}.p-0{padding:0}.px-2{padding-left:8px;padding-right:8px}.py-1{padding-bottom:4px;padding-top:4px}.text-left{text-align:left}.text-xs{font-size:12px}.font-semibold{font-weight:600}.text-white{color:rgb(255 255 255/var(--tw-text-opacity))}.text-slate-200,.text-white{--tw-text-opacity:1}.text-slate-200{color:rgb(226 232 240/var(--tw-text-opacity))}.text-slate-500{--tw-text-opacity:1;color:rgb(100 116 139/var(--tw-text-opacity))}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1);--tw-shadow-colored:0 1px 3px 0 var(--tw-shadow-color),0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.blur{--tw-blur:blur(8px);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}:host{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;box-sizing:border-box}:host *{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.inner::-webkit-scrollbar{height:8px;width:8px}.inner::-webkit-scrollbar-track{background:#fff}.inner::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:0}.mt-1\\.5{margin-top:6px}.\\!grid{display:grid!important}.h-\\[var\\(--sl-side-w\\)\\]{height:var(--sl-side-w)}.w-\\[calc\\(var\\(--sl-side-w\\)\\)\\]{width:calc(var(--sl-side-w))}.w-\\[calc\\(100\\%-var\\(--sl-side-w\\)\\)\\]{width:calc(100% - var(--sl-side-w))}.min-w-\\[var\\(--sl-side-w\\)\\]{min-width:var(--sl-side-w)}.\\!content-center{align-content:center!important}.\\!justify-items-center{justify-items:center!important}.bg-\\[\\#020204\\]{--tw-bg-opacity:1;background-color:rgb(2 2 4/var(--tw-bg-opacity))}.hover\\:bg-\\[\\#080d17\\]:hover{--tw-bg-opacity:1;background-color:rgb(8 13 23/var(--tw-bg-opacity))}.hover\\:text-blue-400:hover{--tw-text-opacity:1;color:rgb(96 165 250/var(--tw-text-opacity))}@media (min-width:640px){.sm\\:top-0{top:0}.sm\\:mr-0{margin-right:0}.sm\\:mt-auto{margin-top:auto}.sm\\:inline-block{display:inline-block}.sm\\:flex{display:flex}.sm\\:h-10{height:40px}.sm\\:h-\\[64px\\]{height:64px}.sm\\:h-\\[var\\(--sl-side-w\\)\\]{height:var(--sl-side-w)}.sm\\:h-full{height:100%}.sm\\:h-\\[calc\\(100\\%-64px\\)\\]{height:calc(100% - 64px)}.sm\\:min-h-\\[64px\\]{min-height:64px}.sm\\:min-h-\\[var\\(--sl-side-w\\)\\]{min-height:var(--sl-side-w)}.sm\\:w-10{width:40px}.sm\\:w-\\[var\\(--sl-side-w\\)\\]{width:var(--sl-side-w)}.sm\\:w-full{width:100%}.sm\\:\\!grid-rows-\\[20px\\2c 20px\\]{grid-template-rows:20px 20px!important}.sm\\:flex-col{flex-direction:column}.sm\\:overflow-y-auto{overflow-y:auto}.sm\\:overflow-x-hidden{overflow-x:hidden}}@media (min-width:1024px){.lg\\:mt-0{margin-top:0}.lg\\:h-\\[48px\\]{height:48px}.lg\\:min-h-\\[48px\\]{min-height:48px}.lg\\:grid-cols-\\[32px\\2c 1fr\\]{grid-template-columns:32px 1fr}.lg\\:\\!grid-rows-1{grid-template-rows:repeat(1,minmax(0,1fr))!important}.lg\\:\\!justify-items-start{justify-items:start!important}.lg\\:px-5{padding-left:20px;padding-right:20px}.lg\\:text-sm{font-size:14px}}.h-\\[max-content\\]{height:-webkit-max-content;height:-moz-max-content;height:max-content}.px-2\\.5{padding-left:10px;padding-right:10px}.py-1\\.5{padding-bottom:6px;padding-top:6px}@media (min-width:640px){.sm\\:h-7{height:28px}.sm\\:w-7{width:28px}}@keyframes spin{to{transform:rotate(1turn)}}";

let StreamlineSidebar = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    // @ts-ignore
    this.tw = 'w-8 h-8 sm:w-10 sm:h-10';
    this.button = (type) => {
      const icon = type === 'wordpress' ? (h(IconWordPress, null)) : type === 'site' ? (h(IconSites, null)) : type === 'network' ? (h(IconNetwork, null)) : type === 'menu' ? (h(IconMenu, null)) : type === 'post' ? (h(IconPost, null)) : type === 'flow' ? (h(IconFlow, null)) : type === 'custom' ? (h(IconCustom, null)) : type === 'settings' ? (h(IconSettings, null)) : type === 'dots' ? (h(IconDots, null)) : (type === 'fav' && h(IconHeart, null));
      const handleClick = () => {
        if (type !== 'wordpress') {
          state.active = type;
          getMenus();
        }
        else {
          state$1.visible = false;
        }
      };
      return (h("button", { onClick: handleClick, onMouseDown: (e) => e.preventDefault(), tabIndex: state.active === type ? -1 : 0, class: {
          'text-left h-[var(--sl-side-w)] min-w-[var(--sl-side-w)] flex flex-col items-center justify-center p-0 text-white bg-transparent': true,
          'focus-darker mr-auto bg-[#020204] text-white fill-current h-[var(--sl-side-w)] w-[calc(var(--sl-side-w))] hover:bg-[#080d17] sm:mr-0 sm:h-[64px] sm:min-h-[64px]': type === 'wordpress',
          '!justify-items-center !content-center text-slate-200 hover:text-blue-400 lg:!justify-items-start !grid focus-dark w-full w-full sm:w-[var(--sl-side-w)] sm:h-[var(--sl-side-w)] sm:min-h-[var(--sl-side-w)] lg:h-[48px] lg:min-h-[48px]': type !== 'wordpress',
          'sm:!grid-rows-[20px,20px] lg:!grid-rows-1 lg:grid-cols-[32px,1fr] lg:px-5': type !== 'settings' && type !== 'wordpress',
          'sm:mt-auto': type === 'settings',
          'bg-slate-800 pointer-events-none': type === state.active,
        } }, type === 'wordpress' ? (state$1.isProcessing ? (h(Loader, { sm: true })) : (icon)) : (icon), type === 'settings' || type === 'wordpress' ? ('') : (h("span", { class: "hidden sm:inline-block text-xs font-semibold leading-1 mt-1.5 lg:mt-0 lg:text-sm" }, capitalizeFirstLetter(state$1.menu[type].text)))));
    };
  }
  render() {
    return (h("nav", { class: `bg-slate-900 h-full w-full flex absolute bottom-0 h-[var(--sl-side-w)] sm:top-0 sm:h-full sm:flex-col sm:w-[var(--sl-side-w)]` }, this.button('wordpress'), h("div", { class: `inner grid grid-flow-col h-full overflow-x-auto overflow-y-hidden w-[calc(100%-var(--sl-side-w))] sm:w-full sm:overflow-x-hidden sm:flex sm:flex-col sm:overflow-y-auto sm:h-[calc(100%-64px)]` }, Object.values(state$1.menu).map((item) => {
      return item['condition'] && this.button(item.name);
    }))));
  }
};
StreamlineSidebar.style = streamlineSidebarCss;

export { StreamlineSidebar as streamline_sidebar };
