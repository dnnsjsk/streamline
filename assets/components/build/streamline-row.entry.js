import { r as registerInstance, h, i as getElement } from './index-4ad5c4a3.js';
import { s as state } from './internal-1f00f851.js';
import { f as filterDeep, a as findDeep, m as merge, u as unset, g as get, c as compact, s as setEntries, b as set, d as someDeep } from './setEntries-23b70b3a.js';
import { c as capitalizeFirstLetter } from './capitalizeFirstLetter-646b80d8.js';
import { p as post, r as resetView, g as get$1 } from './get-e80ad98f.js';
import { I as Icon } from './Icon-9a94f925.js';
import './sort-8306feea.js';
import './setSearchPlaceholder-794cddd3.js';

const setFavourite = (obj) => {
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
    // @ts-ignore
    const currentPath = path.context._item.strPath;
    unset(arr, currentPath);
    // @ts-ignore
    const parentPath = path.context._item.parent.path;
    const parentChildrenLength = Object.values(get(state.entriesFav, `${parentPath}.children`)).length;
    if (parentChildrenLength === 0) {
      unset(arr, parentPath);
    }
    // @ts-ignore
    const topPath = path.context._item.parent.parent.path;
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
    post({
      route: 'update/settings',
      type: 'favourites',
      values: state.entriesFav,
    });
  }
  obj.callback && obj.callback();
};

const getMenu = (obj = {}) => {
  let data = [];
  const menu = {};
  const isAdmin = document.querySelector('#adminmenuwrap') &&
    ((obj.network && state.data.isNetwork) ||
      (!obj.network && state.data.isAdmin && !state.data.isNetwork));
  const isNetwork = obj.network;
  const isMultisite = !!state.data.network;
  const adminUrl = obj.adminUrl || (isNetwork ? state.data.network : state.data.adminUrl);
  const siteId = obj.siteId || (isNetwork ? 0 : state.data.siteId);
  const type = !obj.path && isNetwork ? 'networkMenu' : 'menu';
  function get(doc) {
    doc.querySelectorAll('.menu-top > a').forEach((item, index) => {
      const name = item.innerText.replace(/(\r\n|\n|\r)/gm, '');
      const subMenu = item.closest('li.menu-top');
      const subArr = {};
      if (subMenu) {
        const subSubMenu = subMenu.querySelectorAll('a');
        subSubMenu.forEach((itemSub, indexSub) => {
          var _a;
          if ((indexSub !== 0 && subSubMenu.length >= 2) ||
            (indexSub === 0 && subSubMenu.length === 1)) {
            const nameText = (_a = [...itemSub.childNodes]
              .find((child) => child.nodeType === Node.TEXT_NODE)) === null || _a === void 0 ? void 0 : _a.textContent.trim();
            const nameSub = itemSub.querySelector('.update-count')
              ? nameText +
                ` (${itemSub.querySelector('.update-count').innerHTML})`
              : itemSub.innerText.replace(/(\r\n|\n|\r)/gm, '');
            const hrefSub = itemSub.getAttribute('href');
            subArr[hrefSub] = {
              adminUrl,
              href: adminUrl + hrefSub,
              index: subSubMenu.length === 1 ? indexSub : indexSub - 1,
              name: nameSub,
              nameParent: name,
              path: hrefSub,
              siteId: Number(siteId),
              type: type,
            };
          }
        });
      }
      menu[name] = {
        index,
        name,
        children: subArr,
      };
    });
    data = [
      {
        adminUrl,
        children: menu,
        isMultisite: isMultisite,
        path: obj.path || state.currentSite.path,
        siteId: Number(siteId),
        type: type,
      },
    ];
    if (isNetwork) {
      state.entriesNetworkMenu = data;
      if (!state.entriesSearch.some((e) => e.type === 'networkMenu')) {
        state.entriesSearch = [...state.entriesSearch, ...data];
      }
    }
    else {
      state.entriesMenu = data;
      state.entriesMenuCurrentPath = obj.path || state.currentSite.path;
      if (!state.entriesSearch.some((e) => e.type === 'menu')) {
        state.entriesSearch = [...state.entriesSearch, ...data];
      }
      else if (!state.entriesSearch.some((e) => e.siteId === Number(state.currentSite.id))) {
        state.entriesSearch = [
          state.entriesActions,
          ...data,
          ...state.entriesNetworkMenu,
        ];
      }
    }
    setEntries();
  }
  if (isAdmin && !obj.fetch) {
    get(document);
    obj.callback && obj.callback();
  }
  else {
    state.isLoading = true;
    fetch(adminUrl)
      .then((response) => response.text && response.text())
      .then((data) => {
      const parser = new DOMParser();
      const html = parser.parseFromString(data, 'text/html');
      get(html);
      resetView();
      obj.callback && obj.callback();
    })
      .catch(() => { });
  }
};

