import { createStore } from '@stencil/store';
import { setSearchPlaceholder } from '../utils/set/setSearchPlaceholder';

const { state, dispose, onChange } = createStore({
  active: 'search',
  // @ts-ignore
  data: window.streamlineData,
  visible: false,
  entriesSettings: [
    {
      type: 'settings',
      children: [
        {
          name: 'Key shortcuts',
          id: 'key',
          children: [
            {
              id: 'navigation',
              name: 'Entry navigation',
              nameParent: 'Key shortcuts',
              label: 'Navigate between entry items',
              metaKey: false,
              keys: ['↑', '↓'],
            },
            {
              id: 'navigationTabs',
              name: 'Tab navigation',
              nameParent: 'Key shortcuts',
              label: 'Navigate between top-level tab items',
              metaKey: true,
              keys: ['→', '←'],
            },
            {
              id: 'search',
              name: 'Focus search',
              nameParent: 'Key shortcuts',
              label: 'Focus the search bar',
              metaKey: true,
              keys: ['s'],
            },
            {
              id: 'exit',
              name: 'Close',
              nameParent: 'Key shortcuts',
              label: 'Exit the app',
              metaKey: false,
              keys: ['esc'],
            },
          ],
        },
        {
          name: 'Appearance',
          id: 'appearance',
          children: [
            {
              id: 'animation',
              name: 'Enable animations',
              nameParent: 'Appearance',
              label: 'Enables micro animations throughout the app',
            },
          ],
        },
        {
          name: 'Queries',
          id: 'queries',
          children: [
            {
              id: 'amount',
              name: 'Post amount',
              nameParent: 'Queries',
              label: 'Maximum number of displayed posts per page',
            },
          ],
        },
      ],
    },
  ],
  entriesSettingsActive: [],
  entriesSettingsHaveChanged: false,
  entriesSettingsLoad: {
    keys: {
      navigation: true,
      navigationTabs: true,
      search: true,
      exit: true,
    },
    appearance: {
      animation: true,
    },
    query: {
      amount: 20,
    },
  },
  entriesSettingsSave: {},
  isEnter: false,
  isLoading: false,
  isMac: navigator.userAgent.indexOf('Mac OS X') !== -1,
  isSearchFocus: true,
  searchPlaceholder: '',
  searchValue: '',
});

state.entriesSettingsActive = state.entriesSettings;
state.entriesSettingsSave = state.entriesSettingsLoad;

setSearchPlaceholder();

export { state, dispose, onChange };
