import { r as registerInstance, h, i as getElement } from './index-2c4cdcb5.js';
import { s as state, a as capitalizeFirstLetter } from './capitalizeFirstLetter-a06ceb0e.js';
import { g as getMenu } from './getMenu-f47b2d32.js';
import { s as state$1, b as setEntries } from './setSearchPlaceholder-f92c7cd9.js';
import { L as Loader } from './Loader-9d68a3e0.js';

const streamlineEntriesCss = ":host .focus:focus{box-shadow:inset 0 0 0 4px #f8fafc,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-out:focus{box-shadow:0 0 0 2px #f8fafc,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-dark:focus{box-shadow:inset 0 0 0 4px #191e23,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-white:focus{box-shadow:inset 0 0 0 4px #fff,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-white-out:focus{box-shadow:0 0 0 2px #fff,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-in-white-out:focus-within{box-shadow:0 0 0 2px #fff,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-none:focus{box-shadow:none!important;outline:none!important}.inner::-webkit-scrollbar{width:10px}.inner::-webkit-scrollbar-track{background:#fff}.inner::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:0}streamline-button{display:block;height:100%;width:100%}input:checked~.dot{background-color:#fff;transform:translateX(36px)}select{-moz-appearance:none;appearance:none;-webkit-appearance:none;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E\");background-position:right .25rem center;background-repeat:no-repeat;background-size:1.25em 1.25em;border:1px solid #e2e8f0;color:#0f172a;font-family:inter,sans-serif;font-size:.875rem;font-weight:600;height:34px;padding:0 .75rem!important;width:100%}/*! tailwindcss v2.2.17 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{--tw-blur:var(--tw-empty,/*!*/ /*!*/);--tw-brightness:var(--tw-empty,/*!*/ /*!*/);--tw-contrast:var(--tw-empty,/*!*/ /*!*/);--tw-grayscale:var(--tw-empty,/*!*/ /*!*/);--tw-hue-rotate:var(--tw-empty,/*!*/ /*!*/);--tw-invert:var(--tw-empty,/*!*/ /*!*/);--tw-saturate:var(--tw-empty,/*!*/ /*!*/);--tw-sepia:var(--tw-empty,/*!*/ /*!*/);--tw-drop-shadow:var(--tw-empty,/*!*/ /*!*/);--tw-filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);border:0 solid;box-sizing:border-box}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}a{color:inherit;text-decoration:inherit}.visible{visibility:visible}.inline-block{display:inline-block}.h-\\[max-content\\]{height:-webkit-max-content;height:-moz-max-content;height:max-content}.bg-blue-gray-200{--tw-bg-opacity:1;background-color:rgba(226,232,240,var(--tw-bg-opacity))}.px-2\\.5{padding-left:.625rem;padding-right:.625rem}.py-1\\.5{padding-bottom:.375rem;padding-top:.375rem}.px-2{padding-left:.5rem;padding-right:.5rem}.py-1{padding-bottom:.25rem;padding-top:.25rem}.text-blue-gray-500{--tw-text-opacity:1;color:rgba(100,116,139,var(--tw-text-opacity))}.blur{--tw-blur:blur(8px);filter:var(--tw-filter)}/*! tailwindcss v2.2.17 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize *//*! tailwindcss v2.2.17 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */img{border-style:solid;height:auto;max-width:100%}img,svg{display:block;vertical-align:middle}.h-6{height:1.5rem}.h-10{height:2.5rem}.w-6{width:1.5rem}.w-10{width:2.5rem}@-webkit-keyframes spin{to{transform:rotate(1turn)}}@keyframes spin{to{transform:rotate(1turn)}}.animate-spin{-webkit-animation:spin 1s linear infinite;animation:spin 1s linear infinite}@media (min-width:640px){.sm\\:h-7{height:1.75rem}.sm\\:w-7{width:1.75rem}}";

