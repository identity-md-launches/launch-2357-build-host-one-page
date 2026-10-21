# Feed Claus design

## Overview

Feed Claus is a reading page for Claus and the people assessing his bounded FLOP testnet trial. A printed menu card carries the visual idea: off white paper, dark ink, orange emphasis and a simple bowl drawing. The two gates are the primary reading destination. The six item menu is the secondary destination.

The complete content lives in `index.html`. Layout and tokens live in `src/style.css`. The only runtime script is `src/theme.js`. There is no component framework or external font dependency.

## Colors

The canonical values are hexadecimal CSS custom properties in `src/style.css:1`. The system preference block starts at line 31. The explicit dark preference starts at line 43.

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--accent` | `#ec673a` | `#ec673a` | Primary action, bowl fill, top edge and gate rules |
| `--paper` | `#f7f3eb` | `#20211d` | Menu card background |
| `--canvas` | `#e9e5dc` | `#161713` | Outside the menu card |
| `--ink` | `#24231f` | `#f7f3eb` | Reading text, drawings, focus and strong rules |
| `--muted` | `#625d53` | `#c0baae` | Dates, secondary labels, question marks and control boundary |
| `--rule` | `#c6bfb2` | `#57584e` | Structural separators |
| `--soft` | `#eee8dd` | `#2a2b25` | Hard stop and table heading backgrounds |
| `--on-accent` | `#24231f` | `#24231f` | Ink on the orange primary action |

Measured reading contrast is 14.21:1 in light and 14.63:1 in dark. Secondary text on paper measures 5.91:1 and 8.39:1. Primary action text on orange measures 4.92:1. These are measurements of rendered solid pairs, not an accessibility certification. The theme button boundary uses `--muted` instead of the lighter structural rule.

## Typography

Headlines use `Georgia, 'Times New Roman', serif`. Reading text and controls use `Arial, Helvetica, sans-serif`. These are system font stacks. Rendering depends on available system fallbacks. Requested weights are 400 and 700.

| Token | Value | Role |
| --- | --- | --- |
| `--text-small` | `.875rem` | Dates, navigation, availability and footer |
| `--text-label` | `1rem` | Controls, menu descriptions, summary and gate text |
| `--text-body` | `1.125rem` | Introduction and long reading sections |
| `--text-subhead` | `1.375rem` | Item and gate headings, item numbers |
| `--text-heading` | `2rem` | Section headings and gate numbers |
| `--text-display` | `clamp(3.5rem, 10vw, 6rem)` | Page title |

At the default 16 px root size, the title is 56 px at 390 wide and 96 px at 1440 wide. There are six computed sizes per tested width. Body line height is 1.6, introduction 1.55, subheadings 1.4 and serif headings 1.12. Title tracking is `-.055em`; section heading tracking is `-.025em`. Other text has natural tracking.

Headings use balanced wrapping. The introduction uses pretty wrapping. Long reading columns cap at `65ch`, menu descriptions at `72ch`. Text wraps rather than being clipped. The share table uses tabular numerals. Text remains selectable.

## Layout

Spacing tokens `--space-1` through `--space-6` are `.5rem`, `1rem`, `1.5rem`, `2rem`, `3rem` and `4rem`. The menu card caps at `74rem`. Sections have `3rem` block padding. Number columns, whitespace and a few rules organize the content.

The default layout is a single column with `1.25rem` gutters. Navigation and header controls wrap. The bowl drawing is hidden on narrow screens. The main action remains in normal document flow and appears on the first screen at 390 by 844.

At `42rem`, gutters become `2.5rem`. The hero becomes two columns, the bowl appears, the gates sit side by side and the final questions use two columns. At `62rem`, gutters become `4rem`. The card gets outer margins and a thin frame. Summary items form three columns. Terms, risks and economics use a `15rem` heading rail beside their reading column.

Browser inspection covered widths 320, 390, 768 and 1440. Text enlargement to 200% reflowed at all four widths after the header and table fixes. This is separate from native browser zoom, which was not tested.

## Elevation & Depth

The interface is flat. There are no shadows, gradients or overlays. Rules separate sections. A soft fill and orange edge identify the hard stop. The two gate articles use an orange top rule without surrounding cards.

## Shapes

Action controls use a 4 px radius. Status symbols use circular ink outlines. The page frame and reading sections have square edges. Decorative ink drawings are inline SVGs using `currentColor`. The favicon is `assets/favicon.svg`. The editable share master is `assets/share.svg`; its committed 1200 by 630 raster is `assets/share.png`.

## Components

These are HTML and CSS patterns, not framework exports.

| Pattern | Source | Behavior |
| --- | --- | --- |
| `.masthead`, `.wordmark` | `index.html:24`, `src/style.css:70` | Wrapping identity row; native link returns to the top |
| `.theme-toggle` | `index.html:29`, `src/theme.js`, `src/style.css:73` | Optional toggle with a stable visible label and `aria-pressed`; stores only the theme preference |
| `.primary-action` | `index.html:41`, `src/style.css:78` | Orange native anchor to the gates; ink fill on hover and press |
| `.text-action`, `.page-nav` | `index.html:42`, `index.html:57` | Native section navigation; no sticky layer |
| `.summary-list` | `index.html:69`, `src/style.css:86` | Three numbered items; stacked on mobile and columns on wide screens |
| `.gate` | `index.html:95`, `src/style.css:99` | Number, heading, text status and evidence; status is not color alone |
| `.hard-stop` | `index.html:88`, `src/style.css:95` | Critical term with bold label, soft background and accent edge |
| `.share-table` | `index.html:130`, `src/style.css:106` | Native table with caption and scoped headings; right aligned quantities |
| `.menu-list` | `index.html:146`, `src/style.css:113` | Numbered dishes, availability beside the heading, supplied details and bold risks |
| `.checks-list` | `index.html:176`, `src/style.css:121` | Plain questions with decorative punctuation present in HTML |
| `.skip-link` | `index.html:22`, `src/style.css:129` | First keyboard stop; becomes visible and focuses `main` on Enter |

All controls use native links or a button. Focus is a 2 px `currentColor` outline with a 5 px offset. Main controls and navigation targets have at least 44 px height. Inline evidence links retain their normal prose behavior. Hover changes are restricted to hover capable devices. Theme changes are immediate. There is no authored animation or transition.

When scripts are blocked, the theme control stays hidden, CSS follows the system preference and all reading and navigation still work. Loading, error, empty, transaction and form states are absent from this static reading product. Print CSS removes navigation and controls, but printed output was not rendered during validation.

## Do's and Don'ts

Reuse `.section`, `.split-section` and `.reading-column` when adding related reading content. Keep the six size tokens and the two font roles. Use orange as a filled primary action with dark ink. Preserve the supplied caveats beside their claims.

Keep source text in HTML and link to evidence with native anchors. Avoid adding hidden research content, remote assets, promotional badges, forms, wallet code or additional primary actions. Do not truncate numbers, identifiers or caveats. The job identifier retains its required hyphens; page prose contains no dashes.

For another page in this system, start with the same card, masthead, heading hierarchy and section primitives. Reuse the tokens and responsive breakpoints. Review actual content wrapping before adding a new size or breakpoint.

The design review used the pinned Better Interface guidance by Jakub Krehel, MIT, commit `267330e1adfc66a718fb65fa6918c1f06d0a689e`. This document follows the adapted Impeccable documentation method by Paul Bakaus, Apache 2.0, commit `9d715cc4f5564a990ca8345abfdd5df6dc9b41c8`. The supplied notices and full licenses are retained in `artifacts/licenses/design-guidance.txt`.
