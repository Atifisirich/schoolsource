// Sends form data to info@schoolsource.in through Web3Forms.
// The access key comes from NEXT_PUBLIC_WEB3FORMS_KEY (see .env.example).

const ENDPOINT = "https://api.web3forms.com/submit";

export type SubmitResult = { ok: true } | { ok: false; reason: "not-configured" | "failed"; message?: string };

export function isFormConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_WEB3FORMS_KEY);
}

/**
 * Web3Forms accepts file attachments only on its paid plan. Set
 * NEXT_PUBLIC_WEB3FORMS_FILE_UPLOAD=true once that is enabled; until then the
 * quote form asks people to send their file on WhatsApp after submitting.
 */
export const fileUploadEnabled = process.env.NEXT_PUBLIC_WEB3FORMS_FILE_UPLOAD === "true";

export const MAX_FILE_BYTES = 5 * 1024 * 1024;

/** Indian mobile or landline, with or without +91, spaces or dashes. */
export function isValidPhone(value: string | undefined) {
  const digits = (value ?? "").replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 13 && /^[+\d][\d\s-]*$/.test((value ?? "").trim());
}

export async function submitForm(
  subject: string,
  fields: Record<string, string>,
  attachment?: File | null,
): Promise<SubmitResult> {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
  if (!accessKey) return { ok: false, reason: "not-configured" };

  const body = new FormData();
  body.append("access_key", accessKey);
  body.append("subject", subject);
  body.append("from_name", "SchoolSource website");
  for (const [key, value] of Object.entries(fields)) {
    if (value) body.append(key, value);
  }
  if (attachment) body.append("attachment", attachment);

  try {
    const res = await fetch(ENDPOINT, { method: "POST", body, headers: { Accept: "application/json" } });
    const data = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string };
    if (res.ok && data.success) return { ok: true };
    return { ok: false, reason: "failed", message: data.message };
  } catch {
    return { ok: false, reason: "failed" };
  }
}
