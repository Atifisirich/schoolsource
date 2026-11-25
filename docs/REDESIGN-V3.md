# SchoolSource redesign v3: "Bold Product"

The owner rejected v2 as generic, clumsy and unclear. They reviewed four concepts in `public/concepts/` and chose **D, "Bold Product"** (`public/concepts/d/index.html`), with "make it more better". This plan replaces docs/REDESIGN.md for anything visual. HANDOFF.md §0–2 (facts and content rules) still applies in full.

## 1. The direction

A confident Indian direct-to-consumer brand's look, applied to B2B school supply:

- Real school products shown as clean cut-outs on solid colour fields.
- Huge, chunky display type and one obvious message per screen.
- Playful but premium, never childish.
- The products are the heroes.

The reference build is concept D. Read its `index.html` fully (CSS at the top) before writing anything. Reuse its tokens, components and image assets (`public/concepts/d/img/*.webp`, `fonts/`).

## 2. Design system (port D's tokens exactly, then extend)

- **Colours**
  - blue `#1f4fb5`, blue-deep `#163b8a`, ink `#0e1f3d`, ink-soft `#2f3b55`
  - orange `#f5872a`, sky `#dbe7fb`, sky-2 `#c7d9f7`, cream `#f4ead9`, paper `#fbf7f0`, sand `#ead9bf`, peach `#f8d9b5`
  - WhatsApp green `#1fa855`, for the WhatsApp icon only
  - Never white text on orange: navy on orange only.
- **Type**
  - Display: **Dela Gothic One** (next/font/google, weight 400). Use it for h1, h2 and big statements.
  - Text: **Schibsted Grotesk** (next/font/google, 400–700).
  - Page background: `paper`.
- **Shape**
  - Radii 14 / 22 / 32px.
  - Pill buttons, 56px tall (48px for the small size).
  - Colour-field tiles with 22px radius.
- **Buttons** (as D):
  - primary = ink, hovering to blue
  - WhatsApp = white with an ink border and a green icon, hovering to ink
  - ghost
  - light
  - The press scales to 0.97.
- **Tiles:** colour fields `--o` orange, `--c` cream, `--s` sky, `--p` peach, `--b` blue (white text), `--n` ink (white text). Each tile has a cut-out product sitting on its bottom edge. On hover the tile lifts 2px and the object rises 6px.
- **Motion**
  - Hover and press on everything clickable.
  - The hero enters once on load.
  - The range-statement pop-in, once.
  - No fade-in on scroll.
  - Reduced motion is respected.
- **Mobile:** a fixed bottom bar with "WhatsApp us" and "Request a quote", and a full-screen menu.

## 3. "Make it more better": improvements over concept D

1. **Hero.** D's orange panel has a large empty middle. Fill it with a composed group of 3–4 product cut-outs (pencils, trophy, football, lunch box) that overlap like a product shoot, with the headline unchanged: "Everything your school buys. One quote."
2. **Clarity.** Every section opens with a one-line answer to "what is this and what do I do": a heading plus one sentence plus one action.
3. **Consistency.** Use the same tile and card system on every page, with no one-off styles.
4. **Inner pages.** The whole site gets the same language, not just the home page:
   - products and the 15 category pages
   - kits, labs, how it works
   - about, contact
   - quote, privacy, terms, catalogue
5. **Category pages**
   - A colour-field header with the category's cut-out or framed photo, its name in display type, and Request a quote and WhatsApp buttons.
   - Items as compact product cards: a photo, or a colour-field plate with the item name in display type when there is no photo. Each card has "Add to quote".
6. **Quote list.** Keep the existing quote list and its counter (`lib/quote-list.ts`, `AddToQuoteButton`, `QuoteListCounter`) and make it feel like a cart: the counter bumps on add.
7. **Performance.**
   - Cut-outs as WebP.
   - `next/image` with sizes.
   - Fonts through next/font.
   - Nothing heavy.

## 3a. Owner's follow-up: clean, minimal, simple

The owner added: "clean, minimalistic, make it simpler for school owners and principals to understand." Keep D's identity (bold display type, colour fields, product cut-outs, pill buttons), but:

- **Fewer elements and more white space.** Use at most 2–3 colour fields per screen, with paper as the dominant ground. No rainbow of tiles.
- **Plain language.** Body text is 17–18px or larger. Headings say exactly what the section is, with no wordplay. A principal should understand any screen in 3 seconds.
- **The same two actions everywhere,** "Request a quote" and "WhatsApp us", and one main action per screen.
- **A simple home page structure:** hero → what we supply → how ordering works → kits → why schools choose us → contact.
- **Simple navigation and restrained motion.**

## 4. Rules

- Only confirmed facts:
  - no invented statistics, clients, testimonials, prices or years
  - missing facts through `<Pending>` (`components/ui/Pending.tsx`)
  - confirmed address, GSTIN and founder from `lib/site.ts`
- Copy:
  - short sentences
  - no exclamation marks
  - no buzzwords (seamless, elevate, unlock, revolutionise, cutting-edge)
- No captions under images.
- Every image is free-licence and credited in `public/images/photos/PHOTOS.md`. This includes the 3 Unsplash photos concept D added: 1513542789411-b6a5d4f31634 pencils, 1589998059171-988d887df646 book.
- Copy D's assets into `public/images/cutouts/`. Do not reference `public/concepts/` from the app.
- Accessibility:
  - alt text
  - visible focus
  - 44px tap targets
  - one h1 per page
  - contrast at least 4.5:1 for text
- It must work at 360, 390, 768, 1024 and 1440 widths with no horizontal scroll.

## 5. Phases

- **Phase 1 (one agent):** the design system, layout (header, footer, mobile bar, menu), shared UI components, and the home page.
- **Phase 2 (three agents in parallel):**
  - products, the category pages and the catalogue
  - kits, labs and how it works
  - about, contact, quote, privacy and terms
- **Phase 3 (the lead):**
  - build and checks
  - screenshots of every page
  - fixes
  - deploy
