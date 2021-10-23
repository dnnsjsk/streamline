// eslint-disable-next-line no-unused-vars
import { Component, h, Prop } from '@stencil/core';
import { stateLocal } from '../../store/local';
import { stateInternal } from '../../store/internal';
import tippy from 'tippy.js';
import { someDeep } from 'deepdash-es/standalone';
import { getMenu } from '../../utils/getMenu';
import { resetView } from '../../utils/resetView';
import { setFavourite } from '../../utils/setFavourite';
import { Fav } from '../../elements/Fav';
import { Heart } from '../../elements/Heart';

/**
 * Box.
 */
@Component({
  tag: 'streamline-button',
  shadow: true,
  styleUrl: 'streamline-button.scss',
})
export class StreamlineButton {
  private container: HTMLElement;
  private link: HTMLElement;
  private tooltip: HTMLElement;

  @Prop() adminUrl: string;
  // eslint-disable-next-line @stencil/strict-mutable
  @Prop({ mutable: true, reflect: true }) favourite: boolean;
  @Prop() header: string;
  @Prop() href: string;
  @Prop() icon: string;
  @Prop() index: number;
  @Prop() indexInner: number;
  @Prop() indexSub: number;
  @Prop() path: string;
  @Prop() siteId: number;
  @Prop() text: string;
  @Prop() type: string;
  @Prop() typeSub: string;

