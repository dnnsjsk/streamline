import { state } from '../../store/internal';
import { capitalizeFirstLetter } from '../string/capitalizeFirstLetter';

export const setPages = () => {
  const active = capitalizeFirstLetter(state.active);
  const isQueryMode = state.active === 'post' || state.active === 'site';

  state.infoBar.pages.current = state[`entries${active}CurrentPage`];

  state.infoBar.pages.amount = Math.ceil(
    (state.test && isQueryMode
      ? state[`entries${active}`]?.[0]?.children &&
        Object.values(Object.values(state[`entries${active}`]?.[0]?.children))
          .length
      : state[`entries${active}Total`]) / state.entriesSettingsLoad.query.amount
  );
};
