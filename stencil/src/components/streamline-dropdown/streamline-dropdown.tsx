// eslint-disable-next-line no-unused-vars
import { Component, h, Prop, Element, State } from '@stencil/core';
import { IconDots, IconLink } from '../../icons';
import { computePosition, flip } from '@floating-ui/dom';

/**
 * Dropdown.
 */
@Component({
  tag: 'streamline-dropdown',
  shadow: true,
  styleUrl: 'streamline-dropdown.scss',
})
export class StreamlineContainer {
  private button: HTMLButtonElement;
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
    const shiftByOnePixel = {
      name: 'shiftByOnePixel',
      fn({ y }) {
        return {
          y: y - 1,
        };
      },
    };

    computePosition(this.button, this.dropdown, {
      middleware: [flip(), shiftByOnePixel],
    }).then(({ y, placement }) => {
      this.placement = placement;
      Object.assign(this.dropdown.style, {
        top: `${y}px`,
      });
    });
  };

  render() {
    return (
      <button
        ref={(el) => (this.button = el as HTMLButtonElement)}
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
            ' flex flex-col border border-slate-400 shadow-md absolute -top-[200%] transform right-0 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto focus-within:opacity-100 focus-within:pointer-events-auto':
              true,
            'z-50': this.type === 'main',
            'z-30': this.type !== 'main',
            'mt-[2px]': this.placement === 'top' && this.type !== 'main',
          }}
        >
          {this.items.map((item) => {
            return (
              item?.text && (
                <a
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
      </button>
    );
  }
}
