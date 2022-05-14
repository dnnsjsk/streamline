import { state } from '../../store/internal';
import { filterDeep } from 'deepdash-es/standalone';
import { capitalizeFirstLetter } from '../string/capitalizeFirstLetter';
import { getEntriesSliced } from '../get/getEntriesSliced';
import { sortEntries } from '../sort/sortEntries';

export const setEntries = (removeSort = '') => {
  const result = filterDeep(
    // eslint-disable-next-line no-self-compare
    0 !== 0 && state.active === 'post'
      ? [
          {
            ...state.entriesPost[0],
            children:
              state.entriesPost?.[0]?.children &&
              getEntriesSliced(state.entriesPost[0].children),
          },
        ]
      : state[`entries${capitalizeFirstLetter(state.active)}`],
    (o) => {
      return (
        (o.name &&
          o.name.toLowerCase().includes(state.searchValue.toLowerCase())) ||
        (o.nameParent &&
          o.nameParent
            .toLowerCase()
            .includes(state.searchValue.toLowerCase())) ||
        o.type === 'action'
      );
    },
    { childrenPath: ['children'] }
  );

  state[`entries${capitalizeFirstLetter(state.active)}Active`] =
    result?.length >= 1
      ? result
      : [
          {
            title: state.searchNoValue,
            children: [],
            isMultisite: state?.data?.network,
            path:
              state.active === 'menu'
                ? state.entriesMenuCurrentPath
                : state.entriesPostCurrentPath,
          },
        ];

  if (removeSort === '') {
    sortEntries();
  } else {
    state.sort = {
      ...state.sort,
      [removeSort]: false,
    };
  }

  // console.log(state[`entries${capitalizeFirstLetter(state.active)}Active`]);
};
