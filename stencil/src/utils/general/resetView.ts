import { state } from '../../store/internal';
import { focusSearch } from '../search/focusSearch';
import { setEntries } from '../set/setEntries';

export function resetView() {
  state.isLoading = false;
  state.isSlash = false;
  state.isHelp = false;
  state.isSearch = true;
  if (
    state.entriesSettingsLoad.searchResetInput.default ||
    state.entriesSettingsLoad.mode.default === 'default'
  ) {
    state.searchValue = '';
  }
  if (state.active === 'site' || state.active === 'post') {
    state.isEnter = state.searchValue !== '';
  } else {
    state.isEnter = false;
  }
  setEntries();
  if (
    state.entriesSettingsLoad.searchFocus.default ||
    state.entriesSettingsLoad.mode.default === 'default'
  ) {
    focusSearch();
  }
  document
    .querySelector('streamline-container')
    ?.shadowRoot.querySelector('streamline-entries')
    ?.shadowRoot?.querySelector('.inner')
    ?.scrollTo(0, 0);
}
