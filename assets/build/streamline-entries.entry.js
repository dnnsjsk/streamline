import { r as registerInstance, h, i as getElement } from './index-62dd23ad.js';
import { s as state } from './internal-0465a79e.js';
import { g as getFavourites } from './getFavourites-f4494130.js';

const streamlineEntriesCss = "/*! tailwindcss v2.2.16 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{border:0 solid;box-sizing:border-box}.visible{visibility:visible}";

const StreamlineEntries = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    renderEntries() {
        return (state.entriesActive !== null &&
            Object.values(state.entriesActive).map((item) => {
                return (h("div", null, h("div", { class: `${item.type} mx-3 mb-4 pb-1 flex justify-between items-end sticky top-0 bg-white z-10 border-b border-dotted border-gray-900 sm:mx-6` }, h("h1", { class: `text-gray-900 font-medium text-xl mt-4 mb-2 sm:text-2xl sm:mt-5` }, item.name), h("div", { class: `mb-1.5` }, ((item.type === "menu" &&
                    getFavourites(state.entries, "menu")) ||
                    (item.type === "flow" &&
                        getFavourites(state.entries, "flow"))) && (h("streamline-button", { header: "favourite", type: "header", typeSub: item.type, icon: "heart" })))), h("ul", null, item.children.map((itemInner, indexInner) => {
                    return (h("li", { key: indexInner, class: `border-t border-gray-100 flex mx-3 flex-col sm:flex-row last-of-type:mb-4 first-of-type:border-none sm:mx-6` }, h("h2", { class: `mt-3.5 mr-4 leading-1 text-base font-medium inline-block text-gray-900 break-words sm:min-w-[120px] md:min-w-[200px]` }, itemInner.name), itemInner.children && (h("ul", { class: `flex flex-wrap gap-x-4 pb-4` }, Object.values(itemInner.children).map((itemSub, indexSub) => {
                        if (indexInner + 1 === itemInner.children.length &&
                            indexSub + 1 ===
                                Object.values(itemInner.children).length) {
                            // console.log(this.el.shadowRoot);
                        }
                        return (h("li", { key: indexSub, class: `mt-4` }, h("streamline-button", { type: "main", typeSub: 
                            // @ts-ignore
                            itemSub.type, ident: 
                            // @ts-ignore
                            itemSub.id, text: 
                            // @ts-ignore
                            itemSub.name, href: 
                            // @ts-ignore
                            itemSub.href, favourite: 
                            // @ts-ignore
                            !!itemSub.favourite, index: 
                            // @ts-ignore
                            item.index, indexInner: 
                            // @ts-ignore
                            itemInner.index, indexSub: 
                            // @ts-ignore
                            itemSub.index })));
                    })))));
                }))));
            }));
    }
    render() {
        return (h("div", { class: `h-[calc(100%-var(--sl-side-w))] overflow-auto w-full`, tabIndex: -1 }, state.entries && this.renderEntries()));
    }
    get el() { return getElement(this); }
};
StreamlineEntries.style = streamlineEntriesCss + '/*! tailwindcss v2.2.16 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{--tw-border-opacity:1;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;border:0 solid;border-color:rgba(229,231,235,var(--tw-border-opacity));box-sizing:border-box}h1,h2{font-size:inherit;font-weight:inherit;margin:0}ul{list-style:none;margin:0;padding:0}.sticky{position:sticky}.top-0{top:0}.z-10{z-index:10}.mx-3{margin-left:.75rem;margin-right:.75rem}.mb-4{margin-bottom:1rem}.mt-4{margin-top:1rem}.mb-2{margin-bottom:.5rem}.mb-1\\.5{margin-bottom:.375rem}.mb-1{margin-bottom:.25rem}.mt-3\\.5{margin-top:.875rem}.mr-4{margin-right:1rem}.mt-3{margin-top:.75rem}.inline-block{display:inline-block}.flex{display:flex}.h-\\[calc\\(100\\%-var\\(--sl-side-w\\)\\)\\]{height:calc(100% - var(--sl-side-w))}.w-full{width:100%}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-end{align-items:flex-end}.justify-between{justify-content:space-between}.gap-x-4{-moz-column-gap:1rem;column-gap:1rem}.overflow-auto{overflow:auto}.break-words{overflow-wrap:break-word}.border-b{border-bottom-width:1px}.border-t{border-top-width:1px}.border-dotted{border-style:dotted}.border-gray-900{--tw-border-opacity:1;border-color:rgba(17,24,39,var(--tw-border-opacity))}.border-gray-100{--tw-border-opacity:1;border-color:rgba(243,244,246,var(--tw-border-opacity))}.bg-white{--tw-bg-opacity:1;background-color:rgba(255,255,255,var(--tw-bg-opacity))}.pb-1{padding-bottom:.25rem}.pb-4{padding-bottom:1rem}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-base{font-size:1rem;line-height:1.5rem}.font-medium{font-weight:500}.text-gray-900{--tw-text-opacity:1;color:rgba(17,24,39,var(--tw-text-opacity))}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.06);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.first-of-type\\:border-none:first-of-type{border-style:none}.last-of-type\\:mb-4:last-of-type{margin-bottom:1rem}@media (min-width:640px){.sm\\:mx-6{margin-left:1.5rem;margin-right:1.5rem}.sm\\:mt-5{margin-top:1.25rem}.sm\\:min-w-\\[120px\\]{min-width:120px}.sm\\:flex-row{flex-direction:row}.sm\\:text-2xl{font-size:1.5rem;line-height:2rem}}@media (min-width:768px){.md\\:min-w-\\[200px\\]{min-width:200px}}';

export { StreamlineEntries as streamline_entries };
