import { state } from '../../store/internal';
import { setActions } from '../entries/setActions';

const menu = require('../../../../includes/assets/components/build/test/entriesMenu.json');

export const enableMultisite = async (page) => {
  state.actions = {
    ...state.actions,
    site: {
      ...state.actions.site,
      condition: true,
    },
  };
  setActions();
  state.entriesSearch = [...menu, ...state.entriesActions];
  state.entriesSearchActive = [...menu, ...state.entriesActions];
  await page.waitForChanges();
};
