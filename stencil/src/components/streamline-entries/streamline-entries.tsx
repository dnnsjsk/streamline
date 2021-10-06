// eslint-disable-next-line no-unused-vars
import { Component, h, Element } from '@stencil/core';
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
  // eslint-disable-next-line no-undef
  @Element() el: HTMLStreamlineEntriesElement;

  private renderEntries() {
    return (
      stateInternal.entriesActive !== null &&
      Object.values(stateInternal.entriesActive).map((item) => {
        return (
          <div>
            <div
              class={`${item.type} mx-6 mb-4 pb-1 flex justify-between items-end sticky top-0 bg-white z-10 border-b border-dotted border-gray-900`}
            >
              <h1 class={`text-gray-900 font-medium text-2xl mt-5 mb-2`}>
                {item.name}
              </h1>
              <div class={`mb-1.5`}>
                {((item.type === 'menu' &&
                  getFavourites(stateInternal.entries, 'menu')) ||
                  (item.type === 'flow' &&
                    getFavourites(stateInternal.entries, 'flow'))) && (
                  <streamline-button
                    header="favourite"
                    type="header"
                    typeSub={item.type}
                    icon="heart"
                  />
                )}
              </div>
            </div>
            <ul>
              {item.children.map((itemInner, indexInner) => {
                return (
                  <li
                    key={indexInner}
                    class={`border-t border-gray-100 flex mx-6 flex-col sm:flex-row last-of-type:mb-4 first-of-type:border-none`}
                  >
                    <h2
                      class={`mt-3.5 mr-4 leading-1 text-base font-medium inline-block text-gray-900 sm:min-w-[120px] md:min-w-[200px]`}
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

  render() {
    return (
      <div
        class={`h-[calc(100%-var(--sl-side-w))] overflow-auto w-full`}
        tabIndex={-1}
      >
        {stateInternal.entries && this.renderEntries()}
      </div>
    );
  }
}
