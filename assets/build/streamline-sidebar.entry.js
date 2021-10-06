import { r as registerInstance, h } from './index-62dd23ad.js';
import { s as state } from './internal-0465a79e.js';

const streamlineSidebarCss = "/*! tailwindcss v2.2.16 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{border:0 solid;box-sizing:border-box}.visible{visibility:visible}";

const StreamlineSidebar = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h("nav", { class: `bg-gray-50 h-full w-[var(--sl-side-w)] grid-flow-row grid auto-rows-max rounded-none border-r border-gray-300` }, h("streamline-button", { type: "primary", icon: "wordpress", onClick: () => (state.visible = false) }), h("div", { class: `grid-flow-row grid auto-rows-max` }, h("streamline-button", { type: "sidebar", text: "Menu", icon: "menu" }))));
    }
};
StreamlineSidebar.style = streamlineSidebarCss + '/*! tailwindcss v2.2.16 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{--tw-border-opacity:1;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;border:0 solid;border-color:rgba(229,231,235,var(--tw-border-opacity));box-sizing:border-box}.visible{visibility:visible}.grid{display:grid}.h-full{height:100%}.w-\\[var\\(--sl-side-w\\)\\]{width:var(--sl-side-w)}.grid-flow-row{grid-auto-flow:row}.auto-rows-max{grid-auto-rows:-webkit-max-content;grid-auto-rows:max-content}.rounded-none{border-radius:0}.border-r{border-right-width:1px}.border-gray-300{--tw-border-opacity:1;border-color:rgba(209,213,219,var(--tw-border-opacity))}.bg-gray-50{--tw-bg-opacity:1;background-color:rgba(249,250,251,var(--tw-bg-opacity))}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.06);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}';

export { StreamlineSidebar as streamline_sidebar };
