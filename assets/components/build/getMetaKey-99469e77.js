import { s as state } from './internal-4a57c94a.js';

function getMetaKey(e) {
  return state.isMac ? e.metaKey : e.ctrlKey;
}

export { getMetaKey as g };
