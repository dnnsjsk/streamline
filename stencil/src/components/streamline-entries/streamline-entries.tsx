// eslint-disable-next-line no-unused-vars
import { Component, h, Element } from '@stencil/core';
import { state } from '../../store/internal';
import { stateLocal } from '../../store/local';
import { setEntries } from '../../utils/setEntries';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';
import { Loader } from '../../elements/Loader';
import {
  IconCheck,
  IconHeart,
  IconMenu,
  IconNetwork,
  IconPost,
} from '../../icons';
import { fetchAjax } from '../../utils/fetchAjax';
import { getMenus } from '../../utils/getMenus';
import { getMenu } from '../../utils/getMenu';
import { getMetaKey } from '../../utils/getMetaKey';
import { doQuery } from '../../utils/doQuery';
import { someDeep } from 'deepdash-es/standalone';
import { setFavourite } from '../../utils/setFavourite';
import { Dropdown } from '../../elements/Dropdown';
import { Button } from '../../elements/Button';
import { setSearchPlaceholder } from '../../utils/setSearchPlaceholder';

/**
 * Entries.
 */
@Component({
  tag: 'streamline-entries',
  shadow: true,
  styleUrl: 'streamline-entries.scss',
})
export class StreamlineEntries {
  private border = 'border-t border-slate-100 first-of-type:border-none';
  private borderB = 'border-b border-slate-200 border-dotted';
  private h2 = 'text-sm text-slate-900 font-medium sm:text-base';
  private px = 'px-3 sm:px-6 lg:px-8';
  private mx = 'mx-3 sm:mx-6 lg:mx-8';

  // eslint-disable-next-line no-undef
  @Element() el: HTMLStreamlineEntriesElement;

  connectedCallback() {
    getMenus();
    setEntries();

    document.addEventListener('keydown', (e) => {
      if (state.visible) {
        if (
          e.key === 'ArrowDown' &&
          !getMetaKey(e) &&
          state.entriesSettingsLoad.keyNavigation.default
        ) {
          e.preventDefault();
          this.cycleEntries('down');
        }
        if (
          e.key === 'ArrowUp' &&
          !getMetaKey(e) &&
          state.entriesSettingsLoad.keyNavigation.default
        ) {
          e.preventDefault();
          this.cycleEntries('up');
        }
      }
    });
  }

  private cycleEntries = (mode) => {
    const focusEls = this.el.shadowRoot.querySelectorAll('[data-focus]');
    const focusElsLength = focusEls.length;

    if (mode === 'down') {
      state.focusIndex++;
      if (state.focusIndex === focusElsLength) {
        state.focusIndex = 0;
      }
    } else {
      if (state.focusIndex === 0 || state.focusIndex === -1) {
        state.focusIndex = focusElsLength - 1;
      } else {
        state.focusIndex--;
      }
    }

    (focusEls[state.focusIndex] as HTMLElement)?.focus();
  };

