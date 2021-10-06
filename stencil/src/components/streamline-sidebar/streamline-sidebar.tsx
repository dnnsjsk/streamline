// eslint-disable-next-line no-unused-vars
import { Component, h } from '@stencil/core';
import { stateInternal } from '../../store/internal';

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
        class={`bg-gray-50 h-full w-[var(--sl-side-w)] grid-flow-row grid auto-rows-max rounded-none border-r border-gray-300`}
      >
        <streamline-button
          type="primary"
          icon="wordpress"
          onClick={() => (stateInternal.visible = false)}
        />
        <div class={`grid-flow-row grid auto-rows-max`}>
          <streamline-button type="sidebar" text="Menu" icon="menu" />
        </div>
      </nav>
    );
  }
}
