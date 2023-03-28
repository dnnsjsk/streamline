import { state } from '../../store/internal';
import { filterDeep } from 'deepdash-es/standalone';
import capitalizeFirstLetter from '../string/capitalizeFirstLetter';
import { sortBy, result } from 'lodash-es';

function checker(val, value) {
  return val?.name?.toLowerCase().includes(value);
}

export default function setEntries() {
  const active = capitalizeFirstLetter(state.active);
  const entries = Object.values(
    state[`entries${state.active !== 'entries' ? active : ''}`]
  );
  const value = state.searchValue.toLowerCase().trim();

  let filteredEntries =
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

  if (state.active === 'query' && state.sort?.[state.action.route]) {
    let children = sortBy([...filteredEntries[0].children], (o) =>
      result(o, state.sort[state.action.route].value)
    );
    if (state.sort[state.action.route].direction === 'desc') {
      children = children.reverse();
    }
    filteredEntries = [
      {
        ...filteredEntries,
        children,
      },
    ];
  }

  state[`entries${state.active !== 'entries' ? active : ''}Active`] =
    filteredEntries;
}
