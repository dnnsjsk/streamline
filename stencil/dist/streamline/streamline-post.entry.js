import { h, r as registerInstance, g as getElement } from './index-87bae8c2.js';
import { f as fetchAjax, s as setFavourite } from './setFavourite-416af75c.js';
import { b7 as findDeep, b0 as set, e as someDeep, b8 as IconTimes, be as IconPen, s as state$1 } from './index-a607d389.js';
import { s as state } from './internal-82f6dfdb.js';

// eslint-disable-next-line no-unused-vars
function Heart(props) {
  return (h("svg", { class: `${props.type === 'sidebar' ? `h-[14px] relative -mr-px fill-current` : ``}`, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512", style: {
      width: props.type ? '' : '8px',
      height: props.type ? '' : '8px',
    } },
    h("path", { fill: "currentColor", d: "M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" })));
}

// eslint-disable-next-line no-unused-vars
function Fav(props) {
  return (h("span", { class: `${props.class} rounded-full w-4 h-4 text-red-500 pointer-events-none bg-white flex items-center justify-center border border-slate-200` },
    h("span", { class: `h-full w-full flex items-center justify-center` },
      h(Heart, null))));
}

const streamlinePostCss = "/*! tailwindcss v3.0.12 | MIT License | https://tailwindcss.com*/*,:after,:before{--tw-backdrop-sepia: ;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;border:0 solid #e5e7eb;box-sizing:border-box}:after,:before{--tw-content:\"\"}h1,h2,h3{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}strong{font-weight:bolder}table{border-collapse:collapse;border-color:inherit;text-indent:0}button,input,select{color:inherit;font-family:inherit;font-size:100%;line-height:inherit;margin:0;padding:0}button,select{text-transform:none}[type=button],button{-webkit-appearance:button;background-color:transparent;background-image:none}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}h1,h2,h3,menu,p,ul{margin:0}menu,ul{list-style:none;padding:0}input::-moz-placeholder{color:#9ca3af;opacity:1}input:-ms-input-placeholder{color:#9ca3af;opacity:1}input::placeholder{color:#9ca3af;opacity:1}[role=button],button{cursor:pointer}img,svg{display:block;vertical-align:middle}img{height:auto;max-width:100%}[hidden]{display:none}.pointer-events-none{pointer-events:none}.visible{visibility:visible}.relative{position:relative}.top-1{top:4px}.my-4{margin-bottom:16px;margin-top:16px}.mb-3{margin-bottom:12px}.mr-4{margin-right:16px}.-ml-2{margin-left:-8px}.ml-3{margin-left:12px}.ml-2{margin-left:8px}.mb-4{margin-bottom:16px}.mt-2{margin-top:8px}.inline-block{display:inline-block}.flex{display:flex}.inline-flex{display:inline-flex}.grid{display:grid}.h-5{height:20px}.h-4{height:16px}.h-full{height:100%}.w-full{width:100%}.w-5{width:20px}.w-4{width:16px}.max-w-max{max-width:-webkit-max-content;max-width:-moz-max-content;max-width:max-content}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-center{align-items:center}.justify-center{justify-content:center}.gap-2{gap:8px}.rounded-full{border-radius:9999px}.border{border-width:1px}.border-slate-200{--tw-border-opacity:1;border-color:rgb(226 232 240/var(--tw-border-opacity))}.bg-slate-100{background-color:rgb(241 245 249/var(--tw-bg-opacity))}.bg-slate-100,.bg-slate-200{--tw-bg-opacity:1}.bg-slate-200{background-color:rgb(226 232 240/var(--tw-bg-opacity))}.bg-white{--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity))}.p-1{padding:4px}.py-2{padding-bottom:8px;padding-top:8px}.px-2{padding-left:8px;padding-right:8px}.py-1{padding-bottom:4px;padding-top:4px}.text-sm{font-size:14px}.text-base{font-size:16px}.text-lg{font-size:18px}.font-semibold{font-weight:600}.font-medium{font-weight:500}.uppercase{text-transform:uppercase}.text-blue-600{color:rgb(37 99 235/var(--tw-text-opacity))}.text-blue-600,.text-slate-500{--tw-text-opacity:1}.text-slate-500{color:rgb(100 116 139/var(--tw-text-opacity))}.text-rose-500{color:rgb(244 63 94/var(--tw-text-opacity))}.text-rose-500,.text-slate-600{--tw-text-opacity:1}.text-slate-600{color:rgb(71 85 105/var(--tw-text-opacity))}.text-red-500{--tw-text-opacity:1;color:rgb(239 68 68/var(--tw-text-opacity))}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1);--tw-shadow-colored:0 1px 3px 0 var(--tw-shadow-color),0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.blur{--tw-blur:blur(8px)}.blur,.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}:host{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;box-sizing:border-box}:host .focus:focus{box-shadow:inset 0 0 0 4px #f1f5f9,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-border:focus{border-color:var(--sl-focus-color);box-shadow:0 0 0 1px var(--sl-focus-color);outline:none!important}:host .focus-out:focus{box-shadow:0 0 0 2px #f8fafc,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-dark:focus{box-shadow:inset 0 0 0 4px #0f172a,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-darker:focus{box-shadow:inset 0 0 0 4px #020204,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-white:focus{box-shadow:inset 0 0 0 4px #fff,inset 0 0 0 6px var(--sl-focus-color);outline:none!important}:host .focus-white-out:focus{box-shadow:0 0 0 2px #fff,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-in-white-out:focus-within{box-shadow:0 0 0 2px #fff,0 0 0 4px var(--sl-focus-color);outline:none!important}:host .focus-none:focus{box-shadow:none!important;outline:none!important}:host .border-invalid{border-color:var(--sl-focus-color-invalid);box-shadow:0 0 0 1px var(--sl-focus-color-invalid);outline:none!important}:host *{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.top-1\\.5{top:6px}.-ml-2\\.5{margin-left:-10px}.h-\\[max-content\\]{height:-webkit-max-content;height:-moz-max-content;height:max-content}.w-\\[max-content\\]{width:-webkit-max-content;width:-moz-max-content;width:max-content}.px-2\\.5{padding-left:10px;padding-right:10px}.py-1\\.5{padding-bottom:6px;padding-top:6px}.\\!text-xs{font-size:12px!important}.hover\\:text-rose-600:hover{--tw-text-opacity:1;color:rgb(225 29 72/var(--tw-text-opacity))}.hover\\:text-blue-600:hover{--tw-text-opacity:1;color:rgb(37 99 235/var(--tw-text-opacity))}.hover\\:underline:hover{-webkit-text-decoration-line:underline;text-decoration-line:underline}@media (min-width:640px){.sm\\:mb-0{margin-bottom:0}.sm\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.sm\\:flex-row{flex-direction:row}}@media (min-width:768px){.md\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}";

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
          .querySelectorAll('streamline-input')
          .forEach((item) => {
          const key = item.getAttribute('ident');
          obj.values[key] = item.value;
        });
        [
          'entriesFav',
          'entriesFavActive',
          'entriesPost',
          'entriesPostActive',
        ].forEach((item) => {
          state[item].forEach(() => {
            const newFavs = [...state[item]];
            const path = findDeep(newFavs, (o) => {
              return o.siteId === this.siteId && o.ID === this.postId;
            }, {
              childrenPath: ['children'],
            });
            if (path) {
              const currentPath = path.context['_item'].strPath;
              set(newFavs, `${currentPath}.name`, obj.values['post_title']);
              set(newFavs, `${currentPath}.post_title`, obj.values['post_title']);
              set(newFavs, `${currentPath}.post_name`, obj.values['post_name']);
              state[item] = newFavs;
            }
          });
        });
        if (!state.test) {
          fetchAjax({
            type: 'post',
            query: obj,
          });
        }
      }
    };
    this.handleClickFav = () => {
      setFavourite({
        favourite: this.favourite,
        callback: this.checkIfFav,
        type: 'post',
        filter: (o) => {
          return o.ID === this.postId && o.siteId === this.siteId;
        },
        path: (o) => {
          return o.type === 'post' && o.siteId === this.siteId;
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
      }, { childrenPath: ['children'] });
    };
  }
  onKeyEnter(e) {
    if (e.key === 'Enter' && this.edit && !this.invalid) {
      this.handleClickSave();
    }
  }
  componentWillRender() {
    this.checkIfFav();
  }
  render() {
    const className = 'inline-block px-2.5 py-2 text-blue-600 text-sm flex items-center hover:underline';
    return (h("div", { class: `flex flex-col sm:flex-row` }, h("div", { class: `w-[max-content] mb-3 px-2.5 py-1.5 bg-slate-100 border border-slate-200 text-slate-500 inline-block h-[max-content] leading-1 mr-4 !text-xs relative top-1.5 font-semibold uppercase sm:mb-0` }, this.postType), h("div", { class: `flex flex-col w-full -ml-2.5` }, h("div", { class: `flex flex-wrap items-center` }, h("button", { onClick: this.handleClickEdit, class: `${this.edit
        ? 'text-rose-500 hover:text-rose-600'
        : 'hover:text-blue-600'} ml-3 w-5 h-5 p-1 flex justify-center items-center focus-white-out inline-block` }, this.edit ? h(IconTimes, null) : h(IconPen, null)), h("span", { class: `post-title focus-white inline-flex max-w-max font-semibold flex-col px-2.5 text-base py-2` }, this.postTitle), h("span", { class: `text-sm inline-block ml-2 text-slate-600` }, "(", h("strong", null, "slug:"), " ", this.postSlug, ")")), this.edit ? (h("div", { class: `${state$1.active === 'post' ? 'mb-4' : ''} ml-3 mt-2` }, h("h3", { class: `text-lg font-medium` }, "Edit this post (ID: ", h("strong", null, this.postId), ")"), h("div", { class: `my-4 grid gap-2 sm:grid-cols-2 md:grid-cols-3` }, h("streamline-input", { ident: "post_title", placeholder: "Title", value: this.postTitle }), h("streamline-input", { ident: "post_name", placeholder: "Slug", value: this.postSlug })), h("streamline-button", { invalid: this.invalid, onClick: this.handleClickSave, type: "button", styling: "primary", text: "Save post" }))) : (h("div", { class: `flex flex-wrap` }, [
      {
        text: 'Favourite',
        onClick: this.handleClickFav,
      },
      {
        text: 'View',
        href: state.test ? '#' : this.hrefView,
      },
      {
        text: 'Edit',
        href: state.test
          ? '#'
          : atob(this.hrefEdit).replace('&amp;', '&'),
      },
    ].map((item) => {
      return item.href ? (h("a", { "data-type": item.text.toLowerCase(), href: item.href, class: className + ` focus-white` }, item.text)) : (h("button", { class: className + ` focus-white`, onClick: item.onClick }, this.favourite && item.text === 'Favourite'
        ? 'Unfavourite'
        : item.text, this.favourite &&
        item.text === 'Favourite' &&
        state$1.active !== 'fav' && h(Fav, { class: 'ml-2' })));
    }))))));
  }
  get el() { return getElement(this); }
};
StreamlinePost.style = streamlinePostCss;

export { StreamlinePost as streamline_post };
