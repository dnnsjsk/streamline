import { getMenu } from './getMenu';
import { state } from '../../store/internal';

export const getAll = () => {
  if (Object.values(state.entriesMenu).length === 0) {
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
    state.entriesSearch = [state.entriesActions];
  }
  if (state.entriesMenu.length === 0) {
    getMenu({ network: false, adminUrl: state.data.adminUrl });
  }
  if (state.data.network && state.entriesNetworkMenu.length === 0) {
    getMenu({ network: true });
  }
};
