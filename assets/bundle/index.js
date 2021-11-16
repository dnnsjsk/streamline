import { getRenderingRef, forceUpdate, h, Host, proxyCustomElement } from '@stencil/core/internal/client';
export { setAssetPath, setPlatformOptions } from '@stencil/core/internal/client';

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

const appendToMap = (map, propName, value) => {
    const items = map.get(propName);
    if (!items) {
        map.set(propName, [value]);
    }
    else if (!items.includes(value)) {
        items.push(value);
    }
};
const debounce$2 = (fn, ms) => {
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
const cleanupElements = debounce$2((map) => {
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
  var _a, _b, _c, _d, _e, _f;
  if (!isMobile()) {
    (_f = (_e = (_d = (_c = (_b = (_a = document === null || document === void 0 ? void 0 : document.querySelector('streamline-container')) === null || _a === void 0 ? void 0 : _a.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector('streamline-box')) === null || _c === void 0 ? void 0 : _c.shadowRoot) === null || _d === void 0 ? void 0 : _d.querySelector('streamline-search')) === null || _e === void 0 ? void 0 : _e.shadowRoot) === null || _f === void 0 ? void 0 : _f.querySelector('input').focus();
  }
}

var _a;
const isTest = (_a = document
    .querySelector("streamline-container")) === null || _a === void 0 ? void 0 : _a.hasAttribute("test");
const { state: state$1, dispose: dispose$1, onChange: onChange$1 } = createStore({
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
                        {
                            id: "searchFocus",
                            name: "Always focus",
                            nameParent: "Searchbar",
                            label: "Focus searchbar after switching tabs",
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
onChange$1("visible", (value) => {
    if (value === true) {
        setTimeout(() => {
            focusSearch();
        }, 20);
    }
});
onChange$1("entriesSettingsSave", (value) => {
    state$1.entriesSettingsHaveChanged = !es6(value, state$1.entriesSettingsLoad);
});
onChange$1("entriesSettingsLoad", (value) => {
    state$1.entriesSettingsHaveChanged = !es6(value, state$1.entriesSettingsSave);
});

const e=(t,e)=>{try{return JSON.parse(t.getItem(e))}catch(t){return null}},r=(r,s,n,o=!1)=>{var i;const l=createStore(null!=(i=e(r,s))?i:n),a=(t=>{let e=!1;return ()=>{e||(e=!0,setTimeout(()=>{t(),e=!1;},0));}})(()=>r.setItem(s,JSON.stringify(l.state)));return a(),o&&window.addEventListener("storage",()=>{const t=e(r,s);if(null!==t)for(const e in t)l.set(e,t[e]);}),l.use({set:a,reset:a}),l},s=(t,e,s=!1)=>r(localStorage,t,e,s);

function isLocalCommands() {
  var _a;
  let index = 0;
  Object.values(state$1.commands.local).forEach((item) => {
    if (item.condition !== false) {
      index++;
    }
  });
  return (((_a = state$1.menu[state.active].commands) === null || _a === void 0 ? void 0 : _a.length) >= 1 && index >= 1);
}

function setSearchPlaceholder() {
  const commands = isLocalCommands()
    ? " or type '/' for available commands"
    : '';
  state$1.searchPlaceholder =
    state.active === 'post'
      ? `${state$1.test
        ? 'Filter entries'
        : Object.values(state$1.entriesPost).length >= 1
          ? 'Search for a post or filter entries'
          : 'Search for a post'}${commands}`
      : state.active === 'settings'
        ? 'Search settings'
        : `Search entries${commands}`;
}

function resetView() {
  state$1.isSites = false;
  state$1.isLoading = false;
  state$1.isSlash = false;
  state$1.isEnter = false;
  if (state$1.entriesSettingsLoad.searchResetInput.default) {
    state$1.searchValue = '';
  }
  setEntries();
  if (state$1.entriesSettingsLoad.searchFocus.default) {
    focusSearch();
  }
}

const { state, dispose, onChange } = s("streamline", {
    active: "menu",
});
onChange("active", () => {
    resetView();
    setSearchPlaceholder();
});

var deps$9 = {};

function getCondense(_) {
  function condense(arr) {
    var indexes = [];
    for (var i = 0; i < arr.length; i++) {
      if (!(i in arr)) {
        indexes.push(i);
      }
    }
    var length = indexes.length;

    while (length--) {
      arr.splice(indexes[length], 1);
    }
    return arr;
  }
  return condense;
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Built-in value references. */
var Symbol = root.Symbol;

/** Used for built-in method references. */
var objectProto$h = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$e = objectProto$h.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$h.toString;

/** Built-in value references. */
var symToStringTag$1 = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty$e.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$g = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto$g.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject$1(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag$2 = '[object Function]',
    genTag$1 = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject$1(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
}

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/** Used for built-in method references. */
var funcProto$2 = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$2 = funcProto$2.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString$2.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto$1 = Function.prototype,
    objectProto$f = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$d = objectProto$f.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString$1.call(hasOwnProperty$d).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject$1(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/* Built-in method references that are verified to be native. */
var Map$1 = getNative(root, 'Map');

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto$e = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$c = objectProto$e.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED$2 ? undefined : result;
  }
  return hasOwnProperty$c.call(data, key) ? data[key] : undefined;
}

/** Used for built-in method references. */
var objectProto$d = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$b = objectProto$d.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty$b.call(data, key);
}

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
  return this;
}

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map$1 || ListCache),
    'string': new Hash
  };
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map$1 || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignMergeValue(object, key, value) {
  if ((value !== undefined && !eq(object[key], value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

/** Detect free variable `exports`. */
var freeExports$2 = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule$2 = freeExports$2 && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;

/** Built-in value references. */
var Buffer$1 = moduleExports$2 ? root.Buffer : undefined,
    allocUnsafe = Buffer$1 ? Buffer$1.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject$1(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

/** Used for built-in method references. */
var objectProto$c = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$c;

  return value === proto;
}

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/** `Object#toString` result references. */
var argsTag$3 = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag$3;
}

/** Used for built-in method references. */
var objectProto$b = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$a = objectProto$b.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable$1 = objectProto$b.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty$a.call(value, 'callee') &&
    !propertyIsEnumerable$1.call(value, 'callee');
};

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER$1 = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
}

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

/** Detect free variable `exports`. */
var freeExports$1 = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule$1 = freeExports$1 && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;

/** Built-in value references. */
var Buffer = moduleExports$1 ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/** `Object#toString` result references. */
var objectTag$4 = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto$a = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$9 = objectProto$a.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag$4) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty$9.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

/** `Object#toString` result references. */
var argsTag$2 = '[object Arguments]',
    arrayTag$2 = '[object Array]',
    boolTag$3 = '[object Boolean]',
    dateTag$3 = '[object Date]',
    errorTag$2 = '[object Error]',
    funcTag$1 = '[object Function]',
    mapTag$6 = '[object Map]',
    numberTag$3 = '[object Number]',
    objectTag$3 = '[object Object]',
    regexpTag$3 = '[object RegExp]',
    setTag$6 = '[object Set]',
    stringTag$4 = '[object String]',
    weakMapTag$2 = '[object WeakMap]';

var arrayBufferTag$3 = '[object ArrayBuffer]',
    dataViewTag$4 = '[object DataView]',
    float32Tag$2 = '[object Float32Array]',
    float64Tag$2 = '[object Float64Array]',
    int8Tag$2 = '[object Int8Array]',
    int16Tag$2 = '[object Int16Array]',
    int32Tag$2 = '[object Int32Array]',
    uint8Tag$2 = '[object Uint8Array]',
    uint8ClampedTag$2 = '[object Uint8ClampedArray]',
    uint16Tag$2 = '[object Uint16Array]',
    uint32Tag$2 = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] =
typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] =
typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] =
typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] =
typedArrayTags[uint32Tag$2] = true;
typedArrayTags[argsTag$2] = typedArrayTags[arrayTag$2] =
typedArrayTags[arrayBufferTag$3] = typedArrayTags[boolTag$3] =
typedArrayTags[dataViewTag$4] = typedArrayTags[dateTag$3] =
typedArrayTags[errorTag$2] = typedArrayTags[funcTag$1] =
typedArrayTags[mapTag$6] = typedArrayTags[numberTag$3] =
typedArrayTags[objectTag$3] = typedArrayTags[regexpTag$3] =
typedArrayTags[setTag$6] = typedArrayTags[stringTag$4] =
typedArrayTags[weakMapTag$2] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/**
 * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function safeGet(object, key) {
  if (key === 'constructor' && typeof object[key] === 'function') {
    return;
  }

  if (key == '__proto__') {
    return;
  }

  return object[key];
}

/** Used for built-in method references. */
var objectProto$9 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$8 = objectProto$9.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$8.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

/** Used for built-in method references. */
var objectProto$8 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$7 = objectProto$8.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty$7.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$7 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$6 = objectProto$7.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject$1(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty$6.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

/**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject(value) {
  return copyObject(value, keysIn(value));
}

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = safeGet(object, key),
      srcValue = safeGet(source, key),
      stacked = stack.get(srcValue);

  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }
  var newValue = customizer
    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
    : undefined;

  var isCommon = newValue === undefined;

  if (isCommon) {
    var isArr = isArray(srcValue),
        isBuff = !isArr && isBuffer(srcValue),
        isTyped = !isArr && !isBuff && isTypedArray(srcValue);

    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray(objValue)) {
        newValue = objValue;
      }
      else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      }
      else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer(srcValue, true);
      }
      else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray(srcValue, true);
      }
      else {
        newValue = [];
      }
    }
    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      newValue = objValue;
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      }
      else if (!isObject$1(objValue) || isFunction(objValue)) {
        newValue = initCloneObject(srcValue);
      }
    }
    else {
      isCommon = false;
    }
  }
  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack['delete'](srcValue);
  }
  assignMergeValue(object, key, newValue);
}

/**
 * The base implementation of `_.merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  baseFor(source, function(srcValue, key) {
    stack || (stack = new Stack);
    if (isObject$1(srcValue)) {
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    }
    else {
      var newValue = customizer
        ? customizer(safeGet(object, key), srcValue, (key + ''), object, source, stack)
        : undefined;

      if (newValue === undefined) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  }, keysIn);
}

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject$1(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

/**
 * This method is like `_.assign` except that it recursively merges own and
 * inherited enumerable string keyed properties of source objects into the
 * destination object. Source properties that resolve to `undefined` are
 * skipped if a destination value exists. Array and plain object properties
 * are merged recursively. Other objects and value types are overridden by
 * assignment. Source objects are applied from left to right. Subsequent
 * sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 0.5.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = {
 *   'a': [{ 'b': 2 }, { 'd': 4 }]
 * };
 *
 * var other = {
 *   'a': [{ 'c': 3 }, { 'e': 5 }]
 * };
 *
 * _.merge(object, other);
 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
 */
var merge = createAssigner(function(object, source, srcIndex) {
  baseMerge(object, source, srcIndex);
});

function forArray(arr, iteratee) {
  for (var i = 0; i < arr.length; i++) {
    if (iteratee(arr[i], i, arr) === false) break;
  }
  return arr;
}

/** `Object#toString` result references. */
var stringTag$3 = '[object String]';

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' ||
    (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag$3);
}

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

/** `Object#toString` result references. */
var symbolTag$3 = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag$3);
}

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = MapCache;

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

/** Used as references for various `Number` constants. */
var INFINITY$2 = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY$2) ? '-0' : result;
}

/** Used as references for various `Number` constants. */
var INFINITY$1 = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto$2 = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto$2 ? symbolProto$2.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY$1) ? '-0' : result;
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Converts `value` to a property path array.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Util
 * @param {*} value The value to convert.
 * @returns {Array} Returns the new property path array.
 * @example
 *
 * _.toPath('a.b.c');
 * // => ['a', 'b', 'c']
 *
 * _.toPath('a[0].b.c');
 * // => ['a', '0', 'b', 'c']
 */
function toPath(value) {
  if (isArray(value)) {
    return arrayMap(value, toKey);
  }
  return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));
}

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

/** Used for built-in method references. */
var objectProto$6 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$5 = objectProto$6.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$5.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

/* Built-in method references that are verified to be native. */
var Promise$1 = getNative(root, 'Promise');

/* Built-in method references that are verified to be native. */
var Set$1 = getNative(root, 'Set');

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

/** `Object#toString` result references. */
var mapTag$5 = '[object Map]',
    objectTag$2 = '[object Object]',
    promiseTag = '[object Promise]',
    setTag$5 = '[object Set]',
    weakMapTag$1 = '[object WeakMap]';

var dataViewTag$3 = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map$1),
    promiseCtorString = toSource(Promise$1),
    setCtorString = toSource(Set$1),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag$3) ||
    (Map$1 && getTag(new Map$1) != mapTag$5) ||
    (Promise$1 && getTag(Promise$1.resolve()) != promiseTag) ||
    (Set$1 && getTag(new Set$1) != setTag$5) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag$1)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag$2 ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag$3;
        case mapCtorString: return mapTag$5;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag$5;
        case weakMapCtorString: return weakMapTag$1;
      }
    }
    return result;
  };
}

const getTag$1 = getTag;

/** `Object#toString` result references. */
var mapTag$4 = '[object Map]',
    setTag$4 = '[object Set]';

/** Used for built-in method references. */
var objectProto$5 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$4 = objectProto$5.hasOwnProperty;

/**
 * Checks if `value` is an empty object, collection, map, or set.
 *
 * Objects are considered empty if they have no own enumerable string keyed
 * properties.
 *
 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
 * jQuery-like collections are considered empty if they have a `length` of `0`.
 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * _.isEmpty(null);
 * // => true
 *
 * _.isEmpty(true);
 * // => true
 *
 * _.isEmpty(1);
 * // => true
 *
 * _.isEmpty([1, 2, 3]);
 * // => false
 *
 * _.isEmpty({ 'a': 1 });
 * // => false
 */
function isEmpty(value) {
  if (value == null) {
    return true;
  }
  if (isArrayLike(value) &&
      (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' ||
        isBuffer(value) || isTypedArray(value) || isArguments(value))) {
    return !value.length;
  }
  var tag = getTag$1(value);
  if (tag == mapTag$4 || tag == setTag$4) {
    return !value.size;
  }
  if (isPrototype(value)) {
    return !baseKeys(value).length;
  }
  for (var key in value) {
    if (hasOwnProperty$4.call(value, key)) {
      return false;
    }
  }
  return true;
}

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array == null ? 0 : array.length;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
var baseEach = createBaseEach(baseForOwn);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$5 = 1,
    COMPARE_UNORDERED_FLAG$3 = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$5,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Check that cyclic values are equal.
  var arrStacked = stack.get(array);
  var othStacked = stack.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG$3) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$4 = 1,
    COMPARE_UNORDERED_FLAG$2 = 2;

/** `Object#toString` result references. */
var boolTag$2 = '[object Boolean]',
    dateTag$2 = '[object Date]',
    errorTag$1 = '[object Error]',
    mapTag$3 = '[object Map]',
    numberTag$2 = '[object Number]',
    regexpTag$2 = '[object RegExp]',
    setTag$3 = '[object Set]',
    stringTag$2 = '[object String]',
    symbolTag$2 = '[object Symbol]';

var arrayBufferTag$2 = '[object ArrayBuffer]',
    dataViewTag$2 = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto$1 = Symbol ? Symbol.prototype : undefined,
    symbolValueOf$1 = symbolProto$1 ? symbolProto$1.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag$2:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag$2:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag$2:
    case dateTag$2:
    case numberTag$2:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag$1:
      return object.name == other.name && object.message == other.message;

    case regexpTag$2:
    case stringTag$2:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag$3:
      var convert = mapToArray;

    case setTag$3:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$4;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG$2;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag$2:
      if (symbolValueOf$1) {
        return symbolValueOf$1.call(object) == symbolValueOf$1.call(other);
      }
  }
  return false;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

/** Used for built-in method references. */
var objectProto$4 = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto$4.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols$1 = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols$1 ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols$1(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$3 = 1;

/** Used for built-in method references. */
var objectProto$3 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$3.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty$3.call(other, key))) {
      return false;
    }
  }
  // Check that cyclic values are equal.
  var objStacked = stack.get(object);
  var othStacked = stack.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$2 = 1;

/** `Object#toString` result references. */
var argsTag$1 = '[object Arguments]',
    arrayTag$1 = '[object Array]',
    objectTag$1 = '[object Object]';

/** Used for built-in method references. */
var objectProto$2 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$2.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag$1 : getTag$1(object),
      othTag = othIsArr ? arrayTag$1 : getTag$1(other);

  objTag = objTag == argsTag$1 ? objectTag$1 : objTag;
  othTag = othTag == argsTag$1 ? objectTag$1 : othTag;

  var objIsObj = objTag == objectTag$1,
      othIsObj = othTag == objectTag$1,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG$2)) {
    var objIsWrapped = objIsObj && hasOwnProperty$2.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty$2.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$1 = 1,
    COMPARE_UNORDERED_FLAG$1 = 2;

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack;
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined
            ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$1 | COMPARE_UNORDERED_FLAG$1, customizer, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject$1(value);
}

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = keys(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];

    result[length] = [key, value, isStrictComparable(value)];
  }
  return result;
}

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)));
  };
}

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && isIndex(key, length) &&
    (isArray(object) || isArguments(object));
}

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
  };
}

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return baseGet(object, path);
  };
}

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity;
  }
  if (typeof value == 'object') {
    return isArray(value)
      ? baseMatchesProperty(value[0], value[1])
      : baseMatches(value);
  }
  return property(value);
}

/**
 * The base implementation of `_.reduce` and `_.reduceRight`, without support
 * for iteratee shorthands, which iterates over `collection` using `eachFunc`.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} accumulator The initial value.
 * @param {boolean} initAccum Specify using the first or last element of
 *  `collection` as the initial value.
 * @param {Function} eachFunc The function to iterate over `collection`.
 * @returns {*} Returns the accumulated value.
 */
function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
  eachFunc(collection, function(value, index, collection) {
    accumulator = initAccum
      ? (initAccum = false, value)
      : iteratee(accumulator, value, index, collection);
  });
  return accumulator;
}

/**
 * Reduces `collection` to a value which is the accumulated result of running
 * each element in `collection` thru `iteratee`, where each successive
 * invocation is supplied the return value of the previous. If `accumulator`
 * is not given, the first element of `collection` is used as the initial
 * value. The iteratee is invoked with four arguments:
 * (accumulator, value, index|key, collection).
 *
 * Many lodash methods are guarded to work as iteratees for methods like
 * `_.reduce`, `_.reduceRight`, and `_.transform`.
 *
 * The guarded methods are:
 * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
 * and `sortBy`
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @returns {*} Returns the accumulated value.
 * @see _.reduceRight
 * @example
 *
 * _.reduce([1, 2], function(sum, n) {
 *   return sum + n;
 * }, 0);
 * // => 3
 *
 * _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
 *   (result[value] || (result[value] = [])).push(key);
 *   return result;
 * }, {});
 * // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
 */
function reduce(collection, iteratee, accumulator) {
  var func = isArray(collection) ? arrayReduce : baseReduce,
      initAccum = arguments.length < 3;

  return func(collection, baseIteratee(iteratee), accumulator, initAccum, baseEach);
}

var deps$8 = {
  isString: isString,
  reduce: reduce,
};

var deps$7 = merge(
  {
    isObject: isObject$1,
    isEmpty: isEmpty,
    get: get,
  },
  deps$8
  // hasChildrenDeps
);

var deps$6 = merge(
  {
    identity: identity,
    merge: merge,
    isString: isString,
    toPath: toPath,
  },
  deps$7
);

var deps$5 = merge(
  {
    merge: merge,
    forArray: forArray,
  },
  deps$9,
  deps$6
);

var rxArrIndex = /\D/;
var rxVarName$1 = /^[a-zA-Z_$]+([\w_$]*)$/;
var rxQuot$1 = /"/g;

function joinPaths(...paths) {
  return paths.reduce(
    (acc, p) =>
      acc ? (!p || p.startsWith('[') ? `${acc}${p}` : `${acc}.${p}`) : p,
    ''
  );
}

function getPathToString(_) {
  function pathToString(path, ...prefixes) {
    prefixes = prefixes.filter((p) => p !== undefined);
    if (_.isString(path)) return joinPaths(...prefixes, path);
    if (!Array.isArray(path)) return undefined;
    prefixes = joinPaths(...prefixes);
    return path.reduce((acc, value) => {
      const type = typeof value;
      if (type === 'number') {
        if (value < 0 || value % 1 !== 0) {
          return `${acc}["${value}"]`;
        } else {
          return `${acc}[${value}]`;
        }
      } else if (type !== 'string') {
        return `${acc}["${value}"]`;
      } else if (!value) {
        return `${acc}[""]`;
      }
      if (!rxArrIndex.test(value)) {
        return `${acc}[${value}]`;
      }
      if (rxVarName$1.test(value)) {
        if (acc) {
          return `${acc}.${value}`;
        } else {
          return `${acc}${value}`;
        }
      }
      return `${acc}["${value.replace(rxQuot$1, '\\"')}"]`;
    }, prefixes);
  }
  return pathToString;
}

getPathToString.notChainable = true;

function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var rxVarName = /^[a-zA-Z_$]+([\w_$]*)$/;
var rxQuot = /"/g;
const has$1 = Object.prototype.hasOwnProperty;

function getIterate(_) {
  const pathToString = getPathToString(_);

  function iterate(item) {
    const { options, obj, callback } = item;
    options.pathFormatArray = options.pathFormat == 'array';
    item.depth = 0;

    let broken = false;
    const breakIt = () => {
      broken = true;
      return false;
    };

    while (item) {
      if (broken) break;
      if (!item.inited) {
        item.inited = true;
        item.info = describeValue(item.value, options.ownPropertiesOnly);

        if (options.checkCircular) {
          item.circularParentIndex = -1;
          item.circularParent = null;
          item.isCircular = false;
          if (item.info.isObject && !item.info.isEmpty) {
            let parent = item.parent;
            while (parent) {
              if (parent.value === item.value) {
                item.isCircular = true;
                item.circularParent = parent;
                item.circularParentIndex = item.depth - parent.depth - 1;
                break;
              }
              parent = parent.parent;
            }
          }
        }

        item.children = [];
        if (options.childrenPath) {
          options.childrenPath.forEach((cp, i) => {
            const children = _.get(item.value, cp);
            const info = describeValue(children, options.ownPropertiesOnly);
            if (!info.isEmpty) {
              item.children.push([
                cp,
                options.strChildrenPath[i],
                children,
                info,
              ]);
            }
          });
        }

        item.isLeaf =
          item.isCircular ||
          (options.childrenPath !== undefined && !item.children.length) ||
          !item.info.isObject ||
          item.info.isEmpty;

        item.needCallback =
          (item.depth || options.includeRoot) &&
          (!options.leavesOnly || item.isLeaf);

        if (item.needCallback) {
          const contextReader = new ContextReader(obj, options, breakIt);
          contextReader.setItem(item, false);
          try {
            item.res = callback(
              item.value,
              item.key,
              item.parent && item.parent.value,
              contextReader
            );
          } catch (err) {
            if (err.message) {
              err.message +=
                '\ncallback failed before deep iterate at:\n' +
                pathToString(item.path);
            }

            throw err;
          }
        }

        if (broken) {
          break;
        }

        if (item.res !== false) {
          if (!broken && !item.isCircular && item.info.isObject) {
            if (
              options.childrenPath !== undefined &&
              (item.depth || !options.rootIsChildren)
            ) {
              item.childrenItems = [];
              if (item.children.length) {
                item.children.forEach(([cp, scp, children, info]) => {
                  item.childrenItems = [
                    ...item.childrenItems,
                    ...(info.isArray
                      ? getElements(item, children, options, cp, scp)
                      : getOwnChildren(item, children, options, cp, scp)),
                  ];
                });
              }
            } else {
              item.childrenItems = item.info.isArray
                ? getElements(item, item.value, options, [], '')
                : getOwnChildren(item, item.value, options, [], '');
            }
          }
        }

        item.currentChildIndex = -1;
      }
      if (
        item.childrenItems &&
        item.currentChildIndex < item.childrenItems.length - 1
      ) {
        item.currentChildIndex++;
        item.childrenItems[item.currentChildIndex].parentItem = item;
        item = item.childrenItems[item.currentChildIndex];
        continue;
      }

      if (item.needCallback && options.callbackAfterIterate) {
        const contextReader = new ContextReader(obj, options, breakIt);
        contextReader.setItem(item, true);

        try {
          callback(
            item.value,
            item.key,
            item.parent && item.parent.value,
            contextReader
          );
        } catch (err) {
          if (err.message) {
            err.message +=
              '\ncallback failed after deep iterate at:\n' +
              pathToString(item.path);
          }

          throw err;
        }
      }
      item = item.parentItem;
    }
  }

  return iterate;

  function getElements(item, children, options, childrenPath, strChildrenPath) {
    let strChildPathPrefix;
    if (!options.pathFormatArray) {
      strChildPathPrefix = item.strPath || '';

      if (
        strChildrenPath &&
        strChildPathPrefix &&
        !strChildrenPath.startsWith('[')
      ) {
        strChildPathPrefix += '.';
      }
      strChildPathPrefix += strChildrenPath || '';
    }
    const res = [];
    for (var i = 0; i < children.length; i++) {
      const val = children[i];
      if (val === undefined && !(i in children)) {
        continue;
      }
      let strChildPath;
      const pathFormatString = !options.pathFormatArray;
      if (pathFormatString) {
        strChildPath = `${strChildPathPrefix}[${i}]`;
      }
      res.push({
        value: val,
        key: i + '',
        path: [...(item.path || []), ...childrenPath, i + ''],
        strPath: strChildPath,
        depth: item.depth + 1,
        parent: {
          value: item.value,
          key: item.key,
          path: pathFormatString ? item.strPath : item.path,
          parent: item.parent,
          depth: item.depth,
          info: item.info,
        },
        childrenPath: (childrenPath.length && childrenPath) || undefined,
        strChildrenPath: strChildrenPath || undefined,
      });
    }
    return res;
  }

  function getOwnChildren(
    item,
    children,
    options,
    childrenPath,
    strChildrenPath
  ) {
    let strChildPathPrefix;
    if (!options.pathFormatArray) {
      strChildPathPrefix = item.strPath || '';

      if (
        strChildrenPath &&
        strChildPathPrefix &&
        !strChildrenPath.startsWith('[')
      ) {
        strChildPathPrefix += '.';
      }
      strChildPathPrefix += strChildrenPath || '';
    }
    const res = [];
    const pathFormatString = !options.pathFormatArray;
    for (var childKey in children) {
      if (options.ownPropertiesOnly && !has$1.call(children, childKey)) {
        continue;
      }

      let strChildPath;
      if (pathFormatString) {
        if (rxVarName.test(childKey)) {
          if (strChildPathPrefix) {
            strChildPath = `${strChildPathPrefix}.${childKey}`;
          } else {
            strChildPath = `${childKey}`;
          }
        } else {
          strChildPath = `${strChildPathPrefix}["${childKey.replace(
            rxQuot,
            '\\"'
          )}"]`;
        }
      }

      res.push({
        value: children[childKey],
        key: childKey,
        path: [...(item.path || []), ...childrenPath, childKey],
        strPath: strChildPath,
        depth: item.depth + 1,
        parent: {
          value: item.value,
          key: item.key,
          path: pathFormatString ? item.strPath : item.path,
          parent: item.parent,
          depth: item.depth,
          info: item.info,
        },
        childrenPath: (childrenPath.length && childrenPath) || undefined,
        strChildrenPath: strChildrenPath || undefined,
      });
    }

    return res;
  }
}

class ContextReader {
  constructor(obj, options, breakIt) {
    this.obj = obj;
    this._options = options;
    this['break'] = breakIt;
  }
  setItem(item, afterIterate) {
    this._item = item;
    this.afterIterate = afterIterate;
  }
  get path() {
    return this._options.pathFormatArray ? this._item.path : this._item.strPath;
  }

  get parent() {
    return this._item.parent;
  }

  get parents() {
    if (!this._item._parents) {
      this._item._parents = [];
      let curParent = this._item.parent;
      while (curParent) {
        this._item._parents[curParent.depth] = curParent;
        curParent = curParent.parent;
      }
    }
    return this._item._parents;
  }
  get depth() {
    return this._item.depth;
  }

  get isLeaf() {
    return this._item.isLeaf;
  }

  get isCircular() {
    return this._item.isCircular;
  }

  get circularParentIndex() {
    return this._item.circularParentIndex;
  }

  get circularParent() {
    return this._item.circularParent;
  }

  get childrenPath() {
    return (
      (this._options.childrenPath !== undefined &&
        (this._options.pathFormatArray
          ? this._item.childrenPath
          : this._item.strChildrenPath)) ||
      undefined
    );
  }

  get info() {
    return this._item.info;
  }
}

function isObjectEmpty(value, ownPropertiesOnly) {
  for (var key in value) {
    if (!ownPropertiesOnly || has$1.call(value, key)) {
      return false;
    }
  }
  return true;
}

function describeValue(value, ownPropertiesOnly) {
  const res = { isObject: isObject(value) };
  res.isArray = res.isObject && Array.isArray(value);
  res.isEmpty = res.isArray
    ? !value.length
    : res.isObject
    ? isObjectEmpty(value, ownPropertiesOnly)
    : true;

  return res;
}

function getEachDeep(_) {
  var iterate = getIterate(_);

  function eachDeep(obj, callback, options) {
    if (callback === undefined) callback = _.identity;
    options = _.merge(
      {
        includeRoot: !Array.isArray(obj),
        pathFormat: 'string',
        checkCircular: false,
        leavesOnly: false,
        ownPropertiesOnly: true, //
      },
      options || {}
    );
    if (options.childrenPath !== undefined) {
      if (!options.includeRoot && options.rootIsChildren === undefined) {
        options.rootIsChildren = Array.isArray(obj);
      }
      if (
        !_.isString(options.childrenPath) &&
        !Array.isArray(options.childrenPath)
      ) {
        throw Error('childrenPath can be string or array');
      } else {
        if (_.isString(options.childrenPath)) {
          options.childrenPath = [options.childrenPath];
        }
        options.strChildrenPath = options.childrenPath;
        options.childrenPath = [];
        for (var i = options.strChildrenPath.length - 1; i >= 0; i--) {
          options.childrenPath[i] = _.toPath(options.strChildrenPath[i]);
        }
      }
    }
    iterate({
      value: obj,
      callback,
      options,
      obj,
    });
    return obj;
  }
  return eachDeep;
}

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

/**
 * The base implementation of `_.assignIn` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssignIn(object, source) {
  return object && copyObject(source, keysIn(source), object);
}

/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols(object));
    object = getPrototype(object);
  }
  return result;
};

/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbolsIn(source, object) {
  return copyObject(source, getSymbolsIn(source), object);
}

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn);
}

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = new array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty$1.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

/** `Object#toString` result references. */
var boolTag$1 = '[object Boolean]',
    dateTag$1 = '[object Date]',
    mapTag$2 = '[object Map]',
    numberTag$1 = '[object Number]',
    regexpTag$1 = '[object RegExp]',
    setTag$2 = '[object Set]',
    stringTag$1 = '[object String]',
    symbolTag$1 = '[object Symbol]';

var arrayBufferTag$1 = '[object ArrayBuffer]',
    dataViewTag$1 = '[object DataView]',
    float32Tag$1 = '[object Float32Array]',
    float64Tag$1 = '[object Float64Array]',
    int8Tag$1 = '[object Int8Array]',
    int16Tag$1 = '[object Int16Array]',
    int32Tag$1 = '[object Int32Array]',
    uint8Tag$1 = '[object Uint8Array]',
    uint8ClampedTag$1 = '[object Uint8ClampedArray]',
    uint16Tag$1 = '[object Uint16Array]',
    uint32Tag$1 = '[object Uint32Array]';

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag$1:
      return cloneArrayBuffer(object);

    case boolTag$1:
    case dateTag$1:
      return new Ctor(+object);

    case dataViewTag$1:
      return cloneDataView(object, isDeep);

    case float32Tag$1: case float64Tag$1:
    case int8Tag$1: case int16Tag$1: case int32Tag$1:
    case uint8Tag$1: case uint8ClampedTag$1: case uint16Tag$1: case uint32Tag$1:
      return cloneTypedArray(object, isDeep);

    case mapTag$2:
      return new Ctor;

    case numberTag$1:
    case stringTag$1:
      return new Ctor(object);

    case regexpTag$1:
      return cloneRegExp(object);

    case setTag$2:
      return new Ctor;

    case symbolTag$1:
      return cloneSymbol(object);
  }
}

