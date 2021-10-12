// eslint-disable-next-line no-unused-vars
import { Component, Element, h, State } from '@stencil/core';
import { stateInternal } from '../../store/internal';
import { setEntries } from '../../utils/setEntries';
import { getQuery } from '../../utils/getQuery';

/**
 * Search.
 */
@Component({
  tag: 'streamline-search',
  shadow: true,
  styleUrl: 'streamline-search.scss',
})
export class StreamlineSearch {
  private commandTrim;
  private commands: Array<string>;

  // eslint-disable-next-line no-undef
  @Element() el: HTMLStreamlineSearchElement;

  @State() command: string;

  componentDidLoad() {
    const arr = [];
    Object.keys(stateInternal.commands).forEach((item) => {
      arr.push(`/${item} `);
    });
    this.commands = arr;
  }

  private checkIfStringStartsWith = (str, substrs) => {
    return substrs.some((substr) =>
      str.toLowerCase().startsWith(substr.toLowerCase())
    );
  };

  private handleChange = (e) => {
    stateInternal.searchValue = e.target.value;
    if (!e.target.value.startsWith('/')) {
      stateInternal.isSites = false;
      stateInternal.isLoading = false;
      stateInternal.isSlash = false;
      stateInternal.isEnter = false;
      setEntries();
    } else if (e.target.value.startsWith('/')) {
      stateInternal.isSlash = true;
      stateInternal.entriesMenuActive = [];
      if (
        this.checkIfStringStartsWith(stateInternal.searchValue, this.commands)
      ) {
        stateInternal.isEnter = true;
        this.command = stateInternal.searchValue.split(' ')[0].slice(1);
      } else {
        stateInternal.isSites = false;
        stateInternal.isLoading = false;
        stateInternal.isEnter = false;
      }
    }
  };

  private handleKeydown = (e) => {
    if (e.key === 'Enter') {
      this.startQuery();
    }
  };

  private startQuery = () => {
    if (
      this.checkIfStringStartsWith(stateInternal.searchValue, this.commands)
    ) {
      this.commandTrim = stateInternal.searchValue
        .replace(`/${this.command}`, '')
        .trim();
      this.query(
        stateInternal.commands[this.command].callback,
        this.commandTrim
      );
    }
  };

  private query = (callback, query) => {
    stateInternal.isLoading = true;
    // @ts-ignore
    // eslint-disable-next-line no-undef
    fetch(streamline.ajax, {
      method: 'POST',
      credentials: 'same-origin',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      // @ts-ignore
      // eslint-disable-next-line no-undef
      body: `action=streamlineQuery&callback=${callback}&query=${query}&nonce=${streamline.nonce}`,
    })
      .then((response) => response.json())
      .then((data) => {
        getQuery({
          type: this.command,
          search: this.commandTrim,
          children: data.data,
        });
        stateInternal.isSites = true;
        stateInternal.isLoading = false;
      });
  };

  render() {
    return (
      <div class={`relative h-[var(--sl-side-w)] w-full`}>
        <div class="focus h-[var(--sl-side-w)]">
          <input
            part="search"
            class="bg-gray-50 px-4 text-[1.15rem] h-full w-full m-0 p-0 border-b border-gray-300 font-medium placeholder-gray-500 sm:px-6"
            type="text"
            placeholder={stateInternal.searchPlaceholder}
            value={stateInternal.searchValue}
            onInput={this.handleChange}
            onKeyDown={this.handleKeydown}
          />
        </div>
        {stateInternal.isEnter && (
          <div class={`absolute right-3 -translate-y-1/2 top-1/2 sm:right-4`}>
            <div class={`focus focus--px`}>
              <button
                onClick={this.startQuery}
                class={`inline-flex items-center text-xs px-2 py-1 font-medium bg-white border border-gray-200 text-gray-600 hover:text-gray-50 hover:bg-gray-900 hover:border-gray-900 sm:text-sm sm:px-3 sm:py-1.5`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="far"
                  data-icon="level-down-alt"
                  class={`fill-current w-2 rotate-90 ml-1 mr-2 origin-right-center`}
                  role="img"
                  viewBox="0 0 320 512"
                >
                  <path
                    fill="currentColor"
                    d="M296.64 412.326l-96.16 96.16c-4.686 4.687-12.285 4.686-16.97 0L87.354 412.33c-7.536-7.536-2.198-20.484 8.485-20.485l68.161-.002V56H64a11.996 11.996 0 0 1-8.485-3.515l-32-32C15.955 12.926 21.309 0 32 0h164c13.255 0 24 10.745 24 24v367.842l68.154-.001c10.626-.001 16.066 12.905 8.486 20.485z"
                  />
                </svg>
                Enter
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
