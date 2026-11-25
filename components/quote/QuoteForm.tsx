"use client";

import { useEffect, useRef, useState } from "react";
import { CategoryIcon } from "@/components/icons/CategoryIcon";
import { WhatsAppIcon } from "@/components/layout/WhatsAppFloat";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select, Textarea } from "@/components/ui/Field";
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
    const order = ["school", "contact", "phone", "email", "city", "file"];
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
        <form ref={formRef} noValidate onSubmit={onSubmit} className="grid gap-10">
          {/* 01 School */}
          <fieldset className="grid gap-5">
            <Legend number="01">Your school</Legend>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="School name" required error={errors.school} className="sm:col-span-2">
                {(p) => <Input {...p} name="school" autoComplete="organization" />}
              </Field>
              <Field label="Contact person" required error={errors.contact}>
                {(p) => <Input {...p} name="contact" autoComplete="name" />}
              </Field>
              <Field label="Role">
                {(p) => (
                  <Select {...p} name="role" defaultValue="">
                    <option value="">Select a role</option>
                    {roles.map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </Select>
                )}
              </Field>
              <Field label="Phone / WhatsApp" required error={errors.phone}>
                {(p) => <Input {...p} name="phone" type="tel" inputMode="tel" autoComplete="tel" />}
              </Field>
              <Field label="Email" error={errors.email}>
                {(p) => <Input {...p} name="email" type="email" autoComplete="email" />}
              </Field>
              <Field label="City / area" required error={errors.city} className="sm:col-span-2">
                {(p) => <Input {...p} name="city" autoComplete="address-level2" placeholder="For example: Kukatpally, Hyderabad" />}
              </Field>
            </div>
          </fieldset>
    
          {/* 02 Requirement */}
          <fieldset className="grid gap-6">
            <Legend number="02">What you need</Legend>
    
            <fieldset>
              <legend className="text-sm font-semibold">
                Categories needed <span className="font-normal text-ink-soft">(optional)</span>
              </legend>
              <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((c) => {
                  const on = picked.includes(c.slug);
                  return (
                    <li key={c.slug}>
                      <label
                        className={cn(
                          "flex h-12 cursor-pointer items-center gap-3 rounded-sm border px-3 text-[0.9375rem] transition-colors duration-150",
                          "has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink",
                          on ? "border-board bg-board text-white" : "border-ink/20 bg-white hover:border-board",
                        )}
                      >
                        <input type="checkbox" className="sr-only" checked={on} onChange={() => toggle(c.slug)} />
                        <CategoryIcon slug={c.slug} className="size-6" />
                        <span className="flex-1 leading-tight">{c.name}</span>
                        <span aria-hidden="true" className={cn("font-mono text-[0.6875rem]", on ? "text-pencil-soft" : "text-ink-soft")}>
                          {on ? "✓" : c.number}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </fieldset>
    
            <div id="quote-list" className="scroll-mt-32">
              <h3 className="font-sans text-sm font-semibold">Your quote list</h3>
              <div className="mt-3">
                <QuoteListEditor />
              </div>
            </div>
    
            <Field
              label="Message or requirement list"
              hint="Type or paste your list in any format. Quantities, brands and sizes help us quote accurately."
              error={errors.message}
            >
              {(p) => (
                <Textarea {...p} name="message" rows={6} value={message} onChange={(e) => setMessage(e.target.value)} />
              )}
            </Field>
    
            <Field
              label="Attach your list"
              hint={
                fileUploadEnabled
                  ? "A photo or PDF, up to 5 MB. A photo of a handwritten list is fine."
                  : "A photo or PDF, up to 5 MB. After you send this form, we will ask you to share the file on WhatsApp."
              }
              error={errors.file}
            >
              {(p) => (
                <input
                  {...p}
                  name="file"
                  type="file"
                  accept="image/*,application/pdf"
                  className="block w-full text-sm text-ink-soft file:mr-4 file:h-11 file:cursor-pointer file:rounded-sm file:border-[1.5px] file:border-ink file:bg-white file:px-4 file:font-semibold file:text-ink hover:file:bg-paper-deep"
                />
              )}
            </Field>
          </fieldset>
    
          {/* 03 Delivery */}
          <fieldset className="grid gap-5">
            <Legend number="03">Delivery and visit</Legend>
            <Field label="Preferred delivery date" hint="Before term starts, an exam or an event. We will confirm a date with you.">
              {(p) => <Input {...p} name="date" type="date" min={today} className="sm:max-w-xs" />}
            </Field>

            <div id="visit" className="scroll-mt-32 rounded-sm border border-ink/10 bg-white shadow-card">
              <label className="flex cursor-pointer items-start gap-3 p-4 has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink">
                <input
                  type="checkbox"
                  checked={visit}
                  onChange={(e) => setVisit(e.target.checked)}
                  className="mt-1 size-5 shrink-0 accent-[var(--color-board)]"
                />
                <span>
                  <span className="block font-semibold">Visit our school with samples</span>
                  <span className="mt-0.5 block text-sm text-ink-soft">
                    We bring samples of the products you are considering, so you can check them before you order.
                  </span>
                </span>
              </label>
              {visit ? (
                <div className="animate-rise-in grid gap-5 border-t border-ink/10 p-4 sm:grid-cols-2 [animation-duration:0.3s]">
                  <Field label="Preferred day">
                    {(p) => <Input {...p} name="visit_day" type="date" min={today} />}
                  </Field>
                  <Field label="Preferred time">
                    {(p) => (
                      <Select {...p} name="visit_time" defaultValue="">
                        <option value="">Any time</option>
                        <option>Morning</option>
                        <option>Afternoon</option>
                        <option>After school hours</option>
                      </Select>
                    )}
                  </Field>
                </div>
              ) : null}
            </div>
          </fieldset>
    
          {/* Spam trap, hidden from people */}
          <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
    
          <div className="grid gap-4 border-t-2 border-ink pt-6">
            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit" size="lg" disabled={status === "sending"}>
                {status === "sending" ? "Sending..." : "Send quote request"}
              </Button>
              <Button type="button" variant="secondary" size="lg" icon={<WhatsAppIcon />} onClick={sendOnWhatsApp}>
                Send on WhatsApp instead
              </Button>
            </div>
            <p className="text-sm text-ink-soft">
              WhatsApp opens with your school name and quote list already typed. We use your details only to reply to
              this request.
            </p>
            <div aria-live="polite">
              {status === "error" || status === "not-configured" ? <SendProblem kind={status} /> : null}
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

function Legend({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <legend className="mb-1 flex w-full items-baseline gap-3 border-b-2 border-ink pb-2">
      <span className="font-mono text-sm font-semibold text-board">{number}</span>
      <span className="font-display text-h3">{children}</span>
    </legend>
  );
}
