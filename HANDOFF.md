# SchoolSource website: handoff

This is everything the next person, or the next Claude session, needs to pick this project up and finish it. Read it all before changing code. The original brief is kept in [docs/ORIGINAL-SPEC.md](docs/ORIGINAL-SPEC.md); where the two differ, this file is current.

## 0. Latest: redesign v2 (November 2026)

The whole site was redesigned. The plan, with the reasons, is in [docs/REDESIGN.md](docs/REDESIGN.md). Where this file disagrees with that plan, the plan and this section are current.

**Confirmed by the owner in November 2026** (all live in `lib/site.ts`):
- Company: Arkhan Group Pvt. Ltd. Founder: Aijaz Khan.
- GSTIN: 36ABFCA8886K1ZX.
- Address: Plot No. 802 & 803, 5th Floor, Nexus Business Centre, Ayyappa Society, Madhapur, Hyderabad 500081.
- The owner asked us to design the logo and find product photos ourselves, so the "ask before downloading photos" rule is lifted. The other photo rules still apply: free licence, credited in PHOTOS.md, no brands, no fashion models.

**What changed**
- **Design system:** white pages, Source Serif 4 headings with Public Sans body text, hairline borders instead of shadows, and flat buttons. The palette is blue `#1f4fb5` with small orange touches. Section tones are `paper`, `muted` and `ink`.
  - Removed: the 3D hero (Three.js is uninstalled), scroll fade-ins, glows, ruled paper, stamps (except the hero quotation), mono uppercase eyebrows, decorative numbering, the utility bar, and the v1 component gallery.
- **Header:** one sticky row with the products mega menu, the phone number, the quote counter and "Request a quote". Phones get a fixed bottom bar with "WhatsApp us" and "Request a quote".
- **Logo:** new. A single blue S line from an orange source point. Files and usage rules are in `public/brand/`, including the rejected routes in `explorations.png`. The favicon and apple icon were replaced.
- **Pages:** every page was rebuilt. The home hero animates the handwritten list turning into a quotation, using CSS only and showing the finished state under reduced motion.
- **Product photos:** 55 photos now cover 37 items across Uniforms & Bags, Stationery, Sports, Gifts, Music, Labs, Housekeeping, Furniture, Canteen and Tech. Credits are in `public/images/photos/PHOTOS.md`. Items without a photo show a plain grey name plate.
- **SEO:**
  - `sitemap.xml` and `robots.txt`.
  - A generated Open Graph image.
  - Organization and LocalBusiness JSON-LD with the address, GSTIN and founder.
  - GA4, which loads only when `NEXT_PUBLIC_GA_ID` is set.
- **Placeholders:** use `<Pending label="PAYMENT TERMS" />` (`components/ui/Pending.tsx`). They stay visible by default, as rule 3 asks. At launch, set `NEXT_PUBLIC_SHOW_PENDING=false` to hide every placeholder and the sentences that depend on one.

**Still needed from the owner**
- **Business facts:** hours, payment terms, minimum order, return policy, delivery area wording, client schools, and each `[CONFIRM]` item.
- **Lab installation:** confirm whether labs are installed or only supplied. The Labs page says "planned, supplied and installed", from the catalogue note.
- **Branch deliveries:** confirm whether each branch gets its own delivery. It is marked `[CONFIRM]`.
- **Uniforms & Bags photos:** the owner's own photos are needed for trousers, pinafores, sweaters, track suits, hair accessories, canvas shoes, sports shoes, trolley bags and new admission kits.
- **Other photos:** geometry boxes, whiteboard markers, tabla and the Indian instruments, projectors, ceiling fans and steel plates. No clean free photos were found for these.
- **Photo credits:** 31 rows in PHOTOS.md read "See source page". The photo sites blocked automated access, so the author names could not be read.
- **Map embed:** it could not be checked here because Google is blocked in this sandbox. Check it in a real browser.

**Checks at handoff**
- `npx tsc --noEmit`, `npx eslint .`, `npm run check:catalogue` and `npm run build` all pass.
- Every route loads with no console errors.
- No sideways scroll at 360px.

## 1. What this is

**The business**
- SchoolSource (schoolsource.in) is the school supplies division of Arkhan Group Pvt. Ltd., Hyderabad.
- Customers are school principals, trustees, administrators and purchase staff.
- The site's one job is to get a quote request or a WhatsApp message.

**Contact details**, already used everywhere through `lib/site.ts`:
- Phone and WhatsApp: +91 96760 38523
- Email: info@schoolsource.in

**Status**
- Phases 1–7 of the brief are done, plus a round of extra work (listed in section 6).
- **Phase 8 (polish, SEO, accessibility, Lighthouse, README) has not started.** The owner asked to hold it until they say go.

## 2. Rules that must not be broken

