// eslint-disable-next-line no-unused-vars
import { Component, h, Prop, Method, Host, Element } from '@stencil/core';
import { stateInternal } from '../../store/internal';
import { setSearchPlaceholder } from '../../utils/setSearchPlaceholder';
import { stateLocal } from '../../store/local';
import { getMenus } from '../../utils/getMenus';
import { getMetaKey } from '../../utils/getMetaKey';
import { setTestData } from '../../utils/setTestData';
import { setEntries } from '../../utils/setEntries';
import { focusSearch } from '../../utils/focusSearch';

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
    if (stateInternal.test) {
      setTestData();
    }

    setEntries();

    stateInternal.isMac =
      this.mac || navigator.userAgent.indexOf('Mac OS X') !== -1;

    stateInternal.entriesSettingsActive = stateInternal.entriesSettings;
    stateInternal.entriesSettings[0].children.forEach((item) => {
      item.children.forEach((itemInner) => {
        stateInternal.entriesSettingsLoad[itemInner.id] = {
          default:
            JSON.parse(stateInternal.data.settings)[itemInner.id]?.default ??
            stateInternal.entriesSettingsLoad[itemInner.id].default,
        };
      });
    });
    stateInternal.entriesSettingsSave = stateInternal.entriesSettingsLoad;

    document.addEventListener('keydown', (e) => {
      if (e.key === 'k' && getMetaKey(e)) {
        e.preventDefault();
        stateInternal.visible = !stateInternal.visible;
      }

      if (stateInternal.visible) {
        if (
          e.key === 'ArrowUp' &&
          getMetaKey(e) &&
          stateInternal.entriesSettingsLoad.keyNavigationTabs.default
        ) {
          e.preventDefault();
          this.cycleTabs('up');
        }

        if (
          e.key === 'ArrowDown' &&
          getMetaKey(e) &&
          stateInternal.entriesSettingsLoad.keyNavigationTabs.default
        ) {
          e.preventDefault();
          this.cycleTabs('down');
        }

        if (
          e.key === 'Escape' &&
          stateInternal.entriesSettingsLoad.keyExit.default
        ) {
          e.preventDefault();
          stateInternal.visible = false;
        }

        if (
          e.key === 's' &&
          getMetaKey(e) &&
          stateInternal.entriesSettingsLoad.keySearch.default
        ) {
          e.preventDefault();
          focusSearch();
        }
      }
    });
  }

  componentDidLoad() {
    setSearchPlaceholder();

    stateInternal.visible = this.visible || false;
  }

  private cycleTabs = (mode) => {
    const index = stateInternal.menus.indexOf(stateLocal.active);
    const length = stateInternal.menus.length;

    if (mode === 'up') {
      if (index === 0) {
        stateLocal.active = stateInternal.menus[length - 1];
      } else {
        stateLocal.active = stateInternal.menus[index - 1];
      }
    }

    if (mode === 'down') {
      if (index + 1 === length) {
        stateLocal.active = stateInternal.menus[0];
      } else {
        stateLocal.active = stateInternal.menus[index + 1];
      }
    }

    getMenus();
  };

  @Method()
  async toggle() {
    stateInternal.visible = !stateInternal.visible;
  }

  @Method()
  async toggleTestFull(type) {
    stateInternal.testFull = type;
    stateInternal.menu = {
      ...stateInternal.menu,
      ...{
        site: {
          ...stateInternal.menu.site,
          condition: type,
        },
        network: {
          ...stateInternal.menu.network,
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
            stateInternal.visible
              ? 'block pointer-events-auto'
              : 'hidden pointer-events-none'
          }`}
        >
          <div
            tabIndex={-1}
            class={`fixed top-0 left-0 w-full h-full bg-black/90 ${
              stateInternal.entriesSettingsLoad.appearanceBlur.default
                ? 'backdrop-blur-sm'
                : ''
            }`}
            onClick={() => (stateInternal.visible = false)}
          />
          <streamline-box />
        </div>
      </Host>
    );
  }
}
