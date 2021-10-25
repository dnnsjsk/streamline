// eslint-disable-next-line no-unused-vars
import { Component, h, Prop, Method, Host } from '@stencil/core';
import { stateInternal } from '../../store/internal';
import { setSearchPlaceholder } from '../../utils/setSearchPlaceholder';
import { setTestData } from '../../utils/setTestData';

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

    if (stateInternal.test) {
      setTestData();
    }

    document.addEventListener('keydown', (e) => {
      e.preventDefault();

      const isGutenberg = document.body.classList.contains('block-editor-page');

      if (e.key === 'k' && e.metaKey && !isGutenberg) {
        stateInternal.visible = !stateInternal.visible;
      }

      if (e.key === 'k' && e.metaKey && e.shiftKey && isGutenberg) {
        stateInternal.visible = !stateInternal.visible;
      }

      if (e.key === 'Escape') {
        stateInternal.visible = false;
      }
    });
  }

  componentDidLoad() {
    setSearchPlaceholder();
  }

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
              class="fixed top-0 left-0 w-full h-full bg-black/90 backdrop-blur-sm"
              onClick={() => (stateInternal.visible = false)}
            />
            <streamline-box />
          </div>
        )}
      </Host>
    );
  }
}
