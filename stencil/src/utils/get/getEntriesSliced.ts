import { isArray, isObject } from 'lodash-es';
import { state } from '../../store/internal';

export function getEntriesSliced(item) {
  const min =
    (state.entriesPostCurrentPage - 1) *
    state.entriesSettingsLoad.queryAmount.default;
  const max =
    state.entriesPostCurrentPage *
    state.entriesSettingsLoad.queryAmount.default;

  return isArray(item)
    ? item.slice(min, max)
    : isObject
    ? Object.fromEntries(Object.entries(item).slice(min, max))
    : '';
}
