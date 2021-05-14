// eslint-disable-next-line no-unused-vars
import { Component, h, Element } from '@stencil/core';
import { stateInternal } from '../../store/internal';

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
    return [stateInternal.entriesActive].map((item) => {
      return Object.values(item).map((itemInner, indexInner) => {
        return (
          <li key={indexInner} class="entry">
            <h1>{itemInner.name}</h1>
            {itemInner.children && (
              <ul class="container-sub">
                {Object.values(itemInner.children).map((itemSub, indexSub) => {
                  if (
                    indexInner + 1 === itemInner.children.length &&
                    indexSub + 1 === Object.values(itemInner.children).length
                  ) {
                    // console.log(this.el.shadowRoot);
                  }
                  return (
                    <li key={indexSub} class="entry-sub">
                      <streamline-button
                        type="is-main"
                        text={
                          // @ts-ignore
                          itemSub.name
                        }
                      />
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        );
      });
    });
  }

  render() {
    return (
      <ul tabIndex={-1} class="container">
        {stateInternal.entriesActive && this.renderEntries()}
      </ul>
    );
  }
}
