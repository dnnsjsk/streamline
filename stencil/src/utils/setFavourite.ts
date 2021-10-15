import { stateLocal } from '../store/local';
import { filterDeep, findDeep } from 'deepdash-es/standalone';
import { stateInternal } from '../store/internal';
import { setEntries } from './setEntries';
import { merge, unset, get, compact } from 'lodash-es';
import { hideAll } from 'tippy.js';
import { capitalizeFirstLetter } from './capitalizeFirstLetter';

export function setFavourite(obj) {
  const arr = [...stateLocal.entriesFav];

  const filter = filterDeep(
    stateInternal[`entries${capitalizeFirstLetter(obj.type)}`],
    (o) => obj.filter(o),
    {
      childrenPath: ['children'],
    }
  );

  if (!obj.favourite) {
    const path = findDeep(stateLocal.entriesFav, (o) => obj.path(o), {
      childrenPath: ['children'],
    });
    const index = path?.key;

    if (stateLocal.entriesFav.length === 0) {
      const mergeArr = [...merge(stateLocal.entriesFav, filter)];
      stateLocal.entriesFav = mergeArr;
      stateLocal.entriesFavActive = mergeArr;
    } else if (!path) {
      const mergeArr = [...arr, filter[0]];
      stateLocal.entriesFav = mergeArr;
      stateLocal.entriesFavActive = mergeArr;
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
      stateLocal.entriesFav = arr;
      stateLocal.entriesFavActive = arr;
    }
  } else {
    const path = findDeep(stateLocal.entriesFav, (o) => obj.pathFav(o), {
      childrenPath: ['children'],
    });

    const currentPath = path.context['_item'].strPath;

    unset(arr, currentPath);

    const parentPath = path.context['_item'].parent.path;
    const parentChildrenLength = Object.values(
      get(stateLocal.entriesFav, `${parentPath}.children`)
    ).length;

    if (parentChildrenLength === 0) {
      unset(arr, parentPath);
    }

    const topPath = path.context['_item'].parent.parent.path;
    const topChildrenLength = topPath
      ? Object.values(get(stateLocal.entriesFav, `${topPath}.children`)).length
      : false;

    if (topChildrenLength === 0) {
      unset(arr, topPath);
    }

    const removeArr =
      arr.length === 1 && arr[0] === undefined ? [] : [...compact(arr)];
    stateLocal.entriesFav = removeArr;
    stateLocal.entriesFavActive = removeArr;

    setEntries();
  }

  obj.callback && obj.callback();
  hideAll();
}
