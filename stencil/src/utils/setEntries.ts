import { state } from '../store/internal';
import { stateLocal } from '../store/local';
import { filterDeep } from 'deepdash-es/standalone';
import { capitalizeFirstLetter } from './capitalizeFirstLetter';

export function setEntries() {
  const result = filterDeep(
    state[`entries${capitalizeFirstLetter(stateLocal.active)}`],
    (o) => {
      return (
        (o.name &&
          o.name.toLowerCase().includes(state.searchValue.toLowerCase())) ||
        (o.nameParent &&
          o.nameParent.toLowerCase().includes(state.searchValue.toLowerCase()))
      );
    },
    { childrenPath: ['children'] }
  );

  state[`entries${capitalizeFirstLetter(stateLocal.active)}Active`] =
    result?.length >= 1
      ? result
      : [
          {
            title: state.searchNoValue,
            children: [],
            isMultisite: state.data.network,
            path:
              stateLocal.active === 'menu'
                ? state.entriesMenuCurrentPath
                : state.entriesPostCurrentPath,
          },
        ];
}