  private getHeader(item, test = false) {
    const isQuery = item.type === 'post' || item.type === 'site';
    const isQueryMode =
      stateLocal.active === 'site' || stateLocal.active === 'post';
    const isMenu = item.type === 'menu' || item.type === 'networkMenu';
    const isDotMenu = state.isHelp;
    const isNotDotMenu = !state.isHelp;

    let menuNumber = 0;
    if (isMenu) {
      Object.values(item.children as unknown).forEach((itemNested) => {
        Object.values(itemNested.children as unknown).forEach(() => {
          menuNumber++;
        });
      });
    }

    const results = `Showing ${
      isQuery ? Object.values(item.children).length : isMenu ? menuNumber : '0'
    } ${
      (isQuery && Object.values(item.children).length === 1) ||
      (isMenu && menuNumber === 1)
        ? `result`
        : `results`
    }`;

    const path =
      item.isMultisite && !state.test && stateLocal.active !== 'site'
        ? ` (subsite: ${item.path})`
        : '';

    return (
      <div
        class={`${
          stateLocal.active === 'settings'
            ? 'flex-row items-center justify-between'
            : 'flex-col items-start sm:justify-between'
        } ${test ? '!mb-0' : ''} ${
          this.px
        } relative min-h-[60px] pt-5 flex flex-wrap mb-1 pb-1.5 flex sticky -top-2 bg-white z-10 border-b border-slate-300 sm:min-h-[75px] sm:mb-4 sm:flex-row sm:items-center sm:pt-6 sm:pb-2 sm:-top-2`}
      >
        <div class={`absolute -left-full top-0 h-full bg-white z-[-1]`} />
        <div class={`flex items-center flex-row`}>
          {stateLocal.active === 'fav' &&
            state.entriesFavActive[0].children.length !== 0 &&
            !state.isHelp && (
              <div
                class={`flex-shrink-0 text-slate-400 flex items-center justify-center mr-3`}
              >
                {item.type === 'menu' && <IconMenu />}
                {item.type === 'networkMenu' && <IconNetwork />}
                {item.type === 'post' && <IconPost />}
              </div>
            )}
          {isQueryMode &&
            state[
              `entries${capitalizeFirstLetter(stateLocal.active)}IsQuery`
            ] &&
            state[`historySearches${capitalizeFirstLetter(stateLocal.active)}`]
              ?.length > 0 &&
            !state.isHelp && (
              <Button
                back
                onClick={() => {
                  state[
                    `entries${capitalizeFirstLetter(stateLocal.active)}IsQuery`
                  ] = false;
                  state[`entries${capitalizeFirstLetter(stateLocal.active)}`] =
                    [];
                  state[
                    `entries${capitalizeFirstLetter(stateLocal.active)}Active`
                  ] = [];
                  setSearchPlaceholder();
                }}
              />
            )}
          <h1
            class={`text-slate-900 font-medium text-lg mr-6 whitespace-nowrap sm:text-xl`}
            innerHTML={`${
              state.isSlash || isDotMenu
                ? item.title
                : item.type === 'networkMenu'
                ? 'Network admin'
                : isMenu
                ? 'Admin menu' + path
                : (stateLocal.active === 'post' ||
                    stateLocal.active === 'site') &&
                  state[
                    `entries${stateLocal.active === 'post' ? 'Post' : 'Site'}`
                  ][0]?.queryValue
                ? `${capitalizeFirstLetter(stateLocal.active)}s for: ` +
                  `<span class="text-slate-400 italic">${
                    state[
                      `entries${stateLocal.active === 'post' ? 'Post' : 'Site'}`
                    ][0]?.queryValue
                  }</span>` +
                  path
                : isQuery && stateLocal.active === 'fav'
                ? `${capitalizeFirstLetter(item.type)}s` + path
                : isQueryMode &&
                  !state[
                    `entries${capitalizeFirstLetter(stateLocal.active)}IsQuery`
                  ] &&
                  state[
                    `historySearches${capitalizeFirstLetter(stateLocal.active)}`
                  ]?.length === 0
                ? `No query, search for a ${stateLocal.active} in the search bar`
                : isQueryMode &&
                  !state[
                    `entries${capitalizeFirstLetter(stateLocal.active)}IsQuery`
                  ] &&
                  state[
                    `historySearches${capitalizeFirstLetter(stateLocal.active)}`
                  ]?.length > 0
                ? `Search history`
                : stateLocal.active === 'settings'
                ? 'Settings'
                : 'No results'
            }`}
          />
        </div>
        <div class={`flex flex-wrap space-x-4 divide-x`}>
          {Object.values([
            {
              type: 'text',
              text: results,
              condition: stateLocal.active !== 'settings' && isNotDotMenu,
            },
            {
              type: 'button',
              text: 'Save',
              condition: stateLocal.active === 'settings' && isNotDotMenu,
              onClick: () => {
                if (!state.test) {
                  fetchAjax({
                    type: 'settings',
                    query: state.entriesSettingsSave,
                    callback: () => {
                      // @ts-ignore
                      state.entriesSettingsLoad = state.entriesSettingsSave;
                    },
                  });
                } else {
                  // @ts-ignore
                  state.entriesSettingsLoad = state.entriesSettingsSave;
                }
              },
            },
          ]).map((itemInner, itemIndex) => {
            return itemInner.condition && itemInner.type === 'text' ? (
              <span
                class={`results-amount text-xs mt-1.5 sm:my-1.5 font-medium text-slate-700 sm:text-sm ${
                  itemIndex === 0 ? '' : 'pl-4'
                }`}
              >
                {itemInner.text}
              </span>
            ) : (
              itemInner.condition && itemInner.type === 'button' && (
                <Button
                  onClick={
                    state.entriesSettingsHaveChanged && itemInner.onClick
                  }
                  tabindex={state.entriesSettingsHaveChanged ? 0 : -1}
                  invalid={!state.entriesSettingsHaveChanged}
                  primary
                  text={itemInner.text}
                />
              )
            );
          })}
        </div>
      </div>
    );
  }

