import { r as registerInstance, h, g as getElement } from './index-ac9abc62.js';

const streamlineBoxCss = ":host{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;box-sizing:border-box}:host *{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}";

let StreamlineBox = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h("div", { class: "inner w-full h-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[1000px] max-h-[700px] bg-white overflow-hidden grid" }, h("streamline-sidebar", null), h("div", { class: "h-full absolute left-[var(--sl-side-w)] w-[calc(100%-var(--sl-side-w))]" }, h("div", { class: `bg-blue-gray-50 grid grid-cols-[1fr,var(--sl-side-w)] lg:grid-cols-[1fr,64px]` }, h("streamline-search", { class: "h-[var(--sl-side-w)] w-full lg:h-[64px]" }), h("streamline-button", { icon: "dots", type: "icon", "type-sub": "context" })), h("streamline-entries", null))));
    }
    get el() { return getElement(this); }
};
StreamlineBox.style = streamlineBoxCss + '/*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-transform:translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;border:0 solid;box-sizing:border-box}.absolute{position:absolute}.left-1\\/2{left:50%}.top-1\\/2{top:50%}.left-\\[var\\(--sl-side-w\\)\\]{left:var(--sl-side-w)}.grid{display:grid}.h-full{height:100%}.h-\\[var\\(--sl-side-w\\)\\]{height:var(--sl-side-w)}.max-h-\\[700px\\]{max-height:700px}.w-full{width:100%}.w-\\[calc\\(100\\%-var\\(--sl-side-w\\)\\)\\]{width:calc(100% - var(--sl-side-w))}.max-w-\\[1000px\\]{max-width:1000px}.-translate-x-1\\/2{--tw-translate-x:-50%;transform:var(--tw-transform)}.-translate-y-1\\/2{--tw-translate-y:-50%;transform:var(--tw-transform)}.grid-cols-\\[1fr\\2c var\\(--sl-side-w\\)\\]{grid-template-columns:1fr var(--sl-side-w)}.overflow-hidden{overflow:hidden}.bg-white{--tw-bg-opacity:1;background-color:rgba(255,255,255,var(--tw-bg-opacity))}.bg-blue-gray-50{--tw-bg-opacity:1;background-color:rgba(248,250,252,var(--tw-bg-opacity))}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}@media (min-width:1024px){.lg\\:h-\\[64px\\]{height:64px}.lg\\:grid-cols-\\[1fr\\2c 64px\\]{grid-template-columns:1fr 64px}}';

export { StreamlineBox as streamline_box };
