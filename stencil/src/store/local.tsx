import { createLocalStore } from 'stencil-store-storage';

const { state, dispose } = createLocalStore('streamline', {
  active: 'menu',
  entriesFav: [],
  entriesFavActive: [],
});

export { state as stateLocal, dispose as disposeLocal };