/** `Object#toString` result references. */
var mapTag$1 = '[object Map]';

/**
 * The base implementation of `_.isMap` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 */
function baseIsMap(value) {
  return isObjectLike(value) && getTag$1(value) == mapTag$1;
}

/* Node.js helper references. */
var nodeIsMap = nodeUtil && nodeUtil.isMap;

/**
 * Checks if `value` is classified as a `Map` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 * @example
 *
 * _.isMap(new Map);
 * // => true
 *
 * _.isMap(new WeakMap);
 * // => false
 */
var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;

/** `Object#toString` result references. */
var setTag$1 = '[object Set]';

/**
 * The base implementation of `_.isSet` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 */
function baseIsSet(value) {
  return isObjectLike(value) && getTag$1(value) == setTag$1;
}

/* Node.js helper references. */
var nodeIsSet = nodeUtil && nodeUtil.isSet;

/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 * @example
 *
 * _.isSet(new Set);
 * // => true
 *
 * _.isSet(new WeakSet);
 * // => false
 */
var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG$2 = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG$2 = 4;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result,
      isDeep = bitmask & CLONE_DEEP_FLAG$2,
      isFlat = bitmask & CLONE_FLAT_FLAG,
      isFull = bitmask & CLONE_SYMBOLS_FLAG$2;

  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject$1(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag$1(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      result = (isFlat || isFunc) ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat
          ? copySymbolsIn(value, baseAssignIn(result, value))
          : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (isSet(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap(value)) {
    value.forEach(function(subValue, key) {
      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
    });
  }

  var keysFunc = isFull
    ? (isFlat ? getAllKeysIn : getAllKeys)
    : (isFlat ? keysIn : keys);

  var props = isArr ? undefined : keysFunc(value);
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}

/** Used to compose bitmasks for cloning. */
var CLONE_SYMBOLS_FLAG$1 = 4;

/**
 * Creates a shallow clone of `value`.
 *
 * **Note:** This method is loosely based on the
 * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
 * and supports cloning arrays, array buffers, booleans, date objects, maps,
 * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
 * arrays. The own enumerable properties of `arguments` objects are cloned
 * as plain objects. An empty object is returned for uncloneable values such
 * as error objects, functions, DOM nodes, and WeakMaps.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to clone.
 * @returns {*} Returns the cloned value.
 * @see _.cloneDeep
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var shallow = _.clone(objects);
 * console.log(shallow[0] === objects[0]);
 * // => true
 */
function clone(value) {
  return baseClone(value, CLONE_SYMBOLS_FLAG$1);
}

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG$1 = 1,
    CLONE_SYMBOLS_FLAG = 4;

/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */
function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG$1 | CLONE_SYMBOLS_FLAG);
}

/**
 * Casts `value` to `identity` if it's not a function.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Function} Returns cast function.
 */
function castFunction(value) {
  return typeof value == 'function' ? value : identity;
}

/**
 * Iterates over elements of `collection` and invokes `iteratee` for each element.
 * The iteratee is invoked with three arguments: (value, index|key, collection).
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * **Note:** As with other "Collections" methods, objects with a "length"
 * property are iterated like arrays. To avoid this behavior use `_.forIn`
 * or `_.forOwn` for object iteration.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @alias each
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 * @see _.forEachRight
 * @example
 *
 * _.forEach([1, 2], function(value) {
 *   console.log(value);
 * });
 * // => Logs `1` then `2`.
 *
 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
 *   console.log(key);
 * });
 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
 */
function forEach(collection, iteratee) {
  var func = isArray(collection) ? arrayEach : baseEach;
  return func(collection, castFunction(iteratee));
}

/**
 * A specialized version of `_.forEachRight` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEachRight(array, iteratee) {
  var length = array == null ? 0 : array.length;

  while (length--) {
    if (iteratee(array[length], length, array) === false) {
      break;
    }
  }
  return array;
}

/**
 * This function is like `baseFor` except that it iterates over properties
 * in the opposite order.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseForRight = createBaseFor(true);

/**
 * The base implementation of `_.forOwnRight` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwnRight(object, iteratee) {
  return object && baseForRight(object, iteratee, keys);
}

/**
 * The base implementation of `_.forEachRight` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
var baseEachRight = createBaseEach(baseForOwnRight, true);

/**
 * This method is like `_.forEach` except that it iterates over elements of
 * `collection` from right to left.
 *
 * @static
 * @memberOf _
 * @since 2.0.0
 * @alias eachRight
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 * @see _.forEach
 * @example
 *
 * _.forEachRight([1, 2], function(value) {
 *   console.log(value);
 * });
 * // => Logs `2` then `1`.
 */
function forEachRight(collection, iteratee) {
  var func = isArray(collection) ? arrayEachRight : baseEachRight;
  return func(collection, castFunction(iteratee));
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.has` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHas(object, key) {
  return object != null && hasOwnProperty.call(object, key);
}

/**
 * Checks if `path` is a direct property of `object`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = { 'a': { 'b': 2 } };
 * var other = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.has(object, 'a');
 * // => true
 *
 * _.has(object, 'a.b');
 * // => true
 *
 * _.has(object, ['a', 'b']);
 * // => true
 *
 * _.has(other, 'a');
 * // => false
 */
function has(object, path) {
  return object != null && hasPath(object, path, baseHas);
}

/**
 * The base implementation of `_.set`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */
function baseSet(object, path, value, customizer) {
  if (!isObject$1(object)) {
    return object;
  }
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      lastIndex = length - 1,
      nested = object;

  while (nested != null && ++index < length) {
    var key = toKey(path[index]),
        newValue = value;

    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      return object;
    }

    if (index != lastIndex) {
      var objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : undefined;
      if (newValue === undefined) {
        newValue = isObject$1(objValue)
          ? objValue
          : (isIndex(path[index + 1]) ? [] : {});
      }
    }
    assignValue(nested, key, newValue);
    nested = nested[key];
  }
  return object;
}

/**
 * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
 * it's created. Arrays are created for missing index properties while objects
 * are created for all other missing properties. Use `_.setWith` to customize
 * `path` creation.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.set(object, 'a[0].b.c', 4);
 * console.log(object.a[0].b.c);
 * // => 4
 *
 * _.set(object, ['x', '0', 'y', 'z'], 5);
 * console.log(object.x[0].y.z);
 * // => 5
 */
function set(object, path, value) {
  return object == null ? object : baseSet(object, path, value);
}

/**
 * Gets the last element of `array`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * _.last([1, 2, 3]);
 * // => 3
 */
function last(array) {
  var length = array == null ? 0 : array.length;
  return length ? array[length - 1] : undefined;
}

/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

/**
 * Gets the parent value at `path` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} path The path to get the parent value of.
 * @returns {*} Returns the parent value.
 */
function parent(object, path) {
  return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
}

/**
 * The base implementation of `_.unset`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The property path to unset.
 * @returns {boolean} Returns `true` if the property is deleted, else `false`.
 */
function baseUnset(object, path) {
  path = castPath(path, object);
  object = parent(object, path);
  return object == null || delete object[toKey(last(path))];
}

/**
 * Removes the property at `path` of `object`.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to unset.
 * @returns {boolean} Returns `true` if the property is deleted, else `false`.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 7 } }] };
 * _.unset(object, 'a[0].b.c');
 * // => true
 *
 * console.log(object);
 * // => { 'a': [{ 'b': {} }] };
 *
 * _.unset(object, ['a', '0', 'b', 'c']);
 * // => true
 *
 * console.log(object);
 * // => { 'a': [{ 'b': {} }] };
 */
function unset(object, path) {
  return object == null ? true : baseUnset(object, path);
}

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1;

/**
 * Creates a function that invokes `func` with the arguments of the created
 * function. If `func` is a property name, the created function returns the
 * property value for a given element. If `func` is an array or object, the
 * created function returns `true` for elements that contain the equivalent
 * source properties, otherwise it returns `false`.
 *
 * @static
 * @since 4.0.0
 * @memberOf _
 * @category Util
 * @param {*} [func=_.identity] The value to convert to a callback.
 * @returns {Function} Returns the callback.
 * @example
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36, 'active': true },
 *   { 'user': 'fred',   'age': 40, 'active': false }
 * ];
 *
 * // The `_.matches` iteratee shorthand.
 * _.filter(users, _.iteratee({ 'user': 'barney', 'active': true }));
 * // => [{ 'user': 'barney', 'age': 36, 'active': true }]
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.filter(users, _.iteratee(['user', 'fred']));
 * // => [{ 'user': 'fred', 'age': 40 }]
 *
 * // The `_.property` iteratee shorthand.
 * _.map(users, _.iteratee('user'));
 * // => ['barney', 'fred']
 *
 * // Create custom iteratee shorthands.
 * _.iteratee = _.wrap(_.iteratee, function(iteratee, func) {
 *   return !_.isRegExp(func) ? iteratee(func) : function(string) {
 *     return func.test(string);
 *   };
 * });
 *
 * _.filter(['abc', 'def'], /ef/);
 * // => ['def']
 */
function iteratee(func) {
  return baseIteratee(typeof func == 'function' ? func : baseClone(func, CLONE_DEEP_FLAG));
}

var deps$4 = merge(
  {
    merge: merge,
    clone: clone,
    cloneDeep: cloneDeep,
    isObject: isObject$1,
    each: forEach,
    eachRight: forEachRight,
    has: has,
    set: set,
    unset: unset,
    isPlainObject: isPlainObject,
    iteratee: iteratee,
    get: get,
  },
  deps$6,
  deps$5
);

function getFilterDeep(_) {
  const eachDeep = getEachDeep(_);
  const condense = getCondense();

  function filterDeep(obj, predicate, options) {
    predicate = _.iteratee(predicate);
    if (!options) {
      options = {};
    } else {
      options = _.cloneDeep(options);
      if (options.leafsOnly !== undefined) {
        options.leavesOnly = options.leafsOnly;
      }
    }
    if (!options.onTrue) {
      options.onTrue = {};
    }
    if (!options.onFalse) {
      options.onFalse = {};
    }
    if (!options.onUndefined) {
      options.onUndefined = {};
    }
    if (options.childrenPath !== undefined) {
      if (options.onTrue.skipChildren === undefined) {
        options.onTrue.skipChildren = false;
      }
      if (options.onUndefined.skipChildren === undefined) {
        options.onUndefined.skipChildren = false;
      }
      if (options.onFalse.skipChildren === undefined) {
        options.onFalse.skipChildren = false;
      }

      if (options.onTrue.cloneDeep === undefined) {
        options.onTrue.cloneDeep = true;
      }
      if (options.onUndefined.cloneDeep === undefined) {
        options.onUndefined.cloneDeep = true;
      }
      if (options.onFalse.cloneDeep === undefined) {
        options.onFalse.cloneDeep = true;
      }
    }
    options = _.merge(
      {
        checkCircular: false,
        keepCircular: true,
        //replaceCircularBy: <by>,
        leavesOnly: options.childrenPath === undefined,
        condense: true,
        cloneDeep: _.cloneDeep,
        pathFormat: 'string',
        onTrue: { skipChildren: true, cloneDeep: true, keepIfEmpty: true },
        onUndefined: {
          skipChildren: false,
          cloneDeep: false,
          keepIfEmpty: false,
        },
        onFalse: {
          skipChildren: true,
          cloneDeep: false,
          keepIfEmpty: false,
        },
      },
      options
    );

    const eachDeepOptions = {
      pathFormat: options.pathFormat,
      checkCircular: options.checkCircular,
      childrenPath: options.childrenPath,
      includeRoot: options.includeRoot,
      rootIsChildren: options.rootIsChildren,
      ownPropertiesOnly: options.ownPropertiesOnly,
      callbackAfterIterate: true,
      leavesOnly: false,
    };
    const resIsArray = Array.isArray(obj);
    let res = resIsArray ? [] : isObject(obj) ? {} : null;
    const toCondense = options.condense ? [] : false;
    eachDeep(
      obj,
      function (value, key, parent, context) {
        if (!context.afterIterate) {
          context.info._filterDeep = {};
          if (!context.isCircular) {
            let reply =
              !options.leavesOnly || context.isLeaf
                ? predicate(value, key, parent, context)
                : undefined;

            if (!isObject(reply)) {
              if (reply === undefined) {
                reply = options.onUndefined;
              } else if (reply) {
                reply = options.onTrue;
              } else {
                reply = options.onFalse;
              }
            }
            context.info._filterDeep.reply = reply;
            context.info._filterDeep.empty =
              reply.empty === undefined ? true : reply.empty;

            if (reply.keepIfEmpty || !reply.skipChildren) {
              if (options.cloneDeep && reply.cloneDeep) {
                if (context.path !== undefined) {
                  let children = takeResultParent(context, res);
                  context.info._filterDeep.res = children[
                    key
                  ] = options.cloneDeep(value);
                } else {
                  context.info._filterDeep.res = res = options.cloneDeep(value);
                }
              } else {
                if (context.path !== undefined) {
                  let children = takeResultParent(context, res);
                  context.info._filterDeep.res = children[key] = context.info
                    .isArray
                    ? []
                    : context.info.isObject
                    ? {}
                    : value;
                } else {
                  context.info._filterDeep.res = res = context.info.isArray
                    ? []
                    : context.info.isObject
                    ? {}
                    : value;
                }
              }
            }
            return !reply.skipChildren;
          } else {
            let children = takeResultParent(context, res);
            if (!options.keepCircular) {
              delete children[key];
              if (
                toCondense &&
                ((children === context.parent.info._filterDeep.res &&
                  context.parent.info.isArray) ||
                  Array.isArray(children)) &&
                !context.parent.info._filterDeep.isSparse
              ) {
                context.parent.info._filterDeep.isSparse = true;
                toCondense.push(context.parent.info);
              }

              context.info._filterDeep.excluded = true;
            } else {
              context.info._filterDeep.res = children[key] =
                'replaceCircularBy' in options
                  ? options.replaceCircularBy
                  : context.circularParent.path !== undefined
                  ? context.circularParent.info._filterDeep.res
                  : res;
            }
            return false;
          }
        } else if (context.afterIterate && !context.isCircular) {
          const reply = context.info._filterDeep.reply;

          if (context.info._filterDeep.empty && !reply.keepIfEmpty) {
            if (context.path === undefined) {
              res = null;
            } else {
              let children = takeResultParent(context, res);
              delete children[key];
              if (
                toCondense &&
                ((children === context.parent.info._filterDeep.res &&
                  context.parent.info.isArray) ||
                  Array.isArray(children)) &&
                !context.parent.info._filterDeep.isSparse
              ) {
                context.parent.info._filterDeep.isSparse = true;
                toCondense.push(context.parent.info);
              }
              context.info._filterDeep.excluded = true;
            }
          } else {
            let parent = context.parent;
            while (parent) {
              // if (!parent.info._filterDeep) {
              //   parent.info._filterDeep = {};
              // }
              if (!parent.info._filterDeep.reply) {
                parent.info._filterDeep.reply = options.onUndefined;
              }
              if (!parent.info._filterDeep.empty) {
                break;
              }
              parent.info._filterDeep.empty = false;
              parent = parent.parent;
            }
          }

          return;
        }
      },
      eachDeepOptions
    );

    if (toCondense) {
      for (var i = 0; i < toCondense.length; i++) {
        const info = toCondense[i];
        if (info._filterDeep.isSparse && !info._filterDeep.excluded) {
          condense(info.children);
        }
      }
      if (resIsArray) {
        condense(res);
      }
    }
    if (resIsArray && !res.length && !eachDeepOptions.includeRoot) {
      return null;
    }

    return res;
  }
  return filterDeep;

  function takeResultParent(context, res) {
    if (context.parent.info.children) {
      return context.parent.info.children;
    }
    if (!context.parent.info._filterDeep) {
      context.parent.info._filterDeep = {};
    }
    let parent = context.parent.info._filterDeep.res;
    if (parent === undefined) {
      //if (!context.parent.parent) {
      parent = context.parent.info._filterDeep.res = res;
      // } else {
      //   parent = context.parent.info._filterDeep.res = Array.isArray(context.parent.value)
      //     ? []
      //     : {};
      // }
    }
    if (context._item.childrenPath) {
      let oParent = context.parent.value;
      for (let i = 0; i < context._item.childrenPath.length; i++) {
        const childKey = context._item.childrenPath[i];
        oParent = oParent[childKey];
        if (!parent[childKey]) {
          parent[childKey] = Array.isArray(oParent) ? [] : {};
        }
        parent = parent[childKey];
      }
    }
    context.parent.info.children = parent;
    return parent;
  }
}

/* build/tpl */
const filterDeep = getFilterDeep(deps$4);

var deps$3 = merge(
  {
    iteratee: iteratee,
    cloneDeep: cloneDeep,
    merge: merge,
  },
  deps$6
);

function getFindDeep(_) {
  const eachDeep = getEachDeep(_);

  function findDeep(obj, predicate, options) {
    predicate = _.iteratee(predicate);
    if (!options) {
      options = {};
    } else {
      options = _.cloneDeep(options);
      if (options.leafsOnly !== undefined) {
        options.leavesOnly = options.leafsOnly;
      }
    }

    options = _.merge(
      {
        checkCircular: false,
        leavesOnly: options.childrenPath === undefined,
        pathFormat: 'string',
      },
      options
    );

    const eachDeepOptions = {
      pathFormat: options.pathFormat,
      checkCircular: options.checkCircular,
      ownPropertiesOnly: options.ownPropertiesOnly,
      childrenPath: options.childrenPath,
      includeRoot: options.includeRoot,
      rootIsChildren: options.rootIsChildren,
      callbackAfterIterate: false,
      leavesOnly: options.leavesOnly,
    };

    let res;

    eachDeep(
      obj,
      (value, key, parent, context) => {
        if (predicate(value, key, parent, context)) {
          res = { value, key, parent, context };
          return context['break']();
        }
      },
      eachDeepOptions
    );
    return res;
  }
  return findDeep;
}

/* build/tpl */
const findDeep = getFindDeep(deps$3);

merge({ merge: merge }, deps$6);

merge(
  {
    merge: merge,
  },
  deps$6
);

merge(
  {
    iteratee: iteratee,
  },
  deps$6
);

var deps$2 = merge(
  {
    iteratee: iteratee,
    isObject: isObject$1,
    clone: clone,
    set: set,
  },
  deps$6
);

merge(
  {
    cloneDeep: cloneDeep,
    has: has,
    unset: unset,
  },
  deps$2
);

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return baseIsEqual(value, other);
}

/** Used to match a single whitespace character. */
var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim(string) {
  return string
    ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
    : string;
}

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject$1(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject$1(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308;

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

/**
 * Creates a slice of `array` with `n` elements taken from the end.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to query.
 * @param {number} [n=1] The number of elements to take.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * _.takeRight([1, 2, 3]);
 * // => [3]
 *
 * _.takeRight([1, 2, 3], 2);
 * // => [2, 3]
 *
 * _.takeRight([1, 2, 3], 5);
 * // => [1, 2, 3]
 *
 * _.takeRight([1, 2, 3], 0);
 * // => []
 */
function takeRight(array, n, guard) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return [];
  }
  n = (guard || n === undefined) ? 1 : toInteger(n);
  n = length - n;
  return baseSlice(array, n < 0 ? 0 : n, length);
}

var deps$1 = merge(
  {
    isString: isString,
    toPath: toPath,
    isEqual: isEqual,
    takeRight: takeRight,
    cloneDeep: cloneDeep,
  },
  deps$8
);

var deps = merge({ merge: merge }, deps$1, deps$4);

merge({ merge: merge }, deps);

function getSomeDeep(_) {
  const findDeep = getFindDeep(_);
  function someDeep(obj, predicate, options) {
    return !!findDeep(obj, predicate, options);
  }
  return someDeep;
}

/* build/tpl */
const someDeep = getSomeDeep(deps$3);

function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}

function setEntries() {
  const result = filterDeep(state$1[`entries${capitalizeFirstLetter(state.active)}`], (o) => {
    return ((o.name &&
      o.name
        .toLowerCase()
        .includes(state$1.searchValue.toLowerCase())) ||
      (o.nameParent &&
        o.nameParent
          .toLowerCase()
          .includes(state$1.searchValue.toLowerCase())));
  }, { childrenPath: ['children'] });
  state$1[`entries${capitalizeFirstLetter(state.active)}Active`] =
    (result === null || result === void 0 ? void 0 : result.length) >= 1
      ? result
      : [
        {
          title: state$1.searchNoValue,
          children: [],
          isMultisite: state$1.data.network,
          path: state.active === 'menu'
            ? state$1.entriesMenuCurrentPath
            : state$1.entriesPostCurrentPath,
        },
      ];
}

const streamlineBoxCss = ":host{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;box-sizing:border-box}/*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{--tw-blur:var(--tw-empty,/*!*/ /*!*/);--tw-brightness:var(--tw-empty,/*!*/ /*!*/);--tw-contrast:var(--tw-empty,/*!*/ /*!*/);--tw-grayscale:var(--tw-empty,/*!*/ /*!*/);--tw-hue-rotate:var(--tw-empty,/*!*/ /*!*/);--tw-invert:var(--tw-empty,/*!*/ /*!*/);--tw-saturate:var(--tw-empty,/*!*/ /*!*/);--tw-sepia:var(--tw-empty,/*!*/ /*!*/);--tw-drop-shadow:var(--tw-empty,/*!*/ /*!*/);--tw-filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);border:0 solid;box-sizing:border-box}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}a{color:inherit;text-decoration:inherit}.visible{visibility:visible}.inline-block{display:inline-block}.h-\\[max-content\\]{height:-webkit-max-content;height:-moz-max-content;height:max-content}.bg-blue-gray-200{--tw-bg-opacity:1;background-color:rgba(226,232,240,var(--tw-bg-opacity))}.px-2\\.5{padding-left:.625rem;padding-right:.625rem}.py-1\\.5{padding-bottom:.375rem;padding-top:.375rem}.px-2{padding-left:.5rem;padding-right:.5rem}.py-1{padding-bottom:.25rem;padding-top:.25rem}.text-blue-gray-500{--tw-text-opacity:1;color:rgba(100,116,139,var(--tw-text-opacity))}.blur{--tw-blur:blur(8px);filter:var(--tw-filter)}/*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */";

let StreamlineBox$1 = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
    }
    connectedCallback() {
        setEntries();
    }
    componentDidLoad() {
        onChange$1("visible", (value) => {
            if (value === true) {
                disableBodyScroll(this.el.shadowRoot
                    .querySelector("streamline-entries")
                    .shadowRoot.querySelector("div > div"), {
                    reserveScrollBarGap: true,
                });
            }
            else {
                clearAllBodyScrollLocks();
            }
        });
    }
    render() {
        return (h("div", { class: "inner w-full h-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[1000px] max-h-[700px] bg-white overflow-hidden grid" }, h("streamline-sidebar", null), h("div", { class: "wrap h-full absolute left-[var(--sl-side-w)] w-[calc(100%-var(--sl-side-w))]" }, h("streamline-search", { class: "h-[var(--sl-side-w)] w-full" }), h("streamline-entries", null))));
    }
    get el() { return this; }
    static get style() { return streamlineBoxCss + '/*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-transform:translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;border:0 solid;box-sizing:border-box}.visible{visibility:visible}.absolute{position:absolute}.left-1\\/2{left:50%}.top-1\\/2{top:50%}.left-\\[var\\(--sl-side-w\\)\\]{left:var(--sl-side-w)}.grid{display:grid}.h-full{height:100%}.h-\\[var\\(--sl-side-w\\)\\]{height:var(--sl-side-w)}.max-h-\\[700px\\]{max-height:700px}.w-full{width:100%}.w-\\[calc\\(100\\%-var\\(--sl-side-w\\)\\)\\]{width:calc(100% - var(--sl-side-w))}.max-w-\\[1000px\\]{max-width:1000px}.-translate-x-1\\/2{--tw-translate-x:-50%;transform:var(--tw-transform)}.-translate-y-1\\/2{--tw-translate-y:-50%;transform:var(--tw-transform)}.overflow-hidden{overflow:hidden}.bg-white{--tw-bg-opacity:1;background-color:rgba(255,255,255,var(--tw-bg-opacity))}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}'; }
};

var top = 'top';
var bottom = 'bottom';
var right = 'right';
var left = 'left';
var auto = 'auto';
var basePlacements = [top, bottom, right, left];
var start = 'start';
var end = 'end';
var clippingParents = 'clippingParents';
var viewport = 'viewport';
var popper = 'popper';
var reference = 'reference';
var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []); // modifiers that need to read the DOM

var beforeRead = 'beforeRead';
var read = 'read';
var afterRead = 'afterRead'; // pure-logic modifiers

var beforeMain = 'beforeMain';
var main = 'main';
var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

var beforeWrite = 'beforeWrite';
var write = 'write';
var afterWrite = 'afterWrite';
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

function getNodeName(element) {
  return element ? (element.nodeName || '').toLowerCase() : null;
}

function getWindow(node) {
  if (node == null) {
    return window;
  }

  if (node.toString() !== '[object Window]') {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }

  return node;
}

function isElement$1(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}

function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}

function isShadowRoot(node) {
  // IE 11 has no ShadowRoot
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }

  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}

// and applies them to the HTMLElements such as popper and arrow

function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function (name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name]; // arrow is optional + virtual elements

    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    } // Flow doesn't support to extend this property, but it's the most
    // effective way to apply styles to an HTMLElement
    // $FlowFixMe[cannot-write]


    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function (name) {
      var value = attributes[name];

      if (value === false) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value === true ? '' : value);
      }
    });
  });
}

function effect$2(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: '0',
      top: '0',
      margin: '0'
    },
    arrow: {
      position: 'absolute'
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;

  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }

  return function () {
    Object.keys(state.elements).forEach(function (name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

      var style = styleProperties.reduce(function (style, property) {
        style[property] = '';
        return style;
      }, {}); // arrow is optional + virtual elements

      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }

      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
} // eslint-disable-next-line import/no-unused-modules


const applyStyles$1 = {
  name: 'applyStyles',
  enabled: true,
  phase: 'write',
  fn: applyStyles,
  effect: effect$2,
  requires: ['computeStyles']
};

function getBasePlacement$1(placement) {
  return placement.split('-')[0];
}

// import { isHTMLElement } from './instanceOf';
function getBoundingClientRect(element, // eslint-disable-next-line unused-imports/no-unused-vars
includeScale) {

  var rect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1; // FIXME:
  // `offsetWidth` returns an integer while `getBoundingClientRect`
  // returns a float. This results in `scaleX` or `scaleY` being
  // non-1 when it should be for elements that aren't a full pixel in
  // width or height.
  // if (isHTMLElement(element) && includeScale) {
  //   const offsetHeight = element.offsetHeight;
  //   const offsetWidth = element.offsetWidth;
  //   // Do not attempt to divide by 0, otherwise we get `Infinity` as scale
  //   // Fallback to 1 in case both values are `0`
  //   if (offsetWidth > 0) {
  //     scaleX = rect.width / offsetWidth || 1;
  //   }
  //   if (offsetHeight > 0) {
  //     scaleY = rect.height / offsetHeight || 1;
  //   }
  // }

  return {
    width: rect.width / scaleX,
    height: rect.height / scaleY,
    top: rect.top / scaleY,
    right: rect.right / scaleX,
    bottom: rect.bottom / scaleY,
    left: rect.left / scaleX,
    x: rect.left / scaleX,
    y: rect.top / scaleY
  };
}

// means it doesn't take into account transforms.

function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
  // Fixes https://github.com/popperjs/popper-core/issues/1223

  var width = element.offsetWidth;
  var height = element.offsetHeight;

  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }

  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }

  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: width,
    height: height
  };
}

function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

  if (parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (rootNode && isShadowRoot(rootNode)) {
      var next = child;

      do {
        if (next && parent.isSameNode(next)) {
          return true;
        } // $FlowFixMe[prop-missing]: need a better way to handle this...


        next = next.parentNode || next.host;
      } while (next);
    } // Give up, the result is false


  return false;
}

function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}

function isTableElement(element) {
  return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
}

function getDocumentElement(element) {
  // $FlowFixMe[incompatible-return]: assume body is always available
  return ((isElement$1(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
  element.document) || window.document).documentElement;
}

function getParentNode(element) {
  if (getNodeName(element) === 'html') {
    return element;
  }

  return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || ( // DOM Element detected
    isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    getDocumentElement(element) // fallback

  );
}

function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
  getComputedStyle(element).position === 'fixed') {
    return null;
  }

  return element.offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block


function getContainingBlock(element) {
  var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
  var isIE = navigator.userAgent.indexOf('Trident') !== -1;

  if (isIE && isHTMLElement(element)) {
    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
    var elementCss = getComputedStyle(element);

    if (elementCss.position === 'fixed') {
      return null;
    }
  }

  var currentNode = getParentNode(element);

  while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle(currentNode); // This is non-exhaustive but covers the most common CSS properties that
    // create a containing block.
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }

  return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.


function getOffsetParent(element) {
  var window = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);

  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle(offsetParent).position === 'static')) {
    return window;
  }

  return offsetParent || getContainingBlock(element) || window;
}

function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}

var max = Math.max;
var min = Math.min;
var round = Math.round;

function within(min$1, value, max$1) {
  return max(min$1, min(value, max$1));
}

function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}

function expandToHashMap(value, keys) {
  return keys.reduce(function (hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

var toPaddingObject = function toPaddingObject(padding, state) {
  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
};

function arrow(_ref) {
  var _state$modifiersData$;

  var state = _ref.state,
      name = _ref.name,
      options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement$1(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? 'height' : 'width';

  if (!arrowElement || !popperOffsets) {
    return;
  }

  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === 'y' ? top : left;
  var maxProp = axis === 'y' ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
  // outside of the popper bounds

  var min = paddingObject[minProp];
  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset = within(min, center, max); // Prevents breaking syntax highlighting...

  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}

function effect$1(_ref2) {
  var state = _ref2.state,
      options = _ref2.options;
  var _options$element = options.element,
      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

  if (arrowElement == null) {
    return;
  } // CSS selector


  if (typeof arrowElement === 'string') {
    arrowElement = state.elements.popper.querySelector(arrowElement);

    if (!arrowElement) {
      return;
    }
  }

  if (!contains(state.elements.popper, arrowElement)) {

    return;
  }

  state.elements.arrow = arrowElement;
} // eslint-disable-next-line import/no-unused-modules


const arrow$1 = {
  name: 'arrow',
  enabled: true,
  phase: 'main',
  fn: arrow,
  effect: effect$1,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow']
};

function getVariation(placement) {
  return placement.split('-')[1];
}

var unsetSides = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto'
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

function roundOffsetsByDPR(_ref) {
  var x = _ref.x,
      y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(round(x * dpr) / dpr) || 0,
    y: round(round(y * dpr) / dpr) || 0
  };
}

function mapToStyles(_ref2) {
  var _Object$assign2;

  var popper = _ref2.popper,
      popperRect = _ref2.popperRect,
      placement = _ref2.placement,
      variation = _ref2.variation,
      offsets = _ref2.offsets,
      position = _ref2.position,
      gpuAcceleration = _ref2.gpuAcceleration,
      adaptive = _ref2.adaptive,
      roundOffsets = _ref2.roundOffsets;

  var _ref3 = roundOffsets === true ? roundOffsetsByDPR(offsets) : typeof roundOffsets === 'function' ? roundOffsets(offsets) : offsets,
      _ref3$x = _ref3.x,
      x = _ref3$x === void 0 ? 0 : _ref3$x,
      _ref3$y = _ref3.y,
      y = _ref3$y === void 0 ? 0 : _ref3$y;

  var hasX = offsets.hasOwnProperty('x');
  var hasY = offsets.hasOwnProperty('y');
  var sideX = left;
  var sideY = top;
  var win = window;

  if (adaptive) {
    var offsetParent = getOffsetParent(popper);
    var heightProp = 'clientHeight';
    var widthProp = 'clientWidth';

    if (offsetParent === getWindow(popper)) {
      offsetParent = getDocumentElement(popper);

      if (getComputedStyle(offsetParent).position !== 'static' && position === 'absolute') {
        heightProp = 'scrollHeight';
        widthProp = 'scrollWidth';
      }
    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


    offsetParent = offsetParent;

    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom; // $FlowFixMe[prop-missing]

      y -= offsetParent[heightProp] - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }

    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right; // $FlowFixMe[prop-missing]

      x -= offsetParent[widthProp] - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }

  var commonStyles = Object.assign({
    position: position
  }, adaptive && unsetSides);

  if (gpuAcceleration) {
    var _Object$assign;

    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }

  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}

function computeStyles(_ref4) {
  var state = _ref4.state,
      options = _ref4.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
      _options$adaptive = options.adaptive,
      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
      _options$roundOffsets = options.roundOffsets,
      roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

  var commonStyles = {
    placement: getBasePlacement$1(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration
  };

  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive: adaptive,
      roundOffsets: roundOffsets
    })));
  }

  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false,
      roundOffsets: roundOffsets
    })));
  }

  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-placement': state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


const computeStyles$1 = {
  name: 'computeStyles',
  enabled: true,
  phase: 'beforeWrite',
  fn: computeStyles,
  data: {}
};

var passive = {
  passive: true
};

function effect(_ref) {
  var state = _ref.state,
      instance = _ref.instance,
      options = _ref.options;
  var _options$scroll = options.scroll,
      scroll = _options$scroll === void 0 ? true : _options$scroll,
      _options$resize = options.resize,
      resize = _options$resize === void 0 ? true : _options$resize;
  var window = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', instance.update, passive);
    });
  }

  if (resize) {
    window.addEventListener('resize', instance.update, passive);
  }

  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.removeEventListener('resize', instance.update, passive);
    }
  };
} // eslint-disable-next-line import/no-unused-modules


const eventListeners = {
  name: 'eventListeners',
  enabled: true,
  phase: 'write',
  fn: function fn() {},
  effect: effect,
  data: {}
};

var hash$1 = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash$1[matched];
  });
}

var hash = {
  start: 'end',
  end: 'start'
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function (matched) {
    return hash[matched];
  });
}

function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  };
}

function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  // Popper 1 is broken in this case and never had a bug report so let's assume
  // it's not an issue. I don't think anyone ever specifies width on <html>
  // anyway.
  // Browsers where the left scrollbar doesn't cause an issue report `0` for
  // this (e.g. Edge 2019, IE11, Safari)
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}

function getViewportRect(element) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0; // NB: This isn't supported on iOS <= 12. If the keyboard is open, the popper
  // can be obscured underneath it.
  // Also, `html.clientHeight` adds the bottom bar height in Safari iOS, even
  // if it isn't open, so if this isn't available, the popper will be detected
  // to overflow the bottom of the screen too early.

  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height; // Uses Layout Viewport (like Chrome; Safari does not currently)
    // In Chrome, it returns a value very close to 0 (+/-) but contains rounding
    // errors due to floating point numbers, so we need to check precision.
    // Safari returns a number <= 0, usually < -1 when pinch-zoomed
    // Feature detection fails in mobile emulation mode in Chrome.
    // Math.abs(win.innerWidth / visualViewport.scale - visualViewport.width) <
    // 0.001
    // Fallback here: "Not Safari" userAgent

    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }

  return {
    width: width,
    height: height,
    x: x + getWindowScrollBarX(element),
    y: y
  };
}

// of the `<html>` and `<body>` rect bounds if horizontally scrollable

function getDocumentRect(element) {
  var _element$ownerDocumen;

  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;

  if (getComputedStyle(body || html).direction === 'rtl') {
    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }

  return {
    width: width,
    height: height,
    x: x,
    y: y
  };
}

function isScrollParent(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  var _getComputedStyle = getComputedStyle(element),
      overflow = _getComputedStyle.overflow,
      overflowX = _getComputedStyle.overflowX,
      overflowY = _getComputedStyle.overflowY;

  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

function getScrollParent(node) {
  if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return node.ownerDocument.body;
  }

  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }

  return getScrollParent(getParentNode(node));
}

/*
given a DOM element, return the list of all scroll parents, up the list of ancesors
until we get to the top window object. This list is what we attach scroll listeners
to, because if any of these parent elements scroll, we'll need to re-calculate the
reference element's position.
*/

function listScrollParents(element, list) {
  var _element$ownerDocumen;

  if (list === void 0) {
    list = [];
  }

  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
  updatedList.concat(listScrollParents(getParentNode(target)));
}

function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

function getInnerBoundingClientRect(element) {
  var rect = getBoundingClientRect(element);
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}

function getClientRectFromMixedType(element, clippingParent) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isHTMLElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
} // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`


function getClippingParents(element) {
  var clippingParents = listScrollParents(getParentNode(element));
  var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

  if (!isElement$1(clipperElement)) {
    return [];
  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


  return clippingParents.filter(function (clippingParent) {
    return isElement$1(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
  });
} // Gets the maximum area that the element is visible in due to any number of
// clipping parents


function getClippingRect(element, boundary, rootBoundary) {
  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents[0];
  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

function computeOffsets(_ref) {
  var reference = _ref.reference,
      element = _ref.element,
      placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement$1(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;

  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;

    case bottom:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;

    case right:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;

    case left:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;

    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }

  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

  if (mainAxis != null) {
    var len = mainAxis === 'y' ? 'height' : 'width';

    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
        break;

      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
        break;
    }
  }

  return offsets;
}

function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$placement = _options.placement,
      placement = _options$placement === void 0 ? state.placement : _options$placement,
      _options$boundary = _options.boundary,
      boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
      _options$rootBoundary = _options.rootBoundary,
      rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
      _options$elementConte = _options.elementContext,
      elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
      _options$altBoundary = _options.altBoundary,
      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
      _options$padding = _options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement$1(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: 'absolute',
    placement: placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
  // 0 or negative = within the clipping rect

  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

  if (elementContext === popper && offsetData) {
    var offset = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function (key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
      overflowOffsets[key] += offset[axis] * multiply;
    });
  }

  return overflowOffsets;
}

function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      placement = _options.placement,
      boundary = _options.boundary,
      rootBoundary = _options.rootBoundary,
      padding = _options.padding,
      flipVariations = _options.flipVariations,
      _options$allowedAutoP = _options.allowedAutoPlacements,
      allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
    return getVariation(placement) === variation;
  }) : basePlacements;
  var allowedPlacements = placements$1.filter(function (placement) {
    return allowedAutoPlacements.indexOf(placement) >= 0;
  });

  if (allowedPlacements.length === 0) {
    allowedPlacements = placements$1;
  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


  var overflows = allowedPlacements.reduce(function (acc, placement) {
    acc[placement] = detectOverflow(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding
    })[getBasePlacement$1(placement)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function (a, b) {
    return overflows[a] - overflows[b];
  });
}

function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement$1(placement) === auto) {
    return [];
  }

  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}

