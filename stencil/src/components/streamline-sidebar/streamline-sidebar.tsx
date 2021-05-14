// eslint-disable-next-line no-unused-vars
import { Component, h } from '@stencil/core';

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
      <nav class="container">
        <streamline-button type="is-sidebar is-primary" icon="wordpress" />
        <streamline-button type="is-sidebar" text="Menu" icon="menu" />
        <streamline-button type="is-sidebar" text="Tasks" icon="tasks" />
      </nav>
    );
  }
}
