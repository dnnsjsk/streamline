// eslint-disable-next-line no-unused-vars
import { Component, h, Host, Prop, Method, Watch } from '@stencil/core';
import { state } from '../../store/internal';
import { isAnimation } from '../../utils/is/isAnimation';
import { setupEntries } from '../../utils/entries/setupEntries';
import { getMetaKey } from '../../utils/get/getMetaKey';
import { getMenu } from '../../utils/get/getMenu';

@Component({
  tag: 'streamline-container',
  styleUrl: '../../css/tailwind.scss',
  shadow: true,
  assetsDirs: ['test'],
})
export class StreamlineContainer {
  @Prop() active: '';
  @Prop() test: false;
  @Prop() visible: false;

  @Watch('active')
  watchFront(value) {
    state.active = value;
  }

  componentWillLoad() {
    state.isVisible = this.visible;

    if (
      state.data?.settings &&
      Object.values(JSON.parse(state.data?.settings)).length !== 0
    ) {
      state.entriesSettings[0].children.forEach((item) => {
        item.children.forEach((itemInner) => {
          state.entriesSettingsLoad = {
            ...state.entriesSettingsLoad,
            [item.id]: {
              ...state.entriesSettingsLoad[item.id],
              [itemInner.id]:
                (state.test
                  ? state.entriesSettings
                  : JSON.parse(state.data.settings))[item.id]?.[itemInner.id] ??
                state.entriesSettingsLoad[item.id]?.[itemInner.id],
            },
          };
        });
      });
    }

    state.entriesSettingsSave = state.entriesSettingsLoad;

    ['test'].forEach((item) => {
      if (this[item]) state[item] = true;
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'k' && getMetaKey(e)) {
        e.preventDefault();
        state.isVisible = !state.isVisible;
      }

      if (state.isVisible) {
        if (state.entriesSettingsLoad.keys.navigationActive) {
          if (e.key === 'ArrowUp' && getMetaKey(e)) {
            e.preventDefault();
            this.cycleActive('up');
          }

          if (e.key === 'ArrowDown' && getMetaKey(e)) {
            e.preventDefault();
            this.cycleActive('down');
          }
        }

        if (e.key === 'Escape') {
          e.preventDefault();
          state.isVisible = false;
        }
      }
    });

    if (!state.test) {
      if (state.data.network && state.entriesNetworkMenu.length === 0) {
        getMenu({ network: true });
      }

      if (state.entriesMenu.length === 0) {
        getMenu({ network: false, adminUrl: state.data.adminUrl });
      }
    }
  }

  private cycleActive = (mode) => {
    const index = state.menus.indexOf(state.active);
    const length = state.menus.length;

    if (index === -1) {
      state.active = 'search';
      return;
    }

    if (mode === 'up') {
      if (index === 0) {
        state.active = state.menus[length - 1];
      } else {
        state.active = state.menus[index - 1];
      }
    }

    if (mode === 'down') {
      if (index + 1 === length) {
        state.active = state.menus[0];
      } else {
        state.active = state.menus[index + 1];
      }
    }
  };

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

  @Method()
  async toggle() {
    state.isVisible = !state.isVisible;
  }

  render() {
    return (
      <Host
        class={{
          'pointer-events-auto opacity-100': state.isVisible,
          'pointer-events-none opacity-0': !state.isVisible,
        }}
      >
        <div
          class={{
            'fixed top-0 left-0 z-[9999999999999999] flex h-full w-full items-center justify-center':
              true,
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
              'inner absolute grid h-full max-h-[600px] w-full max-w-screen-md overflow-hidden bg-white md:rounded-xl':
                true,
              'translate-y-4 opacity-0': !state.isVisible,
              'opacity-100': state.isVisible,
              'transition duration-200 ease-in': isAnimation(),
            }}
          >
            <div class="relative h-full">
              <div class="absolute top-0 grid w-full grid-cols-[1fr,75px] bg-slate-50">
                <div class="absolute left-0 bottom-0 z-50 h-px w-full bg-slate-200" />
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
                  <streamline-dropdown type="main" />
                )}
              </div>
              <div
                tabindex={-1}
                class="absolute top-14 h-[calc(100%-55px-24px)] w-full scroll-pt-[72px] overflow-y-scroll"
              >
                <streamline-entries />
              </div>
              <streamline-bottom-bar class="absolute bottom-0 block h-6 w-full" />
            </div>
            <streamline-drawer class="sm:hidden" />
          </div>
        </div>
      </Host>
    );
  }
}
