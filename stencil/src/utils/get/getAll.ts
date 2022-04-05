import { getMenu } from './getMenu';
import { state } from '../../store/internal';

export function getAll() {
  if (state.entriesMenu.length === 0) {
    getMenu({ network: false, adminUrl: state.data.adminUrl });
  }
  if (state.data.network && state.entriesNetworkMenu.length === 0) {
    getMenu({ network: true });
  }
}
