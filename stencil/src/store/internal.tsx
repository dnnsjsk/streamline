import { createStore } from '@stencil/store';

const { state, dispose } = createStore({
  // @ts-ignore
  data: window.streamlineData,
  class: {
    tag: 'px-2.5 py-1.5 bg-gray-200 text-gray-500 inline-block h-[max-content] leading-1',
  },
  commands: {
    // @ts-ignore
    ...(window.streamlineData.isMultisite && {
      site: {
        name: '/site [name]',
        description: `Display entries from a different site in the network.`,
        callback: 'get_sites',
      },
    }),
  },
  entriesMenu: [],
  entriesMenuActive: [],
  entriesPost: [],
  entriesPostActive: [],
  entriesSite: [],
  isEnter: false,
  isLoading: false,
  isSites: false,
  isSlash: false,
  searchNoValue: 'No entries found',
  searchPlaceholder: '',
  searchValue: '',
  visible: true,
});

export { state as stateInternal, dispose as disposeInternal };
