import { stateInternal } from '../store/internal';

export function getMetaKey(e) {
  return stateInternal.isMac ? e.metaKey : e.ctrlKey;
}
