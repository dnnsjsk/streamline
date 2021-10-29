import { r as registerInstance, h, i as getElement } from './index-2c4cdcb5.js';
import { s as state, a as capitalizeFirstLetter } from './capitalizeFirstLetter-a06ceb0e.js';
import { b as setEntries, s as state$1, i as isLocalCommands, a as setSearchPlaceholder, r as resetView } from './setSearchPlaceholder-f92c7cd9.js';
import { g as getMenu } from './getMenu-f47b2d32.js';

function checkIfStringStartsWith(str, substrs) {
  return substrs.some((substr) => str.toLowerCase().startsWith(substr.toLowerCase()));
}

function getQuery(obj) {
  state[`entries${capitalizeFirstLetter(obj.type)}`] = [
    {
      children: obj.children,
      isMultisite: obj.isMultisite,
      path: obj.path,
      queryValue: obj.search,
      siteId: state.data.siteId,
      type: obj.type,
      network: obj.network,
    },
  ];
  if (obj.type === 'post') {
    state.entriesPostCurrentPath = obj.path;
  }
  // console.log(stateInternal[`entries${capitalizeFirstLetter(obj.type)}`]);
}

const streamlineSearchCss = ":host .focus:focus{box-shadow:inset 0 0 0 4px #f8fafc,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-out:focus{box-shadow:0 0 0 2px #f8fafc,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-dark:focus{box-shadow:inset 0 0 0 4px #191e23,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-white:focus{box-shadow:inset 0 0 0 4px #fff,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-white-out:focus{box-shadow:0 0 0 2px #fff,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-in-white-out:focus-within{box-shadow:0 0 0 2px #fff,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-none:focus{box-shadow:none!important;outline:none!important}/*! tailwindcss v2.2.17 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{--tw-blur:var(--tw-empty,/*!*/ /*!*/);--tw-brightness:var(--tw-empty,/*!*/ /*!*/);--tw-contrast:var(--tw-empty,/*!*/ /*!*/);--tw-grayscale:var(--tw-empty,/*!*/ /*!*/);--tw-hue-rotate:var(--tw-empty,/*!*/ /*!*/);--tw-invert:var(--tw-empty,/*!*/ /*!*/);--tw-saturate:var(--tw-empty,/*!*/ /*!*/);--tw-sepia:var(--tw-empty,/*!*/ /*!*/);--tw-drop-shadow:var(--tw-empty,/*!*/ /*!*/);--tw-filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);border:0 solid;box-sizing:border-box}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}a{color:inherit;text-decoration:inherit}.visible{visibility:visible}.inline-block{display:inline-block}.h-\\[max-content\\]{height:-webkit-max-content;height:-moz-max-content;height:max-content}.bg-blue-gray-200{--tw-bg-opacity:1;background-color:rgba(226,232,240,var(--tw-bg-opacity))}.px-2\\.5{padding-left:.625rem;padding-right:.625rem}.py-1\\.5{padding-bottom:.375rem;padding-top:.375rem}.px-2{padding-left:.5rem;padding-right:.5rem}.py-1{padding-bottom:.25rem;padding-top:.25rem}.text-blue-gray-500{--tw-text-opacity:1;color:rgba(100,116,139,var(--tw-text-opacity))}.blur{--tw-blur:blur(8px);filter:var(--tw-filter)}/*! tailwindcss v2.2.17 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */";

