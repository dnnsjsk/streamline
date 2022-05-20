// eslint-disable-next-line no-unused-vars
import { Component, h, Element } from '@stencil/core';
import { onChange, state } from '../../store/internal';
import { Button } from '../../elements/Button';
import { Icon } from '../../elements/Icon';
import IconSearch from '../../../node_modules/@fortawesome/fontawesome-pro/svgs/regular/magnifying-glass.svg';
import { getMetaKey } from '../../utils/get/getMetaKey';

@Component({
  tag: 'streamline-search',
  styleUrl: '../../css/tailwind.scss',
  shadow: true,
})
export class StreamlineSearch {
  private input: HTMLInputElement;

  // eslint-disable-next-line no-undef
  @Element() el: HTMLStreamlineSearchElement;

  componentWillLoad() {
    document.addEventListener('keydown', (e) => {
      if (state.isVisible) {
        if (
          e.key === 's' &&
          getMetaKey(e) &&
          state.entriesSettingsLoad.keys.search
        ) {
          e.preventDefault();
          state.isSearchFocus = true;
        }
      }
    });
  }

  componentDidRender() {
    onChange('isVisible', (value) => {
      value && this.input?.focus?.();
    });
    onChange('isSearchFocus', (value) => {
      if (value) {
        this.input?.focus?.();
        state.focusIndex = -1;
      } else {
        this.input?.blur?.();
      }
    });

    this.input?.focus?.();
  }

  private onInput = (e) => {
    state.searchValue = e.target.value;
    state.isLoading = false;
    state.isEnter = false;
  };

  render() {
    return (
      <div class="relative h-full w-full">
        <input
          ref={(el) => (this.input = el as HTMLInputElement)}
          id="search"
          class="m-0 h-full w-full w-full bg-transparent p-0 px-9 text-base font-normal text-slate-900 placeholder-slate-500 focus:outline-none lg:px-12"
          type="text"
          autocomplete="off"
          placeholder={state.searchPlaceholder}
          value={state.searchValue}
          onInput={this.onInput}
          onBlur={() => (state.isSearchFocus = false)}
          onFocus={() => (state.isSearchFocus = true)}
        />
        <Icon
          class="absolute left-3 top-1/2 -translate-y-1/2 fill-current text-slate-500 peer-focus:text-blue-600 lg:left-5"
          icon={IconSearch}
        />
        {state.isEnter && (
          <div class="absolute right-3 top-1/2 -translate-y-1/2 sm:right-4">
            <Button
              type="tertiary"
              text="Search"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="origin-right-center ml-1 mr-2 w-2 rotate-90 fill-current"
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
        )}
      </div>
    );
  }
}
