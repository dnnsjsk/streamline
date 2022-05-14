import { h, r as registerInstance, s as state, o as onChange, g as getElement } from './internal-2dda299f.js';
import { I as Icon } from './Icon-b7b06da8.js';

// eslint-disable-next-line no-unused-vars
const Button = (props) => {
  return (h("button", Object.assign({}, props, { class: {
      [props.class]: props.class,
      'focus-out inline-flex items-center justify-center rounded-md text-sm font-semibold': true,
      'px-3 py-2 sm:py-2.5 sm:px-4': props.type === 'primary' ||
        props.type === 'secondary' ||
        props.type === 'transparent',
      'border-blue-600 bg-blue-600 text-white text-white hover:border-blue-700 hover:bg-blue-700': props.type === 'primary',
      'border-slate-200 bg-slate-200 text-slate-600 hover:border-slate-900 hover:bg-slate-900 hover:text-white': props.type === 'secondary',
      'border border-slate-200 bg-white px-2 py-1 text-slate-600 hover:border-slate-900 hover:bg-slate-900 hover:text-slate-50 sm:px-3 sm:py-1.5': props.type === 'tertiary',
      'pointer-events-none opacity-50': props.disabled,
      'absolute mr-2 !h-6 !w-6 border border-slate-200 !p-0 text-slate-600 hover:border-slate-900 hover:bg-slate-900 hover:text-slate-50': props.type === 'back',
      'text-slate-600 hover:border-slate-900 hover:bg-slate-900 hover:text-white': props.type === 'transparent',
    }, onMouseDown: (e) => e.preventDefault() }),
    props.icon && props.icon,
    props.text && props.text));
};

const IconSearch = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M504.1 471l-134-134C399.1 301.5 415.1 256.8 415.1 208c0-114.9-93.13-208-208-208S-.0002 93.13-.0002 208S93.12 416 207.1 416c48.79 0 93.55-16.91 129-45.04l134 134C475.7 509.7 481.9 512 488 512s12.28-2.344 16.97-7.031C514.3 495.6 514.3 480.4 504.1 471zM48 208c0-88.22 71.78-160 160-160s160 71.78 160 160s-71.78 160-160 160S48 296.2 48 208z"/></svg>`;

