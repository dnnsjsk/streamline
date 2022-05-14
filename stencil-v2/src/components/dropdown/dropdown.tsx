// eslint-disable-next-line no-unused-vars
import { Component, h, Element, State, Prop } from '@stencil/core';
import { computePosition, flip, shift } from '@floating-ui/dom';
import { isAnimation } from '../../utils/is/isAnimation';
import { Icon } from '../../elements/Icon';
import IconDots from '../../../node_modules/@fortawesome/fontawesome-pro/svgs/regular/ellipsis.svg';

@Component({
  tag: 'streamline-dropdown',
  styleUrl: '../../css/tailwind.css',
  shadow: true,
})
export class StreamlineDropdown {
  private button: HTMLElement;
  private dropdown: HTMLElement;

  // eslint-disable-next-line no-undef
  @Element() el: HTMLStreamlineDropdownElement;

  @State() placement: string;

  @Prop() items = [];

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
            this.type === 'main',
          'opacity-100': this.type === 'entry',
        }}
      >
        <Icon icon={IconDots} />
        <div
          ref={(el) => (this.dropdown = el as HTMLElement)}
          class={{
            'pointer-events-none fixed flex transform flex-col overflow-hidden border border-slate-400 opacity-0 shadow-md focus-within:pointer-events-auto focus-within:opacity-100 group-hover:pointer-events-auto group-hover:opacity-100 group-focus:pointer-events-auto group-focus:opacity-100':
              true,
            'z-50': this.type === 'main',
            'z-30 rounded-md': this.type !== 'main',
            'mt-[2px]': this.placement === 'top' && this.type !== 'main',
            'transition duration-100 ease-in': isAnimation(),
          }}
        >
          {this.items.map((item) => {
            return (
              item?.text && (
                <a
                  onFocus={this.setPosition}
                  tabindex={0}
                  href={item.href && item.href}
                  onMouseDown={(e) => e.preventDefault()}
                  class={{
                    'focus-inner inline-flex w-full items-center whitespace-nowrap bg-white px-3 py-2 text-left text-sm font-medium text-slate-900 hover:text-blue-600':
                      true,
                    'border-t border-slate-100': item.border,
                  }}
                  onClick={() => {
                    item.onClick && item.onClick();
                  }}
                >
                  {item.text}
                  {item.href && (
                    <span class="ml-auto pl-3 text-slate-400">
                      <Icon icon={IconDots} />
                    </span>
                  )}
                </a>
              )
            );
          })}
        </div>
      </div>
    );
  }
}
