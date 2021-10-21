import { stateLocal } from '../store/local';
import { stateInternal } from '../store/internal';

export function isLocalCommands() {
  let index = 0;

  Object.values(stateInternal.commands.local).forEach((item) => {
    if (item.condition !== false) {
      index++;
    }
  });

  return (
    stateInternal.menu[stateLocal.active].commands?.length >= 1 && index >= 1
  );
}
