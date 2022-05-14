import { s as state } from './internal-1f00f851.js';
import { s as setSearchPlaceholder } from './setSearchPlaceholder-794cddd3.js';
import { s as setEntries } from './setEntries-23b70b3a.js';
import { c as capitalizeFirstLetter } from './capitalizeFirstLetter-646b80d8.js';

const data = (method = 'GET') => {
  var _a;
  return {
    method: method,
    credentials: 'same-origin',
    headers: {
      // @ts-ignore
      // eslint-disable-next-line no-undef
      'X-WP-Nonce': (_a = window === null || window === void 0 ? void 0 : window.streamline) === null || _a === void 0 ? void 0 : _a.nonceRest,
      'Content-Type': 'application/json',
    },
  };
};

const post = (obj) => {
  var _a;
  state.isLoading = true;
  fetch(
  // @ts-ignore
  // eslint-disable-next-line no-undef
  `${(_a = window === null || window === void 0 ? void 0 : window.streamline) === null || _a === void 0 ? void 0 : _a.rest}streamline/v1/${obj.route}?siteId=${state.currentSite.id}&userId=${state.data.userId}&type=${obj.type}&values=${JSON.stringify(obj.values)}`, data('POST'))
    .then((response) => response && response.json())
    .then(() => {
    state.isLoading = false;
    obj.callback && obj.callback();
  })
    .catch(() => {
    state.isLoading = false;
  });
};

const resetView = () => {
  var _a, _b, _c, _d;
  state.isLoading = false;
  state.searchValue = '';
  if (state.active === 'site' || state.active === 'post') {
    state.isEnter = state.searchValue !== '';
  }
  else {
    state.isEnter = false;
  }
  setEntries();
  (_d = (_c = (_b = (_a = document
    .querySelector('streamline-container')) === null || _a === void 0 ? void 0 : _a.shadowRoot.querySelector('streamline-entries')) === null || _b === void 0 ? void 0 : _b.shadowRoot) === null || _c === void 0 ? void 0 : _c.querySelector('.inner')) === null || _d === void 0 ? void 0 : _d.scrollTo(0, 0);
};

const get = (obj) => {
  const current = capitalizeFirstLetter(obj.tab || state.active);
  state.isLoading = true;
  fetch(
  // @ts-ignore
  // eslint-disable-next-line no-undef
  `${window.streamline.rest}streamline/v1/${obj.route}?siteId=${state.currentSite.id}&userId=${state.data.userId}&value=${obj.value}&amount=${state.entriesSettingsLoad.query.amount}&page=${state[`entries${current}CurrentPage`]}`, data())
    .then((response) => response.json())
    .then((data) => {
    // console.log(data);
    state[`entries${capitalizeFirstLetter(obj.type)}`] = [
      {
        children: data.children,
        isMultisite: data.isMultisite,
        path: state.currentSite.path,
        queryValue: obj.value,
        siteId: state.currentSite.id,
        type: obj.type,
      },
    ];
    if (obj.type === 'post') {
      state.entriesPostCurrentPath = state.currentSite.path;
    }
    setSearchPlaceholder();
    if (obj.value !== state[`entries${current}Query`]) {
      state[`historySearches${capitalizeFirstLetter(obj.type)}`] = [
        obj.value,
        ...state[`historySearches${capitalizeFirstLetter(obj.type)}`],
      ];
    }
    if (obj.route === 'get/posts' || obj.route === 'get/sites') {
      resetView();
    }
    state[`entries${current}Query`] = obj.value;
    state[`entries${current}Total`] = data.total;
    obj.callback && obj.callback();
    state.isLoading = false;
  });
};

export { get as g, post as p, resetView as r };
