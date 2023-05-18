import { state } from '../../store/internal';

export default function isAnimation() {
  return state.entriesSettingsLoad.appearance.animation;
}
