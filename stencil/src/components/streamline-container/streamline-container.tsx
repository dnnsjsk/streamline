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

    /**
     * Get the flows.
     */
    data = [
      ...data,
      {
        index: 1,
        type: 'flow',
        name: 'Start a flow',
        children: [
          {
            index: 0,
            name: 'General',
            children: [
              {
                index: 0,
                id: 'create-oxy',
                type: 'flow',
                name: 'Create new page and open with Oxygen',
                nameParent: 'General',
                favourite: !!stateLocal.flowFavourites.includes('create-oxy'),
              },
              {
                index: 1,
                id: 'create-fancy',
                type: 'flow',
                name: 'Do something else fancy',
                nameParent: 'General',
                favourite: !!stateLocal.flowFavourites.includes('create-fancy'),
              },
            ],
          },
          {
            index: 1,
            name: 'Elementor',
            children: [
              {
                index: 0,
                id: 'a-job',
                type: 'flow',
                name: 'Oh wow another job',
                nameParent: 'Elementor',
                favourite: !!stateLocal.flowFavourites.includes('a-job'),
              },
              {
                index: 1,
                id: 'much-great',
                type: 'flow',
                name: 'That is much great',
                nameParent: 'Elementor',
                favourite: !!stateLocal.flowFavourites.includes('much-great'),
              },
            ],
          },
        ],
      },
    ];

    /**
     * Set final data.
     */
    stateInternal.entries = data;
    stateInternal.entriesActive = data;
    setActiveEntries();
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
