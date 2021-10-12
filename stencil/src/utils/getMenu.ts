import { stateInternal } from '../store/internal';
import { setEntries } from './setEntries';
import { resetView } from './resetView';
import { stateLocal } from '../store/local';

export function getMenu(obj = {} as any) {
  let data = [];
  const menu = {};

  const isAdmin = document.querySelector('#adminmenuwrap') && !obj.adminUrl;
  const adminUrl = obj.adminUrl || stateInternal.data.adminUrl;
  const siteId = obj.siteId || stateInternal.data.siteId;

  function get(doc) {
    doc.querySelectorAll('.menu-top > a').forEach((item, index) => {
      const name = (item as HTMLElement).innerText.replace(
        /(\r\n|\n|\r)/gm,
        ''
      );

      const subMenu = item.closest('li.menu-top');
      const subArr = {};

      if (subMenu) {
        const subSubMenu = subMenu.querySelectorAll('a');
        subSubMenu.forEach((itemSub, indexSub) => {
          if (
            (indexSub !== 0 && subSubMenu.length >= 2) ||
            (indexSub === 0 && subSubMenu.length === 1)
          ) {
            const nameSub = itemSub.innerText.replace(/(\r\n|\n|\r)/gm, '');
            const hrefSub = itemSub.getAttribute('href');

            subArr[hrefSub] = {
              adminUrl,
              href: stateInternal.data.adminUrl + hrefSub,
              index: subSubMenu.length === 1 ? indexSub : indexSub - 1,
              name: nameSub,
              nameParent: name,
              path: hrefSub,
              siteId: Number(siteId),
              type: 'menu',
            };
          }
        });
      }

      menu[name] = {
        index,
        name,
        children: subArr,
      };
    });

    data = [
      {
        adminUrl,
        children: menu,
        name:
          obj.site || stateInternal.data.isMultisite
            ? `Navigate to (site: ${obj.site || stateInternal.data.path})`
            : `Navigate to`,
        siteId: Number(siteId),
        type: 'menu',
      },
    ];

    stateInternal.entriesMenu = data;
    stateInternal.entriesMenuActive = data;
    setEntries();
  }

  if (isAdmin) {
    get(document);
  } else {
    stateInternal.isLoading = true;
    fetch(obj.adminUrl || stateInternal.data.adminUrl)
      .then((response) => response.text())
      .then((data) => {
        const parser = new DOMParser();
        const html = parser.parseFromString(data, 'text/html');
        get(html);
        resetView();
        stateLocal.active = 'menu';
      });
  }
}
