import { stateLocal } from '../store/local';
import { stateInternal } from '../store/internal';
import { getMenu } from './getMenu';

export function getMenus() {
  if (stateLocal.active === 'menu' && stateInternal.entriesMenu.length === 0) {
    getMenu({ network: false, adminUrl: stateInternal.data.adminUrl });
  }

  if (
    stateLocal.active === 'network' &&
    stateInternal.entriesNetwork.length === 0
  ) {
    getMenu({ network: true });
  }
}
