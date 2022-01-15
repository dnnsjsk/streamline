// eslint-disable-next-line no-unused-vars
import { h } from '@stencil/core';
import { IconDots, IconLink } from '../icons';

export function Dropdown(props) {
  return (
    <button
      onMouseDown={(e) => e.preventDefault()}
      class={`focus-white opacity-0 flex h-full items-center justify-center group hover:opacity-100 focus:opacity-100 focus-within:opacity-100 hover:text-blue-600 focus:text-blue-600 focus-within:text-blue-600 hover:z-50 ${
        props.classOuter ?? ''
      }`}
    >
      <IconDots />
      <div
        class={`z-50 flex flex-col border border-slate-400 shadow-md absolute transform bottom-0 right-0 translate-y-[calc(100%-1px)] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto focus-within:opacity-100 focus-within:pointer-events-auto`}
      >
        {props.items.map((item) => {
          return (
            item?.text && (
              <a
                tabindex={0}
                href={item.href && item.href}
                onMouseDown={(e) => e.preventDefault()}
                class={{
                  'text-left inline-flex items-center w-full bg-white focus-white px-3 py-2 whitespace-nowrap text-sm font-medium text-slate-900 hover:text-blue-600':
                    true,
                  'border-t border-slate-100': item.border,
                }}
                onClick={() => {
                  item.onClick && item.onClick();
                }}
              >
                {item.text}
                {item.href && (
                  <span class="pl-3 ml-auto text-slate-400">
                    <IconLink />
                  </span>
                )}
              </a>
            )
          );
        })}
      </div>
    </button>
  );
}
