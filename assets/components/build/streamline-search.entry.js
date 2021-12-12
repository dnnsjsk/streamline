import { r as registerInstance, h, g as getElement } from './index-ac9abc62.js';
import { s as state } from './internal-d7978ed0.js';
import { c as capitalizeFirstLetter, a as setEntries, s as state$1, b as setSearchPlaceholder, r as resetView } from './setSearchPlaceholder-25f695c9.js';

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

const streamlineSearchCss = ":host{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;box-sizing:border-box}:host .focus:focus{box-shadow:inset 0 0 0 4px #f1f5f9,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-border:focus{border-color:var(--sl-focus-color);box-shadow:0 0 0 1px var(--sl-focus-color);outline:none!important}:host .focus-out:focus{box-shadow:0 0 0 2px #f8fafc,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-dark:focus{box-shadow:inset 0 0 0 4px #0f172a,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-darker:focus{box-shadow:inset 0 0 0 4px #020204,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-white:focus{box-shadow:inset 0 0 0 4px #fff,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-white-out:focus{box-shadow:0 0 0 2px #fff,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-in-white-out:focus-within{box-shadow:0 0 0 2px #fff,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-none:focus{box-shadow:none!important;outline:none!important}:host .border-invalid{border-color:var(--sl-focus-color-invalid);box-shadow:0 0 0 1px var(--sl-focus-color-invalid);outline:none!important}:host *{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}input{-webkit-appearance:none;border-radius:0}/*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{--tw-blur:var(--tw-empty,/*!*/ /*!*/);--tw-brightness:var(--tw-empty,/*!*/ /*!*/);--tw-contrast:var(--tw-empty,/*!*/ /*!*/);--tw-grayscale:var(--tw-empty,/*!*/ /*!*/);--tw-hue-rotate:var(--tw-empty,/*!*/ /*!*/);--tw-invert:var(--tw-empty,/*!*/ /*!*/);--tw-saturate:var(--tw-empty,/*!*/ /*!*/);--tw-sepia:var(--tw-empty,/*!*/ /*!*/);--tw-drop-shadow:var(--tw-empty,/*!*/ /*!*/);--tw-filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);border:0 solid;box-sizing:border-box}strong{font-weight:bolder}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}p{margin:0}a{color:inherit;text-decoration:inherit}.visible{visibility:visible}.inline-block{display:inline-block}.h-\\[max-content\\]{height:-webkit-max-content;height:-moz-max-content;height:max-content}.bg-blue-gray-200{--tw-bg-opacity:1;background-color:rgba(226,232,240,var(--tw-bg-opacity))}.px-2\\.5{padding-left:10px;padding-right:10px}.py-1\\.5{padding-bottom:6px;padding-top:6px}.px-2{padding-left:8px;padding-right:8px}.py-1{padding-bottom:4px;padding-top:4px}.text-blue-gray-500{--tw-text-opacity:1;color:rgba(100,116,139,var(--tw-text-opacity))}.blur{--tw-blur:blur(8px);filter:var(--tw-filter)}/*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */";

