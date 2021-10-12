import { stateInternal } from '../store/internal';
import { stateLocal } from '../store/local';
import { filterDeep } from 'deepdash-es/standalone';
import { capitalizeFirstLetter } from './capitalizeFirstLetter';

export function setEntries() {
  const state = stateLocal.active === 'fav' ? stateLocal : stateInternal;

  const result = filterDeep(
    state[`entries${capitalizeFirstLetter(stateLocal.active)}`],
    (o) => {
      return (
        (o.name &&
          o.name
            .toLowerCase()
            .includes(stateInternal.searchValue.toLowerCase())) ||
        (o.nameParent &&
          o.nameParent
            .toLowerCase()
            .includes(stateInternal.searchValue.toLowerCase()))
      );
    },
    { childrenPath: ['children'] }
  );

  state[`entries${capitalizeFirstLetter(stateLocal.active)}Active`] =
    result?.length >= 1
      ? result
      : [{ name: stateInternal.searchNoValue, children: [] }];
}
