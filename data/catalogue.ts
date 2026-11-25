// =====================================================================
// SchoolSource catalogue
// =====================================================================
// The single editable source for categories, sub-categories, items,
// school kits and client schools. Pages are generated from this file,
// so products can be added or renamed here without touching layout code.
//
// HOW TO EDIT
// - Add an item:      put its name in the sub-category's `items` list.
//                     Use { name, note } to add a short note under it,
//                     and `image: "/images/..."` once a photo exists, or
//                     `images: [...]` for several (they rotate on the card).
// - Photos: categories and kits use /public/images/photos/cat-<slug>.jpg and
//   kit-<slug>.jpg automatically. Replace a file to change its photo.
// - Add a sub-category: add { name, items } to a category's `subcategories`.
// - Item names must be unique across the whole catalogue: every product
//   has exactly one home (see PLACEMENT RULES at the bottom).
// - No prices anywhere. Everything is quoted on request.
// - Run `npm run check:catalogue` after editing.
// =====================================================================

export type BandId = "everyday" | "activities" | "setup";

export type Band = {
  id: BandId;
  number: string;
  name: string;
  note: string;
};

export const bands: Band[] = [
  { id: "everyday", number: "1", name: "Everyday needs", note: "Bought every term" },
  { id: "activities", number: "2", name: "Activities & events", note: "Bought for occasions" },
  { id: "setup", number: "3", name: "Setup & infrastructure", note: "Larger, one-time purchases" },
];

// ---------------------------------------------------------------------
// Authoring shapes (what you type below)
// ---------------------------------------------------------------------

type ItemInput =
  | string
  | {
      name: string;
      /** Short note shown under the item name */
      note?: string;
      /** Path under /public, e.g. "/images/stationery/ball-pens.jpg" */
      image?: string;
      /** Several photos, shown in turn on the item card, e.g. one per style */
      images?: string[];
      /** Link to a page with more detail, e.g. "/labs" */
      href?: string;
    };

type SubCategoryInput = {
  name: string;
  note?: string;
  items: ItemInput[];
};

type CategoryInput = {
  number: string;
  slug: string;
  name: string;
  description: string;
  band: BandId;
  /** Shown at the top of the category page */
  pageNote?: string;
  /** Category photo under /public, e.g. "/images/photos/cat-stationery.jpg" */
  image?: string;
  /** Pointers to related items that live in another category */
  seeAlso?: { label: string; slug: string; subcategory?: string }[];
  subcategories: SubCategoryInput[];
};

// ---------------------------------------------------------------------
// The 15 categories, in display order
// ---------------------------------------------------------------------

