import { state } from '../../store/internal';
import { setEntries } from './setEntries';

export const setupEntries = () => {
  const search = [
    ...state.entriesActions,
    ...state.entriesMenu,
    ...state.entriesNetworkMenu,
  ];

  state.entriesSearch = search;
  state.entriesSearchActive = search;
  state.entriesFavActive = state.entriesFav;
  state.entriesSiteActive = state.entriesSite;
  setEntries();
};
