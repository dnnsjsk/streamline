// eslint-disable-next-line no-unused-vars
import { Component, h, Prop } from '@stencil/core';
import { state } from '../../store/internal';
import { capitalizeFirstLetter } from '../../utils/string/capitalizeFirstLetter';
import { setSearchPlaceholder } from '../../utils/set/setSearchPlaceholder';
import { Icon } from '../../elements/Icon';
import { Button } from '../../elements/Button';
import IconMenu from '../../../node_modules/@fortawesome/fontawesome-pro/svgs/regular/bars.svg';
import IconNetwork from '../../../node_modules/@fortawesome/fontawesome-pro/svgs/regular/chart-network.svg';
import IconPost from '../../../node_modules/@fortawesome/fontawesome-pro/svgs/regular/feather-pointed.svg';
import IconSites from '../../../node_modules/@fortawesome/fontawesome-pro/svgs/regular/sitemap.svg';
import IconSettings from '../../../node_modules/@fortawesome/fontawesome-pro/svgs/regular/gear.svg';
import IconAction from '../../../node_modules/@fortawesome/fontawesome-pro/svgs/regular/rocket-launch.svg';
import IconTear from '../../../node_modules/@fortawesome/fontawesome-pro/svgs/regular/face-smile-tear.svg';
import IconTimes from '../../../node_modules/@fortawesome/fontawesome-pro/svgs/regular/xmark.svg';
import IconFilterSlash from '../../../node_modules/@fortawesome/fontawesome-pro/svgs/regular/filter-slash.svg';
import IconArrowLeft from '../../../node_modules/@fortawesome/fontawesome-pro/svgs/regular/arrow-left.svg';
import IconArrowRight from '../../../node_modules/@fortawesome/fontawesome-pro/svgs/regular/arrow-right.svg';
import { post } from '../../utils/query/post';
import { setEntries } from '../../utils/entries/setEntries';
import { get } from '../../utils/query/get';

@Component({
  tag: 'streamline-header',
  styleUrl: '../../css/tailwind.scss',
  shadow: true,
})
export class StreamlineHeader {
  @Prop() item = {
    ID: 1,
    adminUrl: '',
    guid: '',
    href: '',
    hrefEdit: '',
    isMultisite: false,
    name: '',
    path: '',
    post_title: '',
    route: '',
    siteId: 1,
    tab: '',
    title: '',
    type: '',
  };
  @Prop() mb;

