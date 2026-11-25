// Sanity checks for data/catalogue.ts. Run with: npm run check:catalogue
// Fails (exit code 1) if the catalogue breaks a rule from the specification.

import {
  bands,
  categories,
  countItems,
  kits,
  placementRules,
} from "../data/catalogue.ts";

const errors: string[] = [];
const fail = (msg: string) => errors.push(msg);

// 15 categories, numbered 01-15 in order, grouped by band
if (categories.length !== 15) fail(`Expected 15 categories, found ${categories.length}`);
categories.forEach((c, i) => {
  const expected = String(i + 1).padStart(2, "0");
  if (c.number !== expected) fail(`${c.name}: number ${c.number}, expected ${expected}`);
});
const bandOrder = bands.map((b) => b.id);
for (let i = 1; i < categories.length; i++) {
  if (bandOrder.indexOf(categories[i].band) < bandOrder.indexOf(categories[i - 1].band)) {
    fail(`${categories[i].name} is out of band order`);
  }
}

// Unique slugs
const categorySlugs = new Set<string>();
for (const c of categories) {
  if (categorySlugs.has(c.slug)) fail(`Duplicate category slug: ${c.slug}`);
  categorySlugs.add(c.slug);

  const subSlugs = new Set<string>();
  for (const s of c.subcategories) {
    if (subSlugs.has(s.slug)) fail(`${c.name}: duplicate sub-category ${s.name}`);
    subSlugs.add(s.slug);
    if (s.items.length === 0) fail(`${c.name} / ${s.name}: no items`);
  }
}

// Every product has exactly one home: item names unique across the catalogue
const homes = new Map<string, string>();
for (const c of categories) {
  for (const s of c.subcategories) {
    for (const item of s.items) {
      const key = item.name.toLowerCase();
      const here = `${c.name} / ${s.name}`;
      if (homes.has(key)) fail(`"${item.name}" appears in ${homes.get(key)} and ${here}`);
      homes.set(key, here);
    }
  }
}

// Cross references point somewhere real
for (const c of categories) {
  for (const ref of c.seeAlso ?? []) {
    const target = categories.find((t) => t.slug === ref.slug);
    if (!target) fail(`${c.name}: seeAlso points to missing category ${ref.slug}`);
    else if (ref.subcategory && !target.subcategories.some((s) => s.name === ref.subcategory)) {
      fail(`${c.name}: seeAlso points to missing sub-category ${ref.subcategory}`);
    }
  }
}
for (const rule of placementRules) {
  if (!categorySlugs.has(rule.category)) fail(`Placement rule "${rule.items}" -> unknown ${rule.category}`);
}

// Kits
if (kits.length !== 7) fail(`Expected 7 kits, found ${kits.length}`);
const featured = kits.filter((k) => k.featured).length;
if (featured < 3 || featured > 4) fail(`Expected 3-4 featured kits, found ${featured}`);
for (const k of kits) {
  for (const slug of k.categories) {
    if (!categorySlugs.has(slug)) fail(`Kit ${k.name}: unknown category ${slug}`);
  }
  if (k.contents.length === 0) fail(`Kit ${k.name}: no contents`);
}

// No prices: catch a currency sign or "Rs" slipping into any text
const text = JSON.stringify({ categories, kits });
if (/₹|\bRs\.?\s?\d|\bINR\b/i.test(text)) fail("Catalogue text contains a price");

// Report
for (const c of categories) {
  console.log(`${c.number} ${c.name.padEnd(22)} ${String(c.subcategories.length).padStart(2)} sub-categories  ${String(countItems(c)).padStart(3)} items`);
}
const total = categories.reduce((n, c) => n + countItems(c), 0);
console.log(`\n${total} items, ${kits.length} kits (${featured} featured)`);

if (errors.length) {
  console.error(`\n${errors.length} problem(s):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log("Catalogue OK");
