import { isMobile } from './isMobile';
import { stateInternal } from '../store/internal';

export function focusSearch() {
  if (!isMobile()) {
    document
      ?.querySelector('streamline-container')
      ?.shadowRoot?.querySelector('streamline-box')
      ?.shadowRoot?.querySelector('streamline-search')
      ?.shadowRoot?.querySelector('input')
      ?.focus();
    stateInternal.isSearchFocus = true;
    stateInternal.focusIndex = -1;
  }
}
