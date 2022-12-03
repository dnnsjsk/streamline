// eslint-disable-next-line no-unused-vars
import { h } from '@stencil/core';
import { state } from '../store/internal';

export const Keys = ({ keys }) => {
  return (
    <div class="flex space-x-1.5">
      {keys.map((item) => {
        return (
          <div
            style={{ boxShadow: '0 2px 0 0 #E2E8F0' }}
            class="key leading-0 relative -top-px h-[max-content] rounded border border-slate-300 bg-slate-50 px-1.5 py-0.5 text-[11px] font-medium uppercase text-slate-800"
          >
            <kbd class="!font-sans !text-[11px]">
              {state.isMac && item === 'Meta'
                ? '⌘'
                : !state.isMac && item === 'Meta'
                ? 'CTRL'
                : item}
            </kbd>
          </div>
        );
      })}
    </div>
  );
};
