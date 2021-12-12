import { r as registerInstance, h, g as getElement } from './index-ac9abc62.js';
import { s as state } from './internal-d7978ed0.js';
import { s as state$1, c as capitalizeFirstLetter, a as setEntries } from './setSearchPlaceholder-25f695c9.js';
import { L as Loader } from './Loader-a8b47d31.js';
import { I as IconCheck, a as IconMenu, b as IconNetwork, c as IconPost, f as fetchAjax } from './fetchAjax-7c3eab78.js';
import { a as getMenu, g as getMenus } from './getMenus-04f5d870.js';
import { g as getMetaKey } from './getMetaKey-c4b19d04.js';

const streamlineEntriesCss = ":host{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;box-sizing:border-box}:host .focus:focus{box-shadow:inset 0 0 0 4px #f1f5f9,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-border:focus{border-color:var(--sl-focus-color);box-shadow:0 0 0 1px var(--sl-focus-color);outline:none!important}:host .focus-out:focus{box-shadow:0 0 0 2px #f8fafc,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-dark:focus{box-shadow:inset 0 0 0 4px #0f172a,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-darker:focus{box-shadow:inset 0 0 0 4px #020204,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-white:focus{box-shadow:inset 0 0 0 4px #fff,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-white-out:focus{box-shadow:0 0 0 2px #fff,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-in-white-out:focus-within{box-shadow:0 0 0 2px #fff,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-none:focus{box-shadow:none!important;outline:none!important}:host .border-invalid{border-color:var(--sl-focus-color-invalid);box-shadow:0 0 0 1px var(--sl-focus-color-invalid);outline:none!important}:host *{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.inner::-webkit-scrollbar{width:8px}.inner::-webkit-scrollbar-track{background:#fff}.inner::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:0}streamline-button{display:block;height:100%;width:100%}input:checked~.dot{background-color:#fff;transform:translateX(36px)}select{-moz-appearance:none;appearance:none;-webkit-appearance:none;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E\");background-position:right .25rem center;background-repeat:no-repeat;background-size:1.25em 1.25em;border:1px solid #e2e8f0;color:#0f172a;font-family:inter,sans-serif;font-size:.875rem;font-weight:600;height:34px;padding:0 .75rem!important;width:100%}/*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{--tw-blur:var(--tw-empty,/*!*/ /*!*/);--tw-brightness:var(--tw-empty,/*!*/ /*!*/);--tw-contrast:var(--tw-empty,/*!*/ /*!*/);--tw-grayscale:var(--tw-empty,/*!*/ /*!*/);--tw-hue-rotate:var(--tw-empty,/*!*/ /*!*/);--tw-invert:var(--tw-empty,/*!*/ /*!*/);--tw-saturate:var(--tw-empty,/*!*/ /*!*/);--tw-sepia:var(--tw-empty,/*!*/ /*!*/);--tw-drop-shadow:var(--tw-empty,/*!*/ /*!*/);--tw-filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);border:0 solid;box-sizing:border-box}strong{font-weight:bolder}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}p{margin:0}a{color:inherit;text-decoration:inherit}.visible{visibility:visible}.inline-block{display:inline-block}.h-\\[max-content\\]{height:-webkit-max-content;height:-moz-max-content;height:max-content}.bg-blue-gray-200{--tw-bg-opacity:1;background-color:rgba(226,232,240,var(--tw-bg-opacity))}.px-2\\.5{padding-left:10px;padding-right:10px}.py-1\\.5{padding-bottom:6px;padding-top:6px}.px-2{padding-left:8px;padding-right:8px}.py-1{padding-bottom:4px;padding-top:4px}.text-blue-gray-500{--tw-text-opacity:1;color:rgba(100,116,139,var(--tw-text-opacity))}.blur{--tw-blur:blur(8px);filter:var(--tw-filter)}/*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize *//*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */img{border-style:solid;height:auto;max-width:100%}img,svg{display:block;vertical-align:middle}.h-6{height:24px}.h-10{height:40px}.w-6{width:24px}.w-10{width:40px}@-webkit-keyframes spin{to{transform:rotate(1turn)}}@keyframes spin{to{transform:rotate(1turn)}}.animate-spin{-webkit-animation:spin 1s linear infinite;animation:spin 1s linear infinite}@media (min-width:640px){.sm\\:h-7{height:28px}.sm\\:w-7{width:28px}}";