These come straight from the owner. Breaking them is worse than leaving something unfinished.

1. **Never invent statistics, testimonials, client names or logos, prices, awards or founding years.**
   - The business has no proof facts yet: no years in business, no count of schools, no team names.
   - Do not add "500+ schools", "ISO certified", star ratings or anything similar.
2. **No prices anywhere.** Everything is "Request a quote".
3. **Missing facts stay as visible placeholders:** `[ADDRESS]`, `[GSTIN]`, `[DELIVERY AREA]`, `[PAYMENT TERMS]`, `[MIN ORDER]`, `[RETURN POLICY]`, `[HOURS]`, `[CLIENT SCHOOLS]`, `[CONFIRM]`.
   - Do not fill them with guesses.
   - Current count: ADDRESS ×5, CONFIRM ×17, PAYMENT TERMS ×6, MIN ORDER ×3, RETURN POLICY ×3, GSTIN ×2, HOURS ×2, DELIVERY AREA ×1, CLIENT SCHOOLS ×1.
   - Find them with: `grep -rn "\[" app components data lib`
4. **Tone:**
   - Professional, clear and warm, with short sentences.
   - No exclamation marks.
   - No buzzwords: seamless, elevate, unlock, revolutionise, cutting-edge.
5. **Only claim services the owner has confirmed:**
   - **Services:** the 15 catalogue categories; textbooks; canteen & kitchen setup; per-student kit packing (one labelled bag per student, sorted by class); school visits with product samples.
   - **Logistics:**
     - Delivery by the in-house team or a third-party transporter, to Hyderabad and other states.
     - In-stock items are delivered within a week of confirmation.
     - Stock is held in a warehouse.
   - **Order handling:**
     - Every order is checked before dispatch.
     - Damaged, short or wrong items are replaced.
     - Proof approval comes before any printing.
   - **Customer service:** WhatsApp order updates; re-quoting last year's order; multi-branch school groups.
   - **Not confirmed, so do not claim:** unloading or placing items in classrooms, split deliveries.
   - Ask the owner before adding any other service claim.
6. **Photos:**
   - Ask the owner before downloading any new photo, and show them the list first.
   - Credit every stock photo in `public/images/photos/PHOTOS.md`.
   - No branded products (Nike, Converse, visible labels) and no adult fashion-model shots.
7. **Contrast:** never put white text on the orange (`pencil`) colour. Use navy text on orange.

## 3. Running it

```bash
npm install
cp .env.example .env.local   # then fill in the keys (see below)
npm run dev                  # http://localhost:3000
```

Checks to run before every commit, which all pass at handoff:

```bash
npx tsc --noEmit
npm run lint
npm run check:catalogue      # validates data/catalogue.ts (expects 15 categories)
npm run build
```

**Environment variables** (see `.env.example`; real values are never committed):
- `NEXT_PUBLIC_WEB3FORMS_KEY`
  - The Web3Forms access key for info@schoolsource.in.
  - Without it, forms fall back to WhatsApp or email links. The owner still needs to create this key.
- `NEXT_PUBLIC_WEB3FORMS_FILE_UPLOAD`
  - `true` only once the paid Web3Forms plan is active.
  - Until then, visitors are asked to send their list photo on WhatsApp.
- `NEXT_PUBLIC_GA_ID`
  - The GA4 measurement ID.
  - Leave it empty to keep analytics off. Wiring is part of Phase 8.

Deployment target: Vercel. It has not been deployed yet.

## 4. Stack and structure

**Stack**
- Next.js 15.5 (App Router), React 19, TypeScript.
- Tailwind CSS v4: tokens are in `app/globals.css` under `@theme`. There is no tailwind.config.
- GSAP + ScrollTrigger for scroll reveals.
- next/image, and next/font (Source Serif 4, Public Sans, Kalam for the hero list only).

**Folders**

```
app/                      routes (one folder per page)
  page.tsx                home
  products/page.tsx       all categories
  products/[category]/    one page per category, generated from data
  catalogue/              printable full catalogue
  kits/ labs/ how-it-works/ about/ quote/ contact/ privacy/ terms/
  styleguide/             internal component gallery (not linked publicly)
  template.tsx            page transition
components/
  layout/                 Header, UtilityBar, Footer, Logo, QuoteListCounter, WhatsAppFloat
  home/                   ListToQuotation (hero animation), CategoryExplorer, OneSourceCompare
  products/               ProductsExplorer, CategoryFilter, SubcategoryNav, ItemPhotos (rotating photos)
  quote/                  AddToQuoteButton, QuoteForm, QuickQuoteForm, QuoteListEditor, FormMessages
  how/OrderJourney.tsx    8-stage order tracker with WhatsApp-style updates (autoplays in view)
  kits/BuyingCalendar.tsx term-by-term buying calendar
  three/                  3D hero scene, lazy-loaded with a still-image fallback
  ui/                     Button, Section, Container, Stamp, RuledPaper, PencilUnderline, IndexTab, etc.
  motion/ScrollReveal.tsx GSAP reveal for any element with data-reveal
data/
  catalogue.ts            THE single source: 15 categories, subcategories, 343 items, 7 kits, client schools
  calendar.ts             buying calendar content
lib/
  site.ts                 business details, nav links, WhatsApp link builder - edit contact info here only
  quote-list.ts           quote list stored in localStorage
  submit-form.ts          Web3Forms submission
public/images/
  photos/                 category and page photos, all 3:2 (1600×1067), credits in PHOTOS.md
  products/uniforms/      per-item product photos (skirts so far)
scripts/check-catalogue.mts
docs/ORIGINAL-SPEC.md     the original brief
```

