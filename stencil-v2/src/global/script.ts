import { getMetaKey } from '../utils/get/getMetaKey';
import { state } from '../store/internal';
import { setSearchPlaceholder } from '../utils/set/setSearchPlaceholder';

export default function () {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'k' && getMetaKey(e)) {
      e.preventDefault();
      state.isVisible = !state.isVisible;
    }

    if (state.isVisible) {
      if (
        e.key === 'ArrowUp' &&
        getMetaKey(e) &&
        state.entriesSettingsLoad.keys.navigationTabs
      ) {
        e.preventDefault();
        // this.cycleTabs('up')
      }

      if (
        e.key === 'ArrowDown' &&
        getMetaKey(e) &&
        state.entriesSettingsLoad.keys.navigationTabs
      ) {
        e.preventDefault();
        // this.cycleTabs('down')
      }

      if (e.key === 'Escape' && state.entriesSettingsLoad.keys.exit) {
        e.preventDefault();
        state.isVisible = false;
      }
    }
  });
  setSearchPlaceholder();
}
