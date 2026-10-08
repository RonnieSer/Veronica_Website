import test from 'node:test';
import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { contentFileUrl, localLinks } from '../src/lib/content-files.mjs';

const source = resolve('content/research/sample-map/index.md');

test('a file next to an entry works under a GitHub Pages subpath', () => {
  assert.equal(contentFileUrl(source, './map.svg', '/Veronica_Website/'), '/Veronica_Website/content/research/sample-map/map.svg');
});
test('file links preserve viewer fragments and query parameters', () => {
  assert.equal(contentFileUrl(source, './map.svg?view=full#detail'), '/content/research/sample-map/map.svg?view=full#detail');
});
test('relative Markdown links point to website pages', () => {
  assert.equal(contentFileUrl(source, '../sample-poster/index.md#overview'), '/research/sample-poster/#overview');
  assert.equal(contentFileUrl(source, '../../home/index.md'), '/');
});
test('external URLs and same-page anchors stay unchanged', () => {
  for (const href of ['https://example.org/paper.pdf', 'mailto:veronica@example.org', '#overview']) {
    assert.equal(contentFileUrl(source, href), href);
  }
});
test('missing files and paths outside content fail clearly', () => {
  assert.throws(() => contentFileUrl(source, './missing.pdf'), /Missing local file/);
  assert.throws(() => contentFileUrl(source, '../../../package.json'), /inside content/);
});
test('Markdown images stay available to Astro image optimization', () => {
  const tree = { type: 'root', children: [{ type: 'paragraph', children: [
    { type: 'image', url: './map.svg' }, { type: 'link', url: './map.svg', children: [] },
  ] }] };
  localLinks()(tree, { path: source });
  assert.equal(tree.children[0].children[0].url, './map.svg');
  assert.equal(tree.children[0].children[1].url, '/content/research/sample-map/map.svg');
});
