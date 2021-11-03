import { newSpecPage } from '@stencil/core/testing';
import { StreamlinePost } from './streamline-post';
import { StreamlineEntries } from '../streamline-entries/streamline-entries';
import { disposeInternal } from '../../store/internal';
import { disposeLocal, stateLocal } from '../../store/local';
import { setData } from '../../test/setData';
import { StreamlineInput } from '../streamline-input/streamline-input';

beforeEach(async () => {
  disposeInternal();
  disposeLocal();
  setData();
});

describe('Render posts', function () {
  it('and check if the right amount of posts render', async () => {
    stateLocal.active = 'post';
    const page = await newSpecPage({
      components: [StreamlineEntries, StreamlinePost],
      html: `<streamline-entries></streamline-entries>`,
    });
    const el = page.doc.querySelector('streamline-entries');
    const postAmount = el.shadowRoot.querySelectorAll('streamline-post').length;
    expect(postAmount).toBe(3);
  });
  it('and check if the right data is set', async () => {
    stateLocal.active = 'post';
    const page = await newSpecPage({
      components: [StreamlineEntries, StreamlinePost],
      html: `<streamline-entries></streamline-entries>`,
    });
    const titles = [];
    const titlesInner = [];
    const slugs = [];
    const el = page.doc.querySelector('streamline-entries');
    el.shadowRoot.querySelectorAll('streamline-post').forEach((item) => {
      titles.push(item.getAttribute('post-title'));
      titlesInner.push(item.shadowRoot.querySelector('.post-title').innerHTML);
      slugs.push(item.getAttribute('post-slug'));
    });
    expect(titles[0]).toBe('Hello world!');
    expect(titles[1]).toBe('Documentation');
    expect(titles[2]).toBe('Home');
    expect(titlesInner[0]).toBe('Hello world!');
    expect(titlesInner[1]).toBe('Documentation');
    expect(titlesInner[2]).toBe('Home');
    expect(slugs[0]).toBe('hello-world');
    expect(slugs[1]).toBe('documentation');
    expect(slugs[2]).toBe('home');
  });

  describe('in edit mode', function () {
    it('and render two inputs', async () => {
      stateLocal.active = 'post';
      const page = await newSpecPage({
        components: [StreamlineEntries, StreamlinePost],
        html: `<streamline-entries></streamline-entries>`,
      });
      const post = page.doc
        .querySelector('streamline-entries')
        .shadowRoot.querySelector('streamline-post').shadowRoot;
      post.querySelector('button').click();
      await page.waitForChanges();
      expect(post.querySelectorAll('streamline-input').length).toBe(2);
    });
    it('and make post invalid', async () => {
      stateLocal.active = 'post';
      const page = await newSpecPage({
        components: [StreamlineEntries, StreamlinePost, StreamlineInput],
        html: `<streamline-entries></streamline-entries>`,
      });
      const post = page.doc
        .querySelector('streamline-entries')
        .shadowRoot.querySelector('streamline-post').shadowRoot;
      post.querySelector('button').click();
      await page.waitForChanges();
      post.host.setAttribute('invalid', 'true');
      await page.waitForChanges();
      expect(post.querySelectorAll('streamline-button[invalid]').length).toBe(
        1
      );
    });
  });
});
