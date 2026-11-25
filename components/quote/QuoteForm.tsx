"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Field";
import { cn } from "@/lib/cn";
import { formatQuoteList, quoteList, useQuoteList } from "@/lib/quote-list";
import { whatsappLink } from "@/lib/site";
import { fileUploadEnabled, isValidPhone, MAX_FILE_BYTES, submitForm } from "@/lib/submit-form";
import { SendProblem, SentPanel } from "./FormMessages";
import { QuoteListEditor } from "./QuoteListEditor";

type Status = "idle" | "sending" | "sent" | "error" | "not-configured";
type CategoryOption = { slug: string; name: string; number: string };

const roles = ["Principal", "Administrator", "Accounts", "Trustee", "Other"];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Full quote request. Prefills from the URL:
 *   ?category=<slug>   ticks that category
 *   &about=<text>      starts the message with "About: <text>"
 *   ?topic=lab           lab consultation request
 *   ?topic=visit         school visit with samples
 *   ?topic=student-kits  per-student kits packed by class
 */
export function QuoteForm({ categories }: { categories: CategoryOption[] }) {
  const formRef = useRef<HTMLFormElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const items = useQuoteList();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [picked, setPicked] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState<{ school: string; fileToSend: boolean } | null>(null);
  const [today, setToday] = useState<string>();
  const [visit, setVisit] = useState(false);
  const [more, setMore] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    const about = params.get("about");
    const topic = params.get("topic");
    const add = (slugs: string[]) =>
      setPicked((p) => [...p, ...slugs.filter((s) => !p.includes(s) && categories.some((c) => c.slug === s))]);
    if (category && categories.some((c) => c.slug === category)) setPicked([category]);
    if (topic === "lab") add(["labs"]);
    if (topic === "student-kits") add(["textbooks", "stationery", "uniforms-bags"]);
    if (topic === "visit") setVisit(true);
    if (category || topic === "lab" || topic === "student-kits" || topic === "visit") setMore(true);
    if (about) setMessage(`About: ${about}\n`);
    else if (topic === "lab") setMessage("We would like a consultation for setting up a lab.\n");
    else if (topic === "student-kits")
      setMessage("We would like kits packed per student, sorted by class.\nClasses and number of students:\n");
    else if (topic === "visit") setMessage("We would like a visit with product samples. Products we would like to see:\n");
    setToday(new Date().toISOString().slice(0, 10));
  }, [categories]);

  function toggle(slug: string) {
    setPicked((p) => (p.includes(slug) ? p.filter((s) => s !== slug) : [...p, slug]));
  }

  function read() {
    const form = formRef.current!;
    const data = Object.fromEntries(new FormData(form)) as Record<string, FormDataEntryValue>;
    const text = (key: string) => (typeof data[key] === "string" ? (data[key] as string).trim() : "");
    const file = data.file instanceof File && data.file.size > 0 ? data.file : null;
    return {
      form,
      school: text("school"),
      contact: text("contact"),
      role: text("role"),
      phone: text("phone"),
      email: text("email"),
      city: text("city"),
      date: text("date"),
      visitDay: text("visit_day"),
      visitTime: text("visit_time"),
      botcheck: text("botcheck"),
      file,
      categoryNames: categories.filter((c) => picked.includes(c.slug)).map((c) => c.name),
    };
  }

  function showErrors(next: Record<string, string>, form: HTMLFormElement) {
    setErrors(next);
    const order = ["school", "contact", "phone", "email", "city", "message", "file"];
    const first = order.find((k) => next[k]);
    if (first) form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
    return !first;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const v = read();
    if (v.botcheck) return;

    const next: Record<string, string> = {};
    if (!v.school) next.school = "Please enter your school's name.";
    if (!v.contact) next.contact = "Please enter the name of the person we should contact.";
    if (!isValidPhone(v.phone)) next.phone = "Please enter a phone number we can call or WhatsApp.";
    if (v.email && !emailPattern.test(v.email)) next.email = "Please check the email address.";
    if (!v.city) next.city = "Please enter your city or area.";
    if (v.file && !/^(image\/|application\/pdf)/.test(v.file.type)) next.file = "Please choose a photo or a PDF.";
    else if (v.file && v.file.size > MAX_FILE_BYTES) next.file = "Please choose a file under 5 MB.";
    if (!showErrors(next, v.form)) return;

    if (!items.length && !message.trim() && !v.file && !visit) {
      setErrors({ message: "Please add items to your quote list, type your requirement, or attach your list." });
      v.form.querySelector<HTMLElement>('[name="message"]')?.focus();
      return;
    }

    setStatus("sending");
    const result = await submitForm(
      `${visit ? "Visit and quote" : "Quote"} request from ${v.school}`,
      {
        school: v.school,
        contact_person: v.contact,
        role: v.role,
        phone: v.phone,
        email: v.email,
        city_area: v.city,
        categories: v.categoryNames.join(", "),
        quote_list: formatQuoteList(items),
        message: message.trim(),
        preferred_delivery: v.date,
        visit_requested: visit ? "Yes" : "No",
        visit_preferred: visit ? [v.visitDay, v.visitTime].filter(Boolean).join(", ") : "",
        attachment_note: v.file && !fileUploadEnabled ? `File "${v.file.name}" to follow on WhatsApp` : "",
        source: "Request a Quote page",
      },
      fileUploadEnabled ? v.file : null,
    );

    if (result.ok) {
      setSent({ school: v.school, fileToSend: Boolean(v.file) && !fileUploadEnabled });
      setStatus("sent");
      quoteList.clear();
      topRef.current?.scrollIntoView({ block: "start" });
    } else {
      setStatus(result.reason === "not-configured" ? "not-configured" : "error");
    }
  }

  function sendOnWhatsApp() {
    const v = read();
    if (!v.school) {
      showErrors({ school: "Please enter your school's name so we know who the list is from." }, v.form);
      return;
    }
    const lines = [
      `Hello SchoolSource, quote request from ${v.school}${v.city ? `, ${v.city}` : ""}.`,
      v.contact || v.phone ? `Contact: ${[v.contact, v.role && `(${v.role})`, v.phone].filter(Boolean).join(" ")}` : "",
      v.categoryNames.length ? `Categories: ${v.categoryNames.join(", ")}` : "",
      items.length ? `\nQuote list:\n${formatQuoteList(items)}` : "",
      message.trim() ? `\nRequirement:\n${message.trim()}` : "",
      v.date ? `\nPreferred delivery: ${v.date}` : "",
      visit
        ? `Please visit us with samples${v.visitDay || v.visitTime ? `: ${[v.visitDay, v.visitTime].filter(Boolean).join(", ")}` : ""}.`
        : "",
    ].filter(Boolean);
    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
  }

  return (
    <div ref={topRef} className="scroll-mt-28">
      {status === "sent" && sent ? (
        <SentPanel school={sent.school} fileToSend={sent.fileToSend} />
      ) : (
        <form ref={formRef} noValidate onSubmit={onSubmit} className="grid gap-14">
          {/* 1. Your school */}
          <fieldset className="grid gap-6">
            <Legend step={1}>About your school</Legend>
            <FormField label="School name" required error={errors.school}>
              {(p) => <Input {...p} name="school" autoComplete="organization" className={big} />}
            </FormField>
            <FormField label="Your name" required error={errors.contact}>
              {(p) => <Input {...p} name="contact" autoComplete="name" className={big} />}
            </FormField>
            <FormField label="Phone or WhatsApp number" required error={errors.phone}>
              {(p) => <Input {...p} name="phone" type="tel" inputMode="tel" autoComplete="tel" className={big} />}
            </FormField>
            <FormField label="City or area" required error={errors.city}>
              {(p) => (
                <Input
                  {...p}
                  name="city"
                  autoComplete="address-level2"
                  placeholder="For example: Kukatpally, Hyderabad"
                  className={big}
                />
              )}
            </FormField>
            <FormField label="Email" error={errors.email}>
              {(p) => <Input {...p} name="email" type="email" autoComplete="email" spellCheck={false} className={big} />}
            </FormField>
          </fieldset>

          {/* 2. Your list */}
          <fieldset className="grid gap-7">
            <Legend step={2}>What you need</Legend>

            <div id="quote-list" className="scroll-mt-32">
              <h3 className="text-[1.0625rem] font-semibold">Your quote list</h3>
              <div className="mt-3">
                <QuoteListEditor />
              </div>
            </div>

            <FormField
              label="Type or paste your list"
              hint="Any format is fine. Quantities, brands and sizes help us quote accurately."
              error={errors.message}
            >
              {(p) => (
                <Textarea
                  {...p}
                  name="message"
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-40 text-[1.0625rem]"
                />
              )}
            </FormField>

            <FormField
              label="Attach a photo or PDF of your list"
              hint={
                fileUploadEnabled
                  ? "Up to 5 MB. A photo of a handwritten list is fine."
                  : "Up to 5 MB. After you send this form, we will ask you to share the file on WhatsApp."
              }
              error={errors.file}
            >
              {(p) => (
                <input
                  {...p}
                  name="file"
                  type="file"
                  accept="image/*,application/pdf"
                  className={cn(
                    "block w-full rounded-md text-[1.0625rem] text-ink-soft",
                    "file:mr-4 file:h-12 file:cursor-pointer file:rounded-full file:border-2 file:border-ink file:bg-white file:px-5 file:text-[1.0625rem] file:font-semibold file:text-ink",
                    "file:transition-colors file:duration-150 hover:file:bg-cream",
                  )}
                />
              )}
            </FormField>
          </fieldset>

          {/* Optional extras, tucked away */}
          <details
            open={more}
            onToggle={(e) => setMore(e.currentTarget.open)}
            className="group rounded-lg border-2 border-ink/15 bg-white"
          >
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-lg px-5 py-3 text-[1.0625rem] font-semibold marker:content-none [&::-webkit-details-marker]:hidden">
              <span>
                More details <span className="font-normal text-ink-soft">(optional)</span>
              </span>
              <svg
                viewBox="0 0 16 16"
                className="size-5 shrink-0 transition-transform duration-200 group-open:rotate-180"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 6l4 4 4-4" />
              </svg>
            </summary>
            <div className="grid gap-7 border-t-2 border-ink/10 p-5 sm:p-6">
              <FormField label="Your role">
                {(p) => (
                  <Select {...p} name="role" defaultValue="" className={big}>
                    <option value="">Select a role</option>
                    {roles.map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </Select>
                )}
              </FormField>

              <FormField label="Preferred delivery date" hint="For example before term starts. We confirm a date with you.">
                {(p) => <Input {...p} name="date" type="date" min={today} className={cn(big, "sm:max-w-xs")} />}
              </FormField>

              <fieldset>
                <legend className="text-[1.0625rem] font-semibold">
                  Categories you need <span className="font-normal text-ink-soft">(optional)</span>
                </legend>
                <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {categories.map((c) => {
                    const on = picked.includes(c.slug);
                    return (
                      <li key={c.slug}>
                        <label
                          className={cn(
                            "flex min-h-12 cursor-pointer select-none items-center gap-3 rounded-md border-2 px-3.5 py-2 text-[1.0625rem] leading-tight",
                            "transition-[border-color,background-color] duration-150",
                            "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-blue",
                            on ? "border-blue bg-sky" : "border-ink/15 bg-paper hover:border-ink/50",
                          )}
                        >
                          <input type="checkbox" className="sr-only" checked={on} onChange={() => toggle(c.slug)} />
                          <Tick on={on} />
                          <span className={cn("flex-1", on ? "font-semibold" : null)}>{c.name}</span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </fieldset>

              <div
                id="visit"
                className={cn(
                  "scroll-mt-32 rounded-md border-2 transition-colors duration-150",
                  visit ? "border-blue" : "border-ink/15",
                )}
              >
                <label className="flex min-h-12 cursor-pointer items-start gap-3 rounded-md p-4 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-blue">
                  <input type="checkbox" checked={visit} onChange={(e) => setVisit(e.target.checked)} className="sr-only" />
                  <Tick on={visit} className="mt-1" />
                  <span>
                    <span className="block text-[1.0625rem] font-semibold">Visit our school with samples</span>
                    <span className="mt-0.5 block text-[1.0625rem] text-ink-soft">
                      We bring samples so you can check them before you order.
                    </span>
                  </span>
                </label>
                {visit ? (
                  <div className="animate-fade-in grid gap-6 border-t-2 border-ink/10 p-4 sm:grid-cols-2">
                    <FormField label="Preferred day">
                      {(p) => <Input {...p} name="visit_day" type="date" min={today} className={big} />}
                    </FormField>
                    <FormField label="Preferred time">
                      {(p) => (
                        <Select {...p} name="visit_time" defaultValue="" className={big}>
                          <option value="">Any time</option>
                          <option>Morning</option>
                          <option>Afternoon</option>
                          <option>After school hours</option>
                        </Select>
                      )}
                    </FormField>
                  </div>
                ) : null}
              </div>
            </div>
          </details>

          {/* Spam trap, hidden from people */}
          <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

          <div className="grid gap-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button type="submit" size="lg" disabled={status === "sending"} className="sm:min-w-56">
                {status === "sending" ? "Sending…" : "Request a quote"}
              </Button>
              <Button type="button" variant="whatsapp" size="lg" onClick={sendOnWhatsApp}>
                Send on WhatsApp instead
              </Button>
            </div>
            <p className="max-w-[34rem] text-[1.0625rem] leading-relaxed text-ink-soft">
              Next, we read your list and send an itemised quotation. We use your details only to reply to this request.
            </p>
            <div aria-live="polite">
              {status === "error" || status === "not-configured" ? (
                <SendProblem kind={status} onWhatsApp={sendOnWhatsApp} />
              ) : null}
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

const big = "h-14 text-[1.0625rem]";

/** Label, control, hint and error, with 17px text and the error under its own field. */
function FormField({
  label,
  required,
  hint,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: (props: {
    id: string;
    "aria-describedby"?: string;
    "aria-invalid"?: boolean;
    required?: boolean;
  }) => React.ReactNode;
}) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-[1.0625rem] font-semibold text-ink">
        {label}
        {required ? null : <span className="font-normal text-ink-soft"> (optional)</span>}
      </label>
      {children({ id, "aria-describedby": describedBy, "aria-invalid": error ? true : undefined })}
      {hint ? (
        <p id={hintId} className="text-[1.0625rem] leading-snug text-ink-soft">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-[1.0625rem] font-semibold text-red">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Legend({ step, children }: { step: number; children: React.ReactNode }) {
  return (
    <legend className="mb-6 flex w-full items-center gap-3 font-display text-h3">
      <span
        aria-hidden="true"
        className="tabular flex size-9 shrink-0 items-center justify-center rounded-full bg-orange font-sans text-lg font-bold text-ink"
      >
        {step}
      </span>
      {children}
    </legend>
  );
}

/** Drawn checkbox for the visually hidden native input beside it. */
function Tick({ on, className }: { on: boolean; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex size-6 shrink-0 items-center justify-center rounded-[6px] border-2 transition-colors duration-150",
        on ? "border-blue bg-blue text-white" : "border-[#7d8899] bg-white text-transparent",
        className,
      )}
    >
      <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.5 8.5 L6.5 11.5 L12.5 5" />
      </svg>
    </span>
  );
}
