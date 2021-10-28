import { stateInternal } from '../store/internal';
import { stateLocal } from '../store/local';
import { isLocalCommands } from './isLocalCommands';

export function setSearchPlaceholder() {
  const commands = isLocalCommands()
    ? " or type '/' for available commands"
    : '';

  stateInternal.searchPlaceholder =
    stateLocal.active === 'post'
      ? `${
          stateInternal.test
            ? 'Filter entries'
            : Object.values(stateInternal.entriesPost).length >= 1
            ? 'Search for a post or filter entries'
            : 'Search for a post'
        }${commands}`
      : stateLocal.active === 'settings'
      ? 'Search settings'
      : `Search entries${commands}`;
}
