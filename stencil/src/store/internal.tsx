import { createStore } from '@stencil/store';

const { state, onChange } = createStore({
  visible: true,
  searchValue: '',
  entries: [],
  entriesActive: [],
});

onChange('visible', (value) => {
  state.visible = value;
});

onChange('entries', (value) => {
  state.entries = value;
});

onChange('entriesActive', (value) => {
  state.entriesActive = value;
});

export { state as stateInternal };
