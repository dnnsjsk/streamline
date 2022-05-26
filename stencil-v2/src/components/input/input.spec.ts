import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { dispose, state } from '../../store/internal';
import { StreamlineInput } from './input';

describe('streamline-input', () => {
  let page: SpecPage;
  const e = () => page.doc.querySelector('streamline-input').shadowRoot;

  beforeEach(async () => {
    dispose();
    state.test = true;
    state.active = 'search';
    page = await newSpecPage({
      components: [StreamlineInput],
      html: `<streamline-input></streamline-input>`,
    });
  });

  it('renders', async () => {
    expect(e()).toBeTruthy();
  });
});
