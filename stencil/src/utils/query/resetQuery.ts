import { state } from '../../store/internal';

export function resetQuery() {
  state.entriesPost = [];
  state.entriesPostQuery = '';
}
