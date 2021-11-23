// import { isLocalCommands } from '../../utils/isLocalCommands';
// eslint-disable-next-line no-unused-vars
import { Component, Element, h } from '@stencil/core';
import { stateInternal } from '../../store/internal';
import { setEntries } from '../../utils/setEntries';
import { checkIfStringStartsWith } from '../../utils/checkIfStringStartsWith';
import { getQuery } from '../../utils/getQuery';
import { stateLocal } from '../../store/local';
import { setSearchPlaceholder } from '../../utils/setSearchPlaceholder';
import { resetView } from '../../utils/resetView';

/**
 * Search.
 */
@Component({
  tag: 'streamline-search',
  shadow: true,
  styleUrl: 'streamline-search.scss',
})
export class StreamlineSearch {
  private callback: string;
  private command: string;
  private commands: Array<string>;
  private value;

  // eslint-disable-next-line no-undef
  @Element() el: HTMLStreamlineSearchElement;

  connectedCallback() {
    const arr = [];
    Object.keys(stateInternal.commands.local).forEach((item) => {
      arr.push(`/${item} `);
    });
    this.commands = arr;
  }

  private handleChange = (e) => {
    stateInternal.searchValue = e.target.value;
    if (!e.target.value.startsWith('/')) {
      stateInternal.isLoading = false;
      stateInternal.isSlash = false;
      stateInternal.isEnter = false;
      setEntries();

      if (
        (stateLocal.active === 'post' || stateLocal.active === 'site') &&
        stateInternal.searchValue.length >= 1 &&
        !stateInternal.test
      ) {
        stateInternal.isEnter = true;
        this.command = stateLocal.active;
      }
    } else if (
      // (e.target.value.startsWith('/') && isLocalCommands()) ||
      e.target.value.startsWith('/')
    ) {
      stateInternal.isSlash = true;
      if (
        checkIfStringStartsWith(
          stateInternal.searchValue,
          stateInternal.menu[stateLocal.active].commands
        )
      ) {
        stateInternal.isEnter = true;
        this.command = stateInternal.searchValue.split(' ')[0].slice(1);
      } else {
        stateInternal.isLoading = false;
        stateInternal.isEnter = false;
      }
    }
  };

  private handleKeydown = (e) => {
    if (e.key === 'Enter' && stateInternal.isEnter && !stateInternal.test) {
      this.startQuery();
    }
  };

  private startQuery = () => {
    this.callback =
      stateInternal.commands.local[this.command]?.callback || false;

    if (
      this.callback ||
      stateLocal.active === 'post' ||
      stateLocal.active === 'site'
    ) {
      if (
        checkIfStringStartsWith(stateInternal.searchValue, this.commands) &&
        this.callback
      ) {
        this.value = stateInternal.searchValue
          .replace(`/${this.command}`, '')
          .trim();
      } else if (stateLocal.active === 'post' || stateLocal.active === 'site') {
        this.value = stateInternal.searchValue;
        this.callback = `${stateLocal.active}s`;
      }

      this.query();
    }
  };

  private query = () => {
    stateInternal.isLoading = true;
    fetch(
      // @ts-ignore
      // eslint-disable-next-line no-undef
      `${streamline.rest}streamline/v1/${this.callback}?siteId=${stateInternal.currentSite.id}&value=${this.value}`,
      {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          // @ts-ignore
          // eslint-disable-next-line no-undef
          'X-WP-Nonce': streamline.nonceRest,
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        getQuery({
          children: data.children,
          isMultisite: data.isMultisite,
          path: stateInternal.currentSite.path,
          search: this.value,
          type: this.command,
          queryValue: this.value,
        });
        setSearchPlaceholder();
        if (this.callback === 'posts' || this.callback === 'sites') {
          resetView();
        }
        stateInternal.isLoading = false;
      });
  };

  render() {
    return (
      <div
        class={`border-b border-blue-gray-200 bg-blue-gray-50 relative h-[var(--sl-side-w)] w-full lg:h-[64px]`}
      >
        {!stateInternal.isHelp && [
          <input
            part="search"
            class="peer bg-transparent focus:outline-none w-full h-[var(--sl-side-w)] px-3 text-[1.15rem] h-full w-full m-0 p-0 font-normal placeholder-blue-gray-500 text-blue-gray-900 sm:px-8 lg:h-[64px]"
            type="text"
            placeholder={stateInternal.searchPlaceholder}
            value={stateInternal.searchValue}
            onInput={this.handleChange}
            onKeyDown={this.handleKeydown}
          />,
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="search absolute hidden top-1/2 -translate-y-1/2 left-3 h-3.5 text-blue-gray-500 peer-focus:text-blue-600 sm:block"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z"
            />
          </svg>,
          stateInternal.isEnter && (
            <div class={`absolute right-3 -translate-y-1/2 top-1/2 sm:right-4`}>
              <streamline-button
                type="button"
                text="Search"
                onClick={this.startQuery}
              />
            </div>
          ),
        ]}
      </div>
    );
  }
}
