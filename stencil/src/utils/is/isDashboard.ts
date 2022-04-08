import { state } from '../../store/internal';

export function isDashboard() {
  return state.entriesSettingsLoad.mode.default === 'dashboard';
}
