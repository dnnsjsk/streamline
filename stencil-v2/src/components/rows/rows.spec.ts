import { newSpecPage } from '@stencil/core/testing';
import { StreamlineRows } from './rows';
import { dispose, state } from '../../store/internal';

const menu = require('../../../../assets/test/entriesMenu.json');

const e = (page) => {
  return page.doc.querySelector('streamline-rows').shadowRoot;
};

beforeEach(() => {
  dispose();
});

describe('streamline-rows', () => {
  it('renders menu entries', async () => {
    state.entriesSearch = [...menu];
    state.entriesSearchActive = [...menu];
    const page = await newSpecPage({
      components: [StreamlineRows],
      html: `<streamline-rows></streamline-rows>`,
    });
    const el = e(page);
    const length = el.querySelectorAll('streamline-row').length;
    expect(length).toBe(63);
  });
});
