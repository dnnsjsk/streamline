import { state } from '../../store/internal';
import data from './data';
import setEntries from '../set/setEntries';

export default function get(obj) {
  state.isLoading = true;
  state.entriesQuery = [];
  state.entriesQueryActive = [];
  fetch(
    `${state.data.rest}${obj.route}${
      obj?.parameters
        ? `?${new URLSearchParams(
            JSON.parse(
              JSON.stringify(obj.parameters).replace(
                '{value}',
                state.searchValue
              )
            )
          ).toString()}`
        : ''
    }`,
    data() as any
  )
    .then((response) => response.json())
    .then((data) => {
      const arr = [
        {
          name: 'Query',
          children: data,
        },
      ];
      state.action = obj;
      state.entriesQuery = arr;
      state.entriesQueryActive = arr;
      state.searchValue = '';
      state.active = 'query';
      setEntries();
      obj.callback && obj.callback();
      state.isLoading = false;
    });
}
