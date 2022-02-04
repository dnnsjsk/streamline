import { r as registerInstance, h, g as getElement } from './index-68615357.js';
import { s as state, d as filterDeep, e as capitalizeFirstLetter, g as findDeep, m as merge, u as unset, h as get, i as compact, b as setEntries, j as set, a as state$1, k as someDeep, l as isBoolean, n as isNumber, o as debounce, p as onChange, c as setSearchPlaceholder } from './internal-77064a2d.js';
import { I as IconHeart, a as IconCheck, b as IconMenu, c as IconNetwork, d as IconPost, e as IconTimes, f as IconArrowLeft } from './index-7b69af99.js';
import { a as getMenu, g as getMenus } from './getMenus-02b2b3fb.js';
import { g as getMetaKey } from './getMetaKey-8ef3f4cd.js';
import { d as doQuery } from './doQuery-a16b895c.js';
import { B as Button } from './Button-7b396b24.js';

function fetchAjax(obj) {
  state.isLoading = true;
  // @ts-ignore
  // eslint-disable-next-line no-undef
  const streamline = window.streamline || false;
  fetch(streamline.ajax, {
    method: 'POST',
    credentials: 'same-origin',
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
    body: `action=streamlineQuery&type=${obj.type}&query=${JSON.stringify(obj.query
    // @ts-ignore
    // eslint-disable-next-line no-undef
    )}&nonce=${streamline.nonce}&userId=${String(state.data.userId)}`,
  })
    .then((response) => response && response.json())
    .then(() => {
    state.isLoading = false;
    obj.callback && obj.callback();
  })
    .catch(() => {
    console.log();
  });
}

function setFavourite(obj) {
  const arr = [...state.entriesFav];
  const filter = filterDeep(state[`entries${capitalizeFirstLetter(obj.type)}`], (o) => obj.filter(o), {
    childrenPath: ['children'],
  });
  if (!obj.favourite) {
    const path = findDeep(state.entriesFav, (o) => obj.path(o), {
      childrenPath: ['children'],
    });
    const index = path === null || path === void 0 ? void 0 : path.key;
    if (state.entriesFav.length === 0) {
      const mergeArr = [...merge(state.entriesFav, filter)];
      state.entriesFav = mergeArr;
      state.entriesFavActive = mergeArr;
    }
    else if (!path) {
      const mergeArr = [...arr, filter[0]];
      state.entriesFav = mergeArr;
      state.entriesFavActive = mergeArr;
    }
    else {
      const mergeArr = merge([
        Object.assign({}, arr[index]),
      ], filter);
      arr[index] = mergeArr[0];
      state.entriesFav = arr;
      state.entriesFavActive = arr;
    }
  }
  else {
    const path = findDeep(state.entriesFav, (o) => obj.pathFav(o), {
      childrenPath: ['children'],
    });
    const currentPath = path.context['_item'].strPath;
    unset(arr, currentPath);
    const parentPath = path.context['_item'].parent.path;
    const parentChildrenLength = Object.values(get(state.entriesFav, `${parentPath}.children`)).length;
    if (parentChildrenLength === 0) {
      unset(arr, parentPath);
    }
    const topPath = path.context['_item'].parent.parent.path;
    const topChildrenLength = topPath
      ? Object.values(get(state.entriesFav, `${topPath}.children`)).length
      : false;
    if (topChildrenLength === 0) {
      unset(arr, topPath);
    }
    const removeArr = arr.length === 1 && arr[0] === undefined ? [] : [...compact(arr)];
    state.entriesFav = removeArr;
    state.entriesFavActive = removeArr;
    setEntries();
  }
  if (!state.test) {
    fetchAjax({
      type: 'favourites',
      query: state.entriesFav,
    });
  }
  obj.callback && obj.callback();
}

function savePost(item, values) {
  const obj = {
    postId: item.ID,
    siteId: item.siteId,
    values: values,
  };
  [
    'entriesFav',
    'entriesFavActive',
    'entriesPost',
    'entriesPostActive',
  ].forEach((itemNested) => {
    state[itemNested].forEach(() => {
      const newFavs = [...state[itemNested]];
      const path = findDeep(newFavs, (o) => {
        return o.siteId === item.siteId && o.ID === item.ID;
      }, {
        childrenPath: ['children'],
      });
      if (path) {
        const currentPath = path.context['_item'].strPath;
        set(newFavs, `${currentPath}.name`, obj.values['post_title']);
        set(newFavs, `${currentPath}.post_title`, obj.values['post_title']);
        set(newFavs, `${currentPath}.post_name`, obj.values['post_name']);
        state[itemNested] = newFavs;
      }
    });
  });
  if (!state.test) {
    fetchAjax({
      type: 'post',
      query: obj,
    });
  }
}

