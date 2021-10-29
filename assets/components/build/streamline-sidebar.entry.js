import { r as registerInstance, h } from './index-2c4cdcb5.js';
import { s as state, a as capitalizeFirstLetter } from './capitalizeFirstLetter-a06ceb0e.js';

const streamlineSidebarCss = "/*! tailwindcss v2.2.17 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{--tw-blur:var(--tw-empty,/*!*/ /*!*/);--tw-brightness:var(--tw-empty,/*!*/ /*!*/);--tw-contrast:var(--tw-empty,/*!*/ /*!*/);--tw-grayscale:var(--tw-empty,/*!*/ /*!*/);--tw-hue-rotate:var(--tw-empty,/*!*/ /*!*/);--tw-invert:var(--tw-empty,/*!*/ /*!*/);--tw-saturate:var(--tw-empty,/*!*/ /*!*/);--tw-sepia:var(--tw-empty,/*!*/ /*!*/);--tw-drop-shadow:var(--tw-empty,/*!*/ /*!*/);--tw-filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);border:0 solid;box-sizing:border-box}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}a{color:inherit;text-decoration:inherit}.visible{visibility:visible}.inline-block{display:inline-block}.h-\\[max-content\\]{height:-webkit-max-content;height:-moz-max-content;height:max-content}.bg-blue-gray-200{--tw-bg-opacity:1;background-color:rgba(226,232,240,var(--tw-bg-opacity))}.px-2\\.5{padding-left:.625rem;padding-right:.625rem}.py-1\\.5{padding-bottom:.375rem;padding-top:.375rem}.px-2{padding-left:.5rem;padding-right:.5rem}.py-1{padding-bottom:.25rem;padding-top:.25rem}.text-blue-gray-500{--tw-text-opacity:1;color:rgba(100,116,139,var(--tw-text-opacity))}.blur{--tw-blur:blur(8px);filter:var(--tw-filter)}";

let StreamlineSidebar = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h("nav", { class: `bg-blue-gray-50 h-full w-[var(--sl-side-w)] flex flex-col border-r border-blue-gray-300 overflow-visible` }, h("streamline-button", { type: "primary", icon: "wordpress", onClick: () => (state.visible = false) }), h("div", { class: `flex flex-col h-full` }, Object.values(state.menu).map((item) => {
            return (h("streamline-button", { class: `${item.name === "settings" ? "mt-auto" : ""}`, type: "sidebar", text: capitalizeFirstLetter(item.name), icon: item.name }));
        }))));
    }
};
StreamlineSidebar.style = streamlineSidebarCss + '/*! tailwindcss v2.2.17 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{--tw-border-opacity:1;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;border:0 solid;border-color:rgba(228,228,231,var(--tw-border-opacity));box-sizing:border-box}.visible{visibility:visible}.mt-auto{margin-top:auto}.flex{display:flex}.h-full{height:100%}.w-\\[var\\(--sl-side-w\\)\\]{width:var(--sl-side-w)}.flex-col{flex-direction:column}.overflow-visible{overflow:visible}.border-r{border-right-width:1px}.border-blue-gray-300{--tw-border-opacity:1;border-color:rgba(203,213,225,var(--tw-border-opacity))}.bg-blue-gray-50{--tw-bg-opacity:1;background-color:rgba(248,250,252,var(--tw-bg-opacity))}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.06);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}';

export { StreamlineSidebar as streamline_sidebar };