function flip(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;

  if (state.modifiersData[name]._skip) {
    return;
  }

  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
      specifiedFallbackPlacements = options.fallbackPlacements,
      padding = options.padding,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      _options$flipVariatio = options.flipVariations,
      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
      allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement$1(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
    return acc.concat(getBasePlacement$1(placement) === auto ? computeAutoPlacement(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      flipVariations: flipVariations,
      allowedAutoPlacements: allowedAutoPlacements
    }) : placement);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements[0];

  for (var i = 0; i < placements.length; i++) {
    var placement = placements[i];

    var _basePlacement = getBasePlacement$1(placement);

    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? 'width' : 'height';
    var overflow = detectOverflow(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      altBoundary: altBoundary,
      padding: padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }

    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];

    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }

    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }

    if (checks.every(function (check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }

    checksMap.set(placement, checks);
  }

  if (makeFallbackChecks) {
    // `2` may be desired in some cases – research later
    var numberOfChecks = flipVariations ? 3 : 1;

    var _loop = function _loop(_i) {
      var fittingPlacement = placements.find(function (placement) {
        var checks = checksMap.get(placement);

        if (checks) {
          return checks.slice(0, _i).every(function (check) {
            return check;
          });
        }
      });

      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };

    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);

      if (_ret === "break") break;
    }
  }

  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
} // eslint-disable-next-line import/no-unused-modules


const flip$1 = {
  name: 'flip',
  enabled: true,
  phase: 'main',
  fn: flip,
  requiresIfExists: ['offset'],
  data: {
    _skip: false
  }
};

function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }

  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}

function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function (side) {
    return overflow[side] >= 0;
  });
}

function hide(_ref) {
  var state = _ref.state,
      name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: 'reference'
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets: referenceClippingOffsets,
    popperEscapeOffsets: popperEscapeOffsets,
    isReferenceHidden: isReferenceHidden,
    hasPopperEscaped: hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-reference-hidden': isReferenceHidden,
    'data-popper-escaped': hasPopperEscaped
  });
} // eslint-disable-next-line import/no-unused-modules


const hide$1 = {
  name: 'hide',
  enabled: true,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: hide
};

function distanceAndSkiddingToXY(placement, rects, offset) {
  var basePlacement = getBasePlacement$1(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
    placement: placement
  })) : offset,
      skidding = _ref[0],
      distance = _ref[1];

  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}

function offset(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$offset = options.offset,
      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement],
      x = _data$state$placement.x,
      y = _data$state$placement.y;

  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


const offset$1 = {
  name: 'offset',
  enabled: true,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: offset
};

function popperOffsets(_ref) {
  var state = _ref.state,
      name = _ref.name;
  // Offsets are the actual position the popper needs to have to be
  // properly positioned near its reference element
  // This is the most basic placement, and will be adjusted by
  // the modifiers in the next step
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: 'absolute',
    placement: state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


const popperOffsets$1 = {
  name: 'popperOffsets',
  enabled: true,
  phase: 'read',
  fn: popperOffsets,
  data: {}
};

function getAltAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}

function preventOverflow(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;
  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      padding = options.padding,
      _options$tether = options.tether,
      tether = _options$tether === void 0 ? true : _options$tether,
      _options$tetherOffset = options.tetherOffset,
      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary: boundary,
    rootBoundary: rootBoundary,
    padding: padding,
    altBoundary: altBoundary
  });
  var basePlacement = getBasePlacement$1(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var data = {
    x: 0,
    y: 0
  };

  if (!popperOffsets) {
    return;
  }

  if (checkMainAxis || checkAltAxis) {
    var mainSide = mainAxis === 'y' ? top : left;
    var altSide = mainAxis === 'y' ? bottom : right;
    var len = mainAxis === 'y' ? 'height' : 'width';
    var offset = popperOffsets[mainAxis];
    var min$1 = popperOffsets[mainAxis] + overflow[mainSide];
    var max$1 = popperOffsets[mainAxis] - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
    // outside the reference bounds

    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
    // to include its full size in the calculation. If the reference is small
    // and near the edge of a boundary, the popper can overflow even if the
    // reference is not overflowing as well (e.g. virtual elements with no
    // width or height)

    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - tetherOffsetValue : minLen - arrowLen - arrowPaddingMin - tetherOffsetValue;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + tetherOffsetValue : maxLen + arrowLen + arrowPaddingMax + tetherOffsetValue;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = state.modifiersData.offset ? state.modifiersData.offset[state.placement][mainAxis] : 0;
    var tetherMin = popperOffsets[mainAxis] + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = popperOffsets[mainAxis] + maxOffset - offsetModifierValue;

    if (checkMainAxis) {
      var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
      popperOffsets[mainAxis] = preventedOffset;
      data[mainAxis] = preventedOffset - offset;
    }

    if (checkAltAxis) {
      var _mainSide = mainAxis === 'x' ? top : left;

      var _altSide = mainAxis === 'x' ? bottom : right;

      var _offset = popperOffsets[altAxis];

      var _min = _offset + overflow[_mainSide];

      var _max = _offset - overflow[_altSide];

      var _preventedOffset = within(tether ? min(_min, tetherMin) : _min, _offset, tether ? max(_max, tetherMax) : _max);

      popperOffsets[altAxis] = _preventedOffset;
      data[altAxis] = _preventedOffset - _offset;
    }
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


const preventOverflow$1 = {
  name: 'preventOverflow',
  enabled: true,
  phase: 'main',
  fn: preventOverflow,
  requiresIfExists: ['offset']
};

function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}

function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = rect.width / element.offsetWidth || 1;
  var scaleY = rect.height / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
} // Returns the composite rect of an element relative to its offsetParent.
// Composite means it takes into account transforms as well as layout.


function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }

  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };

  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
    isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }

    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }

  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  }); // On visiting object, check for its dependencies and visit them recursively

  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);

        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }

  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      // check for visited object
      sort(modifier);
    }
  });
  return result;
}

function orderModifiers(modifiers) {
  // order based on dependencies
  var orderedModifiers = order(modifiers); // order based on phase

  return modifierPhases.reduce(function (acc, phase) {
    return acc.concat(orderedModifiers.filter(function (modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

function debounce$1(fn) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = undefined;
          resolve(fn());
        });
      });
    }

    return pending;
  };
}

function mergeByName(modifiers) {
  var merged = modifiers.reduce(function (merged, current) {
    var existing = merged[current.name];
    merged[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}

var DEFAULT_OPTIONS = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute'
};

function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === 'function');
  });
}

function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }

  var _generatorOptions = generatorOptions,
      _generatorOptions$def = _generatorOptions.defaultModifiers,
      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
      _generatorOptions$def2 = _generatorOptions.defaultOptions,
      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }

    var state = {
      placement: 'bottom',
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(setOptionsAction) {
        var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options);
        state.scrollParents = {
          reference: isElement$1(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
          popper: listScrollParents(popper)
        }; // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        }); // Validate the provided modifiers so that the consumer will get warned

        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }

        var _state$elements = state.elements,
            reference = _state$elements.reference,
            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements(reference, popper)) {

          return;
        } // Store the reference and popper rects to be read by modifiers


        state.rects = {
          reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
          popper: getLayoutRect(popper)
        }; // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });

        for (var index = 0; index < state.orderedModifiers.length; index++) {

          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }

          var _state$orderedModifie = state.orderedModifiers[index],
              fn = _state$orderedModifie.fn,
              _state$orderedModifie2 = _state$orderedModifie.options,
              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
              name = _state$orderedModifie.name;

          if (typeof fn === 'function') {
            state = fn({
              state: state,
              options: _options,
              name: name,
              instance: instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: debounce$1(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };

    if (!areValidElements(reference, popper)) {

      return instance;
    }

    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref3) {
        var name = _ref3.name,
            _ref3$options = _ref3.options,
            options = _ref3$options === void 0 ? {} : _ref3$options,
            effect = _ref3.effect;

        if (typeof effect === 'function') {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options
          });

          var noopFn = function noopFn() {};

          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }

    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }

    return instance;
  };
}

var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
var createPopper = /*#__PURE__*/popperGenerator({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules

/**!
* tippy.js v6.3.7
* (c) 2017-2021 atomiks
* MIT License
*/
var BOX_CLASS = "tippy-box";
var CONTENT_CLASS = "tippy-content";
var BACKDROP_CLASS = "tippy-backdrop";
var ARROW_CLASS = "tippy-arrow";
var SVG_ARROW_CLASS = "tippy-svg-arrow";
var TOUCH_OPTIONS = {
  passive: true,
  capture: true
};
var TIPPY_DEFAULT_APPEND_TO = function TIPPY_DEFAULT_APPEND_TO() {
  return document.body;
};
function getValueAtIndexOrReturn(value, index, defaultValue) {
  if (Array.isArray(value)) {
    var v = value[index];
    return v == null ? Array.isArray(defaultValue) ? defaultValue[index] : defaultValue : v;
  }

  return value;
}
function isType(value, type) {
  var str = {}.toString.call(value);
  return str.indexOf('[object') === 0 && str.indexOf(type + "]") > -1;
}
function invokeWithArgsOrReturn(value, args) {
  return typeof value === 'function' ? value.apply(void 0, args) : value;
}
function debounce(fn, ms) {
  // Avoid wrapping in `setTimeout` if ms is 0 anyway
  if (ms === 0) {
    return fn;
  }

  var timeout;
  return function (arg) {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      fn(arg);
    }, ms);
  };
}
function splitBySpaces(value) {
  return value.split(/\s+/).filter(Boolean);
}
function normalizeToArray(value) {
  return [].concat(value);
}
function pushIfUnique(arr, value) {
  if (arr.indexOf(value) === -1) {
    arr.push(value);
  }
}
function unique(arr) {
  return arr.filter(function (item, index) {
    return arr.indexOf(item) === index;
  });
}
function getBasePlacement(placement) {
  return placement.split('-')[0];
}
function arrayFrom(value) {
  return [].slice.call(value);
}
function removeUndefinedProps(obj) {
  return Object.keys(obj).reduce(function (acc, key) {
    if (obj[key] !== undefined) {
      acc[key] = obj[key];
    }

    return acc;
  }, {});
}

function div() {
  return document.createElement('div');
}
function isElement(value) {
  return ['Element', 'Fragment'].some(function (type) {
    return isType(value, type);
  });
}
function isNodeList(value) {
  return isType(value, 'NodeList');
}
function isMouseEvent(value) {
  return isType(value, 'MouseEvent');
}
function isReferenceElement(value) {
  return !!(value && value._tippy && value._tippy.reference === value);
}
function getArrayOfElements(value) {
  if (isElement(value)) {
    return [value];
  }

  if (isNodeList(value)) {
    return arrayFrom(value);
  }

  if (Array.isArray(value)) {
    return value;
  }

  return arrayFrom(document.querySelectorAll(value));
}
function setTransitionDuration(els, value) {
  els.forEach(function (el) {
    if (el) {
      el.style.transitionDuration = value + "ms";
    }
  });
}
function setVisibilityState(els, state) {
  els.forEach(function (el) {
    if (el) {
      el.setAttribute('data-state', state);
    }
  });
}
function getOwnerDocument(elementOrElements) {
  var _element$ownerDocumen;

  var _normalizeToArray = normalizeToArray(elementOrElements),
      element = _normalizeToArray[0]; // Elements created via a <template> have an ownerDocument with no reference to the body


  return element != null && (_element$ownerDocumen = element.ownerDocument) != null && _element$ownerDocumen.body ? element.ownerDocument : document;
}
function isCursorOutsideInteractiveBorder(popperTreeData, event) {
  var clientX = event.clientX,
      clientY = event.clientY;
  return popperTreeData.every(function (_ref) {
    var popperRect = _ref.popperRect,
        popperState = _ref.popperState,
        props = _ref.props;
    var interactiveBorder = props.interactiveBorder;
    var basePlacement = getBasePlacement(popperState.placement);
    var offsetData = popperState.modifiersData.offset;

    if (!offsetData) {
      return true;
    }

    var topDistance = basePlacement === 'bottom' ? offsetData.top.y : 0;
    var bottomDistance = basePlacement === 'top' ? offsetData.bottom.y : 0;
    var leftDistance = basePlacement === 'right' ? offsetData.left.x : 0;
    var rightDistance = basePlacement === 'left' ? offsetData.right.x : 0;
    var exceedsTop = popperRect.top - clientY + topDistance > interactiveBorder;
    var exceedsBottom = clientY - popperRect.bottom - bottomDistance > interactiveBorder;
    var exceedsLeft = popperRect.left - clientX + leftDistance > interactiveBorder;
    var exceedsRight = clientX - popperRect.right - rightDistance > interactiveBorder;
    return exceedsTop || exceedsBottom || exceedsLeft || exceedsRight;
  });
}
function updateTransitionEndListener(box, action, listener) {
  var method = action + "EventListener"; // some browsers apparently support `transition` (unprefixed) but only fire
  // `webkitTransitionEnd`...

  ['transitionend', 'webkitTransitionEnd'].forEach(function (event) {
    box[method](event, listener);
  });
}
/**
 * Compared to xxx.contains, this function works for dom structures with shadow
 * dom
 */

function actualContains(parent, child) {
  var target = child;

  while (target) {
    var _target$getRootNode;

    if (parent.contains(target)) {
      return true;
    }

    target = target.getRootNode == null ? void 0 : (_target$getRootNode = target.getRootNode()) == null ? void 0 : _target$getRootNode.host;
  }

  return false;
}

var currentInput = {
  isTouch: false
};
var lastMouseMoveTime = 0;
/**
 * When a `touchstart` event is fired, it's assumed the user is using touch
 * input. We'll bind a `mousemove` event listener to listen for mouse input in
 * the future. This way, the `isTouch` property is fully dynamic and will handle
 * hybrid devices that use a mix of touch + mouse input.
 */

function onDocumentTouchStart() {
  if (currentInput.isTouch) {
    return;
  }

  currentInput.isTouch = true;

  if (window.performance) {
    document.addEventListener('mousemove', onDocumentMouseMove);
  }
}
/**
 * When two `mousemove` event are fired consecutively within 20ms, it's assumed
 * the user is using mouse input again. `mousemove` can fire on touch devices as
 * well, but very rarely that quickly.
 */

function onDocumentMouseMove() {
  var now = performance.now();

  if (now - lastMouseMoveTime < 20) {
    currentInput.isTouch = false;
    document.removeEventListener('mousemove', onDocumentMouseMove);
  }

  lastMouseMoveTime = now;
}
/**
 * When an element is in focus and has a tippy, leaving the tab/window and
 * returning causes it to show again. For mouse users this is unexpected, but
 * for keyboard use it makes sense.
 * TODO: find a better technique to solve this problem
 */

function onWindowBlur() {
  var activeElement = document.activeElement;

  if (isReferenceElement(activeElement)) {
    var instance = activeElement._tippy;

    if (activeElement.blur && !instance.state.isVisible) {
      activeElement.blur();
    }
  }
}
function bindGlobalEventListeners() {
  document.addEventListener('touchstart', onDocumentTouchStart, TOUCH_OPTIONS);
  window.addEventListener('blur', onWindowBlur);
}

var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
var isIE11 = isBrowser ? // @ts-ignore
!!window.msCrypto : false;

var pluginProps = {
  animateFill: false,
  followCursor: false,
  inlinePositioning: false,
  sticky: false
};
var renderProps = {
  allowHTML: false,
  animation: 'fade',
  arrow: true,
  content: '',
  inertia: false,
  maxWidth: 350,
  role: 'tooltip',
  theme: '',
  zIndex: 9999
};
var defaultProps = Object.assign({
  appendTo: TIPPY_DEFAULT_APPEND_TO,
  aria: {
    content: 'auto',
    expanded: 'auto'
  },
  delay: 0,
  duration: [300, 250],
  getReferenceClientRect: null,
  hideOnClick: true,
  ignoreAttributes: false,
  interactive: false,
  interactiveBorder: 2,
  interactiveDebounce: 0,
  moveTransition: '',
  offset: [0, 10],
  onAfterUpdate: function onAfterUpdate() {},
  onBeforeUpdate: function onBeforeUpdate() {},
  onCreate: function onCreate() {},
  onDestroy: function onDestroy() {},
  onHidden: function onHidden() {},
  onHide: function onHide() {},
  onMount: function onMount() {},
  onShow: function onShow() {},
  onShown: function onShown() {},
  onTrigger: function onTrigger() {},
  onUntrigger: function onUntrigger() {},
  onClickOutside: function onClickOutside() {},
  placement: 'top',
  plugins: [],
  popperOptions: {},
  render: null,
  showOnCreate: false,
  touch: true,
  trigger: 'mouseenter focus',
  triggerTarget: null
}, pluginProps, renderProps);
var defaultKeys = Object.keys(defaultProps);
var setDefaultProps = function setDefaultProps(partialProps) {

  var keys = Object.keys(partialProps);
  keys.forEach(function (key) {
    defaultProps[key] = partialProps[key];
  });
};
function getExtendedPassedProps(passedProps) {
  var plugins = passedProps.plugins || [];
  var pluginProps = plugins.reduce(function (acc, plugin) {
    var name = plugin.name,
        defaultValue = plugin.defaultValue;

    if (name) {
      var _name;

      acc[name] = passedProps[name] !== undefined ? passedProps[name] : (_name = defaultProps[name]) != null ? _name : defaultValue;
    }

    return acc;
  }, {});
  return Object.assign({}, passedProps, pluginProps);
}
function getDataAttributeProps(reference, plugins) {
  var propKeys = plugins ? Object.keys(getExtendedPassedProps(Object.assign({}, defaultProps, {
    plugins: plugins
  }))) : defaultKeys;
  var props = propKeys.reduce(function (acc, key) {
    var valueAsString = (reference.getAttribute("data-tippy-" + key) || '').trim();

    if (!valueAsString) {
      return acc;
    }

    if (key === 'content') {
      acc[key] = valueAsString;
    } else {
      try {
        acc[key] = JSON.parse(valueAsString);
      } catch (e) {
        acc[key] = valueAsString;
      }
    }

    return acc;
  }, {});
  return props;
}
function evaluateProps(reference, props) {
  var out = Object.assign({}, props, {
    content: invokeWithArgsOrReturn(props.content, [reference])
  }, props.ignoreAttributes ? {} : getDataAttributeProps(reference, props.plugins));
  out.aria = Object.assign({}, defaultProps.aria, out.aria);
  out.aria = {
    expanded: out.aria.expanded === 'auto' ? props.interactive : out.aria.expanded,
    content: out.aria.content === 'auto' ? props.interactive ? null : 'describedby' : out.aria.content
  };
  return out;
}

var innerHTML = function innerHTML() {
  return 'innerHTML';
};

function dangerouslySetInnerHTML(element, html) {
  element[innerHTML()] = html;
}

function createArrowElement(value) {
  var arrow = div();

  if (value === true) {
    arrow.className = ARROW_CLASS;
  } else {
    arrow.className = SVG_ARROW_CLASS;

    if (isElement(value)) {
      arrow.appendChild(value);
    } else {
      dangerouslySetInnerHTML(arrow, value);
    }
  }

  return arrow;
}

function setContent(content, props) {
  if (isElement(props.content)) {
    dangerouslySetInnerHTML(content, '');
    content.appendChild(props.content);
  } else if (typeof props.content !== 'function') {
    if (props.allowHTML) {
      dangerouslySetInnerHTML(content, props.content);
    } else {
      content.textContent = props.content;
    }
  }
}
function getChildren(popper) {
  var box = popper.firstElementChild;
  var boxChildren = arrayFrom(box.children);
  return {
    box: box,
    content: boxChildren.find(function (node) {
      return node.classList.contains(CONTENT_CLASS);
    }),
    arrow: boxChildren.find(function (node) {
      return node.classList.contains(ARROW_CLASS) || node.classList.contains(SVG_ARROW_CLASS);
    }),
    backdrop: boxChildren.find(function (node) {
      return node.classList.contains(BACKDROP_CLASS);
    })
  };
}
function render(instance) {
  var popper = div();
  var box = div();
  box.className = BOX_CLASS;
  box.setAttribute('data-state', 'hidden');
  box.setAttribute('tabindex', '-1');
  var content = div();
  content.className = CONTENT_CLASS;
  content.setAttribute('data-state', 'hidden');
  setContent(content, instance.props);
  popper.appendChild(box);
  box.appendChild(content);
  onUpdate(instance.props, instance.props);

  function onUpdate(prevProps, nextProps) {
    var _getChildren = getChildren(popper),
        box = _getChildren.box,
        content = _getChildren.content,
        arrow = _getChildren.arrow;

    if (nextProps.theme) {
      box.setAttribute('data-theme', nextProps.theme);
    } else {
      box.removeAttribute('data-theme');
    }

    if (typeof nextProps.animation === 'string') {
      box.setAttribute('data-animation', nextProps.animation);
    } else {
      box.removeAttribute('data-animation');
    }

    if (nextProps.inertia) {
      box.setAttribute('data-inertia', '');
    } else {
      box.removeAttribute('data-inertia');
    }

    box.style.maxWidth = typeof nextProps.maxWidth === 'number' ? nextProps.maxWidth + "px" : nextProps.maxWidth;

    if (nextProps.role) {
      box.setAttribute('role', nextProps.role);
    } else {
      box.removeAttribute('role');
    }

    if (prevProps.content !== nextProps.content || prevProps.allowHTML !== nextProps.allowHTML) {
      setContent(content, instance.props);
    }

    if (nextProps.arrow) {
      if (!arrow) {
        box.appendChild(createArrowElement(nextProps.arrow));
      } else if (prevProps.arrow !== nextProps.arrow) {
        box.removeChild(arrow);
        box.appendChild(createArrowElement(nextProps.arrow));
      }
    } else if (arrow) {
      box.removeChild(arrow);
    }
  }

  return {
    popper: popper,
    onUpdate: onUpdate
  };
} // Runtime check to identify if the render function is the default one; this
// way we can apply default CSS transitions logic and it can be tree-shaken away

render.$$tippy = true;

var idCounter = 1;
var mouseMoveListeners = []; // Used by `hideAll()`

