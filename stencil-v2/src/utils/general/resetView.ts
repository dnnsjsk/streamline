import { state } from '../../store/internal';
import { setEntries } from '../entries/setEntries';

export const resetView = () => {
  state.isLoading = false;
  state.searchValue = '';
  if (state.active === 'site' || state.active === 'post') {
    state.isEnter = state.searchValue !== '';
  } else {
    state.isEnter = false;
  }
  setEntries();
};
