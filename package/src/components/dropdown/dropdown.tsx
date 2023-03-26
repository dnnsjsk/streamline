// eslint-disable-next-line no-unused-vars
import { Component, h, Element, State, Prop } from '@stencil/core';
import { computePosition, flip, shift } from '@floating-ui/dom';
import isAnimation from '../../utils/is/isAnimation';
import { Icon } from '../../elements/Icon';
import { isArray } from 'lodash-es';
import IconDots from '../../../node_modules/@fortawesome/fontawesome-pro/svgs/solid/ellipsis.svg';
import IconLink from '../../../node_modules/@fortawesome/fontawesome-pro/svgs/solid/up-right-from-square.svg';
import { Keys } from '../../elements/Keys';
import { state } from '../../store/internal';

@Component({
  tag: 'streamline-dropdown',
  styleUrl: '../../css/tailwind.scss',
  shadow: true,
})
// eslint-disable-next-line no-unused-vars
export class StreamlineDropdown {
  private button: HTMLElement;
  private dropdown: HTMLElement;

  // eslint-disable-next-line no-undef
  @Element() el: HTMLStreamlineDropdownElement;

  @State() placement: string;

  @Prop({ mutable: true }) items = [];

  @Prop() type: string;

  componentDidUpdate() {
    this.setPosition();
  }

  private setPosition = () => {
    if (this.button) {
      const shiftByOnePixel = {
        name: 'shiftByOnePixel',
        fn({ y }) {
          return {
            y: y - 1,
          };
        },
      };

      computePosition(this.button, this.dropdown, {
        strategy: 'fixed',
        middleware: [flip(), shift(), shiftByOnePixel],
        placement: 'bottom-end',
      }).then(({ x, y, placement }) => {
        this.placement = placement;
        Object.assign(this.dropdown.style, {
          left: `${x}px`,
          top: `${y}px`,
        });
      });
    }
  };

  render() {
    const items =
      this.type !== 'main'
        ? this.items
        : [
            {
              text: 'Search',
              onClick: () => (state.active = 'entries'),
              keys: state.active === 'settings' && ['Meta', '↑', '↓'],
            },
            {
              text: 'Settings',
              onClick: () => (state.active = 'settings'),
              keys: state.active === 'entries' && ['Meta', '↑', '↓'],
            },
            [
              {
                text: 'Exit',
                onClick: () => (state.isVisible = false),
                keys: ['Escape'],
                large: true,
              },
            ],
          ];

    return (
      <div
        role="button"
        ref={(el) => (this.button = el as HTMLElement)}
        onFocus={this.setPosition}
        onMouseEnter={this.setPosition}
        onMouseDown={(e) => e.preventDefault()}
        class={{
          'focus-white group flex h-full w-full items-center justify-center focus-within:text-blue-600 focus-within:opacity-100 hover:z-50 hover:text-blue-600 hover:opacity-100 focus:text-blue-600 focus:opacity-100':
            true,
          '!pointer-events-auto relative opacity-0 !opacity-100':
            this.type === 'main' && state.isVisible,
          'opacity-100': this.type === 'entry',
        }}
      >
        <Icon icon={IconDots} />
        <ul
          ref={(el) => (this.dropdown = el as HTMLElement)}
          class={{
            'pointer-events-none fixed flex transform flex-col overflow-hidden border border-slate-400 opacity-0 shadow-md focus-within:pointer-events-auto focus-within:opacity-100 group-hover:pointer-events-auto group-hover:opacity-100 group-focus:pointer-events-auto group-focus:opacity-100':
              true,
            'z-50 min-w-[144px]': this.type === 'main',
            'z-30': this.type !== 'main',
            'mt-[2px]': this.placement === 'top' && this.type !== 'main',
            'transition duration-100 ease-in': isAnimation(),
          }}
        >
          {items.map((item) => {
            const Item = ({ item, border = false }) => {
              const isActiveMenu =
                this.type === 'main' &&
                (item.text.toLowerCase() === state.active ||
                  item?.active?.toLowerCase() === state.active);

              return (
                <li class="flex w-full">
                  <a
                    onFocus={this.setPosition}
                    tabIndex={isActiveMenu ? -1 : 0}
                    href={item.href && item.href}
                    onMouseDown={(e) => e.preventDefault()}
                    class={{
                      'focus-inner space-between flex w-full flex-row items-center whitespace-nowrap bg-white px-2.5 text-left text-sm font-medium text-slate-900 hover:text-blue-600':
                        true,
                      'border-t border-slate-400': item.border || border,
                      'h-8': !item.large,
                      'h-9': item.large,
                      '!pointer-events-none': isActiveMenu,
                    }}
                    onClick={() => {
                      item.onClick && item.onClick();
                    }}
                  >
                    <span
                      class={{
                        'min-w-[80px]': this.type === 'main',
                        '!cursor-default !font-semibold !text-slate-400':
                          isActiveMenu,
                      }}
                    >
                      {item.text}
                    </span>
                    {item.keys &&
                      state.entriesSettingsLoad.keys.navigationActive && (
                        <div class="ml-4">
                          <Keys keys={item.keys} />
                        </div>
                      )}
                    {item.href && (
                      <span class="ml-auto pl-3 text-slate-400">
                        <Icon icon={IconLink} />
                      </span>
                    )}
                  </a>
                </li>
              );
            };

            return isArray(item)
              ? item.map((innerItem, innerIndex) => {
                  return <Item item={innerItem} border={innerIndex === 0} />;
                })
              : item?.text && <Item item={item} />;
          })}
        </ul>
      </div>
    );
  }
}