  render() {
    const active = capitalizeFirstLetter(state.active);

    const isQuery = this.item.type === 'post' || this.item.type === 'site';
    const isMenu =
      this.item.type === 'menu' || this.item.type === 'networkMenu';
    const isQueryMode = state.active === 'site' || state.active === 'post';

    const isQueryWithClose = isQueryMode && state[`entries${active}Query`];

    const path =
      this.item.isMultisite && state.active !== 'site'
        ? ` <span class="text-slate-300">∙</span> subsite: ${this.item.path}`
        : '';

    return (
      <div
        class={{
          'sl-px': true,
          '!mb-0': this.mb,
        }}
      >
        <div>
          <div class={`absolute -left-full top-0 z-[-1] h-full bg-white`} />
          <div class={`flex max-w-full flex-row items-center`}>
            <div
              class={{
                'relative mr-3 flex w-4 flex-shrink-0 rounded-lg text-blue-600':
                  true,
                'ml-9': isQueryWithClose,
              }}
            >
              {this.item.type === 'menu' || state.active === 'menu' ? (
                <Icon icon={IconMenu} />
              ) : this.item.type === 'networkMenu' ||
                state.active === 'networkMenu' ? (
                <Icon icon={IconNetwork} />
              ) : this.item.type === 'post' || state.active === 'post' ? (
                <Icon icon={IconPost} />
              ) : this.item.type === 'settings' ||
                state.active === 'settings' ? (
                <Icon icon={IconSettings} />
              ) : this.item.type === 'site' || state.active === 'site' ? (
                <Icon icon={IconSites} />
              ) : this.item.type === 'action' ? (
                <Icon icon={IconAction} />
              ) : (
                this.item.type === undefined && <Icon icon={IconTear} />
              )}
            </div>
            {isQueryWithClose && (
              <Button
                type="back"
                icon={<Icon icon={IconTimes} />}
                onClick={() => {
                  state[`entries${active}CurrentPage`] = 1;
                  state[`entries${active}Query`] = '';
                  state[`entries${active}`] = [];
                  state[`entries${active}Active`] = [];
                  setSearchPlaceholder();
                }}
              />
            )}
            <h1
              class={
                'mr-6 truncate whitespace-nowrap text-base font-semibold text-slate-900'
              }
              innerHTML={`${
                this.item.title
                  ? this.item.title
                  : this.item.type === 'networkMenu'
                  ? 'Network admin'
                  : isMenu
                  ? 'Admin menu' + path
                  : (state.active === 'post' || state.active === 'site') &&
                    state[`entries${active}`][0]?.queryValue
                  ? `${active}s for: ` +
                    `<span class="text-slate-400 italic">${
                      state[
                        `entries${state.active === 'post' ? 'Post' : 'Site'}`
                      ][0]?.queryValue
                    }</span>` +
                    path
                  : isQuery && state.active === 'fav'
                  ? `${capitalizeFirstLetter(this.item.type)}s` + path
                  : isQueryMode && !state[`entries${active}Query`]
                  ? `No query, search for a ${state.active} in the search bar`
                  : state.active === 'settings'
                  ? 'Settings'
                  : this.item.type === 'action'
                  ? 'Actions'
                  : 'No results'
              }`}
            />
          </div>
        </div>
        <div>
          {[
            {
              type: 'button',
              text: 'Save',
              condition: state.active === 'settings',
              onClick: () => {
                state.entriesPostCurrentPage = 1;

                if (!state.test) {
                  post({
                    route: 'update/settings',
                    type: 'settings',
                    values: state.entriesSettingsSave,
                    callback: () => {
                      if (
                        state.entriesSettingsLoad.query.amount !==
                          // @ts-ignore
                          state.entriesSettingsSave.query.amount &&
                        !state.test
                      ) {
                        state.entriesPost = [];
                        state.entriesPostQuery = '';
                      }
                      // @ts-ignore
                      state.entriesSettingsLoad = state.entriesSettingsSave;
                    },
                  });
                } else {
                  // @ts-ignore
                  state.entriesSettingsLoad = state.entriesSettingsSave;
                }
              },
            },
          ].map((itemInner) => {
            return (
              itemInner.condition && (
                <Button
                  onClick={
                    state.entriesSettingsHaveChanged && itemInner.onClick
                  }
                  tabindex={state.entriesSettingsHaveChanged ? 0 : -1}
                  disabled={!state.entriesSettingsHaveChanged}
                  type="primary"
                  text={itemInner.text}
                />
              )
            );
          })}
          <div
            class={`pagination grid auto-cols-max grid-flow-col gap-2 empty:hidden`}
          >
            {[
              {
                condition: state?.sort?.[this.item.type],
                type: 'transparent',
                icon: <Icon icon={IconFilterSlash} />,
                onClick: () => {
                  setEntries(this.item.type);
                },
              },
              {
                condition: false,
                type: 'secondary',
                icon: <Icon icon={IconArrowLeft} />,
                disabled: state[`entries${active}CurrentPage`] === 1,
                action: 'prev',
                onClick: false,
              },
              {
                condition: false,
                type: 'secondary',
                icon: <Icon icon={IconArrowRight} />,
                disabled: state[`entries${active}CurrentPage`] === 1,
                action: 'next',
                onClick: false,
              },
            ].map((itemInner) => {
              return (
                itemInner.condition && (
                  <Button
                    type={itemInner.type}
                    icon={itemInner.icon}
                    disabled={itemInner.disabled}
                    onClick={
                      itemInner.action === 'prev' || itemInner.action === 'next'
                        ? () => {
                            state[`entries${active}CurrentPage`] =
                              itemInner.action === 'next'
                                ? state[`entries${active}CurrentPage`] + 1
                                : state[`entries${active}CurrentPage`] - 1;

                            if (!state.test) {
                              get({
                                route: `get/${state.active}s`,
                                type: state.active,
                                value: state[`entries${active}Query`],
                              });
                            } else {
                              setEntries();
                            }
                          }
                        : itemInner.onClick
                    }
                  />
                )
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
