import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { dispose, state } from '../../store/internal';
import { StreamlineHeader } from './header';

describe('streamline-header', () => {
  let page: SpecPage;
  const e = () => page.doc.querySelector('streamline-header').shadowRoot;

  beforeEach(async () => {
    dispose();
    state.test = true;
    state.active = 'search';
    page = await newSpecPage({
      components: [StreamlineHeader],
      html: `<streamline-header></streamline-header>`,
    });
  });

  it('renders', async () => {
    expect(e()).toBeTruthy();
  });
});
