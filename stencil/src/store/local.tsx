import { createLocalStore } from 'stencil-store-storage';

const { state, onChange } = createLocalStore('streamline', {
  active: 'menu',
  menuMode: '',
  favourites: [],
});

onChange('active', (value) => {
  state.active = value;
});

onChange('favourites', (value) => {
  state.favourites = value;
});

export { state as stateLocal };