const categoryData: CategoryInput[] = [
  // ===== BAND 1 - EVERYDAY NEEDS =====
  {
    number: "01",
    slug: "stationery",
    name: "Stationery",
    description: "Pens, notebooks, paper, files, art and craft",
    band: "everyday",
    subcategories: [
      { name: "Writing", items: ["Ball pens", "Gel pens", "Pencils", "Erasers", "Sharpeners"] },
      { name: "Markers & Highlighters", items: ["Whiteboard markers", "Permanent markers", "Highlighters"] },
      {
        name: "Notebooks & Registers",
        items: ["Ruled notebooks", "Unruled notebooks", "Graph notebooks", "Practical notebooks", "Long books", "Registers"],
      },
      { name: "Paper", items: ["A4 copier paper", "A3 copier paper", "Chart paper", "Drawing sheets", "Coloured paper"] },
      { name: "Files & Folders", items: ["Box files", "Clip files", "Display files", "L-folders", "Envelopes"] },
      { name: "Geometry & Drawing", items: ["Geometry boxes", "Scales", "Compasses", "Drawing boards"] },
      {
        name: "Art & Craft",
        items: [
          "Crayons",
          "Colour pencils",
          "Sketch pens",
          "Water colours",
          "Poster colours",
          "Brushes",
          "Craft paper",
          "Clay",
          "Foam sheets",
          "Glitter",
        ],
      },
      { name: "Desk Essentials", items: ["Staplers", "Punches", "Clips", "Glue", "Tapes", "Scissors", "Cutters"] },
    ],
  },
  {
    number: "02",
    slug: "textbooks",
    name: "Textbooks",
    description: "Class-wise textbooks, workbooks and book sets",
    band: "everyday",
    pageNote: "Send your book list for each class. Boards, publishers and editions are confirmed line by line in the quotation.",
    subcategories: [
      {
        name: "Board Textbooks",
        items: ["NCERT textbooks", "CBSE publisher textbooks", "State board textbooks", "ICSE textbooks"],
      },
      { name: "Workbooks & Practice", items: ["Workbooks", "Activity books", "Practice books", "Lab manuals"] },
      { name: "Early Years Books", items: ["Pre-primary textbooks", "Rhyme books", "Writing practice books"] },
      { name: "Readers & Atlases", items: ["Language readers", "Supplementary readers", "Grammar books", "Atlases"] },
      {
        name: "Class-wise Book Sets",
        note: "Packed per student and labelled by class on request.",
        items: [
          { name: "Class-wise book sets", href: "/kits#per-student" },
          "Teacher copies",
        ],
      },
    ],
  },
  {
    number: "03",
    slug: "printing-id-cards",
    name: "Printing & ID Cards",
    description: "Diaries, ID cards, badges, certificates, report cards",
    band: "everyday",
    subcategories: [
      {
        name: "ID Cards & Lanyards",
        items: ["Student PVC ID cards", "Staff PVC ID cards", "ID card holders", "Printed lanyards"],
      },
      { name: "Badges", items: ["Name badges", "House badges", "Prefect and council badges", "Logo pins"] },
      { name: "School Diaries & Planners", items: ["School diaries", "Planners"] },
      { name: "Exam Stationery", items: ["Answer booklets", "Supplementary sheets", "Question paper printing"] },
      {
        name: "Reports & Certificates",
        items: ["Report cards", "Progress books", "Certificates", "Transfer certificate books"],
      },
      {
        name: "Office Printing",
        items: ["Fee books", "Receipt books", "Letterheads", "Visiting cards", "Admission forms"],
      },
      { name: "Event Printing", items: ["Banners", "Flex printing", "Backdrops", "Standees", "Invitations"] },
    ],
  },
  {
    number: "04",
    slug: "teaching-aids",
    name: "Teaching Aids",
    description: "Boards, charts, maps, models, display boards",
    band: "everyday",
    subcategories: [
      { name: "Boards", items: ["Green boards", "Whiteboards", "Glass boards", "Notice boards", "Pin boards"] },
      { name: "Chalk & Dusters", items: ["Chalk", "Board dusters"] },
      { name: "Charts & Posters", items: ["Charts", "Posters"] },
      { name: "Maps & Globes", items: ["Maps", "Globes"] },
      { name: "Teaching Models", items: ["Science models", "Anatomy models", "Geography models", "Maths models"] },
      {
        name: "Early Years & Montessori",
        items: ["Flash cards", "Puzzles", "Building blocks", "Montessori apparatus"],
      },
      { name: "Classroom Display", items: ["Border strips", "Cut-outs", "Display pockets"] },
    ],
  },
  {
    number: "05",
    slug: "uniforms-bags",
    name: "Uniforms & Bags",
    description: "Uniforms, shoes, bags, student kits",
    band: "everyday",
    pageNote: "Made to your school's specification. Usually ordered through the school for parents.",
    subcategories: [
      {
        name: "Uniforms",
        items: [
          "Shirts",
          "Trousers",
          {
            name: "Skirts",
            images: [
              "/images/products/uniforms/skirt-navy-pleated.jpg",
              "/images/products/uniforms/skirt-maroon-pleated.jpg",
              "/images/products/uniforms/skirt-green-check.jpg",
              "/images/products/uniforms/skirt-navy-buckle.jpg",
            ],
          },
          "Pinafores",
          "Blazers",
          "Sweaters",
        ],
      },
      { name: "Sports Uniforms", items: ["House T-shirts", "Track suits"] },
      { name: "Uniform Accessories", items: ["Ties", "Belts", "Socks", "Hair accessories"] },
      { name: "Footwear", items: ["Black shoes", "White canvas shoes", "Sports shoes"] },
      { name: "Bags", items: ["School bags", "Trolley bags"] },
      { name: "Student Kits", items: ["New admission kits", "Stationery kits", "Water bottles", "Lunch boxes"] },
    ],
  },
  {
    number: "06",
    slug: "housekeeping",
    name: "Housekeeping",
    description: "Cleaning, hygiene and washroom supplies",
    band: "everyday",
    subcategories: [
      {
        name: "Cleaning Chemicals",
        items: ["Floor cleaner", "Phenyl", "Toilet cleaner", "Glass cleaner", "Disinfectants"],
      },
      { name: "Cleaning Tools", items: ["Brooms", "Mops", "Buckets", "Wipers", "Cleaning dusters"] },
      {
        name: "Washroom Hygiene",
        items: ["Hand wash", "Soap", "Tissue rolls", "Sanitary napkin dispensers", "Sanitary napkin disposal units"],
      },
      { name: "Waste Management", items: ["Dustbins", "Garbage bags", "Segregation bins"] },
      { name: "First Aid & Safety", items: ["First aid kits", "Fire extinguishers", "Safety signage"] },
    ],
    seeAlso: [{ label: "Plates, glasses and utensils are under Canteen & Kitchen", slug: "canteen-kitchen", subcategory: "Serveware & Utensils" }],
  },

  // ===== BAND 2 - ACTIVITIES & EVENTS =====
  {
    number: "07",
    slug: "sports",
    name: "Sports",
    description: "Sports equipment and playground items",
    band: "activities",
    subcategories: [
      {
        name: "Ball Games",
        items: ["Cricket equipment", "Footballs", "Volleyballs", "Basketballs", "Throwballs"],
      },
      {
        name: "Racquet Sports",
        items: ["Badminton equipment", "Table tennis equipment", "Tennis equipment"],
      },
      { name: "Athletics", items: ["Relay batons", "Hurdles", "Shot puts", "Discus", "Measuring tapes"] },
      { name: "Indoor Games", items: ["Chess sets", "Carrom boards", "Board games"] },
      { name: "Fitness & Yoga", items: ["Yoga mats", "Skipping ropes", "Training cones", "Agility ladders"] },
      {
        name: "Playground Equipment",
        items: ["Swings", "Playground slides", "See-saws", "Climbers", "Merry-go-rounds"],
      },
      { name: "PE Essentials", items: ["Whistles", "Stopwatches", "Bibs", "Sports nets", "Ball pumps"] },
    ],
  },
  {
    number: "08",
    slug: "gifts-awards",
    name: "Gifts & Awards",
    description: "Trophies, medals, mementos, gifts",
    band: "activities",
    subcategories: [
      { name: "Trophies & Cups", items: ["Trophies", "Cups"] },
      { name: "Medals & Ribbons", items: ["Medals", "Ribbons"] },
      { name: "Shields & Plaques", items: ["Shields", "Plaques"] },
      { name: "Mementos", items: ["Chief guest mementos", "Shawls", "Framed citations"] },
      { name: "Staff Gifts", items: ["Teachers' Day gifts", "Festival hampers", "Farewell gifts"] },
      { name: "Student Prizes", items: ["Book sets", "Stationery gift sets", "Return gifts"] },
      {
        name: "Branded Merchandise",
        items: ["Logo mugs", "Logo pens", "Logo T-shirts", "Logo caps", "Logo bottles", "Logo keychains"],
      },
      { name: "Welcome Kits", items: ["New staff kits", "Parent welcome packs"] },
    ],
  },
  {
    number: "09",
    slug: "music",
    name: "Music",
    description: "Keyboards, tabla, harmonium, band sets",
    band: "activities",
    subcategories: [
      { name: "Keyboards & Harmoniums", items: ["Keyboards", "Harmoniums"] },
      { name: "Indian Percussion", items: ["Tabla", "Dholak", "Mridangam"] },
      { name: "School Band", items: ["Side drums", "Bass drums", "Bugles", "Trumpets"] },
      { name: "Classroom Percussion", items: ["Tambourines", "Triangles", "Xylophones", "Castanets"] },
      { name: "String Instruments", items: ["Guitars", "Violins"] },
      { name: "Accessories", items: ["Music stands", "Instrument cases", "Drum sticks"] },
    ],
  },
  {
    number: "10",
    slug: "library",
    name: "Library",
    description: "Books and library supplies",
    band: "activities",
    seeAlso: [{ label: "Library furniture is under Furniture", slug: "furniture", subcategory: "Library Furniture" }],
    subcategories: [
      { name: "Books", items: ["Reference books", "Fiction", "Non-fiction", "Children's books"] },
      { name: "Dictionaries & Encyclopaedias", items: ["Dictionaries", "Encyclopaedias"] },
      { name: "Magazines & Periodicals", items: ["Magazine and periodical subscriptions"] },
      {
        name: "Library Supplies",
        items: ["Library cards", "Book pockets", "Book labels", "Book covers", "Library stamps", "Accession registers"],
      },
    ],
  },

  // ===== BAND 3 - SETUP & INFRASTRUCTURE =====
  {
    number: "11",
    slug: "labs",
    name: "Labs",
    description: "Science, maths and STEM lab equipment",
    band: "setup",
    seeAlso: [{ label: "Lab tables and stools are under Furniture", slug: "furniture", subcategory: "Lab Furniture" }],
    subcategories: [
      { name: "Physics Lab", items: ["Physics lab equipment"] },
      {
        name: "Chemistry Lab",
        items: ["Chemistry lab apparatus", "Glassware", { name: "Lab chemicals", note: "On request, where permitted" }],
      },
      { name: "Biology Lab", items: ["Microscopes", "Microscope slides", "Specimens", "Biology models"] },
      { name: "Maths Lab", items: ["Maths lab equipment"] },
      {
        name: "STEM & Robotics",
        items: ["Robotics kits", "Electronics components", "Sensors", "Microcontroller boards"],
      },
      { name: "Tinkering & Maker", items: ["3D printers", "Laser engravers", "Hand tools"] },
      { name: "Lab Safety", items: ["Safety goggles", "Lab aprons", "Lab gloves"] },
      {
        name: "Complete Lab Setups",
        note: "Planned, supplied and installed as one project.",
        items: [
          { name: "CBSE Composite Skill Lab setup", href: "/labs" },
          { name: "Tinkering lab setup", href: "/labs" },
        ],
      },
    ],
  },
  {
    number: "12",
    slug: "computers-tech",
    name: "Computers & Tech",
    description: "Computers, projectors, smart boards, CCTV",
    band: "setup",
    subcategories: [
      { name: "Computers & Laptops", items: ["Desktop computers", "Laptops"] },
      { name: "Printers & Photocopiers", items: ["Printers", "Photocopiers"] },
      { name: "Printer Consumables", items: ["Toner", "Ink cartridges", "Drum units"] },
      {
        name: "Smart Classroom",
        items: ["Interactive panels", "Projectors", "Projection screens", "Visualisers"],
      },
      { name: "Audio & PA", items: ["Speakers", "Microphones", "Amplifiers", "PA systems"] },
      { name: "Security", items: ["CCTV cameras", "CCTV recorders", "Biometric attendance systems"] },
      { name: "Accessories", items: ["Computer keyboards", "Mice", "Pen drives", "Cables", "Routers"] },
    ],
  },
  {
    number: "13",
    slug: "furniture",
    name: "Furniture",
    description: "Desks, chairs, cupboards, racks",
    band: "setup",
    subcategories: [
      { name: "Classroom", items: ["Dual desks", "Benches", "Student chairs", "Teacher tables"] },
      { name: "Early Years", items: ["Children's tables", "Children's chairs"] },
      { name: "Lab Furniture", items: ["Lab tables", "Lab stools"] },
      { name: "Library Furniture", items: ["Book racks", "Reading tables", "Display stands"] },
      { name: "Staff & Office", items: ["Office tables", "Office chairs", "Staffroom furniture"] },
      { name: "Storage", items: ["Steel almirahs", "Lockers", "Filing cabinets", "Storage racks"] },
      { name: "Auditorium & Dining", items: ["Auditorium chairs", "Dining tables", "Dining benches"] },
    ],
  },
  {
    number: "14",
    slug: "electricals",
    name: "Electricals",
    description: "Water coolers, RO, AC, fans, lights, UPS",
    band: "setup",
    subcategories: [
      { name: "Water & Cooling", items: ["Water coolers", "RO purifiers", "Water dispensers"] },
      { name: "Air Conditioning", items: ["Air conditioners", "Air coolers"] },
      { name: "Fans & Lighting", items: ["Ceiling fans", "Wall fans", "LED lights", "Emergency lights"] },
      { name: "Power Backup", items: ["Inverters", "UPS", "Batteries"] },
      { name: "Electrical Fittings", items: ["Switches", "Wiring", "MCBs", "Extension boards"] },
      { name: "School Bells", items: ["Electric bells", "Automatic bell systems"] },
    ],
  },
  {
    number: "15",
    slug: "canteen-kitchen",
    name: "Canteen & Kitchen",
    description: "Kitchen equipment, serving counters, serveware",
    band: "setup",
    pageNote: "For a new kitchen or canteen, we plan the layout with you and supply and install it as one project.",
    seeAlso: [
      { label: "Dining tables and benches are under Furniture", slug: "furniture", subcategory: "Auditorium & Dining" },
      { label: "Water coolers and RO purifiers are under Electricals", slug: "electricals", subcategory: "Water & Cooling" },
    ],
    subcategories: [
      {
        name: "Cooking Equipment",
        items: ["Commercial gas stoves", "Bulk cooking vessels", "Steam cooking systems", "Exhaust hoods"],
      },
      { name: "Food Preparation", items: ["Vegetable cutters", "Wet grinders", "Commercial mixers", "Stainless steel work tables"] },
      { name: "Storage & Refrigeration", items: ["Commercial refrigerators", "Deep freezers", "Stainless steel racks", "Grain storage bins"] },
      { name: "Serving", items: ["Food service counters", "Bain-maries", "Hot cases"] },
      { name: "Serveware & Utensils", items: ["Plates", "Glasses", "Food containers", "Utensils"] },
      { name: "Kitchen Hygiene & Safety", items: ["Hand wash stations", "Kitchen aprons and caps", "Gas leak detectors"] },
      {
        name: "Complete Setups",
        note: "Planned, supplied and installed as one project.",
        items: [{ name: "Canteen and kitchen setup", href: "/quote?category=canteen-kitchen" }],
      },
    ],
  },
];

