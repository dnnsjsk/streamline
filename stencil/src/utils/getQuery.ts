import { state } from '../store/internal';
import { capitalizeFirstLetter } from './capitalizeFirstLetter';

export function getQuery(obj) {
  state[`entries${capitalizeFirstLetter(obj.type)}`] = [
    {
      children: obj.children,
      isMultisite: obj.isMultisite,
      path: obj.path,
      queryValue: obj.search,
      siteId: state.data.siteId,
      type: obj.type,
      network: obj.network,
    },
  ];

  if (obj.type === 'post') {
    state.entriesPostCurrentPath = obj.path;
  }

  // console.log(state[`entries${capitalizeFirstLetter(obj.type)}`]);
}
