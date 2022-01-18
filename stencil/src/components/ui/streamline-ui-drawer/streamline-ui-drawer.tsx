// eslint-disable-next-line no-unused-vars
import { Component, Element, h, Host } from '@stencil/core';
import { Button } from '../../../elements/Button';
import { state } from '../../../store/internal';

/**
 * Dropdown.
 */
@Component({
  tag: 'streamline-ui-drawer',
  shadow: true,
  styleUrl: 'streamline-ui-drawer.scss',
})
export class StreamlineUiDrawer {
  // eslint-disable-next-line no-undef
  @Element() el: HTMLStreamlineUiDrawerElement;

  private hide = () => {
    state.drawer = {
      ...state.drawer,
      active: false,
    };
  };

  render() {
    return (
      <Host
        class={{
          'absolute top-0 w-full h-full': true,
          'pointer-events-auto opacity-100': state.drawer.active,
          'pointer-events-none opacity-0': !state.drawer.active,
        }}
      >
        <div
          onClick={this.hide}
          class={{
            'cursor-pointer absolute left-0 top-0 h-full w-full z-[99] bg-black/80 backdrop-blur-sm duration-200 ease-in-out transition':
              true,
            'pointer-events-auto opacity-100': state.drawer.active,
            'pointer-events-none opacity-0': !state.drawer.active,
          }}
        >
          <span class="block w-full h-1/5 bottom-[80%] flex items-center justify-center text-center text-white text-base font-medium">
            Cancel and close
          </span>
        </div>
        <div
          class={{
            'grid h-full absolute flex flex-col left-0 bottom-0 h-4/5 w-full bg-white z-[100] bg-white transition duration-200 ease-in-out':
              true,
            'translate-y-full': !state.drawer.active,
            'translate-y-none': state.drawer.active,
            'grid-rows-[auto,1fr,auto]': !!state.drawer.title,
            'grid-rows-[1fr,auto]': !state.drawer.title,
          }}
        >
          {state.drawer.title && (
            <h1 class="px-4 py-8 text-center text-lg text-gray-900 font-medium">
              {state.drawer.title}
            </h1>
          )}
          <div class="p-4 pt-0 overflow-y-auto space-y-8">
            {state.drawer.items.map((item) => {
              return (
                <streamline-ui-input
                  uid={item.id}
                  label={item.label}
                  value={item.value}
                />
              );
            })}
          </div>
          <div
            class={{
              'p-4 flex items-center justify-between w-full': true,
            }}
          >
            <Button
              type="primary"
              text="Save"
              class="w-full !py-4 !text-base"
            />
          </div>
        </div>
        <div />
      </Host>
    );
  }
}
