import { r as registerInstance, h, g as getElement } from './index-ac9abc62.js';
import { s as setFavourite, F as Fav } from './Fav-93dfb1d8.js';
import { f as findDeep, d as set, e as someDeep, s as state$1 } from './setSearchPlaceholder-25f695c9.js';
import { s as state } from './internal-d7978ed0.js';
import { f as fetchAjax, d as IconTimes, e as IconPen } from './fetchAjax-7c3eab78.js';

const streamlinePostCss = ":host{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;box-sizing:border-box}:host .focus:focus{box-shadow:inset 0 0 0 4px #f1f5f9,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-border:focus{border-color:var(--sl-focus-color);box-shadow:0 0 0 1px var(--sl-focus-color);outline:none!important}:host .focus-out:focus{box-shadow:0 0 0 2px #f8fafc,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-dark:focus{box-shadow:inset 0 0 0 4px #0f172a,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-darker:focus{box-shadow:inset 0 0 0 4px #020204,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-white:focus{box-shadow:inset 0 0 0 4px #fff,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-white-out:focus{box-shadow:0 0 0 2px #fff,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-in-white-out:focus-within{box-shadow:0 0 0 2px #fff,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-none:focus{box-shadow:none!important;outline:none!important}:host .border-invalid{border-color:var(--sl-focus-color-invalid);box-shadow:0 0 0 1px var(--sl-focus-color-invalid);outline:none!important}:host *{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}/*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{--tw-blur:var(--tw-empty,/*!*/ /*!*/);--tw-brightness:var(--tw-empty,/*!*/ /*!*/);--tw-contrast:var(--tw-empty,/*!*/ /*!*/);--tw-grayscale:var(--tw-empty,/*!*/ /*!*/);--tw-hue-rotate:var(--tw-empty,/*!*/ /*!*/);--tw-invert:var(--tw-empty,/*!*/ /*!*/);--tw-saturate:var(--tw-empty,/*!*/ /*!*/);--tw-sepia:var(--tw-empty,/*!*/ /*!*/);--tw-drop-shadow:var(--tw-empty,/*!*/ /*!*/);--tw-filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);--tw-border-opacity:1;border:0 solid;border:0 solid rgba(228,228,231,var(--tw-border-opacity));box-sizing:border-box}strong{font-weight:bolder}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}p{margin:0}a{color:inherit;text-decoration:inherit}.visible{visibility:visible}.inline-block{display:inline-block}.h-\\[max-content\\]{height:-webkit-max-content;height:-moz-max-content;height:max-content}.bg-blue-gray-200{--tw-bg-opacity:1;background-color:rgba(226,232,240,var(--tw-bg-opacity))}.px-2\\.5{padding-left:10px;padding-right:10px}.py-1\\.5{padding-bottom:6px;padding-top:6px}.px-2{padding-left:8px;padding-right:8px}.py-1{padding-bottom:4px;padding-top:4px}.text-blue-gray-500{--tw-text-opacity:1;color:rgba(100,116,139,var(--tw-text-opacity))}.blur{--tw-blur:blur(8px);filter:var(--tw-filter)}/*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize *//*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */.pointer-events-none{pointer-events:none}.flex{display:flex}.h-4{height:16px}.h-full{height:100%}.w-4{width:16px}.w-full{width:100%}.items-center{align-items:center}.justify-center{justify-content:center}.rounded-full{border-radius:9999px}.border{border-width:1px}.border-blue-gray-200{--tw-border-opacity:1;border-color:rgba(226,232,240,var(--tw-border-opacity))}.bg-white{--tw-bg-opacity:1;background-color:rgba(255,255,255,var(--tw-bg-opacity))}.text-red-500{--tw-text-opacity:1;color:rgba(239,68,68,var(--tw-text-opacity))}";

