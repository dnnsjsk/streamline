import { state } from '../../store/internal';
import { setEntries } from './setEntries';

export const setupEntries = () => {
  state.entriesActions = {
    type: 'action',
    children: Object.assign(
      {},
      ...Array.from(
        Object.values(state.actions).map((item) => {
          return (
            item.condition &&
            Object.assign({
              [item.id]: {
                ...state.actions[item.id],
                type: 'action',
              },
            })
          );
        })
      )
    ),
  };
  state.entriesFavActive = state.entriesFav;
  state.entriesSearch = [
    ...[state.entriesActions],
    ...state.entriesMenu,
    ...state.entriesNetworkMenu,
  ];
  state.entriesSearchActive = [
    ...[state.entriesActions],
    ...state.entriesMenu,
    ...state.entriesNetworkMenu,
  ];
  setEntries();
};
