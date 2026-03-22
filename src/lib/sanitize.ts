const HTML_ESCAPE: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export function escapeHtml(input: string): string {
  return input.replace(/[&<>"']/g, (ch) => HTML_ESCAPE[ch] ?? ch);
}

export function stripControlChars(input: string): string {
  return input.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
}

export function sanitizePlainText(
  input: unknown,
  maxLen: number
): { ok: true; value: string } | { ok: false; error: string } {
  if (typeof input !== "string") {
    return { ok: false, error: "Invalid field type." };
  }
  const trimmed = stripControlChars(input).trim();
  if (trimmed.length === 0) {
    return { ok: false, error: "Field cannot be empty." };
  }
  if (trimmed.length > maxLen) {
    return { ok: false, error: `Field exceeds ${maxLen} characters.` };
  }
  return { ok: true, value: trimmed };
}

export function isValidEmail(email: string): boolean {
  if (email.length > 254) return false;
  const re =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return re.test(email);
}

/** Detect newline injection in email headers */
export function hasEmailHeaderInjection(value: string): boolean {
  return /[\r\n]/.test(value);
}