let StreamlinePost = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.handleClickEdit = () => {
            this.edit = !this.edit;
            if (!this.edit) {
                this.invalid = false;
            }
        };
        this.handleClickSave = () => {
            if (!this.invalid) {
                const obj = {
                    postId: this.postId,
                    siteId: this.siteId,
                    values: {},
                };
                this.el.shadowRoot
                    .querySelectorAll("streamline-input")
                    .forEach((item) => {
                    const key = item.getAttribute("ident");
                    obj.values[key] = item.value;
                });
                [
                    "entriesFav",
                    "entriesFavActive",
                    "entriesPost",
                    "entriesPostActive",
                ].forEach((item) => {
                    state[item].forEach(() => {
                        const newFavs = [...state[item]];
                        const path = findDeep(newFavs, (o) => {
                            return o.siteId === this.siteId && o.ID === this.postId;
                        }, {
                            childrenPath: ["children"],
                        });
                        if (path) {
                            const currentPath = path.context["_item"].strPath;
                            set(newFavs, `${currentPath}.name`, obj.values["post_title"]);
                            set(newFavs, `${currentPath}.post_title`, obj.values["post_title"]);
                            set(newFavs, `${currentPath}.post_name`, obj.values["post_name"]);
                            state[item] = newFavs;
                        }
                    });
                });
                if (!state.test) {
                    fetchAjax({
                        type: "post",
                        query: obj,
                    });
                }
            }
        };
        this.handleClickFav = () => {
            setFavourite({
                favourite: this.favourite,
                callback: this.checkIfFav,
                type: "post",
                filter: (o) => {
                    return o.ID === this.postId && o.siteId === this.siteId;
                },
                path: (o) => {
                    return o.type === "post" && o.siteId === this.siteId;
                },
                pathFav: (o) => {
                    return (o.ID === this.postId &&
                        o.siteId === this.siteId &&
                        o.post_title === this.postTitle);
                },
            });
        };
        this.checkIfFav = () => {
            this.favourite = someDeep(state.entriesFav, (o) => {
                return (o === null || o === void 0 ? void 0 : o.ID) === this.postId && (o === null || o === void 0 ? void 0 : o.siteId) === this.siteId;
            }, { childrenPath: ["children"] });
        };
    }
    onKeyEnter(e) {
        if (e.key === "Enter" && this.edit && !this.invalid) {
            this.handleClickSave();
        }
    }
    componentWillRender() {
        this.checkIfFav();
    }
    render() {
        const className = "inline-block px-2.5 py-2 text-blue-600 text-sm flex items-center hover:underline";
        return (h("div", { class: `flex flex-col sm:flex-row` }, h("div", { class: `w-[max-content] mb-3 px-2.5 py-1.5 bg-blue-gray-100 border border-blue-gray-200 text-blue-gray-500 inline-block h-[max-content] leading-1 mr-4 !text-xs relative top-1.5 font-semibold uppercase sm:mb-0` }, this.postType), h("div", { class: `flex flex-col w-full -ml-2.5` }, h("div", { class: `flex flex-wrap items-center` }, h("button", { onClick: this.handleClickEdit, class: `${this.edit
                ? "text-rose-500 hover:text-rose-600"
                : "hover:text-blue-600"} ml-3 w-5 h-5 p-1 flex justify-center items-center focus-white-out inline-block` }, this.edit ? h(IconTimes, null) : h(IconPen, null)), h("span", { class: `post-title focus-white inline-flex max-w-max font-semibold flex-col px-2.5 text-base py-2` }, this.postTitle), h("span", { class: `text-sm inline-block ml-2 text-blue-gray-600` }, "(", h("strong", null, "slug:"), " ", this.postSlug, ")")), this.edit ? (h("div", { class: `${state$1.active === "post" ? "mb-4" : ""} ml-3 mt-2` }, h("h3", { class: `text-lg font-medium` }, "Edit this post (ID: ", h("strong", null, this.postId), ")"), h("div", { class: `my-4 grid gap-2 sm:grid-cols-2 md:grid-cols-3` }, h("streamline-input", { ident: "post_title", placeholder: "Title", value: this.postTitle }), h("streamline-input", { ident: "post_name", placeholder: "Slug", value: this.postSlug })), h("streamline-button", { invalid: this.invalid, onClick: this.handleClickSave, type: "button", styling: "primary", text: "Save post" }))) : (h("div", { class: `flex flex-wrap` }, [
            {
                text: "Favourite",
                onClick: this.handleClickFav,
            },
            {
                text: "View",
                href: state.test ? "#" : this.hrefView,
            },
            {
                text: "Edit",
                href: state.test
                    ? "#"
                    : atob(this.hrefEdit).replace("&amp;", "&"),
            },
        ].map((item) => {
            return item.href ? (h("a", { "data-type": item.text.toLowerCase(), href: item.href, class: className + ` focus-white` }, item.text)) : (h("button", { class: className + ` focus-white`, onClick: item.onClick }, this.favourite && item.text === "Favourite"
                ? "Unfavourite"
                : item.text, this.favourite &&
                item.text === "Favourite" &&
                state$1.active !== "fav" && h(Fav, { class: "ml-2" })));
        }))))));
    }
    get el() { return getElement(this); }
};
StreamlinePost.style = streamlinePostCss + '/*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{--tw-border-opacity:1;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-blur:var(--tw-empty,/*!*/ /*!*/);--tw-brightness:var(--tw-empty,/*!*/ /*!*/);--tw-contrast:var(--tw-empty,/*!*/ /*!*/);--tw-grayscale:var(--tw-empty,/*!*/ /*!*/);--tw-hue-rotate:var(--tw-empty,/*!*/ /*!*/);--tw-invert:var(--tw-empty,/*!*/ /*!*/);--tw-saturate:var(--tw-empty,/*!*/ /*!*/);--tw-sepia:var(--tw-empty,/*!*/ /*!*/);--tw-drop-shadow:var(--tw-empty,/*!*/ /*!*/);--tw-filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);border:0 solid;border-color:rgba(228,228,231,var(--tw-border-opacity));box-sizing:border-box}strong{font-weight:bolder}button{background-color:transparent;background-image:none;color:inherit;cursor:pointer;font-family:inherit;font-size:100%;line-height:1.15;line-height:inherit;margin:0;padding:0;text-transform:none}[type=button],button{-webkit-appearance:button}h3{font-size:inherit;font-weight:inherit;margin:0}a{color:inherit;text-decoration:inherit}.relative{position:relative}.top-1\\.5{top:6px}.top-1{top:4px}.my-4{margin-bottom:16px;margin-top:16px}.mb-3{margin-bottom:12px}.mr-4{margin-right:16px}.-ml-2\\.5{margin-left:-10px}.-ml-2{margin-left:-8px}.ml-3{margin-left:12px}.ml-2{margin-left:8px}.mb-4{margin-bottom:16px}.mt-2{margin-top:8px}.inline-block{display:inline-block}.flex{display:flex}.inline-flex{display:inline-flex}.grid{display:grid}.h-\\[max-content\\]{height:-webkit-max-content;height:-moz-max-content;height:max-content}.h-5{height:20px}.w-\\[max-content\\]{width:-webkit-max-content;width:-moz-max-content;width:max-content}.w-full{width:100%}.w-5{width:20px}.max-w-max{max-width:-webkit-max-content;max-width:-moz-max-content;max-width:max-content}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-center{align-items:center}.justify-center{justify-content:center}.gap-2{gap:8px}.border{border-width:1px}.border-blue-gray-200{--tw-border-opacity:1;border-color:rgba(226,232,240,var(--tw-border-opacity))}.bg-blue-gray-100{--tw-bg-opacity:1;background-color:rgba(241,245,249,var(--tw-bg-opacity))}.p-1{padding:4px}.px-2\\.5{padding-left:10px;padding-right:10px}.py-2{padding-bottom:8px;padding-top:8px}.px-2{padding-left:8px;padding-right:8px}.py-1\\.5{padding-bottom:6px;padding-top:6px}.py-1{padding-bottom:4px;padding-top:4px}.text-sm{font-size:14px}.\\!text-xs{font-size:12px!important}.text-base{font-size:16px}.text-lg{font-size:18px}.font-semibold{font-weight:600}.font-medium{font-weight:500}.uppercase{text-transform:uppercase}.text-blue-600{--tw-text-opacity:1;color:rgba(37,99,235,var(--tw-text-opacity))}.text-blue-gray-500{--tw-text-opacity:1;color:rgba(100,116,139,var(--tw-text-opacity))}.text-rose-500{--tw-text-opacity:1;color:rgba(244,63,94,var(--tw-text-opacity))}.text-blue-gray-600{--tw-text-opacity:1;color:rgba(71,85,105,var(--tw-text-opacity))}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.filter{filter:var(--tw-filter)}.hover\\:text-rose-600:hover{--tw-text-opacity:1;color:rgba(225,29,72,var(--tw-text-opacity))}.hover\\:text-blue-600:hover{--tw-text-opacity:1;color:rgba(37,99,235,var(--tw-text-opacity))}.hover\\:underline:hover{text-decoration:underline}@media (min-width:640px){.sm\\:mb-0{margin-bottom:0}.sm\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.sm\\:flex-row{flex-direction:row}}@media (min-width:768px){.md\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}}';

export { StreamlinePost as streamline_post };
