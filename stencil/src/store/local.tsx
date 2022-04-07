import { createLocalStore } from 'stencil-store-storage';

const { state, dispose, onChange } = createLocalStore('streamline', {
  sort: {},
});

export {
  state as stateLocal,
  dispose as disposeLocal,
  onChange as onChangeLocal,
};
