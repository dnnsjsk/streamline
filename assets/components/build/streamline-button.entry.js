import { r as registerInstance, h } from './index-2c4cdcb5.js';
import { s as state, c as someDeep } from './setSearchPlaceholder-f92c7cd9.js';
import { s as state$1 } from './capitalizeFirstLetter-a06ceb0e.js';
import { f as fetchAjax, s as setFavourite, t as tippy, H as Heart, F as Fav } from './Fav-f50b5f90.js';
import { g as getMenu } from './getMenu-f47b2d32.js';
import { L as Loader } from './Loader-9d68a3e0.js';

const streamlineButtonCss = ".tippy-box[data-animation=fade][data-state=hidden]{opacity:0}[data-tippy-root]{max-width:calc(100vw - 10px)}.tippy-box{background-color:#333;background:#0f172a;border-radius:4px;border-radius:0!important;color:#fff;font-size:14px;line-height:1.4;outline:0;position:relative;transition-property:transform,visibility,opacity;white-space:normal}.tippy-box[data-placement^=top]>.tippy-arrow{bottom:0}.tippy-box[data-placement^=top]>.tippy-arrow:before{border-top-color:initial;border-width:8px 8px 0;bottom:-7px;left:0;transform-origin:center top}.tippy-box[data-placement^=bottom]>.tippy-arrow{top:0}.tippy-box[data-placement^=bottom]>.tippy-arrow:before{border-bottom-color:initial;border-width:0 8px 8px;left:0;top:-7px;transform-origin:center bottom}.tippy-box[data-placement^=left]>.tippy-arrow{right:0}.tippy-box[data-placement^=left]>.tippy-arrow:before{border-left-color:initial;border-width:8px 0 8px 8px;right:-7px;transform-origin:center left}.tippy-box[data-placement^=right]>.tippy-arrow{left:0}.tippy-box[data-placement^=right]>.tippy-arrow:before{border-right-color:initial;border-width:8px 8px 8px 0;left:-7px;transform-origin:center right}.tippy-box[data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.54,1.5,.38,1.11)}.tippy-arrow{color:#333;height:16px;width:16px}.tippy-arrow:before{border-color:transparent;border-style:solid;content:\"\";position:absolute}.tippy-content{padding:0;position:relative;z-index:1}:host .focus:focus{box-shadow:inset 0 0 0 4px #f8fafc,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-out:focus{box-shadow:0 0 0 2px #f8fafc,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-dark:focus{box-shadow:inset 0 0 0 4px #191e23,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-white:focus{box-shadow:inset 0 0 0 4px #fff,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-white-out:focus{box-shadow:0 0 0 2px #fff,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-in-white-out:focus-within{box-shadow:0 0 0 2px #fff,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-none:focus{box-shadow:none!important;outline:none!important}.tippy-box .tippy-arrow{color:#0f172a}/*! tailwindcss v2.2.17 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{--tw-blur:var(--tw-empty,/*!*/ /*!*/);--tw-brightness:var(--tw-empty,/*!*/ /*!*/);--tw-contrast:var(--tw-empty,/*!*/ /*!*/);--tw-grayscale:var(--tw-empty,/*!*/ /*!*/);--tw-hue-rotate:var(--tw-empty,/*!*/ /*!*/);--tw-invert:var(--tw-empty,/*!*/ /*!*/);--tw-saturate:var(--tw-empty,/*!*/ /*!*/);--tw-sepia:var(--tw-empty,/*!*/ /*!*/);--tw-drop-shadow:var(--tw-empty,/*!*/ /*!*/);--tw-filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);--tw-border-opacity:1;border:0 solid;box-sizing:border-box}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}a{color:inherit;text-decoration:inherit}.visible{visibility:visible}.inline-block{display:inline-block}.h-\\[max-content\\]{height:-webkit-max-content;height:-moz-max-content;height:max-content}.bg-blue-gray-200{--tw-bg-opacity:1;background-color:rgba(226,232,240,var(--tw-bg-opacity))}.px-2\\.5{padding-left:.625rem;padding-right:.625rem}.py-1\\.5{padding-bottom:.375rem;padding-top:.375rem}.px-2{padding-left:.5rem;padding-right:.5rem}.py-1{padding-bottom:.25rem;padding-top:.25rem}.text-blue-gray-500{--tw-text-opacity:1;color:rgba(100,116,139,var(--tw-text-opacity))}.blur{--tw-blur:blur(8px);filter:var(--tw-filter)}/*! tailwindcss v2.2.17 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize *//*! tailwindcss v2.2.17 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */img{border-style:solid;height:auto;max-width:100%}img,svg{display:block;vertical-align:middle}.h-6{height:1.5rem}.h-10{height:2.5rem}.w-6{width:1.5rem}.w-10{width:2.5rem}@-webkit-keyframes spin{to{transform:rotate(1turn)}}@keyframes spin{to{transform:rotate(1turn)}}.animate-spin{-webkit-animation:spin 1s linear infinite;animation:spin 1s linear infinite}/*! tailwindcss v2.2.17 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */.pointer-events-none{pointer-events:none}.flex{display:flex}.h-4{height:1rem}.h-full{height:100%}.w-4{width:1rem}.w-full{width:100%}.items-center{align-items:center}.justify-center{justify-content:center}.rounded-full{border-radius:9999px}.border{border-width:1px}.border-blue-gray-200{--tw-border-opacity:1;border-color:rgba(226,232,240,var(--tw-border-opacity))}.bg-white{--tw-bg-opacity:1;background-color:rgba(255,255,255,var(--tw-bg-opacity))}.text-red-500{--tw-text-opacity:1;color:rgba(239,68,68,var(--tw-text-opacity))}/*! tailwindcss v2.2.17 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */svg{display:block;vertical-align:middle}.relative{position:relative}.-mr-px{margin-right:-1px}.h-\\[14px\\]{height:14px}.fill-current{fill:currentColor}@media (min-width:640px){.sm\\:h-7{height:1.75rem}.sm\\:w-7{width:1.75rem}}";