let StreamlineEntries = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.h2 = "text-base text-blue-gray-900 font-medium";
        this.p = "text-blue-gray-600 text-base font-normal";
        this.tag = "px-2.5 py-1.5 bg-blue-gray-200 text-blue-gray-500 inline-block h-[max-content] leading-1";
        this.border = "border-t border-blue-gray-100 first-of-type:border-none";
        // @ts-ignore
        this.gmenu = () => {
            if (state.entriesMenu.length === 0) {
                getMenu({});
            }
        };
        this.getArr = (arr, type) => {
            var _a;
            return ((arr.length >= 1 && arr) ||
                (((_a = state[`entries${capitalizeFirstLetter(type)}Active`]) === null || _a === void 0 ? void 0 : _a.length) >=
                    1 &&
                    (state[`entries${capitalizeFirstLetter(type)}Active`] ||
                        state[`entries${capitalizeFirstLetter(type)}`])));
        };
        this.slash = () => {
            return (h("div", null, StreamlineEntries.getHeader({
                title: "Available commands for current mode",
            }), h("ul", null, Object.values(state.commands.local).map((item) => {
                const isEntry = item.name.includes("[");
                const type = item.name.substring(item.name.indexOf("[") - 1);
                const cmd = isEntry ? item.name.replace(type, "") : item.name;
                return (h("li", { class: `flex flex-col py-3` }, h("h2", { class: `${this.h2} mb-2` }, h("span", null, cmd, isEntry && (h("span", { class: `${this.tag} ml-2` }, type.trim())))), h("p", { class: `${this.p}` }, item.description)));
            }))));
        };
        this.site = () => {
            return Object.values(state.entriesSite).map((item) => {
                return (h("div", null, StreamlineEntries.getHeader(item), h("ul", null, Object.values(item.children).map((itemInner) => {
                    const obj = {
                        siteId: itemInner.siteId,
                        adminUrl: itemInner.adminUrl,
                        path: itemInner.path,
                    };
                    return (h("li", { class: `flex flex-col` }, h("div", { class: `${this.h2} inline-grid grid-flow-col auto-cols-max py-3 items-center` }, h("div", { role: "button", tabIndex: 0, onClick: () => getMenu(obj), onKeyPress: (e) => {
                            if (e.key === "Enter") {
                                getMenu(obj);
                            }
                        }, class: `${this.tag} focus-white-out hover:text-blue-gray-50 hover:bg-blue-gray-900 hover:border-blue-gray-900` }, itemInner.domain), h("p", { class: `${this.p} ml-2` }, h("span", { class: `font-semibold` }, "Path: "), itemInner.path, h("span", { class: `font-semibold` }, " ID: "), itemInner.blog_id))));
                }))));
            });
        };
        // @ts-ignore
        this.fav = () => {
            var _a;
            return (((_a = state.entriesFavActive) === null || _a === void 0 ? void 0 : _a.length) >= 1 &&
                (state.entriesFavActive || state.entriesFav) &&
                Object.values((state.entriesFavActive || state.entriesFav)).map((item) => {
                    return item.type
                        ? this[item.type === "networkMenu" ? "menu" : item.type]([item])
                        : StreamlineEntries.getHeader(item);
                }));
        };
        // @ts-ignore
        this.menu = (arr = []) => {
            return Object.values(this.getArr(arr, "menu")).map((item) => {
                return (h("div", null, StreamlineEntries.getHeader(item), h("ul", null, Object.values(item.children).map((itemInner, indexInner) => {
                    return (h("li", { key: indexInner, class: `${this.border} flex flex-col pb-4 sm:flex-row` }, h("h2", { class: `${this.h2} mt-4 mr-4 leading-1 inline-block break-words sm:min-w-[120px] md:min-w-[200px]` }, itemInner.name), itemInner.children && (h("ul", { class: `flex flex-wrap` }, Object.values(itemInner.children).map((itemSub, indexSub) => {
                        return (h("li", { key: indexSub, class: `mt-4 mr-4` }, h("streamline-button", { type: "menu", adminUrl: item.adminUrl, href: itemSub.href, index: item.index, indexInner: itemInner.index, indexSub: itemSub.index, path: itemSub.path, siteId: itemSub.siteId, text: itemSub.name, typeSub: itemSub.type })));
                    })))));
                }))));
            });
        };
        // @ts-ignore
        this.post = (arr = []) => {
            return Object.values(this.getArr(arr, "post")).map((item) => {
                return (h("div", null, StreamlineEntries.getHeader(item), h("ul", null, Object.values(item.children).map((itemInner) => {
                    return (h("li", { class: `${this.border} flex flex-col pt-4 pb-3` }, h("streamline-post", { "href-edit": itemInner.hrefEdit, "href-view": itemInner.guid, "post-id": itemInner.ID, "post-title": itemInner.post_title, "post-type": itemInner.post_type, "post-slug": itemInner.post_name, "site-id": itemInner.siteId })));
                }))));
            });
        };
        this.settingsOnChange = (id, type, value) => {
            state.entriesSettingsSave = Object.assign(Object.assign({}, state.entriesSettingsSave), {
                [id]: Object.assign(Object.assign({}, state.entriesSettingsSave[id]), {
                    [type]: value,
                }),
            });
        };
        // @ts-ignore
        this.settings = () => {
            return Object.values(state.entriesSettingsActive).map((item) => {
                return (h("div", null, StreamlineEntries.getHeader(item), h("ul", { class: `space-y-4` }, Object.values(item.children).map((itemInner, indexInner) => {
                    return (h("li", { key: indexInner, class: `${indexInner === 0 ? this.border : ""} flex flex-col` }, h("h2", { class: `${this.h2} !text-lg mt-4 space-y-2 mb-6 inline-block leading-1 pb-2 border-b border-blue-gray-200` }, itemInner.name), itemInner.children && (h("ul", { class: `flex flex-col space-y-5` }, Object.values(itemInner.children).map((itemSub, indexSub) => {
                        return (h("li", { key: indexSub, class: `flex items-center mr-4` }, h("label", { htmlFor: `setting-${itemSub.id}`, class: `grid grid-cols-[75px,1fr] gap-6 select-none group ${itemSub.choices ? "" : "cursor-pointer"}` }, h("div", { class: "relative mt-0.5 inline-block h-[max-content] w-[max-content] focus-in-white-out" }, h("input", { type: "checkbox", id: `setting-${itemSub.id}`, class: "sr-only peer", checked: state.entriesSettingsLoad[itemSub.id].default, onInput: (e) => this.settingsOnChange(itemSub.id, "default", e.target.checked) }), h("div", { class: "block bg-blue-gray-300 w-14 h-5 transition ease-in-out duration-200 group-hover:bg-blue-gray-400 peer-checked:bg-blue-500" }), h("div", { class: "dot absolute left-1 top-1 bg-white w-3 h-3 transition ease-in-out duration-200" })), h("div", null, h("div", { class: "text-base text-blue-gray-900 font-medium" }, itemSub.name), h("div", { class: "mt-0.5 text-xs text-blue-gray-500" }, itemSub.label)))));
                    })))));
                }))));
            });
        };
    }
    connectedCallback() {
        if (state$1.active === "menu") {
            this[`g${state$1.active}`]();
        }
        setEntries();
    }
    static getHeader(item) {
        var _a, _b;
        let menuNumber = 0;
        if (item.type === "menu" || item.type === "networkMenu") {
            Object.values(item.children).forEach((itemNested) => {
                Object.values(itemNested.children).forEach(() => {
                    menuNumber++;
                });
            });
        }
        const results = `Showing ${item.type === "post"
            ? Object.values(item.children).length
            : state.isSites
                ? Object.values(item.children).length
                : item.type === "menu" || item.type === "networkMenu"
                    ? menuNumber
                    : "0"} ${(item.type === "post" && Object.values(item.children).length === 1) ||
            (state.isSites && Object.values(item.children).length === 1) ||
            ((item.type === "menu" || item.type === "networkMenu") &&
                menuNumber === 1)
            ? `result`
            : `results`}
    `;
        const path = item.isMultisite && !state.test ? ` (subsite: ${item.path})` : "";
        return (h("div", { class: `pt-5 flex flex-wrap mb-4 pb-1 flex justify-between items-center sticky -top-2 bg-white z-10 border-b border-dotted border-blue-gray-900 sm:pt-6 sm:pb-2 sm:-top-2 lg:pt-8 lg:-top-4` }, h("h1", { class: `text-blue-gray-900 font-medium text-xl mr-6 sm:text-2xl`, innerHTML: `${state.isSlash && !state.isSites
                ? item.title
                : item.type === "networkMenu" ||
                    (state.entriesMenuIsNetwork &&
                        state$1.active === "menu" &&
                        !state.isSites)
                    ? "Network admin"
                    : (state$1.active === "menu" && !state.isSlash) ||
                        item.type === "menu" ||
                        item.type === "networkMenu"
                        ? "Admin menu" + path
                        : (state$1.active === "post" || item.type === "site") &&
                            state$1.active !== "fav" &&
                            ((_a = state[`entries${state$1.active === "post" ? "Post" : "Site"}`][0]) === null || _a === void 0 ? void 0 : _a.queryValue)
                            ? `${state.isSites
                                ? "Site"
                                : capitalizeFirstLetter(state$1.active)}s for: ` +
                                `<span class="text-gray-400 italic">${(_b = state[`entries${state$1.active === "post" ? "Post" : "Site"}`][0]) === null || _b === void 0 ? void 0 : _b.queryValue}</span>` +
                                path
                            : (item.type === "post" || item.type === "site") &&
                                state$1.active === "fav"
                                ? `${capitalizeFirstLetter(item.type)}s` + path
                                : state$1.active === "post" &&
                                    Object.values(state.entriesPostActive[0].children)
                                        .length === 0 &&
                                    !item.queryValue
                                    ? "No query, search for a post in the search bar"
                                    : state$1.active === "settings"
                                        ? "Settings"
                                        : "No results"}` }), h("div", { class: `flex flex-wrap space-x-4 divide-x` }, Object.values([
            {
                type: "text",
                text: results,
                condition: state.isSites ||
                    state$1.active === "post" ||
                    state$1.active === "fav" ||
                    (state$1.active === "menu" && !state.isSlash),
            },
            {
                type: "button",
                text: "Save",
                condition: state$1.active === "settings",
            },
        ]).map((itemInner, itemIndex) => {
            return itemInner.condition && itemInner.type === "text" ? (h("span", { class: `text-sm font-medium text-gray-700 ${itemIndex === 0 ? "" : "pl-4"}` }, itemInner.text)) : (itemInner.condition && itemInner.type === "button" && (h("streamline-button", { class: state.entriesSettingsHaveChanged
                    ? ""
                    : "opacity-25 pointer-events-none", type: "saveSettings", styling: "primary", text: itemInner.text })));
        }))));
    }
    render() {
        return (h("div", { class: `h-full relative` }, state.isLoading ? (h("div", { class: `w-full h-[calc(100%-var(--sl-side-w))] flex items-center justify-center bg-white/50 absolute top-0 left-0 backdrop-blur-sm z-10` }, h(Loader, { sm: false }))) : (h("div", { tabindex: -1, class: `focus-none inner pb-6 relative px-3 h-[calc(100%-var(--sl-side-w))] overflow-y-scroll overflow-x-hidden w-full bg-white sm:px-6 lg:px-8 ${state.isProcessing ? "pointer-events-none opacity-50" : ""}` }, state.isSlash && !state.isSites
            ? this.slash()
            : state.isSites
                ? this.site()
                : this[`${state$1.active}`]()))));
    }
    get el() { return getElement(this); }
};
StreamlineEntries.style = streamlineEntriesCss + '/*! tailwindcss v2.2.17 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{--tw-border-opacity:1;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-backdrop-blur:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-brightness:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-contrast:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-grayscale:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-hue-rotate:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-invert:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-opacity:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-saturate:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-sepia:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);border:0 solid;border-color:rgba(228,228,231,var(--tw-border-opacity));box-sizing:border-box}button,input{color:inherit;font-family:inherit;font-size:100%;line-height:1.15;line-height:inherit;margin:0;padding:0}button{background-color:transparent;background-image:none;text-transform:none}[type=button],button{-webkit-appearance:button}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}h1,h2,p,ul{margin:0}ul{list-style:none;padding:0}input::-moz-placeholder{color:#a1a1aa;opacity:1}input:-ms-input-placeholder{color:#a1a1aa;opacity:1}input::placeholder{color:#a1a1aa;opacity:1}[role=button],button{cursor:pointer}h1,h2{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}.sr-only{clip:rect(0,0,0,0);border-width:0;height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}.pointer-events-none{pointer-events:none}.static{position:static}.absolute{position:absolute}.relative{position:relative}.sticky{position:-webkit-sticky;position:sticky}.-top-2{top:-.5rem}.left-1{left:.25rem}.top-1{top:.25rem}.top-0{top:0}.left-0{left:0}.z-10{z-index:10}.mb-4{margin-bottom:1rem}.mr-6{margin-right:1.5rem}.mb-2{margin-bottom:.5rem}.ml-2{margin-left:.5rem}.mt-4{margin-top:1rem}.mr-4{margin-right:1rem}.mb-6{margin-bottom:1.5rem}.mt-0\\.5{margin-top:.125rem}.mt-0{margin-top:0}.block{display:block}.inline-block{display:inline-block}.flex{display:flex}.grid{display:grid}.inline-grid{display:inline-grid}.h-\\[max-content\\]{height:-webkit-max-content;height:-moz-max-content;height:max-content}.h-5{height:1.25rem}.h-3{height:.75rem}.h-full{height:100%}.h-\\[calc\\(100\\%-var\\(--sl-side-w\\)\\)\\]{height:calc(100% - var(--sl-side-w))}.w-\\[max-content\\]{width:-webkit-max-content;width:-moz-max-content;width:max-content}.w-14{width:3.5rem}.w-3{width:.75rem}.w-full{width:100%}.cursor-pointer{cursor:pointer}.select-none{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.auto-cols-max{grid-auto-columns:-webkit-max-content;grid-auto-columns:max-content}.grid-flow-col{grid-auto-flow:column}.grid-cols-\\[75px\\2c 1fr\\]{grid-template-columns:75px 1fr}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-center{align-items:center}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-6{gap:1.5rem}.space-x-4>:not([hidden])~:not([hidden]){--tw-space-x-reverse:0;margin-left:calc(1rem*(1 - var(--tw-space-x-reverse)));margin-right:calc(1rem*var(--tw-space-x-reverse))}.space-y-4>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-bottom:calc(1rem*var(--tw-space-y-reverse));margin-top:calc(1rem*(1 - var(--tw-space-y-reverse)))}.space-y-2>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-bottom:calc(.5rem*var(--tw-space-y-reverse));margin-top:calc(.5rem*(1 - var(--tw-space-y-reverse)))}.space-y-5>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-bottom:calc(1.25rem*var(--tw-space-y-reverse));margin-top:calc(1.25rem*(1 - var(--tw-space-y-reverse)))}.divide-x>:not([hidden])~:not([hidden]){--tw-divide-x-reverse:0;border-left-width:calc(1px*(1 - var(--tw-divide-x-reverse)));border-right-width:calc(1px*var(--tw-divide-x-reverse))}.overflow-x-hidden{overflow-x:hidden}.overflow-y-scroll{overflow-y:scroll}.break-words{overflow-wrap:break-word}.border{border-width:1px}.border-t{border-top-width:1px}.border-b{border-bottom-width:1px}.border-dotted{border-style:dotted}.border-blue-gray-100{--tw-border-opacity:1;border-color:rgba(241,245,249,var(--tw-border-opacity))}.border-blue-gray-900{--tw-border-opacity:1;border-color:rgba(15,23,42,var(--tw-border-opacity))}.border-blue-gray-200{--tw-border-opacity:1;border-color:rgba(226,232,240,var(--tw-border-opacity))}.bg-blue-gray-200{--tw-bg-opacity:1;background-color:rgba(226,232,240,var(--tw-bg-opacity))}.bg-white{--tw-bg-opacity:1;background-color:rgba(255,255,255,var(--tw-bg-opacity))}.bg-blue-gray-300{--tw-bg-opacity:1;background-color:rgba(203,213,225,var(--tw-bg-opacity))}.bg-white\\/50{background-color:hsla(0,0%,100%,.5)}.px-2\\.5{padding-left:.625rem;padding-right:.625rem}.py-1\\.5{padding-bottom:.375rem;padding-top:.375rem}.px-2{padding-left:.5rem;padding-right:.5rem}.py-1{padding-bottom:.25rem;padding-top:.25rem}.py-3{padding-bottom:.75rem;padding-top:.75rem}.px-3{padding-left:.75rem;padding-right:.75rem}.pt-5{padding-top:1.25rem}.pb-1{padding-bottom:.25rem}.pl-4{padding-left:1rem}.pb-4{padding-bottom:1rem}.pt-4{padding-top:1rem}.pb-3{padding-bottom:.75rem}.pb-2{padding-bottom:.5rem}.pb-6{padding-bottom:1.5rem}.text-base{font-size:1rem;line-height:1.5rem}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-sm{font-size:.875rem;line-height:1.25rem}.\\!text-lg{font-size:1.125rem!important;line-height:1.75rem!important}.text-xs{font-size:.75rem;line-height:1rem}.font-medium{font-weight:500}.font-normal{font-weight:400}.font-semibold{font-weight:600}.italic{font-style:italic}.text-blue-gray-900{--tw-text-opacity:1;color:rgba(15,23,42,var(--tw-text-opacity))}.text-blue-gray-600{--tw-text-opacity:1;color:rgba(71,85,105,var(--tw-text-opacity))}.text-blue-gray-500{--tw-text-opacity:1;color:rgba(100,116,139,var(--tw-text-opacity))}.text-gray-400{--tw-text-opacity:1;color:rgba(161,161,170,var(--tw-text-opacity))}.text-gray-700{--tw-text-opacity:1;color:rgba(63,63,70,var(--tw-text-opacity))}.opacity-25{opacity:.25}.opacity-50{opacity:.5}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.06);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.backdrop-blur-sm{--tw-backdrop-blur:blur(4px);-webkit-backdrop-filter:var(--tw-backdrop-filter);backdrop-filter:var(--tw-backdrop-filter)}.transition{transition-duration:.15s;transition-property:background-color,border-color,color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;transition-property:background-color,border-color,color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:background-color,border-color,color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1)}.duration-200{transition-duration:.2s}.ease-in-out{transition-timing-function:cubic-bezier(.4,0,.2,1)}.first-of-type\\:border-none:first-of-type{border-style:none}.hover\\:border-blue-gray-900:hover{--tw-border-opacity:1;border-color:rgba(15,23,42,var(--tw-border-opacity))}.hover\\:bg-blue-gray-900:hover{--tw-bg-opacity:1;background-color:rgba(15,23,42,var(--tw-bg-opacity))}.hover\\:text-blue-gray-50:hover{--tw-text-opacity:1;color:rgba(248,250,252,var(--tw-text-opacity))}.group:hover .group-hover\\:bg-blue-gray-400{--tw-bg-opacity:1;background-color:rgba(148,163,184,var(--tw-bg-opacity))}.peer:checked~.peer-checked\\:bg-blue-500{--tw-bg-opacity:1;background-color:rgba(59,130,246,var(--tw-bg-opacity))}@media (min-width:640px){.sm\\:-top-2{top:-.5rem}.sm\\:min-w-\\[120px\\]{min-width:120px}.sm\\:flex-row{flex-direction:row}.sm\\:px-6{padding-left:1.5rem;padding-right:1.5rem}.sm\\:pt-6{padding-top:1.5rem}.sm\\:pb-2{padding-bottom:.5rem}.sm\\:text-2xl{font-size:1.5rem;line-height:2rem}}@media (min-width:768px){.md\\:min-w-\\[200px\\]{min-width:200px}}@media (min-width:1024px){.lg\\:-top-4{top:-1rem}.lg\\:px-8{padding-left:2rem;padding-right:2rem}.lg\\:pt-8{padding-top:2rem}}';

export { StreamlineEntries as streamline_entries };
