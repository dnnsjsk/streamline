import { newSpecPage } from '@stencil/core/testing';
import { StreamlineSidebar } from './streamline-sidebar';

it('Render sidebar component', async () => {
  const page = await newSpecPage({
    components: [StreamlineSidebar],
    html: `<streamline-sidebar></streamline-sidebar>`,
  });
  expect(page.root).toEqualHtml(`
<streamline-sidebar>
      <mock:shadow-root>
        <nav class="auto-rows-max bg-gray-50 border-gray-300 border-r grid grid-flow-row h-full w-[var(--sl-side-w)]">
          <streamline-button icon="wordpress" type="primary"></streamline-button>
          <div class="auto-rows-max grid grid-flow-row">
            <streamline-button icon="fav" text="Fav" type="sidebar"></streamline-button>
            <streamline-button icon="menu" text="Menu" type="sidebar"></streamline-button>
            <streamline-button icon="post" text="Post" type="sidebar"></streamline-button>
          </div>
        </nav>
      </mock:shadow-root>
    </streamline-sidebar>
  `);
});
