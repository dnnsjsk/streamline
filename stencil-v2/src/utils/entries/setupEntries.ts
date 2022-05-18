import { state } from '../../store/internal';
import { setEntries } from './setEntries';

export const setupEntries = () => {
  const search = [
    ...state.entriesActions,
    ...state.entriesMenu,
    ...state.entriesNetworkMenu,
  ];

  state.entriesFavActive = state.entriesFav;
  state.entriesSearch = search;
  state.entriesSearchActive = search;
  setEntries();
};
