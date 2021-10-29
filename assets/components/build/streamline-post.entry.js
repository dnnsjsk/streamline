import { r as registerInstance, h, i as getElement } from './index-2c4cdcb5.js';
import { s as setFavourite, F as Fav } from './Fav-f50b5f90.js';
import { c as someDeep, s as state$1 } from './setSearchPlaceholder-f92c7cd9.js';
import { s as state } from './capitalizeFirstLetter-a06ceb0e.js';

const streamlinePostCss = ":host .focus:focus{box-shadow:inset 0 0 0 4px #f8fafc,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-out:focus{box-shadow:0 0 0 2px #f8fafc,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-dark:focus{box-shadow:inset 0 0 0 4px #191e23,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-white:focus{box-shadow:inset 0 0 0 4px #fff,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-white-out:focus{box-shadow:0 0 0 2px #fff,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-in-white-out:focus-within{box-shadow:0 0 0 2px #fff,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-none:focus{box-shadow:none!important;outline:none!important}/*! tailwindcss v2.2.17 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{--tw-blur:var(--tw-empty,/*!*/ /*!*/);--tw-brightness:var(--tw-empty,/*!*/ /*!*/);--tw-contrast:var(--tw-empty,/*!*/ /*!*/);--tw-grayscale:var(--tw-empty,/*!*/ /*!*/);--tw-hue-rotate:var(--tw-empty,/*!*/ /*!*/);--tw-invert:var(--tw-empty,/*!*/ /*!*/);--tw-saturate:var(--tw-empty,/*!*/ /*!*/);--tw-sepia:var(--tw-empty,/*!*/ /*!*/);--tw-drop-shadow:var(--tw-empty,/*!*/ /*!*/);--tw-filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);--tw-border-opacity:1;border:0 solid;border:0 solid rgba(228,228,231,var(--tw-border-opacity));box-sizing:border-box}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}a{color:inherit;text-decoration:inherit}.visible{visibility:visible}.inline-block{display:inline-block}.h-\\[max-content\\]{height:-webkit-max-content;height:-moz-max-content;height:max-content}.bg-blue-gray-200{--tw-bg-opacity:1;background-color:rgba(226,232,240,var(--tw-bg-opacity))}.px-2\\.5{padding-left:.625rem;padding-right:.625rem}.py-1\\.5{padding-bottom:.375rem;padding-top:.375rem}.px-2{padding-left:.5rem;padding-right:.5rem}.py-1{padding-bottom:.25rem;padding-top:.25rem}.text-blue-gray-500{--tw-text-opacity:1;color:rgba(100,116,139,var(--tw-text-opacity))}.blur{--tw-blur:blur(8px);filter:var(--tw-filter)}/*! tailwindcss v2.2.17 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize *//*! tailwindcss v2.2.17 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */.pointer-events-none{pointer-events:none}.flex{display:flex}.h-4{height:1rem}.h-full{height:100%}.w-4{width:1rem}.w-full{width:100%}.items-center{align-items:center}.justify-center{justify-content:center}.rounded-full{border-radius:9999px}.border{border-width:1px}.border-blue-gray-200{--tw-border-opacity:1;border-color:rgba(226,232,240,var(--tw-border-opacity))}.bg-white{--tw-bg-opacity:1;background-color:rgba(255,255,255,var(--tw-bg-opacity))}.text-red-500{--tw-text-opacity:1;color:rgba(239,68,68,var(--tw-text-opacity))}";

