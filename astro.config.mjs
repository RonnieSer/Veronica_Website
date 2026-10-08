import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import { localLinks } from './src/lib/content-files.mjs';

const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site: process.env.SITE_URL || 'https://ronnieser.github.io',
  base,
  output: 'static',
  trailingSlash: 'always',
  compressHTML: true,
  prefetch: false,
  markdown: { processor: unified({ remarkPlugins: [[localLinks, { base }]] }) },
  devToolbar: { enabled: false },
});