let StreamlineSearch = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.handleChange = (e) => {
            state.searchValue = e.target.value;
            if (!e.target.value.startsWith("/")) {
                state.isSites = false;
                state.isLoading = false;
                state.isSlash = false;
                state.isEnter = false;
                setEntries();
                if (state.searchValue.length >= 1 &&
                    state$1.active === "post" &&
                    !state.test) {
                    state.isEnter = true;
                    this.command = "post";
                }
            }
            else if ((e.target.value.startsWith("/") && isLocalCommands()) ||
                (e.target.value.startsWith("/") && state.testFull)) {
                state.isSlash = true;
                if (checkIfStringStartsWith(state.searchValue, state.menu[state$1.active].commands)) {
                    state.isEnter = true;
                    this.command = state.searchValue.split(" ")[0].slice(1);
                }
                else {
                    state.isSites = false;
                    state.isLoading = false;
                    state.isEnter = false;
                }
            }
        };
        this.handleKeydown = (e) => {
            if (e.key === "Enter" && state.isEnter && !state.test) {
                this.startQuery();
            }
        };
        this.startQuery = () => {
            var _a;
            this.callback =
                ((_a = state.commands.local[this.command]) === null || _a === void 0 ? void 0 : _a.callback) || false;
            if (this.callback || state$1.active === "post") {
                if (checkIfStringStartsWith(state.searchValue, this.commands) &&
                    this.callback) {
                    this.value = state.searchValue
                        .replace(`/${this.command}`, "")
                        .trim();
                }
                else if (state$1.active === "post") {
                    this.value = state.searchValue;
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
            state.isLoading = true;
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
                    state.isSites = true;
                }
                else if (this.callback === "posts") {
                    resetView();
                }
                state.isLoading = false;
            });
        };
    }
    connectedCallback() {
        const arr = [];
        Object.keys(state.commands.local).forEach((item) => {
            arr.push(`/${item} `);
        });
        this.commands = arr;
    }
    render() {
        return (h("div", { class: `relative h-[var(--sl-side-w)] w-full` }, h("input", { part: "search", class: "peer w-full h-[var(--sl-side-w)] focus bg-blue-gray-50 px-3 text-[1.15rem] h-full w-full m-0 p-0 border-b border-blue-gray-300 font-medium placeholder-blue-gray-500 sm:px-8", type: "text", placeholder: state.searchPlaceholder, value: state.searchValue, onInput: this.handleChange, onKeyDown: this.handleKeydown }), h("svg", { xmlns: "http://www.w3.org/2000/svg", class: "search absolute hidden top-1/2 -translate-y-1/2 left-3 h-3.5 text-blue-gray-500 peer-focus:text-blue-600 sm:block", viewBox: "0 0 512 512" }, h("path", { fill: "currentColor", d: "M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z" })), state.isEnter && (h("div", { class: `absolute right-3 -translate-y-1/2 top-1/2 sm:right-4` }, h("streamline-button", { text: "Search", onClick: this.startQuery })))));
    }
    get el() { return getElement(this); }
};
StreamlineSearch.style = streamlineSearchCss + '/*! tailwindcss v2.2.17 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-transform:translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));--tw-border-opacity:1;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;border:0 solid;border-color:rgba(228,228,231,var(--tw-border-opacity));box-sizing:border-box}input{color:inherit;font-family:inherit;font-size:100%;line-height:1.15;line-height:inherit;margin:0;padding:0}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}input::-moz-placeholder{color:#a1a1aa;opacity:1}input:-ms-input-placeholder{color:#a1a1aa;opacity:1}input::placeholder{color:#a1a1aa;opacity:1}svg{display:block;vertical-align:middle}[hidden]{display:none}.absolute{position:absolute}.relative{position:relative}.top-1\\/2{top:50%}.left-3{left:.75rem}.right-3{right:.75rem}.m-0{margin:0}.hidden{display:none}.h-\\[var\\(--sl-side-w\\)\\]{height:var(--sl-side-w)}.h-full{height:100%}.h-3\\.5{height:.875rem}.h-3{height:.75rem}.w-full{width:100%}.-translate-y-1\\/2{--tw-translate-y:-50%;transform:var(--tw-transform)}.border-b{border-bottom-width:1px}.border-blue-gray-300{--tw-border-opacity:1;border-color:rgba(203,213,225,var(--tw-border-opacity))}.bg-blue-gray-50{--tw-bg-opacity:1;background-color:rgba(248,250,252,var(--tw-bg-opacity))}.p-0{padding:0}.px-3{padding-left:.75rem;padding-right:.75rem}.text-\\[1\\.15rem\\]{font-size:1.15rem}.font-medium{font-weight:500}.text-blue-gray-500{--tw-text-opacity:1;color:rgba(100,116,139,var(--tw-text-opacity))}.placeholder-blue-gray-500::-moz-placeholder{--tw-placeholder-opacity:1;color:rgba(100,116,139,var(--tw-placeholder-opacity))}.placeholder-blue-gray-500:-ms-input-placeholder{--tw-placeholder-opacity:1;color:rgba(100,116,139,var(--tw-placeholder-opacity))}.placeholder-blue-gray-500::placeholder{--tw-placeholder-opacity:1;color:rgba(100,116,139,var(--tw-placeholder-opacity))}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.06);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.peer:focus~.peer-focus\\:text-blue-600{--tw-text-opacity:1;color:rgba(37,99,235,var(--tw-text-opacity))}@media (min-width:640px){.sm\\:right-4{right:1rem}.sm\\:block{display:block}.sm\\:px-8{padding-left:2rem;padding-right:2rem}}';

export { StreamlineSearch as streamline_search };
