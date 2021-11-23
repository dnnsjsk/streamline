import { stateInternal } from '../store/internal';
import { focusSearch } from './focusSearch';
import { setEntries } from './setEntries';

export function resetView() {
  stateInternal.isLoading = false;
  stateInternal.isSlash = false;
  stateInternal.isEnter = false;
  stateInternal.isHelp = false;
  if (stateInternal.entriesSettingsLoad.searchResetInput.default) {
    stateInternal.searchValue = '';
  }
  setEntries();
  if (stateInternal.entriesSettingsLoad.searchFocus.default) {
    focusSearch();
  }
}
