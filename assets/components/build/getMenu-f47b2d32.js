import { s as state } from './capitalizeFirstLetter-a06ceb0e.js';
import { b as setEntries, r as resetView, s as state$1 } from './setSearchPlaceholder-f92c7cd9.js';

function getMenu(obj = {}) {
  let data = [];
  const menu = {};
  const isAdmin = document.querySelector('#adminmenuwrap') && !obj.adminUrl && !obj.network;
  const isNetwork = obj.network || state.data.isNetwork;
  const isMultisite = !!state.data.network;
  const adminUrl = obj.adminUrl ||
    (isNetwork ? state.data.network : state.data.adminUrl);
  const siteId = obj.siteId || (isNetwork ? 0 : state.data.siteId);
  const type = !obj.path && isNetwork ? 'networkMenu' : 'menu';
  function get(doc) {
    doc.querySelectorAll('.menu-top > a').forEach((item, index) => {
      const name = item.innerText.replace(/(\r\n|\n|\r)/gm, '');
      const subMenu = item.closest('li.menu-top');
      const subArr = {};
      if (subMenu) {
        const subSubMenu = subMenu.querySelectorAll('a');
        subSubMenu.forEach((itemSub, indexSub) => {
          if ((indexSub !== 0 && subSubMenu.length >= 2) ||
            (indexSub === 0 && subSubMenu.length === 1)) {
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
        path: obj.path || state.data.path,
        siteId: Number(siteId),
        type: type,
      },
    ];
    state.entriesMenu = data;
    state.entriesMenuActive = data;
    state.entriesMenuCurrentPath = obj.path || state.data.path;
    state.entriesMenuIsNetwork = obj.network;
    setEntries();
  }
  if (isAdmin) {
    get(document);
  }
  else {
    state.isLoading = true;
    fetch(adminUrl)
      .then((response) => response.text && response.text())
      .then((data) => {
      const parser = new DOMParser();
      const html = parser.parseFromString(data, 'text/html');
      get(html);
      resetView();
      state$1.active = 'menu';
      // console.log(stateInternal.entriesMenu);
    })
      .catch((error) => console.log(error));
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

export { getMenu as g };
