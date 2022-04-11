import { state } from '../../store/internal';

export const isDefault = () => {
  return state.entriesSettingsLoad.mode.default === 'default';
};
