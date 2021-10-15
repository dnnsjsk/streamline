import { createLocalStore } from 'stencil-store-storage';
import { setSearchPlaceholder } from '../utils/setSearchPlaceholder';

const { state, dispose, onChange } = createLocalStore('streamline', {
  active: 'menu',
  entriesFav: [],
  entriesFavActive: [],
});

onChange('active', () => {
  setSearchPlaceholder();
});

export { state as stateLocal, dispose as disposeLocal };
