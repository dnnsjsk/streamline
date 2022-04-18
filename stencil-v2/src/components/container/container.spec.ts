import { newSpecPage } from '@stencil/core/testing'
import { StreamlineContainer } from './container'

describe('streamline-container', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [StreamlineContainer],
      html: '<streamline-container></streamline-container>'
    })
    expect(root).toEqualHtml(`
      <streamline-container>
        <mock:shadow-root>
          <div class="bg-blue-200 text-3xl">
            Hello, World! I'm
          </div>
        </mock:shadow-root>
      </streamline-container>
    `)
  })

  it('renders with values', async () => {
    const { root } = await newSpecPage({
      components: [StreamlineContainer],
      html: '<streamline-container first="Stencil" last="\'Don\'t call me a framework\' JS"></streamline-container>'
    })
    expect(root).toEqualHtml(`
      <streamline-container first="Stencil" last="'Don't call me a framework' JS">
        <mock:shadow-root>
          <div class="bg-blue-200 text-3xl">
            Hello, World! I'm Stencil 'Don't call me a framework' JS
          </div>
        </mock:shadow-root>
      </streamline-container>
    `)
  })
})
