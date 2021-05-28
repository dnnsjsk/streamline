import { createStore } from '@stencil/store';

const { state, onChange } = createStore({
  visible: true,
  entries: [],
  entriesActive: [],
  entriesFavourites: [],
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

onChange('entriesFavourites', (value) => {
  state.entriesFavourites = value;
});

export { state as stateInternal };