const save = (item, values) => {
  const obj = {
    postId: item.ID,
    siteId: item.siteId,
    values: values,
  };
  const update = () => {
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
          // @ts-ignore
          const currentPath = path.context._item.strPath;
          set(newFavs, `${currentPath}.name`, obj.values.post_title);
          set(newFavs, `${currentPath}.post_title`, obj.values.post_title);
          set(newFavs, `${currentPath}.post_name`, obj.values.post_name);
          state[itemNested] = newFavs;
        }
      });
    });
    setEntries();
  };
  if (!state.test) {
    post({
      route: 'update/post',
      values: obj,
      callback: update,
    });
  }
  else {
    update();
  }
};

const IconHeart = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z"/></svg>`;

const IconCheck = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M440.1 103C450.3 112.4 450.3 127.6 440.1 136.1L176.1 400.1C167.6 410.3 152.4 410.3 143 400.1L7.029 264.1C-2.343 255.6-2.343 240.4 7.029 231C16.4 221.7 31.6 221.7 40.97 231L160 350.1L407 103C416.4 93.66 431.6 93.66 440.1 103V103z"/></svg>`;

const tailwindCss = "@tailwind base;@tailwind utilities;@tailwind components;:host{display:block}*{text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif;line-height:1.25}.sl-border-b{--tw-border-opacity:1;border-bottom-width:1px;border-color:rgb(226 232 240/var(--tw-border-opacity));border-style:dotted}.sl-px{padding-left:16px;padding-right:16px}@media (min-width:640px){.sl-px{padding-left:32px;padding-right:32px}}@media (min-width:1024px){.sl-px{padding-left:40px;padding-right:40px}}.sl-mx{margin-left:16px;margin-right:16px}@media (min-width:640px){.sl-mx{margin-left:32px;margin-right:32px}}@media (min-width:1024px){.sl-mx{margin-left:40px;margin-right:40px}}.sl-grid{display:grid;gap:8px;grid-auto-columns:minmax(150px,1fr);grid-auto-flow:column}.focus-inner:focus{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);--tw-ring-inset:inset;--tw-ring-opacity:1;--tw-ring-color:rgb(59 130 246/var(--tw-ring-opacity));--tw-ring-offset-width:2px;box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 #0000);outline:2px solid transparent;outline-offset:2px}.icon{svg{height:100%;width:100%}}\n /*! tailwindcss v3.0.24 | MIT License | https://tailwindcss.com*/*,:after,:before{--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;border:0 solid #e5e7eb;box-sizing:border-box}:after,:before{--tw-content:\"\"}h1,h2{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}table{border-collapse:collapse;border-color:inherit;text-indent:0}button,input{color:inherit;font-family:inherit;font-size:100%;line-height:inherit;margin:0;padding:0}button{text-transform:none}[type=button],button{-webkit-appearance:button;background-color:transparent;background-image:none}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}h1,h2,menu,ul{margin:0}menu,ul{list-style:none;padding:0}input::-moz-placeholder{color:#9ca3af;opacity:1}input:-ms-input-placeholder{color:#9ca3af;opacity:1}input::placeholder{color:#9ca3af;opacity:1}[role=button],button{cursor:pointer}img,svg{display:block;vertical-align:middle}img{height:auto;max-width:100%}[hidden]{display:none}.pointer-events-none{pointer-events:none}.pointer-events-auto{pointer-events:auto}.visible{visibility:visible}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.sticky{position:-webkit-sticky;position:sticky}.top-0{top:0}.left-3{left:12px}.right-3{right:12px}.left-px{left:1px}.-top-px{top:-1px}.left-0{left:0}.right-4{right:16px}.-left-full{left:-100%}.bottom-0{bottom:0}.-bottom-px{bottom:-1px}.top-14{top:56px}.z-50{z-index:50}.z-30{z-index:30}.z-10{z-index:10}.m-0{margin:0}.ml-1{margin-left:4px}.mr-2{margin-right:8px}.ml-auto{margin-left:auto}.mr-3{margin-right:12px}.ml-9{margin-left:36px}.mr-6{margin-right:24px}.mt-6{margin-top:24px}.block{display:block}.inline-block{display:inline-block}.flex{display:flex}.inline-flex{display:inline-flex}.table{display:table}.grid{display:grid}.hidden{display:none}.h-full{height:100%}.h-3{height:12px}.h-4{height:16px}.h-10{height:40px}.h-px{height:1px}.h-14{height:56px}.h-6{height:24px}.w-full{width:100%}.w-2{width:8px}.w-3{width:12px}.w-12{width:48px}.w-4{width:16px}.max-w-full{max-width:100%}.max-w-screen-md{max-width:768px}.flex-shrink-0{flex-shrink:0}.translate-y-4{--tw-translate-y:16px}.rotate-90,.translate-y-4{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rotate-90{--tw-rotate:90deg}.rotate-180{--tw-rotate:180deg}.rotate-180,.scale-50{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.scale-50{--tw-scale-x:.5;--tw-scale-y:.5}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.cursor-pointer{cursor:pointer}.select-text{-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text}.auto-cols-max{grid-auto-columns:-webkit-max-content;grid-auto-columns:max-content}.grid-flow-col{grid-auto-flow:column}.flex-row{flex-direction:row}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-center{align-items:center}.justify-center{justify-content:center}.gap-2{gap:8px}.space-y-4>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-bottom:calc(16px*var(--tw-space-y-reverse));margin-top:calc(16px*(1 - var(--tw-space-y-reverse)))}.overflow-hidden{overflow:hidden}.overflow-x-auto{overflow-x:auto}.overflow-y-scroll{overflow-y:scroll}.truncate{overflow:hidden;text-overflow:ellipsis}.truncate,.whitespace-nowrap{white-space:nowrap}.rounded-md{border-radius:6px}.rounded-lg{border-radius:8px}.border{border-width:1px}.border-t{border-top-width:1px}.border-slate-100{border-color:rgb(241 245 249/var(--tw-border-opacity))}.border-slate-100,.border-slate-200{--tw-border-opacity:1}.border-slate-200{border-color:rgb(226 232 240/var(--tw-border-opacity))}.border-blue-600{border-color:rgb(37 99 235/var(--tw-border-opacity))}.border-blue-600,.border-slate-400{--tw-border-opacity:1}.border-slate-400{border-color:rgb(148 163 184/var(--tw-border-opacity))}.bg-white{--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity))}.bg-transparent{background-color:transparent}.bg-blue-600{background-color:rgb(37 99 235/var(--tw-bg-opacity))}.bg-blue-600,.bg-slate-200{--tw-bg-opacity:1}.bg-slate-200{background-color:rgb(226 232 240/var(--tw-bg-opacity))}.bg-slate-50{background-color:rgb(248 250 252/var(--tw-bg-opacity))}.bg-blue-500,.bg-slate-50{--tw-bg-opacity:1}.bg-blue-500{background-color:rgb(59 130 246/var(--tw-bg-opacity))}.bg-green-100{background-color:rgb(220 252 231/var(--tw-bg-opacity))}.bg-green-100,.bg-purple-100{--tw-bg-opacity:1}.bg-purple-100{background-color:rgb(243 232 255/var(--tw-bg-opacity))}.bg-yellow-100{background-color:rgb(254 249 195/var(--tw-bg-opacity))}.bg-lime-100,.bg-yellow-100{--tw-bg-opacity:1}.bg-lime-100{background-color:rgb(236 252 203/var(--tw-bg-opacity))}.bg-blue-100{background-color:rgb(219 234 254/var(--tw-bg-opacity))}.bg-blue-100,.bg-slate-100{--tw-bg-opacity:1}.bg-slate-100{background-color:rgb(241 245 249/var(--tw-bg-opacity))}.fill-current{fill:currentColor}.p-0{padding:0}.px-4{padding-left:16px;padding-right:16px}.px-9{padding-left:36px;padding-right:36px}.px-3{padding-left:12px;padding-right:12px}.py-2{padding-bottom:8px;padding-top:8px}.px-2{padding-left:8px;padding-right:8px}.py-1{padding-bottom:4px;padding-top:4px}.pb-6{padding-bottom:24px}.pl-3{padding-left:12px}.pb-2{padding-bottom:8px}.pt-4{padding-top:16px}.text-left{text-align:left}.text-sm{font-size:14px}.text-base{font-size:16px}.text-xs{font-size:12px}.font-medium{font-weight:500}.font-normal{font-weight:400}.font-semibold{font-weight:600}.uppercase{text-transform:uppercase}.italic{font-style:italic}.leading-none{line-height:1}.text-slate-900{color:rgb(15 23 42/var(--tw-text-opacity))}.text-slate-500,.text-slate-900{--tw-text-opacity:1}.text-slate-500{color:rgb(100 116 139/var(--tw-text-opacity))}.text-white{color:rgb(255 255 255/var(--tw-text-opacity))}.text-slate-600,.text-white{--tw-text-opacity:1}.text-slate-600{color:rgb(71 85 105/var(--tw-text-opacity))}.text-rose-500{color:rgb(244 63 94/var(--tw-text-opacity))}.text-green-600,.text-rose-500{--tw-text-opacity:1}.text-green-600{color:rgb(22 163 74/var(--tw-text-opacity))}.text-slate-700{color:rgb(51 65 85/var(--tw-text-opacity))}.text-slate-400,.text-slate-700{--tw-text-opacity:1}.text-slate-400{color:rgb(148 163 184/var(--tw-text-opacity))}.text-slate-300{color:rgb(203 213 225/var(--tw-text-opacity))}.text-blue-600,.text-slate-300{--tw-text-opacity:1}.text-blue-600{color:rgb(37 99 235/var(--tw-text-opacity))}.text-purple-600{color:rgb(147 51 234/var(--tw-text-opacity))}.text-purple-600,.text-yellow-600{--tw-text-opacity:1}.text-yellow-600{color:rgb(202 138 4/var(--tw-text-opacity))}.text-lime-600{--tw-text-opacity:1;color:rgb(101 163 13/var(--tw-text-opacity))}.opacity-50{opacity:.5}.opacity-0{opacity:0}.opacity-100{opacity:1}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1);--tw-shadow-colored:0 1px 3px 0 var(--tw-shadow-color),0 1px 2px -1px var(--tw-shadow-color)}.shadow,.shadow-md{box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.shadow-md{--tw-shadow:0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -2px rgba(0,0,0,.1);--tw-shadow-colored:0 4px 6px -1px var(--tw-shadow-color),0 2px 4px -2px var(--tw-shadow-color)}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.backdrop-blur-sm{--tw-backdrop-blur:blur(4px);-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}.transition{transition-duration:.15s;transition-property:color,background-color,border-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-text-decoration-color,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-text-decoration-color,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1)}.duration-100{transition-duration:.1s}.duration-200{transition-duration:.2s}.ease-in{transition-timing-function:cubic-bezier(.4,0,1,1)}.icon svg{height:100%;width:100%}.overflow-x-auto:not(.scrollbar-none)::-webkit-scrollbar,.overflow-y-scroll:not(.scrollbar-none)::-webkit-scrollbar{height:4px;width:8px}.overflow-x-auto:not(.scrollbar-none)::-webkit-scrollbar-track,.overflow-y-scroll:not(.scrollbar-none)::-webkit-scrollbar-track{background:#fff}.overflow-x-auto:not(.scrollbar-none)::-webkit-scrollbar-thumb,.overflow-y-scroll:not(.scrollbar-none)::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:0}.scrollbar-none::-webkit-scrollbar{height:0;width:0}.scrollbar-none::-webkit-scrollbar-thumb,.scrollbar-none::-webkit-scrollbar-track{background:transparent}streamline-header{--tw-bg-opacity:1;align-items:center;background-color:rgb(255 255 255/var(--tw-bg-opacity));display:flex;display:grid;grid-template-columns:minmax(0,1fr) auto;height:40px;justify-content:space-between;position:relative;position:-webkit-sticky;position:sticky;top:0;z-index:20}@media (min-width:1024px){.lg\\:pb-10{padding-bottom:40px}}.top-1\\/2{top:50%}.-translate-y-1\\/2{--tw-translate-y:-50%}.-translate-y-1\\/2,.rotate-90{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.placeholder-slate-500::-moz-placeholder{--tw-placeholder-opacity:1;color:rgb(100 116 139/var(--tw-placeholder-opacity))}.placeholder-slate-500:-ms-input-placeholder{--tw-placeholder-opacity:1;color:rgb(100 116 139/var(--tw-placeholder-opacity))}.placeholder-slate-500::placeholder{--tw-placeholder-opacity:1;color:rgb(100 116 139/var(--tw-placeholder-opacity))}.focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}.peer:focus~.peer-focus\\:text-blue-600{--tw-text-opacity:1;color:rgb(37 99 235/var(--tw-text-opacity))}@media (min-width:640px){.sm\\:right-4{right:16px}}@media (min-width:1024px){.lg\\:left-5{left:20px}.lg\\:px-12{padding-left:48px;padding-right:48px}}.h-3\\.5{height:14px}.w-3\\.5{width:14px}@media (min-width:1024px){.lg\\:h-4{height:16px}.lg\\:w-4{width:16px}}.\\!h-6{height:24px!important}.\\!w-6{width:24px!important}.\\!p-0{padding:0!important}.hover\\:border-blue-700:hover{--tw-border-opacity:1;border-color:rgb(29 78 216/var(--tw-border-opacity))}.hover\\:border-slate-900:hover{--tw-border-opacity:1;border-color:rgb(15 23 42/var(--tw-border-opacity))}.hover\\:bg-blue-700:hover{--tw-bg-opacity:1;background-color:rgb(29 78 216/var(--tw-bg-opacity))}.hover\\:bg-slate-900:hover{--tw-bg-opacity:1;background-color:rgb(15 23 42/var(--tw-bg-opacity))}.hover\\:text-white:hover{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity))}.hover\\:text-slate-50:hover{--tw-text-opacity:1;color:rgb(248 250 252/var(--tw-text-opacity))}@media (min-width:640px){.sm\\:py-2\\.5{padding-bottom:10px;padding-top:10px}.sm\\:px-4{padding-left:16px;padding-right:16px}.sm\\:py-2{padding-bottom:8px;padding-top:8px}.sm\\:px-3{padding-left:12px;padding-right:12px}.sm\\:py-1\\.5{padding-bottom:6px;padding-top:6px}.sm\\:py-1{padding-bottom:4px;padding-top:4px}}.text-\\[11px\\]{font-size:11px}.\\!pointer-events-auto{pointer-events:auto!important}.h-\\[42px\\]{height:42px}.w-4\\/5{width:80%}.-translate-y-1\\/2,.scale-50{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.\\!text-slate-400{--tw-text-opacity:1!important;color:rgb(148 163 184/var(--tw-text-opacity))!important}.placeholder-rose-600::-moz-placeholder{--tw-placeholder-opacity:1;color:rgb(225 29 72/var(--tw-placeholder-opacity))}.placeholder-rose-600:-ms-input-placeholder{--tw-placeholder-opacity:1;color:rgb(225 29 72/var(--tw-placeholder-opacity))}.placeholder-rose-600::placeholder{--tw-placeholder-opacity:1;color:rgb(225 29 72/var(--tw-placeholder-opacity))}.\\!opacity-100{opacity:1!important}.focus-within\\:opacity-100:focus-within{opacity:1}.hover\\:opacity-100:hover,.peer:hover~.peer-hover\\:opacity-100{opacity:1}@media (min-width:640px){.sm\\:left-2{left:8px}.sm\\:right-8{right:32px}.sm\\:block{display:block}.sm\\:scale-75{--tw-scale-x:.75;--tw-scale-y:.75}.sm\\:scale-100,.sm\\:scale-75{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.sm\\:scale-100{--tw-scale-x:1;--tw-scale-y:1}.sm\\:hover\\:bg-slate-50:hover{--tw-bg-opacity:1;background-color:rgb(248 250 252/var(--tw-bg-opacity))}.peer:hover~.sm\\:peer-hover\\:text-blue-600,.sm\\:hover\\:text-blue-600:hover{--tw-text-opacity:1;color:rgb(37 99 235/var(--tw-text-opacity))}}@media (min-width:1024px){.lg\\:left-4{left:16px}.lg\\:right-12{right:48px}}.mt-\\[2px\\]{margin-top:2px}.focus-within\\:pointer-events-auto:focus-within{pointer-events:auto}.focus-within\\:text-blue-600:focus-within{--tw-text-opacity:1;color:rgb(37 99 235/var(--tw-text-opacity))}.hover\\:z-50:hover{z-index:50}.hover\\:text-blue-600:hover{--tw-text-opacity:1;color:rgb(37 99 235/var(--tw-text-opacity))}.hover\\:opacity-100:hover{opacity:1}.focus\\:text-blue-600:focus{--tw-text-opacity:1;color:rgb(37 99 235/var(--tw-text-opacity))}.focus\\:opacity-100:focus{opacity:1}.group:hover .group-hover\\:pointer-events-auto{pointer-events:auto}.group:hover .group-hover\\:opacity-100{opacity:1}.group:focus .group-focus\\:pointer-events-auto{pointer-events:auto}.group:focus .group-focus\\:opacity-100{opacity:1}.z-\\[-1\\]{z-index:-1}.\\!mb-0{margin-bottom:0!important}.empty\\:hidden:empty{display:none}.z-\\[9999999999999999\\]{z-index:10000000000000000}.h-\\[2px\\]{height:2px}.h-\\[calc\\(100\\%-56px-24px\\)\\]{height:calc(100% - 80px)}.max-h-\\[600px\\]{max-height:600px}.grid-cols-\\[1fr\\2c 75px\\]{grid-template-columns:1fr 75px}.bg-black\\/90{background-color:rgba(0,0,0,.9)}@media (min-width:768px){.md\\:rounded-2xl{border-radius:16px}}.top-\\[52px\\]{top:52px}.\\!block{display:block!important}.w-\\[8px\\]{width:8px}.grid-cols-\\[1fr\\2c auto\\]{grid-template-columns:1fr auto}.px-2\\.5{padding-left:10px;padding-right:10px}.py-1\\.5{padding-bottom:6px;padding-top:6px}.focus\\:border-blue-500:focus{--tw-border-opacity:1;border-color:rgb(59 130 246/var(--tw-border-opacity))}.group:focus .group-focus\\:block,.group:hover .group-hover\\:block{display:block}.group:focus .group-focus\\:text-blue-600{--tw-text-opacity:1;color:rgb(37 99 235/var(--tw-text-opacity))}@media (min-width:640px){.sm\\:top-\\[67px\\]{top:67px}}.whitespace-nowrap{white-space:nowrap}";

