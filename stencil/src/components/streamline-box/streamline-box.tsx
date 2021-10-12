// eslint-disable-next-line no-unused-vars
import { Component, Element, h, Host } from '@stencil/core';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { setEntries } from '../../utils/setEntries';
import { focusSearch } from '../../utils/focusSearch';

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

  connectedCallback() {
    disableBodyScroll(this.el);
    setEntries();
  }

  componentDidLoad() {
    setTimeout(() => {
      focusSearch();
    }, 50);
  }

  disconnectedCallback() {
    clearAllBodyScrollLocks();
  }

  render() {
    return (
      <Host>
        <div class="inner w-full h-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[900px] max-h-[700px] bg-white overflow-hidden grid">
          <streamline-sidebar />
          <div class="wrap h-full absolute left-[var(--sl-side-w)] w-[calc(100%-var(--sl-side-w))]">
            <streamline-search class="h-[var(--sl-side-w)] w-full" />
            <streamline-entries />
          </div>
        </div>
      </Host>
    );
  }
}
