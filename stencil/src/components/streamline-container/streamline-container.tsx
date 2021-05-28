// eslint-disable-next-line no-unused-vars
import { Component, h, Host } from '@stencil/core';
import { stateInternal } from '../../store/internal';
import hotkeys from 'hotkeys-js';
import { stateLocal } from '../../store/local';
import { setFavourites } from '../../utils/setFavourites';
import { getFavourites } from '../../utils/getFavourites';

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
    /**
     * Shortcut.
     */

    hotkeys('command+k', function () {
      stateInternal.visible = !stateInternal.visible;
      return false;
    });

    /**
     * Set all vars.
     */
    let data = [];
    const menu = [];

    /**
     * Get the menu.
     */
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
              name: nameSub,
              nameParent: name,
              href: hrefSub,
              favourite: !!stateLocal.favourites.includes(hrefSub),
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
        type: 'menu',
        name: 'Navigate to',
        children: menu,
      },
    ];

    /**
     * Set final data.
     */
    stateInternal.entries = data;
    stateInternal.entriesActive = data;
    stateInternal.entriesFavourites = getFavourites();
  }

  componentDidLoad() {
    setFavourites();
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
