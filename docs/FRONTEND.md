# Frontend organization

The Hugo content and layout conventions stay in place. Content remains under
`content/`, while reusable rendering and styling live in `layouts/` and `assets/`.

## CSS source organization

The global stylesheet is split by responsibility:

| Source | Responsibility |
| --- | --- |
| `assets/css/base.css` | Design tokens, element defaults, links and utilities |
| `assets/css/layout.css` | Site header, container and float layout |
| `assets/css/components/forms.css` | Inputs, selects and inline forms |
| `assets/css/components/controls-and-cards.css` | Buttons, boxes and cards |
| `assets/css/components/code.css` | Code blocks and syntax highlighting |
| `assets/css/components/media.css` | Image previews and figure grids |
| `assets/css/components/tables.css` | Tables and archive lists |
| `assets/css/components/navigation.css` | Navigation, skip link and footer |
| `assets/css/components/article.css` | Article layout, TOC and reading utilities |
| `assets/css/theme.css` | Dark theme colors and theme visibility |
| `assets/css/responsive.css` | Shared mobile and print overrides |

Fonts, mathematical content, language controls, and publications retain their
existing dedicated stylesheets. Page-specific styles remain next to the page's
Markdown file as `styles.css`.

`layouts/_partials/assets/css.html` explicitly controls source order. Hugo
concatenates and minifies the sources into one fingerprinted `/css/styles…css`
file; splitting source files does not add browser requests. Add new shared
components to this ordered list rather than using browser-side `@import`.
Publication styles are loaded separately on publication pages and on Home when
`selectedPublications` is configured. Both lists use the shared
`layouts/_partials/publications/list.html` markup.

## Page scripts, search, and calculators

- `layouts/_partials/assets/js.html` loads the shared theme, emoji, and image-preview
  behavior. It is cached across pages.
- `layouts/_partials/assets/page-js.html` bundles a page's optional `script.js`
  resource, fingerprints it, and loads it with `defer` after the page markup.
  This partial is deliberately not cached across pages. Page scripts can import
  shared modules from `assets/` using paths such as `js/grade-model.mjs`.
- `assets/js/search.js` owns search events, URL history, rendering, and a cached
  index request. `search-model.mjs` matches title, content, summary, and tags.
  The search template supplies the generated index URL instead of hard-coding it.
- Calculator markup stays in `content/grade-calculator/*.html`; its event handlers
  are in `script.js` and styling is in `styles.css`, following the same page-resource
  convention. `assets/js/grade-model.mjs` handles numeric validation and formulas.
  User-supplied names are inserted through `textContent`.

Run `make check` before pushing. It builds into a temporary directory and checks
local links, CSS/font assets, integrity hashes, duplicate IDs, JSON, XML, and
required Atom entry fields. External URLs are not fetched.
`python3 scripts/check-site.py public` checks an existing build.

## Typography

| Responsibility | Source |
| --- | --- |
| Source Sans 3 variable font faces | `assets/css/fonts/source-sans-3.css` |
| Literata variable heading font faces | `assets/css/fonts/literata.css` |
| STIX Two Text variable font faces | `assets/css/fonts/stix-two-text.css` |
| Interface and article font rules | `assets/css/typography.css` |
| Equation containers and margin notes | `assets/css/components/math-content.css` |
| Language selector appearance | `assets/css/components/post-language.css` |
| Local WOFF2 files and licenses | `static/fonts/<family>/` |
| Single fingerprinted CSS bundle | `layouts/_partials/assets/css.html` |

`--font-ui` and `--font-display` currently select Literata for general reading,
navigation, controls, page headings, and the site identity. Source Sans 3 remains
available for small Canvas labels.
`--font-math` selects STIX Two Text for articles with category `writings`
or `projects`; `layouts/single.html` adds the `mathematics-post` class. Random
Thought uses the general reading family and its language selector.

Technical article previews use the same reading face through `mathematics-card`
in `layouts/_partials/list/item.html`; their titles use Literata. Headings inside
technical articles retain STIX Two Text.

All face definitions are in the shared stylesheet. Browsers only download the
font files for weights and Unicode ranges actually displayed. There are no
runtime Google Fonts requests. MathJax's TeX SVG output remains independent.

## Decorations

