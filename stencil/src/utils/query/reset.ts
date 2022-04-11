import { state } from '../../store/internal';

export const reset = () => {
  state.entriesPost = [];
  state.entriesPostQuery = '';
};
