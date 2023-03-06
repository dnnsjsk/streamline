// eslint-disable-next-line no-unused-vars
import { Component, h, Prop } from '@stencil/core';
import { state } from '../../store/internal';
import { capitalizeFirstLetter } from '../../utils/string/capitalizeFirstLetter';
import { Icon } from '../../elements/Icon';
import { Button } from '../../elements/Button';
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
// eslint-disable-next-line no-unused-vars,@stencil-community/ban-prefix
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
    icon: '',
  };

  render() {
    const active = capitalizeFirstLetter(state.active);
    const isQueryMode = state.active === 'site' || state.active === 'post';
    const isQueryWithClose = isQueryMode && state[`entries${active}Query`];

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
      <div class="sl-mx grid grid-cols-[minmax(0,1fr),minmax(0,auto)] items-center justify-between border-b border-slate-200 py-2">
        <div class="w-full">
          <div class={`absolute -left-full top-0 z-[-1] h-full bg-white`} />
          <div class={`flex max-w-full flex-row items-center`}>
            {this.item.icon && (
              <div
                class={{
                  'relative mr-3 flex w-4 flex-shrink-0 rounded-lg text-blue-600':
                    true,
                  'ml-9': isQueryWithClose || isTestNav,
                }}
                innerHTML={this.item.icon}
              />
            )}
            <h1 class="mr-6 truncate whitespace-nowrap text-base font-semibold text-slate-900">
              {this.item.name}
            </h1>
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
