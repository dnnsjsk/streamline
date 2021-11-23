// eslint-disable-next-line no-unused-vars
import { Component, Element, h } from '@stencil/core';

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

  render() {
    return (
      <div class="inner w-full h-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[1000px] max-h-[700px] bg-white overflow-hidden grid">
        <streamline-sidebar />
        <div class="h-full absolute left-[var(--sl-side-w)] w-[calc(100%-var(--sl-side-w))]">
          <div
            class={`bg-blue-gray-50 grid grid-cols-[1fr,var(--sl-side-w)] lg:grid-cols-[1fr,64px]`}
          >
            <streamline-search class="h-[var(--sl-side-w)] w-full lg:h-[64px]" />
            <streamline-button icon="dots" type="icon" type-sub="context" />
          </div>
          <streamline-entries />
        </div>
      </div>
    );
  }
}
