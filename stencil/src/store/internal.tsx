import { createStore } from '@stencil/store';
import equal from 'fast-deep-equal/es6';
import { blurSearch } from '../utils/search/blurSearch';
import { resetScroll } from '../utils/general/resetScroll';
import { resetView } from '../utils/general/resetView';
import { setSearchPlaceholder } from '../utils/set/setSearchPlaceholder';
import { getAll } from '../utils/get/getAll';

const isTest = document
  .querySelector('streamline-container')
  ?.hasAttribute('test');

const { state, dispose, onChange } = createStore({
  actions: {
    post: {
      id: 'post',
      name: 'Search for a post',
      type: 'query',
      query: {},
    },
    site: {
      id: 'site',
      name: 'Search for a site',
      type: 'query',
      query: {},
    },
  },
  active: 'menu',
  class: {
    tag: 'px-2.5 py-1.5 bg-slate-200 text-slate-500 inline-block h-[max-content] leading-1',
  },
  currentSite: {
    // @ts-ignore
    id: window.streamlineData.siteId,
    // @ts-ignore
    path: window.streamlineData.sitePath,
  },
  bodyStyle: {},
  // @ts-ignore
  data: window.streamlineData,
  drawer: {
    active: false,
    items: [],
    onSave: null,
    title: '',
    values: {},
  },
  entriesActions: {},
  entriesEditing: {},
  // @ts-ignore
  entriesFav: JSON.parse(window.streamlineData.favourites),
  // @ts-ignore
  entriesFavActive: JSON.parse(window.streamlineData.favourites),
  entriesMenu: [],
  entriesMenuActive: [],
  entriesMenuCurrentPath: '',
  entriesNetworkMenu: [],
  entriesNetworkMenuActive: [],
  entriesPost: [],
  entriesPostActive: [],
  entriesPostCurrentPage: 1,
  entriesPostCurrentPath: '',
  entriesPostQuery: '',
  entriesPostTotal: 0,
  entriesSettings: [
    {
      children: [
        {
          children: [
            {
              id: 'mode',
              name: 'View mode',
              nameParent: 'Mode',
              label: 'Choose between different views',
              choices: {
                default: 'Default',
                dashboard: 'Dashboard',
              },
            },
          ],
          name: 'Mode',
        },
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
              id: 'behaviourDefaultTab',
              name: 'Default tab',
              nameParent: 'Behaviour',
              label: 'Which tab should be opened by default when opening app',
              choices: {
                last: 'Last',
                site: 'Site',
                networkMenu: 'Network',
                fav: 'Faves',
                menu: 'Menu',
                post: 'Post',
                settings: 'Settings',
              },
            },
          ],
          name: 'Behaviour',
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
        {
          children: [
            {
              id: 'queryAmount',
              name: 'Post amount',
              nameParent: 'Queries',
              label: 'Maximum number of displayed posts per page',
            },
          ],
          name: 'Queries',
        },
      ],
      type: 'settings',
    },
  ],
  entriesSearch: [],
  entriesSearchActive: [],
  entriesSettingsActive: [],
  entriesSettingsLoad: {
    mode: {
      default: 'default',
    },
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
    behaviourDefaultTab: {
      default: 'last',
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
    queryAmount: {
      default: 20,
    },
  },
  entriesSettingsSave: {},
  entriesSettingsHaveChanged: false,
  entriesSite: [],
  entriesSiteActive: [],
  entriesSiteCurrentPage: 1,
  entriesSiteQuery: '',
  entriesSiteTotal: 0,
  historySearchesSite: JSON.parse(
    // @ts-ignore
    window.streamlineData.historySearchesSite
  ).reverse(),
  historySearchesPost: JSON.parse(
    // @ts-ignore
    window.streamlineData.historySearchesPost
  ).reverse(),
  isEnter: false,
  isHelp: false,
  infoBarAmount: '',
  infoBarPages: '',
  isMac: false,
  isLoading: false,
  isSearch: true,
  isSearchFocus: true,
  isSlash: false,
  focusIndex: -1,
  menus: ['search', 'site', 'networkMenu', 'fav', 'menu', 'post', 'settings'],
  menu: {
    search: {
      name: 'search',
      // @ts-ignore
      condition: true,
      text: 'Search',
      help: `
      <p>The search tab is at the core and center of Streamline. It combines all the other modes (when in dashboard view) into one single screen.</p>
      <p>Instead of searching for a single entry, the search tab allows you to search for all entries (menu, post, favourites) at once.</p>
      `,
    },
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
    networkMenu: {
      name: 'networkMenu',
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
    settings: {
      name: 'settings',
      condition: true,
      text: 'Settings',
      help: `
      <p>The settings tab allows you to make Streamline your own by customising certain nuances to your liking.</p>
      `,
    },
  },
  scroll: 0,
  searchNoValue: 'No entries found',
  searchPlaceholder: '',
  searchValue: '',
  test: isTest,
  testFull: false,
  visible: false,
});

onChange('active', (value) => {
  state.entriesEditing = {};
  if (
    value === 'search' &&
    state.entriesSettingsLoad.mode.default === 'default'
  ) {
    getAll();
  }
});

onChange('drawer', () => {
  blurSearch();
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

onChange('active', () => {
  resetView();
  setSearchPlaceholder();

  if (state.active === 'search') {
    getAll();
  }
});

onChange('visible', (value) => {
  if (state.entriesSettingsLoad.mode.default !== 'dashboard') {
    state.active = 'search';
  } else if (!state.menus.includes(state.active)) {
    state.active = 'menu';
  } else if (state.entriesSettingsLoad.behaviourDefaultTab.default !== 'last') {
    state.active = state.entriesSettingsLoad.behaviourDefaultTab.default;
  }

  resetScroll(value);
});

onChange('visible', () => {});

export { state, dispose, onChange };
