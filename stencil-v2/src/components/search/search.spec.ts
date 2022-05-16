import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { dispose } from '../../store/internal';
import { StreamlineSearch } from './search';

describe('streamline-search', () => {
  let page: SpecPage;
  const e = () => page.doc.querySelector('streamline-search').shadowRoot;

  beforeEach(async () => {
    dispose();
    page = await newSpecPage({
      components: [StreamlineSearch],
      html: `<streamline-search></streamline-search>`,
    });
  });

  it('renders', async () => {
    expect(e()).toBeTruthy();
  });
});
