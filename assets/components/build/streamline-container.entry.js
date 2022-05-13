import { s as state, r as registerInstance, h, e as Host } from './internal-cc2f381f.js';

const isAnimation = () => {
  return state.entriesSettingsLoad.appearance.animation;
};

const containerCss = "/*! tailwindcss v3.0.24 | MIT License | https://tailwindcss.com*/*,:after,:before{--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;border:0 solid #e5e7eb;box-sizing:border-box}:after,:before{--tw-content:\"\"}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}.pointer-events-none{pointer-events:none}.pointer-events-auto{pointer-events:auto}.visible{visibility:visible}.fixed{position:fixed}.absolute{position:absolute}.top-0{top:0}.left-0{left:0}.flex{display:flex}.grid{display:grid}.h-full{height:100%}.w-full{width:100%}.max-w-screen-md{max-width:768px}.translate-y-4{--tw-translate-y:16px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.items-center{align-items:center}.justify-center{justify-content:center}.overflow-hidden{overflow:hidden}.bg-slate-900{background-color:rgb(15 23 42/var(--tw-bg-opacity))}.bg-slate-50,.bg-slate-900{--tw-bg-opacity:1}.bg-slate-50{background-color:rgb(248 250 252/var(--tw-bg-opacity))}.opacity-100{opacity:1}.opacity-0{opacity:0}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1);--tw-shadow-colored:0 1px 3px 0 var(--tw-shadow-color),0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.backdrop-blur-sm{--tw-backdrop-blur:blur(4px);-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}.transition{transition-duration:.15s;transition-property:color,background-color,border-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-text-decoration-color,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-text-decoration-color,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1)}.duration-100{transition-duration:.1s}.duration-200{transition-duration:.2s}.ease-in{transition-timing-function:cubic-bezier(.4,0,1,1)}:host{display:block}.z-\\[9999999999999999\\]{z-index:10000000000000000}.h-\\[var\\(--sl-side-w\\)\\]{height:var(--sl-side-w)}.max-h-\\[600px\\]{max-height:600px}.grid-cols-\\[1fr\\2c var\\(--sl-side-w\\)\\2c var\\(--sl-side-w\\)\\]{grid-template-columns:1fr var(--sl-side-w) var(--sl-side-w)}.bg-black\\/90{background-color:rgba(0,0,0,.9)}@media (min-width:640px){.sm\\:bottom-0{bottom:0}.sm\\:top-0{top:0}.sm\\:hidden{display:none}}@media (min-width:768px){.md\\:rounded-xl{border-radius:12px}}@media (min-width:1024px){.lg\\:h-\\[64px\\]{height:64px}.lg\\:grid-cols-\\[1fr\\2c 64px\\2c 64px\\]{grid-template-columns:1fr 64px 64px}}";

const StreamlineContainer = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h(Host, null, h("div", { class: {
        'fixed flex items-center justify-center top-0 left-0 w-full h-full z-[9999999999999999]': true,
        'opacity-100 pointer-events-auto': state.visible,
        'opacity-0 pointer-events-none': !state.visible
      } }, h("div", { tabIndex: -1, class: {
        'backdrop-blur-sm fixed top-0 left-0 w-full h-full bg-black/90': true,
        'opacity-0': !state.visible,
        'opacity-100': state.visible,
        'ease-in duration-100 transition': isAnimation()
      }, onClick: () => (state.visible = false) }), h("div", { class: {
        'max-w-screen-md inner w-full h-full absolute max-h-[600px] overflow-hidden grid bg-slate-900 md:rounded-xl': true,
        'opacity-0 translate-y-4': !state.visible,
        'opacity-100': state.visible,
        'ease-in duration-200 transition': isAnimation()
      } }, h("div", { class: "'w-full h-full absolute sm:bottom-0 sm:top-0'" }, h("div", { class: "bg-slate-50 grid grid-cols-[1fr,var(--sl-side-w),var(--sl-side-w)] lg:grid-cols-[1fr,64px,64px]" }, h("streamline-search", { class: "h-[var(--sl-side-w)] w-full lg:h-[64px]" })), h("streamline-entries", null)), h("streamline-ui-drawer", { class: "sm:hidden" })))));
  }
};
StreamlineContainer.style = containerCss;

export { StreamlineContainer as streamline_container };
