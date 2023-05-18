// eslint-disable-next-line no-unused-vars
import { Component, h, Element, Fragment } from '@stencil/core';
import { state } from '../../store/internal';
import capitalizeFirstLetter from '../../utils/string/capitalizeFirstLetter';
import IconChevronDown from '../../../node_modules/@fortawesome/fontawesome-pro/svgs/solid/chevron-down.svg';
import IconChevronUp from '../../../node_modules/@fortawesome/fontawesome-pro/svgs/solid/chevron-up.svg';
import setEntries from '../../utils/set/setEntries';
import Icon from '../../elements/Icon';

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

  private rows({ uid, item, onScroll, first = false, render = true, name }) {
    return (
      <ul
        onScroll={state.active === 'query' ? (e) => onScroll(e) : undefined}
        class={{
          'pb-6 lg:pb-10': state.active === 'query',
          'overflow-x-auto overflow-y-hidden': true,
        }}
      >
        {item.children &&
          Object.values(item.children as unknown).map((itemInner, index) => {
            const id = `${name}-${itemInner.name}`;
            const collapsed = state.collapse.includes(id);

            return itemInner.children ? (
              <li key={`${itemInner.name}-${index}`}>
                <p
                  class={{
                    'sl-px relative': true,
                    'pb-1.5 pt-1.5 text-xs font-medium text-slate-500': !first,
                    'group cursor-pointer py-2.5 text-[13px] font-bold uppercase text-slate-900 hover:text-blue-500':
                      first,
                  }}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    if (!first) return;

                    if (collapsed) {
                      state.collapse = state.collapse.filter(
                        (item) => item !== id
                      );
                    } else {
                      state.collapse = [...state.collapse, id];
                    }
                  }}
                >
                  <span class="relative">
                    {first && (
                      <Fragment>
                        {!collapsed && (
                          <span class="absolute -left-2.5 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-slate-400 group-hover:hidden sm:-left-3.5 sm:h-1.5 sm:w-1.5 lg:-left-4" />
                        )}
                        <span
                          class={{
                            'absolute -left-3 top-1/2 -translate-y-1/2 rounded-full text-slate-400 sm:-left-4 lg:-left-5':
                              true,
                            'hidden group-hover:block': !collapsed,
                          }}
                        >
                          <Icon
                            icon={collapsed ? IconChevronDown : IconChevronUp}
                            class={{
                              'relative h-2 w-2 sm:!h-3 sm:!w-3': true,
                              'top-px': !collapsed,
                              'top-0': collapsed,
                            }}
                          />
                        </span>
                      </Fragment>
                    )}
                    {itemInner.name}
                  </span>
                </p>
                {!collapsed &&
                  render &&
                  itemInner.children &&
                  this.rows({
                    item: itemInner,
                    name,
                    onScroll,
                    render: first,
                    uid,
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
      <div
        class={{
          'space-y-4': true,
          'pb-6 lg:pb-10': state.active !== 'query',
        }}
      >
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
                            'font-slate-500 group grid grid-cols-[1fr,auto] items-center whitespace-nowrap border-b border-slate-200 py-1.5 text-xs font-semibold uppercase hover:border-slate-900 focus:border-blue-500 focus:outline-none':
                              true,
                            'pointer-events-none': !itemInner.sortable,
                          }}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            state.sort = {
                              ...state.sort,
                              [state.action.route]: {
                                value: itemInner.value,
                                direction:
                                  state.sort?.[state.action.route]
                                    ?.direction === 'asc'
                                    ? 'desc'
                                    : 'asc',
                              },
                            };
                            setEntries();
                          }}
                        >
                          {itemInner.label}
                          <svg
                            class={{
                              'mr-2 hidden w-[8px] group-hover:block group-focus:block group-focus:text-blue-600':
                                true,
                              '!block':
                                state.sort?.[state.action.route]?.value ===
                                itemInner.value,
                              'rotate-180':
                                state.sort?.[state.action.route]?.direction ===
                                'desc',
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
              {this.rows({
                first: true,
                item,
                name: item.name,
                onScroll,
                uid,
              })}
            </div>
          );
        })}
      </div>
    );
  }
}
