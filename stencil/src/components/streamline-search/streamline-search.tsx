// import { isLocalCommands } from '../../utils/isLocalCommands';
// eslint-disable-next-line no-unused-vars
import { Component, Element, h } from '@stencil/core';
import { state } from '../../store/internal';
import { setEntries } from '../../utils/setEntries';
import { checkIfStringStartsWith } from '../../utils/checkIfStringStartsWith';
import { stateLocal } from '../../store/local';
import { doQuery } from '../../utils/doQuery';
import { Button } from '../../elements/Button';

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
    Object.keys(state.commands.local).forEach((item) => {
      arr.push(`/${item} `);
    });
    this.commands = arr;
  }

  private handleChange = (e) => {
    state.searchValue = e.target.value;
    if (!e.target.value.startsWith('/')) {
      state.isLoading = false;
      state.isSlash = false;
      state.isEnter = false;
      setEntries();

      if (
        (stateLocal.active === 'post' || stateLocal.active === 'site') &&
        state.searchValue.trim().length >= 1 &&
        !state.test
      ) {
        state.isEnter = true;
        this.command = stateLocal.active;
      }
    } else if (
      // (e.target.value.startsWith('/') && isLocalCommands()) ||
      e.target.value.startsWith('/')
    ) {
      state.isSlash = true;
      if (
        checkIfStringStartsWith(
          state.searchValue,
          state.menu[stateLocal.active].commands
        )
      ) {
        state.isEnter = true;
        this.command = state.searchValue.split(' ')[0].slice(1);
      } else {
        state.isLoading = false;
        state.isEnter = false;
      }
    }
  };

  private handleKeydown = (e) => {
    if (e.key === 'Enter' && state.isEnter && !state.test) {
      this.startQuery();
    }
  };

  private handleBlur = () => {
    state.isSearchFocus = false;
  };

  private startQuery = () => {
    this.callback = state.commands.local[this.command]?.callback || false;

    if (
      this.callback ||
      stateLocal.active === 'post' ||
      stateLocal.active === 'site'
    ) {
      if (
        checkIfStringStartsWith(state.searchValue, this.commands) &&
        this.callback
      ) {
        this.value = state.searchValue.replace(`/${this.command}`, '').trim();
      } else if (stateLocal.active === 'post' || stateLocal.active === 'site') {
        this.value = state.searchValue;
        this.callback = `${stateLocal.active}s`;
      }

      doQuery({
        callback: this.callback,
        type: this.command,
        search: this.value,
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
            class="select peer bg-transparent focus:outline-none w-full h-[var(--sl-side-w)] text-[18px] h-full w-full m-0 p-0 font-normal placeholder-slate-500 text-slate-900 px-9 lg:h-[64px] lg:px-12"
            type="text"
            placeholder={state.searchPlaceholder}
            value={state.searchValue}
            onInput={this.handleChange}
            onKeyDown={this.handleKeydown}
            onBlur={this.handleBlur}
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
              <Button onClick={this.startQuery} text="Search" />
            </div>
          ),
        ]}
      </div>
    );
  }
}
