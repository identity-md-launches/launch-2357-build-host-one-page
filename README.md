# Feed Claus

A one page static menu card for Claus's bounded FLOP testnet trial. All research content and links are in `index.html`. Reading and section navigation work without JavaScript. The optional theme button remembers one local preference.

## Install, preview and rebuild

Use Node 20 or newer. The build and preview use only Node built ins. TypeScript 5.7.3 is a development dependency for checking the browser script. There are no runtime packages.

To keep installed packages outside this repository:

```sh
mkdir -p /tmp/feed-claus-deps
cp package.json package-lock.json /tmp/feed-claus-deps/
npm ci --prefix /tmp/feed-claus-deps --ignore-scripts
PATH="/tmp/feed-claus-deps/node_modules/.bin:$PATH" npm run typecheck
npm run build
npm run check
npm run preview
```

Open `http://127.0.0.1:4173/preview/`. The preview also supports `/`. Stop it with Ctrl+C. The production files are the contents of `dist/`. Any static host can serve this directory at its root or a subpath. Hosting is performed by the contributor platform after submission; no public deployment was performed by the worker.

## Source and export

| Path | Purpose |
| --- | --- |
| `index.html` | Complete page content, links, semantics and share metadata |
| `src/style.css` | Tokens, responsive layouts and themes |
| `src/theme.js` | Optional theme preference control |
| `assets/` | Local favicon, share PNG and editable share SVG |
| `scripts/build.mjs` | Copies only the five required runtime files into `dist/` |
| `scripts/check.mjs` | Checks content, links, anchors, image format, export parity and size |
| `scripts/preview.mjs` | Local static preview |
| `.gitignore` | Includes the export and evidence; excludes generated folders within its 512 byte budget |
| `DESIGN.md` | Implemented design system |
| `artifacts/validation.md` | Coverage, corrections, evidence and limitations |
| `artifacts/screenshots/` | Final browser captures |

Edit content in the root HTML, then rebuild. Do not edit `dist/` directly. Asset URLs are relative. No backend, credentials, wallets, forms, trackers, external fonts or remote runtime requests are needed. All 11 supplied external source URLs are preserved exactly. They are links, not fetched data.

`assets/share.svg` is the editable share image master. If changing it, render a new 1200 by 630 `assets/share.png` before building. The committed PNG is a complete source asset and does not require regeneration for a normal rebuild.

## Validation performed

The final production build and `npm run check` passed. The export contains five files totaling 86,173 bytes. `npm run typecheck` passed using the pinned compiler staged outside the repository. An offline `npm ci` in a separate staging directory also passed, confirming that the manifest and lockfile install together. The downloaded compiler archive matched its published SHA512 integrity.

The supplied browser tool inspected the production export under a subpath at widths 320, 390, 768 and 1440. Navigation, keyboard focus, the skip link, theme toggling, theme persistence, reading with the page script blocked and 200% text enlargement were checked. The primary action is visible on the first 390 by 844 screen. No horizontal scrolling, overlapping text or clipped text remained at the tested widths.

The final axe scan reported zero violations and 22 passing rules at both 390 and 1280 wide. Its incomplete decorative arrow contrast items were reviewed separately using rendered color measurements. Minimum measured text contrast in both themes is 4.92:1.

The pinned taste CLI was attempted but could not launch a browser because its expected browser executable was unavailable. Its DOM collector and scoring rules were then run through the provided browser tool. All 16 adapted checks passed. The motion result confirms that this site has no authored motion; reduced motion was not emulated. This is not a successful run of the original CLI. The method and results are in `artifacts/browser-checks.json`.

Shell package requests failed with `EAI_AGAIN`. The compiler dependency was recovered through the browser, verified against the official registry integrity and installed into an external staging directory. No package archives, installed dependencies or caches are included in the submission.

WebKit, physical devices, screen readers, native browser zoom, forced colors, print rendering and real social platform unfurls were not tested. External research destinations were deliberately not fetched, as requested. The supplied research remains a dated draft snapshot. These are worker checks, not independent certification. Full details are in `artifacts/validation.md`.
