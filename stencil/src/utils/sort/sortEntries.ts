import { sort } from './sort';
import { state } from '../../store/internal';

export const sortEntries = () => {
  if (state?.sort?.post || state?.sort?.site) {
    Object.entries(state?.sort as unknown).forEach(([key, value]) => {
      sort(
        {
          id: value.id,
          type: key,
        },
        value.direction,
        true
      );
    });
  }
};
