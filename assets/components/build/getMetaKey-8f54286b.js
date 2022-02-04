import { s as state } from './internal-fcd5ddd2.js';

function getMetaKey(e) {
  return state.isMac ? e.metaKey : e.ctrlKey;
}

export { getMetaKey as g };
