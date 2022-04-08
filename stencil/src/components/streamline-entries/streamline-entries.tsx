// eslint-disable-next-line no-unused-vars
import { Component, Element, h, State } from '@stencil/core';
import { state } from '../../store/internal';
import { stateLocal } from '../../store/local';
import { setEntries } from '../../utils/set/setEntries';
import { capitalizeFirstLetter } from '../../utils/string/capitalizeFirstLetter';
import {
  IconArrowLeft,
  IconCheck,
  IconFilterSlash,
  IconHeart,
  IconMenu,
  IconNetwork,
  IconPost,
  IconTimes,
  IconSettings,
  IconSites,
  IconHistory,
  IconSmileyTear,
  IconAction,
} from '../../icons';
import { post } from '../../utils/query/post';
import { getMenu } from '../../utils/get/getMenu';
import { getMetaKey } from '../../utils/get/getMetaKey';
import { get } from '../../utils/query/get';
import { someDeep } from 'deepdash-es/standalone';
import { setFavourite } from '../../utils/set/setFavourite';
import { Button } from '../../elements/Button';
import { setSearchPlaceholder } from '../../utils/set/setSearchPlaceholder';
import { debounce, isBoolean, isNumber } from 'lodash-es';
import { save } from '../../utils/query/save';
import { sort } from '../../utils/sort/sort';
import { isDashboard } from '../../utils/is/isDashboard';
import { isDefault } from '../../utils/is/isDefault';
import { isAnimation } from '../../utils/is/isAnimation';

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
  private px = 'px-4 sm:px-8 lg:px-10';
  private mx = 'mx-4 sm:mx-8 lg:mx-10';
  private grid = 'grid grid-flow-col auto-cols-[minmax(150px,1fr)] gap-2';

  // eslint-disable-next-line no-undef
  @Element() el: HTMLStreamlineEntriesElement;

  @State() editing: object;

  connectedCallback() {
    if (isDashboard()) {
      setEntries();
    }

    window.addEventListener(
      'resize',
      debounce(() => {
        if (window.innerWidth <= 639 && state.entriesEditing !== {}) {
          this.el.shadowRoot
            .querySelectorAll('streamline-ui-dropdown')
            .forEach((item) => {
              item.classList.remove('!opacity-100');
            });
          this.el.shadowRoot.querySelectorAll(`[data-row]`).forEach((item) => {
            const id = item.getAttribute('data-row');
            item.querySelectorAll('input[data-id]').forEach((itemNested) => {
              if (state.entriesEditing?.[id]?.active) {
                (itemNested as HTMLInputElement).value =
                  state.entriesEditing[id].values[
                    itemNested.getAttribute('data-id')
                  ].defaultValue;
                (itemNested as HTMLInputElement)?.blur?.();
              }
            });
          });
          state.entriesEditing = {};
          state.isSearch = true;
        }
      }, 500)
    );

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

    (focusEls[state.focusIndex] as HTMLElement)?.focus?.();
  };

  private getHeader(item, mb = false) {
    const isTestNav = state.test && state.active === 'post';

    const isQuery = item.type === 'post' || item.type === 'site';
    const isQueryMode = state.active === 'site' || state.active === 'post';
    const isMenu = item.type === 'menu' || item.type === 'networkMenu';
    const isDotMenu = state.isHelp;
    const isNotDotMenu = !state.isHelp;
    const isQueryWithClose =
      (isDefault() && isQueryMode) ||
      (isQueryMode &&
        state[`entries${capitalizeFirstLetter(state.active)}Query`] &&
        state[`historySearches${capitalizeFirstLetter(state.active)}`]?.length >
          0 &&
        !state.isHelp);

    const hasPages =
      (state.test && state.active === 'post') ||
      (isQueryWithClose &&
        state.active === 'post' &&
        state[`entries${capitalizeFirstLetter(state.active)}Total`] >
          state.entriesSettingsLoad.queryAmount.default);
    const totalPages = Math.ceil(
      (state.test && state.active === 'post'
        ? state.entriesPost?.[0]?.children &&
          Object.values(Object.values(state.entriesPost?.[0]?.children)).length
        : state[`entries${capitalizeFirstLetter(state.active)}Total`]) /
        state.entriesSettingsLoad.queryAmount.default
    );

    let menuNumber = 0;
    if (isMenu) {
      Object.values(item.children as unknown).forEach((itemNested) => {
        Object.values(itemNested.children as unknown).forEach(() => {
          menuNumber++;
        });
      });
    }

    const result = isQuery
      ? Object.values(item.children).length
      : isMenu
      ? menuNumber
      : '0';

    state.infoBarAmount = ` ∙ Showing ${result} ${
      (isQuery && Object.values(item.children).length === 1) ||
      (isMenu && menuNumber === 1)
        ? `result`
        : `results`
    }`;

    state.infoBarPages =
      hasPages || isTestNav
        ? ` ∙ Page ${
            state[`entries${capitalizeFirstLetter(state.active)}CurrentPage`]
          } of ${totalPages}`
        : '';

    const path =
      item.isMultisite && !state.test && state.active !== 'site'
        ? ` <span class="text-slate-300">∙</span> subsite: ${item.path}`
        : '';

    return (
      <div
        class={{
          'mb-2 grid grid-cols-[minmax(0,1fr),auto] justify-between items-center relative min-h-[60px] pt-5 flex pb-1.5 sticky -top-2 bg-white z-20 sm:min-h-[75px] sm:pt-6 sm:pb-2 sm:-top-2 sm:mb-3':
            true,
          [this.px]: true,
          '!mb-0': mb,
        }}
      >
        <div>
          <div class={`absolute -left-full top-0 h-full bg-white z-[-1]`} />
          <div class={`flex items-center flex-row max-w-full`}>
            {!state.isHelp && (
              <div
                class={{
                  'relative flex-shrink-0 text-blue-600 flex items-center justify-center mr-3 h-8 w-8 p-2 bg-blue-50 rounded-lg':
                    true,
                  'ml-8': isQueryWithClose,
                }}
              >
                {item.type === 'menu' || state.active === 'menu' ? (
                  <IconMenu />
                ) : item.type === 'networkMenu' ||
                  state.active === 'networkMenu' ? (
                  <IconNetwork />
                ) : item.type === 'post' || state.active === 'post' ? (
                  <IconPost />
                ) : item.type === 'settings' || state.active === 'settings' ? (
                  <IconSettings />
                ) : item.type === 'site' || state.active === 'site' ? (
                  <IconSites />
                ) : item.type === 'action' ? (
                  <IconAction />
                ) : isDefault() &&
                  isQueryWithClose !== false &&
                  isQueryWithClose !== true ? (
                  <IconHistory />
                ) : (
                  item.type === undefined && <IconSmileyTear />
                )}
              </div>
            )}
            {isQueryWithClose && (
              <Button
                type="back"
                icon={<IconTimes />}
                onClick={() => {
                  state[
                    `entries${capitalizeFirstLetter(state.active)}CurrentPage`
                  ] = 1;
                  state[`entries${capitalizeFirstLetter(state.active)}Query`] =
                    '';
                  state[`entries${capitalizeFirstLetter(state.active)}`] = [];
                  state[`entries${capitalizeFirstLetter(state.active)}Active`] =
                    [];
                  setSearchPlaceholder();
                  if (isDefault()) {
                    state.active = 'search';
                  }
                }}
              />
            )}
            <h1
              class={
                'text-slate-900 font-bold text-lg mr-6 whitespace-nowrap truncate leading-tight sm:text-xl'
              }
              innerHTML={`${
                state.isSlash || isDotMenu
                  ? item.title
                  : item.type === 'networkMenu'
                  ? 'Network admin'
                  : isMenu
                  ? 'Admin menu' + path
                  : (state.active === 'post' || state.active === 'site') &&
                    state[`entries${capitalizeFirstLetter(state.active)}`][0]
                      ?.queryValue
                  ? `${capitalizeFirstLetter(state.active)}s for: ` +
                    `<span class="text-slate-400 italic">${
                      state[
                        `entries${state.active === 'post' ? 'Post' : 'Site'}`
                      ][0]?.queryValue
                    }</span>` +
                    path
                  : isQuery && state.active === 'fav'
                  ? `${capitalizeFirstLetter(item.type)}s` + path
                  : isQueryMode &&
                    !state[
                      `entries${capitalizeFirstLetter(state.active)}Query`
                    ] &&
                    state[
                      `historySearches${capitalizeFirstLetter(state.active)}`
                    ]?.length === 0
                  ? `No query, search for a ${state.active} in the search bar`
                  : isQueryMode &&
                    !state[
                      `entries${capitalizeFirstLetter(state.active)}Query`
                    ] &&
                    state[
                      `historySearches${capitalizeFirstLetter(state.active)}`
                    ]?.length > 0
                  ? `Search history`
                  : state.active === 'settings'
                  ? 'Settings'
                  : item.type === 'action'
                  ? 'Actions'
                  : 'No results'
              }`}
            />
          </div>
        </div>
        <div>
          {[
            {
              type: 'button',
              text: 'Save',
              condition: state.active === 'settings' && isNotDotMenu,
              onClick: () => {
                state.entriesPostCurrentPage = 1;

                if (!state.test) {
                  post({
                    route: 'update/settings',
                    type: 'settings',
                    values: state.entriesSettingsSave,
                    callback: () => {
                      if (
                        state.entriesSettingsLoad.queryAmount !==
                          // @ts-ignore
                          state.entriesSettingsSave.queryAmount &&
                        !state.test
                      ) {
                        state.entriesPost = [];
                        state.entriesPostQuery = '';
                      }
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
          ].map((itemInner) => {
            return (
              itemInner.condition && (
                <Button
                  onClick={
                    state.entriesSettingsHaveChanged && itemInner.onClick
                  }
                  tabindex={state.entriesSettingsHaveChanged ? 0 : -1}
                  disabled={!state.entriesSettingsHaveChanged}
                  type="primary"
                  text={itemInner.text}
                />
              )
            );
          })}
          <div
            class={`pagination grid auto-cols-max grid-flow-col gap-2 empty:hidden`}
          >
            {[
              {
                condition: stateLocal?.sort?.[item.type],
                type: 'transparent',
                icon: <IconFilterSlash />,
                onClick: () => {
                  this.el.shadowRoot
                    .querySelector('.pagination')
                    .classList.add('unset-hover');
                  setEntries(item.type);
                  if (!state.test) {
                    setTimeout(() => {
                      this.el.shadowRoot
                        .querySelector('.pagination')
                        .classList.remove('unset-hover');
                    }, 500);
                  }
                },
              },
              {
                condition:
                  isTestNav ||
                  (hasPages &&
                    state.active === 'post' &&
                    state.entriesPostQuery),
                type: 'secondary',
                icon: <IconArrowLeft />,
                disabled:
                  state[
                    `entries${capitalizeFirstLetter(state.active)}CurrentPage`
                  ] === 1,
                action: 'prev',
                onClick: false,
              },
              {
                condition:
                  isTestNav ||
                  (hasPages &&
                    state.active === 'post' &&
                    state.entriesPostQuery),
                type: 'secondary',
                icon: (
                  <span class={`rotate-180 inline-block`}>
                    <IconArrowLeft />
                  </span>
                ),
                disabled:
                  state[
                    `entries${capitalizeFirstLetter(state.active)}CurrentPage`
                  ] === totalPages,
                action: 'next',
                onClick: false,
              },
            ].map((itemInner) => {
              return (
                itemInner.condition && (
                  <Button
                    type={itemInner.type}
                    icon={itemInner.icon}
                    disabled={itemInner.disabled}
                    onClick={
                      itemInner.action === 'prev' || itemInner.action === 'next'
                        ? () => {
                            state[
                              `entries${capitalizeFirstLetter(
                                state.active
                              )}CurrentPage`
                            ] =
                              itemInner.action === 'next'
                                ? state[
                                    `entries${capitalizeFirstLetter(
                                      state.active
                                    )}CurrentPage`
                                  ] + 1
                                : state[
                                    `entries${capitalizeFirstLetter(
                                      state.active
                                    )}CurrentPage`
                                  ] - 1;

                            if (!state.test) {
                              get({
                                route: `get/${state.active}s`,
                                type: state.active,
                                value:
                                  state[
                                    `entries${capitalizeFirstLetter(
                                      state.active
                                    )}Query`
                                  ],
                              });
                            } else {
                              setEntries();
                            }
                          }
                        : itemInner.onClick
                    }
                  />
                )
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  private getArr = (type) => {
    return (
      state[`entries${capitalizeFirstLetter(type)}Active`]?.length >= 1 &&
      (state[`entries${capitalizeFirstLetter(type)}Active`] ||
        state[`entries${capitalizeFirstLetter(type)}`])
    );
  };

  private row = (item, table) => {
    let isFav = false;

    const isEdit = state.entriesEditing?.[item.ID]?.active;

    const isAction = item.type === 'action';
    const isActionInactive = isAction && state.searchValue === '';
    const isSite = item.type === 'site';
    const isHistory = item.type === 'history';
    const isPost = item.type === 'post';
    const isMenu = item.type === 'menu' || item.type === 'networkMenu';
    const isDropdown = isPost || isMenu;
    const isCurrentSite =
      parseInt(item.siteId) === parseInt(state.currentSite.id);
    const isTable = isSite || isPost;

    const checkIfFavourite = () => {
      isFav =
        item.type === 'history'
          ? false
          : someDeep(
              state.entriesFav,
              (o) => {
                return isMenu
                  ? o?.path === item.path &&
                      o?.siteId === item.siteId &&
                      o.type === item.type
                  : o?.ID === item.ID &&
                      o?.siteId === item.siteId &&
                      o.type === item.type;
              },
              { childrenPath: ['children'] }
            );
    };

    checkIfFavourite();

    const setFav = () =>
      setFavourite({
        favourite: isFav,
        callback: checkIfFavourite,
        type: item.type,
        filter: (o) => {
          return isMenu
            ? o.href === item.href && o.adminUrl === item.adminUrl
            : o.ID === item.ID && o.siteId === item.siteId;
        },
        path: (o) => {
          return o.type === item.type && o.siteId === item.siteId;
        },
        pathFav: (o) => {
          return isMenu
            ? o.path === item.path && o.siteId === item.siteId
            : o.ID === item.ID &&
                o.siteId === item.siteId &&
                o.post_title === item.post_title;
        },
      });

    const onKeyPress = (e) => {
      if (e.key === 'Enter') {
        if (isAction) {
          onClickAction();
        }
        if (isHistory) {
          onClickHistory();
        }
        if (isSite) {
          onClickSite();
        }
      }
    };

    const onClickAction = () => {
      get({
        route: item.route,
        type: item.tab,
        value: state.searchValue,
        callback: () => (state.active = item.tab),
      });
    };

    const onClickHistory = () => {
      get({
        route: `get/${state.active}s`,
        type: state.active,
        value: item.name,
        id: item.siteId,
      });
    };

    const onClickSite = () => {
      state.currentSite = {
        path: item.path,
        id: item.siteId,
      };

      state.entriesPost = [];
      state.entriesPostActive = [];
      state.entriesPostQuery = '';

      if (!state.data.isAdmin) {
        state.isLoading = true;
      }

      getMenu({
        adminUrl: item.adminUrl,
        fetch: true,
        siteId: item.siteId,
        path: item.path,
        callback: () => {
          if (isDefault()) {
            state.active = 'search';
            state.isLoading = false;
          }
        },
      });
    };

    const onClickPostsEditToggle = (edit) => {
      const isSaveable = () => {
        const inputs = this.el.shadowRoot.querySelectorAll(
          `[data-row="${item.ID}"] input`
        );

        for (const input of inputs)
          if ((input as HTMLInputElement).value !== '') return false;

        return true;
      };

      if (!edit && !isSaveable) {
        return false;
      }

      state.entriesEditing = {
        ...state.entriesEditing,
        [item.ID]: {
          ...state.entriesEditing?.[item.ID],
          values: Object.fromEntries(
            [
              ...this.el.shadowRoot.querySelectorAll(
                `[data-row="${item.ID}"] input[data-id]`
              ),
            ].map((item) => [
              [item.getAttribute('data-id')],
              {
                defaultValue: (item as HTMLInputElement).value,
              },
            ])
          ),
          active: edit,
        },
      };

      const dropdownButton = this.el.shadowRoot.querySelector(
        `[data-row="${item.ID}"] streamline-ui-dropdown`
      );

      if (edit) {
        dropdownButton.classList.add('!opacity-100');
        state.isSearch = false;
      } else {
        dropdownButton.classList.remove('!opacity-100');
        state.isSearch = true;

        const values = {};
        this.el.shadowRoot
          .querySelectorAll(`[data-row="${item.ID}"] input[data-id]`)
          .forEach((itemNested) => {
            const key = itemNested.getAttribute('data-id');
            values[key] = (itemNested as HTMLInputElement).value;
          });

        save(item, values);
      }

      this.el.shadowRoot
        .querySelectorAll(`[data-row="${item.ID}"] input`)
        .forEach((item) => (item as HTMLInputElement)?.blur?.());
    };

    const onClickPostsCancel = () => {
      const dropdownButton = this.el.shadowRoot.querySelector(
        `[data-row="${item.ID}"] streamline-ui-dropdown`
      );

      state.entriesEditing = {
        ...state.entriesEditing,
        [item.ID]: {
          ...state.entriesEditing?.[item.ID],
          active: false,
        },
      };

      this.el.shadowRoot
        .querySelectorAll(`[data-row="${item.ID}"] input[data-id]`)
        .forEach((itemNested) => {
          (itemNested as HTMLInputElement).value =
            state.entriesEditing[item.ID].values[
              itemNested.getAttribute('data-id')
            ].defaultValue;
          (itemNested as HTMLInputElement)?.blur?.();
        });

      dropdownButton.classList.remove('!opacity-100');

      if (
        JSON.stringify(state.entriesEditing).indexOf('"active":true') === -1
      ) {
        state.isSearch = true;
      }
    };

    const onClick = (e) =>
      isAction
        ? onClickAction()
        : isHistory
        ? onClickHistory()
        : isSite
        ? onClickSite()
        : isPost && window.innerWidth <= 639
        ? e.preventDefault()
        : false;

    const onDblClick = (e) => {
      if (isPost && window.innerWidth <= 639) {
        e.preventDefault();
        state.drawer = {
          ...state.drawer,
          active: true,
          title: `Editing: ${item.post_title}`,
          onSave: () => {
            save(item, state.drawer.values);
          },
          items: Object.values(table as unknown)
            .map((itemInner) => {
              return (
                itemInner.edit && {
                  id: itemInner.id,
                  value: item[itemInner.id],
                  label: itemInner.name,
                }
              );
            })
            .filter((x) => x),
        };
      }
    };

    const dropdown = [
      !isEdit && { text: isFav ? 'Unfavourite' : 'Favourite', onClick: setFav },
      isPost && {
        text: isEdit ? 'Save' : 'Edit Inline',
        onClick: isEdit
          ? () => onClickPostsEditToggle(false)
          : () => onClickPostsEditToggle(true),
      },
      isPost &&
        isEdit && {
          text: 'Cancel',
          onClick: onClickPostsCancel,
        },
      isPost && !isEdit && { text: 'View Post', href: item.guid },
      isPost && !isEdit && { text: 'Edit Post', href: atob(item.hrefEdit) },
    ];

    const rowClass = 'text-sm font-medium text-slate-600 h-[42px]';

    return (
      <li class={`relative`} data-entry={true} data-row={item.ID}>
        <a
          data-focus={!isActionInactive && true}
          tabindex={isEdit || isActionInactive ? -1 : 0}
          href={state.test ? '#0' : item.href || item.guid}
          class={{
            [this.px]: true,
            [rowClass]: true,
            'relative focus-white flex items-center flex-wrap cursor-pointer w-full inline-block peer sm:hover:text-blue-600 sm:hover:bg-slate-50':
              true,
            'pointer-events-none':
              (isCurrentSite && isSite) || isEdit || isActionInactive,
            'opacity-50': isActionInactive,
          }}
          onClick={onClick}
          onDblClick={onDblClick}
          onMouseDown={(e) => e.preventDefault()}
          onKeyPress={onKeyPress}
        >
          {((isFav && state.active !== 'fav') ||
            (isCurrentSite && state.active === 'site')) && (
            <span
              class={`mr-2 flex absolute left-px top-1/2 -translate-y-1/2 sm:left-2 lg:left-4`}
            >
              {isFav ? (
                <span class={`text-rose-500 inline-block scale-50 sm:scale-75`}>
                  <IconHeart />
                </span>
              ) : (
                <span
                  class={`text-green-600 inline-block scale-50 sm:scale-100`}
                >
                  <IconCheck />
                </span>
              )}
            </span>
          )}
          {!isTable && item.name}
        </a>
        {isTable && (
          <div
            class={`${this.px} ${this.grid} w-full absolute top-0 pointer-events-none text-slate-700 sm:peer-hover:text-blue-600`}
          >
            {table.map((itemNested) => {
              return (
                <div class={`h-[42px] flex items-center relative`}>
                  {itemNested.text ? (
                    itemNested.text?.(item)
                  ) : (
                    <input
                      title={item[itemNested.id]}
                      data-id={itemNested.id}
                      type="text"
                      tabindex={itemNested.edit && isEdit ? 0 : -1}
                      disabled={!itemNested.edit && isEdit}
                      class={{
                        'truncate text-sm font-medium h-[42px] pointer-events-none leading-none select-text absolute -top-px left-0 focus-none w-4/5 bg-transparent':
                          true,
                        // @ts-ignore
                        'text-green-600 !pointer-events-auto placeholder-rose-600':
                          isEdit && itemNested.edit,
                      }}
                      value={item[itemNested.id]}
                      placeholder="No value"
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
        {isDropdown && (
          <streamline-ui-dropdown
            class="hidden w-12 absolute block h-full top-0 right-4 opacity-0 focus-within:opacity-100 hover:opacity-100 peer-hover:opacity-100 sm:block sm:right-8 lg:right-12"
            type="entry"
            items={dropdown}
          />
        )}
      </li>
    );
  };

  private rows = () => {
    const isHistory =
      !state.test &&
      isDashboard() &&
      (state.active === 'post' || state.active === 'site') &&
      !state[`entries${capitalizeFirstLetter(state.active)}Query`] &&
      state[`historySearches${capitalizeFirstLetter(state.active)}`]?.length >
        0;

    const array = isHistory
      ? [
          {
            children: state[
              `historySearches${capitalizeFirstLetter(state.active)}`
            ].map((item) => ({
              name: item,
              type: 'history',
            })),
          },
        ]
      : this.getArr(state.active);

    return Object.values(array as unknown).map((item) => {
      const onScroll = (e) => {
        this.el.shadowRoot.querySelector(`div[data-uid="${uid}"]`).scrollLeft =
          Math.round(e.target.scrollLeft);
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
                        'px-2.5 py-1.5 text-xs uppercase font-semibold rounded-md':
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
        <div data-entry-section={item.type}>
          {this.getHeader(item, true)}
          {(item.type === 'post' || item.type === 'site') && (
            <div
              data-uid={uid}
              class={`overflow-x-auto scrollbar-none sticky top-[62px] z-10 bg-white sm:top-[74px]`}
            >
              <div class={`${this.px} ${this.grid}`}>
                {table.map((itemInner) => {
                  return (
                    <div
                      tabindex="0"
                      role="button"
                      key={itemInner.id}
                      class={{
                        [this.borderB]: true,
                        'group grid grid-cols-[1fr,auto] items-center py-1.5 text-xs uppercase font-semibold font-slate-500 whitespace-nowrap hover:border-slate-900 focus:border-blue-500 focus:outline-none':
                          true,
                        'pointer-events-none': !itemInner.sort,
                      }}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() =>
                        sort(
                          {
                            ...itemInner,
                            type: item.type,
                          },
                          stateLocal?.sort?.[item.type]?.id !== itemInner.id
                            ? 'ascending'
                            : stateLocal?.sort?.[item.type]?.direction ===
                              'ascending'
                            ? 'descending'
                            : 'ascending'
                        )
                      }
                    >
                      {itemInner.name}
                      <svg
                        class={{
                          'hidden w-[8px] mr-2 group-hover:block group-focus:block group-focus:text-blue-600':
                            true,
                          '!block':
                            stateLocal?.sort?.[item.type]?.id === itemInner.id,
                          'rotate-180':
                            stateLocal?.sort?.[item.type]?.direction ===
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
            class="overflow-x-auto"
          >
            {Object.values(item.children).map((itemInner) => {
              return itemInner['children'] ? (
                <li key={itemInner['name']}>
                  <h2
                    class={`${this.mx} text-base pb-2 pt-2.5 text-slate-700 font-semibold sm:text-lg`}
                  >
                    {itemInner['name']}
                  </h2>
                  <ul>
                    {Object.values(itemInner['children'] as unknown).map(
                      (itemSub) => {
                        return this.row(itemSub, table);
                      }
                    )}
                  </ul>
                </li>
              ) : (
                this.row(itemInner, table)
              );
            })}
          </ul>
        </div>
      );
    });
  };

  private help = () => {
    return (
      <div>
        {this.getHeader({
          title: `${state.menu[state.active].text} mode help`,
        })}
        <div
          class={`${this.px} text-base space-y-2 leading-relaxed md:w-5/6`}
          innerHTML={state.menu[state.active].help}
        />
      </div>
    );
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
        class={`h-[max-content] rounded px-2 leading-0 py-1 text-[11px] uppercase font-medium text-slate-800 border bg-slate-50 border-slate-200`}
      >
        {props.key}
      </div>
    );

    const conditionMapNames = ['Behaviour', 'Searchbar'];

    const conditionMap = [
      'keyNavigationTabs',
      'behaviourDefaultTab',
      'searchResetInput',
      'searchFocus',
    ];

    return Object.values(state.entriesSettingsActive).map((item) => {
      return (
        <div>
          {this.getHeader(item)}
          <ul class={`${this.px} space-y-4 sm:space-y-6`}>
            {Object.values(item.children as unknown).map(
              (itemInner, indexInner) => {
                return (
                  (isDashboard() ||
                    (isDefault() &&
                      !conditionMapNames.includes(itemInner.name))) && (
                    <li
                      key={itemInner.name}
                      class={`${
                        indexInner === 0 ? this.border : ''
                      } flex flex-col`}
                    >
                      <h2
                        class={`${this.h2} !text-lg mt-4 space-y-2 mb-3 text-slate-700 font-semibold inline-block leading-none pb-2`}
                      >
                        {itemInner.name}
                      </h2>
                      {itemInner.children && (
                        <ul class={`flex flex-col space-y-5`}>
                          {Object.values(itemInner.children as unknown).map(
                            (itemSub) => {
                              return (
                                (isDashboard() ||
                                  (isDefault() &&
                                    !conditionMap.includes(itemSub.id))) && (
                                  <li
                                    key={itemSub.id}
                                    class={`flex items-center`}
                                  >
                                    <label
                                      htmlFor={`setting-${itemSub.id}`}
                                      class={{
                                        'cursor-pointer w-full grid gap-2 select-none group sm:grid-cols-[125px,1fr] sm:gap-6':
                                          true,
                                        'cursor-pointer': !itemSub.choices,
                                      }}
                                    >
                                      <div
                                        class={{
                                          'relative mt-0.5 inline-block h-[max-content] focus-in-white-out':
                                            true,
                                          'w-[max-content] rounded-full':
                                            isBoolean(
                                              state.entriesSettingsLoad[
                                                itemSub.id
                                              ].default
                                            ),
                                          'w-full rounded-md': !isBoolean(
                                            state.entriesSettingsLoad[
                                              itemSub.id
                                            ].default
                                          ),
                                        }}
                                      >
                                        {itemSub.choices ? (
                                          <select
                                            data-focus={true}
                                            class="text-sm focus-none cursor-pointer w-[125px] rounded-md"
                                            onInput={(e) =>
                                              this.settingsOnChange(
                                                itemSub.id,
                                                'default',
                                                (e.target as HTMLInputElement)
                                                  .value
                                              )
                                            }
                                          >
                                            {Object.entries(
                                              itemSub.choices
                                            ).map(([key, value]) => {
                                              return (
                                                (itemSub.id === 'mode' ||
                                                  key === 'last' ||
                                                  state.menu[key]
                                                    .condition) && (
                                                  <option
                                                    selected={
                                                      state.entriesSettingsLoad[
                                                        itemSub.id
                                                      ].default === key
                                                    }
                                                    value={key}
                                                  >
                                                    {value}
                                                  </option>
                                                )
                                              );
                                            })}
                                          </select>
                                        ) : isNumber(
                                            state.entriesSettingsLoad[
                                              itemSub.id
                                            ].default
                                          ) ? (
                                          <input
                                            data-focus={true}
                                            id={`setting-${itemSub.id}`}
                                            type="number"
                                            class="text-sm focus-none max-w-[125px] rounded-md"
                                            min={10}
                                            value={
                                              state.entriesSettingsLoad[
                                                itemSub.id
                                              ].default
                                            }
                                            onInput={(e) =>
                                              this.settingsOnChange(
                                                itemSub.id,
                                                'default',
                                                parseInt(
                                                  (e.target as HTMLInputElement)
                                                    .value
                                                )
                                              )
                                            }
                                          />
                                        ) : (
                                          [
                                            <input
                                              data-focus={true}
                                              type="checkbox"
                                              id={`setting-${itemSub.id}`}
                                              class="sr-only peer rounded-full"
                                              checked={
                                                state.entriesSettingsLoad[
                                                  itemSub.id
                                                ].default
                                              }
                                              onInput={(e) =>
                                                this.settingsOnChange(
                                                  itemSub.id,
                                                  'default',
                                                  (e.target as HTMLInputElement)
                                                    .checked
                                                )
                                              }
                                            />,
                                            <div
                                              class={{
                                                'block bg-slate-300 w-14 h-5 rounded-full group-hover:bg-slate-400 peer-checked:bg-blue-600':
                                                  true,
                                                'transition ease-in-out duration-200':
                                                  isAnimation(),
                                              }}
                                            />,
                                            <div
                                              class={{
                                                'dot absolute left-1 top-1 bg-white w-3 h-3 rounded-full':
                                                  true,
                                                'transition ease-in-out duration-200':
                                                  isAnimation(),
                                              }}
                                            />,
                                          ]
                                        )}
                                      </div>
                                      <div class={`w-full mt-0.5 sm:mt-0`}>
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
                                                  key={
                                                    state.isMac ? 'cmd' : 'ctrl'
                                                  }
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
                                )
                              );
                            }
                          )}
                        </ul>
                      )}
                    </li>
                  )
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
        class={{
          'relative bg-white': true,
          'h-[calc(100%-24px)] lg:h-[calc(100%+56px)]': isMultisite,
          'h-full lg:h-[calc(100%+80px)]': !isMultisite,
        }}
      >
        <div
          tabindex={-1}
          class={`focus-none inner pb-6 relative h-[calc(100%-var(--sl-side-w))] overflow-y-scroll w-full bg-white lg:pb-10 ${
            state.isLoading ? 'pointer-events-none opacity-50' : ''
          }`}
        >
          {state.isHelp
            ? this.help()
            : state.active === 'settings'
            ? this.settings()
            : this.rows()}
        </div>
        <div
          class={`mt-auto px-4 h-6 bg-slate-50 border-t border-slate-200 flex items-center text-slate-900`}
        >
          <span class={`flex whitespace-no-wrap`}>
            <span class={`text-[11px]`}>
              {isMultisite && (
                <span>
                  <span class={`font-semibold`}>Current site: </span>
                  <span>{state.currentSite.path} ∙ </span>
                  <span class={`font-semibold`}>ID: </span>
                  <span>{state.currentSite.id}</span>
                </span>
              )}
              {((state.active === 'post' && state.entriesPostQuery) ||
                (state.active === 'site' && state.entriesSiteQuery)) && (
                <span id="amount">{state.infoBarAmount}</span>
              )}
              {((state.active === 'post' && state.entriesPostQuery) ||
                (state.active === 'site' && state.entriesSiteQuery)) && (
                <span id="pages">{state.infoBarPages}</span>
              )}
            </span>
          </span>
        </div>
      </div>
    );
  }
}
