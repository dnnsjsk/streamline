// eslint-disable-next-line no-unused-vars
import { Component, h } from '@stencil/core';
import { stateInternal } from '../../store/internal';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';
import { stateLocal } from '../../store/local';
import { getMenu } from '../../utils/getMenu';

/**
 * Sidebar.
 */
@Component({
  tag: 'streamline-sidebar',
  shadow: true,
  styleUrl: 'streamline-sidebar.scss',
})
export class StreamlineSidebar {
  private handleClick = (name) => {
    stateLocal.active = name;

    if (
      stateLocal.active === 'menu' &&
      stateInternal.entriesMenu.length === 0
    ) {
      getMenu();
    }
  };

  render() {
    return (
      <nav
        class={`bg-blue-gray-900 h-full w-[var(--sl-side-w)] flex flex-col overflow-visible`}
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
                onClick={() => this.handleClick(item.name)}
                class={`${item.name === 'settings' ? 'mt-auto' : ''}`}
                type="sidebar"
                text={capitalizeFirstLetter(
                  item.name === 'fav' ? 'faves' : item.name
                )}
                icon={item.name}
              />
            );
          })}
        </div>
      </nav>
    );
  }
}