let StreamlinePost = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.handleFavClick = () => {
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
    componentWillRender() {
        this.checkIfFav();
    }
    render() {
        return (h("div", { class: `flex` }, h("div", { class: `px-2.5 py-1.5 bg-blue-gray-200 text-blue-gray-500 inline-block h-[max-content] leading-1 mr-4 !text-xs relative top-1.5 font-semibold uppercase` }, this.postType), h("div", { class: `flex flex-col` }, h("div", { class: `flex flex-wrap items-center` }, h("a", { href: state.test ? "#" : this.hrefView, class: `focus-white inline-flex max-w-max font-semibold flex-col px-2.5 text-base py-2 text-blue-600 hover:underline` }, this.postTitle), h("span", { class: `text-sm inline-block ml-2 text-gray-600` }, "(", h("strong", null, "slug:"), " ", this.postSlug, ")")), h("div", { class: `flex flex-wrap` }, [
            {
                text: "Favourite",
                onClick: this.handleFavClick,
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
            const className = "inline-block px-2.5 py-2 text-blue-500 text-sm flex items-center hover:underline";
            return item.href ? (h("a", { href: item.href, class: className + ` focus-white` }, item.text)) : (h("button", { class: className + ` focus-white`, onClick: item.onClick }, this.favourite && item.text === "Favourite"
                ? "Unfavourite"
                : item.text, this.favourite &&
                item.text === "Favourite" &&
                state$1.active !== "fav" && h(Fav, { class: "ml-2" })));
        })))));
    }
    get el() { return getElement(this); }
};
StreamlinePost.style = streamlinePostCss + '/*! tailwindcss v2.2.17 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-blur:var(--tw-empty,/*!*/ /*!*/);--tw-brightness:var(--tw-empty,/*!*/ /*!*/);--tw-contrast:var(--tw-empty,/*!*/ /*!*/);--tw-grayscale:var(--tw-empty,/*!*/ /*!*/);--tw-hue-rotate:var(--tw-empty,/*!*/ /*!*/);--tw-invert:var(--tw-empty,/*!*/ /*!*/);--tw-saturate:var(--tw-empty,/*!*/ /*!*/);--tw-sepia:var(--tw-empty,/*!*/ /*!*/);--tw-drop-shadow:var(--tw-empty,/*!*/ /*!*/);--tw-filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);border:0 solid;box-sizing:border-box}strong{font-weight:bolder}button{background-color:transparent;background-image:none;color:inherit;cursor:pointer;font-family:inherit;font-size:100%;line-height:1.15;line-height:inherit;margin:0;padding:0;text-transform:none}[type=button],button{-webkit-appearance:button}a{color:inherit;text-decoration:inherit}.relative{position:relative}.top-1\\.5{top:.375rem}.top-1{top:.25rem}.mr-4{margin-right:1rem}.ml-2{margin-left:.5rem}.inline-block{display:inline-block}.flex{display:flex}.inline-flex{display:inline-flex}.h-\\[max-content\\]{height:-webkit-max-content;height:-moz-max-content;height:max-content}.max-w-max{max-width:-webkit-max-content;max-width:-moz-max-content;max-width:max-content}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-center{align-items:center}.bg-blue-gray-200{--tw-bg-opacity:1;background-color:rgba(226,232,240,var(--tw-bg-opacity))}.px-2\\.5{padding-left:.625rem;padding-right:.625rem}.py-1\\.5{padding-bottom:.375rem;padding-top:.375rem}.px-2{padding-left:.5rem;padding-right:.5rem}.py-1{padding-bottom:.25rem;padding-top:.25rem}.py-2{padding-bottom:.5rem;padding-top:.5rem}.\\!text-xs{font-size:.75rem!important;line-height:1rem!important}.text-base{font-size:1rem;line-height:1.5rem}.text-sm{font-size:.875rem;line-height:1.25rem}.font-semibold{font-weight:600}.uppercase{text-transform:uppercase}.text-blue-gray-500{--tw-text-opacity:1;color:rgba(100,116,139,var(--tw-text-opacity))}.text-blue-600{--tw-text-opacity:1;color:rgba(37,99,235,var(--tw-text-opacity))}.text-gray-600{--tw-text-opacity:1;color:rgba(82,82,91,var(--tw-text-opacity))}.text-blue-500{--tw-text-opacity:1;color:rgba(59,130,246,var(--tw-text-opacity))}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.06);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.filter{filter:var(--tw-filter)}.hover\\:underline:hover{text-decoration:underline}';

export { StreamlinePost as streamline_post };
