import { createLocalStore } from 'stencil-store-storage';
import { setSearchPlaceholder } from '../utils/set/setSearchPlaceholder';
import { resetView } from '../utils/general/resetView';

const { state, dispose, onChange } = createLocalStore('streamline', {
  active: 'menu',
  sort: {},
});

onChange('active', () => {
  resetView();
  setSearchPlaceholder();
});

export {
  state as stateLocal,
  dispose as disposeLocal,
  onChange as onChangeLocal,
};
