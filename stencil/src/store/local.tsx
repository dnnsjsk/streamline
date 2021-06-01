import { createLocalStore } from 'stencil-store-storage';

const { state, onChange } = createLocalStore('streamline', {
  active: 'menu',
  menuMode: '',
  menuFavourites: [],
  flowMode: '',
  flowFavourites: [],
});

onChange('active', (value) => {
  state.active = value;
});

onChange('menuMode', (value) => {
  state.menuMode = value;
});

onChange('menuFavourites', (value) => {
  state.menuFavourites = value;
});

onChange('flowMode', (value) => {
  state.flowMode = value;
});

onChange('flowFavourites', (value) => {
  state.flowFavourites = value;
});

export { state as stateLocal };
