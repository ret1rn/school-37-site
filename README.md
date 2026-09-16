# School #37 Website — Samarkand, Uzbekistan

A static website for Specialized School #37 in Samarkand, a school founded in 1936
with a specialised focus on English language education.

Live at **https://school-37.com** (GitHub Pages, domain set by `CNAME`).

## Running it locally

There is no build step. Any static file server works:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

Opening the `.html` files directly with `file://` mostly works, but relative
paths and the map behave better over HTTP.

## File structure

```
/
├── index.html           # Home: hero, statistics, video gallery, achievements carousel
├── about.html           # History timeline, mission, facilities tabs, staff, demographics chart
├── achievements.html    # Filterable achievements, admissions charts, student testimonials
├── contact.html         # Contact details, form, Leaflet map, chat widget
├── 404.html             # Not-found page
├── main.js              # Shared behaviour across all pages
├── favicon.svg
├── robots.txt
├── sitemap.xml
├── CNAME                # Custom domain for GitHub Pages
├── resources/           # Photographs (optimised; see "Images" below)
│   └── _originals/      # Pre-compression originals — local only, not committed
├── design.md            # Design philosophy notes
├── interaction.md       # Notes on the interactive components
└── outline.md           # Content outline
```

## How the pages are built

Everything is plain HTML with Tailwind utility classes. There is no bundler, no
framework and no package manager — each page carries its own `<style>` block and,
where it needs them, its own inline `<script>`. Shared behaviour lives in `main.js`.

Libraries are loaded from CDNs, and each page loads only what it actually uses:

| Library | Used by | For |
|---|---|---|
| Tailwind (Play CDN) | all pages | utility classes |
| anime.js | all pages | fade transitions |
| Splide | index, achievements | carousels |
| ECharts | about, achievements | charts |
| p5.js | index | hero particles |
| Leaflet | contact | map |

> **Note:** Tailwind's Play CDN compiles styles in the browser and prints a console
> warning that it is not for production. Replacing it with a pre-built stylesheet
> would remove the warning and make first paint noticeably faster.

## Images

Source photographs are large. Everything in `resources/` has been resized to the
largest size the layout actually renders (x2 for high-density screens) and saved as
progressive JPEG at quality 80. This took the image payload from **18.5 MB to 1.3 MB**.

Pre-compression originals are kept in `resources/_originals/`, which is git-ignored —
they exist only on the machine that ran the optimisation.

If you add a photo:

1. Resize it to at most ~1200px wide (2048px for a full-bleed hero).
2. Save as JPEG, quality ~80, progressive.
3. Add `width`, `height`, `loading="lazy"` and `decoding="async"` to the `<img>` tag.
   The intrinsic `width`/`height` prevent the page jumping about as images load.

## Known issues — read before making changes

- **The contact form does not send anything.** It has no `action`, and the submit
  handler shows a success message after a two-second delay without transmitting
  the data. See the `TODO` comment above the `<form>` in `contact.html`. This
  needs a form service (Formspree, Web3Forms), a `mailto:` fallback, or removal.
- **`files/transcripts/` contains personal student documents** and is served
  publicly by GitHub Pages — including a PDF named after an individual pupil.
  Nothing on the site links to it, but anyone with the URL can download it.
  The folder is listed in `.gitignore`, which stops *new* files being added;
  it does **not** untrack or unpublish what is already committed. Removing it
  properly means deleting the files, committing, and rewriting history so the
  old commits no longer carry them.
- **Some staff and student photographs do not match the person named beside them**,
  and some facility photographs are stand-ins from other parts of the school. See
  `PHOTO-CREDITS.md` for what is a genuine photograph and what is a placeholder.
- **A few figures contradict each other** between pages (graduate counts, FLEX
  finalist years, IELTS totals). These need someone with the real numbers to settle
  them; they are listed in `PHOTO-CREDITS.md` alongside the photo gaps.

## Accessibility and progressive enhancement

- Content is only hidden for scroll animations when JavaScript is running (the
  `.js` class on `<html>`), so a script failure leaves a readable page rather than
  a blank one.
- `prefers-reduced-motion` disables the fades, the carousel autoplay and the hero
  particles.
- Interactive controls are real `<button>` elements with accessible names, so the
  site can be operated from the keyboard.

## Deployment

Pushing to `main` publishes to GitHub Pages automatically. The `CNAME` file keeps
the custom domain attached — do not delete it.
