import { state } from '../../store/internal';
import { filterDeep } from 'deepdash-es/standalone';
import { capitalizeFirstLetter } from '../string/capitalizeFirstLetter';
import { getEntriesSliced } from '../get/getEntriesSliced';
import { sortEntries } from '../sort/sortEntries';

export const setEntries = (removeSort = '') => {
  const active = capitalizeFirstLetter(state.active);

  const result = filterDeep(
    state.test && state.active === 'post'
      ? [
          {
            ...state.entriesPost[0],
            children:
              state.entriesPost?.[0]?.children &&
              getEntriesSliced(state.entriesPost[0].children),
          },
        ]
      : state[`entries${active}`],
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

  state[`entries${active}Active`] =
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

  const isQueryMode = state.active === 'post' || state.active === 'site';

  state.infoBar.pages.current = state[`entries${active}CurrentPage`];
  state.infoBar.pages.amount = Math.ceil(
    (state.test && isQueryMode
      ? state[`entries${active}`]?.[0]?.children &&
        Object.values(Object.values(state[`entries${active}`]?.[0]?.children))
          .length
      : state[`entries${active}Total`]) / state.entriesSettingsLoad.query.amount
  );

  if (removeSort === '') {
    sortEntries();
  } else {
    state.sort = {
      ...state.sort,
      [removeSort]: false,
    };
  }
};
