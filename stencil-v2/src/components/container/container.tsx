// eslint-disable-next-line no-unused-vars
import { Component, h, Host, Prop, Method, getAssetPath } from '@stencil/core';
import { state } from '../../store/internal';
import { isAnimation } from '../../utils/is/isAnimation';
import { setupEntries } from '../../utils/entries/setupEntries';

@Component({
  tag: 'streamline-container',
  styleUrl: '../../css/tailwind.scss',
  shadow: true,
  assetsDirs: ['test'],
})
export class StreamlineContainer {
  @Prop() visible: false;
  @Prop() network: false;
  @Prop() test: false;

  connectedCallback() {
    state.isVisible = this.visible;

    if (this.test) {
      state.test = true;
      ['entriesMenu', 'entriesFav'].forEach((item) => {
        fetch(getAssetPath(`./test/${item}.json`))
          .then((res) => res.json())
          .then((data) => (state[item] = data));
      });
    }
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
            'pointer-events-auto opacity-100': state.isVisible,
            'pointer-events-none opacity-0': !state.isVisible,
          }}
        >
          <div
            class={{
              'fixed top-0 left-0 h-full w-full bg-black/90 backdrop-blur-sm':
                true,
              'opacity-0': !state.isVisible,
              'opacity-100': state.isVisible,
              'transition duration-100 ease-in': isAnimation(),
            }}
            onClick={() => (state.isVisible = false)}
          />
          <div
            class={{
              'absolute grid h-full max-h-[600px] w-full max-w-screen-md overflow-hidden bg-white md:rounded-2xl':
                true,
              'translate-y-4 opacity-0': !state.isVisible,
              'opacity-100': state.isVisible,
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
                {state.isLoading ? (
                  <div class="flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      focusable="false"
                      class="h-6 w-6 animate-spin"
                      role="img"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M460.116 373.846l-20.823-12.022c-5.541-3.199-7.54-10.159-4.663-15.874 30.137-59.886 28.343-131.652-5.386-189.946-33.641-58.394-94.896-95.833-161.827-99.676C261.028 55.961 256 50.751 256 44.352V20.309c0-6.904 5.808-12.337 12.703-11.982 83.556 4.306 160.163 50.864 202.11 123.677 42.063 72.696 44.079 162.316 6.031 236.832-3.14 6.148-10.75 8.461-16.728 5.01z"
                      />
                    </svg>
                  </div>
                ) : (
                  <streamline-dropdown
                    type="main"
                    items={[
                      {
                        text: 'Settings',
                        onClick: () => (state.active = 'settings'),
                      },
                    ]}
                  />
                )}
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
