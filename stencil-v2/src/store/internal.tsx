import { createStore } from '@stencil/store';
import { resetScroll } from '../utils/general/resetScroll';

const { state, dispose, onChange } = createStore({
  actions: {
    post: {
      id: 'post',
      condition: true,
      name: 'Search for a post',
      active: 'post',
      route: 'get/posts',
    },
    site: {
      id: 'site',
      // @ts-ignore
      condition: window?.streamlineData?.network,
      name: 'Search for a site',
      active: 'site',
      route: 'get/sites',
    },
  },
  active: 'search',
  bodyStyle: {},
  currentSite: {
    id: 1,
    path: '/',
  },
  // @ts-ignore
  data: window.streamlineData,
  drawer: {
    active: false,
    items: [],
    onSave: null,
    title: '',
    values: {},
  },
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
  entriesActions: {},
  entriesEditing: {},
  // @ts-ignore
  entriesFav: JSON.parse(window?.streamlineData?.favourites ?? '[]'),
  // @ts-ignore
  entriesFavActive: JSON.parse(window?.streamlineData?.favourites ?? '[]'),
  // @ts-ignore
  entriesMenu: JSON.parse(window?.streamlineData?.menu ?? '[]'),
  entriesMenuCurrentPath: '',
  entriesNetworkMenu: [],
  entriesPost: [],
  entriesPostActive: [],
  entriesPostCurrentPage: 1,
  entriesPostCurrentPath: '',
  entriesPostQuery: '',
  entriesPostTotal: 0,
  entriesSearch: [],
  entriesSearchActive: [],
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
  entriesSite: [],
  entriesSiteActive: [],
  entriesSiteCurrentPage: 1,
  entriesSiteQuery: '',
  entriesSiteTotal: 0,
  infoBar: {
    pages: 1,
    amount: 1,
  },
  isEnter: false,
  isLoading: false,
  isMac: navigator.userAgent.indexOf('Mac OS X') !== -1,
  isSearchFocus: true,
  isVisible: false,
  scroll: 0,
  searchPlaceholder: '',
  searchNoValue: 'No entries found',
  searchValue: '',
  sort: {
    post: {},
    site: {},
  },
  test: false,
});

onChange('isVisible', (value) => {
  resetScroll(value);
});

state.entriesSettingsActive = state.entriesSettings;
state.entriesSettingsSave = state.entriesSettingsLoad;

export { state, dispose, onChange };
