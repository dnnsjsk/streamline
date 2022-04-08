import { state } from '../../store/internal';

export function isDefault() {
  return state.entriesSettingsLoad.mode.default === 'default';
}
