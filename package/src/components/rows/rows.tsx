// eslint-disable-next-line no-unused-vars
import { Component, h, Element } from '@stencil/core';
import { state } from '../../store/internal';
import { capitalizeFirstLetter } from '../../utils/string/capitalizeFirstLetter';
import { sort } from '../../utils/sort/sort';
import { debounce } from 'lodash-es';

@Component({
  tag: 'streamline-rows',
  styleUrl: '../../css/tailwind.scss',
  shadow: true,
})
export class StreamlineRows {
  // eslint-disable-next-line no-undef
  @Element() el: HTMLStreamlineRowsElement;

  componentWillLoad() {
    window.addEventListener(
      'resize',
      debounce(() => {
        if (window.innerWidth >= 640 && state.drawer.active) {
          state.drawer = {
            ...state.drawer,
            active: false,
          };
        }
        if (
          window.innerWidth <= 639 &&
          this.el.shadowRoot.querySelector('streamline-row[is-edit]')
        ) {
          this.el.shadowRoot
            .querySelectorAll('streamline-row')
            .forEach((item) => {
              item.removeAttribute('is-edit');
            });
        }
      }, 500)
    );
  }

  private getArr = (type) => {
    return (
      (state[`entries${capitalizeFirstLetter(type)}Active`]?.length >= 1 &&
        (state[`entries${capitalizeFirstLetter(type)}Active`] ||
          state[`entries${capitalizeFirstLetter(type)}`])) ||
      []
    );
  };

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

          const table =
            state.active === 'site'
              ? [
                  {
                    id: 'domain',
                    name: 'Domain',
                    sort: true,
                  },
                  { id: 'path', name: 'Path', sort: true },
                  { id: 'siteId', name: 'ID', sort: true },
                ]
              : item.type === 'post'
              ? [
                  {
                    id: 'post_status',
                    text: (itemInner) => {
                      const isPublish = itemInner.post_status === 'publish';
                      const isFuture = itemInner.post_status === 'future';
                      const isDraft = itemInner.post_status === 'draft';
                      const isPending = itemInner.post_status === 'pending';
                      const isPrivate = itemInner.post_status === 'private';
                      return (
                        <span
                          class={{
                            'rounded-md px-2 py-1 text-xs font-semibold uppercase':
                              true,
                            'bg-green-100 text-green-600': isPublish,
                            'bg-purple-100 text-purple-600': isFuture,
                            'bg-yellow-100 text-yellow-600': isDraft,
                            'bg-lime-100 text-lime-600': isPending,
                            'bg-blue-100 text-blue-600': isPrivate,
                            'bg-slate-100 text-slate-600':
                              !isPublish &&
                              !isFuture &&
                              !isDraft &&
                              !isPending &&
                              !isPrivate,
                          }}
                        >
                          {itemInner.post_status}
                        </span>
                      );
                    },
                    name: 'Status',
                    sort: true,
                  },
                  { id: 'post_title', name: 'Title', edit: true, sort: true },
                  { id: 'post_name', name: 'Slug', edit: true, sort: true },
                  { id: 'post_type', name: 'Post type', sort: true },
                ]
              : [];

          return (
            <div>
              <streamline-header item={item}></streamline-header>
              {(item.type === 'post' || item.type === 'site') && (
                <div
                  data-uid={uid}
                  class={`scrollbar-none sticky top-[40px] z-10 overflow-x-auto bg-white`}
                >
                  <div class="sl-mx sl-grid border-t border-slate-200">
                    {table.map((itemInner) => {
                      const sorter = () => {
                        sort(
                          {
                            ...itemInner,
                            type: item.type,
                          },
                          state?.sort?.[item.type]?.id !== itemInner.id
                            ? 'ascending'
                            : state?.sort?.[item.type]?.direction ===
                              'ascending'
                            ? 'descending'
                            : 'ascending'
                        );
                      };

                      return (
                        <div
                          tabindex="0"
                          role="button"
                          key={itemInner.id}
                          class={{
                            'sl-border-b font-slate-500 group grid grid-cols-[1fr,auto] items-center whitespace-nowrap py-1.5 text-xs font-semibold uppercase hover:border-slate-900 focus:border-blue-500 focus:outline-none':
                              true,
                            'pointer-events-none': !itemInner.sort,
                          }}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={sorter}
                          onKeyDown={(e) => {
                            if (
                              e.target === this.el.shadowRoot.activeElement &&
                              e.key === 'Enter'
                            ) {
                              sorter();
                            }
                          }}
                        >
                          {itemInner.name}
                          <svg
                            class={{
                              'mr-2 hidden w-[8px] group-hover:block group-focus:block group-focus:text-blue-600':
                                true,
                              '!block':
                                state?.sort?.[item.type]?.id === itemInner.id,
                              'rotate-180':
                                state?.sort?.[item.type]?.direction ===
                                'descending',
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
              <ul
                data-uid={uid}
                onScroll={
                  item.type === 'post' || item.type === 'site'
                    ? (e) => onScroll(e)
                    : undefined
                }
                class="overflow-x-auto overflow-y-hidden"
              >
                {item.children &&
                  Object.values(item.children as unknown).map((itemInner) => {
                    return itemInner.children ? (
                      <li key={itemInner.name}>
                        <h2 class="sl-mx pb-2 pt-4 text-sm font-medium text-slate-500">
                          {itemInner.name}
                        </h2>
                        <ul>
                          {Object.values(itemInner.children as unknown).map(
                            (itemSub) => {
                              return (
                                <streamline-row item={itemSub} table={table} />
                              );
                            }
                          )}
                        </ul>
                      </li>
                    ) : (
                      <streamline-row item={itemInner} table={table} />
                    );
                  })}
              </ul>
            </div>
          );
        })}
      </div>
    );
  }
}
