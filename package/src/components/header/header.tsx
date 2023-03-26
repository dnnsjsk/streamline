// eslint-disable-next-line no-unused-vars
import { Component, h, Prop } from '@stencil/core';
import { state } from '../../store/internal';
import { Icon } from '../../elements/Icon';
import { Button } from '../../elements/Button';
import IconFilterSlash from '../../../node_modules/@fortawesome/fontawesome-pro/svgs/solid/filter-slash.svg';
import IconArrowLeft from '../../../node_modules/@fortawesome/fontawesome-pro/svgs/solid/arrow-left.svg';
import IconArrowRight from '../../../node_modules/@fortawesome/fontawesome-pro/svgs/solid/arrow-right.svg';
import post from '../../utils/query/post';

@Component({
  tag: 'streamline-header',
  styleUrl: '../../css/tailwind.scss',
  shadow: true,
})
// eslint-disable-next-line no-unused-vars,@stencil-community/ban-prefix
export class StreamlineHeader {
  @Prop() item: any;

  render() {
    return (
      <div class="sl-mx grid grid-cols-[minmax(0,1fr),minmax(0,auto)] items-center justify-between border-b border-slate-200 py-2">
        <div class="w-full">
          <div class={`absolute -left-full top-0 z-[-1] h-full bg-white`} />
          <div class={`flex max-w-full flex-row items-center`}>
            {this.item.icon && (
              <div
                class="relative mr-3 flex w-4 flex-shrink-0 rounded-lg text-blue-600"
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
                post({
                  route: 'update/settings',
                  type: 'settings',
                  values: state.entriesSettingsSave,
                  callback: () => {
                    if (
                      state.entriesSettingsLoad.query.amount !==
                      state.entriesSettingsSave.query.amount
                    ) {
                      state.entriesQuery = [];
                    }
                    state.entriesSettingsLoad = state.entriesSettingsSave;
                  },
                });
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
                condition: false,
                type: 'transparent',
                icon: <Icon icon={IconFilterSlash} />,
              },
              {
                condition: false,
                type: 'secondary',
                icon: <Icon icon={IconArrowLeft} />,
                disabled: false,
                action: 'prev',
                onClick: false,
              },
              {
                condition: false,
                type: 'secondary',
                icon: <Icon icon={IconArrowRight} />,
                disabled: false,
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
