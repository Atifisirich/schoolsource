# SchoolSource: original brief

The brief the site was built from, kept unchanged for reference. Where it differs from HANDOFF.md (15 categories instead of 13, the blue and orange palette), HANDOFF.md is current.

```text
You are building the website for SchoolSource (schoolsource.in), the school supplies division of Arkhan Group Pvt. Ltd., Hyderabad. Everything below is the complete specification. Read all of it before writing any code and treat it as the source of truth.

=====================================================================
1. BUSINESS AND CONTACT
=====================================================================
- Brand: SchoolSource. Tagline: "Everything your school needs, from one source."
- Phone / WhatsApp: +91 96760 38523 (WhatsApp link: https://wa.me/919676038523, call link: tel:+919676038523)
- Email: info@schoolsource.in
- Footer line: "A division of Arkhan Group Pvt. Ltd."
- Goal: a principal, trustee, administrator or purchase staff member sends a quote request or contacts us on WhatsApp.
- Visitors must come away believing: one supplier covers every purchase; fair bulk pricing; GST invoices and clean paperwork; scheduled delivery before term starts; backed by Arkhan Group.

=====================================================================
2. TONE AND CONTENT RULES
=====================================================================
- Professional, clear and warm. Short sentences, concrete promises.
- No slang, no trendy or casual phrasing, no exclamation marks, no buzzwords (seamless, elevate, unlock, revolutionise, cutting-edge).
- NEVER invent statistics, testimonials, client names or logos, prices, awards or founding years.
- Where information is missing, show a visible placeholder: [ADDRESS], [GSTIN], [DELIVERY AREA], [PAYMENT TERMS], [MIN ORDER], [RETURN POLICY], [HOURS], [CLIENT SCHOOLS], [PHOTO: description], [CONFIRM].
- No prices anywhere. Everything is "Request a quote".

=====================================================================
3. SITEMAP
=====================================================================
/                      Home
/products              All 13 categories
/products/[category]   One page per category (13, generated from data)
/kits                  School Kits
/labs                  Labs & STEM Setups
/how-it-works          How It Works + FAQ
/about                 About
/quote                 Request a Quote
/contact               Contact
/privacy, /terms       Short plain pages
On every page: header with navigation + "Request a Quote" button + Quote List counter; floating WhatsApp button; footer.

=====================================================================
4. PRODUCT CATEGORIES (exactly these 13, in this order)
=====================================================================
Every product has exactly one home. Display in three bands.

BAND 1 - EVERYDAY NEEDS (bought every term)

01 Stationery - Pens, notebooks, paper, files, art and craft
  - Writing: ball pens, gel pens, pencils, erasers, sharpeners
  - Markers & Highlighters: whiteboard markers, permanent markers, highlighters
  - Notebooks & Registers: ruled, unruled, graph, practical notebooks, long books, registers
  - Paper: A4/A3 copier paper, chart paper, drawing sheets, coloured paper
  - Files & Folders: box files, clip files, display files, L-folders, envelopes
  - Geometry & Drawing: geometry boxes, scales, compasses, drawing boards
  - Art & Craft: crayons, colour pencils, sketch pens, water and poster colours, brushes, craft paper, clay, foam sheets, glitter
  - Desk Essentials: staplers, punches, clips, glue, tapes, scissors, cutters

02 Printing & ID Cards - Diaries, ID cards, badges, certificates, report cards
  - ID Cards & Lanyards: student and staff PVC ID cards, holders, printed lanyards
  - Badges: name badges, house badges, prefect and council badges, logo pins
  - School Diaries & Planners
  - Exam Stationery: answer booklets, supplementary sheets, question paper printing
  - Reports & Certificates: report cards, progress books, certificates, transfer certificate books
  - Office Printing: fee books, receipt books, letterheads, visiting cards, admission forms
  - Event Printing: banners, flex, backdrops, standees, invitations

03 Teaching Aids - Boards, charts, maps, models, display boards
  - Boards: green boards, whiteboards, glass boards, notice and pin boards
  - Chalk & Dusters
  - Charts & Posters
  - Maps & Globes
  - Teaching Models: science, anatomy, geography and maths models
  - Early Years & Montessori: flash cards, puzzles, building blocks, Montessori apparatus
  - Classroom Display: border strips, cut-outs, display pockets

04 Uniforms & Bags - Uniforms, shoes, bags, student kits
  - Uniforms: shirts, trousers, skirts, pinafores, blazers, sweaters
  - Sports Uniforms: house T-shirts, track suits
  - Uniform Accessories: ties, belts, socks, hair accessories
  - Footwear: black shoes, white canvas shoes, sports shoes
  - Bags: school bags, trolley bags
  - Student Kits: new admission kits, stationery kits, bottles, lunch boxes
  - Page note: "Made to your school's specification. Usually ordered through the school for parents."

05 Housekeeping - Cleaning, hygiene and washroom supplies
  - Cleaning Chemicals: floor cleaner, phenyl, toilet cleaner, glass cleaner, disinfectants
  - Cleaning Tools: brooms, mops, buckets, wipers, dusters
  - Washroom Hygiene: hand wash, soap, tissue rolls, sanitary napkin dispensers and disposal units
  - Waste Management: dustbins, garbage bags, segregation bins
  - First Aid & Safety: first aid kits, fire extinguishers, safety signage
  - Pantry & Canteen: plates, glasses, containers, utensils

BAND 2 - ACTIVITIES & EVENTS (bought for occasions)

06 Sports - Sports equipment and playground items
  - Ball Games: cricket, football, volleyball, basketball, throwball
  - Racquet Sports: badminton, table tennis, tennis
  - Athletics: relay batons, hurdles, shot put, discus, measuring tapes
  - Indoor Games: chess, carrom, board games
  - Fitness & Yoga: yoga mats, skipping ropes, cones, agility ladders
  - Playground Equipment: swings, slides, see-saws, climbers, merry-go-rounds
  - PE Essentials: whistles, stopwatches, bibs, nets, ball pumps

07 Gifts & Awards - Trophies, medals, mementos, gifts
  - Trophies & Cups
  - Medals & Ribbons
  - Shields & Plaques
  - Mementos: chief guest mementos, shawls, framed citations
  - Staff Gifts: Teachers' Day gifts, festival hampers, farewell gifts
  - Student Prizes: book sets, stationery gift sets, return gifts
  - Branded Merchandise: logo mugs, pens, T-shirts, caps, bottles, keychains
  - Welcome Kits: new staff kits, parent welcome packs

08 Music - Keyboards, tabla, harmonium, band sets
  - Keyboards & Harmoniums
  - Indian Percussion: tabla, dholak, mridangam
  - School Band: side drums, bass drums, bugles, trumpets
  - Classroom Percussion: tambourines, triangles, xylophones, castanets
  - String Instruments: guitars, violins
  - Accessories: stands, cases, sticks

09 Library - Books and library supplies
  - Books: reference, fiction, non-fiction, children's books
  - Dictionaries & Encyclopaedias
  - Magazines & Periodicals: subscriptions
  - Library Supplies: library cards, pockets, labels, book covers, stamps, accession registers
  - (Library furniture is under Furniture.)

BAND 3 - SETUP & INFRASTRUCTURE (larger, one-time purchases)

10 Labs - Science, maths and STEM lab equipment
  - Physics Lab
  - Chemistry Lab: apparatus and glassware (chemicals on request, where permitted)
  - Biology Lab: microscopes, slides, specimens, models
  - Maths Lab
  - STEM & Robotics: robotics kits, electronics, sensors, microcontroller boards
  - Tinkering & Maker: 3D printers, laser engravers, hand tools
  - Lab Safety: goggles, aprons, gloves
  - Complete Lab Setups: CBSE Composite Skill Lab and tinkering lab setups (link to /labs)

11 Computers & Tech - Computers, projectors, smart boards, CCTV
  - Computers & Laptops
  - Printers & Photocopiers
  - Printer Consumables: toner, cartridges, drums
  - Smart Classroom: interactive panels, projectors, screens, visualisers
  - Audio & PA: speakers, microphones, amplifiers, PA systems
  - Security: CCTV cameras, recorders, biometric attendance
  - Accessories: keyboards, mice, pen drives, cables, routers

12 Furniture - Desks, chairs, cupboards, racks
  - Classroom: dual desks, benches, chairs, teacher tables
  - Early Years: children's tables and chairs
  - Lab Furniture: lab tables, stools
  - Library Furniture: book racks, reading tables, display stands
  - Staff & Office: office tables, chairs, staffroom furniture
  - Storage: steel almirahs, lockers, filing cabinets, racks
  - Auditorium & Dining: auditorium chairs, dining tables and benches

13 Electricals - Water coolers, RO, AC, fans, lights, UPS
  - Water & Cooling: water coolers, RO purifiers, dispensers
  - Air Conditioning: ACs, air coolers
  - Fans & Lighting: ceiling and wall fans, LED lights, emergency lights
  - Power Backup: inverters, UPS, batteries
  - Electrical Fittings: switches, wiring, MCBs, extension boards
  - School Bells: electric bells, automatic bell systems

PLACEMENT RULES (items that could look like they fit twice)
  - Pens, files, staplers used by the office -> Stationery
  - ID cards, badges, diaries, certificates, fee books -> Printing & ID Cards
  - Ties and belts with the school logo -> Uniforms & Bags
  - Logo mugs, T-shirts, caps given as gifts -> Gifts & Awards
  - Event banners and backdrops -> Printing & ID Cards
  - Printer toner and cartridges -> Computers & Tech
  - First aid kits, fire extinguishers -> Housekeeping
  - Library racks, lab tables -> Furniture
  - UPS and inverters -> Electricals

SCHOOL KITS (for /kits; contents list + "Get this kit quoted", no prices)
1. Term Start Classroom Kit - chalk/markers, dusters, registers, charts, stationery for one classroom
2. Office & Admin Kit - files, registers, stamp pads, copier paper, desk essentials
3. Exam Season Kit - answer booklets, supplementary sheets, exam pads, pens
4. New Admission Student Kit - notebooks, stationery set, bag, bottle, lunch box per student
5. Annual Day Kit - trophies, medals, mementos, invitations, banners
6. Monthly Housekeeping Kit - cleaning chemicals, tools, washroom supplies
7. Teachers' Day Gift Kit - staff gifts and hampers

=====================================================================
5. PAGE CONTENT
=====================================================================
HOME
1. Hero - H1 "Everything your school needs, from one source." Sub: "Stationery, printing, labs, sports, furniture and more - supplied to schools with GST invoices and scheduled delivery." Buttons: Request a Quote (primary), Browse Categories (secondary). Signature animation in section 8.
2. "Send us your list" strip - "Share your requirement list on WhatsApp or by email. We return an itemised quotation." + WhatsApp and email buttons.
3. Categories - all 13 in the three bands (Everyday needs / Activities & events / Setup & infrastructure); each tile: number 01-13, name, one-line description, link to its category page.
4. Why SchoolSource - five points: One supplier for every purchase / Bulk pricing for schools / GST invoices and clear billing / Scheduled delivery before term / Backed by Arkhan Group.
5. How it works - four steps: Share your list -> Receive a quotation -> We deliver -> Pay on agreed terms.
6. Featured School Kits (3-4 of the 7), link to /kits.
7. Labs & STEM Setups feature block, link to /labs.
8. "Schools we supply" - rendered from the data file; hide the whole section automatically if the list is empty. No fake logos.
9. Final call to action - "Send us your list. We'll send back a quotation." + short inline form (name, school, phone, message).
10. Footer - [ADDRESS], phone, WhatsApp, email, GSTIN [GSTIN], category links, page links, "A division of Arkhan Group Pvt. Ltd.", copyright year.

PRODUCTS (/products)
Short intro line, then the 13 categories in the three bands, each with its sub-categories listed underneath and linked.

CATEGORY PAGE (/products/[category], template for all 13)
- Header: number, name, one-line description.
- Sub-category navigation: sticky tabs on desktop, horizontally scrollable chips on mobile.
- For each sub-category: item list (name, short note, optional image) with an "Add to quote list" button on each item.
- At the end: "Can't find an item? Tell us what you need" - opens the quote form prefilled with this category.
- Categories 06-13 may show fewer items and lean on "Ask for a quote".
- Category 04 shows its page note (see section 4).

KITS (/kits)
The 7 school kits: name, who it is for, contents list, "Get this kit quoted" button (adds the kit to the Quote List). No prices.

LABS (/labs)
What we set up (science, maths and STEM labs, CBSE Composite Skill Lab, tinkering labs); what the school gets (equipment sourcing, installation, layout planning); process steps; "Request a lab consultation" button. Mark any compliance wording [CONFIRM].

HOW IT WORKS (/how-it-works)
1. Share your list - WhatsApp, email or the quote form; any format, even a photo of a handwritten list.
2. Receive an itemised quotation.
3. Confirm the order; we schedule delivery.
4. Delivery with GST invoice and delivery challan.
5. Payment on [PAYMENT TERMS].
FAQ: delivery area [DELIVERY AREA]; minimum order [MIN ORDER]; payment modes; returns and replacements [RETURN POLICY]; custom printing timelines [CONFIRM].

ABOUT (/about)
SchoolSource is the school supplies division of Arkhan Group Pvt. Ltd., Hyderabad. The group's name comes from "arkan", Arabic for pillars [CONFIRM wording]. Our promise to schools: one organised supplier, honest pricing, on-time delivery, proper paperwork. No invented founding years, team sizes or figures.

REQUEST A QUOTE (/quote)
Fields: school name*, contact person*, role (Principal / Administrator / Accounts / Trustee / Other), phone*, email, city/area*, categories needed (multi-select of the 13), Quote List items (auto-filled, editable quantities), message / requirement list, file upload (photo or PDF of the list), preferred delivery date.
On submit: thank-you state with "We'll reply within one working day [CONFIRM]" and a WhatsApp button.

CONTACT (/contact)
Phone, WhatsApp, email, [ADDRESS], [HOURS]. Map embed only once the address is confirmed (leave a placeholder block for now).

PRIVACY (/privacy) and TERMS (/terms)
Short, plain-language pages: what the quote form collects and why, that data is used only to respond and is not sold, contact for questions; basic terms for quotations, orders, delivery and payment, with [CONFIRM] markers.

=====================================================================
6. DESIGN DIRECTION
=====================================================================
The site must look hand-designed for this specific business, not like a template or an AI-generated site.

Concept: "The school supply room" - ruled register paper, ledger columns, rubber stamps, index tabs, chalkboard green, pencil yellow, red correction ink. Used with restraint inside a modern, clean layout. Not a cartoonish back-to-school theme.

Palette:
- Paper #F5F1E6 (main background)
- Ink #1B2433 (text, dark sections)
- Board green #23453A (primary: buttons, dark bands)
- Pencil yellow #E9B53B (accent, used sparingly)
- Correction red #B8432F (tiny details only: stamp marks, ticks)
- Rule blue #9DB4CF (thin ruled lines, borders)
- White #FFFFFF (cards on paper)
All text must meet WCAG AA contrast.

Type (Google Fonts via next/font):
- Display: Young Serif (headlines only)
- Body/UI: Public Sans
- Labels: IBM Plex Mono (category numbers 01-13, item codes, stamp labels)

Graphic elements:
- Faint ruled lines and a red margin line on paper sections, like a notebook page.
- Category numbers styled as register index tabs.
- A circular "SchoolSource - Hyderabad" rubber-stamp mark, slightly rotated, used 2-3 times on the site.
- Hand-drawn pencil underlines (SVG strokes) under key headline words.
- Custom line icons for the 13 categories, one consistent stroke weight (not an icon library's defaults).

Layout: strong grid, generous whitespace, left-aligned text, asymmetric compositions, varied section layouts. Mobile-first and fully usable at 360px width.

AVOID (these make a site look AI-made):
- Purple/blue gradients, glowing blobs, glassmorphism, neon
- Generic stock 3D illustrations, stock "people at laptop" photos
- Emoji as icons
- Every section centered with three identical rounded cards
- Fake statistics, testimonials or client logos
- Over-rounded corners everywhere, heavy drop shadows
- Filler copy and buzzwords

=====================================================================
7. FEATURES
=====================================================================
- Quote List: visitors add items or kits from category and kit pages; stored in localStorage; header shows a counter; reviewed and submitted on /quote.
- Form submission to info@schoolsource.in via Web3Forms (access key from env variable NEXT_PUBLIC_WEB3FORMS_KEY).
- "Send on WhatsApp" option opening https://wa.me/919676038523 with the school name and quote list prefilled as text.
- Floating WhatsApp button on every page; click-to-call and mailto links.
- All catalogue content (categories, sub-categories, items, kits, client schools) in one editable data file: /data/catalogue.ts, so products can be added without touching layout code.
- No prices anywhere.

=====================================================================
8. ANIMATION (GSAP + ScrollTrigger)
=====================================================================
Purposeful and smooth. Respect prefers-reduced-motion (show complete static final states). No scroll-jacking; keep native scrolling. Animate only transform and opacity. Lazy-load below-the-fold animations.

1. Signature hero "List to Quotation": on the left, a handwritten-style requirement list on ruled paper ("40 registers, 2 boxes chalk, 10 dusters, trophies for sports day..."). Items are ticked off one by one; each slides across and lands as a typed line in a neat itemised quotation on the right (item and quantity, no prices). Finally a SchoolSource rubber stamp presses onto the quotation with a slight bounce. About 4-5 seconds, plays once on load, then rests; small "Replay" control. Stacks vertically on mobile.
2. Pencil underlines draw in under headline keywords as they enter the viewport.
3. Category tiles rise in with a short stagger; on hover the index tab lifts and the line icon draws itself.
4. How it works: a dotted route line draws between the steps as you scroll.
5. Add to quote list: the item shrinks and flies into the header's Quote List counter, which ticks up.
6. Buttons and links: fast (150-200ms) hover states; ink-fill effect on primary buttons.
7. Page transitions: short fade/slide, under 300ms.

=====================================================================
9. 3D (two moments only - Three.js via React Three Fiber + drei)
=====================================================================
1. Hero objects: a few realistic, simply modelled school items (register, pencil, chalk box, compass) resting on the ruled paper, tilting gently with the mouse; at the end of the List to Quotation sequence they drop into a delivery box.
2. The rubber stamp is a real 3D object that presses onto the quotation, with a soft shadow and an ink mark left behind.
Rules:
- Low-poly, small models; total 3D assets under 1.5 MB (Draco or meshopt compression).
- Load 3D lazily, after the page is interactive.
- On mobile, slow devices, or prefers-reduced-motion, show a pre-rendered still image instead.
- The page must be fully usable without 3D.
- No other 3D anywhere on the site.

=====================================================================
10. TECHNICAL
=====================================================================
- Next.js (App Router) + TypeScript + Tailwind CSS; deployable to Vercel.
- Fonts via next/font/google.
- Images via next/image; photo placeholders as neutral blocks labelled [PHOTO: description].
- SEO: per-page titles and meta descriptions, Open Graph image, sitemap.xml, robots.txt, schema.org Organization + LocalBusiness JSON-LD with phone and email.
- Accessibility: WCAG 2.1 AA, keyboard navigable, visible focus states, labelled inputs, alt text.
- Performance: Lighthouse mobile 90+ for Performance, Accessibility, Best Practices and SEO.
- Google Analytics 4 ID from env, off by default.

=====================================================================
11. HOW TO WORK
=====================================================================
Work in phases. After each phase, run the dev server, summarise what you built, and wait for my approval before continuing.

Phase 1 - Scaffold, fonts, colour tokens, type and spacing scale, base components (Button, Container, Section, Stamp, RuledPaper, PencilUnderline, CategoryTile, IndexTab), header, footer, floating WhatsApp button, and a /styleguide page showing them all.
Phase 2 - /data/catalogue.ts with all 13 categories, sub-categories, items and the 7 kits exactly as specified.
Phase 3 - Home page with every section, including the List to Quotation hero animation (2D first).
Phase 4 - Products index, category page template (all 13 generated from data), Kits page.
Phase 5 - Quote List, Request a Quote page with Web3Forms and WhatsApp hand-off, Contact page.
Phase 6 - Labs, How It Works, About, Privacy, Terms.
Phase 7 - 3D hero objects and 3D stamp with fallbacks (section 9).
Phase 8 - Animation polish, SEO, accessibility pass, mobile pass at 360px, Lighthouse check, and a README explaining how to edit the catalogue and deploy.

Before finishing, confirm: contact details correct everywhere; all 13 categories present in order; quote form tested; no fake stats or testimonials; reduced-motion and mobile fallbacks work; search the codebase for "[" and list every remaining placeholder.

```

