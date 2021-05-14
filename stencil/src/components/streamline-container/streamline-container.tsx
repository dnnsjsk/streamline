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

      console.log(stateInternal.visible);
      return false;
    });
  }

  componentDidLoad() {
    const obj = [];
    const go = {};

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

      obj.push({
        name,
        href,
        children: subArr,
      });
    });

    obj.push(go);

    stateInternal.entriesAll = obj;
    stateInternal.entriesMenu = obj;
    stateInternal.entriesActive = obj;
  }

  render() {
    return (
      <Host>
        {stateInternal.visible && (
          <div class="container">
            <div class="overlay" />
            <streamline-box />
          </div>
        )}
      </Host>
    );
  }
}
