import { SpecPage, newSpecPage } from '@stencil/core/testing';
import { StreamlineRows } from './rows';
import { StreamlineRow } from '../row/row';
import { dispose, state } from '../../store/internal';

const menu = require('../../../../stencil-v2/src/components/container/test/entriesMenu.json');
const fav = require('../../../../stencil-v2/src/components/container/test/entriesFav.json');

describe('streamline-rows', () => {
  let page: SpecPage;
  const e = () => page.doc.querySelector('streamline-rows').shadowRoot;

  beforeEach(async () => {
    dispose();
    state.entriesSearch = [...menu];
    state.entriesSearchActive = [...menu];
    state.entriesFav = [...fav];
    state.entriesFavActive = [...fav];
    page = await newSpecPage({
      components: [StreamlineRows, StreamlineRow],
      html: `<streamline-rows></streamline-rows>`,
    });
  });

  it('renders', async () => {
    expect(e()).toBeTruthy();
  });

  describe('menu entries', () => {
    it('render', async () => {
      const rows = e().querySelectorAll('streamline-row').length;
      await expect(rows).toBe(63);
    });

    it('render favourites', async () => {
      const rows = e().querySelectorAll('streamline-row[is-fav]').length;
      await expect(rows).toBe(9);
    });
  });
});
