import { createLocalStore } from 'stencil-store-storage';

const { state, onChange } = createLocalStore('streamline', {
  active: 'menu',
});

onChange('active', (value) => {
  state.active = value;
});

export { state as stateLocal };
