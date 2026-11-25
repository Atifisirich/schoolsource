import Image from "next/image";
import Link from "next/link";
import { AddToQuoteButton } from "@/components/quote/AddToQuoteButton";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import type { Kit } from "@/data/catalogue";
import { cutouts } from "@/lib/category-art";

/**
 * Ready-made kits: a sky field with the student kit's lunch box and bottle,
 * and every kit as a row you can add to the quote list.
 */
export function KitsSection({ kits }: { kits: Kit[] }) {
  return (
    <Section id="kits" aria-labelledby="kits-title">
      <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative isolate min-h-[26rem] overflow-hidden rounded-xl bg-sky sm:min-h-[32rem] lg:min-h-[36rem]">
          <div className="absolute inset-x-6 top-6 z-10 flex flex-col items-start gap-3.5 sm:inset-x-7 sm:top-7 sm:flex-row sm:justify-between">
            <span className="rounded-full bg-white px-4 py-2 text-[0.9375rem] font-bold">New Admission Student Kit</span>
            <p className="max-w-[9em] font-display text-[clamp(1.5rem,1.1rem+1.4vw,2rem)] leading-[1.05] sm:text-right">
              One bag per student.
            </p>
          </div>
          <Image
            src={cutouts.lunchbox.src}
            width={cutouts.lunchbox.width}
            height={cutouts.lunchbox.height}
            alt={cutouts.lunchbox.alt}
            sizes="(min-width: 1024px) 22vw, 45vw"
            className="absolute bottom-[7%] left-[8%] h-[52%] w-auto drop-shadow-[0_22px_22px_rgb(14_31_61/0.2)] sm:h-[62%]"
          />
          <Image
            src={cutouts.bottle.src}
            width={cutouts.bottle.width}
            height={cutouts.bottle.height}
            alt={cutouts.bottle.alt}
            sizes="(min-width: 1024px) 8vw, 18vw"
            className="absolute bottom-[7%] right-[12%] h-[56%] w-auto drop-shadow-[0_22px_22px_rgb(14_31_61/0.2)] sm:h-[62%]"
          />
        </div>

        <div className="flex flex-col">
          <h2 id="kits-title" className="text-h2">
            Ready-made school kits.
          </h2>
          <p className="mt-5 max-w-[32rem] text-lead text-ink-soft">
            Common orders, already listed. Student kits come packed in one labelled bag per child, sorted by class.
          </p>
          <ul className="mt-8 border-t-2 border-ink">
            {kits.map((kit) => (
              <li key={kit.slug} className="flex items-center justify-between gap-4 border-b border-rule py-3">
                <Link href={`/kits#${kit.slug}`} className="group min-w-0 py-1">
                  <strong className="block text-[1.125rem] font-bold leading-snug decoration-2 underline-offset-4 group-hover:underline">
                    {kit.name}
                  </strong>
                  <span className="block text-[0.9375rem] text-ink-soft">{kit.basis}</span>
                </Link>
                <AddToQuoteButton
                  size="sm"
                  label="Add"
                  item={{ id: kit.id, name: kit.name, category: "School kits" }}
                />
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Button href="/kits" variant="text">
              See what is in each kit
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
