// eslint-disable-next-line no-unused-vars
import { Component, h, Host, Prop, Method, Watch } from '@stencil/core';
import { state } from '../../store/internal';
import { isAnimation } from '../../utils/is/isAnimation';
import { setupEntries } from '../../utils/entries/setupEntries';
import { getMetaKey } from '../../utils/get/getMetaKey';
import getMenu from '../../utils/get/getMenu';

@Component({
  tag: 'streamline-container',
  styleUrl: '../../css/tailwind.scss',
  shadow: true,
  assetsDirs: ['test'],
})
// eslint-disable-next-line no-unused-vars
export class StreamlineContainer {
  @Prop() active: '';
  @Prop() test: false;

  @Watch('active')
  watchFront(value) {
    state.active = value;
  }

  connectedCallback() {
    document.addEventListener('streamline/entries', function (event: any) {
      const [key, value] = Object.entries(event.detail)[0] as any;
      const data = {
        ...state.entries,
        [key]: {
          ...(value?.info || {}),
          actions: [
            ...(state.entries[key]?.actions || []),
            ...(value?.actions || []),
          ],
          children: [
            ...(state.entries[key]?.children || []),
            ...(value?.children || []),
          ],
        },
      };
      state.entries = data;
      state.entriesActive = data;
    });

    async function dispatch({ name, url, isAdmin, condition = false }) {
      if (!condition) return;

      const children = await getMenu({
        name,
        url,
        isAdmin,
      });

      const newEvent = new CustomEvent('streamline/entries', {
        detail: {
          wordpress: {
            info: {
              name: 'WordPress',
              icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M61.7 169.4l101.5 278C92.2 413 43.3 340.2 43.3 256c0-30.9 6.6-60.1 18.4-86.6zm337.9 75.9c0-26.3-9.4-44.5-17.5-58.7-10.8-17.5-20.9-32.4-20.9-49.9 0-19.6 14.8-37.8 35.7-37.8.9 0 1.8.1 2.8.2-37.9-34.7-88.3-55.9-143.7-55.9-74.3 0-139.7 38.1-177.8 95.9 5 .2 9.7.3 13.7.3 22.2 0 56.7-2.7 56.7-2.7 11.5-.7 12.8 16.2 1.4 17.5 0 0-11.5 1.3-24.3 2l77.5 230.4L249.8 247l-33.1-90.8c-11.5-.7-22.3-2-22.3-2-11.5-.7-10.1-18.2 1.3-17.5 0 0 35.1 2.7 56 2.7 22.2 0 56.7-2.7 56.7-2.7 11.5-.7 12.8 16.2 1.4 17.5 0 0-11.5 1.3-24.3 2l76.9 228.7 21.2-70.9c9-29.4 16-50.5 16-68.7zm-139.9 29.3l-63.8 185.5c19.1 5.6 39.2 8.7 60.1 8.7 24.8 0 48.5-4.3 70.6-12.1-.6-.9-1.1-1.9-1.5-2.9l-65.4-179.2zm183-120.7c.9 6.8 1.4 14 1.4 21.9 0 21.6-4 45.8-16.2 76.2l-65 187.9C426.2 403 468.7 334.5 468.7 256c0-37-9.4-71.8-26-102.1zM504 256c0 136.8-111.3 248-248 248C119.2 504 8 392.7 8 256 8 119.2 119.2 8 256 8c136.7 0 248 111.2 248 248zm-11.4 0c0-130.5-106.2-236.6-236.6-236.6C125.5 19.4 19.4 125.5 19.4 256S125.6 492.6 256 492.6c130.5 0 236.6-106.1 236.6-236.6z"/></svg>',
            },
            children,
          },
        },
      });

      document.dispatchEvent(newEvent);
    }

    if (state.data.isNetwork) {
      dispatch({
        name: 'Network menu',
        url: state.data.networkAdminUrl,
        condition: state.data.networkAdminUrl !== false,
        isAdmin: true,
      }).then(() => {});
    }

    dispatch({
      name: 'Admin menu',
      url: state.data.adminUrl,
      condition: true,
      isAdmin: state.data.isAdmin && !state.data.isNetwork,
    }).then(() => {});
  }

  componentWillLoad() {
    state.isVisible = (window as any)?.streamlineData?.isVisible;

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
              'inner absolute grid h-full w-full max-w-screen-md overflow-hidden bg-white sm:max-h-[600px] md:rounded-xl':
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
