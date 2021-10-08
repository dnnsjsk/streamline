import { stateLocal } from '../store/local';
import { stateInternal } from '../store/internal';
import { setActiveEntries } from './setActiveEntries';

export function getMenu() {
  let data = [];
  const menu = [];

  const isAdmin = document.querySelector('#adminmenuwrap');

  function get(doc) {
    doc.querySelectorAll('.menu-top > a').forEach((item, index) => {
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
              href: stateInternal.data.adminUrl + hrefSub,
              favourite: !!stateLocal.menuFavourites.includes(
                stateInternal.data.adminUrl + hrefSub
              ),
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

  if (isAdmin) {
    get(document);
  } else {
    stateInternal.isLoading = true;
    fetch(stateInternal.data.adminUrl)
      .then((response) => response.text())
      .then((data) => {
        const parser = new DOMParser();
        const html = parser.parseFromString(data, 'text/html');
        get(html);
        stateInternal.isLoading = false;
      });
  }
}
