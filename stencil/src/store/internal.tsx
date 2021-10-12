import { createStore } from '@stencil/store';
import { stateLocal } from './local';

const { state, dispose } = createStore({
  // @ts-ignore
  data: window.streamlineData,
  commands: {
    // @ts-ignore
    ...(window.streamlineData.isMultisite && {
      site: {
        name: '/site [name]',
        description: `Display a ${stateLocal.active} from a different site in the network.`,
        callback: 'get_sites',
      },
    }),
    do: {
      name: '/do [text]',
      description: 'Adds an item to your to-do list.',
    },
  },
  entriesMenu: [],
  entriesMenuActive: [],
  entriesSite: [],
  isEnter: false,
  isLoading: false,
  isSites: false,
  isSlash: false,
  searchNoValue: 'No results found',
  searchPlaceholder: "Type '/' for available commands",
  searchValue: '',
  visible: true,
});

export { state as stateInternal, dispose as disposeInternal };
