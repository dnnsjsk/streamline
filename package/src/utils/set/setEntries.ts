import { state } from '../../store/internal';
import { filterDeep } from 'deepdash-es/standalone';
import capitalizeFirstLetter from '../string/capitalizeFirstLetter';

function checker(val, value) {
  return val?.name?.toLowerCase().includes(value);
}

export default function setEntries() {
  const active = capitalizeFirstLetter(state.active);
  const entries = Object.values(
    state[`entries${state.active !== 'entries' ? active : ''}`]
  );
  const value = state.searchValue.toLowerCase().trim();

  state[`entries${state.active !== 'entries' ? active : ''}Active`] =
    value === ''
      ? entries
      : filterDeep(
          entries,
          (val, _, parent) => {
            if (checker(val, value)) return true;
            if (checker(parent?.name, value)) return true;
            if (val?.route) return true;
          },
          { childrenPath: ['children'] }
        ) || [
          {
            name: (entries[0] as any).name,
            children: [],
          },
        ];
}