  componentWillRender() {
    if (this.type === 'main') {
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

    if (this.type === 'main' && this.link) {
      const template = this.tooltip;
      template.style.display = 'block';

      tippy(this.link, {
        content: template,
        appendTo: this.container,
        interactive: true,
        plugins: [hideOnPopperBlur],
        delay: [500, null],
      });
    }
  }

  private handleClick = () => {
    if (this.type === 'sidebar') {
      stateLocal.active = this.icon;
      resetView();
    }

    if (
      stateLocal.active === 'menu' &&
      stateInternal.entriesMenu.length === 0
    ) {
      getMenu();
    }
  };

  private handleFavClick = () => {
    setFavourite({
      favourite: this.favourite,
      callback: this.checkIfFav,
      type: 'menu',
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
    const className = `break-words w-[max-content] underline-none cursor-pointer text-center whitespace-no-wrap ${
      this.type === 'main'
        ? `text-sm px-3 py-2.5 leading-none border border-blue-gray-200 bg-blue-gray-50 text-blue-600 min-w-[75px] hover:border-blue-600`
        : this.type === 'sidebar' || this.type === 'primary'
        ? `h-[calc(var(--sl-side-w))] w-[calc(var(--sl-side-w)-1px)] flex flex-col items-center justify-center p-0 text-blue-gray-900 bg-transparent border-b border-blue-gray-300 ${
            this.type === 'primary'
              ? `bg-[#191E23] border-none text-white fill-current h-[var(--sl-side-w)] w-[var(--sl-side-w)] hover:bg-[#0e1114]`
              : this.type === 'sidebar' &&
                `!grid sm:!grid-rows-[20px,20px] !justify-items-center !content-center text-blue-gray-500 border-b border-blue-gray-300 hover:bg-blue-gray-100 hover:text-blue-gray-900 ${
                  stateLocal.active === this.icon &&
                  'text-blue-700 bg-white border-r border-white pointer-events-none relative -right-px hover:!bg-white'
                }`
          }`
        : ''
    }`;

    const classNameText = `${
      this.type === 'sidebar'
        ? 'hidden sm:inline-block text-xs font-bold leading-1 uppercase mt-1.5'
        : ''
    }`;

    const classNameIconSidebar = `fill-current`;

    const iconWordpress = (
      <svg
        class={`w-8 h-8 sm:w-10 sm:h-10`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-2 -2 24 24"
      >
        <path d="M20 10c0-5.51-4.49-10-10-10C4.48 0 0 4.49 0 10c0 5.52 4.48 10 10 10 5.51 0 10-4.48 10-10zM7.78 15.37L4.37 6.22c.55-.02 1.17-.08 1.17-.08.5-.06.44-1.13-.06-1.11 0 0-1.45.11-2.37.11-.18 0-.37 0-.58-.01C4.12 2.69 6.87 1.11 10 1.11c2.33 0 4.45.87 6.05 2.34-.68-.11-1.65.39-1.65 1.58 0 .74.45 1.36.9 2.1.35.61.55 1.36.55 2.46 0 1.49-1.4 5-1.4 5l-3.03-8.37c.54-.02.82-.17.82-.17.5-.05.44-1.25-.06-1.22 0 0-1.44.12-2.38.12-.87 0-2.33-.12-2.33-.12-.5-.03-.56 1.2-.06 1.22l.92.08 1.26 3.41zM17.41 10c.24-.64.74-1.87.43-4.25.7 1.29 1.05 2.71 1.05 4.25 0 3.29-1.73 6.24-4.4 7.78.97-2.59 1.94-5.2 2.92-7.78zM6.1 18.09C3.12 16.65 1.11 13.53 1.11 10c0-1.3.23-2.48.72-3.59C3.25 10.3 4.67 14.2 6.1 18.09zm4.03-6.63l2.58 6.98c-.86.29-1.76.45-2.71.45-.79 0-1.57-.11-2.29-.33.81-2.38 1.62-4.74 2.42-7.1z" />
      </svg>
    );

    const iconMenu = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class={`${classNameIconSidebar} h-[18px]`}
        viewBox="0 0 512 512"
      >
        <path
          fill="currentColor"
          d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"
        />
      </svg>
    );

    const iconFlow = (
      <svg
        class={`${classNameIconSidebar} h-[16px]`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M19.75 9c0-1.257-.565-2.197-1.39-2.858-.797-.64-1.827-1.017-2.815-1.247-1.802-.42-3.703-.403-4.383-.396L11 4.5V6l.177-.001c.696-.006 2.416-.02 4.028.356.887.207 1.67.518 2.216.957.52.416.829.945.829 1.688 0 .592-.167.966-.407 1.23-.255.281-.656.508-1.236.674-1.19.34-2.82.346-4.607.346h-.077c-1.692 0-3.527 0-4.942.404-.732.209-1.424.545-1.935 1.108-.526.579-.796 1.33-.796 2.238 0 1.257.565 2.197 1.39 2.858.797.64 1.827 1.017 2.815 1.247 1.802.42 3.703.403 4.383.396L13 19.5h.714V22L18 18.5 13.714 15v3H13l-.177.001c-.696.006-2.416.02-4.028-.356-.887-.207-1.67-.518-2.216-.957-.52-.416-.829-.945-.829-1.688 0-.592.167-.966.407-1.23.255-.281.656-.508 1.237-.674 1.189-.34 2.819-.346 4.606-.346h.077c1.692 0 3.527 0 4.941-.404.732-.209 1.425-.545 1.936-1.108.526-.579.796-1.33.796-2.238z" />
      </svg>
    );

    const iconPost = (
      <svg
        class={`${classNameIconSidebar} h-[16px]`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path
          fill="currentColor"
          d="M512 0C460.22 3.56 96.44 38.2 71.01 287.61c-3.09 26.66-4.84 53.44-5.99 80.24l178.87-178.69c6.25-6.25 16.4-6.25 22.65 0s6.25 16.38 0 22.63L7.04 471.03c-9.38 9.37-9.38 24.57 0 33.94 9.38 9.37 24.59 9.37 33.98 0l57.13-57.07c42.09-.14 84.15-2.53 125.96-7.36 53.48-5.44 97.02-26.47 132.58-56.54H255.74l146.79-48.88c11.25-14.89 21.37-30.71 30.45-47.12h-81.14l106.54-53.21C500.29 132.86 510.19 26.26 512 0z"
        />
      </svg>
    );

    const icon =
      this.icon === 'wordpress'
        ? iconWordpress
        : this.icon === 'menu'
        ? iconMenu
        : this.icon === 'post'
        ? iconPost
        : this.icon === 'flow'
        ? iconFlow
        : this.icon === 'fav' && <Heart type={this.type} />;

    const text = this.text && <span class={classNameText}>{this.text}</span>;

    return (
      <div class={`relative inline-flex w-full`}>
        <div
          ref={(el) => (this.container = el as HTMLElement)}
          class={`focus ${
            this.type === 'main'
              ? 'focus--border'
              : this.type === 'sidebar'
              ? 'focus--px-x focus--px-y'
              : ''
          }`}
        >
          {this.type === 'main' && this.href ? (
            <a
              ref={(el) => (this.link = el as HTMLElement)}
              href={!stateInternal.test ? this.href : '#'}
              onClick={this.handleClick}
              class={className}
            >
              {icon}
              {text}
            </a>
          ) : (
            <button
              onClick={this.handleClick}
              tabIndex={stateLocal.active === this.icon ? -1 : 0}
              style={{
                borderBottom:
                  this.type === 'primary'
                    ? ''
                    : '1px solid rgba(209,213,219,var(--tw-border-opacity))',
              }}
              class={className}
            >
              {icon}
              {text}
            </button>
          )}
          {this.favourite && stateLocal.active !== 'fav' && (
            <Fav class={`absolute -top-1 -right-1`} />
          )}
        </div>
        {this.type === 'main' && (
          <div
            class={`!grid divide-x divide-blue-gray-200 auto-cols-max grid-flow-col`}
            ref={(el) => (this.tooltip = el as HTMLElement)}
            style={{ display: 'block' }}
          >
            {[
              {
                onClick: this.handleFavClick,
                condition: this.favourite,
              },
            ].map((item) => {
              return (
                <button class={`border-none focus`} onClick={item.onClick}>
                  <span
                    class={`w-8 h-8 flex items-center justify-center ${
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
