// eslint-disable-next-line no-unused-vars
import { Component, h, Host } from '@stencil/core';
import { stateInternal } from '../../store/internal';
import hotkeys from 'hotkeys-js';
import { getMenu } from '../../utils/getMenu';

/**
 * Container.
 */
@Component({
  tag: 'streamline-container',
  shadow: true,
  styleUrl: 'streamline-container.scss',
})
export class StreamlineContainer {
  componentDidLoad() {
    hotkeys('command+k', function () {
      stateInternal.visible = !stateInternal.visible;
      return false;
    });

    getMenu();
  }

  render() {
    return (
      <Host>
        {stateInternal.visible && (
          <div class="fixed top-0 left-0 w-full h-full z-[9999999999999999]">
            <div
              tabIndex={-1}
              class="fixed top-0 left-0 w-full h-full bg-black/90"
              onClick={() => (stateInternal.visible = false)}
            />
            <streamline-box />
          </div>
        )}
      </Host>
    );
  }
}
