export const blurSearch = () => {
  document
    ?.querySelector('streamline-container')
    ?.shadowRoot?.querySelector('streamline-search')
    ?.shadowRoot?.querySelector('input')
    ?.blur();
};
