import { s as state } from './internal-9e1d6f96.js';

function getMetaKey(e) {
  return state.isMac ? e.metaKey : e.ctrlKey;
}

export { getMetaKey as g };
