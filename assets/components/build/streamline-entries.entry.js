import { r as registerInstance, h, g as getElement } from './index-87bae8c2.js';
import { s as state } from './internal-82f6dfdb.js';
import { c as capitalizeFirstLetter, d as IconCheck, e as someDeep, s as state$1, f as IconHeart, a as setEntries, g as IconMenu, h as IconNetwork, i as IconPost, b as setSearchPlaceholder } from './index-a607d389.js';
import { L as Loader } from './Loader-d0bea910.js';
import { s as setFavourite, f as fetchAjax } from './setFavourite-416af75c.js';
import { a as getMenu, g as getMenus } from './getMenus-66ef0885.js';
import { D as Dropdown, g as getMetaKey } from './Dropdown-7fef3bda.js';
import { d as doQuery, B as Button } from './Button-7b50c690.js';

const streamlineEntriesCss = "/*! tailwindcss v3.0.12 | MIT License | https://tailwindcss.com*/*,:after,:before{--tw-backdrop-sepia: ;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;border:0 solid #e5e7eb;box-sizing:border-box}:after,:before{--tw-content:\"\"}h1,h2,h3{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}strong{font-weight:bolder}table{border-collapse:collapse;border-color:inherit;text-indent:0}button,input,select{color:inherit;font-family:inherit;font-size:100%;line-height:inherit;margin:0;padding:0}button,select{text-transform:none}[type=button],button{-webkit-appearance:button;background-color:transparent;background-image:none}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}h1,h2,h3,menu,p,ul{margin:0}menu,ul{list-style:none;padding:0}input::-moz-placeholder{color:#9ca3af;opacity:1}input:-ms-input-placeholder{color:#9ca3af;opacity:1}input::placeholder{color:#9ca3af;opacity:1}[role=button],button{cursor:pointer}img,svg{display:block;vertical-align:middle}img{height:auto;max-width:100%}[hidden]{display:none}.sr-only{clip:rect(0,0,0,0);border-width:0;height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}.pointer-events-none{pointer-events:none}.visible{visibility:visible}.absolute{position:absolute}.relative{position:relative}.sticky{position:-webkit-sticky;position:sticky}.top-0{top:0}.right-3{right:12px}.left-1{left:4px}.top-1{top:4px}.-top-2{top:-8px}.-left-full{left:-100%}.left-0{left:0}.bottom-0{bottom:0}.right-0{right:0}.z-10{z-index:10}.mx-3{margin-left:12px;margin-right:12px}.mr-2{margin-right:8px}.mt-6{margin-top:24px}.mt-3{margin-top:12px}.mb-3{margin-bottom:12px}.mt-4{margin-top:16px}.mb-6{margin-bottom:24px}.mr-4{margin-right:16px}.mt-0{margin-top:0}.mb-1{margin-bottom:4px}.mr-3{margin-right:12px}.mr-6{margin-right:24px}.mt-1{margin-top:4px}.mt-auto{margin-top:auto}.ml-1{margin-left:4px}.block{display:block}.inline-block{display:inline-block}.flex{display:flex}.inline-flex{display:inline-flex}.table{display:table}.grid{display:grid}.hidden{display:none}.h-5{height:20px}.h-3{height:12px}.h-full{height:100%}.h-6{height:24px}.h-10{height:40px}.w-full{width:100%}.w-12{width:48px}.w-14{width:56px}.w-3{width:12px}.w-6{width:24px}.w-10{width:40px}.w-2{width:8px}.flex-shrink-0{flex-shrink:0}.rotate-90{--tw-rotate:90deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.animate-spin{-webkit-animation:spin 1s linear infinite;animation:spin 1s linear infinite}.cursor-pointer{cursor:pointer}.select-none{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.flex-row{flex-direction:row}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-start{align-items:flex-start}.items-center{align-items:center}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-2{gap:8px}.gap-6{gap:24px}.space-y-2>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-bottom:calc(8px*var(--tw-space-y-reverse));margin-top:calc(8px*(1 - var(--tw-space-y-reverse)))}.space-y-4>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-bottom:calc(16px*var(--tw-space-y-reverse));margin-top:calc(16px*(1 - var(--tw-space-y-reverse)))}.space-y-5>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-bottom:calc(20px*var(--tw-space-y-reverse));margin-top:calc(20px*(1 - var(--tw-space-y-reverse)))}.space-x-2>:not([hidden])~:not([hidden]){--tw-space-x-reverse:0;margin-left:calc(8px*(1 - var(--tw-space-x-reverse)));margin-right:calc(8px*var(--tw-space-x-reverse))}.space-x-4>:not([hidden])~:not([hidden]){--tw-space-x-reverse:0;margin-left:calc(16px*(1 - var(--tw-space-x-reverse)));margin-right:calc(16px*var(--tw-space-x-reverse))}.divide-x>:not([hidden])~:not([hidden]){--tw-divide-x-reverse:0;border-left-width:calc(1px*(1 - var(--tw-divide-x-reverse)));border-right-width:calc(1px*var(--tw-divide-x-reverse))}.overflow-x-auto{overflow-x:auto}.overflow-y-scroll{overflow-y:scroll}.whitespace-nowrap{white-space:nowrap}.border{border-width:1px}.border-t{border-top-width:1px}.border-b{border-bottom-width:1px}.border-dotted{border-style:dotted}.border-slate-100{border-color:rgb(241 245 249/var(--tw-border-opacity))}.border-slate-100,.border-slate-200{--tw-border-opacity:1}.border-slate-200{border-color:rgb(226 232 240/var(--tw-border-opacity))}.border-slate-300{border-color:rgb(203 213 225/var(--tw-border-opacity))}.border-blue-500,.border-slate-300{--tw-border-opacity:1}.border-blue-500{border-color:rgb(59 130 246/var(--tw-border-opacity))}.bg-white{background-color:rgb(255 255 255/var(--tw-bg-opacity))}.bg-slate-50,.bg-white{--tw-bg-opacity:1}.bg-slate-50{background-color:rgb(248 250 252/var(--tw-bg-opacity))}.bg-slate-300{background-color:rgb(203 213 225/var(--tw-bg-opacity))}.bg-slate-200,.bg-slate-300{--tw-bg-opacity:1}.bg-slate-200{background-color:rgb(226 232 240/var(--tw-bg-opacity))}.bg-blue-500{--tw-bg-opacity:1;background-color:rgb(59 130 246/var(--tw-bg-opacity))}.fill-current{fill:currentColor}.px-3{padding-left:12px;padding-right:12px}.py-3{padding-bottom:12px;padding-top:12px}.py-1{padding-bottom:4px;padding-top:4px}.px-2{padding-left:8px;padding-right:8px}.py-0{padding-bottom:0;padding-top:0}.px-4{padding-left:16px;padding-right:16px}.py-2{padding-top:8px}.pb-2,.py-2{padding-bottom:8px}.pt-3{padding-top:12px}.pt-5{padding-top:20px}.pb-1{padding-bottom:4px}.pl-4{padding-left:16px}.pb-6{padding-bottom:24px}.text-sm{font-size:14px}.text-xs{font-size:12px}.text-base{font-size:16px}.text-lg{font-size:18px}.font-medium{font-weight:500}.font-semibold{font-weight:600}.uppercase{text-transform:uppercase}.italic{font-style:italic}.leading-relaxed{line-height:1.625}.text-slate-900{color:rgb(15 23 42/var(--tw-text-opacity))}.text-green-500,.text-slate-900{--tw-text-opacity:1}.text-green-500{color:rgb(34 197 94/var(--tw-text-opacity))}.text-slate-600{color:rgb(71 85 105/var(--tw-text-opacity))}.text-red-500,.text-slate-600{--tw-text-opacity:1}.text-red-500{color:rgb(239 68 68/var(--tw-text-opacity))}.text-slate-800{color:rgb(30 41 59/var(--tw-text-opacity))}.text-slate-500,.text-slate-800{--tw-text-opacity:1}.text-slate-500{color:rgb(100 116 139/var(--tw-text-opacity))}.text-slate-400{color:rgb(148 163 184/var(--tw-text-opacity))}.text-slate-400,.text-slate-700{--tw-text-opacity:1}.text-slate-700{color:rgb(51 65 85/var(--tw-text-opacity))}.text-white{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity))}.opacity-50{opacity:.5}.opacity-0{opacity:0}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1);--tw-shadow-colored:0 1px 3px 0 var(--tw-shadow-color),0 1px 2px -1px var(--tw-shadow-color)}.shadow,.shadow-sm{box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.shadow-sm{--tw-shadow:0 1px 2px 0 rgba(0,0,0,.05);--tw-shadow-colored:0 1px 2px 0 var(--tw-shadow-color)}.blur{--tw-blur:blur(8px)}.blur,.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.backdrop-blur-sm{--tw-backdrop-blur:blur(4px);-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}.transition{transition-duration:.15s;transition-property:color,background-color,border-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-text-decoration-color,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-text-decoration-color,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1)}.duration-200{transition-duration:.2s}.ease-in-out{transition-timing-function:cubic-bezier(.4,0,.2,1)}:host{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;box-sizing:border-box}:host .focus:focus{box-shadow:inset 0 0 0 4px #f1f5f9,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-border:focus{border-color:var(--sl-focus-color);box-shadow:0 0 0 1px var(--sl-focus-color);outline:none!important}:host .focus-out:focus{box-shadow:0 0 0 2px #f8fafc,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-dark:focus{box-shadow:inset 0 0 0 4px #0f172a,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-darker:focus{box-shadow:inset 0 0 0 4px #020204,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-white:focus{box-shadow:inset 0 0 0 4px #fff,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-white-out:focus{box-shadow:0 0 0 2px #fff,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-in-white-out:focus-within{box-shadow:0 0 0 2px #fff,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-none:focus{box-shadow:none!important;outline:none!important}:host .border-invalid{border-color:var(--sl-focus-color-invalid);box-shadow:0 0 0 1px var(--sl-focus-color-invalid);outline:none!important}:host *{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.inner::-webkit-scrollbar{height:8px;width:8px}.inner::-webkit-scrollbar-track{background:#fff}.inner::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:0}input:checked~.dot{background-color:#fff;transform:translateX(36px)}select{-moz-appearance:none;appearance:none;-webkit-appearance:none;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E\");background-position:right .25rem center;background-repeat:no-repeat;background-size:1.25em 1.25em;border:1px solid #e2e8f0;color:#0f172a;font-family:inter,sans-serif;font-size:.875rem;font-weight:600;height:34px;padding:0 .75rem!important;width:100%}.top-\\[68px\\]{top:68px}.z-\\[-1\\]{z-index:-1}.mt-0\\.5{margin-top:2px}.mt-\\[-6px\\]{margin-top:-6px}.\\!mb-0{margin-bottom:0!important}.mt-1\\.5{margin-top:6px}.h-\\[max-content\\]{height:-webkit-max-content;height:-moz-max-content;height:max-content}.h-\\[calc\\(100\\%-24px\\)\\]{height:calc(100% - 24px)}.h-\\[calc\\(100\\%-var\\(--sl-side-w\\)\\)\\]{height:calc(100% - var(--sl-side-w))}.min-h-\\[60px\\]{min-height:60px}.w-\\[max-content\\]{width:-webkit-max-content;width:-moz-max-content;width:max-content}.grid-cols-\\[1fr_1fr_1fr\\]{grid-template-columns:1fr 1fr 1fr}.grid-cols-\\[75px\\2c 1fr\\]{grid-template-columns:75px 1fr}.bg-white\\/50{background-color:hsla(0,0%,100%,.5)}.py-1\\.5{padding-bottom:6px;padding-top:6px}.py-0\\.5{padding-bottom:2px;padding-top:2px}.pt-3\\.5{padding-top:14px}.pb-1\\.5{padding-bottom:6px}.text-\\[11px\\]{font-size:11px}.\\!text-lg{font-size:18px!important}.first-of-type\\:border-none:first-of-type{border-style:none}.focus-within\\:bg-slate-50:focus-within{--tw-bg-opacity:1;background-color:rgb(248 250 252/var(--tw-bg-opacity))}.hover\\:bg-slate-50:hover{--tw-bg-opacity:1;background-color:rgb(248 250 252/var(--tw-bg-opacity))}.hover\\:text-blue-500:hover{--tw-text-opacity:1;color:rgb(59 130 246/var(--tw-text-opacity))}.group:hover .group-hover\\:bg-slate-400{--tw-bg-opacity:1;background-color:rgb(148 163 184/var(--tw-bg-opacity))}.peer:checked~.peer-checked\\:bg-blue-500{--tw-bg-opacity:1;background-color:rgb(59 130 246/var(--tw-bg-opacity))}.peer:hover~.peer-hover\\:opacity-100{opacity:1}@media (min-width:640px){.sm\\:right-6{right:24px}.sm\\:top-\\[67px\\]{top:67px}.sm\\:-top-2{top:-8px}.sm\\:mx-6{margin-left:24px;margin-right:24px}.sm\\:my-1\\.5{margin-bottom:6px;margin-top:6px}.sm\\:my-1{margin-bottom:4px;margin-top:4px}.sm\\:mt-6{margin-top:24px}.sm\\:mb-4{margin-bottom:16px}.sm\\:min-h-\\[75px\\]{min-height:75px}.sm\\:flex-row{flex-direction:row}.sm\\:items-center{align-items:center}.sm\\:justify-between{justify-content:space-between}.sm\\:px-6{padding-left:24px;padding-right:24px}.sm\\:pt-5{padding-top:20px}.sm\\:pb-2\\.5{padding-bottom:10px}.sm\\:pb-2{padding-bottom:8px}.sm\\:pt-6{padding-top:24px}.sm\\:text-base{font-size:16px}.sm\\:text-lg{font-size:18px}.sm\\:text-xl{font-size:20px}.sm\\:text-sm{font-size:14px}}@media (min-width:768px){.md\\:flex{display:flex}.md\\:w-3\\/4{width:75%}}@media (min-width:1024px){.lg\\:right-8{right:32px}.lg\\:mx-8{margin-left:32px;margin-right:32px}.lg\\:h-\\[calc\\(100\\%\\+56px\\)\\]{height:calc(100% + 56px)}.lg\\:h-\\[calc\\(100\\%\\+80px\\)\\]{height:calc(100% + 80px)}.lg\\:px-8{padding-left:32px;padding-right:32px}.lg\\:pb-10{padding-bottom:40px}}.px-2\\.5{padding-left:10px;padding-right:10px}.translate-y-\\[calc\\(100\\%-1px\\)\\]{--tw-translate-y:calc(100% - 1px)}.transform,.translate-y-\\[calc\\(100\\%-1px\\)\\]{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.focus-within\\:pointer-events-auto:focus-within{pointer-events:auto}.focus-within\\:text-blue-500:focus-within{--tw-text-opacity:1;color:rgb(59 130 246/var(--tw-text-opacity))}.focus-within\\:opacity-100:focus-within{opacity:1}.hover\\:z-50:hover{z-index:50}.hover\\:opacity-100:hover{opacity:1}.focus\\:text-blue-500:focus{--tw-text-opacity:1;color:rgb(59 130 246/var(--tw-text-opacity))}.focus\\:opacity-100:focus{opacity:1}.group:hover .group-hover\\:pointer-events-auto{pointer-events:auto}.group:hover .group-hover\\:opacity-100{opacity:1}@media (min-width:640px){.sm\\:h-7{height:28px}.sm\\:w-7{width:28px}}.\\!h-6{height:24px!important}.\\!w-6{width:24px!important}.\\!p-0{padding:0!important}.hover\\:border-blue-600:hover{--tw-border-opacity:1;border-color:rgb(37 99 235/var(--tw-border-opacity))}.hover\\:border-slate-900:hover{--tw-border-opacity:1;border-color:rgb(15 23 42/var(--tw-border-opacity))}.hover\\:bg-blue-600:hover{--tw-bg-opacity:1;background-color:rgb(37 99 235/var(--tw-bg-opacity))}.hover\\:bg-slate-900:hover{--tw-bg-opacity:1;background-color:rgb(15 23 42/var(--tw-bg-opacity))}.hover\\:text-slate-50:hover{--tw-text-opacity:1;color:rgb(248 250 252/var(--tw-text-opacity))}@media (min-width:640px){.sm\\:px-4{padding-left:16px;padding-right:16px}.sm\\:px-3{padding-left:12px;padding-right:12px}.sm\\:py-1\\.5{padding-bottom:6px;padding-top:6px}.sm\\:py-1{padding-bottom:4px;padding-top:4px}}.pb-2{padding-bottom:8px}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}@keyframes spin{to{transform:rotate(1turn)}}";

