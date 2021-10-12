import { stateInternal } from '../store/internal';
import { focusSearch } from './focusSearch';
import { setEntries } from './setEntries';

export function resetView() {
  stateInternal.isSites = false;
  stateInternal.isLoading = false;
  stateInternal.isSlash = false;
  stateInternal.isEnter = false;
  stateInternal.searchValue = '';
  setEntries();
  focusSearch();
}
