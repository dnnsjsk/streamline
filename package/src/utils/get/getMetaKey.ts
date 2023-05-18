import { state } from '../../store/internal';

export default function getMetaKey(e) {
  return state.isMac ? e.metaKey : e.ctrlKey;
}