**Design system.** This has changed from the brief, which asked for green and yellow; the owner moved to blue and orange.
- Colours:
  - `paper` #f5f8fd (background)
  - `ink` #0e1f3d (navy text)
  - `ink-soft` #4b5873
  - `board` #1f4fb5 (primary blue)
  - `board-deep` #163b8a
  - `pencil` #f5872a (orange accent, navy text only)
  - `pencil-soft` #ffe3c7
  - `red` #c2410c (small details)
  - `rule` #bfd0ec (borders)
- Radii: 8, 14, 20px.
- Shadows: `shadow-card`, `shadow-lift`, `shadow-button`.
- Reusable styles:
  - `.hero-glow` for the soft radial background in hero areas.
  - Buttons: `components/ui/Button.tsx` (primary, secondary, accent).
- The owner asked for a less plain look: cards with borders and shadows, buttons that feel like buttons, and photos shown whole.

## 5. How to do common jobs

**Add or rename a product.** Edit `data/catalogue.ts` only. An item is either a plain string or an object:

```ts
"Trousers",                                   // no photo: shows the category icon design
{ name: "Skirts", note: "Box pleat or knife pleat", images: [
  "/images/products/uniforms/skirt-navy-pleated.jpg",
  "/images/products/uniforms/skirt-maroon-pleated.jpg",
] },
```

**Add product photos (the rotating "N styles" cards).**
1. Put the files in `public/images/products/<category>/`.
2. List them in the item's `images` array.

How the photos behave:
- With two or more images, the card crossfades between them every 2.6 s, but only while the card is on screen.
- It pauses when the mouse is over it or it has keyboard focus, and has a pause button.
- It stays still for visitors who turn off motion in their device settings.
- It shows an "N styles" label and dots to jump between styles.

The card frame is **16:10**. To fit square photos without cutting the product off, widen the plain background:
- Use sharp: crop, then `extend({ extendWith: "copy" })`, then resize to 1200×750.
- **sharp always resizes before it extends**, so do the extend in its own pipeline (`toBuffer()`) first.

**Change contact details:** `lib/site.ts`.

**Add a category.**
- Add it to `data/catalogue.ts`. Also add an icon in `components/icons/CategoryIcon.tsx`, a photo `public/images/photos/cat-<slug>.jpg`, and a credit in PHOTOS.md.
- Update the expected count in `scripts/check-catalogue.mts`.

## 6. What is done

**From the brief (Phases 1–7):**
- Every page in the sitemap.
- The "List to Quotation" hero animation with the 3D objects and stamp, with fallbacks.
- The quote list with a fly-to-counter animation.
- The quote form: Web3Forms plus a WhatsApp hand-off.
- Category pages generated from data.
- Kits, Labs, How It Works, About, Contact, Privacy and Terms pages.
- The styleguide page.

**Extra work after Phase 7:**
- **Ideas from a competitor:** reviewed kareenterprise.com and made the following changes.
  - Added Textbooks (category 02) and Canteen & Kitchen (category 15), bringing the total to 15 categories.
  - Added per-student kits, a buying calendar, a printable catalogue page (`/catalogue`), and a "book a visit with samples" option.
  - Added a "one supplier vs many vendors" comparison on the home page.
- **Design refresh:** bordered cards, button styling, photos at 3:2 shown whole, and product tiles with an "Add to quote" button.
- **How It Works rewritten** around logistics:
  - a facts strip
  - an animated 8-stage order tracker
  - six logistics cards
  - printing proof steps
  - an 11-question FAQ
- **Rotating product photos** (`ItemPhotos`). Only **Skirts** has photos so far: 4 styles, supplied by the owner.
  - These look AI-generated: a Gemini sparkle mark sits in the corner.
  - Suggest the owner swaps them for real photos when possible.

## 7. Open work, in priority order

### 7.1 Product photos for the other 20 Uniforms & Bags items (in progress)