var mountedInstances = [];
function createTippy(reference, passedProps) {
  var props = evaluateProps(reference, Object.assign({}, defaultProps, getExtendedPassedProps(removeUndefinedProps(passedProps)))); // ===========================================================================
  // 🔒 Private members
  // ===========================================================================

  var showTimeout;
  var hideTimeout;
  var scheduleHideAnimationFrame;
  var isVisibleFromClick = false;
  var didHideDueToDocumentMouseDown = false;
  var didTouchMove = false;
  var ignoreOnFirstUpdate = false;
  var lastTriggerEvent;
  var currentTransitionEndListener;
  var onFirstUpdate;
  var listeners = [];
  var debouncedOnMouseMove = debounce(onMouseMove, props.interactiveDebounce);
  var currentTarget; // ===========================================================================
  // 🔑 Public members
  // ===========================================================================

  var id = idCounter++;
  var popperInstance = null;
  var plugins = unique(props.plugins);
  var state = {
    // Is the instance currently enabled?
    isEnabled: true,
    // Is the tippy currently showing and not transitioning out?
    isVisible: false,
    // Has the instance been destroyed?
    isDestroyed: false,
    // Is the tippy currently mounted to the DOM?
    isMounted: false,
    // Has the tippy finished transitioning in?
    isShown: false
  };
  var instance = {
    // properties
    id: id,
    reference: reference,
    popper: div(),
    popperInstance: popperInstance,
    props: props,
    state: state,
    plugins: plugins,
    // methods
    clearDelayTimeouts: clearDelayTimeouts,
    setProps: setProps,
    setContent: setContent,
    show: show,
    hide: hide,
    hideWithInteractivity: hideWithInteractivity,
    enable: enable,
    disable: disable,
    unmount: unmount,
    destroy: destroy
  }; // TODO: Investigate why this early return causes a TDZ error in the tests —
  // it doesn't seem to happen in the browser

  /* istanbul ignore if */

  if (!props.render) {

    return instance;
  } // ===========================================================================
  // Initial mutations
  // ===========================================================================


  var _props$render = props.render(instance),
      popper = _props$render.popper,
      onUpdate = _props$render.onUpdate;

  popper.setAttribute('data-tippy-root', '');
  popper.id = "tippy-" + instance.id;
  instance.popper = popper;
  reference._tippy = instance;
  popper._tippy = instance;
  var pluginsHooks = plugins.map(function (plugin) {
    return plugin.fn(instance);
  });
  var hasAriaExpanded = reference.hasAttribute('aria-expanded');
  addListeners();
  handleAriaExpandedAttribute();
  handleStyles();
  invokeHook('onCreate', [instance]);

  if (props.showOnCreate) {
    scheduleShow();
  } // Prevent a tippy with a delay from hiding if the cursor left then returned
  // before it started hiding


  popper.addEventListener('mouseenter', function () {
    if (instance.props.interactive && instance.state.isVisible) {
      instance.clearDelayTimeouts();
    }
  });
  popper.addEventListener('mouseleave', function () {
    if (instance.props.interactive && instance.props.trigger.indexOf('mouseenter') >= 0) {
      getDocument().addEventListener('mousemove', debouncedOnMouseMove);
    }
  });
  return instance; // ===========================================================================
  // 🔒 Private methods
  // ===========================================================================

  function getNormalizedTouchSettings() {
    var touch = instance.props.touch;
    return Array.isArray(touch) ? touch : [touch, 0];
  }

  function getIsCustomTouchBehavior() {
    return getNormalizedTouchSettings()[0] === 'hold';
  }

  function getIsDefaultRenderFn() {
    var _instance$props$rende;

    // @ts-ignore
    return !!((_instance$props$rende = instance.props.render) != null && _instance$props$rende.$$tippy);
  }

  function getCurrentTarget() {
    return currentTarget || reference;
  }

  function getDocument() {
    var parent = getCurrentTarget().parentNode;
    return parent ? getOwnerDocument(parent) : document;
  }

  function getDefaultTemplateChildren() {
    return getChildren(popper);
  }

  function getDelay(isShow) {
    // For touch or keyboard input, force `0` delay for UX reasons
    // Also if the instance is mounted but not visible (transitioning out),
    // ignore delay
    if (instance.state.isMounted && !instance.state.isVisible || currentInput.isTouch || lastTriggerEvent && lastTriggerEvent.type === 'focus') {
      return 0;
    }

    return getValueAtIndexOrReturn(instance.props.delay, isShow ? 0 : 1, defaultProps.delay);
  }

  function handleStyles(fromHide) {
    if (fromHide === void 0) {
      fromHide = false;
    }

    popper.style.pointerEvents = instance.props.interactive && !fromHide ? '' : 'none';
    popper.style.zIndex = "" + instance.props.zIndex;
  }

  function invokeHook(hook, args, shouldInvokePropsHook) {
    if (shouldInvokePropsHook === void 0) {
      shouldInvokePropsHook = true;
    }

    pluginsHooks.forEach(function (pluginHooks) {
      if (pluginHooks[hook]) {
        pluginHooks[hook].apply(pluginHooks, args);
      }
    });

    if (shouldInvokePropsHook) {
      var _instance$props;

      (_instance$props = instance.props)[hook].apply(_instance$props, args);
    }
  }

  function handleAriaContentAttribute() {
    var aria = instance.props.aria;

    if (!aria.content) {
      return;
    }

    var attr = "aria-" + aria.content;
    var id = popper.id;
    var nodes = normalizeToArray(instance.props.triggerTarget || reference);
    nodes.forEach(function (node) {
      var currentValue = node.getAttribute(attr);

      if (instance.state.isVisible) {
        node.setAttribute(attr, currentValue ? currentValue + " " + id : id);
      } else {
        var nextValue = currentValue && currentValue.replace(id, '').trim();

        if (nextValue) {
          node.setAttribute(attr, nextValue);
        } else {
          node.removeAttribute(attr);
        }
      }
    });
  }

  function handleAriaExpandedAttribute() {
    if (hasAriaExpanded || !instance.props.aria.expanded) {
      return;
    }

    var nodes = normalizeToArray(instance.props.triggerTarget || reference);
    nodes.forEach(function (node) {
      if (instance.props.interactive) {
        node.setAttribute('aria-expanded', instance.state.isVisible && node === getCurrentTarget() ? 'true' : 'false');
      } else {
        node.removeAttribute('aria-expanded');
      }
    });
  }

  function cleanupInteractiveMouseListeners() {
    getDocument().removeEventListener('mousemove', debouncedOnMouseMove);
    mouseMoveListeners = mouseMoveListeners.filter(function (listener) {
      return listener !== debouncedOnMouseMove;
    });
  }

  function onDocumentPress(event) {
    // Moved finger to scroll instead of an intentional tap outside
    if (currentInput.isTouch) {
      if (didTouchMove || event.type === 'mousedown') {
        return;
      }
    }

    var actualTarget = event.composedPath && event.composedPath()[0] || event.target; // Clicked on interactive popper

    if (instance.props.interactive && actualContains(popper, actualTarget)) {
      return;
    } // Clicked on the event listeners target


    if (normalizeToArray(instance.props.triggerTarget || reference).some(function (el) {
      return actualContains(el, actualTarget);
    })) {
      if (currentInput.isTouch) {
        return;
      }

      if (instance.state.isVisible && instance.props.trigger.indexOf('click') >= 0) {
        return;
      }
    } else {
      invokeHook('onClickOutside', [instance, event]);
    }

    if (instance.props.hideOnClick === true) {
      instance.clearDelayTimeouts();
      instance.hide(); // `mousedown` event is fired right before `focus` if pressing the
      // currentTarget. This lets a tippy with `focus` trigger know that it
      // should not show

      didHideDueToDocumentMouseDown = true;
      setTimeout(function () {
        didHideDueToDocumentMouseDown = false;
      }); // The listener gets added in `scheduleShow()`, but this may be hiding it
      // before it shows, and hide()'s early bail-out behavior can prevent it
      // from being cleaned up

      if (!instance.state.isMounted) {
        removeDocumentPress();
      }
    }
  }

  function onTouchMove() {
    didTouchMove = true;
  }

  function onTouchStart() {
    didTouchMove = false;
  }

  function addDocumentPress() {
    var doc = getDocument();
    doc.addEventListener('mousedown', onDocumentPress, true);
    doc.addEventListener('touchend', onDocumentPress, TOUCH_OPTIONS);
    doc.addEventListener('touchstart', onTouchStart, TOUCH_OPTIONS);
    doc.addEventListener('touchmove', onTouchMove, TOUCH_OPTIONS);
  }

  function removeDocumentPress() {
    var doc = getDocument();
    doc.removeEventListener('mousedown', onDocumentPress, true);
    doc.removeEventListener('touchend', onDocumentPress, TOUCH_OPTIONS);
    doc.removeEventListener('touchstart', onTouchStart, TOUCH_OPTIONS);
    doc.removeEventListener('touchmove', onTouchMove, TOUCH_OPTIONS);
  }

  function onTransitionedOut(duration, callback) {
    onTransitionEnd(duration, function () {
      if (!instance.state.isVisible && popper.parentNode && popper.parentNode.contains(popper)) {
        callback();
      }
    });
  }

  function onTransitionedIn(duration, callback) {
    onTransitionEnd(duration, callback);
  }

  function onTransitionEnd(duration, callback) {
    var box = getDefaultTemplateChildren().box;

    function listener(event) {
      if (event.target === box) {
        updateTransitionEndListener(box, 'remove', listener);
        callback();
      }
    } // Make callback synchronous if duration is 0
    // `transitionend` won't fire otherwise


    if (duration === 0) {
      return callback();
    }

    updateTransitionEndListener(box, 'remove', currentTransitionEndListener);
    updateTransitionEndListener(box, 'add', listener);
    currentTransitionEndListener = listener;
  }

  function on(eventType, handler, options) {
    if (options === void 0) {
      options = false;
    }

    var nodes = normalizeToArray(instance.props.triggerTarget || reference);
    nodes.forEach(function (node) {
      node.addEventListener(eventType, handler, options);
      listeners.push({
        node: node,
        eventType: eventType,
        handler: handler,
        options: options
      });
    });
  }

  function addListeners() {
    if (getIsCustomTouchBehavior()) {
      on('touchstart', onTrigger, {
        passive: true
      });
      on('touchend', onMouseLeave, {
        passive: true
      });
    }

    splitBySpaces(instance.props.trigger).forEach(function (eventType) {
      if (eventType === 'manual') {
        return;
      }

      on(eventType, onTrigger);

      switch (eventType) {
        case 'mouseenter':
          on('mouseleave', onMouseLeave);
          break;

        case 'focus':
          on(isIE11 ? 'focusout' : 'blur', onBlurOrFocusOut);
          break;

        case 'focusin':
          on('focusout', onBlurOrFocusOut);
          break;
      }
    });
  }

  function removeListeners() {
    listeners.forEach(function (_ref) {
      var node = _ref.node,
          eventType = _ref.eventType,
          handler = _ref.handler,
          options = _ref.options;
      node.removeEventListener(eventType, handler, options);
    });
    listeners = [];
  }

  function onTrigger(event) {
    var _lastTriggerEvent;

    var shouldScheduleClickHide = false;

    if (!instance.state.isEnabled || isEventListenerStopped(event) || didHideDueToDocumentMouseDown) {
      return;
    }

    var wasFocused = ((_lastTriggerEvent = lastTriggerEvent) == null ? void 0 : _lastTriggerEvent.type) === 'focus';
    lastTriggerEvent = event;
    currentTarget = event.currentTarget;
    handleAriaExpandedAttribute();

    if (!instance.state.isVisible && isMouseEvent(event)) {
      // If scrolling, `mouseenter` events can be fired if the cursor lands
      // over a new target, but `mousemove` events don't get fired. This
      // causes interactive tooltips to get stuck open until the cursor is
      // moved
      mouseMoveListeners.forEach(function (listener) {
        return listener(event);
      });
    } // Toggle show/hide when clicking click-triggered tooltips


    if (event.type === 'click' && (instance.props.trigger.indexOf('mouseenter') < 0 || isVisibleFromClick) && instance.props.hideOnClick !== false && instance.state.isVisible) {
      shouldScheduleClickHide = true;
    } else {
      scheduleShow(event);
    }

    if (event.type === 'click') {
      isVisibleFromClick = !shouldScheduleClickHide;
    }

    if (shouldScheduleClickHide && !wasFocused) {
      scheduleHide(event);
    }
  }

  function onMouseMove(event) {
    var target = event.target;
    var isCursorOverReferenceOrPopper = getCurrentTarget().contains(target) || popper.contains(target);

    if (event.type === 'mousemove' && isCursorOverReferenceOrPopper) {
      return;
    }

    var popperTreeData = getNestedPopperTree().concat(popper).map(function (popper) {
      var _instance$popperInsta;

      var instance = popper._tippy;
      var state = (_instance$popperInsta = instance.popperInstance) == null ? void 0 : _instance$popperInsta.state;

      if (state) {
        return {
          popperRect: popper.getBoundingClientRect(),
          popperState: state,
          props: props
        };
      }

      return null;
    }).filter(Boolean);

    if (isCursorOutsideInteractiveBorder(popperTreeData, event)) {
      cleanupInteractiveMouseListeners();
      scheduleHide(event);
    }
  }

  function onMouseLeave(event) {
    var shouldBail = isEventListenerStopped(event) || instance.props.trigger.indexOf('click') >= 0 && isVisibleFromClick;

    if (shouldBail) {
      return;
    }

    if (instance.props.interactive) {
      instance.hideWithInteractivity(event);
      return;
    }

    scheduleHide(event);
  }

  function onBlurOrFocusOut(event) {
    if (instance.props.trigger.indexOf('focusin') < 0 && event.target !== getCurrentTarget()) {
      return;
    } // If focus was moved to within the popper


    if (instance.props.interactive && event.relatedTarget && popper.contains(event.relatedTarget)) {
      return;
    }

    scheduleHide(event);
  }

  function isEventListenerStopped(event) {
    return currentInput.isTouch ? getIsCustomTouchBehavior() !== event.type.indexOf('touch') >= 0 : false;
  }

  function createPopperInstance() {
    destroyPopperInstance();
    var _instance$props2 = instance.props,
        popperOptions = _instance$props2.popperOptions,
        placement = _instance$props2.placement,
        offset = _instance$props2.offset,
        getReferenceClientRect = _instance$props2.getReferenceClientRect,
        moveTransition = _instance$props2.moveTransition;
    var arrow = getIsDefaultRenderFn() ? getChildren(popper).arrow : null;
    var computedReference = getReferenceClientRect ? {
      getBoundingClientRect: getReferenceClientRect,
      contextElement: getReferenceClientRect.contextElement || getCurrentTarget()
    } : reference;
    var tippyModifier = {
      name: '$$tippy',
      enabled: true,
      phase: 'beforeWrite',
      requires: ['computeStyles'],
      fn: function fn(_ref2) {
        var state = _ref2.state;

        if (getIsDefaultRenderFn()) {
          var _getDefaultTemplateCh = getDefaultTemplateChildren(),
              box = _getDefaultTemplateCh.box;

          ['placement', 'reference-hidden', 'escaped'].forEach(function (attr) {
            if (attr === 'placement') {
              box.setAttribute('data-placement', state.placement);
            } else {
              if (state.attributes.popper["data-popper-" + attr]) {
                box.setAttribute("data-" + attr, '');
              } else {
                box.removeAttribute("data-" + attr);
              }
            }
          });
          state.attributes.popper = {};
        }
      }
    };
    var modifiers = [{
      name: 'offset',
      options: {
        offset: offset
      }
    }, {
      name: 'preventOverflow',
      options: {
        padding: {
          top: 2,
          bottom: 2,
          left: 5,
          right: 5
        }
      }
    }, {
      name: 'flip',
      options: {
        padding: 5
      }
    }, {
      name: 'computeStyles',
      options: {
        adaptive: !moveTransition
      }
    }, tippyModifier];

    if (getIsDefaultRenderFn() && arrow) {
      modifiers.push({
        name: 'arrow',
        options: {
          element: arrow,
          padding: 3
        }
      });
    }

    modifiers.push.apply(modifiers, (popperOptions == null ? void 0 : popperOptions.modifiers) || []);
    instance.popperInstance = createPopper(computedReference, popper, Object.assign({}, popperOptions, {
      placement: placement,
      onFirstUpdate: onFirstUpdate,
      modifiers: modifiers
    }));
  }

  function destroyPopperInstance() {
    if (instance.popperInstance) {
      instance.popperInstance.destroy();
      instance.popperInstance = null;
    }
  }

  function mount() {
    var appendTo = instance.props.appendTo;
    var parentNode; // By default, we'll append the popper to the triggerTargets's parentNode so
    // it's directly after the reference element so the elements inside the
    // tippy can be tabbed to
    // If there are clipping issues, the user can specify a different appendTo
    // and ensure focus management is handled correctly manually

    var node = getCurrentTarget();

    if (instance.props.interactive && appendTo === TIPPY_DEFAULT_APPEND_TO || appendTo === 'parent') {
      parentNode = node.parentNode;
    } else {
      parentNode = invokeWithArgsOrReturn(appendTo, [node]);
    } // The popper element needs to exist on the DOM before its position can be
    // updated as Popper needs to read its dimensions


    if (!parentNode.contains(popper)) {
      parentNode.appendChild(popper);
    }

    instance.state.isMounted = true;
    createPopperInstance();
  }

  function getNestedPopperTree() {
    return arrayFrom(popper.querySelectorAll('[data-tippy-root]'));
  }

  function scheduleShow(event) {
    instance.clearDelayTimeouts();

    if (event) {
      invokeHook('onTrigger', [instance, event]);
    }

    addDocumentPress();
    var delay = getDelay(true);

    var _getNormalizedTouchSe = getNormalizedTouchSettings(),
        touchValue = _getNormalizedTouchSe[0],
        touchDelay = _getNormalizedTouchSe[1];

    if (currentInput.isTouch && touchValue === 'hold' && touchDelay) {
      delay = touchDelay;
    }

    if (delay) {
      showTimeout = setTimeout(function () {
        instance.show();
      }, delay);
    } else {
      instance.show();
    }
  }

  function scheduleHide(event) {
    instance.clearDelayTimeouts();
    invokeHook('onUntrigger', [instance, event]);

    if (!instance.state.isVisible) {
      removeDocumentPress();
      return;
    } // For interactive tippies, scheduleHide is added to a document.body handler
    // from onMouseLeave so must intercept scheduled hides from mousemove/leave
    // events when trigger contains mouseenter and click, and the tip is
    // currently shown as a result of a click.


    if (instance.props.trigger.indexOf('mouseenter') >= 0 && instance.props.trigger.indexOf('click') >= 0 && ['mouseleave', 'mousemove'].indexOf(event.type) >= 0 && isVisibleFromClick) {
      return;
    }

    var delay = getDelay(false);

    if (delay) {
      hideTimeout = setTimeout(function () {
        if (instance.state.isVisible) {
          instance.hide();
        }
      }, delay);
    } else {
      // Fixes a `transitionend` problem when it fires 1 frame too
      // late sometimes, we don't want hide() to be called.
      scheduleHideAnimationFrame = requestAnimationFrame(function () {
        instance.hide();
      });
    }
  } // ===========================================================================
  // 🔑 Public methods
  // ===========================================================================


  function enable() {
    instance.state.isEnabled = true;
  }

  function disable() {
    // Disabling the instance should also hide it
    // https://github.com/atomiks/tippy.js-react/issues/106
    instance.hide();
    instance.state.isEnabled = false;
  }

  function clearDelayTimeouts() {
    clearTimeout(showTimeout);
    clearTimeout(hideTimeout);
    cancelAnimationFrame(scheduleHideAnimationFrame);
  }

  function setProps(partialProps) {

    if (instance.state.isDestroyed) {
      return;
    }

    invokeHook('onBeforeUpdate', [instance, partialProps]);
    removeListeners();
    var prevProps = instance.props;
    var nextProps = evaluateProps(reference, Object.assign({}, prevProps, removeUndefinedProps(partialProps), {
      ignoreAttributes: true
    }));
    instance.props = nextProps;
    addListeners();

    if (prevProps.interactiveDebounce !== nextProps.interactiveDebounce) {
      cleanupInteractiveMouseListeners();
      debouncedOnMouseMove = debounce(onMouseMove, nextProps.interactiveDebounce);
    } // Ensure stale aria-expanded attributes are removed


    if (prevProps.triggerTarget && !nextProps.triggerTarget) {
      normalizeToArray(prevProps.triggerTarget).forEach(function (node) {
        node.removeAttribute('aria-expanded');
      });
    } else if (nextProps.triggerTarget) {
      reference.removeAttribute('aria-expanded');
    }

    handleAriaExpandedAttribute();
    handleStyles();

    if (onUpdate) {
      onUpdate(prevProps, nextProps);
    }

    if (instance.popperInstance) {
      createPopperInstance(); // Fixes an issue with nested tippies if they are all getting re-rendered,
      // and the nested ones get re-rendered first.
      // https://github.com/atomiks/tippyjs-react/issues/177
      // TODO: find a cleaner / more efficient solution(!)

      getNestedPopperTree().forEach(function (nestedPopper) {
        // React (and other UI libs likely) requires a rAF wrapper as it flushes
        // its work in one
        requestAnimationFrame(nestedPopper._tippy.popperInstance.forceUpdate);
      });
    }

    invokeHook('onAfterUpdate', [instance, partialProps]);
  }

  function setContent(content) {
    instance.setProps({
      content: content
    });
  }

  function show() {


    var isAlreadyVisible = instance.state.isVisible;
    var isDestroyed = instance.state.isDestroyed;
    var isDisabled = !instance.state.isEnabled;
    var isTouchAndTouchDisabled = currentInput.isTouch && !instance.props.touch;
    var duration = getValueAtIndexOrReturn(instance.props.duration, 0, defaultProps.duration);

    if (isAlreadyVisible || isDestroyed || isDisabled || isTouchAndTouchDisabled) {
      return;
    } // Normalize `disabled` behavior across browsers.
    // Firefox allows events on disabled elements, but Chrome doesn't.
    // Using a wrapper element (i.e. <span>) is recommended.


    if (getCurrentTarget().hasAttribute('disabled')) {
      return;
    }

    invokeHook('onShow', [instance], false);

    if (instance.props.onShow(instance) === false) {
      return;
    }

    instance.state.isVisible = true;

    if (getIsDefaultRenderFn()) {
      popper.style.visibility = 'visible';
    }

    handleStyles();
    addDocumentPress();

    if (!instance.state.isMounted) {
      popper.style.transition = 'none';
    } // If flipping to the opposite side after hiding at least once, the
    // animation will use the wrong placement without resetting the duration


    if (getIsDefaultRenderFn()) {
      var _getDefaultTemplateCh2 = getDefaultTemplateChildren(),
          box = _getDefaultTemplateCh2.box,
          content = _getDefaultTemplateCh2.content;

      setTransitionDuration([box, content], 0);
    }

    onFirstUpdate = function onFirstUpdate() {
      var _instance$popperInsta2;

      if (!instance.state.isVisible || ignoreOnFirstUpdate) {
        return;
      }

      ignoreOnFirstUpdate = true; // reflow
      popper.style.transition = instance.props.moveTransition;

      if (getIsDefaultRenderFn() && instance.props.animation) {
        var _getDefaultTemplateCh3 = getDefaultTemplateChildren(),
            _box = _getDefaultTemplateCh3.box,
            _content = _getDefaultTemplateCh3.content;

        setTransitionDuration([_box, _content], duration);
        setVisibilityState([_box, _content], 'visible');
      }

      handleAriaContentAttribute();
      handleAriaExpandedAttribute();
      pushIfUnique(mountedInstances, instance); // certain modifiers (e.g. `maxSize`) require a second update after the
      // popper has been positioned for the first time

      (_instance$popperInsta2 = instance.popperInstance) == null ? void 0 : _instance$popperInsta2.forceUpdate();
      invokeHook('onMount', [instance]);

      if (instance.props.animation && getIsDefaultRenderFn()) {
        onTransitionedIn(duration, function () {
          instance.state.isShown = true;
          invokeHook('onShown', [instance]);
        });
      }
    };

    mount();
  }

  function hide() {


    var isAlreadyHidden = !instance.state.isVisible;
    var isDestroyed = instance.state.isDestroyed;
    var isDisabled = !instance.state.isEnabled;
    var duration = getValueAtIndexOrReturn(instance.props.duration, 1, defaultProps.duration);

    if (isAlreadyHidden || isDestroyed || isDisabled) {
      return;
    }

    invokeHook('onHide', [instance], false);

    if (instance.props.onHide(instance) === false) {
      return;
    }

    instance.state.isVisible = false;
    instance.state.isShown = false;
    ignoreOnFirstUpdate = false;
    isVisibleFromClick = false;

    if (getIsDefaultRenderFn()) {
      popper.style.visibility = 'hidden';
    }

    cleanupInteractiveMouseListeners();
    removeDocumentPress();
    handleStyles(true);

    if (getIsDefaultRenderFn()) {
      var _getDefaultTemplateCh4 = getDefaultTemplateChildren(),
          box = _getDefaultTemplateCh4.box,
          content = _getDefaultTemplateCh4.content;

      if (instance.props.animation) {
        setTransitionDuration([box, content], duration);
        setVisibilityState([box, content], 'hidden');
      }
    }

    handleAriaContentAttribute();
    handleAriaExpandedAttribute();

    if (instance.props.animation) {
      if (getIsDefaultRenderFn()) {
        onTransitionedOut(duration, instance.unmount);
      }
    } else {
      instance.unmount();
    }
  }

  function hideWithInteractivity(event) {

    getDocument().addEventListener('mousemove', debouncedOnMouseMove);
    pushIfUnique(mouseMoveListeners, debouncedOnMouseMove);
    debouncedOnMouseMove(event);
  }

  function unmount() {

    if (instance.state.isVisible) {
      instance.hide();
    }

    if (!instance.state.isMounted) {
      return;
    }

    destroyPopperInstance(); // If a popper is not interactive, it will be appended outside the popper
    // tree by default. This seems mainly for interactive tippies, but we should
    // find a workaround if possible

    getNestedPopperTree().forEach(function (nestedPopper) {
      nestedPopper._tippy.unmount();
    });

    if (popper.parentNode) {
      popper.parentNode.removeChild(popper);
    }

    mountedInstances = mountedInstances.filter(function (i) {
      return i !== instance;
    });
    instance.state.isMounted = false;
    invokeHook('onHidden', [instance]);
  }

  function destroy() {

    if (instance.state.isDestroyed) {
      return;
    }

    instance.clearDelayTimeouts();
    instance.unmount();
    removeListeners();
    delete reference._tippy;
    instance.state.isDestroyed = true;
    invokeHook('onDestroy', [instance]);
  }
}

function tippy(targets, optionalProps) {
  if (optionalProps === void 0) {
    optionalProps = {};
  }

  var plugins = defaultProps.plugins.concat(optionalProps.plugins || []);

  bindGlobalEventListeners();
  var passedProps = Object.assign({}, optionalProps, {
    plugins: plugins
  });
  var elements = getArrayOfElements(targets);

  var instances = elements.reduce(function (acc, reference) {
    var instance = reference && createTippy(reference, passedProps);

    if (instance) {
      acc.push(instance);
    }

    return acc;
  }, []);
  return isElement(targets) ? instances[0] : instances;
}

tippy.defaultProps = defaultProps;
tippy.setDefaultProps = setDefaultProps;
tippy.currentInput = currentInput;
var hideAll = function hideAll(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      excludedReferenceOrInstance = _ref.exclude,
      duration = _ref.duration;

  mountedInstances.forEach(function (instance) {
    var isExcluded = false;

    if (excludedReferenceOrInstance) {
      isExcluded = isReferenceElement(excludedReferenceOrInstance) ? instance.reference === excludedReferenceOrInstance : instance.popper === excludedReferenceOrInstance.popper;
    }

    if (!isExcluded) {
      var originalDuration = instance.props.duration;
      instance.setProps({
        duration: duration
      });
      instance.hide();

      if (!instance.state.isDestroyed) {
        instance.setProps({
          duration: originalDuration
        });
      }
    }
  });
};

// every time the popper is destroyed (i.e. a new target), removing the styles
// and causing transitions to break for singletons when the console is open, but
// most notably for non-transform styles being used, `gpuAcceleration: false`.

Object.assign({}, applyStyles$1, {
  effect: function effect(_ref) {
    var state = _ref.state;
    var initialStyles = {
      popper: {
        position: state.options.strategy,
        left: '0',
        top: '0',
        margin: '0'
      },
      arrow: {
        position: 'absolute'
      },
      reference: {}
    };
    Object.assign(state.elements.popper.style, initialStyles.popper);
    state.styles = initialStyles;

    if (state.elements.arrow) {
      Object.assign(state.elements.arrow.style, initialStyles.arrow);
    } // intentionally return no cleanup function
    // return () => { ... }

  }
});

tippy.setDefaultProps({
  render: render
});

/**
 * Creates an array with all falsey values removed. The values `false`, `null`,
 * `0`, `""`, `undefined`, and `NaN` are falsey.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to compact.
 * @returns {Array} Returns the new array of filtered values.
 * @example
 *
 * _.compact([0, 1, false, 2, '', 3]);
 * // => [1, 2, 3]
 */
function compact(array) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (value) {
      result[resIndex++] = value;
    }
  }
  return result;
}

function fetchAjax(obj) {
  state$1.isProcessing = true;
  // @ts-ignore
  // eslint-disable-next-line no-undef
  const streamline = window.streamline || false;
  fetch(streamline.ajax, {
    method: 'POST',
    credentials: 'same-origin',
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
    body: `action=streamlineQuery&type=${obj.type}&query=${JSON.stringify(obj.query
    // @ts-ignore
    // eslint-disable-next-line no-undef
    )}&nonce=${streamline.nonce}&userId=${String(state$1.data.userId)}`,
  })
    .then((response) => response && response.json())
    .then(() => {
    state$1.isProcessing = false;
    obj.callback && obj.callback();
  })
    .catch(() => {
    console.log();
  });
}

function setFavourite(obj) {
  const arr = [...state$1.entriesFav];
  const filter = filterDeep(state$1[`entries${capitalizeFirstLetter(obj.type)}`], (o) => obj.filter(o), {
    childrenPath: ['children'],
  });
  if (!obj.favourite) {
    const path = findDeep(state$1.entriesFav, (o) => obj.path(o), {
      childrenPath: ['children'],
    });
    const index = path === null || path === void 0 ? void 0 : path.key;
    if (state$1.entriesFav.length === 0) {
      const mergeArr = [...merge(state$1.entriesFav, filter)];
      state$1.entriesFav = mergeArr;
      state$1.entriesFavActive = mergeArr;
    }
    else if (!path) {
      const mergeArr = [...arr, filter[0]];
      state$1.entriesFav = mergeArr;
      state$1.entriesFavActive = mergeArr;
    }
    else {
      const mergeArr = merge([
        Object.assign({}, arr[index]),
      ], filter);
      arr[index] = mergeArr[0];
      state$1.entriesFav = arr;
      state$1.entriesFavActive = arr;
    }
  }
  else {
    const path = findDeep(state$1.entriesFav, (o) => obj.pathFav(o), {
      childrenPath: ['children'],
    });
    const currentPath = path.context['_item'].strPath;
    unset(arr, currentPath);
    const parentPath = path.context['_item'].parent.path;
    const parentChildrenLength = Object.values(get(state$1.entriesFav, `${parentPath}.children`)).length;
    if (parentChildrenLength === 0) {
      unset(arr, parentPath);
    }
    const topPath = path.context['_item'].parent.parent.path;
    const topChildrenLength = topPath
      ? Object.values(get(state$1.entriesFav, `${topPath}.children`))
        .length
      : false;
    if (topChildrenLength === 0) {
      unset(arr, topPath);
    }
    const removeArr = arr.length === 1 && arr[0] === undefined ? [] : [...compact(arr)];
    state$1.entriesFav = removeArr;
    state$1.entriesFavActive = removeArr;
    setEntries();
  }
  // console.log(stateInternal.entriesFav);
  if (!state$1.test) {
    fetchAjax({
      type: 'favourites',
      query: state$1.entriesFav,
    });
  }
  obj.callback && obj.callback();
  hideAll();
}

// eslint-disable-next-line no-unused-vars
function Heart(props) {
    return (h("svg", { class: `${props.type === "sidebar" ? `h-[14px] relative -mr-px fill-current` : ``}`, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512", style: {
            width: props.type ? "" : "8px",
            height: props.type ? "" : "8px",
        } }, h("path", { fill: "currentColor", d: "M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" })));
}

// eslint-disable-next-line no-unused-vars
function Fav(props) {
    return (h("span", { class: `${props.class} rounded-full w-4 h-4 text-red-500 pointer-events-none bg-white flex items-center justify-center border border-blue-gray-200` }, h("span", { class: `h-full w-full flex items-center justify-center` }, h(Heart, null))));
}

