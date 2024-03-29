// eslint-disable-next-line no-unused-vars
import { h } from '@stencil/core';

export default function Button(props) {
  return (
    <button
      {...props}
      class={{
        [props.class]: props.class,
        'focus inline-flex items-center justify-center rounded-md text-xs font-semibold':
          true,
        'px-3 py-1.5':
          props.type === 'primary' ||
          props.type === 'secondary' ||
          props.type === 'transparent',
        'border-blue-600 bg-blue-600 text-white text-white hover:border-blue-700 hover:bg-blue-700':
          props.type === 'primary',
        'border-slate-200 bg-slate-200 text-slate-600 hover:border-slate-900 hover:bg-slate-900 hover:text-white':
          props.type === 'secondary',
        'border border-slate-200 bg-white px-2 py-1 text-slate-600 hover:border-slate-900 hover:bg-slate-900 hover:text-slate-50 sm:px-3 sm:py-1.5':
          props.type === 'tertiary',
        'pointer-events-none opacity-50': props.disabled,
        'absolute mr-2 !h-6 !w-6 border border-slate-200 !p-0 text-slate-600 hover:border-slate-900 hover:bg-slate-900 hover:text-slate-50':
          props.type === 'back',
        'text-slate-600 hover:border-slate-900 hover:bg-slate-900 hover:text-white':
          props.type === 'transparent',
      }}
      onMouseDown={(e) => e.preventDefault()}
    >
      {props.icon && props.icon}
      {props.text && props.text}
    </button>
  );
}
