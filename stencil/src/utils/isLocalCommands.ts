import { stateLocal } from '../store/local';
import { stateInternal } from '../store/internal';

export function isLocalCommands() {
  return stateInternal.menu[stateLocal.active].commands?.length >= 1;
}