  private getArr = (arr = [], type) => {
    return (
      (arr.length >= 1 && arr) ||
      (state[`entries${capitalizeFirstLetter(type)}Active`]?.length >= 1 &&
        (state[`entries${capitalizeFirstLetter(type)}Active`] ||
          state[`entries${capitalizeFirstLetter(type)}`]))
    );
  };

  private row = (item) => {
    let isFav = false;
    const isDropdown = item.type !== 'history' && !item.blog_id;
    const isHistory = item.type === 'history';
    const isSites = item.blog_id;
    const isCurrentSite =
      parseInt(item.siteId) === parseInt(state.currentSite.id);
    const isTable = isSites || item.type === 'post';
    const table = isSites
      ? [
          <span class="flex items-center">
            {isCurrentSite && (
              <span class={`text-green-500 mr-2`}>
                <IconCheck />
              </span>
            )}
            {item.domain}
          </span>,
          item.path,
          item.blog_id,
        ]
      : [];

    const checkIfFavourite = () => {
      isFav =
        item.type === 'history'
          ? false
          : someDeep(
              state.entriesFav,
              (o) => {
                return o?.path === item.path && o?.siteId === item.siteId;
              },
              { childrenPath: ['children'] }
            );
    };

    checkIfFavourite();

    const setFav = () =>
      setFavourite({
        favourite: isFav,
        callback: checkIfFavourite,
        type: stateLocal.active,
        filter: (o) => {
          return o.href === item.href && o.adminUrl === item.adminUrl;
        },
        path: (o) => {
          return o.type === item.type && o.siteId === item.siteId;
        },
        pathFav: (o) => {
          return o.path === item.path && o.siteId === item.siteId;
        },
      });

    const onClickHistory = () => {
      doQuery({
        callback: `${stateLocal.active}s`,
        type: stateLocal.active,
        search: item.name,
      });
    };

    const onClickSites = () => {
      state.currentSite = {
        path: item.path,
        id: item.siteId,
      };

      state.entriesPost = [];
      state.entriesPostActive = [];

      getMenu({
        adminUrl: item.adminUrl,
        fetch: true,
        siteId: item.siteId,
        path: item.path,
      });
    };

    const onClick = () =>
      isHistory ? onClickHistory() : isSites ? onClickSites() : false;

    return (
      <li class={`relative focus-within:bg-slate-50`}>
        <a
          tabindex={0}
          data-focus={true}
          href={item.href && item.href}
          class={{
            [this.px]: true,
            'cursor-pointer focus-white flex items-center flex-wrap cursor-pointer w-full inline-block py-3 text-sm font-medium text-slate-600 peer hover:text-blue-500 hover:bg-slate-50':
              true,
            'pointer-events-none': isCurrentSite && isSites,
          }}
          onClick={onClick}
          onMouseDown={(e) => e.preventDefault()}
        >
          {isFav && stateLocal.active !== 'fav' && (
            <span class={`text-red-500 mr-2 inline-block`}>
              <IconHeart />
            </span>
          )}
          {isTable ? (
            <span class="grid grid-cols-[1fr_1fr_1fr] gap-2 w-full">
              {table.map((item) => {
                return <span>{item}</span>;
              })}
            </span>
          ) : (
            item.name
          )}
        </a>
        {isDropdown && (
          <Dropdown
            classOuter={`w-12 absolute top-0 right-3 sm:right-6 lg:right-8 peer-hover:opacity-100`}
            items={[
              { text: isFav ? 'Unfavourite' : 'Favourite', onClick: setFav },
            ]}
          />
        )}
      </li>
    );
  };

