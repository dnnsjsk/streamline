import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { dispose } from '../../store/internal';
import { StreamlineEntries } from './entries';

describe('streamline-entries', () => {
  let page: SpecPage;
  const e = () => page.doc.querySelector('streamline-entries').shadowRoot;

  beforeEach(async () => {
    dispose();
    page = await newSpecPage({
      components: [StreamlineEntries],
      html: `<streamline-entries></streamline-entries>`,
    });
  });

  it('renders', async () => {
    expect(e()).toBeTruthy();
  });
});
