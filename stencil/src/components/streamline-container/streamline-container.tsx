// eslint-disable-next-line no-unused-vars
import { Component, h, Prop, Method, Host, Element } from '@stencil/core';
import { state } from '../../store/internal';
import { setSearchPlaceholder } from '../../utils/setSearchPlaceholder';
import { stateLocal } from '../../store/local';
import { getMenus } from '../../utils/getMenus';
import { getMetaKey } from '../../utils/getMetaKey';
import { setTestData } from '../../utils/setTestData';
import { setEntries } from '../../utils/setEntries';
import { focusSearch } from '../../utils/focusSearch';
import { Dropdown } from '../../elements/Dropdown';

/**
 * Container.
 */
@Component({
  tag: 'streamline-container',
  shadow: true,
  styleUrl: 'streamline-container.scss',
})
export class StreamlineContainer {
  // eslint-disable-next-line no-undef
  @Element() el: HTMLStreamlineContainerElement;

  @Prop({ mutable: true }) mac = false;

  // eslint-disable-next-line @stencil/strict-mutable
  @Prop({ reflect: true, mutable: true }) visible: boolean;

  connectedCallback() {
    if (state.test) {
      setTestData();
    }

    setEntries();

    state.isMac = this.mac || navigator.userAgent.indexOf('Mac OS X') !== -1;

    state.entriesSettingsActive = state.entriesSettings;
    state.entriesSettings[0].children.forEach((item) => {
      item.children.forEach((itemInner) => {
        state.entriesSettingsLoad[itemInner.id] = {
          default:
            JSON.parse(state.data.settings)[itemInner.id]?.default ??
            state.entriesSettingsLoad[itemInner.id].default,
        };
      });
    });
    state.entriesSettingsSave = state.entriesSettingsLoad;

    document.addEventListener('keydown', (e) => {
      if (e.key === 'k' && getMetaKey(e)) {
        e.preventDefault();
        state.visible = !state.visible;
      }

      if (state.visible) {
        if (
          e.key === 'ArrowUp' &&
          getMetaKey(e) &&
          state.entriesSettingsLoad.keyNavigationTabs.default
        ) {
          e.preventDefault();
          this.cycleTabs('up');
        }

        if (
          e.key === 'ArrowDown' &&
          getMetaKey(e) &&
          state.entriesSettingsLoad.keyNavigationTabs.default
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
  }

  private cycleTabs = (mode) => {
    const index = state.menus.indexOf(stateLocal.active);
    const length = state.menus.length;

    if (mode === 'up') {
      if (index === 0) {
        stateLocal.active = state.menus[length - 1];
      } else {
        stateLocal.active = state.menus[index - 1];
      }
    }

    if (mode === 'down') {
      if (index + 1 === length) {
        stateLocal.active = state.menus[0];
      } else {
        stateLocal.active = state.menus[index + 1];
      }
    }

    getMenus();
  };

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
        network: {
          ...state.menu.network,
          condition: type,
        },
      },
    };
  }

  render() {
    return (
      <Host>
        <div
          class={`fixed top-0 left-0 w-full h-full z-[9999999999999999] ${
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
          <div class="inner w-full h-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[1000px] max-h-[700px] bg-white overflow-hidden grid">
            <streamline-sidebar />
            <div class="h-full w-full absolute bottom-[var(--sl-side-w)] h-[calc(100%-var(--sl-side-w))] sm:bottom-0 sm:left-[var(--sl-side-w)] sm:w-[calc(100%-var(--sl-side-w))] sm:top-0 sm:h-full">
              <div
                class={`bg-slate-50 grid grid-cols-[1fr,var(--sl-side-w)] lg:grid-cols-[1fr,64px]`}
              >
                <streamline-search class="h-[var(--sl-side-w)] w-full lg:h-[64px]" />
                <Dropdown
                  classOuter={`w-full relative !opacity-100 !pointer-events-auto`}
                  items={[
                    {
                      text: state.isHelp ? 'Close help' : 'Show help',
                      onClick: () => {
                        state.isHelp = !state.isHelp;
                      },
                    },
                  ]}
                />
              </div>
              <streamline-entries />
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
