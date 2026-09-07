# Bay Yard

The website for **Bay Yard**, Hlib Luppol's residential irrigation business in the South Bay —
inspection and repair, installation and new zones, controllers and smart irrigation, sprinklers
and drip.

Live at **https://hlib.luppol.com**, served by GitHub Pages from this repository.

## Running it locally

There is no install step, no build step and no dependencies.

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Any static server will do. Open `index.html` directly from the filesystem and the root-relative
paths (`/styles.css`, `/assets/...`) will not resolve — use a server.

## What is here

| File | Job |
|---|---|
| `index.html` | The whole site. Hero, services, why, how, pricing, work, reviews, service area, FAQ, estimate form, footer — anchor-linked. |
| `thanks.html` | Where the estimate form lands on success. A real page, not a swapped `<div>`. |
| `styles.css` | Design tokens and layout. The only stylesheet. |
| `estimate-form.js` | The only script. Form validation, the honeypot and the timing check — nothing else. |
| `assets/` | The crest, the favicon mark, and `work/` — confirmed-real job photographs only. |
| `CNAME` | `hlib.luppol.com`. This is what gives the project repo its own hostname. |
| `.nojekyll` | Stops GitHub Pages running Jekyll over the files. |

## Things that will bite you

**The page must work with JavaScript disabled.** The form posts natively to FormSubmit and the
browser's own validation takes over; the script only replaces the messages with better ones. If you
make the form depend on JavaScript, every visitor with a script blocker becomes a lost lead.

**The site's origin appears in exactly nine places, all of them in `index.html`'s `<head>` except
one.** Moving to another domain means editing them and nothing else:

- `index.html` — `link[rel=canonical]`, `og:url`, `og:image`, and five values inside the JSON-LD
  block (`@id` ×2, `url`, `logo`, `image`); plus the form's `_next` hidden input further down.
- `thanks.html` — `link[rel=canonical]`.
- `sitemap.xml` — `<loc>`, and `robots.txt` — the `Sitemap:` line.

Every other link and asset path is root-relative on purpose. Do not add an absolute self-URL.

**The city list lives in two places and they are the same fact.** The `.city-list` markup and the
JSON-LD `areaServed` array. Changing one without the other is a real bug, not a cosmetic one.

**`<!-- CSLB -->` in the footer is a contract, not a leftover comment.** It marks where the
contractor licence number goes. California B&P §7030.5 requires a licensee to carry the number in
all advertising, and a website is advertising. Leave the marker; do not tidy it away.

**Never write "bonded" on this site.** B&P §7071.13 makes any reference to a contractor's bond in
advertising grounds for licence suspension. "Licensed and insured" is fine when both are true;
"licensed, bonded and insured" is not.

**Only photographs of real jobs go in `assets/work/`.** No stock, no AI-generated images, anywhere
the page implies this is our work.

## Where the rest of the story lives

- Build specification — `~/Main/research/web/bay-yard/prompt_bay_yard_site_2026-09-07.md`
- Research behind the decisions — `~/Main/research/web/bay-yard/research_2026-09-07.md`
- What the site is still missing from Hlib — `~/Main/research/web/bay-yard/NEEDS-FROM-HLIB.md`
- Build log, gate results and defaults taken — `~/Main/research/web/bay-yard/BUILD-LOG.md`
