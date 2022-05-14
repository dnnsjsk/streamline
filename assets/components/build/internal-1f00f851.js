import { g as getRenderingRef, f as forceUpdate } from './index-4ad5c4a3.js';

const appendToMap = (map, propName, value) => {
    const items = map.get(propName);
    if (!items) {
        map.set(propName, [value]);
    }
    else if (!items.includes(value)) {
        items.push(value);
    }
};
const debounce = (fn, ms) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            timeoutId = 0;
            fn(...args);
        }, ms);
    };
};

/**
 * Check if a possible element isConnected.
 * The property might not be there, so we check for it.
 *
 * We want it to return true if isConnected is not a property,
 * otherwise we would remove these elements and would not update.
 *
 * Better leak in Edge than to be useless.
 */
const isConnected = (maybeElement) => !('isConnected' in maybeElement) || maybeElement.isConnected;
const cleanupElements = debounce((map) => {
    for (let key of map.keys()) {
        map.set(key, map.get(key).filter(isConnected));
    }
}, 2000);
const stencilSubscription = () => {
    if (typeof getRenderingRef !== 'function') {
        // If we are not in a stencil project, we do nothing.
        // This function is not really exported by @stencil/core.
        return {};
    }
    const elmsToUpdate = new Map();
    return {
        dispose: () => elmsToUpdate.clear(),
        get: (propName) => {
            const elm = getRenderingRef();
            if (elm) {
                appendToMap(elmsToUpdate, propName, elm);
            }
        },
        set: (propName) => {
            const elements = elmsToUpdate.get(propName);
            if (elements) {
                elmsToUpdate.set(propName, elements.filter(forceUpdate));
            }
            cleanupElements(elmsToUpdate);
        },
        reset: () => {
            elmsToUpdate.forEach((elms) => elms.forEach(forceUpdate));
            cleanupElements(elmsToUpdate);
        },
    };
};

const createObservableMap = (defaultState, shouldUpdate = (a, b) => a !== b) => {
    let states = new Map(Object.entries(defaultState !== null && defaultState !== void 0 ? defaultState : {}));
    const handlers = {
        dispose: [],
        get: [],
        set: [],
        reset: [],
    };
    const reset = () => {
        states = new Map(Object.entries(defaultState !== null && defaultState !== void 0 ? defaultState : {}));
        handlers.reset.forEach((cb) => cb());
    };
    const dispose = () => {
        // Call first dispose as resetting the state would
        // cause less updates ;)
        handlers.dispose.forEach((cb) => cb());
        reset();
    };
    const get = (propName) => {
        handlers.get.forEach((cb) => cb(propName));
        return states.get(propName);
    };
    const set = (propName, value) => {
        const oldValue = states.get(propName);
        if (shouldUpdate(value, oldValue, propName)) {
            states.set(propName, value);
            handlers.set.forEach((cb) => cb(propName, value, oldValue));
        }
    };
    const state = (typeof Proxy === 'undefined'
        ? {}
        : new Proxy(defaultState, {
            get(_, propName) {
                return get(propName);
            },
            ownKeys(_) {
                return Array.from(states.keys());
            },
            getOwnPropertyDescriptor() {
                return {
                    enumerable: true,
                    configurable: true,
                };
            },
            has(_, propName) {
                return states.has(propName);
            },
            set(_, propName, value) {
                set(propName, value);
                return true;
            },
        }));
    const on = (eventName, callback) => {
        handlers[eventName].push(callback);
        return () => {
            removeFromArray(handlers[eventName], callback);
        };
    };
    const onChange = (propName, cb) => {
        const unSet = on('set', (key, newValue) => {
            if (key === propName) {
                cb(newValue);
            }
        });
        const unReset = on('reset', () => cb(defaultState[propName]));
        return () => {
            unSet();
            unReset();
        };
    };
    const use = (...subscriptions) => {
        const unsubs = subscriptions.reduce((unsubs, subscription) => {
            if (subscription.set) {
                unsubs.push(on('set', subscription.set));
            }
            if (subscription.get) {
                unsubs.push(on('get', subscription.get));
            }
            if (subscription.reset) {
                unsubs.push(on('reset', subscription.reset));
            }
            if (subscription.dispose) {
                unsubs.push(on('dispose', subscription.dispose));
            }
            return unsubs;
        }, []);
        return () => unsubs.forEach((unsub) => unsub());
    };
    const forceUpdate = (key) => {
        const oldValue = states.get(key);
        handlers.set.forEach((cb) => cb(key, oldValue, oldValue));
    };
    return {
        state,
        get,
        set,
        on,
        onChange,
        use,
        dispose,
        reset,
        forceUpdate,
    };
};
const removeFromArray = (array, item) => {
    const index = array.indexOf(item);
    if (index >= 0) {
        array[index] = array[array.length - 1];
        array.length--;
    }
};

