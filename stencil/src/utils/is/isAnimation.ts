import { state } from '../../store/internal';

export function isAnimation() {
  return state.entriesSettingsLoad.appearanceAnimation.default;
}
