import { r as registerInstance, h } from './index-ac9abc62.js';
import { s as state, e as someDeep } from './setSearchPlaceholder-25f695c9.js';
import { s as state$1 } from './internal-d7978ed0.js';
import { s as setFavourite, t as tippy, H as Heart, F as Fav } from './Fav-93dfb1d8.js';
import { L as Loader } from './Loader-a8b47d31.js';
import { g as IconWordPress, h as IconSites, b as IconNetwork, a as IconMenu, c as IconPost, i as IconFlow, j as IconCustom, k as IconSettings, l as IconDots } from './fetchAjax-7c3eab78.js';

const streamlineButtonCss = ".tippy-box[data-animation=fade][data-state=hidden]{opacity:0}[data-tippy-root]{max-width:calc(100vw - 10px);max-width:none}.tippy-box{background-color:#333;background:#0f172a;border-radius:4px;border-radius:0!important;color:#fff;font-size:14px;line-height:1.4;max-width:none!important;outline:0;position:relative;transition-property:transform,visibility,opacity;white-space:normal}.tippy-box[data-placement^=top]>.tippy-arrow{bottom:0}.tippy-box[data-placement^=top]>.tippy-arrow:before{border-top-color:initial;border-width:8px 8px 0;bottom:-7px;left:0;transform-origin:center top}.tippy-box[data-placement^=bottom]>.tippy-arrow{top:0}.tippy-box[data-placement^=bottom]>.tippy-arrow:before{border-bottom-color:initial;border-width:0 8px 8px;left:0;top:-7px;transform-origin:center bottom}.tippy-box[data-placement^=left]>.tippy-arrow{right:0}.tippy-box[data-placement^=left]>.tippy-arrow:before{border-left-color:initial;border-width:8px 0 8px 8px;right:-7px;transform-origin:center left}.tippy-box[data-placement^=right]>.tippy-arrow{left:0}.tippy-box[data-placement^=right]>.tippy-arrow:before{border-right-color:initial;border-width:8px 8px 8px 0;left:-7px;transform-origin:center right}.tippy-box[data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.54,1.5,.38,1.11)}.tippy-arrow{color:#333;height:16px;width:16px}.tippy-arrow:before{border-color:transparent;border-style:solid;content:\"\";position:absolute}.tippy-content{padding:0;position:relative;z-index:1}:host{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;box-sizing:border-box;display:inline-block}:host .focus:focus{box-shadow:inset 0 0 0 4px #f1f5f9,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-border:focus{border-color:var(--sl-focus-color);box-shadow:0 0 0 1px var(--sl-focus-color);outline:none!important}:host .focus-out:focus{box-shadow:0 0 0 2px #f8fafc,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-dark:focus{box-shadow:inset 0 0 0 4px #0f172a,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-darker:focus{box-shadow:inset 0 0 0 4px #020204,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-white:focus{box-shadow:inset 0 0 0 4px #fff,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-white-out:focus{box-shadow:0 0 0 2px #fff,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-in-white-out:focus-within{box-shadow:0 0 0 2px #fff,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-none:focus{box-shadow:none!important;outline:none!important}:host .border-invalid{border-color:var(--sl-focus-color-invalid);box-shadow:0 0 0 1px var(--sl-focus-color-invalid);outline:none!important}:host *{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host([type-sub=context]) [data-tippy-root]{transform:translateY(47px)!important}:host([type-sub=context]) .tippy-box{background:#fff;box-shadow:-2px 2px 3px 0 rgba(0,0,0,.05)}.tippy-box .tippy-arrow{color:#0f172a}/*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{--tw-blur:var(--tw-empty,/*!*/ /*!*/);--tw-brightness:var(--tw-empty,/*!*/ /*!*/);--tw-contrast:var(--tw-empty,/*!*/ /*!*/);--tw-grayscale:var(--tw-empty,/*!*/ /*!*/);--tw-hue-rotate:var(--tw-empty,/*!*/ /*!*/);--tw-invert:var(--tw-empty,/*!*/ /*!*/);--tw-saturate:var(--tw-empty,/*!*/ /*!*/);--tw-sepia:var(--tw-empty,/*!*/ /*!*/);--tw-drop-shadow:var(--tw-empty,/*!*/ /*!*/);--tw-filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);--tw-border-opacity:1;border:0 solid;border:0 solid rgba(228,228,231,var(--tw-border-opacity));box-sizing:border-box}strong{font-weight:bolder}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}p{margin:0}a{color:inherit;text-decoration:inherit}.visible{visibility:visible}.inline-block{display:inline-block}.h-\\[max-content\\]{height:-webkit-max-content;height:-moz-max-content;height:max-content}.bg-blue-gray-200{--tw-bg-opacity:1;background-color:rgba(226,232,240,var(--tw-bg-opacity))}.px-2\\.5{padding-left:10px;padding-right:10px}.py-1\\.5{padding-bottom:6px;padding-top:6px}.px-2{padding-left:8px;padding-right:8px}.py-1{padding-bottom:4px;padding-top:4px}.text-blue-gray-500{--tw-text-opacity:1;color:rgba(100,116,139,var(--tw-text-opacity))}.blur{--tw-blur:blur(8px);filter:var(--tw-filter)}/*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize *//*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */img{border-style:solid;height:auto;max-width:100%}img,svg{display:block;vertical-align:middle}.h-6{height:24px}.h-10{height:40px}.w-6{width:24px}.w-10{width:40px}@-webkit-keyframes spin{to{transform:rotate(1turn)}}@keyframes spin{to{transform:rotate(1turn)}}.animate-spin{-webkit-animation:spin 1s linear infinite;animation:spin 1s linear infinite}/*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */svg{display:block;vertical-align:middle}.relative{position:relative}.-mr-px{margin-right:-1px}.h-\\[14px\\]{height:14px}.fill-current{fill:currentColor}/*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */.pointer-events-none{pointer-events:none}.flex{display:flex}.h-4{height:16px}.h-full{height:100%}.w-4{width:16px}.w-full{width:100%}.items-center{align-items:center}.justify-center{justify-content:center}.rounded-full{border-radius:9999px}.border{border-width:1px}.border-blue-gray-200{--tw-border-opacity:1;border-color:rgba(226,232,240,var(--tw-border-opacity))}.bg-white{--tw-bg-opacity:1;background-color:rgba(255,255,255,var(--tw-bg-opacity))}.text-red-500{--tw-text-opacity:1;color:rgba(239,68,68,var(--tw-text-opacity))}@media (min-width:640px){.sm\\:h-7{height:28px}.sm\\:w-7{width:28px}}@media (min-width:1024px){:host([type-sub=context]) [data-tippy-root]{transform:translateY(63px)!important}}";

