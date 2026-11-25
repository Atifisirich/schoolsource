import Image from "next/image";
import { AddToQuoteButton } from "@/components/quote/AddToQuoteButton";
import type { Kit } from "@/data/catalogue";

/**
 * One kit as a clean card: photo, name, who it is for, the items and the
 * one action. Plain paper card, no colour field, so seven in a row stay calm.
 */
export function KitCard({ kit }: { kit: Kit }) {
  return (
    <article
      aria-labelledby={`${kit.slug}-title`}
      className="flex h-full flex-col overflow-hidden rounded-xl border border-rule bg-white"
    >
      <div className="relative aspect-[3/2] bg-cream">
        <Image
          src={kit.image ?? `/images/photos/kit-${kit.slug}.jpg`}
          alt=""
          fill
          sizes="(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 id={`${kit.slug}-title`} className="text-h3">
          {kit.name}
        </h3>
        <p className="mt-3 text-[1.0625rem] leading-snug text-ink-soft">
          For {kit.audience.charAt(0).toLowerCase()}
          {kit.audience.slice(1)}.
        </p>
        <p className="mt-1 text-[1.0625rem] font-bold">{kit.basis}</p>
        <ul className="mt-5 grid gap-2 border-t border-rule pt-5 text-[1.0625rem] leading-snug">
          {kit.contents.map((line) => (
            <li key={line} className="flex gap-3">
              <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-orange" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-7">
          <AddToQuoteButton
            variant="solid"
            className="w-full"
            item={{ id: kit.id, name: kit.name, category: "School kits" }}
            label="Get this kit quoted"
          />
        </div>
      </div>
    </article>
  );
}