The owner wants every product to show several styles in the same photo spot. Start with Uniforms & Bags, then do the other categories the same way.

The 21 items are:
- **Uniforms:** Shirts, Trousers, Skirts ✅, Pinafores, Blazers, Sweaters
- **Sports and accessories:** House T-shirts, Track suits, Ties, Belts, Socks, Hair accessories
- **Footwear:** Black shoes, White canvas shoes, Sports shoes
- **Bags:** School bags, Trolley bags
- **Student kits:** New admission kits, Stationery kits, Water bottles, Lunch boxes

**Best source:** the owner's own photos. They sent the skirts that way, as images in chat. Free stock only works for some items.

**Stock shortlist awaiting the owner's approval.** Nothing has been downloaded yet. These are Unsplash photo IDs. URL pattern: `https://images.unsplash.com/photo-<ID>?w=1600&q=70&fm=jpg`

| Item | Unsplash IDs |
|---|---|
| Shirts | 1603252109303-2751441dd157, 1602810316693-3667c854239a, 1602810318383-e386cc2a3ccf |
| House T-shirts | 1671438118097-479e63198629 |
| Belts | 1664286074176-5206ee5dc878, 1711443982852-b3df5c563448 |
| Socks | 1615486364462-ef6363adbc18, 1640026199235-c24aa417b552 |
| Black shoes | 1552422554-0d5af0c79fc6, 1777987601426-c05a82045862 |
| School bags | 1726726192148-af52008ff663, 1765516833058-c322c800fee1 (+ reuse existing `kit-new-admission-student.jpg`) |
| Water bottles | 1625708458528-802ec79b1ed8, 1602143407151-7111542de6e8 |
| Lunch boxes | 1781747835478-a9c3bab5a670, 1784979472083-dd3c4c109345, 1729154031163-1c5484fac8dd |

**Rejected:**
- 1720514496268 (brand label)
- 1600185365926 (Nike logo)
- 1560769629 (fashion sneakers)
- 1668069226492 (navy dress shoe)
- 1585499583264 (novelty socks)
- 1643015862949 and 1760013531865 (fashion and blurry sweaters)
- 1762681206108 (bad crop)
- 1744177762258 (blurry hair clip)

**No usable stock found** for skirts, pinafores, blazers, ties, trousers, track suits, sweaters, hair accessories, canvas shoes, sports shoes or trolley bags. Searches only return adult fashion models or branded goods, so these need the owner's photos.

### 7.2 Top navigation redesign (blocked)

The owner said "the top navigation bar should look like this", but the reference image never arrived. Ask for it again before changing anything.

The current header is in `components/layout/Header.tsx` and `UtilityBar.tsx`.

### 7.3 Phase 8 (on hold until the owner says go)

**Polish and SEO**
- Animation polish.
- SEO:
  - **Done:** per-page `metadata` on 13 routes, plus `metadataBase` in `app/layout.tsx`.
  - **Missing:** `sitemap.ts`, `robots.ts`, an Open Graph image, and Organization + LocalBusiness JSON-LD with phone and email.

**Accessibility**
- Run an accessibility pass to WCAG 2.1 AA: keyboard use, focus states, labels, alt text.

**Mobile**
- Do a mobile pass at **360px** width.

**Performance**
- Run Lighthouse on mobile. The target is 90+ on all four scores.

**Analytics**
- Wire GA4 from `NEXT_PUBLIC_GA_ID`, off by default.

**README**
- Replace the default create-next-app README with how to edit the catalogue and how to deploy.

**Final checklist from the brief**
- Contact details are correct everywhere.
- All categories are present, in order.
- The quote form is tested.
- There are no fake stats or testimonials.
- Reduced-motion and mobile fallbacks work.
- List every remaining `[...]` placeholder for the owner.

### 7.4 Facts the owner still needs to supply

Address, GSTIN, delivery area wording, payment terms, minimum order, return policy, office hours, the client schools list (the section stays hidden while the list is empty), and each `[CONFIRM]` item. Contact also needs a map embed once the address is known.

## 8. Gotchas found along the way

**Testing animations**
- In the Claude desktop app's browser pane, IntersectionObserver and requestAnimationFrame do not run while the pane is hidden.
- Show the pane before testing animations, or they will look broken.
- Screenshots from a hidden or scaled pane can be stale, so check state with JavaScript reads.

**Code quirks**
- `CategoryIcon` has an internal `relative` class. To position it absolutely, wrap it in a positioned span.
- Card reveals use `data-reveal` on a parent; `ScrollReveal` staggers its children.

**Tooling**
- When editing files from a shell, Perl or sed replacements containing braces or spanning several lines sometimes failed silently. Use a proper editor.

**Stock photos**
- Unsplash search pages rewrite the DOM. To build a contact sheet, use the `images.unsplash.com` origin.
