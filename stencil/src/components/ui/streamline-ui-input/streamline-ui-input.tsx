// eslint-disable-next-line no-unused-vars
import { Component, Element, h, Prop, Host } from '@stencil/core';
import { onChange } from '../../../store/internal';

/**
 * Input.
 */
@Component({
  tag: 'streamline-ui-input',
  shadow: true,
  styleUrl: 'streamline-ui-input.scss',
})
export class StreamlineUiInput {
  private input: HTMLInputElement;

  // eslint-disable-next-line no-undef
  @Element() el: HTMLStreamlineUiInputElement;

  @Prop({ reflect: true, mutable: true }) invalid: boolean;

  @Prop() label: string;

  @Prop({ reflect: true }) uid: string;

  @Prop({ mutable: true }) value: string;

  componentDidLoad() {
    onChange('isProcessing', (value) => {
      if (value === true) {
        this.input.blur();
      }
    });
  }

  private onInput = (e) => {
    this.value = e.target.value;
    this.invalid = this.value === '';

    const parent = (this.el.getRootNode() as ShadowRoot).host;

    setTimeout(() => {
      if (parent?.tagName === 'STREAMLINE-DRAWER') {
        const invalid = parent.shadowRoot.querySelectorAll(
          'streamline-ui-input[invalid]'
        );
        const isValid = invalid.length === 0;
        if (!isValid) {
          parent.setAttribute('invalid', 'true');
        } else {
          parent.removeAttribute('invalid');
        }
      }
    }, 50);
  };

  render() {
    return (
      <Host class="block">
        <div class="relative mt-1 w-full">
          <input
            ref={(el) => (this.input = el as HTMLInputElement)}
            type="text"
            id={this.uid}
            name={this.uid}
            value={this.value}
            placeholder="No value"
            onInput={this.onInput}
            class={`peer px-3 h-12 w-full border border-slate-300 font-medium text-base text-slate-900 placeholder-rose-600 bg-white focus:outline-none focus-border ${
              this.invalid ? 'border-invalid' : ''
            }`}
          />
          <label
            htmlFor={this.uid}
            class={`px-2 py-1 left-1 bg-white pointer-events-none absolute uppercase text-xs font-medium -top-3 text-xs text-slate-500`}
          >
            {this.label}
          </label>
        </div>
      </Host>
    );
  }
}
