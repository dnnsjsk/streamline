// eslint-disable-next-line no-unused-vars
import { Component, Element, h } from '@stencil/core';
import { state } from '../../store/internal';
import { getMetaKey } from '../../utils/get/getMetaKey';

@Component({
  tag: 'streamline-entries',
  styleUrl: '../../css/tailwind.scss',
  shadow: true,
})
export class StreamlineEntries {
  // eslint-disable-next-line no-undef
  @Element() el: HTMLStreamlineEntriesElement;

  componentWillLoad() {
    document.addEventListener('keydown', (e) => {
      if (
        state.isVisible &&
        state.entriesSettingsLoad.keys.navigation &&
        state.active !== 'settings'
      ) {
        if (e.key === 'ArrowUp' && !getMetaKey(e)) {
          e.preventDefault();
          this.cycleEntries('up');
        }

        if (e.key === 'ArrowDown' && !getMetaKey(e)) {
          e.preventDefault();
          this.cycleEntries('down');
        }
      }
    });
  }

  private cycleEntries = (mode) => {
    const els = this.el.shadowRoot
      .querySelector('streamline-rows')
      .shadowRoot.querySelectorAll('streamline-row');
    let focusEls = [];
    els.forEach((item) => {
      if (!item.hasAttribute('disabled')) {
        focusEls = [...focusEls, item];
      }
    });
    const focusElsLength = focusEls.length;

    if (mode === 'down') {
      state.focusIndex++;
      if (state.focusIndex === focusElsLength) {
        state.focusIndex = 0;
      }
    } else {
      if (state.focusIndex === 0 || state.focusIndex === -1) {
        state.focusIndex = focusElsLength - 1;
      } else {
        state.focusIndex--;
      }
    }

    focusEls.forEach((item) => {
      item.removeAttribute('is-focus');
    });
    (focusEls[state.focusIndex] as HTMLElement).setAttribute('is-focus', '');
  };

  render() {
    return (
      <div
        class={{
          'relative mt-6 h-full w-full bg-white pb-6 lg:pb-10': true,
          'pointer-events-none opacity-50': state.isLoading,
        }}
      >
        {state.active === 'settings' ? (
          <streamline-settings />
        ) : (
          <streamline-rows />
        )}
      </div>
    );
  }
}
