# nguyencungthanh.github.io

> Personal website of **Nguyen Cung Thanh** — built with [Hugo](https://gohugo.io).  
> Mathematics ♾️ · Computer Science 🖥️ · VinUniversity, Vietnam.

🌐 **Live site**: [nguyencungthanh.github.io](https://nguyencungthanh.github.io)

---
## Creating Content

### New Blog Post

```bash
make new name=your-post-slug kind=article
# Creates: content/posts/YYYY/MM/DD/your-post-slug/index.md
```

### Front Matter

```yaml
---
title: "Your Post Title"
date: 2026-04-30T00:00:00+07:00
categories:
  - writings    # math/blog posts → appears in "Mathematic Blog"
  - projects    # coding projects → appears in "Algorithm Project"
tags:
  - mathematics
  - analysis
draft: false    # set true to hide from production build
---
```

### Post URL Pattern

```
/:year/:month/:day/:slug/
→ https://nguyencungthanh.github.io/2026/04/30/your-post-slug/
```

---

## Project Structure

```
├── config.toml          # Site config: title, menus, URLs, taxonomies
├── Makefile             # Dev/build/vendor commands
├── FRAMEWORK.md         # Detailed workflow & architecture guide ← READ THIS
│
├── content/             # All Markdown content
│   ├── _index.md        # Homepage (intro text + featured posts list)
│   └── posts/YYYY/MM/DD/slug/
│       ├── index.md     # Post content + front matter
│       └── styles.css   # (Optional) per-post custom CSS, auto-inlined
│
├── layouts/             # Hugo HTML templates
│   ├── baseof.html      # Root wrapper (head/header/main/footer)
│   ├── single.html      # Post layout (with TOC sidebar)
│   ├── home.html        # Homepage layout
│   ├── _partials/       # Reusable components
│   └── shortcodes/      # Custom shortcodes
│
├── assets/
│   ├── css/styles.css   # Global stylesheet (Hugo Pipes)
│   └── js/app.js        # Theme toggle, Twemoji, search
│
├── static/              # Files served as-is (favicon, robots.txt, avatar)
├── data/                # Structured data for books, watches, feeds
├── archetypes/          # Templates for `hugo new`
└── public/              # Build output (auto-generated, do not edit)
```

> 📖 For the full architecture, layout system, and workflow details, see [**FRAMEWORK.md**](FRAMEWORK.md).

---

## Key Features

- **Math support** — MathJax renders LaTeX inline (`$...$`) and display (`$$...$$`)
- **TOC sidebar** — Auto-generated table of contents for all blog posts
- **Math shortcodes** — `{{< lemma >}}` and `{{< proof >}}` blocks
- **Per-page CSS** — Add `styles.css` next to any `index.md` for isolated styles
- **Search** — Full-text search powered by a JSON index
- **Atom + JSON feeds** — Subscribe at `/feed.xml` or `/feed.json`
- **Dark mode** — Automatic via `prefers-color-scheme`
- **Taxonomy** — Posts organized by `tags` and `categories`

### Algorithm Project decorations

The projects category uses the `project-networks` shortcode to render both neural
networks from `layouts/_partials/decorations/project-network.html`. Edit this shared SVG to
change the topology. Colors, timing, and responsive placement live in
`content/categories/projects/styles.css`. The page-specific
`assets/js/decorations/visibility.js` pauses animations offscreen and in hidden tabs;
CSS also respects the visitor's reduced-motion preference.

### Mathematics Blog typography and decorations

Mathematics Blog and Algorithm Project articles use self-hosted STIX Two Text
for prose. Source Sans 3 is the interface and general reading font, including
Random Thought; Lora supplies the page headings. MathJax retains its TeX SVG
rendering for formulas.

The writings category uses the `mathematics-decorations` shortcode for two
synchronized Euler scenes: a frontal helix with real/imaginary projections and
a flat unit circle above progressively drawn real and imaginary plots.
A small Canvas 2D renderer caches static geometry and shares a
capped animation loop. SVG fallbacks remain available without JavaScript.
Lorenz’s attractor and six convex polyhedra add two further mathematical scenes.
Desktop uses two side rails with small formula fragments; tablets use a grid,
and phones can swipe between the four panels.

See [Frontend organization](docs/FRONTEND.md) for component paths, font settings,
and animation performance controls.

---

## Deployment

Deployed automatically to **GitHub Pages** via GitHub Actions on every push to `main`.  
You never need to commit the `public/` directory.

---

## License

Code: [MIT License](LICENSE) © Nguyen Cung Thanh  
Content (articles, images): All rights reserved unless otherwise noted.
