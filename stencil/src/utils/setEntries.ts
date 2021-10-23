import { stateInternal } from '../store/internal';
import { stateLocal } from '../store/local';
import { filterDeep } from 'deepdash-es/standalone';
import { capitalizeFirstLetter } from './capitalizeFirstLetter';

export function setEntries() {
  const result = filterDeep(
    stateInternal[`entries${capitalizeFirstLetter(stateLocal.active)}`],
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

  stateInternal[`entries${capitalizeFirstLetter(stateLocal.active)}Active`] =
    result?.length >= 1
      ? result
      : [
          {
            title: stateInternal.searchNoValue,
            children: [],
            isMultisite: stateInternal.data.network,
            path: stateInternal.entriesMenuCurrentPath,
          },
        ];
}
