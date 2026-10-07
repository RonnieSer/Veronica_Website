import { existsSync } from 'node:fs';
import { dirname, extname, relative, resolve, sep } from 'node:path';

export const assetTypes = new Map([
  ['.pdf', 'application/pdf'], ['.pptx', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'],
  ['.png', 'image/png'], ['.jpg', 'image/jpeg'], ['.jpeg', 'image/jpeg'], ['.webp', 'image/webp'],
  ['.svg', 'image/svg+xml'], ['.gif', 'image/gif'], ['.avif', 'image/avif'],
  ['.csv', 'text/csv'], ['.txt', 'text/plain'], ['.bib', 'text/plain'], ['.zip', 'application/zip'],
  ['.mp4', 'video/mp4'], ['.webm', 'video/webm'],
]);

export function contentFileUrl(filePath, href, base = '/') {
  if (/^(?:[a-z][a-z\d+.-]*:|\/|#)/i.test(href)) return href;
  const match = href.match(/^([^?#]+)(.*)$/);
  if (!match) return href;
  const root = resolve('content');
  const target = resolve(dirname(filePath), decodeURIComponent(match[1]));
  const path = relative(root, target);
  if (path === '..' || path.startsWith(`..${sep}`) || path.startsWith('.')) {
    throw new Error(`Local link must stay inside content/: ${href}`);
  }
  if (!existsSync(target)) throw new Error(`Missing local file in ${filePath}: ${href}`);
  if (extname(target) === '.md') {
    const route = path.replaceAll(sep, '/').replace(/\/index\.md$/, '').replace(/^home$/, '');
    return `${base.replace(/\/$/, '')}/${route ? `${route}/` : ''}${match[2]}`;
  }
  if (!assetTypes.has(extname(target).toLowerCase())) throw new Error(`Unsupported attachment: ${href}`);
  return `${base.replace(/\/$/, '')}/content/${path.split(sep).map(encodeURIComponent).join('/')}${match[2]}`;
}

export function localLinks({ base = '/' } = {}) {
  return (tree, file) => {
    const walk = (node) => {
      if (node.type === 'link') node.url = contentFileUrl(file.path, node.url, base);
      if (node.children) node.children.forEach(walk);
    };
    walk(tree);
  };
}
