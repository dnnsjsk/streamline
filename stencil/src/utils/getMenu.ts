import { stateInternal } from '../store/internal';
import { setEntries } from './setEntries';
import { resetView } from './resetView';
import { stateLocal } from '../store/local';

export function getMenu(obj = {} as any) {
  let data = [];
  const menu = {};

  const isAdmin =
    document.querySelector('#adminmenuwrap') && !obj.adminUrl && !obj.network;
  const isNetwork = obj.network || stateInternal.data.isNetwork;
  const isMultisite = stateInternal.data.network;
  const adminUrl =
    obj.adminUrl ||
    (isNetwork ? stateInternal.data.network : stateInternal.data.adminUrl);
  const siteId = obj.siteId || (isNetwork ? 0 : stateInternal.data.siteId);
  const type = !obj.path && isNetwork ? 'networkMenu' : 'menu';

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
              href: adminUrl + hrefSub,
              index: subSubMenu.length === 1 ? indexSub : indexSub - 1,
              name: nameSub,
              nameParent: name,
              path: hrefSub,
              siteId: Number(siteId),
              type: type,
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
        isMultisite: isMultisite,
        path: obj.path || stateInternal.data.path,
        siteId: Number(siteId),
        type: type,
      },
    ];

    stateInternal.entriesMenu = data;
    stateInternal.entriesMenuActive = data;
    stateInternal.entriesMenuCurrentPath = obj.path || stateInternal.data.path;
    stateInternal.entriesMenuIsNetwork = obj.network;

    setEntries();
  }

  if (isAdmin) {
    get(document);
  } else {
    stateInternal.isLoading = true;
    fetch(adminUrl)
      .then((response) => response.text())
      .then((data) => {
        const parser = new DOMParser();
        const html = parser.parseFromString(data, 'text/html');
        get(html);
        resetView();
        stateLocal.active = 'menu';

        // console.log(stateInternal.entriesMenu);
      });
    // @ts-ignore
    // eslint-disable-next-line no-undef
    /*
    fetch(streamline.ajax, {
      method: 'POST',
      credentials: 'same-origin',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      body: `action=streamlineMenu&url=${
        obj.adminUrl || stateInternal.data.adminUrl
        // @ts-ignore
        // eslint-disable-next-line no-undef
      }&nonce=${streamline.nonce}`,
    })
      .then((response) => response.text())
      .then((data) => {
        const parser = new DOMParser();
        const html = parser.parseFromString(data, 'text/html');
        console.log(html);
        get(html);
        resetView();
        stateLocal.active = 'menu';
      });
     */
  }
}
