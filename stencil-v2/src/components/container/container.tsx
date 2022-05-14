// eslint-disable-next-line no-unused-vars
import { Component, h, Host, Prop, Method } from '@stencil/core';
import { state } from '../../store/internal';
import { isAnimation } from '../../utils/is/isAnimation';
import { setupEntries } from '../../utils/entries/setupEntries';

@Component({
  tag: 'streamline-container',
  styleUrl: '../../css/tailwind.scss',
  shadow: true,
})
export class StreamlineContainer {
  @Prop() visible: boolean;

  connectedCallback() {
    state.visible = this.visible;
  }

  componentDidLoad() {
    setupEntries();
  }

  @Method()
  async setState(data) {
    return new Promise((resolve) => {
      Object.entries(data).forEach(([key, value]) => {
        if (state[key]) {
          state[key] = value;
        }
      });

      setupEntries();
      return resolve;
    });
  }

  render() {
    return (
      <Host>
        <div
          class={{
            'fixed top-0 left-0 z-[9999999999999999] flex h-full w-full items-center justify-center':
              true,
            'pointer-events-auto opacity-100': state.visible,
            'pointer-events-none opacity-0': !state.visible,
          }}
        >
          <div
            class={{
              'fixed top-0 left-0 h-full w-full bg-black/90 backdrop-blur-sm':
                true,
              'opacity-0': !state.visible,
              'opacity-100': state.visible,
              'transition duration-100 ease-in': isAnimation(),
            }}
            onClick={() => (state.visible = false)}
          />
          <div
            class={{
              'absolute grid h-full max-h-[600px] w-full max-w-screen-md overflow-hidden bg-white md:rounded-2xl':
                true,
              'translate-y-4 opacity-0': !state.visible,
              'opacity-100': state.visible,
              'transition duration-200 ease-in': isAnimation(),
            }}
          >
            <div class="relative h-full">
              <div class="absolute top-0 grid w-full grid-cols-[1fr,75px] bg-slate-50">
                <div
                  class={{
                    'absolute left-0 bottom-0 z-50 h-px w-full': true,
                    'bg-slate-200': !state.isSearchFocus,
                    '-bottom-px h-[2px] bg-blue-500': state.isSearchFocus,
                  }}
                />
                <streamline-search class="block h-14" />
                <streamline-dropdown
                  type="main"
                  items={[
                    {
                      text: 'Settings',
                      onClick: () => (state.active = 'settings'),
                    },
                  ]}
                />
              </div>
              <streamline-entries class="absolute top-14 h-[calc(100%-56px-24px)] w-full overflow-y-scroll" />
              <streamline-bottom-bar class="absolute bottom-0 h-6 w-full" />
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
