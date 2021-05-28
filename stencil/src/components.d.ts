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
        "favourite": boolean;
        "header": string;
        "href": string;
        "icon": string;
        "index": number;
        "indexInner": number;
        "indexSub": number;
        "text": string;
        "type": string;
    }
    interface StreamlineContainer {
    }
    interface StreamlineEntries {
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
        "streamline-sidebar": HTMLStreamlineSidebarElement;
    }
}
declare namespace LocalJSX {
    interface StreamlineBox {
    }
    interface StreamlineButton {
        "favourite"?: boolean;
        "header"?: string;
        "href"?: string;
        "icon"?: string;
        "index"?: number;
        "indexInner"?: number;
        "indexSub"?: number;
        "text"?: string;
        "type"?: string;
    }
    interface StreamlineContainer {
    }
    interface StreamlineEntries {
    }
    interface StreamlineSidebar {
    }
    interface IntrinsicElements {
        "streamline-box": StreamlineBox;
        "streamline-button": StreamlineButton;
        "streamline-container": StreamlineContainer;
        "streamline-entries": StreamlineEntries;
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
            "streamline-sidebar": LocalJSX.StreamlineSidebar & JSXBase.HTMLAttributes<HTMLStreamlineSidebarElement>;
        }
    }
}
