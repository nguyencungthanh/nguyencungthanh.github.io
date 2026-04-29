# Site Framework & Workflow Guide

> A comprehensive reference for managing and maintaining **nguyencungthanh.github.io** — a Hugo-based personal website.

---

## Table of Contents

1. [Tech Stack Overview](#1-tech-stack-overview)
2. [Directory Map](#2-directory-map)
3. [How a Page is Rendered](#3-how-a-page-is-rendered)
4. [Content Workflow](#4-content-workflow)
5. [Styling Workflow](#5-styling-workflow)
6. [Template & Layout System](#6-template--layout-system)
7. [Data-Driven Pages](#7-data-driven-pages)
8. [Navigation & Taxonomies](#8-navigation--taxonomies)
9. [Shortcodes Reference](#9-shortcodes-reference)
10. [Build & Deploy Workflow](#10-build--deploy-workflow)
11. [Common Tasks Cheatsheet](#11-common-tasks-cheatsheet)

---

## 1. Tech Stack Overview

| Layer       | Technology                        | Purpose                                  |
|-------------|-----------------------------------|------------------------------------------|
| Generator   | **Hugo** (extended)               | Static site generator                    |
| Content     | **Markdown** (Goldmark)           | Blog posts, pages                        |
| Templating  | **Go HTML Templates**             | Layouts and partials                     |
| Styling     | **Vanilla CSS** (Hugo Pipes)      | Global + per-page styles                 |
| Math        | **MathJax**                       | LaTeX equation rendering                 |
| Emojis      | **Twemoji**                       | Cross-platform consistent emoji          |
| Hosting     | **GitHub Pages**                  | Deployment via GitHub Actions            |
| Feed        | **Atom XML + JSON Feed**          | RSS-style subscription                   |

---

## 2. Directory Map

```
nguyencungthanh.github.io/
│
├── config.toml              # ← Site config: title, menus, taxonomies, URLs
├── Makefile                 # ← Dev/build/vendor helper commands
├── README.md                # ← Quick start & project overview
├── FRAMEWORK.md             # ← This file: detailed workflow guide
│
├── content/                 # ← All written content (Markdown)
│   ├── _index.md            #   Homepage content + favoritePosts list
│   ├── posts/               #   Blog posts (organized by date)
│   │   └── YYYY/MM/DD/slug/ #   Each post is a leaf bundle
│   │       ├── index.md     #   Post content
│   │       └── styles.css   #   (Optional) per-post CSS
│   ├── about/               #   About page
│   ├── contact/             #   Contact page
│   ├── more/                #   "More" landing page
│   ├── books/               #   Books reading list
│   ├── watches/             #   Movies/shows tracking
│   ├── papers/              #   Academic papers
│   ├── slides/              #   Presentation slides
│   ├── resume/              #   Resume page
│   ├── search/              #   Search page
│   ├── grade-calculator/    #   Grade calculator tool
│   ├── categories/          #   Category landing pages (writings, projects)
│   ├── tags/                #   Tag taxonomy pages
│   ├── writings-archive/    #   Full writings archive
│   └── projects-archive/    #   Full projects archive
│
├── layouts/                 # ← Hugo templates
│   ├── baseof.html          #   Root wrapper (head + header + main + footer)
│   ├── home.html            #   Homepage layout
│   ├── single.html          #   Single post layout (with TOC sidebar for posts)
│   ├── list.html            #   Section list layout
│   ├── tabular.html         #   Archive grouped-list layout
│   ├── taxonomy.html        #   Tag/category index layout
│   ├── term.html            #   Individual tag/category layout
│   ├── search.html          #   Search page layout
│   ├── 404.html             #   Not-found page
│   ├── _partials/           #   Reusable template partials
│   │   ├── base/            #   Site-level structure
│   │   │   ├── head.html    #   <head>: meta, OG, CSS, fonts
│   │   │   ├── header.html  #   Site nav/header
│   │   │   └── footer.html  #   Site footer
│   │   ├── post/            #   Post-level structure
│   │   │   ├── header.html  #   Title, date, author metadata
│   │   │   ├── content.html #   Main body + photos grid
│   │   │   ├── footer.html  #   Tags, reply links (email/bsky)
│   │   │   └── feed-content.html # Stripped content for feeds
│   │   ├── fns/             #   Pure helper functions (no HTML output)
│   │   │   ├── title.html   #   Computed page title
│   │   │   ├── description.html # Computed page description
│   │   │   └── group-date-year.html # Year grouping for archives
│   │   ├── helpers/         #   Content helpers
│   │   │   └── figure.html  #   Responsive images (supports image: scheme)
│   │   ├── assets/          #   Asset injection
│   │   │   └── js.html      #   JS loading partial
│   │   ├── logs.html        #   List renderer (used in archives + home)
│   │   └── mathjax.html     #   MathJax configuration
│   └── shortcodes/          #   Hugo shortcodes
│       ├── logs.html        #   {{< logs data="..." >}} list renderer
│       ├── embed.html       #   {{< embed >}} generic embeds
│       ├── external-links.html # External link lists
│       ├── feeds.html       #   Feed display
│       ├── lemma.html       #   Math: {{< lemma >}} block
│       ├── proof.html       #   Math: {{< proof >}} block
│       ├── include-resource.html # Include a file resource
│       ├── resume-position.html  # Resume entry block
│       └── favicon.html     #   Favicon in shortcode context
│
├── assets/                  # ← Source files processed by Hugo Pipes
│   ├── css/
│   │   ├── styles.css       #   Main global stylesheet
│   │   └── vendor/
│   │       └── normalize.css #  CSS reset (downloaded by Makefile)
│   └── js/
│       ├── app.js           #   Main JS (theme toggle, Twemoji, etc.)
│       ├── search.js        #   Search functionality
│       └── vendor/
│           └── twemoji.min.js # (downloaded by Makefile)
│
├── static/                  # ← Files served as-is, no processing
│   ├── favicon.ico/.png     #   Site favicon
│   ├── animation_avatar.*   #   Profile avatar images
│   ├── robots.txt           #   Crawler rules
│   ├── ai.txt               #   AI crawler rules
│   └── humans.txt           #   Site credits
│
├── data/                    # ← Structured YAML/JSON for data-driven pages
│   ├── books.yaml           #   Books reading list
│   ├── feeds.json           #   Followed RSS feeds
│   ├── external-links.json  #   Curated external link collection
│   └── watches/             #   Movie/show tracking
│       ├── movies.yaml
│       ├── shows.yaml
│       └── live.yaml
│
├── archetypes/              # ← Templates for `hugo new` / `make new`
│   ├── article.md           #   Standard blog post
│   ├── project.md           #   Project post
│   ├── readings.md          #   Reading entry
│   ├── now.md               #   Now page entry
│   └── inchecken.md         #   Check-in entry
│
└── public/                  # ← Build output (git-ignored, do not edit)
```

---

## 3. How a Page is Rendered

Every page follows this render pipeline:

```
Request URL
    │
    ▼
config.toml (permalink rules) → resolves to content file
    │
    ▼
archetypes/ (defines front matter structure for that content type)
    │
    ▼
content/.../index.md (front matter + Markdown body)
    │
    ▼
layouts/baseof.html ← wraps everything
    ├── _partials/base/head.html   (meta, CSS, fonts)
    ├── _partials/base/header.html (site nav)
    ├── block "main" ──────────────────────────────────┐
    │       └── single.html / home.html / list.html    │
    │           └── _partials/post/header.html         │
    │           └── _partials/post/content.html        │
    │           └── _partials/post/footer.html         │
    └── _partials/base/footer.html (copyright, toggle) │
                                                       │
    assets/css/styles.css ─────────── processed by Hugo Pipes
    content/.../styles.css ─────────── inlined by head.html (if exists)
    assets/js/app.js ──────────────── loaded via _partials/assets/js.html
```

**Single post layout** (`single.html`) adds a TOC sidebar for `posts/` section:

```
<article class="post-with-toc">
  <header>  ← post/header.html (title, date)
  <div class="post-layout">
    <aside class="toc-sidebar">  ← auto-generated from headings
    <div class="post-body">
      ← post/content.html (Markdown + photos)
  <footer>  ← post/footer.html (tags, reply)
```

---

## 4. Content Workflow

### Creating a new blog post

```bash
# Using Makefile (recommended)
make new name=my-post-slug kind=article

# Manual equivalent
hugo new content/posts/$(date +%Y/%m/%d)/my-post-slug/index.md
```

This creates: `content/posts/YYYY/MM/DD/my-post-slug/index.md`

### Front matter reference

```yaml
---
title: "Post Title"           # Required
date: 2026-04-30T00:00:00+07:00  # Required
categories:
  - writings                  # Use "writings" for math/blog posts
  - projects                  # Use "projects" for project posts
tags:
  - mathematics
  - analysis
draft: false                  # Set true to hide from production
update: "2026-05-01"          # Optional: last-modified date (YYYY-MM-DD)
---
```

### Content organization rules

| Category    | Purpose                           | Shows in menu         |
|-------------|-----------------------------------|-----------------------|
| `writings`  | Math/academic blog posts          | ♾️ Mathematic Blog   |
| `projects`  | Algorithm/coding projects         | 🖥️ Algorithm Project |

### Post URL structure

Posts follow the permalink pattern from `config.toml`:
```
/:year/:month/:day/:slug/
→ e.g. /2026/04/30/my-post-slug/
```

The `slug` comes from either:
1. The bundle **folder name** (e.g., `my-post-slug/`)
2. An explicit `slug:` field in front matter

### Per-post custom CSS

Add a `styles.css` file next to your `index.md`. It will be **automatically inlined** into `<head>` by `_partials/base/head.html`:

```
content/posts/2026/04/30/my-post/
├── index.md
└── styles.css    ← optional, auto-detected and inlined
```

### LaTeX / Math

MathJax is globally enabled via `layouts/baseof.html` → `_partials/mathjax.html`.

- Inline math: `$...$` or `\(...\)`
- Display math: `$$...$$` or `\[...\]`

**⚠️ Known limitation**: Do not place HTML elements (e.g., `<span class="sidenote">`) _inside_ a math block. Place them outside and use CSS positioning.

### Math shortcodes

```markdown
{{< lemma >}}
Statement of the lemma here.
{{< /lemma >}}

{{< proof >}}
Proof content here.
{{< /proof >}}
```

---

## 5. Styling Workflow

### Style hierarchy (highest → lowest priority)

```
content/.../styles.css   (per-page, inlined in <head>)
      ↓
assets/css/styles.css    (global, processed by Hugo Pipes)
      ↓
assets/css/vendor/normalize.css  (CSS reset baseline)
```

### Global CSS structure (`assets/css/styles.css`)

The file is organized into these logical sections:

1. **CSS variables** — colors, fonts, spacing tokens
2. **Base / reset** — body, typography defaults
3. **Layout** — `.container`, `.post-layout`, `.post-body`
4. **Header & navigation** — site nav, menu links
5. **Post styles** — `.h-entry`, headings, prose
6. **TOC sidebar** — `.toc-sidebar`, `.toc-sticky`
7. **Sidenotes** — `.sidenote` positioning
8. **Math / code** — code blocks, MathJax overrides
9. **Lists / logs** — `.logs`, archive tables
10. **Shortcode styles** — `.lemma`, `.proof` blocks
11. **Forms** — contact, search inputs
12. **Footer** — copyright, theme toggle
13. **Dark mode** — `@media (prefers-color-scheme: dark)`
14. **Responsive** — `@media (max-width: ...)` breakpoints

### Adding styles for a specific page

1. Create `styles.css` next to the page's `index.md`
2. Write your page-specific CSS there
3. It is automatically inlined by Hugo — no imports needed

### Updating vendor CSS/JS

```bash
make all        # clean + re-download normalize.css + twemoji.js
make normalize  # re-download normalize.css only
make twemoji    # re-download twemoji.js only
```

---

## 6. Template & Layout System

### Layout selection (Hugo lookup order)

| Content type          | Template used        |
|-----------------------|----------------------|
| Homepage              | `layouts/home.html`  |
| Single post/page      | `layouts/single.html`|
| Section list          | `layouts/list.html`  |
| Archive pages         | `layouts/tabular.html`|
| Tag index             | `layouts/taxonomy.html`|
| Single tag page       | `layouts/term.html`  |
| Search page           | `layouts/search.html`|
| 404 page              | `layouts/404.html`   |

### Modifying the site header / navigation

Edit `layouts/_partials/base/header.html`.  
Menu items are defined in `config.toml` under `[[menu.main]]`.

### Modifying the site footer

Edit `layouts/_partials/base/footer.html`.

### Modifying the `<head>` (meta, CSS, fonts)

Edit `layouts/_partials/base/head.html`.

### Modifying post rendering

| What to change            | Edit this file                            |
|---------------------------|-------------------------------------------|
| Post title/date display   | `layouts/_partials/post/header.html`      |
| Post body + images        | `layouts/_partials/post/content.html`     |
| Tags, reply links         | `layouts/_partials/post/footer.html`      |
| TOC sidebar (all posts)   | `layouts/single.html`                     |

### Adding a new shortcode

1. Create `layouts/shortcodes/my-shortcode.html`
2. Use it in Markdown: `{{< my-shortcode param="value" >}}`

---

## 7. Data-Driven Pages

Some pages render from structured data files instead of Markdown:

| Page          | Data file                    | Format  |
|---------------|------------------------------|---------|
| Books         | `data/books.yaml`            | YAML    |
| Movies        | `data/watches/movies.yaml`   | YAML    |
| TV Shows      | `data/watches/shows.yaml`    | YAML    |
| Live events   | `data/watches/live.yaml`     | YAML    |
| External feeds| `data/feeds.json`            | JSON    |
| External links| `data/external-links.json`   | JSON    |

To add a new book entry, add to `data/books.yaml`:

```yaml
- title: "Book Title"
  author: "Author Name"
  year: 2025
  rating: 4
```

---

## 8. Navigation & Taxonomies

### Main navigation menu

Defined in `config.toml`:

```toml
[[menu.main]]
  name = '🌤️ About'
  pageRef = '/about'
  weight = 1        # controls order (lower = first)
```

To add a new menu item, append a new `[[menu.main]]` block and assign a unique `weight`.

### Taxonomies

Two taxonomies are active:

| Taxonomy   | URL pattern          | Used for                    |
|------------|----------------------|-----------------------------|
| `tags`     | `/tags/:slug/`       | Topic tags on posts         |
| `categories`| `/categories/:slug/`| Section grouping (writings, projects) |

Add them in post front matter:

```yaml
categories:
  - writings
tags:
  - hilbert-space
  - functional-analysis
```

### Homepage featured posts

Edit `content/_index.md` front matter:

```yaml
favoritePosts:
  - /posts/2026/01/22/average-generalized-fibonacci-sequence
  - /posts/2025/10/08/banach-space
```

Up to 4 posts are shown in "🌟 Favourite Posts" section.

---

## 9. Shortcodes Reference

| Shortcode             | Usage                                              |
|-----------------------|----------------------------------------------------|
| `lemma`               | `{{< lemma >}}...{{< /lemma >}}`                  |
| `proof`               | `{{< proof >}}...{{< /proof >}}`                  |
| `logs`                | `{{< logs data="books" page="/tags/books/" >}}`   |
| `embed`               | `{{< embed src="..." >}}`                         |
| `feeds`               | `{{< feeds >}}`                                   |
| `external-links`      | `{{< external-links >}}`                          |
| `include-resource`    | `{{< include-resource name="file.txt" >}}`        |
| `resume-position`     | `{{< resume-position title="..." dates="..." >}}` |

---

## 10. Build & Deploy Workflow

### Local development

```bash
# Standard: serve with drafts and future posts visible
hugo server -D -F

# Using Makefile (recommended)
make watch-all   # serve with drafts + future, minified
make watch       # serve production-like (no drafts)
```

Site will be available at: `http://localhost:1313`

### Production build

```bash
hugo --minify          # outputs to public/
# or
make build
```

### Deployment (GitHub Pages)

Deployment is automatic via **GitHub Actions** (`.github/workflows/`).

On every push to `main`:
1. GitHub Actions checks out the repo
2. Runs `hugo --minify`
3. Deploys `public/` to GitHub Pages

**You never need to commit `public/` manually.**

### Favicon regeneration

```bash
# Requires ImageMagick installed
make favicon
# Edit static/favicon.png first, then run above
```

---

## 11. Common Tasks Cheatsheet

| Task                              | Command / Action                                      |
|-----------------------------------|-------------------------------------------------------|
| Create new math post              | `make new name=my-topic kind=article`                 |
| Create new project post           | `make new name=my-project kind=project`               |
| Preview site locally (all)        | `make watch-all` or `hugo server -D -F`               |
| Build for production              | `make build` or `hugo --minify`                       |
| Add menu item                     | Edit `[[menu.main]]` in `config.toml`                 |
| Add tag to post                   | Add to `tags:` in post front matter                   |
| Feature a post on homepage        | Add path to `favoritePosts:` in `content/_index.md`   |
| Add per-page styles               | Create `styles.css` next to `index.md`                |
| Add a new shortcode               | Create `layouts/shortcodes/my-shortcode.html`         |
| Change site title/author          | Edit `[params.author]` in `config.toml`               |
| Update vendor CSS/JS              | `make all`                                            |
| Add book entry                    | Append to `data/books.yaml`                           |
| Change TOC behavior               | Edit `layouts/single.html` and related CSS            |
| Change post footer links          | Edit `layouts/_partials/post/footer.html`             |