// eslint-disable-next-line no-unused-vars
function Loader(props) {
    return (h("svg", { xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", focusable: "false", "data-prefix": "far", "data-icon": "spinner-third", class: `${props.sm ? `h-6 w-6 sm:h-7 sm:w-7` : "w-10 h-10"} animate-spin`, role: "img", viewBox: "0 0 512 512" }, h("path", { fill: "currentColor", d: "M460.116 373.846l-20.823-12.022c-5.541-3.199-7.54-10.159-4.663-15.874 30.137-59.886 28.343-131.652-5.386-189.946-33.641-58.394-94.896-95.833-161.827-99.676C261.028 55.961 256 50.751 256 44.352V20.309c0-6.904 5.808-12.337 12.703-11.982 83.556 4.306 160.163 50.864 202.11 123.677 42.063 72.696 44.079 162.316 6.031 236.832-3.14 6.148-10.75 8.461-16.728 5.01z" })));
}

// eslint-disable-next-line no-unused-vars
function IconWordPress() {
    return (h("svg", { class: `w-8 h-8 sm:w-10 sm:h-10`, xmlns: "http://www.w3.org/2000/svg", viewBox: "-2 -2 24 24" }, h("path", { d: "M20 10c0-5.51-4.49-10-10-10C4.48 0 0 4.49 0 10c0 5.52 4.48 10 10 10 5.51 0 10-4.48 10-10zM7.78 15.37L4.37 6.22c.55-.02 1.17-.08 1.17-.08.5-.06.44-1.13-.06-1.11 0 0-1.45.11-2.37.11-.18 0-.37 0-.58-.01C4.12 2.69 6.87 1.11 10 1.11c2.33 0 4.45.87 6.05 2.34-.68-.11-1.65.39-1.65 1.58 0 .74.45 1.36.9 2.1.35.61.55 1.36.55 2.46 0 1.49-1.4 5-1.4 5l-3.03-8.37c.54-.02.82-.17.82-.17.5-.05.44-1.25-.06-1.22 0 0-1.44.12-2.38.12-.87 0-2.33-.12-2.33-.12-.5-.03-.56 1.2-.06 1.22l.92.08 1.26 3.41zM17.41 10c.24-.64.74-1.87.43-4.25.7 1.29 1.05 2.71 1.05 4.25 0 3.29-1.73 6.24-4.4 7.78.97-2.59 1.94-5.2 2.92-7.78zM6.1 18.09C3.12 16.65 1.11 13.53 1.11 10c0-1.3.23-2.48.72-3.59C3.25 10.3 4.67 14.2 6.1 18.09zm4.03-6.63l2.58 6.98c-.86.29-1.76.45-2.71.45-.79 0-1.57-.11-2.29-.33.81-2.38 1.62-4.74 2.42-7.1z" })));
}
function IconMenu() {
    return (h("svg", { xmlns: "http://www.w3.org/2000/svg", class: `h-[16px]`, viewBox: "0 0 512 512" }, h("path", { fill: "currentColor", d: "M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z" })));
}
function IconPost() {
    return (h("svg", { class: `h-[14px]`, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" }, h("path", { fill: "currentColor", d: "M512 0C460.22 3.56 96.44 38.2 71.01 287.61c-3.09 26.66-4.84 53.44-5.99 80.24l178.87-178.69c6.25-6.25 16.4-6.25 22.65 0s6.25 16.38 0 22.63L7.04 471.03c-9.38 9.37-9.38 24.57 0 33.94 9.38 9.37 24.59 9.37 33.98 0l57.13-57.07c42.09-.14 84.15-2.53 125.96-7.36 53.48-5.44 97.02-26.47 132.58-56.54H255.74l146.79-48.88c11.25-14.89 21.37-30.71 30.45-47.12h-81.14l106.54-53.21C500.29 132.86 510.19 26.26 512 0z" })));
}
function IconSettings() {
    return (h("svg", { class: `h-[14px]`, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" }, h("path", { fill: "currentColor", d: "M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z" })));
}
function IconFlow() {
    return (h("svg", { class: `h-[14px]`, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24" }, h("path", { d: "M19.75 9c0-1.257-.565-2.197-1.39-2.858-.797-.64-1.827-1.017-2.815-1.247-1.802-.42-3.703-.403-4.383-.396L11 4.5V6l.177-.001c.696-.006 2.416-.02 4.028.356.887.207 1.67.518 2.216.957.52.416.829.945.829 1.688 0 .592-.167.966-.407 1.23-.255.281-.656.508-1.236.674-1.19.34-2.82.346-4.607.346h-.077c-1.692 0-3.527 0-4.942.404-.732.209-1.424.545-1.935 1.108-.526.579-.796 1.33-.796 2.238 0 1.257.565 2.197 1.39 2.858.797.64 1.827 1.017 2.815 1.247 1.802.42 3.703.403 4.383.396L13 19.5h.714V22L18 18.5 13.714 15v3H13l-.177.001c-.696.006-2.416.02-4.028-.356-.887-.207-1.67-.518-2.216-.957-.52-.416-.829-.945-.829-1.688 0-.592.167-.966.407-1.23.255-.281.656-.508 1.237-.674 1.189-.34 2.819-.346 4.606-.346h.077c1.692 0 3.527 0 4.941-.404.732-.209 1.425-.545 1.936-1.108.526-.579.796-1.33.796-2.238z" })));
}
function IconPen() {
    return (h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" }, h("path", { fill: "currentColor", d: "M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z" })));
}
function IconTimes() {
    return (h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 320 512" }, h("path", { fill: "currentColor", d: "M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z" })));
}

const streamlineButtonCss = ".tippy-box[data-animation=fade][data-state=hidden]{opacity:0}[data-tippy-root]{max-width:calc(100vw - 10px)}.tippy-box{background-color:#333;background:#0f172a;border-radius:4px;border-radius:0!important;color:#fff;font-size:14px;line-height:1.4;outline:0;position:relative;transition-property:transform,visibility,opacity;white-space:normal}.tippy-box[data-placement^=top]>.tippy-arrow{bottom:0}.tippy-box[data-placement^=top]>.tippy-arrow:before{border-top-color:initial;border-width:8px 8px 0;bottom:-7px;left:0;transform-origin:center top}.tippy-box[data-placement^=bottom]>.tippy-arrow{top:0}.tippy-box[data-placement^=bottom]>.tippy-arrow:before{border-bottom-color:initial;border-width:0 8px 8px;left:0;top:-7px;transform-origin:center bottom}.tippy-box[data-placement^=left]>.tippy-arrow{right:0}.tippy-box[data-placement^=left]>.tippy-arrow:before{border-left-color:initial;border-width:8px 0 8px 8px;right:-7px;transform-origin:center left}.tippy-box[data-placement^=right]>.tippy-arrow{left:0}.tippy-box[data-placement^=right]>.tippy-arrow:before{border-right-color:initial;border-width:8px 8px 8px 0;left:-7px;transform-origin:center right}.tippy-box[data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.54,1.5,.38,1.11)}.tippy-arrow{color:#333;height:16px;width:16px}.tippy-arrow:before{border-color:transparent;border-style:solid;content:\"\";position:absolute}.tippy-content{padding:0;position:relative;z-index:1}:host{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;box-sizing:border-box;display:inline-block}:host .focus:focus{box-shadow:inset 0 0 0 4px #f8fafc,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-border:focus{border-color:var(--sl-focus-color);box-shadow:0 0 0 1px var(--sl-focus-color);outline:none!important}:host .focus-out:focus{box-shadow:0 0 0 2px #f8fafc,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-dark:focus{box-shadow:inset 0 0 0 4px #0f172a,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-darker:focus{box-shadow:inset 0 0 0 4px #020204,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-white:focus{box-shadow:inset 0 0 0 4px #fff,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-white-out:focus{box-shadow:0 0 0 2px #fff,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-in-white-out:focus-within{box-shadow:0 0 0 2px #fff,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-none:focus{box-shadow:none!important;outline:none!important}:host .border-invalid{border-color:var(--sl-focus-color-invalid);box-shadow:0 0 0 1px var(--sl-focus-color-invalid);outline:none!important}.tippy-box .tippy-arrow{color:#0f172a}/*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{--tw-blur:var(--tw-empty,/*!*/ /*!*/);--tw-brightness:var(--tw-empty,/*!*/ /*!*/);--tw-contrast:var(--tw-empty,/*!*/ /*!*/);--tw-grayscale:var(--tw-empty,/*!*/ /*!*/);--tw-hue-rotate:var(--tw-empty,/*!*/ /*!*/);--tw-invert:var(--tw-empty,/*!*/ /*!*/);--tw-saturate:var(--tw-empty,/*!*/ /*!*/);--tw-sepia:var(--tw-empty,/*!*/ /*!*/);--tw-drop-shadow:var(--tw-empty,/*!*/ /*!*/);--tw-filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);--tw-border-opacity:1;border:0 solid;border:0 solid rgba(228,228,231,var(--tw-border-opacity));box-sizing:border-box}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}a{color:inherit;text-decoration:inherit}.visible{visibility:visible}.inline-block{display:inline-block}.h-\\[max-content\\]{height:-webkit-max-content;height:-moz-max-content;height:max-content}.bg-blue-gray-200{--tw-bg-opacity:1;background-color:rgba(226,232,240,var(--tw-bg-opacity))}.px-2\\.5{padding-left:.625rem;padding-right:.625rem}.py-1\\.5{padding-bottom:.375rem;padding-top:.375rem}.px-2{padding-left:.5rem;padding-right:.5rem}.py-1{padding-bottom:.25rem;padding-top:.25rem}.text-blue-gray-500{--tw-text-opacity:1;color:rgba(100,116,139,var(--tw-text-opacity))}.blur{--tw-blur:blur(8px);filter:var(--tw-filter)}/*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */.pointer-events-none{pointer-events:none}.flex{display:flex}.h-4{height:1rem}.h-full{height:100%}.w-4{width:1rem}.w-full{width:100%}.items-center{align-items:center}.justify-center{justify-content:center}.rounded-full{border-radius:9999px}.border{border-width:1px}.border-blue-gray-200{--tw-border-opacity:1;border-color:rgba(226,232,240,var(--tw-border-opacity))}.bg-white{--tw-bg-opacity:1;background-color:rgba(255,255,255,var(--tw-bg-opacity))}.text-red-500{--tw-text-opacity:1;color:rgba(239,68,68,var(--tw-text-opacity))}/*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize *//*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */img{border-style:solid;height:auto;max-width:100%}img,svg{display:block;vertical-align:middle}.h-6{height:1.5rem}.h-10{height:2.5rem}.w-6{width:1.5rem}.w-10{width:2.5rem}.animate-spin{-webkit-animation:spin 1s linear infinite;animation:spin 1s linear infinite}/*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */svg{display:block;vertical-align:middle}.relative{position:relative}.-mr-px{margin-right:-1px}.h-\\[14px\\]{height:14px}.fill-current{fill:currentColor}/*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize *//*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize *//*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize *//*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize *//*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */@media (min-width:640px){.sm\\:h-7{height:1.75rem}.sm\\:w-7{width:1.75rem}}";

let StreamlineButton$1 = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        // @ts-ignore
        this.tw = "animate-spin h-[16px] h-[14px] w-8 h-8 sm:w-10 sm:h-10";
        // eslint-disable-next-line @stencil/strict-mutable
        this.favourite = false;
        this.handleClickFav = () => {
            setFavourite({
                favourite: this.favourite,
                callback: this.checkIfFav,
                type: "menu",
                filter: (o) => {
                    return o.href === this.href && o.adminUrl === this.adminUrl;
                },
                path: (o) => {
                    return o.type === this.typeSub && o.siteId === this.siteId;
                },
                pathFav: (o) => {
                    return o.path === this.path && o.siteId === this.siteId;
                },
            });
        };
        this.checkIfFav = () => {
            this.favourite = someDeep(state$1.entriesFav, (o) => {
                return (o === null || o === void 0 ? void 0 : o.path) === this.path && (o === null || o === void 0 ? void 0 : o.siteId) === this.siteId;
            }, { childrenPath: ["children"] });
        };
    }
    componentWillRender() {
        if (this.type === "menu") {
            this.checkIfFav();
        }
    }
    componentDidLoad() {
        const hideOnPopperBlur = {
            name: "hideOnPopperBlur",
            defaultValue: true,
            fn(instance) {
                return {
                    onCreate() {
                        instance.popper.addEventListener("focusout", (event) => {
                            if (instance.props.hideOnPopperBlur &&
                                event.relatedTarget &&
                                !instance.popper.contains(event.relatedTarget)) {
                                instance.hide();
                            }
                        });
                    },
                };
            },
        };
        if (this.type === "menu" && this.link) {
            const template = this.tooltip;
            template.style.display = "block";
            tippy(this.link, {
                content: template,
                interactive: true,
                plugins: [hideOnPopperBlur],
                delay: [500, null],
            });
        }
    }
    render() {
        const className = `select-none break-words w-[max-content] underline-none cursor-pointer text-center whitespace-no-wrap ${this.type === "menu"
            ? `text-sm px-3 py-2.5 leading-none border border-blue-gray-200 bg-blue-gray-50 text-blue-600 hover:border-blue-600`
            : this.type === "sidebar" || this.type === "primary"
                ? `h-[calc(var(--sl-side-w))] w-[calc(var(--sl-side-w))] flex flex-col items-center justify-center p-0 text-white bg-transparent lg:h-[64px] ${this.type === "primary"
                    ? `focus-darker bg-[#020204] text-white fill-current h-[var(--sl-side-w)] hover:bg-[#080d17]`
                    : this.type === "sidebar" &&
                        `!grid focus-dark ${this.icon !== "settings"
                            ? "sm:!grid-rows-[20px,20px] lg:!grid-rows-1 lg:grid-cols-[30px,1fr] lg:h-[48px] lg:p-4"
                            : ""} !justify-items-center !content-center text-blue-gray-200 hover:bg-blue-gray-800 lg:!justify-items-start ${state.active === this.icon
                            ? "bg-blue-gray-800 pointer-events-none"
                            : ""}`}`
                : ""}`;
        const classNameText = `${this.type === "sidebar"
            ? "hidden sm:inline-block text-xs font-semibold leading-1 mt-1.5 lg:mt-0 lg:text-sm"
            : ""}`;
        const icon = this.icon === "wordpress" ? (h(IconWordPress, null)) : this.icon === "menu" ? (h(IconMenu, null)) : this.icon === "post" ? (h(IconPost, null)) : this.icon === "flow" ? (h(IconFlow, null)) : this.icon === "settings" ? (h(IconSettings, null)) : (this.icon === "fav" && h(Heart, { type: this.type }));
        const text = this.text && h("span", { class: classNameText }, this.text);
        return (h("div", { class: `relative flex ${this.type === "primary" ? "w-[calc(var(--sl-side-w)+1px)]" : "w-full"} ${this.invalid ? "opacity-25 pointer-events-none" : ""}` }, this.type === "menu" && this.href ? (h("a", { ref: (el) => (this.link = el), href: !state$1.test ? this.href : "#", class: className + ` focus-out` }, icon, text, this.favourite && state.active !== "fav" && (h(Fav, { class: `absolute -top-1.5 -right-2` })))) : this.type === "sidebar" || this.type === "primary" ? (h("button", { tabIndex: state.active === this.icon ? -1 : 0, class: className }, this.type === "primary" ? (state$1.isProcessing ? (h(Loader, { sm: true })) : (icon)) : (icon), this.icon === "settings" ? "" : text)) : (h("button", { class: `select-none focus-out inline-flex items-center uppercase font-semibold text-xs ${this.styling === "primary"
                ? "px-2.5 py-2 bg-blue-500 border-blue-500 text-white hover:bg-blue-600 hover:border-blue-600 sm:px-3.5"
                : "px-2 py-1 bg-white border border-blue-gray-200 text-blue-gray-600 hover:text-blue-gray-50 hover:bg-blue-gray-900 hover:border-blue-gray-900 sm:px-3 sm:py-1.5"}` }, this.text === "Search" && (h("svg", { xmlns: "http://www.w3.org/2000/svg", class: `fill-current w-2 rotate-90 ml-1 mr-2 origin-right-center`, viewBox: "0 0 320 512" }, h("path", { fill: "currentColor", d: "M296.64 412.326l-96.16 96.16c-4.686 4.687-12.285 4.686-16.97 0L87.354 412.33c-7.536-7.536-2.198-20.484 8.485-20.485l68.161-.002V56H64a11.996 11.996 0 0 1-8.485-3.515l-32-32C15.955 12.926 21.309 0 32 0h164c13.255 0 24 10.745 24 24v367.842l68.154-.001c10.626-.001 16.066 12.905 8.486 20.485z" }))), this.text)), this.type === "menu" && (h("div", { class: `!grid divide-x divide-blue-gray-200 auto-cols-max grid-flow-col`, ref: (el) => (this.tooltip = el), style: { display: "block" } }, [
            {
                onClick: this.handleClickFav,
                condition: this.favourite,
            },
        ].map((item) => {
            return (h("button", { class: `border-none focus-dark`, onClick: item.onClick }, h("span", { class: `w-8 h-8 flex items-center justify-center ${item.condition ? "text-red-500" : ""}` }, h(Heart, null))));
        })))));
    }
    static get style() { return streamlineButtonCss + '/*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-transform:translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));--tw-border-opacity:1;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-blur:var(--tw-empty,/*!*/ /*!*/);--tw-brightness:var(--tw-empty,/*!*/ /*!*/);--tw-contrast:var(--tw-empty,/*!*/ /*!*/);--tw-grayscale:var(--tw-empty,/*!*/ /*!*/);--tw-hue-rotate:var(--tw-empty,/*!*/ /*!*/);--tw-invert:var(--tw-empty,/*!*/ /*!*/);--tw-saturate:var(--tw-empty,/*!*/ /*!*/);--tw-sepia:var(--tw-empty,/*!*/ /*!*/);--tw-drop-shadow:var(--tw-empty,/*!*/ /*!*/);--tw-filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);border:0 solid;border-color:rgba(228,228,231,var(--tw-border-opacity));box-sizing:border-box}button{background-color:transparent;background-image:none;color:inherit;cursor:pointer;font-family:inherit;font-size:100%;line-height:1.15;line-height:inherit;margin:0;padding:0;text-transform:none}[type=button],button{-webkit-appearance:button}a{color:inherit;text-decoration:inherit}svg{display:block;vertical-align:middle}[hidden]{display:none}.pointer-events-none{pointer-events:none}.absolute{position:absolute}.relative{position:relative}.-top-1\\.5{top:-.375rem}.-right-2{right:-.5rem}.-top-1{top:-.25rem}.mt-1\\.5{margin-top:.375rem}.mt-1{margin-top:.25rem}.ml-1{margin-left:.25rem}.mr-2{margin-right:.5rem}.block{display:block}.flex{display:flex}.inline-flex{display:inline-flex}.\\!grid{display:grid!important}.hidden{display:none}.h-\\[16px\\]{height:16px}.h-\\[14px\\]{height:14px}.h-8{height:2rem}.h-\\[calc\\(var\\(--sl-side-w\\)\\)\\]{height:calc(var(--sl-side-w))}.h-\\[var\\(--sl-side-w\\)\\]{height:var(--sl-side-w)}.w-8{width:2rem}.w-\\[max-content\\]{width:-webkit-max-content;width:-moz-max-content;width:max-content}.w-\\[calc\\(var\\(--sl-side-w\\)\\)\\]{width:calc(var(--sl-side-w))}.w-\\[calc\\(var\\(--sl-side-w\\)\\+1px\\)\\]{width:calc(var(--sl-side-w) + 1px)}.w-full{width:100%}.w-2{width:.5rem}.rotate-90{--tw-rotate:90deg;transform:var(--tw-transform)}@-webkit-keyframes spin{to{transform:rotate(1turn)}}@keyframes spin{to{transform:rotate(1turn)}}.animate-spin{-webkit-animation:spin 1s linear infinite;animation:spin 1s linear infinite}.cursor-pointer{cursor:pointer}.select-none{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.auto-cols-max{grid-auto-columns:-webkit-max-content;grid-auto-columns:max-content}.grid-flow-col{grid-auto-flow:column}.flex-col{flex-direction:column}.\\!content-center{align-content:center!important}.items-center{align-items:center}.justify-center{justify-content:center}.\\!justify-items-center{justify-items:center!important}.divide-x>:not([hidden])~:not([hidden]){--tw-divide-x-reverse:0;border-left-width:calc(1px*(1 - var(--tw-divide-x-reverse)));border-right-width:calc(1px*var(--tw-divide-x-reverse))}.divide-blue-gray-200>:not([hidden])~:not([hidden]){--tw-divide-opacity:1;border-color:rgba(226,232,240,var(--tw-divide-opacity))}.break-words{overflow-wrap:break-word}.border{border-width:1px}.border-none{border-style:none}.border-blue-gray-200{--tw-border-opacity:1;border-color:rgba(226,232,240,var(--tw-border-opacity))}.border-blue-500{--tw-border-opacity:1;border-color:rgba(59,130,246,var(--tw-border-opacity))}.bg-blue-gray-50{--tw-bg-opacity:1;background-color:rgba(248,250,252,var(--tw-bg-opacity))}.bg-transparent{background-color:transparent}.bg-\\[\\#020204\\]{--tw-bg-opacity:1;background-color:rgba(2,2,4,var(--tw-bg-opacity))}.bg-blue-gray-800{--tw-bg-opacity:1;background-color:rgba(30,41,59,var(--tw-bg-opacity))}.bg-blue-500{--tw-bg-opacity:1;background-color:rgba(59,130,246,var(--tw-bg-opacity))}.bg-white{--tw-bg-opacity:1;background-color:rgba(255,255,255,var(--tw-bg-opacity))}.fill-current{fill:currentColor}.p-0{padding:0}.px-3{padding-left:.75rem;padding-right:.75rem}.py-2\\.5{padding-bottom:.625rem;padding-top:.625rem}.py-2{padding-bottom:.5rem;padding-top:.5rem}.px-2\\.5{padding-left:.625rem;padding-right:.625rem}.px-2{padding-left:.5rem;padding-right:.5rem}.py-1{padding-bottom:.25rem;padding-top:.25rem}.text-center{text-align:center}.text-sm{font-size:.875rem;line-height:1.25rem}.text-xs{font-size:.75rem;line-height:1rem}.font-semibold{font-weight:600}.uppercase{text-transform:uppercase}.leading-none{line-height:1}.text-blue-600{--tw-text-opacity:1;color:rgba(37,99,235,var(--tw-text-opacity))}.text-white{--tw-text-opacity:1;color:rgba(255,255,255,var(--tw-text-opacity))}.text-blue-gray-200{--tw-text-opacity:1;color:rgba(226,232,240,var(--tw-text-opacity))}.text-blue-gray-600{--tw-text-opacity:1;color:rgba(71,85,105,var(--tw-text-opacity))}.text-red-500{--tw-text-opacity:1;color:rgba(239,68,68,var(--tw-text-opacity))}.opacity-25{opacity:.25}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.filter{filter:var(--tw-filter)}.hover\\:border-blue-600:hover{--tw-border-opacity:1;border-color:rgba(37,99,235,var(--tw-border-opacity))}.hover\\:border-blue-gray-900:hover{--tw-border-opacity:1;border-color:rgba(15,23,42,var(--tw-border-opacity))}.hover\\:bg-\\[\\#080d17\\]:hover{--tw-bg-opacity:1;background-color:rgba(8,13,23,var(--tw-bg-opacity))}.hover\\:bg-blue-gray-800:hover{--tw-bg-opacity:1;background-color:rgba(30,41,59,var(--tw-bg-opacity))}.hover\\:bg-blue-600:hover{--tw-bg-opacity:1;background-color:rgba(37,99,235,var(--tw-bg-opacity))}.hover\\:bg-blue-gray-900:hover{--tw-bg-opacity:1;background-color:rgba(15,23,42,var(--tw-bg-opacity))}.hover\\:text-blue-gray-50:hover{--tw-text-opacity:1;color:rgba(248,250,252,var(--tw-text-opacity))}@media (min-width:640px){.sm\\:inline-block{display:inline-block}.sm\\:h-10{height:2.5rem}.sm\\:w-10{width:2.5rem}.sm\\:\\!grid-rows-\\[20px\\2c 20px\\]{grid-template-rows:20px 20px!important}.sm\\:px-3\\.5{padding-left:.875rem;padding-right:.875rem}.sm\\:px-3{padding-left:.75rem;padding-right:.75rem}.sm\\:py-1\\.5{padding-bottom:.375rem;padding-top:.375rem}.sm\\:py-1{padding-bottom:.25rem;padding-top:.25rem}}@media (min-width:1024px){.lg\\:mt-0{margin-top:0}.lg\\:h-\\[64px\\]{height:64px}.lg\\:h-\\[48px\\]{height:48px}.lg\\:grid-cols-\\[30px\\2c 1fr\\]{grid-template-columns:30px 1fr}.lg\\:\\!grid-rows-1{grid-template-rows:repeat(1,minmax(0,1fr))!important}.lg\\:\\!justify-items-start{justify-items:start!important}.lg\\:p-4{padding:1rem}.lg\\:text-sm{font-size:.875rem;line-height:1.25rem}}'; }
};

function setTestData() {
  const menu = [
    {
      adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
      children: {
        Dashboard: {
          index: 0,
          name: 'Dashboard',
          children: {
            'index.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/index.php',
              index: 0,
              name: 'Home',
              nameParent: 'Dashboard',
              path: 'index.php',
              siteId: 314,
              type: 'menu',
            },
            'index.php?page=relevanssi/relevanssi.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/index.php?page=relevanssi/relevanssi.php',
              index: 1,
              name: 'User searches',
              nameParent: 'Dashboard',
              path: 'index.php?page=relevanssi/relevanssi.php',
              siteId: 314,
              type: 'menu',
            },
            'index.php?page=relevanssi_admin_search': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/index.php?page=relevanssi_admin_search',
              index: 2,
              name: 'Admin search',
              nameParent: 'Dashboard',
              path: 'index.php?page=relevanssi_admin_search',
              siteId: 314,
              type: 'menu',
            },
          },
        },
        Posts: {
          index: 1,
          name: 'Posts',
          children: {
            'edit.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/edit.php',
              index: 0,
              name: 'All Posts',
              nameParent: 'Posts',
              path: 'edit.php',
              siteId: 314,
              type: 'menu',
            },
            'post-new.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/post-new.php',
              index: 1,
              name: 'Add New',
              nameParent: 'Posts',
              path: 'post-new.php',
              siteId: 314,
              type: 'menu',
            },
            'edit-tags.php?taxonomy=category': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/edit-tags.php?taxonomy=category',
              index: 2,
              name: 'Categories',
              nameParent: 'Posts',
              path: 'edit-tags.php?taxonomy=category',
              siteId: 314,
              type: 'menu',
            },
            'edit-tags.php?taxonomy=post_tag': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/edit-tags.php?taxonomy=post_tag',
              index: 3,
              name: 'Tags',
              nameParent: 'Posts',
              path: 'edit-tags.php?taxonomy=post_tag',
              siteId: 314,
              type: 'menu',
            },
          },
        },
        Media: {
          index: 2,
          name: 'Media',
          children: {
            'upload.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/upload.php',
              index: 0,
              name: 'Library',
              nameParent: 'Media',
              path: 'upload.php',
              siteId: 314,
              type: 'menu',
            },
            'media-new.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/media-new.php',
              index: 1,
              name: 'Add New',
              nameParent: 'Media',
              path: 'media-new.php',
              siteId: 314,
              type: 'menu',
            },
          },
        },
        Pages: {
          index: 3,
          name: 'Pages',
          children: {
            'edit.php?post_type=page': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/edit.php?post_type=page',
              index: 0,
              name: 'All Pages',
              nameParent: 'Pages',
              path: 'edit.php?post_type=page',
              siteId: 314,
              type: 'menu',
            },
            'post-new.php?post_type=page': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/post-new.php?post_type=page',
              index: 1,
              name: 'Add New',
              nameParent: 'Pages',
              path: 'post-new.php?post_type=page',
              siteId: 314,
              type: 'menu',
            },
          },
        },
        Downloads: {
          index: 4,
          name: 'Downloads',
          children: {
            'edit.php?post_type=download': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/edit.php?post_type=download',
              index: 0,
              name: 'All Downloads',
              nameParent: 'Downloads',
              path: 'edit.php?post_type=download',
              siteId: 314,
              type: 'menu',
            },
            'post-new.php?post_type=download': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/post-new.php?post_type=download',
              index: 1,
              name: 'Add New',
              nameParent: 'Downloads',
              path: 'post-new.php?post_type=download',
              siteId: 314,
              type: 'menu',
            },
            'edit-tags.php?taxonomy=download_category&post_type=download': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/edit-tags.php?taxonomy=download_category&post_type=download',
              index: 2,
              name: 'Categories',
              nameParent: 'Downloads',
              path: 'edit-tags.php?taxonomy=download_category&post_type=download',
              siteId: 314,
              type: 'menu',
            },
            'edit-tags.php?taxonomy=download_tag&post_type=download': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/edit-tags.php?taxonomy=download_tag&post_type=download',
              index: 3,
              name: 'Tags',
              nameParent: 'Downloads',
              path: 'edit-tags.php?taxonomy=download_tag&post_type=download',
              siteId: 314,
              type: 'menu',
            },
            'edit.php?post_type=download&page=edd-payment-history': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/edit.php?post_type=download&page=edd-payment-history',
              index: 4,
              name: 'Payment History',
              nameParent: 'Downloads',
              path: 'edit.php?post_type=download&page=edd-payment-history',
              siteId: 314,
              type: 'menu',
            },
            'edit.php?post_type=download&page=edd-customers': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/edit.php?post_type=download&page=edd-customers',
              index: 5,
              name: 'Customers',
              nameParent: 'Downloads',
              path: 'edit.php?post_type=download&page=edd-customers',
              siteId: 314,
              type: 'menu',
            },
            'edit.php?post_type=download&page=edd-discounts': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/edit.php?post_type=download&page=edd-discounts',
              index: 6,
              name: 'Discount Codes',
              nameParent: 'Downloads',
              path: 'edit.php?post_type=download&page=edd-discounts',
              siteId: 314,
              type: 'menu',
            },
            'edit.php?post_type=download&page=edd-reports': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/edit.php?post_type=download&page=edd-reports',
              index: 7,
              name: 'Reports',
              nameParent: 'Downloads',
              path: 'edit.php?post_type=download&page=edd-reports',
              siteId: 314,
              type: 'menu',
            },
            'edit.php?post_type=download&page=edd-settings': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/edit.php?post_type=download&page=edd-settings',
              index: 8,
              name: 'Settings',
              nameParent: 'Downloads',
              path: 'edit.php?post_type=download&page=edd-settings',
              siteId: 314,
              type: 'menu',
            },
            'edit.php?post_type=download&page=edd-tools': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/edit.php?post_type=download&page=edd-tools',
              index: 9,
              name: 'Tools',
              nameParent: 'Downloads',
              path: 'edit.php?post_type=download&page=edd-tools',
              siteId: 314,
              type: 'menu',
            },
            'edit.php?post_type=download&page=edd-addons': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/edit.php?post_type=download&page=edd-addons',
              index: 10,
              name: 'Extensions',
              nameParent: 'Downloads',
              path: 'edit.php?post_type=download&page=edd-addons',
              siteId: 314,
              type: 'menu',
            },
            'edit.php?post_type=download&page=edd-licenses': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/edit.php?post_type=download&page=edd-licenses',
              index: 11,
              name: 'Licenses',
              nameParent: 'Downloads',
              path: 'edit.php?post_type=download&page=edd-licenses',
              siteId: 314,
              type: 'menu',
            },
          },
        },
        Appearance: {
          index: 5,
          name: 'Appearance',
          children: {
            'themes.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/themes.php',
              index: 0,
              name: 'Themes ',
              nameParent: 'Appearance',
              path: 'themes.php',
              siteId: 314,
              type: 'menu',
            },
            'customize.php?return=%2Fstreamline%2Fwp-admin%2F': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/customize.php?return=%2Fstreamline%2Fwp-admin%2F',
              index: 1,
              name: 'Customize',
              nameParent: 'Appearance',
              path: 'customize.php?return=%2Fstreamline%2Fwp-admin%2F',
              siteId: 314,
              type: 'menu',
            },
          },
        },
        'Plugins ': {
          index: 6,
          name: 'Plugins ',
          children: {
            'plugins.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/plugins.php',
              index: 0,
              name: 'Plugins ',
              nameParent: 'Plugins ',
              path: 'plugins.php',
              siteId: 314,
              type: 'menu',
            },
          },
        },
        Users: {
          index: 7,
          name: 'Users',
          children: {
            'users.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/users.php',
              index: 0,
              name: 'All Users',
              nameParent: 'Users',
              path: 'users.php',
              siteId: 314,
              type: 'menu',
            },
            'user-new.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/user-new.php',
              index: 1,
              name: 'Add New',
              nameParent: 'Users',
              path: 'user-new.php',
              siteId: 314,
              type: 'menu',
            },
            'profile.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/profile.php',
              index: 2,
              name: 'Profile',
              nameParent: 'Users',
              path: 'profile.php',
              siteId: 314,
              type: 'menu',
            },
          },
        },
        Tools: {
          index: 8,
          name: 'Tools',
          children: {
            'tools.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/tools.php',
              index: 0,
              name: 'Available Tools',
              nameParent: 'Tools',
              path: 'tools.php',
              siteId: 314,
              type: 'menu',
            },
            'import.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/import.php',
              index: 1,
              name: 'Import',
              nameParent: 'Tools',
              path: 'import.php',
              siteId: 314,
              type: 'menu',
            },
            'export.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/export.php',
              index: 2,
              name: 'Export',
              nameParent: 'Tools',
              path: 'export.php',
              siteId: 314,
              type: 'menu',
            },
            'site-health.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/site-health.php',
              index: 3,
              name: 'Site Health',
              nameParent: 'Tools',
              path: 'site-health.php',
              siteId: 314,
              type: 'menu',
            },
            'export-personal-data.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/export-personal-data.php',
              index: 4,
              name: 'Export Personal Data',
              nameParent: 'Tools',
              path: 'export-personal-data.php',
              siteId: 314,
              type: 'menu',
            },
            'erase-personal-data.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/erase-personal-data.php',
              index: 5,
              name: 'Erase Personal Data',
              nameParent: 'Tools',
              path: 'erase-personal-data.php',
              siteId: 314,
              type: 'menu',
            },
            'ms-delete-site.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/ms-delete-site.php',
              index: 6,
              name: 'Delete Site',
              nameParent: 'Tools',
              path: 'ms-delete-site.php',
              siteId: 314,
              type: 'menu',
            },
            'tools.php?page=ssl-insecure-content-fixer-tests': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/tools.php?page=ssl-insecure-content-fixer-tests',
              index: 7,
              name: 'SSL Tests',
              nameParent: 'Tools',
              path: 'tools.php?page=ssl-insecure-content-fixer-tests',
              siteId: 314,
              type: 'menu',
            },
            'tools.php?page=wp-migrate-db-pro': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/tools.php?page=wp-migrate-db-pro',
              index: 8,
              name: 'Migrate DB Pro',
              nameParent: 'Tools',
              path: 'tools.php?page=wp-migrate-db-pro',
              siteId: 314,
              type: 'menu',
            },
            'tools.php?page=streamline': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/tools.php?page=streamline',
              index: 9,
              name: 'Streamline',
              nameParent: 'Tools',
              path: 'tools.php?page=streamline',
              siteId: 314,
              type: 'menu',
            },
            'tools.php?page=spx-license': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/tools.php?page=spx-license',
              index: 10,
              name: 'spx',
              nameParent: 'Tools',
              path: 'tools.php?page=spx-license',
              siteId: 314,
              type: 'menu',
            },
          },
        },
        Settings: {
          index: 9,
          name: 'Settings',
          children: {
            'options-general.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/options-general.php',
              index: 0,
              name: 'General',
              nameParent: 'Settings',
              path: 'options-general.php',
              siteId: 314,
              type: 'menu',
            },
            'options-writing.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/options-writing.php',
              index: 1,
              name: 'Writing',
              nameParent: 'Settings',
              path: 'options-writing.php',
              siteId: 314,
              type: 'menu',
            },
            'options-reading.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/options-reading.php',
              index: 2,
              name: 'Reading',
              nameParent: 'Settings',
              path: 'options-reading.php',
              siteId: 314,
              type: 'menu',
            },
            'options-media.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/options-media.php',
              index: 3,
              name: 'Media',
              nameParent: 'Settings',
              path: 'options-media.php',
              siteId: 314,
              type: 'menu',
            },
            'options-permalink.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/options-permalink.php',
              index: 4,
              name: 'Permalinks',
              nameParent: 'Settings',
              path: 'options-permalink.php',
              siteId: 314,
              type: 'menu',
            },
            'options-privacy.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/options-privacy.php',
              index: 5,
              name: 'Privacy',
              nameParent: 'Settings',
              path: 'options-privacy.php',
              siteId: 314,
              type: 'menu',
            },
            'options-general.php?page=relevanssi/relevanssi.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/options-general.php?page=relevanssi/relevanssi.php',
              index: 6,
              name: 'Relevanssi',
              nameParent: 'Settings',
              path: 'options-general.php?page=relevanssi/relevanssi.php',
              siteId: 314,
              type: 'menu',
            },
            'options-general.php?page=ssl-insecure-content-fixer': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/options-general.php?page=ssl-insecure-content-fixer',
              index: 7,
              name: 'SSL Insecure Content',
              nameParent: 'Settings',
              path: 'options-general.php?page=ssl-insecure-content-fixer',
              siteId: 314,
              type: 'menu',
            },
            'options-general.php?page=somfrp_options_page': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/options-general.php?page=somfrp_options_page',
              index: 8,
              name: 'Frontend Reset Password',
              nameParent: 'Settings',
              path: 'options-general.php?page=somfrp_options_page',
              siteId: 314,
              type: 'menu',
            },
          },
        },
        'Custom Fields': {
          index: 10,
          name: 'Custom Fields',
          children: {
            'edit.php?post_type=acf-field-group': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/edit.php?post_type=acf-field-group',
              index: 0,
              name: 'Field Groups',
              nameParent: 'Custom Fields',
              path: 'edit.php?post_type=acf-field-group',
              siteId: 314,
              type: 'menu',
            },
            'post-new.php?post_type=acf-field-group': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/post-new.php?post_type=acf-field-group',
              index: 1,
              name: 'Add New',
              nameParent: 'Custom Fields',
              path: 'post-new.php?post_type=acf-field-group',
              siteId: 314,
              type: 'menu',
            },
            'edit.php?post_type=acf-field-group&page=acf-tools': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/edit.php?post_type=acf-field-group&page=acf-tools',
              index: 2,
              name: 'Tools',
              nameParent: 'Custom Fields',
              path: 'edit.php?post_type=acf-field-group&page=acf-tools',
              siteId: 314,
              type: 'menu',
            },
            'edit.php?post_type=acf-field-group&page=acf-settings-updates': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/edit.php?post_type=acf-field-group&page=acf-settings-updates',
              index: 3,
              name: 'Updates',
              nameParent: 'Custom Fields',
              path: 'edit.php?post_type=acf-field-group&page=acf-settings-updates',
              siteId: 314,
              type: 'menu',
            },
          },
        },
        SEO: {
          index: 11,
          name: 'SEO',
          children: {
            'admin.php?page=theseoframework-settings': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/admin.php?page=theseoframework-settings',
              index: 0,
              name: 'SEO',
              nameParent: 'SEO',
              path: 'admin.php?page=theseoframework-settings',
              siteId: 314,
              type: 'menu',
            },
          },
        },
        'WP Mail SMTP': {
          index: 12,
          name: 'WP Mail SMTP',
          children: {
            'admin.php?page=wp-mail-smtp': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/admin.php?page=wp-mail-smtp',
              index: 0,
              name: 'Settings',
              nameParent: 'WP Mail SMTP',
              path: 'admin.php?page=wp-mail-smtp',
              siteId: 314,
              type: 'menu',
            },
            'admin.php?page=wp-mail-smtp-logs': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/admin.php?page=wp-mail-smtp-logs',
              index: 1,
              name: 'Email Log',
              nameParent: 'WP Mail SMTP',
              path: 'admin.php?page=wp-mail-smtp-logs',
              siteId: 314,
              type: 'menu',
            },
            'admin.php?page=wp-mail-smtp-reports': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/admin.php?page=wp-mail-smtp-reports',
              index: 2,
              name: 'Email Reports',
              nameParent: 'WP Mail SMTP',
              path: 'admin.php?page=wp-mail-smtp-reports',
              siteId: 314,
              type: 'menu',
            },
            'admin.php?page=wp-mail-smtp-tools': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/admin.php?page=wp-mail-smtp-tools',
              index: 3,
              name: 'Tools',
              nameParent: 'WP Mail SMTP',
              path: 'admin.php?page=wp-mail-smtp-tools',
              siteId: 314,
              type: 'menu',
            },
            'admin.php?page=wp-mail-smtp-about': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/admin.php?page=wp-mail-smtp-about',
              index: 4,
              name: 'About Us',
              nameParent: 'WP Mail SMTP',
              path: 'admin.php?page=wp-mail-smtp-about',
              siteId: 314,
              type: 'menu',
            },
          },
        },
      },
      siteId: 314,
      type: 'menu',
    },
  ];
  const fav = [
    {
      adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
      children: {
        Posts: {
          index: 1,
          name: 'Posts',
          children: {
            'post-new.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/post-new.php',
              index: 1,
              name: 'Add New',
              nameParent: 'Posts',
              path: 'post-new.php',
              siteId: 314,
              type: 'menu',
            },
          },
        },
        Downloads: {
          index: 4,
          name: 'Downloads',
          children: {
            'edit.php?post_type=download': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/edit.php?post_type=download',
              index: 0,
              name: 'All Downloads',
              nameParent: 'Downloads',
              path: 'edit.php?post_type=download',
              siteId: 314,
              type: 'menu',
            },
            'edit.php?post_type=download&page=edd-discounts': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/edit.php?post_type=download&page=edd-discounts',
              index: 6,
              name: 'Discount Codes',
              nameParent: 'Downloads',
              path: 'edit.php?post_type=download&page=edd-discounts',
              siteId: 314,
              type: 'menu',
            },
          },
        },
        Tools: {
          index: 8,
          name: 'Tools',
          children: {
            'tools.php?page=wp-migrate-db-pro': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/tools.php?page=wp-migrate-db-pro',
              index: 8,
              name: 'Migrate DB Pro',
              nameParent: 'Tools',
              path: 'tools.php?page=wp-migrate-db-pro',
              siteId: 314,
              type: 'menu',
            },
            'tools.php?page=streamline': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/tools.php?page=streamline',
              index: 9,
              name: 'Streamline',
              nameParent: 'Tools',
              path: 'tools.php?page=streamline',
              siteId: 314,
              type: 'menu',
            },
          },
        },
        'Custom Fields': {
          index: 10,
          name: 'Custom Fields',
          children: {
            'edit.php?post_type=acf-field-group': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/edit.php?post_type=acf-field-group',
              index: 0,
              name: 'Field Groups',
              nameParent: 'Custom Fields',
              path: 'edit.php?post_type=acf-field-group',
              siteId: 314,
              type: 'menu',
            },
            'post-new.php?post_type=acf-field-group': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/post-new.php?post_type=acf-field-group',
              index: 1,
              name: 'Add New',
              nameParent: 'Custom Fields',
              path: 'post-new.php?post_type=acf-field-group',
              siteId: 314,
              type: 'menu',
            },
          },
        },
        'WP Mail SMTP': {
          index: 12,
          name: 'WP Mail SMTP',
          children: {
            'admin.php?page=wp-mail-smtp': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/admin.php?page=wp-mail-smtp',
              index: 0,
              name: 'Settings',
              nameParent: 'WP Mail SMTP',
              path: 'admin.php?page=wp-mail-smtp',
              siteId: 314,
              type: 'menu',
            },
            'admin.php?page=wp-mail-smtp-tools': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/admin.php?page=wp-mail-smtp-tools',
              index: 3,
              name: 'Tools',
              nameParent: 'WP Mail SMTP',
              path: 'admin.php?page=wp-mail-smtp-tools',
              siteId: 314,
              type: 'menu',
            },
          },
        },
      },
      siteId: 314,
      type: 'menu',
    },
    {
      children: {
        '226': {
          ID: 226,
          post_author: '1',
          post_date: '2020-05-29 22:01:43',
          post_date_gmt: '2020-05-29 22:01:43',
          post_content: '',
          post_title: 'Changelog',
          post_excerpt: '',
          post_status: 'publish',
          comment_status: 'closed',
          ping_status: 'closed',
          post_password: '',
          post_name: 'changelog',
          to_ping: '',
          pinged: '',
          post_modified: '2020-05-29 22:03:14',
          post_modified_gmt: '2020-05-29 22:03:14',
          post_content_filtered: '',
          post_parent: 0,
          guid: 'https://spx.dev/?page_id=226',
          menu_order: 0,
          post_type: 'page',
          post_mime_type: '',
          comment_count: '0',
          filter: 'raw',
          hrefEdit: 'aHR0cHM6Ly9mYWJyaWthdC5sb2NhbC9zcHgvd3AtYWRtaW4vcG9zdC5waHA/cG9zdD0yMjYmYW1wO2FjdGlvbj1lZGl0',
          name: 'Changelog',
          siteId: 314,
          sitePath: '/spx/',
        },
        '1179': {
          ID: 1179,
          post_author: '1',
          post_date: '2020-12-30 14:58:08',
          post_date_gmt: '2020-12-30 14:58:08',
          post_content: '<!-- wp:paragraph -->\n<p>What a year it has been. With 2020 being such a rollercoaster for many of us, we are glad, excited and full of motivation for what 2021 will have in store.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading -->\n<h2>🎊 The year for spx</h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>Little over 6 months ago, version 1.0 was released into the wild. It being our first commercial product, we didn’t know what to expect at first. Since spx is such a user-centric product, listening to feedback and suggestions has been crucial and pivotal in moving the plugin forward. In fact, some of the new features in 3.0 are completely inspired by your messages! Let’s dive into all the new features and enhancements.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading -->\n<h2>🚨 Removal of singular Oxygen elements</h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>Singular Oxygen elements are being deprecated in favor of the master component. spx is not a page builder centric plugin, but is instead able to adapt to new tools in the WordPress space. If you wanna know more about the reasoning for this, please visit the 2.0 post.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading {"level":3} -->\n<h3>What this means for your current sites:</h3>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>If you are using any of the singular Oxygen elements on your sites, it is advised to swap them out for the master component before updating to 3.0. If you are already using the master component, you have nothing to worry about.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading -->\n<h2>🍰 Shortcodes</h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>The following components are now also available as shortcodes. This greatly improves the areas that spx can be used in. For more details on the exact usage, please visit the documentation. Please keep in mind that the following components are currently not available as shortcodes.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:list -->\n<ul><li>Navigation</li><li>Group</li><li>Scrollspy</li><li>Snackbar</li></ul>\n<!-- /wp:list -->\n\n<!-- wp:paragraph -->\n<p>Furthermore, it is currently not possible to use helper functions with the following components when used as shortcodes:</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:list -->\n<ul><li>Slider</li><li>Slideshow</li><li>Masonry</li></ul>\n<!-- /wp:list -->\n\n<!-- wp:heading -->\n<h2>🧬 Data API</h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>Although not entirely new, we have given the Data API a structural overhaul and added a documentation entry for it. Located within the plugin root folder, you will find a JSON file for every component which contains valuable information such as the default value, data type, methods, events, and much more. That same dataset is used internally to generate a good portion of the documentation and all of the shortcodes, so the possibilities are endless!</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading -->\n<h2>💠 Component updates</h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>Besides a new didLoad event for all components and various bug fixes, following components received some new features:</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading {"level":3} -->\n<h3>Accordion</h3>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>Accordions can now be linked together. This means that it is possible to open or close all other accordions with the same id on click.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading {"level":3} -->\n<h3>Code</h3>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>The code component now supports JSON along with options to display line numbers and a “Copy to clipboard” button. Since providing the best experience for the user is at the forefront of every design decision, we have decided to display both by default. Of course, it is also possible to disable these features.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading -->\n<h2>3️⃣ Semantic versioning</h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>spx is now following the Semver versioning pattern, so breaking changes will be limited to major releases. (3.0.0, 4.0.0 etc.)</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:paragraph -->\n<p>That’s a wrap! The next steps and new features for spx are already planned out and currently in development. Watch out for some new components, tighter integrations and some other neat surprises.</p>\n<!-- /wp:paragraph -->',
          post_title: '3.0 is here!',
          post_excerpt: '',
          post_status: 'publish',
          comment_status: 'closed',
          ping_status: 'closed',
          post_password: '',
          post_name: '3-0-is-here',
          to_ping: '',
          pinged: '',
          post_modified: '2021-01-04 11:33:38',
          post_modified_gmt: '2021-01-04 11:33:38',
          post_content_filtered: '',
          post_parent: 0,
          guid: 'https://fabrikat.local/spx/?p=1179',
          menu_order: 0,
          post_type: 'post',
          post_mime_type: '',
          comment_count: '0',
          filter: 'raw',
          hrefEdit: 'aHR0cHM6Ly9mYWJyaWthdC5sb2NhbC9zcHgvd3AtYWRtaW4vcG9zdC5waHA/cG9zdD0xMTc5JmFtcDthY3Rpb249ZWRpdA==',
          name: '3.0 is here!',
          siteId: 314,
          sitePath: '/spx/',
        },
      },
      type: 'post',
      siteId: 314,
    },
  ];
  const post = [
    {
      children: {
        '226': {
          ID: 226,
          post_author: '1',
          post_date: '2020-05-29 22:01:43',
          post_date_gmt: '2020-05-29 22:01:43',
          post_content: '',
          post_title: 'Changelog',
          post_excerpt: '',
          post_status: 'publish',
          comment_status: 'closed',
          ping_status: 'closed',
          post_password: '',
          post_name: 'changelog',
          to_ping: '',
          pinged: '',
          post_modified: '2020-05-29 22:03:14',
          post_modified_gmt: '2020-05-29 22:03:14',
          post_content_filtered: '',
          post_parent: 0,
          guid: 'https://spx.dev/?page_id=226',
          menu_order: 0,
          post_type: 'page',
          post_mime_type: '',
          comment_count: '0',
          filter: 'raw',
          hrefEdit: 'aHR0cHM6Ly9mYWJyaWthdC5sb2NhbC9zcHgvd3AtYWRtaW4vcG9zdC5waHA/cG9zdD0yMjYmYW1wO2FjdGlvbj1lZGl0',
          name: 'Changelog',
          siteId: 314,
          sitePath: '/spx/',
        },
        '684': {
          ID: 684,
          post_author: '610',
          post_date: '2020-09-22 07:42:33',
          post_date_gmt: '2020-09-22 07:42:33',
          post_content: '<!-- wp:paragraph -->\n<p>Here at spx, we have been working hard to deliver to you the next cutting edge update for our favourite plugin. That\'s why we are more than excited to present you this brand new version.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading -->\n<h2>🎨 Brand &amp; Website redesign</h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>When we initially brought you spx, the website was laid out in a fixed-width format. Understandably this created issues when viewing the site on larger screens and generally wasn\'t aesthetically pleasing. During the 2.0 incubation stage, we had to rethink the entire design as we felt it wasn\'t as progressive as the plugin itself. Fast forward to now and we are excited to present to you the overhauled identity. Adjusting to any screen responsively in a non-fixed format, the new design showcases the plugin in a more sophisticated and unified light.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading -->\n<h2>📖 New documentation</h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>While we were brainstorming the new features of spx 2.0, there was a constant question: how could we introduce these new features, while simultaneously teaching our customers how to use them? We realised that it was possible to automatically generate <a href="https://fabrikat.local/spx/documentation/" data-type="page" data-id="97">documentation</a> directly from the source files of the plugin, using the common <a rel="noreferrer noopener" href="https://jsdoc.app/index.html" target="_blank">JSDoc</a> format. This technique eliminates room for errors, making the users experience more upfront and \'straight from the source\', no pun intended. 😏</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading -->\n<h2>🧬 New components</h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>At spx, we believe the more components we can create to make your life easier the better. So why not have a plugin that can do it all? We are happy to present you following new elements:</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading {"level":3} -->\n<h3>Slider</h3>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>Based on <a rel="noreferrer noopener" href="https://swiperjs.com/" data-type="URL" data-id="https://swiperjs.com/" target="_blank">Swiper.js</a>, the slider feature will help you flawlessly create a completely functional slider without the time and effort of writing the code yourself. With less time and energy spent on the time-consuming part of setting up a slider, you can now direct your time to something else, like baking a cake or going outside.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading {"level":3} -->\n<h3>Notation</h3>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>A notation is a crafty way to draw emphasis on sections of your content without the permanency of a constant highlight or bracket around what you want to emphasize.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading {"level":3} -->\n<h3>Slideshow</h3>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>It is now possible to create a customizable and infinite slideshow with full control over the speed parameters. Check the <a href="https://fabrikat.local/spx/" data-type="page" data-id="48">landing page</a> for an example!</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading {"level":3} -->\n<h3>Code-highlighter</h3>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>Using this component you can demonstrate what code would look like as if it was written in a normal code editor, including colour coding and indenting. Perfect for creating examples and showcasing your unique code.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading -->\n<h2>🔮 New Oxygen integration</h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>With our new Oxygen integration, you will now be able to implement components in one master wrapper. This is groundbreaking for us as the developers behind the plugin because it spares us the monotonous task of single-handedly integrating each feature into the Oxygen editor. </p>\n<!-- /wp:paragraph -->\n\n<!-- wp:paragraph -->\n<p>Since version 3.5 of Oxygen introduced the ability to add data-attributes to elements, this new way is now perfectly feasible.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:paragraph -->\n<p>The remaining elements that were introduced before 2.0 will be available until 3.0. However, it is now advised to use the newly introduced master wrapper.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading -->\n<h2>🧱 New section system</h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>We are excited to announce that we have developed a new section system that makes creating beautiful and cohesive websites easier than ever. With our new system, you can now change elements of your website all at once by editing just a fraction of the code. </p>\n<!-- /wp:paragraph -->\n\n<!-- wp:paragraph -->\n<p>For example, by editing global variables like colour and spacing you are able to change multiple elements at once, creating cohesion with a simplistic approach. We love it so much we used it to create our new landing page and will continue to use this feature on all of our future pages. As exciting as this new development is, it is currently in BETA mode so we would love for you to try it and send us your feedback.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:paragraph -->\n<p>All in all, we are extremely excited by what we have achieved with 2.0. We aimed to create a cohesive and appealing design to showcase how our software can be used, specifically our section system while adding new components such as the slider, notation, code-highlighter and slideshow. The future of spx is looking bright and we are happy for everyone that is on this road with us.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:paragraph -->\n<p>Stay tuned for more exciting news and features!</p>\n<!-- /wp:paragraph -->',
          post_title: 'How to blog correctly',
          post_excerpt: '',
          post_status: 'publish',
          comment_status: 'closed',
          ping_status: 'closed',
          post_password: '',
          post_name: 'how-to-blog-correctly',
          to_ping: '',
          pinged: '',
          post_modified: '2020-12-30 15:09:00',
          post_modified_gmt: '2020-12-30 15:09:00',
          post_content_filtered: '',
          post_parent: 0,
          guid: 'https://fabrikat.local/spx/?p=684',
          menu_order: 0,
          post_type: 'post',
          post_mime_type: '',
          comment_count: '0',
          filter: 'raw',
          hrefEdit: 'aHR0cHM6Ly9mYWJyaWthdC5sb2NhbC9zcHgvd3AtYWRtaW4vcG9zdC5waHA/cG9zdD02ODQmYW1wO2FjdGlvbj1lZGl0',
          name: 'How to blog correctly',
          siteId: 314,
          sitePath: '/spx/',
        },
        '699': {
          ID: 699,
          post_author: '1',
          post_date: '2020-09-28 07:47:54',
          post_date_gmt: '2020-09-28 07:47:54',
          post_content: '',
          post_title: 'Time to log out',
          post_excerpt: '',
          post_status: 'publish',
          comment_status: 'closed',
          ping_status: 'closed',
          post_password: '',
          post_name: 'time-to-log-out',
          to_ping: '',
          pinged: '',
          post_modified: '2020-09-28 07:47:54',
          post_modified_gmt: '2020-09-28 07:47:54',
          post_content_filtered: '',
          post_parent: 0,
          guid: 'https://fabrikat.local/spx/?page_id=699',
          menu_order: 0,
          post_type: 'page',
          post_mime_type: '',
          comment_count: '0',
          filter: 'raw',
          hrefEdit: 'aHR0cHM6Ly9mYWJyaWthdC5sb2NhbC9zcHgvd3AtYWRtaW4vcG9zdC5waHA/cG9zdD02OTkmYW1wO2FjdGlvbj1lZGl0',
          name: 'Time to log out',
          siteId: 314,
          sitePath: '/spx/',
        },
        '1179': {
          ID: 1179,
          post_author: '1',
          post_date: '2020-12-30 14:58:08',
          post_date_gmt: '2020-12-30 14:58:08',
          post_content: '<!-- wp:paragraph -->\n<p>What a year it has been. With 2020 being such a rollercoaster for many of us, we are glad, excited and full of motivation for what 2021 will have in store.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading -->\n<h2>🎊 The year for spx</h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>Little over 6 months ago, version 1.0 was released into the wild. It being our first commercial product, we didn’t know what to expect at first. Since spx is such a user-centric product, listening to feedback and suggestions has been crucial and pivotal in moving the plugin forward. In fact, some of the new features in 3.0 are completely inspired by your messages! Let’s dive into all the new features and enhancements.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading -->\n<h2>🚨 Removal of singular Oxygen elements</h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>Singular Oxygen elements are being deprecated in favor of the master component. spx is not a page builder centric plugin, but is instead able to adapt to new tools in the WordPress space. If you wanna know more about the reasoning for this, please visit the 2.0 post.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading {"level":3} -->\n<h3>What this means for your current sites:</h3>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>If you are using any of the singular Oxygen elements on your sites, it is advised to swap them out for the master component before updating to 3.0. If you are already using the master component, you have nothing to worry about.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading -->\n<h2>🍰 Shortcodes</h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>The following components are now also available as shortcodes. This greatly improves the areas that spx can be used in. For more details on the exact usage, please visit the documentation. Please keep in mind that the following components are currently not available as shortcodes.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:list -->\n<ul><li>Navigation</li><li>Group</li><li>Scrollspy</li><li>Snackbar</li></ul>\n<!-- /wp:list -->\n\n<!-- wp:paragraph -->\n<p>Furthermore, it is currently not possible to use helper functions with the following components when used as shortcodes:</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:list -->\n<ul><li>Slider</li><li>Slideshow</li><li>Masonry</li></ul>\n<!-- /wp:list -->\n\n<!-- wp:heading -->\n<h2>🧬 Data API</h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>Although not entirely new, we have given the Data API a structural overhaul and added a documentation entry for it. Located within the plugin root folder, you will find a JSON file for every component which contains valuable information such as the default value, data type, methods, events, and much more. That same dataset is used internally to generate a good portion of the documentation and all of the shortcodes, so the possibilities are endless!</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading -->\n<h2>💠 Component updates</h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>Besides a new didLoad event for all components and various bug fixes, following components received some new features:</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading {"level":3} -->\n<h3>Accordion</h3>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>Accordions can now be linked together. This means that it is possible to open or close all other accordions with the same id on click.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading {"level":3} -->\n<h3>Code</h3>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>The code component now supports JSON along with options to display line numbers and a “Copy to clipboard” button. Since providing the best experience for the user is at the forefront of every design decision, we have decided to display both by default. Of course, it is also possible to disable these features.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading -->\n<h2>3️⃣ Semantic versioning</h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>spx is now following the Semver versioning pattern, so breaking changes will be limited to major releases. (3.0.0, 4.0.0 etc.)</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:paragraph -->\n<p>That’s a wrap! The next steps and new features for spx are already planned out and currently in development. Watch out for some new components, tighter integrations and some other neat surprises.</p>\n<!-- /wp:paragraph -->',
          post_title: 'Logical thinking for dummies',
          post_excerpt: '',
          post_status: 'publish',
          comment_status: 'closed',
          ping_status: 'closed',
          post_password: '',
          post_name: 'logical-thinking',
          to_ping: '',
          pinged: '',
          post_modified: '2021-01-04 11:33:38',
          post_modified_gmt: '2021-01-04 11:33:38',
          post_content_filtered: '',
          post_parent: 0,
          guid: 'https://fabrikat.local/spx/?p=1179',
          menu_order: 0,
          post_type: 'post',
          post_mime_type: '',
          comment_count: '0',
          filter: 'raw',
          hrefEdit: 'aHR0cHM6Ly9mYWJyaWthdC5sb2NhbC9zcHgvd3AtYWRtaW4vcG9zdC5waHA/cG9zdD0xMTc5JmFtcDthY3Rpb249ZWRpdA==',
          name: 'Logical thinking for dummies',
          siteId: 314,
          sitePath: '/spx/',
        },
      },
      queryValue: 'log',
      type: 'post',
      siteId: 314,
    },
  ];
  state.active = 'menu';
  state$1.entriesMenu = menu;
  state$1.entriesMenuActive = menu;
  state$1.entriesFav = fav;
  state$1.entriesFavActive = fav;
  state$1.entriesPost = post;
  state$1.entriesPostActive = post;
}

