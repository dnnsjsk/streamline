// eslint-disable-next-line no-unused-vars
import { h } from '@stencil/core';
import { Heart } from './Heart';

export const Fav = (props) => {
  return (
    <span
      class={`${props.class} rounded-full w-4 h-4 text-red-500 pointer-events-none bg-white flex items-center justify-center border border-slate-200`}
    >
      <span class={`h-full w-full flex items-center justify-center`}>
        <Heart />
      </span>
    </span>
  );
};
