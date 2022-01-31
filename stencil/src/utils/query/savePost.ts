import { state } from '../../store/internal';
import { findDeep } from 'deepdash-es/standalone';
import { fetchAjax } from './fetchAjax';
import { set } from 'lodash-es';

export function savePost(item, values) {
  const obj = {
    postId: item.ID,
    siteId: item.siteId,
    values: values,
  };

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
        const currentPath = path.context['_item'].strPath;
        set(newFavs, `${currentPath}.name`, obj.values['post_title']);
        set(newFavs, `${currentPath}.post_title`, obj.values['post_title']);
        set(newFavs, `${currentPath}.post_name`, obj.values['post_name']);

        state[itemNested] = newFavs;
      }
    });
  });

  if (!state.test) {
    fetchAjax({
      type: 'post',
      query: obj,
    });
  }
}
