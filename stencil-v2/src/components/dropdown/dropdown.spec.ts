import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { dispose } from '../../store/internal';
import { StreamlineDropdown } from './dropdown';

describe('streamline-dropdown', () => {
  let page: SpecPage;
  const e = () => page.doc.querySelector('streamline-dropdown').shadowRoot;

  beforeEach(async () => {
    dispose();
    page = await newSpecPage({
      components: [StreamlineDropdown],
      html: `<streamline-dropdown></streamline-dropdown>`,
    });
  });

  it('renders', async () => {
    expect(e()).toBeTruthy();
  });
});
