import { newSpecPage } from '@stencil/core/testing';
import { StreamlineButton } from './streamline-button';
import { stateLocal, disposeLocal } from '../../store/local';
import { stateInternal, disposeInternal } from '../../store/internal';

beforeEach(async () => {
  disposeInternal();
  disposeLocal();
});

describe('Render button with', () => {
  it("'type' set to 'primary' (WordPress icon)", async () => {
    const page = await newSpecPage({
      components: [StreamlineButton],
      html: `<streamline-button 
              type="primary"
              icon="wordpress">
             </streamline-button>`,
    });
    const el = page.doc.querySelector('streamline-button').shadowRoot;
    expect(el.querySelector('button').classList.contains('focus-darker')).toBe(
      true
    );
  });
  describe("'type' set to 'sidebar'", () => {
    it('and not active', async () => {
      stateLocal.active = 'fav';
      const page = await newSpecPage({
        components: [StreamlineButton],
        html: `<streamline-button 
                type="sidebar" 
                icon="menu">
               </streamline-button>`,
      });
      const el = page.doc.querySelector('streamline-button').shadowRoot;
      expect(el.querySelector('button').classList.contains('focus-dark')).toBe(
        true
      );
    });
    it('and active', async () => {
      stateLocal.active = 'menu';
      const page = await newSpecPage({
        components: [StreamlineButton],
        html: `<streamline-button 
                type="sidebar" 
                icon="menu">
               </streamline-button>`,
      });
      const el = page.doc.querySelector('streamline-button').shadowRoot;
      expect(
        el.querySelector('button').classList.contains('bg-blue-gray-800')
      ).toBe(true);
    });
  });
  describe("'type' set to 'menu'", () => {
    it('and not a favourite', async () => {
      stateLocal.active = 'fav';
      stateInternal.entriesFav = [];
      stateInternal.entriesFavActive = [];
      const page = await newSpecPage({
        components: [StreamlineButton],
        html: `<streamline-button 
                type="menu"
                href="google.com">
               </streamline-button>`,
      });
      const el = page.doc.querySelector('streamline-button').shadowRoot;
      expect(el.querySelector('a').classList.contains('focus-out')).toBe(true);
    });
    it('and a favourite', async () => {
      stateLocal.active = 'menu';
      const page = await newSpecPage({
        components: [StreamlineButton],
        html: `<streamline-button 
                type="menu"
                href="google.com">
               </streamline-button>`,
      });
      await page.waitForChanges();
      const el = page.doc.querySelector('streamline-button').shadowRoot;
      expect(el.querySelectorAll('svg').length).toBe(2);
    });
  });
});
