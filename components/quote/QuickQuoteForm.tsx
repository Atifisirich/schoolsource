"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Field, Input, Textarea } from "@/components/ui/Field";
import { isValidPhone, submitForm } from "@/lib/submit-form";
import { SendProblem, SentPanel } from "./FormMessages";

type Status = "idle" | "sending" | "sent" | "error" | "not-configured";

/**
 * Short form: name, school, phone, message. Used on the home, contact and
 * category pages. `about` names what the enquiry is about, e.g. a category.
 */
export function QuickQuoteForm({
  source = "Home page quick form",
  about,
  messageLabel = "What do you need?",
}: {
  source?: string;
  about?: string;
  messageLabel?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [school, setSchool] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    if (data.botcheck) return;

    const next: Record<string, string> = {};
    if (!data.name?.trim()) next.name = "Please enter your name.";
    if (!data.school?.trim()) next.school = "Please enter your school's name.";
    if (!isValidPhone(data.phone)) next.phone = "Please enter a phone number we can call or WhatsApp.";
    setErrors(next);
    const firstInvalid = ["name", "phone", "school"].find((key) => next[key]);
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setSchool(data.school);
    setStatus("sending");
    const result = await submitForm(`Quote request from ${data.school}${about ? ` (${about})` : ""}`, {
      name: data.name,
      school: data.school,
      phone: data.phone,
      message: data.message,
      about: about ?? "",
      source,
    });
    setStatus(result.ok ? "sent" : result.reason === "not-configured" ? "not-configured" : "error");
    if (result.ok) form.reset();
  }

  if (status === "sent") return <SentPanel school={school} />;

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="grid gap-5 rounded-sm border border-ink/10 bg-white shadow-card p-6 sm:p-8"
      aria-describedby="quick-form-note"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" required error={errors.name}>
          {(p) => <Input {...p} name="name" autoComplete="name" />}
        </Field>
        <Field label="Phone / WhatsApp" required error={errors.phone}>
          {(p) => <Input {...p} name="phone" type="tel" inputMode="tel" autoComplete="tel" />}
        </Field>
      </div>
      <Field label="School" required error={errors.school}>
        {(p) => <Input {...p} name="school" autoComplete="organization" />}
      </Field>
      <Field label={messageLabel} hint="Type your list, or describe it. We will follow up for details.">
        {(p) => <Textarea {...p} name="message" rows={4} />}
      </Field>

      {/* Spam trap, hidden from people */}
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <Button type="submit" size="lg" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : "Send my list"}
        </Button>
        <p id="quick-form-note" className="text-sm text-ink-soft">
          You review the itemised quotation before you order.
        </p>
      </div>

      <div aria-live="polite">
        {status === "error" || status === "not-configured" ? <SendProblem kind={status} /> : null}
      </div>
    </form>
  );
}
