import { newSpecPage } from '@stencil/core/testing';
import { StreamlineBox } from './streamline-box';
import { StreamlineEntries } from '../streamline-entries/streamline-entries';

it('Render box', async () => {
  const page = await newSpecPage({
    components: [StreamlineBox, StreamlineEntries],
    html: `<div id="adminmenuwrap"></div>
           <streamline-box></streamline-box>`,
  });
  const el = page.doc.querySelector('streamline-box').shadowRoot;
  expect(el.querySelectorAll('streamline-sidebar').length).toBe(1);
  expect(el.querySelectorAll('streamline-search').length).toBe(1);
  expect(el.querySelectorAll('streamline-entries').length).toBe(1);
});
