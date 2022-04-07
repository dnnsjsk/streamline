import { state } from '../../store/internal';
import { capitalizeFirstLetter } from '../string/capitalizeFirstLetter';

export function setSearchPlaceholder() {
  state.searchPlaceholder =
    state.active === 'post' || state.active === 'site'
      ? `${
          state.test
            ? 'Filter entries'
            : Object.values(
                state[`entries${capitalizeFirstLetter(state.active)}`]
              ).length >= 1
            ? `Search for a ${state.active} or filter entries`
            : `Search for a ${state.active}`
        }`
      : state.active === 'search'
      ? `Search or filter entries`
      : `Filter entries`;
}
