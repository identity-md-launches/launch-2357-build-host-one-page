# Feed Claus validation

## Scope and assumptions

Completed on October 21, 2026. Scope: one static reading page, two primary reading destinations, native section navigation and an optional theme switch. The export is `dist/index.html` with four relative runtime assets. The source is complete HTML, CSS and one small JavaScript file. A framework would add no useful capability to this page.

The visual idea is a printed menu card in off white, dark ink and the supplied orange `#ec673a`, with an original SVG bowl. All factual content was supplied by the requester. No research destinations, stock imagery or fonts were fetched. Only development dependencies were downloaded. The supplied links, numbers, dates, caveats and footer attribution are retained. Semicolons in some menu items were split into short sentences. The mandatory job ID retains its hyphens; other visible page prose contains no dashes.

The primary action is “Read the two gates.” “See the menu” is secondary. All eight reading sections remain visible without scripts. No forms, wallet, transactions, trackers, backend or fabricated live data exist. The contributor platform hosts the static export after submission.

## Acceptance coverage

| Requirement | Evidence | Result |
| --- | --- | --- |
| Usable responsive page and primary interactions | Browser inspection at 320, 390, 768 and 1440; native gate and menu navigation, theme switch, keyboard and back to top | Met |
| Complete static HTML | Export equals source; script blocked by a test response CSP; all eight sections and six dishes remain; gate and menu links still work | Met |
| Source, lockfile and production export | Five runtime files in `dist/`; exact source parity; PNG header and dimensions validated; offline staged lockfile install | Met |
| Production build, typecheck and interaction validation | Commands and browser observations below | Met |
| Better Interface implementation and six domain review | Consolidated coverage and corrections below | Met |
| First 390 screen | Title and main action viewed; action at x 20, y 302.5, approximately 251 by 55.6 px; bottom 358.1 px | Met |
| Title, favicon, description, og:title, og:image | Source checks and local resources; real 1200 by 630 PNG | Met |
| Root design documentation | `DESIGN.md` extracted from final source and rendered behavior | Met |
| Install, preview and rebuild instructions | Root `README.md` | Met |

## Better Interface coverage

All six pinned core domains were read and applied during implementation. Source review and browser measurements are distinguished below. Browser screenshots are not screen reader sessions.

| Domain | Coverage | Result and limitations |
| --- | --- | --- |
| Accessibility | Native links and button, one h1 and main, heading structure, captioned table, explicit control name and pressed state; keyboard Tab, Enter and Space; visible focus captures; final axe scan | Checked. Zero axe violations at both tested sizes. No screen reader, forced colors or physical device testing. |
| Layout | Reading order, single column default, content rails, 42rem and 62rem breakpoints; 320, 390, 768 and 1440 widths; 200% root text enlargement | Checked. No final horizontal overflow, overlapping or clipped text. Native browser zoom and RTL mirror were not tested. English is the only supplied locale. |
| Writing | Action labels, supplied claims and caveats, exact URLs and numeric phrases, draft date, absence of invented risk or payment details | Checked. All text is in HTML, including decorative punctuation. No error or empty flows apply to this reading page. |
| Typography | Six size tokens, two font stacks, two weights, descending headings, line heights and bounded measures; actual wrapping at four widths and enlarged text | Checked. No truncation. Fonts are system stacks; physical platform fallback differences remain untested. |
| Colors | Semantic tokens and both themes; actual solid foreground/background pairs; primary, secondary and soft surfaces; focus observations | Checked. Lowest measured text contrast is 4.92:1. Light theme control boundary was raised from 1.65:1 to 5.91:1. |
| UI | Flat surfaces, native anchors, hover, pressed and focused controls, theme persistence, local SVG artwork and PNG share image | Checked. No motion, dialogs, forms, loading, transaction or empty states apply. Print styles exist but print rendering was not checked. |

## Findings and repairs

1. **High, layout and accessibility: enlarged text overflow.** Source `src/style.css:54`, `src/style.css:70`, `src/style.css:107`. At 390 with root text enlarged to 200%, the document was 567 px wide. The header controls did not wrap and the table had excessive inline padding. Added header wrapping, allowed long text to wrap and reduced table inline padding from 1rem to .5rem. Rechecked at 320, 390, 768 and 1440 with 200% text. Every document width equaled its viewport, with no overflowing elements.

2. **Medium, UI: static risks resembled links.** Source `src/style.css:119`. The menu's risk emphasis used underlines although it was not interactive. Replaced this with bold text. Final full page screenshots show evidence links underlined and static risk statements bold.

3. **Medium, colors: faint control boundary.** Source `src/style.css:73`. The light theme switch border used the structural rule color, measuring 1.65:1 against paper. Changed the boundary to `--muted`. The final resting boundary measures 5.91:1. Hover uses ink and the dark selected state uses orange. Labels and focus remain visible.

4. **Low, accessibility: visible and accessible label mismatch.** Source `index.html:25`. The home link showed “For @contractclaus” but named itself “Feed Claus.” Its accessible name now includes the complete visible label and its destination. Final semantic and axe review passed.

5. **Low, share graphic: crowded arrow.** Source `assets/share.svg:6`. The arrow touched the right edge of its orange box. Increased the box width from 324 to 350 and regenerated the PNG. The final 1200 by 630 graphic was read back and visually inspected.

6. **Low, content integrity: decorative punctuation generated in CSS.** Source `index.html:176`, `src/style.css:123`. Moved question marks into decorative HTML spans so every visible character is present in a plain fetch. The source checks and final rendered review passed.

No unresolved site defects were observed in the tested scope.

## Build and artifact checks