const StreamlineRow = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    var _a, _b;
    let isFav = false;
    const isEdit = (_b = (_a = state.entriesEditing) === null || _a === void 0 ? void 0 : _a[this.item.ID]) === null || _b === void 0 ? void 0 : _b.active;
    const isAction = this.item.type === 'action';
    const isActionInactive = isAction && state.searchValue === '';
    const isSite = this.item.type === 'site';
    const isHistory = this.item.type === 'history';
    const isPost = this.item.type === 'post';
    const isMenu = this.item.type === 'menu' || this.item.type === 'networkMenu';
    const isDropdown = isPost || isMenu;
    const isCurrentSite = parseInt(this.item.siteId) === state.currentSite.id;
    const isTable = isSite || isPost;
    const checkIfFavourite = () => {
      isFav =
        this.item.type === 'history'
          ? false
          : someDeep(state.entriesFav, (o) => {
            return isMenu
              ? (o === null || o === void 0 ? void 0 : o.path) === this.item.path &&
                (o === null || o === void 0 ? void 0 : o.siteId) === this.item.siteId &&
                o.type === this.item.type
              : (o === null || o === void 0 ? void 0 : o.ID) === this.item.ID &&
                (o === null || o === void 0 ? void 0 : o.siteId) === this.item.siteId &&
                o.type === this.item.type;
          }, { childrenPath: ['children'] });
    };
    checkIfFavourite();
    const setFav = () => setFavourite({
      favourite: isFav,
      callback: checkIfFavourite,
      type: this.item.type,
      filter: (o) => {
        return isMenu
          ? o.href === this.item.href && o.adminUrl === this.item.adminUrl
          : o.ID === this.item.ID && o.siteId === this.item.siteId;
      },
      path: (o) => {
        return o.type === this.item.type && o.siteId === this.item.siteId;
      },
      pathFav: (o) => {
        return isMenu
          ? o.path === this.item.path && o.siteId === this.item.siteId
          : o.ID === this.item.ID &&
            o.siteId === this.item.siteId &&
            o.post_title === this.item.post_title;
      },
    });
    const onKeyPress = (e) => {
      if (e.key === 'Enter') {
        if (isAction) {
          onClickAction();
        }
        if (isHistory) {
          onClickHistory();
        }
        if (isSite) {
          onClickSite();
        }
      }
    };
    const onClickAction = () => {
      get$1({
        route: this.item.route,
        type: this.item.tab,
        value: state.searchValue,
        tab: this.item.tab,
        callback: () => (state.active = this.item.tab),
      });
    };
    const onClickHistory = () => {
      get$1({
        route: `get/${state.active}s`,
        type: state.active,
        value: this.item.name,
        id: this.item.siteId,
      });
    };
    const onClickSite = () => {
      state.currentSite = {
        path: this.item.path,
        id: this.item.siteId,
      };
      state.entriesPost = [];
      state.entriesPostActive = [];
      state.entriesPostQuery = '';
      if (!state.data.isAdmin) {
        state.isLoading = true;
      }
      getMenu({
        adminUrl: this.item.adminUrl,
        fetch: true,
        siteId: this.item.siteId,
        path: this.item.path,
      });
    };
    const onClickPostsEditToggle = (edit) => {
      var _a;
      const isSaveable = () => {
        const inputs = this.el.shadowRoot.querySelectorAll(`[data-row="${this.item.ID}"] input`);
        // @ts-ignore
        for (const input of inputs)
          if (input.value !== '')
            return false;
        return true;
      };
      if (!edit && !isSaveable()) {
        return false;
      }
      state.entriesEditing = Object.assign(Object.assign({}, state.entriesEditing), { [this.item.ID]: Object.assign(Object.assign({}, (_a = state.entriesEditing) === null || _a === void 0 ? void 0 : _a[this.item.ID]), { values: Object.fromEntries([
            // @ts-ignore
            ...this.el.shadowRoot.querySelectorAll(`[data-row="${this.item.ID}"] input[data-id]`),
          ].map((item) => [
            [this.item.getAttribute('data-id')],
            {
              defaultValue: item.value,
            },
          ])), active: edit }) });
      const dropdownButton = this.el.shadowRoot.querySelector(`[data-row="${this.item.ID}"] streamline-ui-dropdown`);
      if (edit) {
        dropdownButton.classList.add('!opacity-100');
      }
      else {
        dropdownButton.classList.remove('!opacity-100');
        const values = {};
        this.el.shadowRoot
          .querySelectorAll(`[data-row="${this.item.ID}"] input[data-id]`)
          .forEach((itemNested) => {
          const key = itemNested.getAttribute('data-id');
          values[key] = itemNested.value;
        });
        save(this.item, values);
      }
      this.el.shadowRoot
        .querySelectorAll(`[data-row="${this.item.ID}"] input`)
        .forEach((item) => { var _a, _b; return (_b = (_a = item) === null || _a === void 0 ? void 0 : _a.blur) === null || _b === void 0 ? void 0 : _b.call(_a); });
    };
    const onClickPostsCancel = () => {
      var _a;
      const dropdownButton = this.el.shadowRoot.querySelector(`[data-row="${this.item.ID}"] streamline-ui-dropdown`);
      state.entriesEditing = Object.assign(Object.assign({}, state.entriesEditing), { [this.item.ID]: Object.assign(Object.assign({}, (_a = state.entriesEditing) === null || _a === void 0 ? void 0 : _a[this.item.ID]), { active: false }) });
      this.el.shadowRoot
        .querySelectorAll(`[data-row="${this.item.ID}"] input[data-id]`)
        .forEach((itemNested) => {
        var _a, _b;
        itemNested.value =
          state.entriesEditing[this.item.ID].values[itemNested.getAttribute('data-id')].defaultValue;
        (_b = (_a = itemNested) === null || _a === void 0 ? void 0 : _a.blur) === null || _b === void 0 ? void 0 : _b.call(_a);
      });
      dropdownButton.classList.remove('!opacity-100');
    };
    const onClick = (e) => isAction
      ? onClickAction()
      : isHistory
        ? onClickHistory()
        : isSite
          ? onClickSite()
          : isPost && window.innerWidth <= 639
            ? e.preventDefault()
            : false;
    const onDblClick = (e) => {
      if (isPost && window.innerWidth <= 639) {
        e.preventDefault();
        state.drawer = Object.assign(Object.assign({}, state.drawer), { active: true, title: `Editing: ${this.item.post_title}`, onSave: () => {
            save(this.item, state.drawer.values);
          }, items: Object.values(this.table)
            .map((itemInner) => {
            return (itemInner.edit && {
              id: itemInner.id,
              value: this.item[itemInner.id],
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
      isPost && !isEdit && { text: 'View Post', href: this.item.guid },
      isPost &&
        !isEdit && { text: 'Edit Post', href: atob(this.item.hrefEdit) },
    ];
    return (h("li", { class: `relative`, "data-entry": true, "data-row": this.item.ID || this.item.guid }, h("a", { "data-focus": !isActionInactive && true, tabindex: isEdit || isActionInactive ? -1 : 0, href: state.test ? '#0' : this.item.href || this.item.guid, class: {
        'sl-px focus-inner focus-white peer relative inline-block flex h-4 h-10 w-full cursor-pointer flex-wrap items-center text-sm font-medium text-slate-900 sm:hover:bg-slate-50 sm:hover:text-blue-600': true,
        'pointer-events-none': (isCurrentSite && isSite) || isEdit || isActionInactive,
        '!text-slate-400': isActionInactive,
      }, onClick: onClick, onDblClick: onDblClick, onMouseDown: (e) => e.preventDefault(), onKeyPress: onKeyPress }, ((isFav && state.active !== 'fav') ||
      (isCurrentSite && state.active === 'site')) && (h("span", { class: `absolute left-px top-1/2 mr-2 flex -translate-y-1/2 sm:left-2 lg:left-4` }, isFav ? (h("span", { class: `inline-block scale-50 text-rose-500 sm:scale-75` }, h(Icon, { icon: IconHeart }))) : (h("span", { class: `inline-block scale-50 text-green-600 sm:scale-100` }, h(Icon, { icon: IconCheck }))))), !isTable && this.item.name), isTable && (h("div", { class: "sl-px sl-grid pointer-events-none absolute top-0 w-full text-slate-700 sm:peer-hover:text-blue-600" }, this.table.map((itemNested) => {
      var _a;
      return (h("div", { class: `relative flex h-4 items-center` }, itemNested.text ? ((_a = itemNested.text) === null || _a === void 0 ? void 0 : _a.call(itemNested, this.item)) : (h("input", { title: this.item[itemNested.id], "data-id": itemNested.id, type: "text", tabindex: itemNested.edit && isEdit ? 0 : -1, disabled: !itemNested.edit && isEdit, class: {
          'focus-none pointer-events-none absolute -top-px left-0 h-[42px] w-4/5 select-text truncate bg-transparent text-sm font-medium leading-none': true,
          // @ts-ignore
          '!pointer-events-auto text-green-600 placeholder-rose-600': isEdit && itemNested.edit,
        }, value: this.item[itemNested.id], placeholder: "No value" }))));
    }))), isDropdown && (h("streamline-dropdown", { class: "absolute top-0 right-4 block hidden h-full w-12 opacity-0 focus-within:opacity-100 hover:opacity-100 peer-hover:opacity-100 sm:right-8 sm:block lg:right-12", type: "entry", items: dropdown }))));
  }
  get el() { return getElement(this); }
};
StreamlineRow.style = tailwindCss;

export { StreamlineRow as streamline_row };
