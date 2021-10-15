import { stateLocal } from '../store/local';

export function isGlobalCommands() {
  return stateLocal.active === 'menu';
}
