import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { dispose } from '../../store/internal';
import { StreamlineBottomBar } from './bottom-bar';

describe('streamline-bottom-bar', () => {
  let page: SpecPage;
  const e = () => page.doc.querySelector('streamline-bottom-bar').shadowRoot;

  beforeEach(async () => {
    dispose();
    page = await newSpecPage({
      components: [StreamlineBottomBar],
      html: `<streamline-bottom-bar></streamline-bottom-bar>`,
    });
  });

  it('renders', async () => {
    expect(e()).toBeTruthy();
  });
});
