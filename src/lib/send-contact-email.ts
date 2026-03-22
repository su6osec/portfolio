import nodemailer from "nodemailer";
import { escapeHtml } from "./sanitize";

export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function sendContactEmail(payload: ContactPayload): Promise<{ ok: true } | { ok: false; error: string }> {
  const to = process.env.CONTACT_EMAIL_TO;
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!to || !host || !port || !user || !pass) {
    console.error("[contact] SMTP or CONTACT_EMAIL_TO not configured");
    return { ok: false, error: "Message could not be sent. Please try again later." };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const safeName = escapeHtml(payload.name);
  const safeSubject = escapeHtml(payload.subject);
  const textBody = `${payload.message}\n\n— ${payload.name} <${payload.email}>`;

  try {
    await transporter.sendMail({
      from: `"Portfolio" <${user}>`,
      to,
      replyTo: payload.email,
      subject: `[Portfolio] ${payload.subject}`,
      text: textBody,
      html: `
        <p><strong>From:</strong> ${safeName} &lt;${escapeHtml(payload.email)}&gt;</p>
        <p><strong>Subject:</strong> ${safeSubject}</p>
        <pre style="font-family:system-ui,sans-serif;white-space:pre-wrap">${escapeHtml(payload.message)}</pre>
      `,
    });
    return { ok: true };
  } catch (e) {
    console.error("[contact] sendMail error", e);
    return { ok: false, error: "Message could not be sent. Please try again later." };
  }
}
