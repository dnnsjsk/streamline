import { createStore } from '@stencil/store';

const { state } = createStore({
  // @ts-ignore
  data: window.streamlineData,
  commands: {
    site: {
      name: '/site [name]',
      description: 'Search for a site on your network.',
      callback: 'get_sites',
    },
    do: {
      name: '/do [text]',
      description: 'Adds an item to your to-do list.',
    },
  },
  entries: [],
  entriesActive: [],
  isLoading: false,
  isSlash: false,
  isSites: false,
  searchValue: '',
  visible: true,
});

export { state as stateInternal };
