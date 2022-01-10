import { s as state } from './internal-82f6dfdb.js';
import { c as capitalizeFirstLetter, b as setSearchPlaceholder, r as resetView, s as state$1, b8 as IconTimes } from './index-a607d389.js';
import { h } from './index-87bae8c2.js';

function getQuery(obj) {
  state[`entries${capitalizeFirstLetter(obj.type)}`] = [
    {
      children: obj.children,
      isMultisite: obj.isMultisite,
      path: obj.path,
      queryValue: obj.search,
      siteId: state.data.siteId,
      type: obj.type,
      network: obj.network,
    },
  ];
  if (obj.type === 'post') {
    state.entriesPostCurrentPath = obj.path;
  }
  // console.log(state[`entries${capitalizeFirstLetter(obj.type)}`]);
}

function doQuery(obj) {
  state.isLoading = true;
  fetch(
  // @ts-ignore
  // eslint-disable-next-line no-undef
  `${streamline.rest}streamline/v1/${obj.callback}?siteId=${state.currentSite.id}&userId=${state.data.userId}&value=${obj.search}`, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      // @ts-ignore
      // eslint-disable-next-line no-undef
      'X-WP-Nonce': streamline.nonceRest,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
    getQuery({
      children: data.children,
      isMultisite: data.isMultisite,
      path: state.currentSite.path,
      search: obj.search,
      type: obj.type,
      queryValue: obj.search,
    });
    setSearchPlaceholder();
    state[`historySearches${capitalizeFirstLetter(obj.type)}`] = [
      obj.search,
      ...state[`historySearches${capitalizeFirstLetter(obj.type)}`],
    ];
    if (obj.callback === 'posts' || obj.callback === 'sites') {
      resetView();
    }
    state.isLoading = false;
    state[`entries${capitalizeFirstLetter(state$1.active)}IsQuery`] = true;
  });
}

// eslint-disable-next-line no-unused-vars
function Button(props) {
  return (h("button", Object.assign({}, props, { class: {
      'focus-out inline-flex items-center justify-center font-semibold text-xs': true,
      'px-3 py-2 bg-blue-500 border-blue-500 text-white hover:bg-blue-600 hover:border-blue-600 sm:px-4': props.primary,
      'px-2 py-1 bg-white border border-slate-200 text-slate-600 hover:text-slate-50 hover:bg-slate-900 hover:border-slate-900 sm:px-3 sm:py-1.5': !props.primary,
      [props.classOuter]: props.classOuter,
      'opacity-50 pointer-events-none': props.invalid,
      '!w-6 !h-6 !p-0 mr-2': props.back,
    }, onMouseDown: (e) => e.preventDefault() }),
    props.text === 'Search' && (h("svg", { xmlns: "http://www.w3.org/2000/svg", class: "fill-current w-2 rotate-90 ml-1 mr-2 origin-right-center", viewBox: "0 0 320 512" },
      h("path", { fill: "currentColor", d: "M296.64 412.326l-96.16 96.16c-4.686 4.687-12.285 4.686-16.97 0L87.354 412.33c-7.536-7.536-2.198-20.484 8.485-20.485l68.161-.002V56H64a11.996 11.996 0 0 1-8.485-3.515l-32-32C15.955 12.926 21.309 0 32 0h164c13.255 0 24 10.745 24 24v367.842l68.154-.001c10.626-.001 16.066 12.905 8.486 20.485z" }))),
    props.back ? h(IconTimes, null) : props.text));
}

export { Button as B, doQuery as d };