| Responsibility | Source |
| --- | --- |
| Mathematics scene markup | `layouts/shortcodes/mathematics-decorations.html` |
| Static Euler fallback | `layouts/_partials/decorations/euler-fallback.html` |
| Static unit circle and trace fallback | `layouts/_partials/decorations/phase-traces-fallback.html` |
| Lorenz integration and phase portrait | `assets/js/decorations/lorenz-attractor.js` |
| Six convex wireframe meshes | `assets/js/decorations/polyhedra.js` |
| Static Lorenz and polyhedra fallbacks | `layouts/_partials/decorations/{lorenz,polyhedra}-fallback.html` |
| Neural network SVG | `layouts/_partials/decorations/project-network.html` |
| Shared visibility / reduced-motion handling | `assets/js/decorations/visibility.js` |
| Euler geometry, projection, and Canvas renderer | `assets/js/decorations/euler-scene.js` |
| Flat unit circle and progressive plot renderer | `assets/js/decorations/phase-traces.js` |
| Mathematics responsive placement and palette | `content/categories/writings/styles.css` |
| Neural network appearance | `content/categories/projects/styles.css` |

The left Euler scene projects coordinates `(phase, real, imaginary)` using the
editable coefficients in `project`. The moving complex point has
real and imaginary projections onto two coordinate planes. The right scene shows
a unit circle above separate Re(z) and Im(z) plots. The rotating point connects
to the current sample in each plot with a dashed guide. This diagram uses only
flat 2D axes. The curves grow from phase zero to the moving endpoints on fixed
horizontal phase axes; a new sweep starts after two revolutions. The palette
follows the light/dark theme.

All four scenes share a phase and requestAnimationFrame loop. Grid planes, reference
curves, and plot axes are cached. Trace sampling uses a fixed-size array rather
than accumulating history. The renderers are split
into modules and bundled into one script by Hugo's `js.Build`.

`PERIOD_SECONDS` controls rotation speed; `SEGMENTS` controls path resolution.
CSS variables `--math-accent`, `--math-real`, and `--math-imaginary` set colors.
The dark palette is defined in `:root.dark .math-decoration-set` in the writings
stylesheet. Formula colors and opacity have independent `--math-formula`,
`--math-formula-secondary`, and `--math-formula-opacity` tokens; panel background
and border use `--math-panel-bg` and `--math-border`.
Rendering is capped at 30 fps on desktop and 24 fps on phones. Backing resolution
is limited to 720 pixels wide for the helix and 540 for the traces, with a pixel
ratio of 1.5 on phones / 2 on desktop.

For the right diagram, `CENTER` / `RADIUS` position the unit circle;
`REAL_BASELINE` / `IMAGINARY_BASELINE` position the plots. `AMPLITUDE` sets their
height, `PHASE_RANGE` sets the phase axis range, and `SAMPLES` sets resolution.
`PHASE_OFFSET` sets the starting orientation of the right diagram independently
of the left camera.

Decorations with `data-ambient-animation` receive an `is-paused` class and an
`ambient:visibility` event when their visibility changes. Hidden tabs, offscreen
scenes, and the reduced-motion preference stop the renderer. A static SVG remains
when Canvas or JavaScript is unavailable. Small phones use a native horizontal
scroll-snap gallery, so only the visible scene animates. On desktop, decorations
occupy the side margins only; no inline signature is inserted below the intro.

Desktop uses two independent side rails: Lorenz and the Euler helix on the
left; the 2D complex plane and a six-polyhedron gallery on the right. Short
windows allow the rails to scroll without covering the article. Tablets use a
two-column grid; phones use four snap panels. Decorative formula fragments live
inside desktop rails only. The former constellation, polygon, Bézier, and
rosette accent strips have been removed.

Lorenz uses RK4 with step 0.008, parameters sigma=10, rho=28, beta=8/3, and
an x/z projection. A reference trajectory is computed once; a bounded live tail
continues forward through the actual ODE. Polyhedra use normalized 3D vertices
with edges determined from their equal minimum distances. Six slowly rotating
meshes display their vertex/edge/face counts, including a triangular prism.
Both new scenes have inline SVG fallbacks generated from their renderer data.
No WebGL, external animation dependency, or blur filters are used.

References:
- Lorenz, *Deterministic Nonperiodic Flow* (1963): https://doi.org/10.1175/1520-0469(1963)020%3C0130:DNF%3E2.0.CO;2
- Euler's convex polyhedron formula: https://isa-afp.org/entries/Euler_Polyhedron_Formula.html

Accepted scene types are `helix`, `traces`, `lorenz`, and `polyhedra`.
Unsupported markup keeps its
static fallback instead of silently using the helix renderer. When renaming a
scene type or changing shortcode markup, restart a running Hugo development
server if its cached page content still contains the previous type. Use
`hugo server --disableFastRender` for local visual review.

## Article language

`assets/js/post-language.js` handles content, language-specific TOCs, preferences,
and section links. Its markup is in
`layouts/_partials/post/language-switcher.html`. It is included only for bilingual
Random Thought articles.
