import { filterDeep } from 'deepdash-es/standalone';

export function getFavourites(obj, type) {
  return filterDeep(
    obj.filter((val) => Object.keys(val).length !== 0),
    (o) => {
      return o.favourite === true && o.type === type;
    },
    { childrenPath: ['children'] }
  );
}
