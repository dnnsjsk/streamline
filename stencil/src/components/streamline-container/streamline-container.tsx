// eslint-disable-next-line no-unused-vars
import { Component, h, Host } from '@stencil/core';
import { stateInternal } from '../../store/internal';
import hotkeys from 'hotkeys-js';
import { stateLocal } from '../../store/local';
import { setActiveEntries } from '../../utils/setActiveEntries';

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

    let data = [];
    const menu = [];

    document.querySelectorAll('.menu-top > a').forEach((item, index) => {
      const name = (item as HTMLElement).innerText.replace(
        /(\r\n|\n|\r)/gm,
        ''
      );

      const subMenu = item.closest('li.menu-top');
      const subArr = [];

      if (subMenu) {
        const subSubMenu = subMenu.querySelectorAll('a');
        subSubMenu.forEach((itemSub, indexSub) => {
          if (
            (indexSub !== 0 && subSubMenu.length >= 2) ||
            (indexSub === 0 && subSubMenu.length === 1)
          ) {
            const nameSub = itemSub.innerText.replace(/(\r\n|\n|\r)/gm, '');
            const hrefSub = itemSub.getAttribute('href');

            subArr.push({
              index: indexSub - 1,
              type: 'menu',
              name: nameSub,
              nameParent: name,
              href: hrefSub,
              favourite: !!stateLocal.menuFavourites.includes(hrefSub),
            });
          }
        });
      }

      menu.push({
        index,
        name,
        children: subArr,
      });
    });

    data = [
      ...data,
      {
        index: 0,
        type: 'menu',
        name: 'Navigate to',
        children: menu,
      },
    ];

    stateInternal.entries = data;
    stateInternal.entriesActive = data;
    setActiveEntries();
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
