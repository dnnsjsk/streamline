// eslint-disable-next-line no-unused-vars
import { Component, Element, h, State, Host } from '@stencil/core';
import { filterDeep } from 'deepdash-es/standalone';
import { stateInternal } from '../../store/internal';
import { stateLocal } from '../../store/local';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

/**
 * Box.
 */
@Component({
  tag: 'streamline-box',
  shadow: true,
  styleUrl: 'streamline-box.scss',
})
export class StreamlineBox {
  // eslint-disable-next-line no-undef
  @Element() el: HTMLStreamlineBoxElement;

  @State() value: string;

  connectedCallback() {
    disableBodyScroll(this.el);
  }

  componentDidLoad() {
    setTimeout(() => {
      this.el.shadowRoot.querySelector('input').focus();
    }, 50);
  }

  disconnectedCallback() {
    clearAllBodyScrollLocks();
  }

  private handleChange(event) {
    this.value = event.target.value;

    /**
     * Check if favourites or not.
     */
    const entries =
      stateLocal.menuMode === 'favourite'
        ? stateInternal.entriesFavourites
        : stateInternal.entries;

    /**
     * Filter entries.
     */
    const filter = filterDeep(
      entries.filter((val) => Object.keys(val).length !== 0),
      (o) => {
        return (
          (o.name.toLowerCase().includes(this.value.toLowerCase()) ||
            (o.nameParent &&
              o.nameParent.toLowerCase().includes(this.value.toLowerCase()))) &&
          o.href
        );
      },
      { childrenPath: ['children'] }
    );

    /**
     * Show entries or reset if value is empty.
     */
    if (this.value === '') {
      stateInternal.entriesActive = entries;
    } else if (filter !== null || filter !== '') {
      stateInternal.entriesActive = filter;
    }
  }

  render() {
    return (
      <Host>
        <div class="container">
          <streamline-sidebar />
          <div class="inner">
            <div class="focus">
              <input
                part="search"
                class="search"
                type="text"
                placeholder="Search for anything"
                onInput={(event) => this.handleChange(event)}
              />
            </div>
            {stateLocal.active === 'menu' && <streamline-entries />}
          </div>
        </div>
      </Host>
    );
  }
}
