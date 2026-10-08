# Veronica's website

A small, static research portfolio. Warm white, rose pink, serif text, and a flower mark. Home, Research, About, and CV. The CV opens in a new tab.

## Everyday editing

Everything you write or upload goes in `content/`:

```text
content/
  home/
    index.md                  # Name, intro, email, selected research
  research/
    your-study/
      index.md                # Title, details, and writing
      map.png                 # Images beside the writing
      poster.pdf              # Optional downloads, in the same folder
  about/
    index.md                  # Bio, education, and experience
  cv/
    index.md                  # Written CV or a link to your PDF
    cv.pdf                    # Optional; add your own
```

**Add research:** copy one of the four example folders in `content/research/`, rename it using lowercase words and hyphens, and edit `index.md`. Replace its images with yours. A minimal entry is:

```markdown
---
title: Your study title
type: Poster
description: A short sentence about the work.
cover: ./map.png
coverAlt: Describe what the map shows.
---

A short introduction.

![Describe what this image shows.](./map.png)

*Figure 1. A caption.*

[View the poster](./poster.pdf)
```

That is all you need. Research automatically appears on the Research page. `type` can be Poster, Map, Presentation, Manuscript, or any other label. Optional `year: 2026` and `order: 1` control its date label and order.

**Choose the home page entries:** edit the `selected` list in `content/home/index.md`. Each item is a research folder name. List them in the order you want. Remove the whole `selected` field to show all published entries automatically, or use `selected: []` to show none. Add `email: your@email.com` and change `title` and `role` in this same file.

**Update About:** write directly in `content/about/index.md`. Use `## Experience`, `## Education`, and paragraphs or lists, however you prefer.

**Update CV:** write in `content/cv/index.md`, or place your real `cv.pdf` beside it and add `download: ./cv.pdf` to the frontmatter. The navigation always opens the CV page in a new tab; the PDF button opens the document in another tab. No example qualifications or fake PDF are included.

**Hide unfinished work:** add `draft: true` to its frontmatter and remove it from Home's `selected` list. Its page and files will be excluded from the build. Files inside a published content folder are public, including unlinked attachments.

**Remove the samples:** delete the `sample-*` folders and replace Home's `selected` list. The four examples are clearly labeled as examples; their maps and charts are illustrations, not actual findings. When replacing a sample, remove `example: true`.

Use ordinary Markdown for headings, lists, images, links, tables, and code. Image links keep the original proportions and local raster images are optimized by Astro. Keep images reasonably sized; export a thumbnail image for a PDF poster and link to the full PDF. Attachments can be PDF, PowerPoint, CSV, text, BibTeX, ZIP, common images, MP4, or WebM. Prefer lowercase file names without spaces. Missing local files and broken selected entries fail the build with a clear error.

## Preview locally

Use Node 22.18 or newer:

```sh
npm ci
npm run dev
```

Open the address shown in the terminal. Before publishing:

```sh
npm run test
npm run check
npm run build
```

The output is ordinary HTML and CSS in `dist/`, with no browser JavaScript, analytics, remote fonts, or database. Images load lazily and reserve their dimensions.

## Publish

After the PR is merged, open **Repository settings → Pages → Build and deployment → Source → GitHub Actions**. The included workflow publishes updates to `https://ronnieser.github.io/Veronica_Website/` when `main` changes. If Pages was enabled after the merge, run **Actions → Publish website → Run workflow** once.

All links support the GitHub Pages repository prefix. For another static host, build with `npm run build` and publish `dist/`; the default base is `/`. A custom domain can be configured in GitHub Pages settings; the workflow reads the deployment's origin and base automatically. See the [official Astro GitHub Pages guide](https://docs.astro.build/en/guides/deploy/github/).

## Design files

The content folders are all you need for everyday updates. To change the design, edit `src/styles/site.css`. The small flower mark is an original SVG in `src/components/Flower.astro` and `public/flower.svg`. The detailed pink cosmos illustration in `src/assets/pink-cosmos.png` is by Andrea Stöckel, sourced from [Public Domain Pictures](https://www.publicdomainpictures.net/en/view-image.php?image=494961&picture=vintage-illustration-flowers-art), where it is offered as a public-domain image. Astro serves small responsive WebP versions with transparency; the downloaded original is preserved. The locally hosted STIX Two Text font license is included in `FONT-LICENSE.txt`. The entire site can be printed or saved as a PDF using the browser's print command.
