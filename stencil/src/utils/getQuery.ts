import { stateInternal } from '../store/internal';
import { capitalizeFirstLetter } from './capitalizeFirstLetter';

export function getQuery(obj) {
  const isMultisite = stateInternal.data.network;

  stateInternal[`entries${capitalizeFirstLetter(obj.type)}`] = [
    {
      title:
        obj.type === 'site'
          ? `Sites`
          : isMultisite
          ? `Posts (Site: ${obj.path})`
          : `Posts`,
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
