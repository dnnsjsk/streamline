import { focusSearch } from '../search/focusSearch';
import { state } from '../../store/internal';

export const resetScroll = (value) => {
  const el = document
    ?.querySelector('streamline-container')
    ?.shadowRoot?.querySelector('streamline-entries')
    ?.shadowRoot?.querySelector('div > div');

  if (el) {
    const values = ['position', 'overflow', 'left', 'top', 'width'];

    if (value === true) {
      values.forEach((item) => {
        const style = document.body.style[item];
        if (style) {
          state.bodyStyle = {
            ...state.bodyStyle,
            [item]: style,
          };
        }
      });
      state.scroll = window.scrollY;
      // document.body.style.position = 'fixed';
      document.body.style.overflow = 'hidden';
      document.body.style.left = '0';
      document.body.style.top = '0';
      document.body.style.width = '100%';
    } else {
      values.forEach((item) => {
        if (state.bodyStyle[item]) {
          document.body.style[item] = state.bodyStyle[item];
        } else {
          document.body.style.removeProperty(item);
        }
      });
      window.scrollTo(0, state.scroll);
    }
  }

  if (value === true) {
    setTimeout(() => {
      focusSearch();
    }, 20);
    setTimeout(() => {
      focusSearch();
    }, 50);
    setTimeout(() => {
      focusSearch();
    }, 100);
  }
};
