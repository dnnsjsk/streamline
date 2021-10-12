export function focusSearch() {
  document
    ?.querySelector('streamline-container')
    ?.shadowRoot?.querySelector('streamline-box')
    ?.shadowRoot?.querySelector('streamline-search')
    ?.shadowRoot?.querySelector('input')
    .focus();
}
