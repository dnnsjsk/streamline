// eslint-disable-next-line no-unused-vars
import { Component, h, Element } from '@stencil/core';
import { stateInternal } from '../../store/internal';
import { stateLocal } from '../../store/local';
import { setEntries } from '../../utils/setEntries';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';
import { Loader } from '../../elements/Loader';
import { IconCheck, IconMenu, IconNetwork, IconPost } from '../../icons';
import { fetchAjax } from '../../utils/fetchAjax';
import { getMenus } from '../../utils/getMenus';
import { getMenu } from '../../utils/getMenu';
import { getMetaKey } from '../../utils/getMetaKey';

/**
 * Entries.
 */
@Component({
  tag: 'streamline-entries',
  shadow: true,
  styleUrl: 'streamline-entries.scss',
})
export class StreamlineEntries {
  private border = 'border-t border-blue-gray-100 first-of-type:border-none';
  private h2 = 'text-base text-blue-gray-900 font-medium';
  private p = 'text-blue-gray-600 text-base font-normal';
  private px = 'px-6 lg:px-8';
  private tag =
    'px-2.5 py-1.5 bg-blue-gray-200 text-blue-gray-500 inline-block h-[max-content] leading-1';

  // @ts-ignore
  private tw = 'h-[16px]';

  // eslint-disable-next-line no-undef
  @Element() el: HTMLStreamlineEntriesElement;