// ---------------------------------------------------------------------
// School kits (/kits) - contents only, never prices
// ---------------------------------------------------------------------

type KitInput = {
  slug: string;
  name: string;
  /** Who orders it */
  audience: string;
  /** Quantity basis, e.g. "Per classroom" */
  basis: string;
  contents: string[];
  /** Category slugs the contents come from */
  categories: string[];
  /** Shown on the home page (3-4 kits) */
  featured?: boolean;
  /** Kit photo under /public */
  image?: string;
};

const kitData: KitInput[] = [
  {
    slug: "term-start-classroom",
    name: "Term Start Classroom Kit",
    audience: "Class teachers and coordinators preparing classrooms for a new term",
    basis: "Per classroom",
    contents: ["Chalk or whiteboard markers", "Board dusters", "Registers", "Charts", "Stationery for one classroom"],
    categories: ["teaching-aids", "stationery"],
    featured: true,
  },
  {
    slug: "office-admin",
    name: "Office & Admin Kit",
    audience: "The school office and administration staff",
    basis: "Per office",
    contents: ["Files", "Registers", "Stamp pads", "Copier paper", "Desk essentials"],
    categories: ["stationery"],
  },
  {
    slug: "exam-season",
    name: "Exam Season Kit",
    audience: "Examination cells and exam coordinators",
    basis: "Per examination",
    contents: ["Answer booklets", "Supplementary sheets", "Exam pads", "Pens"],
    categories: ["printing-id-cards", "stationery"],
    featured: true,
  },
  {
    slug: "new-admission-student",
    name: "New Admission Student Kit",
    audience: "Schools issuing a standard kit to each new student",
    basis: "Per student",
    contents: ["Notebooks", "Stationery set", "School bag", "Water bottle", "Lunch box"],
    categories: ["stationery", "uniforms-bags"],
    featured: true,
  },
  {
    slug: "annual-day",
    name: "Annual Day Kit",
    audience: "Event and cultural committees",
    basis: "Per event",
    contents: ["Trophies", "Medals", "Mementos", "Invitations", "Banners"],
    categories: ["gifts-awards", "printing-id-cards"],
    featured: true,
  },
  {
    slug: "monthly-housekeeping",
    name: "Monthly Housekeeping Kit",
    audience: "Facilities and housekeeping supervisors",
    basis: "Per month",
    contents: ["Cleaning chemicals", "Cleaning tools", "Washroom supplies"],
    categories: ["housekeeping"],
  },
  {
    slug: "teachers-day-gift",
    name: "Teachers' Day Gift Kit",
    audience: "Management and parent committees recognising staff",
    basis: "Per staff member",
    contents: ["Staff gifts", "Hampers"],
    categories: ["gifts-awards"],
  },
];

