import { state } from '../../store/internal';
import { data } from './data';

export function post(obj) {
  state.isLoading = true;
  fetch(
    // @ts-ignore
    // eslint-disable-next-line no-undef
    `${window?.streamline?.rest}streamline/v1/${obj.route}?siteId=${
      state.currentSite.id
    }&userId=${state.data.userId}&type=${obj.type}&values=${JSON.stringify(
      obj.values
    )}`,
    data('POST') as any
  )
    .then((response) => response && response.json())
    .then(() => {
      state.isLoading = false;
      obj.callback && obj.callback();
    })
    .catch(() => {
      state.isLoading = false;
    });
}
