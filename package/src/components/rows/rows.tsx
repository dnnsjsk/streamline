// eslint-disable-next-line no-unused-vars
import { Component, h, Element } from '@stencil/core';
import { state } from '../../store/internal';
import capitalizeFirstLetter from '../../utils/string/capitalizeFirstLetter';

@Component({
  tag: 'streamline-rows',
  styleUrl: '../../css/tailwind.scss',
  shadow: true,
})
// eslint-disable-next-line no-unused-vars
export class StreamlineRows {
  // eslint-disable-next-line no-undef
  @Element() el: HTMLStreamlineRowsElement;

  private getArr = (type) => {
    return type === 'entries'
      ? (Object.values(state.entriesActive)?.length >= 1 &&
          Object.values(state.entriesActive)) ||
          Object.values(state.entries) ||
          []
      : (state[`entries${capitalizeFirstLetter(type)}Active`]?.length >= 1 &&
          (state[`entries${capitalizeFirstLetter(type)}Active`] ||
            state[`entries${capitalizeFirstLetter(type)}`])) ||
          [];
  };

  private rows({ uid, item, onScroll, first = false, render = true }) {
    return (
      <ul
        onScroll={
          item.type === 'post' || item.type === 'site'
            ? (e) => onScroll(e)
            : undefined
        }
        class="overflow-x-auto overflow-y-hidden"
      >
        {item.children &&
          Object.values(item.children as unknown).map((itemInner, index) => {
            return itemInner.children ? (
              <li key={`${itemInner.name}-${index}`}>
                <p
                  class={{
                    'sl-mx relative pb-1': true,
                    'pt-3 text-xs font-medium text-slate-500': !first,
                    'pt-4 text-[13px] font-semibold uppercase text-slate-900':
                      first,
                  }}
                >
                  <span class="relative">
                    {first && (
                      <span class="absolute top-1/2 -left-3 h-1 w-1 -translate-y-1/2 rounded-full bg-slate-400 sm:-left-3.5 sm:h-1.5 sm:w-1.5 lg:-left-4" />
                    )}
                    {itemInner.name}
                  </span>
                </p>
                {render &&
                  itemInner.children &&
                  this.rows({
                    uid,
                    item: itemInner,
                    onScroll,
                    render: first,
                  })}
              </li>
            ) : (
              <streamline-row item={itemInner} />
            );
          })}
      </ul>
    );
  }

  render() {
    return (
      <div class="space-y-4">
        {this.getArr(state.active).map((item) => {
          const onScroll = (e) => {
            this.el.shadowRoot.querySelector(
              `div[data-uid="${uid}"]`
            ).scrollLeft = Math.round(e.target.scrollLeft);
          };

          const uid =
            Date.now().toString(36) + Math.random().toString(36).substr(2);

          return (
            <div>
              <streamline-header item={item}></streamline-header>
              {state.active === 'query' && state.action.table?.length >= 2 && (
                <div
                  data-uid={uid}
                  class="scrollbar-none sticky top-[39px] z-10 mt-[-2px] overflow-x-auto bg-white"
                >
                  <div class="sl-mx sl-grid border-t border-slate-200">
                    {state.action.table.map((itemInner) => {
                      return (
                        <div
                          tabindex="0"
                          role="button"
                          key={itemInner.value}
                          class={{
                            'sl-border-b font-slate-500 group grid grid-cols-[1fr,auto] items-center whitespace-nowrap py-1.5 text-xs font-semibold uppercase hover:border-slate-900 focus:border-blue-500 focus:outline-none':
                              true,
                            'pointer-events-none': !itemInner.sort,
                          }}
                          onMouseDown={(e) => e.preventDefault()}
                        >
                          {itemInner.label}
                          <svg
                            class={{
                              'mr-2 hidden w-[8px] group-hover:block group-focus:block group-focus:text-blue-600':
                                true,
                              '!block': true,
                              'rotate-180': false,
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            role="img"
                            viewBox="0 0 320 512"
                          >
                            <path
                              fill="currentColor"
                              d="M151.5 347.8L3.5 201c-4.7-4.7-4.7-12.3 0-17l19.8-19.8c4.7-4.7 12.3-4.7 17 0L160 282.7l119.7-118.5c4.7-4.7 12.3-4.7 17 0l19.8 19.8c4.7 4.7 4.7 12.3 0 17l-148 146.8c-4.7 4.7-12.3 4.7-17 0z"
                            />
                          </svg>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {this.rows({ uid, item, onScroll, first: true })}
            </div>
          );
        })}
      </div>
    );
  }
}
