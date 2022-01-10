import { s as state } from './internal-82f6dfdb.js';
import { h } from './index-87bae8c2.js';
import { I as IconDots } from './index-a607d389.js';

function getMetaKey(e) {
  return state.isMac ? e.metaKey : e.ctrlKey;
}

// eslint-disable-next-line no-unused-vars
function Dropdown(props) {
  var _a;
  return (h("button", { class: `focus-white opacity-0 flex h-full items-center justify-center group hover:opacity-100 focus:opacity-100 focus-within:opacity-100 hover:text-blue-500 focus:text-blue-500 focus-within:text-blue-500 hover:z-50 ${(_a = props.classOuter) !== null && _a !== void 0 ? _a : ''}` },
    h(IconDots, null),
    h("div", { class: `border border-slate-200 shadow-sm absolute transform bottom-0 right-0 translate-y-[calc(100%-1px)] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto focus-within:opacity-100 focus-within:pointer-events-auto` }, props.items.map((item) => {
      return (h("button", { onMouseDown: (e) => e.preventDefault(), class: `bg-white focus px-4 py-2 whitespace-nowrap text-sm font-medium text-slate-900 hover:text-blue-500`, onClick: () => {
          item.onClick();
        } }, item.text));
    }))));
}

export { Dropdown as D, getMetaKey as g };
