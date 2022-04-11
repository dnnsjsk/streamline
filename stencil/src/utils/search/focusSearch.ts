import { isMobile } from '../is/isMobile';
import { state } from '../../store/internal';

export const focusSearch = () => {
  if (!isMobile()) {
    document
      ?.querySelector('streamline-container')
      ?.shadowRoot?.querySelector('streamline-search')
      ?.shadowRoot?.querySelector('input')
      ?.focus();
    state.isSearchFocus = true;
    state.focusIndex = -1;
  }
};
