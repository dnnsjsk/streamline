// eslint-disable-next-line no-unused-vars
import { Component, h, Prop } from '@stencil/core';
import { stateLocal } from '../../store/local';
import { stateInternal } from '../../store/internal';
import tippy from 'tippy.js';
import { someDeep } from 'deepdash-es/standalone';
import { setFavourite } from '../../utils/setFavourite';
import { Fav } from '../../elements/Fav';
import { Heart } from '../../elements/Heart';
import { Loader } from '../../elements/Loader';
import {
  IconCustom,
  IconDots,
  IconFlow,
  IconMenu,
  IconNetwork,
  IconPost,
  IconSettings,
  IconSites,
  IconWordPress,
} from '../../icons';

/**
 * Box.
 */
@Component({
  tag: 'streamline-button',
  shadow: true,
  styleUrl: 'streamline-button.scss',
})
export class StreamlineButton {
  private tooltip: HTMLElement;
  private tooltipTrigger: HTMLElement;
  // @ts-ignore
  private tw = 'animate-spin h-[16px] h-[14px] w-8 h-8 sm:w-10 sm:h-10';

  @Prop() adminUrl: string;

  // eslint-disable-next-line @stencil/strict-mutable
  @Prop({ mutable: true, reflect: true }) favourite: boolean = false;

  @Prop() href: string;

  @Prop() icon: string;

  @Prop() index: number;

  @Prop() indexInner: number;

  @Prop() indexSub: number;

  @Prop({ reflect: true }) invalid: boolean;

  @Prop() path: string;

  @Prop() siteId: number;

  @Prop() styling: string;

  @Prop() text: string;

  @Prop() type: string;

  @Prop() typeSub: string;

  componentWillRender() {
    if (this.type === 'menu') {
      this.checkIfFav();
    }
  }

  componentDidLoad() {
    const hideOnPopperBlur = {
      name: 'hideOnPopperBlur',
      defaultValue: true,
      fn(instance) {
        return {
          onCreate() {
            instance.popper.addEventListener('focusout', (event) => {
              if (
                instance.props.hideOnPopperBlur &&
                event.relatedTarget &&
                !instance.popper.contains(event.relatedTarget)
              ) {
                instance.hide();
              }
            });
          },
        };
      },
    };

    if (
      (this.type === 'menu' && this.tooltipTrigger) ||
      this.typeSub === 'context'
    ) {
      const template = this.tooltip;
      template.style.display = 'block';

      tippy(this.tooltipTrigger, {
        content: template,
        interactive: true,
        plugins: [hideOnPopperBlur],
        delay: [this.typeSub === 'context' ? 0 : 500, null],
        placement: this.typeSub === 'context' ? 'bottom-end' : 'top',
        offset: [
          this.typeSub === 'context' ? -9 : 0,
          this.typeSub === 'context' ? -1 : 10,
        ],
        arrow: this.typeSub !== 'context',
      });
    }
  }

  private preventClickFocus = (e) => {
    e.preventDefault();
  };

  private handleClickFav = () => {
    setFavourite({
      favourite: this.favourite,
      callback: this.checkIfFav,
      type: stateLocal.active,
      filter: (o) => {
        return o.href === this.href && o.adminUrl === this.adminUrl;
      },
      path: (o) => {
        return o.type === this.typeSub && o.siteId === this.siteId;
      },
      pathFav: (o) => {
        return o.path === this.path && o.siteId === this.siteId;
      },
    });
  };

  private checkIfFav = () => {
    this.favourite = someDeep(
      stateInternal.entriesFav,
      (o) => {
        return o?.path === this.path && o?.siteId === this.siteId;
      },
      { childrenPath: ['children'] }
    );
  };

