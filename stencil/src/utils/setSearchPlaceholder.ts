import { state } from '../store/internal';
import { stateLocal } from '../store/local';
import { capitalizeFirstLetter } from './capitalizeFirstLetter';
// import { isLocalCommands } from './isLocalCommands';

export function setSearchPlaceholder() {
  /*
  const commands = isLocalCommands()
    ? " or type '/' for available commands"
    : '';
   */
  const commands = '';

  state.searchPlaceholder =
    stateLocal.active === 'post' || stateLocal.active === 'site'
      ? `${
          state.test
            ? 'Filter entries'
            : Object.values(
                state[`entries${capitalizeFirstLetter(stateLocal.active)}`]
              ).length >= 1
            ? `Search for a ${stateLocal.active} or filter entries`
            : `Search for a ${stateLocal.active}`
        }${commands}`
      : `Filter entries${commands}`;
}
