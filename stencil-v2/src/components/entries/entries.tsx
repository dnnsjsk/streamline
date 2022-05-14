// eslint-disable-next-line no-unused-vars
import { Component, h } from '@stencil/core';
import { state } from '../../store/internal';

@Component({
  tag: 'streamline-entries',
  styleUrl: '../../css/tailwind.scss',
  shadow: true,
})
export class StreamlineEntries {
  render() {
    return (
      <div
        class={{
          'inner relative h-full w-full bg-white': true,
          'pointer-events-none opacity-50': state.isLoading,
        }}
      >
        <div class="pb-6 lg:pb-10">
          {state.active === 'settings' ? (
            <streamline-settings />
          ) : (
            <streamline-rows />
          )}
        </div>
      </div>
    );
  }
}
