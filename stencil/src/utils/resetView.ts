import { state } from '../store/internal';
import { focusSearch } from './focusSearch';
import { setEntries } from './setEntries';
import { stateLocal } from '../store/local';

export function resetView() {
  state.isLoading = false;
  state.isSlash = false;
  state.isHelp = false;
  state.isSearch = true;
  if (stateLocal.active === 'site' || stateLocal.active === 'post') {
    state.isEnter = state.searchValue !== '';
  } else {
    state.isEnter = false;
  }
  if (state.entriesSettingsLoad.searchResetInput.default) {
    state.searchValue = '';
  }
  setEntries();
  if (state.entriesSettingsLoad.searchFocus.default) {
    focusSearch();
  }
}
