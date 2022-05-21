import { createStore } from '@stencil/store';
import { resetScroll } from '../utils/general/resetScroll';
import { setEntries } from '../utils/entries/setEntries';
import { setActions } from '../utils/entries/setActions';
import equal from 'fast-deep-equal/es6';

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
  active: 'fav',
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
  entriesActions: [],
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
  entriesSettings: [
    {
      type: 'settings',
      children: [
        {
          name: 'Key shortcuts',
          id: 'keys',
          children: [
            {
              id: 'navigation',
              name: 'Entry navigation',
              nameParent: 'Key shortcuts',
              label: 'Navigate between entry items',
              keys: ['↑', '↓'],
            },
            {
              id: 'navigationActive',
              name: 'Tab navigation',
              nameParent: 'Key shortcuts',
              label:
                'Navigate between top-level items (search, favourites, settings)',
              keys: ['Meta', '↑', '↓'],
            },
            {
              id: 'search',
              name: 'Focus search',
              nameParent: 'Key shortcuts',
              label: 'Focus the search bar',
              keys: ['Meta', 's'],
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
          id: 'query',
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
      navigationActive: true,
      search: true,
    },
    appearance: {
      animation: true,
    },
    query: {
      amount: 20,
    },
  },
  entriesSettingsSave: {} as any,
  entriesSite: [],
  entriesSiteActive: [],
  entriesSiteCurrentPage: 1,
  entriesSiteQuery: '',
  entriesSiteTotal: 0,
  focusIndex: -1,
  infoBar: {
    pages: 1,
    amount: 1,
  },
  isEnter: false,
  isLoading: false,
  isMac: navigator.userAgent.indexOf('Mac OS X') !== -1,
  isVisible: false,
  menus: ['search', 'fav', 'settings'],
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
  state.focusIndex = -1;
});

onChange('searchValue', (value) => {
  if (value === '') {
    state.focusIndex = -1;
  }
  setEntries();
});

onChange('active', () => {
  state.focusIndex = -1;
  setEntries();
});

onChange('entriesSettingsSave', (value) => {
  state.entriesSettingsHaveChanged = !equal(value, state.entriesSettingsLoad);
});

onChange('entriesSettingsLoad', (value) => {
  state.entriesSettingsHaveChanged = !equal(value, state.entriesSettingsSave);
});

setActions();

export { state, dispose, onChange };
