// eslint-disable-next-line no-unused-vars
import { Component, Prop, h } from '@stencil/core'
import { format } from '../../utils/utils'

@Component({
  tag: 'streamline-container',
  styleUrl: 'container.scss',
  shadow: true
})
export class StreamlineContainer {
  @Prop() first: string;
  @Prop() middle: string;
  @Prop() last: string;

  private getText (): string {
    console.log('hello')

    return format(this.first, this.middle, this.last)
  }

  render () {
    return (
      <div class="text-3xl bg-blue-200">Hello, World! I'm {this.getText()}</div>
    )
  }
}
