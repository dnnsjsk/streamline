// eslint-disable-next-line no-unused-vars
import { Component, Element, h, Prop } from '@stencil/core';
import { setFavourite } from '../../utils/setFavourite';
import { someDeep } from 'deepdash-es/standalone';
import { stateLocal } from '../../store/local';
import { Fav } from '../../elements/Fav';

/**
 * Post.
 */
@Component({
  tag: 'streamline-post',
  shadow: true,
  styleUrl: 'streamline-post.scss',
})
export class StreamlinePost {
  // eslint-disable-next-line no-undef
  @Element() el: HTMLStreamlinePostElement;

  @Prop() hrefEdit: string;
  @Prop() hrefView: string;
  @Prop() postTitle: string;
  @Prop() postId: number;
  @Prop() postType: string;
  @Prop() siteId: number;
  // eslint-disable-next-line @stencil/strict-mutable
  @Prop({ mutable: true, reflect: true }) favourite: boolean;

  componentWillRender() {
    this.checkIfFav();
  }

  private handleFavClick = () => {
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
        return (
          o.ID === this.postId &&
          o.siteId === this.siteId &&
          o.post_title === this.postTitle
        );
      },
    });
  };

  private checkIfFav = () => {
    this.favourite = someDeep(
      stateLocal.entriesFav,
      (o) => {
        return o?.ID === this.postId && o?.siteId === this.siteId;
      },
      { childrenPath: ['children'] }
    );
  };

  render() {
    return (
      <div class={`flex`}>
        <div
          class={`px-2.5 py-1.5 bg-gray-200 text-gray-500 inline-block h-[max-content] leading-1 mr-4 !text-xs relative top-1.5 font-semibold uppercase`}
        >
          {this.postType}
        </div>
        <div class={`flex flex-col`}>
          <div class={`focus w-[max-content]`}>
            <a
              href={this.hrefView}
              target="_blank"
              class={`inline-flex font-semibold flex-col px-2.5 text-base py-2 text-indigo-500 hover:underline`}
            >
              {this.postTitle}
            </a>
          </div>
          <div class={`flex flex-wrap`}>
            {[
              {
                text: 'Favourite',
                onClick: this.handleFavClick,
              },
              {
                text: 'View',
                href: this.hrefView,
              },
              {
                text: 'Edit',
                href: this.hrefEdit,
              },
            ].map((item) => {
              const className =
                'inline-block px-2.5 py-2 text-indigo-500 flex items-center hover:underline';

              return (
                <div class={`focus`}>
                  {item.href ? (
                    <a href={item.href} target="_blank" class={className}>
                      {item.text}
                    </a>
                  ) : (
                    <button class={className} onClick={item.onClick}>
                      {this.favourite ? 'Unfavourite' : item.text}
                      {this.favourite &&
                        item.text === 'Favourite' &&
                        stateLocal.active !== 'fav' && <Fav class={'ml-2'} />}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
