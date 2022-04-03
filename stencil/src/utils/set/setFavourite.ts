import { filterDeep, findDeep } from 'deepdash-es/standalone';
import { state } from '../../store/internal';
import { setEntries } from './setEntries';
import { merge, unset, get, compact } from 'lodash-es';
import { capitalizeFirstLetter } from '../string/capitalizeFirstLetter';
import { post } from '../query/post';

export function setFavourite(obj) {
  const arr = [...state.entriesFav];

  const filter = filterDeep(
    state[`entries${capitalizeFirstLetter(obj.type)}`],
    (o) => obj.filter(o),
    {
      childrenPath: ['children'],
    }
  );

  if (!obj.favourite) {
    const path = findDeep(state.entriesFav, (o) => obj.path(o), {
      childrenPath: ['children'],
    });
    const index = path?.key;

    if (state.entriesFav.length === 0) {
      const mergeArr = [...merge(state.entriesFav, filter)];
      state.entriesFav = mergeArr;
      state.entriesFavActive = mergeArr;
    } else if (!path) {
      const mergeArr = [...arr, filter[0]];
      state.entriesFav = mergeArr;
      state.entriesFavActive = mergeArr;
    } else {
      const mergeArr = merge(
        [
          {
            ...arr[index],
          },
        ],
        filter
      );
      arr[index] = mergeArr[0];
      state.entriesFav = arr;
      state.entriesFavActive = arr;
    }
  } else {
    const path = findDeep(state.entriesFav, (o) => obj.pathFav(o), {
      childrenPath: ['children'],
    });

    const currentPath = path.context['_item'].strPath;

    unset(arr, currentPath);

    const parentPath = path.context['_item'].parent.path;
    const parentChildrenLength = Object.values(
      get(state.entriesFav, `${parentPath}.children`)
    ).length;

    if (parentChildrenLength === 0) {
      unset(arr, parentPath);
    }

    const topPath = path.context['_item'].parent.parent.path;
    const topChildrenLength = topPath
      ? Object.values(get(state.entriesFav, `${topPath}.children`)).length
      : false;

    if (topChildrenLength === 0) {
      unset(arr, topPath);
    }

    const removeArr =
      arr.length === 1 && arr[0] === undefined ? [] : [...compact(arr)];
    state.entriesFav = removeArr;
    state.entriesFavActive = removeArr;

    setEntries();
  }

  if (!state.test) {
    post({
      route: 'update/settings',
      type: 'favourites',
      values: state.entriesFav,
    });
  }

  obj.callback && obj.callback();
}
