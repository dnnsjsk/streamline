// eslint-disable-next-line no-unused-vars
import { Component, h } from '@stencil/core';
import { state } from '../../store/internal';
import { isBoolean, isNumber } from 'lodash-es';
import { isAnimation } from '../../utils/is/isAnimation';
import { Keys } from '../../elements/Keys';
import { setEntries } from '../../utils/entries/setEntries';

@Component({
  tag: 'streamline-settings',
  styleUrl: '../../css/tailwind.scss',
  shadow: true,
})
// eslint-disable-next-line no-unused-vars
export class StreamlineSettings {
  componentWillLoad() {
    state.entriesSettingsActive = state.entriesSettings;
    state.entriesSettingsSave = state.entriesSettingsLoad;
    setEntries();
  }

  private onChange = (idParent, id, value) => {
    state.entriesSettingsSave = {
      ...state.entriesSettingsSave,
      ...{
        [idParent]: {
          ...state.entriesSettingsSave[idParent],
          ...{
            [id]: value,
          },
        },
      },
    };
  };

  render() {
    return Object.values(state.entriesSettingsActive).map((item) => {
      return (
        <div>
          <streamline-header item={item} />
          <ul class="sl-px space-y-4 sm:space-y-6">
            {Object.values(item.children as unknown).map((itemInner) => {
              const innerId = itemInner.id;

              return (
                <li key={itemInner.name} class="flex flex-col">
                  <h2 class="sl-h2 mt-4 mb-3 inline-block space-y-2 pb-2 !text-sm !text-slate-500">
                    {itemInner.name}
                  </h2>
                  {itemInner.children && (
                    <ul class={`flex flex-col space-y-5`}>
                      {Object.values(itemInner.children as unknown).map(
                        (itemSub) => {
                          const subId = itemSub.id;
                          const setting =
                            state.entriesSettingsLoad[innerId][subId];

                          return (
                            <li key={itemSub.id} class={`flex items-center`}>
                              <label
                                htmlFor={`setting-${itemSub.id}`}
                                class={{
                                  'group grid w-full cursor-pointer select-none gap-2 sm:grid-cols-[90px,1fr] sm:gap-6':
                                    true,
                                  'cursor-pointer': !itemSub.choices,
                                }}
                              >
                                <div
                                  class={{
                                    'focus-within-offset relative mt-0.5 inline-block h-[max-content]':
                                      true,
                                    'w-[max-content] rounded-full':
                                      isBoolean(setting),
                                    'w-full rounded-md': !isBoolean(setting),
                                  }}
                                >
                                  {itemSub.choices ? (
                                    <select
                                      class="form-select w-full !rounded-lg !border-slate-400"
                                      onInput={(e) =>
                                        this.onChange(
                                          innerId,
                                          subId,
                                          (e.target as HTMLInputElement).value
                                        )
                                      }
                                    >
                                      {Object.entries(itemSub.choices).map(
                                        ([key, value]) => {
                                          return (
                                            (itemSub.id === 'mode' ||
                                              key === 'last') && (
                                              <option
                                                selected={setting === key}
                                                value={key}
                                              >
                                                {value}
                                              </option>
                                            )
                                          );
                                        }
                                      )}
                                    </select>
                                  ) : isNumber(setting) ? (
                                    <input
                                      id={`setting-${itemSub.id}`}
                                      type="number"
                                      class="focus-none form-input w-full !rounded-lg !border-slate-400 !py-1.5"
                                      min={10}
                                      value={setting}
                                      onInput={(e) =>
                                        this.onChange(
                                          innerId,
                                          subId,
                                          parseInt(
                                            (e.target as HTMLInputElement).value
                                          )
                                        )
                                      }
                                    />
                                  ) : (
                                    [
                                      <input
                                        type="checkbox"
                                        id={`setting-${itemSub.id}`}
                                        class="peer sr-only rounded-full"
                                        checked={setting}
                                        onClick={(e) =>
                                          this.onChange(
                                            innerId,
                                            subId,
                                            (e.target as HTMLInputElement)
                                              .checked
                                          )
                                        }
                                        onInput={(e) =>
                                          this.onChange(
                                            innerId,
                                            subId,
                                            (e.target as HTMLInputElement)
                                              .checked
                                          )
                                        }
                                      />,
                                      <div
                                        class={{
                                          'block h-6 w-12 rounded-full bg-slate-300 group-hover:bg-slate-400 peer-checked:bg-blue-600':
                                            true,
                                          'transition duration-200 ease-in-out':
                                            isAnimation(),
                                        }}
                                      />,
                                      <div
                                        class={{
                                          'dot absolute left-1 top-1 h-4 w-4 rounded-full bg-white peer-checked:translate-x-[24px]':
                                            true,
                                          'transition duration-200 ease-in-out':
                                            isAnimation(),
                                        }}
                                      />,
                                    ]
                                  )}
                                </div>
                                <div class={`mt-0.5 w-full sm:mt-0`}>
                                  <div
                                    class={`flex items-end justify-between text-base font-medium text-slate-900`}
                                  >
                                    {itemSub.name}
                                    {itemSub.keys && (
                                      <div
                                        class={{
                                          'keys mt-[-6px] hidden space-x-2 sm:flex':
                                            true,
                                          'opacity-50': !setting,
                                          'transition duration-100 ease-in':
                                            isAnimation(),
                                        }}
                                      >
                                        <Keys keys={itemSub.keys} />
                                      </div>
                                    )}
                                  </div>
                                  <div class={`mt-0.5 text-xs text-slate-500`}>
                                    {itemSub.label}
                                  </div>
                                </div>
                              </label>
                            </li>
                          );
                        }
                      )}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      );
    });
  }
}
