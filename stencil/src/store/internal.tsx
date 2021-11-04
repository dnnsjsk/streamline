import { createStore } from '@stencil/store';
import equal from 'fast-deep-equal/es6';

const isTest = document
  .querySelector('streamline-container')
  ?.hasAttribute('test');

const { state, dispose, onChange } = createStore({
  // @ts-ignore
  data: window.streamlineData,
  class: {
    tag: 'px-2.5 py-1.5 bg-blue-gray-200 text-blue-gray-500 inline-block h-[max-content] leading-1',
  },
  menus: ['fav', 'menu', 'post', 'settings'],
  menu: {
    fav: {
      name: 'fav',
    },
    menu: {
      name: 'menu',
      commands: ['/site ', '/network'],
    },
    post: {
      name: 'post',
    },
    settings: {
      name: 'settings',
    },
  },
  commands: {
    local: {
      site: {
        // @ts-ignore
        condition: window.streamlineData.network && !isTest,
        name: '/site [name]',
        description: `Display entries from a different site in the network.`,
        callback: 'sites',
      },
      network: {
        // @ts-ignore
        condition: window.streamlineData.network && !isTest,
        name: '/network',
        description: `Display entries from a from network dashboard.`,
      },
    },
  },
  // @ts-ignore
  entriesFav: JSON.parse(window.streamlineData.favourites),
  // @ts-ignore
  entriesFavActive: JSON.parse(window.streamlineData.favourites),
  entriesMenu: [],
  entriesMenuActive: [],
  entriesMenuCurrentPath: '',
  entriesMenuIsNetwork: false,
  entriesNetwork: [],
  entriesNetworkActive: [],
  entriesPost: [],
  entriesPostActive: [],
  entriesPostCurrentPath: '',
  entriesSettings: [
    {
      children: [
        {
          children: [
            {
              id: 'keyNavigation',
              name: 'Arrow key navigation',
              nameParent: 'Key shortcuts',
              label: 'Use up and down arrow keys to navigate between tabs',
            },
            {
              id: 'keyExit',
              name: 'Close with escape',
              nameParent: 'Key shortcuts',
              label: 'Use escape key to close app',
            },
          ],
          name: 'Key shortcuts',
        },
        {
          children: [
            {
              id: 'searchResetInput',
              name: 'Reset search',
              nameParent: 'Searchbar',
              label: 'Resets search value after switching tabs',
            },
            {
              id: 'searchFocus',
              name: 'Always focus',
              nameParent: 'Searchbar',
              label: 'Focus searchbar after switching tabs',
            },
          ],
          name: 'Searchbar',
        },
        {
          children: [
            {
              id: 'appearanceBlur',
              name: 'Enable background blur',
              nameParent: 'Appearance',
              label:
                'Enabling the overlay blur can decrease performance on slower machines',
            },
          ],
          name: 'Appearance',
        },
      ],
      type: 'settings',
    },
  ],
  entriesSettingsActive: [],
  entriesSettingsLoad: {
    keyNavigation: {
      default: true,
    },
    keyExit: {
      default: true,
    },
    searchResetInput: {
      default: true,
    },
    searchFocus: {
      default: true,
    },
    appearanceBlur: {
      default: false,
    },
  },
  entriesSettingsSave: {},
  entriesSettingsHaveChanged: false,
  entriesSite: [],
  isEnter: false,
  isLoading: false,
  isProcessing: false,
  isSites: false,
  isSlash: false,
  searchNoValue: 'No entries found',
  searchPlaceholder: '',
  searchValue: '',
  test: isTest,
  testFull: false,
  visible: false,
});

onChange('entriesSettingsSave', (value) => {
  state.entriesSettingsHaveChanged = !equal(value, state.entriesSettingsLoad);
});

onChange('entriesSettingsLoad', (value) => {
  state.entriesSettingsHaveChanged = !equal(value, state.entriesSettingsSave);
});

export {
  state as stateInternal,
  dispose as disposeInternal,
  onChange as onChangeInternal,
};
