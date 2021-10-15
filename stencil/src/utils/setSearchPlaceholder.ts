import { stateInternal } from '../store/internal';
import { isGlobalCommands } from './isGlobalCommands';
import { stateLocal } from '../store/local';

export function setSearchPlaceholder() {
  stateInternal.searchPlaceholder =
    stateLocal.active === 'post'
      ? 'Search for a post'
      : isGlobalCommands()
      ? "Search entries or type '/' for available commands"
      : 'Search entries';
}