let StreamlineSearch = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.handleChange = (e) => {
            state.searchValue = e.target.value;
            if (!e.target.value.startsWith("/")) {
                state.isLoading = false;
                state.isSlash = false;
                state.isEnter = false;
                setEntries();
                if ((state$1.active === "post" || state$1.active === "site") &&
                    state.searchValue.length >= 1 &&
                    !state.test) {
                    state.isEnter = true;
                    this.command = state$1.active;
                }
            }
            else if (
            // (e.target.value.startsWith('/') && isLocalCommands()) ||
            e.target.value.startsWith("/")) {
                state.isSlash = true;
                if (checkIfStringStartsWith(state.searchValue, state.menu[state$1.active].commands)) {
                    state.isEnter = true;
                    this.command = state.searchValue.split(" ")[0].slice(1);
                }
                else {
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
            if (this.callback ||
                state$1.active === "post" ||
                state$1.active === "site") {
                if (checkIfStringStartsWith(state.searchValue, this.commands) &&
                    this.callback) {
                    this.value = state.searchValue
                        .replace(`/${this.command}`, "")
                        .trim();
                }
                else if (state$1.active === "post" || state$1.active === "site") {
                    this.value = state.searchValue;
                    this.callback = `${state$1.active}s`;
                }
                this.query();
            }
        };
        this.query = () => {
            state.isLoading = true;
            fetch(
            // @ts-ignore
            // eslint-disable-next-line no-undef
            `${streamline.rest}streamline/v1/${this.callback}?siteId=${state.currentSite.id}&value=${this.value}`, {
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
                getQuery({
                    children: data.children,
                    isMultisite: data.isMultisite,
                    path: state.currentSite.path,
                    search: this.value,
                    type: this.command,
                    queryValue: this.value,
                });
                setSearchPlaceholder();
                if (this.callback === "posts" || this.callback === "sites") {
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
        return (h("div", { class: `border-b border-blue-gray-200 bg-blue-gray-50 relative h-[var(--sl-side-w)] w-full lg:h-[64px]` }, state.isSearch && [
            h("input", { part: "search", class: "peer bg-transparent focus:outline-none w-full h-[var(--sl-side-w)] px-3 text-[18px] h-full w-full m-0 p-0 font-normal placeholder-blue-gray-500 text-blue-gray-900 sm:px-8 lg:h-[64px]", type: "text", placeholder: state.searchPlaceholder, value: state.searchValue, onInput: this.handleChange, onKeyDown: this.handleKeydown }),
            h("svg", { xmlns: "http://www.w3.org/2000/svg", class: "search absolute hidden top-1/2 -translate-y-1/2 left-3 h-3.5 text-blue-gray-500 peer-focus:text-blue-600 sm:block", viewBox: "0 0 512 512" }, h("path", { fill: "currentColor", d: "M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z" })),
            state.isEnter && (h("div", { class: `absolute right-3 -translate-y-1/2 top-1/2 sm:right-4` }, h("streamline-button", { type: "button", text: "Search", onClick: this.startQuery }))),
        ]));
    }
    get el() { return getElement(this); }
};
StreamlineSearch.style = streamlineSearchCss + '/*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-transform:translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));--tw-border-opacity:1;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;border:0 solid;border-color:rgba(228,228,231,var(--tw-border-opacity));box-sizing:border-box}button,input{color:inherit;font-family:inherit;font-size:100%;line-height:1.15;line-height:inherit;margin:0;padding:0}button{background-color:transparent;background-image:none;cursor:pointer;text-transform:none}[type=button],button{-webkit-appearance:button}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}input::-moz-placeholder{color:#a1a1aa;opacity:1}input:-ms-input-placeholder{color:#a1a1aa;opacity:1}input::placeholder{color:#a1a1aa;opacity:1}svg{display:block;vertical-align:middle}[hidden]{display:none}.absolute{position:absolute}.relative{position:relative}.top-1\\/2{top:50%}.left-3{left:12px}.right-3{right:12px}.m-0{margin:0}.hidden{display:none}.h-\\[var\\(--sl-side-w\\)\\]{height:var(--sl-side-w)}.h-full{height:100%}.h-3\\.5{height:14px}.h-3{height:12px}.w-full{width:100%}.-translate-y-1\\/2{--tw-translate-y:-50%;transform:var(--tw-transform)}.border-b{border-bottom-width:1px}.border-blue-gray-200{--tw-border-opacity:1;border-color:rgba(226,232,240,var(--tw-border-opacity))}.bg-blue-gray-50{--tw-bg-opacity:1;background-color:rgba(248,250,252,var(--tw-bg-opacity))}.bg-transparent{background-color:transparent}.p-0{padding:0}.px-3{padding-left:12px;padding-right:12px}.text-\\[18px\\]{font-size:18px}.font-normal{font-weight:400}.text-blue-gray-900{--tw-text-opacity:1;color:rgba(15,23,42,var(--tw-text-opacity))}.text-blue-gray-500{--tw-text-opacity:1;color:rgba(100,116,139,var(--tw-text-opacity))}.placeholder-blue-gray-500::-moz-placeholder{--tw-placeholder-opacity:1;color:rgba(100,116,139,var(--tw-placeholder-opacity))}.placeholder-blue-gray-500:-ms-input-placeholder{--tw-placeholder-opacity:1;color:rgba(100,116,139,var(--tw-placeholder-opacity))}.placeholder-blue-gray-500::placeholder{--tw-placeholder-opacity:1;color:rgba(100,116,139,var(--tw-placeholder-opacity))}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}.peer:focus~.peer-focus\\:text-blue-600{--tw-text-opacity:1;color:rgba(37,99,235,var(--tw-text-opacity))}@media (min-width:640px){.sm\\:right-4{right:16px}.sm\\:block{display:block}.sm\\:px-8{padding-left:32px;padding-right:32px}}@media (min-width:1024px){.lg\\:h-\\[64px\\]{height:64px}}';

export { StreamlineSearch as streamline_search };