const tailwindCss = "@tailwind base;@tailwind utilities;@tailwind components;:host{display:block}*{text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif;line-height:1.25}.focus-inner:focus{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);--tw-ring-inset:inset;--tw-ring-opacity:1;--tw-ring-color:rgb(59 130 246/var(--tw-ring-opacity));--tw-ring-offset-width:2px;box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 #0000);outline:2px solid transparent;outline-offset:2px}\n /*! tailwindcss v3.0.24 | MIT License | https://tailwindcss.com*/*,:after,:before{--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;border:0 solid #e5e7eb;box-sizing:border-box}:after,:before{--tw-content:\"\"}a{color:inherit;text-decoration:inherit}button,input{color:inherit;font-family:inherit;font-size:100%;line-height:inherit;margin:0;padding:0}button{text-transform:none}[type=button],button{-webkit-appearance:button;background-color:transparent;background-image:none}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}input::-moz-placeholder{color:#9ca3af;opacity:1}input:-ms-input-placeholder{color:#9ca3af;opacity:1}input::placeholder{color:#9ca3af;opacity:1}[role=button],button{cursor:pointer}svg{display:block;vertical-align:middle}.pointer-events-none{pointer-events:none}.pointer-events-auto{pointer-events:auto}.visible{visibility:visible}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.top-0{top:0}.left-0{left:0}.bottom-0{bottom:0}.-bottom-px{bottom:-1px}.left-3{left:12px}.right-3{right:12px}.z-50{z-index:50}.z-30{z-index:30}.m-0{margin:0}.ml-auto{margin-left:auto}.ml-1{margin-left:4px}.mr-2{margin-right:8px}.block{display:block}.flex{display:flex}.inline-flex{display:inline-flex}.grid{display:grid}.h-full{height:100%}.h-3{height:12px}.h-px{height:1px}.h-16{height:64px}.w-full{width:100%}.w-3{width:12px}.w-2{width:8px}.max-w-screen-md{max-width:768px}.translate-y-4{--tw-translate-y:16px}.rotate-90,.translate-y-4{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rotate-90{--tw-rotate:90deg}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.flex-col{flex-direction:column}.items-center{align-items:center}.justify-center{justify-content:center}.overflow-hidden{overflow:hidden}.whitespace-nowrap{white-space:nowrap}.rounded-md{border-radius:6px}.border{border-width:1px}.border-t{border-top-width:1px}.border-slate-400{border-color:rgb(148 163 184/var(--tw-border-opacity))}.border-slate-100,.border-slate-400{--tw-border-opacity:1}.border-slate-100{border-color:rgb(241 245 249/var(--tw-border-opacity))}.bg-white{background-color:rgb(255 255 255/var(--tw-bg-opacity))}.bg-slate-50,.bg-white{--tw-bg-opacity:1}.bg-slate-50{background-color:rgb(248 250 252/var(--tw-bg-opacity))}.bg-slate-200{background-color:rgb(226 232 240/var(--tw-bg-opacity))}.bg-blue-500,.bg-slate-200{--tw-bg-opacity:1}.bg-blue-500{background-color:rgb(59 130 246/var(--tw-bg-opacity))}.bg-transparent{background-color:transparent}.fill-current{fill:currentColor}.p-0{padding:0}.px-3{padding-left:12px;padding-right:12px}.py-2{padding-bottom:8px;padding-top:8px}.px-9{padding-left:36px;padding-right:36px}.pl-3{padding-left:12px}.text-left{text-align:left}.text-sm{font-size:14px}.font-medium{font-weight:500}.font-normal{font-weight:400}.text-slate-900{color:rgb(15 23 42/var(--tw-text-opacity))}.text-slate-400,.text-slate-900{--tw-text-opacity:1}.text-slate-400{color:rgb(148 163 184/var(--tw-text-opacity))}.text-slate-500{--tw-text-opacity:1;color:rgb(100 116 139/var(--tw-text-opacity))}.opacity-0{opacity:0}.opacity-100{opacity:1}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1);--tw-shadow-colored:0 1px 3px 0 var(--tw-shadow-color),0 1px 2px -1px var(--tw-shadow-color)}.shadow,.shadow-md{box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.shadow-md{--tw-shadow:0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -2px rgba(0,0,0,.1);--tw-shadow-colored:0 4px 6px -1px var(--tw-shadow-color),0 2px 4px -2px var(--tw-shadow-color)}.backdrop-blur-sm{--tw-backdrop-blur:blur(4px);-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}.transition{transition-duration:.15s;transition-property:color,background-color,border-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-text-decoration-color,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-text-decoration-color,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1)}.duration-100{transition-duration:.1s}.duration-200{transition-duration:.2s}.ease-in{transition-timing-function:cubic-bezier(.4,0,1,1)}.\\!pointer-events-auto{pointer-events:auto!important}.mt-\\[2px\\]{margin-top:2px}.\\!opacity-100{opacity:1!important}.focus-within\\:pointer-events-auto:focus-within{pointer-events:auto}.focus-within\\:text-blue-600:focus-within{--tw-text-opacity:1;color:rgb(37 99 235/var(--tw-text-opacity))}.focus-within\\:opacity-100:focus-within{opacity:1}.hover\\:z-50:hover{z-index:50}.hover\\:text-blue-600:hover{--tw-text-opacity:1;color:rgb(37 99 235/var(--tw-text-opacity))}.hover\\:opacity-100:hover{opacity:1}.focus\\:text-blue-600:focus{--tw-text-opacity:1;color:rgb(37 99 235/var(--tw-text-opacity))}.focus\\:opacity-100:focus{opacity:1}.group:hover .group-hover\\:pointer-events-auto{pointer-events:auto}.group:hover .group-hover\\:opacity-100{opacity:1}.group:focus .group-focus\\:pointer-events-auto{pointer-events:auto}.group:focus .group-focus\\:opacity-100{opacity:1}.h-3\\.5{height:14px}.w-3\\.5{width:14px}@media (min-width:1024px){.lg\\:h-4{height:16px}.lg\\:w-4{width:16px}}.z-\\[9999999999999999\\]{z-index:10000000000000000}.h-\\[2px\\]{height:2px}.max-h-\\[600px\\]{max-height:600px}.grid-cols-\\[1fr\\2c 75px\\]{grid-template-columns:1fr 75px}.bg-black\\/90{background-color:rgba(0,0,0,.9)}@media (min-width:640px){.sm\\:hidden{display:none}}@media (min-width:768px){.md\\:rounded-2xl{border-radius:16px}}.top-1\\/2{top:50%}.-translate-y-1\\/2{--tw-translate-y:-50%}.-translate-y-1\\/2,.rotate-90{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.text-\\[18px\\]{font-size:18px}.placeholder-slate-500::-moz-placeholder{--tw-placeholder-opacity:1;color:rgb(100 116 139/var(--tw-placeholder-opacity))}.placeholder-slate-500:-ms-input-placeholder{--tw-placeholder-opacity:1;color:rgb(100 116 139/var(--tw-placeholder-opacity))}.placeholder-slate-500::placeholder{--tw-placeholder-opacity:1;color:rgb(100 116 139/var(--tw-placeholder-opacity))}.focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}@media (min-width:640px){.sm\\:right-4{right:16px}}@media (min-width:1024px){.lg\\:left-5{left:20px}.lg\\:px-12{padding-left:48px;padding-right:48px}}.\\!h-6{height:24px!important}.\\!w-6{width:24px!important}.border-blue-600{--tw-border-opacity:1;border-color:rgb(37 99 235/var(--tw-border-opacity))}.border-slate-200{--tw-border-opacity:1;border-color:rgb(226 232 240/var(--tw-border-opacity))}.bg-blue-600{--tw-bg-opacity:1;background-color:rgb(37 99 235/var(--tw-bg-opacity))}.\\!p-0{padding:0!important}.px-2{padding-left:8px;padding-right:8px}.py-1{padding-bottom:4px;padding-top:4px}.font-semibold{font-weight:600}.text-white{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity))}.text-slate-600{--tw-text-opacity:1;color:rgb(71 85 105/var(--tw-text-opacity))}.opacity-50{opacity:.5}.hover\\:border-blue-700:hover{--tw-border-opacity:1;border-color:rgb(29 78 216/var(--tw-border-opacity))}.hover\\:border-slate-900:hover{--tw-border-opacity:1;border-color:rgb(15 23 42/var(--tw-border-opacity))}.hover\\:bg-blue-700:hover{--tw-bg-opacity:1;background-color:rgb(29 78 216/var(--tw-bg-opacity))}.hover\\:bg-slate-900:hover{--tw-bg-opacity:1;background-color:rgb(15 23 42/var(--tw-bg-opacity))}.hover\\:text-white:hover{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity))}.hover\\:text-slate-50:hover{--tw-text-opacity:1;color:rgb(248 250 252/var(--tw-text-opacity))}@media (min-width:640px){.sm\\:py-2\\.5{padding-bottom:10px;padding-top:10px}.sm\\:px-4{padding-left:16px;padding-right:16px}.sm\\:py-2{padding-bottom:8px;padding-top:8px}.sm\\:px-3{padding-left:12px;padding-right:12px}.sm\\:py-1\\.5{padding-bottom:6px;padding-top:6px}.sm\\:py-1{padding-bottom:4px;padding-top:4px}}";