// ---------------------------------------------------------------------
// Schools we supply (home page)
// ---------------------------------------------------------------------
// Add real client schools only, with their permission. While this list is
// empty, the "Schools we supply" section is hidden automatically.
// Example: { name: "Example Public School", area: "Gachibowli" }

export type ClientSchool = { name: string; area?: string; logo?: string };

export const clientSchools: ClientSchool[] = [];

// ---------------------------------------------------------------------
// Placement rules - where items that could fit twice belong
// ---------------------------------------------------------------------

export const placementRules: { items: string; category: string }[] = [
  { items: "Pens, files, staplers used by the office", category: "stationery" },
  { items: "ID cards, badges, diaries, certificates, fee books", category: "printing-id-cards" },
  { items: "Ties and belts with the school logo", category: "uniforms-bags" },
  { items: "Logo mugs, T-shirts, caps given as gifts", category: "gifts-awards" },
  { items: "Event banners and backdrops", category: "printing-id-cards" },
  { items: "Printer toner and cartridges", category: "computers-tech" },
  { items: "First aid kits, fire extinguishers", category: "housekeeping" },
  { items: "Library racks, lab tables", category: "furniture" },
  { items: "UPS and inverters", category: "electricals" },
  { items: "Plates, glasses, food containers, utensils", category: "canteen-kitchen" },
  { items: "Dining tables and benches", category: "furniture" },
];

