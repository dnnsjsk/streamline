// eslint-disable-next-line no-unused-vars
import { Component, h, Prop, Element, State } from '@stencil/core';
import { IconDots, IconLink } from '../../../icons';
import { computePosition, flip, shift } from '@floating-ui/dom';

/**
 * Dropdown.
 */
@Component({
  tag: 'streamline-ui-dropdown',
  shadow: true,
  styleUrl: 'streamline-ui-dropdown.scss',
})
export class StreamlineUiDropdown {
  private button: HTMLElement;
  private dropdown: HTMLElement;

  // eslint-disable-next-line no-undef
  @Element() el: HTMLStreamlineUiDropdownElement;

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
          'focus-white flex w-full h-full items-center justify-center group hover:opacity-100 focus:opacity-100 focus-within:opacity-100 hover:text-blue-600 focus:text-blue-600 focus-within:text-blue-600 hover:z-50':
            true,
          'opacity-0 relative !opacity-100 !pointer-events-auto':
            this.type === 'main',
          'opacity-100': this.type === 'entry',
        }}
      >
        <IconDots />
        <div
          ref={(el) => (this.dropdown = el as HTMLElement)}
          class={{
            'overflow-hidden flex flex-col border border-slate-400 shadow-md fixed transform opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-focus:opacity-100 group-focus:pointer-events-auto focus-within:opacity-100 focus-within:pointer-events-auto':
              true,
            'z-50 rounded-bl-md': this.type === 'main',
            'z-30 rounded-md': this.type !== 'main',
            'mt-[2px]': this.placement === 'top' && this.type !== 'main',
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
                    'text-left inline-flex items-center w-full bg-white focus-white px-3 py-2 whitespace-nowrap text-sm font-medium text-slate-900 hover:text-blue-600':
                      true,
                    'border-t border-slate-100': item.border,
                  }}
                  onClick={() => {
                    item.onClick && item.onClick();
                  }}
                >
                  {item.text}
                  {item.href && (
                    <span class="pl-3 ml-auto text-slate-400">
                      <IconLink />
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
