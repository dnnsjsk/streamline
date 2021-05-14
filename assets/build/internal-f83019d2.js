import { c as createStore } from './index-c53586ef.js';

const { state, onChange } = createStore({
  visible: false,
  entriesAll: [],
  entriesMenu: [],
  entriesActive: [],
});
onChange('visible', (value) => {
  state.visible = value;
});
onChange('entriesMenu', (value) => {
  state.entriesMenu = value;
});
onChange('entriesAll', (value) => {
  state.entriesAll = value;
});

export { state as s };