const streamlineContainerCss = ":host{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;box-sizing:border-box;display:block;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif}:host *{pointer-events:auto}/*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{--tw-blur:var(--tw-empty,/*!*/ /*!*/);--tw-brightness:var(--tw-empty,/*!*/ /*!*/);--tw-contrast:var(--tw-empty,/*!*/ /*!*/);--tw-grayscale:var(--tw-empty,/*!*/ /*!*/);--tw-hue-rotate:var(--tw-empty,/*!*/ /*!*/);--tw-invert:var(--tw-empty,/*!*/ /*!*/);--tw-saturate:var(--tw-empty,/*!*/ /*!*/);--tw-sepia:var(--tw-empty,/*!*/ /*!*/);--tw-drop-shadow:var(--tw-empty,/*!*/ /*!*/);--tw-filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);border:0 solid;box-sizing:border-box}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}a{color:inherit;text-decoration:inherit}.visible{visibility:visible}.inline-block{display:inline-block}.h-\\[max-content\\]{height:-webkit-max-content;height:-moz-max-content;height:max-content}.bg-blue-gray-200{--tw-bg-opacity:1;background-color:rgba(226,232,240,var(--tw-bg-opacity))}.px-2\\.5{padding-left:.625rem;padding-right:.625rem}.py-1\\.5{padding-bottom:.375rem;padding-top:.375rem}.px-2{padding-left:.5rem;padding-right:.5rem}.py-1{padding-bottom:.25rem;padding-top:.25rem}.text-blue-gray-500{--tw-text-opacity:1;color:rgba(100,116,139,var(--tw-text-opacity))}.blur{--tw-blur:blur(8px);filter:var(--tw-filter)}/*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize *//*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize *//*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */";

let StreamlineContainer$1 = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.mac = false;
        this.cycle = (mode) => {
            const index = state$1.menus.indexOf(state.active);
            const length = state$1.menus.length;
            if (mode === "up") {
                if (index === 0) {
                    state.active = state$1.menus[length - 1];
                }
                else {
                    state.active = state$1.menus[index - 1];
                }
            }
            if (mode === "down") {
                if (index + 1 === length) {
                    state.active = state$1.menus[0];
                }
                else {
                    state.active = state$1.menus[index + 1];
                }
            }
        };
    }
    connectedCallback() {
        this.mac = this.mac || navigator.userAgent.indexOf("Mac OS X") !== -1;
        state$1.visible = this.visible || false;
        state$1.entriesSettingsActive = state$1.entriesSettings;
        state$1.entriesSettings[0].children.forEach((item) => {
            item.children.forEach((itemInner) => {
                var _a, _b;
                state$1.entriesSettingsLoad[itemInner.id] = {
                    default: (_b = (_a = JSON.parse(state$1.data.settings)[itemInner.id]) === null || _a === void 0 ? void 0 : _a.default) !== null && _b !== void 0 ? _b : state$1.entriesSettingsLoad[itemInner.id].default,
                };
            });
        });
        state$1.entriesSettingsSave = state$1.entriesSettingsLoad;
        if (state$1.test) {
            setTestData();
        }
        document.addEventListener("keydown", (e) => {
            if (e.key === "k" && (this.mac ? e.metaKey : e.ctrlKey)) {
                e.preventDefault();
                state$1.visible = !state$1.visible;
            }
            if (state$1.visible) {
                if (e.key === "Escape" &&
                    state$1.entriesSettingsLoad.keyExit.default) {
                    e.preventDefault();
                    state$1.visible = false;
                }
                if (e.key === "ArrowUp" &&
                    state$1.entriesSettingsLoad.keyNavigation.default) {
                    e.preventDefault();
                    this.cycle("up");
                }
                if (e.key === "ArrowDown" &&
                    state$1.entriesSettingsLoad.keyNavigation.default) {
                    e.preventDefault();
                    this.cycle("down");
                }
            }
        });
    }
    componentDidLoad() {
        setSearchPlaceholder();
    }
    async toggle() {
        state$1.visible = !state$1.visible;
    }
    async toggleTest() {
        state$1.testFull = !state$1.testFull;
    }
    render() {
        return (h(Host, null, h("div", { class: `fixed top-0 left-0 w-full h-full z-[9999999999999999] ${state$1.visible
                ? "block pointer-events-auto"
                : "hidden pointer-events-none"}` }, h("div", { tabIndex: -1, class: `fixed top-0 left-0 w-full h-full bg-black/90 ${state$1.entriesSettingsLoad.appearanceBlur.default
                ? "backdrop-blur-sm"
                : ""}`, onClick: () => (state$1.visible = false) }), h("streamline-box", null))));
    }
    get el() { return this; }
    static get style() { return streamlineContainerCss + '/*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-backdrop-blur:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-brightness:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-contrast:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-grayscale:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-hue-rotate:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-invert:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-opacity:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-saturate:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-sepia:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);border:0 solid;box-sizing:border-box}[hidden]{display:none}.pointer-events-none{pointer-events:none}.pointer-events-auto{pointer-events:auto}.visible{visibility:visible}.fixed{position:fixed}.top-0{top:0}.left-0{left:0}.z-\\[9999999999999999\\]{z-index:10000000000000000}.block{display:block}.hidden{display:none}.h-full{height:100%}.w-full{width:100%}.bg-black\\/90{background-color:rgba(0,0,0,.9)}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.backdrop-blur-sm{--tw-backdrop-blur:blur(4px);-webkit-backdrop-filter:var(--tw-backdrop-filter);backdrop-filter:var(--tw-backdrop-filter)}'; }
};

