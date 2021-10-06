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
        <div class="inner w-full h-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[900px] max-h-[700px] bg-white overflow-hidden grid">
          <streamline-sidebar />
          <div class="wrap h-full absolute left-[var(--sl-side-w)] w-[calc(100%-var(--sl-side-w))]">
            <div class="focus">
              <input
                part="search"
                class="px-4 sm:px-6 search h-[var(--sl-side-w)] text-[1.15rem] w-full h-full m-0 p-0 border-b border-gray-300"
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
