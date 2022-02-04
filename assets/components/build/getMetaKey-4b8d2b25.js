import { s as state } from './internal-3b17d4de.js';

function getMetaKey(e) {
  return state.isMac ? e.metaKey : e.ctrlKey;
}

export { getMetaKey as g };