let StreamlineEntries = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.border = "border-t border-blue-gray-100 first-of-type:border-none";
        this.h2 = "text-base text-blue-gray-900 font-medium";
        this.p = "text-blue-gray-600 text-base font-normal";
        this.px = "px-6 lg:px-8";
        this.tag = "px-2.5 py-1.5 bg-blue-gray-200 text-blue-gray-500 inline-block h-[max-content] leading-1";
        // @ts-ignore
        this.tw = "h-[16px]";
        this.cycleEntries = (mode) => {
            var _a, _b, _c, _d;
            const focusEls = this.el.shadowRoot.querySelectorAll("[data-focus]");
            const focusElsLength = focusEls.length;
            if (mode === "down") {
                state.focusIndex++;
                if (state.focusIndex === focusElsLength) {
                    state.focusIndex = 0;
                }
            }
            else {
                if (state.focusIndex === 0 || state.focusIndex === -1) {
                    state.focusIndex = focusElsLength - 1;
                }
                else {
                    state.focusIndex--;
                }
            }
            if (state$1.active === "site" || state$1.active === "settings") {
                (_a = focusEls[state.focusIndex]) === null || _a === void 0 ? void 0 : _a.focus();
            }
            if (state$1.active === "fav" ||
                state$1.active === "menu" ||
                state$1.active === "network") {
                (_b = focusEls[state.focusIndex]) === null || _b === void 0 ? void 0 : _b.shadowRoot.querySelector("a").focus();
            }
            if (state$1.active === "post") {
                (_d = (_c = focusEls[state.focusIndex]) === null || _c === void 0 ? void 0 : _c.shadowRoot.querySelector("a[data-type=\"view\"]")) === null || _d === void 0 ? void 0 : _d.focus();
            }
        };
        this.getArr = (arr = [], type) => {
            var _a;
            return ((arr.length >= 1 && arr) ||
                (((_a = state[`entries${capitalizeFirstLetter(type)}Active`]) === null || _a === void 0 ? void 0 : _a.length) >=
                    1 &&
                    (state[`entries${capitalizeFirstLetter(type)}Active`] ||
                        state[`entries${capitalizeFirstLetter(type)}`])));
        };
        this.help = () => {
            return (h("div", null, StreamlineEntries.getHeader({
                title: `${state.menu[state$1.active].text} mode help`,
            }), h("div", { class: `mt-6 text-base space-y-2 leading-relaxed md:w-3/4`, innerHTML: state.menu[state$1.active].help })));
        };
        this.slash = () => {
            /*
            return (
              <div>
                {StreamlineEntries.getHeader({
                  title: 'Available commands for current mode',
                })}
                <ul>
                  {Object.values(stateInternal.commands.local).map((item) => {
                    const isEntry = item.name.includes('[');
                    const type = item.name.substring(item.name.indexOf('[') - 1);
                    const cmd = isEntry ? item.name.replace(type, '') : item.name;
        
                    return (
                      stateInternal.menu[stateLocal.active].commands.includes(
                        item.name
                      ) && (
                        <li class={`flex flex-col py-3`}>
                          <h2 class={`${this.h2} mb-2`}>
                            <span>
                              {cmd}
                              {isEntry && (
                                <span class={`${this.tag} ml-2`}>{type.trim()}</span>
                              )}
                            </span>
                          </h2>
                          <p class={`${this.p}`}>{item.description}</p>
                        </li>
                      )
                    );
                  })}
                </ul>
              </div>
            );
             */
        };
        // @ts-ignore
        this.site = (arr = []) => {
            function selectSite(obj) {
                state.currentSite = {
                    path: obj.path,
                    id: obj.siteId,
                };
                state.entriesPost = [];
                state.entriesPostActive = [];
                getMenu({
                    adminUrl: obj.adminUrl,
                    fetch: true,
                    siteId: obj.siteId,
                    path: obj.path,
                });
            }
            return Object.values(this.getArr(arr, "site")).map((item) => {
                return (h("div", null, StreamlineEntries.getHeader(item), h("ul", null, Object.values(item.children).map((itemInner) => {
                    const obj = {
                        siteId: itemInner.siteId,
                        adminUrl: itemInner.adminUrl,
                        path: itemInner.path,
                    };
                    return (h("li", { class: `flex flex-col` }, h("div", { class: `${this.h2} relative flex flex-wrap py-3 items-center` }, parseInt(itemInner.siteId) ===
                        parseInt(state.currentSite.id) && (h("span", { class: `text-green-600 w-3 inline-block mr-4 absolute left-[-18px] lg:w-4 lg:-left-6` }, h(IconCheck, null))), h("div", { "data-focus": true, role: "button", tabIndex: 0, onClick: () => selectSite(obj), onKeyPress: (e) => {
                            if (e.key === "Enter") {
                                selectSite(obj);
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
            return Object.values(this.getArr(arr, state$1.active)).map((item) => {
                return (h("div", null, StreamlineEntries.getHeader(item), h("ul", { "data-focus-parent": true }, Object.values(item.children).map((itemInner, indexInner) => {
                    return (h("li", { key: indexInner, class: `${this.border} flex flex-col pb-4 sm:flex-row` }, h("h2", { class: `${this.h2} mt-4 mr-4 leading-1 inline-block break-words sm:min-w-[120px] md:min-w-[200px]` }, itemInner.name), itemInner.children && (h("ul", { class: `flex flex-wrap` }, Object.values(itemInner.children).map((itemSub, indexSub) => {
                        return (h("li", { key: indexSub, class: `mt-4 mr-4` }, h("streamline-button", { "data-focus": true, type: "menu", adminUrl: item.adminUrl, href: itemSub.href, index: item.index, indexInner: itemInner.index, indexSub: itemSub.index, path: itemSub.path, siteId: itemSub.siteId, text: itemSub.name, typeSub: itemSub.type })));
                    })))));
                }))));
            });
        };
        // @ts-ignore
        this.post = (arr = []) => {
            return Object.values(this.getArr(arr, "post")).map((item) => {
                return (h("div", null, StreamlineEntries.getHeader(item), h("ul", null, Object.values(item.children).map((itemInner) => {
                    return (h("li", { class: `${this.border} flex flex-col py-3` }, h("streamline-post", { "data-focus": true, "href-edit": itemInner.hrefEdit, "href-view": itemInner.guid, "post-id": itemInner.ID, "post-title": itemInner.post_title, "post-type": itemInner.post_type, "post-slug": itemInner.post_name, "site-id": itemInner.siteId })));
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
            const Key = (props) => (h("div", { style: { boxShadow: "0 3px 0 0 #E2E8F0" }, class: `px-2 leading-0 py-0.5 text-xs uppercase font-medium text-blue-gray-800 border bg-blue-gray-50 border-blue-gray-200` }, props.key));
            return Object.values(state.entriesSettingsActive).map((item) => {
                return (h("div", null, StreamlineEntries.getHeader(item), h("ul", { class: `space-y-4` }, Object.values(item.children).map((itemInner, indexInner) => {
                    return (h("li", { key: indexInner, class: `${indexInner === 0 ? this.border : ""} flex flex-col` }, h("h2", { class: `${this.h2} !text-lg mt-4 space-y-2 mb-6 inline-block leading-1 pb-2 border-b border-blue-gray-200` }, itemInner.name), itemInner.children && (h("ul", { class: `flex flex-col space-y-5` }, Object.values(itemInner.children).map((itemSub, indexSub) => {
                        return (h("li", { key: indexSub, class: `flex items-center mr-4` }, h("label", { htmlFor: `setting-${itemSub.id}`, class: `w-full grid grid-cols-[75px,1fr] gap-6 select-none group ${itemSub.choices ? "" : "cursor-pointer"}` }, h("div", { class: `relative mt-0.5 inline-block h-[max-content] w-[max-content] focus-in-white-out` }, h("input", { "data-focus": true, type: "checkbox", id: `setting-${itemSub.id}`, class: "sr-only peer", checked: state.entriesSettingsLoad[itemSub.id].default, onInput: (e) => this.settingsOnChange(itemSub.id, "default", e.target.checked) }), h("div", { class: `block bg-blue-gray-300 w-14 h-5 transition ease-in-out duration-200 group-hover:bg-blue-gray-400 peer-checked:bg-blue-500` }), h("div", { class: `dot absolute left-1 top-1 bg-white w-3 h-3 transition ease-in-out duration-200` })), h("div", { class: `w-full` }, h("div", { class: `text-base text-blue-gray-900 font-medium flex justify-between` }, itemSub.name, itemSub.keys && (h("div", { class: `hidden space-x-2 mt-[-6px] md:flex ${state.entriesSettingsLoad[itemSub.id].default
                                ? ""
                                : "opacity-50"}` }, itemSub.metaKey && (h(Key, { key: state.isMac
                                ? "cmd"
                                : "ctrl" })), itemSub.keys.map((item) => {
                            return h(Key, { key: item });
                        })))), h("div", { class: `mt-0.5 text-xs text-blue-gray-500` }, itemSub.label)))));
                    })))));
                }))));
            });
        };
    }
    connectedCallback() {
        getMenus();
        setEntries();
        document.addEventListener("keydown", (e) => {
            if (state.visible) {
                if (e.key === "ArrowDown" &&
                    !getMetaKey(e) &&
                    state.entriesSettingsLoad.keyNavigation.default) {
                    e.preventDefault();
                    this.cycleEntries("down");
                }
                if (e.key === "ArrowUp" &&
                    !getMetaKey(e) &&
                    state.entriesSettingsLoad.keyNavigation.default) {
                    e.preventDefault();
                    this.cycleEntries("up");
                }
            }
        });
    }
    static getHeader(item) {
        var _a, _b;
        const isQuery = item.type === "post" || item.type === "site";
        const isMenu = item.type === "menu" || item.type === "networkMenu";
        const isDotMenu = state.isHelp;
        const isNotDotMenu = !state.isHelp;
        let menuNumber = 0;
        if (isMenu) {
            Object.values(item.children).forEach((itemNested) => {
                Object.values(itemNested.children).forEach(() => {
                    menuNumber++;
                });
            });
        }
        const results = `Showing ${isQuery ? Object.values(item.children).length : isMenu ? menuNumber : "0"} ${(isQuery && Object.values(item.children).length === 1) ||
            (isMenu && menuNumber === 1)
            ? `result`
            : `results`}`;
        const path = item.isMultisite && !state.test && state$1.active !== "site"
            ? ` (subsite: ${item.path})`
            : "";
        return (h("div", { class: `${state$1.active === "settings"
                ? "flex-row items-center justify-between"
                : "flex-col items-start sm:justify-between"} relative min-h-[60px] pt-5 flex flex-wrap mb-1 pb-1.5 flex sticky -top-2 bg-white z-10 border-b border-blue-gray-300 sm:min-h-[75px] sm:mb-4 sm:flex-row sm:items-center sm:pt-6 sm:pb-2 sm:-top-2 lg:pt-7 lg:-top-3` }, h("div", { class: `absolute -left-full top-0 w-[9999px] h-full bg-white z-[-1]` }), h("div", { class: `flex items-center flex-row` }, state$1.active === "fav" &&
            state.entriesFavActive[0].children.length !== 0 &&
            !state.isHelp && (h("div", { class: `flex-shrink-0 text-blue-gray-400 flex items-center justify-center mr-3` }, item.type === "menu" && h(IconMenu, null), item.type === "networkMenu" && h(IconNetwork, null), item.type === "post" && h(IconPost, null))), h("h1", { class: `text-blue-gray-900 font-medium text-xl mr-6`, innerHTML: `${state.isSlash || isDotMenu
                ? item.title
                : item.type === "networkMenu"
                    ? "Network admin"
                    : isMenu
                        ? "Admin menu" + path
                        : (state$1.active === "post" ||
                            state$1.active === "site") &&
                            ((_a = state[`entries${state$1.active === "post" ? "Post" : "Site"}`][0]) === null || _a === void 0 ? void 0 : _a.queryValue)
                            ? `${capitalizeFirstLetter(state$1.active)}s for: ` +
                                `<span class="text-blue-gray-400 italic">${(_b = state[`entries${state$1.active === "post" ? "Post" : "Site"}`][0]) === null || _b === void 0 ? void 0 : _b.queryValue}</span>` +
                                path
                            : isQuery && state$1.active === "fav"
                                ? `${capitalizeFirstLetter(item.type)}s` + path
                                : (state$1.active === "post" ||
                                    state$1.active === "site") &&
                                    Object.values(state[`entries${capitalizeFirstLetter(state$1.active)}Active`][0].children).length === 0 &&
                                    !item.queryValue
                                    ? `No query, search for a ${state$1.active} in the search bar`
                                    : state$1.active === "settings"
                                        ? "Settings"
                                        : "No results"}` })), h("div", { class: `flex flex-wrap space-x-4 divide-x` }, Object.values([
            {
                type: "text",
                text: results,
                condition: state$1.active !== "settings" && isNotDotMenu,
            },
            {
                type: "button",
                text: "Save",
                condition: state$1.active === "settings" && isNotDotMenu,
                onClick: () => {
                    if (!state.test) {
                        fetchAjax({
                            type: "settings",
                            query: state.entriesSettingsSave,
                            callback: () => {
                                // @ts-ignore
                                state.entriesSettingsLoad =
                                    state.entriesSettingsSave;
                            },
                        });
                    }
                    else {
                        // @ts-ignore
                        state.entriesSettingsLoad =
                            state.entriesSettingsSave;
                    }
                },
            },
        ]).map((itemInner, itemIndex) => {
            return itemInner.condition && itemInner.type === "text" ? (h("span", { class: `results-amount text-xs mt-1.5 sm:my-1.5 font-medium text-blue-gray-700 sm:text-sm ${itemIndex === 0 ? "" : "pl-4"}` }, itemInner.text)) : (itemInner.condition && itemInner.type === "button" && (h("streamline-button", { onClick: state.entriesSettingsHaveChanged &&
                    itemInner.onClick, tabindex: state.entriesSettingsHaveChanged ? 0 : -1, invalid: !state.entriesSettingsHaveChanged, type: "button", styling: "primary", text: itemInner.text })));
        }))));
    }
    render() {
        const isMultisite = (state.data.network &&
            !state.test &&
            !state.isLoading) ||
            state.testFull;
        return (h("div", { class: `${isMultisite
                ? "h-[calc(100%-24px)] lg:h-[calc(100%+56px)]"
                : "h-full lg:h-[calc(100%+80px)]"} relative` }, state.isLoading ? (h("div", { class: `w-full h-[calc(100%-var(--sl-side-w))] flex items-center justify-center bg-white/50 absolute top-0 left-0 backdrop-blur-sm z-10` }, h(Loader, { sm: false }))) : (h("div", { tabindex: -1, class: `${this.px} focus-none inner pb-6 relative h-[calc(100%-var(--sl-side-w))] overflow-y-scroll overflow-x-hidden w-full bg-white lg:pb-10 ${state.isProcessing ? "pointer-events-none opacity-50" : ""}` }, state.isSlash
            ? this.slash()
            : state.isHelp
                ? this.help()
                : state$1.active === "network"
                    ? this.menu()
                    : this[`${state$1.active}`]())), isMultisite && (h("div", { class: `mt-auto px-3 h-6 bg-blue-gray-50 border-t border-blue-gray-200 flex items-center text-blue-gray-900` }, h("span", { class: `flex whitespace-no-wrap` }, h("span", { class: `text-[11px]` }, h("span", { class: `font-semibold` }, "Current site:"), " ", state.currentSite.path, " \u2219", " ", h("span", { class: `font-semibold` }, "ID:"), state.currentSite.id))))));
    }
    get el() { return getElement(this); }
};
StreamlineEntries.style = streamlineEntriesCss + '/*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{--tw-border-opacity:1;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-backdrop-blur:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-brightness:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-contrast:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-grayscale:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-hue-rotate:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-invert:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-opacity:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-saturate:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-sepia:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);border:0 solid;border-color:rgba(228,228,231,var(--tw-border-opacity));box-sizing:border-box}button,input{color:inherit;font-family:inherit;font-size:100%;line-height:1.15;line-height:inherit;margin:0;padding:0}button{background-color:transparent;background-image:none;text-transform:none}[type=button],button{-webkit-appearance:button}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}h1,h2,p,ul{margin:0}ul{list-style:none;padding:0}input::-moz-placeholder{color:#a1a1aa;opacity:1}input:-ms-input-placeholder{color:#a1a1aa;opacity:1}input::placeholder{color:#a1a1aa;opacity:1}[role=button],button{cursor:pointer}h1,h2{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}[hidden]{display:none}.sr-only{clip:rect(0,0,0,0);border-width:0;height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}.pointer-events-none{pointer-events:none}.visible{visibility:visible}.static{position:static}.absolute{position:absolute}.relative{position:relative}.sticky{position:-webkit-sticky;position:sticky}.-top-2{top:-8px}.-left-full{left:-100%}.top-0{top:0}.left-\\[-18px\\]{left:-18px}.left-1{left:4px}.top-1{top:4px}.left-0{left:0}.z-10{z-index:10}.z-\\[-1\\]{z-index:-1}.mb-1{margin-bottom:4px}.mr-3{margin-right:12px}.mr-6{margin-right:24px}.mt-1\\.5{margin-top:6px}.mt-1{margin-top:4px}.mt-6{margin-top:24px}.mb-2{margin-bottom:8px}.ml-2{margin-left:8px}.mr-4{margin-right:16px}.mt-4{margin-top:16px}.mb-6{margin-bottom:24px}.mt-0\\.5{margin-top:2px}.mt-0{margin-top:0}.mt-\\[-6px\\]{margin-top:-6px}.mt-auto{margin-top:auto}.block{display:block}.inline-block{display:inline-block}.flex{display:flex}.grid{display:grid}.hidden{display:none}.h-\\[max-content\\]{height:-webkit-max-content;height:-moz-max-content;height:max-content}.h-\\[16px\\]{height:16px}.h-full{height:100%}.h-5{height:20px}.h-3{height:12px}.h-\\[calc\\(100\\%-24px\\)\\]{height:calc(100% - 24px)}.h-\\[calc\\(100\\%-var\\(--sl-side-w\\)\\)\\]{height:calc(100% - var(--sl-side-w))}.h-6{height:24px}.min-h-\\[60px\\]{min-height:60px}.w-\\[9999px\\]{width:9999px}.w-3{width:12px}.w-full{width:100%}.w-\\[max-content\\]{width:-webkit-max-content;width:-moz-max-content;width:max-content}.w-14{width:56px}.flex-shrink-0{flex-shrink:0}.cursor-pointer{cursor:pointer}.select-none{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.grid-cols-\\[75px\\2c 1fr\\]{grid-template-columns:75px 1fr}.flex-row{flex-direction:row}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-start{align-items:flex-start}.items-center{align-items:center}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-6{gap:24px}.space-x-4>:not([hidden])~:not([hidden]){--tw-space-x-reverse:0;margin-left:calc(16px*(1 - var(--tw-space-x-reverse)));margin-right:calc(16px*var(--tw-space-x-reverse))}.space-y-2>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-bottom:calc(8px*var(--tw-space-y-reverse));margin-top:calc(8px*(1 - var(--tw-space-y-reverse)))}.space-y-4>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-bottom:calc(16px*var(--tw-space-y-reverse));margin-top:calc(16px*(1 - var(--tw-space-y-reverse)))}.space-y-5>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-bottom:calc(20px*var(--tw-space-y-reverse));margin-top:calc(20px*(1 - var(--tw-space-y-reverse)))}.space-x-2>:not([hidden])~:not([hidden]){--tw-space-x-reverse:0;margin-left:calc(8px*(1 - var(--tw-space-x-reverse)));margin-right:calc(8px*var(--tw-space-x-reverse))}.divide-x>:not([hidden])~:not([hidden]){--tw-divide-x-reverse:0;border-left-width:calc(1px*(1 - var(--tw-divide-x-reverse)));border-right-width:calc(1px*var(--tw-divide-x-reverse))}.overflow-x-hidden{overflow-x:hidden}.overflow-y-scroll{overflow-y:scroll}.break-words{overflow-wrap:break-word}.border{border-width:1px}.border-t{border-top-width:1px}.border-b{border-bottom-width:1px}.border-blue-gray-100{--tw-border-opacity:1;border-color:rgba(241,245,249,var(--tw-border-opacity))}.border-blue-gray-300{--tw-border-opacity:1;border-color:rgba(203,213,225,var(--tw-border-opacity))}.border-blue-gray-200{--tw-border-opacity:1;border-color:rgba(226,232,240,var(--tw-border-opacity))}.bg-blue-gray-200{--tw-bg-opacity:1;background-color:rgba(226,232,240,var(--tw-bg-opacity))}.bg-white{--tw-bg-opacity:1;background-color:rgba(255,255,255,var(--tw-bg-opacity))}.bg-blue-gray-50{--tw-bg-opacity:1;background-color:rgba(248,250,252,var(--tw-bg-opacity))}.bg-blue-gray-300{--tw-bg-opacity:1;background-color:rgba(203,213,225,var(--tw-bg-opacity))}.bg-white\\/50{background-color:hsla(0,0%,100%,.5)}.px-6{padding-left:24px;padding-right:24px}.px-2\\.5{padding-left:10px;padding-right:10px}.py-1\\.5{padding-bottom:6px;padding-top:6px}.px-2{padding-left:8px;padding-right:8px}.py-1{padding-bottom:4px;padding-top:4px}.py-3{padding-bottom:12px;padding-top:12px}.py-0\\.5{padding-bottom:2px;padding-top:2px}.py-0{padding-bottom:0;padding-top:0}.px-3{padding-left:12px;padding-right:12px}.pt-5{padding-top:20px}.pb-1\\.5{padding-bottom:6px}.pb-1{padding-bottom:4px}.pl-4{padding-left:16px}.pb-4{padding-bottom:16px}.pb-2{padding-bottom:8px}.pb-6{padding-bottom:24px}.text-base{font-size:16px}.text-xl{font-size:20px}.text-xs{font-size:12px}.\\!text-lg{font-size:18px!important}.text-\\[11px\\]{font-size:11px}.font-medium{font-weight:500}.font-normal{font-weight:400}.font-semibold{font-weight:600}.uppercase{text-transform:uppercase}.italic{font-style:italic}.leading-relaxed{line-height:1.625}.text-blue-gray-900{--tw-text-opacity:1;color:rgba(15,23,42,var(--tw-text-opacity))}.text-blue-gray-600{--tw-text-opacity:1;color:rgba(71,85,105,var(--tw-text-opacity))}.text-blue-gray-500{--tw-text-opacity:1;color:rgba(100,116,139,var(--tw-text-opacity))}.text-blue-gray-400{--tw-text-opacity:1;color:rgba(148,163,184,var(--tw-text-opacity))}.text-blue-gray-700{--tw-text-opacity:1;color:rgba(51,65,85,var(--tw-text-opacity))}.text-green-600{--tw-text-opacity:1;color:rgba(22,163,74,var(--tw-text-opacity))}.text-blue-gray-800{--tw-text-opacity:1;color:rgba(30,41,59,var(--tw-text-opacity))}.opacity-50{opacity:.5}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.backdrop-blur-sm{--tw-backdrop-blur:blur(4px);-webkit-backdrop-filter:var(--tw-backdrop-filter);backdrop-filter:var(--tw-backdrop-filter)}.transition{transition-duration:.15s;transition-property:background-color,border-color,color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;transition-property:background-color,border-color,color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:background-color,border-color,color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1)}.duration-200{transition-duration:.2s}.ease-in-out{transition-timing-function:cubic-bezier(.4,0,.2,1)}.first-of-type\\:border-none:first-of-type{border-style:none}.hover\\:border-blue-gray-900:hover{--tw-border-opacity:1;border-color:rgba(15,23,42,var(--tw-border-opacity))}.hover\\:bg-blue-gray-900:hover{--tw-bg-opacity:1;background-color:rgba(15,23,42,var(--tw-bg-opacity))}.hover\\:text-blue-gray-50:hover{--tw-text-opacity:1;color:rgba(248,250,252,var(--tw-text-opacity))}.group:hover .group-hover\\:bg-blue-gray-400{--tw-bg-opacity:1;background-color:rgba(148,163,184,var(--tw-bg-opacity))}.peer:checked~.peer-checked\\:bg-blue-500{--tw-bg-opacity:1;background-color:rgba(59,130,246,var(--tw-bg-opacity))}@media (min-width:640px){.sm\\:-top-2{top:-8px}.sm\\:my-1\\.5{margin-bottom:6px;margin-top:6px}.sm\\:my-1{margin-bottom:4px;margin-top:4px}.sm\\:mb-4{margin-bottom:16px}.sm\\:min-h-\\[75px\\]{min-height:75px}.sm\\:min-w-\\[120px\\]{min-width:120px}.sm\\:flex-row{flex-direction:row}.sm\\:items-center{align-items:center}.sm\\:justify-between{justify-content:space-between}.sm\\:pt-6{padding-top:24px}.sm\\:pb-2{padding-bottom:8px}.sm\\:text-sm{font-size:14px}}@media (min-width:768px){.md\\:flex{display:flex}.md\\:w-3\\/4{width:75%}.md\\:min-w-\\[200px\\]{min-width:200px}}@media (min-width:1024px){.lg\\:-top-3{top:-12px}.lg\\:-left-6{left:-24px}.lg\\:h-\\[calc\\(100\\%\\+56px\\)\\]{height:calc(100% + 56px)}.lg\\:h-\\[calc\\(100\\%\\+80px\\)\\]{height:calc(100% + 80px)}.lg\\:w-4{width:16px}.lg\\:px-8{padding-left:32px;padding-right:32px}.lg\\:pt-7{padding-top:28px}.lg\\:pb-10{padding-bottom:40px}}';

export { StreamlineEntries as streamline_entries };
