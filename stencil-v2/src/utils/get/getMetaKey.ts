import { state } from '../../store/internal'

export const getMetaKey = (e) => {
  return state.isMac ? e.metaKey : e.ctrlKey
}