  private rows = (arr = []) => {
    const isHistory =
      (stateLocal.active === 'post' || stateLocal.active === 'site') &&
      !state[`entries${capitalizeFirstLetter(stateLocal.active)}IsQuery`] &&
      state[`historySearches${capitalizeFirstLetter(stateLocal.active)}`]
        ?.length > 0;

    const array = isHistory
      ? [
          {
            children: state[
              `historySearches${capitalizeFirstLetter(stateLocal.active)}`
            ].map((item) => ({
              name: item,
              type: 'history',
            })),
          },
        ]
      : this.getArr(arr, stateLocal.active);

    const table = stateLocal.active === 'site' ? ['Domain', 'Path', 'ID'] : [];

    return Object.values(array as unknown).map((item) => {
      return (
        <div>
          {this.getHeader(item, true)}
          {item.type === 'post' ||
            (item.type === 'site' && (
              <div
                class={`${this.px} ${this.borderB} grid grid-cols-[1fr_1fr_1fr] sticky top-[68px] gap-2 z-10 bg-white sm:top-[67px]`}
              >
                {table.map((item) => {
                  return (
                    <span
                      key={item}
                      class="py-1.5 text-xs uppercase font-semibold font-slate-500"
                    >
                      {item}
                    </span>
                  );
                })}
              </div>
            ))}
          <ul data-focus-parent={true}>
            {Object.values(item.children as unknown).map(
              (itemInner, indexInner) => {
                return itemInner.children ? (
                  <li key={indexInner}>
                    <h2
                      class={`${this.mx} ${this.borderB} text-base pb-2 pt-3.5 text-slate-900 font-medium sm:text-lg sm:pt-5 sm:pb-2.5`}
                    >
                      {itemInner.name}
                    </h2>
                    <ul>
                      {Object.values(itemInner.children as unknown).map(
                        (itemSub) => {
                          return this.row(itemSub);
                        }
                      )}
                    </ul>
                  </li>
                ) : (
                  this.row(itemInner)
                );
              }
            )}
          </ul>
        </div>
      );
    });
  };

  private help = () => {
    return (
      <div>
        {this.getHeader({
          title: `${state.menu[stateLocal.active].text} mode help`,
        })}
        <div
          class={`${this.px} mt-6 text-base space-y-2 leading-relaxed md:w-3/4`}
          innerHTML={state.menu[stateLocal.active].help}
        />
      </div>
    );
  };

