// eslint-disable-next-line no-unused-vars
import { Component, Element, h, Prop, Host } from '@stencil/core';
import { onChange } from '../../store/internal';

/**
 * Input.
 */
@Component({
  tag: 'streamline-input',
  styleUrl: '../../css/tailwind.scss',
  shadow: true,
})
// eslint-disable-next-line no-unused-vars
export class StreamlineInput {
  private input: HTMLInputElement;

  // eslint-disable-next-line no-undef
  @Element() el: HTMLStreamlineInputElement;

  @Prop() handleInput: Function;
  @Prop({ reflect: true, mutable: true }) invalid: boolean;
  @Prop() label: string;
  @Prop({ reflect: true }) uid: string;
  @Prop({ mutable: true }) value: string;

  componentDidLoad() {
    onChange('isLoading', (value) => {
      if (value === true) {
        this.input?.blur?.();
      }
    });
  }

  private onInput = (e) => {
    this.value = e.target.value;
    this.invalid = this.value === '';
    this.handleInput(e);
  };

  render() {
    return (
      <Host class="block">
        <div class="relative mt-1 w-full">
          <input
            title={this.value}
            ref={(el) => (this.input = el as HTMLInputElement)}
            type="text"
            id={this.uid}
            name={this.uid}
            value={this.value}
            placeholder="No value"
            onInput={this.onInput}
            class={{
              'focus-border peer h-12 w-full truncate rounded border border-slate-300 bg-white px-3.5 text-base font-medium text-slate-900 placeholder-rose-600 focus:outline-none':
                true,
              'border-invalid': this.invalid,
            }}
          />
          <label
            htmlFor={this.uid}
            class={`pointer-events-none absolute left-1.5 -top-3 bg-white px-2 py-1 text-xs text-xs font-medium uppercase text-slate-500`}
          >
            {this.label}
          </label>
        </div>
      </Host>
    );
  }
}
