// eslint-disable-next-line no-unused-vars
import { Component, h, Host } from '@stencil/core';
import { state } from '../../store/internal';
import { capitalizeFirstLetter } from '../../utils/string/capitalizeFirstLetter';

@Component({
  tag: 'streamline-bottom-bar',
  styleUrl: '../../css/tailwind.scss',
  shadow: true,
})
export class StreamlineBottomBar {
  private getItems = () => {
    return [
      {
        condition: state?.data?.network && !state.isFront,
        text: 'Site',
        value: state.currentSite.path,
      },
      {
        condition: true,
        text: 'Current',
        value:
          state.active === 'fav'
            ? 'Favourites'
            : capitalizeFirstLetter(state.active),
      },
      {
        condition: true,
        text: 'Entries',
        value: () => {
          let amount = 0;

          state[`entries${capitalizeFirstLetter(state.active)}Active`].forEach(
            (item) => {
              if (
                item.type === 'post' ||
                item.type === 'site' ||
                item.type === 'action'
              ) {
                amount += Object.values(item.children).length;
              }
              if (
                item.type === 'menu' ||
                item.type === 'networkMenu' ||
                item.type === 'settings'
              ) {
                Object.values(item.children as unknown).forEach((itemInner) => {
                  amount += Object.values(itemInner.children).length;
                });
              }
            }
          );

          return amount;
        },
      },
      {
        condition:
          state.active !== 'search' &&
          state.active !== 'fav' &&
          state.active !== 'settings',
        text: 'Pages',
        value: `${state.infoBar.pages.current}/${state.infoBar.pages.amount}`,
      },
    ];
  };

  render() {
    // const isMultisite = state?.data?.network;

    return (
      <Host>
        <div
          class={`flex h-full w-full items-center border-t border-slate-200 bg-slate-50 px-4`}
        >
          <span
            class={`whitespace-no-wrap relative -top-px flex items-center text-[11px]`}
          >
            {this.getItems()
              .filter((e) => e.condition)
              .map((item, index) => {
                return (
                  <span class="font-medium text-slate-500">
                    {item.text}:{' '}
                    <span class="font-semibold text-slate-700">
                      {typeof item.value === 'string'
                        ? item.value
                        : item.value()}
                    </span>
                    {index + 1 !==
                      this.getItems().filter((e) => e.condition).length && (
                      <span class="mx-1.5">•</span>
                    )}
                  </span>
                );
              })}
          </span>
        </div>
      </Host>
    );
  }
}
