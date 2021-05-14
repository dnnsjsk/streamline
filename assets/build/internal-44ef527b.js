import { c as createStore } from './index-39c6f6e3.js';

const { state, onChange } = createStore({
  entriesAll: [],
  entriesMenu: [],
  entriesActive: [],
});
onChange('entriesMenu', (value) => {
  state.entriesMenu = value;
});
onChange('entriesAll', (value) => {
  state.entriesAll = value;
});

export { state as s };
