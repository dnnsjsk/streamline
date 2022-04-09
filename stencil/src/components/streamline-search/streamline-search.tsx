// eslint-disable-next-line no-unused-vars
import { Component, Element, h } from '@stencil/core';
import { state } from '../../store/internal';
import { setEntries } from '../../utils/set/setEntries';
import { get } from '../../utils/query/get';
import { Button } from '../../elements/Button';
import { isDefault } from '../../utils/is/isDefault';
import { isAnimation } from '../../utils/is/isAnimation';

/**
 * Search.
 */
@Component({
  tag: 'streamline-search',
  shadow: true,
  styleUrl: 'streamline-search.scss',
})
export class StreamlineSearch {
  // eslint-disable-next-line no-undef
  @Element() el: HTMLStreamlineSearchElement;

  private onInput = (e) => {
    state.searchValue = e.target.value;
    state.isLoading = false;
    state.isSlash = false;
    state.isEnter = false;
    setEntries();

    if (
      (state.active === 'post' || state.active === 'site') &&
      state.searchValue.trim().length >= 1 &&
      !state.test
    ) {
      state.isEnter = true;
    }
  };

  private onKeyDown = (e) => {
    if (e.key === 'Enter' && state.isEnter && !state.test) {
      this.startQuery();
    }
    if (isDefault() && state.searchValue === '' && e.key === 'Backspace') {
      if (
        isDefault() &&
        isAnimation() &&
        state.active !== 'search' &&
        state.active !== 'settings'
      ) {
        const container = document
          .querySelector('streamline-container')
          .shadowRoot.querySelector('.inner');

        container.animate(
          [{ transform: 'scale(0.98)' }, { transform: 'scale(1)' }],
          {
            duration: 200,
            easing: 'cubic-bezier(0.4, 0, 1, 1)',
          }
        );
      }

      state.active = 'search';
    }
  };

  private onBlur = () => {
    state.isSearchFocus = false;
  };

  private startQuery = () => {
    if (state.active === 'post' || state.active === 'site') {
      get({
        route: `get/${state.active}s`,
        type: state.active,
        value: state.searchValue,
      });
    }
  };

  render() {
    return (
      <div class="bg-slate-50 relative h-[var(--sl-side-w)] w-full lg:h-[64px]">
        <div class="h-px w-screen left-0 absolute bottom-0 bg-slate-200 z-50" />
        {state.isSearch && [
          <input
            part="search"
            class="peer bg-transparent focus:outline-none w-full h-[var(--sl-side-w)] text-[18px] h-full w-full m-0 p-0 font-normal placeholder-slate-500 text-slate-900 px-9 lg:h-[64px] lg:px-12"
            type="text"
            placeholder={state.searchPlaceholder}
            value={state.searchValue}
            onInput={this.onInput}
            onKeyDown={this.onKeyDown}
            onBlur={this.onBlur}
          />,
          <div class="h-px w-screen left-0 absolute bottom-0 bg-slate-200 z-50 peer-focus:h-[2px] peer-focus:-bottom-px peer-focus:bg-blue-600" />,
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="search absolute top-1/2 -translate-y-1/2 left-4 h-3.5 text-slate-500 peer-focus:text-blue-600 lg:left-5"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z"
            />
          </svg>,
          state.isEnter && (
            <div class="absolute right-3 -translate-y-1/2 top-1/2 sm:right-4">
              <Button
                onClick={this.startQuery}
                type="tertiary"
                text="Search"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="fill-current w-2 rotate-90 ml-1 mr-2 origin-right-center"
                    viewBox="0 0 320 512"
                  >
                    <path
                      fill="currentColor"
                      d="M296.64 412.326l-96.16 96.16c-4.686 4.687-12.285 4.686-16.97 0L87.354 412.33c-7.536-7.536-2.198-20.484 8.485-20.485l68.161-.002V56H64a11.996 11.996 0 0 1-8.485-3.515l-32-32C15.955 12.926 21.309 0 32 0h164c13.255 0 24 10.745 24 24v367.842l68.154-.001c10.626-.001 16.066 12.905 8.486 20.485z"
                    />
                  </svg>
                }
              />
            </div>
          ),
        ]}
      </div>
    );
  }
}
