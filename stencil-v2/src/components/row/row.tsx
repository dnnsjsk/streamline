// eslint-disable-next-line no-unused-vars
import { Component, Element, h, Prop, State, Watch } from '@stencil/core';
import { state } from '../../store/internal';
import someDeep from 'deepdash-es/someDeep';
import { setFavourite } from '../../utils/set/setFavourite';
import { get } from '../../utils/query/get';
import { getMenu } from '../../utils/get/getMenu';
import { save } from '../../utils/query/save';
import IconHeart from '../../../node_modules/@fortawesome/fontawesome-pro/svgs/regular/heart.svg';
import IconCheck from '../../../node_modules/@fortawesome/fontawesome-pro/svgs/regular/check.svg';
import { Icon } from '../../elements/Icon';

@Component({
  tag: 'streamline-row',
  styleUrls: ['../../css/tailwind.scss', '../../css/focus.scss'],
  shadow: true,
})
export class StreamlineRow {
  private button: HTMLElement;

  // eslint-disable-next-line no-undef
  @Element() el: HTMLStreamlineRowElement;

  @Prop({ mutable: true, reflect: true }) disabled = false;
  @Prop() item = {
    ID: 1,
    adminUrl: '',
    guid: '',
    href: '',
    hrefEdit: '',
    name: '',
    path: '',
    post_title: '',
    route: '',
    siteId: 1,
    tab: '',
    type: '',
  };
  @Prop({ mutable: true }) focussed = false;
  @Prop() mb;
  @Prop() table;
  @Prop({ reflect: true, mutable: true }) isFav = false;

  @State() isEdit;
  @State() isAction;
  @State() isSite;
  @State() isPost;
  @State() isMenu;
  @State() isDropdown;
  @State() isCurrentSite;
  @State() isTable;

  @Watch('focussed')
  onChangeFocussed(value) {
    value ? this.button?.focus?.() : this.button?.blur?.();
  }

  componentWillLoad() {
    this.setState();
    this.checkIfFavourite();
  }

  componentWillUpdate() {
    this.setState();
  }

  private setState = () => {
    this.isEdit = state.entriesEditing?.[this.item.ID]?.active;
    this.isAction = this.item.type === 'action';
    this.disabled = this.isAction && state.searchValue === '';
    this.isSite = this.item.type === 'site';
    this.isPost = this.item.type === 'post';
    this.isMenu = this.item.type === 'menu' || this.item.type === 'networkMenu';
    this.isDropdown = this.isPost || this.isMenu;
    this.isCurrentSite =
      this.item.siteId === parseInt(String(state.currentSite.id));
    this.isTable = this.isSite || this.isPost;
  };

  private checkIfFavourite = () => {
    this.isFav = someDeep(
      state.entriesFav,
      (o) => {
        return this.isMenu
          ? o?.path === this.item.path &&
              o?.siteId === this.item.siteId &&
              o.type === this.item.type
          : o?.ID === this.item.ID &&
              o?.siteId === this.item.siteId &&
              o.type === this.item.type;
      },
      { childrenPath: ['children'] }
    );
  };

  private setFav = () =>
    setFavourite({
      favourite: this.isFav,
      callback: this.checkIfFavourite,
      type: this.item.type,
      filter: (o) => {
        return this.isMenu
          ? o.href === this.item.href && o.adminUrl === this.item.adminUrl
          : o.ID === this.item.ID && o.siteId === this.item.siteId;
      },
      path: (o) => {
        return o.type === this.item.type && o.siteId === this.item.siteId;
      },
      pathFav: (o) => {
        return this.isMenu
          ? o.path === this.item.path && o.siteId === this.item.siteId
          : o.ID === this.item.ID &&
              o.siteId === this.item.siteId &&
              o.post_title === this.item.post_title;
      },
    });

