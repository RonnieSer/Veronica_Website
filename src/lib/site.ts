import { getCollection, getEntry } from 'astro:content';

export const url = (path = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;

export async function page(id: 'home' | 'about' | 'cv') {
  const entry = await getEntry('page', id);
  if (!entry) throw new Error(`Missing content/${id}/index.md`);
  return entry;
}

export async function research() {
  return (await getCollection('research', ({ data }) => !data.draft))
    .sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title));
}

export async function selectedResearch() {
  const home = await page('home');
  const entries = await research();
  if (home.data.selected === undefined) return entries;
  return home.data.selected.map((id) => {
    const entry = entries.find((item) => item.id === id);
    if (!entry) throw new Error(`Home selected entry "${id}" is missing or a draft. Update content/home/index.md.`);
    return entry;
  });
}
