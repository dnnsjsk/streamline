import { r as registerInstance, h, i as getElement } from './index-6c45a1d5.js';
import { s as state } from './internal-7b6bacde.js';
import './index-67f429b8.js';

const streamlineEntriesCss = ":host{--sl-entry-space:1rem}:host ul{padding:0;list-style-type:none}:host .container{height:calc(100% - var(--sl-side-w));overflow:auto;margin:0;display:none}:host .container-sub{display:flex;flex-wrap:wrap;padding:0 0 var(--sl-entry-space) 0}:host .entry{transition:none;display:flex;margin:0 var(--sl-p);padding:0}:host .entry+.entry{border-top:1px solid var(--sl-wp-g2-light-gray-500)}:host .entry h1{white-space:nowrap;margin-top:calc(var(--sl-entry-space) + 0.125rem);margin-right:var(--sl-p);line-height:1;font-size:1rem;font-weight:500;transition:none;display:inline-block;box-sizing:border-box;color:var(--sl-wp-g2-dark-gray-900);text-decoration:none}:host .entry .is-tertiary{color:var(--wp-g2-blueberry-dark)}:host .entry .is-tertiary:hover{box-shadow:inset 0 0 0 1px var(--sl-wp-g2-blueberry-dark)}:host .entry-sub{padding:0;margin:var(--sl-entry-space) var(--sl-entry-space) 0 0}";

const StreamlineEntries = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  componentDidRender() {
    const show = () => {
      this.el.shadowRoot.querySelector('.container').style.display = 'block';
    };
    show();
  }
  renderEntries() {
    return [state.entriesActive].map((item) => {
      return Object.values(item).map((itemInner, indexInner) => {
        return (h("li", { key: indexInner, class: "entry" }, h("h1", null, itemInner.name), itemInner.children && (h("ul", { class: "container-sub" }, Object.values(itemInner.children).map((itemSub, indexSub) => {
          if (indexInner + 1 === itemInner.children.length &&
            indexSub + 1 === Object.values(itemInner.children).length) {
            // console.log(this.el.shadowRoot);
          }
          return (h("li", { key: indexSub, class: "entry-sub" }, h("streamline-button", { type: "is-main", text: 
            // @ts-ignore
            itemSub.name })));
        })))));
      });
    });
  }
  render() {
    return (h("ul", { tabIndex: -1, class: "container" }, state.entriesActive && this.renderEntries()));
  }
  get el() { return getElement(this); }
};
StreamlineEntries.style = streamlineEntriesCss;

export { StreamlineEntries as streamline_entries };
