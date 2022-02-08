import { stateLocal } from '../../store/local';
import { sort } from './sort';

export function sortEntries() {
  if (Object.values(stateLocal?.sort).length >= 1) {
    Object.entries(stateLocal?.sort as unknown).forEach(([key, value]) => {
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
}