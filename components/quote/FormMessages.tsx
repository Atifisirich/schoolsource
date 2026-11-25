import { WhatsAppIcon } from "@/components/layout/WhatsAppFloat";
import { Button } from "@/components/ui/Button";
import { Placeholder } from "@/components/ui/Placeholder";
import { site, whatsappLink } from "@/lib/site";

/** Thank-you state shown after a form is sent. */
export function SentPanel({ school, fileToSend = false }: { school: string; fileToSend?: boolean }) {
  return (
    <div role="status" className="animate-rise-in rounded-sm border border-ink/10 bg-white shadow-card p-6 sm:p-8">
      <p className="font-mono text-label uppercase text-board">Request received</p>
      <h3 className="mt-3 text-h3">Thank you. We have your request.</h3>
      <p className="mt-3 text-ink-soft">
        We&apos;ll reply within one working day <Placeholder>[CONFIRM]</Placeholder> with an itemised quotation. If it
        is urgent, message us on WhatsApp.
      </p>
      {fileToSend ? (
        <p className="mt-4 border-l-[3px] border-pencil bg-paper px-4 py-3 text-[0.9375rem]">
          Please send the photo or PDF of your list on WhatsApp, so we can match it to this request.
        </p>
      ) : null}
      <div className="mt-6">
        <Button
          href={whatsappLink(
            fileToSend
              ? `Hello SchoolSource, I just sent a quote request for ${school}. Here is our list:`
              : `Hello SchoolSource, I just sent a quote request for ${school}.`,
          )}
          icon={<WhatsAppIcon />}
        >
          {fileToSend ? "Send the file on WhatsApp" : "Message on WhatsApp"}
        </Button>
      </div>
    </div>
  );
}

/** Shown when sending fails or the form is not connected yet. */
export function SendProblem({ kind }: { kind: "error" | "not-configured" }) {
  return (
    <p className="rounded-sm border-l-[3px] border-red bg-paper px-4 py-3 text-sm">
      {kind === "error" ? "Your request could not be sent. Please try again, or send it " : "The online form is not connected yet. Please send your request "}
      on{" "}
      <a href={site.whatsappHref} className="font-semibold underline" target="_blank" rel="noopener noreferrer">
        WhatsApp
      </a>{" "}
      or to{" "}
      <a href={site.emailHref} className="font-semibold underline">
        {site.email}
      </a>
      .
    </p>
  );
}
