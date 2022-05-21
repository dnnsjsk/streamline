import { state } from '../../store/internal';
import { findDeep } from 'deepdash-es/standalone';
import { post } from './post';
import { set } from 'lodash-es';
import { setEntries } from '../entries/setEntries';

export const save = (item, values) => {
  const obj = {
    postId: item.ID,
    siteId: item.siteId,
    values: values,
  };

  const update = () => {
    [
      'entriesFav',
      'entriesFavActive',
      'entriesPost',
      'entriesPostActive',
    ].forEach((itemNested) => {
      state[itemNested].forEach(() => {
        const newFavs = [...state[itemNested]];
        const path = findDeep(
          newFavs,
          (o) => {
            return o.siteId === item.siteId && o.ID === item.ID;
          },
          {
            childrenPath: ['children'],
          }
        );
        if (path) {
          // @ts-ignore
          const currentPath = path.context._item.strPath;
          set(newFavs, `${currentPath}.name`, obj.values.post_title);
          set(newFavs, `${currentPath}.post_title`, obj.values.post_title);
          set(newFavs, `${currentPath}.post_name`, obj.values.post_name);

          state[itemNested] = newFavs;
        }
      });
    });
    setEntries();
  };

  if (!state.test) {
    post({
      route: 'update/post',
      values: obj,
      callback: update,
    });
  } else {
    update();
  }
};
