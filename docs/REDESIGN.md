# SchoolSource redesign plan (v2)

Written after a full review of the site, November 2026. HANDOFF.md section 2 (the owner's rules) still applies in full and wins over anything here.

## 1. Diagnosis

The site works and the content is honest, but the look has many patterns found on template and AI-made sites. Buyers are principals, trustees and purchase staff, so it has to read as a serious supplier they can hand a purchase order to.

Patterns that make it look generic:
- A small uppercase mono "eyebrow" label above every heading (CATEGORIES, ONE SOURCE, HOW IT WORKS ...).
- 01/02/03 numbering on almost everything, giant faded numerals in card corners, numbered circles on step rows.
- Rubber-stamp graphics, ruled notebook paper, handwriting font, decorative stamps in empty columns.
- Blue and orange radial glows behind every page header.
- Icon-in-a-square cards in rows of three and four "fact strip" cards.
- Pill chips everywhere: categories, filters, tags, labels.
- Every block fades up on scroll.
- A Three.js 3D scene (box, objects) in the hero. It is heavy for phones and decorative only.
- Shadows on everything, blue-tinted page background, so nothing has hierarchy.

Layout issues:
- Large empty left columns: "Six suppliers, or one", "Why SchoolSource" (filled with a stamp), "School kits".
- Mobile hero: the list illustration falls below the buttons, so the first screen is copy only. The floating WhatsApp button covers content.
- Too many CTAs repeating per screen.
- Visible `[PLACEHOLDER]` tokens on public pages.

## 2. Direction: "a supplier you can hand a purchase order to"

Calm, editorial and catalogue-like: a good printed trade catalogue rather than a startup landing page. Photographs of real school supplies lead, type is confident, and the colour is quiet with one blue and a little orange. Motion is functional: one hero entrance, hover and press feedback, and the two real interactive pieces (the order journey and the list to quotation). Nothing fades in on scroll.

Benchmarks for the feel: a well-made institutional supplier, Muji/HAY-style catalogue clarity, Stripe-level restraint. Not flashy.

## 3. Design system (Phase 1 builds this; everyone else only uses it)

### Colour (`app/globals.css` @theme, keep the token names so existing classes keep working)
| Token | Value | Use |
|---|---|---|
| `paper` | `#ffffff` | page background (was blue-tinted) |
| `paper-deep` | `#f4f5f7` | alternate band, image wells, input backgrounds |
| `ink` | `#0f1b2d` | text, dark band |
| `ink-soft` | `#4d5a6c` | secondary text (check ≥ 4.5:1 on both paper and paper-deep) |
| `board` | `#1f4fb5` | primary blue: buttons, links (owner's colour) |
| `board-deep` | `#173f93` | hover |
| `pencil` | `#f5872a` | orange accent, small doses only: the h1 underline, active nav marker, one highlight. Navy text only, never white |
| `pencil-soft` | `#fff1e3` | pending-placeholder background, rare highlight |
| `red` | `#c2410c` | small detail only (ticks) |
| `rule` | `#e3e7ee` | hairlines and borders (was blue) |

No gradients, no glows, no tinted backgrounds. One dark band per page at most (`ink`), plus the footer.

### Type
- Headings: **Source Serif 4** (next/font, variable, weights 500–600, optical sizing on). Sober and bookish, fits education. Headings in weight 600, tight leading, `-0.01em`.
- Body and UI: **Public Sans** (kept).
- Numbers in tables: Public Sans with `tabular-nums`. Drop IBM Plex Mono from the UI; keep the font variable only if the printable catalogue needs it, otherwise remove.
- Kalam handwriting: only inside the hero's handwritten list. Nowhere else.
- Scale: keep the existing fluid tokens but reduce `display` max to ~4.25rem.
- `Eyebrow` component: restyle to sentence case, Public Sans 0.875rem semibold, colour `board`, no letter-spacing, no mono, no uppercase. Use it rarely (at most one per page, only when a heading needs context). Most sections have no eyebrow.

### Shape, depth, spacing
- Radius: `sm` 6px (buttons, inputs), `md` 10px (cards), `lg` 14px (large images).
- Borders over shadows: cards are white with a 1px `rule` border and no shadow at rest. On hover a linked card lifts 2px and gains a soft shadow. `shadow-card` becomes very subtle; `shadow-button` removed (flat buttons).
- Section padding: keep `py-section`. Alternate `paper` and `paper-deep` bands rather than shadows to separate sections.
- Container width stays; every block sits on the same left and right edges.

### Components (Phase 1)
- **Button**: flat. `primary` solid board, hover board-deep, press `translate-y-px`. `secondary` white with a 1px ink/15 border, ink text, hover border ink/40 and paper-deep background. `accent` (orange, navy text) only on the dark band. `inverse` for dark band. `text` link with an underline that thickens or changes colour on hover. Remove the ink-fill sliding effect. Heights 44px (md) and 52px (lg); `sm` at least 40px.
- **PageHeader**: no glow, white background, hairline bottom border, breadcrumb in plain small sans (not mono, not uppercase), h1, intro. Optional aside. One entrance animation for the header only.
- **Section**: tones `paper` (white), `muted` (paper-deep), `ink` (dark). Keep `white`, `ruled` and `board` as aliases so pages compile, mapping `ruled`→paper, `board`→ink, and mark them deprecated in a comment.
- **Pending** (new, `components/ui/Pending.tsx`): wraps a missing fact. `<Pending label="PAYMENT TERMS" />`. When `process.env.NEXT_PUBLIC_SHOW_PENDING !== "false"` it renders the token as today (small, pencil-soft background, ink text). When set to `"false"` it renders nothing. Also export `showPending` boolean so a page can hide a whole sentence or list item that depends on the fact. Default is visible, as the owner's rule requires; the owner flips the env var at launch. Add the variable to `.env.example` with a comment.
- **Header**: remove `UtilityBar` from the layout. One header row: logo, nav (Products with the existing mega menu, Kits, Labs, How it works, About, Contact), right side: phone number as a plain link (xl and up), quote-list counter, "Request a quote" primary button. White, hairline bottom border, sticky, gets a subtle shadow only after scrolling. Active page: thin orange underline. Mobile: full-screen menu with the phone, WhatsApp and the quote button at the bottom. Rewrite the mega menu visually to match (white panel, hairline, category names in three band columns, no chips).
- **Mobile action bar** (replace `WhatsAppFloat` on small screens): a fixed bottom bar under `md` with two equal buttons, "WhatsApp us" and "Request a quote", safe-area padding, and `pb` on `body` so it never covers content. On `md` and up keep a small round WhatsApp button bottom-right with an accessible name.
- **Footer**: dark `ink` band. Columns: brand + one-line description + "A division of Arkhan Group Pvt. Ltd."; Categories (two columns, names only, no numbers); Company pages; Contact (phone, WhatsApp, email, address via Pending, GSTIN via Pending). Bottom row: © year, division line, privacy, terms. Remove the stamp graphic.
- **Remove**: `UtilityBar` from layout, `hero-glow`, `.ruled` paper backgrounds, `ink-fill`, the Three.js hero (`components/three/*`, and the `three`, `@react-three/fiber`, `@react-three/drei`, `@types/three` packages), `ScrollReveal` fade-ins (delete the component and its CSS; `data-reveal` attributes left in pages become harmless, page agents delete them as they go). Keep `Stamp`, `RuledPaper` and `PencilUnderline` files only if the hero still uses them.
- **Motion layer** (globals.css): buttons step on hover and press on click; linked cards lift 2px; photos inside linked cards zoom to 1.03 within their frame over 400ms; underlines draw. Respect `prefers-reduced-motion`. Easing `cubic-bezier(0.23, 1, 0.32, 1)`, 150–250ms for UI.
- **Styleguide** (`app/styleguide`): update to show the new tokens and components; it is internal.

## 4. Page plans (Phase 2)

Common rules for every page:
- Hero/page header alone on the first screen area; one primary action per screen.
- No eyebrow labels except where noted, no decorative numbering, no faded numerals, no stamps (hero only), no chips except real filters, no fade-in on scroll.
- Photographs lead. Use the existing photos in `public/images/photos` and product photos; no captions under images. Do not download new photos (owner rule).
- Copy: professional, warm, short sentences, no exclamation marks, no buzzwords, never invent facts, numbers, clients or prices. Keep every confirmed service claim accurate to HANDOFF.md section 2.5.
- Every missing fact goes through `<Pending>`.
- Mobile at 360–390px: one column, buttons full width, no horizontal scroll, tap targets ≥ 44px.

### Home (`app/page.tsx`, `components/home/*`)
1. **Hero**: h1 keeps the owner's tagline "Everything your school needs, from one source." with the orange underline on "one source". One sentence below naming what is sold and to whom, with a hard fact (GST invoice with every delivery). Buttons: "Request a quote" and "Send your list on WhatsApp". Right: the list-to-quotation piece, refined: the handwritten list card and the quotation document, clean and flat, the QUOTED stamp once, no 3D box, no Three.js. On mobile a compact version sits under the copy and the first screen shows the h1, sentence and both buttons. Under the hero, inside the same band, one quiet row of three confirmed facts with small line icons: "GST invoice and delivery challan with every order", "In-stock items delivered within a week", "Hyderabad and other states".
2. **Categories**: h2 "Fifteen categories, one order book" (or similar). Three groups (Everyday needs, Activities and events, Setup and infrastructure) each a heading and a photo grid of its categories: photo (3:2), name, one-line description; the whole card links to the category. Replaces the CategoryExplorer list+panel (delete it if unused).
3. **One supplier vs many** (OneSourceCompare): keep the toggle idea, but remove the empty left column: heading and short text on top, then a two-column comparison where the diagram and the three figures sit side by side and fill the width. Quiet styling, no orange dotted grid.
4. **How an order works**: four steps in a row (Share your list, Receive an itemised quotation, Checked and delivered, Pay on agreed terms with Pending), as plain text columns with a thin connecting rule, no numbered circles (small "Step 1" text is fine). Link to How it works.
5. **Kits**: three kits with photos (term start classroom, exam season, new admission student), and a link to all seven. Fix the empty image wells.
6. **Labs**: the one dark `ink` band: photo left, heading and the lab list right (Pending for the CBSE Composite Skill Lab line), button to /labs.
7. **Why schools use us**: a clean two-column list of five reasons (one order book, GST paperwork, scheduled delivery before term, samples at your school on request, checked before dispatch and replacements), no stamp. Mention Arkhan Group plainly.
8. **Closing**: "Send us this term's list" with WhatsApp and quote buttons, on `muted`.

### Products (`app/products/*`, `components/products/*`, `app/catalogue`)
- `/products`: page header with search; filters as a simple segmented control (All, Everyday, Activities, Setup); category grid as on the home page (consistent card). Remove the stats boxes (15 / 343 / 7) — the counts are real but read as vanity numbers; mention "343 items" once in the intro instead.
- `/products/[category]`: header with the category photo large on the right, name, description, Request a quote. Subcategory navigation as a sticky side list on desktop and a horizontal scroll row on mobile. Items in clean rows or tiles with "Add to quote" (keep `AddToQuoteButton` and `ItemPhotos` behaviour). Category note (e.g. uniforms made to specification) as a plain callout. Previous/next category links at the bottom.
- `/catalogue`: printable, keep functionality, restyle to the new type and colours; check print CSS.

### How it works, Kits, Labs
- `/how-it-works`: header, then the OrderJourney (keep the interaction, restyle flat: hairlines, no badges overload, WhatsApp-style panel kept since it shows the real update channel), logistics as a two-column list of six items with small line icons (no faded numerals), proof-before-printing as four plain steps, multi-branch and repeat orders on the dark band, FAQ as a clean accordion (hairline dividers), closing CTA.
- `/kits`: header, seven kits as photo cards with their item lists and "Get this kit quoted"; per-student kit packing explained in a split with a photo; BuyingCalendar restyled as a clean month table/grid.
- `/labs`: header with photo, lab types as a list with photos where available, how a lab project runs as plain steps, Pending for unconfirmed lines.

### About, Contact, Quote, legal, SEO
- `/about`: who we are (SchoolSource, the school supplies division of Arkhan Group Pvt. Ltd., Hyderabad, led by Ejaz Khan), what we supply, how we work (the confirmed promises), who we serve (principals, trustees, administrators, purchase staff; single schools and school groups). No invented history, years or numbers. Photo `page-about.jpg`.
- `/contact`: phone, WhatsApp, email as large clear rows; address, hours via Pending; a short contact form (QuickQuoteForm) on the right; book a visit with samples.
- `/quote`: the form, restyled: clear labels, 44px inputs, the quote list editor beside it, WhatsApp alternative. Keep Web3Forms logic intact.
- `/privacy`, `/terms`: LegalPage restyle, readable measure.
- SEO (Phase 8 items, now in scope): `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx` (next/og, on-brand, text-only: logo mark, tagline, schoolsource.in), Organization + LocalBusiness JSON-LD in the root layout (name, url, email, telephone, parentOrganization Arkhan Group Pvt. Ltd., founder Ejaz Khan, areaServed Hyderabad; no address until known), GA4 via `NEXT_PUBLIC_GA_ID` (only loads when set).

## 5. Execution

- **Phase 1 – foundation** (one agent): section 3. Then the lead reviews screenshots.
- **Phase 2 – pages** (four agents in parallel, each owns only its files):
  - A: Home (`app/page.tsx`, `components/home/*`).
  - B: Products (`app/products/**`, `components/products/*`, `app/catalogue/*`, `components/icons/*` if needed).
  - C: How it works, Kits, Labs (`app/how-it-works`, `app/kits`, `app/labs`, `components/how/*`, `components/kits/*`).
  - D: About, Contact, Quote, Privacy, Terms, SEO (`app/about`, `app/contact`, `app/quote`, `app/privacy`, `app/terms`, `components/quote/*`, `components/ui/LegalPage.tsx`, new `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx`, JSON-LD/GA additions to `app/layout.tsx`).
  - Shared files (`globals.css`, `components/ui/*` except LegalPage, `components/layout/*`, `lib/*`, `data/*`) are frozen in Phase 2. Agents report needed changes instead.
- **Phase 3 – integration** (lead): full build, lint, catalogue check, screenshots at 1440 and 390 of every page, accessibility and copy pass, HANDOFF.md update, commit and push.
