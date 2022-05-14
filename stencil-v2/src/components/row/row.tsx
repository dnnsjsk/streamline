// eslint-disable-next-line no-unused-vars
import { Component, Element, h, Prop } from '@stencil/core';
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
  styleUrl: '../../css/tailwind.scss',
  shadow: true,
})
export class StreamlineRow {
  // eslint-disable-next-line no-undef
  @Element() el: HTMLStreamlineRowElement;

  @Prop() item;
  @Prop() table;
  @Prop() mb;

  render() {
    let isFav = false;

    const isEdit = state.entriesEditing?.[this.item.ID]?.active;

    const isAction = this.item.type === 'action';
    const isActionInactive = isAction && state.searchValue === '';
    const isSite = this.item.type === 'site';
    const isHistory = this.item.type === 'history';
    const isPost = this.item.type === 'post';
    const isMenu =
      this.item.type === 'menu' || this.item.type === 'networkMenu';
    const isDropdown = isPost || isMenu;
    const isCurrentSite = parseInt(this.item.siteId) === state.currentSite.id;
    const isTable = isSite || isPost;

    const checkIfFavourite = () => {
      isFav =
        this.item.type === 'history'
          ? false
          : someDeep(
              state.entriesFav,
              (o) => {
                return isMenu
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

    checkIfFavourite();

    const setFav = () =>
      setFavourite({
        favourite: isFav,
        callback: checkIfFavourite,
        type: this.item.type,
        filter: (o) => {
          return isMenu
            ? o.href === this.item.href && o.adminUrl === this.item.adminUrl
            : o.ID === this.item.ID && o.siteId === this.item.siteId;
        },
        path: (o) => {
          return o.type === this.item.type && o.siteId === this.item.siteId;
        },
        pathFav: (o) => {
          return isMenu
            ? o.path === this.item.path && o.siteId === this.item.siteId
            : o.ID === this.item.ID &&
                o.siteId === this.item.siteId &&
                o.post_title === this.item.post_title;
        },
      });

    const onKeyPress = (e) => {
      if (e.key === 'Enter') {
        if (isAction) {
          onClickAction();
        }
        if (isHistory) {
          onClickHistory();
        }
        if (isSite) {
          onClickSite();
        }
      }
    };

    const onClickAction = () => {
      get({
        route: this.item.route,
        type: this.item.tab,
        value: state.searchValue,
        tab: this.item.tab,
        callback: () => (state.active = this.item.tab),
      });
    };

    const onClickHistory = () => {
      get({
        route: `get/${state.active}s`,
        type: state.active,
        value: this.item.name,
        id: this.item.siteId,
      });
    };

    const onClickSite = () => {
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

    const onClickPostsEditToggle = (edit) => {
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
              [this.item.getAttribute('data-id')],
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

    const onClickPostsCancel = () => {
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

    const onClick = (e) =>
      isAction
        ? onClickAction()
        : isHistory
        ? onClickHistory()
        : isSite
        ? onClickSite()
        : isPost && window.innerWidth <= 639
        ? e.preventDefault()
        : false;

    const onDblClick = (e) => {
      if (isPost && window.innerWidth <= 639) {
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

    const dropdown = [
      !isEdit && { text: isFav ? 'Unfavourite' : 'Favourite', onClick: setFav },
      isPost && {
        text: isEdit ? 'Save' : 'Edit Inline',
        onClick: isEdit
          ? () => onClickPostsEditToggle(false)
          : () => onClickPostsEditToggle(true),
      },
      isPost &&
        isEdit && {
          text: 'Cancel',
          onClick: onClickPostsCancel,
        },
      isPost && !isEdit && { text: 'View Post', href: this.item.guid },
      isPost &&
        !isEdit && { text: 'Edit Post', href: atob(this.item.hrefEdit) },
    ];

    return (
      <li
        class={`relative`}
        data-entry={true}
        data-row={this.item.ID || this.item.guid}
      >
        <a
          data-focus={!isActionInactive && true}
          tabindex={isEdit || isActionInactive ? -1 : 0}
          href={state.test ? '#0' : this.item.href || this.item.guid}
          class={{
            'sl-px focus-inner focus-white peer relative inline-block flex h-4 h-10 w-full cursor-pointer flex-wrap items-center text-sm font-medium text-slate-900 sm:hover:bg-slate-50 sm:hover:text-blue-600':
              true,
            'pointer-events-none':
              (isCurrentSite && isSite) || isEdit || isActionInactive,
            '!text-slate-400': isActionInactive,
          }}
          onClick={onClick}
          onDblClick={onDblClick}
          onMouseDown={(e) => e.preventDefault()}
          onKeyPress={onKeyPress}
        >
          {((isFav && state.active !== 'fav') ||
            (isCurrentSite && state.active === 'site')) && (
            <span
              class={`absolute left-px top-1/2 mr-2 flex -translate-y-1/2 sm:left-2 lg:left-4`}
            >
              {isFav ? (
                <span class={`inline-block scale-50 text-rose-500 sm:scale-75`}>
                  <Icon icon={IconHeart} />
                </span>
              ) : (
                <span
                  class={`inline-block scale-50 text-green-600 sm:scale-100`}
                >
                  <Icon icon={IconCheck} />
                </span>
              )}
            </span>
          )}
          {!isTable && this.item.name}
        </a>
        {isTable && (
          <div class="sl-px sl-grid pointer-events-none absolute top-0 w-full text-slate-700 sm:peer-hover:text-blue-600">
            {this.table.map((itemNested) => {
              return (
                <div class={`relative flex h-4 items-center`}>
                  {itemNested.text ? (
                    itemNested.text?.(this.item)
                  ) : (
                    <input
                      title={this.item[itemNested.id]}
                      data-id={itemNested.id}
                      type="text"
                      tabindex={itemNested.edit && isEdit ? 0 : -1}
                      disabled={!itemNested.edit && isEdit}
                      class={{
                        'focus-none pointer-events-none absolute -top-px left-0 h-[42px] w-4/5 select-text truncate bg-transparent text-sm font-medium leading-none':
                          true,
                        // @ts-ignore
                        '!pointer-events-auto text-green-600 placeholder-rose-600':
                          isEdit && itemNested.edit,
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
        {isDropdown && (
          <streamline-dropdown
            class="absolute top-0 right-4 block hidden h-full w-12 opacity-0 focus-within:opacity-100 hover:opacity-100 peer-hover:opacity-100 sm:right-8 sm:block lg:right-12"
            type="entry"
            items={dropdown}
          />
        )}
      </li>
    );
  }
}
