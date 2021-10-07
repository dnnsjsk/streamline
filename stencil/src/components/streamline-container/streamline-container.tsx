// eslint-disable-next-line no-unused-vars
import { Component, h, Host } from '@stencil/core';
import { stateInternal } from '../../store/internal';
import hotkeys from 'hotkeys-js';
import { stateLocal } from '../../store/local';
import { setActiveEntries } from '../../utils/setActiveEntries';
// @ts-ignore
// eslint-disable-next-line no-unused-vars
import { isEqual } from 'lodash-es';
// @ts-ignore
// eslint-disable-next-line no-unused-vars
import { diff } from 'deep-object-diff';

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

    /** Get menu. */
    const mainMenu = stateInternal.data.menu.top;
    const subMenu = stateInternal.data.menu.sub;

    let data = [];
    const menu = [];

    Object.entries(mainMenu).forEach(([key, value]) => {
      if (value[4] === 'wp-menu-separator') {
        delete mainMenu[key];
      }
    });

    function getUrl(top, sub) {
      return top === sub && top.includes('.php')
        ? top
        : sub.includes('.php') && !sub.includes('/')
        ? sub
        : top.includes('post_type')
        ? `${top}&page=${sub}`
        : !top.includes('.php') && !top.includes('/')
        ? `admin.php?page=${top}`
        : `${top}?page=${sub}`;
    }

    Object.values(mainMenu).forEach((item, index) => {
      const subArr = [];
      const name = item[0].trim();
      const url = getUrl(item[2], item[2]);

      if (subMenu[item[2]]) {
        Object.values(subMenu[item[2]]).forEach((itemSub, indexSub) => {
          const nameSub = itemSub[0].trim();
          const urlSub = getUrl(item[2], itemSub[2]);

          subArr.push({
            index: indexSub,
            type: 'menu',
            name: nameSub,
            nameParent: name,
            href: urlSub,
            favourite: !!stateLocal.menuFavourites.includes(urlSub),
          });
        });
      } else {
        subArr.push({
          index: 0,
          type: 'menu',
          name: name,
          nameParent: name,
          href: url,
          favourite: !!stateLocal.menuFavourites.includes(url),
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

    /** Get menu from WordPress. */

    let dataOld = [];
    const menuOld = [];

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
              index: subSubMenu.length === 1 ? indexSub : indexSub - 1,
              type: 'menu',
              name: nameSub,
              nameParent: name,
              href: hrefSub,
              favourite: !!stateLocal.menuFavourites.includes(hrefSub),
            });
          }
        });
      }

      menuOld.push({
        index,
        name,
        children: subArr,
      });
    });

    // eslint-disable-next-line no-unused-vars
    dataOld = [
      ...dataOld,
      {
        index: 0,
        type: 'menu',
        name: 'Navigate to',
        children: menuOld,
      },
    ];

    /** Test. */
    /*
    console.log(data);
    console.log(dataOld);
    console.log(isEqual(data, dataOld));
    console.log(diff(data, dataOld));
     */

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
