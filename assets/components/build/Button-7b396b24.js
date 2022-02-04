import { h } from './index-68615357.js';

// eslint-disable-next-line no-unused-vars
function Button(props) {
  return (h("button", Object.assign({}, props, { class: {
      [props.class]: props.class,
      'focus-out inline-flex items-center justify-center font-semibold text-sm': true,
      'px-3 py-2 sm:px-4': props.type === 'primary' || props.type === 'secondary',
      'bg-blue-600 text-white border-blue-600 text-white hover:bg-blue-700 hover:border-blue-700': props.type === 'primary',
      'bg-slate-200 text-slate-600 border-slate-200 hover:bg-slate-900 hover:border-slate-900 hover:text-white': props.type === 'secondary',
      'px-2 py-1 bg-white border border-slate-200 text-slate-600 hover:text-slate-50 hover:bg-slate-900 hover:border-slate-900 sm:px-3 sm:py-1.5': props.type === 'tertiary',
      'opacity-50 pointer-events-none': props.disabled,
      'border border-slate-200 text-slate-600 hover:text-slate-50 hover:bg-slate-900 hover:border-slate-900 !w-5 !h-5 absolute !p-0 mr-2': props.type === 'back',
    }, onMouseDown: (e) => e.preventDefault() }),
    props.icon && props.icon,
    props.text && props.text));
}

export { Button as B };
