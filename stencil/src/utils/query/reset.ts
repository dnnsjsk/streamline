import { state } from '../../store/internal';

export function reset() {
  state.entriesPost = [];
  state.entriesPostQuery = '';
}