  // @ts-ignore
  private post = (arr = []) => {
    return Object.values(this.getArr(arr, 'post') as unknown).map((item) => {
      return (
        <div>
          {this.getHeader(item)}
          <ul class={`mt-3 sm:mt-6`}>
            {Object.values(item.children as unknown).map((itemInner) => {
              return (
                <li class={`${this.border} flex flex-col mb-3`}>
                  <streamline-post
                    data-focus={true}
                    href-edit={itemInner.hrefEdit}
                    href-view={itemInner.guid}
                    post-id={itemInner.ID}
                    post-title={itemInner.post_title}
                    post-type={itemInner.post_type}
                    post-slug={itemInner.post_name}
                    site-id={itemInner.siteId}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      );
    });
  };

  private settingsOnChange = (id, type, value) => {
    state.entriesSettingsSave = {
      ...state.entriesSettingsSave,
      ...{
        [id]: {
          ...state.entriesSettingsSave[id],
          ...{
            [type]: value,
          },
        },
      },
    };
  };

  // @ts-ignore
  private settings = () => {
    const Key = (props) => (
      <div
        style={{ boxShadow: '0 3px 0 0 #E2E8F0' }}
        class={`h-[max-content] px-2 leading-0 py-0.5 text-[11px] uppercase font-medium text-slate-800 border bg-slate-50 border-slate-200`}
      >
        {props.key}
      </div>
    );

    return Object.values(state.entriesSettingsActive).map((item) => {
      return (
        <div>
          {this.getHeader(item)}
          <ul class={`${this.px} space-y-4`}>
            {Object.values(item.children as unknown).map(
              (itemInner, indexInner) => {
                return (
                  <li
                    key={indexInner}
                    class={`${
                      indexInner === 0 ? this.border : ''
                    } flex flex-col`}
                  >
                    <h2
                      class={`${this.h2} ${this.borderB} !text-lg mt-4 space-y-2 mb-6 inline-block leading-1 pb-2`}
                    >
                      {itemInner.name}
                    </h2>
                    {itemInner.children && (
                      <ul class={`flex flex-col space-y-5`}>
                        {Object.values(itemInner.children as unknown).map(
                          (itemSub, indexSub) => {
                            return (
                              <li
                                key={indexSub}
                                class={`flex items-center mr-4`}
                              >
                                <label
                                  htmlFor={`setting-${itemSub.id}`}
                                  class={`w-full grid grid-cols-[75px,1fr] gap-6 select-none group ${
                                    itemSub.choices ? '' : 'cursor-pointer'
                                  }`}
                                >
                                  <div
                                    class={`relative mt-0.5 inline-block h-[max-content] w-[max-content] focus-in-white-out`}
                                  >
                                    <input
                                      data-focus={true}
                                      type="checkbox"
                                      id={`setting-${itemSub.id}`}
                                      class="sr-only peer"
                                      checked={
                                        state.entriesSettingsLoad[itemSub.id]
                                          .default
                                      }
                                      onInput={(e) =>
                                        this.settingsOnChange(
                                          itemSub.id,
                                          'default',
                                          (e.target as HTMLInputElement).checked
                                        )
                                      }
                                    />
                                    <div
                                      class={`block bg-slate-300 w-14 h-5 transition ease-in-out duration-200 group-hover:bg-slate-400 peer-checked:bg-blue-500`}
                                    />
                                    <div
                                      class={`dot absolute left-1 top-1 bg-white w-3 h-3 transition ease-in-out duration-200`}
                                    />
                                  </div>
                                  <div class={`w-full`}>
                                    <div
                                      class={`text-base text-slate-900 font-medium flex justify-between`}
                                    >
                                      {itemSub.name}
                                      {itemSub.keys && (
                                        <div
                                          class={`hidden space-x-2 mt-[-6px] md:flex ${
                                            state.entriesSettingsLoad[
                                              itemSub.id
                                            ].default
                                              ? ''
                                              : 'opacity-50'
                                          }`}
                                        >
                                          {itemSub.metaKey && (
                                            <Key
                                              key={state.isMac ? 'cmd' : 'ctrl'}
                                            />
                                          )}
                                          {itemSub.keys.map((item) => {
                                            return <Key key={item} />;
                                          })}
                                        </div>
                                      )}
                                    </div>
                                    <div
                                      class={`mt-0.5 text-xs text-slate-500`}
                                    >
                                      {itemSub.label}
                                    </div>
                                  </div>
                                </label>
                              </li>
                            );
                          }
                        )}
                      </ul>
                    )}
                  </li>
                );
              }
            )}
          </ul>
        </div>
      );
    });
  };

  render() {
    const isMultisite =
      (state.data.network && !state.test && !state.isLoading) || state.testFull;

    return (
      <div
        class={`${
          isMultisite
            ? 'h-[calc(100%-24px)] lg:h-[calc(100%+56px)]'
            : 'h-full lg:h-[calc(100%+80px)]'
        } relative`}
      >
        {state.isLoading ? (
          <div
            class={`w-full h-[calc(100%-var(--sl-side-w))] flex items-center justify-center bg-white/50 absolute top-0 left-0 backdrop-blur-sm z-10`}
          >
            <Loader sm={false} />
          </div>
        ) : (
          <div
            tabindex={-1}
            class={`focus-none inner pb-6 relative h-[calc(100%-var(--sl-side-w))] overflow-x-auto overflow-y-scroll w-full bg-white lg:pb-10 ${
              state.isProcessing ? 'pointer-events-none opacity-50' : ''
            }`}
          >
            {state.isHelp
              ? this.help()
              : stateLocal.active === 'settings'
              ? this.settings()
              : this.rows()}
          </div>
        )}
        {isMultisite && (
          <div
            class={`mt-auto px-3 h-6 bg-slate-50 border-t border-slate-200 flex items-center text-slate-900`}
          >
            <span class={`flex whitespace-no-wrap`}>
              <span class={`text-[11px]`}>
                <span class={`font-semibold`}>Current site:</span>{' '}
                {state.currentSite.path} ∙{' '}
                <span class={`font-semibold`}>ID:</span>
                {state.currentSite.id}
              </span>
            </span>
          </div>
        )}
      </div>
    );
  }
}
