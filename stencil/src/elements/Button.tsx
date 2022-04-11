// eslint-disable-next-line no-unused-vars
import { h } from '@stencil/core';

export const Button = (props) => {
  return (
    <button
      {...props}
      class={{
        [props.class]: props.class,
        'focus-out inline-flex items-center rounded-md justify-center font-semibold text-sm':
          true,
        'px-3 py-2 sm:py-2.5 sm:px-4':
          props.type === 'primary' ||
          props.type === 'secondary' ||
          props.type === 'transparent',
        'bg-blue-600 text-white border-blue-600 text-white hover:bg-blue-700 hover:border-blue-700':
          props.type === 'primary',
        'bg-slate-200 text-slate-600 border-slate-200 hover:bg-slate-900 hover:border-slate-900 hover:text-white':
          props.type === 'secondary',
        'px-2 py-1 bg-white border border-slate-200 text-slate-600 hover:text-slate-50 hover:bg-slate-900 hover:border-slate-900 sm:px-3 sm:py-1.5':
          props.type === 'tertiary',
        'opacity-50 pointer-events-none': props.disabled,
        'border border-slate-200 text-slate-600 hover:text-slate-50 hover:bg-slate-900 hover:border-slate-900 !w-6 !h-6 absolute !p-0 mr-2':
          props.type === 'back',
        'text-slate-600 hover:bg-slate-900 hover:border-slate-900 hover:text-white':
          props.type === 'transparent',
      }}
      onMouseDown={(e) => e.preventDefault()}
    >
      {props.icon && props.icon}
      {props.text && props.text}
    </button>
  );
};
