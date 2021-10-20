// eslint-disable-next-line no-unused-vars
import { Component, h, Prop } from '@stencil/core';
import { stateInternal } from '../../store/internal';
import hotkeys from 'hotkeys-js';
import { setSearchPlaceholder } from '../../utils/setSearchPlaceholder';

/**
 * Container.
 */
@Component({
  tag: 'streamline-container',
  shadow: true,
  styleUrl: 'streamline-container.scss',
})
export class StreamlineContainer {
  @Prop() visible: boolean;

  connectedCallback() {
    stateInternal.visible = this.visible;

    setSearchPlaceholder();

    hotkeys('command+k', function () {
      stateInternal.visible = !stateInternal.visible;
      return false;
    });
  }

  render() {
    return (
      stateInternal.visible && (
        <div class="fixed top-0 left-0 w-full h-full z-[9999999999999999]">
          <div
            tabIndex={-1}
            class="fixed top-0 left-0 w-full h-full bg-black/90"
            onClick={() => (stateInternal.visible = false)}
          />
          <streamline-box />
        </div>
      )
    );
  }
}
