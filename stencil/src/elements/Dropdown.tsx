// eslint-disable-next-line no-unused-vars
import { h } from '@stencil/core';
import { IconDots } from '../icons';

export function Dropdown(props) {
  return (
    <button
      onMouseDown={(e) => e.preventDefault()}
      class={`focus-white opacity-0 flex h-full items-center justify-center group hover:opacity-100 focus:opacity-100 focus-within:opacity-100 hover:text-blue-500 focus:text-blue-500 focus-within:text-blue-500 hover:z-50 ${
        props.classOuter ?? ''
      }`}
    >
      <IconDots />
      <div
        class={`z-50 border border-slate-200 shadow absolute transform bottom-0 right-0 translate-y-[calc(100%-1px)] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto focus-within:opacity-100 focus-within:pointer-events-auto`}
      >
        {props.items.map((item) => {
          return (
            item?.text && (
              <button
                onMouseDown={(e) => e.preventDefault()}
                class={`text-left w-full bg-white focus-white px-4 py-2 whitespace-nowrap text-sm font-medium text-slate-900 hover:text-blue-500`}
                onClick={() => {
                  item.onClick();
                }}
              >
                {item.text}
              </button>
            )
          );
        })}
      </div>
    </button>
  );
}
