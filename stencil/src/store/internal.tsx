import { createStore } from '@stencil/store';
import equal from 'fast-deep-equal/es6';
import { focusSearch } from '../utils/focusSearch';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

const isTest = document
  .querySelector('streamline-container')
  ?.hasAttribute('test');

const { state, dispose, onChange } = createStore({
  class: {
    tag: 'px-2.5 py-1.5 bg-blue-gray-200 text-blue-gray-500 inline-block h-[max-content] leading-1',
  },
  commands: {
    local: {
      /*
      site: {
        // @ts-ignore
        condition: window.streamlineData.network && !isTest,
        name: '/site [name]',
        description: `Display entries from a different site in the network.`,
        callback: 'sites',
      },
      */
    },
  },
  currentSite: {
    // @ts-ignore
    id: window.streamlineData.siteId,
    // @ts-ignore
    path: window.streamlineData.sitePath,
  },
  // @ts-ignore
  data: window.streamlineData,
  // @ts-ignore
  entriesFav: JSON.parse(window.streamlineData.favourites),
  // @ts-ignore
  entriesFavActive: JSON.parse(window.streamlineData.favourites),
  entriesMenu: [],
  entriesMenuActive: [],
  entriesMenuCurrentPath: '',
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
              name: 'Entry navigation',
              nameParent: 'Key shortcuts',
              label: 'Navigate between entry items',
              metaKey: false,
              keys: ['↑', '↓'],
            },
            {
              id: 'keyNavigationTabs',
              name: 'Tab navigation',
              nameParent: 'Key shortcuts',
              label: 'Navigate between top-level tab items',
              metaKey: true,
              keys: ['↑', '↓'],
            },
            {
              id: 'keySearch',
              name: 'Focus search',
              nameParent: 'Key shortcuts',
              label: 'Focus the search bar',
              metaKey: true,
              keys: ['s'],
            },
            {
              id: 'keyExit',
              name: 'Close',
              nameParent: 'Key shortcuts',
              label: 'Exit the app',
              metaKey: false,
              keys: ['esc'],
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
    keyNavigationTabs: {
      default: true,
    },
    keySearch: {
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
  entriesSiteActive: [],
  isEnter: false,
  isHelp: false,
  isLoading: false,
  isMac: false,
  isProcessing: false,
  isSearch: true,
  isSearchFocus: true,
  isSlash: false,
  focusIndex: -1,
  menus: ['site', 'network', 'fav', 'menu', 'post', 'settings'],
  menu: {
    site: {
      name: 'site',
      // @ts-ignore
      condition: window.streamlineData.network && !isTest,
      text: 'Site',
      help: `
      <p>Streamline works with single sites and multisite networks. Since you are able to view this text, it means that you are currently on a multisite.</p>
      <p>This tab can be used to search for a specific subsite in the network and use Streamline as the selected site.</p>
      <p>After searching and selecting a site, the <strong>menu</strong> tab will show the admin menu of the chosen site, while the <strong>post</strong> tab makes it possible to search for posts of the respective subsite.</p>
      `,
    },
    network: {
      name: 'network',
      // @ts-ignore
      condition: window.streamlineData.network && !isTest,
      text: 'Network',
      help: `
      <p>Streamline works with single sites and multisite networks. Since you are able to view this text, it means that you are currently on a multisite.</p>
      <p>The network tab shows you all the available menu items from the network admin screen. Clicking any of the links will redirect to the respective page.</p>
      `,
    },
    fav: {
      name: 'fav',
      condition: true,
      text: 'Faves',
      help: `
      <p>All individual menu items and posts can be favourited for easier access.</p>
      <p>This mode lists all of your currently favourites in unified list.</p>
      `,
    },
    menu: {
      name: 'menu',
      condition: true,
      text: 'Menu',
      help: `
      <p>The menu tab shows you all the available menu items from the admin screen. Clicking any of the links will redirect to the respective page.</p>
      `,
    },
    post: {
      name: 'post',
      condition: true,
      text: 'Post',
      help: `
      <p>Posts are an essential part of WordPress and the posts tab allows you to search for any posts on your site.</p>
      `,
    },
    /*
    custom: {
      name: 'custom',
    },
     */
    settings: {
      name: 'settings',
      condition: true,
      text: 'Settings',
      help: `
      <p>The settings tab allows you to make Streamline your own by customising certain nuances to your liking.</p>
      `,
    },
  },
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

onChange('searchValue', (value) => {
  if (value === '') {
    state.focusIndex = -1;
  }
});

onChange('visible', (value) => {
  const el = document
    ?.querySelector('streamline-container')
    ?.shadowRoot?.querySelector('streamline-box')
    ?.shadowRoot?.querySelector('streamline-entries')
    ?.shadowRoot?.querySelector('div > div');

  if (el) {
    if (value === true) {
      disableBodyScroll(el, {
        reserveScrollBarGap: true,
      });
    } else {
      clearAllBodyScrollLocks();
    }
  }

  if (value === true) {
    setTimeout(() => {
      focusSearch();
    }, 20);
  }
});

export {
  state as stateInternal,
  dispose as disposeInternal,
  onChange as onChangeInternal,
};
