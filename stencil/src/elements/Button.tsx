// eslint-disable-next-line no-unused-vars
import { h } from '@stencil/core';
import { IconTimes } from '../icons';

export function Button(props) {
  return (
    <button
      {...props}
      class={{
        'focus-out inline-flex items-center justify-center font-semibold text-xs':
          true,
        'px-3 py-2 bg-blue-600 border-blue-600 text-white hover:bg-blue-700 hover:border-blue-700 sm:px-4':
          props.primary,
        'px-2 py-1 bg-white border border-slate-200 text-slate-600 hover:text-slate-50 hover:bg-slate-900 hover:border-slate-900 sm:px-3 sm:py-1.5':
          !props.primary,
        [props.classOuter]: props.classOuter,
        'opacity-50 pointer-events-none': props.invalid,
        '!w-5 !h-5 absolute !p-0 mr-2': props.back,
      }}
      onMouseDown={(e) => e.preventDefault()}
    >
      {props.text === 'Search' && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="fill-current w-2 rotate-90 ml-1 mr-2 origin-right-center"
          viewBox="0 0 320 512"
        >
          <path
            fill="currentColor"
            d="M296.64 412.326l-96.16 96.16c-4.686 4.687-12.285 4.686-16.97 0L87.354 412.33c-7.536-7.536-2.198-20.484 8.485-20.485l68.161-.002V56H64a11.996 11.996 0 0 1-8.485-3.515l-32-32C15.955 12.926 21.309 0 32 0h164c13.255 0 24 10.745 24 24v367.842l68.154-.001c10.626-.001 16.066 12.905 8.486 20.485z"
          />
        </svg>
      )}
      {props.back ? <IconTimes /> : props.text}
    </button>
  );
}