  connectedCallback() {
    getMenus();
    setEntries();

    document.addEventListener('keydown', (e) => {
      if (stateInternal.visible) {
        if (
          e.key === 'ArrowDown' &&
          !getMetaKey(e) &&
          stateInternal.entriesSettingsLoad.keyNavigation.default
        ) {
          e.preventDefault();
          this.cycleEntries('down');
        }
        if (
          e.key === 'ArrowUp' &&
          !getMetaKey(e) &&
          stateInternal.entriesSettingsLoad.keyNavigation.default
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
      stateInternal.focusIndex++;
      if (stateInternal.focusIndex === focusElsLength) {
        stateInternal.focusIndex = 0;
      }
    } else {
      if (stateInternal.focusIndex === 0 || stateInternal.focusIndex === -1) {
        stateInternal.focusIndex = focusElsLength - 1;
      } else {
        stateInternal.focusIndex--;
      }
    }

    if (stateLocal.active === 'site' || stateLocal.active === 'settings') {
      (focusEls[stateInternal.focusIndex] as HTMLElement)?.focus();
    }

    if (
      stateLocal.active === 'fav' ||
      stateLocal.active === 'menu' ||
      stateLocal.active === 'network'
    ) {
      focusEls[stateInternal.focusIndex]?.shadowRoot.querySelector('a').focus();
    }

    if (stateLocal.active === 'post') {
      (
        focusEls[stateInternal.focusIndex]?.shadowRoot.querySelector(
          'a[data-type="view"]'
        ) as HTMLElement
      )?.focus();
    }
  };

  private static getHeader(item) {
    const isQuery = item.type === 'post' || item.type === 'site';
    const isMenu = item.type === 'menu' || item.type === 'networkMenu';
    const isDotMenu = stateInternal.isHelp;
    const isNotDotMenu = !stateInternal.isHelp;

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
      item.isMultisite && !stateInternal.test && stateLocal.active !== 'site'
        ? ` (subsite: ${item.path})`
        : '';

    return (
      <div
        class={`${
          stateLocal.active === 'settings'
            ? 'flex-row items-center justify-between'
            : 'flex-col items-start sm:justify-between'
        } relative min-h-[60px] pt-5 flex flex-wrap mb-1 pb-1.5 flex sticky -top-2 bg-white z-10 border-b border-blue-gray-300 sm:min-h-[75px] sm:mb-4 sm:flex-row sm:items-center sm:pt-6 sm:pb-2 sm:-top-2 lg:pt-7 lg:-top-3`}
      >
        <div
          class={`absolute -left-full top-0 w-[9999px] h-full bg-white z-[-1]`}
        />
        <div class={`flex items-center flex-row`}>
          {stateLocal.active === 'fav' &&
            stateInternal.entriesFavActive[0].children.length !== 0 &&
            !stateInternal.isHelp && (
              <div
                class={`flex-shrink-0 text-blue-gray-400 flex items-center justify-center mr-3`}
              >
                {item.type === 'menu' && <IconMenu />}
                {item.type === 'networkMenu' && <IconNetwork />}
                {item.type === 'post' && <IconPost />}
              </div>
            )}
          <h1
            class={`text-blue-gray-900 font-medium text-xl mr-6`}
            innerHTML={`${
              stateInternal.isSlash || isDotMenu
                ? item.title
                : item.type === 'networkMenu'
                ? 'Network admin'
                : isMenu
                ? 'Admin menu' + path
                : (stateLocal.active === 'post' ||
                    stateLocal.active === 'site') &&
                  stateInternal[
                    `entries${stateLocal.active === 'post' ? 'Post' : 'Site'}`
                  ][0]?.queryValue
                ? `${capitalizeFirstLetter(stateLocal.active)}s for: ` +
                  `<span class="text-blue-gray-400 italic">${
                    stateInternal[
                      `entries${stateLocal.active === 'post' ? 'Post' : 'Site'}`
                    ][0]?.queryValue
                  }</span>` +
                  path
                : isQuery && stateLocal.active === 'fav'
                ? `${capitalizeFirstLetter(item.type)}s` + path
                : (stateLocal.active === 'post' ||
                    stateLocal.active === 'site') &&
                  Object.values(
                    stateInternal[
                      `entries${capitalizeFirstLetter(stateLocal.active)}Active`
                    ][0].children
                  ).length === 0 &&
                  !item.queryValue
                ? `No query, search for a ${stateLocal.active} in the search bar`
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
                if (!stateInternal.test) {
                  fetchAjax({
                    type: 'settings',
                    query: stateInternal.entriesSettingsSave,
                    callback: () => {
                      // @ts-ignore
                      stateInternal.entriesSettingsLoad =
                        stateInternal.entriesSettingsSave;
                    },
                  });
                } else {
                  // @ts-ignore
                  stateInternal.entriesSettingsLoad =
                    stateInternal.entriesSettingsSave;
                }
              },
            },
          ]).map((itemInner, itemIndex) => {
            return itemInner.condition && itemInner.type === 'text' ? (
              <span
                class={`results-amount text-xs mt-1.5 sm:my-1.5 font-medium text-blue-gray-700 sm:text-sm ${
                  itemIndex === 0 ? '' : 'pl-4'
                }`}
              >
                {itemInner.text}
              </span>
            ) : (
              itemInner.condition && itemInner.type === 'button' && (
                <streamline-button
                  onClick={
                    stateInternal.entriesSettingsHaveChanged &&
                    itemInner.onClick
                  }
                  tabindex={stateInternal.entriesSettingsHaveChanged ? 0 : -1}
                  invalid={!stateInternal.entriesSettingsHaveChanged}
                  type="button"
                  styling="primary"
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
      (stateInternal[`entries${capitalizeFirstLetter(type)}Active`]?.length >=
        1 &&
        (stateInternal[`entries${capitalizeFirstLetter(type)}Active`] ||
          stateInternal[`entries${capitalizeFirstLetter(type)}`]))
    );
  };

  private help = () => {
    return (
      <div>
        {StreamlineEntries.getHeader({
          title: `${stateInternal.menu[stateLocal.active].text} mode help`,
        })}
        <div
          class={`mt-6 text-base space-y-2 leading-relaxed md:w-3/4`}
          innerHTML={stateInternal.menu[stateLocal.active].help}
        />
      </div>
    );
  };

  private slash = () => {
    /*
    return (
      <div>
        {StreamlineEntries.getHeader({
          title: 'Available commands for current mode',
        })}
        <ul>
          {Object.values(stateInternal.commands.local).map((item) => {
            const isEntry = item.name.includes('[');
            const type = item.name.substring(item.name.indexOf('[') - 1);
            const cmd = isEntry ? item.name.replace(type, '') : item.name;

            return (
              stateInternal.menu[stateLocal.active].commands.includes(
                item.name
              ) && (
                <li class={`flex flex-col py-3`}>
                  <h2 class={`${this.h2} mb-2`}>
                    <span>
                      {cmd}
                      {isEntry && (
                        <span class={`${this.tag} ml-2`}>{type.trim()}</span>
                      )}
                    </span>
                  </h2>
                  <p class={`${this.p}`}>{item.description}</p>
                </li>
              )
            );
          })}
        </ul>
      </div>
    );
     */
  };

  // @ts-ignore
  private site = (arr = []) => {
    function selectSite(obj) {
      stateInternal.currentSite = {
        path: obj.path,
        id: obj.siteId,
      };

      stateInternal.entriesPost = [];
      stateInternal.entriesPostActive = [];

      getMenu({
        adminUrl: obj.adminUrl,
        fetch: true,
        siteId: obj.siteId,
        path: obj.path,
      });
    }

    return Object.values(this.getArr(arr, 'site') as unknown).map((item) => {
      return (
        <div>
          {StreamlineEntries.getHeader(item)}
          <ul>
            {Object.values(item.children as unknown).map((itemInner) => {
              const obj = {
                siteId: itemInner.siteId,
                adminUrl: itemInner.adminUrl,
                path: itemInner.path,
              };

              return (
                <li class={`flex flex-col`}>
                  <div
                    class={`${this.h2} relative flex flex-wrap py-3 items-center`}
                  >
                    {parseInt(itemInner.siteId) ===
                      parseInt(stateInternal.currentSite.id) && (
                      <span
                        class={`text-green-600 w-3 inline-block mr-4 absolute left-[-18px] lg:w-4 lg:-left-6`}
                      >
                        <IconCheck />
                      </span>
                    )}
                    <div
                      data-focus={true}
                      role="button"
                      tabIndex={0}
                      onClick={() => selectSite(obj)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          selectSite(obj);
                        }
                      }}
                      class={`${this.tag} focus-white-out hover:text-blue-gray-50 hover:bg-blue-gray-900 hover:border-blue-gray-900`}
                    >
                      {itemInner.domain}
                    </div>
                    <p class={`${this.p} ml-2`}>
                      <span class={`font-semibold`}>Path: </span>
                      {itemInner.path}
                      <span class={`font-semibold`}> ID: </span>
                      {itemInner.blog_id}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      );
    });
  };

  // @ts-ignore
  private fav = () => {
    return (
      stateInternal.entriesFavActive?.length >= 1 &&
      (stateInternal.entriesFavActive || stateInternal.entriesFav) &&
      Object.values(
        (stateInternal.entriesFavActive || stateInternal.entriesFav) as unknown
      ).map((item) => {
        return item.type
          ? this[item.type === 'networkMenu' ? 'menu' : item.type]([item])
          : StreamlineEntries.getHeader(item);
      })
    );
  };

  // @ts-ignore
  private menu = (arr = []) => {
    return Object.values(this.getArr(arr, stateLocal.active) as unknown).map(
      (item) => {
        return (
          <div>
            {StreamlineEntries.getHeader(item)}
            <ul data-focus-parent={true}>
              {Object.values(item.children as unknown).map(
                (itemInner, indexInner) => {
                  return (
                    <li
                      key={indexInner}
                      class={`${this.border} flex flex-col pb-4 sm:flex-row`}
                    >
                      <h2
                        class={`${this.h2} mt-4 mr-4 leading-1 inline-block break-words sm:min-w-[120px] md:min-w-[200px]`}
                      >
                        {itemInner.name}
                      </h2>
                      {itemInner.children && (
                        <ul class={`flex flex-wrap`}>
                          {Object.values(itemInner.children as unknown).map(
                            (itemSub, indexSub) => {
                              return (
                                <li key={indexSub} class={`mt-4 mr-4`}>
                                  <streamline-button
                                    data-focus={true}
                                    type="menu"
                                    adminUrl={item.adminUrl}
                                    href={itemSub.href}
                                    index={item.index}
                                    indexInner={itemInner.index}
                                    indexSub={itemSub.index}
                                    path={itemSub.path}
                                    siteId={itemSub.siteId}
                                    text={itemSub.name}
                                    typeSub={itemSub.type}
                                  />
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
      }
    );
  };

  // @ts-ignore
  private post = (arr = []) => {
    return Object.values(this.getArr(arr, 'post') as unknown).map((item) => {
      return (
        <div>
          {StreamlineEntries.getHeader(item)}
          <ul>
            {Object.values(item.children as unknown).map((itemInner) => {
              return (
                <li class={`${this.border} flex flex-col py-3`}>
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
    stateInternal.entriesSettingsSave = {
      ...stateInternal.entriesSettingsSave,
      ...{
        [id]: {
          ...stateInternal.entriesSettingsSave[id],
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
        class={`px-2 leading-0 py-0.5 text-xs uppercase font-medium text-blue-gray-800 border bg-blue-gray-50 border-blue-gray-200`}
      >
        {props.key}
      </div>
    );

    return Object.values(stateInternal.entriesSettingsActive).map((item) => {
      return (
        <div>
          {StreamlineEntries.getHeader(item)}
          <ul class={`space-y-4`}>
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
                      class={`${this.h2} !text-lg mt-4 space-y-2 mb-6 inline-block leading-1 pb-2 border-b border-blue-gray-200`}
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
                                        stateInternal.entriesSettingsLoad[
                                          itemSub.id
                                        ].default
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
                                      class={`block bg-blue-gray-300 w-14 h-5 transition ease-in-out duration-200 group-hover:bg-blue-gray-400 peer-checked:bg-blue-500`}
                                    />
                                    <div
                                      class={`dot absolute left-1 top-1 bg-white w-3 h-3 transition ease-in-out duration-200`}
                                    />
                                  </div>
                                  <div class={`w-full`}>
                                    <div
                                      class={`text-base text-blue-gray-900 font-medium flex justify-between`}
                                    >
                                      {itemSub.name}
                                      {itemSub.keys && (
                                        <div
                                          class={`hidden space-x-2 mt-[-6px] md:flex ${
                                            stateInternal.entriesSettingsLoad[
                                              itemSub.id
                                            ].default
                                              ? ''
                                              : 'opacity-50'
                                          }`}
                                        >
                                          {itemSub.metaKey && (
                                            <Key
                                              key={
                                                stateInternal.isMac
                                                  ? 'cmd'
                                                  : 'ctrl'
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
                                      class={`mt-0.5 text-xs text-blue-gray-500`}
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
      (stateInternal.data.network &&
        !stateInternal.test &&
        !stateInternal.isLoading) ||
      stateInternal.testFull;

    return (
      <div
        class={`${
          isMultisite
            ? 'h-[calc(100%-24px)] lg:h-[calc(100%+56px)]'
            : 'h-full lg:h-[calc(100%+80px)]'
        } relative`}
      >
        {stateInternal.isLoading ? (
          <div
            class={`w-full h-[calc(100%-var(--sl-side-w))] flex items-center justify-center bg-white/50 absolute top-0 left-0 backdrop-blur-sm z-10`}
          >
            <Loader sm={false} />
          </div>
        ) : (
          <div
            tabindex={-1}
            class={`${
              this.px
            } focus-none inner pb-6 relative h-[calc(100%-var(--sl-side-w))] overflow-y-scroll overflow-x-hidden w-full bg-white lg:pb-10 ${
              stateInternal.isProcessing ? 'pointer-events-none opacity-50' : ''
            }`}
          >
            {stateInternal.isSlash
              ? this.slash()
              : stateInternal.isHelp
              ? this.help()
              : stateLocal.active === 'network'
              ? this.menu()
              : this[`${stateLocal.active}`]()}
          </div>
        )}
        {isMultisite && (
          <div
            class={`mt-auto px-3 h-6 bg-blue-gray-50 border-t border-blue-gray-200 flex items-center text-blue-gray-900`}
          >
            <span class={`flex whitespace-no-wrap`}>
              <span class={`text-[11px]`}>
                <span class={`font-semibold`}>Current site:</span>{' '}
                {stateInternal.currentSite.path} ∙{' '}
                <span class={`font-semibold`}>ID:</span>
                {stateInternal.currentSite.id}
              </span>
            </span>
          </div>
        )}
      </div>
    );
  }
}