let StreamlineButton = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        // @ts-ignore
        this.tw = "animate-spin";
        // eslint-disable-next-line @stencil/strict-mutable
        this.favourite = false;
        this.handleClick = () => {
            if (this.type === "sidebar") {
                state.active = this.icon;
            }
            if (state.active === "menu" &&
                state$1.entriesMenu.length === 0) {
                getMenu();
            }
            if (this.type === "saveSettings") {
                if (!state$1.test) {
                    fetchAjax({
                        type: "settings",
                        query: state$1.entriesSettingsSave,
                        callback: () => {
                            // @ts-ignore
                            state$1.entriesSettingsLoad =
                                state$1.entriesSettingsSave;
                        },
                    });
                }
                else {
                    // @ts-ignore
                    state$1.entriesSettingsLoad = state$1.entriesSettingsSave;
                }
            }
        };
        this.handleFavClick = () => {
            setFavourite({
                favourite: this.favourite,
                callback: this.checkIfFav,
                type: "menu",
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
        if (this.type === "menu" && this.link) {
            const template = this.tooltip;
            template.style.display = "block";
            tippy(this.link, {
                content: template,
                interactive: true,
                plugins: [hideOnPopperBlur],
                delay: [500, null],
            });
        }
    }
    render() {
        const className = `break-words w-[max-content] underline-none cursor-pointer text-center whitespace-no-wrap ${this.type === "menu"
            ? `text-sm px-3 py-2.5 leading-none border border-blue-gray-200 bg-blue-gray-50 text-blue-600 hover:border-blue-600`
            : this.type === "sidebar" || this.type === "primary"
                ? `h-[calc(var(--sl-side-w))] w-[calc(var(--sl-side-w)-1px)] flex flex-col items-center justify-center p-0 text-blue-gray-900 bg-transparent border-b border-blue-gray-300 ${this.type === "primary"
                    ? `bg-blue-gray-900 border-none text-white fill-current h-[var(--sl-side-w)] w-[calc(var(--sl-side-w)+1px)] hover:bg-[#0e1114]`
                    : this.type === "sidebar" &&
                        `!grid ${this.icon !== "settings"
                            ? "sm:!grid-rows-[20px,20px]"
                            : "border-t border-blue-gray-300"} !justify-items-center !content-center text-blue-gray-500 border-b border-blue-gray-300 hover:bg-blue-gray-100 hover:text-blue-gray-900 ${state.active === this.icon
                            ? "text-blue-700 pointer-events-none"
                            : ""}`}`
                : ""}`;
        const classNameText = `${this.type === "sidebar"
            ? "hidden sm:inline-block text-xs font-bold leading-1 uppercase mt-1.5"
            : ""}`;
        const classNameIconSidebar = `fill-current`;
        const iconWordpress = (h("svg", { class: `w-8 h-8 sm:w-10 sm:h-10`, xmlns: "http://www.w3.org/2000/svg", viewBox: "-2 -2 24 24" }, h("path", { d: "M20 10c0-5.51-4.49-10-10-10C4.48 0 0 4.49 0 10c0 5.52 4.48 10 10 10 5.51 0 10-4.48 10-10zM7.78 15.37L4.37 6.22c.55-.02 1.17-.08 1.17-.08.5-.06.44-1.13-.06-1.11 0 0-1.45.11-2.37.11-.18 0-.37 0-.58-.01C4.12 2.69 6.87 1.11 10 1.11c2.33 0 4.45.87 6.05 2.34-.68-.11-1.65.39-1.65 1.58 0 .74.45 1.36.9 2.1.35.61.55 1.36.55 2.46 0 1.49-1.4 5-1.4 5l-3.03-8.37c.54-.02.82-.17.82-.17.5-.05.44-1.25-.06-1.22 0 0-1.44.12-2.38.12-.87 0-2.33-.12-2.33-.12-.5-.03-.56 1.2-.06 1.22l.92.08 1.26 3.41zM17.41 10c.24-.64.74-1.87.43-4.25.7 1.29 1.05 2.71 1.05 4.25 0 3.29-1.73 6.24-4.4 7.78.97-2.59 1.94-5.2 2.92-7.78zM6.1 18.09C3.12 16.65 1.11 13.53 1.11 10c0-1.3.23-2.48.72-3.59C3.25 10.3 4.67 14.2 6.1 18.09zm4.03-6.63l2.58 6.98c-.86.29-1.76.45-2.71.45-.79 0-1.57-.11-2.29-.33.81-2.38 1.62-4.74 2.42-7.1z" })));
        const iconMenu = (h("svg", { xmlns: "http://www.w3.org/2000/svg", class: `${classNameIconSidebar} h-[18px]`, viewBox: "0 0 512 512" }, h("path", { fill: "currentColor", d: "M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z" })));
        const iconFlow = (h("svg", { class: `${classNameIconSidebar} h-[16px]`, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24" }, h("path", { d: "M19.75 9c0-1.257-.565-2.197-1.39-2.858-.797-.64-1.827-1.017-2.815-1.247-1.802-.42-3.703-.403-4.383-.396L11 4.5V6l.177-.001c.696-.006 2.416-.02 4.028.356.887.207 1.67.518 2.216.957.52.416.829.945.829 1.688 0 .592-.167.966-.407 1.23-.255.281-.656.508-1.236.674-1.19.34-2.82.346-4.607.346h-.077c-1.692 0-3.527 0-4.942.404-.732.209-1.424.545-1.935 1.108-.526.579-.796 1.33-.796 2.238 0 1.257.565 2.197 1.39 2.858.797.64 1.827 1.017 2.815 1.247 1.802.42 3.703.403 4.383.396L13 19.5h.714V22L18 18.5 13.714 15v3H13l-.177.001c-.696.006-2.416.02-4.028-.356-.887-.207-1.67-.518-2.216-.957-.52-.416-.829-.945-.829-1.688 0-.592.167-.966.407-1.23.255-.281.656-.508 1.237-.674 1.189-.34 2.819-.346 4.606-.346h.077c1.692 0 3.527 0 4.941-.404.732-.209 1.425-.545 1.936-1.108.526-.579.796-1.33.796-2.238z" })));
        const iconPost = (h("svg", { class: `${classNameIconSidebar} h-[16px]`, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" }, h("path", { fill: "currentColor", d: "M512 0C460.22 3.56 96.44 38.2 71.01 287.61c-3.09 26.66-4.84 53.44-5.99 80.24l178.87-178.69c6.25-6.25 16.4-6.25 22.65 0s6.25 16.38 0 22.63L7.04 471.03c-9.38 9.37-9.38 24.57 0 33.94 9.38 9.37 24.59 9.37 33.98 0l57.13-57.07c42.09-.14 84.15-2.53 125.96-7.36 53.48-5.44 97.02-26.47 132.58-56.54H255.74l146.79-48.88c11.25-14.89 21.37-30.71 30.45-47.12h-81.14l106.54-53.21C500.29 132.86 510.19 26.26 512 0z" })));
        const iconSettings = (h("svg", { class: `${classNameIconSidebar} h-[16px]`, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" }, h("path", { fill: "currentColor", d: "M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z" })));
        const icon = this.icon === "wordpress"
            ? iconWordpress
            : this.icon === "menu"
                ? iconMenu
                : this.icon === "post"
                    ? iconPost
                    : this.icon === "flow"
                        ? iconFlow
                        : this.icon === "settings"
                            ? iconSettings
                            : this.icon === "fav" && h(Heart, { type: this.type });
        const text = this.text && h("span", { class: classNameText }, this.text);
        return (h("div", { class: `relative flex ${this.type === "primary" ? "w-[calc(var(--sl-side-w)+1px)]" : "w-full"}` }, this.type === "menu" && this.href ? (h("a", { ref: (el) => (this.link = el), href: !state$1.test ? this.href : "#", onClick: this.handleClick, class: className + ` focus-out` }, icon, text, this.favourite && state.active !== "fav" && (h(Fav, { class: `absolute -top-1.5 -right-2` })))) : this.type === "sidebar" || this.type === "primary" ? (h("button", { onClick: this.handleClick, tabIndex: state.active === this.icon ? -1 : 0, style: {
                borderBottom: this.type === "primary"
                    ? ""
                    : "1px solid rgba(209,213,219,var(--tw-border-opacity))",
            }, class: className + ` ${this.type === "primary" ? "focus-dark" : "focus"}` }, this.type === "primary" ? (state$1.isProcessing ? (h(Loader, { sm: true })) : (icon)) : (icon), this.icon === "settings" ? "" : text)) : (h("button", { onClick: this.type === "saveSettings" && this.handleClick, class: `focus-out inline-flex items-center font-medium ${this.styling === "primary"
                ? "text-sm px-2.5 py-1.5 bg-blue-500 border-blue-500 text-white hover:bg-blue-600 hover:border-blue-600 sm:px-3.5"
                : "text-xs px-2 py-1 bg-white border border-blue-gray-200 text-blue-gray-600 hover:text-blue-gray-50 hover:bg-blue-gray-900 hover:border-blue-gray-900 sm:text-sm sm:px-3 sm:py-1.5"}` }, this.text === "Search" && (h("svg", { xmlns: "http://www.w3.org/2000/svg", class: `fill-current w-2 rotate-90 ml-1 mr-2 origin-right-center`, viewBox: "0 0 320 512" }, h("path", { fill: "currentColor", d: "M296.64 412.326l-96.16 96.16c-4.686 4.687-12.285 4.686-16.97 0L87.354 412.33c-7.536-7.536-2.198-20.484 8.485-20.485l68.161-.002V56H64a11.996 11.996 0 0 1-8.485-3.515l-32-32C15.955 12.926 21.309 0 32 0h164c13.255 0 24 10.745 24 24v367.842l68.154-.001c10.626-.001 16.066 12.905 8.486 20.485z" }))), this.text)), this.type === "menu" && (h("div", { class: `!grid divide-x divide-blue-gray-200 auto-cols-max grid-flow-col`, ref: (el) => (this.tooltip = el), style: { display: "block" } }, [
            {
                onClick: this.handleFavClick,
                condition: this.favourite,
            },
        ].map((item) => {
            return (h("button", { class: `border-none focus-dark`, onClick: item.onClick }, h("span", { class: `w-8 h-8 flex items-center justify-center ${item.condition ? "text-red-500" : ""}` }, h(Heart, null))));
        })))));
    }
};
StreamlineButton.style = streamlineButtonCss + '/*! tailwindcss v2.2.17 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-transform:translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));--tw-border-opacity:1;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-blur:var(--tw-empty,/*!*/ /*!*/);--tw-brightness:var(--tw-empty,/*!*/ /*!*/);--tw-contrast:var(--tw-empty,/*!*/ /*!*/);--tw-grayscale:var(--tw-empty,/*!*/ /*!*/);--tw-hue-rotate:var(--tw-empty,/*!*/ /*!*/);--tw-invert:var(--tw-empty,/*!*/ /*!*/);--tw-saturate:var(--tw-empty,/*!*/ /*!*/);--tw-sepia:var(--tw-empty,/*!*/ /*!*/);--tw-drop-shadow:var(--tw-empty,/*!*/ /*!*/);--tw-filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);border:0 solid;border-color:rgba(228,228,231,var(--tw-border-opacity));box-sizing:border-box}button{background-color:transparent;background-image:none;color:inherit;cursor:pointer;font-family:inherit;font-size:100%;line-height:1.15;line-height:inherit;margin:0;padding:0;text-transform:none}[type=button],button{-webkit-appearance:button}a{color:inherit;text-decoration:inherit}svg{display:block;vertical-align:middle}[hidden]{display:none}.pointer-events-none{pointer-events:none}.absolute{position:absolute}.relative{position:relative}.-top-1\\.5{top:-.375rem}.-right-2{right:-.5rem}.-top-1{top:-.25rem}.mt-1\\.5{margin-top:.375rem}.mt-1{margin-top:.25rem}.ml-1{margin-left:.25rem}.mr-2{margin-right:.5rem}.block{display:block}.flex{display:flex}.inline-flex{display:inline-flex}.\\!grid{display:grid!important}.hidden{display:none}.h-\\[calc\\(var\\(--sl-side-w\\)\\)\\]{height:calc(var(--sl-side-w))}.h-\\[var\\(--sl-side-w\\)\\]{height:var(--sl-side-w)}.h-8{height:2rem}.h-\\[18px\\]{height:18px}.h-\\[16px\\]{height:16px}.w-\\[max-content\\]{width:-webkit-max-content;width:-moz-max-content;width:max-content}.w-\\[calc\\(var\\(--sl-side-w\\)-1px\\)\\]{width:calc(var(--sl-side-w) - 1px)}.w-\\[calc\\(var\\(--sl-side-w\\)\\+1px\\)\\]{width:calc(var(--sl-side-w) + 1px)}.w-8{width:2rem}.w-full{width:100%}.w-2{width:.5rem}.rotate-90{--tw-rotate:90deg;transform:var(--tw-transform)}@-webkit-keyframes spin{to{transform:rotate(1turn)}}@keyframes spin{to{transform:rotate(1turn)}}.animate-spin{-webkit-animation:spin 1s linear infinite;animation:spin 1s linear infinite}.cursor-pointer{cursor:pointer}.auto-cols-max{grid-auto-columns:-webkit-max-content;grid-auto-columns:max-content}.grid-flow-col{grid-auto-flow:column}.flex-col{flex-direction:column}.\\!content-center{align-content:center!important}.items-center{align-items:center}.justify-center{justify-content:center}.\\!justify-items-center{justify-items:center!important}.divide-x>:not([hidden])~:not([hidden]){--tw-divide-x-reverse:0;border-left-width:calc(1px*(1 - var(--tw-divide-x-reverse)));border-right-width:calc(1px*var(--tw-divide-x-reverse))}.divide-blue-gray-200>:not([hidden])~:not([hidden]){--tw-divide-opacity:1;border-color:rgba(226,232,240,var(--tw-divide-opacity))}.break-words{overflow-wrap:break-word}.border{border-width:1px}.border-b{border-bottom-width:1px}.border-t{border-top-width:1px}.border-none{border-style:none}.border-blue-gray-200{--tw-border-opacity:1;border-color:rgba(226,232,240,var(--tw-border-opacity))}.border-blue-gray-300{--tw-border-opacity:1;border-color:rgba(203,213,225,var(--tw-border-opacity))}.border-blue-500{--tw-border-opacity:1;border-color:rgba(59,130,246,var(--tw-border-opacity))}.bg-blue-gray-50{--tw-bg-opacity:1;background-color:rgba(248,250,252,var(--tw-bg-opacity))}.bg-transparent{background-color:transparent}.bg-blue-gray-900{--tw-bg-opacity:1;background-color:rgba(15,23,42,var(--tw-bg-opacity))}.bg-blue-500{--tw-bg-opacity:1;background-color:rgba(59,130,246,var(--tw-bg-opacity))}.bg-white{--tw-bg-opacity:1;background-color:rgba(255,255,255,var(--tw-bg-opacity))}.fill-current{fill:currentColor}.p-0{padding:0}.px-3{padding-left:.75rem;padding-right:.75rem}.py-2\\.5{padding-bottom:.625rem;padding-top:.625rem}.py-2{padding-bottom:.5rem;padding-top:.5rem}.px-2\\.5{padding-left:.625rem;padding-right:.625rem}.py-1\\.5{padding-bottom:.375rem;padding-top:.375rem}.px-2{padding-left:.5rem;padding-right:.5rem}.py-1{padding-bottom:.25rem;padding-top:.25rem}.text-center{text-align:center}.text-sm{font-size:.875rem;line-height:1.25rem}.text-xs{font-size:.75rem;line-height:1rem}.font-bold{font-weight:700}.font-medium{font-weight:500}.uppercase{text-transform:uppercase}.leading-none{line-height:1}.text-blue-600{--tw-text-opacity:1;color:rgba(37,99,235,var(--tw-text-opacity))}.text-blue-gray-900{--tw-text-opacity:1;color:rgba(15,23,42,var(--tw-text-opacity))}.text-white{--tw-text-opacity:1;color:rgba(255,255,255,var(--tw-text-opacity))}.text-blue-gray-500{--tw-text-opacity:1;color:rgba(100,116,139,var(--tw-text-opacity))}.text-blue-700{--tw-text-opacity:1;color:rgba(29,78,216,var(--tw-text-opacity))}.text-blue-gray-600{--tw-text-opacity:1;color:rgba(71,85,105,var(--tw-text-opacity))}.text-red-500{--tw-text-opacity:1;color:rgba(239,68,68,var(--tw-text-opacity))}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.06);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.filter{filter:var(--tw-filter)}.hover\\:border-blue-600:hover{--tw-border-opacity:1;border-color:rgba(37,99,235,var(--tw-border-opacity))}.hover\\:border-blue-gray-900:hover{--tw-border-opacity:1;border-color:rgba(15,23,42,var(--tw-border-opacity))}.hover\\:bg-\\[\\#0e1114\\]:hover{--tw-bg-opacity:1;background-color:rgba(14,17,20,var(--tw-bg-opacity))}.hover\\:bg-blue-gray-100:hover{--tw-bg-opacity:1;background-color:rgba(241,245,249,var(--tw-bg-opacity))}.hover\\:bg-blue-600:hover{--tw-bg-opacity:1;background-color:rgba(37,99,235,var(--tw-bg-opacity))}.hover\\:bg-blue-gray-900:hover{--tw-bg-opacity:1;background-color:rgba(15,23,42,var(--tw-bg-opacity))}.hover\\:text-blue-gray-900:hover{--tw-text-opacity:1;color:rgba(15,23,42,var(--tw-text-opacity))}.hover\\:text-blue-gray-50:hover{--tw-text-opacity:1;color:rgba(248,250,252,var(--tw-text-opacity))}@media (min-width:640px){.sm\\:inline-block{display:inline-block}.sm\\:h-10{height:2.5rem}.sm\\:w-10{width:2.5rem}.sm\\:\\!grid-rows-\\[20px\\2c 20px\\]{grid-template-rows:20px 20px!important}.sm\\:px-3\\.5{padding-left:.875rem;padding-right:.875rem}.sm\\:px-3{padding-left:.75rem;padding-right:.75rem}.sm\\:py-1\\.5{padding-bottom:.375rem;padding-top:.375rem}.sm\\:py-1{padding-bottom:.25rem;padding-top:.25rem}.sm\\:text-sm{font-size:.875rem;line-height:1.25rem}}';

export { StreamlineButton as streamline_button };