function getMenu(obj = {}) {
  let data = [];
  const menu = {};
  const isAdmin = document.querySelector('#adminmenuwrap') && !obj.adminUrl && !obj.network;
  const isNetwork = obj.network || state$1.data.isNetwork;
  const isMultisite = !!state$1.data.network;
  const adminUrl = obj.adminUrl ||
    (isNetwork ? state$1.data.network : state$1.data.adminUrl);
  const siteId = obj.siteId || (isNetwork ? 0 : state$1.data.siteId);
  const type = !obj.path && isNetwork ? 'networkMenu' : 'menu';
  function get(doc) {
    doc.querySelectorAll('.menu-top > a').forEach((item, index) => {
      const name = item.innerText.replace(/(\r\n|\n|\r)/gm, '');
      const subMenu = item.closest('li.menu-top');
      const subArr = {};
      if (subMenu) {
        const subSubMenu = subMenu.querySelectorAll('a');
        subSubMenu.forEach((itemSub, indexSub) => {
          if ((indexSub !== 0 && subSubMenu.length >= 2) ||
            (indexSub === 0 && subSubMenu.length === 1)) {
            const nameSub = itemSub.innerText.replace(/(\r\n|\n|\r)/gm, '');
            const hrefSub = itemSub.getAttribute('href');
            subArr[hrefSub] = {
              adminUrl,
              href: adminUrl + hrefSub,
              index: subSubMenu.length === 1 ? indexSub : indexSub - 1,
              name: nameSub,
              nameParent: name,
              path: hrefSub,
              siteId: Number(siteId),
              type: type,
            };
          }
        });
      }
      menu[name] = {
        index,
        name,
        children: subArr,
      };
    });
    data = [
      {
        adminUrl,
        children: menu,
        isMultisite: isMultisite,
        path: obj.path || state$1.data.path,
        siteId: Number(siteId),
        type: type,
      },
    ];
    state$1.entriesMenu = data;
    state$1.entriesMenuActive = data;
    state$1.entriesMenuCurrentPath = obj.path || state$1.data.path;
    state$1.entriesMenuIsNetwork = obj.network;
    setEntries();
  }
  if (isAdmin) {
    get(document);
  }
  else {
    state$1.isLoading = true;
    fetch(adminUrl)
      .then((response) => response.text && response.text())
      .then((data) => {
      const parser = new DOMParser();
      const html = parser.parseFromString(data, 'text/html');
      get(html);
      resetView();
      state.active = 'menu';
      // console.log(stateInternal.entriesMenu);
    })
      .catch((error) => console.log(error));
    // @ts-ignore
    // eslint-disable-next-line no-undef
    /*
    fetch(streamline.ajax, {
      method: 'POST',
      credentials: 'same-origin',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      body: `action=streamlineMenu&url=${
        obj.adminUrl || stateInternal.data.adminUrl
        // @ts-ignore
        // eslint-disable-next-line no-undef
      }&nonce=${streamline.nonce}`,
    })
      .then((response) => response.text())
      .then((data) => {
        const parser = new DOMParser();
        const html = parser.parseFromString(data, 'text/html');
        console.log(html);
        get(html);
        resetView();
        stateLocal.active = 'menu';
      });
     */
  }
}

const streamlineEntriesCss = ":host{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;box-sizing:border-box}:host .focus:focus{box-shadow:inset 0 0 0 4px #f8fafc,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-border:focus{border-color:var(--sl-focus-color);box-shadow:0 0 0 1px var(--sl-focus-color);outline:none!important}:host .focus-out:focus{box-shadow:0 0 0 2px #f8fafc,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-dark:focus{box-shadow:inset 0 0 0 4px #0f172a,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-darker:focus{box-shadow:inset 0 0 0 4px #020204,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-white:focus{box-shadow:inset 0 0 0 4px #fff,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-white-out:focus{box-shadow:0 0 0 2px #fff,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-in-white-out:focus-within{box-shadow:0 0 0 2px #fff,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-none:focus{box-shadow:none!important;outline:none!important}:host .border-invalid{border-color:var(--sl-focus-color-invalid);box-shadow:0 0 0 1px var(--sl-focus-color-invalid);outline:none!important}.inner::-webkit-scrollbar{width:10px}.inner::-webkit-scrollbar-track{background:#fff}.inner::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:0}streamline-button{display:block;height:100%;width:100%}input:checked~.dot{background-color:#fff;transform:translateX(36px)}select{-moz-appearance:none;appearance:none;-webkit-appearance:none;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E\");background-position:right .25rem center;background-repeat:no-repeat;background-size:1.25em 1.25em;border:1px solid #e2e8f0;color:#0f172a;font-family:inter,sans-serif;font-size:.875rem;font-weight:600;height:34px;padding:0 .75rem!important;width:100%}/*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{--tw-blur:var(--tw-empty,/*!*/ /*!*/);--tw-brightness:var(--tw-empty,/*!*/ /*!*/);--tw-contrast:var(--tw-empty,/*!*/ /*!*/);--tw-grayscale:var(--tw-empty,/*!*/ /*!*/);--tw-hue-rotate:var(--tw-empty,/*!*/ /*!*/);--tw-invert:var(--tw-empty,/*!*/ /*!*/);--tw-saturate:var(--tw-empty,/*!*/ /*!*/);--tw-sepia:var(--tw-empty,/*!*/ /*!*/);--tw-drop-shadow:var(--tw-empty,/*!*/ /*!*/);--tw-filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);border:0 solid;box-sizing:border-box}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}a{color:inherit;text-decoration:inherit}.visible{visibility:visible}.inline-block{display:inline-block}.h-\\[max-content\\]{height:-webkit-max-content;height:-moz-max-content;height:max-content}.bg-blue-gray-200{--tw-bg-opacity:1;background-color:rgba(226,232,240,var(--tw-bg-opacity))}.px-2\\.5{padding-left:.625rem;padding-right:.625rem}.py-1\\.5{padding-bottom:.375rem;padding-top:.375rem}.px-2{padding-left:.5rem;padding-right:.5rem}.py-1{padding-bottom:.25rem;padding-top:.25rem}.text-blue-gray-500{--tw-text-opacity:1;color:rgba(100,116,139,var(--tw-text-opacity))}.blur{--tw-blur:blur(8px);filter:var(--tw-filter)}/*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize *//*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */img{border-style:solid;height:auto;max-width:100%}img,svg{display:block;vertical-align:middle}.h-6{height:1.5rem}.h-10{height:2.5rem}.w-6{width:1.5rem}.w-10{width:2.5rem}.animate-spin{-webkit-animation:spin 1s linear infinite;animation:spin 1s linear infinite}/*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize *//*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize *//*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */@media (min-width:640px){.sm\\:h-7{height:1.75rem}.sm\\:w-7{width:1.75rem}}";

let StreamlineEntries$1 = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.h2 = "text-base text-blue-gray-900 font-medium";
        this.p = "text-blue-gray-600 text-base font-normal";
        this.tag = "px-2.5 py-1.5 bg-blue-gray-200 text-blue-gray-500 inline-block h-[max-content] leading-1";
        this.border = "border-t border-blue-gray-100 first-of-type:border-none";
        this.getArr = (arr, type) => {
            var _a;
            return ((arr.length >= 1 && arr) ||
                (((_a = state$1[`entries${capitalizeFirstLetter(type)}Active`]) === null || _a === void 0 ? void 0 : _a.length) >=
                    1 &&
                    (state$1[`entries${capitalizeFirstLetter(type)}Active`] ||
                        state$1[`entries${capitalizeFirstLetter(type)}`])));
        };
        this.slash = () => {
            return (h("div", null, StreamlineEntries$1.getHeader({
                title: "Available commands for current mode",
            }), h("ul", null, Object.values(state$1.commands.local).map((item) => {
                const isEntry = item.name.includes("[");
                const type = item.name.substring(item.name.indexOf("[") - 1);
                const cmd = isEntry ? item.name.replace(type, "") : item.name;
                return (h("li", { class: `flex flex-col py-3` }, h("h2", { class: `${this.h2} mb-2` }, h("span", null, cmd, isEntry && (h("span", { class: `${this.tag} ml-2` }, type.trim())))), h("p", { class: `${this.p}` }, item.description)));
            }))));
        };
        this.site = () => {
            return Object.values(state$1.entriesSite).map((item) => {
                return (h("div", null, StreamlineEntries$1.getHeader(item), h("ul", null, Object.values(item.children).map((itemInner) => {
                    const obj = {
                        siteId: itemInner.siteId,
                        adminUrl: itemInner.adminUrl,
                        path: itemInner.path,
                    };
                    return (h("li", { class: `flex flex-col` }, h("div", { class: `${this.h2} inline-grid grid-flow-col auto-cols-max py-3 items-center` }, h("div", { role: "button", tabIndex: 0, onClick: () => getMenu(obj), onKeyPress: (e) => {
                            if (e.key === "Enter") {
                                getMenu(obj);
                            }
                        }, class: `${this.tag} focus-white-out hover:text-blue-gray-50 hover:bg-blue-gray-900 hover:border-blue-gray-900` }, itemInner.domain), h("p", { class: `${this.p} ml-2` }, h("span", { class: `font-semibold` }, "Path: "), itemInner.path, h("span", { class: `font-semibold` }, " ID: "), itemInner.blog_id))));
                }))));
            });
        };
        // @ts-ignore
        this.fav = () => {
            var _a;
            return (((_a = state$1.entriesFavActive) === null || _a === void 0 ? void 0 : _a.length) >= 1 &&
                (state$1.entriesFavActive || state$1.entriesFav) &&
                Object.values((state$1.entriesFavActive || state$1.entriesFav)).map((item) => {
                    return item.type
                        ? this[item.type === "networkMenu" ? "menu" : item.type]([item])
                        : StreamlineEntries$1.getHeader(item);
                }));
        };
        // @ts-ignore
        this.menu = (arr = []) => {
            return Object.values(this.getArr(arr, "menu")).map((item) => {
                return (h("div", null, StreamlineEntries$1.getHeader(item), h("ul", null, Object.values(item.children).map((itemInner, indexInner) => {
                    return (h("li", { key: indexInner, class: `${this.border} flex flex-col pb-4 sm:flex-row` }, h("h2", { class: `${this.h2} mt-4 mr-4 leading-1 inline-block break-words sm:min-w-[120px] md:min-w-[200px]` }, itemInner.name), itemInner.children && (h("ul", { class: `flex flex-wrap` }, Object.values(itemInner.children).map((itemSub, indexSub) => {
                        return (h("li", { key: indexSub, class: `mt-4 mr-4` }, h("streamline-button", { type: "menu", adminUrl: item.adminUrl, href: itemSub.href, index: item.index, indexInner: itemInner.index, indexSub: itemSub.index, path: itemSub.path, siteId: itemSub.siteId, text: itemSub.name, typeSub: itemSub.type })));
                    })))));
                }))));
            });
        };
        // @ts-ignore
        this.post = (arr = []) => {
            return Object.values(this.getArr(arr, "post")).map((item) => {
                return (h("div", null, StreamlineEntries$1.getHeader(item), h("ul", null, Object.values(item.children).map((itemInner) => {
                    return (h("li", { class: `${this.border} flex flex-col py-3` }, h("streamline-post", { "href-edit": itemInner.hrefEdit, "href-view": itemInner.guid, "post-id": itemInner.ID, "post-title": itemInner.post_title, "post-type": itemInner.post_type, "post-slug": itemInner.post_name, "site-id": itemInner.siteId })));
                }))));
            });
        };
        this.settingsOnChange = (id, type, value) => {
            state$1.entriesSettingsSave = Object.assign(Object.assign({}, state$1.entriesSettingsSave), {
                [id]: Object.assign(Object.assign({}, state$1.entriesSettingsSave[id]), {
                    [type]: value,
                }),
            });
        };
        // @ts-ignore
        this.settings = () => {
            return Object.values(state$1.entriesSettingsActive).map((item) => {
                return (h("div", null, StreamlineEntries$1.getHeader(item), h("ul", { class: `space-y-4` }, Object.values(item.children).map((itemInner, indexInner) => {
                    return (h("li", { key: indexInner, class: `${indexInner === 0 ? this.border : ""} flex flex-col` }, h("h2", { class: `${this.h2} !text-lg mt-4 space-y-2 mb-6 inline-block leading-1 pb-2 border-b border-blue-gray-200` }, itemInner.name), itemInner.children && (h("ul", { class: `flex flex-col space-y-5` }, Object.values(itemInner.children).map((itemSub, indexSub) => {
                        return (h("li", { key: indexSub, class: `flex items-center mr-4` }, h("label", { htmlFor: `setting-${itemSub.id}`, class: `grid grid-cols-[75px,1fr] gap-6 select-none group ${itemSub.choices ? "" : "cursor-pointer"}` }, h("div", { class: "relative mt-0.5 inline-block h-[max-content] w-[max-content] focus-in-white-out" }, h("input", { type: "checkbox", id: `setting-${itemSub.id}`, class: "sr-only peer", checked: state$1.entriesSettingsLoad[itemSub.id].default, onInput: (e) => this.settingsOnChange(itemSub.id, "default", e.target.checked) }), h("div", { class: "block bg-blue-gray-300 w-14 h-5 transition ease-in-out duration-200 group-hover:bg-blue-gray-400 peer-checked:bg-blue-500" }), h("div", { class: "dot absolute left-1 top-1 bg-white w-3 h-3 transition ease-in-out duration-200" })), h("div", null, h("div", { class: "text-base text-blue-gray-900 font-medium" }, itemSub.name), h("div", { class: "mt-0.5 text-xs text-blue-gray-500" }, itemSub.label)))));
                    })))));
                }))));
            });
        };
    }
    connectedCallback() {
        if ((state$1.data.isAdmin || state.active === "menu") &&
            state$1.entriesMenu.length === 0) {
            getMenu({});
        }
        setEntries();
    }
    static getHeader(item) {
        var _a, _b;
        let menuNumber = 0;
        if (item.type === "menu" || item.type === "networkMenu") {
            Object.values(item.children).forEach((itemNested) => {
                Object.values(itemNested.children).forEach(() => {
                    menuNumber++;
                });
            });
        }
        const results = `Showing ${item.type === "post"
            ? Object.values(item.children).length
            : state$1.isSites
                ? Object.values(item.children).length
                : item.type === "menu" || item.type === "networkMenu"
                    ? menuNumber
                    : "0"} ${(item.type === "post" && Object.values(item.children).length === 1) ||
            (state$1.isSites && Object.values(item.children).length === 1) ||
            ((item.type === "menu" || item.type === "networkMenu") &&
                menuNumber === 1)
            ? `result`
            : `results`}
    `;
        const path = item.isMultisite && !state$1.test ? ` (subsite: ${item.path})` : "";
        return (h("div", { class: `${state.active === "settings"
                ? "flex-row justify-between"
                : "flex-col sm:justify-between"} min-h-[60px] pt-5 flex items-start flex-wrap mb-1 pb-1.5 flex sticky -top-2 bg-white z-10 border-b border-dotted border-blue-gray-900 sm:min-h-[75px] sm:mb-4 sm:flex-row sm:items-center sm:pt-6 sm:pb-2 sm:-top-2 lg:pt-8 lg:-top-4` }, h("div", { class: `flex items-center flex-row` }, state.active === "fav" &&
            state$1.entriesFavActive[0].children.length !== 0 && (h("div", { class: `scale-90 rounded-full flex-shrink-0 bg-blue-gray-100 text-gray-500 border border-blue-gray-200 w-8 h-8 flex items-center justify-center p-2 mr-3` }, (item.type === "menu" || item.type === "networkMenu") && (h(IconMenu, null)), item.type === "post" && h(IconPost, null))), h("h1", { class: `text-blue-gray-900 font-medium text-xl mr-6`, innerHTML: `${state$1.isSlash && !state$1.isSites
                ? item.title
                : item.type === "networkMenu" ||
                    (state$1.entriesMenuIsNetwork &&
                        state.active === "menu" &&
                        !state$1.isSites)
                    ? "Network admin"
                    : (state.active === "menu" && !state$1.isSlash) ||
                        item.type === "menu" ||
                        item.type === "networkMenu"
                        ? "Admin menu" + path
                        : (state.active === "post" || item.type === "site") &&
                            state.active !== "fav" &&
                            ((_a = state$1[`entries${state.active === "post" ? "Post" : "Site"}`][0]) === null || _a === void 0 ? void 0 : _a.queryValue)
                            ? `${state$1.isSites
                                ? "Site"
                                : capitalizeFirstLetter(state.active)}s for: ` +
                                `<span class="text-gray-400 italic">${(_b = state$1[`entries${state.active === "post" ? "Post" : "Site"}`][0]) === null || _b === void 0 ? void 0 : _b.queryValue}</span>` +
                                path
                            : (item.type === "post" || item.type === "site") &&
                                state.active === "fav"
                                ? `${capitalizeFirstLetter(item.type)}s` + path
                                : state.active === "post" &&
                                    Object.values(state$1.entriesPostActive[0].children)
                                        .length === 0 &&
                                    !item.queryValue
                                    ? "No query, search for a post in the search bar"
                                    : state.active === "settings"
                                        ? "Settings"
                                        : "No results"}` })), h("div", { class: `flex flex-wrap space-x-4 divide-x` }, Object.values([
            {
                type: "text",
                text: results,
                condition: state$1.isSites ||
                    state.active === "post" ||
                    state.active === "fav" ||
                    (state.active === "menu" && !state$1.isSlash),
            },
            {
                type: "button",
                text: "Save",
                condition: state.active === "settings",
                onClick: () => {
                    if (!state$1.test) {
                        fetchAjax({
                            type: "settings",
                            query: state$1.entriesSettingsSave,
                            callback: () => {
                                // @ts-ignore
                                state$1.entriesSettingsLoad =
                                    state$1.entriesSettingsSave;
                            },
                        });
                    }
                    else {
                        // @ts-ignore
                        state$1.entriesSettingsLoad =
                            state$1.entriesSettingsSave;
                    }
                },
            },
        ]).map((itemInner, itemIndex) => {
            return itemInner.condition && itemInner.type === "text" ? (h("span", { class: `results-amount text-xs mt-1.5 sm:my-1.5 font-medium text-gray-700 sm:text-sm ${itemIndex === 0 ? "" : "pl-4"}` }, itemInner.text)) : (itemInner.condition && itemInner.type === "button" && (h("streamline-button", { onClick: itemInner.onClick, tabindex: state$1.entriesSettingsHaveChanged ? 0 : -1, invalid: !state$1.entriesSettingsHaveChanged, type: "saveSettings", styling: "primary", text: itemInner.text })));
        }))));
    }
    render() {
        return (h("div", { class: `h-full relative lg:h-[calc(100%+64px)]` }, state$1.isLoading ? (h("div", { class: `w-full h-[calc(100%-var(--sl-side-w))] flex items-center justify-center bg-white/50 absolute top-0 left-0 backdrop-blur-sm z-10` }, h(Loader, { sm: false }))) : (h("div", { tabindex: -1, class: `focus-none inner pb-6 relative px-3 h-[calc(100%-var(--sl-side-w))] overflow-y-scroll overflow-x-hidden w-full bg-white sm:px-6 lg:px-8 lg:pb-10 ${state$1.isProcessing ? "pointer-events-none opacity-50" : ""}` }, state$1.isSlash && !state$1.isSites
            ? this.slash()
            : state$1.isSites
                ? this.site()
                : this[`${state.active}`]()))));
    }
    get el() { return this; }
    static get style() { return streamlineEntriesCss + '/*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-transform:translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));--tw-border-opacity:1;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-backdrop-blur:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-brightness:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-contrast:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-grayscale:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-hue-rotate:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-invert:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-opacity:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-saturate:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-sepia:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);border:0 solid;border-color:rgba(228,228,231,var(--tw-border-opacity));box-sizing:border-box}button,input{color:inherit;font-family:inherit;font-size:100%;line-height:1.15;line-height:inherit;margin:0;padding:0}button{background-color:transparent;background-image:none;text-transform:none}[type=button],button{-webkit-appearance:button}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}h1,h2,p,ul{margin:0}ul{list-style:none;padding:0}input::-moz-placeholder{color:#a1a1aa;opacity:1}input:-ms-input-placeholder{color:#a1a1aa;opacity:1}input::placeholder{color:#a1a1aa;opacity:1}[role=button],button{cursor:pointer}h1,h2{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}.sr-only{clip:rect(0,0,0,0);border-width:0;height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}.pointer-events-none{pointer-events:none}.static{position:static}.absolute{position:absolute}.relative{position:relative}.sticky{position:-webkit-sticky;position:sticky}.-top-2{top:-.5rem}.left-1{left:.25rem}.top-1{top:.25rem}.top-0{top:0}.left-0{left:0}.z-10{z-index:10}.mb-1{margin-bottom:.25rem}.mr-3{margin-right:.75rem}.mr-6{margin-right:1.5rem}.mt-1\\.5{margin-top:.375rem}.mt-1{margin-top:.25rem}.mb-2{margin-bottom:.5rem}.ml-2{margin-left:.5rem}.mt-4{margin-top:1rem}.mr-4{margin-right:1rem}.mb-6{margin-bottom:1.5rem}.mt-0\\.5{margin-top:.125rem}.mt-0{margin-top:0}.block{display:block}.inline-block{display:inline-block}.flex{display:flex}.grid{display:grid}.inline-grid{display:inline-grid}.h-\\[max-content\\]{height:-webkit-max-content;height:-moz-max-content;height:max-content}.h-8{height:2rem}.h-5{height:1.25rem}.h-3{height:.75rem}.h-full{height:100%}.h-\\[calc\\(100\\%-var\\(--sl-side-w\\)\\)\\]{height:calc(100% - var(--sl-side-w))}.min-h-\\[60px\\]{min-height:60px}.w-8{width:2rem}.w-\\[max-content\\]{width:-webkit-max-content;width:-moz-max-content;width:max-content}.w-14{width:3.5rem}.w-3{width:.75rem}.w-full{width:100%}.flex-shrink-0{flex-shrink:0}.scale-90{--tw-scale-x:.9;--tw-scale-y:.9;transform:var(--tw-transform)}.cursor-pointer{cursor:pointer}.select-none{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.auto-cols-max{grid-auto-columns:-webkit-max-content;grid-auto-columns:max-content}.grid-flow-col{grid-auto-flow:column}.grid-cols-\\[75px\\2c 1fr\\]{grid-template-columns:75px 1fr}.flex-row{flex-direction:row}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-start{align-items:flex-start}.items-center{align-items:center}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-6{gap:1.5rem}.space-x-4>:not([hidden])~:not([hidden]){--tw-space-x-reverse:0;margin-left:calc(1rem*(1 - var(--tw-space-x-reverse)));margin-right:calc(1rem*var(--tw-space-x-reverse))}.space-y-4>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-bottom:calc(1rem*var(--tw-space-y-reverse));margin-top:calc(1rem*(1 - var(--tw-space-y-reverse)))}.space-y-2>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-bottom:calc(.5rem*var(--tw-space-y-reverse));margin-top:calc(.5rem*(1 - var(--tw-space-y-reverse)))}.space-y-5>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-bottom:calc(1.25rem*var(--tw-space-y-reverse));margin-top:calc(1.25rem*(1 - var(--tw-space-y-reverse)))}.divide-x>:not([hidden])~:not([hidden]){--tw-divide-x-reverse:0;border-left-width:calc(1px*(1 - var(--tw-divide-x-reverse)));border-right-width:calc(1px*var(--tw-divide-x-reverse))}.overflow-x-hidden{overflow-x:hidden}.overflow-y-scroll{overflow-y:scroll}.break-words{overflow-wrap:break-word}.rounded-full{border-radius:9999px}.border{border-width:1px}.border-t{border-top-width:1px}.border-b{border-bottom-width:1px}.border-dotted{border-style:dotted}.border-blue-gray-100{--tw-border-opacity:1;border-color:rgba(241,245,249,var(--tw-border-opacity))}.border-blue-gray-900{--tw-border-opacity:1;border-color:rgba(15,23,42,var(--tw-border-opacity))}.border-blue-gray-200{--tw-border-opacity:1;border-color:rgba(226,232,240,var(--tw-border-opacity))}.bg-blue-gray-200{--tw-bg-opacity:1;background-color:rgba(226,232,240,var(--tw-bg-opacity))}.bg-white{--tw-bg-opacity:1;background-color:rgba(255,255,255,var(--tw-bg-opacity))}.bg-blue-gray-100{--tw-bg-opacity:1;background-color:rgba(241,245,249,var(--tw-bg-opacity))}.bg-blue-gray-300{--tw-bg-opacity:1;background-color:rgba(203,213,225,var(--tw-bg-opacity))}.bg-white\\/50{background-color:hsla(0,0%,100%,.5)}.p-2{padding:.5rem}.px-2\\.5{padding-left:.625rem;padding-right:.625rem}.py-1\\.5{padding-bottom:.375rem;padding-top:.375rem}.px-2{padding-left:.5rem;padding-right:.5rem}.py-1{padding-bottom:.25rem;padding-top:.25rem}.py-3{padding-bottom:.75rem;padding-top:.75rem}.px-3{padding-left:.75rem;padding-right:.75rem}.pt-5{padding-top:1.25rem}.pb-1\\.5{padding-bottom:.375rem}.pb-1{padding-bottom:.25rem}.pl-4{padding-left:1rem}.pb-4{padding-bottom:1rem}.pb-2{padding-bottom:.5rem}.pb-6{padding-bottom:1.5rem}.text-base{font-size:1rem;line-height:1.5rem}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-xs{font-size:.75rem;line-height:1rem}.\\!text-lg{font-size:1.125rem!important;line-height:1.75rem!important}.font-medium{font-weight:500}.font-normal{font-weight:400}.font-semibold{font-weight:600}.italic{font-style:italic}.text-blue-gray-900{--tw-text-opacity:1;color:rgba(15,23,42,var(--tw-text-opacity))}.text-blue-gray-600{--tw-text-opacity:1;color:rgba(71,85,105,var(--tw-text-opacity))}.text-blue-gray-500{--tw-text-opacity:1;color:rgba(100,116,139,var(--tw-text-opacity))}.text-gray-500{--tw-text-opacity:1;color:rgba(113,113,122,var(--tw-text-opacity))}.text-gray-400{--tw-text-opacity:1;color:rgba(161,161,170,var(--tw-text-opacity))}.text-gray-700{--tw-text-opacity:1;color:rgba(63,63,70,var(--tw-text-opacity))}.opacity-50{opacity:.5}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.backdrop-blur-sm{--tw-backdrop-blur:blur(4px);-webkit-backdrop-filter:var(--tw-backdrop-filter);backdrop-filter:var(--tw-backdrop-filter)}.transition{transition-duration:.15s;transition-property:background-color,border-color,color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;transition-property:background-color,border-color,color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:background-color,border-color,color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1)}.duration-200{transition-duration:.2s}.ease-in-out{transition-timing-function:cubic-bezier(.4,0,.2,1)}.first-of-type\\:border-none:first-of-type{border-style:none}.hover\\:border-blue-gray-900:hover{--tw-border-opacity:1;border-color:rgba(15,23,42,var(--tw-border-opacity))}.hover\\:bg-blue-gray-900:hover{--tw-bg-opacity:1;background-color:rgba(15,23,42,var(--tw-bg-opacity))}.hover\\:text-blue-gray-50:hover{--tw-text-opacity:1;color:rgba(248,250,252,var(--tw-text-opacity))}.group:hover .group-hover\\:bg-blue-gray-400{--tw-bg-opacity:1;background-color:rgba(148,163,184,var(--tw-bg-opacity))}.peer:checked~.peer-checked\\:bg-blue-500{--tw-bg-opacity:1;background-color:rgba(59,130,246,var(--tw-bg-opacity))}@media (min-width:640px){.sm\\:-top-2{top:-.5rem}.sm\\:my-1\\.5{margin-bottom:.375rem;margin-top:.375rem}.sm\\:my-1{margin-bottom:.25rem;margin-top:.25rem}.sm\\:mb-4{margin-bottom:1rem}.sm\\:min-h-\\[75px\\]{min-height:75px}.sm\\:min-w-\\[120px\\]{min-width:120px}.sm\\:flex-row{flex-direction:row}.sm\\:items-center{align-items:center}.sm\\:justify-between{justify-content:space-between}.sm\\:px-6{padding-left:1.5rem;padding-right:1.5rem}.sm\\:pt-6{padding-top:1.5rem}.sm\\:pb-2{padding-bottom:.5rem}.sm\\:text-sm{font-size:.875rem;line-height:1.25rem}}@media (min-width:768px){.md\\:min-w-\\[200px\\]{min-width:200px}}@media (min-width:1024px){.lg\\:-top-4{top:-1rem}.lg\\:h-\\[calc\\(100\\%\\+64px\\)\\]{height:calc(100% + 64px)}.lg\\:px-8{padding-left:2rem;padding-right:2rem}.lg\\:pt-8{padding-top:2rem}.lg\\:pb-10{padding-bottom:2.5rem}}'; }
};

const streamlineInputCss = ":host{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;box-sizing:border-box}:host .focus:focus{box-shadow:inset 0 0 0 4px #f8fafc,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-border:focus{border-color:var(--sl-focus-color);box-shadow:0 0 0 1px var(--sl-focus-color);outline:none!important}:host .focus-out:focus{box-shadow:0 0 0 2px #f8fafc,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-dark:focus{box-shadow:inset 0 0 0 4px #0f172a,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-darker:focus{box-shadow:inset 0 0 0 4px #020204,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-white:focus{box-shadow:inset 0 0 0 4px #fff,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-white-out:focus{box-shadow:0 0 0 2px #fff,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-in-white-out:focus-within{box-shadow:0 0 0 2px #fff,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-none:focus{box-shadow:none!important;outline:none!important}:host .border-invalid{border-color:var(--sl-focus-color-invalid);box-shadow:0 0 0 1px var(--sl-focus-color-invalid);outline:none!important}/*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{--tw-blur:var(--tw-empty,/*!*/ /*!*/);--tw-brightness:var(--tw-empty,/*!*/ /*!*/);--tw-contrast:var(--tw-empty,/*!*/ /*!*/);--tw-grayscale:var(--tw-empty,/*!*/ /*!*/);--tw-hue-rotate:var(--tw-empty,/*!*/ /*!*/);--tw-invert:var(--tw-empty,/*!*/ /*!*/);--tw-saturate:var(--tw-empty,/*!*/ /*!*/);--tw-sepia:var(--tw-empty,/*!*/ /*!*/);--tw-drop-shadow:var(--tw-empty,/*!*/ /*!*/);--tw-filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);border:0 solid;box-sizing:border-box}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}a{color:inherit;text-decoration:inherit}.visible{visibility:visible}.inline-block{display:inline-block}.h-\\[max-content\\]{height:-webkit-max-content;height:-moz-max-content;height:max-content}.bg-blue-gray-200{--tw-bg-opacity:1;background-color:rgba(226,232,240,var(--tw-bg-opacity))}.px-2\\.5{padding-left:.625rem;padding-right:.625rem}.py-1\\.5{padding-bottom:.375rem;padding-top:.375rem}.px-2{padding-left:.5rem;padding-right:.5rem}.py-1{padding-bottom:.25rem;padding-top:.25rem}.text-blue-gray-500{--tw-text-opacity:1;color:rgba(100,116,139,var(--tw-text-opacity))}.blur{--tw-blur:blur(8px);filter:var(--tw-filter)}/*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */";

