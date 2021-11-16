// eslint-disable-next-line no-unused-vars
import { Component, Element, h } from '@stencil/core';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { setEntries } from '../../utils/setEntries';
import { onChangeInternal } from '../../store/internal';

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
    setEntries();
  }

  componentDidLoad() {
    onChangeInternal('visible', (value) => {
      if (value === true) {
        disableBodyScroll(
          this.el.shadowRoot
            .querySelector('streamline-entries')
            .shadowRoot.querySelector('div > div'),
          {
            reserveScrollBarGap: true,
          }
        );
      } else {
        clearAllBodyScrollLocks();
      }
    });
  }

  render() {
    return (
      <div class="inner w-full h-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[1000px] max-h-[700px] bg-white overflow-hidden grid">
        <streamline-sidebar />
        <div class="wrap h-full absolute left-[var(--sl-side-w)] w-[calc(100%-var(--sl-side-w))]">
          <streamline-search class="h-[var(--sl-side-w)] w-full" />
          <streamline-entries />
        </div>
      </div>
    );
  }
}
