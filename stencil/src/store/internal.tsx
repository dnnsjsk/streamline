import { createStore } from '@stencil/store';

const { state } = createStore({
  visible: true,
  searchValue: '',
  entries: [],
  entriesActive: [],
});

export { state as stateInternal };
