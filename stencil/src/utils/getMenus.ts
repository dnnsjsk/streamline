import { stateLocal } from '../store/local';
import { state } from '../store/internal';
import { getMenu } from './getMenu';

export function getMenus() {
  if (stateLocal.active === 'menu' && state.entriesMenu.length === 0) {
    getMenu({ network: false, adminUrl: state.data.adminUrl });
  }

  if (stateLocal.active === 'network' && state.entriesNetwork.length === 0) {
    getMenu({ network: true });
  }
}
