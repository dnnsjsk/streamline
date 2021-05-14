import { r as registerInstance, h } from './index-6c45a1d5.js';

const streamlineSidebarCss = ":host{background:var(--sl-wp-g2-light-gray-100);height:100%;width:calc(var(--sl-side-w) - 1px);border-right:1px solid var(--sl-border-color)}:host .container{display:grid;grid-auto-rows:max-content;border-radius:0}";

const StreamlineSidebar = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h("nav", { class: "container" }, h("streamline-button", { type: "is-sidebar is-primary", icon: "wordpress" }), h("streamline-button", { type: "is-sidebar", text: "Menu", icon: "menu" }), h("streamline-button", { type: "is-sidebar", text: "Tasks", icon: "tasks" })));
  }
};
StreamlineSidebar.style = streamlineSidebarCss;

export { StreamlineSidebar as streamline_sidebar };