let StreamlineButton = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        // @ts-ignore
        this.tw = "animate-spin h-[16px] h-[14px] w-8 h-8 sm:w-10 sm:h-10";
        // eslint-disable-next-line @stencil/strict-mutable
        this.favourite = false;
        this.preventClickFocus = (e) => {
            e.preventDefault();
        };
        this.handleClickFav = () => {
            setFavourite({
                favourite: this.favourite,
                callback: this.checkIfFav,
                type: state.active,
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
        if ((this.type === "menu" && this.tooltipTrigger) ||
            this.typeSub === "context") {
            const template = this.tooltip;
            template.style.display = "block";
            tippy(this.tooltipTrigger, {
                content: template,
                interactive: true,
                plugins: [hideOnPopperBlur],
                delay: [this.typeSub === "context" ? 0 : 500, null],
                placement: this.typeSub === "context" ? "bottom-end" : "top",
                offset: [
                    this.typeSub === "context" ? -9 : 0,
                    this.typeSub === "context" ? -1 : 10,
                ],
                arrow: this.typeSub !== "context",
            });
        }
    }
    render() {
        const className = `select-none break-words w-[max-content] underline-none cursor-pointer text-center whitespace-no-wrap ${this.type === "menu"
            ? `focus-out text-sm px-3 py-2.5 leading-none border border-blue-gray-200 bg-blue-gray-50 text-blue-600 hover:border-blue-600`
            : this.type === "sidebar" || this.type === "primary"
                ? `h-[calc(var(--sl-side-w))] w-[calc(var(--sl-side-w))] flex flex-col items-center justify-center p-0 text-white bg-transparent lg:h-[64px] ${this.type === "primary"
                    ? `focus-darker bg-[#020204] text-white fill-current h-[var(--sl-side-w)] hover:bg-[#080d17]`
                    : this.type === "sidebar" &&
                        `!grid focus-dark lg:h-[48px] ${this.icon !== "settings"
                            ? "sm:!grid-rows-[20px,20px] lg:!grid-rows-1 lg:grid-cols-[32px,1fr] lg:px-5"
                            : ""} !justify-items-center !content-center text-blue-gray-200 hover:text-blue-400 lg:!justify-items-start ${state.active === this.icon
                            ? "bg-blue-gray-800 pointer-events-none"
                            : ""}`}`
                : this.type === "icon"
                    ? "focus flex items-center justify-center w-full h-full text-blue-gray-900 border-b border-blue-gray-200"
                    : this.type === "button"
                        ? `select-none focus-out inline-flex items-center font-semibold text-xs ${this.styling === "primary"
                            ? "px-2.5 py-2 bg-blue-500 border-blue-500 text-white hover:bg-blue-600 hover:border-blue-600 sm:px-3.5"
                            : "px-2 py-1 bg-white border border-blue-gray-200 text-blue-gray-600 hover:text-blue-gray-50 hover:bg-blue-gray-900 hover:border-blue-gray-900 sm:px-3 sm:py-1.5"}`
                        : ""}`;
        const classNameText = `${this.type === "sidebar"
            ? "hidden sm:inline-block text-xs font-semibold leading-1 mt-1.5 lg:mt-0 lg:text-sm"
            : ""}`;
        const icon = this.icon === "wordpress" ? (h(IconWordPress, null)) : this.icon === "site" ? (h(IconSites, null)) : this.icon === "network" ? (h(IconNetwork, null)) : this.icon === "menu" ? (h(IconMenu, null)) : this.icon === "post" ? (h(IconPost, null)) : this.icon === "flow" ? (h(IconFlow, null)) : this.icon === "custom" ? (h(IconCustom, null)) : this.icon === "settings" ? (h(IconSettings, null)) : this.icon === "dots" ? (h(IconDots, null)) : (this.icon === "fav" && h(Heart, { type: this.type }));
        const text = this.text && h("span", { class: classNameText }, this.text);
        const dropdownButton = (obj) => (h("button", { onMouseDown: (e) => e.preventDefault(), class: `focus px-4 py-2 whitespace-nowrap text-sm font-medium text-blue-gray-900 hover:text-blue-400`, onClick: () => {
                obj.onClick();
                state$1.isSearch = !state$1.isHelp;
            } }, obj.text));
        return (h("div", { class: `relative flex flex-col w-full h-full ${this.type === "primary" ? "w-[calc(var(--sl-side-w)+1px)]" : ""} ${this.invalid ? "opacity-25 pointer-events-none" : ""}` }, this.type === "menu" && this.href ? (h("a", { onMouseDown: this.preventClickFocus, ref: (el) => (this.tooltipTrigger = el), href: !state$1.test ? this.href : "#", class: className }, icon, text, this.favourite && state.active !== "fav" && (h(Fav, { class: `absolute -top-1.5 -right-2` })))) : this.type === "sidebar" || this.type === "primary" ? (h("button", { onMouseDown: this.preventClickFocus, tabIndex: state.active === this.icon ? -1 : 0, class: className }, this.type === "primary" ? (state$1.isProcessing ? (h(Loader, { sm: true })) : (icon)) : (icon), this.icon === "settings" ? "" : text)) : this.type === "icon" ? (h("button", { onMouseDown: this.preventClickFocus, class: className, ref: (el) => (this.tooltipTrigger = el) }, icon, this.typeSub === "context" && (h("div", { class: `border border-blue-gray-200`, ref: (el) => (this.tooltip = el), style: {
                display: "block",
            } }, [
            {
                text: state$1.isHelp ? "Close help" : "Show help",
                onClick: () => {
                    state$1.isHelp = !state$1.isHelp;
                },
            },
        ].map((item) => {
            return dropdownButton(item);
        }))))) : (this.type === "button" && (h("button", { onMouseDown: this.preventClickFocus, class: className }, this.text === "Search" && (h("svg", { xmlns: "http://www.w3.org/2000/svg", class: `fill-current w-2 rotate-90 ml-1 mr-2 origin-right-center`, viewBox: "0 0 320 512" }, h("path", { fill: "currentColor", d: "M296.64 412.326l-96.16 96.16c-4.686 4.687-12.285 4.686-16.97 0L87.354 412.33c-7.536-7.536-2.198-20.484 8.485-20.485l68.161-.002V56H64a11.996 11.996 0 0 1-8.485-3.515l-32-32C15.955 12.926 21.309 0 32 0h164c13.255 0 24 10.745 24 24v367.842l68.154-.001c10.626-.001 16.066 12.905 8.486 20.485z" }))), this.text))), this.type === "menu" && (h("div", { onMouseDown: this.preventClickFocus, class: `!grid divide-x divide-blue-gray-200 auto-cols-max grid-flow-col`, ref: (el) => (this.tooltip = el), style: { display: "block" } }, [
            {
                onClick: this.handleClickFav,
                condition: this.favourite,
            },
        ].map((item) => {
            return (h("button", { onMouseDown: this.preventClickFocus, class: `border-none focus-dark group`, onClick: item.onClick }, h("span", { class: `w-8 h-8 flex items-center justify-center group-hover:text-blue-400 ${item.condition ? "text-red-500" : ""}` }, h(Heart, null))));
        })))));
    }
};
StreamlineButton.style = streamlineButtonCss + '/*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-transform:translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));--tw-border-opacity:1;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-blur:var(--tw-empty,/*!*/ /*!*/);--tw-brightness:var(--tw-empty,/*!*/ /*!*/);--tw-contrast:var(--tw-empty,/*!*/ /*!*/);--tw-grayscale:var(--tw-empty,/*!*/ /*!*/);--tw-hue-rotate:var(--tw-empty,/*!*/ /*!*/);--tw-invert:var(--tw-empty,/*!*/ /*!*/);--tw-saturate:var(--tw-empty,/*!*/ /*!*/);--tw-sepia:var(--tw-empty,/*!*/ /*!*/);--tw-drop-shadow:var(--tw-empty,/*!*/ /*!*/);--tw-filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);border:0 solid;border-color:rgba(228,228,231,var(--tw-border-opacity));box-sizing:border-box}button{background-color:transparent;background-image:none;color:inherit;cursor:pointer;font-family:inherit;font-size:100%;line-height:1.15;line-height:inherit;margin:0;padding:0;text-transform:none}[type=button],button{-webkit-appearance:button}a{color:inherit;text-decoration:inherit}svg{display:block;vertical-align:middle}[hidden]{display:none}.pointer-events-none{pointer-events:none}.absolute{position:absolute}.relative{position:relative}.-top-1\\.5{top:-6px}.-right-2{right:-8px}.-top-1{top:-4px}.mt-1\\.5{margin-top:6px}.mt-1{margin-top:4px}.ml-1{margin-left:4px}.mr-2{margin-right:8px}.block{display:block}.flex{display:flex}.inline-flex{display:inline-flex}.\\!grid{display:grid!important}.hidden{display:none}.h-\\[16px\\]{height:16px}.h-\\[14px\\]{height:14px}.h-8{height:32px}.h-\\[calc\\(var\\(--sl-side-w\\)\\)\\]{height:calc(var(--sl-side-w))}.h-\\[var\\(--sl-side-w\\)\\]{height:var(--sl-side-w)}.h-full{height:100%}.w-8{width:32px}.w-\\[max-content\\]{width:-webkit-max-content;width:-moz-max-content;width:max-content}.w-\\[calc\\(var\\(--sl-side-w\\)\\)\\]{width:calc(var(--sl-side-w))}.w-full{width:100%}.w-\\[calc\\(var\\(--sl-side-w\\)\\+1px\\)\\]{width:calc(var(--sl-side-w) + 1px)}.w-2{width:8px}.rotate-90{--tw-rotate:90deg;transform:var(--tw-transform)}@-webkit-keyframes spin{to{transform:rotate(1turn)}}@keyframes spin{to{transform:rotate(1turn)}}.animate-spin{-webkit-animation:spin 1s linear infinite;animation:spin 1s linear infinite}.cursor-pointer{cursor:pointer}.select-none{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.auto-cols-max{grid-auto-columns:-webkit-max-content;grid-auto-columns:max-content}.grid-flow-col{grid-auto-flow:column}.flex-col{flex-direction:column}.\\!content-center{align-content:center!important}.items-center{align-items:center}.justify-center{justify-content:center}.\\!justify-items-center{justify-items:center!important}.divide-x>:not([hidden])~:not([hidden]){--tw-divide-x-reverse:0;border-left-width:calc(1px*(1 - var(--tw-divide-x-reverse)));border-right-width:calc(1px*var(--tw-divide-x-reverse))}.divide-blue-gray-200>:not([hidden])~:not([hidden]){--tw-divide-opacity:1;border-color:rgba(226,232,240,var(--tw-divide-opacity))}.whitespace-nowrap{white-space:nowrap}.break-words{overflow-wrap:break-word}.border{border-width:1px}.border-b{border-bottom-width:1px}.border-none{border-style:none}.border-blue-gray-200{--tw-border-opacity:1;border-color:rgba(226,232,240,var(--tw-border-opacity))}.border-blue-500{--tw-border-opacity:1;border-color:rgba(59,130,246,var(--tw-border-opacity))}.bg-blue-gray-50{--tw-bg-opacity:1;background-color:rgba(248,250,252,var(--tw-bg-opacity))}.bg-transparent{background-color:transparent}.bg-\\[\\#020204\\]{--tw-bg-opacity:1;background-color:rgba(2,2,4,var(--tw-bg-opacity))}.bg-blue-gray-800{--tw-bg-opacity:1;background-color:rgba(30,41,59,var(--tw-bg-opacity))}.bg-blue-500{--tw-bg-opacity:1;background-color:rgba(59,130,246,var(--tw-bg-opacity))}.bg-white{--tw-bg-opacity:1;background-color:rgba(255,255,255,var(--tw-bg-opacity))}.fill-current{fill:currentColor}.p-0{padding:0}.px-3{padding-left:12px;padding-right:12px}.py-2\\.5{padding-bottom:10px;padding-top:10px}.py-2{padding-bottom:8px;padding-top:8px}.px-2\\.5{padding-left:10px;padding-right:10px}.px-2{padding-left:8px;padding-right:8px}.py-1{padding-bottom:4px;padding-top:4px}.px-4{padding-left:16px;padding-right:16px}.text-center{text-align:center}.text-sm{font-size:14px}.text-xs{font-size:12px}.font-semibold{font-weight:600}.font-medium{font-weight:500}.leading-none{line-height:1}.text-blue-600{--tw-text-opacity:1;color:rgba(37,99,235,var(--tw-text-opacity))}.text-white{--tw-text-opacity:1;color:rgba(255,255,255,var(--tw-text-opacity))}.text-blue-gray-200{--tw-text-opacity:1;color:rgba(226,232,240,var(--tw-text-opacity))}.text-blue-gray-900{--tw-text-opacity:1;color:rgba(15,23,42,var(--tw-text-opacity))}.text-blue-gray-600{--tw-text-opacity:1;color:rgba(71,85,105,var(--tw-text-opacity))}.text-red-500{--tw-text-opacity:1;color:rgba(239,68,68,var(--tw-text-opacity))}.opacity-25{opacity:.25}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.filter{filter:var(--tw-filter)}.hover\\:border-blue-600:hover{--tw-border-opacity:1;border-color:rgba(37,99,235,var(--tw-border-opacity))}.hover\\:border-blue-gray-900:hover{--tw-border-opacity:1;border-color:rgba(15,23,42,var(--tw-border-opacity))}.hover\\:bg-\\[\\#080d17\\]:hover{--tw-bg-opacity:1;background-color:rgba(8,13,23,var(--tw-bg-opacity))}.hover\\:bg-blue-600:hover{--tw-bg-opacity:1;background-color:rgba(37,99,235,var(--tw-bg-opacity))}.hover\\:bg-blue-gray-900:hover{--tw-bg-opacity:1;background-color:rgba(15,23,42,var(--tw-bg-opacity))}.hover\\:text-blue-400:hover{--tw-text-opacity:1;color:rgba(96,165,250,var(--tw-text-opacity))}.hover\\:text-blue-gray-50:hover{--tw-text-opacity:1;color:rgba(248,250,252,var(--tw-text-opacity))}.group:hover .group-hover\\:text-blue-400{--tw-text-opacity:1;color:rgba(96,165,250,var(--tw-text-opacity))}@media (min-width:640px){.sm\\:inline-block{display:inline-block}.sm\\:h-10{height:40px}.sm\\:w-10{width:40px}.sm\\:\\!grid-rows-\\[20px\\2c 20px\\]{grid-template-rows:20px 20px!important}.sm\\:px-3\\.5{padding-left:14px;padding-right:14px}.sm\\:px-3{padding-left:12px;padding-right:12px}.sm\\:py-1\\.5{padding-bottom:6px;padding-top:6px}.sm\\:py-1{padding-bottom:4px;padding-top:4px}}@media (min-width:1024px){.lg\\:mt-0{margin-top:0}.lg\\:h-\\[64px\\]{height:64px}.lg\\:h-\\[48px\\]{height:48px}.lg\\:grid-cols-\\[32px\\2c 1fr\\]{grid-template-columns:32px 1fr}.lg\\:\\!grid-rows-1{grid-template-rows:repeat(1,minmax(0,1fr))!important}.lg\\:\\!justify-items-start{justify-items:start!important}.lg\\:px-5{padding-left:20px;padding-right:20px}.lg\\:text-sm{font-size:14px}}';

export { StreamlineButton as streamline_button };