const streamlineEntriesCss = "/*! tailwindcss v3.0.17 | MIT License | https://tailwindcss.com*/*,:after,:before{--tw-backdrop-sepia: ;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;border:0 solid #e5e7eb;box-sizing:border-box}:after,:before{--tw-content:\"\"}body{line-height:inherit;margin:0}h1,h2{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}table{border-collapse:collapse;border-color:inherit;text-indent:0}button,input,select{color:inherit;font-family:inherit;font-size:100%;line-height:inherit;margin:0;padding:0}button,select{text-transform:none}[type=button],button{-webkit-appearance:button;background-color:transparent;background-image:none}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}h1,h2,menu,p,ul{margin:0}menu,ul{list-style:none;padding:0}input::-moz-placeholder{color:#9ca3af;opacity:1}input:-ms-input-placeholder{color:#9ca3af;opacity:1}input::placeholder{color:#9ca3af;opacity:1}[role=button],button{cursor:pointer}img,svg{display:block;vertical-align:middle}img{height:auto;max-width:100%}[hidden]{display:none}.sr-only{clip:rect(0,0,0,0);border-width:0;height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}.pointer-events-none{pointer-events:none}.visible{visibility:visible}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.sticky{position:-webkit-sticky;position:sticky}.left-px{left:1px}.top-0{top:0}.-top-px{top:-1px}.left-0{left:0}.right-4{right:16px}.left-1{left:4px}.top-1{top:4px}.-top-2{top:-8px}.-left-full{left:-100%}.z-10{z-index:10}.z-20{z-index:20}.mx-4{margin-left:16px;margin-right:16px}.mr-2{margin-right:8px}.mt-6{margin-top:24px}.mt-4{margin-top:16px}.mb-3{margin-bottom:12px}.mt-0{margin-top:0}.mb-2{margin-bottom:8px}.mr-3{margin-right:12px}.mr-6{margin-right:24px}.ml-8{margin-left:32px}.mt-auto{margin-top:auto}.block{display:block}.inline-block{display:inline-block}.flex{display:flex}.inline-flex{display:inline-flex}.table{display:table}.grid{display:grid}.hidden{display:none}.h-full{height:100%}.h-5{height:20px}.h-3{height:12px}.h-6{height:24px}.w-full{width:100%}.w-12{width:48px}.w-14{width:56px}.w-3{width:12px}.max-w-full{max-width:100%}.flex-shrink-0{flex-shrink:0}.rotate-180{--tw-rotate:180deg}.rotate-180,.scale-50{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.scale-50{--tw-scale-x:.5;--tw-scale-y:.5}.cursor-pointer{cursor:pointer}.select-none{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.select-text{-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text}.resize{resize:both}.grid-flow-col{grid-auto-flow:column}.grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.flex-row{flex-direction:row}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-center{align-items:center}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-2{gap:8px}.space-y-2>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-bottom:calc(8px*var(--tw-space-y-reverse));margin-top:calc(8px*(1 - var(--tw-space-y-reverse)))}.space-y-4>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-bottom:calc(16px*var(--tw-space-y-reverse));margin-top:calc(16px*(1 - var(--tw-space-y-reverse)))}.space-y-5>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-bottom:calc(20px*var(--tw-space-y-reverse));margin-top:calc(20px*(1 - var(--tw-space-y-reverse)))}.space-x-2>:not([hidden])~:not([hidden]){--tw-space-x-reverse:0;margin-left:calc(8px*(1 - var(--tw-space-x-reverse)));margin-right:calc(8px*var(--tw-space-x-reverse))}.overflow-x-auto{overflow-x:auto}.overflow-y-scroll{overflow-y:scroll}.truncate{overflow:hidden;text-overflow:ellipsis}.truncate,.whitespace-nowrap{white-space:nowrap}.border{border-width:1px}.border-t{border-top-width:1px}.border-b{border-bottom-width:1px}.border-dotted{border-style:dotted}.border-slate-100{border-color:rgb(241 245 249/var(--tw-border-opacity))}.border-slate-100,.border-slate-200{--tw-border-opacity:1}.border-slate-200{border-color:rgb(226 232 240/var(--tw-border-opacity))}.border-slate-300{border-color:rgb(203 213 225/var(--tw-border-opacity))}.border-blue-600,.border-slate-300{--tw-border-opacity:1}.border-blue-600{border-color:rgb(37 99 235/var(--tw-border-opacity))}.bg-transparent{background-color:transparent}.bg-green-100{background-color:rgb(220 252 231/var(--tw-bg-opacity))}.bg-green-100,.bg-purple-100{--tw-bg-opacity:1}.bg-purple-100{background-color:rgb(243 232 255/var(--tw-bg-opacity))}.bg-yellow-100{background-color:rgb(254 249 195/var(--tw-bg-opacity))}.bg-lime-100,.bg-yellow-100{--tw-bg-opacity:1}.bg-lime-100{background-color:rgb(236 252 203/var(--tw-bg-opacity))}.bg-blue-100{background-color:rgb(219 234 254/var(--tw-bg-opacity))}.bg-blue-100,.bg-slate-100{--tw-bg-opacity:1}.bg-slate-100{background-color:rgb(241 245 249/var(--tw-bg-opacity))}.bg-white{background-color:rgb(255 255 255/var(--tw-bg-opacity))}.bg-slate-50,.bg-white{--tw-bg-opacity:1}.bg-slate-50{background-color:rgb(248 250 252/var(--tw-bg-opacity))}.bg-slate-300{background-color:rgb(203 213 225/var(--tw-bg-opacity))}.bg-slate-200,.bg-slate-300{--tw-bg-opacity:1}.bg-slate-200{background-color:rgb(226 232 240/var(--tw-bg-opacity))}.bg-blue-600{--tw-bg-opacity:1;background-color:rgb(37 99 235/var(--tw-bg-opacity))}.px-4{padding-left:16px;padding-right:16px}.px-2{padding-left:8px;padding-right:8px}.py-1{padding-bottom:4px;padding-top:4px}.px-3{padding-left:12px;padding-right:12px}.py-2{padding-top:8px}.pb-2,.py-2{padding-bottom:8px}.pt-3{padding-top:12px}.pt-5{padding-top:20px}.pb-1{padding-bottom:4px}.pb-6{padding-bottom:24px}.text-sm{font-size:14px}.text-xs{font-size:12px}.text-base{font-size:16px}.text-lg{font-size:18px}.font-medium{font-weight:500}.font-semibold{font-weight:600}.uppercase{text-transform:uppercase}.italic{font-style:italic}.leading-none{line-height:1}.leading-relaxed{line-height:1.625}.leading-tight{line-height:1.25}.text-slate-900{color:rgb(15 23 42/var(--tw-text-opacity))}.text-slate-600,.text-slate-900{--tw-text-opacity:1}.text-slate-600{color:rgb(71 85 105/var(--tw-text-opacity))}.text-rose-500{color:rgb(244 63 94/var(--tw-text-opacity))}.text-green-600,.text-rose-500{--tw-text-opacity:1}.text-green-600{color:rgb(22 163 74/var(--tw-text-opacity))}.text-slate-700{color:rgb(51 65 85/var(--tw-text-opacity))}.text-purple-600,.text-slate-700{--tw-text-opacity:1}.text-purple-600{color:rgb(147 51 234/var(--tw-text-opacity))}.text-yellow-600{color:rgb(202 138 4/var(--tw-text-opacity))}.text-lime-600,.text-yellow-600{--tw-text-opacity:1}.text-lime-600{color:rgb(101 163 13/var(--tw-text-opacity))}.text-blue-600{color:rgb(37 99 235/var(--tw-text-opacity))}.text-blue-600,.text-slate-800{--tw-text-opacity:1}.text-slate-800{color:rgb(30 41 59/var(--tw-text-opacity))}.text-slate-500{color:rgb(100 116 139/var(--tw-text-opacity))}.text-slate-400,.text-slate-500{--tw-text-opacity:1}.text-slate-400{color:rgb(148 163 184/var(--tw-text-opacity))}.text-white{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity))}.opacity-0{opacity:0}.opacity-50{opacity:.5}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1);--tw-shadow-colored:0 1px 3px 0 var(--tw-shadow-color),0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.blur{--tw-blur:blur(8px)}.blur,.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.transition{transition-duration:.15s;transition-property:color,background-color,border-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-text-decoration-color,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-text-decoration-color,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1)}.duration-200{transition-duration:.2s}.ease-in-out{transition-timing-function:cubic-bezier(.4,0,.2,1)}:host{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-overflow-scrolling:touch;box-sizing:border-box}:host .focus:focus{box-shadow:inset 0 0 0 4px #f1f5f9,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-border:focus{border-color:var(--sl-focus-color);box-shadow:0 0 0 1px var(--sl-focus-color);outline:none!important}:host .focus-out:focus{box-shadow:0 0 0 2px #f8fafc,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-dark:focus{box-shadow:inset 0 0 0 4px #0f172a,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-darker:focus{box-shadow:inset 0 0 0 4px #020204,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-white:focus{box-shadow:inset 0 0 0 4px #fff,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-in-white-out:focus-within{box-shadow:0 0 0 2px #fff,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-none:focus{box-shadow:none!important;outline:none!important}:host .border-invalid{border-color:var(--sl-focus-color-invalid);box-shadow:0 0 0 1px var(--sl-focus-color-invalid);outline:none!important}:host *{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-overflow-scrolling:touch}:host .overflow-x-auto:not(.scrollbar-none)::-webkit-scrollbar,:host .overflow-y-auto:not(.scrollbar-none)::-webkit-scrollbar,:host .overflow-y-scroll:not(.scrollbar-none)::-webkit-scrollbar{height:4px;width:8px}:host .overflow-x-auto:not(.scrollbar-none)::-webkit-scrollbar-track,:host .overflow-y-auto:not(.scrollbar-none)::-webkit-scrollbar-track,:host .overflow-y-scroll:not(.scrollbar-none)::-webkit-scrollbar-track{background:#fff}:host .overflow-x-auto:not(.scrollbar-none)::-webkit-scrollbar-thumb,:host .overflow-y-auto:not(.scrollbar-none)::-webkit-scrollbar-thumb,:host .overflow-y-scroll:not(.scrollbar-none)::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:0}:host .scrollbar-none::-webkit-scrollbar{height:0;width:0}:host .scrollbar-none::-webkit-scrollbar-track{background:transparent}:host .scrollbar-none::-webkit-scrollbar-thumb{background:transparent}input:checked~.dot{background-color:#fff;transform:translateX(36px)}input[type=number],select{-moz-appearance:none;appearance:none;-webkit-appearance:none;border:1px solid #e2e8f0;color:#0f172a;font-family:inter,sans-serif;font-size:14px;font-weight:600;padding:8px 12px!important;width:100%}select{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E\");background-position:right 4px center;background-repeat:no-repeat;background-size:20px 20px}.\\!pointer-events-auto{pointer-events:auto!important}.top-1\\/2{top:50%}.top-\\[62px\\]{top:62px}.z-\\[-1\\]{z-index:-1}.mt-0\\.5{margin-top:2px}.mt-\\[-6px\\]{margin-top:-6px}.\\!mb-0{margin-bottom:0!important}.\\!block{display:block!important}.h-\\[42px\\]{height:42px}.h-\\[max-content\\]{height:-webkit-max-content;height:-moz-max-content;height:max-content}.h-\\[calc\\(100\\%-24px\\)\\]{height:calc(100% - 24px)}.h-\\[calc\\(100\\%-var\\(--sl-side-w\\)\\)\\]{height:calc(100% - var(--sl-side-w))}.min-h-\\[60px\\]{min-height:60px}.w-4\\/5{width:80%}.w-\\[8px\\]{width:8px}.w-\\[max-content\\]{width:-webkit-max-content;width:-moz-max-content;width:max-content}.w-\\[100px\\]{width:100px}.max-w-\\[100px\\]{max-width:100px}.-translate-y-1\\/2{--tw-translate-y:-50%}.-translate-y-1\\/2,.rotate-180{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.auto-cols-\\[minmax\\(150px\\2c 1fr\\)\\]{grid-auto-columns:minmax(150px,1fr)}.grid-cols-\\[1fr\\2c auto\\]{grid-template-columns:1fr auto}.grid-cols-\\[minmax\\(0\\2c 1fr\\)\\2c auto\\]{grid-template-columns:minmax(0,1fr) auto}.px-2\\.5{padding-left:10px;padding-right:10px}.py-1\\.5{padding-bottom:6px;padding-top:6px}.pt-3\\.5{padding-top:14px}.pb-1\\.5{padding-bottom:6px}.text-\\[11px\\]{font-size:11px}.\\!text-lg{font-size:18px!important}.placeholder-rose-600::-moz-placeholder{--tw-placeholder-opacity:1;color:rgb(225 29 72/var(--tw-placeholder-opacity))}.placeholder-rose-600:-ms-input-placeholder{--tw-placeholder-opacity:1;color:rgb(225 29 72/var(--tw-placeholder-opacity))}.placeholder-rose-600::placeholder{--tw-placeholder-opacity:1;color:rgb(225 29 72/var(--tw-placeholder-opacity))}.\\!opacity-100{opacity:1!important}.first-of-type\\:border-none:first-of-type{border-style:none}.focus-within\\:opacity-100:focus-within{opacity:1}.hover\\:border-slate-900:hover{--tw-border-opacity:1;border-color:rgb(15 23 42/var(--tw-border-opacity))}.hover\\:opacity-100:hover{opacity:1}.focus\\:border-blue-500:focus{--tw-border-opacity:1;border-color:rgb(59 130 246/var(--tw-border-opacity))}.focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}.group:hover .group-hover\\:block{display:block}.group:hover .group-hover\\:bg-slate-400{--tw-bg-opacity:1;background-color:rgb(148 163 184/var(--tw-bg-opacity))}.group:focus .group-focus\\:block{display:block}.group:focus .group-focus\\:text-blue-600{--tw-text-opacity:1;color:rgb(37 99 235/var(--tw-text-opacity))}.peer:checked~.peer-checked\\:bg-blue-600{--tw-bg-opacity:1;background-color:rgb(37 99 235/var(--tw-bg-opacity))}.peer:hover~.peer-hover\\:opacity-100{opacity:1}@media (min-width:640px){.sm\\:left-2{left:8px}.sm\\:right-8{right:32px}.sm\\:top-\\[72px\\]{top:72px}.sm\\:-top-2{top:-8px}.sm\\:mx-8{margin-left:32px;margin-right:32px}.sm\\:mb-6{margin-bottom:24px}.sm\\:mt-0{margin-top:0}.sm\\:mb-3{margin-bottom:12px}.sm\\:mt-1{margin-top:4px}.sm\\:block{display:block}.sm\\:min-h-\\[75px\\]{min-height:75px}.sm\\:scale-75{--tw-scale-x:.75;--tw-scale-y:.75}.sm\\:scale-100,.sm\\:scale-75{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.sm\\:scale-100{--tw-scale-x:1;--tw-scale-y:1}.sm\\:grid-cols-\\[100px\\2c 1fr\\]{grid-template-columns:100px 1fr}.sm\\:gap-6{gap:24px}.sm\\:space-y-6>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-bottom:calc(24px*var(--tw-space-y-reverse));margin-top:calc(24px*(1 - var(--tw-space-y-reverse)))}.sm\\:px-8{padding-left:32px;padding-right:32px}.sm\\:pt-5{padding-top:20px}.sm\\:pb-2\\.5{padding-bottom:10px}.sm\\:pb-2{padding-bottom:8px}.sm\\:pt-6{padding-top:24px}.sm\\:text-base{font-size:16px}.sm\\:text-lg{font-size:18px}.sm\\:text-xl{font-size:20px}.sm\\:hover\\:bg-slate-50:hover{--tw-bg-opacity:1;background-color:rgb(248 250 252/var(--tw-bg-opacity))}.peer:hover~.sm\\:peer-hover\\:text-blue-600,.sm\\:hover\\:text-blue-600:hover{--tw-text-opacity:1;color:rgb(37 99 235/var(--tw-text-opacity))}}@media (min-width:768px){.md\\:flex{display:flex}.md\\:w-3\\/4{width:75%}}@media (min-width:1024px){.lg\\:left-4{left:16px}.lg\\:right-12{right:48px}.lg\\:mx-12{margin-left:48px;margin-right:48px}.lg\\:h-\\[calc\\(100\\%\\+56px\\)\\]{height:calc(100% + 56px)}.lg\\:h-\\[calc\\(100\\%\\+80px\\)\\]{height:calc(100% + 80px)}.lg\\:px-12{padding-left:48px;padding-right:48px}.lg\\:pb-10{padding-bottom:40px}}.\\!h-5{height:20px!important}.\\!w-5{width:20px!important}.\\!p-0{padding:0!important}.hover\\:border-blue-700:hover{--tw-border-opacity:1;border-color:rgb(29 78 216/var(--tw-border-opacity))}.hover\\:bg-blue-700:hover{--tw-bg-opacity:1;background-color:rgb(29 78 216/var(--tw-bg-opacity))}.hover\\:bg-slate-900:hover{--tw-bg-opacity:1;background-color:rgb(15 23 42/var(--tw-bg-opacity))}.hover\\:text-white:hover{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity))}.hover\\:text-slate-50:hover{--tw-text-opacity:1;color:rgb(248 250 252/var(--tw-text-opacity))}@media (min-width:640px){.sm\\:px-4{padding-left:16px;padding-right:16px}.sm\\:px-3{padding-left:12px;padding-right:12px}.sm\\:py-1\\.5{padding-bottom:6px;padding-top:6px}.sm\\:py-1{padding-bottom:4px;padding-top:4px}}.pb-2{padding-bottom:8px}";

