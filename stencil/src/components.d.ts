/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface StreamlineBox {
    }
    interface StreamlineButton {
        "adminUrl": string;
        "favourite": boolean;
        "header": string;
        "href": string;
        "icon": string;
        "index": number;
        "indexInner": number;
        "indexSub": number;
        "path": string;
        "siteId": number;
        "text": string;
        "type": string;
        "typeSub": string;
    }
    interface StreamlineContainer {
        "visible": boolean;
    }
    interface StreamlineEntries {
    }
    interface StreamlinePost {
        "favourite": boolean;
        "hrefEdit": string;
        "hrefView": string;
        "postId": number;
        "postTitle": string;
        "postType": string;
        "siteId": number;
    }
    interface StreamlineSearch {
    }
    interface StreamlineSidebar {
    }
}
declare global {
    interface HTMLStreamlineBoxElement extends Components.StreamlineBox, HTMLStencilElement {
    }
    var HTMLStreamlineBoxElement: {
        prototype: HTMLStreamlineBoxElement;
        new (): HTMLStreamlineBoxElement;
    };
    interface HTMLStreamlineButtonElement extends Components.StreamlineButton, HTMLStencilElement {
    }
    var HTMLStreamlineButtonElement: {
        prototype: HTMLStreamlineButtonElement;
        new (): HTMLStreamlineButtonElement;
    };
    interface HTMLStreamlineContainerElement extends Components.StreamlineContainer, HTMLStencilElement {
    }
    var HTMLStreamlineContainerElement: {
        prototype: HTMLStreamlineContainerElement;
        new (): HTMLStreamlineContainerElement;
    };
    interface HTMLStreamlineEntriesElement extends Components.StreamlineEntries, HTMLStencilElement {
    }
    var HTMLStreamlineEntriesElement: {
        prototype: HTMLStreamlineEntriesElement;
        new (): HTMLStreamlineEntriesElement;
    };
    interface HTMLStreamlinePostElement extends Components.StreamlinePost, HTMLStencilElement {
    }
    var HTMLStreamlinePostElement: {
        prototype: HTMLStreamlinePostElement;
        new (): HTMLStreamlinePostElement;
    };
    interface HTMLStreamlineSearchElement extends Components.StreamlineSearch, HTMLStencilElement {
    }
    var HTMLStreamlineSearchElement: {
        prototype: HTMLStreamlineSearchElement;
        new (): HTMLStreamlineSearchElement;
    };
    interface HTMLStreamlineSidebarElement extends Components.StreamlineSidebar, HTMLStencilElement {
    }
    var HTMLStreamlineSidebarElement: {
        prototype: HTMLStreamlineSidebarElement;
        new (): HTMLStreamlineSidebarElement;
    };
    interface HTMLElementTagNameMap {
        "streamline-box": HTMLStreamlineBoxElement;
        "streamline-button": HTMLStreamlineButtonElement;
        "streamline-container": HTMLStreamlineContainerElement;
        "streamline-entries": HTMLStreamlineEntriesElement;
        "streamline-post": HTMLStreamlinePostElement;
        "streamline-search": HTMLStreamlineSearchElement;
        "streamline-sidebar": HTMLStreamlineSidebarElement;
    }
}
declare namespace LocalJSX {
    interface StreamlineBox {
    }
    interface StreamlineButton {
        "adminUrl"?: string;
        "favourite"?: boolean;
        "header"?: string;
        "href"?: string;
        "icon"?: string;
        "index"?: number;
        "indexInner"?: number;
        "indexSub"?: number;
        "path"?: string;
        "siteId"?: number;
        "text"?: string;
        "type"?: string;
        "typeSub"?: string;
    }
    interface StreamlineContainer {
        "visible"?: boolean;
    }
    interface StreamlineEntries {
    }
    interface StreamlinePost {
        "favourite"?: boolean;
        "hrefEdit"?: string;
        "hrefView"?: string;
        "postId"?: number;
        "postTitle"?: string;
        "postType"?: string;
        "siteId"?: number;
    }
    interface StreamlineSearch {
    }
    interface StreamlineSidebar {
    }
    interface IntrinsicElements {
        "streamline-box": StreamlineBox;
        "streamline-button": StreamlineButton;
        "streamline-container": StreamlineContainer;
        "streamline-entries": StreamlineEntries;
        "streamline-post": StreamlinePost;
        "streamline-search": StreamlineSearch;
        "streamline-sidebar": StreamlineSidebar;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "streamline-box": LocalJSX.StreamlineBox & JSXBase.HTMLAttributes<HTMLStreamlineBoxElement>;
            "streamline-button": LocalJSX.StreamlineButton & JSXBase.HTMLAttributes<HTMLStreamlineButtonElement>;
            "streamline-container": LocalJSX.StreamlineContainer & JSXBase.HTMLAttributes<HTMLStreamlineContainerElement>;
            "streamline-entries": LocalJSX.StreamlineEntries & JSXBase.HTMLAttributes<HTMLStreamlineEntriesElement>;
            "streamline-post": LocalJSX.StreamlinePost & JSXBase.HTMLAttributes<HTMLStreamlinePostElement>;
            "streamline-search": LocalJSX.StreamlineSearch & JSXBase.HTMLAttributes<HTMLStreamlineSearchElement>;
            "streamline-sidebar": LocalJSX.StreamlineSidebar & JSXBase.HTMLAttributes<HTMLStreamlineSidebarElement>;
        }
    }
}
