import { isMobile } from './isMobile';

export function focusSearch() {
  if (!isMobile()) {
    document
      ?.querySelector('streamline-container')
      ?.shadowRoot?.querySelector('streamline-box')
      ?.shadowRoot?.querySelector('streamline-search')
      ?.shadowRoot?.querySelector('input')
      .focus();
  }
}
