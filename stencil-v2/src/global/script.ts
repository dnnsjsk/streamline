import { getMetaKey } from '../utils/get/getMetaKey'
import { state } from '../store/internal'

export default function () {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'k' && getMetaKey(e)) {
      e.preventDefault()
      state.visible = !state.visible
    }

    if (state.visible) {
      if (
        e.key === 'ArrowUp' &&
        getMetaKey(e) &&
        state.entriesSettingsLoad.keys.navigationTabs
      ) {
        e.preventDefault()
        // this.cycleTabs('up')
      }

      if (
        e.key === 'ArrowDown' &&
        getMetaKey(e) &&
        state.entriesSettingsLoad.keys.navigationTabs
      ) {
        e.preventDefault()
        // this.cycleTabs('down')
      }

      if (e.key === 'Escape' && state.entriesSettingsLoad.keys.exit) {
        e.preventDefault()
        state.visible = false
      }
    }
  })
}
