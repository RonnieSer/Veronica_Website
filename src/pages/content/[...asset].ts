import { readdir, readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import type { APIRoute } from 'astro';
import { research } from '../../lib/site';
import { assetTypes } from '../../lib/content-files.mjs';

export async function getStaticPaths() {
  const paths: { params: { asset: string }; props: { source: string } }[] = [];
  const folders = ['home', 'about', 'cv', ...(await research()).map((entry) => `research/${entry.id}`)];
  async function visit(folder: string) {
    for (const entry of await readdir(join('content', folder), { withFileTypes: true })) {
      if (entry.name.startsWith('.')) continue;
      const path = `${folder}/${entry.name}`;
      if (entry.isDirectory()) await visit(path);
      else if (entry.isFile() && assetTypes.has(extname(entry.name).toLowerCase())) {
        paths.push({ params: { asset: path }, props: { source: join('content', path) } });
      }
    }
  }
  for (const folder of folders) await visit(folder);
  return paths;
}

export const GET: APIRoute = async ({ props }) => {
  const source = props.source as string;
  return new Response(new Uint8Array(await readFile(source)), {
    headers: { 'Content-Type': assetTypes.get(extname(source).toLowerCase())!, 'X-Content-Type-Options': 'nosniff' },
  });
};
