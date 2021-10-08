// eslint-disable-next-line no-unused-vars
import { Component, h, Element } from '@stencil/core';
import { stateLocal } from '../../store/local';
import { stateInternal } from '../../store/internal';
import { getFavourites } from '../../utils/getFavourites';

/**
 * Entries.
 */
@Component({
  tag: 'streamline-entries',
  shadow: true,
  styleUrl: 'streamline-entries.scss',
})
export class StreamlineEntries {
  private h2 = 'text-base text-gray-900 font-semibold';

  // eslint-disable-next-line no-undef
  @Element() el: HTMLStreamlineEntriesElement;

  private static getHeader(item, fav) {
    return (
      <div
        class={`mb-4 pb-1 flex justify-between items-end sticky top-0 bg-white z-10 border-b border-dotted border-gray-900`}
      >
        <div
          class={`w-[calc(100%+2px)] bg-white -top-6 h-12 absolute top-0 z-[-1]`}
        />
        <h1 class={`text-gray-900 font-medium text-xl mb-2 sm:text-2xl`}>
          {item.name}
        </h1>
        {fav && (
          <div class={`mb-1.5`}>
            {item.type === stateLocal.active &&
              getFavourites(stateInternal.entries, stateLocal.active) && (
                <streamline-button
                  header="favourite"
                  type="header"
                  typeSub={item.type}
                  icon="heart"
                />
              )}
          </div>
        )}
      </div>
    );
  }

  private renderEntries() {
    return (
      stateInternal.entriesActive !== null &&
      Object.values(stateInternal.entriesActive).map((item) => {
        return (
          <div>
            {StreamlineEntries.getHeader(item, true)}
            <ul>
              {item.children.map((itemInner, indexInner) => {
                return (
                  <li
                    key={indexInner}
                    class={`border-t border-gray-100 flex flex-col sm:flex-row first-of-type:border-none`}
                  >
                    <h2
                      class={`${this.h2} mt-3.5 mr-4 leading-1 inline-block  break-words sm:min-w-[120px] md:min-w-[200px]`}
                    >
                      {itemInner.name}
                    </h2>
                    {itemInner.children && (
                      <ul class={`flex flex-wrap gap-x-4 pb-4`}>
                        {Object.values(itemInner.children).map(
                          (itemSub, indexSub) => {
                            if (
                              indexInner + 1 === itemInner.children.length &&
                              indexSub + 1 ===
                                Object.values(itemInner.children).length
                            ) {
                              // console.log(this.el.shadowRoot);
                            }
                            return (
                              <li key={indexSub} class={`mt-4`}>
                                <streamline-button
                                  type="main"
                                  typeSub={
                                    // @ts-ignore
                                    itemSub.type
                                  }
                                  ident={
                                    // @ts-ignore
                                    itemSub.id
                                  }
                                  text={
                                    // @ts-ignore
                                    itemSub.name
                                  }
                                  href={
                                    // @ts-ignore
                                    itemSub.href
                                  }
                                  favourite={
                                    // @ts-ignore
                                    !!itemSub.favourite
                                  }
                                  index={
                                    // @ts-ignore
                                    item.index
                                  }
                                  indexInner={
                                    // @ts-ignore
                                    itemInner.index
                                  }
                                  indexSub={
                                    // @ts-ignore
                                    itemSub.index
                                  }
                                />
                              </li>
                            );
                          }
                        )}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })
    );
  }

  private renderSlash = () => {
    return (
      <div>
        {StreamlineEntries.getHeader({ name: 'Available commands' }, false)}
        <ul>
          {Object.values(stateInternal.commands).map((item) => {
            const type = item.name.substring(item.name.indexOf('[') - 1);
            const cmd = item.name.replace(type, '');

            return (
              <li class={`flex flex-col py-3`}>
                <h2 class={`${this.h2} mb-2`}>
                  <span>
                    {cmd}
                    <span class={`px-2 py-1.5 ml-2 bg-gray-200 text-gray-500`}>
                      {type.trim()}
                    </span>
                  </span>
                </h2>
                <p class={`text-gray-600 text-base mb-2`}>{item.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  render() {
    return (
      <div class={`h-full relative`}>
        <div
          class={`inner relative px-3 py-4 h-[calc(100%-var(--sl-side-w))] overflow-y-scroll overflow-x-hidden w-full bg-white sm:px-6 sm:py-6`}
          tabIndex={-1}
        >
          {stateInternal.isSlash
            ? this.renderSlash()
            : stateInternal.entries && this.renderEntries()}
        </div>
        {stateInternal.isLoading && (
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
        )}
      </div>
    );
  }
}