// =====================================================================
// Normalised data used by the pages - no need to edit below this line
// =====================================================================

export type Item = {
  /** Stable key for the Quote List, e.g. "stationery/writing/ball-pens" */
  id: string;
  slug: string;
  name: string;
  note?: string;
  /** Every photo of the item, in display order (empty when there are none) */
  images: string[];
  href?: string;
};

export type SubCategory = {
  slug: string;
  name: string;
  note?: string;
  items: Item[];
};

export type Category = Omit<CategoryInput, "subcategories"> & {
  subcategories: SubCategory[];
};

export type Kit = KitInput & {
  /** Stable key for the Quote List */
  id: string;
};

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const categories: Category[] = categoryData.map((category) => ({
  ...category,
  image: category.image ?? `/images/photos/cat-${category.slug}.jpg`,
  subcategories: category.subcategories.map((sub) => {
    const subSlug = slugify(sub.name);
    return {
      slug: subSlug,
      name: sub.name,
      note: sub.note,
      items: sub.items.map((input) => {
        const { image, images, ...item } = typeof input === "string" ? { name: input } : input;
        const slug = slugify(item.name);
        return {
          ...item,
          images: images ?? (image ? [image] : []),
          slug,
          id: `${category.slug}/${subSlug}/${slug}`,
        };
      }),
    };
  }),
}));

export const kits: Kit[] = kitData.map((kit) => ({
  ...kit,
  id: `kit/${kit.slug}`,
  image: kit.image ?? `/images/photos/kit-${kit.slug}.jpg`,
}));

export function categoriesInBand(band: BandId) {
  return categories.filter((c) => c.band === band);
}

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getKit(slug: string) {
  return kits.find((k) => k.slug === slug);
}

export const featuredKits = kits.filter((k) => k.featured);

export function countItems(category: Category) {
  return category.subcategories.reduce((n, sub) => n + sub.items.length, 0);
}
