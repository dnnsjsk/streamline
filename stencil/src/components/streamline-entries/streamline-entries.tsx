// eslint-disable-next-line no-unused-vars
import { Component, h, Element } from '@stencil/core';
import { stateInternal } from '../../store/internal';
import { getMenu } from '../../utils/getMenu';
import { stateLocal } from '../../store/local';
import { setEntries } from '../../utils/setEntries';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';

/**
 * Entries.
 */
@Component({
  tag: 'streamline-entries',
  shadow: true,
  styleUrl: 'streamline-entries.scss',
})
export class StreamlineEntries {
  private h2 = 'text-base text-gray-900 font-medium';
  private p = 'text-gray-600 text-base font-normal';
  private tag =
    'px-2.5 py-1.5 bg-gray-200 text-gray-500 inline-block h-[max-content] leading-1';

  private border = 'border-t border-gray-100 first-of-type:border-none';

  // eslint-disable-next-line no-undef
  @Element() el: HTMLStreamlineEntriesElement;

  connectedCallback() {
    if (stateLocal.active !== 'fav' && stateLocal.active !== 'post') {
      this[`g${stateLocal.active}`]();
    }
    setEntries();
  }

  // @ts-ignore
  private gmenu = () => {
    if (stateInternal.entriesMenu.length === 0) {
      getMenu({});
    }
  };

  private static getHeader(item) {
    return (
      <div
        class={`pt-5 mb-4 pb-1 flex justify-between items-end sticky -top-2 bg-white z-10 border-b border-dotted border-gray-900 sm:pt-6 sm:-top-2 lg:pt-8 lg:-top-4`}
      >
        <h1
          class={`text-gray-900 font-medium text-xl mb-2 sm:text-2xl`}
          innerHTML={
            stateLocal.active === 'fav'
              ? item.title
              : item.titleAlt || item.title
          }
        />
      </div>
    );
  }

  private getArr = (arr, type) => {
    return (
      (arr.length >= 1 && arr) ||
      (stateInternal[`entries${capitalizeFirstLetter(type)}Active`]?.length >=
        1 &&
        (stateInternal[`entries${capitalizeFirstLetter(type)}Active`] ||
          stateInternal[`entries${capitalizeFirstLetter(type)}`]))
    );
  };

  private slash = () => {
    return (
      <div>
        {StreamlineEntries.getHeader({
          title: 'Available commands current mode',
        })}
        <ul>
          {Object.values(stateInternal.commands.local).map((item) => {
            const type = item.name.substring(item.name.indexOf('[') - 1);
            const cmd = item.name.replace(type, '');

            return (
              <li class={`flex flex-col py-3`}>
                <h2 class={`${this.h2} mb-2`}>
                  <span>
                    {cmd}
                    <span class={`${this.tag} ml-2`}>{type.trim()}</span>
                  </span>
                </h2>
                <p class={`${this.p}`}>{item.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  private site = () => {
    return Object.values(stateInternal.entriesSite).map((item) => {
      return (
        <div>
          {StreamlineEntries.getHeader(item)}
          <ul>
            {Object.values(item.children as unknown).map((itemInner) => {
              const obj = {
                siteId: itemInner.siteId,
                adminUrl: itemInner.adminUrl,
                site: itemInner.path,
              };

              return (
                <li class={`flex flex-col`}>
                  <div
                    class={`${this.h2} inline-grid grid-flow-col auto-cols-max py-3 items-center`}
                  >
                    <div class={`focus`}>
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => getMenu(obj)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            getMenu(obj);
                          }
                        }}
                        class={`${this.tag} hover:text-gray-50 hover:bg-gray-900 hover:border-gray-900`}
                      >
                        {itemInner.domain}
                      </div>
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
          ? this[item.type]([item])
          : StreamlineEntries.getHeader(item);
      })
    );
  };

  // @ts-ignore
  private menu = (arr = []) => {
    return Object.values(this.getArr(arr, 'menu') as unknown).map((item) => {
      return (
        <div>
          {StreamlineEntries.getHeader(item)}
          <ul>
            {Object.values(item.children as unknown).map(
              (itemInner, indexInner) => {
                return (
                  <li
                    key={indexInner}
                    class={`${this.border} flex flex-col sm:flex-row`}
                  >
                    <h2
                      class={`${this.h2} mt-3.5 mr-4 leading-1 inline-block break-words sm:min-w-[120px] md:min-w-[200px]`}
                    >
                      {itemInner.name}
                    </h2>
                    {itemInner.children && (
                      <ul class={`flex flex-wrap gap-x-4 pb-4`}>
                        {Object.values(itemInner.children as unknown).map(
                          (itemSub, indexSub) => {
                            return (
                              <li key={indexSub} class={`mt-4`}>
                                <streamline-button
                                  type="main"
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
    });
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
                <li class={`${this.border} flex flex-col pt-4 pb-3`}>
                  <streamline-post
                    href-edit={itemInner.hrefEdit}
                    href-view={itemInner.guid}
                    post-id={itemInner.ID}
                    post-title={itemInner.post_title}
                    post-type={itemInner.post_type}
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

  render() {
    return (
      <div class={`h-full relative`}>
        {stateInternal.isLoading ? (
          <div
            class={`w-full h-[calc(100%-var(--sl-side-w))] flex items-center justify-center bg-white/50 absolute top-0 left-0 backdrop-blur-sm z-10`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
              data-prefix="far"
              data-icon="spinner-third"
              class={`w-10 h-10 animate-spin`}
              role="img"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M460.116 373.846l-20.823-12.022c-5.541-3.199-7.54-10.159-4.663-15.874 30.137-59.886 28.343-131.652-5.386-189.946-33.641-58.394-94.896-95.833-161.827-99.676C261.028 55.961 256 50.751 256 44.352V20.309c0-6.904 5.808-12.337 12.703-11.982 83.556 4.306 160.163 50.864 202.11 123.677 42.063 72.696 44.079 162.316 6.031 236.832-3.14 6.148-10.75 8.461-16.728 5.01z"
              />
            </svg>
          </div>
        ) : (
          <div
            class={`inner pb-3 sm:pb-6 relative px-3 h-[calc(100%-var(--sl-side-w))] overflow-y-scroll overflow-x-hidden w-full bg-white sm:px-6 lg:px-8`}
            tabIndex={-1}
          >
            {stateInternal.isSlash && !stateInternal.isSites
              ? this.slash()
              : stateInternal.isSites
              ? this.site()
              : this[`${stateLocal.active}`]()}
          </div>
        )}
      </div>
    );
  }
}
