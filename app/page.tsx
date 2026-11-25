import { CategoryGrid } from "@/components/home/CategoryGrid";
import { CloseSection } from "@/components/home/CloseSection";
import { Hero } from "@/components/home/Hero";
import { HowOrdering } from "@/components/home/HowOrdering";
import { KitsSection } from "@/components/home/KitsSection";
import { WhySection } from "@/components/home/WhySection";
import { categories, countItems, kits } from "@/data/catalogue";

// Home: hero → what we supply → how ordering works → kits → why us → contact.
// Each section opens with a plain heading, one sentence and at most one action.

const itemTotal = categories.reduce((n, c) => n + countItems(c), 0);

const facts = [
  { value: categories.length, label: "categories" },
  { value: itemTotal, label: "items" },
  { value: kits.length, label: "ready kits" },
];

// Student kits first: the one most schools ask about
const kitOrder = [...kits].sort((a, b) =>
  a.slug === "new-admission-student" ? -1 : b.slug === "new-admission-student" ? 1 : 0,
);

export default function HomePage() {
  return (
    <>
      <Hero facts={facts} />
      <CategoryGrid categories={categories} itemTotal={itemTotal} />
      <HowOrdering />
      <KitsSection kits={kitOrder} />
      <WhySection />
      <CloseSection />
    </>
  );
}
