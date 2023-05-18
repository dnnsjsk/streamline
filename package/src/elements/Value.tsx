// eslint-disable-next-line no-unused-vars
import { h } from '@stencil/core';
import { state } from '../store/internal';

export default function Value({ replace = '' }, children) {
  return (
    <span
      innerHTML={children[0].replace(
        '{value}',
        `<span class="italic !text-slate-500">${
          replace || state.searchValue
        }</span>`
      )}
    />
  );
}