let StreamlineEntries = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.border = 'border-t border-slate-100 first-of-type:border-none';
    this.borderB = 'border-b border-slate-200 border-dotted';
    this.h2 = 'text-sm text-slate-900 font-medium sm:text-base';
    this.px = 'px-3 sm:px-6 lg:px-8';
    this.mx = 'mx-3 sm:mx-6 lg:mx-8';
    this.cycleEntries = (mode) => {
      var _a;
      const focusEls = this.el.shadowRoot.querySelectorAll('[data-focus]');
      const focusElsLength = focusEls.length;
      if (mode === 'down') {
        state.focusIndex++;
        if (state.focusIndex === focusElsLength) {
          state.focusIndex = 0;
        }
      }
      else {
        if (state.focusIndex === 0 || state.focusIndex === -1) {
          state.focusIndex = focusElsLength - 1;
        }
        else {
          state.focusIndex--;
        }
      }
      (_a = focusEls[state.focusIndex]) === null || _a === void 0 ? void 0 : _a.focus();
    };
    this.getArr = (arr = [], type) => {
      var _a;
      return ((arr.length >= 1 && arr) ||
        (((_a = state[`entries${capitalizeFirstLetter(type)}Active`]) === null || _a === void 0 ? void 0 : _a.length) >= 1 &&
          (state[`entries${capitalizeFirstLetter(type)}Active`] ||
            state[`entries${capitalizeFirstLetter(type)}`])));
    };
    this.row = (item) => {
      let isFav = false;
      const isDropdown = item.type !== 'history' && !item.blog_id;
      const isHistory = item.type === 'history';
      const isSites = item.blog_id;
      const isCurrentSite = parseInt(item.siteId) === parseInt(state.currentSite.id);
      const isTable = isSites || item.type === 'post';
      const table = isSites
        ? [
          h("span", { class: "flex items-center" }, isCurrentSite && (h("span", { class: `text-green-500 mr-2` }, h(IconCheck, null))), item.domain),
          item.path,
          item.blog_id,
        ]
        : [];
      const checkIfFavourite = () => {
        isFav =
          item.type === 'history'
            ? false
            : someDeep(state.entriesFav, (o) => {
              return (o === null || o === void 0 ? void 0 : o.path) === item.path && (o === null || o === void 0 ? void 0 : o.siteId) === item.siteId;
            }, { childrenPath: ['children'] });
      };
      checkIfFavourite();
      const setFav = () => setFavourite({
        favourite: isFav,
        callback: checkIfFavourite,
        type: state$1.active,
        filter: (o) => {
          return o.href === item.href && o.adminUrl === item.adminUrl;
        },
        path: (o) => {
          return o.type === item.type && o.siteId === item.siteId;
        },
        pathFav: (o) => {
          return o.path === item.path && o.siteId === item.siteId;
        },
      });
      const onClickHistory = () => {
        doQuery({
          callback: `${state$1.active}s`,
          type: state$1.active,
          search: item.name,
        });
      };
      const onClickSites = () => {
        state.currentSite = {
          path: item.path,
          id: item.siteId,
        };
        state.entriesPost = [];
        state.entriesPostActive = [];
        getMenu({
          adminUrl: item.adminUrl,
          fetch: true,
          siteId: item.siteId,
          path: item.path,
        });
      };
      const onClick = () => isHistory ? onClickHistory() : isSites ? onClickSites() : false;
      return (h("li", { class: `relative focus-within:bg-slate-50` }, h("a", { tabindex: 0, "data-focus": true, href: item.href && item.href, class: {
          [this.px]: true,
          'cursor-pointer focus-white flex items-center flex-wrap cursor-pointer w-full inline-block py-3 text-sm font-medium text-slate-600 peer hover:text-blue-500 hover:bg-slate-50': true,
          'pointer-events-none': isCurrentSite && isSites,
        }, onClick: onClick, onMouseDown: (e) => e.preventDefault() }, isFav && state$1.active !== 'fav' && (h("span", { class: `text-red-500 mr-2 inline-block` }, h(IconHeart, null))), isTable ? (h("span", { class: "grid grid-cols-[1fr_1fr_1fr] gap-2 w-full" }, table.map((item) => {
        return h("span", null, item);
      }))) : (item.name)), isDropdown && (h(Dropdown, { classOuter: `w-12 absolute top-0 right-3 sm:right-6 lg:right-8 peer-hover:opacity-100`, items: [
          { text: isFav ? 'Unfavourite' : 'Favourite', onClick: setFav },
        ] }))));
    };
    this.rows = (arr = []) => {
      var _a;
      const isHistory = (state$1.active === 'post' || state$1.active === 'site') &&
        !state[`entries${capitalizeFirstLetter(state$1.active)}IsQuery`] &&
        ((_a = state[`historySearches${capitalizeFirstLetter(state$1.active)}`]) === null || _a === void 0 ? void 0 : _a.length) > 0;
      const array = isHistory
        ? [
          {
            children: state[`historySearches${capitalizeFirstLetter(state$1.active)}`].map((item) => ({
              name: item,
              type: 'history',
            })),
          },
        ]
        : this.getArr(arr, state$1.active);
      const table = state$1.active === 'site' ? ['Domain', 'Path', 'ID'] : [];
      return Object.values(array).map((item) => {
        return (h("div", null, this.getHeader(item, true), item.type === 'post' ||
          (item.type === 'site' && (h("div", { class: `${this.px} ${this.borderB} grid grid-cols-[1fr_1fr_1fr] sticky top-[68px] gap-2 z-10 bg-white sm:top-[67px]` }, table.map((item) => {
            return (h("span", { key: item, class: "py-1.5 text-xs uppercase font-semibold font-slate-500" }, item));
          })))), h("ul", { "data-focus-parent": true }, Object.values(item.children).map((itemInner, indexInner) => {
          return itemInner.children ? (h("li", { key: indexInner }, h("h2", { class: `${this.mx} ${this.borderB} text-base pb-2 pt-3.5 text-slate-900 font-medium sm:text-lg sm:pt-5 sm:pb-2.5` }, itemInner.name), h("ul", null, Object.values(itemInner.children).map((itemSub) => {
            return this.row(itemSub);
          })))) : (this.row(itemInner));
        }))));
      });
    };
    this.help = () => {
      return (h("div", null, this.getHeader({
        title: `${state.menu[state$1.active].text} mode help`,
      }), h("div", { class: `${this.px} mt-6 text-base space-y-2 leading-relaxed md:w-3/4`, innerHTML: state.menu[state$1.active].help })));
    };
    // @ts-ignore
    this.post = (arr = []) => {
      return Object.values(this.getArr(arr, 'post')).map((item) => {
        return (h("div", null, this.getHeader(item), h("ul", { class: `mt-3 sm:mt-6` }, Object.values(item.children).map((itemInner) => {
          return (h("li", { class: `${this.border} flex flex-col mb-3` }, h("streamline-post", { "data-focus": true, "href-edit": itemInner.hrefEdit, "href-view": itemInner.guid, "post-id": itemInner.ID, "post-title": itemInner.post_title, "post-type": itemInner.post_type, "post-slug": itemInner.post_name, "site-id": itemInner.siteId })));
        }))));
      });
    };
    this.settingsOnChange = (id, type, value) => {
      state.entriesSettingsSave = Object.assign(Object.assign({}, state.entriesSettingsSave), {
        [id]: Object.assign(Object.assign({}, state.entriesSettingsSave[id]), {
          [type]: value,
        }),
      });
    };
    // @ts-ignore
    this.settings = () => {
      const Key = (props) => (h("div", { style: { boxShadow: '0 3px 0 0 #E2E8F0' }, class: `h-[max-content] px-2 leading-0 py-0.5 text-[11px] uppercase font-medium text-slate-800 border bg-slate-50 border-slate-200` }, props.key));
      return Object.values(state.entriesSettingsActive).map((item) => {
        return (h("div", null, this.getHeader(item), h("ul", { class: `${this.px} space-y-4` }, Object.values(item.children).map((itemInner, indexInner) => {
          return (h("li", { key: indexInner, class: `${indexInner === 0 ? this.border : ''} flex flex-col` }, h("h2", { class: `${this.h2} ${this.borderB} !text-lg mt-4 space-y-2 mb-6 inline-block leading-1 pb-2` }, itemInner.name), itemInner.children && (h("ul", { class: `flex flex-col space-y-5` }, Object.values(itemInner.children).map((itemSub, indexSub) => {
            return (h("li", { key: indexSub, class: `flex items-center mr-4` }, h("label", { htmlFor: `setting-${itemSub.id}`, class: `w-full grid grid-cols-[75px,1fr] gap-6 select-none group ${itemSub.choices ? '' : 'cursor-pointer'}` }, h("div", { class: `relative mt-0.5 inline-block h-[max-content] w-[max-content] focus-in-white-out` }, h("input", { "data-focus": true, type: "checkbox", id: `setting-${itemSub.id}`, class: "sr-only peer", checked: state.entriesSettingsLoad[itemSub.id]
                .default, onInput: (e) => this.settingsOnChange(itemSub.id, 'default', e.target.checked) }), h("div", { class: `block bg-slate-300 w-14 h-5 transition ease-in-out duration-200 group-hover:bg-slate-400 peer-checked:bg-blue-500` }), h("div", { class: `dot absolute left-1 top-1 bg-white w-3 h-3 transition ease-in-out duration-200` })), h("div", { class: `w-full` }, h("div", { class: `text-base text-slate-900 font-medium flex justify-between` }, itemSub.name, itemSub.keys && (h("div", { class: `hidden space-x-2 mt-[-6px] md:flex ${state.entriesSettingsLoad[itemSub.id].default
                ? ''
                : 'opacity-50'}` }, itemSub.metaKey && (h(Key, { key: state.isMac ? 'cmd' : 'ctrl' })), itemSub.keys.map((item) => {
              return h(Key, { key: item });
            })))), h("div", { class: `mt-0.5 text-xs text-slate-500` }, itemSub.label)))));
          })))));
        }))));
      });
    };
  }
  connectedCallback() {
    getMenus();
    setEntries();
    document.addEventListener('keydown', (e) => {
      if (state.visible) {
        if (e.key === 'ArrowDown' &&
          !getMetaKey(e) &&
          state.entriesSettingsLoad.keyNavigation.default) {
          e.preventDefault();
          this.cycleEntries('down');
        }
        if (e.key === 'ArrowUp' &&
          !getMetaKey(e) &&
          state.entriesSettingsLoad.keyNavigation.default) {
          e.preventDefault();
          this.cycleEntries('up');
        }
      }
    });
  }
  getHeader(item, test = false) {
    var _a, _b, _c, _d, _e;
    const isQuery = item.type === 'post' || item.type === 'site';
    const isQueryMode = state$1.active === 'site' || state$1.active === 'post';
    const isMenu = item.type === 'menu' || item.type === 'networkMenu';
    const isDotMenu = state.isHelp;
    const isNotDotMenu = !state.isHelp;
    let menuNumber = 0;
    if (isMenu) {
      Object.values(item.children).forEach((itemNested) => {
        Object.values(itemNested.children).forEach(() => {
          menuNumber++;
        });
      });
    }
    const results = `Showing ${isQuery ? Object.values(item.children).length : isMenu ? menuNumber : '0'} ${(isQuery && Object.values(item.children).length === 1) ||
      (isMenu && menuNumber === 1)
      ? `result`
      : `results`}`;
    const path = item.isMultisite && !state.test && state$1.active !== 'site'
      ? ` (subsite: ${item.path})`
      : '';
    return (h("div", { class: `${state$1.active === 'settings'
        ? 'flex-row items-center justify-between'
        : 'flex-col items-start sm:justify-between'} ${test ? '!mb-0' : ''} ${this.px} relative min-h-[60px] pt-5 flex flex-wrap mb-1 pb-1.5 flex sticky -top-2 bg-white z-10 border-b border-slate-300 sm:min-h-[75px] sm:mb-4 sm:flex-row sm:items-center sm:pt-6 sm:pb-2 sm:-top-2` }, h("div", { class: `absolute -left-full top-0 h-full bg-white z-[-1]` }), h("div", { class: `flex items-center flex-row` }, state$1.active === 'fav' &&
      state.entriesFavActive[0].children.length !== 0 &&
      !state.isHelp && (h("div", { class: `flex-shrink-0 text-slate-400 flex items-center justify-center mr-3` }, item.type === 'menu' && h(IconMenu, null), item.type === 'networkMenu' && h(IconNetwork, null), item.type === 'post' && h(IconPost, null))), isQueryMode &&
      state[`entries${capitalizeFirstLetter(state$1.active)}IsQuery`] &&
      ((_a = state[`historySearches${capitalizeFirstLetter(state$1.active)}`]) === null || _a === void 0 ? void 0 : _a.length) > 0 &&
      !state.isHelp && (h(Button, { back: true, onClick: () => {
        state[`entries${capitalizeFirstLetter(state$1.active)}IsQuery`] = false;
        state[`entries${capitalizeFirstLetter(state$1.active)}`] =
          [];
        state[`entries${capitalizeFirstLetter(state$1.active)}Active`] = [];
        setSearchPlaceholder();
      } })), h("h1", { class: `text-slate-900 font-medium text-lg mr-6 whitespace-nowrap sm:text-xl`, innerHTML: `${state.isSlash || isDotMenu
        ? item.title
        : item.type === 'networkMenu'
          ? 'Network admin'
          : isMenu
            ? 'Admin menu' + path
            : (state$1.active === 'post' ||
              state$1.active === 'site') &&
              ((_b = state[`entries${state$1.active === 'post' ? 'Post' : 'Site'}`][0]) === null || _b === void 0 ? void 0 : _b.queryValue)
              ? `${capitalizeFirstLetter(state$1.active)}s for: ` +
                `<span class="text-slate-400 italic">${(_c = state[`entries${state$1.active === 'post' ? 'Post' : 'Site'}`][0]) === null || _c === void 0 ? void 0 : _c.queryValue}</span>` +
                path
              : isQuery && state$1.active === 'fav'
                ? `${capitalizeFirstLetter(item.type)}s` + path
                : isQueryMode &&
                  !state[`entries${capitalizeFirstLetter(state$1.active)}IsQuery`] &&
                  ((_d = state[`historySearches${capitalizeFirstLetter(state$1.active)}`]) === null || _d === void 0 ? void 0 : _d.length) === 0
                  ? `No query, search for a ${state$1.active} in the search bar`
                  : isQueryMode &&
                    !state[`entries${capitalizeFirstLetter(state$1.active)}IsQuery`] &&
                    ((_e = state[`historySearches${capitalizeFirstLetter(state$1.active)}`]) === null || _e === void 0 ? void 0 : _e.length) > 0
                    ? `Search history`
                    : state$1.active === 'settings'
                      ? 'Settings'
                      : 'No results'}` })), h("div", { class: `flex flex-wrap space-x-4 divide-x` }, Object.values([
      {
        type: 'text',
        text: results,
        condition: state$1.active !== 'settings' && isNotDotMenu,
      },
      {
        type: 'button',
        text: 'Save',
        condition: state$1.active === 'settings' && isNotDotMenu,
        onClick: () => {
          if (!state.test) {
            fetchAjax({
              type: 'settings',
              query: state.entriesSettingsSave,
              callback: () => {
                // @ts-ignore
                state.entriesSettingsLoad = state.entriesSettingsSave;
              },
            });
          }
          else {
            // @ts-ignore
            state.entriesSettingsLoad = state.entriesSettingsSave;
          }
        },
      },
    ]).map((itemInner, itemIndex) => {
      return itemInner.condition && itemInner.type === 'text' ? (h("span", { class: `results-amount text-xs mt-1.5 sm:my-1.5 font-medium text-slate-700 sm:text-sm ${itemIndex === 0 ? '' : 'pl-4'}` }, itemInner.text)) : (itemInner.condition && itemInner.type === 'button' && (h(Button, { onClick: state.entriesSettingsHaveChanged && itemInner.onClick, tabindex: state.entriesSettingsHaveChanged ? 0 : -1, invalid: !state.entriesSettingsHaveChanged, primary: true, text: itemInner.text })));
    }))));
  }
  render() {
    const isMultisite = (state.data.network && !state.test && !state.isLoading) || state.testFull;
    return (h("div", { class: `${isMultisite
        ? 'h-[calc(100%-24px)] lg:h-[calc(100%+56px)]'
        : 'h-full lg:h-[calc(100%+80px)]'} relative` }, state.isLoading ? (h("div", { class: `w-full h-[calc(100%-var(--sl-side-w))] flex items-center justify-center bg-white/50 absolute top-0 left-0 backdrop-blur-sm z-10` }, h(Loader, { sm: false }))) : (h("div", { tabindex: -1, class: `focus-none inner pb-6 relative h-[calc(100%-var(--sl-side-w))] overflow-x-auto overflow-y-scroll w-full bg-white lg:pb-10 ${state.isProcessing ? 'pointer-events-none opacity-50' : ''}` }, state.isHelp
      ? this.help()
      : state$1.active === 'settings'
        ? this.settings()
        : this.rows())), isMultisite && (h("div", { class: `mt-auto px-3 h-6 bg-slate-50 border-t border-slate-200 flex items-center text-slate-900` }, h("span", { class: `flex whitespace-no-wrap` }, h("span", { class: `text-[11px]` }, h("span", { class: `font-semibold` }, "Current site:"), ' ', state.currentSite.path, " \u2219", ' ', h("span", { class: `font-semibold` }, "ID:"), state.currentSite.id))))));
  }
  get el() { return getElement(this); }
};
StreamlineEntries.style = streamlineEntriesCss;

export { StreamlineEntries as streamline_entries };