  private onKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (this.isAction) {
        this.onClickAction();
      }
      if (this.isSite) {
        this.onClickSite();
      }
    }
  };

  private onClickAction = () => {
    get({
      route: this.item.route,
      type: this.item.tab,
      value: state.searchValue,
      tab: this.item.tab,
      callback: () => (state.active = this.item.tab),
    });
  };

  private onClickSite = () => {
    state.currentSite = {
      path: this.item.path,
      id: this.item.siteId,
    };

    state.entriesPost = [];
    state.entriesPostActive = [];
    state.entriesPostQuery = '';

    if (!state.data.isAdmin) {
      state.isLoading = true;
    }

    getMenu({
      adminUrl: this.item.adminUrl,
      fetch: true,
      siteId: this.item.siteId,
      path: this.item.path,
    });
  };

  private onClickPostsEditToggle = (edit) => {
    const isSaveable = () => {
      const inputs = this.el.shadowRoot.querySelectorAll(
        `[data-row="${this.item.ID}"] input`
      );

      // @ts-ignore
      for (const input of inputs)
        if ((input as HTMLInputElement).value !== '') return false;

      return true;
    };

    if (!edit && !isSaveable()) {
      return false;
    }

    state.entriesEditing = {
      ...state.entriesEditing,
      [this.item.ID]: {
        ...state.entriesEditing?.[this.item.ID],
        values: Object.fromEntries(
          [
            // @ts-ignore
            ...this.el.shadowRoot.querySelectorAll(
              `[data-row="${this.item.ID}"] input[data-id]`
            ),
          ].map((item) => [
            [item.getAttribute('data-id')],
            {
              defaultValue: (item as HTMLInputElement).value,
            },
          ])
        ),
        active: edit,
      },
    };

    const dropdownButton = this.el.shadowRoot.querySelector(
      `[data-row="${this.item.ID}"] streamline-ui-dropdown`
    );

    if (edit) {
      dropdownButton.classList.add('!opacity-100');
    } else {
      dropdownButton.classList.remove('!opacity-100');

      const values = {};
      this.el.shadowRoot
        .querySelectorAll(`[data-row="${this.item.ID}"] input[data-id]`)
        .forEach((itemNested) => {
          const key = itemNested.getAttribute('data-id');
          values[key] = (itemNested as HTMLInputElement).value;
        });

      save(this.item, values);
    }

    this.el.shadowRoot
      .querySelectorAll(`[data-row="${this.item.ID}"] input`)
      .forEach((item) => (item as HTMLInputElement)?.blur?.());
  };

  private onClickPostsCancel = () => {
    const dropdownButton = this.el.shadowRoot.querySelector(
      `[data-row="${this.item.ID}"] streamline-ui-dropdown`
    );

    state.entriesEditing = {
      ...state.entriesEditing,
      [this.item.ID]: {
        ...state.entriesEditing?.[this.item.ID],
        active: false,
      },
    };

    this.el.shadowRoot
      .querySelectorAll(`[data-row="${this.item.ID}"] input[data-id]`)
      .forEach((itemNested) => {
        (itemNested as HTMLInputElement).value =
          state.entriesEditing[this.item.ID].values[
            itemNested.getAttribute('data-id')
          ].defaultValue;
        (itemNested as HTMLInputElement)?.blur?.();
      });

    dropdownButton.classList.remove('!opacity-100');
  };

  private onClick = (e) =>
    this.isAction
      ? this.onClickAction()
      : this.isSite
      ? this.onClickSite()
      : this.isPost && window.innerWidth <= 639
      ? e.preventDefault()
      : false;

  private onDblClick = (e) => {
    if (this.isPost && window.innerWidth <= 639) {
      e.preventDefault();
      state.drawer = {
        ...state.drawer,
        active: true,
        title: `Editing: ${this.item.post_title}`,
        onSave: () => {
          save(this.item, state.drawer.values);
        },
        items: Object.values(this.table as unknown)
          .map((itemInner) => {
            return (
              itemInner.edit && {
                id: itemInner.id,
                value: this.item[itemInner.id],
                label: itemInner.name,
              }
            );
          })
          .filter((x) => x),
      };
    }
  };

  private dropdown() {
    return [
      !this.isEdit && {
        text: this.isFav ? 'Unfavourite' : 'Favourite',
        onClick: () => {
          this.setFav();
          this.checkIfFavourite();
        },
      },
      this.isPost && {
        text: this.isEdit ? 'Save' : 'Edit Inline',
        onClick: this.isEdit
          ? () => this.onClickPostsEditToggle(false)
          : () => this.onClickPostsEditToggle(true),
      },
      this.isPost &&
        this.isEdit && {
          text: 'Cancel',
          onClick: this.onClickPostsCancel,
        },
      this.isPost &&
        !this.isEdit && { text: 'View Post', href: this.item.guid },
      this.isPost &&
        !this.isEdit && {
          text: 'Edit Post',
          href: atob(this.item.hrefEdit || ''),
        },
    ];
  }

  render() {
    return (
      <li
        class={`pointer-events-auto relative select-all`}
        data-row={this.item.ID || this.item.guid}
      >
        <a
          ref={(el) => (this.button = el as HTMLElement)}
          tabindex={this.isEdit || this.disabled ? -1 : 0}
          href={this.item.href || this.item.guid}
          class={{
            'sl-px focus-inner focus-white peer relative inline-block flex h-10 w-full cursor-pointer flex-wrap items-center text-sm font-medium text-slate-900 sm:hover:bg-slate-50 sm:hover:text-blue-600':
              true,
            'pointer-events-none':
              (this.isCurrentSite && this.isSite) ||
              this.isEdit ||
              this.disabled,
            '!text-slate-500': this.disabled,
          }}
          onClick={this.onClick}
          onDblClick={this.onDblClick}
          onMouseDown={(e) => e.preventDefault()}
          onKeyPress={this.onKeyPress}
        >
          {((this.isFav && state.active !== 'fav') ||
            (this.isCurrentSite && state.active === 'site')) && (
            <span
              class={`absolute left-px top-1/2 mr-2 flex -translate-y-1/2 sm:left-2 lg:left-3.5`}
            >
              {!this.isAction && this.isFav ? (
                <span class={`inline-block scale-50 text-rose-500 sm:scale-75`}>
                  <Icon icon={IconHeart} />
                </span>
              ) : (
                !this.isAction && (
                  <span
                    class={`inline-block scale-50 text-green-600 sm:scale-100`}
                  >
                    <Icon icon={IconCheck} />
                  </span>
                )
              )}
            </span>
          )}
          {!this.isTable && this.item.name}
        </a>
        {this.isTable && (
          <div class="sl-px sl-grid pointer-events-none absolute top-0 w-full text-slate-700 sm:peer-hover:text-blue-600">
            {this.table.map((itemNested) => {
              return (
                <div class={`relative flex h-10 items-center`}>
                  {itemNested.text ? (
                    itemNested.text?.(this.item)
                  ) : (
                    <input
                      title={this.item[itemNested.id]}
                      data-id={itemNested.id}
                      type="text"
                      tabindex={itemNested.edit && this.isEdit ? 0 : -1}
                      disabled={!itemNested.edit && this.isEdit}
                      class={{
                        'focus-none pointer-events-none absolute -top-px left-0 h-[42px] w-4/5 select-text truncate bg-transparent text-sm font-medium leading-none':
                          true,
                        // @ts-ignore
                        '!pointer-events-auto text-green-600 placeholder-rose-600':
                          this.isEdit && itemNested.edit,
                      }}
                      value={this.item[itemNested.id]}
                      placeholder="No value"
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
        {this.isDropdown && (
          <streamline-dropdown
            class="absolute top-0 right-4 block hidden h-full w-12 opacity-0 focus-within:opacity-100 hover:opacity-100 peer-hover:opacity-100 sm:right-8 sm:block lg:right-12"
            type="entry"
            items={this.dropdown()}
          />
        )}
      </li>
    );
  }
}
