import { stateInternal } from '../store/internal';
import { capitalizeFirstLetter } from './capitalizeFirstLetter';

export function getQuery(obj) {
  stateInternal[`entries${capitalizeFirstLetter(obj.type)}`] = [
    {
      title: `${capitalizeFirstLetter(obj.type)}s`,
      titleAlt: `Showing ${
        obj.children.length || Object.values(obj.children).length
      } ${
        obj.children.length === 1 || Object.values(obj.children).length === 1
          ? `result`
          : `results`
      } for <span style="font-style: italic;">${obj.search}</span>`,
      children: obj.children,
      type: obj.type,
      siteId: stateInternal.data.siteId,
    },
  ];
}
