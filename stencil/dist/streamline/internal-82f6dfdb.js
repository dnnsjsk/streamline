import { f as getRenderingRef, i as forceUpdate } from './index-87bae8c2.js';

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

function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent);
}

function focusSearch() {
  var _a, _b, _c, _d, _e;
  if (!isMobile()) {
    (_e = (_d = (_c = (_b = (_a = document === null || document === void 0 ? void 0 : document.querySelector('streamline-container')) === null || _a === void 0 ? void 0 : _a.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector('streamline-search')) === null || _c === void 0 ? void 0 : _c.shadowRoot) === null || _d === void 0 ? void 0 : _d.querySelector('input')) === null || _e === void 0 ? void 0 : _e.focus();
    state.isSearchFocus = true;
    state.focusIndex = -1;
  }
}

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// Older browsers don't support event options, feature detect it.

// Adopted and modified solution from Bohdan Didukh (2017)
// https://stackoverflow.com/questions/41594997/ios-10-safari-prevent-scrolling-behind-a-fixed-overlay-and-maintain-scroll-posi

var hasPassiveEvents = false;
if (typeof window !== 'undefined') {
  var passiveTestOptions = {
    get passive() {
      hasPassiveEvents = true;
      return undefined;
    }
  };
  window.addEventListener('testPassive', null, passiveTestOptions);
  window.removeEventListener('testPassive', null, passiveTestOptions);
}

var isIosDevice = typeof window !== 'undefined' && window.navigator && window.navigator.platform && (/iP(ad|hone|od)/.test(window.navigator.platform) || window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1);


var locks = [];
var documentListenerAdded = false;
var initialClientY = -1;
var previousBodyOverflowSetting = void 0;
var previousBodyPaddingRight = void 0;

// returns true if `el` should be allowed to receive touchmove events.
var allowTouchMove = function allowTouchMove(el) {
  return locks.some(function (lock) {
    if (lock.options.allowTouchMove && lock.options.allowTouchMove(el)) {
      return true;
    }

    return false;
  });
};

var preventDefault = function preventDefault(rawEvent) {
  var e = rawEvent || window.event;

  // For the case whereby consumers adds a touchmove event listener to document.
  // Recall that we do document.addEventListener('touchmove', preventDefault, { passive: false })
  // in disableBodyScroll - so if we provide this opportunity to allowTouchMove, then
  // the touchmove event on document will break.
  if (allowTouchMove(e.target)) {
    return true;
  }

  // Do not prevent if the event has more than one touch (usually meaning this is a multi touch gesture like pinch to zoom).
  if (e.touches.length > 1) return true;

  if (e.preventDefault) e.preventDefault();

  return false;
};

var setOverflowHidden = function setOverflowHidden(options) {
  // If previousBodyPaddingRight is already set, don't set it again.
  if (previousBodyPaddingRight === undefined) {
    var _reserveScrollBarGap = !!options && options.reserveScrollBarGap === true;
    var scrollBarGap = window.innerWidth - document.documentElement.clientWidth;

    if (_reserveScrollBarGap && scrollBarGap > 0) {
      previousBodyPaddingRight = document.body.style.paddingRight;
      document.body.style.paddingRight = scrollBarGap + 'px';
    }
  }

  // If previousBodyOverflowSetting is already set, don't set it again.
  if (previousBodyOverflowSetting === undefined) {
    previousBodyOverflowSetting = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
};

var restoreOverflowSetting = function restoreOverflowSetting() {
  if (previousBodyPaddingRight !== undefined) {
    document.body.style.paddingRight = previousBodyPaddingRight;

    // Restore previousBodyPaddingRight to undefined so setOverflowHidden knows it
    // can be set again.
    previousBodyPaddingRight = undefined;
  }

  if (previousBodyOverflowSetting !== undefined) {
    document.body.style.overflow = previousBodyOverflowSetting;

    // Restore previousBodyOverflowSetting to undefined
    // so setOverflowHidden knows it can be set again.
    previousBodyOverflowSetting = undefined;
  }
};

// https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#Problems_and_solutions
var isTargetElementTotallyScrolled = function isTargetElementTotallyScrolled(targetElement) {
  return targetElement ? targetElement.scrollHeight - targetElement.scrollTop <= targetElement.clientHeight : false;
};

var handleScroll = function handleScroll(event, targetElement) {
  var clientY = event.targetTouches[0].clientY - initialClientY;

  if (allowTouchMove(event.target)) {
    return false;
  }

  if (targetElement && targetElement.scrollTop === 0 && clientY > 0) {
    // element is at the top of its scroll.
    return preventDefault(event);
  }

  if (isTargetElementTotallyScrolled(targetElement) && clientY < 0) {
    // element is at the bottom of its scroll.
    return preventDefault(event);
  }

  event.stopPropagation();
  return true;
};

var disableBodyScroll = function disableBodyScroll(targetElement, options) {
  // targetElement must be provided
  if (!targetElement) {
    // eslint-disable-next-line no-console
    console.error('disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.');
    return;
  }

  // disableBodyScroll must not have been called on this targetElement before
  if (locks.some(function (lock) {
    return lock.targetElement === targetElement;
  })) {
    return;
  }

  var lock = {
    targetElement: targetElement,
    options: options || {}
  };

  locks = [].concat(_toConsumableArray(locks), [lock]);

  if (isIosDevice) {
    targetElement.ontouchstart = function (event) {
      if (event.targetTouches.length === 1) {
        // detect single touch.
        initialClientY = event.targetTouches[0].clientY;
      }
    };
    targetElement.ontouchmove = function (event) {
      if (event.targetTouches.length === 1) {
        // detect single touch.
        handleScroll(event, targetElement);
      }
    };

    if (!documentListenerAdded) {
      document.addEventListener('touchmove', preventDefault, hasPassiveEvents ? { passive: false } : undefined);
      documentListenerAdded = true;
    }
  } else {
    setOverflowHidden(options);
  }
};

var clearAllBodyScrollLocks = function clearAllBodyScrollLocks() {
  if (isIosDevice) {
    // Clear all locks ontouchstart/ontouchmove handlers, and the references.
    locks.forEach(function (lock) {
      lock.targetElement.ontouchstart = null;
      lock.targetElement.ontouchmove = null;
    });

    if (documentListenerAdded) {
      document.removeEventListener('touchmove', preventDefault, hasPassiveEvents ? { passive: false } : undefined);
      documentListenerAdded = false;
    }

    // Reset initial clientY.
    initialClientY = -1;
  } else {
    restoreOverflowSetting();
  }

  locks = [];
};

var enableBodyScroll = function enableBodyScroll(targetElement) {
  if (!targetElement) {
    // eslint-disable-next-line no-console
    console.error('enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.');
    return;
  }

  locks = locks.filter(function (lock) {
    return lock.targetElement !== targetElement;
  });

  if (isIosDevice) {
    targetElement.ontouchstart = null;
    targetElement.ontouchmove = null;

    if (documentListenerAdded && locks.length === 0) {
      document.removeEventListener('touchmove', preventDefault, hasPassiveEvents ? { passive: false } : undefined);
      documentListenerAdded = false;
    }
  } else if (!locks.length) {
    restoreOverflowSetting();
  }
};

var _a;
const isTest = (_a = document
  .querySelector('streamline-container')) === null || _a === void 0 ? void 0 : _a.hasAttribute('test');
const { state, dispose, onChange } = createStore({
  class: {
    tag: 'px-2.5 py-1.5 bg-slate-200 text-slate-500 inline-block h-[max-content] leading-1',
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
  entriesPostIsQuery: false,
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
              label: 'Enabling the overlay blur can decrease performance on slower machines',
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
  entriesSiteIsQuery: false,
  historySearchesSite: JSON.parse(
  // @ts-ignore
  window.streamlineData.historySearchesSite).reverse(),
  historySearchesPost: JSON.parse(
  // @ts-ignore
  window.streamlineData.historySearchesPost).reverse(),
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
  state.entriesSettingsHaveChanged = !es6(value, state.entriesSettingsLoad);
});
onChange('entriesSettingsLoad', (value) => {
  state.entriesSettingsHaveChanged = !es6(value, state.entriesSettingsSave);
});
onChange('searchValue', (value) => {
  if (value === '') {
    state.focusIndex = -1;
  }
});
onChange('visible', (value) => {
  var _a, _b, _c, _d;
  const el = (_d = (_c = (_b = (_a = document === null || document === void 0 ? void 0 : document.querySelector('streamline-container')) === null || _a === void 0 ? void 0 : _a.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector('streamline-entries')) === null || _c === void 0 ? void 0 : _c.shadowRoot) === null || _d === void 0 ? void 0 : _d.querySelector('div > div');
  if (el) {
    if (value === true) {
      disableBodyScroll(el, {
        reserveScrollBarGap: true,
      });
    }
    else {
      clearAllBodyScrollLocks();
    }
  }
  if (value === true) {
    setTimeout(() => {
      focusSearch();
    }, 20);
    setTimeout(() => {
      focusSearch();
    }, 50);
    setTimeout(() => {
      focusSearch();
    }, 100);
  }
});

export { createStore as c, focusSearch as f, onChange as o, state as s };
