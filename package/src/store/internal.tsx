import { createStore } from '@stencil/store';
import resetScroll from '../utils/general/resetScroll';
import setEntries from '../utils/set/setEntries';
import equal from 'fast-deep-equal/es6';
import setSearchPlaceholder from '../utils/set/setSearchPlaceholder';

const { state, dispose, onChange } = createStore({
  action: {} as any,
  active: 'entries',
  bodyStyle: {},
  collapse: JSON.parse(localStorage.getItem('streamlineCollapse') || '[]'),
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
  },
  entriesSettingsSave: {} as any,
  entriesQuery: [],
  entriesQueryActive: [],
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
  searchedValue: '',
  sort: JSON.parse(localStorage.getItem('streamlineSort') || '{}'),
});

onChange('active', () => {
  state.focusIndex = -1;
  setSearchPlaceholder();
});

onChange('collapse', (value) => {
  localStorage.setItem('streamlineCollapse', JSON.stringify(value));
});

onChange('entriesSettingsLoad', (value) => {
  state.entriesSettingsHaveChanged = !equal(value, state.entriesSettingsSave);
});

onChange('entriesSettingsSave', (value) => {
  state.entriesSettingsHaveChanged = !equal(value, state.entriesSettingsLoad);
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

onChange('sort', (value) => {
  localStorage.setItem('streamlineSort', JSON.stringify(value));
});

export { state, dispose, onChange };
