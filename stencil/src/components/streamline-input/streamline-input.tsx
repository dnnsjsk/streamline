// eslint-disable-next-line no-unused-vars
import { Component, Element, h, Prop } from '@stencil/core';
import { onChangeInternal } from '../../store/internal';

/**
 * Input.
 */
@Component({
  tag: 'streamline-input',
  shadow: true,
  styleUrl: 'streamline-input.scss',
})
export class StreamlineInput {
  private input: HTMLInputElement;

  // eslint-disable-next-line no-undef
  @Element() el: HTMLStreamlineInputElement;

  @Prop({ reflect: true }) ident: string;

  @Prop({ reflect: true, mutable: true }) invalid: boolean;

  @Prop() placeholder: string;

  @Prop({ mutable: true }) value: string;

  componentDidLoad() {
    onChangeInternal('isProcessing', (value) => {
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
      if (parent.tagName === 'STREAMLINE-POST') {
        const invalid = parent.shadowRoot.querySelectorAll(
          'streamline-input[invalid]'
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
      <div class="relative mt-1 w-full">
        <input
          ref={(el) => (this.input = el as HTMLInputElement)}
          type="text"
          id={this.ident}
          name={this.ident}
          value={this.value}
          placeholder={this.placeholder}
          onInput={this.onInput}
          class={`peer px-3 h-10 w-full border border-blue-gray-300 font-medium text-sm text-blue-gray-900 placeholder-transparent bg-white focus:outline-none focus-border ${
            this.invalid ? 'border-invalid' : ''
          }`}
        />
        <label
          htmlFor={this.ident}
          class={`px-2 py-1 left-1 bg-white pointer-events-none absolute -top-3 text-blue-gray-500 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:-top-3 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-blue-gray-500`}
        >
          {this.placeholder}
        </label>
      </div>
    );
  }
}
