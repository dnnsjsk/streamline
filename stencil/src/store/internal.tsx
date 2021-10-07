import { createStore } from '@stencil/store';

const { state } = createStore({
  // @ts-ignore
  data: window.streamlineData,
  entries: [],
  entriesActive: [],
  searchValue: '',
  visible: true,
});

export { state as stateInternal };
