# Adding and updating publications

Each paper has its own folder. Edit Markdown content and metadata; the publication list updates automatically without HTML or CSS changes.

```text
content/publications/
├── _index.md                  # List page title and shared settings
├── kress-bound/
│   └── index.md               # One paper's metadata and content
└── your-paper-slug/
    ├── index.md
    ├── paper.pdf              # Optional local PDF
    └── figure.png             # Optional illustration
```

The last example lives at `/publications/your-paper-slug/`. Keep folder names stable to preserve URLs you have already shared.

## 1. Create a paper

Run this command from the repository root:

```bash
make new-publication name=your-paper-slug
```

Equivalent Hugo command:

```bash
hugo new content --kind publication publications/your-paper-slug
```

This uses [archetypes/publication/index.md](../archetypes/publication/index.md). Alternatively, copy an existing paper folder and edit its `index.md`.

## 2. Fill in the metadata

```yaml
---
title: "Your Paper Title"
date: 2026-10-20
draft: true
status: under-review
authors:
  - First Author
  - Your Name
venue: "Journal or Conference Name"
paper_url: "https://example.com/paper.pdf"
---
```

| Field | Purpose |
| --- | --- |
| `title` | Paper title; clicking it opens the detail page. |
| `authors` | Authors in the same order as the paper. |
| `status` | `in-preparation`, `preprint`, `submitted`, `under-review`, `accepted`, or `published`. |
| `venue` | Journal or conference name only, without “Submitted to”. Leave empty if unknown. |
| `paper_url` | Paper, arXiv, DOI, or journal URL. Leave empty to omit `[pdf]`. |
| `date` | Paper date, used for automatic ordering; dates are hidden on the website. |
| `draft` | Keep `true` while writing; set to `false` to include the paper in production builds. |

For `submitted` and `under-review`, the site displays `Submitted to <venue>` automatically. Published papers display their venue alongside `Published`.

To attach a PDF, save it in the paper's folder and set `paper_url: "paper.pdf"`. The link resolves to that folder from both the list and detail pages. Additional materials can be linked in the Markdown body.

## 3. Write the four sections

Keep the headings supplied by the template:

```markdown
## Research Question

The specific question the paper addresses.

## Abstract

The paper's abstract.

## What This Paper Does

The approach, main results, and why they matter.

## My Contribution

- Your own contribution to the work.
```

Markdown, MathJax `$...$` / `$$...$$`, and local images such as `![Figure description](figure.png)` are supported.

The list renders metadata only. All four sections appear on the paper's detail page after clicking its title.

## 4. Change the order in one place

Open [data/publications.yaml](../data/publications.yaml). No paper needs a `weight` field.

For custom ordering, keep `mode: manual` and move folder names up or down:

```yaml
mode: manual
order:
  - lora-neurips
  - kress-bound
  - usa-tstst-geometry
```

The names identify the folders in `content/publications/`, not the paper titles. Existing papers retain their current order until you move their names. Papers missing from this list appear above the listed papers, newest date first, so adding a paper never requires renumbering or editing older papers. Add the new paper's folder name to the desired position only when you want to place it manually.

For fully automatic ordering, change just one line:

```yaml
mode: newest-first
```

This sorts all papers by `date`, newest first, and ignores `order`. From then on, new papers are placed automatically using the date in their metadata.

Draft papers are excluded from normal builds. Duplicate names and names of removed or draft papers in `order` are skipped without hiding other papers.

## 5. Preview

```bash
make watch-drafts
```

Open `/publications/` on the local server, then click the paper's title to check its detail page. Set `draft: false` when ready.

## Presentation files

- [data/publications.yaml](../data/publications.yaml): ordering settings and the optional custom order.
- [layouts/publications/list.html](../layouts/publications/list.html): the paper list.
- [layouts/_partials/publications/ordered-pages.html](../layouts/_partials/publications/ordered-pages.html): custom and automatic ordering, including new-paper fallback.
- [layouts/publications/single.html](../layouts/publications/single.html): paper detail pages.
- [layouts/_partials/publications/metadata.html](../layouts/_partials/publications/metadata.html): shared authors, status, venue, and `[pdf]` rendering. The `pdf` text is blue and underlined.
- [assets/css/components/publications.css](../assets/css/components/publications.css): styles shared by the list and detail pages, loaded only for publications.

Existing papers were moved from standalone `.md` files into `slug/index.md` bundles without changing their URLs. Research questions and overviews for those papers were summarized from their existing abstracts; original authorship, status, venue, links, and contribution statements were retained.
