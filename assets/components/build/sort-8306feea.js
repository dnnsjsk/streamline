import { s as state } from './internal-1f00f851.js';
import { c as capitalizeFirstLetter } from './capitalizeFirstLetter-646b80d8.js';

const sort = (item, direction = 'ascending', force = false) => {
  function sorter(a, b) {
    const first = direction === 'ascending' ? a : b;
    const second = direction === 'ascending' ? b : a;
    if (first[item.id] < second[item.id])
      return -1;
    if (first[item.id] > second[item.id])
      return 1;
    return 0;
  }
  const newArr = [
    ...state[`entries${capitalizeFirstLetter(state.active)}Active`],
  ];
  newArr.forEach((obj) => {
    if (obj.type === item.type) {
      newArr[newArr.indexOf(obj)] = Object.assign(Object.assign({}, newArr[newArr.indexOf(obj)]), { children: Object.values(obj.children).sort(sorter) });
    }
  });
  state[`entries${capitalizeFirstLetter(state.active)}Active`] = newArr;
  if (!force) {
    state.sort = Object.assign(Object.assign({}, state.sort), { [item.type]: {
        id: item.id,
        direction: direction,
      } });
  }
};

export { sort as s };
