import { createStore } from '@stencil/store';

const { state, dispose } = createStore({
  // @ts-ignore
  data: window.streamlineData,
  class: {
    tag: 'px-2.5 py-1.5 bg-gray-200 text-gray-500 inline-block h-[max-content] leading-1',
  },
  menu: {
    fav: {
      name: 'fav',
    },
    menu: {
      name: 'menu',
      commands: ['/site'],
    },
    post: {
      name: 'post',
    },
  },
  commands: {
    local: {
      site: {
        name: '/site [name]',
        description: `Display entries from a different site in the network.`,
        callback: 'get_sites',
      },
    },
  },
  // @ts-ignore
  entriesFav: JSON.parse(window.streamlineData.favourites),
  // @ts-ignore
  entriesFavActive: JSON.parse(window.streamlineData.favourites),
  entriesMenu: [],
  entriesMenuActive: [],
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
  visible: false,
});

export { state as stateInternal, dispose as disposeInternal };
