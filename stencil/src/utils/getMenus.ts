import { stateLocal } from '../store/local';
import { state } from '../store/internal';
import { getMenu } from './getMenu';

export function getMenus() {
  if (!state.test) {
    if (stateLocal.active === 'menu' && state.entriesMenu.length === 0) {
      getMenu({ network: false, adminUrl: state.data.adminUrl });
    }

    if (
      stateLocal.active === 'networkMenu' &&
      state.entriesNetworkMenu.length === 0
    ) {
      getMenu({ network: true });
    }
  }
}
