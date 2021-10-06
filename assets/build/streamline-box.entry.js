import { r as registerInstance, h, e as Host, i as getElement } from './index-62dd23ad.js';
import { s as state } from './internal-0465a79e.js';
import { a as setActiveEntries } from './setActiveEntries-bed90b38.js';
import './getFavourites-f4494130.js';

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

const streamlineBoxCss = ":host{display:block}:host .focus{border-radius:var(--sl-border-radius);box-sizing:border-box;display:flex;outline:none;position:relative;width:100%}:host .focus:hover+.focus .icon{opacity:1}:host .focus a:focus,:host .focus button:focus,:host .focus input:focus{outline:none}:host .focus input{padding-left:var(--sl-s)}:host .focus:before{border-radius:var(--sl-border-radius);box-sizing:border-box;content:\"\";height:calc(100% - 8px);left:4px;pointer-events:none;position:absolute;top:4px;transition:box-shadow var(--sl-transition-fast);width:calc(100% - 8px)}:host .focus:focus-within:before{box-shadow:inset 0 0 0 2px var(--sl-focus-color)}:host .focus.is-header:before,:host .focus.is-icon:before,:host .focus.is-main:before{height:100%;left:0;top:0;width:100%}:host .focus.is-icon{width:auto}@-webkit-keyframes fadein{0%{opacity:0;transform:translate3d(-50%,calc(-50% + 20px),0)}to{opacity:1;transform:translate3d(-50%,-50%,0)}}@keyframes fadein{0%{opacity:0;transform:translate3d(-50%,calc(-50% + 20px),0)}to{opacity:1;transform:translate3d(-50%,-50%,0)}}:host .inner{-webkit-animation:fadein .4s var(--sl-transition);animation:fadein .4s var(--sl-transition)}/*! tailwindcss v2.2.16 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{border:0 solid;box-sizing:border-box}.visible{visibility:visible}";

const StreamlineBox = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    connectedCallback() {
        disableBodyScroll(this.el);
        setActiveEntries();
    }
    componentDidLoad() {
        setTimeout(() => {
            this.el.shadowRoot.querySelector("input").focus();
        }, 50);
    }
    disconnectedCallback() {
        clearAllBodyScrollLocks();
    }
    static handleChange(event) {
        state.searchValue = event.target.value;
        setActiveEntries();
    }
    render() {
        return (h(Host, null, h("div", { class: "inner w-full h-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[900px] max-h-[700px] bg-white overflow-hidden grid" }, h("streamline-sidebar", null), h("div", { class: "wrap h-full absolute left-[var(--sl-side-w)] w-[calc(100%-var(--sl-side-w))]" }, h("div", { class: "focus" }, h("input", { part: "search", class: "search h-[var(--sl-side-w)] text-[1.15rem] w-full h-full m-0 p-0 border-b border-gray-300", type: "text", placeholder: "Search for anything", onInput: (event) => StreamlineBox.handleChange(event) })), h("streamline-entries", null)))));
    }
    get el() { return getElement(this); }
};
StreamlineBox.style = streamlineBoxCss + '/*! tailwindcss v2.2.16 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-transform:translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));--tw-border-opacity:1;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;border:0 solid;border-color:rgba(229,231,235,var(--tw-border-opacity));box-sizing:border-box}input{color:inherit;font-family:inherit;font-size:100%;line-height:1.15;line-height:inherit;margin:0;padding:0}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}input::-moz-placeholder{color:#9ca3af;opacity:1}input:-ms-input-placeholder{color:#9ca3af;opacity:1}input::placeholder{color:#9ca3af;opacity:1}.static{position:static}.absolute{position:absolute}.left-1\\/2{left:50%}.top-1\\/2{top:50%}.left-\\[var\\(--sl-side-w\\)\\]{left:var(--sl-side-w)}.m-0{margin:0}.grid{display:grid}.h-full{height:100%}.h-\\[var\\(--sl-side-w\\)\\]{height:var(--sl-side-w)}.max-h-\\[700px\\]{max-height:700px}.w-full{width:100%}.w-\\[calc\\(100\\%-var\\(--sl-side-w\\)\\)\\]{width:calc(100% - var(--sl-side-w))}.max-w-\\[900px\\]{max-width:900px}.-translate-x-1\\/2{--tw-translate-x:-50%;transform:var(--tw-transform)}.-translate-y-1\\/2{--tw-translate-y:-50%;transform:var(--tw-transform)}.overflow-hidden{overflow:hidden}.border-b{border-bottom-width:1px}.border-gray-300{--tw-border-opacity:1;border-color:rgba(209,213,219,var(--tw-border-opacity))}.bg-white{--tw-bg-opacity:1;background-color:rgba(255,255,255,var(--tw-bg-opacity))}.p-0{padding:0}.text-\\[1\\.15rem\\]{font-size:1.15rem}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.06);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}';

export { StreamlineBox as streamline_box };
