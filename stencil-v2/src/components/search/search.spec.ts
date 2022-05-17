import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { dispose, state } from '../../store/internal';
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

  it('types', async () => {
    const input = e().querySelector('input');
    input.value = 'MPH';
    input.dispatchEvent(new Event('input'));
    await page.waitForChanges();
    expect(input.value).toBe('MPH');
    expect(state.searchValue).toBe('MPH');
  });
});
