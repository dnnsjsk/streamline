import { c as createStore } from './index-795b713f.js';

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
