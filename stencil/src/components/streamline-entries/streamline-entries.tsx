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

  componentDidRender() {
    const show = () => {
      (
        this.el.shadowRoot.querySelector('.container') as HTMLElement
      ).style.display = 'block';
    };

    show();
  }

  private renderEntries() {
    return (
      stateInternal.entriesActive !== null &&
      Object.values(stateInternal.entriesActive).map((item) => {
        return (
          <div>
            <div class={`header ${item.type}`}>
              <h1>{item.name}</h1>
              <div class="header__buttons">
                {((item.type === 'menu' &&
                  getFavourites(stateInternal.entries, 'menu')) ||
                  (item.type === 'flow' &&
                    getFavourites(stateInternal.entries, 'flow'))) && (
                  <streamline-button
                    header="favourite"
                    type="is-header"
                    typeSub={item.type}
                    icon="heart"
                  />
                )}
              </div>
            </div>
            <ul>
              {item.children.map((itemInner, indexInner) => {
                return (
                  <li key={indexInner} class="entry">
                    <h2 class={item.type}>{itemInner.name}</h2>
                    {itemInner.children && (
                      <ul class="container--sub">
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
                              <li key={indexSub} class="entry--sub">
                                <streamline-button
                                  type="is-main"
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
      <div class={`container`} tabIndex={-1}>
        {stateInternal.entries && this.renderEntries()}
      </div>
    );
  }
}
