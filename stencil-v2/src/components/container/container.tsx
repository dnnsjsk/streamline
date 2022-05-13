// eslint-disable-next-line no-unused-vars
import { Component, h, Host, State } from '@stencil/core'
import { state } from '../../store/internal'
import { isAnimation } from '../../utils/is/isAnimation'

@Component({
  tag: 'streamline-container',
  styleUrl: 'container.scss',
  shadow: true
})

export class StreamlineContainer {
  @State() visible: boolean

  render () {
    return (
      <Host>
        <div
          class={{
            'fixed flex items-center justify-center top-0 left-0 w-full h-full z-[9999999999999999]': true,
            'opacity-100 pointer-events-auto': state.visible,
            'opacity-0 pointer-events-none': !state.visible
          }}
        >
          <div
            tabIndex={-1}
            class={{
              'backdrop-blur-sm fixed top-0 left-0 w-full h-full bg-black/90': true,
              'opacity-0': !state.visible,
              'opacity-100': state.visible,
              'ease-in duration-100 transition': isAnimation()
            }}
            onClick={() => (state.visible = false)}
          />
          <div
            class={{
              'max-w-screen-md inner w-full h-full absolute max-h-[600px] overflow-hidden grid bg-slate-900 md:rounded-xl':
                true,
              'opacity-0 translate-y-4': !state.visible,
              'opacity-100': state.visible,
              'ease-in duration-200 transition': isAnimation()
            }}
          >
            <div
              class="'w-full h-full absolute sm:bottom-0 sm:top-0'"
            >
              <div
                class="bg-slate-50 grid grid-cols-[1fr,var(--sl-side-w),var(--sl-side-w)] lg:grid-cols-[1fr,64px,64px]"
              >
                <streamline-search class="h-[var(--sl-side-w)] w-full lg:h-[64px]" />
              </div>
              <streamline-entries />
            </div>
            <streamline-ui-drawer class="sm:hidden" />
          </div>
        </div>
      </Host>
    )
  }
}
