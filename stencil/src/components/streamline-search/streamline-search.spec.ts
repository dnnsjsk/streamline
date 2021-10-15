import { newSpecPage } from '@stencil/core/testing';
import { StreamlineSearch } from './streamline-search';
import { stateInternal, disposeInternal } from '../../store/internal';

beforeEach(async () => {
  disposeInternal();
});

// eslint-disable-next-line jest/no-commented-out-tests
/*
describe('Render search', function () {
  it('without enter button', async () => {
    const page = await newSpecPage({
      components: [StreamlineSearch],
      html: `<streamline-search></streamline-search>`,
    });
    const el = page.doc
      .querySelector('streamline-search')
      .shadowRoot.querySelector('button');
    expect(el).toBe(false);
  });
  it('with enter button', async () => {
    stateInternal.isEnter = true;
    const page = await newSpecPage({
      components: [StreamlineSearch],
      html: `<streamline-search></streamline-search>`,
    });
    const el = page.doc
      .querySelector('streamline-search')
      .shadowRoot.querySelector('button');
    expect(el).toBe(true);
  });
});
 */

it("Activate 'slash' mode after typing '/'", async () => {
  stateInternal.searchValue = '/';
  const page = await newSpecPage({
    components: [StreamlineSearch],
    html: `<streamline-search></streamline-search>`,
  });
  const input = page.doc
    .querySelector('streamline-search')
    .shadowRoot.querySelector('input');
  input.value = '/';
  input.dispatchEvent(new Event('input'));
  expect(stateInternal.isSlash).toBe(true);
});
