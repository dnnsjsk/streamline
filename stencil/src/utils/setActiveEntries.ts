import { stateInternal } from '../store/internal';
import { stateLocal } from '../store/local';
import { filterDeep } from 'deepdash-es/standalone';

export function setActiveEntries() {
  stateInternal.entriesActive = filterDeep(
    stateInternal.entries.filter((val) => Object.keys(val).length !== 0),
    (o) => {
      const getResults = (type) => {
        return (
          stateLocal.active === type &&
          ((o.type === stateLocal.active &&
            o.name
              .toLowerCase()
              .includes(stateInternal.searchValue.toLowerCase())) ||
            (o.type === stateLocal.active &&
              o.nameParent &&
              o.nameParent
                .toLowerCase()
                .includes(stateInternal.searchValue.toLowerCase()))) &&
          (stateLocal[type + 'Mode'] === 'favourite'
            ? o.favourite === true
            : true)
        );
      };

      return getResults(stateLocal.active);
    },
    { childrenPath: ['children'] }
  );
}
