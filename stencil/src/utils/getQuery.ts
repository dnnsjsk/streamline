import { stateInternal } from '../store/internal';
import { capitalizeFirstLetter } from './capitalizeFirstLetter';

export function getQuery(obj) {
  stateInternal[`entries${capitalizeFirstLetter(obj.type)}`] = [
    {
      name: `Showing ${obj.children.length} ${
        obj.children.length === 1 ? `result` : `results`
      } for <span style="font-style: italic;">${obj.search}</span>`,
      children: obj.children,
      type: obj.type,
    },
  ];
}
