import { state } from '../../store/internal';

export const isDashboard = () => {
  return state.entriesSettingsLoad.mode.default === 'dashboard';
};
