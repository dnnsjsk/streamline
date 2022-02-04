import { s as state } from './internal-0fc66e5d.js';

function getMetaKey(e) {
  return state.isMac ? e.metaKey : e.ctrlKey;
}

export { getMetaKey as g };