let StreamlineInput$1 = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.onInput = (e) => {
            this.value = e.target.value;
            this.invalid = this.value === "";
            const parent = this.el.getRootNode().host;
            setTimeout(() => {
                if ((parent === null || parent === void 0 ? void 0 : parent.tagName) === "STREAMLINE-POST") {
                    const invalid = parent.shadowRoot.querySelectorAll("streamline-input[invalid]");
                    const isValid = invalid.length === 0;
                    if (!isValid) {
                        parent.setAttribute("invalid", "true");
                    }
                    else {
                        parent.removeAttribute("invalid");
                    }
                }
            }, 50);
        };
    }
    componentDidLoad() {
        onChange$1("isProcessing", (value) => {
            if (value === true) {
                this.input.blur();
            }
        });
    }
    render() {
        return (h("div", { class: "relative mt-1 w-full" }, h("input", { ref: (el) => (this.input = el), type: "text", id: this.ident, name: this.ident, value: this.value, placeholder: this.placeholder, onInput: this.onInput, class: `peer px-3 h-10 w-full border border-blue-gray-300 font-medium text-sm text-blue-gray-900 placeholder-transparent bg-white focus:outline-none focus-border ${this.invalid ? "border-invalid" : ""}` }), h("label", { htmlFor: this.ident, class: `px-2 py-1 left-1 bg-white pointer-events-none absolute -top-3 text-blue-gray-500 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:-top-3 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-blue-gray-500` }, this.placeholder)));
    }
    get el() { return this; }
    static get style() { return streamlineInputCss + '/*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-transform:translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));--tw-border-opacity:1;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-blur:var(--tw-empty,/*!*/ /*!*/);--tw-brightness:var(--tw-empty,/*!*/ /*!*/);--tw-contrast:var(--tw-empty,/*!*/ /*!*/);--tw-grayscale:var(--tw-empty,/*!*/ /*!*/);--tw-hue-rotate:var(--tw-empty,/*!*/ /*!*/);--tw-invert:var(--tw-empty,/*!*/ /*!*/);--tw-saturate:var(--tw-empty,/*!*/ /*!*/);--tw-sepia:var(--tw-empty,/*!*/ /*!*/);--tw-drop-shadow:var(--tw-empty,/*!*/ /*!*/);--tw-filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);border:0 solid;border-color:rgba(228,228,231,var(--tw-border-opacity));box-sizing:border-box}input{color:inherit;font-family:inherit;font-size:100%;line-height:1.15;line-height:inherit;margin:0;padding:0}input::-moz-placeholder{color:#a1a1aa;opacity:1}input:-ms-input-placeholder{color:#a1a1aa;opacity:1}input::placeholder{color:#a1a1aa;opacity:1}.pointer-events-none{pointer-events:none}.absolute{position:absolute}.relative{position:relative}.left-1{left:.25rem}.-top-3{top:-.75rem}.mt-1{margin-top:.25rem}.h-10{height:2.5rem}.w-full{width:100%}.border{border-width:1px}.border-blue-gray-300{--tw-border-opacity:1;border-color:rgba(203,213,225,var(--tw-border-opacity))}.bg-white{--tw-bg-opacity:1;background-color:rgba(255,255,255,var(--tw-bg-opacity))}.px-3{padding-left:.75rem;padding-right:.75rem}.px-2{padding-left:.5rem;padding-right:.5rem}.py-1{padding-bottom:.25rem;padding-top:.25rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-xs{font-size:.75rem;line-height:1rem}.font-medium{font-weight:500}.text-blue-gray-900{--tw-text-opacity:1;color:rgba(15,23,42,var(--tw-text-opacity))}.text-blue-gray-500{--tw-text-opacity:1;color:rgba(100,116,139,var(--tw-text-opacity))}.placeholder-transparent::-moz-placeholder{color:transparent}.placeholder-transparent:-ms-input-placeholder{color:transparent}.placeholder-transparent::placeholder{color:transparent}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.blur{--tw-blur:blur(8px);filter:var(--tw-filter)}.transition-all{transition-duration:.15s;transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1)}.focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}.peer:-moz-placeholder-shown~.peer-placeholder-shown\\:top-1\\/2{top:50%}.peer:-ms-input-placeholder~.peer-placeholder-shown\\:top-1\\/2{top:50%}.peer:placeholder-shown~.peer-placeholder-shown\\:top-1\\/2{top:50%}.peer:-moz-placeholder-shown~.peer-placeholder-shown\\:-translate-y-1\\/2{--tw-translate-y:-50%;transform:var(--tw-transform)}.peer:-ms-input-placeholder~.peer-placeholder-shown\\:-translate-y-1\\/2{--tw-translate-y:-50%;transform:var(--tw-transform)}.peer:placeholder-shown~.peer-placeholder-shown\\:-translate-y-1\\/2{--tw-translate-y:-50%;transform:var(--tw-transform)}.peer:-moz-placeholder-shown~.peer-placeholder-shown\\:text-base{font-size:1rem;line-height:1.5rem}.peer:-ms-input-placeholder~.peer-placeholder-shown\\:text-base{font-size:1rem;line-height:1.5rem}.peer:placeholder-shown~.peer-placeholder-shown\\:text-base{font-size:1rem;line-height:1.5rem}.peer:-moz-placeholder-shown~.peer-placeholder-shown\\:text-blue-gray-500{--tw-text-opacity:1;color:rgba(100,116,139,var(--tw-text-opacity))}.peer:-ms-input-placeholder~.peer-placeholder-shown\\:text-blue-gray-500{--tw-text-opacity:1;color:rgba(100,116,139,var(--tw-text-opacity))}.peer:placeholder-shown~.peer-placeholder-shown\\:text-blue-gray-500{--tw-text-opacity:1;color:rgba(100,116,139,var(--tw-text-opacity))}.peer:focus~.peer-focus\\:-top-3{top:-.75rem}.peer:focus~.peer-focus\\:translate-y-0{--tw-translate-y:0px;transform:var(--tw-transform)}.peer:focus~.peer-focus\\:text-xs{font-size:.75rem;line-height:1rem}.peer:focus~.peer-focus\\:text-blue-gray-500{--tw-text-opacity:1;color:rgba(100,116,139,var(--tw-text-opacity))}'; }
};

const streamlinePostCss = ":host{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;box-sizing:border-box}:host .focus:focus{box-shadow:inset 0 0 0 4px #f8fafc,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-border:focus{border-color:var(--sl-focus-color);box-shadow:0 0 0 1px var(--sl-focus-color);outline:none!important}:host .focus-out:focus{box-shadow:0 0 0 2px #f8fafc,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-dark:focus{box-shadow:inset 0 0 0 4px #0f172a,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-darker:focus{box-shadow:inset 0 0 0 4px #020204,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-white:focus{box-shadow:inset 0 0 0 4px #fff,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-white-out:focus{box-shadow:0 0 0 2px #fff,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-in-white-out:focus-within{box-shadow:0 0 0 2px #fff,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-none:focus{box-shadow:none!important;outline:none!important}:host .border-invalid{border-color:var(--sl-focus-color-invalid);box-shadow:0 0 0 1px var(--sl-focus-color-invalid);outline:none!important}/*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{--tw-blur:var(--tw-empty,/*!*/ /*!*/);--tw-brightness:var(--tw-empty,/*!*/ /*!*/);--tw-contrast:var(--tw-empty,/*!*/ /*!*/);--tw-grayscale:var(--tw-empty,/*!*/ /*!*/);--tw-hue-rotate:var(--tw-empty,/*!*/ /*!*/);--tw-invert:var(--tw-empty,/*!*/ /*!*/);--tw-saturate:var(--tw-empty,/*!*/ /*!*/);--tw-sepia:var(--tw-empty,/*!*/ /*!*/);--tw-drop-shadow:var(--tw-empty,/*!*/ /*!*/);--tw-filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);--tw-border-opacity:1;border:0 solid;border:0 solid rgba(228,228,231,var(--tw-border-opacity));box-sizing:border-box}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}a{color:inherit;text-decoration:inherit}.visible{visibility:visible}.inline-block{display:inline-block}.h-\\[max-content\\]{height:-webkit-max-content;height:-moz-max-content;height:max-content}.bg-blue-gray-200{--tw-bg-opacity:1;background-color:rgba(226,232,240,var(--tw-bg-opacity))}.px-2\\.5{padding-left:.625rem;padding-right:.625rem}.py-1\\.5{padding-bottom:.375rem;padding-top:.375rem}.px-2{padding-left:.5rem;padding-right:.5rem}.py-1{padding-bottom:.25rem;padding-top:.25rem}.text-blue-gray-500{--tw-text-opacity:1;color:rgba(100,116,139,var(--tw-text-opacity))}.blur{--tw-blur:blur(8px);filter:var(--tw-filter)}/*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */.pointer-events-none{pointer-events:none}.flex{display:flex}.h-4{height:1rem}.h-full{height:100%}.w-4{width:1rem}.w-full{width:100%}.items-center{align-items:center}.justify-center{justify-content:center}.rounded-full{border-radius:9999px}.border{border-width:1px}.border-blue-gray-200{--tw-border-opacity:1;border-color:rgba(226,232,240,var(--tw-border-opacity))}.bg-white{--tw-bg-opacity:1;background-color:rgba(255,255,255,var(--tw-bg-opacity))}.text-red-500{--tw-text-opacity:1;color:rgba(239,68,68,var(--tw-text-opacity))}/*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize *//*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize *//*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize *//*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */";

let StreamlinePost$1 = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.handleClickEdit = () => {
            this.edit = !this.edit;
            if (!this.edit) {
                this.invalid = false;
            }
        };
        this.handleClickSave = () => {
            if (!this.invalid) {
                const obj = {
                    postId: this.postId,
                    siteId: this.siteId,
                    values: {},
                };
                this.el.shadowRoot
                    .querySelectorAll("streamline-input")
                    .forEach((item) => {
                    const key = item.getAttribute("ident");
                    obj.values[key] = item.value;
                });
                [
                    "entriesFav",
                    "entriesFavActive",
                    "entriesPost",
                    "entriesPostActive",
                ].forEach((item) => {
                    state$1[item].forEach(() => {
                        const newFavs = [...state$1[item]];
                        const path = findDeep(newFavs, (o) => {
                            return o.siteId === this.siteId && o.ID === this.postId;
                        }, {
                            childrenPath: ["children"],
                        });
                        if (path) {
                            const currentPath = path.context["_item"].strPath;
                            set(newFavs, `${currentPath}.name`, obj.values["post_title"]);
                            set(newFavs, `${currentPath}.post_title`, obj.values["post_title"]);
                            set(newFavs, `${currentPath}.post_name`, obj.values["post_name"]);
                            state$1[item] = newFavs;
                        }
                    });
                });
                if (!state$1.test) {
                    fetchAjax({
                        type: "post",
                        query: obj,
                    });
                }
            }
        };
        this.handleClickFav = () => {
            setFavourite({
                favourite: this.favourite,
                callback: this.checkIfFav,
                type: "post",
                filter: (o) => {
                    return o.ID === this.postId && o.siteId === this.siteId;
                },
                path: (o) => {
                    return o.type === "post" && o.siteId === this.siteId;
                },
                pathFav: (o) => {
                    return (o.ID === this.postId &&
                        o.siteId === this.siteId &&
                        o.post_title === this.postTitle);
                },
            });
        };
        this.checkIfFav = () => {
            this.favourite = someDeep(state$1.entriesFav, (o) => {
                return (o === null || o === void 0 ? void 0 : o.ID) === this.postId && (o === null || o === void 0 ? void 0 : o.siteId) === this.siteId;
            }, { childrenPath: ["children"] });
        };
    }
    onKeyEnter(e) {
        if (e.key === "Enter" && this.edit && !this.invalid) {
            this.handleClickSave();
        }
    }
    componentWillRender() {
        this.checkIfFav();
    }
    render() {
        const className = "inline-block px-2.5 py-2 text-blue-600 text-sm flex items-center hover:underline";
        return (h("div", { class: `flex flex-col sm:flex-row` }, h("div", { class: `w-[max-content] mb-3 px-2.5 py-1.5 bg-blue-gray-100 border border-blue-gray-200 text-blue-gray-500 inline-block h-[max-content] leading-1 mr-4 !text-xs relative top-1.5 font-semibold uppercase sm:mb-0` }, this.postType), h("div", { class: `flex flex-col w-full -ml-2.5` }, h("div", { class: `flex flex-wrap items-center` }, h("button", { onClick: this.handleClickEdit, class: `${this.edit
                ? "text-rose-500 hover:text-rose-600"
                : "hover:text-blue-600"} ml-3 w-5 h-5 p-1 flex justify-center items-center focus-white-out inline-block` }, this.edit ? h(IconTimes, null) : h(IconPen, null)), h("span", { class: `post-title focus-white inline-flex max-w-max font-semibold flex-col px-2.5 text-base py-2` }, this.postTitle), h("span", { class: `text-sm inline-block ml-2 text-gray-600` }, "(", h("strong", null, "slug:"), " ", this.postSlug, ")")), this.edit ? (h("div", { class: `${state.active === "post" ? "mb-4" : ""} ml-3 mt-2` }, h("h3", { class: `text-lg font-medium` }, "Edit this post (ID: ", h("strong", null, this.postId), ")"), h("div", { class: `my-4 grid gap-2 sm:grid-cols-2 md:grid-cols-3` }, h("streamline-input", { ident: "post_title", placeholder: "Title", value: this.postTitle }), h("streamline-input", { ident: "post_name", placeholder: "Slug", value: this.postSlug })), h("streamline-button", { invalid: this.invalid, onClick: this.handleClickSave, styling: "primary", text: "Save post" }))) : (h("div", { class: `flex flex-wrap` }, [
            {
                text: "Favourite",
                onClick: this.handleClickFav,
            },
            {
                text: "View",
                href: state$1.test ? "#" : this.hrefView,
            },
            {
                text: "Edit",
                href: state$1.test
                    ? "#"
                    : atob(this.hrefEdit).replace("&amp;", "&"),
            },
        ].map((item) => {
            return item.href ? (h("a", { href: item.href, class: className + ` focus-white` }, item.text)) : (h("button", { class: className + ` focus-white`, onClick: item.onClick }, this.favourite && item.text === "Favourite"
                ? "Unfavourite"
                : item.text, this.favourite &&
                item.text === "Favourite" &&
                state.active !== "fav" && h(Fav, { class: "ml-2" })));
        }))))));
    }
    get el() { return this; }
    static get style() { return streamlinePostCss + '/*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{--tw-border-opacity:1;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-blur:var(--tw-empty,/*!*/ /*!*/);--tw-brightness:var(--tw-empty,/*!*/ /*!*/);--tw-contrast:var(--tw-empty,/*!*/ /*!*/);--tw-grayscale:var(--tw-empty,/*!*/ /*!*/);--tw-hue-rotate:var(--tw-empty,/*!*/ /*!*/);--tw-invert:var(--tw-empty,/*!*/ /*!*/);--tw-saturate:var(--tw-empty,/*!*/ /*!*/);--tw-sepia:var(--tw-empty,/*!*/ /*!*/);--tw-drop-shadow:var(--tw-empty,/*!*/ /*!*/);--tw-filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);border:0 solid;border-color:rgba(228,228,231,var(--tw-border-opacity));box-sizing:border-box}strong{font-weight:bolder}button{background-color:transparent;background-image:none;color:inherit;cursor:pointer;font-family:inherit;font-size:100%;line-height:1.15;line-height:inherit;margin:0;padding:0;text-transform:none}[type=button],button{-webkit-appearance:button}h3{font-size:inherit;font-weight:inherit;margin:0}a{color:inherit;text-decoration:inherit}.relative{position:relative}.top-1\\.5{top:.375rem}.top-1{top:.25rem}.my-4{margin-bottom:1rem;margin-top:1rem}.mb-3{margin-bottom:.75rem}.mr-4{margin-right:1rem}.-ml-2\\.5{margin-left:-.625rem}.-ml-2{margin-left:-.5rem}.ml-3{margin-left:.75rem}.ml-2{margin-left:.5rem}.mb-4{margin-bottom:1rem}.mt-2{margin-top:.5rem}.inline-block{display:inline-block}.flex{display:flex}.inline-flex{display:inline-flex}.grid{display:grid}.h-\\[max-content\\]{height:-webkit-max-content;height:-moz-max-content;height:max-content}.h-5{height:1.25rem}.w-\\[max-content\\]{width:-webkit-max-content;width:-moz-max-content;width:max-content}.w-full{width:100%}.w-5{width:1.25rem}.max-w-max{max-width:-webkit-max-content;max-width:-moz-max-content;max-width:max-content}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-center{align-items:center}.justify-center{justify-content:center}.gap-2{gap:.5rem}.border{border-width:1px}.border-blue-gray-200{--tw-border-opacity:1;border-color:rgba(226,232,240,var(--tw-border-opacity))}.bg-blue-gray-100{--tw-bg-opacity:1;background-color:rgba(241,245,249,var(--tw-bg-opacity))}.p-1{padding:.25rem}.px-2\\.5{padding-left:.625rem;padding-right:.625rem}.py-2{padding-bottom:.5rem;padding-top:.5rem}.px-2{padding-left:.5rem;padding-right:.5rem}.py-1\\.5{padding-bottom:.375rem;padding-top:.375rem}.py-1{padding-bottom:.25rem;padding-top:.25rem}.text-sm{font-size:.875rem;line-height:1.25rem}.\\!text-xs{font-size:.75rem!important;line-height:1rem!important}.text-base{font-size:1rem;line-height:1.5rem}.text-lg{font-size:1.125rem;line-height:1.75rem}.font-semibold{font-weight:600}.font-medium{font-weight:500}.uppercase{text-transform:uppercase}.text-blue-600{--tw-text-opacity:1;color:rgba(37,99,235,var(--tw-text-opacity))}.text-blue-gray-500{--tw-text-opacity:1;color:rgba(100,116,139,var(--tw-text-opacity))}.text-rose-500{--tw-text-opacity:1;color:rgba(244,63,94,var(--tw-text-opacity))}.text-gray-600{--tw-text-opacity:1;color:rgba(82,82,91,var(--tw-text-opacity))}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.filter{filter:var(--tw-filter)}.hover\\:text-rose-600:hover{--tw-text-opacity:1;color:rgba(225,29,72,var(--tw-text-opacity))}.hover\\:text-blue-600:hover{--tw-text-opacity:1;color:rgba(37,99,235,var(--tw-text-opacity))}.hover\\:underline:hover{text-decoration:underline}@media (min-width:640px){.sm\\:mb-0{margin-bottom:0}.sm\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.sm\\:flex-row{flex-direction:row}}@media (min-width:768px){.md\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}}'; }
};

function checkIfStringStartsWith(str, substrs) {
  return substrs.some((substr) => str.toLowerCase().startsWith(substr.toLowerCase()));
}

function getQuery(obj) {
  state$1[`entries${capitalizeFirstLetter(obj.type)}`] = [
    {
      children: obj.children,
      isMultisite: obj.isMultisite,
      path: obj.path,
      queryValue: obj.search,
      siteId: state$1.data.siteId,
      type: obj.type,
      network: obj.network,
    },
  ];
  if (obj.type === 'post') {
    state$1.entriesPostCurrentPath = obj.path;
  }
  // console.log(stateInternal[`entries${capitalizeFirstLetter(obj.type)}`]);
}

const streamlineSearchCss = ":host{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;box-sizing:border-box}:host .focus:focus{box-shadow:inset 0 0 0 4px #f8fafc,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-border:focus{border-color:var(--sl-focus-color);box-shadow:0 0 0 1px var(--sl-focus-color);outline:none!important}:host .focus-out:focus{box-shadow:0 0 0 2px #f8fafc,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-dark:focus{box-shadow:inset 0 0 0 4px #0f172a,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-darker:focus{box-shadow:inset 0 0 0 4px #020204,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-white:focus{box-shadow:inset 0 0 0 4px #fff,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-white-out:focus{box-shadow:0 0 0 2px #fff,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-in-white-out:focus-within{box-shadow:0 0 0 2px #fff,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-none:focus{box-shadow:none!important;outline:none!important}:host .border-invalid{border-color:var(--sl-focus-color-invalid);box-shadow:0 0 0 1px var(--sl-focus-color-invalid);outline:none!important}input{-webkit-appearance:none;border-radius:0}/*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{--tw-blur:var(--tw-empty,/*!*/ /*!*/);--tw-brightness:var(--tw-empty,/*!*/ /*!*/);--tw-contrast:var(--tw-empty,/*!*/ /*!*/);--tw-grayscale:var(--tw-empty,/*!*/ /*!*/);--tw-hue-rotate:var(--tw-empty,/*!*/ /*!*/);--tw-invert:var(--tw-empty,/*!*/ /*!*/);--tw-saturate:var(--tw-empty,/*!*/ /*!*/);--tw-sepia:var(--tw-empty,/*!*/ /*!*/);--tw-drop-shadow:var(--tw-empty,/*!*/ /*!*/);--tw-filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);border:0 solid;box-sizing:border-box}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}a{color:inherit;text-decoration:inherit}.visible{visibility:visible}.inline-block{display:inline-block}.h-\\[max-content\\]{height:-webkit-max-content;height:-moz-max-content;height:max-content}.bg-blue-gray-200{--tw-bg-opacity:1;background-color:rgba(226,232,240,var(--tw-bg-opacity))}.px-2\\.5{padding-left:.625rem;padding-right:.625rem}.py-1\\.5{padding-bottom:.375rem;padding-top:.375rem}.px-2{padding-left:.5rem;padding-right:.5rem}.py-1{padding-bottom:.25rem;padding-top:.25rem}.text-blue-gray-500{--tw-text-opacity:1;color:rgba(100,116,139,var(--tw-text-opacity))}.blur{--tw-blur:blur(8px);filter:var(--tw-filter)}/*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize *//*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize *//*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */";

let StreamlineSearch$1 = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.handleChange = (e) => {
            state$1.searchValue = e.target.value;
            if (!e.target.value.startsWith("/")) {
                state$1.isSites = false;
                state$1.isLoading = false;
                state$1.isSlash = false;
                state$1.isEnter = false;
                setEntries();
                if (state$1.searchValue.length >= 1 &&
                    state.active === "post" &&
                    !state$1.test) {
                    state$1.isEnter = true;
                    this.command = "post";
                }
            }
            else if ((e.target.value.startsWith("/") && isLocalCommands()) ||
                (e.target.value.startsWith("/") && state$1.testFull)) {
                state$1.isSlash = true;
                if (checkIfStringStartsWith(state$1.searchValue, state$1.menu[state.active].commands)) {
                    state$1.isEnter = true;
                    this.command = state$1.searchValue.split(" ")[0].slice(1);
                }
                else {
                    state$1.isSites = false;
                    state$1.isLoading = false;
                    state$1.isEnter = false;
                }
            }
        };
        this.handleKeydown = (e) => {
            if (e.key === "Enter" && state$1.isEnter && !state$1.test) {
                this.startQuery();
            }
        };
        this.startQuery = () => {
            var _a;
            this.callback =
                ((_a = state$1.commands.local[this.command]) === null || _a === void 0 ? void 0 : _a.callback) || false;
            if (this.callback || state.active === "post") {
                if (checkIfStringStartsWith(state$1.searchValue, this.commands) &&
                    this.callback) {
                    this.value = state$1.searchValue
                        .replace(`/${this.command}`, "")
                        .trim();
                }
                else if (state.active === "post") {
                    this.value = state$1.searchValue;
                    this.callback = "posts";
                }
                this.query();
            }
            else if (this.command === "network") {
                getMenu({
                    network: true,
                });
            }
        };
        this.query = () => {
            state$1.isLoading = true;
            // @ts-ignore
            // eslint-disable-next-line no-undef
            fetch(`${streamline.rest}streamline/v1/${this.callback}/${this.value}`, {
                method: "GET",
                credentials: "same-origin",
                headers: {
                    // @ts-ignore
                    // eslint-disable-next-line no-undef
                    "X-WP-Nonce": streamline.nonceRest,
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((data) => {
                // console.log(data);
                getQuery({
                    children: data.children,
                    isMultisite: data.isMultisite,
                    path: data.path,
                    search: this.value,
                    type: this.command,
                    queryValue: this.value,
                });
                setSearchPlaceholder();
                if (this.callback === "sites") {
                    state$1.isSites = true;
                }
                else if (this.callback === "posts") {
                    resetView();
                }
                state$1.isLoading = false;
            });
        };
    }
    connectedCallback() {
        const arr = [];
        Object.keys(state$1.commands.local).forEach((item) => {
            arr.push(`/${item} `);
        });
        this.commands = arr;
    }
    render() {
        return (h("div", { class: `relative h-[var(--sl-side-w)] w-full lg:h-[64px]` }, h("input", { part: "search", class: "peer w-full h-[var(--sl-side-w)] focus bg-blue-gray-100 px-3 text-[1.15rem] h-full w-full m-0 p-0 font-normal placeholder-blue-gray-600 text-blue-gray-900 sm:px-8 lg:h-[64px]", type: "text", placeholder: state$1.searchPlaceholder, value: state$1.searchValue, onInput: this.handleChange, onKeyDown: this.handleKeydown }), h("svg", { xmlns: "http://www.w3.org/2000/svg", class: "search absolute hidden top-1/2 -translate-y-1/2 left-3 h-3.5 text-blue-gray-500 peer-focus:text-blue-600 sm:block", viewBox: "0 0 512 512" }, h("path", { fill: "currentColor", d: "M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z" })), state$1.isEnter && (h("div", { class: `absolute right-3 -translate-y-1/2 top-1/2 sm:right-4` }, h("streamline-button", { text: "Search", onClick: this.startQuery })))));
    }
    get el() { return this; }
    static get style() { return streamlineSearchCss + '/*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-transform:translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;border:0 solid;box-sizing:border-box}input{color:inherit;font-family:inherit;font-size:100%;line-height:1.15;line-height:inherit;margin:0;padding:0}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}input::-moz-placeholder{color:#a1a1aa;opacity:1}input:-ms-input-placeholder{color:#a1a1aa;opacity:1}input::placeholder{color:#a1a1aa;opacity:1}svg{display:block;vertical-align:middle}[hidden]{display:none}.absolute{position:absolute}.relative{position:relative}.top-1\\/2{top:50%}.left-3{left:.75rem}.right-3{right:.75rem}.m-0{margin:0}.hidden{display:none}.h-\\[var\\(--sl-side-w\\)\\]{height:var(--sl-side-w)}.h-full{height:100%}.h-3\\.5{height:.875rem}.h-3{height:.75rem}.w-full{width:100%}.-translate-y-1\\/2{--tw-translate-y:-50%;transform:var(--tw-transform)}.bg-blue-gray-100{--tw-bg-opacity:1;background-color:rgba(241,245,249,var(--tw-bg-opacity))}.p-0{padding:0}.px-3{padding-left:.75rem;padding-right:.75rem}.text-\\[1\\.15rem\\]{font-size:1.15rem}.font-normal{font-weight:400}.text-blue-gray-900{--tw-text-opacity:1;color:rgba(15,23,42,var(--tw-text-opacity))}.text-blue-gray-500{--tw-text-opacity:1;color:rgba(100,116,139,var(--tw-text-opacity))}.placeholder-blue-gray-600::-moz-placeholder{--tw-placeholder-opacity:1;color:rgba(71,85,105,var(--tw-placeholder-opacity))}.placeholder-blue-gray-600:-ms-input-placeholder{--tw-placeholder-opacity:1;color:rgba(71,85,105,var(--tw-placeholder-opacity))}.placeholder-blue-gray-600::placeholder{--tw-placeholder-opacity:1;color:rgba(71,85,105,var(--tw-placeholder-opacity))}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.peer:focus~.peer-focus\\:text-blue-600{--tw-text-opacity:1;color:rgba(37,99,235,var(--tw-text-opacity))}@media (min-width:640px){.sm\\:right-4{right:1rem}.sm\\:block{display:block}.sm\\:px-8{padding-left:2rem;padding-right:2rem}}@media (min-width:1024px){.lg\\:h-\\[64px\\]{height:64px}}'; }
};

const streamlineSidebarCss = ":host{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;box-sizing:border-box}/*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{--tw-blur:var(--tw-empty,/*!*/ /*!*/);--tw-brightness:var(--tw-empty,/*!*/ /*!*/);--tw-contrast:var(--tw-empty,/*!*/ /*!*/);--tw-grayscale:var(--tw-empty,/*!*/ /*!*/);--tw-hue-rotate:var(--tw-empty,/*!*/ /*!*/);--tw-invert:var(--tw-empty,/*!*/ /*!*/);--tw-saturate:var(--tw-empty,/*!*/ /*!*/);--tw-sepia:var(--tw-empty,/*!*/ /*!*/);--tw-drop-shadow:var(--tw-empty,/*!*/ /*!*/);--tw-filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);border:0 solid;box-sizing:border-box}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}a{color:inherit;text-decoration:inherit}.visible{visibility:visible}.inline-block{display:inline-block}.h-\\[max-content\\]{height:-webkit-max-content;height:-moz-max-content;height:max-content}.bg-blue-gray-200{--tw-bg-opacity:1;background-color:rgba(226,232,240,var(--tw-bg-opacity))}.px-2\\.5{padding-left:.625rem;padding-right:.625rem}.py-1\\.5{padding-bottom:.375rem;padding-top:.375rem}.px-2{padding-left:.5rem;padding-right:.5rem}.py-1{padding-bottom:.25rem;padding-top:.25rem}.text-blue-gray-500{--tw-text-opacity:1;color:rgba(100,116,139,var(--tw-text-opacity))}.blur{--tw-blur:blur(8px);filter:var(--tw-filter)}/*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize *//*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize *//*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */";

let StreamlineSidebar$1 = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.handleClick = (name) => {
            state.active = name;
            if (state.active === "menu" &&
                state$1.entriesMenu.length === 0) {
                getMenu();
            }
        };
    }
    render() {
        return (h("nav", { class: `bg-blue-gray-900 h-full w-[var(--sl-side-w)] flex flex-col overflow-visible` }, h("streamline-button", { type: "primary", icon: "wordpress", onClick: () => (state$1.visible = false) }), h("div", { class: `flex flex-col h-full` }, Object.values(state$1.menu).map((item) => {
            return (h("streamline-button", { onClick: () => this.handleClick(item.name), class: `${item.name === "settings" ? "mt-auto" : ""}`, type: "sidebar", text: capitalizeFirstLetter(item.name === "fav" ? "faves" : item.name), icon: item.name }));
        }))));
    }
    static get style() { return streamlineSidebarCss + '/*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;border:0 solid;box-sizing:border-box}.visible{visibility:visible}.mt-auto{margin-top:auto}.flex{display:flex}.h-full{height:100%}.w-\\[var\\(--sl-side-w\\)\\]{width:var(--sl-side-w)}.flex-col{flex-direction:column}.overflow-visible{overflow:visible}.bg-blue-gray-900{--tw-bg-opacity:1;background-color:rgba(15,23,42,var(--tw-bg-opacity))}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}'; }
};

const StreamlineBox = /*@__PURE__*/proxyCustomElement(StreamlineBox$1, [1,"streamline-box"]);
const StreamlineButton = /*@__PURE__*/proxyCustomElement(StreamlineButton$1, [1,"streamline-button",{"adminUrl":[1,"admin-url"],"favourite":[1540],"header":[1],"href":[1],"icon":[1],"index":[2],"indexInner":[2,"index-inner"],"indexSub":[2,"index-sub"],"invalid":[516],"path":[1],"siteId":[2,"site-id"],"styling":[1],"text":[1],"type":[1],"typeSub":[1,"type-sub"]}]);
const StreamlineContainer = /*@__PURE__*/proxyCustomElement(StreamlineContainer$1, [1,"streamline-container",{"mac":[1028],"visible":[1540]}]);
const StreamlineEntries = /*@__PURE__*/proxyCustomElement(StreamlineEntries$1, [1,"streamline-entries"]);
const StreamlineInput = /*@__PURE__*/proxyCustomElement(StreamlineInput$1, [1,"streamline-input",{"ident":[513],"invalid":[1540],"placeholder":[1],"value":[1025]}]);
const StreamlinePost = /*@__PURE__*/proxyCustomElement(StreamlinePost$1, [1,"streamline-post",{"hrefEdit":[1,"href-edit"],"hrefView":[1,"href-view"],"invalid":[4],"postTitle":[1,"post-title"],"postId":[2,"post-id"],"postSlug":[1,"post-slug"],"postType":[1,"post-type"],"siteId":[2,"site-id"],"favourite":[1540],"edit":[32]},[[0,"keydown","onKeyEnter"]]]);
const StreamlineSearch = /*@__PURE__*/proxyCustomElement(StreamlineSearch$1, [1,"streamline-search"]);
const StreamlineSidebar = /*@__PURE__*/proxyCustomElement(StreamlineSidebar$1, [1,"streamline-sidebar"]);
const defineCustomElements = (opts) => {
  if (typeof customElements !== 'undefined') {
    [
      StreamlineBox,
  StreamlineButton,
  StreamlineContainer,
  StreamlineEntries,
  StreamlineInput,
  StreamlinePost,
  StreamlineSearch,
  StreamlineSidebar
    ].forEach(cmp => {
      if (!customElements.get(cmp.is)) {
        customElements.define(cmp.is, cmp, opts);
      }
    });
  }
};

export { StreamlineBox, StreamlineButton, StreamlineContainer, StreamlineEntries, StreamlineInput, StreamlinePost, StreamlineSearch, StreamlineSidebar, defineCustomElements };
