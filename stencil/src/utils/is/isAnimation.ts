import { state } from '../../store/internal';

export const isAnimation = () => {
  return state.entriesSettingsLoad.appearanceAnimation.default;
};