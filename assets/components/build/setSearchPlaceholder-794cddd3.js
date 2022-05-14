import { s as state } from './internal-1f00f851.js';
import { c as capitalizeFirstLetter } from './capitalizeFirstLetter-646b80d8.js';

const setSearchPlaceholder = () => {
  state.searchPlaceholder =
    state.active === 'post' || state.active === 'site'
      ? `${Object.values(state[`entries${capitalizeFirstLetter(state.active)}`])
        .length >= 1
        ? `Search for a ${state.active} or filter entries`
        : `Search for a ${state.active}`}`
      : state.active === 'search'
        ? `Search or filter entries`
        : `Filter entries`;
};

export { setSearchPlaceholder as s };
