// eslint-disable-next-line no-unused-vars
import { Component, h, Prop } from '@stencil/core';
import { state } from '../../store/internal';
import { capitalizeFirstLetter } from '../../utils/string/capitalizeFirstLetter';
import { Icon } from '../../elements/Icon';
import { Button } from '../../elements/Button';
import IconMenu from '../../../node_modules/@fortawesome/fontawesome-pro/svgs/solid/list-ul.svg';
import IconNetwork from '../../../node_modules/@fortawesome/fontawesome-pro/svgs/solid/chart-network.svg';
import IconPost from '../../../node_modules/@fortawesome/fontawesome-pro/svgs/solid/feather-pointed.svg';
import IconSites from '../../../node_modules/@fortawesome/fontawesome-pro/svgs/solid/sitemap.svg';
import IconSettings from '../../../node_modules/@fortawesome/fontawesome-pro/svgs/solid/gear.svg';
import IconAction from '../../../node_modules/@fortawesome/fontawesome-pro/svgs/solid/rocket-launch.svg';
import IconTear from '../../../node_modules/@fortawesome/fontawesome-pro/svgs/solid/face-smile-tear.svg';
import IconTimes from '../../../node_modules/@fortawesome/fontawesome-pro/svgs/solid/xmark.svg';
import IconFilterSlash from '../../../node_modules/@fortawesome/fontawesome-pro/svgs/solid/filter-slash.svg';
import IconArrowLeft from '../../../node_modules/@fortawesome/fontawesome-pro/svgs/solid/arrow-left.svg';
import IconArrowRight from '../../../node_modules/@fortawesome/fontawesome-pro/svgs/solid/arrow-right.svg';
import { post } from '../../utils/query/post';
import { setEntries } from '../../utils/entries/setEntries';
import { get } from '../../utils/query/get';

@Component({
  tag: 'streamline-header',
  styleUrl: '../../css/tailwind.scss',
  shadow: true,
})
// eslint-disable-next-line no-unused-vars
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

  render() {
    const active = capitalizeFirstLetter(state.active);
    const isQuery = this.item.type === 'post' || this.item.type === 'site';
    const isMenu =
      this.item.type === 'menu' || this.item.type === 'networkMenu';
    const isQueryMode = state.active === 'site' || state.active === 'post';
    const isQueryWithClose = isQueryMode && state[`entries${active}Query`];

    const path =
      this.item.isMultisite && state.active !== 'site' && !state.isFront
        ? ` <span class="text-slate-300">∙</span> subsite: ${this.item.path}`
        : '';

    const hasPages =
      (state.test && isQueryMode) ||
      (isQueryWithClose &&
        isQueryMode &&
        state[`entries${active}Total`] >
          state.entriesSettingsLoad.query.amount);

    const isTestNav =
      state.test && (state.active === 'post' || state.active === 'site');
    const isPagination =
      (isTestNav ||
        (hasPages && isQueryMode && state[`entries${active}Query`])) &&
      state.infoBar.pages.amount !== 1;

    return (
      <div class="sl-px grid grid-cols-[minmax(0,1fr),minmax(0,auto)] items-center justify-between">
        <div class="w-full">
          <div class={`absolute -left-full top-0 z-[-1] h-full bg-white`} />
          <div class={`flex max-w-full flex-row items-center`}>
            <div
              class={{
                'relative mr-3 flex w-4 flex-shrink-0 rounded-lg text-blue-600':
                  true,
                'ml-9': isQueryWithClose || isTestNav,
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
            {(isQueryWithClose || isTestNav) && (
              <Button
                type="back"
                icon={<Icon icon={IconTimes} />}
                onClick={() => {
                  if (!state.test) {
                    state[`entries${active}CurrentPage`] = 1;
                    state[`entries${active}Query`] = '';
                    state[`entries${active}`] = [];
                    state[`entries${active}Active`] = [];
                  }
                  state.active = 'search';
                }}
              />
            )}
            <h1
              class="mr-6 truncate whitespace-nowrap text-base font-semibold text-slate-900"
              innerHTML={`${
                // eslint-disable-next-line @stencil/strict-boolean-conditions
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
                state.entriesSiteCurrentPage = 1;

                if (!state.test) {
                  post({
                    route: 'update/settings',
                    type: 'settings',
                    values: state.entriesSettingsSave,
                    callback: () => {
                      if (
                        state.entriesSettingsLoad.query.amount !==
                          state.entriesSettingsSave.query.amount &&
                        !state.test
                      ) {
                        state.entriesPost = [];
                        state.entriesPostQuery = '';
                        state.entriesSite = [];
                        state.entriesSiteQuery = '';
                      }
                      state.entriesSettingsLoad = state.entriesSettingsSave;
                    },
                  });
                } else {
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
                condition:
                  state?.sort?.[this.item.type] &&
                  Object.values(state?.sort?.[this.item.type]).length >= 1,
                type: 'transparent',
                icon: <Icon icon={IconFilterSlash} />,
                onClick: () => {
                  setEntries(this.item.type);
                },
              },
              {
                condition: isPagination,
                type: 'secondary',
                icon: <Icon icon={IconArrowLeft} />,
                disabled: state[`entries${active}CurrentPage`] === 1,
                action: 'prev',
                onClick: false,
              },
              {
                condition: isPagination,
                type: 'secondary',
                icon: <Icon icon={IconArrowRight} />,
                disabled:
                  state[`entries${active}CurrentPage`] ===
                  state.infoBar.pages.amount,
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
                            const paginate = () => {
                              state[`entries${active}CurrentPage`] =
                                itemInner.action === 'next'
                                  ? state[`entries${active}CurrentPage`] + 1
                                  : state[`entries${active}CurrentPage`] - 1;
                            };

                            if (!state.test) {
                              get({
                                route: `get/${state.active}s`,
                                type: state.active,
                                value: state[`entries${active}Query`],
                                callback: paginate,
                              });
                            } else {
                              paginate();
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
