// eslint-disable-next-line no-unused-vars
import { Component, Element, h, State, Host } from '@stencil/core';
import { stateInternal } from '../../store/internal';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { setActiveEntries } from '../../utils/setActiveEntries';

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
    setActiveEntries();
  }

  componentDidLoad() {
    setTimeout(() => {
      this.el.shadowRoot.querySelector('input').focus();
    }, 50);
  }

  disconnectedCallback() {
    clearAllBodyScrollLocks();
  }

  private static handleChange(event) {
    stateInternal.searchValue = event.target.value;
    setActiveEntries();
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
                onInput={(event) => StreamlineBox.handleChange(event)}
              />
            </div>
            <streamline-entries />
          </div>
        </div>
      </Host>
    );
  }
}
