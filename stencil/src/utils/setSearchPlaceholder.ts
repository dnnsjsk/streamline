import { stateInternal } from '../store/internal';
import { stateLocal } from '../store/local';
import { isLocalCommands } from './isLocalCommands';

export function setSearchPlaceholder() {
  const commands = isLocalCommands()
    ? " or type '/' for available commands"
    : '';

  stateInternal.searchPlaceholder =
    stateLocal.active === 'post'
      ? `Search for a post${commands}`
      : `Search entries${commands}`;
}
