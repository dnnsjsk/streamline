import { state } from '../store/internal';
import { focusSearch } from './focusSearch';
import { setEntries } from './setEntries';
import { stateLocal } from '../store/local';

export function resetView() {
  state.isLoading = false;
  state.isSlash = false;
  state.isHelp = false;
  state.isSearch = true;
  if (state.entriesSettingsLoad.searchResetInput.default) {
    state.searchValue = '';
  }
  if (stateLocal.active === 'site' || stateLocal.active === 'post') {
    state.isEnter = state.searchValue !== '';
  } else {
    state.isEnter = false;
  }
  setEntries();
  if (state.entriesSettingsLoad.searchFocus.default) {
    focusSearch();
  }
}
