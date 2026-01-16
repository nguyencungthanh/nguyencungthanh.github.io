# hacdias.com (Hugo site)

> Source for the personal website of Nguyen Cung Thanh

## Quick start

- Install Hugo (extended): https://gohugo.io/getting-started/installing
- Run locally (include drafts and future):
  - `hugo server -D -F`
  - If 1313 is busy: `hugo server -D -F -p 1314`
- Build: `hugo` (outputs to `public/`)

## Project layout

- `config.toml`: Site config (title, author, menus, taxonomies, permalinks)
- `content/`: Markdown content
  - `posts/YYYY/MM/DD/…/index.md`: blog posts (leaf bundles)
  - `categories/`: section landing pages and copy
  - `writings-archive/`, `photos-archive/`: archive entry pages
  - `more/`, `about/`, `contact/`, etc.: standalone pages
- `layouts/`: Hugo templates and partials
  - `baseof.html`: base template; head/header/footer
  - `home.html`: homepage (recent writings/photos)
  - `_partials/`: reusable partials (post rendering, logs, helpers)
  - `_shortcodes/`: shortcodes (e.g., `logs`)
  - `tabular.html`: grouped list layout used by archives
- `assets/`: CSS/JS sources (processed by Hugo Pipes)
- `static/`: files served as-is (favicons, minisites, robots.txt)
- `data/`: structured data for pages (readings, watches, feeds)
- `public/`: build output
- `archetypes/`: content blueprints for `hugo new`

## Content model

- Posts live under `content/posts/YYYY/MM/DD/…/index.md`
  - Front matter keys commonly used:
    - `title`, `date`, `categories`, `tags`
    - `photos`: list of `{ url, title, width, height }`
    - `syndication`: list of URLs
  - URL pattern is configured in `config.toml`:
    - `[permalinks] posts = '/:year/:month/:day/:slug/'`
    - Set `slug:` in front matter or use a named bundle folder

### Images

- External media (preferred): use `image:` scheme
  - Example: `![Alt](image:2024-01-06-coffee-station)`
  - Resolved by `layouts/_partials/helpers/figure.html` to `https://media.hacdias.com`
- Local images: place next to `index.md` and reference by filename
  - Example: `![Alt](photo.jpg)`
  - Or place under `static/` and reference `/img/photo.jpg`

## Key templates and partials

- Base/layout
  - `layouts/baseof.html`: wraps pages; includes `_partials/base/head|header|footer`
  - `layouts/_partials/base/head.html`: meta/OG tags; inlines page `styles.css` if present
  - `layouts/_partials/base/header.html`: site name/handle from `params.author`
  - `layouts/_partials/base/footer.html`: copyright, theme toggles
- Post rendering
  - `layouts/_partials/post/header.html`: title/date block
  - `layouts/_partials/post/content.html`: main content; photos grid via `.Params.photos` and `helpers/figure`
  - `layouts/_partials/post/footer.html`: tags, reply links (email, fediverse, bsky)
- Lists/archives
  - `layouts/tabular.html`: archive layout; pulls `layoutPage` and renders grouped logs
  - `layouts/_partials/logs.html`: list renderer with optional yearly grouping and counts
  - `layouts/_partials/fns/group-date-year.html`: grouping helper
- Helpers
  - `layouts/_partials/helpers/figure.html`: responsive images; supports `image:` scheme and local resources
  - `layouts/_partials/fns/title.html`, `fns/description.html`: computed page title/description

## Shortcodes

- `layouts/_shortcodes/logs.html`: `{{< logs ... >}}` to render lists
  - Used on `content/readings/index.md`: `{{< logs data="readings" page="/tags/book-reviews/" >}}`

## Data-driven pages

- `data/readings.yaml`: entries for Readings page
- `data/watches/{live,movies,shows}.yaml`: Watches pages
- `data/feeds.json`, `data/external-links.json`: external references

## Navigation and taxonomies

- Menus: `config.toml` → `[menu.main]` blocks (order via `weight`)
- Taxonomies: `config.toml` → `[taxonomies]` (default `tag`, `category`)
- Tag and category pages use `layouts/taxonomy.html` and `layouts/term.html`

## Styling and scripts

- Global CSS: `assets/css/styles.css` (colors, layout, `.box`, `.buttons`, `.fg` grid)
- Page bundle CSS: add `styles.css` next to a page’s `index.md`; it will be inlined by `head.html`
- JS: `assets/js/app.js` if needed; page bundle JS can be included as resources

## Notes/Peculiarities

- Sections are kept minimal; most lists are explicit via partials/shortcodes
- The `/posts/` section itself does not render a listing; posts are accessed by permalink
- Archive pages (`writings-archive`, `photos-archive`) are thin content pages that delegate to templates

## License

Codebase licensed with [MIT License](LICENSE) © Nguyen Cung Thanh.
Content (e.g., articles, images, photos) is copyrighted unless otherwise noted.
