import { stateLocal } from '../../store/local';
import { state } from '../../store/internal';
import { capitalizeFirstLetter } from '../string/capitalizeFirstLetter';

export function sort(item, direction = 'ascending', force = false) {
  function sorter(a, b) {
    const first = direction === 'ascending' ? a : b;
    const second = direction === 'ascending' ? b : a;
    if (first[item.id] < second[item.id]) return -1;
    if (first[item.id] > second[item.id]) return 1;
    return 0;
  }

  const newArr = [
    ...state[`entries${capitalizeFirstLetter(stateLocal.active)}Active`],
  ];

  newArr.forEach((obj) => {
    if (obj.type === item.type) {
      newArr[newArr.indexOf(obj)] = {
        ...newArr[newArr.indexOf(obj)],
        children: Object.values(obj.children).sort(sorter),
      };
    }
  });

  state[`entries${capitalizeFirstLetter(stateLocal.active)}Active`] = newArr;

  if (!force) {
    stateLocal.sort = {
      ...stateLocal.sort,
      [item.type]: {
        id: item.id,
        direction: direction,
      },
    };
  }
}