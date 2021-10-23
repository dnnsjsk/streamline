import { filterDeep, findDeep } from 'deepdash-es/standalone';
import { stateInternal } from '../store/internal';
import { setEntries } from './setEntries';
import { merge, unset, get, compact } from 'lodash-es';
import { hideAll } from 'tippy.js';
import { capitalizeFirstLetter } from './capitalizeFirstLetter';

export function setFavourite(obj) {
  const arr = [...stateInternal.entriesFav];

  const filter = filterDeep(
    stateInternal[`entries${capitalizeFirstLetter(obj.type)}`],
    (o) => obj.filter(o),
    {
      childrenPath: ['children'],
    }
  );

  if (!obj.favourite) {
    const path = findDeep(stateInternal.entriesFav, (o) => obj.path(o), {
      childrenPath: ['children'],
    });
    const index = path?.key;

    if (stateInternal.entriesFav.length === 0) {
      const mergeArr = [...merge(stateInternal.entriesFav, filter)];
      stateInternal.entriesFav = mergeArr;
      stateInternal.entriesFavActive = mergeArr;
    } else if (!path) {
      const mergeArr = [...arr, filter[0]];
      stateInternal.entriesFav = mergeArr;
      stateInternal.entriesFavActive = mergeArr;
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
      stateInternal.entriesFav = arr;
      stateInternal.entriesFavActive = arr;
    }
  } else {
    const path = findDeep(stateInternal.entriesFav, (o) => obj.pathFav(o), {
      childrenPath: ['children'],
    });

    const currentPath = path.context['_item'].strPath;

    unset(arr, currentPath);

    const parentPath = path.context['_item'].parent.path;
    const parentChildrenLength = Object.values(
      get(stateInternal.entriesFav, `${parentPath}.children`)
    ).length;

    if (parentChildrenLength === 0) {
      unset(arr, parentPath);
    }

    const topPath = path.context['_item'].parent.parent.path;
    const topChildrenLength = topPath
      ? Object.values(get(stateInternal.entriesFav, `${topPath}.children`))
          .length
      : false;

    if (topChildrenLength === 0) {
      unset(arr, topPath);
    }

    const removeArr =
      arr.length === 1 && arr[0] === undefined ? [] : [...compact(arr)];
    stateInternal.entriesFav = removeArr;
    stateInternal.entriesFavActive = removeArr;

    setEntries();
  }

  // console.log(stateInternal.entriesFav);

  if (!stateInternal.test) {
    stateInternal.isProcessing = true;

    // @ts-ignore
    // eslint-disable-next-line no-undef
    const streamline = window.streamline || false;
    fetch(streamline.ajax, {
      method: 'POST',
      credentials: 'same-origin',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      body: `action=streamlineQuery&callback=fav&query=${JSON.stringify(
        stateInternal.entriesFav
        // @ts-ignore
        // eslint-disable-next-line no-undef
      )}&nonce=${streamline.nonce}&userId=${String(stateInternal.data.userId)}`,
    })
      .then((response) => response.json())
      .then(() => (stateInternal.isProcessing = false));
  }

  obj.callback && obj.callback();
  hideAll();
}