  render() {
    const className = `select-none break-words w-[max-content] underline-none cursor-pointer text-center whitespace-no-wrap ${
      this.type === 'menu'
        ? `focus-out text-sm px-3 py-2.5 leading-none border border-blue-gray-200 bg-blue-gray-50 text-blue-600 hover:border-blue-600`
        : this.type === 'sidebar' || this.type === 'primary'
        ? `h-[calc(var(--sl-side-w))] w-[calc(var(--sl-side-w))] flex flex-col items-center justify-center p-0 text-white bg-transparent lg:h-[64px] ${
            this.type === 'primary'
              ? `focus-darker bg-[#020204] text-white fill-current h-[var(--sl-side-w)] hover:bg-[#080d17]`
              : this.type === 'sidebar' &&
                `!grid focus-dark lg:h-[48px] ${
                  this.icon !== 'settings'
                    ? 'sm:!grid-rows-[20px,20px] lg:!grid-rows-1 lg:grid-cols-[32px,1fr] lg:px-5'
                    : ''
                } !justify-items-center !content-center text-blue-gray-200 hover:text-blue-400 lg:!justify-items-start ${
                  stateLocal.active === this.icon
                    ? 'bg-blue-gray-800 pointer-events-none'
                    : ''
                }`
          }`
        : this.type === 'icon'
        ? 'focus flex items-center justify-center w-full h-full text-blue-gray-900 border-b border-blue-gray-200'
        : this.type === 'button'
        ? `select-none focus-out inline-flex items-center font-semibold text-xs ${
            this.styling === 'primary'
              ? 'px-2.5 py-2 bg-blue-500 border-blue-500 text-white hover:bg-blue-600 hover:border-blue-600 sm:px-3.5'
              : 'px-2 py-1 bg-white border border-blue-gray-200 text-blue-gray-600 hover:text-blue-gray-50 hover:bg-blue-gray-900 hover:border-blue-gray-900 sm:px-3 sm:py-1.5'
          }`
        : ''
    }`;

    const classNameText = `${
      this.type === 'sidebar'
        ? 'hidden sm:inline-block text-xs font-semibold leading-1 mt-1.5 lg:mt-0 lg:text-sm'
        : ''
    }`;

    const icon =
      this.icon === 'wordpress' ? (
        <IconWordPress />
      ) : this.icon === 'site' ? (
        <IconSites />
      ) : this.icon === 'network' ? (
        <IconNetwork />
      ) : this.icon === 'menu' ? (
        <IconMenu />
      ) : this.icon === 'post' ? (
        <IconPost />
      ) : this.icon === 'flow' ? (
        <IconFlow />
      ) : this.icon === 'custom' ? (
        <IconCustom />
      ) : this.icon === 'settings' ? (
        <IconSettings />
      ) : this.icon === 'dots' ? (
        <IconDots />
      ) : (
        this.icon === 'fav' && <Heart type={this.type} />
      );

    const text = this.text && <span class={classNameText}>{this.text}</span>;

    const dropdownButton = (obj) => (
      <button
        onMouseDown={(e) => e.preventDefault()}
        class={`focus px-4 py-2 whitespace-nowrap text-sm font-medium text-blue-gray-900 hover:text-blue-400`}
        onClick={() => {
          obj.onClick();
          stateInternal.isSearch = !stateInternal.isHelp;
        }}
      >
        {obj.text}
      </button>
    );

    return (
      <div
        class={`relative flex flex-col w-full h-full ${
          this.type === 'primary' ? 'w-[calc(var(--sl-side-w)+1px)]' : ''
        } ${this.invalid ? 'opacity-25 pointer-events-none' : ''}`}
      >
        {this.type === 'menu' && this.href ? (
          <a
            onMouseDown={this.preventClickFocus}
            ref={(el) => (this.tooltipTrigger = el as HTMLElement)}
            href={!stateInternal.test ? this.href : '#'}
            class={className}
          >
            {icon}
            {text}
            {this.favourite && stateLocal.active !== 'fav' && (
              <Fav class={`absolute -top-1.5 -right-2`} />
            )}
          </a>
        ) : this.type === 'sidebar' || this.type === 'primary' ? (
          <button
            onMouseDown={this.preventClickFocus}
            tabIndex={stateLocal.active === this.icon ? -1 : 0}
            class={className}
          >
            {this.type === 'primary' ? (
              stateInternal.isProcessing ? (
                <Loader sm={true} />
              ) : (
                icon
              )
            ) : (
              icon
            )}
            {this.icon === 'settings' ? '' : text}
          </button>
        ) : this.type === 'icon' ? (
          <button
            onMouseDown={this.preventClickFocus}
            class={className}
            ref={(el) => (this.tooltipTrigger = el as HTMLElement)}
          >
            {icon}
            {this.typeSub === 'context' && (
              <div
                class={`border border-blue-gray-200`}
                ref={(el) => (this.tooltip = el as HTMLElement)}
                style={{
                  display: 'block',
                }}
              >
                {[
                  {
                    text: stateInternal.isHelp ? 'Close help' : 'Show help',
                    onClick: () => {
                      stateInternal.isHelp = !stateInternal.isHelp;
                    },
                  },
                ].map((item) => {
                  return dropdownButton(item);
                })}
              </div>
            )}
          </button>
        ) : (
          this.type === 'button' && (
            <button onMouseDown={this.preventClickFocus} class={className}>
              {this.text === 'Search' && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class={`fill-current w-2 rotate-90 ml-1 mr-2 origin-right-center`}
                  viewBox="0 0 320 512"
                >
                  <path
                    fill="currentColor"
                    d="M296.64 412.326l-96.16 96.16c-4.686 4.687-12.285 4.686-16.97 0L87.354 412.33c-7.536-7.536-2.198-20.484 8.485-20.485l68.161-.002V56H64a11.996 11.996 0 0 1-8.485-3.515l-32-32C15.955 12.926 21.309 0 32 0h164c13.255 0 24 10.745 24 24v367.842l68.154-.001c10.626-.001 16.066 12.905 8.486 20.485z"
                  />
                </svg>
              )}
              {this.text}
            </button>
          )
        )}
        {this.type === 'menu' && (
          <div
            onMouseDown={this.preventClickFocus}
            class={`!grid divide-x divide-blue-gray-200 auto-cols-max grid-flow-col`}
            ref={(el) => (this.tooltip = el as HTMLElement)}
            style={{ display: 'block' }}
          >
            {[
              {
                onClick: this.handleClickFav,
                condition: this.favourite,
              },
            ].map((item) => {
              return (
                <button
                  onMouseDown={this.preventClickFocus}
                  class={`border-none focus-dark group`}
                  onClick={item.onClick}
                >
                  <span
                    class={`w-8 h-8 flex items-center justify-center group-hover:text-blue-400 ${
                      item.condition ? 'text-red-500' : ''
                    }`}
                  >
                    <Heart />
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
