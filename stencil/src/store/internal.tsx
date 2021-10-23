import { createStore } from '@stencil/store';

const { state, dispose, onChange } = createStore({
  // @ts-ignore
  data: window.streamlineData,
  class: {
    tag: 'px-2.5 py-1.5 bg-blue-gray-200 text-blue-gray-500 inline-block h-[max-content] leading-1',
  },
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
  },
  commands: {
    local: {
      site: {
        // @ts-ignore
        condition: window.streamlineData.network && !window.streamlineTest,
        name: '/site [name]',
        description: `Display entries from a different site in the network.`,
        callback: 'get_sites',
      },
      network: {
        // @ts-ignore
        condition: window.streamlineData.network && !window.streamlineTest,
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
  entriesSite: [],
  isEnter: false,
  isLoading: false,
  isSites: false,
  isSlash: false,
  isProcessing: false,
  searchNoValue: 'No entries found',
  searchPlaceholder: '',
  searchValue: '',
  // @ts-ignore
  test: window.streamlineTest,
  testFull: false,
  visible: false,
});

export {
  state as stateInternal,
  dispose as disposeInternal,
  onChange as onChangeInternal,
};
