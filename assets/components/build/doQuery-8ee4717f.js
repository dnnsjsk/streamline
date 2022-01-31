import { s as state, b1 as capitalizeFirstLetter, c as setSearchPlaceholder, r as resetView, a as state$1 } from './internal-ed7314ff.js';

function doQuery(obj) {
  state.isLoading = true;
  fetch(
  // @ts-ignore
  // eslint-disable-next-line no-undef
  `${streamline.rest}streamline/v1/${obj.callback}?siteId=${state.currentSite.id}&userId=${state.data.userId}&value=${obj.search}&amount=${state.entriesSettingsLoad.queryAmount.default}`, {
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
    console.log(data);
    state[`entries${capitalizeFirstLetter(obj.type)}`] = [
      {
        children: data.children,
        isMultisite: data.isMultisite,
        path: state.currentSite.path,
        queryValue: obj.search,
        siteId: state.currentSite.id,
        type: obj.type,
      },
    ];
    if (obj.type === 'post') {
      state.entriesPostCurrentPath = state.currentSite.path;
    }
    setSearchPlaceholder();
    state[`historySearches${capitalizeFirstLetter(obj.type)}`] = [
      obj.search,
      ...state[`historySearches${capitalizeFirstLetter(obj.type)}`],
    ];
    if (obj.callback === 'posts' || obj.callback === 'sites') {
      resetView();
    }
    state.isLoading = false;
    state[`entries${capitalizeFirstLetter(state$1.active)}IsQuery`] = true;
  });
}

export { doQuery as d };
