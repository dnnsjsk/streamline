import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { dispose, state } from '../../store/internal';
import { StreamlineSettings } from './settings';
import { StreamlineHeader } from '../header/header';

const settings = require('../../../../stencil-v2/src/components/container/test/entriesSettings.json');

describe('streamline-settings', () => {
  let page: SpecPage;
  const e = () => page.doc.querySelector('streamline-settings').shadowRoot;

  beforeEach(async () => {
    dispose();
    state.test = true;
    state.active = 'search';
    state.entriesSettings = settings;
    state.entriesSettingsActive = settings;
    state.active = 'settings';
    page = await newSpecPage({
      components: [StreamlineSettings, StreamlineHeader],
      html: `<streamline-settings></streamline-settings>`,
    });
  });

  it('renders', async () => {
    expect(e()).toBeTruthy();
  });

  describe('entries', () => {
    it('render entries', async () => {
      const checkboxes = e().querySelectorAll('input[type="checkbox"]').length;
      expect(checkboxes).toBe(3);
      const number = e().querySelectorAll('input[type="number"]').length;
      expect(number).toBe(1);
    });

    it("when search is 'en'", async () => {
      state.searchValue = 'en';
      await page.waitForChanges();
      const checkboxes = e().querySelectorAll('input[type="checkbox"]').length;
      expect(checkboxes).toBe(2);
    });
  });

  it('save button enabled', async () => {
    const input = e().querySelector(
      'input[type="checkbox"]'
    ) as HTMLInputElement;
    input.checked = false;
    input.dispatchEvent(new Event('input'));
    await page.waitForChanges();
    expect(state.entriesSettingsHaveChanged).toBe(true);
  });

  it('keys to be visible', async () => {
    expect(e().querySelector('.keys').classList.contains('opacity-50')).toBe(
      false
    );
  });

  describe('save', () => {
    it('checkbox', async () => {
      const input = e().querySelector(
        'input[type="checkbox"]'
      ) as HTMLInputElement;
      input.checked = false;
      input.dispatchEvent(new Event('input'));
      await page.waitForChanges();
      const button = () =>
        e()
          .querySelector('streamline-header')
          .shadowRoot.querySelector('button');
      await button().click();
      await page.waitForChanges();
      expect(state.entriesSettingsHaveChanged).toBe(false);
      expect(state.entriesSettingsLoad.keys.navigation).toBe(false);
      expect(button().hasAttribute('disabled')).toBe(true);
      expect(e().querySelector('.keys').classList.contains('opacity-50')).toBe(
        true
      );
    });

    it('number', async () => {
      const input = e().querySelector(
        'input[type="number"]'
      ) as HTMLInputElement;
      input.value = '21';
      input.dispatchEvent(new Event('input'));
      await page.waitForChanges();
      const button = () =>
        e()
          .querySelector('streamline-header')
          .shadowRoot.querySelector('button');
      await button().click();
      await page.waitForChanges();
      expect(state.entriesSettingsHaveChanged).toBe(false);
      expect(state.entriesSettingsLoad.query.amount).toBe(21);
      expect(button().hasAttribute('disabled')).toBe(true);
    });
  });
});
