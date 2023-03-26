import { createStore } from '@stencil/store';
import resetScroll from '../utils/general/resetScroll';
import setEntries from '../utils/set/setEntries';
import equal from 'fast-deep-equal/es6';
import setSearchPlaceholder from '../utils/set/setSearchPlaceholder';

const { state, dispose, onChange } = createStore({
  action: {} as any,
  active: 'entries',
  bodyStyle: {},
  currentSite: {
    id: (window as any)?.streamlineData?.siteId || '1',
    path: (window as any)?.streamlineData?.sitePath || '/',
  },
  data: (window as any).streamlineData as {
    adminUrl: string;
    ajax: string;
    favourites: string;
    isAdmin: boolean;
    isMainSite: boolean;
    isNetwork: boolean;
    isVisible: boolean;
    networkAdminUrl: string | boolean;
    nonce: string;
    nonceRest: string;
    rest: string;
    settings: any;
    siteId: string;
    sitePath: string;
    siteUrl: string;
    userId: string;
  },
  entries: [],
  entriesActive: [],
  entriesMenu: JSON.parse((window as any)?.streamlineData?.menu ?? '[]'),
  entriesNetworkMenu: [],
  entriesSettings: [
    {
      name: 'Settings',
      children: [
        {
          name: 'Key shortcuts',
          id: 'keys',
          children: [
            {
              id: 'navigation',
              name: 'Entry navigation',
              label: 'Navigate between entry items',
              keys: ['↑', '↓'],
            },
            {
              id: 'navigationActive',
              name: 'Tab navigation',
              label:
                'Navigate between top-level items (search, favourites, settings)',
              keys: ['Meta', '↑', '↓'],
            },
            {
              id: 'search',
              name: 'Focus search',
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
  entriesQuery: [],
  entriesQueryActive: [],
  entriesQueryCurrentPage: 1,
  entriesQueryCurrentPath: '',
  entriesQueryQuery: '',
  entriesQueryTotal: 0,
  focusIndex: -1,
  isEnter: false,
  isLoading: false,
  isMac: navigator.userAgent.indexOf('Mac OS X') !== -1,
  isMultisite: (window as any)?.streamlineData?.network,
  isVisible: false,
  menus: ['entries', 'settings'],
  scroll: 0,
  searchPlaceholder: '',
  searchNoValue: 'No entries found',
  searchValue: '',
});

onChange('isVisible', (value) => {
  state.focusIndex = -1;
  resetScroll(value);
});

onChange('searchValue', (value) => {
  state.isLoading = false;
  state.isEnter =
    (state.active === 'post' || state.active === 'site') &&
    state.searchValue.trim().length >= 1;
  if (value === '') {
    state.focusIndex = -1;
  }
  setEntries();
});

onChange('active', () => {
  state.focusIndex = -1;
  setSearchPlaceholder();
});

onChange('entriesSettingsSave', (value) => {
  state.entriesSettingsHaveChanged = !equal(value, state.entriesSettingsLoad);
});

onChange('entriesSettingsLoad', (value) => {
  state.entriesSettingsHaveChanged = !equal(value, state.entriesSettingsSave);
});

export { state, dispose, onChange };
