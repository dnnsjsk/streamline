/**
 * Container.
 */
export declare class StreamlineContainer {
  el: HTMLStreamlineContainerElement;
  mac: boolean;
  visible: boolean;
  connectedCallback(): void;
  componentDidLoad(): void;
  private cycleTabs;
  toggle(): Promise<void>;
  toggleTestFull(type: any): Promise<void>;
  render(): any;
}
