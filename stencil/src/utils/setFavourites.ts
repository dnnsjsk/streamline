import { stateLocal } from '../store/local';
import { stateInternal } from '../store/internal';
import { getFavourites } from './getFavourites';

export function setFavourites() {
  let filter = [];

  if (stateLocal.menuMode === 'favourite') {
    filter = getFavourites();

    stateInternal.entriesActive = filter;
  }

  if (stateLocal.menuMode === '' || filter === null) {
    stateInternal.entriesActive = stateInternal.entries;
  }
}
