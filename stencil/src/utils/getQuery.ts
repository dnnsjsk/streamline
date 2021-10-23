import { stateInternal } from '../store/internal';
import { capitalizeFirstLetter } from './capitalizeFirstLetter';

export function getQuery(obj) {
  console.log(obj);

  stateInternal[`entries${capitalizeFirstLetter(obj.type)}`] = [
    {
      children: obj.children,
      isMultisite: obj.isMultisite,
      path: obj.path,
      queryValue: obj.search,
      siteId: stateInternal.data.siteId,
      type: obj.type,
      network: obj.network,
    },
  ];

  // console.log(stateInternal[`entries${capitalizeFirstLetter(obj.type)}`]);
}
