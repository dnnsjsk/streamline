import { r as registerInstance, h } from './index-ac9abc62.js';
import { s as state$1 } from './internal-d7978ed0.js';
import { s as state, c as capitalizeFirstLetter } from './setSearchPlaceholder-25f695c9.js';
import { g as getMenus } from './getMenus-04f5d870.js';

const streamlineSidebarCss = ":host{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;box-sizing:border-box}:host *{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}/*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{--tw-blur:var(--tw-empty,/*!*/ /*!*/);--tw-brightness:var(--tw-empty,/*!*/ /*!*/);--tw-contrast:var(--tw-empty,/*!*/ /*!*/);--tw-grayscale:var(--tw-empty,/*!*/ /*!*/);--tw-hue-rotate:var(--tw-empty,/*!*/ /*!*/);--tw-invert:var(--tw-empty,/*!*/ /*!*/);--tw-saturate:var(--tw-empty,/*!*/ /*!*/);--tw-sepia:var(--tw-empty,/*!*/ /*!*/);--tw-drop-shadow:var(--tw-empty,/*!*/ /*!*/);--tw-filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);border:0 solid;box-sizing:border-box}strong{font-weight:bolder}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}p{margin:0}a{color:inherit;text-decoration:inherit}.visible{visibility:visible}.inline-block{display:inline-block}.h-\\[max-content\\]{height:-webkit-max-content;height:-moz-max-content;height:max-content}.bg-blue-gray-200{--tw-bg-opacity:1;background-color:rgba(226,232,240,var(--tw-bg-opacity))}.px-2\\.5{padding-left:10px;padding-right:10px}.py-1\\.5{padding-bottom:6px;padding-top:6px}.px-2{padding-left:8px;padding-right:8px}.py-1{padding-bottom:4px;padding-top:4px}.text-blue-gray-500{--tw-text-opacity:1;color:rgba(100,116,139,var(--tw-text-opacity))}.blur{--tw-blur:blur(8px);filter:var(--tw-filter)}/*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */";

let StreamlineSidebar = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.handleClick = (name) => {
            state.active = name;
            getMenus();
        };
    }
    render() {
        return (h("nav", { class: `bg-blue-gray-900 h-full w-[var(--sl-side-w)] flex flex-col overflow-visible` }, h("streamline-button", { type: "primary", icon: "wordpress", onClick: () => (state$1.visible = false) }), h("div", { class: `flex flex-col h-full` }, Object.values(state$1.menu).map((item) => {
            return (item["condition"] && (h("streamline-button", { onClick: () => this.handleClick(item.name), class: `${item.name === "settings"
                    ? "mt-auto"
                    : item.name === "network"
                        ? "mb-4"
                        : ""}`, type: "sidebar", text: capitalizeFirstLetter(item.text), icon: item.name })));
        }))));
    }
};
StreamlineSidebar.style = streamlineSidebarCss + '/*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;border:0 solid;box-sizing:border-box}.visible{visibility:visible}.mt-auto{margin-top:auto}.mb-4{margin-bottom:16px}.flex{display:flex}.h-full{height:100%}.w-\\[var\\(--sl-side-w\\)\\]{width:var(--sl-side-w)}.flex-col{flex-direction:column}.overflow-visible{overflow:visible}.bg-blue-gray-900{--tw-bg-opacity:1;background-color:rgba(15,23,42,var(--tw-bg-opacity))}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}';

export { StreamlineSidebar as streamline_sidebar };
