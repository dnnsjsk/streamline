import { state } from '../../store/internal';
import { setSearchPlaceholder } from '../set/setSearchPlaceholder';
import { resetView } from '../general/resetView';
import { capitalizeFirstLetter } from '../string/capitalizeFirstLetter';
import { data } from './data';

export const get = (obj) => {
  const current = capitalizeFirstLetter(obj.tab || state.active);

  state.isLoading = true;
  fetch(
    // @ts-ignore
    // eslint-disable-next-line no-undef
    `${window.streamline.rest}streamline/v1/${obj.route}?siteId=${
      state.currentSite.id
    }&userId=${state.data.userId}&value=${obj.value}&amount=${
      state.entriesSettingsLoad.query.amount
    }&page=${state[`entries${current}CurrentPage`]}`,
    data() as any
  )
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
