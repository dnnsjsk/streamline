// eslint-disable-next-line no-unused-vars
import { Component, h } from '@stencil/core';
import { state } from '../../store/internal';

@Component({
  tag: 'streamline-bottom-bar',
  styleUrl: '../../css/tailwind.scss',
  shadow: true,
})
export class StreamlineBottomBar {
  render() {
    const isMultisite = state?.data?.network;
    const isBottomBar =
      (state.active === 'post' && state.entriesPostQuery !== '') ||
      (state.active === 'site' && state.entriesSiteQuery !== '');

    return (
      <div
        class={`flex items-center h-full w-full border-t border-slate-200 bg-slate-50 bg-slate-50 px-4 text-slate-900`}
      >
        <span class={`whitespace-no-wrap flex`}>
          <span class={`text-[11px]`}>
            {isMultisite && (
              <span>
                <span class={`font-semibold`}>Current site: </span>
                <span>{state.currentSite.path} ∙ </span>
                <span class={`font-semibold`}>ID: </span>
                <span>{state.currentSite.id}</span>
              </span>
            )}
            {isBottomBar && (
              <span id="amount">
                {isMultisite ? ' ∙ ' : ''}
                {state.infoBar.amount}
              </span>
            )}
            {isBottomBar && <span id="pages"> ∙ {state.infoBar.pages}</span>}
          </span>
        </span>
      </div>
    );
  }
}
