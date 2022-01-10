/**
 * Post.
 */
export declare class StreamlinePost {
  el: HTMLStreamlinePostElement;
  edit: boolean;
  hrefEdit: string;
  hrefView: string;
  invalid: boolean;
  postTitle: string;
  postId: number;
  postSlug: string;
  postType: string;
  siteId: number;
  favourite: boolean;
  onKeyEnter(e: any): void;
  componentWillRender(): void;
  private handleClickEdit;
  private handleClickSave;
  private handleClickFav;
  private checkIfFav;
  render(): any;
}
