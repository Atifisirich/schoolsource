import Image from "next/image";
import { WhatsAppIcon } from "@/components/layout/WhatsAppFloat";
import { Button } from "@/components/ui/Button";
import { cutouts } from "@/lib/category-art";
import { cn } from "@/lib/cn";
import { whatsappLink } from "@/lib/site";

const listMessage = "Hello SchoolSource, I would like a quote for our school. Here is our list:";

/**
 * The orange field: four real products, composed like a product shoot and
 * overlapping, so the field reads as "school things" at a glance. Each one
 * rises into place once on load, back to front.
 *
 * Positions are percentages of the field, so the group keeps its shape from
 * a 320px phone to a 600px desktop column.
 */
const group = [
  // Left: the trophy, kept to the same height as the lunch box
  {
    art: cutouts.trophy,
    className: "left-[5%] bottom-[24%] h-[46%] w-auto",
    sizes: "(min-width: 900px) 15vw, 36vw",
    delay: 200,
    rotate: "-4deg",
  },
  // Right: the open lunch box
  {
    art: cutouts.lunchbox,
    className: "right-[5%] bottom-[26%] h-[44%] w-auto",
    sizes: "(min-width: 900px) 15vw, 34vw",
    delay: 280,
    rotate: "4deg",
  },
  // Front: a row of pencils across the bottom, hiding the bases
  {
    art: cutouts.pencils,
    className: "left-[-8%] bottom-[-13%] w-[116%] max-w-none",
    sizes: "(min-width: 900px) 50vw, 116vw",
    delay: 380,
    rotate: "0deg",
  },
  // Front-most: the football, resting on the pencils
  {
    art: cutouts.football,
    className: "left-[37%] bottom-[11%] w-[27%] h-auto",
    sizes: "(min-width: 900px) 12vw, 28vw",
    delay: 470,
    rotate: "-14deg",
  },
];

function ProductGroup() {
  return (
    <div
      role="img"
      aria-label="A gold trophy, an open lunch box and a football in front of a row of colour pencils"
      className="enter-field relative min-h-[19rem] overflow-hidden rounded-xl bg-orange sm:min-h-[26rem] lg:min-h-0"
    >
      {group.map(({ art, className, sizes, delay, rotate }) => (
        <Image
          key={art.src}
          src={art.src}
          width={art.width}
          height={art.height}
          alt=""
          sizes={sizes}
          priority
          className={cn(
            "absolute select-none drop-shadow-[0_18px_18px_rgb(14_31_61/0.22)]",
            "animate-[object-in_1000ms_cubic-bezier(0.2,0.9,0.25,1)_both]",
            className,
          )}
          style={{ animationDelay: `${delay}ms`, ["--r-from" as string]: rotate }}
        />
      ))}
    </div>
  );
}

export function Hero({ facts }: { facts: { value: number; label: string }[] }) {
  return (
    <section aria-labelledby="hero-title" className="pb-[clamp(3rem,6vw,5rem)] pt-2">
      <div className="wrap grid gap-5 lg:min-h-[calc(100svh-var(--nav-h)-3.5rem)] lg:max-h-[56rem] lg:grid-cols-[minmax(0,1.22fr)_minmax(0,1fr)]">
        <div className="flex flex-col justify-between gap-8 pt-4 lg:gap-10 lg:pb-1 lg:pt-7">
          <div>
            <p className="enter pill pill-dot">School supplies, Hyderabad</p>
            <h1 id="hero-title" className="enter enter-1 mt-6 text-display">
              Everything your school buys. <span className="text-blue">One&nbsp;quote.</span>
            </h1>
            <p className="enter enter-2 mt-6 max-w-[31em] text-lead text-ink-soft">
              Stationery, uniforms, sports kit, lab equipment and furniture for schools. Send us your list and we price
              every item on one quote.
            </p>
            <div className="enter enter-3 mt-8 hidden flex-wrap gap-3 md:flex">
              <Button href="/quote">Request a quote</Button>
              <Button href={whatsappLink(listMessage)} variant="whatsapp" icon={<WhatsAppIcon />}>
                WhatsApp us
              </Button>
            </div>
          </div>

          <ul aria-label="The catalogue" className="enter enter-4 flex border-t-2 border-ink">
            {facts.map((f) => (
              <li key={f.label} className="flex-1 pr-3 pt-4">
                <b className="block font-display text-[clamp(1.875rem,1.2rem+2.4vw,2.875rem)] font-normal leading-none">
                  {f.value}
                </b>
                <span className="mt-2 block text-[0.9375rem] font-semibold text-ink-soft sm:text-base">{f.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <ProductGroup />
      </div>
    </section>
  );
}
