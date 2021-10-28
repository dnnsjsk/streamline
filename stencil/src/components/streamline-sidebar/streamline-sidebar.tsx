// eslint-disable-next-line no-unused-vars
import { Component, h } from '@stencil/core';
import { stateInternal } from '../../store/internal';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';

/**
 * Sidebar.
 */
@Component({
  tag: 'streamline-sidebar',
  shadow: true,
  styleUrl: 'streamline-sidebar.scss',
})
export class StreamlineSidebar {
  render() {
    return (
      <nav
        class={`bg-blue-gray-50 h-full w-[var(--sl-side-w)] flex flex-col border-r border-blue-gray-300 overflow-visible`}
      >
        <streamline-button
          type="primary"
          icon="wordpress"
          onClick={() => (stateInternal.visible = false)}
        />
        <div class={`flex flex-col h-full`}>
          {Object.values(stateInternal.menu).map((item) => {
            return (
              <streamline-button
                class={`${item.name === 'settings' ? 'mt-auto' : ''}`}
                type="sidebar"
                text={capitalizeFirstLetter(item.name)}
                icon={item.name}
              />
            );
          })}
        </div>
      </nav>
    );
  }
}
