import { isArray, isObject } from 'lodash-es';
import { state } from '../../store/internal';

export const getEntriesSliced = (item) => {
  const min =
    (state.entriesPostCurrentPage - 1) * state.entriesSettingsLoad.query.amount;
  const max =
    state.entriesPostCurrentPage * state.entriesSettingsLoad.query.amount;

  return isArray(item)
    ? item.slice(min, max)
    : isObject
    ? Object.fromEntries(Object.entries(item).slice(min, max))
    : '';
};