let StreamlineEntries = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.border = 'border-t border-slate-100 first-of-type:border-none';
    this.borderB = 'border-b border-slate-200 border-dotted';
    this.h2 = 'text-sm text-slate-900 font-medium sm:text-base';
    this.px = 'px-4 sm:px-8 lg:px-12';
    this.mx = 'mx-4 sm:mx-8 lg:mx-12';
    this.sorter = () => {
      this.el.shadowRoot
        .querySelectorAll('[data-sort-active]')
        .forEach((item) => {
        var _a, _b;
        const id = item.getAttribute('data-sort-active');
        const type = item.getAttribute('data-sort-type');
        if (((_b = (_a = state$1 === null || state$1 === void 0 ? void 0 : state$1.sort) === null || _a === void 0 ? void 0 : _a[type]) === null || _b === void 0 ? void 0 : _b.id) === id) {
          this.sort(item, {
            id: id,
            type: type,
          }, state$1.sort[type].direction, true);
        }
      });
    };
    this.cycleEntries = (mode) => {
      var _a, _b;
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
      (_b = (_a = focusEls[state.focusIndex]) === null || _a === void 0 ? void 0 : _a.focus) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    this.getArr = (type) => {
      var _a;
      return (((_a = state[`entries${capitalizeFirstLetter(type)}Active`]) === null || _a === void 0 ? void 0 : _a.length) >= 1 &&
        (state[`entries${capitalizeFirstLetter(type)}Active`] ||
          state[`entries${capitalizeFirstLetter(type)}`]));
    };
    this.row = (item, table) => {
      var _a, _b;
      let isFav = false;
      const isEdit = (_b = (_a = state.entriesEditing) === null || _a === void 0 ? void 0 : _a[item.ID]) === null || _b === void 0 ? void 0 : _b.active;
      const isSite = item.type === 'site';
      const isHistory = item.type === 'history';
      const isPost = item.type === 'post';
      const isMenu = item.type === 'menu' || item.type === 'networkMenu';
      const isDropdown = isPost || isMenu;
      const isCurrentSite = parseInt(item.siteId) === parseInt(state.currentSite.id);
      const isTable = isSite || isPost;
      const checkIfFavourite = () => {
        isFav =
          item.type === 'history'
            ? false
            : someDeep(state.entriesFav, (o) => {
              return isMenu
                ? (o === null || o === void 0 ? void 0 : o.path) === item.path &&
                  (o === null || o === void 0 ? void 0 : o.siteId) === item.siteId &&
                  o.type === item.type
                : (o === null || o === void 0 ? void 0 : o.ID) === item.ID &&
                  (o === null || o === void 0 ? void 0 : o.siteId) === item.siteId &&
                  o.type === item.type;
            }, { childrenPath: ['children'] });
      };
      checkIfFavourite();
      const setFav = () => setFavourite({
        favourite: isFav,
        callback: checkIfFavourite,
        type: item.type,
        filter: (o) => {
          return isMenu
            ? o.href === item.href && o.adminUrl === item.adminUrl
            : o.ID === item.ID && o.siteId === item.siteId;
        },
        path: (o) => {
          return o.type === item.type && o.siteId === item.siteId;
        },
        pathFav: (o) => {
          return isMenu
            ? o.path === item.path && o.siteId === item.siteId
            : o.ID === item.ID &&
              o.siteId === item.siteId &&
              o.post_title === item.post_title;
        },
      });
      const onClickHistory = () => {
        doQuery({
          callback: `${state$1.active}s`,
          type: state$1.active,
          search: item.name,
          id: item.siteId,
        });
      };
      const onClickSites = () => {
        state.currentSite = {
          path: item.path,
          id: item.siteId,
        };
        state.entriesPost = [];
        state.entriesPostActive = [];
        state.entriesPostQuery = '';
        getMenu({
          adminUrl: item.adminUrl,
          fetch: true,
          siteId: item.siteId,
          path: item.path,
        });
      };
      const onClickPostsEditToggle = (edit) => {
        var _a;
        const isSaveable = () => {
          const inputs = this.el.shadowRoot.querySelectorAll(`[data-row="${item.ID}"] input`);
          for (const input of inputs)
            if (input.value !== '')
              return false;
          return true;
        };
        if (!edit && !isSaveable) {
          return false;
        }
        state.entriesEditing = Object.assign(Object.assign({}, state.entriesEditing), { [item.ID]: Object.assign(Object.assign({}, (_a = state.entriesEditing) === null || _a === void 0 ? void 0 : _a[item.ID]), { values: Object.fromEntries([
              ...this.el.shadowRoot.querySelectorAll(`[data-row="${item.ID}"] input[data-id]`),
            ].map((item) => [
              [item.getAttribute('data-id')],
              {
                defaultValue: item.value,
              },
            ])), active: edit }) });
        const dropdownButton = this.el.shadowRoot.querySelector(`[data-row="${item.ID}"] streamline-ui-dropdown`);
        if (edit) {
          dropdownButton.classList.add('!opacity-100');
          state.isSearch = false;
        }
        else {
          dropdownButton.classList.remove('!opacity-100');
          state.isSearch = true;
          const values = {};
          this.el.shadowRoot
            .querySelectorAll(`[data-row="${item.ID}"] input[data-id]`)
            .forEach((itemNested) => {
            const key = itemNested.getAttribute('data-id');
            values[key] = itemNested.value;
          });
          savePost(item, values);
        }
        this.el.shadowRoot
          .querySelectorAll(`[data-row="${item.ID}"] input`)
          .forEach((item) => { var _a, _b; return (_b = (_a = item) === null || _a === void 0 ? void 0 : _a.blur) === null || _b === void 0 ? void 0 : _b.call(_a); });
      };
      const onClickPostsCancel = () => {
        var _a;
        const dropdownButton = this.el.shadowRoot.querySelector(`[data-row="${item.ID}"] streamline-ui-dropdown`);
        state.entriesEditing = Object.assign(Object.assign({}, state.entriesEditing), { [item.ID]: Object.assign(Object.assign({}, (_a = state.entriesEditing) === null || _a === void 0 ? void 0 : _a[item.ID]), { active: false }) });
        this.el.shadowRoot
          .querySelectorAll(`[data-row="${item.ID}"] input[data-id]`)
          .forEach((itemNested) => {
          var _a, _b;
          itemNested.value =
            state.entriesEditing[item.ID].values[itemNested.getAttribute('data-id')].defaultValue;
          (_b = (_a = itemNested) === null || _a === void 0 ? void 0 : _a.blur) === null || _b === void 0 ? void 0 : _b.call(_a);
        });
        dropdownButton.classList.remove('!opacity-100');
        if (JSON.stringify(state.entriesEditing).indexOf('"active":true') === -1) {
          state.isSearch = true;
        }
      };
      const onClick = (e) => isHistory
        ? onClickHistory()
        : isSite
          ? onClickSites()
          : isPost && window.innerWidth <= 639
            ? e.preventDefault()
            : false;
      const onDblClick = (e) => {
        if (isPost && window.innerWidth <= 639) {
          e.preventDefault();
          state.drawer = Object.assign(Object.assign({}, state.drawer), { active: true, title: `Editing: ${item.post_title}`, onSave: () => {
              savePost(item, state.drawer.values);
            }, items: Object.values(table)
              .map((itemInner) => {
              return (itemInner.edit && {
                id: itemInner.id,
                value: item[itemInner.id],
                label: itemInner.name,
              });
            })
              .filter((x) => x) });
        }
      };
      const dropdown = [
        !isEdit && { text: isFav ? 'Unfavourite' : 'Favourite', onClick: setFav },
        isPost && {
          text: isEdit ? 'Save' : 'Edit Inline',
          onClick: isEdit
            ? () => onClickPostsEditToggle(false)
            : () => onClickPostsEditToggle(true),
        },
        isPost &&
          isEdit && {
          text: 'Cancel',
          onClick: onClickPostsCancel,
        },
        isPost && !isEdit && { text: 'View Post', href: item.guid },
        isPost && !isEdit && { text: 'Edit Post', href: atob(item.hrefEdit) },
      ];
      const rowClass = 'text-sm font-medium text-slate-600 h-[42px]';
      const sortData = {};
      table.forEach((itemInner) => {
        if (itemInner.sort) {
          sortData[`data-sort-${itemInner.id}`] = item[itemInner.id];
        }
      });
      return (h("li", Object.assign({ class: `relative`, "data-entry": true, "data-row": item.ID }, sortData), h("a", { "data-focus": true, tabindex: isEdit ? -1 : 0, href: state.test ? '#0' : item.href || item.guid, class: {
          [this.px]: true,
          [rowClass]: true,
          'relative focus-white flex items-center flex-wrap cursor-pointer w-full inline-block peer sm:hover:text-blue-600 sm:hover:bg-slate-50': true,
          'pointer-events-none': (isCurrentSite && isSite) || isEdit,
        }, onClick: onClick, onDblClick: onDblClick, onMouseDown: (e) => e.preventDefault() }, ((isFav && state$1.active !== 'fav') ||
        (isCurrentSite && state$1.active === 'site')) && (h("span", { class: `mr-2 flex absolute left-px top-1/2 -translate-y-1/2 sm:left-2 lg:left-4` }, isFav ? (h("span", { class: `text-rose-500 inline-block scale-50 sm:scale-75` }, h(IconHeart, null))) : (h("span", { class: `text-green-600 inline-block scale-50 sm:scale-100` }, h(IconCheck, null))))), !isTable && item.name), isTable && (h("div", { class: `${this.px} grid auto-cols-[minmax(150px,1fr)] grid-flow-col gap-2 w-full absolute top-0 pointer-events-none text-slate-700 sm:peer-hover:text-blue-600` }, table.map((itemNested) => {
        var _a;
        return (h("div", { class: `h-[42px] flex items-center relative` }, itemNested.text ? ((_a = itemNested.text) === null || _a === void 0 ? void 0 : _a.call(itemNested, item)) : (h("input", { title: item[itemNested.id], "data-id": itemNested.id, type: "text", tabindex: itemNested.edit && isEdit ? 0 : -1, disabled: !itemNested.edit && isEdit, class: {
            'truncate text-sm font-medium h-[42px] pointer-events-none leading-none select-text absolute -top-px left-0 focus-none w-4/5 bg-transparent': true,
            // @ts-ignore
            'text-green-600 !pointer-events-auto placeholder-rose-600': isEdit && itemNested.edit,
          }, value: item[itemNested.id], placeholder: "No value" }))));
      }))), isDropdown && (h("streamline-ui-dropdown", { class: "hidden w-12 absolute block h-full top-0 right-4 opacity-0 focus-within:opacity-100 hover:opacity-100 peer-hover:opacity-100 sm:block sm:right-8 lg:right-12", type: "entry", items: dropdown }))));
    };
    this.sort = (e, item, direction = 'ascending', force = false) => {
      const attr = `data-sort-${item.id}`;
      const categoryItems = this.el.shadowRoot.querySelectorAll(`[${attr}]`);
      const categoryItemsArray = Array.from(categoryItems);
      const sorted = categoryItemsArray.sort(sorter);
      function sorter(a, b) {
        const first = direction === 'ascending' ? a : b;
        const second = direction === 'ascending' ? b : a;
        if (first.getAttribute(attr) < second.getAttribute(attr))
          return -1;
        if (first.getAttribute(attr) > second.getAttribute(attr))
          return 1;
        return 0;
      }
      sorted.forEach((el) => (force ? e : e.target)
        .closest(`[data-entry-section="${item.type}"]`)
        .querySelector('[data-sort]')
        .appendChild(el));
      if (!force) {
        state$1.sort = Object.assign(Object.assign({}, state$1.sort), { [item.type]: {
            id: item.id,
            direction: direction,
          } });
      }
    };
    this.rows = () => {
      var _a;
      const isHistory = !state.test &&
        (state$1.active === 'post' || state$1.active === 'site') &&
        !state[`entries${capitalizeFirstLetter(state$1.active)}Query`] &&
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
        : this.getArr(state$1.active);
      return Object.values(array).map((item) => {
        const onScroll = (e) => {
          this.el.shadowRoot.querySelector(`div[data-uid="${uid}"]`).scrollLeft =
            Math.round(e.target.scrollLeft);
        };
        const uid = Date.now().toString(36) + Math.random().toString(36).substr(2);
        const table = state$1.active === 'site'
          ? [
            {
              id: 'domain',
              name: 'Domain',
              sort: true,
            },
            { id: 'path', name: 'Path', sort: true },
            { id: 'siteId', name: 'ID', sort: true },
          ]
          : item.type === 'post'
            ? [
              {
                id: 'post_status',
                text: (itemInner) => {
                  const isPublish = itemInner.post_status === 'publish';
                  const isFuture = itemInner.post_status === 'future';
                  const isDraft = itemInner.post_status === 'draft';
                  const isPending = itemInner.post_status === 'pending';
                  const isPrivate = itemInner.post_status === 'private';
                  return (h("span", { class: {
                      'px-2.5 py-1.5 text-xs uppercase font-semibold': true,
                      'bg-green-100 text-green-600': isPublish,
                      'bg-purple-100 text-purple-600': isFuture,
                      'bg-yellow-100 text-yellow-600': isDraft,
                      'bg-lime-100 text-lime-600': isPending,
                      'bg-blue-100 text-blue-600': isPrivate,
                      'bg-slate-100 text-slate-600': !isPublish &&
                        !isFuture &&
                        !isDraft &&
                        !isPending &&
                        !isPrivate,
                    } }, itemInner.post_status));
                },
                name: 'Status',
                sort: true,
              },
              { id: 'post_title', name: 'Title', edit: true, sort: true },
              { id: 'post_name', name: 'Slug', edit: true, sort: true },
              { id: 'post_type', name: 'Post type', sort: true },
            ]
            : [];
        return (h("div", { "data-entry-section": item.type }, this.getHeader(item, true), (item.type === 'post' || item.type === 'site') && (h("div", { "data-uid": uid, class: `overflow-x-auto scrollbar-none sticky top-[62px] z-10 bg-white sm:top-[72px]` }, h("div", { class: `${this.px} grid grid-flow-col auto-cols-[minmax(150px,1fr)] gap-2` }, table.map((itemInner) => {
          var _a, _b, _c;
          return (h("div", { "data-sort-type": item.type, "data-sort-active": ((_a = state$1.sort[item.type]) === null || _a === void 0 ? void 0 : _a.id) === itemInner.id &&
              itemInner.id, tabindex: "0", role: "button", key: itemInner.id, class: {
              [this.borderB]: true,
              'group grid grid-cols-[1fr,auto] items-center py-1.5 text-xs uppercase font-semibold font-slate-500 whitespace-nowrap hover:border-slate-900 focus:border-blue-500 focus:outline-none': true,
              'pointer-events-none': !itemInner.sort,
            }, onMouseDown: (e) => e.preventDefault(), onClick: (e) => {
              var _a;
              return this.sort(e, Object.assign(Object.assign({}, itemInner), { type: item.type }), ((_a = state$1.sort[item.type]) === null || _a === void 0 ? void 0 : _a.id) !== itemInner.id
                ? 'ascending'
                : state$1.sort[item.type].direction ===
                  'ascending'
                  ? 'descending'
                  : 'ascending');
            } }, itemInner.name, h("svg", { class: {
              'hidden w-[8px] mr-2 group-hover:block group-focus:block group-focus:text-blue-600': true,
              '!block': ((_b = state$1.sort[item.type]) === null || _b === void 0 ? void 0 : _b.id) === itemInner.id,
              'rotate-180': ((_c = state$1.sort[item.type]) === null || _c === void 0 ? void 0 : _c.direction) ===
                'descending',
            }, xmlns: "http://www.w3.org/2000/svg", role: "img", viewBox: "0 0 320 512" }, h("path", { fill: "currentColor", d: "M151.5 347.8L3.5 201c-4.7-4.7-4.7-12.3 0-17l19.8-19.8c4.7-4.7 12.3-4.7 17 0L160 282.7l119.7-118.5c4.7-4.7 12.3-4.7 17 0l19.8 19.8c4.7 4.7 4.7 12.3 0 17l-148 146.8c-4.7 4.7-12.3 4.7-17 0z" }))));
        })))), h("ul", { "data-uid": uid, "data-sort": true, onScroll: item.type === 'post' || item.type === 'site'
            ? (e) => onScroll(e)
            : undefined, class: "overflow-x-auto" }, Object.values(item.children).map((itemInner, indexInner) => {
          return itemInner['children'] ? (h("li", { key: indexInner }, h("h2", { class: `${this.mx} ${this.borderB} text-base pb-2 pt-3.5 text-slate-900 font-medium sm:text-lg sm:pt-5 sm:pb-2.5` }, itemInner['name']), h("ul", null, Object.values(itemInner['children']).map((itemSub) => {
            return this.row(itemSub, table);
          })))) : (this.row(itemInner, table));
        }))));
      });
    };
    this.help = () => {
      return (h("div", null, this.getHeader({
        title: `${state.menu[state$1.active].text} mode help`,
      }), h("div", { class: `${this.px} mt-6 text-base space-y-2 leading-relaxed md:w-3/4`, innerHTML: state.menu[state$1.active].help })));
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
      const Key = (props) => (h("div", { style: { boxShadow: '0 3px 0 0 #E2E8F0' }, class: `h-[max-content] px-2 leading-0 py-1 text-[11px] uppercase font-medium text-slate-800 border bg-slate-50 border-slate-200` }, props.key));
      return Object.values(state.entriesSettingsActive).map((item) => {
        return (h("div", null, this.getHeader(item), h("ul", { class: `${this.px} space-y-4 sm:space-y-6` }, Object.values(item.children).map((itemInner, indexInner) => {
          return (h("li", { key: indexInner, class: `${indexInner === 0 ? this.border : ''} flex flex-col` }, h("h2", { class: `${this.h2} ${this.borderB} !text-lg mt-4 space-y-2 mb-3 inline-block leading-none pb-2 sm:mb-6` }, itemInner.name), itemInner.children && (h("ul", { class: `flex flex-col space-y-5` }, Object.values(itemInner.children).map((itemSub, indexSub) => {
            return (h("li", { key: indexSub, class: `flex items-center` }, h("label", { htmlFor: `setting-${itemSub.id}`, class: {
                'cursor-pointer w-full grid gap-2 select-none group sm:grid-cols-[100px,1fr] sm:gap-6': true,
                'cursor-pointer': !itemSub.choices,
              } }, h("div", { class: {
                'relative mt-0.5 inline-block h-[max-content] focus-in-white-out': true,
                'w-[max-content]': isBoolean(state.entriesSettingsLoad[itemSub.id]
                  .default),
                'w-full': !isBoolean(state.entriesSettingsLoad[itemSub.id]
                  .default),
              } }, itemSub.choices ? (h("select", { "data-focus": true, class: "text-sm focus-none cursor-pointer w-[100px]", onInput: (e) => this.settingsOnChange(itemSub.id, 'default', e.target.value) }, Object.entries(itemSub.choices).map(([key, value]) => {
              return ((key === 'last' ||
                state.menu[key].condition) && (h("option", { selected: state.entriesSettingsLoad[itemSub.id].default === key, value: key }, value)));
            }))) : isNumber(state.entriesSettingsLoad[itemSub.id]
              .default) ? (h("input", { "data-focus": true, id: `setting-${itemSub.id}`, type: "number", class: "text-sm focus-none max-w-[100px]", min: 10, value: state.entriesSettingsLoad[itemSub.id]
                .default, onInput: (e) => this.settingsOnChange(itemSub.id, 'default', parseInt(e.target
                .value)) })) : ([
              h("input", { "data-focus": true, type: "checkbox", id: `setting-${itemSub.id}`, class: "sr-only peer", checked: state.entriesSettingsLoad[itemSub.id].default, onInput: (e) => this.settingsOnChange(itemSub.id, 'default', e.target
                  .checked) }),
              h("div", { class: `block bg-slate-300 w-14 h-5 transition ease-in-out duration-200 group-hover:bg-slate-400 peer-checked:bg-blue-600` }),
              h("div", { class: `dot absolute left-1 top-1 bg-white w-3 h-3 transition ease-in-out duration-200` }),
            ])), h("div", { class: `w-full mt-0.5 sm:mt-0` }, h("div", { class: `text-base text-slate-900 font-medium flex justify-between` }, itemSub.name, itemSub.keys && (h("div", { class: `hidden space-x-2 mt-[-6px] md:flex ${state.entriesSettingsLoad[itemSub.id].default
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
    window.addEventListener('resize', debounce(() => {
      if (window.innerWidth <= 639 && state.entriesEditing !== {}) {
        this.el.shadowRoot
          .querySelectorAll('streamline-ui-dropdown')
          .forEach((item) => {
          item.classList.remove('!opacity-100');
        });
        this.el.shadowRoot.querySelectorAll(`[data-row]`).forEach((item) => {
          const id = item.getAttribute('data-row');
          item.querySelectorAll('input[data-id]').forEach((itemNested) => {
            var _a, _b, _c, _d;
            if ((_b = (_a = state.entriesEditing) === null || _a === void 0 ? void 0 : _a[id]) === null || _b === void 0 ? void 0 : _b.active) {
              itemNested.value =
                state.entriesEditing[id].values[itemNested.getAttribute('data-id')].defaultValue;
              (_d = (_c = itemNested) === null || _c === void 0 ? void 0 : _c.blur) === null || _d === void 0 ? void 0 : _d.call(_c);
            }
          });
        });
        state.entriesEditing = {};
        state.isSearch = true;
      }
    }, 500));
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
    onChange('active', () => {
      state.entriesEditing = {};
    });
  }
  componentDidRender() {
    this.sorter();
  }
  getHeader(item, mb = false) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const isTestNav = state.test && state$1.active === 'post';
    const isQuery = item.type === 'post' || item.type === 'site';
    const isQueryMode = state$1.active === 'site' || state$1.active === 'post';
    const isMenu = item.type === 'menu' || item.type === 'networkMenu';
    const isDotMenu = state.isHelp;
    const isNotDotMenu = !state.isHelp;
    const isQueryWithClose = isQueryMode &&
      state[`entries${capitalizeFirstLetter(state$1.active)}Query`] &&
      ((_a = state[`historySearches${capitalizeFirstLetter(state$1.active)}`]) === null || _a === void 0 ? void 0 : _a.length) > 0 &&
      !state.isHelp;
    const hasPages = (state.test && state$1.active === 'post') ||
      (isQueryWithClose &&
        state$1.active === 'post' &&
        state[`entries${capitalizeFirstLetter(state$1.active)}Total`] >
          state.entriesSettingsLoad.queryAmount.default);
    const totalPages = Math.ceil((state.test && state$1.active === 'post'
      ? ((_c = (_b = state.entriesPost) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.children) &&
        Object.values(Object.values((_e = (_d = state.entriesPost) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.children)).length
      : state[`entries${capitalizeFirstLetter(state$1.active)}Total`]) /
      state.entriesSettingsLoad.queryAmount.default);
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
      : `results`}${hasPages || isTestNav
      ? ` (page ${state[`entries${capitalizeFirstLetter(state$1.active)}CurrentPage`]} of ${totalPages})`
      : ''}`;
    const path = item.isMultisite && !state.test && state$1.active !== 'site'
      ? ` (subsite: ${item.path})`
      : '';
    return (h("div", { class: {
        'mb-2 grid grid-cols-[minmax(0,1fr),auto] justify-between items-center relative min-h-[60px] pt-5 flex pb-1.5 sticky -top-2 bg-white z-20 border-b border-slate-300 sm:min-h-[75px] sm:pt-6 sm:pb-2 sm:-top-2 sm:mb-3': true,
        [this.px]: true,
        '!mb-0': mb,
      } }, h("div", null, h("div", { class: `absolute -left-full top-0 h-full bg-white z-[-1]` }), h("div", { class: `flex items-center flex-row max-w-full` }, state$1.active === 'fav' &&
      state.entriesFavActive[0].children.length !== 0 &&
      !state.isHelp && (h("div", { class: `flex-shrink-0 text-blue-600 flex items-center justify-center mr-3` }, item.type === 'menu' && h(IconMenu, null), item.type === 'networkMenu' && h(IconNetwork, null), item.type === 'post' && h(IconPost, null))), isQueryWithClose && (h(Button, { type: "back", icon: h(IconTimes, null), onClick: () => {
        state[`entries${capitalizeFirstLetter(state$1.active)}CurrentPage`] = 1;
        state[`entries${capitalizeFirstLetter(state$1.active)}Query`] = '';
        state[`entries${capitalizeFirstLetter(state$1.active)}`] =
          [];
        state[`entries${capitalizeFirstLetter(state$1.active)}Active`] = [];
        setSearchPlaceholder();
      } })), h("h1", { class: {
        'text-slate-900 font-medium text-lg mr-6 whitespace-nowrap truncate leading-tight sm:text-xl': true,
        'ml-8': isQueryWithClose,
      }, innerHTML: `${state.isSlash || isDotMenu
        ? item.title
        : item.type === 'networkMenu'
          ? 'Network admin'
          : isMenu
            ? 'Admin menu' + path
            : (state$1.active === 'post' ||
              state$1.active === 'site') &&
              ((_f = state[`entries${capitalizeFirstLetter(state$1.active)}`][0]) === null || _f === void 0 ? void 0 : _f.queryValue)
              ? `${capitalizeFirstLetter(state$1.active)}s for: ` +
                `<span class="text-slate-400 italic">${(_g = state[`entries${state$1.active === 'post' ? 'Post' : 'Site'}`][0]) === null || _g === void 0 ? void 0 : _g.queryValue}</span>` +
                path
              : isQuery && state$1.active === 'fav'
                ? `${capitalizeFirstLetter(item.type)}s` + path
                : isQueryMode &&
                  !state[`entries${capitalizeFirstLetter(state$1.active)}Query`] &&
                  ((_h = state[`historySearches${capitalizeFirstLetter(state$1.active)}`]) === null || _h === void 0 ? void 0 : _h.length) === 0
                  ? `No query, search for a ${state$1.active} in the search bar`
                  : isQueryMode &&
                    !state[`entries${capitalizeFirstLetter(state$1.active)}Query`] &&
                    ((_j = state[`historySearches${capitalizeFirstLetter(state$1.active)}`]) === null || _j === void 0 ? void 0 : _j.length) > 0
                    ? `Search history`
                    : state$1.active === 'settings'
                      ? 'Settings'
                      : 'No results'}` })), h("div", { class: `mt-0.5 sm:mt-1` }, [
      {
        type: 'text',
        text: results,
        condition: state$1.active !== 'settings' && isNotDotMenu,
      },
    ].map((item) => {
      return (item.condition && (h("span", { class: `results-amount text-xs font-medium leading-tight text-slate-700 text-xs` }, item.text)));
    }))), h("div", null, [
      {
        type: 'button',
        text: 'Save',
        condition: state$1.active === 'settings' && isNotDotMenu,
        onClick: () => {
          state.entriesPostCurrentPage = 1;
          if (!state.test) {
            fetchAjax({
              type: 'settings',
              query: state.entriesSettingsSave,
              callback: () => {
                if (state.entriesSettingsLoad.queryAmount !==
                  // @ts-ignore
                  state.entriesSettingsSave.queryAmount &&
                  !state.test) {
                  state.entriesPost = [];
                  state.entriesPostQuery = '';
                }
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
    ].map((item) => {
      return (item.condition && (h(Button, { onClick: state.entriesSettingsHaveChanged && item.onClick, tabindex: state.entriesSettingsHaveChanged ? 0 : -1, disabled: !state.entriesSettingsHaveChanged, type: "primary", text: item.text })));
    }), (isTestNav ||
      (hasPages &&
        state$1.active === 'post' &&
        state.entriesPostQuery)) && (h("div", { class: `grid grid-cols-2 gap-2` }, [
      {
        type: 'secondary',
        icon: h(IconArrowLeft, null),
        disabled: state[`entries${capitalizeFirstLetter(state$1.active)}CurrentPage`] === 1,
        action: 'prev',
      },
      {
        type: 'secondary',
        icon: (h("span", { class: `rotate-180 inline-block` }, h(IconArrowLeft, null))),
        disabled: state[`entries${capitalizeFirstLetter(state$1.active)}CurrentPage`] === totalPages,
        action: 'next',
      },
    ].map((item) => {
      return (h(Button, { type: item.type, icon: item.icon, disabled: item.disabled, onClick: () => {
          state[`entries${capitalizeFirstLetter(state$1.active)}CurrentPage`] =
            item.action === 'next'
              ? state[`entries${capitalizeFirstLetter(state$1.active)}CurrentPage`] + 1
              : state[`entries${capitalizeFirstLetter(state$1.active)}CurrentPage`] - 1;
          if (!state.test) {
            doQuery({
              type: state$1.active,
              callback: state$1.active + 's',
              search: state[`entries${capitalizeFirstLetter(state$1.active)}Query`],
            });
          }
          else {
            setEntries();
            this.sorter();
          }
        } }));
    }))))));
  }
  render() {
    const isMultisite = (state.data.network && !state.test && !state.isLoading) || state.testFull;
    return (h("div", { class: `${isMultisite
        ? 'h-[calc(100%-24px)] lg:h-[calc(100%+56px)]'
        : 'h-full lg:h-[calc(100%+80px)]'} relative` }, h("div", { tabindex: -1, class: `focus-none inner pb-6 relative h-[calc(100%-var(--sl-side-w))] overflow-y-scroll w-full bg-white lg:pb-10 ${state.isLoading ? 'pointer-events-none opacity-50' : ''}` }, state.isHelp
      ? this.help()
      : state$1.active === 'settings'
        ? this.settings()
        : this.rows()), isMultisite && (h("div", { class: `mt-auto px-4 h-6 bg-slate-50 border-t border-slate-200 flex items-center text-slate-900` }, h("span", { class: `flex whitespace-no-wrap` }, h("span", { class: `text-[11px]` }, h("span", { class: `font-semibold` }, "Current site:"), ' ', state.currentSite.path, " \u2219", ' ', h("span", { class: `font-semibold` }, "ID:"), state.currentSite.id))))));
  }
  get el() { return getElement(this); }
};
StreamlineEntries.style = streamlineEntriesCss;

export { StreamlineEntries as streamline_entries };
