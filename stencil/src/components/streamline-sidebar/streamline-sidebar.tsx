// eslint-disable-next-line no-unused-vars
import { Component, h } from '@stencil/core';
import { state } from '../../store/internal';
import { capitalizeFirstLetter } from '../../utils/string/capitalizeFirstLetter';
import { Loader } from '../../elements/Loader';
import {
  IconCustom,
  IconDots,
  IconFlow,
  IconHeart,
  IconMenu,
  IconNetwork,
  IconPost,
  IconSearch,
  IconSettings,
  IconSites,
  IconWordPress,
} from '../../icons';

/**
 * Sidebar.
 */
@Component({
  tag: 'streamline-sidebar',
  shadow: true,
  styleUrl: 'streamline-sidebar.scss',
})
export class StreamlineSidebar {
  // @ts-ignore
  private tw = 'w-8 h-8 sm:w-10 sm:h-10';

  private button = (type) => {
    const icon =
      type === 'search' ? (
        <IconSearch />
      ) : type === 'wordpress' ? (
        <IconWordPress />
      ) : type === 'site' ? (
        <IconSites />
      ) : type === 'networkMenu' ? (
        <IconNetwork />
      ) : type === 'menu' ? (
        <IconMenu />
      ) : type === 'post' ? (
        <IconPost />
      ) : type === 'flow' ? (
        <IconFlow />
      ) : type === 'custom' ? (
        <IconCustom />
      ) : type === 'settings' ? (
        <IconSettings />
      ) : type === 'dots' ? (
        <IconDots />
      ) : (
        type === 'fav' && <IconHeart />
      );

    const handleClick = () => {
      if (type !== 'wordpress') {
        state.active = type;
      } else {
        state.visible = false;
      }
    };

    return (
      <button
        onClick={handleClick}
        onMouseDown={(e) => e.preventDefault()}
        tabIndex={state.active === type ? -1 : 0}
        class={{
          'text-left h-[var(--sl-side-w)] min-w-[var(--sl-side-w)] flex flex-col items-center justify-center p-0 text-white bg-transparent':
            true,
          'focus-darker mr-auto bg-[#020204] text-white fill-current h-[var(--sl-side-w)] w-[calc(var(--sl-side-w))] hover:bg-[#080d17] sm:mr-0 sm:h-[64px] sm:min-h-[64px]':
            type === 'wordpress',
          'focus-dark !justify-items-center !content-center text-slate-200 hover:text-blue-500 lg:!justify-items-start !grid focus-dark w-full w-full sm:w-[var(--sl-side-w)] sm:h-[var(--sl-side-w)] sm:min-h-[var(--sl-side-w)] lg:h-[48px] lg:min-h-[48px]':
            type !== 'wordpress',
          'sm:!grid-rows-[20px,20px] lg:!grid-rows-1 lg:grid-cols-[32px,1fr] lg:px-5':
            type !== 'settings' && type !== 'wordpress',
          'mb-3': type === 'networkMenu' || type === 'search',
          'sm:mt-auto': type === 'settings',
          'bg-slate-800 pointer-events-none': type === state.active,
        }}
      >
        {type === 'wordpress' ? state.isLoading ? <Loader /> : icon : icon}
        {type === 'settings' || type === 'wordpress' ? (
          ''
        ) : (
          <span class="hidden sm:inline-block text-xs font-semibold leading-1 mt-1.5 lg:mt-0 lg:text-sm">
            {capitalizeFirstLetter(state.menu[type].text)}
          </span>
        )}
      </button>
    );
  };

  render() {
    return (
      <nav
        class={`z-50 bg-slate-900 h-full w-full flex absolute bottom-0 h-[var(--sl-side-w)] sm:top-0 sm:h-full sm:flex-col sm:w-[var(--sl-side-w)]`}
      >
        {this.button('wordpress')}
        <div
          class={`grid grid-flow-col h-full overflow-x-auto overflow-y-hidden w-[calc(100%-var(--sl-side-w))] sm:w-full sm:overflow-x-hidden sm:flex sm:flex-col sm:overflow-y-auto sm:h-[calc(100%-64px)]`}
        >
          {Object.values(state.menu).map((item) => {
            return item.condition && this.button(item.name);
          })}
        </div>
      </nav>
    );
  }
}