const StreamlineSearch = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.onInput = (e) => {
      state.searchValue = e.target.value;
      state.isLoading = false;
      state.isEnter = false;
    };
  }
  componentDidRender() {
    onChange('visible', (value) => {
      value && this.input.focus();
    });
    this.input.focus();
  }
  render() {
    return (h("div", { class: "relative h-full w-full" }, h("input", { ref: (el) => (this.input = el), id: "search", class: "m-0 h-full w-full w-full bg-transparent p-0 px-9 text-[18px] font-normal text-slate-900 placeholder-slate-500 focus:outline-none lg:px-12", type: "text", autocomplete: "off", placeholder: state.searchPlaceholder, value: state.searchValue, onInput: this.onInput, onBlur: () => (state.isSearchFocus = false), onFocus: () => (state.isSearchFocus = true) }), h(Icon, { class: "absolute left-3 top-1/2 -translate-y-1/2 fill-current text-slate-500 peer-focus:text-blue-600 lg:left-5", icon: IconSearch }), state.isEnter && (h("div", { class: "absolute right-3 top-1/2 -translate-y-1/2 sm:right-4" }, h(Button, { type: "tertiary", text: "Search", icon: h("svg", { xmlns: "http://www.w3.org/2000/svg", class: "origin-right-center ml-1 mr-2 w-2 rotate-90 fill-current", viewBox: "0 0 320 512" }, h("path", { fill: "currentColor", d: "M296.64 412.326l-96.16 96.16c-4.686 4.687-12.285 4.686-16.97 0L87.354 412.33c-7.536-7.536-2.198-20.484 8.485-20.485l68.161-.002V56H64a11.996 11.996 0 0 1-8.485-3.515l-32-32C15.955 12.926 21.309 0 32 0h164c13.255 0 24 10.745 24 24v367.842l68.154-.001c10.626-.001 16.066 12.905 8.486 20.485z" })) })))));
  }
  get el() { return getElement(this); }
};
StreamlineSearch.style = tailwindCss;

export { StreamlineSearch as streamline_search };
