import { s as state, b as setEntries, r as resetView, a as state$1 } from './internal-99b91fa4.js';

function getMenu(obj = {}) {
  let data = [];
  const menu = {};
  const isAdmin = document.querySelector('#adminmenuwrap') &&
    ((obj.network && state.data.isNetwork) ||
      (!obj.network && state.data.isAdmin && !state.data.isNetwork));
  const isNetwork = obj.network;
  const isMultisite = !!state.data.network;
  const adminUrl = obj.adminUrl || (isNetwork ? state.data.network : state.data.adminUrl);
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
          var _a;
          if ((indexSub !== 0 && subSubMenu.length >= 2) ||
            (indexSub === 0 && subSubMenu.length === 1)) {
            const nameText = (_a = [...itemSub.childNodes]
              .find((child) => child.nodeType === Node.TEXT_NODE)) === null || _a === void 0 ? void 0 : _a.textContent.trim();
            const nameSub = itemSub.querySelector('.update-count')
              ? nameText +
                ` (${itemSub.querySelector('.update-count').innerHTML})`
              : itemSub.innerText.replace(/(\r\n|\n|\r)/gm, '');
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
        path: obj.path || state.currentSite.path,
        siteId: Number(siteId),
        type: type,
      },
    ];
    if (isNetwork) {
      state.entriesNetworkMenu = data;
      state.entriesNetworkMenuActive = data;
    }
    else {
      state.entriesMenu = data;
      state.entriesMenuActive = data;
      state.entriesMenuCurrentPath = obj.path || state.currentSite.path;
    }
    setEntries();
  }
  if (isAdmin && !obj.fetch) {
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
    })
      .catch(() => { });
  }
}

function getMenus() {
  if (!state.test) {
    if (state$1.active === 'menu' && state.entriesMenu.length === 0) {
      getMenu({ network: false, adminUrl: state.data.adminUrl });
    }
    if (state$1.active === 'networkMenu' &&
      state.entriesNetworkMenu.length === 0) {
      getMenu({ network: true });
    }
  }
}

export { getMenu as a, getMenus as g };