| Operation | Actual result |
| --- | --- |
| `npm run build` after final source change | Exit 0. Complete export generated. |
| `npm run typecheck`, with the pinned compiler on the task tool path | Exit 0. TypeScript checks `src/theme.js` with strict checking and DOM types. |
| `npm run check` | Exit 0. Checks source/export equality, asset parity, metadata, unique IDs, all anchors, 11 exact source URLs, six dishes, two gates, required numeric phrases, absence of forms or remote scripts, dash rule, PNG signature/dimensions, lockfile agreement and export byte allocation. |
| Offline `npm ci` in a separate task staging directory | Exit 0, one package installed. Repository installed dependency directories were not created. |
| Compiler archive integrity | SHA512 matched the exact lockfile integrity obtained from the official registry. |
| Pinned taste CLI | Attempted with an explicit installed Playwright module and `--out test/scratch/taste --offline`. Exit 2 because the expected browser executable was unavailable. It did not measure the page. |

The initial shell package requests to the official registry and an alternate registry failed with `EAI_AGAIN`. Browser access to the official npm registry succeeded. The compiler archive was transferred into task temporary storage, verified and installed there. No archive or cache is delivered. The lockfile's resolved URL is the official registry.

Two validation fixture mistakes were repaired: an overbroad remote script regex matched the supplied `.json` link, and a case sensitive phrase needed to follow the new sentence boundary “About $300.” The targeted checks were rerun and passed. Neither was a website runtime failure.

## Browser evidence

The source preview was served under `/preview/` from the production directory. Normal loads requested only HTML, local CSS, the local theme script and the local favicon. All returned HTTP 200. Final normal page inspection reported zero console errors or warnings. No external runtime request was made.

The pinned probe's browser launcher could not run. As a bounded fallback, its original DOM collector and scoring rules were executed through the provided browser tool, against the final production page. The render input used the actual rendered character count and observed console/resource results. All 16 adapted checks passed. `browser-checks.json` records the method and individual results. Motion coverage is explicitly an absence check: there are no authored transitions or animations and zero running animations were observed. Reduced motion emulation was not available. This result is separate from the failed original CLI command.

The adapted measurements found no horizontal scrolling at 320, 390 or 1440, no overlapping text, no clipped text and no floating controls over content. An additional 768 check was also clear. There are six computed text sizes, two font families and two weights. First screen prose is 20 words at 390 and 1440. Thirteen standalone controls have at least 44 px height; inline evidence links use the inline text exception.

Interactions exercised in the browser:

* Keyboard skip link followed by Enter focused `main`.
* Four Tab stops from a fresh page reached the primary action; its visible 2 px outline was inspected. Enter navigated to `#gates`, 24 px below the viewport top.
* Pointer navigation reached the gates and six item menu. Footer navigation returned to scroll position 0.
* Space toggled the theme with `aria-pressed=true`. Reload preserved the dark choice. Toggling back restored light.
* A test only CSP blocked all page scripts. The theme button stayed hidden; a plain fetch still included the final question and footer. All eight sections and six dishes rendered. Both gate and menu navigation worked and landed 24 px below the viewport top. The deliberate CSP script refusal is expected only in this test state.
* Root text size 200% reflowed at 320, 390, 768 and 1440 after repair. This was a text enlargement test, not native browser zoom.

### Rendered contrast

| Foreground and surface | Light | Dark |
| --- | --- | --- |
| Main ink on paper | 14.21:1 | 14.63:1 |
| Muted text on paper | 5.91:1 | 8.39:1 |
| Dark ink on orange action | 4.92:1 | 4.92:1 |
| Main ink on soft surface | 12.90:1 | 12.90:1 |

The final automated axe scan used engine 4.13.0, at 390 by 844 and 1280 by 844. Each viewport had zero violations, 22 passing rules and zero blocked requests. Its incomplete contrast items were decorative arrow glyphs and rail marks. Their rendered colors inherit the measured ink or muted pairs above. Decorative SVG drawing details are not text or essential state. Raw scan results are in `accessibility.json`. This does not establish full accessibility conformance.

### Final screenshots

* `screenshots/mobile-light.png`: 390 by 844 first screen.
* `screenshots/mobile-dark.png`: 390 by 844 first screen.
* `screenshots/mobile-focus.png`: visible skip link and focus outline.
* `screenshots/primary-focus.png`: dark theme primary action keyboard focus.
* `screenshots/desktop-light.png`: complete page at 1440 wide.
* `screenshots/desktop-dark.png`: complete page at 1440 wide.

These files were generated from the final source and read back for visual review. The editable share SVG and final PNG were also inspected. Desktop full page captures show the reading order, the economics table, all dishes and the footer.

## Packaging and completion

Runtime export: five files, 86,173 bytes. The build includes only HTML, CSS, the optional theme script, SVG favicon and PNG share image. Editable share SVG stays in source. No dependency tree, package cache, registry archive or submodule is delivered. The final file listing exposed ignored validation artifacts. A root `.gitignore` now explicitly includes `dist/` and `artifacts/`, and excludes generated dependency and cache directories at every nesting level. Its explicit 512 byte budget is in `path-budget.json`.

Path budget: source, configuration and documentation under 256 KiB; runtime export under 128 KiB; screenshots under 2 MiB. Final file measurements are recorded in `handoff.json`. This stays well below the 8 MiB submission limit. Git internals were not read or changed; the contributor platform creates the submission bundle.

**Complete for the stated scope, with verification limits.** WebKit, physical devices, screen reader sessions, native browser zoom, forced colors, print rendering and real social platform unfurls were not tested. The original taste CLI remains unavailable; the provided browser supplied the documented replacement measurements. External destination uptime and the supplied financial research were not independently verified because the requester explicitly prohibited fetching those sources. Worker observations are not independent certification.
