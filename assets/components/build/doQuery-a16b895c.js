import { e as capitalizeFirstLetter, a as state, s as state$1, c as setSearchPlaceholder, r as resetView } from './internal-77064a2d.js';

function doQuery(obj) {
  const current = capitalizeFirstLetter(state.active);
  state$1.isLoading = true;
  fetch(
  // @ts-ignore
  // eslint-disable-next-line no-undef
  `${streamline.rest}streamline/v1/${obj.callback}?siteId=${state$1.currentSite.id}&userId=${state$1.data.userId}&value=${obj.search}&amount=${state$1.entriesSettingsLoad.queryAmount.default}&page=${state$1[`entries${current}CurrentPage`]}`, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      // @ts-ignore
      // eslint-disable-next-line no-undef
      'X-WP-Nonce': streamline.nonceRest,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
    // console.log(data);
    state$1[`entries${capitalizeFirstLetter(obj.type)}`] = [
      {
        children: data.children,
        isMultisite: data.isMultisite,
        path: state$1.currentSite.path,
        queryValue: obj.search,
        siteId: state$1.currentSite.id,
        type: obj.type,
      },
    ];
    if (obj.type === 'post') {
      state$1.entriesPostCurrentPath = state$1.currentSite.path;
    }
    setSearchPlaceholder();
    if (obj.search !== state$1[`entries${current}Query`]) {
      state$1[`historySearches${capitalizeFirstLetter(obj.type)}`] = [
        obj.search,
        ...state$1[`historySearches${capitalizeFirstLetter(obj.type)}`],
      ];
    }
    if (obj.callback === 'posts' || obj.callback === 'sites') {
      resetView();
    }
    state$1.isLoading = false;
    state$1[`entries${current}Query`] = obj.search;
    state$1[`entries${current}Total`] = data.total;
  });
}

export { doQuery as d };
