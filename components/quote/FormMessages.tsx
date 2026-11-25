import { WhatsAppIcon } from "@/components/layout/WhatsAppFloat";
import { Button } from "@/components/ui/Button";
import { Pending } from "@/components/ui/Pending";
import { site, whatsappLink } from "@/lib/site";

/** Thank-you state shown after a form is sent. */
export function SentPanel({ school, fileToSend = false }: { school: string; fileToSend?: boolean }) {
  return (
    <div role="status" className="animate-rise-in rounded-xl bg-sky p-6 sm:p-8">
      <svg viewBox="0 0 24 24" className="size-10 text-blue" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M7.5 12.5 L10.5 15.5 L16.5 9" />
      </svg>
      <h3 className="mt-4 text-h3">Thank you. We have your request.</h3>
      <p className="mt-3 max-w-[56ch] text-ink-soft">
        We&apos;ll reply within one working day <Pending label="CONFIRM" /> with an itemised quotation. If it is
        urgent, message us on WhatsApp.
      </p>
      {fileToSend ? (
        <p className="mt-5 rounded-md bg-pencil-soft px-4 py-3 text-[1.0625rem]">
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

/**
 * Shown when sending fails or the form is not connected yet. With
 * `onWhatsApp`, offers a button that opens WhatsApp with the request typed.
 */
export function SendProblem({ kind, onWhatsApp }: { kind: "error" | "not-configured"; onWhatsApp?: () => void }) {
  return (
    <div className="rounded-lg border-2 border-red/50 bg-white p-4 sm:p-5">
      <p className="font-semibold">
        {kind === "error" ? "Your request could not be sent." : "The online form is not connected yet."}
      </p>
      <p className="mt-1 text-[1.0625rem] text-ink-soft">
        {kind === "error" ? "Please try again, or send it " : "Please send your request "}
        on WhatsApp or by email to{" "}
        <a href={site.emailHref} className="font-semibold text-ink underline underline-offset-4">
          {site.email}
        </a>
        . Nothing you typed has been lost.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        {onWhatsApp ? (
          <Button type="button" onClick={onWhatsApp} icon={<WhatsAppIcon />}>
            Send on WhatsApp
          </Button>
        ) : (
          <Button href={site.whatsappHref} icon={<WhatsAppIcon />}>
            Open WhatsApp
          </Button>
        )}
        <Button href={site.emailHref} variant="ghost">
          Email us
        </Button>
      </div>
    </div>
  );
}
