import { WhatsAppIcon } from "@/components/layout/WhatsAppFloat";
import { Button } from "@/components/ui/Button";
import { RouteSteps } from "@/components/ui/RouteSteps";
import { Section, SectionHead } from "@/components/ui/Section";
import { whatsappLink } from "@/lib/site";

const steps = [
  { title: "Send your list", text: "WhatsApp a photo, email a spreadsheet or fill in the quote form." },
  { title: "Get one quote", text: "Every item on a single quote. Ask about anything that is not on it." },
  { title: "Approve the proofs", text: "Diaries, ID cards and anything printed come to you as a proof first." },
  {
    title: "Checked, then delivered",
    text: "Every order is checked before dispatch. In-stock items arrive within a week of confirmation.",
  },
];

/** How ordering works: four steps on the blue field, one action. */
export function HowOrdering() {
  return (
    <Section tone="blue" id="how" aria-labelledby="how-title">
      <SectionHead
        id="how-title"
        title="How ordering works."
        intro="Four steps. A photo of a handwritten list is enough to start."
      />
      <RouteSteps steps={steps} />
      <div className="mt-7 flex flex-col gap-4 rounded-lg border-2 border-white/35 p-5 sm:p-6 md:flex-row md:items-center md:justify-between">
        <p className="text-[1.1875rem] font-semibold">Ordered from us before? Send last year&apos;s order and we quote it again.</p>
        <Button
          href={whatsappLink("Hello SchoolSource, please quote last year's order for our school again.")}
          variant="light"
          icon={<WhatsAppIcon className="text-wa" />}
          className="max-md:w-full"
        >
          WhatsApp us
        </Button>
      </div>
    </Section>
  );
}
