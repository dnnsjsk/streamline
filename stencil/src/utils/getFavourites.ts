import { stateInternal } from '../store/internal';
import { filterDeep } from 'deepdash-es/standalone';

export function getFavourites() {
  return filterDeep(
    stateInternal.entries.filter((val) => Object.keys(val).length !== 0),
    (o) => {
      return o.favourite === true;
    },
    { childrenPath: ['children'] }
  );
}
