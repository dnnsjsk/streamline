// eslint-disable-next-line no-unused-vars
import { Component, Element, h, Host, State } from '@stencil/core';
import { Button } from '../../elements/Button';
import { state } from '../../store/internal';
import { isSaveable } from '../../utils/is/isSaveable';

/**
 * Drawer.
 */
@Component({
  tag: 'streamline-drawer',
  styleUrl: '../../css/tailwind.scss',
  shadow: true,
})
export class StreamlineDrawer {
  // eslint-disable-next-line no-undef
  @Element() el: HTMLStreamlineDrawerElement;

  @State() canSave: boolean = true;

  private close = () => {
    state.drawer = {
      ...state.drawer,
      active: false,
    };
    const save = () => {
      state.drawer = {
        active: false,
        items: [],
        onSave: null,
        title: '',
        values: {},
      };
      this.canSave = true;
    };

    if (state.test) {
      save();
    } else {
      setTimeout(save, 500);
    }
  };

  private save = () => {
    state.drawer.onSave();
    this.close();
  };

  private onInput = () => {
    this.canSave = isSaveable(
      this.el.shadowRoot.querySelectorAll('streamline-input')
    );

    state.drawer = {
      ...state.drawer,
      values: Object.fromEntries(
        [...this.el.shadowRoot.querySelectorAll('streamline-input')].map(
          (item) => [[item.getAttribute('uid')], item.value]
        )
      ),
    };
  };

  render() {
    return (
      <Host
        class={{
          'absolute top-0 h-full w-full': true,
          'pointer-events-auto': state.drawer.active,
          'pointer-events-none': !state.drawer.active,
        }}
      >
        <div
          onClick={this.close}
          class={{
            'absolute left-0 top-0 z-[99] h-full w-full cursor-pointer bg-black/80 backdrop-blur-sm transition duration-200 ease-in-out':
              true,
            'pointer-events-auto opacity-100': state.drawer.active,
            'pointer-events-none opacity-0': !state.drawer.active,
          }}
        >
          <span class="bottom-[80%] block flex h-1/5 w-full items-center justify-center text-center text-base font-medium text-white">
            Cancel and close
          </span>
        </div>
        <div
          class={{
            'absolute left-0 bottom-0 z-[100] flex grid h-full h-4/5 w-full flex-col rounded-t-3xl bg-white bg-white transition duration-200 ease-in-out':
              true,
            'translate-y-full': !state.drawer.active,
            'translate-y-none': state.drawer.active,
            'grid-rows-[auto,1fr,auto]': !!state.drawer.title,
            'grid-rows-[1fr,auto]': !state.drawer.title,
          }}
        >
          {state.drawer.title && (
            <h1 class="px-4 py-8 text-center text-lg font-medium text-gray-900">
              {state.drawer.title}
            </h1>
          )}
          <div class="space-y-8 overflow-y-auto p-4">
            {state.drawer.items.map((item) => {
              return (
                <streamline-input
                  uid={item.id}
                  label={item.label}
                  value={item.value}
                  handleInput={this.onInput}
                />
              );
            })}
          </div>
          <div
            class={{
              'flex w-full items-center justify-between p-4': true,
            }}
          >
            <Button
              onClick={this.save}
              type="primary"
              text="Save"
              class="w-full !py-4 !text-base"
              disabled={!this.canSave}
            />
          </div>
        </div>
        <div />
      </Host>
    );
  }
}
