import { newSpecPage } from '@stencil/core/testing';
import { StreamlineSidebar } from './streamline-sidebar';

it('Render sidebar', async () => {
  const page = await newSpecPage({
    components: [StreamlineSidebar],
    html: `<streamline-sidebar></streamline-sidebar>`,
  });
  expect(page.root).toEqualHtml(`
<streamline-sidebar>
      <mock:shadow-root>
        <nav class="bg-blue-gray-50 border-blue-gray-300 border-r flex flex-col h-full overflow-visible w-[var(--sl-side-w)]">
          <streamline-button icon="wordpress" type="primary"></streamline-button>
          <div class="flex flex-col h-full">
            <streamline-button icon="fav" text="Fav" type="sidebar"></streamline-button>
            <streamline-button icon="menu" text="Menu" type="sidebar"></streamline-button>
            <streamline-button icon="post" text="Post" type="sidebar"></streamline-button>
            <streamline-button class="mt-auto" icon="settings" text="Settings" type="sidebar"></streamline-button>
          </div>
        </nav>
      </mock:shadow-root>
    </streamline-sidebar>
  `);
});