const createStore = (defaultState, shouldUpdate) => {
    const map = createObservableMap(defaultState, shouldUpdate);
    map.use(stencilSubscription());
    return map;
};

var _a, _b, _c, _d, _e;
const { state, dispose, onChange } = createStore({
  actions: {
    post: {
      id: 'post',
      condition: true,
      name: 'Search for a post',
      active: 'post',
      route: 'get/posts',
    },
    site: {
      id: 'site',
      // @ts-ignore
      condition: (_a = window === null || window === void 0 ? void 0 : window.streamlineData) === null || _a === void 0 ? void 0 : _a.network,
      name: 'Search for a site',
      active: 'site',
      route: 'get/sites',
    },
  },
  active: 'search',
  bodyStyle: {},
  currentSite: {
    id: 1,
    path: '/',
  },
  // @ts-ignore
  data: window.streamlineData,
  drawer: {
    active: false,
    items: [],
    onSave: null,
    title: '',
    values: {},
  },
  visible: false,
  entriesSettings: [
    {
      type: 'settings',
      children: [
        {
          name: 'Key shortcuts',
          id: 'key',
          children: [
            {
              id: 'navigation',
              name: 'Entry navigation',
              nameParent: 'Key shortcuts',
              label: 'Navigate between entry items',
              metaKey: false,
              keys: ['↑', '↓'],
            },
            {
              id: 'navigationTabs',
              name: 'Tab navigation',
              nameParent: 'Key shortcuts',
              label: 'Navigate between top-level tab items',
              metaKey: true,
              keys: ['→', '←'],
            },
            {
              id: 'search',
              name: 'Focus search',
              nameParent: 'Key shortcuts',
              label: 'Focus the search bar',
              metaKey: true,
              keys: ['s'],
            },
            {
              id: 'exit',
              name: 'Close',
              nameParent: 'Key shortcuts',
              label: 'Exit the app',
              metaKey: false,
              keys: ['esc'],
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
              nameParent: 'Appearance',
              label: 'Enables micro animations throughout the app',
            },
          ],
        },
        {
          name: 'Queries',
          id: 'queries',
          children: [
            {
              id: 'amount',
              name: 'Post amount',
              nameParent: 'Queries',
              label: 'Maximum number of displayed posts per page',
            },
          ],
        },
      ],
    },
  ],
  entriesActions: {},
  entriesEditing: {},
  // @ts-ignore
  entriesFav: JSON.parse((_c = (_b = window === null || window === void 0 ? void 0 : window.streamlineData) === null || _b === void 0 ? void 0 : _b.favourites) !== null && _c !== void 0 ? _c : '[]'),
  // @ts-ignore
  entriesFavActive: JSON.parse((_e = (_d = window === null || window === void 0 ? void 0 : window.streamlineData) === null || _d === void 0 ? void 0 : _d.favourites) !== null && _e !== void 0 ? _e : '[]'),
  entriesMenu: [],
  entriesMenuCurrentPath: '',
  entriesNetworkMenu: [],
  entriesPost: [],
  entriesPostActive: [],
  entriesPostCurrentPage: 1,
  entriesPostCurrentPath: '',
  entriesPostQuery: '',
  entriesPostTotal: 0,
  entriesSearch: [],
  entriesSearchActive: [],
  entriesSettingsActive: [],
  entriesSettingsHaveChanged: false,
  entriesSettingsLoad: {
    keys: {
      navigation: true,
      navigationTabs: true,
      search: true,
      exit: true,
    },
    appearance: {
      animation: true,
    },
    query: {
      amount: 20,
    },
  },
  entriesSettingsSave: {},
  entriesSite: [],
  entriesSiteActive: [],
  entriesSiteCurrentPage: 1,
  entriesSiteQuery: '',
  entriesSiteTotal: 0,
  infoBar: {
    pages: 1,
    amount: 1,
  },
  isEnter: false,
  isLoading: false,
  isMac: navigator.userAgent.indexOf('Mac OS X') !== -1,
  isSearchFocus: true,
  scroll: 0,
  searchPlaceholder: '',
  searchNoValue: 'No entries found',
  searchValue: '',
  sort: {
    post: {},
    site: {},
  },
  test: false,
});
state.entriesSettingsActive = state.entriesSettings;
state.entriesSettingsSave = state.entriesSettingsLoad;

export { onChange as o, state as s };
