import { state } from '../../store/internal';
import { setSearchPlaceholder } from '../set/setSearchPlaceholder';
import { resetView } from '../general/resetView';
import { capitalizeFirstLetter } from '../string/capitalizeFirstLetter';
import { stateLocal } from '../../store/local';

export function doQuery(obj) {
  state.isLoading = true;
  fetch(
    // @ts-ignore
    // eslint-disable-next-line no-undef
    `${streamline.rest}streamline/v1/${obj.callback}?siteId=${state.currentSite.id}&userId=${state.data.userId}&value=${obj.search}&amount=${state.entriesSettingsLoad.queryAmount.default}`,
    {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        // @ts-ignore
        // eslint-disable-next-line no-undef
        'X-WP-Nonce': streamline.nonceRest,
        'Content-Type': 'application/json',
      },
    }
  )
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
      state[`entries${capitalizeFirstLetter(stateLocal.active)}IsQuery`] = true;
    });
}
