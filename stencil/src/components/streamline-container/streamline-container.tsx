// eslint-disable-next-line no-unused-vars
import { Component, h, Prop, Method, Host, Element } from '@stencil/core';
import { state } from '../../store/internal';
import { setSearchPlaceholder } from '../../utils/set/setSearchPlaceholder';
import { getMenus } from '../../utils/get/getMenus';
import { getMetaKey } from '../../utils/get/getMetaKey';
import { setEntries } from '../../utils/set/setEntries';
import { focusSearch } from '../../utils/search/focusSearch';
import { getAll } from '../../utils/get/getAll';
import { Loader } from '../../elements/Loader';

/**
 * Container.
 */
@Component({
  tag: 'streamline-container',
  shadow: true,
  styleUrl: 'streamline-container.scss',
})
export class StreamlineContainer {
  // @ts-ignore
  private tw = 'h-6 w-6 sm:h-7 sm:w-7';

  // eslint-disable-next-line no-undef
  @Element() el: HTMLStreamlineContainerElement;

  @Prop({ mutable: true }) mac = false;

  // eslint-disable-next-line @stencil/strict-mutable
  @Prop({ reflect: true, mutable: true }) visible: boolean;

  connectedCallback() {
    setEntries();

    state.isMac = this.mac || navigator.userAgent.indexOf('Mac OS X') !== -1;

    state.entriesSettingsActive = state.entriesSettings;

    if (
      state.data?.settings &&
      Object.values(JSON.parse(state.data?.settings)).length !== 0
    ) {
      state.entriesSettings[0].children.forEach((item) => {
        item.children.forEach((itemInner) => {
          state.entriesSettingsLoad[itemInner.id] = {
            default:
              (state.test
                ? state.entriesSettings
                : JSON.parse(state.data.settings))[itemInner.id]?.default ??
              state.entriesSettingsLoad[itemInner.id].default,
          };
        });
      });
    }

    state.entriesSettingsSave = state.entriesSettingsLoad;

    document.addEventListener('keydown', (e) => {
      if (e.key === 'k' && getMetaKey(e)) {
        e.preventDefault();
        if (
          state.entriesSettingsLoad.behaviourDefaultTab.default !== 'last' &&
          state.entriesSettingsLoad.mode.default === 'dashboard'
        ) {
          state.active = state.entriesSettingsLoad.behaviourDefaultTab.default;
          getMenus();
        }
        state.visible = !state.visible;
      }

      if (state.visible) {
        if (
          e.key === 'ArrowUp' &&
          getMetaKey(e) &&
          state.entriesSettingsLoad.keyNavigationTabs.default &&
          state.entriesSettingsLoad.mode.default === 'dashboard'
        ) {
          e.preventDefault();
          this.cycleTabs('up');
        }

        if (
          e.key === 'ArrowDown' &&
          getMetaKey(e) &&
          state.entriesSettingsLoad.keyNavigationTabs.default &&
          state.entriesSettingsLoad.mode.default === 'dashboard'
        ) {
          e.preventDefault();
          this.cycleTabs('down');
        }

        if (e.key === 'Escape' && state.entriesSettingsLoad.keyExit.default) {
          e.preventDefault();
          state.visible = false;
        }

        if (
          e.key === 's' &&
          getMetaKey(e) &&
          state.entriesSettingsLoad.keySearch.default
        ) {
          e.preventDefault();
          focusSearch();
        }
      }
    });
  }

  componentDidLoad() {
    setSearchPlaceholder();

    state.visible = this.visible || false;

    if (state.entriesSettingsLoad.mode.default === 'default') {
      getAll();
      state.active = 'search';
    }
  }

  private cycleTabs = (mode) => {
    const index = state.menus.indexOf(state.active);
    const length = state.menus.length;

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

    getMenus();
  };

  @Method()
  async setData(data) {
    Object.entries(data).forEach(([key, value]) => {
      state[key] = value;
      state[`${key}Active`] = value;
    });
    setEntries();
  }

  @Method()
  async toggle() {
    state.visible = !state.visible;
  }

  @Method()
  async toggleTestFull(type) {
    state.testFull = type;
    state.menu = {
      ...state.menu,
      ...{
        site: {
          ...state.menu.site,
          condition: type,
        },
        networkMenu: {
          ...state.menu.networkMenu,
          condition: type,
        },
      },
    };
  }

  render() {
    return (
      <Host>
        <div
          class={`fixed flex items-center justify-center top-0 left-0 w-full h-full z-[9999999999999999] ${
            state.visible
              ? 'block pointer-events-auto'
              : 'hidden pointer-events-none'
          }`}
        >
          <div
            tabIndex={-1}
            class={`fixed top-0 left-0 w-full h-full bg-black/90 ${
              state.entriesSettingsLoad.appearanceBlur.default
                ? 'backdrop-blur-sm'
                : ''
            }`}
            onClick={() => (state.visible = false)}
          />
          <div
            class={{
              'inner w-full h-full absolute max-h-[600px] overflow-hidden grid bg-slate-900 md:rounded-xl':
                true,
              'max-w-[calc(768px+var(--sl-side-w))]':
                state.entriesSettingsLoad.mode.default === 'dashboard',
              'max-w-screen-md':
                state.entriesSettingsLoad.mode.default === 'default',
            }}
          >
            {state.entriesSettingsLoad.mode.default === 'dashboard' && (
              <streamline-sidebar />
            )}
            <div
              class={{
                'w-full absolute sm:bottom-0 sm:top-0': true,
                'bottom-[var(--sl-side-w)] h-[calc(100%-var(--sl-side-w))] sm:w-[calc(100%-var(--sl-side-w))] sm:left-[var(--sl-side-w)] sm:h-full':
                  state.entriesSettingsLoad.mode.default === 'dashboard',
                'h-full': state.entriesSettingsLoad.mode.default === 'default',
              }}
            >
              <div
                class={{
                  'bg-slate-50 grid': true,
                  'grid-cols-[1fr,var(--sl-side-w)] lg:grid-cols-[1fr,64px]':
                    state.entriesSettingsLoad.mode.default === 'dashboard',
                  'grid-cols-[1fr,var(--sl-side-w),var(--sl-side-w)] lg:grid-cols-[1fr,64px,64px]':
                    state.entriesSettingsLoad.mode.default === 'default',
                }}
              >
                <streamline-search class="h-[var(--sl-side-w)] w-full lg:h-[64px]" />
                {state.entriesSettingsLoad.mode.default === 'default' && (
                  <div
                    class={{
                      'text-black self-center justify-self-center': true,
                      invisible:
                        !state.isLoading &&
                        state.entriesSettingsLoad.mode.default === 'default',
                    }}
                  >
                    <Loader />
                  </div>
                )}
                <streamline-ui-dropdown
                  type="main"
                  items={[
                    state.entriesSettingsLoad.mode.default === 'default' && {
                      text: state.active === 'settings' ? 'Search' : 'Settings',
                      onClick: () =>
                        state.active === 'settings'
                          ? (state.active = 'search')
                          : (state.active = 'settings'),
                    },
                    {
                      text: state.isHelp ? 'Close help' : 'Show help',
                      onClick: () => {
                        state.isHelp = !state.isHelp;
                        state.isSearch = !state.isSearch;
                      },
                    },
                    state.entriesSettingsLoad.mode.default === 'default' && {
                      text: 'Exit',
                      onClick: () => (state.visible = false),
                    },
                  ]}
                />
              </div>
              <streamline-entries />
            </div>
            <streamline-ui-drawer class="sm:hidden" />
          </div>
        </div>
      </Host>
    );
  }
}
