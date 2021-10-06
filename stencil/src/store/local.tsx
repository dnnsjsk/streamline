import { createLocalStore } from 'stencil-store-storage';

const { state } = createLocalStore('streamline', {
  active: 'menu',
  menuMode: '',
  menuFavourites: [],
});

export { state as stateLocal };
