// eslint-disable-next-line no-unused-vars
import { Component, Element, h, Prop, State, Listen } from '@stencil/core';
import { setFavourite } from '../../utils/setFavourite';
import { findDeep, someDeep } from 'deepdash-es/standalone';
import { stateLocal } from '../../store/local';
import { stateInternal } from '../../store/internal';
import { Fav } from '../../elements/Fav';
import { IconPen, IconTimes } from '../../icons';
import { set } from 'lodash-es';
import { fetchAjax } from '../../utils/fetchAjax';

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

  @State() edit: boolean;

  @Prop() hrefEdit: string;

  @Prop() hrefView: string;

  @Prop() invalid: boolean;

  @Prop() postTitle: string;

  @Prop() postId: number;

  @Prop() postSlug: string;

  @Prop() postType: string;

  @Prop() siteId: number;

  // eslint-disable-next-line @stencil/strict-mutable
  @Prop({ mutable: true, reflect: true }) favourite: boolean;

  @Listen('keydown')
  onKeyEnter(e) {
    if (e.key === 'Enter' && this.edit && !this.invalid) {
      this.handleClickSave();
    }
  }

  componentWillRender() {
    this.checkIfFav();
  }

  private handleClickEdit = () => {
    this.edit = !this.edit;

    if (!this.edit) {
      this.invalid = false;
    }
  };

  private handleClickSave = () => {
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
        stateInternal[item].forEach(() => {
          const newFavs = [...stateInternal[item]];
          const path = findDeep(
            newFavs,
            (o) => {
              return o.siteId === this.siteId && o.ID === this.postId;
            },
            {
              childrenPath: ['children'],
            }
          );
          if (path) {
            const currentPath = path.context['_item'].strPath;
            set(newFavs, `${currentPath}.name`, obj.values['post_title']);
            set(newFavs, `${currentPath}.post_title`, obj.values['post_title']);
            set(newFavs, `${currentPath}.post_name`, obj.values['post_name']);

            stateInternal[item] = newFavs;
          }
        });
      });

      if (!stateInternal.test) {
        fetchAjax({
          type: 'post',
          query: obj,
        });
      }
    }
  };

  private handleClickFav = () => {
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
      stateInternal.entriesFav,
      (o) => {
        return o?.ID === this.postId && o?.siteId === this.siteId;
      },
      { childrenPath: ['children'] }
    );
  };

  render() {
    const className =
      'inline-block px-2.5 py-2 text-blue-600 text-sm flex items-center hover:underline';

    return (
      <div class={`flex flex-col sm:flex-row`}>
        <div
          class={`w-[max-content] mb-3 px-2.5 py-1.5 bg-blue-gray-100 border border-blue-gray-200 text-blue-gray-500 inline-block h-[max-content] leading-1 mr-4 !text-xs relative top-1.5 font-semibold uppercase sm:mb-0`}
        >
          {this.postType}
        </div>
        <div class={`flex flex-col w-full -ml-2.5`}>
          <div class={`flex flex-wrap items-center`}>
            <button
              onClick={this.handleClickEdit}
              class={`${
                this.edit
                  ? 'text-rose-500 hover:text-rose-600'
                  : 'hover:text-blue-600'
              } ml-3 w-5 h-5 p-1 flex justify-center items-center focus-white-out inline-block`}
            >
              {this.edit ? <IconTimes /> : <IconPen />}
            </button>
            <span
              class={`post-title focus-white inline-flex max-w-max font-semibold flex-col px-2.5 text-base py-2`}
            >
              {this.postTitle}
            </span>
            <span class={`text-sm inline-block ml-2 text-gray-600`}>
              (<strong>slug:</strong> {this.postSlug})
            </span>
          </div>
          {this.edit ? (
            <div
              class={`${stateLocal.active === 'post' ? 'mb-4' : ''} ml-3 mt-2`}
            >
              <h3 class={`text-lg font-medium`}>
                Edit this post (ID: <strong>{this.postId}</strong>)
              </h3>
              <div class={`my-4 grid gap-2 sm:grid-cols-2 md:grid-cols-3`}>
                <streamline-input
                  ident="post_title"
                  placeholder="Title"
                  value={this.postTitle}
                />
                <streamline-input
                  ident="post_name"
                  placeholder="Slug"
                  value={this.postSlug}
                />
              </div>
              <streamline-button
                invalid={this.invalid}
                onClick={this.handleClickSave}
                styling="primary"
                text="Save post"
              />
            </div>
          ) : (
            <div class={`flex flex-wrap`}>
              {[
                {
                  text: 'Favourite',
                  onClick: this.handleClickFav,
                },
                {
                  text: 'View',
                  href: stateInternal.test ? '#' : this.hrefView,
                },
                {
                  text: 'Edit',
                  href: stateInternal.test
                    ? '#'
                    : atob(this.hrefEdit).replace('&amp;', '&'),
                },
              ].map((item) => {
                return item.href ? (
                  <a href={item.href} class={className + ` focus-white`}>
                    {item.text}
                  </a>
                ) : (
                  <button
                    class={className + ` focus-white`}
                    onClick={item.onClick}
                  >
                    {this.favourite && item.text === 'Favourite'
                      ? 'Unfavourite'
                      : item.text}
                    {this.favourite &&
                      item.text === 'Favourite' &&
                      stateLocal.active !== 'fav' && <Fav class={'ml-2'} />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }
}
