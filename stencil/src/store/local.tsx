import { createLocalStore } from 'stencil-store-storage';
import { setSearchPlaceholder } from '../utils/setSearchPlaceholder';
import { resetView } from '../utils/resetView';

const { state, dispose, onChange } = createLocalStore('streamline', {
  active: 'menu',
});

onChange('active', () => {
  resetView();
  setSearchPlaceholder();
});

export { state as stateLocal, dispose as disposeLocal };
