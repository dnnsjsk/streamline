import { g as getRenderingRef, f as forceUpdate } from './index-2c4cdcb5.js';

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

'use strict';

// do not edit .js files directly - edit src/index.jst


  var envHasBigInt64Array = typeof BigInt64Array !== 'undefined';


var es6 = function equal(a, b) {
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;

    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }


    if ((a instanceof Map) && (b instanceof Map)) {
      if (a.size !== b.size) return false;
      for (i of a.entries())
        if (!b.has(i[0])) return false;
      for (i of a.entries())
        if (!equal(i[1], b.get(i[0]))) return false;
      return true;
    }

    if ((a instanceof Set) && (b instanceof Set)) {
      if (a.size !== b.size) return false;
      for (i of a.entries())
        if (!b.has(i[0])) return false;
      return true;
    }

    if (ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (a[i] !== b[i]) return false;
      return true;
    }


    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

    for (i = length; i-- !== 0;) {
      var key = keys[i];

      if (!equal(a[key], b[key])) return false;
    }

    return true;
  }

  // true if both NaN, false otherwise
  return a!==a && b!==b;
};

var _a;
const isTest = (_a = document
    .querySelector("streamline-container")) === null || _a === void 0 ? void 0 : _a.hasAttribute("test");
const { state, dispose, onChange } = createStore({
    // @ts-ignore
    data: window.streamlineData,
    class: {
        tag: "px-2.5 py-1.5 bg-blue-gray-200 text-blue-gray-500 inline-block h-[max-content] leading-1",
    },
    menus: ["fav", "menu", "post", "settings"],
    menu: {
        fav: {
            name: "fav",
        },
        menu: {
            name: "menu",
            commands: ["/site ", "/network"],
        },
        post: {
            name: "post",
        },
        settings: {
            name: "settings",
        },
    },
    commands: {
        local: {
            site: {
                // @ts-ignore
                condition: window.streamlineData.network && !isTest,
                name: "/site [name]",
                description: `Display entries from a different site in the network.`,
                callback: "sites",
            },
            network: {
                // @ts-ignore
                condition: window.streamlineData.network && !isTest,
                name: "/network",
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
    entriesMenuCurrentPath: "",
    entriesMenuIsNetwork: false,
    entriesNetwork: [],
    entriesNetworkActive: [],
    entriesPost: [],
    entriesPostActive: [],
    entriesPostCurrentPath: "",
    entriesSettings: [
        {
            children: [
                {
                    children: [
                        {
                            id: "keyNavigation",
                            name: "Arrow key navigation",
                            nameParent: "Key shortcuts",
                            label: "Use up and down arrow keys to navigate between tabs",
                        },
                        {
                            id: "keyExit",
                            name: "Close with escape",
                            nameParent: "Key shortcuts",
                            label: "Use escape key to close app",
                        },
                    ],
                    name: "Key shortcuts",
                },
                {
                    children: [
                        {
                            id: "searchResetInput",
                            name: "Reset search",
                            nameParent: "Searchbar",
                            label: "Resets search value after switching tabs",
                        },
                    ],
                    name: "Searchbar",
                },
                {
                    children: [
                        {
                            id: "appearanceBlur",
                            name: "Enable background blur",
                            nameParent: "Appearance",
                            label: "Enabling the overlay blur can decrease performance on slower machines",
                        },
                    ],
                    name: "Appearance",
                },
            ],
            type: "settings",
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
    searchNoValue: "No entries found",
    searchPlaceholder: "",
    searchValue: "",
    test: isTest,
    testFull: false,
    visible: false,
});
onChange("entriesSettingsSave", (value) => {
    state.entriesSettingsHaveChanged = !es6(value, state.entriesSettingsLoad);
});
onChange("entriesSettingsLoad", (value) => {
    state.entriesSettingsHaveChanged = !es6(value, state.entriesSettingsSave);
});

function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}

export { capitalizeFirstLetter as a, createStore as c, state as s };
