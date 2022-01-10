import { state } from '../store/internal';

export function getMetaKey(e) {
  return state.isMac ? e.metaKey : e.ctrlKey;
}
