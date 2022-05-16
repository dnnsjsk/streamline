import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { dispose } from '../../store/internal';
import { StreamlineContainer } from './container';

describe('streamline-container', () => {
  let page: SpecPage;
  const e = () => page.doc.querySelector('streamline-container').shadowRoot;

  beforeEach(async () => {
    dispose();
    page = await newSpecPage({
      components: [StreamlineContainer],
      html: `<streamline-container></streamline-container>`,
    });
  });

  it('renders', async () => {
    expect(e()).toBeTruthy();
  });

  it('is visible with prop', async () => {
    expect(e().querySelector('div')).toBeTruthy();
  });
});
