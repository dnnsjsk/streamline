// eslint-disable-next-line no-unused-vars
import { Component, h, Host } from '@stencil/core';
import { stateInternal } from '../../store/internal';
import hotkeys from 'hotkeys-js';

/**
 * Container.
 */
@Component({
  tag: 'streamline-container',
  shadow: true,
  styleUrl: 'streamline-container.scss',
})
export class StreamlineContainer {
  connectedCallback() {
    hotkeys('command+k', function () {
      stateInternal.visible = !stateInternal.visible;
      return false;
    });
  }

  componentDidLoad() {
    let data = [];
    const menu = [];

    document.querySelectorAll('.menu-top > a').forEach((item) => {
      const name = (item as HTMLElement).innerText.replace(
        /(\r\n|\n|\r)/gm,
        ''
      );
      const href = item.getAttribute('href');

      const subMenu = item.closest('li.menu-top');
      const subArr = [];

      if (subMenu) {
        subMenu.querySelectorAll('a').forEach((itemSub) => {
          const nameSub = itemSub.innerText.replace(/(\r\n|\n|\r)/gm, '');
          const hrefSub = itemSub.getAttribute('href');

          subArr.push({
            name: nameSub,
            href: hrefSub,
          });
        });
      }

      menu.push({
        name,
        href,
        children: subArr,
      });
    });

    data = [
      ...data,
      {
        type: 'menu',
        name: 'Navigate to',
        children: menu,
      },
    ];

    stateInternal.entries = data;
    stateInternal.entriesActive = data;
  }

  render() {
    return (
      <Host>
        {stateInternal.visible && (
          <div class="container">
            <div
              tabIndex={-1}
              class="overlay"
              onClick={() => (stateInternal.visible = false)}
            />
            <streamline-box />
          </div>
        )}
      </Host>
    );
  }
}
