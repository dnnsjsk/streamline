// eslint-disable-next-line no-unused-vars
import { Component, h, Prop, Method, Host } from '@stencil/core';
import { stateInternal } from '../../store/internal';
import { setSearchPlaceholder } from '../../utils/setSearchPlaceholder';
import { setTestData } from '../../utils/setTestData';
import { stateLocal } from '../../store/local';

/**
 * Container.
 */
@Component({
  tag: 'streamline-container',
  shadow: true,
  styleUrl: 'streamline-container.scss',
})
export class StreamlineContainer {
  // eslint-disable-next-line @stencil/strict-mutable
  @Prop({ reflect: true, mutable: true }) visible: boolean;

  connectedCallback() {
    stateInternal.visible = this.visible || false;
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

    if (stateInternal.test) {
      setTestData();
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'k' && (e.metaKey || e.shiftKey)) {
        e.preventDefault();
        stateInternal.visible = !stateInternal.visible;
      }

      if (stateInternal.visible) {
        if (
          e.key === 'Escape' &&
          stateInternal.entriesSettingsLoad.keyExit.default
        ) {
          e.preventDefault();
          stateInternal.visible = false;
        }

        if (
          e.key === 'ArrowUp' &&
          stateInternal.entriesSettingsLoad.keyNavigation.default
        ) {
          e.preventDefault();
          this.cycle('up');
        }

        if (
          e.key === 'ArrowDown' &&
          stateInternal.entriesSettingsLoad.keyNavigation.default
        ) {
          e.preventDefault();
          this.cycle('down');
        }
      }
    });
  }

  componentDidLoad() {
    setSearchPlaceholder();
  }

  private cycle = (mode) => {
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
  };

  @Method()
  async toggle() {
    stateInternal.visible = !stateInternal.visible;
  }

  @Method()
  async toggleTest() {
    stateInternal.testFull = !stateInternal.testFull;
  }

  render() {
    return (
      <Host>
        {stateInternal.visible && (
          <div class="fixed top-0 left-0 w-full h-full z-[9999999999999999]">
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
        )}
      </Host>
    );
  }
}
